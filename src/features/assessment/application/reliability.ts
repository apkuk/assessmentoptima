/**
 * File: src/features/assessment/application/reliability.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Provisional internal-consistency calculations for public research signals.
 */
import type {
  AnswerMap,
  ReliabilitySnapshot,
  ReliabilityScaleSnapshot,
} from "../schemas/assessment";
import { reliabilitySnapshotSchema } from "../schemas/assessment";
import type { StoredAssessmentSubmission } from "../schemas/assessment";
import { items, scaleKeys, scales } from "./model";
import { scoreItem } from "./scoring";

function variance(values: number[]): number {
  if (values.length < 2) {
    return 0;
  }

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const squaredDeviation = values.map((value) => (value - mean) ** 2);

  return (
    squaredDeviation.reduce((sum, value) => sum + value, 0) /
    (values.length - 1)
  );
}

function cronbachAlpha(itemMatrix: number[][]): number | null {
  if (itemMatrix.length < 2) {
    return null;
  }

  const itemCount = itemMatrix[0]?.length ?? 0;

  if (itemCount < 2) {
    return null;
  }

  const itemVariances = Array.from({ length: itemCount }, (_, itemIndex) =>
    variance(itemMatrix.map((row) => row[itemIndex] ?? 0)),
  );
  const totalScores = itemMatrix.map((row) =>
    row.reduce((sum, value) => sum + value, 0),
  );
  const totalVariance = variance(totalScores);

  if (totalVariance === 0) {
    return null;
  }

  const alpha =
    (itemCount / (itemCount - 1)) *
    (1 - itemVariances.reduce((sum, value) => sum + value, 0) / totalVariance);

  return Number(Math.max(-1, Math.min(1, alpha)).toFixed(2));
}

function classifyAlpha(alpha: number | null): string {
  if (alpha === null) {
    return "insufficient variance";
  }

  if (alpha >= 0.8) {
    return "strong provisional consistency";
  }

  if (alpha >= 0.7) {
    return "acceptable provisional consistency";
  }

  if (alpha >= 0.6) {
    return "developing provisional consistency";
  }

  return "needs item review";
}

function scaleMatrix(input: {
  answers: AnswerMap[];
  scaleKey: (typeof scaleKeys)[number];
}): number[][] {
  const scoredItems = items.filter(
    (item) => item.scale === input.scaleKey && item.type !== "overuse",
  );

  return input.answers.map((answerMap) =>
    scoredItems.map((item) => scoreItem(answerMap[item.id] ?? 3, item.type)),
  );
}

export function calculateReliabilitySnapshot(
  submissions: StoredAssessmentSubmission[],
  minGroupSize: number,
): ReliabilitySnapshot {
  const eligible = submissions.filter(
    (submission) =>
      submission.publicDatasetEligible && submission.consent.publicDataset,
  );

  if (eligible.length < minGroupSize) {
    return reliabilitySnapshotSchema.parse({
      suppressed: true,
      rowCount: eligible.length,
      minGroupSize,
      scales: [],
    });
  }

  const answers = eligible.map((submission) => submission.answers);
  const scaleSnapshots: ReliabilityScaleSnapshot[] = scaleKeys.map(
    (scaleKey) => {
      const matrix = scaleMatrix({ answers, scaleKey });
      const alpha = cronbachAlpha(matrix);

      return {
        scale: scaleKey,
        itemCount: matrix[0]?.length ?? 0,
        respondentCount: eligible.length,
        cronbachAlpha: alpha,
        label: `${scales[scaleKey].shortName}: ${classifyAlpha(alpha)}`,
      };
    },
  );

  return reliabilitySnapshotSchema.parse({
    suppressed: false,
    rowCount: eligible.length,
    minGroupSize,
    scales: scaleSnapshots,
  });
}
