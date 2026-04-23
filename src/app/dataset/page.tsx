/**
 * File: src/app/dataset/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Public dataset dashboard with exports and aggregate signals.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";

import { ScoreBar } from "@/components/score-bar";
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

export const metadata: Metadata = {
  title: "Open Dataset",
};

export const dynamic = "force-dynamic";

async function getDatasetState() {
  try {
    const env = getServerEnv();
    const repository = createAssessmentSubmissionRepository();
    const submissions = await repository.listPublicDatasetEligible();
    const rows = toPublicDatasetRows(submissions);
    const aggregates = calculateAggregates(rows, env.PUBLIC_DATASET_MIN_N);
    const reliability = calculateReliabilitySnapshot(
      submissions,
      env.PUBLIC_DATASET_MIN_N,
    );

    return { rows, aggregates, reliability, error: null };
  } catch (error) {
    return {
      rows: [],
      aggregates: calculateAggregates([], 10),
      reliability: calculateReliabilitySnapshot([], 10),
      error: error instanceof Error ? error.message : "Dataset unavailable.",
    };
  }
}

export default async function DatasetPage() {
  const { rows, aggregates, reliability, error } = await getDatasetState();

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Open dataset</p>
        <h1 className="page-title">Public research data</h1>
        <p className="lede">
          Download anonymised, scale-level records once the public release
          threshold has been met. Until then, aggregate views remain suppressed.
        </p>
        <div className="action-row">
          <Link className="button" href={apiRoutes.datasetCsv}>
            <Download size={18} aria-hidden="true" />
            CSV export
          </Link>
          <Link className="button-secondary" href={apiRoutes.datasetJson}>
            JSON export
          </Link>
          <Link className="button-ghost" href={routes.datasetDictionary}>
            Data dictionary
          </Link>
        </div>
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
              ? "Small-cell protection active."
              : "Dataset threshold met."}
          </p>
        </div>
      </section>

      {error ? (
        <section className="section">
          <div className="form-error">{error}</div>
        </section>
      ) : null}

      <section className="dataset-grid section">
        <div className="dataset-card">
          <p className="panel-label">Scale averages</p>
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
        </div>
        <div className="dataset-card">
          <p className="panel-label">Archetypes</p>
          {Object.keys(aggregates.archetypeCounts).length > 0 ? (
            Object.entries(aggregates.archetypeCounts).map(([name, count]) => (
              <p key={name}>
                <strong>{name}:</strong> {count}
              </p>
            ))
          ) : (
            <p>
              Archetype distribution will appear after the release threshold.
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="dataset-card">
          <p className="panel-label">Reliability snapshot</p>
          <h2>Provisional internal consistency</h2>
          {reliability.suppressed ? (
            <p>
              Cronbach&apos;s alpha is suppressed until at least{" "}
              {reliability.minGroupSize} opted-in public rows exist. Current
              eligible row count: {reliability.rowCount}.
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
            This is a live research signal, not validation evidence. Alpha is
            recomputed from public-consented records and labelled provisional.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <div className="callout" data-tone="science">
          <h2>Cite this assessment</h2>
          <p className="mono">{citations.assessment}</p>
        </div>
        <div className="callout">
          <h2>Cite this dataset</h2>
          <p className="mono">
            DOI placeholder: {appConfig.datasetDoiPlaceholder}
          </p>
        </div>
      </section>
    </main>
  );
}
