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
  title: "Work Operating System Model",
};

const pillars = [
  {
    title: "Work operating systems",
    body: "WorkStyle Compass uses the Work Operating System model to explain how people turn complexity into contribution through Operational Clarity, Human Coordination, and Adaptive Capacity.",
  },
  {
    title: "Pressure drift",
    body: "Each domain includes one overuse item. It creates a pressure-drift signal for reflection, not a diagnosis or separate risk scale.",
  },
  {
    title: "Open research posture",
    body: "The public dataset supports exploratory analysis. It does not create norms, validity evidence, fairness evidence, or representative percentiles by itself.",
  },
  {
    title: "AI as work practice",
    body: "Augmented Judgement is treated as a dynamic work-practice domain, not a fixed personality trait. Access, policy, role, and tool maturity all affect it.",
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
        title="The Work Operating System model"
        lede="WorkStyle Compass is the assessment. The Work Operating System model is the framework underneath it: Operational Clarity, Human Coordination, and Adaptive Capacity."
      />

      <ContentGrid>
        {pillars.map((pillar) => (
          <Surface key={pillar.title} label="Principle" title={pillar.title}>
            <p>{pillar.body}</p>
          </Surface>
        ))}
      </ContentGrid>

      <Section>
        <Surface
          prose
          title="What this is not"
          tone="pressure"
          variant="callout"
        >
          <p>
            This prototype has not been validated for selection, prediction, or
            any other high-stakes use. It must not be used for hiring,
            promotion, redundancy, diagnosis, compensation, or disciplinary
            decisions.
          </p>
          <p>
            Before any stronger claim would be appropriate, the instrument still
            needs reliability analysis, factor validation, criterion validation,
            fairness and adverse-impact review, test-retest checks, norm
            development, and qualified-user interpretation guidance.
          </p>
        </Surface>
      </Section>

      <ContentGrid>
        <Surface
          prose
          label="Validation roadmap"
          title="What we test before claiming more"
        >
          <p>
            We are keeping a public list of the evidence we would need to
            justify any stronger claim than &ldquo;developmental
            prototype&rdquo;. Until each of these is done, the caveats on this
            page stand.
          </p>
          <ul>
            <li>Internal consistency (Cronbach&rsquo;s alpha) per domain.</li>
            <li>Factor structure across the three work operating systems.</li>
            <li>Test-retest stability over weeks and months.</li>
            <li>Criterion links to real work outcomes.</li>
            <li>Subgroup fairness and adverse-impact review.</li>
            <li>Qualified-user interpretation standards.</li>
          </ul>
        </Surface>
        <Surface prose label="Citation" title="Cite this methodology">
          <p>
            If you reference the Work Operating System model or the WorkStyle
            Compass assessment in research, teaching, or writing, please cite it
            in the form below. BibTeX is provided for convenience.
          </p>
          <pre className="code-block">
            <code>{citations.methodology}</code>
          </pre>
        </Surface>
      </ContentGrid>
    </PageShell>
  );
}
