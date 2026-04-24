/**
 * File: src/app/dataset/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public dataset dashboard with exports and aggregate signals.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";

import { ScoreBar } from "@/components/score-bar";
import { CodeBlock } from "@/components/ui/code-block";
import { PageImage } from "@/components/ui/page-media";
import { appConfig, citations } from "@/config/app";
import { apiRoutes, routes } from "@/config/routes";
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import {
  calculateAggregates,
  toPublicDatasetRows,
} from "@/features/assessment/application/public-dataset";
import { calculateReliabilitySnapshot } from "@/features/assessment/application/reliability";
import { scaleKeys, scales } from "@/features/assessment/application/model";
import { getServerEnv } from "@/lib/env/server";
import { isMongoConnectivityError } from "@/lib/mongo/client";
import { logger } from "@/lib/observability/logger";

export const metadata: Metadata = {
  title: "WorkStyle Compass Public Dataset",
};

export const dynamic = "force-dynamic";

function SuppressedScaleList() {
  return (
    <div className="suppressed-list">
      {scaleKeys.map((scaleKey) => (
        <div className="suppressed-row" key={scaleKey}>
          <span>{scales[scaleKey].name}</span>
          <strong>Locked</strong>
        </div>
      ))}
    </div>
  );
}

async function getDatasetState() {
  try {
    const env = getServerEnv();
    const repository = createAssessmentSubmissionRepository();
    const submissions = await repository.listPublicDatasetEligible();
    const rows = toPublicDatasetRows(submissions);
    const aggregates = calculateAggregates(rows, env.PUBLIC_DATASET_MIN_N);
    const reliability = calculateReliabilitySnapshot(
      submissions,
      appConfig.reliabilityMinRespondents,
    );

    return { rows, aggregates, reliability, error: null };
  } catch (error) {
    logger.error({
      event: "page.dataset_load_failed",
      route: "/dataset",
      message: "Dataset page could not load live public dataset state.",
      error,
    });

    return {
      rows: [],
      aggregates: calculateAggregates([], 10),
      reliability: calculateReliabilitySnapshot(
        [],
        appConfig.reliabilityMinRespondents,
      ),
      error: isMongoConnectivityError(error)
        ? "The open dataset is still warming up. Private reports work already; public exports unlock when enough opted-in responses are available and live storage is ready."
        : error instanceof Error
          ? "Dataset is temporarily unavailable."
          : "Dataset is temporarily unavailable.",
    };
  }
}

export default async function DatasetPage() {
  const { rows, aggregates, reliability, error } = await getDatasetState();
  const exportsAvailable = !error && !aggregates.suppressed;

  return (
    <main className="page">
      <section className="hero" data-layout="two">
        <div className="hero-copy">
          <p className="eyebrow">Open dataset</p>
          <h1>WorkStyle Compass public dataset</h1>
          <p className="lede">
            An anonymised, score-level dataset for exploratory research. Public
            exports and aggregate views unlock only after the release threshold
            is met.
          </p>
          <div className="action-row">
            {exportsAvailable ? (
              <>
                <Link className="button" href={apiRoutes.datasetCsv}>
                  <Download size={18} aria-hidden="true" />
                  CSV export
                </Link>
                <Link className="button-secondary" href={apiRoutes.datasetJson}>
                  JSON export
                </Link>
              </>
            ) : (
              <>
                <button className="button" disabled type="button">
                  <Download size={18} aria-hidden="true" />
                  CSV export locked
                </button>
                <button className="button-secondary" disabled type="button">
                  JSON export locked
                </button>
              </>
            )}
            <Link className="button-ghost" href={routes.datasetDictionary}>
              Data dictionary
            </Link>
          </div>
        </div>

        <PageImage
          alt="An anonymised data observatory visual with grouped score dots, distribution bands, and privacy-preserving aggregate cells."
          aspect="landscape"
          priority
          src="/images/dataset-page.png"
        >
          <p className="panel-label">Release status</p>
          <strong>
            {aggregates.suppressed ? "Threshold protected" : "Exports open"}
          </strong>
        </PageImage>
      </section>

      <section className="metric-grid">
        <div className="metric">
          <span>Eligible rows</span>
          <strong>{rows.length}</strong>
          <p>Respondents who opted into research and public release.</p>
        </div>
        <div className="metric">
          <span>Release threshold</span>
          <strong>{aggregates.minGroupSize}</strong>
          <p>Minimum rows required before public exports are exposed.</p>
        </div>
        <div className="metric">
          <span>Status</span>
          <strong>{aggregates.suppressed ? "Hold" : "Open"}</strong>
          <p>
            {aggregates.suppressed
              ? "Small-cell protection is active."
              : "Dataset threshold met."}
          </p>
        </div>
      </section>

      {error ? (
        <section className="section">
          <div className="form-error" role="alert">
            {error}
          </div>
        </section>
      ) : null}

      <section className="dataset-grid section">
        <div className="dataset-card">
          <p className="panel-label">Scale averages</p>
          {aggregates.suppressed ? (
            <>
              <p>
                Averages are hidden until at least {aggregates.minGroupSize}
                opted-in public rows are available. Current eligible rows:{" "}
                {aggregates.rowCount}.
              </p>
              <SuppressedScaleList />
            </>
          ) : (
            <div className="scale-list">
              {scaleKeys.map((scaleKey, index) => (
                <ScoreBar
                  key={scaleKey}
                  label={scales[scaleKey].name}
                  tone={index % 2 === 0 ? "brand" : "science"}
                  value={aggregates.averageByScale[scaleKey] ?? 0}
                />
              ))}
            </div>
          )}
        </div>
        <div className="dataset-card">
          <p className="panel-label">Archetypes</p>
          {Object.keys(aggregates.archetypeCounts).length > 0 ? (
            <div className="archetype-distribution">
              {Object.entries(aggregates.archetypeCounts).map(
                ([name, count]) => {
                  const share =
                    rows.length > 0
                      ? Math.round((count / rows.length) * 100)
                      : 0;

                  return (
                    <div className="archetype-distribution__row" key={name}>
                      <div className="archetype-distribution__head">
                        <span>{name}</span>
                        <strong>{count}</strong>
                      </div>
                      <div
                        aria-label={`${name}: ${count} respondents, ${share}% of eligible rows`}
                        className="archetype-distribution__track"
                        role="img"
                      >
                        <span style={{ width: `${share}%` }} />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          ) : (
            <p>
              Archetype distribution will appear after the release threshold.
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="dataset-card">
          <p className="panel-label">Internal consistency snapshot</p>
          <h2>Reliability, once the sample is credible</h2>
          {reliability.suppressed ? (
            <p>
              Cronbach&apos;s alpha is held back until at least{" "}
              {reliability.minGroupSize} opted-in public rows have been
              contributed. We currently have {reliability.rowCount}.
            </p>
          ) : (
            <div className="scale-list">
              {reliability.scales.map((snapshot) => (
                <div className="score-bar" key={snapshot.scale}>
                  <div className="score-bar__head">
                    <span>{snapshot.label}</span>
                    <strong>
                      {snapshot.cronbachAlpha === null
                        ? "n/a"
                        : snapshot.cronbachAlpha.toFixed(2)}
                    </strong>
                  </div>
                  <div className="score-bar__track" aria-hidden="true">
                    <span
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, (snapshot.cronbachAlpha ?? 0) * 100),
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <p>
            This is early descriptive evidence, not validation. Alpha is
            recomputed from publicly consented records only after the higher
            reliability threshold is met.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <div className="callout" data-tone="science">
          <h2>Cite this assessment</h2>
          <p>
            If you reference {appConfig.assessmentName} in research, teaching,
            or writing, please cite it in the form below.
          </p>
          <CodeBlock label="BibTeX citation for the WorkStyle Compass assessment">
            {citations.assessment}
          </CodeBlock>
        </div>
        <div className="callout">
          <h2>Cite this dataset</h2>
          <p>
            A formal DOI will be registered once the public release threshold is
            met. Until then, use the placeholder below and link back to the
            dataset page so citations can be updated.
          </p>
          <CodeBlock label="Dataset DOI placeholder">
            {`DOI: ${appConfig.datasetDoiPlaceholder}`}
          </CodeBlock>
        </div>
      </section>
    </main>
  );
}
