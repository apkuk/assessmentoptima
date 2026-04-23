/**
 * File: src/app/api/og/[token]/route.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Dynamic social card for a shareable AssessmentOptima result.
 */
import { ImageResponse } from "next/og";

import { appConfig } from "@/config/app";
import { createAssessmentSubmissionRepository } from "@/features/assessment/adapters/mongo/assessment-submission-repository";
import { parseStatelessResultToken } from "@/features/assessment/application/stateless-result-token";
import { resultTokenSchema } from "@/features/assessment/schemas/assessment";
import { getServerEnv } from "@/lib/env/server";
import { hashResultToken, resolveHashSecret } from "@/lib/security/tokens";

export const runtime = "nodejs";
export const size = appConfig.socialImageSize;
export const contentType = appConfig.socialImageContentType;

interface RouteContext {
  params: Promise<{ token: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const env = getServerEnv();
  const { token } = await context.params;
  const parsedToken = resultTokenSchema.parse(token);
  const hashSecret = resolveHashSecret(env.HASH_SECRET);
  const statelessResult = parseStatelessResultToken(parsedToken, hashSecret);
  const repository = createAssessmentSubmissionRepository();
  const submission = statelessResult
    ? null
    : await repository.findByTokenHash(
        hashResultToken(parsedToken, hashSecret),
      );
  const result = statelessResult?.result ?? submission?.result;

  if (!result) {
    return new Response("Not found", { status: 404 });
  }

  const topScores = result.topScales.map((scaleKey) => result.scores[scaleKey]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#f7f9f8",
        color: "#13201e",
        padding: 58,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          border: "1px solid #a7b9b3",
          background: "#ffffff",
          padding: 44,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: "#00615f",
                fontSize: 24,
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {appConfig.productName}
            </div>
            <div style={{ display: "flex", color: "#53635f", fontSize: 24 }}>
              {appConfig.assessmentName} result
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              background: "#003f3e",
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            AO
          </div>
        </div>

        <div style={{ display: "flex", gap: 44 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", color: "#53635f", fontSize: 30 }}>
              My archetype
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 8,
                fontSize: 78,
                fontWeight: 800,
                lineHeight: 0.95,
              }}
            >
              {result.archetype.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                color: "#2d3c38",
                fontSize: 28,
                lineHeight: 1.35,
              }}
            >
              {result.archetype.summary}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 340,
              gap: 16,
            }}
          >
            {topScores.map((score) => (
              <div
                key={score.key}
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  <span>{score.shortName}</span>
                  <span>{score.score}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: 18,
                    background: "#edf5f2",
                  }}
                >
                  <div
                    style={{
                      width: `${score.score}%`,
                      background: "#00615f",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", color: "#53635f", fontSize: 24 }}>
          Developmental, open-research prototype. Not for high-stakes employment
          decisions.
        </div>
      </div>
    </div>,
    size,
  );
}
