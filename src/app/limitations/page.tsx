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
        title="Limits matter"
        lede="AssessmentOptima is intentionally framed as an exploratory, developmental prototype. The boundary is part of the product."
      />

      <ContentGrid>
        <Surface
          prose
          title="Do not use for selection"
          tone="pressure"
          variant="callout"
        >
          <p>
            The assessment must not be used for hiring, promotion, redundancy,
            diagnosis, compensation, disciplinary decisions, or any other
            high-stakes decision about a person.
          </p>
        </Surface>
        <Surface prose title="Validation roadmap">
          <p>
            A validated instrument would need internal consistency, factor
            structure, test-retest reliability, criterion validity, subgroup
            fairness, adverse-impact review, norm development, and qualified
            interpretation guidance.
          </p>
        </Surface>
      </ContentGrid>
    </PageShell>
  );
}
