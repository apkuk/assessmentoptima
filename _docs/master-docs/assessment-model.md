# Assessment Model

Status: Implementation-current master reference for WorkStyle Compass v2.

## Positioning

WorkStyle Compass is a developmental work-style assessment. It explores how people turn complexity into contribution through three work operating systems:

- **Operational Clarity**: turning complexity into reliable, usable progress.
- **Human Coordination**: turning difference into trust, action, and shared commitment.
- **Adaptive Capacity**: turning pressure and uncertainty into learning, change, and responsible judgement.

It is not a selection instrument, clinical tool, validated predictor, or employment-decision aid. Results are for self-reflection, coaching, team conversation, and open research only.

Naming rule: **AssessmentOptima** is the product/platform brand, **WorkStyle Compass** is the assessment/instrument, and the **Work Operating System model** is the methodology underneath it. Respondent-facing UI should use WorkStyle Compass for the instrument and reserve Work Operating System language for science, methodology, and results interpretation. Internal version labels such as `wsc-v2.0` belong in data, docs, and citations, not in primary user-facing page labels.

## Scale Keys

The implementation uses v2 domain-aligned scale keys directly. Do not reintroduce older generic keys or compatibility aliases:

```ts
commitment_rhythm | adaptive_learning | mobilising_communication | mutuality_repair | pressure_regulation | systems_sensemaking | trust_stewardship | change_navigation | augmented_judgement
```

## Operating Systems And Domains

| Operating system | Key | Public domain | Core question |
| --- | --- | --- | --- |
| Operational Clarity | `commitment_rhythm` | Commitment Rhythm | How do you convert intention into reliable progress? |
| Operational Clarity | `systems_sensemaking` | Systems Sensemaking | How do you understand complexity and downstream effects? |
| Operational Clarity | `augmented_judgement` | Augmented Judgement | How do you use AI/digital tools while preserving human accountability? |
| Human Coordination | `mobilising_communication` | Mobilising Communication | How do you create energy, relevance, and commitment? |
| Human Coordination | `mutuality_repair` | Mutuality & Repair | How do you build collaboration and restore trust? |
| Human Coordination | `trust_stewardship` | Trust Stewardship | How do you protect truth, fairness, humility, and decision integrity? |
| Adaptive Capacity | `adaptive_learning` | Adaptive Learning | How do you update your thinking when context changes? |
| Adaptive Capacity | `pressure_regulation` | Pressure Regulation | How do you maintain perspective and choice under strain? |
| Adaptive Capacity | `change_navigation` | Change Navigation | How do you create movement without outrunning adoption? |

## Scale Definitions

| Key | Name | High expression | Lower expression | Pressure drift |
| --- | --- | --- | --- | --- |
| `commitment_rhythm` | Commitment Rhythm | Reliable, structured, action-oriented. | Flexible, improvisational, less constrained by routines. | Over-control, perfectionism, reduced adaptability. |
| `systems_sensemaking` | Systems Sensemaking | Integrative, strategic, complexity-aware. | Concrete, pragmatic, close to immediate realities. | Analysis drag, abstraction, delayed commitment. |
| `augmented_judgement` | Augmented Judgement | Experimental, discerning, verification-minded. | Cautious, human-first, less tool-dependent. | Automation before clarity, shallow verification. |
| `mobilising_communication` | Mobilising Communication | Persuasive, energising, audience-aware. | Reflective, quieter, influence through depth. | Advocacy overpowering curiosity. |
| `mutuality_repair` | Mutuality & Repair | Inclusive, relationally aware, repair-oriented. | Independent, selective with trust, self-reliant. | Harmony over candour; over-accommodation. |
| `trust_stewardship` | Trust Stewardship | Fair, transparent, grounded, challenge-seeking. | Pragmatic, status-aware, politically adaptive. | Under-claiming, over-caution, low self-advocacy. |
| `adaptive_learning` | Adaptive Learning | Curious, coachable, experiment-minded. | Proven-method oriented, stable, less novelty-seeking. | Exploration without consolidation. |
| `pressure_regulation` | Pressure Regulation | Calm, resilient, emotionally proportionate. | Emotionally transparent, pressure-sensitive, urgent. | Under-signalling strain or urgency. |
| `change_navigation` | Change Navigation | Catalytic, courageous, momentum-building. | Stabilising, continuity-minded, risk-aware. | Change load exceeding system capacity. |

Augmented Judgement is a dynamic work-practice domain, not a fixed personality trait. Access, company policy, role, sector, age cohort, and tool maturity can all affect the score.

