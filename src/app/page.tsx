/**
 * File: src/app/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Public home page for the AssessmentOptima research prototype.
 */
import Link from "next/link";
import { ArrowRight, Download, ShieldCheck, Sparkles } from "lucide-react";

import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";

const mapRows = [
  { label: "Delivery", value: 84, color: "var(--ao-brand)" },
  { label: "Learning", value: 78, color: "var(--ao-science)" },
  { label: "Trust", value: 72, color: "var(--ao-success)" },
  { label: "Pressure", value: 41, color: "var(--ao-pressure)" },
];

export default function Home() {
  return (
    <main className="page">
      <section className="hero" data-layout="two" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">Public research prototype</p>
          <h1 id="home-title">{appConfig.productName}</h1>
          <p className="lede">
            Take a 10-minute work-style assessment, get a developmental report,
            and contribute to an anonymised open dataset on how people deliver,
            collaborate, lead change, and use AI at work.
          </p>
          <div className="hero-actions">
            <Link className="button" href={routes.assessment}>
              Start assessment <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="button-secondary" href={routes.science}>
              Read the science
            </Link>
          </div>
        </div>

        <div className="assessment-map" aria-label="Assessment report preview">
          <div className="map-panel">
            <p className="panel-label">Live report preview</p>
            {mapRows.map((row) => (
              <div className="map-row" key={row.label}>
                <span>{row.label}</span>
                <div className="map-track">
                  <strong
                    style={
                      {
                        width: `${row.value}%`,
                        "--map-color": row.color,
                      } as React.CSSProperties
                    }
                  />
                </div>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="metric-grid" aria-label="Product principles">
        <div className="metric">
          <span>Use boundary</span>
          <strong>Dev</strong>
          <p>Self-reflection, coaching, team learning, and research only.</p>
        </div>
        <div className="metric">
          <span>Dataset posture</span>
          <strong>Open</strong>
          <p>Scale-level rows, coarse buckets, and threshold protection.</p>
        </div>
        <div className="metric">
          <span>Build story</span>
          <strong>5.5</strong>
          <p>Documented ChatGPT 5.5 and Codex 5.5 build workflow.</p>
        </div>
      </section>

      <section className="section">
        <div className="content-grid">
          <div className="callout">
            <ShieldCheck aria-hidden="true" />
            <h2>Privacy-first by design</h2>
            <p>
              No names, emails, employer names, job-title free text, or raw IP
              storage. The open dataset uses anonymised, coarse-grained fields
              with minimum-cell protection before public release.
            </p>
          </div>
          <div className="callout" data-tone="science">
            <Sparkles aria-hidden="true" />
            <h2>AI-assisted analysis</h2>
            <p>
              Visitors can download the dataset or use their own provider key
              for cautious synthesis. The prototype does not store user API
              keys.
            </p>
          </div>
        </div>
        <div className="action-row">
          <Link className="button-secondary" href={routes.dataset}>
            <Download size={18} aria-hidden="true" />
            View dataset
          </Link>
          <Link className="button-ghost" href={routes.limitations}>
            Read the limits
          </Link>
        </div>
      </section>
    </main>
  );
}
