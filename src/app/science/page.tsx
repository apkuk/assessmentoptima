/**
 * File: src/app/science/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public methodology and behavioural science explanation page.
 */
import type { Metadata } from "next";

import {
  ContentGrid,
  PageHeader,
  PageShell,
  Section,
  Surface,
} from "@/components/ui/page";
import { citations } from "@/config/app";

export const metadata: Metadata = {
  title: "Science",
};

const pillars = [
  {
    title: "Everyday work style",
    body: "The assessment estimates patterns in reliable execution, learning, social influence, collaboration, emotional regulation, systems thinking, integrity, change agency, and AI-augmented judgement.",
  },
  {
    title: "Pressure and overuse",
    body: "Each scale includes a pressure item so high strengths can be interpreted with the risk of overuse, not just celebrated as universally positive.",
  },
  {
    title: "Open research posture",
    body: "The public dataset supports exploratory analysis. It does not create norms, validity evidence, fairness evidence, or representative percentiles by itself.",
  },
  {
    title: "AI as work practice",
    body: "AI-Augmented Judgement is treated as a dynamic work-practice domain, not a fixed personality trait. Access, policy, role, and tool maturity all affect it.",
  },
  {
    title: "Developmental interpretation",
    body: "Results are written as hypotheses for reflection, coaching, and team conversation, not as employment decisions or diagnostic labels.",
  },
];

export default function SciencePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Methodology"
        title="The science behind the prototype"
        lede="AssessmentOptima borrows a broad architecture from professional assessment practice: normal work style, pressure risk, motives and values, and role-relevant interpretation. The item bank and scale names are original."
      />

      <ContentGrid>
        {pillars.map((pillar) => (
          <Surface key={pillar.title} label="Principle" title={pillar.title}>
            <p>{pillar.body}</p>
          </Surface>
        ))}
      </ContentGrid>

      <Section>
        <Surface title="What this is not" tone="pressure" variant="callout">
          <p>
            This v0 is not a validated psychometric instrument. It has not yet
            been through reliability analysis, factor validation, criterion
            validation, fairness review, test-retest checks, norm development,
            or qualified-user interpretation standards. It must not be used for
            hiring, promotion, redundancy, diagnosis, or high-stakes employment
            decisions.
          </p>
        </Surface>
      </Section>

      <ContentGrid>
        <Surface
          label="Pre-registration posture"
          title="What we will test before claiming"
        >
          <p>
            Reliability, factor structure, test-retest stability, criterion
            links, subgroup fairness, and adverse-impact signals must be tested
            before this becomes anything more than a developmental prototype.
          </p>
        </Surface>
        <Surface label="Citation" title="Cite the v0 method">
          <p className="mono">{citations.methodology}</p>
        </Surface>
      </ContentGrid>
    </PageShell>
  );
}
