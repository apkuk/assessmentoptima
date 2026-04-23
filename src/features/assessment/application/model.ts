/**
 * File: src/features/assessment/application/model.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: WorkStyle Compass scale definitions and v0 item bank.
 */
import { appConfig } from "@/config/app";

import {
  scaleKeys,
  type AssessmentItem,
  type ScaleKey,
} from "../schemas/assessment";

export interface ScaleDefinition {
  key: ScaleKey;
  name: string;
  shortName: string;
  description: string;
  highAnchor: string;
  lowAnchor: string;
  overuseRisk: string;
}

export const ASSESSMENT_VERSION = appConfig.defaultAssessmentVersion;
export const CONSENT_VERSION = appConfig.defaultConsentVersion;
export { scaleKeys };

export const scales: Record<ScaleKey, ScaleDefinition> = {
  delivery: {
    key: "delivery",
    name: "Delivery Discipline",
    shortName: "Delivery",
    description:
      "Reliable execution, prioritisation, follow-through and operational rhythm.",
    highAnchor: "Structured, dependable and focused on commitments.",
    lowAnchor: "Flexible, adaptive and less bound by plans or routines.",
    overuseRisk:
      "May become rigid, perfectionistic or over-controlled under pressure.",
  },
  learning: {
    key: "learning",
    name: "Learning Agility",
    shortName: "Learning",
    description:
      "Curiosity, feedback seeking, experimentation and speed of sense-making.",
    highAnchor: "Curious, coachable, adaptive and quick to learn.",
    lowAnchor: "Prefers proven methods and familiar domains.",
    overuseRisk: "May chase novelty or pivot before learning is consolidated.",
  },
  influence: {
    key: "influence",
    name: "Influence & Social Energy",
    shortName: "Influence",
    description:
      "Confidence in advocacy, persuasion, networking and visible leadership.",
    highAnchor: "Persuasive, energising and comfortable with visibility.",
    lowAnchor: "Reflective, quieter and likely to influence through depth.",
    overuseRisk: "May dominate airtime or oversell before alignment is built.",
  },
  collaboration: {
    key: "collaboration",
    name: "Collaboration & Trust",
    shortName: "Collaboration",
    description:
      "Generosity, inclusion, conflict repair and confidence in others.",
    highAnchor: "Inclusive, trusting and relationship-oriented.",
    lowAnchor:
      "Independent, selective with trust and willing to challenge group assumptions.",
    overuseRisk: "May avoid hard conflict or over-accommodate.",
  },
  regulation: {
    key: "regulation",
    name: "Emotional Regulation",
    shortName: "Regulation",
    description:
      "Composure, resilience, recovery and steadiness under pressure.",
    highAnchor: "Calm, steady, resilient and proportionate.",
    lowAnchor: "Sensitive to pressure signals and emotionally transparent.",
    overuseRisk: "May appear detached or under-signal urgency.",
  },
  strategy: {
    key: "strategy",
    name: "Strategic Systems Thinking",
    shortName: "Strategy",
    description:
      "Pattern recognition, trade-off thinking and handling complexity.",
    highAnchor: "Systems-oriented, integrative and strategic.",
    lowAnchor: "Practical, concrete and focused on immediate realities.",
    overuseRisk: "May over-theorise or delay action for more analysis.",
  },
  integrity: {
    key: "integrity",
    name: "Integrity & Humility",
    shortName: "Integrity",
    description:
      "Truthfulness, fairness, ethical judgement, modesty and openness to challenge.",
    highAnchor: "Grounded, fair, transparent and trustworthy.",
    lowAnchor: "Competitive, status-aware and politically pragmatic.",
    overuseRisk: "May under-claim impact or avoid necessary self-promotion.",
  },
  change: {
    key: "change",
    name: "Change Agency",
    shortName: "Change",
    description:
      "Energy for transformation, ambiguity tolerance, courage and momentum creation.",
    highAnchor: "Catalytic, bold and energised by change.",
    lowAnchor: "Stabilising, continuity-minded and risk-aware.",
    overuseRisk:
      "May create change fatigue or move faster than adoption capacity.",
  },
  ai: {
    key: "ai",
    name: "AI-Augmented Judgement",
    shortName: "AI Judgement",
    description:
      "Use of AI and digital tools with critical thinking, verification and responsible judgement.",
    highAnchor: "Experimental, augmented and verification-minded.",
    lowAnchor: "Cautious, human-first and less tool-dependent.",
    overuseRisk: "May over-automate or trust outputs before testing.",
  },
};

