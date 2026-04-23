# WorkStyle Compass — Behavioural Science Research Basis

**Version:** 1.0
**Prepared for:** Andrew Kilshaw
**Purpose:** Research foundation for a public, developmental, open-data work-style assessment platform.
**Status:** Research-informed prototype specification, not a validated psychometric instrument.

---

## 1. Executive summary

WorkStyle Compass is designed as a modern occupational self-assessment that helps people understand how they create value at work, how their strengths may overplay under pressure, and how their profile compares with anonymised aggregate patterns from other respondents.

The proposed assessment is deliberately positioned as **developmental and exploratory** rather than as a validated selection instrument. It should not be used for hiring, promotion, redundancy, diagnosis, compensation decisions, or any other high-stakes employment decision until a formal validation programme has been completed.

The model draws from five broad bodies of evidence and market practice:

1. **Trait psychology and occupational validity research**, especially Big Five and HEXACO-informed personality science.
2. **Professional assessment architecture**, particularly the Hogan bright-side / dark-side / inside model, Saville Wave’s integration of motives and talents, SHL OPQ’s occupational style orientation, Korn Ferry’s whole-person leadership model, and Birkman’s usual-behaviour / needs / stress-behaviour logic.
3. **Leadership and organisational behaviour research**, particularly learning agility, strategic thinking, collaboration, ethical judgment, pressure behaviour, and change agency.
4. **Modern AI/digital work behaviour**, treated as a work-behaviour capability rather than as a stable personality trait.
5. **Responsible open-data design**, including privacy-by-design, anonymisation limits, clear consent, small-cell suppression, and public data dictionaries.

The v0 assessment should measure nine work-style domains:

| Domain | Core question | Primary scientific lineage |
|---|---|---|
| Delivery Discipline | How reliably does the person turn intent into action? | Conscientiousness, dependability, achievement striving |
| Learning Agility | How quickly and willingly does the person learn from feedback and novelty? | Openness, learning goal orientation, learning agility |
| Influence & Social Energy | How visibly does the person advocate, persuade, and mobilise others? | Extraversion, assertiveness, social potency |
| Collaboration & Trust | How does the person build shared effort and repair interpersonal strain? | Agreeableness, cooperation, team orientation |
| Emotional Regulation | How steady is the person under stress, criticism, and uncertainty? | Emotional stability, resilience, self-regulation |
| Strategic Systems Thinking | How does the person handle complexity, trade-offs, and second-order effects? | Openness/intellect, cognitive complexity, strategic mindset |
| Integrity & Humility | How does the person handle truth, fairness, ego, and ethical pressure? | HEXACO Honesty-Humility, integrity, moral courage |
| Change Agency | How does the person create momentum through ambiguity and transformation? | Proactivity, tolerance for ambiguity, change leadership |
| AI-Augmented Judgement | How does the person use AI and digital tools with verification and human judgement? | Digital literacy, metacognition, human-AI teaming |

The key design principle is: **high scores are not automatically “good,” and low scores are not automatically “bad.”** Each domain has a productive expression, a contextual trade-off, and a pressure-risk pattern. This is directly inspired by the strongest logic in professional assessment: behaviour is useful only when interpreted against context, role demands, and overuse risk.

---

## 2. Positioning and use boundaries

### 2.1 Intended use

WorkStyle Compass v0 is intended for:

- self-reflection;
- coaching and development conversations;
- team dialogue;
- public research into work-style patterns;
- demonstration of an AI + psychometrics + open-data product concept;
- early validation data collection.

### 2.2 Explicitly prohibited use in v0

Until validation has been completed, the product must say that it is not suitable for:

- hiring or candidate screening;
- promotion or succession decisions;
- redundancy or disciplinary decisions;
- diagnosis or mental health assessment;
- compensation decisions;
- ranking employees;
- claims of predicting job performance.

This is not just legal caution. It is psychometric discipline. The professional standards for occupational testing require evidence for the intended interpretation and use of assessment scores. A research-informed instrument becomes a professional psychometric only after reliability, validity, fairness, and governance evidence has been gathered.

### 2.3 Recommended public positioning

Suggested product language:

> “A developmental work-style assessment inspired by occupational psychology. It helps you reflect on how you deliver, learn, collaborate, influence, handle pressure, think strategically, exercise judgement, and lead change. Results are for self-awareness and research only, not for employment decisions.”

---

## 3. Review of peer professional assessments

### 3.1 Hogan Assessments

Hogan’s commercial strength is its three-lens personality architecture:

