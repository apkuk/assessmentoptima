# WorkStyle Compass v2 — Canonical Assessment Model

**Purpose:** define the canonical WorkStyle Compass v2 assessment model, item structure, interpretation boundaries, scoring rules, and validation path.

**Status:** source-of-truth model guide for `assessment-model.md` and the implementation in `src/features/assessment/application/model.ts`.

**Important use boundary:** this remains a developmental and research instrument until validation evidence exists. It must not be positioned for hiring, promotion, redundancy, compensation, clinical diagnosis, or other high-stakes employment decisions.

---

## 1. Executive Position

WorkStyle Compass v2 is intentionally organised around a distinct theory of work contribution:

> **WorkStyle Compass measures how people convert complexity into contribution through three work operating systems: Operational Clarity, Human Coordination, and Adaptive Capacity. Each domain has a productive mode, a contextual trade-off, and a pressure drift.**

The model is a developmental work-style instrument, not a pure personality taxonomy. It blends trait-like tendencies, behavioural habits, coordination patterns, self-regulation, decision integrity, and AI-era work practices. That mixed construct set is acceptable for a developmental profile as long as public interpretation stays precise about the product’s limits.

---

## 2. Design Choices To Preserve

The model should preserve these choices across docs and implementation:

1. **Work-language items.** The items describe workplace behaviours rather than abstract adjectives.
2. **Developmental use boundary.** The docs correctly avoid claiming validated selection meaning.
3. **Separate overuse signal.** The model recognises that strengths can become liabilities under pressure.
4. **Low-score dignity.** Low scores are mostly interpreted as contextual preferences, not deficits.
5. **Augmented Judgement.** This gives the instrument a genuinely contemporary, dynamic work-practice domain.
6. **Open-data orientation.** This can become a public validation and research story if handled conservatively.

These are worth keeping.

---

## 3. Where the current assessment needs improvement

### 3.1 The model mixes traits, habits, values, skills, and work practices

That is acceptable for a developmental work-style tool, but the instrument should not imply it is a pure personality inventory. “Work-style and operating pattern” is more accurate than “personality.”

### 3.2 The domains still overlap established behavioural-science constructs

Overlap with established constructs is unavoidable and scientifically desirable. Commitment Rhythm relates to conscientiousness and goal-directed behaviour; Pressure Regulation relates to emotional stability and self-regulation; Mutuality & Repair relates to agreeableness, trust, and repair; Trust Stewardship relates to integrity and Honesty-Humility; Systems Sensemaking relates to openness and cognitive complexity. The interpretation should organise those roots around the work-operating-system theory rather than presenting the scales as a generic trait list.

### 3.3 The overuse mechanism is promising but psychometrically thin

One overuse item per scale can generate a useful debrief hypothesis, but it is not reliable enough to be treated as a measured risk scale. The report should call these **pressure-drift signals**, not validated derailment metrics.

Recommended language:

> “A pressure-drift signal is a prompt for reflection, not a diagnosis. It shows where a strength may become costly under strain or overuse.”

### 3.4 Integrity items are vulnerable to social desirability

Items such as “I seek fair outcomes even when nobody is watching” invite virtue signalling. They are not wrong, but they will probably produce ceiling effects.

The revised items below use less moralised wording and more behavioural decision language.

### 3.5 Some items are role-level biased

For example, “senior stakeholders” may not apply to early-career users or individual contributors. Use “people who need to act,” “decision-makers,” or “stakeholders” without assuming hierarchy.

### 3.6 The response model needs a response-quality layer

Add non-punitive response-quality checks:

- completion time too short;
- excessive straightlining;
- very high acquiescence;
- missing answers;
- impossible or contradictory patterns.

Do **not** use these to accuse respondents of dishonesty. Use them as report caveats:

> “Your response pattern suggests this result should be interpreted cautiously.”

---

## 4. Recommended unique theory: the Work Operating System model

The revised instrument should be framed as a **3 x 3 work operating system**.

### 4.1 Core thesis

People create value at work by repeatedly doing three things:

1. **Creating operational clarity** — turning complexity into reliable progress.
2. **Creating human coordination** — turning difference into trust, action, and shared commitment.
3. **Creating adaptive capacity** — turning pressure and uncertainty into learning, change, and responsible judgement.

### 4.2 The 3 x 3 model

