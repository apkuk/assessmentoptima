/**
 * File: src/app/model/page.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Practical user-facing explanation of what WorkStyle Compass measures and returns.
 */
import type { Metadata } from "next";
import { ArrowRight, Compass, Radar, Workflow } from "lucide-react";

import { ActionRow, ButtonLink } from "@/components/ui/actions";
import {
  MetricCard,
  PageBody,
  type PageNavItem,
  PageShell,
  Section,
  SectionHeader,
  Surface,
} from "@/components/ui/page";
import { PageImage } from "@/components/ui/page-media";
import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";
import {
  operatingSystemDefinitions,
  scales,
} from "@/features/assessment/application/model";
import { publicArchetypes } from "@/features/assessment/application/scoring";

import { ArchetypeDialogGrid } from "./archetype-dialog-grid";

export const metadata: Metadata = {
  title: `What ${appConfig.assessmentName} Measures`,
  description:
    "A practical explanation of the WorkStyle Compass domains, operating systems, report outputs, and share-safe archetypes.",
};

const reportOutputs = [
  {
    title: "Domain profile",
    body: "Nine scores across clarity, coordination, adaptation, and AI-era judgement.",
  },
  {
    title: "System summary",
    body: "Three Work Operating System scores that show the broader pattern.",
  },
  {
    title: "Developmental readout",
    body: "Strengths, development edges, pressure-drift prompts, and an archetype.",
  },
  {
    title: "30-day experiment",
    body: "One practical behaviour to try, review, and adapt in real work.",
  },
];

const pageNavItems = [
  { href: "#systems", label: "3 systems" },
  { href: "#domains", label: "9 domains" },
  { href: "#report", label: "Report" },
  { href: "#archetypes", label: "Archetypes" },
  { href: "#next", label: "Next step" },
] as const satisfies readonly PageNavItem[];

export default function ModelPage() {
  const operatingSystems = Object.values(operatingSystemDefinitions);

  return (
    <PageShell>
      <section className="hero model-hero" data-layout="two">
        <div className="hero-copy">
          <p className="eyebrow">How it works</p>
          <h1>{`What ${appConfig.assessmentName} measures`}</h1>
          <p className="lede">
            WorkStyle Compass looks at how you turn complex work into useful
            contribution: how you create clarity, work with others, adapt when
            pressure rises, and use AI with judgement.
          </p>
          <ActionRow placement="hero">
            <ButtonLink href={routes.assessment}>
              Start assessment <ArrowRight aria-hidden="true" size={18} />
            </ButtonLink>
            <ButtonLink href={routes.science} variant="secondary">
              Read the science <Compass aria-hidden="true" size={18} />
            </ButtonLink>
          </ActionRow>
        </div>

        <PageImage
          alt="Abstract Work Operating System visual with layered cards, radar geometry, and connected data marks."
          aspect="landscape"
          className="model-hero-media"
          priority
          src="/images/model-page.png"
        >
          <p className="panel-label">Work Operating System</p>
          <strong>3 systems. 9 domains. 1 practical report.</strong>
        </PageImage>
      </section>

      <section className="metric-grid" aria-label="Assessment overview">
        <MetricCard label="Time" value="10 min">
          <p>54 short statements, answered on a five-point scale.</p>
        </MetricCard>
        <MetricCard label="Output" value="Report">
          <p>
            A developmental profile with strengths, pressure drift, and one
            practical experiment.
          </p>
        </MetricCard>
        <MetricCard label="Use" value="Reflection">
          <p>
            For self-reflection, coaching, team learning, and open research.
          </p>
        </MetricCard>
      </section>

      <PageBody navItems={pageNavItems}>
        <Section id="systems">
          <SectionHeader
            eyebrow="3 systems"
            title="The organising framework"
            lede="The model groups work style into three operating systems. Each one is useful on its own; the real value is seeing how they combine."
          />
          <div className="domain-groups">
            {operatingSystems.map((system) => (
              <article className="domain-group" key={system.key}>
                <div className="domain-group__head">
                  <div>
                    <p className="panel-label">Work system</p>
                    <h3>{system.name}</h3>
                  </div>
                  <p>{system.description}</p>
                </div>
                <div className="domain-card-grid">
                  {system.scaleKeys.map((scaleKey) => {
                    const scale = scales[scaleKey];

                    return (
                      <article className="domain-card" key={scale.key}>
                        <p className="panel-label">{scale.shortName}</p>
                        <h4>{scale.name}</h4>
                        <p>{scale.description}</p>
                      </article>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="domains">
          <SectionHeader
            eyebrow="9 domains"
            title="What the assessment looks for"
            lede="Each domain describes a useful work pattern. Higher or lower scores are not automatically better; the value depends on role, context, and what the situation needs."
          />
          <div className="domain-groups">
            {operatingSystems.map((system) => (
              <article className="domain-group" key={system.key}>
                <div className="domain-group__head">
                  <h3>{system.name}</h3>
                  <p>{system.description}</p>
                </div>
                <div className="domain-card-grid">
                  {system.scaleKeys.map((scaleKey) => {
                    const scale = scales[scaleKey];

                    return (
                      <article className="domain-card" key={scale.key}>
                        <p className="panel-label">{scale.shortName}</p>
                        <h4>{scale.name}</h4>
                        <p>{scale.description}</p>
                        <details>
                          <summary>Signals to watch</summary>
                          <dl>
                            <dt>High signal</dt>
                            <dd>{scale.highAnchor}</dd>
                            <dt>Pressure drift</dt>
                            <dd>{scale.pressureDrift}</dd>
                          </dl>
                        </details>
                      </article>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="report">
          <SectionHeader
            eyebrow="Your report"
            title="What you get back"
            lede="The report is designed to be useful in plain English. It gives you a profile you can read yourself, discuss with a coach, or use as a starting point for a team conversation."
          />
          <ol className="report-flow">
            {reportOutputs.map((output, index) => (
              <li className="report-step" key={output.title}>
                <span>{index + 1}</span>
                <h3>{output.title}</h3>
                <p>{output.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="archetypes">
          <SectionHeader
            eyebrow="Archetypes"
            title="A shorthand, not a label"
            lede="Archetypes summarise your most visible current pattern. They are useful for sharing and reflection, but they are not fixed personality types."
          />
          <ArchetypeDialogGrid archetypes={publicArchetypes} />
        </Section>

        <Section id="next">
          <div className="content-grid">
            <Surface title="Model first" variant="callout">
              <Workflow aria-hidden="true" />
              <p>
                The Work Operating System model keeps the report focused on
                contribution, coordination, and adaptation rather than fixed
                labels.
              </p>
            </Surface>
            <Surface
              title="Science underneath"
              tone="science"
              variant="callout"
            >
              <Radar aria-hidden="true" />
              <p>
                The science page explains the behavioural science references,
                self-report limits, open research posture, and validation work
                still needed before stronger claims would be appropriate.
              </p>
            </Surface>
          </div>
          <ActionRow>
            <ButtonLink href={routes.assessment}>
              Start assessment <ArrowRight aria-hidden="true" size={18} />
            </ButtonLink>
            <ButtonLink href={routes.science} variant="secondary">
              Read the science <Compass aria-hidden="true" size={18} />
            </ButtonLink>
          </ActionRow>
        </Section>
      </PageBody>
    </PageShell>
  );
}
