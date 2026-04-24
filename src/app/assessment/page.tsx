/**
 * File: src/app/assessment/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Assessment entry page hosting consent, context, item, and submit flow.
 */
import type { Metadata } from "next";

import { PageHeader, PageShell } from "@/components/ui/page";
import { AssessmentForm } from "@/features/assessment/components/assessment-form";

export const metadata: Metadata = {
  title: "Your WorkStyle Compass",
};

export default function AssessmentPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="WorkStyle Compass"
        title="Take the assessment"
        lede="A guided, private-first flow that takes about 8 minutes and returns a developmental work-style report."
      />
      <AssessmentForm />
    </PageShell>
  );
}
