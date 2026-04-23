"use client";

/**
 * File: src/features/assessment/components/assessment-form.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Client-side consent, context, 54-item assessment, and submit flow.
 */
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { apiRoutes } from "@/config/routes";
import {
  CONSENT_VERSION,
  items,
  scaleKeys,
  scales,
} from "@/features/assessment/application/model";
import { respondentContextFields } from "@/features/assessment/application/respondent-context";
import {
  answerValues,
  defaultRespondentContext,
  submitAssessmentResponseSchema,
  submitAssessmentSchema,
  type AnswerMap,
  type AnswerValue,
  type Consent,
  type RespondentContext,
  type ScaleKey,
} from "@/features/assessment/schemas/assessment";

const groupedItems = scaleKeys.map((scaleKey) => ({
  scale: scales[scaleKey],
  items: items.filter((item) => item.scale === scaleKey),
}));

function labelFromValue(value: string): string {
  return value
    .split("_")
    .map((part) =>
      part.length <= 2 || /^\d/.test(part)
        ? part.toUpperCase()
        : `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`,
    )
    .join(" ");
}

function scaleCompletion(
  answers: Partial<AnswerMap>,
  scaleKey: ScaleKey,
): number {
  const scaleItems = items.filter((item) => item.scale === scaleKey);
  const answered = scaleItems.filter((item) => answers[item.id] !== undefined);

  return Math.round((answered.length / scaleItems.length) * 100);
}

export function AssessmentForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Partial<AnswerMap>>({});
  const [context, setContext] = useState<RespondentContext>(
    defaultRespondentContext,
  );
  const [useBoundaryAccepted, setUseBoundaryAccepted] = useState(false);
  const [assessmentProcessing, setAssessmentProcessing] = useState(false);
  const [researchStorage, setResearchStorage] = useState(false);
  const [publicDataset, setPublicDataset] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const completion = Math.round((answeredCount / items.length) * 100);
  const isComplete = answeredCount === items.length;

  const consent = useMemo<Consent | null>(() => {
    if (!useBoundaryAccepted || !assessmentProcessing) {
      return null;
    }

    return {
      useBoundaryAccepted,
      assessmentProcessing,
      researchStorage,
      publicDataset,
      consentVersion: CONSENT_VERSION,
    };
  }, [
    assessmentProcessing,
    publicDataset,
    researchStorage,
    useBoundaryAccepted,
  ]);

  function updateAnswer(itemId: string, value: AnswerValue): void {
    setAnswers((current) => ({ ...current, [itemId]: value }));
  }

  function updateContext(
    key: (typeof respondentContextFields)[number]["key"],
    value: string,
  ): void {
    setContext((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!consent) {
      setError("Please accept the use boundary and processing consent.");
      return;
    }

    if (!isComplete) {
      setError(`Please answer all ${items.length} items before submitting.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = submitAssessmentSchema.parse({
        consent,
        context,
        answers,
      });
      const response = await fetch(apiRoutes.submit, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: unknown = await response.json();

      if (!response.ok) {
        const detail =
          data && typeof data === "object" && "detail" in data
            ? String(data.detail)
            : "Submission failed.";
        throw new Error(detail);
      }

      const parsed = submitAssessmentResponseSchema.parse(data);
      router.push(parsed.resultUrl);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Submission failed.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form className="assessment-shell" onSubmit={handleSubmit}>
      <aside className="progress-rail" aria-label="Assessment progress">
        <span className="panel-label">Completion</span>
        <strong className="progress-number">{completion}%</strong>
        <p>
          {answeredCount} of {items.length} items answered.
        </p>
        <div className="scale-list">
          {scaleKeys.map((scaleKey) => (
            <div key={scaleKey} className="score-bar" data-tone="science">
              <div className="score-bar__head">
                <span>{scales[scaleKey].shortName}</span>
                <strong>{scaleCompletion(answers, scaleKey)}%</strong>
              </div>
              <div className="score-bar__track" aria-hidden="true">
                <span
                  style={{ width: `${scaleCompletion(answers, scaleKey)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="form-stack">
        <section className="form-section">
          <div className="form-section__head">
            <p className="panel-label">Consent and use boundary</p>
            <h2>Before you start</h2>
          </div>
          <div className="form-section__body">
            <label className="check-row">
              <input
                checked={useBoundaryAccepted}
                onChange={(event) =>
                  setUseBoundaryAccepted(event.target.checked)
                }
                type="checkbox"
              />
              <span>
                I understand this is developmental and research-informed only,
                not validated for hiring, promotion, diagnosis, redundancy, or
                high-stakes decisions.
              </span>
            </label>
            <label className="check-row">
              <input
                checked={assessmentProcessing}
                onChange={(event) =>
                  setAssessmentProcessing(event.target.checked)
                }
                type="checkbox"
              />
              <span>
                I consent to processing my answers so AssessmentOptima can
                generate and store my private result report.
              </span>
            </label>
            <label className="check-row">
              <input
                checked={researchStorage}
                onChange={(event) => setResearchStorage(event.target.checked)}
                type="checkbox"
              />
              <span>
                I consent to my non-identifying scale scores being retained for
                research analysis.
              </span>
            </label>
            <label className="check-row">
              <input
                checked={publicDataset}
                disabled={!researchStorage}
                onChange={(event) => setPublicDataset(event.target.checked)}
                type="checkbox"
              />
              <span>
                I consent to my anonymised scale-level record being included in
                the public dataset if threshold rules are met.
              </span>
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section__head">
            <p className="panel-label">Optional context</p>
            <h2>Research buckets</h2>
          </div>
          <div className="form-section__body">
            <div className="field-grid">
              {respondentContextFields.map((field) => (
                <div className="field" key={field.key}>
                  <label>
                    {field.label}
                    <select
                      value={
                        context[field.key] ??
                        defaultRespondentContext[field.key]
                      }
                      onChange={(event) =>
                        updateContext(field.key, event.target.value)
                      }
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {labelFromValue(option)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </section>

        {groupedItems.map((group) => (
          <section className="scale-section" key={group.scale.key}>
            <div className="scale-section__head">
              <p className="panel-label">{group.scale.shortName}</p>
              <h2>{group.scale.name}</h2>
              <p>{group.scale.description}</p>
            </div>
            <div className="scale-section__body">
              {group.items.map((item) => (
                <div className="item-row" key={item.id}>
                  <p>
                    <strong className="mono">{item.id}</strong> {item.text}
                  </p>
                  <div className="likert" aria-label={`${item.id} rating`}>
                    {answerValues.map((value) => (
                      <label key={value} title={`${value} out of 5`}>
                        <input
                          checked={answers[item.id] === value}
                          name={item.id}
                          onChange={() => updateAnswer(item.id, value)}
                          type="radio"
                          value={value}
                        />
                        <span>{value}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {error ? <div className="form-error">{error}</div> : null}

        <div className="action-row">
          <button
            className="button"
            disabled={!consent || !isComplete || isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <Loader2 size={18} aria-hidden="true" />
            ) : (
              <ArrowRight size={18} aria-hidden="true" />
            )}
            Generate my report
          </button>
        </div>
      </div>
    </form>
  );
}
