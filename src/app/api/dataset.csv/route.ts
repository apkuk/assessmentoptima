/**
 * File: src/app/api/dataset.csv/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Exports the anonymised public dataset as CSV after threshold checks.
 */
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import { appConfig } from "@/config/app";
import {
  applySmallCellSuppression,
  rowsToCsv,
  toPublicDatasetRows,
} from "@/features/assessment/application/public-dataset";
import { apiError } from "@/lib/api/responses";
import { getServerEnv } from "@/lib/env/server";
import { isMongoConnectivityError } from "@/lib/mongo/client";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET() {
  try {
    const env = getServerEnv();
    const repository = createAssessmentSubmissionRepository();
    const rows = toPublicDatasetRows(
      await repository.listPublicDatasetEligible(),
    );
    const threshold = applySmallCellSuppression(rows, env.PUBLIC_DATASET_MIN_N);

    if (threshold.suppressed) {
      return apiError(
        403,
        "Public dataset threshold has not been met.",
        `Current public row count is ${threshold.rowCount}; minimum is ${threshold.minGroupSize}.`,
      );
    }

    return new Response(rowsToCsv(threshold.rows), {
      headers: {
        "content-disposition": `attachment; filename="${appConfig.publicDatasetFilename}"`,
        "content-type": "text/csv; charset=utf-8",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "MongoConfigurationError") {
        return apiError(503, error.message);
      }

      if (isMongoConnectivityError(error)) {
        return apiError(503, "Database connection unavailable.");
      }

      return apiError(500, "Dataset export failed.", error.message);
    }

    return apiError(500, "Dataset export failed.");
  }
}