| Work operating system | Domain | Core question |
| --- | --- | --- |
| **Operational Clarity** | Commitment Rhythm | How do you convert intention into reliable progress? |
| **Operational Clarity** | Systems Sensemaking | How do you understand complexity, trade-offs, and downstream effects? |
| **Operational Clarity** | Augmented Judgement | How do you use digital/AI tools while preserving human accountability? |
| **Human Coordination** | Mobilising Communication | How do you create energy, relevance, and commitment through communication? |
| **Human Coordination** | Mutuality & Repair | How do you build collaboration, restore trust, and coordinate shared work? |
| **Human Coordination** | Trust Stewardship | How do you protect truth, fairness, humility, and decision integrity? |
| **Adaptive Capacity** | Adaptive Learning | How do you update your thinking when evidence, feedback, or context changes? |
| **Adaptive Capacity** | Pressure Regulation | How do you maintain perspective and choice under strain? |
| **Adaptive Capacity** | Change Navigation | How do you create movement through ambiguity without outrunning adoption? |

### 4.3 Why this is more original

The model treats work style as a pattern of **value creation under conditions of complexity, coordination, and change** rather than as a borrowed commercial-assessment silhouette.

The resulting model is still grounded in personality and organisational psychology, but its public explanation is distinctive:

- not a three-lens personality/risk/values clone;
- not a status-competition model;
- not a type system;
- not a direct Big Five clone;
- not a leadership competency model;
- not a validated selection battery;
- a developmental model of how people turn complexity into contribution.

---

## 5. Revised scale names and definitions

Keep the existing TypeScript keys to reduce implementation disruption, but update public labels and definitions.

```ts
export type ScaleKey =
  | "commitment_rhythm"
  | "systems_sensemaking"
  | "augmented_judgement"
  | "mobilising_communication"
  | "mutuality_repair"
  | "trust_stewardship"
  | "adaptive_learning"
  | "pressure_regulation"
  | "change_navigation";
```

| Key | v2 name | Operating system | Definition | High expression | Low expression | Pressure drift |
| --- | --- | --- | --- | --- | --- | --- |
| `commitment_rhythm` | Commitment Rhythm | Operational Clarity | Converting intention into visible, reliable progress through prioritisation, sequencing, and follow-through. | Reliable, structured, action-oriented. | Flexible, improvisational, less constrained by routines. | Over-control, perfectionism, reduced adaptability. |
| `systems_sensemaking` | Systems Sensemaking | Operational Clarity | Seeing patterns, trade-offs, second-order effects, and long-term capability implications. | Integrative, strategic, complexity-aware. | Concrete, pragmatic, close to immediate realities. | Analysis drag, abstraction, delayed commitment. |
| `augmented_judgement` | Augmented Judgement | Operational Clarity | Using AI/digital tools to improve work while verifying outputs, protecting privacy, and preserving human accountability. | Experimental, discerning, verification-minded. | Cautious, human-first, less tool-dependent. | Automation before clarity, shallow verification. |
| `mobilising_communication` | Mobilising Communication | Human Coordination | Making ideas relevant, energising others, adapting messages, and creating commitment. | Persuasive, energising, audience-aware. | Reflective, quieter, influence through depth. | Advocacy overpowering curiosity. |
| `mutuality_repair` | Mutuality & Repair | Human Coordination | Building shared work through trust, contribution clarity, inclusion, conflict repair, and mutual accountability. | Inclusive, relationally aware, repair-oriented. | Independent, selective with trust, self-reliant. | Harmony over candour; over-accommodation. |
| `trust_stewardship` | Trust Stewardship | Human Coordination | Protecting truth, fairness, humility, risk visibility, and decision quality when incentives or politics complicate judgement. | Fair, transparent, grounded, challenge-seeking. | Pragmatic, status-aware, politically adaptive. | Under-claiming, over-caution, low self-advocacy. |
| `adaptive_learning` | Adaptive Learning | Adaptive Capacity | Updating beliefs and behaviour through feedback, evidence, experimentation, and reflection. | Curious, coachable, experiment-minded. | Proven-method oriented, stable, less novelty-seeking. | Exploration without consolidation. |
| `pressure_regulation` | Pressure Regulation | Adaptive Capacity | Staying choiceful, proportionate, recoverable, and transparent enough under pressure. | Calm, resilient, emotionally proportionate. | Emotionally transparent, pressure-sensitive, urgent. | Under-signalling strain or urgency. |
| `change_navigation` | Change Navigation | Adaptive Capacity | Creating movement through uncertainty while managing adoption, trust, and capacity. | Catalytic, courageous, momentum-building. | Stabilising, continuity-minded, risk-aware. | Change load exceeding system capacity. |