- **HPI / bright side:** everyday personality and reputation when people are at their best;
- **HDS / dark side:** derailers and risk behaviours that emerge under stress or low self-monitoring;
- **MVPI / inside:** values, motives, drivers, and the environments people find rewarding.

Design lesson for WorkStyle Compass: the most useful assessment reports do not stop at “traits.” They integrate everyday behavioural style, overuse/pressure risk, and motivational context. The v0 model borrows that architecture without copying Hogan scales, items, names, or proprietary scoring.

### 3.2 SHL OPQ

The SHL Occupational Personality Questionnaire is a long-standing work-oriented personality instrument. Its design lesson is that workplace assessments should be written in occupational language: how people prefer to work, interact, think, decide, influence, and manage demands.

Design lesson for WorkStyle Compass: avoid abstract personality labels where possible. Use behaviour-rich work language and link results to role context.

### 3.3 Saville Wave

Saville Wave is notable for measuring work-relevant motives and talents in an integrated way, using dynamic questionnaire design and reports for selection, development, candidate feedback, line managers, and interviews.

Design lesson for WorkStyle Compass: strong professional assessments generate multiple outputs from the same assessment event. In v0, the product should generate an individual report, public aggregate dashboard, dataset export, and optionally AI-assisted synthesis.

### 3.4 Korn Ferry Assess / KF4D

Korn Ferry’s Four Dimensions of Leadership and Talent uses a whole-person model: competencies, experiences, traits, and drivers. Korn Ferry also highlights learning agility, self-awareness, leadership traits, derailment risk, and success profiles.

Design lesson for WorkStyle Compass: leadership effectiveness is broader than personality. The model should therefore include behavioural style, capability-adjacent work habits, pressure risks, and contextual interpretation rather than presenting itself as a pure personality inventory.

### 3.5 Birkman Method

Birkman’s enduring strength is its distinction between usual behaviour, needs, interests, and stress behaviour. It helps explain why someone may behave differently when their underlying needs are unmet.

Design lesson for WorkStyle Compass: the result should include “when this works well” and “when this becomes costly,” especially under pressure.

### 3.6 Predictive Index

The Predictive Index Behavioral Assessment is short, work-focused, and designed around behavioural drives and needs. It shows the market value of a rapid instrument that translates results into practical workplace language.

Design lesson for WorkStyle Compass: completion time matters. A 10-minute public assessment is more viable than a 45-minute professional battery for an open research platform.

### 3.7 16pf and Caliper

16pf and Caliper demonstrate the value of broad trait coverage, long-running research programmes, norms, and role-relevant interpretation. They also show the difference between a serious instrument and a simple “type quiz”: professional tools need technical manuals, norms, reliability evidence, and evidence for intended uses.

Design lesson for WorkStyle Compass: v0 can be polished and useful, but it must clearly separate user-facing insight from claims of validated prediction.

### 3.8 Popular typologies: DiSC, MBTI, CliftonStrengths, Insights

These tools have strong market adoption because they are memorable, accessible, and easy to discuss. Their lesson is user experience, not necessarily measurement precision. WorkStyle Compass should avoid rigid “type” thinking but may use archetypes as **narrative summaries**, not as psychometric categories.

Design lesson for WorkStyle Compass: archetypes can help people remember results, but scale scores and behavioural interpretation must remain primary.

---

## 4. Scientific foundations

### 4.1 Trait theory and the Big Five

A large body of occupational psychology research supports the relevance of broad personality traits at work. Meta-analytic research has historically shown that **Conscientiousness** and **Emotional Stability** are among the broadest personality predictors across job criteria and occupational groups. This does not mean personality predicts everything, nor that personality should be used casually in selection. It means work behaviour has stable dispositional components that can be measured, interpreted, and studied.

Implications for v0:

- Delivery Discipline maps partly onto Conscientiousness.
- Emotional Regulation maps partly onto Emotional Stability.
- Influence & Social Energy maps partly onto Extraversion.
- Collaboration & Trust maps partly onto Agreeableness.
- Learning Agility and Strategic Systems Thinking map partly onto Openness/Intellect.

### 4.2 HEXACO and Honesty-Humility

The HEXACO model adds Honesty-Humility as a major personality dimension. This is particularly relevant to leadership and organisational trust because some work risks are not just about competence; they are about ego, fairness, entitlement, truthfulness, and exploitation.

Implications for v0:

- Integrity & Humility should be a distinct domain, not hidden under generic “agreeableness.”
- The domain should be interpreted carefully: high humility may reduce self-promotion; very low humility may indicate status-seeking or rule-bending risk.
- The assessment should not make moral diagnoses. It should frame behaviours as tendencies and invite reflection.

