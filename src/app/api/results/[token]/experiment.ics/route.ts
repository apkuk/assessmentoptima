/**
 * File: src/app/api/results/[token]/experiment.ics/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Generates a 30-day experiment calendar reminder for a private result.
 */
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import { appConfig } from "@/config/app";
import { parseStatelessResultToken } from "@/features/assessment/application/stateless-result-token";
import { resultTokenSchema } from "@/features/assessment/schemas/assessment";
import { apiError } from "@/lib/api/responses";
import { getServerEnv } from "@/lib/env/server";
import { isMongoConnectivityError } from "@/lib/mongo/client";
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

export async function GET(_request: Request, context: RouteContext) {
  try {
    const env = getServerEnv();
    const { token } = await context.params;
    const parsedToken = resultTokenSchema.parse(token);
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
      return apiError(404, "Result not found.");
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
    if (error instanceof Error) {
      if (error.name === "MongoConfigurationError") {
        return apiError(503, error.message);
      }

      if (isMongoConnectivityError(error)) {
        return apiError(503, "Database connection unavailable.");
      }

      return apiError(500, "Calendar export failed.", error.message);
    }

    return apiError(500, "Calendar export failed.");
  }
}
