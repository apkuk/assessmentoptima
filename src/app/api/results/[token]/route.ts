/**
 * File: src/app/api/results/[token]/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Retrieves a respondent result report by private token.
 */
import { ZodError } from "zod";

import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import {
  assessmentResultResponseSchema,
  resultTokenSchema,
} from "@/features/assessment/schemas/assessment";
import { apiError, jsonResponse, zodErrorDetail } from "@/lib/api/responses";
import { getServerEnv } from "@/lib/env/server";
import { hashResultToken, resolveHashSecret } from "@/lib/security/tokens";

export const runtime = "nodejs";
export const maxDuration = 30;

interface RouteContext {
  params: Promise<{ token: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const env = getServerEnv();
    const { token } = await context.params;
    const parsedToken = resultTokenSchema.parse(token);
    const repository = createAssessmentSubmissionRepository();
    const submission = await repository.findByTokenHash(
      hashResultToken(parsedToken, resolveHashSecret(env.HASH_SECRET)),
    );

    if (!submission) {
      return apiError(404, "Result not found.");
    }

    return jsonResponse(
      assessmentResultResponseSchema.parse({
        assessmentVersion: submission.assessmentVersion,
        createdMonth: submission.createdMonth,
        context: submission.context,
        result: submission.result,
        publicDatasetEligible: submission.publicDatasetEligible,
      }),
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError(400, "Invalid result token.", zodErrorDetail(error));
    }

    if (error instanceof Error) {
      if (error.name === "MongoConfigurationError") {
        return apiError(503, error.message);
      }

      return apiError(500, "Result lookup failed.", error.message);
    }

    return apiError(500, "Result lookup failed.");
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const env = getServerEnv();
    const { token } = await context.params;
    const parsedToken = resultTokenSchema.parse(token);
    const repository = createAssessmentSubmissionRepository();
    const deleted = await repository.deleteByTokenHash(
      hashResultToken(parsedToken, resolveHashSecret(env.HASH_SECRET)),
    );

    if (!deleted) {
      return apiError(404, "Result not found.");
    }

    return jsonResponse({ deleted: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError(400, "Invalid result token.", zodErrorDetail(error));
    }

    if (error instanceof Error) {
      if (error.name === "MongoConfigurationError") {
        return apiError(503, error.message);
      }

      return apiError(500, "Result deletion failed.", error.message);
    }

    return apiError(500, "Result deletion failed.");
  }
}
