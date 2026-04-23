/**
 * File: src/app/assessment/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Assessment entry page hosting consent, context, item, and submit flow.
 */
import type { Metadata } from "next";

import { AssessmentForm } from "@/features/assessment/components/assessment-form";

export const metadata: Metadata = {
  title: "Take the Assessment",
};

export default function AssessmentPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">WorkStyle Compass v0</p>
        <h1 className="page-title">Take the assessment</h1>
        <p className="lede">
          Rate each statement from 1 to 5. There are no ideal answers: the
          report is designed to show likely contribution patterns, pressure
          risks, and development experiments.
        </p>
      </section>
      <AssessmentForm />
    </main>
  );
}
