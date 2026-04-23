/**
 * File: src/app/api/ai/analyze/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: BYOK AI analysis proxy that does not store user provider keys.
 */
import { ZodError } from "zod";

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
} from "@/features/assessment/schemas/assessment";
import { apiError, jsonResponse, zodErrorDetail } from "@/lib/api/responses";
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

async function callOpenAi(input: {
  apiKey: string;
  model: string;
  prompt: string;
}): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${input.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: input.model,
      input: input.prompt,
      max_output_tokens: 1200,
      store: false,
    }),
  });

  if (!response.ok) {
    return `Provider request failed with ${response.status}.`;
  }

  const payload: unknown = await response.json();
  return extractOpenAiText(payload) || "The provider returned no text output.";
}

async function callAnthropic(input: {
  apiKey: string;
  model: string;
  prompt: string;
}): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "x-api-key": input.apiKey,
    },
    body: JSON.stringify({
      model: input.model,
      max_tokens: 1200,
      messages: [{ role: "user", content: input.prompt }],
    }),
  });

  if (!response.ok) {
    return `Provider request failed with ${response.status}.`;
  }

  const payload: unknown = await response.json();
  return (
    extractAnthropicText(payload) || "The provider returned no text output."
  );
}

export async function POST(request: Request) {
  try {
    const env = getServerEnv();

    if (!env.AI_ANALYSIS_ENABLED) {
      return apiError(403, "AI analysis is disabled.");
    }

    const limit = await rateLimit({
      key: `ai-analysis:${clientKey(request)}`,
      limit: env.AI_ANALYSIS_RATE_LIMIT,
      windowSeconds: env.AI_ANALYSIS_RATE_WINDOW_SECONDS,
      env,
    });

    if (!limit.allowed) {
      return apiError(
        429,
        "AI analysis rate limit exceeded.",
        `Try again after ${new Date(limit.resetAt).toISOString()}.`,
      );
    }

    const input = aiAnalysisRequestSchema.parse(await request.json());
    const repository = createAssessmentSubmissionRepository();
    const rows = toPublicDatasetRows(
      await repository.listPublicDatasetEligible(),
    );
    const threshold = applySmallCellSuppression(rows, env.PUBLIC_DATASET_MIN_N);

    if (threshold.suppressed) {
      return apiError(
        403,
        "Public dataset threshold has not been met.",
        `Current public row count is ${threshold.rowCount}; minimum is ${threshold.minGroupSize}.`,
      );
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
    const analysis =
      input.provider === "openai"
        ? await callOpenAi({
            apiKey: input.apiKey,
            model: input.model,
            prompt,
          })
        : await callAnthropic({
            apiKey: input.apiKey,
            model: input.model,
            prompt,
          });

    return jsonResponse(
      aiAnalysisResponseSchema.parse({
        provider: input.provider,
        model: input.model,
        rowCount: threshold.rowCount,
        analysis,
      }),
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError(
        400,
        "Invalid AI analysis request.",
        zodErrorDetail(error),
      );
    }

    if (error instanceof Error) {
      if (error.name === "MongoConfigurationError") {
        return apiError(503, error.message);
      }

      return apiError(500, "AI analysis failed.", error.message);
    }

    return apiError(500, "AI analysis failed.");
  }
}