### 4.3 Pressure behaviour and overused strengths

Hogan’s dark-side logic is one of the most valuable ideas to borrow conceptually: traits that look like strengths can become liabilities when overused or expressed under stress. For example:

- Delivery Discipline can become rigidity or perfectionism.
- Influence can become airtime dominance or overselling.
- Collaboration can become conflict avoidance.
- Emotional Regulation can become emotional under-signalling.
- Strategy can become analysis paralysis.
- Change Agency can become change fatigue.

Implications for v0:

- Each scale should include one **overuse / pressure-risk item**.
- The overuse item should not simply inflate the positive scale score.
- Reports should include “watch-outs” when a respondent’s core score is high and their overuse item is also high.

### 4.4 Learning agility and change

Professional leadership assessment often includes learning agility because leadership roles change faster than static experience can cover. Learning agility is not just curiosity. It includes feedback seeking, sense-making, experimentation, and applying learning under new conditions.

Implications for v0:

- Learning Agility and Change Agency should be separate.
- Learning Agility asks, “How does this person learn?”
- Change Agency asks, “How does this person mobilise movement through ambiguity?”

### 4.5 Strategy and systems thinking

Strategic work requires more than abstract intelligence. It includes seeing patterns, weighing trade-offs, simplifying complexity, and linking local decisions to long-term consequences.

Implications for v0:

- Strategic Systems Thinking should be behavioural and accessible.
- It should not claim to measure cognitive ability.
- It should capture preferences and habits of sense-making.

### 4.6 AI-Augmented Judgement

AI capability is now becoming a practical work behaviour. However, it should not be treated as a fixed personality trait. The domain should measure a behavioural pattern: whether someone uses AI/digital tools to improve thinking and execution while verifying outputs, protecting privacy, and knowing when human judgement is required.

Implications for v0:

- AI-Augmented Judgement is a work-practice domain, not a personality trait.
- It should be reported as “current orientation and practice,” likely to change over time.
- It should include both experimentation and verification.

---

## 5. Design principles distilled from research and peer instruments

### 5.1 Work language over abstract trait language

Items should describe recognisable work behaviour:

- “I turn ambiguous goals into clear next actions quickly.”
- “I make space for quieter voices before decisions are made.”
- “I verify AI-generated outputs before relying on them.”

This is more useful to a respondent than abstract adjectives such as “industrious” or “sociable.”

### 5.2 Bipolar interpretation without false equivalence

Low scores should have meaningful interpretation, not simply “bad.” For example:

- Lower Change Agency may mean stabilising, continuity-minded, and risk-aware.
- Lower Influence may mean reflective, depth-oriented, and less performative.
- Lower Strategy may mean practical, concrete, and action-focused.

### 5.3 Separate core score from overuse signal

The six-item-per-domain design should be interpreted as:

- four positive/core tendency items;
- one reverse-scored contrast item;
- one pressure-risk / overuse item.

The overuse item should produce a **risk flag**, not simply increase the domain score.

### 5.4 Narrative archetypes as summaries, not types

Archetypes are helpful for recall, but they should not be treated as fixed psychological categories. The report should say:

> “Your archetype is a narrative summary of your strongest score pattern. It is not a type, diagnosis, or permanent label.”

### 5.5 No normative percentile claims in v0

Before norming, the product should not say “you are in the 80th percentile.” It should use internal profile language:

- low: 0-39;
- moderate: 40-69;
- high: 70-100.

These are **profile bands**, not norms.

### 5.6 Transparency

The platform should publish:

- the model;
- the item bank;
- the scoring logic;
- the interpretation rules;
- the dataset dictionary;
- limitations;
- validation roadmap.

This turns a limitation into a feature: WorkStyle Compass is an open research project, not a black-box test.

---

## 6. Proposed assessment model

### 6.1 Domain definitions

| Domain | High expression | Low expression | Overuse risk |
|---|---|---|---|
| Delivery Discipline | Structured, dependable, focused on commitments | Flexible, adaptive, less routine-bound | Rigidity, perfectionism, excessive control |
| Learning Agility | Curious, coachable, experimental | Prefers proven methods and familiar domains | Novelty chasing, unfinished learning loops |
| Influence & Social Energy | Persuasive, energising, visible | Quiet influence through depth and substance | Dominating airtime, overselling, political push |
| Collaboration & Trust | Inclusive, generous, relationship-oriented | Independent, discerning, less group-dependent | Conflict avoidance, over-accommodation |
| Emotional Regulation | Calm, resilient, proportionate | Sensitive to pressure signals, emotionally transparent | Detachment, under-signalling urgency or need |
| Strategic Systems Thinking | Pattern-seeking, integrative, long-range | Practical, immediate, concrete | Over-theorising, delayed action |
| Integrity & Humility | Fair, transparent, grounded, challenge-seeking | Competitive, status-aware, politically pragmatic | Under-claiming impact, excessive self-effacement |
| Change Agency | Catalytic, bold, ambiguity-tolerant | Stabilising, continuity-minded, risk-aware | Change fatigue, outrunning adoption capacity |
| AI-Augmented Judgement | Experimental, augmented, verification-minded | Cautious, human-first, tool-sceptical | Over-automation, premature reliance on outputs |

