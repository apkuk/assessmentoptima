/**
 * File: src/app/opengraph-image.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Default Open Graph image for non-result public pages.
 */
import { ImageResponse } from "next/og";

import { appConfig } from "@/config/app";

export const runtime = "nodejs";
export const size = appConfig.socialImageSize;
export const contentType = appConfig.socialImageContentType;

export default function OpenGraphImage() {
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
          padding: 48,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#00615f", fontSize: 28, fontWeight: 800 }}>
            {appConfig.productName}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 82,
              height: 82,
              background: "#003f3e",
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            AO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              maxWidth: 850,
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -1,
              lineHeight: 0.98,
            }}
          >
            Open work-style research assessment
          </div>
          <div
            style={{
              maxWidth: 790,
              marginTop: 28,
              color: "#53635f",
              fontSize: 30,
              lineHeight: 1.35,
            }}
          >
            Developmental reports, anonymised dataset, BYOK AI analysis, and a
            public ChatGPT 5.5 / Codex with GPT-5.5 build story.
          </div>
        </div>

        <div
          style={{ display: "flex", gap: 16, color: "#2d3c38", fontSize: 24 }}
        >
          <span>Science-informed</span>
          <span>•</span>
          <span>Privacy-first</span>
          <span>•</span>
          <span>Open dataset</span>
        </div>
      </div>
    </div>,
    size,
  );
}
