/**
 * File: src/app/how-i-built-this/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Public build-story page documenting the ChatGPT and Codex workflow.
 */
import type { Metadata } from "next";

import {
  getGitTimeline,
  getWorkingTreeSummary,
} from "@/lib/build/git-timeline";

export const metadata: Metadata = {
  title: "How I Built This",
};

const timeline = [
  {
    time: "47 mins",
    title: "ChatGPT 5.5 Pro research and PRD sprint",
    body: "Created behavioural-science research notes, a detailed build PRD, privacy constraints, Vercel architecture, and the public-data concept.",
  },
  {
    time: "21:21 BST",
    title: "Documentation and repo setup completed",
    body: "Captured the project documentation milestone, repo baseline, and master-docs structure for the public build story.",
  },
  {
    time: "Build sprint",
    title: "Codex 5.5 implementation",
    body: "Implemented strict TypeScript, L0 Zod schemas, Mongo persistence, scoring, public exports, BYOK AI analysis, tests, and the Next.js UI.",
  },
];

const accountability = [
  {
    label: "Codex wrote",
    body: "The first strict TypeScript implementation of L0 schemas, scoring, Mongo adapters, route handlers, and the assessment UI.",
  },
  {
    label: "Human decided",
    body: "AssessmentOptima as the public brand, WorkStyle Compass as the instrument name, and the hard boundary against selection-use claims.",
  },
  {
    label: "Rejected or constrained",
    body: "Anything that made the product look validated before reliability, validity, fairness, and norming evidence exists.",
  },
];

export default function HowIBuiltThisPage() {
  const gitTimeline = getGitTimeline();
  const workingTreeSummary = getWorkingTreeSummary();

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">The point of the exercise</p>
        <h1 className="page-title">How I built this</h1>
        <p className="lede">
          AssessmentOptima is also a public record of an AI-assisted build:
          ChatGPT 5.5 Pro created the research-backed product direction, then
          Codex 5.5 turned it into a deployable Vercel app.
        </p>
      </section>

      <section className="content-grid">
        {timeline.map((entry) => (
          <article className="panel" key={entry.title}>
            <p className="panel-label">{entry.time}</p>
            <h2>{entry.title}</h2>
            <p>{entry.body}</p>
          </article>
        ))}
      </section>

      <section className="section">
        <div className="callout">
          <h2>Build principles</h2>
          <p>
            The implementation keeps schemas as the source of truth, documents
            meaningful decisions as it goes, avoids raw PII in the open dataset,
            and treats the UI as part of the evidence that AI can produce
            polished, serious product work quickly.
          </p>
        </div>
      </section>

      <section className="dataset-grid">
        <div className="dataset-card">
          <p className="panel-label">Git-derived clock</p>
          <h2>Build receipts</h2>
          <p>{workingTreeSummary}</p>
          <div className="timeline-list">
            {gitTimeline.length > 0 ? (
              gitTimeline.map((entry) => (
                <p key={entry.hash}>
                  <span className="mono">{entry.hash}</span>{" "}
                  {new Date(entry.committedAt).toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}{" "}
                  - {entry.subject}
                </p>
              ))
            ) : (
              <p>Git commit history is unavailable in this runtime.</p>
            )}
          </div>
        </div>

        <div className="dataset-card">
          <p className="panel-label">AI-human accountability</p>
          <h2>Who was accountable for what</h2>
          {accountability.map((entry) => (
            <p key={entry.label}>
              <strong>{entry.label}:</strong> {entry.body}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
