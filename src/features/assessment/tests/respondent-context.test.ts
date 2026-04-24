/**
 * File: src/features/assessment/tests/respondent-context.test.ts
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Unit tests for respondent context UI metadata.
 */
import { describe, expect, it } from "vitest";

import { respondentContextFields } from "../application/respondent-context";

function labelsFor(fieldKey: (typeof respondentContextFields)[number]["key"]) {
  return (
    respondentContextFields
      .find((field) => field.key === fieldKey)
      ?.options.map((option) => option.label) ?? []
  );
}

describe("respondent context labels", () => {
  it("uses readable age bands", () => {
    expect(labelsFor("ageBand")).toEqual([
      "Under 25",
      "25–34",
      "35–44",
      "45–54",
      "55–64",
      "65+",
      "Prefer Not to Say",
    ]);
  });

  it("uses readable organisation-size bands", () => {
    expect(labelsFor("orgSizeBand")).toEqual([
      "Solo",
      "2–10",
      "11–50",
      "51–250",
      "251–1,000",
      "1,001–10,000",
      "10,000+",
      "Prefer Not to Say",
    ]);
  });

  it("uses readable work-experience bands", () => {
    expect(labelsFor("yearsExperienceBand")).toEqual([
      "0–2",
      "3–5",
      "6–10",
      "11–20",
      "21+",
      "Prefer Not to Say",
    ]);
  });

  it("uses Prefer Not to Say in every dropdown that has a skip option", () => {
    for (const field of respondentContextFields) {
      expect(field.options.at(-1)?.label).toBe("Prefer Not to Say");
    }
  });
});
