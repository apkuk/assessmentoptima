/**
 * File: src/features/assessment/application/ai-analysis.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Prompt construction for BYOK AI analysis of the public dataset.
 */
import type {
  AggregateResponse,
  AiAnalysisRequest,
  PublicDatasetRow,
} from "../schemas/assessment";

const analysisLabels: Record<AiAnalysisRequest["analysisType"], string> = {
  summarise_dataset: "summarise the dataset",
  compare_segments: "compare available respondent segments",
  interesting_patterns: "identify interesting patterns",
  research_hypotheses: "generate research hypotheses",
  methodology_critique: "critique the assessment methodology",
};

export const aiProviderModelDefaults = {
  openai: "gpt-5.5",
  anthropic: "claude-sonnet-4-5",
} as const satisfies Record<AiAnalysisRequest["provider"], string>;

export const aiAnalysisPromptPolicy = [
  "You are analysing an open, anonymised work-style assessment dataset.",
  "The instrument is research-informed and developmental, but it is not validated for hiring, promotion, diagnosis, redundancy, or high-stakes employment decisions.",
  "Be careful: separate observed patterns from speculation, avoid clinical claims, and mention sample size limits.",
  "Rows are anonymised, score-level records only; no respondent context fields are included in the v0 row export.",
  "Return concise Markdown with: Key observations, Caveats, Practical interpretation, and Suggested next analysis.",
];

export function createAiAnalysisPrompt(input: {
  request: AiAnalysisRequest;
  rows: PublicDatasetRow[];
  aggregates: AggregateResponse;
}): string {
  const sampledRows = input.rows.slice(0, 200);
  const question = input.request.question
    ? `\nUser question: ${input.request.question}`
    : "";

  return [
    ...aiAnalysisPromptPolicy.slice(0, 3),
    `Task: ${analysisLabels[input.request.analysisType]}.${question}`,
    "",
    "Aggregate data:",
    JSON.stringify(input.aggregates, null, 2),
    "",
    aiAnalysisPromptPolicy[3],
    JSON.stringify(sampledRows, null, 2),
    "",
    aiAnalysisPromptPolicy[4],
  ].join("\n");
}
