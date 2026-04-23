/**
 * File: src/app/ai-analysis/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Public BYOK AI analysis page for the anonymised dataset.
 */
import type { Metadata } from "next";

import { aiAnalysisPromptPolicy } from "@/features/assessment/application/ai-analysis";
import { AiAnalysisForm } from "@/features/assessment/components/ai-analysis-form";

export const metadata: Metadata = {
  title: "AI Analysis",
};

export default function AiAnalysisPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">BYOK analysis</p>
        <h1 className="page-title">Query the open dataset</h1>
        <p className="lede">
          Use your own OpenAI or Anthropic key to synthesise the public dataset
          without opening up the project owner&apos;s LLM budget.
        </p>
      </section>
      <AiAnalysisForm />

      <section className="content-grid section">
        <div className="callout" data-tone="science">
          <p className="panel-label">Example output</p>
          <h2>What visitors can expect</h2>
          <div className="markdown-output">
            <strong>Key observations:</strong> Early data should be read as
            directional only. The most useful patterns are likely differences
            between delivery, learning, trust, and change scales, not individual
            labels in isolation.
            {"\n\n"}
            <strong>Caveats:</strong> No norms, reliability claims, or subgroup
            conclusions should be made until sample size and validation work
            improve.
            {"\n\n"}
            <strong>Suggested next analysis:</strong> Compare scale
            distributions by broad role level once minimum-cell thresholds are
            met.
          </div>
        </div>
        <div className="panel">
          <p className="panel-label">Prompt transparency</p>
          <h2>Guardrail prompt</h2>
          {aiAnalysisPromptPolicy.map((line) => (
            <p className="mono" key={line}>
              {line}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