export const items: AssessmentItem[] = [
  {
    id: "D1",
    scale: "delivery",
    type: "core",
    text: "I turn ambiguous goals into clear next actions quickly.",
  },
  {
    id: "D2",
    scale: "delivery",
    type: "core",
    text: "I keep commitments even when the work becomes inconvenient.",
  },
  {
    id: "D3",
    scale: "delivery",
    type: "reverse",
    text: "I often rely on last-minute intensity rather than steady progress.",
  },
  {
    id: "D4",
    scale: "delivery",
    type: "core",
    text: "People can usually predict the quality and timing of my work.",
  },
  {
    id: "D5",
    scale: "delivery",
    type: "overuse",
    text: "I find it hard to stop improving work once it is good enough.",
  },
  {
    id: "D6",
    scale: "delivery",
    type: "reverse",
    text: "I lose track of details when several priorities compete.",
  },
  {
    id: "L1",
    scale: "learning",
    type: "core",
    text: "I actively seek feedback that may challenge my self-image.",
  },
  {
    id: "L2",
    scale: "learning",
    type: "core",
    text: "I enjoy learning unfamiliar tools, concepts or domains.",
  },
  {
    id: "L3",
    scale: "learning",
    type: "reverse",
    text: "I prefer to stick with methods that have worked for me before.",
  },
  {
    id: "L4",
    scale: "learning",
    type: "core",
    text: "I run small experiments before committing to a big change.",
  },
  {
    id: "L5",
    scale: "learning",
    type: "core",
    text: "When I fail, I can usually extract a practical lesson quickly.",
  },
  {
    id: "L6",
    scale: "learning",
    type: "overuse",
    text: "I sometimes move on to the next idea before finishing the learning loop.",
  },
  {
    id: "I1",
    scale: "influence",
    type: "core",
    text: "I am comfortable advocating for an idea in front of senior stakeholders.",
  },
  {
    id: "I2",
    scale: "influence",
    type: "core",
    text: "I can energise a group when momentum is low.",
  },
  {
    id: "I3",
    scale: "influence",
    type: "reverse",
    text: "I prefer others to present ideas, even when the thinking is mine.",
  },
  {
    id: "I4",
    scale: "influence",
    type: "core",
    text: "I adapt my message to the audience rather than using one generic pitch.",
  },
  {
    id: "I5",
    scale: "influence",
    type: "core",
    text: "I build networks before I need them.",
  },
  {
    id: "I6",
    scale: "influence",
    type: "overuse",
    text: "In debate, I can push too hard for my preferred direction.",
  },
  {
    id: "C1",
    scale: "collaboration",
    type: "core",
    text: "I assume positive intent unless there is strong evidence otherwise.",
  },
  {
    id: "C2",
    scale: "collaboration",
    type: "core",
    text: "I make space for quieter voices before decisions are made.",
  },
  {
    id: "C3",
    scale: "collaboration",
    type: "reverse",
    text: "I would rather do work myself than depend on others.",
  },
  {
    id: "C4",
    scale: "collaboration",
    type: "core",
    text: "I repair relationships directly when tension has built up.",
  },
  {
    id: "C5",
    scale: "collaboration",
    type: "core",
    text: "I share credit generously.",
  },
  {
    id: "C6",
    scale: "collaboration",
    type: "overuse",
    text: "I sometimes avoid difficult conversations to keep the peace.",
  },
  {
    id: "R1",
    scale: "regulation",
    type: "core",
    text: "Under pressure, I can stay calm enough to choose my response.",
  },
  {
    id: "R2",
    scale: "regulation",
    type: "core",
    text: "I recover quickly after criticism, setbacks or conflict.",
  },
  {
    id: "R3",
    scale: "regulation",
    type: "reverse",
    text: "My mood can visibly affect the people around me.",
  },
  {
    id: "R4",
    scale: "regulation",
    type: "core",
    text: "I can discuss difficult facts without making the conversation personal.",
  },
  {
    id: "R5",
    scale: "regulation",
    type: "core",
    text: "I notice early signals that I am becoming overloaded.",
  },
  {
    id: "R6",
    scale: "regulation",
    type: "overuse",
    text: "I may hide stress so well that others do not know I need help.",
  },
  {
    id: "S1",
    scale: "strategy",
    type: "core",
    text: "I naturally look for patterns across functions, markets or systems.",
  },
  {
    id: "S2",
    scale: "strategy",
    type: "core",
    text: "I consider second-order consequences before recommending action.",
  },
  {
    id: "S3",
    scale: "strategy",
    type: "reverse",
    text: "I prefer immediate practical action to abstract analysis.",
  },
  {
    id: "S4",
    scale: "strategy",
    type: "core",
    text: "I can simplify complexity without distorting it.",
  },
  {
    id: "S5",
    scale: "strategy",
    type: "core",
    text: "I connect day-to-day decisions to longer-term capability.",
  },
  {
    id: "S6",
    scale: "strategy",
    type: "overuse",
    text: "I sometimes hold decisions open while searching for a better model.",
  },
  {
    id: "H1",
    scale: "integrity",
    type: "core",
    text: "I will raise an uncomfortable truth even when it may cost me politically.",
  },
  {
    id: "H2",
    scale: "integrity",
    type: "core",
    text: "I am willing to admit when I do not know or got something wrong.",
  },
  {
    id: "H3",
    scale: "integrity",
    type: "reverse",
    text: "I sometimes bend rules if the outcome seems important enough.",
  },
  {
    id: "H4",
    scale: "integrity",
    type: "core",
    text: "I seek fair outcomes even when nobody is watching.",
  },
  {
    id: "H5",
    scale: "integrity",
    type: "core",
    text: "I invite challenge before committing to a consequential decision.",
  },
  {
    id: "H6",
    scale: "integrity",
    type: "overuse",
    text: "I can understate my own contribution to avoid seeming self-promotional.",
  },
  {
    id: "G1",
    scale: "change",
    type: "core",
    text: "I am energised by turning uncertainty into movement.",
  },
  {
    id: "G2",
    scale: "change",
    type: "core",
    text: "I can help others understand why change is necessary.",
  },
  {
    id: "G3",
    scale: "change",
    type: "reverse",
    text: "I prefer stability over transformation when both are possible.",
  },
  {
    id: "G4",
    scale: "change",
    type: "core",
    text: "I am willing to make a visible decision with incomplete information.",
  },
  {
    id: "G5",
    scale: "change",
    type: "core",
    text: "I notice adoption risk, not just launch risk.",
  },
  {
    id: "G6",
    scale: "change",
    type: "overuse",
    text: "I can create more change than people have capacity to absorb.",
  },
  {
    id: "A1",
    scale: "ai",
    type: "core",
    text: "I use AI or digital tools to accelerate thinking, drafting or analysis.",
  },
  {
    id: "A2",
    scale: "ai",
    type: "core",
    text: "I verify AI-generated outputs before relying on them.",
  },
  {
    id: "A3",
    scale: "ai",
    type: "reverse",
    text: "I avoid AI tools because I do not trust their usefulness.",
  },
  {
    id: "A4",
    scale: "ai",
    type: "core",
    text: "I can identify when a human judgement call should not be delegated to automation.",
  },
  {
    id: "A5",
    scale: "ai",
    type: "core",
    text: "I experiment with new tools while keeping ethics, privacy and quality in view.",
  },
  {
    id: "A6",
    scale: "ai",
    type: "overuse",
    text: "I sometimes use automation before the underlying process is clear enough.",
  },
];

export const expectedItemIds = items.map((item) => item.id);
