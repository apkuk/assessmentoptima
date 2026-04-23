/**
 * File: src/app/privacy/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Public privacy and open-data handling page.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

const rules = [
  "No names, emails, company names, exact job titles, raw IP addresses, or free-text respondent comments are collected for the public dataset.",
  "Context fields are coarse buckets and can be answered as prefer not.",
  "Public exports are scale-level rows only, protected by a minimum group threshold.",
  "Bring-your-own-key AI analysis does not store provider keys in the application database.",
];

export default function PrivacyPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Data protection</p>
        <h1 className="page-title">Privacy posture</h1>
        <p className="lede">
          The product is designed around data minimisation: collect only enough
          information to generate a report and support safe, anonymised public
          research.
        </p>
      </section>

      <section className="content-grid">
        {rules.map((rule, index) => (
          <div className="panel" key={rule}>
            <p className="panel-label">Rule {index + 1}</p>
            <p>{rule}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
