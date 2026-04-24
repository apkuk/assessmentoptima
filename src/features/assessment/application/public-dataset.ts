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
import { operatingSystemDefinitions, scaleKeys } from "./model";

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

function averageScore(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length,
  );
}

function operatingSystemScore(
  result: AssessmentResult,
  key: keyof typeof operatingSystemDefinitions,
): number {
  return averageScore(
    operatingSystemDefinitions[key].scaleKeys.map(
      (scaleKey) => result.scores[scaleKey].score,
    ),
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
    commitment_rhythm_score: result.scores.commitment_rhythm.score,
    adaptive_learning_score: result.scores.adaptive_learning.score,
    mobilising_communication_score:
      result.scores.mobilising_communication.score,
    mutuality_repair_score: result.scores.mutuality_repair.score,
    pressure_regulation_score: result.scores.pressure_regulation.score,
    systems_sensemaking_score: result.scores.systems_sensemaking.score,
    trust_stewardship_score: result.scores.trust_stewardship.score,
    change_navigation_score: result.scores.change_navigation.score,
    augmented_judgement_score: result.scores.augmented_judgement.score,
    operational_clarity: operatingSystemScore(result, "operationalClarity"),
    human_coordination: operatingSystemScore(result, "humanCoordination"),
    adaptive_capacity: operatingSystemScore(result, "adaptiveCapacity"),
    archetype: result.archetype.name,
    pressure_drift_count: result.pressureDrifts.length,
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
      averageScore(rows.map((row) => Number(row[`${scaleKey}_score`]))),
    ]),
  ) as Record<ScaleKey, number>;

  const archetypeCounts = rows.reduce<Record<string, number>>((counts, row) => {
    const key = String(row.archetype);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});

  const compositeAverages = {
    operationalClarity: averageScore(
      rows.map((row) => Number(row.operational_clarity)),
    ),
    humanCoordination: averageScore(
      rows.map((row) => Number(row.human_coordination)),
    ),
    adaptiveCapacity: averageScore(
      rows.map((row) => Number(row.adaptive_capacity)),
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

const publicDatasetFieldDescriptions = {
  row_id:
    "Random public row identifier. It is not a respondent name, email, token, or database id.",
  assessment_version:
    "Assessment model version used when the response was scored.",
  created_month:
    "Month of submission, rounded to YYYY-MM for disclosure control.",
  commitment_rhythm_score:
    "0-100 score for converting intention into visible, reliable progress.",
  adaptive_learning_score:
    "0-100 score for updating beliefs and behaviour through evidence, feedback, and reflection.",
  mobilising_communication_score:
    "0-100 score for making ideas relevant, energising others, and creating commitment.",
  mutuality_repair_score:
    "0-100 score for building shared work through trust, contribution clarity, and repair.",
  pressure_regulation_score:
    "0-100 score for staying proportionate, recoverable, and choiceful under pressure.",
  systems_sensemaking_score:
    "0-100 score for seeing patterns, trade-offs, and downstream effects.",
  trust_stewardship_score:
    "0-100 score for protecting truth, fairness, humility, and decision quality.",
  change_navigation_score:
    "0-100 score for creating movement through uncertainty while managing adoption and capacity.",
  augmented_judgement_score:
    "0-100 score for using AI and digital tools while preserving verification, privacy, and accountability.",
  operational_clarity:
    "Composite 0-100 score across Commitment Rhythm, Systems Sensemaking, and Augmented Judgement.",
  human_coordination:
    "Composite 0-100 score across Mobilising Communication, Mutuality & Repair, and Trust Stewardship.",
  adaptive_capacity:
    "Composite 0-100 score across Adaptive Learning, Pressure Regulation, and Change Navigation.",
  archetype:
    "Share-safe archetype derived from the strongest current domain signals.",
  pressure_drift_count:
    "Count of pressure-drift prompts triggered by overuse items. This is a reflection signal, not a diagnosis.",
} as const satisfies Record<(typeof PUBLIC_DATASET_FIELDS)[number], string>;

export const dataDictionary = PUBLIC_DATASET_FIELDS.map((field) => ({
  field,
  public: true,
  description: publicDatasetFieldDescriptions[field],
}));
