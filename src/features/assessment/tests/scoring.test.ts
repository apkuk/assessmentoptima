/**
 * File: src/features/assessment/tests/scoring.test.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Unit tests for assessment model integrity and scoring rules.
 */
import { describe, expect, it } from "vitest";

import type { AnswerMap, AnswerValue, ScaleKey } from "../schemas/assessment";
import {
  expectedItemIds,
  items,
  operatingSystemDefinitions,
  scaleKeys,
  scales,
} from "../application/model";
import {
  AssessmentScoringError,
  findPublicArchetype,
  scoreAssessment,
  scoreItem,
} from "../application/scoring";

function completeAnswers(value: AnswerValue): AnswerMap {
  return Object.fromEntries(expectedItemIds.map((itemId) => [itemId, value]));
}

function answersWithScale(scale: ScaleKey, value: AnswerValue): AnswerMap {
  const answers = completeAnswers(3);

  for (const item of items.filter((candidate) => candidate.scale === scale)) {
    answers[item.id] = value;
  }

  return answers;
}

describe("assessment model", () => {
  it("has 54 items across 9 scales", () => {
    expect(items).toHaveLength(54);
    expect(scaleKeys).toHaveLength(9);
  });

  it("has four core, one reverse, and one overuse item per scale", () => {
    for (const scaleKey of scaleKeys) {
      const scaleItems = items.filter((item) => item.scale === scaleKey);

      expect(scaleItems).toHaveLength(6);
      expect(scaleItems.filter((item) => item.type === "core")).toHaveLength(4);
      expect(scaleItems.filter((item) => item.type === "reverse")).toHaveLength(
        1,
      );
      expect(scaleItems.filter((item) => item.type === "overuse")).toHaveLength(
        1,
      );
    }
  });

  it("uses the v2 public scale names", () => {
    expect(scales.commitment_rhythm.name).toBe("Commitment Rhythm");
    expect(scales.systems_sensemaking.name).toBe("Systems Sensemaking");
    expect(scales.augmented_judgement.name).toBe("Augmented Judgement");
  });

  it("keeps banned public-positioning language out of the item bank", () => {
    const banned = [
      "Hogan",
      "bright side",
      "dark side",
      "derailer",
      "senior stakeholders",
      "psychometric diagnosis",
    ];
    const itemText = items.map((item) => item.text).join("\n");

    for (const phrase of banned) {
      expect(itemText).not.toContain(phrase);
    }
  });
});

describe("scoreItem", () => {
  it("reverse-scores reverse items", () => {
    expect(scoreItem(1, "reverse")).toBe(5);
    expect(scoreItem(5, "reverse")).toBe(1);
  });

  it("leaves core and overuse values unchanged", () => {
    expect(scoreItem(4, "core")).toBe(4);
    expect(scoreItem(4, "overuse")).toBe(4);
  });
});

describe("scoreAssessment", () => {
  it("requires every expected item", () => {
    const answers = completeAnswers(3);
    delete answers.D1;

    expect(() => scoreAssessment(answers)).toThrow(AssessmentScoringError);
  });

  it("excludes overuse items from core scale score", () => {
    const answers = completeAnswers(3);
    answers.D1 = 5;
    answers.D2 = 5;
    answers.D3 = 1;
    answers.D4 = 5;
    answers.D5 = 5;
    answers.D6 = 1;

    const result = scoreAssessment(answers);

    expect(result.scores.commitment_rhythm.score).toBe(100);
    expect(result.scores.commitment_rhythm.overuseRaw).toBe(1);
  });

  it("creates pressure-drift signals when high score pairs with high overuse", () => {
    const result = scoreAssessment(answersWithScale("commitment_rhythm", 5));

    expect(result.pressureDrifts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          scale: "commitment_rhythm",
          itemId: "D6",
          severity: "strong_watch",
        }),
      ]),
    );
  });

  it("calculates the three v2 operating-system composites", () => {
    const result = scoreAssessment(completeAnswers(4));

    expect(Object.keys(result.composites).sort()).toEqual(
      Object.keys(operatingSystemDefinitions).sort(),
    );
    expect(result.composites.operationalClarity).toBeGreaterThan(0);
    expect(result.composites.humanCoordination).toBeGreaterThan(0);
    expect(result.composites.adaptiveCapacity).toBeGreaterThan(0);
  });

  it("resolves canonical public archetype share slugs", () => {
    expect(findPublicArchetype("grounded-builder")?.name).toBe(
      "The Grounded Builder",
    );
    expect(findPublicArchetype("balanced-contributor")?.name).toBe(
      "The Balanced Contributor",
    );
  });

  it("derives deterministic archetypes from strongest scales", () => {
    const answers = completeAnswers(3);

    for (const item of items) {
      if (
        item.scale === "commitment_rhythm" ||
        item.scale === "systems_sensemaking"
      ) {
        answers[item.id] = item.type === "reverse" ? 1 : 5;
      }
    }

    const result = scoreAssessment(answers);

    expect(result.archetype.name).toBe("The Grounded Builder");
  });
});
