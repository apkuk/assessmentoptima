/**
 * File: src/app/assessment/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Assessment entry page hosting consent, context, item, and submit flow.
 */
import type { Metadata } from "next";

import { AssessmentForm } from "@/features/assessment/components/assessment-form";

export const metadata: Metadata = {
  title: "Your WorkStyle Compass",
};

export default function AssessmentPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">WorkStyle Compass v0</p>
        <h1 className="page-title">Your WorkStyle Compass</h1>
        <p className="lede">
          No right answers - just what is true for you at work right now. Takes
          about 8 minutes. You will get a developmental report at the end.
        </p>
      </section>
      <AssessmentForm />
    </main>
  );
}
