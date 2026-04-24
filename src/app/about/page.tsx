/**
 * File: src/app/about/page.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Public founder/about page for Andrew Kilshaw and the AssessmentOptima project context.
 */
import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";

import { ActionRow, ButtonLink } from "@/components/ui/actions";
import {
  ContentGrid,
  MetricCard,
  PageHeader,
  PageShell,
  Section,
  Surface,
} from "@/components/ui/page";
import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "About Andrew Kilshaw",
  description:
    "About Andrew Kilshaw, the founder building AssessmentOptima during an AI sabbatical focused on hands-on AI product work, learning, and practical public examples.",
};

const focusAreas = [
  {
    title: "AI sabbatical",
    body: "Andrew is currently taking an AI sabbatical: learning by building, testing the tools in real projects, and working out where AI genuinely changes professional and personal workflows.",
  },
  {
    title: "Building phoque.ai",
    body: "A major current project is phoque.ai, an AI-powered tutoring app exploring how learning can become more personal, adaptive, and practically useful.",
  },
  {
    title: "Sharing the work",
    body: "On LinkedIn, Andrew shares practical examples of using AI properly: not just finished demos, but the operating model, prompts, reviews, trade-offs, and quality gates behind them.",
  },
  {
    title: "AssessmentOptima",
    body: `${appConfig.productName} is one of those proof points: a public work-style research prototype showing how AI-assisted product building can move from science and PRD to deployed software.`,
  },
];

const careerSignals = [
  {
    label: "Sanofi",
    value: "SVP",
    body: "Group Head of Organisational Capability & Transformation for a global biopharma organisation of 90k+ employees.",
  },
  {
    label: "Shell",
    value: "$1B+",
    body: "Led global OD and learning work connected to a major Downstream transformation and energy-transition shift.",
  },
  {
    label: "Nike",
    value: "$6B+",
    body: "Held senior HR, strategy, digital, learning, and regional leadership roles across Nike, Jordan Brand, Digital, and APLA.",
  },
  {
    label: "Enterprise",
    value: "300+",
    body: "Built and led large global transformation, learning, people analytics, capability, and organisation-consulting teams.",
  },
];

const experienceHighlights = [
  "CEO and Founding Partner at TalentOptima, focused on organisational capability, transformation, AI, analytics, and research-to-practice work.",
  "Former Group Head of Organisational Capability & Transformation at Sanofi, with responsibility across people analytics, transformation, enterprise learning, capability consulting, and workforce strategy.",
  "Former VP OD & Learning at Shell for Downstream, Integrated Gas, and New Energies.",
  "Former Nike executive across Asia Pacific & Latin America, Nike Digital, Jordan Brand strategy, global brand functions, and NikeU.",
  "Earlier global talent, innovation, and merger-integration leadership at BlackRock/BGI.",
  "MBA with distinction in Leadership from IMD, plus a physics degree with French from the University of Manchester and Universite Sabatier.",
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About the builder"
        title="Andrew Kilshaw"
        lede="Andrew is a transformation, organisation capability, and AI practitioner using this sabbatical to learn in public: building real AI products, pressure-testing the workflow, and sharing practical examples of what works."
      />

      <Section>
        <Surface
          label="Current chapter"
          title="Hands-on AI, not slideware"
          variant="callout"
        >
          <p>
            The point of this project is not just the assessment. It is the
            process behind it: using AI as a serious product-building partner,
            with behavioural science, privacy, architecture, UX, documentation,
            testing, and deployment all in the loop.
          </p>
          <ActionRow>
            <ButtonLink href={routes.howIBuiltThis}>
              Read the build story <ArrowRight aria-hidden="true" size={16} />
            </ButtonLink>
            <a
              className="button-secondary"
              href="https://talentoptima.co/"
              rel="noreferrer"
              target="_blank"
            >
              TalentOptima <ExternalLink aria-hidden="true" size={16} />
            </a>
            <a
              className="button-secondary"
              href="https://www.linkedin.com/in/apkilshaw/"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn <ExternalLink aria-hidden="true" size={16} />
            </a>
            <a
              className="button-secondary"
              href="https://phoque.ai"
              rel="noreferrer"
              target="_blank"
            >
              Visit phoque.ai <ExternalLink aria-hidden="true" size={16} />
            </a>
          </ActionRow>
        </Surface>
      </Section>

      <ContentGrid>
        {focusAreas.map((area) => (
          <Surface key={area.title} label="Focus" title={area.title}>
            <p>{area.body}</p>
          </Surface>
        ))}
      </ContentGrid>

      <Section>
        <div className="metric-grid">
          {careerSignals.map((signal) => (
            <MetricCard
              key={signal.label}
              label={signal.label}
              value={signal.value}
            >
              <p>{signal.body}</p>
            </MetricCard>
          ))}
        </div>
      </Section>

      <ContentGrid>
        <Surface label="Background" title="Enterprise transformation track">
          <ul>
            {experienceHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </Surface>
        <Surface
          label="Why this matters"
          title="AI with practitioner judgement"
        >
          <p>
            Andrew&apos;s bias is toward AI that survives contact with real
            work: products that are useful, transparent about limits, grounded
            in evidence where they make scientific claims, and built with enough
            engineering discipline to be trusted.
          </p>
          <p>
            {appConfig.productName} is intentionally framed that way. It is a
            developmental research prototype, not a validated selection
            instrument, and its build story is part of the public record.
          </p>
        </Surface>
      </ContentGrid>
    </PageShell>
  );
}
