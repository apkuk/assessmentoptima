/**
 * File: src/app/limitations/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public limitations and responsible-use boundary page.
 */
import type { Metadata } from "next";

import {
  ContentGrid,
  PageHeader,
  PageShell,
  Surface,
} from "@/components/ui/page";

export const metadata: Metadata = {
  title: "Limitations",
};

export default function LimitationsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Responsible use"
        title="Use it for reflection, not decisions about people"
        lede="AssessmentOptima is intentionally framed as an exploratory, developmental prototype. Its limits are not fine print; they are part of using the product responsibly."
      />

      <ContentGrid>
        <Surface prose title="Appropriate use" variant="callout">
          <p>
            WorkStyle Compass is designed for self-reflection, coaching
            conversations, team learning, and open research. Treat results as
            useful hypotheses about work style, not as fixed labels or proof of
            capability.
          </p>
        </Surface>
        <Surface
          prose
          title="Do not use for employment decisions"
          tone="pressure"
          variant="callout"
        >
          <p>
            The assessment must not be used for hiring, promotion, redundancy,
            compensation, disciplinary decisions, diagnosis, or any other
            high-stakes decision about a person. It is not a validated selection
            instrument.
          </p>
        </Surface>
        <Surface prose title="How to read scores">
          <p>
            A high score is not automatically good, and a lower score is not
            automatically a weakness. The value of any pattern depends on the
            role, context, pressure level, and what the work currently needs.
          </p>
        </Surface>
        <Surface prose title="Evidence still needed">
          <p>
            Stronger claims would require internal consistency evidence, factor
            validation, test-retest reliability, criterion validity, subgroup
            fairness checks, adverse-impact review, norm development, and
            qualified interpretation guidance.
          </p>
        </Surface>
      </ContentGrid>
    </PageShell>
  );
}
