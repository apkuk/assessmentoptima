/**
 * File: src/features/assessment/application/scoring.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Pure scoring, pressure-flag, composite, and archetype logic.
 */
import type {
  AnswerMap,
  AnswerValue,
  AssessmentResult,
  ItemType,
  PressureFlag,
  ScaleKey,
  ScaleScore,
} from "../schemas/assessment";
import { expectedItemIds, items, scaleKeys, scales } from "./model";

export class AssessmentScoringError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssessmentScoringError";
  }
}

export function scoreItem(raw: AnswerValue, type: ItemType): number {
  if (type === "reverse") {
    return 6 - raw;
  }

  return raw;
}

export function assertCompleteAnswers(answers: AnswerMap): void {
  const missing = expectedItemIds.filter(
    (itemId) => answers[itemId] === undefined,
  );
  const unexpected = Object.keys(answers).filter(
    (itemId) => !expectedItemIds.includes(itemId),
  );

  if (missing.length > 0) {
    throw new AssessmentScoringError(`Missing answers: ${missing.join(", ")}`);
  }

  if (unexpected.length > 0) {
    throw new AssessmentScoringError(
      `Unexpected answers: ${unexpected.join(", ")}`,
    );
  }
}

export function getBand(score: number): ScaleScore["band"] {
  if (score <= 39) {
    return "low";
  }

  if (score <= 69) {
    return "moderate";
  }

  return "high";
}

function roundScore(mean: number): number {
  return Math.round(((mean - 1) / 4) * 100);
}