---

## 6. Revised v2 item bank

### Item-writing improvements applied

The revised item bank:

- avoids Hogan scale names and proprietary phrasing;
- avoids morally loaded virtue claims where possible;
- removes role-level bias such as “senior stakeholders”;
- uses one behaviour per item;
- keeps language practical and debriefable;
- separates productive tendency from pressure drift;
- frames AI use as current work practice, not fixed trait;
- keeps the 54-item / 9-domain structure for v0 feasibility.

### Response scale

Use a 5-point agreement scale for v0:

1. Strongly disagree
2. Disagree
3. Neither agree nor disagree
4. Agree
5. Strongly agree

Recommended future improvement: pilot a frequency scale for some items, because “I tend to…” behavioural frequency may produce cleaner data than global agreement.

---

### 6.1 Commitment Rhythm (`commitment_rhythm`)

| ID | Type | Item |
| --- | --- | --- |
| D1 | core | When a goal is unclear, I define the next concrete move rather than waiting for perfect direction. |
| D2 | core | I protect important commitments from being crowded out by urgent noise. |
| D3 | reverse | My progress tends to come in bursts after pressure has built. |
| D4 | core | I surface delivery risks before they become surprises. |
| D5 | core | I keep enough visible structure that collaborators know what is due, by when, and from whom. |
| D6 | overuse | I can become so focused on control and completion that I narrow others’ room to adapt. |

### 6.2 Adaptive Learning (`adaptive_learning`)

| ID | Type | Item |
| --- | --- | --- |
| L1 | core | I deliberately seek evidence that could disconfirm my first view. |
| L2 | core | I can enter an unfamiliar domain and quickly build a working map of it. |
| L3 | reverse | I tend to prefer familiar methods even when the context has changed. |
| L4 | core | I turn feedback into a specific behavioural experiment. |
| L5 | core | After a setback, I identify what the next attempt should test. |
| L6 | overuse | I can keep exploring new angles after the problem needs consolidation. |

### 6.3 Mobilising Communication (`mobilising_communication`)

| ID | Type | Item |
| --- | --- | --- |
| I1 | core | I can make a complex idea feel relevant to the people who need to act on it. |
| I2 | core | I notice when a group needs energy, confidence, or a clearer call to action. |
| I3 | reverse | I often let useful ideas stay in my head because I do not want to push myself forward. |
| I4 | core | I adjust my message based on what the audience already believes, values, and fears. |
| I5 | core | I build relationships before I need agreement or support. |
| I6 | overuse | I can become more persuasive than curious once I believe a direction is right. |

### 6.4 Mutuality & Repair (`mutuality_repair`)

| ID | Type | Item |
| --- | --- | --- |
| C1 | core | I check my assumptions about others’ intentions before reacting to them. |
| C2 | core | I draw out perspectives that could otherwise be missed. |
| C3 | reverse | I am quicker to take work back than to help others succeed with it. |
| C4 | core | I address relationship tension before it hardens into avoidance. |
| C5 | core | I make contribution boundaries clear so shared work does not become vague or unfair. |
| C6 | overuse | I can spend too long preserving harmony when clarity or challenge is needed. |

### 6.5 Pressure Regulation (`pressure_regulation`)

| ID | Type | Item |
| --- | --- | --- |
| R1 | core | When pressure rises, I can slow the moment enough to choose my response. |
| R2 | core | I regain perspective after criticism, conflict, or a visible mistake. |
| R3 | reverse | People can usually tell when my frustration has taken over. |
| R4 | core | I can name difficult realities without turning the discussion into blame. |
| R5 | core | I recognise my early overload signals before they become performance problems. |
| R6 | overuse | I can appear so composed that others underestimate the support or urgency required. |

### 6.6 Systems Sensemaking (`systems_sensemaking`)

| ID | Type | Item |
| --- | --- | --- |
| S1 | core | I look for the pattern connecting separate events, functions, or incentives. |
| S2 | core | Before recommending action, I consider what the decision may create downstream. |
| S3 | reverse | I tend to prioritise immediate visible action over understanding the system behind the problem. |
| S4 | core | I can make complexity understandable without making it simplistic. |
| S5 | core | I connect today’s choices to capability, culture, or capacity that will matter later. |
| S6 | overuse | I can keep refining the model after the team needs a decision. |

