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
import { PageImage } from "@/components/ui/page-media";
import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";

const mapRows = [
  { label: "Commitment Rhythm", value: 84, color: "var(--ao-brand)" },
  { label: "Adaptive Learning", value: 78, color: "var(--ao-science)" },
  { label: "Trust Stewardship", value: 72, color: "var(--ao-success)" },
  { label: "Pressure Regulation", value: 41, color: "var(--ao-pressure)" },
];

export default function Home() {
  return (
    <PageShell>
      <section className="hero" data-layout="two" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">Public research study</p>
          <h1 id="home-title">{appConfig.productName}</h1>
          <p className="lede">
            Take a 10-minute work-style assessment, get a developmental report,
            and contribute to an anonymised open dataset on how people create
            clarity, work with others, adapt under pressure, and use AI at work.
          </p>
          <div className="hero-meta" aria-label="Assessment summary">
            <span>54 statements</span>
            <span>About 10 minutes</span>
            <span>Developmental only</span>
          </div>
          <ActionRow placement="hero">
            <ButtonLink href={routes.assessment}>
              Start assessment <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={routes.model} variant="secondary">
              See the model
            </ButtonLink>
          </ActionRow>
        </div>

        <PageImage
          alt="Editorial image of anonymised assessment charts, radar data, and research cards on a calm lab desk."
          aspect="landscape"
          className="home-hero-media"
          priority
          src="/images/home-hero.png"
        >
          <div className="map-panel">
            <p className="panel-label">Example report preview</p>
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
        </PageImage>
      </section>

      <section className="metric-grid" aria-label="Product principles">
        <MetricCard label="Use boundary" value="Reflection">
          <p>
            For self-reflection, coaching, team learning, and research only.
          </p>
        </MetricCard>
        <MetricCard label="Open dataset" value="Shared safely">
          <p>
            Only score-level data is shared. Private context stays private, and
            exports open only when enough responses make the data safe to
            release.
          </p>
        </MetricCard>
        <MetricCard label="Build story" value="AI">
          <p>
            A transparent ChatGPT and Codex build workflow, documented
            end-to-end.
          </p>
        </MetricCard>
      </section>

      <Section>
        <ContentGrid>
          <Surface title="Privacy-first by design" variant="callout">
            <ShieldCheck aria-hidden="true" />
            <p>
              No names, emails, employer names, job-title free text, or raw IP
              storage. Public data is limited to anonymised scores and only
              released when sample sizes are large enough.
            </p>
          </Surface>
          <Surface
            title="AI-assisted analysis"
            tone="science"
            variant="callout"
          >
            <Sparkles aria-hidden="true" />
            <p>
              Visitors can download the dataset or use their own OpenAI or
              Anthropic key for cautious analysis. The site does not store user
              API keys.
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