function average(values: number[]): number {
  if (values.length === 0) {
    throw new AssessmentScoringError("Cannot average an empty score set.");
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function createPressureFlags(
  answers: AnswerMap,
  scores: Record<ScaleKey, ScaleScore>,
): PressureFlag[] {
  return items
    .filter((item) => item.type === "overuse")
    .flatMap((item) => {
      const raw = answers[item.id];
      const scaleScore = scores[item.scale];

      if (raw === undefined) {
        return [];
      }

      const shouldFlag = (scaleScore.score >= 70 && raw >= 4) || raw === 5;

      if (!shouldFlag) {
        return [];
      }

      return [
        {
          scale: item.scale,
          itemId: item.id,
          severity: raw === 5 ? "high" : "watch",
          message: scales[item.scale].overuseRisk,
        } satisfies PressureFlag,
      ];
    });
}

const compositeDefinitions = {
  operatingRhythm: ["delivery", "regulation", "strategy"],
  trustBackbone: ["integrity", "collaboration", "regulation"],
  learningEngine: ["learning", "change", "ai"],
  changeLeadership: ["change", "influence", "strategy"],
  humanCentredInfluence: ["influence", "collaboration", "integrity"],
} as const satisfies Record<string, readonly ScaleKey[]>;

const archetypes = [
  {
    id: "builder",
    name: "The Builder",
    pairs: [
      ["delivery", "strategy"],
      ["delivery", "integrity"],
    ],
    fallback: "delivery",
    summary: "Turns priorities into reliable, high-quality progress.",
  },
  {
    id: "catalyst",
    name: "The Catalyst",
    pairs: [["change", "influence"]],
    fallback: "change",
    summary: "Creates movement, energy, and visible momentum.",
  },
  {
    id: "sensemaker",
    name: "The Sensemaker",
    pairs: [["strategy", "learning"]],
    fallback: "strategy",
    summary: "Finds patterns, learns fast, and clarifies complexity.",
  },
  {
    id: "integrator",
    name: "The Integrator",
    pairs: [
      ["collaboration", "strategy"],
      ["collaboration", "integrity"],
    ],
    fallback: "collaboration",
    summary: "Connects people, perspectives, and decisions.",
  },
  {
    id: "steward",
    name: "The Steward",
    pairs: [
      ["integrity", "regulation"],
      ["integrity", "delivery"],
    ],
    fallback: "integrity",
    summary: "Protects trust, standards, and responsible execution.",
  },
  {
    id: "explorer",
    name: "The Explorer",
    pairs: [
      ["learning", "ai"],
      ["learning", "change"],
    ],
    fallback: "learning",
    summary: "Experiments, adapts, and extends capability.",
  },
  {
    id: "connector",
    name: "The Connector",
    pairs: [["influence", "collaboration"]],
    fallback: "influence",
    summary: "Builds energy, relationships, and shared commitment.",
  },
  {
    id: "stabiliser",
    name: "The Stabiliser",
    pairs: [["regulation", "delivery"]],
    fallback: "regulation",
    summary: "Brings calm, order, and follow-through under pressure.",
  },
] as const;

export const balancedArchetype = {
  id: "balanced_operator",
  name: "The Balanced Operator",
  summary: "Uses a broad mix of styles without one dominant pattern.",
};

export const publicArchetypes = [
  ...archetypes.map((archetype) => ({
    id: archetype.id,
    name: archetype.name,
    summary: archetype.summary,
  })),
  balancedArchetype,
] as const;

function hasPair(
  pair: readonly string[],
  first: ScaleKey,
  second: ScaleKey,
): boolean {
  return pair.includes(first) && pair.includes(second);
}

function deriveArchetype(
  orderedScales: ScaleKey[],
  scores: Record<ScaleKey, ScaleScore>,
) {
  const top = orderedScales[0];
  const second = orderedScales[1];
  const values = Object.values(scores).map((score) => score.score);
  const spread = Math.max(...values) - Math.min(...values);

  if (!top || !second) {
    return balancedArchetype;
  }

  if (scores[top].score < 70 && spread < 20) {
    return balancedArchetype;
  }

  const directMatch = archetypes.find((archetype) =>
    archetype.pairs.some((pair) => hasPair(pair, top, second)),
  );

  if (directMatch) {
    return {
      id: directMatch.id,
      name: directMatch.name,
      summary: directMatch.summary,
    };
  }

  const fallbackMatch = archetypes.find(
    (archetype) => archetype.fallback === top,
  );

  if (fallbackMatch) {
    return {
      id: fallbackMatch.id,
      name: fallbackMatch.name,
      summary: fallbackMatch.summary,
    };
  }

  return balancedArchetype;
}

function createStrengths(topScales: ScaleKey[]): string[] {
  return topScales.slice(0, 3).map((key) => {
    const scale = scales[key];
    return `${scale.name}: ${scale.highAnchor}`;
  });
}

function createDevelopmentEdges(lowScales: ScaleKey[]): string[] {
  return lowScales.slice(0, 2).map((key) => {
    const scale = scales[key];
    return `${scale.name}: ${scale.lowAnchor}`;
  });
}

function createExperiment(
  topScales: ScaleKey[],
  lowScales: ScaleKey[],
): string {
  const top = topScales[0];
  const low = lowScales[0];

  if (!top || !low) {
    return "For the next 30 days, pick one recurring work situation and note what helps you contribute at your best.";
  }

  return `For the next 30 days, use your ${scales[top].shortName} strength deliberately while testing one small behaviour from ${scales[low].name}. Review what changed after three real work situations.`;
}

export function scoreAssessment(answers: AnswerMap): AssessmentResult {
  assertCompleteAnswers(answers);

  const scores = Object.fromEntries(
    scaleKeys.map((scaleKey) => {
      const scaleItems = items.filter((item) => item.scale === scaleKey);
      const scoredItems = scaleItems.filter((item) => item.type !== "overuse");
      const overuseItem = scaleItems.find((item) => item.type === "overuse");
      const scoredValues = scoredItems.map((item) =>
        scoreItem(answers[item.id] as AnswerValue, item.type),
      );
      const mean = average(scoredValues);
      const score = roundScore(mean);
      const scale = scales[scaleKey];

      return [
        scaleKey,
        {
          key: scaleKey,
          name: scale.name,
          shortName: scale.shortName,
          score,
          mean: Number(mean.toFixed(2)),
          band: getBand(score),
          overuseRaw: overuseItem
            ? (answers[overuseItem.id] as AnswerValue | undefined)
            : undefined,
        } satisfies ScaleScore,
      ];
    }),
  ) as Record<ScaleKey, ScaleScore>;

  const composites = Object.fromEntries(
    Object.entries(compositeDefinitions).map(([key, scaleSet]) => [
      key,
      Math.round(average(scaleSet.map((scaleKey) => scores[scaleKey].score))),
    ]),
  );

  const orderedScales = [...scaleKeys].sort(
    (a, b) => scores[b].score - scores[a].score,
  );
  const lowScales = [...scaleKeys].sort(
    (a, b) => scores[a].score - scores[b].score,
  );
  const pressureFlags = createPressureFlags(answers, scores);

  return {
    scores,
    composites,
    pressureFlags,
    archetype: deriveArchetype(orderedScales, scores),
    topScales: orderedScales.slice(0, 3),
    lowScales: lowScales.slice(0, 2),
    strengths: createStrengths(orderedScales),
    developmentEdges: createDevelopmentEdges(lowScales),
    experiment: createExperiment(orderedScales, lowScales),
    reflectionPrompts: [
      "Where does this profile help you create value most reliably?",
      "Which strength becomes costly when pressure rises?",
      "What context brings out your best work style?",
      "What should a colleague know to collaborate with you well?",
    ],
  };
}