### 6.7 Trust Stewardship (`trust_stewardship`)

| ID | Type | Item |
| --- | --- | --- |
| H1 | core | I raise material risks or uncomfortable facts early enough for people to act on them. |
| H2 | core | When my evidence is weak, I say so rather than overstating certainty. |
| H3 | reverse | When a goal feels important, I may treat process commitments as negotiable. |
| H4 | core | I consider who could be unintentionally harmed by a decision. |
| H5 | core | I invite challenge from people who are likely to see my blind spots. |
| H6 | overuse | I can downplay my own contribution so much that others miss the value I added. |

### 6.8 Change Navigation (`change_navigation`)

| ID | Type | Item |
| --- | --- | --- |
| G1 | core | I can create movement when the path is still partly undefined. |
| G2 | core | I help people see the reason for change in terms that matter to their work. |
| G3 | reverse | When stability is possible, I usually prefer it over redesigning the way things work. |
| G4 | core | I can make a provisional decision, learn from it, and adjust publicly. |
| G5 | core | I pay attention to adoption capacity, not just launch momentum. |
| G6 | overuse | I can generate more change than the system has attention or trust to absorb. |

### 6.9 Augmented Judgement (`augmented_judgement`)

| ID | Type | Item |
| --- | --- | --- |
| A1 | core | Where tools are available, I use AI or automation to create a first draft, comparison, or analysis faster. |
| A2 | core | I check AI-assisted work against evidence, context, and consequences before relying on it. |
| A3 | reverse | I avoid AI-enabled tools even when they could safely improve the work. |
| A4 | core | I can tell when a task needs human accountability rather than automated output. |
| A5 | core | I experiment with new tools while protecting privacy, quality, and trust. |
| A6 | overuse | I can reach for automation before clarifying the human problem or process. |

---

## 7. Scoring model

### 7.1 Core scale score

For each scale:

1. Score core items as raw 1–5.
2. Score reverse items as `6 - raw`.
3. Exclude overuse item from the core score.
4. Compute mean of the five core/reverse items.
5. Convert to 0–100:

```text
score_0_100 = round((mean - 1) / 4 * 100)
```

### 7.2 Bands

Use descriptive bands only, not norms:

| Band | Range | Meaning |
| --- | ---: | --- |
| Lower | 0–39 | Less characteristic of the respondent’s current work style. |
| Situational | 40–69 | Context-dependent or mixed expression. |
| Strong | 70–100 | Strongly characteristic of the respondent’s current work style. |

Avoid “low / medium / high” if possible; “Lower / Situational / Strong” is more user-safe.

### 7.3 Pressure-drift signals

Use overuse items as **single-item debrief prompts**, not psychometric scales.

Flag pressure drift when:

```text
core scale score >= 70 and overuse raw >= 4
```

or:

```text
overuse raw = 5
```

Severity:

- `watch`: overuse raw = 4
- `strong watch`: overuse raw = 5

Report language:

> “This is a reflection signal, not a diagnosis. It suggests where a useful style could become costly under pressure, overuse, or poor context fit.”

### 7.4 Composite operating-system scores

Replace the current composites with three conceptually cleaner pillars:

| Composite | Formula | Meaning |
| --- | --- | --- |
| Operational Clarity | average of Commitment Rhythm, Systems Sensemaking, Augmented Judgement | How the respondent turns complexity into usable work progress. |
| Human Coordination | average of Mobilising Communication, Mutuality & Repair, Trust Stewardship | How the respondent creates shared understanding, trust, and commitment. |
| Adaptive Capacity | average of Adaptive Learning, Pressure Regulation, Change Navigation | How the respondent updates, recovers, and moves through uncertainty. |

Optional secondary composites:

| Composite | Formula | Meaning |
| --- | --- | --- |
| Transformation Readiness | average of Change Navigation, Adaptive Learning, Mobilising Communication, Systems Sensemaking | Ability to create movement through uncertainty. |
| Trust Under Pressure | average of Trust Stewardship, Pressure Regulation, Mutuality & Repair | Ability to preserve truth and relationship quality under strain. |
| AI-Era Work Maturity | average of Augmented Judgement, Systems Sensemaking, Adaptive Learning, Trust Stewardship | Ability to use AI/digital tools with judgement, learning, and integrity. |

