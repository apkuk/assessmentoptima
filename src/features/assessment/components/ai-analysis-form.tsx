"use client";

/**
 * File: src/features/assessment/components/ai-analysis-form.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: BYOK AI analysis form with provider-aware model, reasoning, verbosity, and thinking controls.
 */
import { useMemo, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

import { apiRoutes } from "@/config/routes";
import { aiProviderModelDefaults } from "@/features/assessment/application/ai-analysis";
import {
  aiAnalysisRequestSchema,
  aiAnalysisResponseSchema,
  aiAnalysisTypes,
  aiProviders,
  anthropicModels,
  anthropicThinkingEfforts,
  openaiModels,
  openaiReasoningEfforts,
  openaiVerbosities,
  type AiAnalysisResponse,
  type AiAnalysisRequest,
} from "@/features/assessment/schemas/assessment";
import {
  formatClientApiError,
  logClientApiError,
  parseClientApiError,
} from "@/lib/api/client-errors";

type Provider = AiAnalysisRequest["provider"];
type OpenAiReasoningEffort = (typeof openaiReasoningEfforts)[number];
type OpenAiVerbosity = (typeof openaiVerbosities)[number];
type AnthropicThinkingEffort = (typeof anthropicThinkingEfforts)[number];

const providerLabels: Record<Provider, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
};

const analysisTypeLabels: Record<AiAnalysisRequest["analysisType"], string> = {
  summarise_dataset: "Summarise the dataset",
  compare_segments: "Compare segments",
  interesting_patterns: "Find interesting patterns",
  research_hypotheses: "Generate research hypotheses",
  methodology_critique: "Critique the methodology",
};

const reasoningLabels: Record<OpenAiReasoningEffort, string> = {
  none: "None (fastest)",
  low: "Low",
  medium: "Medium",
  high: "High (deepest)",
  xhigh: "Extra high",
};

const verbosityLabels: Record<OpenAiVerbosity, string> = {
  low: "Low (terse)",
  medium: "Medium",
  high: "High (long-form)",
};

const thinkingLabels: Record<AnthropicThinkingEffort, string> = {
  off: "Off",
  low: "Low",
  medium: "Medium",
  high: "High",
};

function formatTokenCount(value: number | null): string {
  return value === null ? "Not returned" : value.toLocaleString("en-GB");
}

function formatEstimatedCost(value: number | null): string {
  if (value === null) {
    return "Not estimated";
  }

  return value < 0.01 ? `$${value.toFixed(6)}` : `$${value.toFixed(4)}`;
}

