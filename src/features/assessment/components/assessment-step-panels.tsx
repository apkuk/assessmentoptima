/**
 * File: src/features/assessment/components/assessment-step-panels.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Render-only panels for the gated WorkStyle Compass assessment flow.
 */
import { CheckCircle2 } from "lucide-react";

import type { ConsentDraft } from "@/features/assessment/application/assessment-flow";
import {
  items,
  scaleKeys,
  scales,
} from "@/features/assessment/application/model";
import { respondentContextFields } from "@/features/assessment/application/respondent-context";
import type {
  AnswerMap,
  AnswerValue,
  RespondentContext,
} from "@/features/assessment/schemas/assessment";

import { LikertButtons } from "./likert-buttons";
import { RespondentContextForm } from "./respondent-context-form";
import styles from "./assessment-flow.module.css";

type QuestionItems = typeof items;

function scaleAnsweredCount(
  scaleKey: (typeof scaleKeys)[number],
  answers: Partial<AnswerMap>,
): number {
  return items.filter(
    (item) => item.scale === scaleKey && answers[item.id] !== undefined,
  ).length;
}

export function IntroStep() {
  return (
    <div className={styles.flowPanelInner}>
      <div>
        <p className="panel-label">Start here</p>
        <h2>Your WorkStyle Compass</h2>
        <p className="lede">
          No right answers - just what is true for you at work right now. Takes
          about 8 minutes. You will get a developmental report at the end.
        </p>
        <div className={styles.stepMeta}>
          <span className={styles.metaPill}>About 8 minutes</span>
          <span className={styles.metaPill}>54 statements</span>
          <span className={styles.metaPill}>5 consent choices</span>
        </div>
      </div>
      <div className={styles.introGrid}>
        <article className={styles.introCard}>
          <h3>Private report</h3>
          <p>Your answers generate a personal development profile.</p>
        </article>
        <article className={styles.introCard}>
          <h3>Open research</h3>
          <p>You choose whether anonymised scores can support the dataset.</p>
        </article>
        <article className={styles.introCard}>
          <h3>Saved locally</h3>
          <p>Progress is saved in this browser so you can come back later.</p>
        </article>
      </div>
    </div>
  );
}

interface ConsentStepProps {
  consentDraft: ConsentDraft;
  onChange: (key: keyof ConsentDraft, value: boolean) => void;
}

export function ConsentStep({ consentDraft, onChange }: ConsentStepProps) {
  return (
    <div className={styles.flowPanelInner}>
      <div>
        <p className="panel-label">A quick check before we start</p>
        <h2>Consent and use boundary</h2>
        <p className="lede">
          Three checks are required to generate and save your private report.
          The research and open dataset choices are optional.
        </p>
      </div>
      <div className={styles.consentGrid}>
        <ConsentCard
          checked={consentDraft.useBoundaryAccepted}
          label="I get that this is for self-reflection, not for hiring or promotion decisions."
          onChange={(checked) => onChange("useBoundaryAccepted", checked)}
          required
          title="Use boundary"
        />
        <ConsentCard
          checked={consentDraft.assessmentProcessing}
          label="Process my answers to generate my report."
          onChange={(checked) => onChange("assessmentProcessing", checked)}
          required
          title="Assessment processing"
        />
        <ConsentCard
          checked={consentDraft.privateResultStorage}
          label="Save my private report so I can revisit it through this browser's private result link."
          onChange={(checked) => onChange("privateResultStorage", checked)}
          required
          title="Private report"
        />
        <ConsentCard
          checked={consentDraft.researchStorage}
          label="Keep my anonymised scores for research."
          onChange={(checked) => onChange("researchStorage", checked)}
          title="Research storage"
        />
        <ConsentCard
          checked={consentDraft.publicDataset}
          label="Include my anonymised scores in the open dataset once release rules are met."
          onChange={(checked) => onChange("publicDataset", checked)}
          title="Open dataset"
        />
      </div>
    </div>
  );
}

interface ConsentCardProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (checked: boolean) => void;
  required?: boolean;
  title: string;
}

function ConsentCard({
  checked,
  disabled = false,
  label,
  onChange,
  required = false,
  title,
}: ConsentCardProps) {
  return (
    <label className={styles.consentCard} data-disabled={disabled}>
      <input
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span>
        <strong>
          {title} {required ? "(required)" : "(optional)"}
        </strong>
        {label}
      </span>
    </label>
  );
}

interface ContextStepProps {
  context: RespondentContext;
  onChange: (
    key: (typeof respondentContextFields)[number]["key"],
    value: string,
  ) => void;
}