Do not over-feature composites in v0. The three main operating-system composites are enough.

---

## 8. Archetypes

Archetypes should remain narrative summaries, not types.

Recommended language:

> “Your archetype is a shorthand for your strongest current pattern. It is not a fixed type, diagnosis, or prediction of performance.”

### 8.1 Revised archetypes

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

### 8.2 Archetype guardrails

- Never say “you are.” Say “your current pattern resembles.”
- Never imply occupational fit or selection suitability.
- Never rank archetypes.
- Always show scale scores beneath the archetype.
- Show at least one “where this may cost you” prompt for any high archetype pattern.

---

## 9. Results report structure

The report should have five layers.

### 9.1 Layer 1: safe summary

- Developmental-use boundary.
- Archetype as narrative shorthand.
- Top three domains.
- Three operating-system composite bars.

### 9.2 Layer 2: domain profile

For each domain:

- score;
- band;
- “when this helps”;
- “when this may be less useful”;
- “pressure drift to watch” if flagged;
- one practical reflection prompt.

### 9.3 Layer 3: pressure-drift map

Show pressure signals as hypotheses:

| Pressure signal | Debrief question |
| --- | --- |
| Over-control | Where might reliable delivery be reducing adaptability? |
| Exploration drift | Where does learning need consolidation? |
| Advocacy drift | Where might persuasion be outrunning curiosity? |
| Harmony drift | What conversation is being postponed to preserve comfort? |
| Composure drift | Where might others underestimate urgency or strain? |
| Analysis drift | What decision needs enough clarity, not perfect clarity? |
| Under-claiming | Where does modesty make your contribution harder to see? |
| Change overload | Where is the system’s adoption capacity lower than your ambition? |
| Automation drift | Where is the tool moving faster than the human problem definition? |

### 9.4 Layer 4: context fit

Add practical context interpretation:

- This style may thrive in environments that reward…
- This style may become frustrated in environments that…
- This style may need support from colleagues who bring…

This creates a Birkman-like practical value without copying Birkman’s needs/stress architecture.

### 9.5 Layer 5: development experiment

Each result should produce one 30-day experiment with:

- hypothesis;
- one behaviour to try;
- one trigger situation;
- one evidence marker;
- one reflection question;
- optional calendar file.

Example:

> **Hypothesis:** Your strong Systems Sensemaking may help you clarify complexity, but may sometimes delay commitment.
> **Experiment:** In one ambiguous decision per week, write “what we know / what we assume / what we will test / what we will decide now.”
> **Evidence marker:** A stakeholder can say what decision has been made and what remains uncertain.

---

## 10. Assessor / coach debrief protocol

A practical instrument needs an assessor-friendly debrief method.

### 10.1 Five-step debrief

1. **Contract the use boundary.** “This is for reflection and development, not judgement.”
2. **Start with context.** “What kind of work environment are you in right now?”
3. **Validate, then complicate.** “What feels accurate? Where is it too simple?”
4. **Explore pressure drift.** “Where might this strength become costly?”
5. **Choose one experiment.** “What will you test in the next 30 days?”

### 10.2 Questions assessors should ask

- Which result feels most energising?
- Which result feels most uncomfortable?
- Where would your colleagues agree?
- Where might they disagree?
- Which pressure signal has shown up recently?
- What context brings out your best version?
- What context makes your style more costly?
- What is one behaviour you want to test, not one trait you want to “fix”?

### 10.3 What assessors should avoid

- Do not label the person as an archetype.
- Do not infer job suitability.
- Do not make clinical interpretations.
- Do not over-interpret small score differences.
- Do not use public sample comparisons as norms.
- Do not treat pressure-drift signals as diagnoses.

---

## 11. Validity and research roadmap

### Phase 1: content validity review

- 3–5 occupational psychologists / assessment specialists.
- 5–10 HR/OD practitioners.
- Review construct map, item relevance, item clarity, cultural assumptions, and social desirability risk.

### Phase 2: cognitive interviews

- 15–25 respondents across role levels and sectors.
- Ask people to explain what each item means to them.
- Identify ambiguous, double-barrelled, culturally loaded, or role-biased items.

### Phase 3: pilot dataset

Target: n = 300–500.

Analyse:

