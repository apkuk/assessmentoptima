/**
 * File: src/app/api/ai/analyze/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: BYOK AI analysis proxy that does not store user provider keys.
 */
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import { createAiAnalysisPrompt } from "@/features/assessment/application/ai-analysis";
import {
  applySmallCellSuppression,
  calculateAggregates,
  toPublicDatasetRows,
} from "@/features/assessment/application/public-dataset";
import {
  aiAnalysisRequestSchema,
  aiAnalysisResponseSchema,
  openaiModels,
  type AiUsage,
} from "@/features/assessment/schemas/assessment";
import { jsonResponse } from "@/lib/api/responses";
import { routeErrorResponse, routeFailure } from "@/lib/api/route-errors";
import { getServerEnv } from "@/lib/env/server";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

function clientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
  const realIp = request.headers.get("x-real-ip");

  return forwardedFor?.trim() || realIp?.trim() || "unknown";
}

function extractOpenAiText(payload: unknown): string {
  if (
    payload &&
    typeof payload === "object" &&
    "output_text" in payload &&
    typeof payload.output_text === "string"
  ) {
    return payload.output_text;
  }

  if (!payload || typeof payload !== "object" || !("output" in payload)) {
    return "";
  }

  const output = payload.output;

  if (!Array.isArray(output)) {
    return "";
  }

  return output
    .flatMap((item) => {
      if (!item || typeof item !== "object" || !("content" in item)) {
        return [];
      }

      const content = item.content;

      if (!Array.isArray(content)) {
        return [];
      }

      return content
        .map((part) => {
          if (
            part &&
            typeof part === "object" &&
            "text" in part &&
            typeof part.text === "string"
          ) {
            return part.text;
          }

          return "";
        })
        .filter(Boolean);
    })
    .join("\n\n");
}

function extractAnthropicText(payload: unknown): string {
  if (!payload || typeof payload !== "object" || !("content" in payload)) {
    return "";
  }

  const content = payload.content;

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((part) => {
      if (
        part &&
        typeof part === "object" &&
        "text" in part &&
        typeof part.text === "string"
      ) {
        return part.text;
      }

      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

// Anthropic models that accept an explicit `thinking.budget_tokens` request.
// Opus 4.7 thinks adaptively and rejects manual budgets; Haiku doesn't think.
const anthropicExplicitThinkingModels = new Set<string>(["claude-sonnet-4-6"]);

const anthropicThinkingBudgets = {
  off: 0,
  low: 2048,
  medium: 4096,
  high: 8192,
} as const;

interface ProviderCallResult {
  text: string;
  usage: AiUsage;
}

function numericField(record: unknown, key: string): number | null {
  if (!record || typeof record !== "object" || !(key in record)) {
    return null;
  }

  const value = record[key as keyof typeof record];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function emptyUsage(input: { latencyMs: number; costNote?: string }): AiUsage {
  return {
    inputTokens: null,
    outputTokens: null,
    totalTokens: null,
    reasoningTokens: null,
    latencyMs: input.latencyMs,
    estimatedCostUsd: null,
    costNote: input.costNote ?? "Provider usage was not returned.",
  };
}

function estimateOpenAiCost(input: {
  model: string;
  inputTokens: number | null;
  outputTokens: number | null;
  cachedInputTokens: number;
}): { cost: number | null; note: string } {
  const model = openaiModels.find((candidate) => candidate.id === input.model);

  if (!model || input.inputTokens === null || input.outputTokens === null) {
    return {
      cost: null,
      note: "Cost estimate unavailable because token usage or pricing metadata is missing.",
    };
  }

  const regularInputTokens = Math.max(
    0,
    input.inputTokens - input.cachedInputTokens,
  );
  const pricing = model.pricingUsdPerMillionTokens;
  const cost =
    (regularInputTokens / 1_000_000) * pricing.input +
    (input.cachedInputTokens / 1_000_000) * pricing.cachedInput +
    (input.outputTokens / 1_000_000) * pricing.output;

  return {
    cost,
    note: "Estimated from OpenAI standard text-token pricing. Excludes taxes, regional uplift, service-tier changes, and tool-call fees.",
  };
}

function openAiUsage(input: {
  model: string;
  payload: unknown;
  latencyMs: number;
}): AiUsage {
  const usage =
    input.payload &&
    typeof input.payload === "object" &&
    "usage" in input.payload
      ? input.payload.usage
      : null;
  const inputTokens = numericField(usage, "input_tokens");
  const outputTokens = numericField(usage, "output_tokens");
  const totalTokens = numericField(usage, "total_tokens");
  const inputDetails =
    usage && typeof usage === "object" && "input_tokens_details" in usage
      ? usage.input_tokens_details
      : null;
  const outputDetails =
    usage && typeof usage === "object" && "output_tokens_details" in usage
      ? usage.output_tokens_details
      : null;
  const cachedInputTokens = numericField(inputDetails, "cached_tokens") ?? 0;
  const reasoningTokens = numericField(outputDetails, "reasoning_tokens");
  const estimate = estimateOpenAiCost({
    model: input.model,
    inputTokens,
    outputTokens,
    cachedInputTokens,
  });

  return {
    inputTokens,
    outputTokens,
    totalTokens,
    reasoningTokens,
    latencyMs: input.latencyMs,
    estimatedCostUsd: estimate.cost,
    costNote: estimate.note,
  };
}

function anthropicUsage(input: {
  payload: unknown;
  latencyMs: number;
}): AiUsage {
  const usage =
    input.payload &&
    typeof input.payload === "object" &&
    "usage" in input.payload
      ? input.payload.usage
      : null;
  const inputTokens = numericField(usage, "input_tokens");
  const outputTokens = numericField(usage, "output_tokens");

  return {
    inputTokens,
    outputTokens,
    totalTokens:
      inputTokens === null || outputTokens === null
        ? null
        : inputTokens + outputTokens,
    reasoningTokens: null,
    latencyMs: input.latencyMs,
    estimatedCostUsd: null,
    costNote:
      "Token usage is provider-reported. Anthropic cost estimation is not enabled in this prototype.",
  };
}

async function callOpenAi(input: {
  apiKey: string;
  model: string;
  prompt: string;
  reasoningEffort: "none" | "low" | "medium" | "high" | "xhigh";
  verbosity: "low" | "medium" | "high";
}): Promise<ProviderCallResult> {
  const startedAt = Date.now();
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${input.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: input.model,
      input: input.prompt,
      max_output_tokens: 2000,
      store: false,
      reasoning: { effort: input.reasoningEffort },
      text: { verbosity: input.verbosity },
    }),
  });
  const latencyMs = Date.now() - startedAt;

  if (!response.ok) {
    return {
      text: `Provider request failed with ${response.status}.`,
      usage: emptyUsage({ latencyMs }),
    };
  }

  const payload: unknown = await response.json();
  return {
    text: extractOpenAiText(payload) || "The provider returned no text output.",
    usage: openAiUsage({ model: input.model, payload, latencyMs }),
  };
}

async function callAnthropic(input: {
  apiKey: string;
  model: string;
  prompt: string;
  thinkingEffort: "off" | "low" | "medium" | "high";
}): Promise<ProviderCallResult> {
  const thinkingBudget = anthropicThinkingBudgets[input.thinkingEffort];
  const useExplicitThinking =
    thinkingBudget > 0 && anthropicExplicitThinkingModels.has(input.model);
  const outputTokens = 2000;
  const maxTokens = useExplicitThinking
    ? thinkingBudget + outputTokens
    : outputTokens;

  const body: Record<string, unknown> = {
    model: input.model,
    max_tokens: maxTokens,
    messages: [{ role: "user", content: input.prompt }],
  };

  if (useExplicitThinking) {
    body.thinking = { type: "enabled", budget_tokens: thinkingBudget };
  }

  const startedAt = Date.now();
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "x-api-key": input.apiKey,
    },
    body: JSON.stringify(body),
  });
  const latencyMs = Date.now() - startedAt;

  if (!response.ok) {
    return {
      text: `Provider request failed with ${response.status}.`,
      usage: emptyUsage({ latencyMs }),
    };
  }

  const payload: unknown = await response.json();
  return {
    text:
      extractAnthropicText(payload) || "The provider returned no text output.",
    usage: anthropicUsage({ payload, latencyMs }),
  };
}

