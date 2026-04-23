# Assessment Model

Status: Implementation-current master reference for the WorkStyle Compass instrument.

This document owns the assessment scales, v0 item bank, scoring rules, pressure flags, composite scores, archetypes, and result interpretation rules.

## Positioning

WorkStyle Compass is a developmental, research-informed work-style assessment. It is not a validated selection instrument.

Use language:

> A developmental work-style assessment inspired by occupational psychology. It helps people reflect on how they deliver, learn, collaborate, influence, handle pressure, think strategically, exercise judgement, use AI, and lead change.

Do not claim:

- diagnostic meaning;
- candidate suitability;
- job-performance prediction;
- percentile norms;
- validated type categories;
- employment decision readiness.

## Format

- 54 items total.
- 9 scales.
- 6 items per scale.
- 5-point Likert response scale:
  1. Strongly disagree
  2. Disagree
  3. Neither agree nor disagree
  4. Agree
  5. Strongly agree

Each scale contains:

- 4 core items;
- 1 reverse item;
- 1 overuse / pressure-risk item.

## Scale Keys

```ts
export type ScaleKey =
  | "delivery"
  | "learning"
  | "influence"
  | "collaboration"
  | "regulation"
  | "strategy"
  | "integrity"
  | "change"
  | "ai";
```

## Scales

| Key | Name | Short name | Description | High anchor | Low anchor | Overuse risk |
| --- | --- | --- | --- | --- | --- | --- |
| `delivery` | Delivery Discipline | Delivery | Reliable execution, prioritisation, follow-through and operational rhythm. | Structured, dependable and focused on commitments. | Flexible, adaptive and less bound by plans or routines. | May become rigid, perfectionistic or over-controlled under pressure. |
| `learning` | Learning Agility | Learning | Curiosity, feedback seeking, experimentation and speed of sense-making. | Curious, coachable, adaptive and quick to learn. | Prefers proven methods and familiar domains. | May chase novelty or pivot before learning is consolidated. |
| `influence` | Influence & Social Energy | Influence | Confidence in advocacy, persuasion, networking and visible leadership. | Persuasive, energising and comfortable with visibility. | Reflective, quieter and likely to influence through depth. | May dominate airtime or oversell before alignment is built. |
| `collaboration` | Collaboration & Trust | Collaboration | Generosity, inclusion, conflict repair and confidence in others. | Inclusive, trusting and relationship-oriented. | Independent, selective with trust and willing to challenge group assumptions. | May avoid hard conflict or over-accommodate. |
| `regulation` | Emotional Regulation | Regulation | Composure, resilience, recovery and steadiness under pressure. | Calm, steady, resilient and proportionate. | Sensitive to pressure signals and emotionally transparent. | May appear detached or under-signal urgency. |
| `strategy` | Strategic Systems Thinking | Strategy | Pattern recognition, trade-off thinking and handling complexity. | Systems-oriented, integrative and strategic. | Practical, concrete and focused on immediate realities. | May over-theorise or delay action for more analysis. |
| `integrity` | Integrity & Humility | Integrity | Truthfulness, fairness, ethical judgement, modesty and openness to challenge. | Grounded, fair, transparent and trustworthy. | Competitive, status-aware and politically pragmatic. | May under-claim impact or avoid necessary self-promotion. |
| `change` | Change Agency | Change | Energy for transformation, ambiguity tolerance, courage and momentum creation. | Catalytic, bold and energised by change. | Stabilising, continuity-minded and risk-aware. | May create change fatigue or move faster than adoption capacity. |
| `ai` | AI-Augmented Judgement | AI Judgement | Use of AI and digital tools with critical thinking, verification and responsible judgement. | Experimental, augmented and verification-minded. | Cautious, human-first and less tool-dependent. | May over-automate or trust outputs before testing. |

## Item Bank

Use this item bank exactly for v0 unless the research document is deliberately revised.

