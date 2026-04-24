/**
 * File: src/app/privacy/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public privacy and open-data handling page.
 */
import type { Metadata } from "next";

import {
  ContentGrid,
  PageHeader,
  PageShell,
  Surface,
} from "@/components/ui/page";
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
    <PageShell>
      <PageHeader
        eyebrow="Data protection"
        title="Privacy posture"
        lede="The product is designed around data minimisation: collect only enough information to generate a report and support safe, anonymised public research."
      />

      <ContentGrid>
        {rules.map((rule, index) => (
          <Surface key={rule} label={`Rule ${index + 1}`}>
            <p>{rule}</p>
          </Surface>
        ))}
      </ContentGrid>

      <ContentGrid className="section">
        <Surface title="Contact" tone="science" variant="callout">
          <p>
            Privacy and deletion queries should go to{" "}
            <a href={`mailto:${appConfig.privacyContactEmail}`}>
              {appConfig.privacyContactEmail}
            </a>
            .
          </p>
        </Surface>
        <Surface title="Retention" variant="callout">
          <p>{appConfig.retentionPolicyPlaceholder}</p>
        </Surface>
      </ContentGrid>
    </PageShell>
  );
}
