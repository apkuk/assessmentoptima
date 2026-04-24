/**
 * File: src/app/how-i-built-this/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public build-story page documenting the ChatGPT and Codex workflow.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";
import {
  getGitTimeline,
  getWorkingTreeSummary,
} from "@/lib/build/git-timeline";

import styles from "./how-i-built-this.module.css";

export const metadata: Metadata = {
  title: "How I Built This",
  description:
    "A transparent build story for AssessmentOptima: ChatGPT 5.5 research and PRD work, Codex 5.5 implementation, Vercel deployment, and the limits of the prototype.",
};

const proofStats = [
  {
    value: "47 min",
    label: "ChatGPT 5.5 Pro research and PRD handoff",
  },
  {
    value: "2 hr",
    label: "Codex/Vercel sprint target for the public v0",
  },
  {
    value: "54",
    label: `${appConfig.assessmentName} assessment items`,
  },
  {
    value: "30",
    label: "fast Vitest checks covering the core rules",
  },
];

const askCards = [
  {
    label: "Ask 1",
    title: "Create the behavioural-science brief",
    body: "ChatGPT 5.5 Pro was asked to turn a rough Hogan-style idea into an original, research-informed, privacy-aware product brief with a full assessee cycle, open data, BYOK AI analysis, and a beautiful UX.",
  },
  {
    label: "Ask 2",
    title: "Build and launch the product",
    body: "Codex 5.5 used the PRD and master docs to implement the Next.js app, strict TypeScript contracts, MongoDB persistence layer, public routes, tests, deployment wiring, and the build-story page you are reading.",
  },
];

const shippedGroups = [
  {
    title: "Assessment product",
    items: [
      "Gated Intro -> Consent -> About you -> Assessment -> Review flow",
      "54-item WorkStyle Compass model with nine scale scores",
      "Private result report with archetype, radar, strengths, risks, and 30-day experiment",
      "Developmental-only use boundary throughout the product",
    ],
  },
  {
    title: "Open research layer",
    items: [
      "MongoDB Atlas document model for consented submissions",
      "Score-first CSV/JSON export shape with no raw PII or v0 row-level context",
      "Small-cell suppression and provisional internal-consistency snapshot",
      "Data dictionary, citation blocks, and public API documentation",
    ],
  },
  {
    title: "Share and credibility layer",
    items: [
      "Share-safe archetype Open Graph cards for LinkedIn/social previews",
      "Public archetype links, LinkedIn share copy, and separate management-token deletion",
      "Git-derived build receipts and AI-human accountability",
      "A public explanation of what is validated, what is not, and why that matters",
    ],
  },
  {
    title: "AI layer",
    items: [
      "Bring-your-own-key OpenAI/Anthropic analysis flow",
      "No public server-funded AI spend in v0",
      "Prompt transparency, example output, and cautious synthesis rules",
      "Rate limiting and aggregate/export-safe dataset inputs",
    ],
  },
];

const connectedDots = [
  {
    prompt: "Privacy-aware open dataset",
    implication:
      "Consent, Mongo storage, public export allowlists, monthly timestamps, no raw PII, separate private tokens, and threshold protection all had to line up.",
  },
  {
    prompt: "Launch this on LinkedIn",
    implication:
      "The product needed share surfaces, OG cards, a polished hero, API docs, and a public build story with receipts rather than just a form.",
  },
  {
    prompt: "Keep it maintainable",
    implication:
      "L0 Zod schemas became the source of truth, routes moved into one config module, product constants moved into one app config, and files now stay below a 600-line default.",
  },
];

const enterprisePractices = [
  {
    title: "Instruction files make the team consistent",
    body: "AGENTS.md acts like an operating manual: product boundaries, DRY/SSoT rules, no god files, line-count limits, documentation habits, and required QA checks are visible before the model touches code.",
  },
  {
    title: "Tests turn vibe into engineering signal",
    body: "Vitest covers scoring, consent, export shaping, suppression, tokens, and AI prompt guardrails. The point is not theatre; it is fast feedback on the rules that would be expensive to rediscover manually.",
  },
  {
    title: "Strict code quality gates keep drift down",
    body: "Strict TypeScript, ESLint, Prettier, and production builds run as a repeatable verification path. The local standard is pnpm verify plus pnpm build before a serious push.",
  },
  {
    title: "Use the right model for the right job",
    body: "Strategy and documentation benefit from ChatGPT Pro-style deep reasoning. UI polish benefits from strong visual review. Implementation benefits from Codex 5.5 with high or extra-high reasoning on code.",
  },
  {
    title: "Documentation is part of the system",
    body: "The PRD and master docs define architecture, data, privacy, assessment science, AI analysis, delivery, and brand. Source files carry short headers, and comments are reserved for non-obvious constraints.",
  },
  {
    title: "CI should become the public quality gate",
    body: "This repo already has local gates. The next enterprise step is GitHub Actions or Vercel checks that run typecheck, lint, formatting, tests, and build before merges or production promotion.",
  },
  {
    title: "Secrets hygiene is non-negotiable",
    body: ".gitignore, .env discipline, Vercel environment variables, and no raw keys in logs are what stop a fast AI-assisted workflow from becoming an expensive security incident.",
  },
];

const statusRows = [
  {
    label: "Local confidence",
    value: "pnpm verify and pnpm build pass.",
  },
  {
    label: "Deployment",
    value:
      "The public Vercel deployment is live and core static/product routes return 200.",
  },
  {
    label: "Final launch blocker",
    value:
      "Production persistence routes need MongoDB Atlas network access from Vercel/serverless egress before the assessment can be shared as fully transactional.",
  },
];

const accountability = [
  {
    label: "Codex wrote",
    body: "The first working implementation across schemas, scoring, adapters, route handlers, UI flows, tests, and Vercel configuration.",
  },
  {
    label: "Human decided",
    body: "The public brand, the two-hour challenge, the developmental boundary, the LinkedIn narrative, and the standard for what felt credible enough to share.",
  },
  {
    label: "Rejected or constrained",
    body: "Any implication that this became a validated psychometric instrument during the sprint, any direct PII in the public dataset, and any public server-funded AI cost exposure.",
  },
];

export default function HowIBuiltThisPage() {
  const gitTimeline = getGitTimeline(10);
  const workingTreeSummary = getWorkingTreeSummary();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">The public proof point</p>
          <h1>From rough idea to deployed assessment product</h1>
          <p className={styles.lede}>
            {appConfig.productName} is a work-style assessment prototype. It is
            also a transparent case study in what ChatGPT 5.5 and Codex 5.5 can
            do when the brief includes product thinking, behavioural science,
            privacy, data architecture, UX, tests, and deployment.
          </p>
          <div className={styles.heroActions}>
            <Link className="button" href={routes.assessment}>
              Try the assessment
            </Link>
            <Link className="button-secondary" href={routes.science}>
              Read the science
            </Link>
          </div>
        </div>

        <aside className={styles.receiptPanel} aria-label="Build proof points">
          <p className={styles.panelKicker}>Build receipts</p>
          <div className={styles.statGrid}>
            {proofStats.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className={styles.askGrid} aria-label="The two asks">
        {askCards.map((card) => (
          <article className={styles.askCard} key={card.label}>
            <p className={styles.panelKicker}>{card.label}</p>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.panelKicker}>What felt different</p>
          <h2>Not just faster. Less linear.</h2>
          <p>
            The useful part was not only completing requested tasks. It was the
            way the work kept pulling adjacent requirements forward before they
            became failures.
          </p>
        </div>
        <div className={styles.dotGrid}>
          {connectedDots.map((dot) => (
            <article className={styles.dotCard} key={dot.prompt}>
              <h3>{dot.prompt}</h3>
              <p>{dot.implication}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.panelKicker}>Enterprise-grade vibe coding</p>
          <h2>Speed works only when the guardrails are real.</h2>
          <p>
            The lesson is not that prompts replace engineering. The useful
            pattern is giving AI agents the same scaffolding a strong product
            team would use: instructions, tests, contracts, review loops,
            documentation, CI gates, and secret hygiene.
          </p>
        </div>
        <div className={styles.practiceGrid}>
          {enterprisePractices.map((practice) => (
            <article className={styles.practiceCard} key={practice.title}>
              <h3>{practice.title}</h3>
              <p>{practice.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.panelKicker}>What shipped</p>
          <h2>A product surface, not a code demo</h2>
          <p>
            The app was built as a public artefact: something people can read,
            take, share, inspect, and challenge.
          </p>
        </div>
        <div className={styles.shippedGrid}>
          {shippedGroups.map((group) => (
            <article className={styles.shippedCard} key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.statusSection}>
        <div>
          <p className={styles.panelKicker}>Where it stands</p>
          <h2>
            Green locally. Live on Vercel. One infrastructure fix remains.
          </h2>
        </div>
        <div className={styles.statusList}>
          {statusRows.map((row) => (
            <p key={row.label}>
              <strong>{row.label}:</strong> {row.value}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.receiptsGrid}>
        <article className={styles.receiptCard}>
          <p className={styles.panelKicker}>Git-derived clock</p>
          <h2>Build timeline</h2>
          <p>{workingTreeSummary}</p>
          <div className={styles.timelineList}>
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
        </article>

        <article className={styles.receiptCard}>
          <p className={styles.panelKicker}>AI-human accountability</p>
          <h2>Who was accountable for what</h2>
          <div className={styles.accountabilityList}>
            {accountability.map((entry) => (
              <p key={entry.label}>
                <strong>{entry.label}:</strong> {entry.body}
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.finalCallout}>
        <div>
          <p className={styles.panelKicker}>The honest claim</p>
          <h2>This is a serious prototype, not a validated instrument.</h2>
          <p>
            The site is deliberately clear: {appConfig.assessmentName} is for
            self-reflection, coaching, team learning, and open research. It is
            not for hiring, promotion, diagnosis, redundancy, compensation, or
            other high-stakes employment decisions.
          </p>
        </div>
        <div className={styles.heroActions}>
          <Link className="button" href={routes.dataset}>
            Explore the dataset
          </Link>
          <Link className="button-secondary" href={routes.apiDocs}>
            View API docs
          </Link>
        </div>
      </section>
    </main>
  );
}
