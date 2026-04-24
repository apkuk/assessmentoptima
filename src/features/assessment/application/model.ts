/**
 * File: src/features/assessment/application/model.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: WorkStyle Compass v2 scale definitions, operating-system model, and item bank.
 */
import { appConfig } from "@/config/app";

import {
  scaleKeys,
  type AssessmentItem,
  type ScaleKey,
} from "../schemas/assessment";

export type WorkOperatingSystemKey =
  | "operationalClarity"
  | "humanCoordination"
  | "adaptiveCapacity";

export interface WorkOperatingSystemDefinition {
  key: WorkOperatingSystemKey;
  name: string;
  description: string;
  scaleKeys: readonly ScaleKey[];
}

export interface ScaleDefinition {
  key: ScaleKey;
  name: string;
  shortName: string;
  operatingSystem: WorkOperatingSystemKey;
  description: string;
  highAnchor: string;
  lowAnchor: string;
  pressureDrift: string;
}

export const ASSESSMENT_VERSION = appConfig.defaultAssessmentVersion;
export const CONSENT_VERSION = appConfig.defaultConsentVersion;
export { scaleKeys };

export const operatingSystemDefinitions = {
  operationalClarity: {
    key: "operationalClarity",
    name: "Operational Clarity",
    description:
      "How the respondent turns complexity into usable work progress.",
    scaleKeys: [
      "commitment_rhythm",
      "systems_sensemaking",
      "augmented_judgement",
    ],
  },
  humanCoordination: {
    key: "humanCoordination",
    name: "Human Coordination",
    description:
      "How the respondent creates shared understanding, trust, and commitment.",
    scaleKeys: [
      "mobilising_communication",
      "mutuality_repair",
      "trust_stewardship",
    ],
  },
  adaptiveCapacity: {
    key: "adaptiveCapacity",
    name: "Adaptive Capacity",
    description:
      "How the respondent updates, recovers, and moves through uncertainty.",
    scaleKeys: [
      "adaptive_learning",
      "pressure_regulation",
      "change_navigation",
    ],
  },
} as const satisfies Record<
  WorkOperatingSystemKey,
  WorkOperatingSystemDefinition
>;

export const scales: Record<ScaleKey, ScaleDefinition> = {
  commitment_rhythm: {
    key: "commitment_rhythm",
    name: "Commitment Rhythm",
    shortName: "Commitment",
    operatingSystem: "operationalClarity",
    description:
      "Converting intention into visible, reliable progress through prioritisation, sequencing, and follow-through.",
    highAnchor: "Reliable, structured, and action-oriented.",
    lowAnchor: "Flexible, improvisational, and less constrained by routines.",
    pressureDrift: "Over-control, perfectionism, or reduced adaptability.",
  },
  adaptive_learning: {
    key: "adaptive_learning",
    name: "Adaptive Learning",
    shortName: "Learning",
    operatingSystem: "adaptiveCapacity",
    description:
      "Updating beliefs and behaviour through feedback, evidence, experimentation, and reflection.",
    highAnchor: "Curious, coachable, and experiment-minded.",
    lowAnchor: "Proven-method oriented, stable, and less novelty-seeking.",
    pressureDrift: "Exploration without consolidation.",
  },
  mobilising_communication: {
    key: "mobilising_communication",
    name: "Mobilising Communication",
    shortName: "Mobilising",
    operatingSystem: "humanCoordination",
    description:
      "Making ideas relevant, energising others, adapting messages, and creating commitment.",
    highAnchor: "Persuasive, energising, and audience-aware.",
    lowAnchor: "Reflective, quieter, and likely to influence through depth.",
    pressureDrift: "Advocacy overpowering curiosity.",
  },
  mutuality_repair: {
    key: "mutuality_repair",
    name: "Mutuality & Repair",
    shortName: "Mutuality",
    operatingSystem: "humanCoordination",
    description:
      "Building shared work through trust, contribution clarity, inclusion, conflict repair, and mutual accountability.",
    highAnchor: "Inclusive, relationally aware, and repair-oriented.",
    lowAnchor: "Independent, selective with trust, and self-reliant.",
    pressureDrift: "Harmony over candour or over-accommodation.",
  },
  pressure_regulation: {
    key: "pressure_regulation",
    name: "Pressure Regulation",
    shortName: "Regulation",
    operatingSystem: "adaptiveCapacity",
    description:
      "Staying choiceful, proportionate, recoverable, and transparent enough under pressure.",
    highAnchor: "Calm, resilient, and emotionally proportionate.",
    lowAnchor: "Emotionally transparent, pressure-sensitive, and urgent.",
    pressureDrift: "Under-signalling strain or urgency.",
  },
  systems_sensemaking: {
    key: "systems_sensemaking",
    name: "Systems Sensemaking",
    shortName: "Sensemaking",
    operatingSystem: "operationalClarity",
    description:
      "Seeing patterns, trade-offs, second-order effects, and long-term capability implications.",
    highAnchor: "Integrative, strategic, and complexity-aware.",
    lowAnchor: "Concrete, pragmatic, and close to immediate realities.",
    pressureDrift: "Analysis drag, abstraction, or delayed commitment.",
  },
  trust_stewardship: {
    key: "trust_stewardship",
    name: "Trust Stewardship",
    shortName: "Trust",
    operatingSystem: "humanCoordination",
    description:
      "Protecting truth, fairness, humility, risk visibility, and decision quality when incentives or politics complicate judgement.",
    highAnchor: "Fair, transparent, grounded, and challenge-seeking.",
    lowAnchor: "Pragmatic, status-aware, and politically adaptive.",
    pressureDrift: "Under-claiming, over-caution, or low self-advocacy.",
  },
  change_navigation: {
    key: "change_navigation",
    name: "Change Navigation",
    shortName: "Change",
    operatingSystem: "adaptiveCapacity",
    description:
      "Creating movement through uncertainty while managing adoption, trust, and capacity.",
    highAnchor: "Catalytic, courageous, and momentum-building.",
    lowAnchor: "Stabilising, continuity-minded, and risk-aware.",
    pressureDrift: "Change load exceeding system capacity.",
  },
  augmented_judgement: {
    key: "augmented_judgement",
    name: "Augmented Judgement",
    shortName: "Augmented",
    operatingSystem: "operationalClarity",
    description:
      "Using AI and digital tools to improve work while verifying outputs, protecting privacy, and preserving human accountability.",
    highAnchor: "Experimental, discerning, and verification-minded.",
    lowAnchor: "Cautious, human-first, and less tool-dependent.",
    pressureDrift: "Automation before clarity or shallow verification.",
  },
};

