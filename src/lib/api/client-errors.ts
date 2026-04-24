"use client";

/**
 * File: src/lib/api/client-errors.ts
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Browser-safe API error parsing and console logging helpers.
 */
import type { ApiErrorResponse } from "@/features/assessment/schemas/assessment";
import { logger } from "@/lib/observability/logger";

export interface ClientApiError {
  code?: string | undefined;
  detail?: string | undefined;
  message: string;
  requestId?: string | undefined;
  retryable?: boolean | undefined;
  status: number;
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return value !== null && typeof value === "object" && "error" in value;
}

export function parseClientApiError(input: {
  fallbackMessage: string;
  payload: unknown;
  status: number;
}): ClientApiError {
  if (!isApiErrorResponse(input.payload)) {
    return {
      message: input.fallbackMessage,
      status: input.status,
    };
  }

  return {
    code: input.payload.code,
    detail: input.payload.detail,
    message: input.payload.error,
    requestId: input.payload.requestId,
    retryable: input.payload.retryable,
    status: input.status,
  };
}

export function formatClientApiError(error: ClientApiError): string {
  const reference = error.requestId ? ` Reference: ${error.requestId}.` : "";
  const retry = error.retryable ? " This may be temporary." : "";

  return `${error.message}${retry}${reference}`;
}

export function logClientApiError(input: {
  event: string;
  error: ClientApiError;
  context?: Record<string, unknown>;
}): void {
  logger.warn({
    event: input.event,
    requestId: input.error.requestId,
    status: input.error.status,
    code: input.error.code,
    message: input.error.message,
    context: {
      ...input.context,
      detail: input.error.detail,
      retryable: input.error.retryable,
    },
  });
}