### 6.2 Domain rationale

#### Delivery Discipline

Delivery Discipline reflects the behavioural tendency to translate intent into action, maintain commitments, and produce reliable work. It draws heavily from Conscientiousness but should be framed as an operating rhythm rather than as a moral virtue. The report should distinguish reliability from rigidity.

#### Learning Agility

Learning Agility reflects feedback-seeking, experimentation, adaptation, and learning from failure. It is especially relevant in roles with ambiguity, transformation, and new capability demands. The report should distinguish learning agility from distraction or novelty chasing.

#### Influence & Social Energy

Influence & Social Energy reflects comfort with visibility, advocacy, persuasion, and energising groups. It is related to extraversion and assertiveness but should not equate introversion with low effectiveness. The report should distinguish visible influence from thoughtful, low-ego influence.

#### Collaboration & Trust

Collaboration & Trust reflects cooperative intent, inclusion, credit sharing, and relationship repair. It is related to agreeableness but includes team process behaviours. The report should distinguish trust from naivety and inclusion from conflict avoidance.

#### Emotional Regulation

Emotional Regulation reflects composure, recovery, and proportionality under stress. It is related to emotional stability and self-regulation. The report should distinguish calm leadership from emotional suppression or detachment.

#### Strategic Systems Thinking

Strategic Systems Thinking reflects pattern recognition, trade-off reasoning, second-order thinking, and simplifying complexity. It should not claim to measure intelligence. It measures work-style tendencies in complex sense-making.

#### Integrity & Humility

Integrity & Humility reflects truth-telling, fairness, ethical judgement, admitting uncertainty, and openness to challenge. It draws from Honesty-Humility and leadership trust research. The report should distinguish humility from invisibility or under-claiming.

#### Change Agency

Change Agency reflects the tendency to create movement under ambiguity, make visible decisions, and help others understand why change is needed. The report should distinguish change leadership from churn.

#### AI-Augmented Judgement

AI-Augmented Judgement reflects the tendency to use AI/digital tools for thought and execution while verifying outputs and knowing when not to automate. It should be treated as a dynamic work practice, not as an enduring personality factor.

---

## 7. Item design

### 7.1 Recommended item format

- 54 items total.
- 9 domains.
- 6 items per domain.
- 5-point Likert scale:
  1. Strongly disagree
  2. Disagree
  3. Neither agree nor disagree
  4. Agree
  5. Strongly agree

### 7.2 Item types per domain

For each domain:

- **4 core items**: directly measure productive expression.
- **1 reverse item**: captures the opposite or contrast tendency.
- **1 overuse item**: captures pressure-risk or overextension.

### 7.3 Item-writing rules

Items should:

- describe observable work behaviour;
- be readable at roughly secondary-school level;
- avoid clinical language;
- avoid protected characteristics;
- avoid culture-specific idioms;
- avoid moralising;
- avoid double-barrelled phrasing;
- avoid direct copies of proprietary assessment items;
- avoid claims that require external evidence the respondent may not have.

### 7.4 Original v0 item bank

