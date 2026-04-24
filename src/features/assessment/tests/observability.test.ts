/**
 * File: src/features/assessment/tests/observability.test.ts
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Unit tests for shared error response and logging helpers.
 */
import { describe, expect, it } from "vitest";
import { ZodError, z } from "zod";

import {
  formatClientApiError,
  parseClientApiError,
} from "@/lib/api/client-errors";
import { classifyRouteError } from "@/lib/api/route-errors";
import { redactForLog } from "@/lib/observability/logger";

describe("redactForLog", () => {
  it("redacts sensitive keys recursively", () => {
    expect(
      redactForLog({
        apiKey: "sk-secret",
        nested: {
          managementToken: "delete-me",
          safe: "visible",
        },
      }),
    ).toEqual({
      apiKey: "[REDACTED]",
      nested: {
        managementToken: "[REDACTED]",
        safe: "visible",
      },
    });
  });
});

describe("classifyRouteError", () => {
  it("turns zod errors into validation failures", () => {
    const result = z.object({ ok: z.literal(true) }).safeParse({ ok: false });

    expect(result.success).toBe(false);

    const classified = classifyRouteError(
      (result as { success: false; error: ZodError }).error,
      "Fallback failed.",
      "Invalid payload.",
    );

    expect(classified).toMatchObject({
      code: "VALIDATION_ERROR",
      message: "Invalid payload.",
      retryable: false,
      status: 400,
    });
  });
});

describe("client API error formatting", () => {
  it("preserves request references for dev-console sharing", () => {
    const parsed = parseClientApiError({
      fallbackMessage: "Fallback failed.",
      payload: {
        code: "DATABASE_UNAVAILABLE",
        error: "Database connection unavailable.",
        requestId: "ao_test",
        retryable: true,
      },
      status: 503,
    });

    expect(formatClientApiError(parsed)).toBe(
      "Database connection unavailable. This may be temporary. Reference: ao_test.",
    );
  });
});
