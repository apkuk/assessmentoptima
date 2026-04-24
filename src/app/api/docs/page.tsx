/**
 * File: src/app/api/docs/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public API documentation for dataset and aggregate endpoints.
 */
import type { Metadata } from "next";

import { CodeBlock } from "@/components/ui/code-block";
import {
  ContentGrid,
  PageHeader,
  PageShell,
  Surface,
} from "@/components/ui/page";
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
    <PageShell>
      <PageHeader
        eyebrow="Research API"
        title="API docs"
        lede="Public endpoints expose aggregate and anonymised score-level data once small-cell thresholds are met. Private result endpoints require the respondent's unguessable view token, and deletion additionally requires a separate management token."
      />

      <ContentGrid>
        {examples.map((example) => (
          <Surface key={example.title} label={example.title}>
            <CodeBlock label={`${example.title} curl example`}>
              {example.command}
            </CodeBlock>
          </Surface>
        ))}
      </ContentGrid>
    </PageShell>
  );
}
