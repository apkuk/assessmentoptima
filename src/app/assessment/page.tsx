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
        title="Your WorkStyle Compass"
        lede="No right answers - just what is true for you at work right now. Takes about 8 minutes. You will get a developmental report at the end."
      />
      <AssessmentForm />
    </PageShell>
  );
}
