/**
 * File: src/app/api/submit/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Scores and persists a completed assessment submission.
 */
import { ZodError } from "zod";

import { routes } from "@/config/routes";
import { scoreAssessment } from "@/features/assessment/application/scoring";
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import {
  submitAssessmentResponseSchema,
  submitAssessmentSchema,
} from "@/features/assessment/schemas/assessment";
import { apiError, jsonResponse, zodErrorDetail } from "@/lib/api/responses";
import { getServerEnv } from "@/lib/env/server";
import {
  createPublicRowId,
  createResultToken,
  getCreatedMonth,
  hashResultToken,
  resolveHashSecret,
} from "@/lib/security/tokens";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const env = getServerEnv();
    const input = submitAssessmentSchema.parse(await request.json());
    const result = scoreAssessment(input.answers);
    const resultToken = createResultToken();
    const now = new Date();
    const tokenHash = hashResultToken(
      resultToken,
      resolveHashSecret(env.HASH_SECRET),
    );
    const publicDatasetEligible =
      input.consent.researchStorage === true &&
      input.consent.publicDataset === true;

    const repository = createAssessmentSubmissionRepository();

    await repository.save({
      tokenHash,
      publicRowId: createPublicRowId(),
      assessmentVersion: env.ASSESSMENT_VERSION,
      consent: input.consent,
      context: input.context,
      answers: input.answers,
      result,
      publicDatasetEligible,
      createdAt: now,
      createdMonth: getCreatedMonth(now),
    });

    return jsonResponse(
      submitAssessmentResponseSchema.parse({
        resultToken,
        resultUrl: new URL(routes.result(resultToken), env.NEXT_PUBLIC_APP_URL)
          .pathname,
        publicDatasetEligible,
      }),
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError(
        400,
        "Invalid assessment submission.",
        zodErrorDetail(error),
      );
    }

    if (error instanceof Error) {
      if (error.name === "MongoConfigurationError") {
        return apiError(503, error.message);
      }

      if (error.name === "AssessmentScoringError") {
        return apiError(400, error.message);
      }

      return apiError(500, "Assessment submission failed.", error.message);
    }

    return apiError(500, "Assessment submission failed.");
  }
}
