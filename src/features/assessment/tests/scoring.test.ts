/**
 * File: src/features/assessment/tests/scoring.test.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Unit tests for assessment model integrity and scoring rules.
 */
import { describe, expect, it } from "vitest";

import type { AnswerMap, AnswerValue, ScaleKey } from "../schemas/assessment";
import { expectedItemIds, items, scaleKeys } from "../application/model";
import {
  AssessmentScoringError,
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
    answers.D5 = 1;
    answers.D6 = 5;

    const result = scoreAssessment(answers);

    expect(result.scores.delivery.score).toBe(100);
    expect(result.scores.delivery.overuseRaw).toBe(1);
  });

  it("creates pressure flags when high score pairs with high overuse", () => {
    const result = scoreAssessment(answersWithScale("delivery", 5));

    expect(result.pressureFlags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          scale: "delivery",
          itemId: "D5",
          severity: "high",
        }),
      ]),
    );
  });

  it("derives deterministic archetypes from strongest scales", () => {
    const answers = completeAnswers(3);

    for (const item of items) {
      if (item.scale === "delivery" || item.scale === "strategy") {
        answers[item.id] = item.type === "reverse" ? 1 : 5;
      }
    }

    const result = scoreAssessment(answers);

    expect(result.archetype.name).toBe("The Builder");
  });
});
