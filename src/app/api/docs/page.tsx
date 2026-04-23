/**
 * File: src/app/api/docs/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Public API documentation for dataset and aggregate endpoints.
 */
import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { apiRoutes } from "@/config/routes";

export const metadata: Metadata = {
  title: "API Docs",
};

const exampleOrigin = "https://your-domain.vercel.app";

const examples = [
  {
    title: "Health check",
    command: `curl ${exampleOrigin}${apiRoutes.health}`,
  },
  {
    title: "Aggregate dashboard data",
    command: `curl ${exampleOrigin}${apiRoutes.aggregates}`,
  },
  {
    title: "Dataset as JSON",
    command: `curl ${exampleOrigin}${apiRoutes.datasetJson}`,
  },
  {
    title: "Dataset as CSV",
    command: `curl -L ${exampleOrigin}${apiRoutes.datasetCsv} -o ${appConfig.publicDatasetFilename}`,
  },
  {
    title: "Data dictionary",
    command: `curl ${exampleOrigin}${apiRoutes.datasetDictionaryJson}`,
  },
];

export default function ApiDocsPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Research API</p>
        <h1 className="page-title">API docs</h1>
        <p className="lede">
          Public endpoints expose aggregate and anonymised scale-level data once
          small-cell thresholds are met. Private result endpoints require the
          respondent&apos;s unguessable token.
        </p>
      </section>

      <section className="content-grid">
        {examples.map((example) => (
          <article className="panel" key={example.title}>
            <p className="panel-label">{example.title}</p>
            <pre className="code-block">
              <code>{example.command}</code>
            </pre>
          </article>
        ))}
      </section>
    </main>
  );
}
