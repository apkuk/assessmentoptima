/**
 * File: src/app/results/[token]/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Private respondent report page rendered from a result token.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

import { RadarChart } from "@/components/radar-chart";
import { ScoreBar } from "@/components/score-bar";
import { routes } from "@/config/routes";
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import {
  calculateDatasetComparison,
  toPublicDatasetRows,
} from "@/features/assessment/application/public-dataset";
import { parseStatelessResultToken } from "@/features/assessment/application/stateless-result-token";
import { scaleKeys, scales } from "@/features/assessment/application/model";
import { ResultActions } from "@/features/assessment/components/result-actions";
import {
  type AssessmentResultResponse,
  resultTokenSchema,
} from "@/features/assessment/schemas/assessment";
import { getServerEnv } from "@/lib/env/server";
import { hashResultToken, resolveHashSecret } from "@/lib/security/tokens";

export const dynamic = "force-dynamic";

interface ResultPageProps {
  params: Promise<{ token: string }>;
}

async function getResultRecord(
  token: string,
): Promise<AssessmentResultResponse | null> {
  const env = getServerEnv();
  const parsedToken = resultTokenSchema.parse(token);
  const hashSecret = resolveHashSecret(env.HASH_SECRET);
  const statelessResult = parseStatelessResultToken(parsedToken, hashSecret);

  if (statelessResult) {
    return statelessResult;
  }

  const repository = createAssessmentSubmissionRepository();
  const submission = await repository.findByViewTokenHash(
    hashResultToken(parsedToken, hashSecret),
  );

  if (!submission) {
    return null;
  }

  return {
    assessmentVersion: submission.assessmentVersion,
    createdMonth: submission.createdMonth,
    context: submission.context,
    result: submission.result,
    publicDatasetEligible: submission.publicDatasetEligible,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Private AssessmentOptima Result";
  const description =
    "A private WorkStyle Compass result. Public sharing uses archetype-only pages.";

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { token } = await params;
  const record = await getResultRecord(token).catch(() => null);

  if (!record) {
    notFound();
  }

  const { result } = record;
  const env = getServerEnv();
  const repository = createAssessmentSubmissionRepository();
  const publicRows = await repository
    .listPublicDatasetEligible()
    .then(toPublicDatasetRows)
    .catch(() => []);
  const comparison = calculateDatasetComparison({
    result,
    rows: publicRows,
    minGroupSize: env.PUBLIC_DATASET_MIN_N,
  });
  const privateReportUrl = new URL(
    routes.result(token),
    env.NEXT_PUBLIC_APP_URL,
  ).toString();
  const publicShareUrl = new URL(
    routes.archetype(result.archetype.id),
    env.NEXT_PUBLIC_APP_URL,
  ).toString();

  return (
    <main className="page">
      <section className="report-hero">
        <div>
          <p className="eyebrow">Private report</p>
          <h1 className="page-title">Your WorkStyle profile</h1>
          <p className="lede">
            This is a developmental interpretation, not a verdict. Use it to
            name likely strengths, pressure patterns, and experiments to test in
            real work.
          </p>
        </div>
        <aside className="archetype-panel">
          <p className="panel-label">Archetype</p>
          <h2>{result.archetype.name}</h2>
          <p>{result.archetype.summary}</p>
          <div className="tag-list">
            {result.topScales.map((scaleKey) => (
              <span className="tag" key={scaleKey}>
                {scales[scaleKey].shortName}
              </span>
            ))}
          </div>
          <ResultActions
            archetypeName={result.archetype.name}
            privateReportUrl={privateReportUrl}
            publicShareUrl={publicShareUrl}
            viewToken={token}
          />
        </aside>
      </section>

      <section className="report-grid">
        <div className="report-card">
          <p className="panel-label">Scale radar</p>
          <RadarChart order={scaleKeys} scores={result.scores} />
        </div>

        <div className="report-card">
          <p className="panel-label">Current public sample comparison</p>
          {comparison.suppressed ? (
            <p>
              Current-sample comparison unlocks when at least{" "}
              {comparison.minGroupSize} public rows exist. Current public row
              count: {comparison.rowCount}.
            </p>
          ) : (
            <div className="tag-list">
              {result.topScales.map((scaleKey) => (
                <span className="tag tag-large" key={scaleKey}>
                  {scales[scaleKey].shortName}: higher than{" "}
                  {comparison.currentSampleComparisonByScale[scaleKey] ?? 0}%
                </span>
              ))}
            </div>
          )}
          <p>
            Sample n={comparison.rowCount}. This is a self-selected current
            sample, not a representative norm.
          </p>
        </div>
      </section>

      <section className="report-grid">
        <div className="report-card">
          <p className="panel-label">Scale scores</p>
          <div className="scale-list">
            {scaleKeys.map((scaleKey, index) => (
              <ScoreBar
                key={scaleKey}
                label={result.scores[scaleKey].name}
                tone={
                  index % 3 === 0
                    ? "brand"
                    : index % 3 === 1
                      ? "science"
                      : "motive"
                }
                value={result.scores[scaleKey].score}
              />
            ))}
          </div>
        </div>

        <div className="report-card">
          <p className="panel-label">30-day experiment</p>
          <h2>Make it observable</h2>
          <p>{result.experiment}</p>
          <p>
            AI-Augmented Judgement is treated as a dynamic work-practice domain,
            not a fixed personality trait.
          </p>
          <p className="panel-label">Dataset status</p>
          <p>
            {record.publicDatasetEligible
              ? "Your anonymised scale-level row is eligible for the public dataset once release thresholds are met."
              : "Your result is private to this token and is not eligible for public dataset export."}
          </p>
        </div>
      </section>

      <section className="content-grid section">
        <div className="panel">
          <CheckCircle2 aria-hidden="true" />
          <h2>Likely strengths</h2>
          {result.strengths.map((strength) => (
            <p key={strength}>{strength}</p>
          ))}
        </div>
        <div className="panel">
          <Lightbulb aria-hidden="true" />
          <h2>Development edges</h2>
          {result.developmentEdges.map((edge) => (
            <p key={edge}>{edge}</p>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <div className="callout" data-tone="pressure">
          <AlertTriangle aria-hidden="true" />
          <h2>Pressure pattern risks</h2>
          {result.pressureFlags.length > 0 ? (
            result.pressureFlags.map((flag) => (
              <p key={flag.itemId}>
                <strong>{scales[flag.scale].shortName}:</strong> {flag.message}
              </p>
            ))
          ) : (
            <p>
              No high pressure-pattern flags were triggered. Still look for
              situations where a strength becomes overused.
            </p>
          )}
        </div>
        <div className="callout" data-tone="science">
          <h2>Reflection prompts</h2>
          {result.reflectionPrompts.map((prompt) => (
            <p key={prompt}>{prompt}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
