/**
 * File: src/app/ai-analysis/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public BYOK AI analysis page for the anonymised dataset.
 */
import type { Metadata } from "next";

import {
  ContentGrid,
  PageHeader,
  PageShell,
  Surface,
} from "@/components/ui/page";
import { aiAnalysisPromptPolicy } from "@/features/assessment/application/ai-analysis";
import { AiAnalysisForm } from "@/features/assessment/components/ai-analysis-form";

export const metadata: Metadata = {
  title: "AI Analysis",
};

export default function AiAnalysisPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="BYOK analysis"
        title="Analyse the public dataset"
        lede="Once the release threshold is met, you can use your own OpenAI or Anthropic key to synthesise the public score-level dataset. Your key is sent to the server for this request, is not stored by this app, and may be processed by your chosen provider under your account."
      />
      <AiAnalysisForm />

      <ContentGrid className="section">
        <Surface
          label="Illustrative output"
          title="What visitors can expect"
          tone="science"
          variant="callout"
        >
          <div className="markdown-output">
            <strong>Key observations:</strong> Early data should be read as
            directional only. The most useful patterns are likely differences
            between the three work operating systems and the nine domains, not
            individual labels in isolation.
            {"\n\n"}
            <strong>Caveats:</strong> No norms, reliability claims, or subgroup
            conclusions should be made until sample size and validation work
            improve.
            {"\n\n"}
            <strong>Suggested next analysis:</strong> Compare scale
            distributions by broad role level once minimum-cell thresholds are
            met.
          </div>
        </Surface>
        <Surface label="Prompt transparency" title="Analysis guardrails">
          {aiAnalysisPromptPolicy.map((line) => (
            <p className="mono" key={line}>
              {line}
            </p>
          ))}
        </Surface>
      </ContentGrid>
    </PageShell>
  );
}
