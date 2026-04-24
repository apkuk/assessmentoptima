/**
 * File: src/app/api/results/[token]/experiment.ics/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Generates a 30-day experiment calendar reminder for a private result.
 */
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import { appConfig } from "@/config/app";
import { parseStatelessResultToken } from "@/features/assessment/application/stateless-result-token";
import { viewTokenSchema } from "@/features/assessment/schemas/assessment";
import { routeErrorResponse, routeFailure } from "@/lib/api/route-errors";
import { getServerEnv } from "@/lib/env/server";
import { hashResultToken, resolveHashSecret } from "@/lib/security/tokens";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ token: string }>;
}

function formatIcsDate(date: Date): string {
  return (
    date.toISOString().replaceAll("-", "").replaceAll(":", "").split(".")[0] +
    "Z"
  );
}

function escapeIcsText(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const env = getServerEnv();
    const { token } = await context.params;
    const parsedToken = viewTokenSchema.parse(token);
    const hashSecret = resolveHashSecret(env.HASH_SECRET);
    const statelessResult = parseStatelessResultToken(parsedToken, hashSecret);
    const repository = createAssessmentSubmissionRepository();
    const submission = statelessResult
      ? null
      : await repository.findByViewTokenHash(
          hashResultToken(parsedToken, hashSecret),
        );

    const result = statelessResult?.result ?? submission?.result;
    const uid = statelessResult
      ? hashResultToken(parsedToken, hashSecret)
      : submission?.publicRowId;

    if (!result || !uid) {
      return routeErrorResponse({
        code: "NOT_FOUND",
        message: "Result not found.",
        operation: "GET /api/results/[token]/experiment.ics",
        request,
        status: 404,
      });
    }

    const now = new Date();
    const review = new Date(now);
    review.setUTCDate(review.getUTCDate() + 30);

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:${appConfig.calendarProductId}`,
      "BEGIN:VEVENT",
      `UID:${uid}@${appConfig.productSlug}`,
      `DTSTAMP:${formatIcsDate(now)}`,
      `DTSTART:${formatIcsDate(review)}`,
      `DTEND:${formatIcsDate(new Date(review.getTime() + 30 * 60 * 1000))}`,
      "SUMMARY:Review my AssessmentOptima experiment",
      `DESCRIPTION:${escapeIcsText(result.experiment)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    return new Response(ics, {
      headers: {
        "content-disposition": `attachment; filename="${appConfig.experimentCalendarFilename}"`,
        "content-type": "text/calendar; charset=utf-8",
      },
    });
  } catch (error) {
    return routeFailure({
      error,
      fallbackMessage: "Calendar export failed.",
      operation: "GET /api/results/[token]/experiment.ics",
      request,
      validationMessage: "Invalid result token.",
    });
  }
}