| ID | Scale | Type | Item |
| --- | --- | --- | --- |
| D1 | delivery | core | I turn ambiguous goals into clear next actions quickly. |
| D2 | delivery | core | I keep commitments even when the work becomes inconvenient. |
| D3 | delivery | reverse | I often rely on last-minute intensity rather than steady progress. |
| D4 | delivery | core | People can usually predict the quality and timing of my work. |
| D5 | delivery | overuse | I find it hard to stop improving work once it is good enough. |
| D6 | delivery | reverse | I lose track of details when several priorities compete. |
| L1 | learning | core | I actively seek feedback that may challenge my self-image. |
| L2 | learning | core | I enjoy learning unfamiliar tools, concepts or domains. |
| L3 | learning | reverse | I prefer to stick with methods that have worked for me before. |
| L4 | learning | core | I run small experiments before committing to a big change. |
| L5 | learning | core | When I fail, I can usually extract a practical lesson quickly. |
| L6 | learning | overuse | I sometimes move on to the next idea before finishing the learning loop. |
| I1 | influence | core | I am comfortable advocating for an idea in front of senior stakeholders. |
| I2 | influence | core | I can energise a group when momentum is low. |
| I3 | influence | reverse | I prefer others to present ideas, even when the thinking is mine. |
| I4 | influence | core | I adapt my message to the audience rather than using one generic pitch. |
| I5 | influence | core | I build networks before I need them. |
| I6 | influence | overuse | In debate, I can push too hard for my preferred direction. |
| C1 | collaboration | core | I assume positive intent unless there is strong evidence otherwise. |
| C2 | collaboration | core | I make space for quieter voices before decisions are made. |
| C3 | collaboration | reverse | I would rather do work myself than depend on others. |
| C4 | collaboration | core | I repair relationships directly when tension has built up. |
| C5 | collaboration | core | I share credit generously. |
| C6 | collaboration | overuse | I sometimes avoid difficult conversations to keep the peace. |
| R1 | regulation | core | Under pressure, I can stay calm enough to choose my response. |
| R2 | regulation | core | I recover quickly after criticism, setbacks or conflict. |
| R3 | regulation | reverse | My mood can visibly affect the people around me. |
| R4 | regulation | core | I can discuss difficult facts without making the conversation personal. |
| R5 | regulation | core | I notice early signals that I am becoming overloaded. |
| R6 | regulation | overuse | I may hide stress so well that others do not know I need help. |
| S1 | strategy | core | I naturally look for patterns across functions, markets or systems. |
| S2 | strategy | core | I consider second-order consequences before recommending action. |
| S3 | strategy | reverse | I prefer immediate practical action to abstract analysis. |
| S4 | strategy | core | I can simplify complexity without distorting it. |
| S5 | strategy | core | I connect day-to-day decisions to longer-term capability. |
| S6 | strategy | overuse | I sometimes hold decisions open while searching for a better model. |
| H1 | integrity | core | I will raise an uncomfortable truth even when it may cost me politically. |
| H2 | integrity | core | I am willing to admit when I do not know or got something wrong. |
| H3 | integrity | reverse | I sometimes bend rules if the outcome seems important enough. |
| H4 | integrity | core | I seek fair outcomes even when nobody is watching. |
| H5 | integrity | core | I invite challenge before committing to a consequential decision. |
| H6 | integrity | overuse | I can understate my own contribution to avoid seeming self-promotional. |
| G1 | change | core | I am energised by turning uncertainty into movement. |
| G2 | change | core | I can help others understand why change is necessary. |
| G3 | change | reverse | I prefer stability over transformation when both are possible. |
| G4 | change | core | I am willing to make a visible decision with incomplete information. |
| G5 | change | core | I notice adoption risk, not just launch risk. |
| G6 | change | overuse | I can create more change than people have capacity to absorb. |
| A1 | ai | core | I use AI or digital tools to accelerate thinking, drafting or analysis. |
| A2 | ai | core | I verify AI-generated outputs before relying on them. |
| A3 | ai | reverse | I avoid AI tools because I do not trust their usefulness. |
| A4 | ai | core | I can identify when a human judgement call should not be delegated to automation. |
| A5 | ai | core | I experiment with new tools while keeping ethics, privacy and quality in view. |
| A6 | ai | overuse | I sometimes use automation before the underlying process is clear enough. |

## Scoring Rules

For each item:

```ts
function scoreItem(raw: number, type: ItemType): number {
  if (type === "reverse") return 6 - raw;
  return raw;
}
```

For each scale:

1. Score `core` and `reverse` items.
2. Exclude `overuse` from the core scale score.
3. Compute the mean of the five scored core/reverse items.
4. Convert to a 0-100 profile score:

```text
score_0_100 = round((mean - 1) / 4 * 100)
```

Profile bands:

