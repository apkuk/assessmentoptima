/**
 * File: src/app/api/dataset.json/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Exports the anonymised public dataset as JSON after threshold checks.
 */
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import {
  applySmallCellSuppression,
  toPublicDatasetRows,
} from "@/features/assessment/application/public-dataset";
import { publicDatasetResponseSchema } from "@/features/assessment/schemas/assessment";
import { jsonResponse } from "@/lib/api/responses";
import { routeErrorResponse, routeFailure } from "@/lib/api/route-errors";
import { getServerEnv } from "@/lib/env/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(request: Request) {
  try {
    const env = getServerEnv();
    const repository = createAssessmentSubmissionRepository();
    const rows = toPublicDatasetRows(
      await repository.listPublicDatasetEligible(),
    );
    const threshold = applySmallCellSuppression(rows, env.PUBLIC_DATASET_MIN_N);

    if (threshold.suppressed) {
      return routeErrorResponse({
        code: "SMALL_CELL_SUPPRESSED",
        detail: `Current public row count is ${threshold.rowCount}; minimum is ${threshold.minGroupSize}.`,
        message: "Public dataset threshold has not been met.",
        operation: "GET /api/dataset.json",
        request,
        status: 403,
      });
    }

    return jsonResponse(
      publicDatasetResponseSchema.parse({
        rows: threshold.rows,
        rowCount: threshold.rowCount,
        generatedAt: new Date().toISOString(),
      }),
    );
  } catch (error) {
    return routeFailure({
      error,
      fallbackMessage: "Dataset export failed.",
      operation: "GET /api/dataset.json",
      request,
    });
  }
}
