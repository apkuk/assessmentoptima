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
  assessment_version: "wsc-v2.0",
  created_month: "2026-04",
  commitment_rhythm_score: 70,
  adaptive_learning_score: 65,
  mobilising_communication_score: 55,
  mutuality_repair_score: 72,
  pressure_regulation_score: 60,
  systems_sensemaking_score: 68,
  trust_stewardship_score: 74,
  change_navigation_score: 58,
  augmented_judgement_score: 62,
  operational_clarity: 67,
  human_coordination: 67,
  adaptive_capacity: 61,
  archetype: "The Human Integrator",
  pressure_drift_count: 1,
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
