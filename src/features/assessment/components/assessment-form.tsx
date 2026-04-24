"use client";

/**
 * File: src/features/assessment/components/assessment-form.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Gated client-side assessment flow with autosave, consent, context, questionnaire pages, review, and submit.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { apiRoutes } from "@/config/routes";
import {
  assessmentFlowSteps,
  assessmentPageSize,
  assessmentStepLabels,
  assessmentStorageKey,
  resultManagementTokenStoragePrefix,
  type AssessmentFlowStep,
  type ConsentDraft,
  updateConsentDraft,
} from "@/features/assessment/application/assessment-flow";
import {
  CONSENT_VERSION,
  expectedItemIds,
  items,
  scales,
} from "@/features/assessment/application/model";
import { respondentContextFields } from "@/features/assessment/application/respondent-context";
import {
  answerValues,
  defaultRespondentContext,
  submitAssessmentResponseSchema,
  submitAssessmentSchema,
  type AnswerMap,
  type AnswerValue,
  type Consent,
  type RespondentContext,
} from "@/features/assessment/schemas/assessment";

import { AssessmentStepper } from "./assessment-stepper";
import {
  ConsentStep,
  ContextStep,
  IntroStep,
  QuestionsStep,
  ReviewStep,
} from "./assessment-step-panels";
import styles from "./assessment-flow.module.css";

interface SavedAssessmentState {
  answers: Partial<AnswerMap>;
  consent: ConsentDraft;
  context: RespondentContext;
  questionPageIndex: number;
  step: AssessmentFlowStep;
  updatedAt: string;
}

const initialConsent: ConsentDraft = {
  useBoundaryAccepted: false,
  assessmentProcessing: false,
  privateResultStorage: false,
  researchStorage: false,
  publicDataset: false,
};

const questionPages = Array.from(
  { length: Math.ceil(items.length / assessmentPageSize) },
  (_, index) =>
    items.slice(index * assessmentPageSize, (index + 1) * assessmentPageSize),
);

const expectedItemIdSet = new Set(expectedItemIds);
const answerValueSet = new Set<number>(answerValues);

function clampQuestionPageIndex(index: number): number {
  return Math.min(Math.max(index, 0), questionPages.length - 1);
}

function sanitiseAnswers(value: unknown): Partial<AnswerMap> {
  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter(
      ([itemId, answer]) =>
        expectedItemIdSet.has(itemId) &&
        typeof answer === "number" &&
        answerValueSet.has(answer),
    ),
  ) as Partial<AnswerMap>;
}

function loadSavedAssessment(): SavedAssessmentState | null {
  try {
    const raw = window.localStorage.getItem(assessmentStorageKey);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<SavedAssessmentState>;
    const step = assessmentFlowSteps.includes(parsed.step as AssessmentFlowStep)
      ? (parsed.step as AssessmentFlowStep)
      : "intro";

    return {
      answers: sanitiseAnswers(parsed.answers),
      consent: { ...initialConsent, ...parsed.consent },
      context: { ...defaultRespondentContext, ...parsed.context },
      questionPageIndex: clampQuestionPageIndex(
        Number(parsed.questionPageIndex ?? 0),
      ),
      step,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

function pageAnsweredCount(
  pageItems: typeof items,
  answers: Partial<AnswerMap>,
): number {
  return pageItems.filter((item) => answers[item.id] !== undefined).length;
}

export function AssessmentForm() {
  const router = useRouter();
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [step, setStep] = useState<AssessmentFlowStep>("intro");
  const [questionPageIndex, setQuestionPageIndex] = useState(0);
  const [activeItemId, setActiveItemId] = useState(items[0]?.id ?? "");
  const [answers, setAnswers] = useState<Partial<AnswerMap>>({});
  const [context, setContext] = useState<RespondentContext>(
    defaultRespondentContext,
  );
  const [consentDraft, setConsentDraft] =
    useState<ConsentDraft>(initialConsent);
  const [savedLabel, setSavedLabel] = useState("Autosave ready");
  const [transitionNote, setTransitionNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === items.length;
  const currentQuestionItems = useMemo(
    () => questionPages[questionPageIndex] ?? [],
    [questionPageIndex],
  );
  const currentPageAnswered = pageAnsweredCount(currentQuestionItems, answers);
  const currentPageComplete =
    currentPageAnswered === currentQuestionItems.length;
  const questionStart = questionPageIndex * assessmentPageSize + 1;
  const questionEnd = questionStart + currentQuestionItems.length - 1;
  const stepIndex = assessmentFlowSteps.indexOf(step);

  const consent = useMemo<Consent | null>(() => {
    if (
      !consentDraft.useBoundaryAccepted ||
      !consentDraft.assessmentProcessing ||
      !consentDraft.privateResultStorage
    ) {
      return null;
    }

    return {
      useBoundaryAccepted: true,
      assessmentProcessing: true,
      privateResultStorage: true,
      researchStorage: consentDraft.researchStorage,
      publicDataset: consentDraft.publicDataset,
      consentVersion: CONSENT_VERSION,
    };
  }, [consentDraft]);

  const setQuestionPage = useCallback(
    (index: number, nextAnswers: Partial<AnswerMap> = answers) => {
      const safeIndex = clampQuestionPageIndex(index);
      const nextItems = questionPages[safeIndex] ?? [];
      const nextActive =
        nextItems.find((item) => nextAnswers[item.id] === undefined) ??
        nextItems[0];

      setQuestionPageIndex(safeIndex);
      setActiveItemId(nextActive?.id ?? "");
      setStep("questions");
    },
    [answers],
  );

  const goToStep = useCallback(
    (nextStep: AssessmentFlowStep) => {
      setError(null);
      setTransitionNote(null);

      if (nextStep === "questions") {
        setQuestionPage(questionPageIndex);
        return;
      }

      setStep(nextStep);
    },
    [questionPageIndex, setQuestionPage],
  );

  const scheduleAdvance = useCallback(
    (itemId: string, nextAnswers: Partial<AnswerMap>) => {
      if (advanceTimer.current) {
        clearTimeout(advanceTimer.current);
      }

      advanceTimer.current = setTimeout(() => {
        const currentIndex = currentQuestionItems.findIndex(
          (item) => item.id === itemId,
        );
        const laterItems = currentQuestionItems.slice(currentIndex + 1);
        const nextUnanswered = laterItems.find(
          (item) => nextAnswers[item.id] === undefined,
        );

        if (nextUnanswered) {
          setActiveItemId(nextUnanswered.id);
          return;
        }

        const allPageItemsAnswered = currentQuestionItems.every(
          (item) => nextAnswers[item.id] !== undefined,
        );

        if (!allPageItemsAnswered) {
          return;
        }

        if (questionPageIndex < questionPages.length - 1) {
          const completedScale =
            scales[currentQuestionItems[0]?.scale ?? "commitment_rhythm"]
              .shortName;
          const nextScale =
            scales[
              questionPages[questionPageIndex + 1]?.[0]?.scale ??
                "commitment_rhythm"
            ].shortName;

          setTransitionNote(`${completedScale} done. Next: ${nextScale}.`);
          setQuestionPage(questionPageIndex + 1, nextAnswers);
          return;
        }

        setTransitionNote(
          "Assessment done. Review your answers before submit.",
        );
        setStep("review");
      }, 250);
    },
    [currentQuestionItems, questionPageIndex, setQuestionPage],
  );

  const updateAnswer = useCallback(
    (itemId: string, value: AnswerValue): void => {
      const nextAnswers = { ...answers, [itemId]: value };
      setAnswers(nextAnswers);
      setActiveItemId(itemId);
      scheduleAdvance(itemId, nextAnswers);
    },
    [answers, scheduleAdvance],
  );

  function updateContext(
    key: (typeof respondentContextFields)[number]["key"],
    value: string,
  ): void {
    setContext((current) => ({ ...current, [key]: value }));
  }

  function updateConsent(key: keyof ConsentDraft, value: boolean): void {
    setConsentDraft((current) => updateConsentDraft(current, key, value));
  }

  function validateBeforeNext(): boolean {
    if (step === "consent" && !consent) {
      setError("Please accept the three required checks before continuing.");
      return false;
    }

    if (step === "questions" && !currentPageComplete) {
      setError("Answer each statement on this screen before continuing.");
      return false;
    }

    setError(null);
    return true;
  }

  function nextStep(): void {
    if (!validateBeforeNext()) {
      return;
    }

    if (step === "questions") {
      if (questionPageIndex < questionPages.length - 1) {
        setQuestionPage(questionPageIndex + 1);
      } else {
        goToStep("review");
      }
      return;
    }

    const next = assessmentFlowSteps[stepIndex + 1];

    if (next) {
      goToStep(next);
    }
  }

  function previousStep(): void {
    setError(null);

    if (step === "questions" && questionPageIndex > 0) {
      setQuestionPage(questionPageIndex - 1);
      return;
    }

    const previous = assessmentFlowSteps[stepIndex - 1];

    if (previous) {
      goToStep(previous);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!consent) {
      setError("Please accept the three required checks before submitting.");
      goToStep("consent");
      return;
    }

    if (!isComplete) {
      setError(
        `Please answer all ${items.length} statements before submitting.`,
      );
      setQuestionPage(0);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = submitAssessmentSchema.parse({
        consent,
        context,
        answers,
      });
      const response = await fetch(apiRoutes.submit, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: unknown = await response.json();

      if (!response.ok) {
        const detail =
          data && typeof data === "object" && "detail" in data
            ? String(data.detail)
            : "Submission failed.";
        throw new Error(detail);
      }

      const parsed = submitAssessmentResponseSchema.parse(data);
      window.localStorage.setItem(
        `${resultManagementTokenStoragePrefix}.${parsed.viewToken}`,
        parsed.managementToken,
      );
      window.localStorage.removeItem(assessmentStorageKey);
      router.push(parsed.resultUrl);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Submission failed.",
      );
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const hydrateTimer = setTimeout(() => {
      const saved = loadSavedAssessment();

      if (saved) {
        setAnswers(saved.answers);
        setContext(saved.context);
        setConsentDraft(saved.consent);
        setQuestionPageIndex(saved.questionPageIndex);
        setStep(saved.step);
        setSavedLabel("Saved in this browser");
        const savedPage = questionPages[saved.questionPageIndex] ?? [];
        const savedActive =
          savedPage.find((item) => saved.answers[item.id] === undefined) ??
          savedPage[0] ??
          items[0];
        setActiveItemId(savedActive?.id ?? "");
      }

      setHasHydrated(true);
    }, 0);

    return () => clearTimeout(hydrateTimer);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const saveTimer = setTimeout(() => {
      const state: SavedAssessmentState = {
        answers,
        consent: consentDraft,
        context,
        questionPageIndex,
        step,
        updatedAt: new Date().toISOString(),
      };

      window.localStorage.setItem(assessmentStorageKey, JSON.stringify(state));
      setSavedLabel("Saved in this browser");
    }, 180);

    return () => clearTimeout(saveTimer);
  }, [answers, consentDraft, context, hasHydrated, questionPageIndex, step]);

  useEffect(() => {
    if (step !== "questions" || !activeItemId) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent): void {
      const target = event.target as HTMLElement | null;

      if (
        target?.closest("input, textarea, select, button") ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      if (!/^[1-5]$/.test(event.key)) {
        return;
      }

      event.preventDefault();
      updateAnswer(activeItemId, Number(event.key) as AnswerValue);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemId, step, updateAnswer]);

  useEffect(
    () => () => {
      if (advanceTimer.current) {
        clearTimeout(advanceTimer.current);
      }
    },
    [],
  );

  return (
    <form className={styles.flowShell} onSubmit={handleSubmit}>
      <AssessmentStepper
        activeStep={step}
        answeredCount={answeredCount}
        itemCount={items.length}
        savedLabel={savedLabel}
      />

      <section
        className={styles.flowPanel}
        aria-label={assessmentStepLabels[step]}
      >
        {step === "intro" ? (
          <IntroStep />
        ) : step === "consent" ? (
          <ConsentStep consentDraft={consentDraft} onChange={updateConsent} />
        ) : step === "context" ? (
          <ContextStep context={context} onChange={updateContext} />
        ) : step === "questions" ? (
          <QuestionsStep
            activeItemId={activeItemId}
            answers={answers}
            currentPageAnswered={currentPageAnswered}
            currentQuestionItems={currentQuestionItems}
            questionEnd={questionEnd}
            questionPageCount={questionPages.length}
            questionPageIndex={questionPageIndex}
            questionStart={questionStart}
            transitionNote={transitionNote}
            updateAnswer={updateAnswer}
          />
        ) : (
          <ReviewStep answers={answers} consentDraft={consentDraft} />
        )}

        {error ? (
          <div className="form-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className={styles.flowNav}>
          <button
            className="button-ghost"
            disabled={step === "intro" || isSubmitting}
            onClick={previousStep}
            type="button"
          >
            Back
          </button>
          <div>
            {step === "context" ? (
              <button
                className="button-secondary"
                onClick={() => goToStep("questions")}
                type="button"
              >
                Skip for now
              </button>
            ) : null}
            {step === "review" ? (
              <button
                className="button"
                disabled={!consent || !isComplete || isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <Loader2 size={18} aria-hidden="true" />
                ) : (
                  <ArrowRight size={18} aria-hidden="true" />
                )}
                Generate my report
              </button>
            ) : (
              <button className="button" onClick={nextStep} type="button">
                Continue <ArrowRight size={18} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </section>
    </form>
  );
}