function formatLatency(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}s` : `${value}ms`;
}

function formatModelTokens(value: number): string {
  return value >= 1_000_000
    ? `${(value / 1_000_000).toFixed(0)}M`
    : `${(value / 1_000).toFixed(0)}K`;
}

function openAiModelHint(model: (typeof openaiModels)[number]): string {
  const pricing = model.pricingUsdPerMillionTokens;

  return [
    model.description,
    `Latency: ${model.latency}.`,
    `Pricing: $${pricing.input}/$${pricing.output} per 1M input/output tokens.`,
    `Context: ${formatModelTokens(model.contextWindowTokens)}; max output: ${formatModelTokens(model.maxOutputTokens)}.`,
  ].join(" ");
}

export function AiAnalysisForm() {
  const [provider, setProvider] = useState<Provider>("openai");
  const [apiKey, setApiKey] = useState("");
  const [openaiModel, setOpenaiModel] = useState<string>(
    aiProviderModelDefaults.openai,
  );
  const [anthropicModel, setAnthropicModel] = useState<string>(
    aiProviderModelDefaults.anthropic,
  );
  const [reasoningEffort, setReasoningEffort] =
    useState<OpenAiReasoningEffort>("low");
  const [verbosity, setVerbosity] = useState<OpenAiVerbosity>("medium");
  const [thinkingEffort, setThinkingEffort] =
    useState<AnthropicThinkingEffort>("off");
  const [analysisType, setAnalysisType] =
    useState<AiAnalysisRequest["analysisType"]>("summarise_dataset");
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [usage, setUsage] = useState<AiAnalysisResponse["usage"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeOpenAiModel = useMemo(
    () => openaiModels.find((model) => model.id === openaiModel),
    [openaiModel],
  );
  const activeAnthropicModel = useMemo(
    () => anthropicModels.find((model) => model.id === anthropicModel),
    [anthropicModel],
  );
  const anthropicThinkingSupported =
    activeAnthropicModel?.supportsExplicitThinking ?? false;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setAnalysis("");
    setUsage(null);
    setIsSubmitting(true);

    try {
      const rawRequest =
        provider === "openai"
          ? {
              provider: "openai" as const,
              apiKey,
              model: openaiModel,
              analysisType,
              question: question || undefined,
              reasoningEffort,
              verbosity,
            }
          : {
              provider: "anthropic" as const,
              apiKey,
              model: anthropicModel,
              analysisType,
              question: question || undefined,
              thinkingEffort: anthropicThinkingSupported
                ? thinkingEffort
                : "off",
            };

      const payload = aiAnalysisRequestSchema.parse(rawRequest);
      const response = await fetch(apiRoutes.aiAnalyze, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: unknown = await response.json();

      if (!response.ok) {
        const apiFailure = parseClientApiError({
          fallbackMessage: "AI analysis failed.",
          payload: data,
          status: response.status,
        });

        logClientApiError({
          event: "ai_analysis.submit_failed",
          error: apiFailure,
          context: { analysisType, provider },
        });

        throw new Error(formatClientApiError(apiFailure));
      }

      const parsed = aiAnalysisResponseSchema.parse(data);
      setAnalysis(parsed.analysis);
      setUsage(parsed.usage);
    } catch (analysisError) {
      setError(
        analysisError instanceof Error
          ? analysisError.message
          : "AI analysis failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="dataset-grid">
      <form className="panel form-stack" onSubmit={handleSubmit}>
        <div>
          <p className="panel-label">Bring your own key</p>
          <h2>Run a guarded analysis</h2>
          <p>
            Your provider key is sent to the AssessmentOptima server and
            forwarded to your chosen provider for this request only. The app
            does not store it, log it, or keep it in localStorage.
          </p>
        </div>

        <div className="field-grid">
          <div className="field">
            <label>
              Provider
              <select
                value={provider}
                onChange={(event) => {
                  const next = event.target.value as Provider;
                  setProvider(next);
                }}
              >
                {aiProviders.map((option) => (
                  <option key={option} value={option}>
                    {providerLabels[option]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="field">
            <label>
              Model
              {provider === "openai" ? (
                <select
                  value={openaiModel}
                  onChange={(event) => setOpenaiModel(event.target.value)}
                >
                  {openaiModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.label}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  value={anthropicModel}
                  onChange={(event) => setAnthropicModel(event.target.value)}
                >
                  {anthropicModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.label}
                    </option>
                  ))}
                </select>
              )}
            </label>
            <p className="field-hint">
              {provider === "openai"
                ? activeOpenAiModel
                  ? openAiModelHint(activeOpenAiModel)
                  : ""
                : (activeAnthropicModel?.description ?? "")}
            </p>
          </div>
        </div>

        {provider === "openai" ? (
          <div className="field-grid">
            <div className="field">
              <label>
                Reasoning effort
                <select
                  value={reasoningEffort}
                  onChange={(event) =>
                    setReasoningEffort(
                      event.target.value as OpenAiReasoningEffort,
                    )
                  }
                >
                  {openaiReasoningEfforts.map((option) => (
                    <option key={option} value={option}>
                      {reasoningLabels[option]}
                    </option>
                  ))}
                </select>
              </label>
              <p className="field-hint">
                Controls how much internal reasoning the model does before
                answering. More reasoning costs more tokens.
              </p>
            </div>
            <div className="field">
              <label>
                Verbosity
                <select
                  value={verbosity}
                  onChange={(event) =>
                    setVerbosity(event.target.value as OpenAiVerbosity)
                  }
                >
                  {openaiVerbosities.map((option) => (
                    <option key={option} value={option}>
                      {verbosityLabels[option]}
                    </option>
                  ))}
                </select>
              </label>
              <p className="field-hint">
                Controls the length and detail of the written answer.
              </p>
            </div>
          </div>
        ) : (
          <div className="field">
            <label>
              Extended thinking
              <select
                disabled={!anthropicThinkingSupported}
                value={anthropicThinkingSupported ? thinkingEffort : "off"}
                onChange={(event) =>
                  setThinkingEffort(
                    event.target.value as AnthropicThinkingEffort,
                  )
                }
              >
                {anthropicThinkingEfforts.map((option) => (
                  <option key={option} value={option}>
                    {thinkingLabels[option]}
                  </option>
                ))}
              </select>
            </label>
            <p className="field-hint">
              {anthropicThinkingSupported
                ? "Gives the model a larger thinking budget before it answers. Uses extra tokens from your account."
                : activeAnthropicModel?.id === "claude-opus-4-7"
                  ? "Opus 4.7 thinks adaptively on its own — no manual setting needed."
                  : "This model does not support extended thinking."}
            </p>
          </div>
        )}

        <div className="field">
          <label>
            API key
            <input
              autoComplete="off"
              onChange={(event) => setApiKey(event.target.value)}
              placeholder="Paste a provider key for this request"
              type="password"
              value={apiKey}
            />
          </label>
        </div>

        <div className="field">
          <label>
            Analysis type
            <select
              value={analysisType}
              onChange={(event) =>
                setAnalysisType(
                  event.target.value as AiAnalysisRequest["analysisType"],
                )
              }
            >
              {aiAnalysisTypes.map((option) => (
                <option key={option} value={option}>
                  {analysisTypeLabels[option]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="field">
          <label>
            Optional question
            <textarea
              maxLength={1000}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="e.g. Are there meaningful differences between the three operating systems?"
              value={question}
            />
          </label>
        </div>

        {error ? (
          <div className="form-error" role="alert">
            {error}
          </div>
        ) : null}

        <button
          className="button"
          disabled={isSubmitting || !apiKey}
          type="submit"
        >
          {isSubmitting ? (
            <Loader2 size={18} aria-hidden="true" />
          ) : (
            <Sparkles size={18} aria-hidden="true" />
          )}
          Analyse dataset
        </button>
      </form>

      <div className="dataset-card">
        <p className="panel-label">Output</p>
        {analysis ? (
          <>
            {usage ? (
              <div className="usage-grid" aria-label="Provider usage summary">
                <div>
                  <span>Input tokens</span>
                  <strong>{formatTokenCount(usage.inputTokens)}</strong>
                </div>
                <div>
                  <span>Output tokens</span>
                  <strong>{formatTokenCount(usage.outputTokens)}</strong>
                </div>
                <div>
                  <span>Latency</span>
                  <strong>{formatLatency(usage.latencyMs)}</strong>
                </div>
                <div>
                  <span>Estimated cost</span>
                  <strong>{formatEstimatedCost(usage.estimatedCostUsd)}</strong>
                </div>
              </div>
            ) : null}
            <div className="markdown-output">{analysis}</div>
            {usage ? <p className="field-hint">{usage.costNote}</p> : null}
          </>
        ) : (
          <p>
            The public dataset is currently threshold-protected. Results will
            appear here once the release threshold is met and your provider
            request completes.
          </p>
        )}
      </div>
    </section>
  );
}
