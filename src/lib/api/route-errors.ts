/**
 * File: src/lib/api/route-errors.ts
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Shared API route error classification, logging, and response shaping.
 */
import { ZodError } from "zod";

import { apiError, zodErrorDetail } from "@/lib/api/responses";
import { isMongoConnectivityError } from "@/lib/mongo/client";
import { createRequestId, logger } from "@/lib/observability/logger";

type ErrorCode =
  | "AI_ANALYSIS_DISABLED"
  | "ASSESSMENT_SCORING_ERROR"
  | "DATABASE_CONFIGURATION_ERROR"
  | "DATABASE_UNAVAILABLE"
  | "INTERNAL_ERROR"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "SMALL_CELL_SUPPRESSED"
  | "VALIDATION_ERROR";

interface ClassifiedRouteError {
  code: ErrorCode;
  detail?: string | undefined;
  logLevel: "warn" | "error";
  message: string;
  retryable: boolean;
  status: number;
}

interface RouteFailureInput {
  error: unknown;
  fallbackMessage: string;
  operation: string;
  request?: Request;
  validationMessage?: string;
  context?: Record<string, unknown>;
}

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function routePath(request: Request | undefined): string | undefined {
  if (!request) {
    return undefined;
  }

  return new URL(request.url).pathname;
}

export function requestIdFrom(request: Request | undefined): string {
  return (
    request?.headers.get("x-request-id") ??
    request?.headers.get("x-vercel-id") ??
    createRequestId()
  );
}

function developmentDetail(error: Error): string | undefined {
  return isProduction() ? undefined : error.message;
}

export function classifyRouteError(
  error: unknown,
  fallbackMessage: string,
  validationMessage = "Invalid request.",
): ClassifiedRouteError {
  if (error instanceof ZodError) {
    return {
      code: "VALIDATION_ERROR",
      detail: zodErrorDetail(error),
      logLevel: "warn",
      message: validationMessage,
      retryable: false,
      status: 400,
    };
  }

  if (error instanceof Error && error.name === "AssessmentScoringError") {
    return {
      code: "ASSESSMENT_SCORING_ERROR",
      detail: developmentDetail(error),
      logLevel: "warn",
      message: error.message,
      retryable: false,
      status: 400,
    };
  }

  if (error instanceof Error && error.name === "MongoConfigurationError") {
    return {
      code: "DATABASE_CONFIGURATION_ERROR",
      detail: developmentDetail(error),
      logLevel: "error",
      message: "Database configuration unavailable.",
      retryable: true,
      status: 503,
    };
  }

  if (isMongoConnectivityError(error)) {
    return {
      code: "DATABASE_UNAVAILABLE",
      detail: error instanceof Error ? developmentDetail(error) : undefined,
      logLevel: "error",
      message: "Database connection unavailable.",
      retryable: true,
      status: 503,
    };
  }

  return {
    code: "INTERNAL_ERROR",
    detail: error instanceof Error ? developmentDetail(error) : undefined,
    logLevel: "error",
    message: fallbackMessage,
    retryable: false,
    status: 500,
  };
}

export function routeFailure(input: RouteFailureInput): Response {
  const requestId = requestIdFrom(input.request);
  const classified = classifyRouteError(
    input.error,
    input.fallbackMessage,
    input.validationMessage,
  );
  const log = classified.logLevel === "warn" ? logger.warn : logger.error;

  log({
    event: "api.route_failure",
    requestId,
    route: routePath(input.request),
    method: input.request?.method,
    status: classified.status,
    code: classified.code,
    message: `${input.operation}: ${classified.message}`,
    error: input.error,
    context: input.context,
  });

  return apiError(classified.status, classified.message, classified.detail, {
    code: classified.code,
    requestId,
    retryable: classified.retryable,
  });
}

export function routeErrorResponse(input: {
  code: ErrorCode;
  message: string;
  status: number;
  request?: Request;
  detail?: string;
  retryable?: boolean;
  operation?: string;
  context?: Record<string, unknown>;
}): Response {
  const requestId = requestIdFrom(input.request);

  logger.warn({
    event: "api.route_rejected",
    requestId,
    route: routePath(input.request),
    method: input.request?.method,
    status: input.status,
    code: input.code,
    message: input.operation
      ? `${input.operation}: ${input.message}`
      : input.message,
    context: input.context,
  });

  return apiError(input.status, input.message, input.detail, {
    code: input.code,
    requestId,
    retryable: input.retryable ?? false,
  });
}