export function ContextStep({ context, onChange }: ContextStepProps) {
  return (
    <div className={styles.flowPanelInner}>
      <div>
        <p className="panel-label">A little context</p>
        <h2>About you</h2>
        <p className={styles.contextCopy}>
          Optional broad context helps future aggregate analysis. It is not
          needed for your personal report, and every field can be skipped.
        </p>
      </div>
      <RespondentContextForm context={context} onChange={onChange} />
    </div>
  );
}

interface QuestionsStepProps {
  activeItemId: string;
  answers: Partial<AnswerMap>;
  currentPageAnswered: number;
  currentQuestionItems: QuestionItems;
  questionEnd: number;
  questionPageCount: number;
  questionPageIndex: number;
  questionStart: number;
  transitionNote: string | null;
  updateAnswer: (itemId: string, value: AnswerValue) => void;
}

export function QuestionsStep({
  activeItemId,
  answers,
  currentPageAnswered,
  currentQuestionItems,
  questionEnd,
  questionPageCount,
  questionPageIndex,
  questionStart,
  transitionNote,
  updateAnswer,
}: QuestionsStepProps) {
  const firstScale = currentQuestionItems[0]?.scale ?? "delivery";
  const scale = scales[firstScale];

  return (
    <div className={styles.flowPanelInner}>
      <div className={styles.questionHeader}>
        <div>
          <p className="panel-label">Assessment</p>
          <h2>{scale.name}</h2>
          <p>
            Statements {questionStart}-{questionEnd} of {items.length}. Press
            keys 1-5 to answer the active statement.
          </p>
        </div>
        <div className={styles.questionCount}>
          {currentPageAnswered}/{currentQuestionItems.length} on this screen
        </div>
      </div>
      <div className={styles.pageProgress} aria-hidden="true">
        <span
          style={{
            width: `${(currentPageAnswered / currentQuestionItems.length) * 100}%`,
          }}
        />
      </div>
      <details className={styles.questionHelp}>
        <summary>What is {scale.shortName}?</summary>
        <p>{scale.description}</p>
      </details>
      {transitionNote ? (
        <p className={styles.transitionNote}>{transitionNote}</p>
      ) : null}
      <div className={styles.itemList}>
        {currentQuestionItems.map((item) => (
          <article
            className={styles.itemCard}
            data-active={activeItemId === item.id}
            data-item-id={item.id}
            key={item.id}
          >
            <p>{item.text}</p>
            <LikertButtons
              itemText={item.text}
              onChange={(value) => updateAnswer(item.id, value)}
              value={answers[item.id]}
            />
          </article>
        ))}
      </div>
      <p className={styles.transitionNote}>
        Screen {questionPageIndex + 1} of {questionPageCount}. The next screen
        opens automatically once this one is complete.
      </p>
    </div>
  );
}

interface ReviewStepProps {
  answers: Partial<AnswerMap>;
  consentDraft: ConsentDraft;
}

export function ReviewStep({ answers, consentDraft }: ReviewStepProps) {
  return (
    <div className={styles.flowPanelInner}>
      <div>
        <p className="panel-label">Review</p>
        <h2>Ready to generate your report</h2>
        <p className="lede">
          Check the completion summary, then submit. Your report will be private
          to its result link; public sharing uses an archetype-only page.
        </p>
      </div>
      <div className={styles.reviewGrid}>
        <article className={styles.reviewCard}>
          <h3>Answers</h3>
          <p>{Object.keys(answers).length} of 54 statements complete.</p>
        </article>
        <article className={styles.reviewCard}>
          <h3>Research</h3>
          <p>
            {consentDraft.researchStorage
              ? "Anonymised research storage enabled."
              : "Research storage not enabled."}
          </p>
        </article>
        <article className={styles.reviewCard}>
          <h3>Open dataset</h3>
          <p>
            {consentDraft.publicDataset
              ? "Open dataset inclusion enabled."
              : "Open dataset inclusion not enabled."}
          </p>
        </article>
      </div>
      <ul className={styles.reviewList}>
        {scaleKeys.map((scaleKey) => (
          <li key={scaleKey}>
            <span>{scales[scaleKey].shortName}</span>
            <strong>{scaleAnsweredCount(scaleKey, answers)}/6 answered</strong>
          </li>
        ))}
      </ul>
      <p className={styles.transitionNote}>
        <CheckCircle2 size={16} aria-hidden="true" /> The report is
        developmental, exploratory, and not for employment decisions.
      </p>
    </div>
  );
}
