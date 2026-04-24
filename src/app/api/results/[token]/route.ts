/**
 * File: src/app/api/results/[token]/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Retrieves a respondent result report by private token.
 */
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import { parseStatelessResultToken } from "@/features/assessment/application/stateless-result-token";
import {
  assessmentResultResponseSchema,
  deleteResultRequestSchema,
  viewTokenSchema,
} from "@/features/assessment/schemas/assessment";
import { jsonResponse } from "@/lib/api/responses";
import { routeErrorResponse, routeFailure } from "@/lib/api/route-errors";
import { getServerEnv } from "@/lib/env/server";
import { hashResultToken, resolveHashSecret } from "@/lib/security/tokens";

export const runtime = "nodejs";
export const maxDuration = 30;

interface RouteContext {
  params: Promise<{ token: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const env = getServerEnv();
    const { token } = await context.params;
    const parsedToken = viewTokenSchema.parse(token);
    const hashSecret = resolveHashSecret(env.HASH_SECRET);
    const statelessResult = parseStatelessResultToken(parsedToken, hashSecret);

    if (statelessResult) {
      return jsonResponse(
        assessmentResultResponseSchema.parse(statelessResult),
      );
    }

    const repository = createAssessmentSubmissionRepository();
    const submission = await repository.findByViewTokenHash(
      hashResultToken(parsedToken, hashSecret),
    );

    if (!submission) {
      return routeErrorResponse({
        code: "NOT_FOUND",
        message: "Result not found.",
        operation: "GET /api/results/[token]",
        request,
        status: 404,
      });
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
    return routeFailure({
      error,
      fallbackMessage: "Result lookup failed.",
      operation: "GET /api/results/[token]",
      request,
      validationMessage: "Invalid result token.",
    });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const env = getServerEnv();
    const { token } = await context.params;
    const parsedToken = viewTokenSchema.parse(token);
    const input = deleteResultRequestSchema.parse(
      await request.json().catch(() => null),
    );
    const hashSecret = resolveHashSecret(env.HASH_SECRET);
    const statelessResult = parseStatelessResultToken(parsedToken, hashSecret);

    if (statelessResult) {
      return jsonResponse({ deleted: true, persisted: false });
    }

    const repository = createAssessmentSubmissionRepository();
    const deleted = await repository.deleteByManagementTokenHash({
      viewTokenHash: hashResultToken(parsedToken, hashSecret),
      managementTokenHash: hashResultToken(input.managementToken, hashSecret),
    });

    if (!deleted) {
      return routeErrorResponse({
        code: "NOT_FOUND",
        message: "Result not found.",
        operation: "DELETE /api/results/[token]",
        request,
        status: 404,
      });
    }

    return jsonResponse({ deleted: true });
  } catch (error) {
    return routeFailure({
      error,
      fallbackMessage: "Result deletion failed.",
      operation: "DELETE /api/results/[token]",
      request,
      validationMessage: "Invalid result token.",
    });
  }
}
