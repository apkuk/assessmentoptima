/**
 * File: src/app/privacy/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public privacy and open-data handling page.
 */
import type { Metadata } from "next";

import { appConfig } from "@/config/app";

export const metadata: Metadata = {
  title: "Privacy",
};

const rules = [
  "No names, emails, company names, exact job titles, raw IP addresses, or free-text respondent comments are collected for the public dataset.",
  "Context fields are coarse buckets and can be answered as prefer not; they support aggregate analysis, not v0 row-level export.",
  "Public exports are score-level rows only at launch, protected by a minimum group threshold.",
  "Bring-your-own-key AI analysis sends the key to the server for the provider request, but the application does not store it.",
  "The assessment database does not store IP addresses or user-agent strings, though hosting and security providers may process operational request metadata.",
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

      <section className="content-grid section">
        <div className="callout" data-tone="science">
          <h2>Contact</h2>
          <p>
            Privacy and deletion queries should go to{" "}
            <a href={`mailto:${appConfig.privacyContactEmail}`}>
              {appConfig.privacyContactEmail}
            </a>
            .
          </p>
        </div>
        <div className="callout">
          <h2>Retention</h2>
          <p>{appConfig.retentionPolicyPlaceholder}</p>
        </div>
      </section>
    </main>
  );
}
