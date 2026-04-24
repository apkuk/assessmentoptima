# Brand Guidelines

Status: Implementation-current master reference. These guidelines define the visual and interaction direction for AssessmentOptima.

## Brand Thesis

AssessmentOptima should feel like a modern behavioural science lab that happens to be public and interactive.

It should not feel like:

- a playful personality quiz
- a clinical diagnosis tool
- a generic HR SaaS dashboard
- a dark AI hype product
- a clone of any proprietary assessment brand

The desired read is:

```text
Evidence-led, calm, transparent, precise, and unusually well-built for a public demo.
```

## Design Principles

### 1. Serious But Not Clinical

The UI should earn trust through restraint, clarity, and specificity. Avoid medicalised visual language, faux certification badges, and overconfident claims.

### 2. Research-Literate

Use visual structure that supports methodology, interpretation, datasets, and caveats. The science page and results page should feel editorial and explainable, not sales-led.

### 3. Open Dataset Native

Design for charts, filters, segment comparisons, CSV/JSON downloads, and data dictionaries from the beginning. Dataset UI is not a secondary admin view; it is part of the public product.

### 4. AI-Transparent

The product must include a strong public "How I Built This" story. AI is part of the provenance, but the page must keep human accountability, privacy, and validation limits clear.

### 5. Accessible By Default

Use WCAG AA as the minimum standard for text, controls, focus states, and chart affordances. Do not rely on color alone to communicate meaning.

## Visual Positioning

The visual system should sit between:

- research journal
- data observatory
- premium assessment report
- AI-assisted build case study

It should avoid:

- one-color SaaS palettes
- purple/blue AI gradients
- beige editorial monotony
- decorative blobs/orbs
- rounded card walls
- oversized marketing hero patterns on functional pages

## Logo And Wordmark

Working wordmark:

```text
AssessmentOptima
```

Use the wordmark plainly until a real logo exists. Do not invent a symbol unless the PRD later asks for one.

Recommended lockup:

```text
AssessmentOptima
Open work-style research assessment
```

## Color System

The palette is semantic, not decorative. Use CSS variables from `src/app/styles/base.css` as the source of truth, imported through `src/app/globals.css`.

### Foundation

| Token | Value | Use |
| --- | --- | --- |
| `--ao-bg` | `#f7f9f8` | page background |
| `--ao-bg-soft` | `#edf5f2` | quiet bands |
| `--ao-surface` | `#ffffff` | forms, panels, modals |
| `--ao-surface-raised` | `#fbfdfc` | raised panels |
| `--ao-border` | `#d7e2de` | default borders |
| `--ao-border-strong` | `#a7b9b3` | controls and chart axes |

### Text

| Token | Value | Use |
| --- | --- | --- |
| `--ao-ink` | `#13201e` | primary text |
| `--ao-ink-soft` | `#2d3c38` | strong secondary text |
| `--ao-muted` | `#53635f` | secondary text |
| `--ao-subtle` | `#73827e` | labels and metadata |

### Brand And Meaning

| Token | Value | Use |
| --- | --- | --- |
| `--ao-brand` | `#00615f` | primary actions and brand emphasis |
| `--ao-brand-strong` | `#003f3e` | high-emphasis text and pressed states |
| `--ao-brand-soft` | `#d8eeeb` | low-emphasis brand backgrounds |
| `--ao-science` | `#2458b8` | methodology and evidence |
| `--ao-science-soft` | `#e1eaff` | methodology callouts |
| `--ao-accent` | `#d89b00` | attention, focus, progress, moments of warmth |
| `--ao-accent-strong` | `#6f5300` | readable text on accent-soft |
| `--ao-accent-soft` | `#fff1bd` | warnings, active filters, selection |
| `--ao-motive` | `#7a3f86` | motives/values content |
| `--ao-motive-soft` | `#f2e4f4` | motives/values backgrounds |
| `--ao-pressure` | `#b42318` | pressure-drift content |
| `--ao-pressure-soft` | `#fde7e3` | pressure-drift backgrounds |
| `--ao-success` | `#0a7c66` | completion and positive state |

## Accessibility Color Notes

Checked core combinations:

| Foreground | Background | Contrast |
| --- | --- | --- |
| `#13201e` | `#f7f9f8` | 15.85:1 |
| `#52615d` | `#f7f9f8` | 6.16:1 |
| `#00615f` | `#ffffff` | 7.30:1 |
| `#2458b8` | `#ffffff` | 6.64:1 |
| `#6f5300` | `#fff2c2` | 6.43:1 |

Keep normal text at or above 4.5:1 and non-text affordances at or above 3:1.

## Data Visualization

Dataset charts should use a curated categorical palette inspired by Carbon's data visualization guidance: accessible, harmonious, and sequence-aware.

Current chart tokens:

