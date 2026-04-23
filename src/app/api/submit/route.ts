/**
 * File: src/app/api/submit/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Scores and persists a completed assessment submission.
 */
import { ZodError } from "zod";

import { routes } from "@/config/routes";
import { scoreAssessment } from "@/features/assessment/application/scoring";
import { createStatelessResultToken } from "@/features/assessment/application/stateless-result-token";
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import {
  type AssessmentResultResponse,
  submitAssessmentResponseSchema,
  submitAssessmentSchema,
} from "@/features/assessment/schemas/assessment";
import { apiError, jsonResponse, zodErrorDetail } from "@/lib/api/responses";
import { getServerEnv } from "@/lib/env/server";
import { isMongoConnectivityError } from "@/lib/mongo/client";
import {
  createPublicRowId,
  createResultToken,
  getCreatedMonth,
  hashResultToken,
  resolveHashSecret,
} from "@/lib/security/tokens";

export const runtime = "nodejs";
export const maxDuration = 30;

function isPersistenceUnavailable(error: Error): boolean {
  return (
    error.name === "MongoConfigurationError" || isMongoConnectivityError(error)
  );
}

function createSubmissionResponse(input: {
  resultToken: string;
  appUrl: string;
  publicDatasetEligible: boolean;
  status?: number;
  storageMode?: "mongo" | "stateless";
}) {
  const init: ResponseInit = input.storageMode
    ? {
        headers: { "x-assessmentoptima-storage": input.storageMode },
        status: input.status ?? 201,
      }
    : { status: input.status ?? 201 };

  return jsonResponse(
    submitAssessmentResponseSchema.parse({
      resultToken: input.resultToken,
      resultUrl: new URL(routes.result(input.resultToken), input.appUrl)
        .pathname,
      publicDatasetEligible: input.publicDatasetEligible,
    }),
    init,
  );
}

function createStatelessFallback(input: {
  resultResponse: AssessmentResultResponse;
  hashSecret: string;
  appUrl: string;
}) {
  const resultToken = createStatelessResultToken(
    input.resultResponse,
    input.hashSecret,
  );

  return createSubmissionResponse({
    resultToken,
    appUrl: input.appUrl,
    publicDatasetEligible: false,
    storageMode: "stateless",
  });
}

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
    const hashSecret = resolveHashSecret(env.HASH_SECRET);
    const resultResponse: AssessmentResultResponse = {
      assessmentVersion: env.ASSESSMENT_VERSION,
      createdMonth: getCreatedMonth(now),
      context: input.context,
      result,
      publicDatasetEligible: false,
    };

    const repository = createAssessmentSubmissionRepository();

    try {
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
    } catch (error) {
      if (error instanceof Error && isPersistenceUnavailable(error)) {
        return createStatelessFallback({
          resultResponse,
          hashSecret,
          appUrl: env.NEXT_PUBLIC_APP_URL,
        });
      }

      throw error;
    }

    return createSubmissionResponse({
      resultToken,
      appUrl: env.NEXT_PUBLIC_APP_URL,
      publicDatasetEligible,
      storageMode: "mongo",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError(
        400,
        "Invalid assessment submission.",
        zodErrorDetail(error),
      );
    }

    if (error instanceof Error) {
      if (error.name === "AssessmentScoringError") {
        return apiError(400, error.message);
      }

      if (isPersistenceUnavailable(error)) {
        return apiError(503, "Database connection unavailable.");
      }

      return apiError(500, "Assessment submission failed.", error.message);
    }

    return apiError(500, "Assessment submission failed.");
  }
}
