/**
 * File: src/app/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public home page for the AssessmentOptima research prototype.
 */
import { ArrowRight, Download, ShieldCheck, Sparkles } from "lucide-react";

import { ActionRow, ButtonLink } from "@/components/ui/actions";
import {
  ContentGrid,
  MetricCard,
  PageShell,
  Section,
  Surface,
} from "@/components/ui/page";
import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";

const mapRows = [
  { label: "Commitment", value: 84, color: "var(--ao-brand)" },
  { label: "Learning", value: 78, color: "var(--ao-science)" },
  { label: "Trust", value: 72, color: "var(--ao-success)" },
  { label: "Drift", value: 41, color: "var(--ao-pressure)" },
];

export default function Home() {
  return (
    <PageShell>
      <section className="hero" data-layout="two" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">Public research prototype</p>
          <h1 id="home-title">{appConfig.productName}</h1>
          <p className="lede">
            Take a 10-minute work-style assessment, get a developmental report,
            and contribute to an anonymised open dataset on how people create
            clarity, coordinate with others, adapt under pressure, and use AI at
            work.
          </p>
          <ActionRow placement="hero">
            <ButtonLink href={routes.assessment}>
              Start assessment <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={routes.science} variant="secondary">
              Read the science
            </ButtonLink>
          </ActionRow>
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
        <MetricCard label="Use boundary" value="Dev">
          <p>Self-reflection, coaching, team learning, and research only.</p>
        </MetricCard>
        <MetricCard label="Dataset posture" value="Open">
          <p>Score-level rows, private context, and threshold protection.</p>
        </MetricCard>
        <MetricCard label="Build story" value="AI">
          <p>Transparent ChatGPT and Codex workflow, documented end-to-end.</p>
        </MetricCard>
      </section>

      <Section>
        <ContentGrid>
          <Surface title="Privacy-first by design" variant="callout">
            <ShieldCheck aria-hidden="true" />
            <p>
              No names, emails, employer names, job-title free text, or raw IP
              storage. The open dataset uses anonymised score-level fields with
              minimum-cell protection before public release.
            </p>
          </Surface>
          <Surface
            title="AI-assisted analysis"
            tone="science"
            variant="callout"
          >
            <Sparkles aria-hidden="true" />
            <p>
              Visitors can download the dataset or use their own provider key
              for cautious synthesis. The prototype does not store user API
              keys.
            </p>
          </Surface>
        </ContentGrid>
        <ActionRow>
          <ButtonLink href={routes.dataset} variant="secondary">
            <Download size={18} aria-hidden="true" />
            View dataset
          </ButtonLink>
          <ButtonLink href={routes.limitations} variant="ghost">
            Read the limits
          </ButtonLink>
        </ActionRow>
      </Section>
    </PageShell>
  );
}
