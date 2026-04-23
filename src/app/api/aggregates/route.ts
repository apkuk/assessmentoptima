/**
 * File: src/app/api/aggregates/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Serves small-cell-protected public assessment aggregates.
 */
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import {
  calculateAggregates,
  toPublicDatasetRows,
} from "@/features/assessment/application/public-dataset";
import { aggregateResponseSchema } from "@/features/assessment/schemas/assessment";
import { apiError, jsonResponse } from "@/lib/api/responses";
import { getServerEnv } from "@/lib/env/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET() {
  try {
    const env = getServerEnv();
    const repository = createAssessmentSubmissionRepository();
    const submissions = await repository.listPublicDatasetEligible();
    const rows = toPublicDatasetRows(submissions);
    const aggregates = calculateAggregates(rows, env.PUBLIC_DATASET_MIN_N);

    return jsonResponse(aggregateResponseSchema.parse(aggregates));
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "MongoConfigurationError") {
        return apiError(503, error.message);
      }

      return apiError(500, "Aggregate query failed.", error.message);
    }

    return apiError(500, "Aggregate query failed.");
  }
}
