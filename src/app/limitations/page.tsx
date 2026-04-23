/**
 * File: src/app/limitations/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Public limitations and responsible-use boundary page.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Limitations",
};

export default function LimitationsPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Responsible use</p>
        <h1 className="page-title">Limits matter</h1>
        <p className="lede">
          AssessmentOptima is intentionally framed as an exploratory,
          developmental prototype. The boundary is part of the product.
        </p>
      </section>

      <section className="content-grid">
        <div className="callout" data-tone="pressure">
          <h2>Do not use for selection</h2>
          <p>
            The assessment must not be used for hiring, promotion, redundancy,
            diagnosis, compensation, disciplinary decisions, or any other
            high-stakes decision about a person.
          </p>
        </div>
        <div className="panel">
          <h2>Validation roadmap</h2>
          <p>
            A validated instrument would need internal consistency, factor
            structure, test-retest reliability, criterion validity, subgroup
            fairness, adverse-impact review, norm development, and qualified
            interpretation guidance.
          </p>
        </div>
      </section>
    </main>
  );
}