| Domain | Type | Item |
|---|---|---|
| Delivery Discipline | core | I turn ambiguous goals into clear next actions quickly. |
| Delivery Discipline | core | I keep commitments even when the work becomes inconvenient. |
| Delivery Discipline | reverse | I often rely on last-minute intensity rather than steady progress. |
| Delivery Discipline | core | People can usually predict the quality and timing of my work. |
| Delivery Discipline | overuse | I find it hard to stop improving work once it is good enough. |
| Delivery Discipline | reverse | I lose track of details when several priorities compete. |
| Learning Agility | core | I actively seek feedback that may challenge my self-image. |
| Learning Agility | core | I enjoy learning unfamiliar tools, concepts or domains. |
| Learning Agility | reverse | I prefer to stick with methods that have worked for me before. |
| Learning Agility | core | I run small experiments before committing to a big change. |
| Learning Agility | core | When I fail, I can usually extract a practical lesson quickly. |
| Learning Agility | overuse | I sometimes move on to the next idea before finishing the learning loop. |
| Influence & Social Energy | core | I am comfortable advocating for an idea in front of senior stakeholders. |
| Influence & Social Energy | core | I can energise a group when momentum is low. |
| Influence & Social Energy | reverse | I prefer others to present ideas, even when the thinking is mine. |
| Influence & Social Energy | core | I adapt my message to the audience rather than using one generic pitch. |
| Influence & Social Energy | core | I build networks before I need them. |
| Influence & Social Energy | overuse | In debate, I can push too hard for my preferred direction. |
| Collaboration & Trust | core | I assume positive intent unless there is strong evidence otherwise. |
| Collaboration & Trust | core | I make space for quieter voices before decisions are made. |
| Collaboration & Trust | reverse | I would rather do work myself than depend on others. |
| Collaboration & Trust | core | I repair relationships directly when tension has built up. |
| Collaboration & Trust | core | I share credit generously. |
| Collaboration & Trust | overuse | I sometimes avoid difficult conversations to keep the peace. |
| Emotional Regulation | core | Under pressure, I can stay calm enough to choose my response. |
| Emotional Regulation | core | I recover quickly after criticism, setbacks or conflict. |
| Emotional Regulation | reverse | My mood can visibly affect the people around me. |
| Emotional Regulation | core | I can discuss difficult facts without making the conversation personal. |
| Emotional Regulation | core | I notice early signals that I am becoming overloaded. |
| Emotional Regulation | overuse | I may hide stress so well that others do not know I need help. |
| Strategic Systems Thinking | core | I naturally look for patterns across functions, markets or systems. |
| Strategic Systems Thinking | core | I consider second-order consequences before recommending action. |
| Strategic Systems Thinking | reverse | I prefer immediate practical action to abstract analysis. |
| Strategic Systems Thinking | core | I can simplify complexity without distorting it. |
| Strategic Systems Thinking | core | I connect day-to-day decisions to longer-term capability. |
| Strategic Systems Thinking | overuse | I sometimes hold decisions open while searching for a better model. |
| Integrity & Humility | core | I will raise an uncomfortable truth even when it may cost me politically. |
| Integrity & Humility | core | I am willing to admit when I do not know or got something wrong. |
| Integrity & Humility | reverse | I sometimes bend rules if the outcome seems important enough. |
| Integrity & Humility | core | I seek fair outcomes even when nobody is watching. |
| Integrity & Humility | core | I invite challenge before committing to a consequential decision. |
| Integrity & Humility | overuse | I can understate my own contribution to avoid seeming self-promotional. |
| Change Agency | core | I am energised by turning uncertainty into movement. |
| Change Agency | core | I can help others understand why change is necessary. |
| Change Agency | reverse | I prefer stability over transformation when both are possible. |
| Change Agency | core | I am willing to make a visible decision with incomplete information. |
| Change Agency | core | I notice adoption risk, not just launch risk. |
| Change Agency | overuse | I can create more change than people have capacity to absorb. |
| AI-Augmented Judgement | core | I use AI or digital tools to accelerate thinking, drafting or analysis. |
| AI-Augmented Judgement | core | I verify AI-generated outputs before relying on them. |
| AI-Augmented Judgement | reverse | I avoid AI tools because I do not trust their usefulness. |
| AI-Augmented Judgement | core | I can identify when a human judgement call should not be delegated to automation. |
| AI-Augmented Judgement | core | I experiment with new tools while keeping ethics, privacy and quality in view. |
| AI-Augmented Judgement | overuse | I sometimes use automation before the underlying process is clear enough. |

---

## 8. Scoring model

### 8.1 Core domain scoring

For each domain:

1. Score core items as answered from 1 to 5.
2. Score reverse items as `6 - rawValue`.
3. Exclude overuse items from the core domain score.
4. Compute mean of the five scored core/reverse items.
5. Convert to a 0-100 profile score:

```text
score_0_100 = round((mean - 1) / 4 * 100)
```

### 8.2 Profile bands

These bands are interpretive profile bands, not norms:

| Band | Score range | Meaning |
|---|---:|---|
| Low | 0-39 | Less characteristic of the respondent’s current work style |
| Moderate | 40-69 | Situational, mixed, or context-dependent |
| High | 70-100 | Strongly characteristic of the respondent’s current work style |

### 8.3 Overuse / pressure-risk flags

Overuse items are scored separately.

A pressure-risk flag should be shown when:

- core domain score >= 70 and overuse item >= 4; or
- overuse item = 5 regardless of core score.

