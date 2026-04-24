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
  "Context fields are coarse buckets and can be left as “Prefer not to say.” They support aggregate analysis only; they are not included in public row-level exports at launch.",
  "Public exports contain score-level rows only, protected by a minimum group threshold before anything is released.",
  "Bring-your-own-key AI analysis sends your provider key to our server for a single request and forwards it to the provider you chose. The application does not store it.",
  "The assessment database does not store IP addresses or user-agent strings, though the hosting and security layer may process standard request metadata.",
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
          <Surface key={rule} label={`Rule ${index + 1}`} prose>
            <p>{rule}</p>
          </Surface>
        ))}
      </ContentGrid>

      <ContentGrid className="section">
        <Surface
          prose
          title="Deletion and lookup"
          tone="science"
          variant="callout"
        >
          <p>
            The product does not collect names or email addresses, so there is
            no account lookup route. If you create a private report, use the
            deletion control attached to that report while you still have access
            to its private management link.
          </p>
        </Surface>
        <Surface prose title="Retention" variant="callout">
          <p>{appConfig.retentionPolicyPlaceholder}</p>
        </Surface>
      </ContentGrid>
    </PageShell>
  );
}
