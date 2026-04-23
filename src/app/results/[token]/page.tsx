/**
 * File: src/app/results/[token]/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Private respondent report page rendered from a result token.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

import { RadarChart } from "@/components/radar-chart";
import { ScoreBar } from "@/components/score-bar";
import { apiRoutes, routes } from "@/config/routes";
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import {
  calculateDatasetComparison,
  toPublicDatasetRows,
} from "@/features/assessment/application/public-dataset";
import { scaleKeys, scales } from "@/features/assessment/application/model";
import { ResultActions } from "@/features/assessment/components/result-actions";
import { resultTokenSchema } from "@/features/assessment/schemas/assessment";
import { getServerEnv } from "@/lib/env/server";
import { hashResultToken, resolveHashSecret } from "@/lib/security/tokens";

export const dynamic = "force-dynamic";

interface ResultPageProps {
  params: Promise<{ token: string }>;
}

async function getSubmission(token: string) {
  const env = getServerEnv();
  const parsedToken = resultTokenSchema.parse(token);
  const repository = createAssessmentSubmissionRepository();

  return repository.findByTokenHash(
    hashResultToken(parsedToken, resolveHashSecret(env.HASH_SECRET)),
  );
}

export async function generateMetadata({
  params,
}: ResultPageProps): Promise<Metadata> {
  const { token } = await params;
  const env = getServerEnv();
  const submission = await getSubmission(token).catch(() => null);
  const title = submission
    ? `${submission.result.archetype.name} | AssessmentOptima`
    : "AssessmentOptima Result";
  const description =
    submission?.result.archetype.summary ??
    "A private WorkStyle Compass result from AssessmentOptima.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: new URL(
            apiRoutes.resultOg(token),
            env.NEXT_PUBLIC_APP_URL,
          ).toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { token } = await params;
  const submission = await getSubmission(token).catch(() => null);

  if (!submission) {
    notFound();
  }

  const { result } = submission;
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
  const shareUrl = new URL(
    routes.result(token),
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
            token={token}
            archetypeName={result.archetype.name}
            shareUrl={shareUrl}
          />
        </aside>
      </section>

      <section className="report-grid">
        <div className="report-card">
          <p className="panel-label">Scale radar</p>
          <RadarChart order={scaleKeys} scores={result.scores} />
        </div>

        <div className="report-card">
          <p className="panel-label">You vs. the dataset</p>
          {comparison.suppressed ? (
            <p>
              Dataset comparison unlocks when at least {comparison.minGroupSize}{" "}
              public rows exist. Current public row count: {comparison.rowCount}
              .
            </p>
          ) : (
            <div className="tag-list">
              {result.topScales.map((scaleKey) => (
                <span className="tag tag-large" key={scaleKey}>
                  {scales[scaleKey].shortName}: P
                  {comparison.percentileByScale[scaleKey] ?? 0}
                </span>
              ))}
            </div>
          )}
          <p>
            Percentiles are provisional, small-cell protected, and recomputed
            from opted-in public dataset rows.
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
          <p className="panel-label">Dataset status</p>
          <p>
            {submission.publicDatasetEligible
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