Example:

- High Delivery Discipline + high “hard to stop improving” item = perfectionism / over-control watch-out.
- High Collaboration + high conflict-avoidance item = harmony-over-candour watch-out.

### 8.4 Composite indices

V0 may include composite indices only as secondary summaries:

| Composite | Formula |
|---|---|
| Operating Rhythm | average of Delivery Discipline, Emotional Regulation, Strategic Systems Thinking |
| Trust Backbone | average of Integrity & Humility, Collaboration & Trust, Emotional Regulation |
| Learning Engine | average of Learning Agility, Change Agency, AI-Augmented Judgement |
| Change Leadership | average of Change Agency, Influence & Social Energy, Strategic Systems Thinking |
| Human-Centred Influence | average of Influence & Social Energy, Collaboration & Trust, Integrity & Humility |

Composite indices should never replace individual scale interpretation.

### 8.5 Archetype derivation

Archetypes should be generated from the respondent’s strongest patterns, not treated as fixed types.

Recommended v0 algorithm:

1. Sort scale scores descending.
2. Identify top two domains.
3. If no score >= 70 and spread between highest and lowest score is < 20, assign **Balanced Operator**.
4. Otherwise map the top-domain combination to the closest narrative archetype.

Suggested archetypes:

| Archetype | Trigger pattern | Narrative |
|---|---|---|
| The Builder | Delivery + Strategy or Delivery + Integrity | Turns priorities into reliable, high-quality progress. |
| The Catalyst | Change + Influence | Creates movement, energy, and visible momentum. |
| The Sensemaker | Strategy + Learning | Finds patterns, learns fast, and clarifies complexity. |
| The Integrator | Collaboration + Strategy or Collaboration + Integrity | Connects people, perspectives, and decisions. |
| The Steward | Integrity + Regulation or Integrity + Delivery | Protects trust, standards, and responsible execution. |
| The Explorer | Learning + AI or Learning + Change | Experiments, adapts, and extends capability. |
| The Connector | Influence + Collaboration | Builds energy, relationships, and shared commitment. |
| The Stabiliser | Regulation + Delivery | Brings calm, order, and follow-through under pressure. |
| The Balanced Operator | Balanced profile | Uses a broad mix of styles without one dominant pattern. |

---

## 9. Results interpretation

### 9.1 Structure of the individual report

Each report should include:

1. **Use boundary:** developmental use only.
2. **Profile summary:** overall pattern and archetype.
3. **Nine domain scores:** score, band, high/low anchors.
4. **Strengths:** top two or three domains.
5. **Development edges:** lowest two domains, framed positively.
6. **Pressure risks:** overuse flags.
7. **Team contribution:** how the person may add value in a team.
8. **Leadership implications:** how the style may show up in leadership.
9. **AI/digital work implication:** how they use or avoid augmentation.
10. **30-day experiment:** one suggested behavioural experiment.
11. **Reflection prompts:** 3-5 questions for coaching or journaling.
12. **Methodology note:** how scores were calculated and what they do not mean.

### 9.2 Interpretation rules

The report must include these principles:

- A high score means “more characteristic,” not “better.”
- A low score means “less characteristic,” not “worse.”
- Context matters: some roles reward speed, others reward precision; some reward visibility, others reward depth.
- Self-report is one view. It should be compared with feedback, outcomes, and observed behaviour.
- The assessment should not be used as a label.
- Archetypes are narrative summaries, not fixed types.
- AI-generated synthesis is optional and should be labelled as machine-generated.

---

## 10. Open-data and privacy design

### 10.1 Why open data is valuable

The public dataset creates a research flywheel:

- respondents receive value immediately;
- aggregate data becomes more interesting over time;
- researchers and analysts can inspect patterns;
- the methodology can improve transparently;
- future validation can be grounded in actual response data.

### 10.2 What should be public in v0

The public dataset should include only respondents who actively consent to open-data inclusion.

Recommended public row fields:

- anonymous row ID;
- assessment version;
- created month, not exact timestamp;
- age band, optional;
- region bucket, optional;
- sector bucket, optional;
- role level, optional;
- organisation size band, optional;
- work mode, optional;
- nine scale scores;
- composite scores;
- archetype;
- pressure-risk count;
- public data eligibility flag.

### 10.3 What should not be public in v0

Do not publish:

- name;
- email;
- company name;
- exact job title;
- exact location;
- precise timestamp;
- IP address;
- user agent;
- free-text responses;
- raw item-level responses combined with demographic/context fields.