## Item Structure

Each scale has exactly:

- 4 core items;
- 1 reverse item;
- 1 overuse item.

Overuse items are excluded from the core scale score. They create pressure-drift signals for reflection only.

## V2 Item Bank

| ID | Scale | Type | Item |
| --- | --- | --- | --- |
| D1 | Commitment Rhythm | core | When a goal is unclear, I define the next concrete move rather than waiting for perfect direction. |
| D2 | Commitment Rhythm | core | I protect important commitments from being crowded out by urgent noise. |
| D3 | Commitment Rhythm | reverse | My progress tends to come in bursts after pressure has built. |
| D4 | Commitment Rhythm | core | I surface delivery risks before they become surprises. |
| D5 | Commitment Rhythm | core | I keep enough visible structure that collaborators know what is due, by when, and from whom. |
| D6 | Commitment Rhythm | overuse | I can become so focused on control and completion that I narrow others' room to adapt. |
| L1 | Adaptive Learning | core | I deliberately seek evidence that could disconfirm my first view. |
| L2 | Adaptive Learning | core | I can enter an unfamiliar domain and quickly build a working map of it. |
| L3 | Adaptive Learning | reverse | I tend to prefer familiar methods even when the context has changed. |
| L4 | Adaptive Learning | core | I turn feedback into a specific behavioural experiment. |
| L5 | Adaptive Learning | core | After a setback, I identify what the next attempt should test. |
| L6 | Adaptive Learning | overuse | I can keep exploring new angles after the problem needs consolidation. |
| I1 | Mobilising Communication | core | I can make a complex idea feel relevant to the people who need to act on it. |
| I2 | Mobilising Communication | core | I notice when a group needs energy, confidence, or a clearer call to action. |
| I3 | Mobilising Communication | reverse | I often let useful ideas stay in my head because I do not want to push myself forward. |
| I4 | Mobilising Communication | core | I adjust my message based on what the audience already believes, values, and fears. |
| I5 | Mobilising Communication | core | I build relationships before I need agreement or support. |
| I6 | Mobilising Communication | overuse | I can become more persuasive than curious once I believe a direction is right. |
| C1 | Mutuality & Repair | core | I check my assumptions about others' intentions before reacting to them. |
| C2 | Mutuality & Repair | core | I draw out perspectives that could otherwise be missed. |
| C3 | Mutuality & Repair | reverse | I am quicker to take work back than to help others succeed with it. |
| C4 | Mutuality & Repair | core | I address relationship tension before it hardens into avoidance. |
| C5 | Mutuality & Repair | core | I make contribution boundaries clear so shared work does not become vague or unfair. |
| C6 | Mutuality & Repair | overuse | I can spend too long preserving harmony when clarity or challenge is needed. |
| R1 | Pressure Regulation | core | When pressure rises, I can slow the moment enough to choose my response. |
| R2 | Pressure Regulation | core | I regain perspective after criticism, conflict, or a visible mistake. |
| R3 | Pressure Regulation | reverse | People can usually tell when my frustration has taken over. |
| R4 | Pressure Regulation | core | I can name difficult realities without turning the discussion into blame. |
| R5 | Pressure Regulation | core | I recognise my early overload signals before they become performance problems. |
| R6 | Pressure Regulation | overuse | I can appear so composed that others underestimate the support or urgency required. |
| S1 | Systems Sensemaking | core | I look for the pattern connecting separate events, functions, or incentives. |
| S2 | Systems Sensemaking | core | Before recommending action, I consider what the decision may create downstream. |
| S3 | Systems Sensemaking | reverse | I tend to prioritise immediate visible action over understanding the system behind the problem. |
| S4 | Systems Sensemaking | core | I can make complexity understandable without making it simplistic. |
| S5 | Systems Sensemaking | core | I connect today's choices to capability, culture, or capacity that will matter later. |
| S6 | Systems Sensemaking | overuse | I can keep refining the model after the team needs a decision. |
| H1 | Trust Stewardship | core | I raise material risks or uncomfortable facts early enough for people to act on them. |
| H2 | Trust Stewardship | core | When my evidence is weak, I say so rather than overstating certainty. |
| H3 | Trust Stewardship | reverse | When a goal feels important, I may treat process commitments as negotiable. |
| H4 | Trust Stewardship | core | I consider who could be unintentionally harmed by a decision. |
| H5 | Trust Stewardship | core | I invite challenge from people who are likely to see my blind spots. |
| H6 | Trust Stewardship | overuse | I can downplay my own contribution so much that others miss the value I added. |
| G1 | Change Navigation | core | I can create movement when the path is still partly undefined. |
| G2 | Change Navigation | core | I help people see the reason for change in terms that matter to their work. |
| G3 | Change Navigation | reverse | When stability is possible, I usually prefer it over redesigning the way things work. |
| G4 | Change Navigation | core | I can make a provisional decision, learn from it, and adjust publicly. |
| G5 | Change Navigation | core | I pay attention to adoption capacity, not just launch momentum. |
| G6 | Change Navigation | overuse | I can generate more change than the system has attention or trust to absorb. |
| A1 | Augmented Judgement | core | Where tools are available, I use AI or automation to create a first draft, comparison, or analysis faster. |
| A2 | Augmented Judgement | core | I check AI-assisted work against evidence, context, and consequences before relying on it. |
| A3 | Augmented Judgement | reverse | I avoid AI-enabled tools even when they could safely improve the work. |
| A4 | Augmented Judgement | core | I can tell when a task needs human accountability rather than automated output. |
| A5 | Augmented Judgement | core | I experiment with new tools while protecting privacy, quality, and trust. |
| A6 | Augmented Judgement | overuse | I can reach for automation before clarifying the human problem or process. |