export const items: AssessmentItem[] = [
  {
    id: "D1",
    scale: "commitment_rhythm",
    type: "core",
    text: "When a goal is unclear, I define the next concrete move rather than waiting for perfect direction.",
  },
  {
    id: "D2",
    scale: "commitment_rhythm",
    type: "core",
    text: "I protect important commitments from being crowded out by urgent noise.",
  },
  {
    id: "D3",
    scale: "commitment_rhythm",
    type: "reverse",
    text: "My progress tends to come in bursts after pressure has built.",
  },
  {
    id: "D4",
    scale: "commitment_rhythm",
    type: "core",
    text: "I surface delivery risks before they become surprises.",
  },
  {
    id: "D5",
    scale: "commitment_rhythm",
    type: "core",
    text: "I keep enough visible structure that collaborators know what is due, by when, and from whom.",
  },
  {
    id: "D6",
    scale: "commitment_rhythm",
    type: "overuse",
    text: "I can become so focused on control and completion that I narrow others' room to adapt.",
  },
  {
    id: "L1",
    scale: "adaptive_learning",
    type: "core",
    text: "I deliberately seek evidence that could disconfirm my first view.",
  },
  {
    id: "L2",
    scale: "adaptive_learning",
    type: "core",
    text: "I can enter an unfamiliar domain and quickly build a working map of it.",
  },
  {
    id: "L3",
    scale: "adaptive_learning",
    type: "reverse",
    text: "I tend to prefer familiar methods even when the context has changed.",
  },
  {
    id: "L4",
    scale: "adaptive_learning",
    type: "core",
    text: "I turn feedback into a specific behavioural experiment.",
  },
  {
    id: "L5",
    scale: "adaptive_learning",
    type: "core",
    text: "After a setback, I identify what the next attempt should test.",
  },
  {
    id: "L6",
    scale: "adaptive_learning",
    type: "overuse",
    text: "I can keep exploring new angles after the problem needs consolidation.",
  },
  {
    id: "I1",
    scale: "mobilising_communication",
    type: "core",
    text: "I can make a complex idea feel relevant to the people who need to act on it.",
  },
  {
    id: "I2",
    scale: "mobilising_communication",
    type: "core",
    text: "I notice when a group needs energy, confidence, or a clearer call to action.",
  },
  {
    id: "I3",
    scale: "mobilising_communication",
    type: "reverse",
    text: "I often let useful ideas stay in my head because I do not want to push myself forward.",
  },
  {
    id: "I4",
    scale: "mobilising_communication",
    type: "core",
    text: "I adjust my message based on what the audience already believes, values, and fears.",
  },
  {
    id: "I5",
    scale: "mobilising_communication",
    type: "core",
    text: "I build relationships before I need agreement or support.",
  },
  {
    id: "I6",
    scale: "mobilising_communication",
    type: "overuse",
    text: "I can become more persuasive than curious once I believe a direction is right.",
  },
  {
    id: "C1",
    scale: "mutuality_repair",
    type: "core",
    text: "I check my assumptions about others' intentions before reacting to them.",
  },
  {
    id: "C2",
    scale: "mutuality_repair",
    type: "core",
    text: "I draw out perspectives that could otherwise be missed.",
  },
  {
    id: "C3",
    scale: "mutuality_repair",
    type: "reverse",
    text: "I am quicker to take work back than to help others succeed with it.",
  },
  {
    id: "C4",
    scale: "mutuality_repair",
    type: "core",
    text: "I address relationship tension before it hardens into avoidance.",
  },
  {
    id: "C5",
    scale: "mutuality_repair",
    type: "core",
    text: "I make contribution boundaries clear so shared work does not become vague or unfair.",
  },
  {
    id: "C6",
    scale: "mutuality_repair",
    type: "overuse",
    text: "I can spend too long preserving harmony when clarity or challenge is needed.",
  },
  {
    id: "R1",
    scale: "pressure_regulation",
    type: "core",
    text: "When pressure rises, I can slow the moment enough to choose my response.",
  },
  {
    id: "R2",
    scale: "pressure_regulation",
    type: "core",
    text: "I regain perspective after criticism, conflict, or a visible mistake.",
  },
  {
    id: "R3",
    scale: "pressure_regulation",
    type: "reverse",
    text: "People can usually tell when my frustration has taken over.",
  },
  {
    id: "R4",
    scale: "pressure_regulation",
    type: "core",
    text: "I can name difficult realities without turning the discussion into blame.",
  },
  {
    id: "R5",
    scale: "pressure_regulation",
    type: "core",
    text: "I recognise my early overload signals before they become performance problems.",
  },
  {
    id: "R6",
    scale: "pressure_regulation",
    type: "overuse",
    text: "I can appear so composed that others underestimate the support or urgency required.",
  },
  {
    id: "S1",
    scale: "systems_sensemaking",
    type: "core",
    text: "I look for the pattern connecting separate events, functions, or incentives.",
  },
  {
    id: "S2",
    scale: "systems_sensemaking",
    type: "core",
    text: "Before recommending action, I consider what the decision may create downstream.",
  },
  {
    id: "S3",
    scale: "systems_sensemaking",
    type: "reverse",
    text: "I tend to prioritise immediate visible action over understanding the system behind the problem.",
  },
  {
    id: "S4",
    scale: "systems_sensemaking",
    type: "core",
    text: "I can make complexity understandable without making it simplistic.",
  },
  {
    id: "S5",
    scale: "systems_sensemaking",
    type: "core",
    text: "I connect today's choices to capability, culture, or capacity that will matter later.",
  },
  {
    id: "S6",
    scale: "systems_sensemaking",
    type: "overuse",
    text: "I can keep refining the model after the team needs a decision.",
  },
  {
    id: "H1",
    scale: "trust_stewardship",
    type: "core",
    text: "I raise material risks or uncomfortable facts early enough for people to act on them.",
  },
  {
    id: "H2",
    scale: "trust_stewardship",
    type: "core",
    text: "When my evidence is weak, I say so rather than overstating certainty.",
  },
  {
    id: "H3",
    scale: "trust_stewardship",
    type: "reverse",
    text: "When a goal feels important, I may treat process commitments as negotiable.",
  },
  {
    id: "H4",
    scale: "trust_stewardship",
    type: "core",
    text: "I consider who could be unintentionally harmed by a decision.",
  },
  {
    id: "H5",
    scale: "trust_stewardship",
    type: "core",
    text: "I invite challenge from people who are likely to see my blind spots.",
  },
  {
    id: "H6",
    scale: "trust_stewardship",
    type: "overuse",
    text: "I can downplay my own contribution so much that others miss the value I added.",
  },
  {
    id: "G1",
    scale: "change_navigation",
    type: "core",
    text: "I can create movement when the path is still partly undefined.",
  },
  {
    id: "G2",
    scale: "change_navigation",
    type: "core",
    text: "I help people see the reason for change in terms that matter to their work.",
  },
  {
    id: "G3",
    scale: "change_navigation",
    type: "reverse",
    text: "When stability is possible, I usually prefer it over redesigning the way things work.",
  },
  {
    id: "G4",
    scale: "change_navigation",
    type: "core",
    text: "I can make a provisional decision, learn from it, and adjust publicly.",
  },
  {
    id: "G5",
    scale: "change_navigation",
    type: "core",
    text: "I pay attention to adoption capacity, not just launch momentum.",
  },
  {
    id: "G6",
    scale: "change_navigation",
    type: "overuse",
    text: "I can generate more change than the system has attention or trust to absorb.",
  },
  {
    id: "A1",
    scale: "augmented_judgement",
    type: "core",
    text: "Where tools are available, I use AI or automation to create a first draft, comparison, or analysis faster.",
  },
  {
    id: "A2",
    scale: "augmented_judgement",
    type: "core",
    text: "I check AI-assisted work against evidence, context, and consequences before relying on it.",
  },
  {
    id: "A3",
    scale: "augmented_judgement",
    type: "reverse",
    text: "I avoid AI-enabled tools even when they could safely improve the work.",
  },
  {
    id: "A4",
    scale: "augmented_judgement",
    type: "core",
    text: "I can tell when a task needs human accountability rather than automated output.",
  },
  {
    id: "A5",
    scale: "augmented_judgement",
    type: "core",
    text: "I experiment with new tools while protecting privacy, quality, and trust.",
  },
  {
    id: "A6",
    scale: "augmented_judgement",
    type: "overuse",
    text: "I can reach for automation before clarifying the human problem or process.",
  },
];

export const expectedItemIds = items.map((item) => item.id);