Raw item-level data is valuable for psychometric validation, but it increases uniqueness and re-identification risk. V0 should either withhold item-level rows or publish item-level data only as aggregate item statistics.

### 10.4 Small-cell suppression

Public dashboards and filtered exports should suppress group-level views where `n < 10` as a minimum v0 rule. A stricter threshold such as `n < 20` is better for small datasets or sensitive segment combinations.

### 10.5 Consent architecture

The consent flow should have separate choices:

1. Consent to take the assessment and receive a result.
2. Optional consent to store anonymised scores for research.
3. Optional consent to include anonymised scores in the public dataset.
4. A clear statement that the product does not collect names, emails, or company names in v0.

No boxes should be pre-ticked.

---

## 11. Validation roadmap

### Stage 0: Expert review

Goal: content validity and item quality.

Actions:

- occupational psychologist review;
- HR/OD practitioner review;
- DEI / bias review;
- plain-English readability review;
- accessibility review;
- review for item overlap and ambiguity.

Success criteria:

- all items map cleanly to intended constructs;
- no item references protected characteristics;
- no item is unnecessarily invasive;
- item wording is comprehensible and work-relevant.

### Stage 1: Cognitive interviewing

Goal: understand how respondents interpret items.

Sample:

- 15-30 respondents across sectors and seniority levels.

Actions:

- ask respondents to think aloud while answering;
- identify misunderstood items;
- revise items before larger pilot.

### Stage 2: Pilot reliability study

Goal: initial psychometric performance.

Sample:

- n = 150-300.

Analyses:

- item distributions;
- missingness;
- item-total correlations;
- Cronbach’s alpha and McDonald’s omega;
- reverse-item behaviour;
- scale intercorrelations;
- exploratory factor analysis.

Actions:

- remove or rewrite weak items;
- check whether AI-Augmented Judgement behaves as a separate work-practice domain.

### Stage 3: Factor and invariance study

Goal: verify the model structure.

Sample:

- n = 500-1,000+.

Analyses:

- confirmatory factor analysis;
- measurement invariance by broad demographic/context groups where sample sizes permit;
- differential item functioning checks;
- subgroup mean differences;
- reliability by subgroup.

### Stage 4: Convergent and discriminant evidence

Goal: show that scales relate to known constructs appropriately.

Examples:

- Delivery Discipline should relate to conscientiousness.
- Emotional Regulation should relate to emotional stability/resilience.
- Collaboration & Trust should relate to agreeableness/cooperation.
- Integrity & Humility should relate to Honesty-Humility or integrity measures.
- AI-Augmented Judgement should relate more to digital behaviour and AI use than to broad personality alone.

### Stage 5: Criterion evidence

Goal: test whether scores relate to work-relevant outcomes.

Potential criteria:

- 360 feedback;
- manager-rated behaviours;
- team climate measures;
- self-reported role fit;
- learning adoption;
- project delivery indicators;
- engagement;
- retention intention;
- leadership development outcomes.

This stage requires careful governance, role analysis, and data protection review.

### Stage 6: Technical manual

Publish:

- construct definitions;
- item development process;
- sample composition;
- reliability evidence;
- validity evidence;
- limitations;
- norms, if available;
- scoring details;
- fairness and accessibility evidence;
- intended and prohibited uses.

---

## 12. AI analysis principles

The LLM feature should analyse public aggregate data, not make high-stakes inferences about individuals.

Safe v0 AI uses:

- summarise aggregate patterns;
- compare sufficiently large segments;
- generate hypotheses for future research;
- critique the methodology;
- explain the data dictionary;
- suggest visualisations.

Unsafe v0 AI uses:

- “predict this person’s job performance”;
- “rank candidates”;
- “diagnose leadership derailment”;
- “infer protected traits”;
- “analyse free text for personality without consent”;
- “make employment recommendations.”

The LLM should be constrained by prompt templates, dataset summaries, and clear caveats.

---

## 13. Key risks and mitigations

| Risk | Why it matters | Mitigation |
|---|---|---|
| Overclaiming validity | Could mislead users and damage credibility | Strong disclaimers, science page, validation roadmap |
| Re-identification | “Anonymous” datasets can still identify people if too granular | No PII, coarse fields, no exact timestamps, k-thresholds, small-cell suppression |
| Misuse for selection | Users may try to apply results in hiring | Prohibited-use language on every page/report |
| Self-report bias | People may present themselves favourably | Developmental positioning, no high-stakes use, future forced-choice research |
| Cultural bias | Items may mean different things across cultures | Cognitive interviews, invariance testing, translation/adaptation process |
| AI hallucination | LLM summaries may overinterpret data | BYOK, bounded prompts, cite dataset fields, label AI output |
| Dataset small early on | Aggregates unstable at low n | Hide subgroup analysis until thresholds met |
| Unique AI domain | AI behaviour changes quickly | Version the domain and treat as dynamic work practice |