export async function POST(request: Request) {
  try {
    const env = getServerEnv();

    if (!env.AI_ANALYSIS_ENABLED) {
      return routeErrorResponse({
        code: "AI_ANALYSIS_DISABLED",
        message: "AI analysis is disabled.",
        operation: "POST /api/ai/analyze",
        request,
        status: 403,
      });
    }

    const limit = await rateLimit({
      key: `ai-analysis:${clientKey(request)}`,
      limit: env.AI_ANALYSIS_RATE_LIMIT,
      windowSeconds: env.AI_ANALYSIS_RATE_WINDOW_SECONDS,
      env,
    });

    if (!limit.allowed) {
      return routeErrorResponse({
        code: "RATE_LIMITED",
        detail: `Try again after ${new Date(limit.resetAt).toISOString()}.`,
        message: "AI analysis rate limit exceeded.",
        operation: "POST /api/ai/analyze",
        request,
        retryable: true,
        status: 429,
      });
    }

    const input = aiAnalysisRequestSchema.parse(await request.json());
    const repository = createAssessmentSubmissionRepository();
    const rows = toPublicDatasetRows(
      await repository.listPublicDatasetEligible(),
    );
    const threshold = applySmallCellSuppression(rows, env.PUBLIC_DATASET_MIN_N);

    if (threshold.suppressed) {
      return routeErrorResponse({
        code: "SMALL_CELL_SUPPRESSED",
        detail: `Current public row count is ${threshold.rowCount}; minimum is ${threshold.minGroupSize}.`,
        message: "Public dataset threshold has not been met.",
        operation: "POST /api/ai/analyze",
        request,
        status: 403,
      });
    }

    const aggregates = calculateAggregates(
      threshold.rows,
      env.PUBLIC_DATASET_MIN_N,
    );
    const prompt = createAiAnalysisPrompt({
      request: input,
      rows: threshold.rows,
      aggregates,
    });
    const providerResult =
      input.provider === "openai"
        ? await callOpenAi({
            apiKey: input.apiKey,
            model: input.model,
            prompt,
            reasoningEffort: input.reasoningEffort,
            verbosity: input.verbosity,
          })
        : await callAnthropic({
            apiKey: input.apiKey,
            model: input.model,
            prompt,
            thinkingEffort: input.thinkingEffort,
          });

    return jsonResponse(
      aiAnalysisResponseSchema.parse({
        provider: input.provider,
        model: input.model,
        rowCount: threshold.rowCount,
        analysis: providerResult.text,
        usage: providerResult.usage,
      }),
    );
  } catch (error) {
    return routeFailure({
      error,
      fallbackMessage: "AI analysis failed.",
      operation: "POST /api/ai/analyze",
      request,
      validationMessage: "Invalid AI analysis request.",
    });
  }
}
