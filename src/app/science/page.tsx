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
  title: "Behavioural Science And Validation",
  description:
    "The behavioural science rationale, interpretation limits, and validation roadmap for WorkStyle Compass.",
};

const pillars = [
  {
    title: "Work style, not diagnosis",
    body: "WorkStyle Compass is a developmental work-style assessment. It blends behavioural habits, self-regulation, values, coordination patterns, and AI-era work practice. It is not a clinical tool or a hiring instrument.",
  },
  {
    title: "Grounded in known constructs",
    body: "The domains connect to established ideas such as conscientious follow-through, learning agility, social coordination, emotional regulation, systems thinking, integrity, change readiness, and responsible tool use.",
  },
  {
    title: "Pressure drift, not derailment",
    body: "Each domain includes one overuse item. It creates a coaching prompt about where a useful style may become costly under pressure, not a diagnosis or separate risk scale.",
  },
  {
    title: "AI as work practice",
    body: "Augmented Judgement is treated as a dynamic work-practice domain, not a fixed personality trait. Access, policy, role, and tool maturity all affect it.",
  },
  {
    title: "Open research is exploratory",
    body: "The public dataset can support pattern-finding and better questions. It does not create norms, validity evidence, fairness evidence, or representative percentiles by itself.",
  },
];

const roadmapItems = [
  "Internal consistency per domain.",
  "Factor structure across the three work operating systems.",
  "Test-retest stability over weeks and months.",
  "Criterion links to real work outcomes.",
  "Subgroup fairness and adverse-impact review.",
  "Qualified-user interpretation standards.",
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
          <h1>Research-informed, not validated yet</h1>
          <p className="lede">
            This page explains the behavioural science logic, interpretation
            limits, and validation work still needed. For a practical
            explanation of what the assessment measures, start with the model
            page.
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
          alt="Behavioural science methodology image with anonymised item cards, research notes, and validation marks."
          aspect="landscape"
          className="science-hero-media"
          priority
          src="/images/science-page.png"
        >
          <p className="panel-label">Science posture</p>
          <strong>Developmental. Exploratory. Transparent.</strong>
        </PageImage>
      </section>

      <PageBody navItems={pageNavItems}>
        <Section id="evidence">
          <SectionHeader
            eyebrow="Evidence posture"
            title="What the model is claiming"
            lede="The site should be easy to share, but the scientific language has to stay disciplined. These are reflection hypotheses, not employment decisions or diagnoses."
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
              Before any stronger claim would be appropriate, the instrument
              still needs reliability analysis, factor validation, criterion
              validation, fairness and adverse-impact review, test-retest
              checks, norm development, and qualified-user interpretation
              guidance.
            </p>
          </Surface>
        </Section>

        <Section id="roadmap">
          <SectionHeader
            eyebrow="Validation roadmap"
            title="What we test before claiming more"
            lede="We are keeping a public list of the evidence needed before any stronger claim than developmental prototype would be appropriate."
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