## Scoring

For each scale:

1. Score core items as raw 1-5.
2. Score reverse items as `6 - raw`.
3. Exclude the overuse item from the scale score.
4. Average the five scored items.
5. Convert to 0-100 with `round((mean - 1) / 4 * 100)`.

Bands:

| Band | Range | Meaning |
| --- | ---: | --- |
| Lower | 0-39 | Less characteristic of the respondent's current work style. |
| Situational | 40-69 | Context-dependent or mixed expression. |
| Strong | 70-100 | Strongly characteristic of the respondent's current work style. |

## Pressure Drift

Create a pressure-drift signal when:

```text
core scale score >= 70 and overuse raw >= 4
```

or:

```text
overuse raw = 5
```

Severity:

- `watch` when overuse raw is 4.
- `strong_watch` when overuse raw is 5.

Public language:

> A pressure-drift signal is a reflection prompt, not a diagnosis. It suggests where a useful style could become costly under pressure, overuse, or poor context fit.

## Operating-System Composites

| Composite | Formula |
| --- | --- |
| Operational Clarity | average of Commitment Rhythm, Systems Sensemaking, Augmented Judgement |
| Human Coordination | average of Mobilising Communication, Mutuality & Repair, Trust Stewardship |
| Adaptive Capacity | average of Adaptive Learning, Pressure Regulation, Change Navigation |

## Archetypes

Archetypes are narrative summaries, not fixed types. Use "your current pattern resembles" rather than "you are."

| Archetype | Trigger pattern | Narrative |
| --- | --- | --- |
| The Grounded Builder | Commitment Rhythm + Systems Sensemaking or Trust Stewardship | Turns complexity into dependable, responsible progress. |
| The Adaptive Explorer | Adaptive Learning + Augmented Judgement or Change Navigation | Experiments, learns quickly, and expands what is possible. |
| The Human Integrator | Mutuality & Repair + Trust Stewardship or Systems Sensemaking | Connects people, decisions, and trust across boundaries. |
| The Momentum Catalyst | Change Navigation + Mobilising Communication | Creates energy, urgency, and visible movement. |
| The Calm Operator | Pressure Regulation + Commitment Rhythm | Brings steadiness, order, and follow-through under strain. |
| The Systems Translator | Systems Sensemaking + Mobilising Communication | Makes complexity understandable and actionable for others. |
| The Trust Anchor | Trust Stewardship + Pressure Regulation | Protects truth, fairness, and proportion under pressure. |
| The Augmented Sensemaker | Augmented Judgement + Systems Sensemaking or Adaptive Learning | Uses digital tools to accelerate thinking while preserving judgement. |
| The Balanced Contributor | Balanced profile | Uses a broad mix of styles without one dominant pattern. |

## Required Tests

- 54 items across 9 scales.
- every scale has 4 core, 1 reverse, and 1 overuse item.
- overuse items are excluded from core scale scores.
- operating-system composites use the correct three domains.
- pressure-drift signals trigger correctly.
- item text avoids copied/proprietary assessment phrasing and role-level bias such as "senior stakeholders."
- public copy avoids claims that the instrument is validated for selection or diagnosis.
