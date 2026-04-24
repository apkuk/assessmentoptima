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
        <h2>Before you begin</h2>
        <p className="lede">
          There are no ideal answers. Respond based on what feels true at work
          right now, and you will get a practical development report at the end.
        </p>
        <div className={styles.stepMeta}>
          <span className={styles.metaPill}>About 8 minutes</span>
          <span className={styles.metaPill}>54 short statements</span>
          <span className={styles.metaPill}>3 required checks</span>
        </div>
      </div>
      <div className={styles.introGrid}>
        <article className={styles.introCard}>
          <h3>Private report</h3>
          <p>Your answers generate a private developmental profile.</p>
        </article>
        <article className={styles.introCard}>
          <h3>Open research</h3>
          <p>
            You decide whether anonymised score-level data can support the
            public dataset.
          </p>
        </article>
        <article className={styles.introCard}>
          <h3>Saved locally</h3>
          <p>
            Progress is saved in this browser only, so you can come back later.
          </p>
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
        <p className="panel-label">Your choices</p>
        <h2>Confirm how this will be used</h2>
        <p className="lede">
          The first three checks let us generate and save your private report.
          The last two are optional and control research use and open dataset
          inclusion.
        </p>
      </div>
      <div className={styles.consentGrid}>
        <ConsentCard
          checked={consentDraft.useBoundaryAccepted}
          label="I understand this is for self-reflection, coaching, and learning, not hiring, promotion, or other employment decisions."
          onChange={(checked) => onChange("useBoundaryAccepted", checked)}
          required
          title="Use boundary"
        />
        <ConsentCard
          checked={consentDraft.assessmentProcessing}
          label="Use my answers to generate my developmental report."
          onChange={(checked) => onChange("assessmentProcessing", checked)}
          required
          title="Assessment processing"
        />
        <ConsentCard
          checked={consentDraft.privateResultStorage}
          label="Save my private report so I can revisit it through a private result link."
          onChange={(checked) => onChange("privateResultStorage", checked)}
          required
          title="Private report"
        />
        <ConsentCard
          checked={consentDraft.researchStorage}
          label="Keep my anonymised score-level data for research analysis."
          onChange={(checked) => onChange("researchStorage", checked)}
          title="Research use"
        />
        <ConsentCard
          checked={consentDraft.publicDataset}
          label="Include my anonymised score-level data in the open dataset once release rules are met."
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
        <h2>Optional research context</h2>
        <p className={styles.contextCopy}>
          Broad buckets help us understand patterns in the open research sample.
          They are not needed for your personal report, and every field can be
          left as “Prefer Not to Say”.
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
  const firstScale = currentQuestionItems[0]?.scale ?? "commitment_rhythm";
  const scale = scales[firstScale];

  return (
    <div className={styles.flowPanelInner}>
      <div className={styles.questionHeader}>
        <div>
          <p className="panel-label">Assessment</p>
          <h2>{scale.name}</h2>
          <p>
            Six short statements · {questionStart}-{questionEnd} of{" "}
            {items.length}.
          </p>
          <p className={styles.keyboardHint}>
            Keyboard shortcut: use <kbd>1</kbd>-<kbd>5</kbd> to answer the
            highlighted statement.
          </p>
        </div>
        <div className={styles.questionCount}>
          {currentPageAnswered} of {currentQuestionItems.length} answered
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
        <summary>About {scale.name}</summary>
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
        Section {questionPageIndex + 1} of {questionPageCount}. We will move to
        the next section when all six statements are answered.
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
