/**
 * File: src/features/assessment/tests/tokens.test.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Unit tests for result-token hashing and public date helpers.
 */
import { describe, expect, it } from "vitest";

import { scoreAssessment } from "../application/scoring";
import {
  createStatelessResultToken,
  parseStatelessResultToken,
} from "../application/stateless-result-token";
import type { AnswerMap, AnswerValue } from "../schemas/assessment";
import { expectedItemIds } from "../application/model";
import {
  createResultToken,
  getCreatedMonth,
  hashResultToken,
} from "@/lib/security/tokens";

function completeAnswers(value: AnswerValue): AnswerMap {
  return Object.fromEntries(expectedItemIds.map((itemId) => [itemId, value]));
}

describe("result token helpers", () => {
  it("creates unguessable-looking result tokens", () => {
    const first = createResultToken();
    const second = createResultToken();

    expect(first).not.toBe(second);
    expect(first.length).toBeGreaterThan(40);
  });

  it("hashes result tokens deterministically without returning the raw token", () => {
    const token = "result-token";
    const hash = hashResultToken(token, "a-long-secret");

    expect(hash).toBe(hashResultToken(token, "a-long-secret"));
    expect(hash).not.toContain(token);
  });

  it("rounds public created dates to month", () => {
    expect(getCreatedMonth(new Date("2026-04-23T20:30:00.000Z"))).toBe(
      "2026-04",
    );
  });

  it("creates signed stateless fallback result tokens", () => {
    const payload = {
      assessmentVersion: "wsc-v2.0",
      createdMonth: "2026-04",
      context: {},
      result: scoreAssessment(completeAnswers(3)),
      publicDatasetEligible: false,
    };
    const token = createStatelessResultToken(payload, "secret");

    expect(parseStatelessResultToken(token, "secret")).toEqual(payload);
    expect(parseStatelessResultToken(token, "different-secret")).toBeNull();
  });
});