- item distributions;
- missingness;
- response quality;
- item-total correlations;
- alpha and omega;
- scale intercorrelations;
- reverse-item behaviour;
- pressure-item endorsement rates.

### Phase 4: factor structure

- Exploratory factor analysis on one sample.
- Confirmatory factor analysis on a separate sample.
- Test whether 9 domains and/or 3 operating-system composites are empirically defensible.

### Phase 5: validity evidence

Compare with:

- public-domain Big Five/IPIP scales;
- HEXACO Honesty-Humility and Conscientiousness;
- learning orientation;
- psychological safety/team trust proxies;
- self-rated and peer-rated work outcomes.

### Phase 6: fairness and invariance

- Differential item functioning by demographic groups where sample size permits.
- Measurement invariance for core groups.
- Review subgroup score distributions.
- Do not publish subgroup claims until sample size and fairness review support them.

---

## 12. Codex implementation instructions

### 12.1 Use canonical public labels and keys

Update `assessment-model.md`, model constants, result page labels, science page, and archetype pages to use the canonical v2 names and schema keys only. Do not keep transition aliases in public copy or implementation, because the product has not launched and no compatibility layer is needed.

### 12.2 Replace item bank

Replace all 54 items with the v2 item bank above.

Ensure each scale has exactly:

- 4 `core` items;
- 1 `reverse` item;
- 1 `overuse` item.

### 12.3 Update composites

Replace old composite indices with:

- Operational Clarity;
- Human Coordination;
- Adaptive Capacity.

Optional secondary composites may be added later.

### 12.4 Update pressure language

Replace “pressure risk” or “derailer” language with:

- pressure drift;
- pressure-drift signal;
- watch-out;
- reflection hypothesis.

### 12.5 Update result copy

Every report must include:

- “not a diagnosis”;
- “not a validated selection instrument”;
- “archetype is a narrative summary, not a type”;
- “current sample comparison is not a norm” if comparisons are shown.

### 12.6 Add tests

Tests should confirm:

- 54 total items;
- 9 scales;
- each scale has 4 core, 1 reverse, 1 overuse;
- overuse items are excluded from core score;
- reverse items are scored as `6 - raw`;
- operating-system composites use the correct domains;
- archetype labels map to intended top-domain combinations;
- no item text contains commercial-comparison language, selection claims, diagnostic claims, or hierarchy-specific wording that would not apply across career levels.

---

## 13. Public positioning copy

Recommended website copy:

> **WorkStyle Compass is a developmental work-style assessment that explores how you turn complexity into contribution.** It looks at three work operating systems: Operational Clarity, Human Coordination, and Adaptive Capacity. Your result highlights your strongest patterns, possible pressure drifts, and one practical experiment for the next 30 days.

Use:

> research-informed
> developmental
> work-style profile
> pressure drift
> current pattern
> context fit
> open research dataset

Avoid:

> selection claims
> candidate-fit claims
> hiring-prediction claims
> commercial-alternative claims
> diagnosis claims
> fixed personality-type claims
> validated-instrument claims before evidence exists

---

## 14. Bottom-line recommendation

The strongest version of WorkStyle Compass is:

> **a transparent, developmental, AI-era work operating system assessment that helps people understand how they create value, coordinate with others, adapt under pressure, and use judgement in increasingly complex work.**

That is original enough to stand on its own, practical enough for respondents and coaches, and grounded enough to become a serious instrument once validation data is gathered.

---

## 15. Source anchors for research document

These are not sources to copy from. They are reference anchors for the broader science and assessment landscape:

- Hogan Personality Inventory official page: https://www.hoganassessments.com/assessment/hogan-personality-inventory/
- Hogan Development Survey official page: https://www.hoganassessments.com/assessment/hogan-development-survey/
- Hogan Motives, Values, Preferences Inventory official page: https://www.hoganassessments.com/assessment/motives-values-preferences-inventory/
- Saville Wave Professional & Focus Styles: https://www.savilleassessment.com/wave-professional-and-focus-styles/
- Birkman Method overview: https://birkman.com/the-birkman-method
- IPIP official site: https://ipip.ori.org/
- HEXACO-PI-R scale descriptions: https://hexaco.org/scaledescriptions
- SIOP Principles for the Validation and Use of Personnel Selection Procedures: https://www.apa.org/ed/accreditation/personnel-selection-procedures.pdf
- APA Standards for Educational and Psychological Testing: https://www.apa.org/science/programs/testing/standards
