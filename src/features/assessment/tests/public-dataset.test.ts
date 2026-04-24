/**
 * File: src/features/assessment/tests/public-dataset.test.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Unit tests for public dataset eligibility, exports, and suppression.
 */
import { describe, expect, it } from "vitest";

import { appConfig } from "@/config/app";

import type { AnswerMap, AnswerValue } from "../schemas/assessment";
import { expectedItemIds } from "../application/model";
import { scoreAssessment } from "../application/scoring";
import {
  PUBLIC_DATASET_FIELDS,
  applySmallCellSuppression,
  calculateAggregates,
  calculateDatasetComparison,
  isPublicDatasetEligible,
  rowsToCsv,
  toPublicDatasetRow,
  type ExportableSubmission,
} from "../application/public-dataset";

function completeAnswers(value: AnswerValue): AnswerMap {
  return Object.fromEntries(expectedItemIds.map((itemId) => [itemId, value]));
}

function submission(
  overrides: Partial<ExportableSubmission> = {},
): ExportableSubmission {
  return {
    publicRowId: "public-row-1",
    assessmentVersion: appConfig.defaultAssessmentVersion,
    createdMonth: "2026-04",
    consent: {
      useBoundaryAccepted: true,
      assessmentProcessing: true,
      privateResultStorage: true,
      researchStorage: true,
      publicDataset: true,
      consentVersion: appConfig.defaultConsentVersion,
    },
    publicDatasetEligible: true,
    result: scoreAssessment(completeAnswers(4)),
    ...overrides,
  };
}

describe("public dataset eligibility", () => {
  it("requires public dataset consent and internal eligibility", () => {
    expect(isPublicDatasetEligible(submission())).toBe(true);
    expect(
      isPublicDatasetEligible(
        submission({
          consent: {
            ...submission().consent,
            publicDataset: false,
          },
        }),
      ),
    ).toBe(false);
    expect(
      isPublicDatasetEligible(submission({ publicDatasetEligible: false })),
    ).toBe(false);
  });
});

describe("public export row", () => {
  it("uses an allowlist and excludes private fields", () => {
    const row = toPublicDatasetRow(submission());

    expect(Object.keys(row)).toEqual([...PUBLIC_DATASET_FIELDS]);
    expect(row).not.toHaveProperty("_id");
    expect(row).not.toHaveProperty("createdAt");
    expect(row).not.toHaveProperty("answers");
    expect(row).not.toHaveProperty("age_band");
    expect(row).not.toHaveProperty("role_level");
    expect(row).not.toHaveProperty("viewTokenHash");
  });

  it("exports CSV using the public field order", () => {
    const row = toPublicDatasetRow(submission());
    const csv = rowsToCsv([row]);

    expect(csv.split("\n")[0]).toBe(PUBLIC_DATASET_FIELDS.join(","));
    expect(csv).toContain("public-row-1");
  });
});

describe("small-cell suppression and aggregates", () => {
  it("suppresses small groups", () => {
    const rows = [toPublicDatasetRow(submission())];

    expect(applySmallCellSuppression(rows, 10)).toEqual({
      suppressed: true,
      reason: "minimum_group_size",
      minGroupSize: 10,
      rowCount: 1,
    });
  });

  it("calculates aggregate summaries when threshold is met", () => {
    const rows = Array.from({ length: 10 }, (_, index) =>
      toPublicDatasetRow(submission({ publicRowId: `row-${index}` })),
    );
    const aggregates = calculateAggregates(rows, 10);

    expect(aggregates.suppressed).toBe(false);
    expect(aggregates.rowCount).toBe(10);
    expect(aggregates.averageByScale.commitment_rhythm).toBeGreaterThan(0);
  });

  it("labels comparisons as current sample comparisons, not norms", () => {
    const rows = Array.from({ length: 10 }, (_, index) =>
      toPublicDatasetRow(submission({ publicRowId: `row-${index}` })),
    );
    const comparison = calculateDatasetComparison({
      result: submission().result,
      rows,
      minGroupSize: 10,
    });

    expect(comparison.suppressed).toBe(false);
    expect(
      comparison.currentSampleComparisonByScale.commitment_rhythm,
    ).toBeGreaterThan(0);
    expect(comparison).not.toHaveProperty("percentileByScale");
  });
});
