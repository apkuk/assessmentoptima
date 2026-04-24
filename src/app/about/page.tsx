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
  PageShell,
  Section,
  Surface,
} from "@/components/ui/page";
import { PageImage } from "@/components/ui/page-media";
import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "About Andrew Kilshaw",
  description:
    "About Andrew Kilshaw, the practitioner behind AssessmentOptima and a hands-on AI sabbatical focused on building, testing, and sharing real AI product work.",
};

const focusAreas = [
  {
    title: "AI sabbatical",
    body: "Andrew is using this period to learn by building: testing AI tools in real product work and separating useful workflow changes from hype.",
  },
  {
    title: "Building phoque.ai",
    body: "phoque.ai is an AI-powered tutoring app exploring how learning can become more personal, adaptive, and practically useful.",
  },
  {
    title: "Sharing the work",
    body: "On LinkedIn, Andrew shares the work behind the demos: prompts, reviews, trade-offs, quality gates, and the decisions that made the output better.",
  },
  {
    title: "AssessmentOptima",
    body: `${appConfig.productName} is a public proof point: a research-informed work-style prototype built with transparent AI assistance, privacy constraints, testing, and deployment in the loop.`,
  },
];

const careerSignals = [
  {
    label: "Sanofi",
    value: "SVP",
    body: "Group Head of Organisational Capability & Transformation in a 90k+ employee global biopharma organisation.",
  },
  {
    label: "Shell",
    value: "$1B+",
    body: "Led global OD and learning work connected to a major Downstream transformation and energy-transition agenda.",
  },
  {
    label: "Nike",
    value: "$6B+",
    body: "Held senior HR, strategy, digital, learning, and regional leadership roles across Nike, Jordan Brand, Digital, and APLA.",
  },
  {
    label: "Enterprise",
    value: "300+",
    body: "Built and led global transformation, learning, people analytics, capability, and organisation-consulting teams.",
  },
];

const experienceHighlights = [
  "Founder and CEO at TalentOptima, focused on organisational capability, transformation, AI, analytics, and research-to-practice work.",
  "Former Group Head of Organisational Capability & Transformation at Sanofi, with responsibility across people analytics, transformation, enterprise learning, capability consulting, and workforce strategy.",
  "Former VP OD & Learning at Shell for Downstream, Integrated Gas, and New Energies.",
  "Former Nike executive across Asia Pacific & Latin America, Nike Digital, Jordan Brand strategy, global brand functions, and NikeU.",
  "Earlier global talent, innovation, and merger-integration leadership at BlackRock/BGI.",
  "MBA with distinction in Leadership from IMD, plus a physics degree with French from the University of Manchester and Universite Sabatier.",
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="hero" data-layout="two">
        <div className="hero-copy">
          <p className="eyebrow">About the builder</p>
          <h1>Andrew Kilshaw</h1>
          <p className="lede">
            Andrew is a transformation, organisation capability, and AI
            practitioner using an AI sabbatical to build in public: shipping
            real products, stress-testing the workflow, and sharing what
            actually changes when AI becomes part of the work.
          </p>
          <ActionRow placement="hero">
            <a
              className="button"
              href="https://www.linkedin.com/in/apkilshaw/"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn <ExternalLink aria-hidden="true" size={16} />
            </a>
            <a
              className="button-secondary"
              href="https://talentoptima.co/"
              rel="noreferrer"
              target="_blank"
            >
              TalentOptima <ExternalLink aria-hidden="true" size={16} />
            </a>
          </ActionRow>
        </div>

        <PageImage
          alt="Portrait of Andrew Kilshaw, founder of AssessmentOptima."
          aspect="portrait"
          objectPosition="center 18%"
          priority
          src="/images/APK_Tech.png"
        >
          <p className="panel-label">AI sabbatical</p>
          <strong>Building in public</strong>
        </PageImage>
      </section>

      <Section>
        <Surface
          prose
          label="Current chapter"
          title="Hands-on AI in real products"
          variant="callout"
        >
          <p>
            The point of this project is not just the assessment. It is the
            process behind it: using AI as a serious product-building partner,
            while keeping behavioural science, privacy, architecture, UX,
            documentation, testing, and deployment in the loop.
          </p>
          <ActionRow>
            <ButtonLink href={routes.howIBuiltThis}>
              Read the build story <ArrowRight aria-hidden="true" size={16} />
            </ButtonLink>
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
          <Surface key={area.title} label="Focus" prose title={area.title}>
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
        <Surface
          label="Background"
          prose
          title="Enterprise transformation track"
        >
          <ul>
            {experienceHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </Surface>
        <Surface
          label="Why this matters"
          prose
          title="AI with practitioner judgement"
        >
          <p>
            Andrew&apos;s bias is toward AI that survives contact with real
            work: useful outputs, transparent limits, evidence where scientific
            claims are made, and enough engineering discipline to be trusted.
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
