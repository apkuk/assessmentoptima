/**
 * File: src/features/assessment/tests/ai-analysis.test.ts
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Unit tests for BYOK AI prompt construction guardrails.
 */
import { describe, expect, it } from "vitest";

import { createAiAnalysisPrompt } from "../application/ai-analysis";
import { calculateAggregates } from "../application/public-dataset";
import type {
  AiAnalysisRequest,
  PublicDatasetRow,
} from "../schemas/assessment";

const request: AiAnalysisRequest = {
  provider: "openai",
  apiKey: "sk-test-secret-that-must-not-appear",
  model: "gpt-test",
  analysisType: "summarise_dataset",
};

const row: PublicDatasetRow = {
  row_id: "row-1",
  assessment_version: "wsc-v1.0",
  created_month: "2026-04",
  delivery_score: 70,
  learning_score: 65,
  influence_score: 55,
  collaboration_score: 72,
  regulation_score: 60,
  strategy_score: 68,
  integrity_score: 74,
  change_score: 58,
  ai_score: 62,
  operating_rhythm: 66,
  trust_backbone: 69,
  learning_engine: 62,
  change_leadership: 60,
  human_centred_influence: 67,
  archetype: "The Integrator",
  pressure_flag_count: 1,
};

describe("createAiAnalysisPrompt", () => {
  it("does not include the BYOK provider key in the prompt", () => {
    const prompt = createAiAnalysisPrompt({
      request,
      rows: [row],
      aggregates: calculateAggregates([row], 1),
    });

    expect(prompt).not.toContain(request.apiKey);
    expect(prompt).toContain("score-level records only");
    expect(prompt).not.toContain("age_band");
    expect(prompt).not.toContain("role_level");
  });
});
