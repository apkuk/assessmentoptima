/**
 * File: src/app/science/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public methodology and behavioural science explanation page.
 */
import type { Metadata } from "next";

import { ActionRow, ButtonLink } from "@/components/ui/actions";
import { CodeBlock } from "@/components/ui/code-block";
import {
  ContentGrid,
  PageBody,
  type PageNavItem,
  PageShell,
  Section,
  SectionHeader,
  Surface,
} from "@/components/ui/page";
import { PageImage } from "@/components/ui/page-media";
import { citations } from "@/config/app";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Behavioural Science and Validation",
  description:
    "The behavioural science rationale, interpretation limits, and validation roadmap for WorkStyle Compass.",
};

const pillars = [
  {
    title: "A work-style construct, not a diagnosis",
    body: "WorkStyle Compass describes self-reported work patterns. It blends trait-adjacent tendencies, behavioural habits, self-regulation, values, coordination patterns, and AI-era work practice. It is not a clinical tool or a hiring instrument.",
  },
  {
    title: "Grounded in recognised constructs",
    body: "The domains are informed by established ideas such as conscientious follow-through, learning orientation, social coordination, emotional regulation, systems thinking, integrity, change readiness, and responsible tool use.",
  },
  {
    title: "Pressure drift, not derailment",
    body: "Each domain includes one overuse item. It creates a coaching prompt about where a useful style may become costly under pressure. It is not a diagnosis, derailer scale, or validated risk score.",
  },
  {
    title: "AI as contextual work practice",
    body: "Augmented Judgement is treated as a dynamic work-practice domain, not a fixed personality trait. Access, policy, role, task design, and tool maturity all affect it.",
  },
  {
    title: "Open data does not create norms",
    body: "The public dataset can support pattern-finding and better research questions. A self-selected open sample does not create representative norms, validity evidence, fairness evidence, or selection guidance by itself.",
  },
];

const roadmapItems = [
  "Internal consistency and item performance per domain.",
  "Exploratory and confirmatory factor structure across the three work operating systems.",
  "Test-retest stability over weeks and months.",
  "Convergent and discriminant evidence against established personality and work-style measures.",
  "Criterion links to relevant work outcomes.",
  "Subgroup fairness and adverse-impact review.",
  "Norm development only after sample quality is defensible.",
  "Qualified-user interpretation standards and technical documentation.",
];

const pageNavItems = [
  { href: "#evidence", label: "Evidence posture" },
  { href: "#boundaries", label: "Use boundaries" },
  { href: "#roadmap", label: "Validation roadmap" },
  { href: "#citation", label: "Citation" },
] as const satisfies readonly PageNavItem[];

export default function SciencePage() {
  return (
    <PageShell>
      <section className="hero" data-layout="two">
        <div className="hero-copy">
          <p className="eyebrow">Behavioural science</p>
          <h1>Research-informed, validation still pending</h1>
          <p className="lede">
            This is the technical companion to the model page. It explains the
            construct logic, self-report limits, evidence status, and validation
            work needed before any stronger claim would be appropriate.
          </p>
          <ActionRow placement="hero">
            <ButtonLink href={routes.model} variant="secondary">
              See the practical model
            </ButtonLink>
            <ButtonLink href={routes.limitations} variant="ghost">
              Read the limitations
            </ButtonLink>
          </ActionRow>
        </div>

        <PageImage
          alt="Behavioural science methodology visual with anonymised item cards, research notes, and validation marks."
          aspect="landscape"
          className="science-hero-media"
          priority
          src="/images/science-page.png"
        >
          <p className="panel-label">Science posture</p>
          <strong>Evidence before claims.</strong>
        </PageImage>
      </section>

      <PageBody navItems={pageNavItems}>
        <Section id="evidence">
          <SectionHeader
            eyebrow="Evidence posture"
            title="What can be claimed today"
            lede="The current instrument supports developmental hypotheses for reflection and conversation. It does not yet support prediction, employment decisions, diagnosis, or normative comparison."
          />
          <ContentGrid>
            {pillars.map((pillar) => (
              <Surface
                key={pillar.title}
                label="Principle"
                title={pillar.title}
              >
                <p>{pillar.body}</p>
              </Surface>
            ))}
          </ContentGrid>
        </Section>

        <Section id="boundaries">
          <Surface
            prose
            title="What this is not"
            tone="pressure"
            variant="callout"
          >
            <p>
              This prototype has not been validated for selection, prediction,
              or any other high-stakes use. It must not be used for hiring,
              promotion, redundancy, diagnosis, compensation, or disciplinary
              decisions.
            </p>
            <p>
              No individual result should be interpreted as evidence of
              capability, potential, suitability, or employment risk. Before any
              stronger claim would be appropriate, the instrument needs
              reliability analysis, factor evidence, criterion evidence,
              fairness review, test-retest checks, norm development, and
              qualified-user interpretation guidance.
            </p>
          </Surface>
        </Section>

        <Section id="roadmap">
          <SectionHeader
            eyebrow="Validation roadmap"
            title="What we test before claiming more"
            lede="The roadmap separates product usefulness from scientific validation. The product can be useful now; stronger psychometric claims require evidence."
          />
          <ol className="science-roadmap">
            {roadmapItems.map((item, index) => (
              <li key={item}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="citation">
          <Surface prose label="Citation" title="Cite this methodology">
            <p>
              If you reference the Work Operating System model or the WorkStyle
              Compass assessment in research, teaching, or writing, please cite
              it in the form below. BibTeX is provided for convenience.
            </p>
            <CodeBlock label="BibTeX citation for the WorkStyle Compass methodology">
              {citations.methodology}
            </CodeBlock>
          </Surface>
        </Section>
      </PageBody>
    </PageShell>
  );
}