| Band | Score range | Meaning |
| --- | ---: | --- |
| low | 0-39 | Less characteristic of the respondent's current work style |
| moderate | 40-69 | Situational, mixed, or context-dependent |
| high | 70-100 | Strongly characteristic of the respondent's current work style |

These bands are profile bands, not norms.

## Pressure Flags

Overuse items are scored separately.

Create a pressure-risk flag when:

```text
core scale score >= 70 and overuse raw score >= 4
```

or:

```text
overuse raw score = 5
```

Severity:

- `watch` when overuse raw score is 4;
- `high` when overuse raw score is 5.

## Composite Scores

Composite indices are secondary summaries. They should never replace individual scale interpretation.

| Composite | Formula |
| --- | --- |
| Operating Rhythm | average of Delivery Discipline, Emotional Regulation, Strategic Systems Thinking |
| Trust Backbone | average of Integrity & Humility, Collaboration & Trust, Emotional Regulation |
| Learning Engine | average of Learning Agility, Change Agency, AI-Augmented Judgement |
| Change Leadership | average of Change Agency, Influence & Social Energy, Strategic Systems Thinking |
| Human-Centred Influence | average of Influence & Social Energy, Collaboration & Trust, Integrity & Humility |

## Archetype Rules

Archetypes are narrative summaries of score patterns. They are not types, diagnoses, or permanent labels.

Algorithm:

1. Sort scale scores descending.
2. Identify the top two domains.
3. If no score is at least 70 and the spread between highest and lowest score is less than 20, assign `Balanced Operator`.
4. Otherwise map the closest top-domain combination to a narrative archetype.
5. If no direct match exists, choose the closest archetype based on the top domain.

| Archetype | Trigger pattern | Summary |
| --- | --- | --- |
| The Builder | Delivery + Strategy or Delivery + Integrity | Turns priorities into reliable, high-quality progress. |
| The Catalyst | Change + Influence | Creates movement, energy, and visible momentum. |
| The Sensemaker | Strategy + Learning | Finds patterns, learns fast, and clarifies complexity. |
| The Integrator | Collaboration + Strategy or Collaboration + Integrity | Connects people, perspectives, and decisions. |
| The Steward | Integrity + Regulation or Integrity + Delivery | Protects trust, standards, and responsible execution. |
| The Explorer | Learning + AI or Learning + Change | Experiments, adapts, and extends capability. |
| The Connector | Influence + Collaboration | Builds energy, relationships, and shared commitment. |
| The Stabiliser | Regulation + Delivery | Brings calm, order, and follow-through under pressure. |
| The Balanced Operator | Balanced profile | Uses a broad mix of styles without one dominant pattern. |

## Results Report

Each results report should include:

1. Use boundary: developmental use only.
2. Profile summary and archetype.
3. Nine domain scores with score, band, high anchor, low anchor, and overuse risk.
4. Top two or three strengths.
5. Lowest two domains framed as development edges or contextual preferences.
6. Pressure-risk flags.
7. Team contribution.
8. Leadership implications.
9. AI/digital work implication.
10. Suggested 30-day experiment.
11. Three to five reflection prompts.
12. Methodology note explaining scoring and limits.

Do not imply that a result is a diagnosis, a validated prediction, or a hiring recommendation.

## Implementation Notes

Recommended files:

```text
src/features/assessment/schemas/assessment.ts
src/features/assessment/application/model.ts
src/features/assessment/application/scoring.ts
src/features/assessment/application/public-dataset.ts
src/features/assessment/application/reliability.ts
src/features/assessment/application/respondent-context.ts
src/features/assessment/tests/scoring.test.ts
```

SSoT rule:

- Scale keys, answer values, context buckets, public dataset fields, consent shape, result payloads, aggregate payloads, reliability payloads, and AI request/response payloads live in `src/features/assessment/schemas/assessment.ts`.
- Product/version constants live in `src/config/app.ts`.
- Feature UI metadata derived from schemas, such as respondent context form fields, lives in `src/features/assessment/application/respondent-context.ts`.
- Components must import those values instead of recreating enum-like arrays or contract types inline.

Test requirements:

- all scales have exactly six items;
- each scale has one overuse item;
- every answer is required;
- reverse scoring works;
- overuse item is excluded from core score;
- profile score conversion is correct;
- pressure flags trigger correctly;
- archetype derivation is deterministic.
