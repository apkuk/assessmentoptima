/**
 * File: src/features/assessment/application/public-dataset.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public dataset allowlist, export shaping, CSV, and aggregate helpers.
 */
import type {
  AggregateResponse,
  AssessmentResult,
  DatasetComparison,
  PublicDatasetRow,
  ScaleKey,
  StoredAssessmentSubmission,
} from "../schemas/assessment";
import {
  publicDatasetFields,
  publicDatasetRowSchema,
  datasetComparisonSchema,
} from "../schemas/assessment";
import { scaleKeys } from "./model";

export const PUBLIC_DATASET_FIELDS = publicDatasetFields;

export type ExportableSubmission = Pick<
  StoredAssessmentSubmission,
  | "publicRowId"
  | "assessmentVersion"
  | "createdMonth"
  | "consent"
  | "publicDatasetEligible"
  | "result"
>;

export function isPublicDatasetEligible(input: {
  consent: Pick<StoredAssessmentSubmission["consent"], "publicDataset">;
  publicDatasetEligible: boolean;
}): boolean {
  return (
    input.consent.publicDataset === true && input.publicDatasetEligible === true
  );
}

export function toPublicDatasetRow(
  submission: ExportableSubmission,
): PublicDatasetRow {
  const { result } = submission;

  return publicDatasetRowSchema.parse({
    row_id: submission.publicRowId,
    assessment_version: submission.assessmentVersion,
    created_month: submission.createdMonth,
    delivery_score: result.scores.delivery.score,
    learning_score: result.scores.learning.score,
    influence_score: result.scores.influence.score,
    collaboration_score: result.scores.collaboration.score,
    regulation_score: result.scores.regulation.score,
    strategy_score: result.scores.strategy.score,
    integrity_score: result.scores.integrity.score,
    change_score: result.scores.change.score,
    ai_score: result.scores.ai.score,
    operating_rhythm: result.composites.operatingRhythm ?? 0,
    trust_backbone: result.composites.trustBackbone ?? 0,
    learning_engine: result.composites.learningEngine ?? 0,
    change_leadership: result.composites.changeLeadership ?? 0,
    human_centred_influence: result.composites.humanCentredInfluence ?? 0,
    archetype: result.archetype.name,
    pressure_flag_count: result.pressureFlags.length,
  });
}

export function toPublicDatasetRows(
  submissions: ExportableSubmission[],
): PublicDatasetRow[] {
  return submissions
    .filter(isPublicDatasetEligible)
    .map((submission) => toPublicDatasetRow(submission));
}

export function applySmallCellSuppression<T>(
  rows: T[],
  minGroupSize: number,
):
  | {
      suppressed: true;
      reason: "minimum_group_size";
      minGroupSize: number;
      rowCount: number;
    }
  | { suppressed: false; rows: T[]; minGroupSize: number; rowCount: number } {
  if (rows.length < minGroupSize) {
    return {
      suppressed: true,
      reason: "minimum_group_size",
      minGroupSize,
      rowCount: rows.length,
    };
  }

  return {
    suppressed: false,
    rows,
    minGroupSize,
    rowCount: rows.length,
  };
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length,
  );
}

export function calculateAggregates(
  rows: PublicDatasetRow[],
  minGroupSize: number,
): AggregateResponse {
  if (rows.length < minGroupSize) {
    return {
      suppressed: true,
      rowCount: rows.length,
      minGroupSize,
      averageByScale: {},
      archetypeCounts: {},
      compositeAverages: {},
    };
  }

  const averageByScale = Object.fromEntries(
    scaleKeys.map((scaleKey) => [
      scaleKey,
      average(rows.map((row) => Number(row[`${scaleKey}_score`]))),
    ]),
  ) as Record<ScaleKey, number>;

  const archetypeCounts = rows.reduce<Record<string, number>>((counts, row) => {
    const key = String(row.archetype);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});

  const compositeAverages = {
    operatingRhythm: average(rows.map((row) => Number(row.operating_rhythm))),
    trustBackbone: average(rows.map((row) => Number(row.trust_backbone))),
    learningEngine: average(rows.map((row) => Number(row.learning_engine))),
    changeLeadership: average(rows.map((row) => Number(row.change_leadership))),
    humanCentredInfluence: average(
      rows.map((row) => Number(row.human_centred_influence)),
    ),
  };

  return {
    suppressed: false,
    rowCount: rows.length,
    minGroupSize,
    averageByScale,
    archetypeCounts,
    compositeAverages,
  };
}

export function calculateDatasetComparison(input: {
  result: AssessmentResult;
  rows: PublicDatasetRow[];
  minGroupSize: number;
}): DatasetComparison {
  if (input.rows.length < input.minGroupSize) {
    return datasetComparisonSchema.parse({
      suppressed: true,
      rowCount: input.rows.length,
      minGroupSize: input.minGroupSize,
      currentSampleComparisonByScale: {},
    });
  }

  const currentSampleComparisonByScale = Object.fromEntries(
    scaleKeys.map((scaleKey) => {
      const candidateScore = input.result.scores[scaleKey].score;
      const lowerOrEqual = input.rows.filter(
        (row) => Number(row[`${scaleKey}_score`]) <= candidateScore,
      ).length;

      return [
        scaleKey,
        Math.round((lowerOrEqual / input.rows.length) * 100),
      ] as const;
    }),
  );

  return datasetComparisonSchema.parse({
    suppressed: false,
    rowCount: input.rows.length,
    minGroupSize: input.minGroupSize,
    currentSampleComparisonByScale,
  });
}

function escapeCsvValue(value: string | number): string {
  const serialized = String(value);

  if (/[",\n\r]/.test(serialized)) {
    return `"${serialized.replaceAll('"', '""')}"`;
  }

  return serialized;
}

export function rowsToCsv(rows: PublicDatasetRow[]): string {
  const header = PUBLIC_DATASET_FIELDS.join(",");
  const body = rows.map((row) =>
    PUBLIC_DATASET_FIELDS.map((field) => escapeCsvValue(row[field])).join(","),
  );

  return [header, ...body].join("\n");
}

export const dataDictionary = PUBLIC_DATASET_FIELDS.map((field) => ({
  field,
  public: true,
  description: field.replaceAll("_", " "),
}));