```text
--ao-chart-1: #6929c4
--ao-chart-2: #1192e8
--ao-chart-3: #005d5d
--ao-chart-4: #9f1853
--ao-chart-5: #fa4d56
--ao-chart-6: #198038
--ao-chart-7: #ee538b
--ao-chart-8: #b28600
```

Rules:

- Use labels, legends, patterns, or direct annotations; do not rely only on color.
- Use sequential palettes for ordered scale data.
- Use categorical palettes for archetypes, sectors, or role levels.
- Do not use multiple gradients for meaningful comparison.
- Preserve minimum group threshold messaging in charts.

## Typography

Use `next/font` so fonts are optimized through the Next.js build.

Primary sans:

```text
IBM Plex Sans
```

Use for UI, forms, navigation, body copy, labels, and dense data surfaces.

Editorial serif:

```text
Source Serif 4
```

Use for page titles, report headings, and carefully selected result narrative moments.

Mono:

```text
Geist Mono
```

Use for data dictionaries, JSON/CSV examples, API references, and build-story technical details.

Rules:

- Letter spacing stays `0`.
- Do not scale font size continuously with viewport width.
- Use explicit breakpoints for large responsive type.
- Preserve readable line lengths: body copy should generally stay near `65-75ch`.
- Do not use hero-scale typography inside small panels, dashboards, or controls.

## Layout

Use full-width bands and constrained inner content.

Default page rhythm:

```text
section padding: 64-96px desktop, 32-48px mobile
content width: 72rem for product pages
reading width: 70ch for editorial text
dashboard width: 80-88rem when data density requires it
```

Cards are allowed for repeated items, modals, form steps, and result modules. Do not put cards inside cards.

Border radius:

```text
small controls: 4-6px
cards/panels: 8px
large editorial panels: 12px only when justified
```

## Components

### Buttons

Primary actions use `--ao-brand` with white text.

Secondary actions are white/surface with `--ao-border-strong`.

Danger actions must use `--ao-pressure` and clear destructive copy.

Current implementation includes hover, active, disabled, size, transition, and icon-slot treatment. Keep shared button styling in `src/app/styles/layout.css` unless a component library is introduced.

### Forms

Assessment forms should feel focused and calm:

- one main decision per step
- clear progress
- large enough controls for mobile
- no cramped Likert controls
- no animated novelty
- validation copy placed near the field

### Results

Results should be structured like a premium debrief:

- scale summary
- radar chart
- current public sample comparison badges when thresholds are met
- social/share actions
- narrative interpretation
- strengths
- overuse risks
- leadership/team implications
- reflection prompts
- caveats and use boundaries

### Science/Methodology

Use editorial typography, references, diagrams, and short callouts. The page should explain what is known, what is inferred, and what is not yet validated.

### How I Built This

This page should feel like a flagship case study. Use:

- editorial hero
- timeline
- git-derived build receipts
- AI-human accountability examples
- links to deployed routes and docs
- architecture diagram
- AI/human accountability comparison
- privacy/validity callout
- links to GitHub, dataset, science page, and assessment

## Motion

Motion should be functional:

- progress transitions
- disclosure/accordion state
- subtle loading states
- chart reveal if it helps comprehension

Respect `prefers-reduced-motion`. Avoid constant ambient animation.

## CSS Implementation

Current implementation:

```text
src/app/globals.css
src/app/styles/base.css
src/app/styles/layout.css
src/app/styles/reporting.css
src/app/styles/responsive.css
postcss.config.mjs
src/app/layout.tsx
```

The global CSS includes:

- Tailwind v4 import
- Tailwind `@theme inline` bridge to brand CSS variables
- semantic `--ao-*` tokens
- global reset
- focus-visible treatment
- reduced-motion handling
- shared layout, reporting, responsive, and print surfaces split below the 600-line maintainability threshold

Future components may use either:

- Tailwind utility classes backed by theme variables
- local CSS modules for complex component styling
- global utility classes only when they are truly shared

## Reusable UI Primitives

Shared public-page patterns live in `src/components/ui/*`.

Use these primitives before recreating the same class combinations in pages:

- `PageShell`
- `PageHeader`
- `Section`
- `ContentGrid`
- `Surface`
- `MetricCard`
- `ActionRow`
- `ButtonLink`

If a new page repeats a layout, card, CTA, or metric pattern twice, add or extend a primitive rather than keeping the pattern inline.

## Sources

- [WCAG 2.2](https://www.w3.org/TR/wcag/)
- [W3C understanding contrast minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
- [IBM Design Language: Color](https://www.ibm.com/design/language/color/)
- [Carbon Design System: Data visualization color palettes](https://carbondesignsystem.com/data-visualization/color-palettes/)
- [Next.js font optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Tailwind CSS theme variables](https://tailwindcss.com/docs/theme)