---

## 14. Recommended references and source base

The following sources informed the model, product boundaries, and implementation constraints.

### Professional assessment and peer products

1. Hogan Assessments. *Hogan Personality Inventory*. https://www.hoganassessments.com/assessment/hogan-personality-inventory/
2. Hogan Assessments. *Hogan Development Survey*. https://www.hoganassessments.com/assessment/hogan-development-survey/
3. Hogan Assessments. *Motives, Values, Preferences Inventory*. https://www.hoganassessments.com/assessment/motives-values-preferences-inventory/
4. SHL. *Occupational Personality Questionnaire OPQ*. https://www.shl.com/products/assessments/personality-assessment/shl-occupational-personality-questionnaire-opq/
5. Saville Assessment. *Wave Solutions*. https://www.savilleassessment.com/wave/
6. Saville Assessment. *Wave Professional & Focus Styles*. https://www.savilleassessment.com/wave-professional-and-focus-styles/
7. Korn Ferry. *Leadership & Professional Assessments*. https://www.kornferry.com/capabilities/assessment-succession/professional-leadership-assessment
8. Korn Ferry. *Technical Manuals*. https://www.kornferry.com/technical-manuals
9. Birkman. *The Birkman Method*. https://birkman.com/the-birkman-method
10. Predictive Index. *Introduction to the PI Behavioral Assessment*. https://www.predictiveindex.com/learn/support/introduction-to-the-pi-behavioral-assessment/
11. Talogy. *16pf personality assessment*. https://talogy.com/en-gb/talent-management-solutions/assessments/16pf-personality-assessment/
12. Caliper. *Caliper Profile*. https://calipercorp.com/caliper-profile/

### Personality science and psychometrics

13. Barrick, M. R., & Mount, M. K. (1991). *The Big Five personality dimensions and job performance: A meta-analysis*. Personnel Psychology.
14. Salgado, J. F. (1997). *The Five Factor Model of personality and job performance in the European Community*. Journal of Applied Psychology.
15. Ashton, M. C., & Lee, K. (2007). *Empirical, theoretical, and practical advantages of the HEXACO model of personality structure*. Personality and Social Psychology Review.
16. HEXACO-PI-R official site. https://hexaco.org/
17. International Personality Item Pool. https://ipip.ori.org/
18. American Educational Research Association, American Psychological Association, & National Council on Measurement in Education. *Standards for Educational and Psychological Testing*.
19. Society for Industrial and Organizational Psychology. *Principles for the Validation and Use of Personnel Selection Procedures*.
20. SIOP. *Considerations and Recommendations for the Validation and Use of AI-Based Assessments for Employee Selection*.

### Privacy, open data, and implementation

21. UK Information Commissioner’s Office. *What is personal data?* https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/personal-information-what-is-it/what-is-personal-data/what-is-personal-data/
22. UK Information Commissioner’s Office. *Anonymisation*. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/
23. UK Information Commissioner’s Office. *What is valid consent?* https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/consent/what-is-valid-consent/
24. Next.js. *App Router*. https://nextjs.org/docs/app
25. Vercel. *Functions*. https://vercel.com/docs/functions
26. MongoDB. *MongoDB and Next.js integration*. https://www.mongodb.com/docs/drivers/node-frameworks/next-integration/
27. MongoDB. *Data modeling*. https://www.mongodb.com/docs/manual/data-modeling/
28. Zod. *Documentation*. https://zod.dev/
29. Tailwind CSS. *Install Tailwind CSS with Next.js*. https://tailwindcss.com/docs/installation/framework-guides/nextjs
30. OpenAI. *Developer quickstart*. https://developers.openai.com/api/docs/quickstart
31. Anthropic. *TypeScript SDK*. https://platform.claude.com/docs/en/api/sdks/typescript
32. OWASP. *REST Security Cheat Sheet*. https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html

---

## 15. Bottom line

The strongest version of WorkStyle Compass is not “Hogan but cheaper.” It is an openly explained, development-first, AI-era work-style assessment that combines:

- credible occupational psychology;
- clear behavioural language;
- transparent scoring;
- contextual interpretation;
- overuse-risk awareness;
- anonymised aggregate research;
- public methodology;
- responsible AI analysis.

The product should be beautiful and engaging, but its scientific claim should remain disciplined:

> “Research-informed, transparent, developmental, and progressively validated through open data.”
