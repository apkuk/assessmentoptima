"use client";

/**
 * File: src/features/assessment/components/ai-analysis-form.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: BYOK AI analysis form for synthesising the public dataset.
 */
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

import { apiRoutes } from "@/config/routes";
import { aiProviderModelDefaults } from "@/features/assessment/application/ai-analysis";
import {
  aiAnalysisRequestSchema,
  aiAnalysisTypes,
  aiProviders,
  type AiAnalysisRequest,
} from "@/features/assessment/schemas/assessment";

function labelFromValue(value: string): string {
  return value
    .split("_")
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");
}

export function AiAnalysisForm() {
  const [provider, setProvider] =
    useState<AiAnalysisRequest["provider"]>("openai");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState<string>(aiProviderModelDefaults.openai);
  const [analysisType, setAnalysisType] =
    useState<AiAnalysisRequest["analysisType"]>("summarise_dataset");
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setAnalysis("");
    setIsSubmitting(true);

    try {
      const payload = aiAnalysisRequestSchema.parse({
        provider,
        apiKey,
        model,
        analysisType,
        question: question || undefined,
      });
      const response = await fetch(apiRoutes.aiAnalyze, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: unknown = await response.json();

      if (!response.ok) {
        const detail =
          data && typeof data === "object" && "detail" in data
            ? String(data.detail)
            : "AI analysis failed.";
        throw new Error(detail);
      }

      if (
        data &&
        typeof data === "object" &&
        "analysis" in data &&
        typeof data.analysis === "string"
      ) {
        setAnalysis(data.analysis);
      }
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
          <h2>Run a cautious synthesis</h2>
          <p>
            Your provider key is sent to the selected provider for this request
            only. AssessmentOptima does not store it.
          </p>
        </div>

        <div className="field-grid">
          <div className="field">
            <label>
              Provider
              <select
                value={provider}
                onChange={(event) => {
                  const nextProvider = event.target
                    .value as AiAnalysisRequest["provider"];
                  setProvider(nextProvider);
                  setModel(aiProviderModelDefaults[nextProvider]);
                }}
              >
                {aiProviders.map((option) => (
                  <option key={option} value={option}>
                    {labelFromValue(option)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="field">
            <label>
              Model
              <input
                onChange={(event) => setModel(event.target.value)}
                value={model}
              />
            </label>
          </div>
        </div>

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
                  {labelFromValue(option)}
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
              value={question}
            />
          </label>
        </div>

        {error ? <div className="form-error">{error}</div> : null}

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
          Analyze dataset
        </button>
      </form>

      <aside className="dataset-card">
        <p className="panel-label">Output</p>
        {analysis ? (
          <div className="markdown-output">{analysis}</div>
        ) : (
          <p>
            Results will appear here after the public dataset reaches the
            release threshold and your provider request completes.
          </p>
        )}
      </aside>
    </section>
  );
}
