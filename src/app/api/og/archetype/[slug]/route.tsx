/**
 * File: src/app/api/og/archetype/[slug]/route.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Dynamic share-safe OG image for public archetype pages.
 */
import { ImageResponse } from "next/og";

import { appConfig } from "@/config/app";
import { publicArchetypes } from "@/features/assessment/application/scoring";

export const runtime = "nodejs";
export const size = appConfig.socialImageSize;
export const contentType = appConfig.socialImageContentType;

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const archetype = publicArchetypes.find((candidate) => candidate.id === slug);

  if (!archetype) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#f7f9f8",
        color: "#13201e",
        display: "flex",
        fontFamily: "Inter, Arial, sans-serif",
        height: "100%",
        padding: 58,
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #a7b9b3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 48,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#00615f",
                display: "flex",
                fontSize: 26,
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              {appConfig.productName}
            </div>
            <div style={{ color: "#53635f", display: "flex", fontSize: 24 }}>
              {appConfig.assessmentName} public archetype
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              background: "#003f3e",
              color: "#ffffff",
              display: "flex",
              fontSize: 30,
              fontWeight: 900,
              height: 86,
              justifyContent: "center",
              width: 86,
            }}
          >
            AO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#53635f", display: "flex", fontSize: 32 }}>
            My WorkStyle Compass pattern
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 900,
              lineHeight: 0.95,
              marginTop: 10,
            }}
          >
            {archetype.name}
          </div>
          <div
            style={{
              color: "#2d3c38",
              display: "flex",
              fontSize: 31,
              lineHeight: 1.35,
              marginTop: 28,
              maxWidth: 850,
            }}
          >
            {archetype.summary}
          </div>
        </div>

        <div style={{ color: "#53635f", display: "flex", fontSize: 24 }}>
          Share-safe summary only. No private scores, context, or result tokens.
        </div>
      </div>
    </div>,
    size,
  );
}
