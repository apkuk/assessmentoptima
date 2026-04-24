/**
 * File: src/app/how-i-built-this/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Public build-story page documenting the ChatGPT and Codex workflow.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { PageImage } from "@/components/ui/page-media";
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
    "A transparent build story for AssessmentOptima: ChatGPT 5.5 research and PRD work, Codex implementation, Vercel deployment, MongoDB persistence, and the limits of the prototype.",
};

const proofStats = [
  {
    value: "47 min",
    label: "ChatGPT 5.5 Pro research and PRD handoff",
  },
  {
    value: "2.5 hr",
    label: "total AI-assisted sprint to a share-ready prototype",
  },
  {
    value: "54",
    label: `${appConfig.assessmentName} assessment items`,
  },
  {
    value: "38",
    label: "fast Vitest checks covering the core rules",
  },
];

const askCards = [
  {
    label: "Ask 1",
    title: "Create the behavioural-science brief",
    body: "ChatGPT 5.5 Pro was asked to turn a rough professional-assessment idea into an original, research-informed, privacy-aware product brief with a full assessee cycle, open data, BYOK AI analysis, and a beautiful UX.",
  },
  {
    label: "Ask 2",
    title: "Build and launch the product",
    body: "Codex used the PRD and master docs to implement the Next.js app, strict TypeScript contracts, MongoDB persistence layer, public routes, tests, deployment wiring, and the build-story page you are reading.",
  },
];

const processSteps = [
  {
    label: "1",
    title: "ChatGPT Pro created the science and PRD",
    body: "The first pass was research and sensemaking: behavioural-science grounding, assessment architecture, privacy boundaries, open-data posture, and a Codex-ready product requirements document.",
  },
  {
    label: "2",
    title: "The docs were split into a build system",
    body: "After the project owner created the new project folder, the huge PRD was split into master docs for architecture, data, routes/API, privacy, AI analysis, delivery, brand, and assessment model.",
  },
  {
    label: "3",
    title: "AGENTS.md set the engineering operating model",
    body: "The VS Code/Codex workflow was given explicit build instructions: schema-first contracts, DRY/SSoT, file-size limits, JSDoc headers, QA checks, no secrets, and no psychometric overclaiming.",
  },
  {
    label: "4",
    title: "Codex built while Claude Code reviewed UI polish",
    body: "Claude Code was used for a product and UI polish critique. Codex then folded the feedback into the UX: gated assessment flow, share surfaces, visual tightening, radar/report presentation, and page copy.",
  },
  {
    label: "5",
    title: "ChatGPT Pro did a hardening review",
    body: "A second deep review from ChatGPT Pro focused on launch risk: privacy, token design, public sharing, dataset export safety, consent language, reliability wording, and AI BYOK boundaries.",
  },
  {
    label: "6",
    title: "User walkthrough closed the loop",
    body: "A hands-on UI pass caught practical issues: formatting, image sizing, checkbox behavior, context dropdown labels, report readability, and flow quality. Those fixes became the final polish before calling the prototype share-ready.",
  },
];

const shippedGroups = [
  {
    title: "Assessment product",
    items: [
      "Gated Intro -> Consent -> About you -> Assessment -> Review flow",
      "54-item WorkStyle Compass assessment with nine scale scores",
      "Private result report with archetype, radar, strengths, pressure drifts, and 30-day experiment",
      "Printable private report with submitted-answer appendix for the respondent's own records",
      "Developmental-only use boundary throughout the product",
    ],
  },
  {
    title: "Open research layer",
    items: [
      "MongoDB Atlas document model for consented submissions",
      "Score-first CSV/JSON export shape with no raw PII or row-level context fields",
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
      "No public server-funded AI spend in the first public release",
      "Prompt transparency, example output, and cautious synthesis rules",
      "Provider/model selection, reasoning controls, latency, token usage, and estimated OpenAI cost reporting",
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
    body: "Strategy and documentation benefit from ChatGPT Pro-style deep reasoning. UI polish benefits from strong visual review. Implementation benefits from Codex using high or extra-high reasoning on code.",
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
    label: "Persistence",
    value:
      "MongoDB Atlas persistence has been verified locally with a full 54-answer submission and private report retrieval.",
  },
  {
    label: "Deployment",
    value:
      "The Vercel deployment is live; production submit/result/dataset smoke tests should be rerun after the latest hardening changes are pushed.",
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
    body: "Any implication that this became a scientifically validated instrument during the sprint, any direct PII in the public dataset, and any public server-funded AI cost exposure.",
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
            {appConfig.productName} is the public platform. WorkStyle Compass is
            the developmental assessment inside it. This is also a transparent
            case study in what frontier AI assistance can do when the brief
            includes product thinking, behavioural science, privacy, data
            architecture, UX, tests, deployment, and human judgement.
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

        <div className={styles.heroMedia}>
          <PageImage
            alt="AI-assisted product build visual with documentation layers, code panels, test checkmarks, and timeline markers."
            aspect="wide"
            className={styles.heroImage}
            priority
            src="/images/how-i-built-this-page.png"
          >
            <p className={styles.panelKicker}>Build method</p>
            <strong>AI-assisted, human-accountable.</strong>
          </PageImage>
          <div className={styles.receiptPanel} aria-label="Build proof points">
            <p className={styles.panelKicker}>Build receipts</p>
            <div className={styles.statGrid}>
              {proofStats.map((stat) => (
                <div className={styles.stat} key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
          <p className={styles.panelKicker}>The actual workflow</p>
          <h2>Parallel thinking, building, review, and feedback.</h2>
          <p>
            The useful pattern was not one model doing everything in a straight
            line. It was multiple high-capability tools working in parallel:
            ChatGPT Pro for deep strategy and documentation, Claude Code for UI
            critique, and Codex for high-reasoning implementation inside VS
            Code. The project reached a share-ready prototype in about 2.5
            hours.
          </p>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map((step) => (
            <article className={styles.processCard} key={step.title}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <p className={styles.processNote}>
          The parallel setup depended on high-usage plans: Claude Max for Claude
          Code review capacity, and ChatGPT Pro for deep analysis and
          documentation passes.
        </p>
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
          <h2>Green locally. Mongo verified. Production smoke next.</h2>
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
