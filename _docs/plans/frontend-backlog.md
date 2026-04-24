---
name: Frontend Backlog
description: Ranked, actionable frontend tickets derived from the 2026-04-24 audit. High-impact, low-effort first.
created: 2026-04-24
---

# Frontend Backlog

Companion to [frontend-audit.md](./frontend-audit.md). Ordered by impact × effort. Each ticket is small enough to implement and review independently.

Legend:

```text
[ ] Not started
[~] In progress
[x] Done
```

Effort guide: **XS** <10 min · **S** 10-30 min · **M** 30-90 min · **L** 90 min-half a day.

**2026-04-24 12:50 BST status:** FE-01 through FE-15, FE-17, and FE-23 have been implemented. FE-16 remains a deliberate future refactor because the current BYOK form works, is provider-aware, and would need a broader Server Action rewrite. FE-18 through FE-22 remain parked until analytics, real dataset scale, or a concrete modal/charting need justifies them.

---

## Tier 1 — Ship This Week (≈2h combined)

### [x] FE-01 · Add `display: "swap"` to all fonts — **XS**
- **Files:** [src/app/layout.tsx:16–31](../../src/app/layout.tsx)
- **Change:** add `display: "swap"` to each `next/font/google` call (`plex`, `editorial`, `mono`).
- **Why:** Eliminates invisible-text-during-font-load. Reduces CLS. Immediate Lighthouse win. Also improves LinkedIn preview crawler timing.
- **Acceptance:** `pnpm build` clean; visually compare first paint with throttled 3G in DevTools.

### [x] FE-02 · `role="alert"` on inline form errors — **XS**
- **Files:** [src/features/assessment/components/assessment-form.tsx:514](../../src/features/assessment/components/assessment-form.tsx), [src/features/assessment/components/ai-analysis-form.tsx](../../src/features/assessment/components/ai-analysis-form.tsx)
- **Change:** add `role="alert"` (or `aria-live="assertive"`) to the error container element.
- **Why:** Screen-reader users currently miss validation failures silently.
- **Acceptance:** With VoiceOver/NVDA running, trigger a validation error and confirm the message is announced.

### [x] FE-03 · Skip-to-main-content link — **S**
- **Files:** [src/app/layout.tsx](../../src/app/layout.tsx) (wrap `{children}` in `<main id="main">`), [src/components/site-header.tsx](../../src/components/site-header.tsx), [src/app/styles/base.css](../../src/app/styles/base.css) (add `.skip-link` visually-hidden-until-focus utility).
- **Change:** render an `<a class="skip-link" href="#main">Skip to main content</a>` as the first focusable element in `<body>`; style it to be off-screen until focused.
- **Why:** Six nav items stand between keyboard/SR users and main content. WCAG 2.4.1 Level A.
- **Acceptance:** Tab from top of page — first focusable element is the skip link; activating it moves focus into `<main>`.

### [x] FE-04 · Active-state on header nav — **S**
- **Files:** [src/components/site-header.tsx](../../src/components/site-header.tsx), [src/app/styles/layout.css:78–106](../../src/app/styles/layout.css)
- **Change:** extract the `nav-link` rendering into a small client component using `usePathname()`; add `aria-current="page"` and `data-active` when `pathname === item.href` (or `pathname.startsWith(item.href)` for nested routes).
- **Why:** Users can't tell where they are. Cheap orientation win.
- **Acceptance:** Navigate to each section; current item visually distinct and `aria-current="page"` present in DOM.

### [x] FE-05 · Soften MongoDB-down copy on `/dataset` — **XS**
- **Files:** [src/app/dataset/page.tsx:43–56, 123–127](../../src/app/dataset/page.tsx)
- **Change:** replace the technical copy ("MongoDB Atlas", "Vercel traffic") with something like: *"The public dataset is still warming up. Your private report works already — the open dataset opens when enough opted-in participants have contributed."*
- **Why:** Current copy contradicts the calm, approachable brand tone.
- **Acceptance:** Visual check; no mentions of "MongoDB" or "Vercel" in user-facing strings.

### [x] FE-06 · Radar chart `<title>` + hidden data table — **S**
- **Files:** [src/components/radar-chart.tsx](../../src/components/radar-chart.tsx)
- **Change:** add an SVG `<title>` inside each data point's group with the scale name + numeric score; render a `<table class="sr-only">` alongside the SVG listing each scale and score.
- **Why:** The radar is the hero visual. Screen readers currently get only "Nine-scale radar chart".
- **Acceptance:** Inspect the DOM for `<title>` per point; with a screen reader, navigate the hidden table and hear each scale + score.

### [x] FE-07 · Motion tokens + button/nav-link transitions — **S**
- **Files:** [src/app/styles/base.css:36–91](../../src/app/styles/base.css) (add tokens), [src/app/styles/layout.css](../../src/app/styles/layout.css) (apply to `.nav-link`, `.button`, `.button-secondary`, `.button-ghost`).
- **Current state:** button and nav-link transitions exist, but they use hard-coded `160ms ease` values.
- **Change:**
  - Add tokens: `--ao-duration-fast: 150ms; --ao-duration-slow: 260ms; --ao-ease: cubic-bezier(0.22, 0.61, 0.36, 1);`
  - Apply `transition: background-color var(--ao-duration-fast) var(--ao-ease), border-color var(--ao-duration-fast) var(--ao-ease), color var(--ao-duration-fast) var(--ao-ease), transform var(--ao-duration-fast) var(--ao-ease);` to buttons and nav links.
  - Add `:active { transform: translateY(1px); }` on primary buttons.
  - Respect `prefers-reduced-motion` — existing rule at [base.css:145–154](../../src/app/styles/base.css) already covers it, verify.
- **Why:** Brand doc promises functional motion as part of the system. Tokenising the existing interaction timing keeps future components consistent.
- **Acceptance:** Hover a primary button — background transitions smoothly. With reduced-motion enabled in OS, transitions collapse to instant.

### [x] FE-08 · `src/app/error.tsx` and `src/app/loading.tsx` — **M**
- **Files:** create `src/app/error.tsx` (client component) and `src/app/loading.tsx` (server component).
- **Change:**
  - `error.tsx`: show calm error card with the brand tone, a "Try again" button calling `reset()`, and a link to home.
  - `loading.tsx`: minimal branded skeleton — brand mark + pulsing strip matching the page rhythm.
- **Why:** Today a server failure surfaces a raw Next.js error UI. Loading states are invisible.
- **Acceptance:** Throw in a Server Component to verify `error.tsx` renders; test `loading.tsx` by adding a `await new Promise(r => setTimeout(r, 1500))` on a page temporarily.

---

## Tier 2 — Worth Doing Next (≈3h)

### [x] FE-09 · Install `@tailwindcss/typography` and apply `prose` to long-form pages — **M**
- **Files:** `package.json` (devDep), [src/app/globals.css](../../src/app/globals.css) (add `@plugin "@tailwindcss/typography";`), then apply `prose` classes to [science/page.tsx](../../src/app/science/page.tsx), [privacy/page.tsx](../../src/app/privacy/page.tsx), [limitations/page.tsx](../../src/app/limitations/page.tsx), [how-i-built-this/page.tsx](../../src/app/how-i-built-this/page.tsx).
- **Why:** Editorial pages will drift typographically without a shared prose rhythm. Plugin is v4-compatible.
- **Acceptance:** Diff screenshots of long-form pages before/after; verify line-length and spacing consistency.
- **Watch:** Override `prose` headings to use Source Serif 4 (set `--tw-prose-headings` vars or pass `prose-headings:font-serif` utility).

### [x] FE-10 · Install `@axe-core/react` (dev-only) — **XS**
- **Files:** `package.json` (devDep); add a client-side mount-once block in a dev-only component that runs `axe(React, ReactDOM, 1000)` when `NODE_ENV !== 'production'`.
- **Why:** Catches the next batch of a11y regressions in the dev console as they appear.
- **Acceptance:** Run `pnpm dev`, open any page, see axe results in console.

### [x] FE-11 · Mobile Likert touch targets — **M**
- **Files:** [src/features/assessment/components/assessment-flow.module.css:425–440](../../src/features/assessment/components/assessment-flow.module.css), [src/app/styles/responsive.css:425–427](../../src/app/styles/responsive.css).
- **Change:** bump mobile Likert button min-height to 3.25rem (≈52px) and/or switch to a 2-column grid on the smallest viewports so each target is ≥48×48.
- **Why:** Current mobile UX is fiddly; thumbs mis-hit adjacent options.
- **Acceptance:** Visually test on a phone or emulator at 360×740 and 414×896; each button is ≥48×48.

### [x] FE-12 · Keyboard hint on Likert — **S**
- **Files:** [src/features/assessment/components/assessment-step-panels.tsx](../../src/features/assessment/components/assessment-step-panels.tsx) (question panel), possibly [assessment-flow.module.css](../../src/features/assessment/components/assessment-flow.module.css).
- **Change:** add a small, muted hint on the question step header: *"Tip: use 1–5 on your keyboard"*. Visually demoted. Hide on touch devices via `(hover: none)` media query.
- **Why:** The 1–5 keyboard handler exists but is undiscoverable. Free power-user win.
- **Acceptance:** Hint visible on desktop; hidden on touch; pressing 1–5 advances correctly.

### [x] FE-13 · Archetype distribution as mini-bar-chart on `/dataset` — **S**
- **Files:** [src/app/dataset/page.tsx:144–155](../../src/app/dataset/page.tsx)
- **Change:** replace `<p>` list with a small horizontal stacked-bar or per-archetype score-bar row using the existing `ScoreBar`/inline divs.
- **Why:** Visual density pays off on a page titled "Open Dataset". Zero new deps — reuses existing primitive.
- **Acceptance:** Dataset page renders a readable archetype breakdown; remains legible when suppressed ("not enough data yet" state).

---

## Tier 3 — Portfolio Level-Up (≈3–4h)

### [x] FE-14 · Install `next-themes` + dark mode — **L**
- **Files:** `package.json`, [src/app/layout.tsx](../../src/app/layout.tsx) (wrap in `<ThemeProvider>`), [src/app/styles/base.css](../../src/app/styles/base.css) (add `[data-theme="dark"]` overrides for every `--ao-*` color token), a small `ThemeToggle` component rendered in the header.
- **Why:** 2026 portfolio expectation. Tokens are already semantic — this is a palette pass, not a redesign.
- **Acceptance:**
  - No SSR flash on initial load.
  - All pages pass contrast in both modes (re-run contrast check from brand guidelines).
  - Radar chart readable in dark mode.
  - OG images stay light-mode for LinkedIn previews (don't let dark mode leak into `ImageResponse`).
- **Watch:** the three `--ao-chart-*` colours will need dark-mode adjustments. The brand-guidelines.md contrast table only covers light mode; extend it.

### [x] FE-15 · Mobile nav as dialog/sheet — **M**
- **Files:** [src/components/site-header.tsx](../../src/components/site-header.tsx), [src/app/styles/layout.css](../../src/app/styles/layout.css)
- **Change:** below 42rem, collapse nav into a hamburger button that opens a `<dialog>` or sheet with the six nav items; preserve horizontal-scroll pattern above 42rem.
- **Why:** Horizontal scroll with hidden scrollbar is discoverable-adjacent at best. A dialog is clearer.
- **Acceptance:** Keyboard-trap inside dialog when open; `Esc` closes; focus returns to trigger.
- **Watch:** Could be a good first use of `@base-ui-components/react`'s `Dialog` primitive. Revisit after FE-14 if the need is confirmed.

### [ ] FE-16 · `useActionState` for BYOK form — **M**
- **Files:** [src/features/assessment/components/ai-analysis-form.tsx](../../src/features/assessment/components/ai-analysis-form.tsx), [src/app/api/ai/analyze/route.ts](../../src/app/api/ai/analyze/route.ts) (if shifting to a Server Action instead of fetch).
- **Change:** convert BYOK submission to Server Action + `useActionState` for pending/error/success states.
- **Why:** React 19-native pattern, less client state, share zod schema across client and server.
- **Acceptance:** Pending state disables inputs via `useFormStatus`; errors rendered via action state, no local `useState` for request lifecycle.

### [x] FE-17 · Radar chart reveal animation — **S**
- **Files:** [src/components/radar-chart.tsx](../../src/components/radar-chart.tsx), [src/app/styles/reporting.css](../../src/app/styles/reporting.css)
- **Change:** animate the polygon's `stroke-dasharray` + `fill-opacity` from 0 to target on mount (CSS only). Respect `prefers-reduced-motion`.
- **Why:** First-visit moment on the results page — single most-shared view. Reward it.
- **Acceptance:** Reload the results page — polygon draws in over ≈400ms. With reduced-motion, appears instantly.

---

## Tier 4 — Parked (open tickets; do later)

### [ ] FE-18 · Plausible analytics with a Privacy-page update — **M**
- Only if the privacy page is simultaneously updated to disclose it and its configuration makes no cookies / no PII guarantees explicit.
- Otherwise, skip entirely.

### [ ] FE-19 · `@vercel/speed-insights` for Core Web Vitals only — **XS**
- Privacy-neutral; fine to add standalone without touching Plausible.
- Feeds the "open + measurable" thesis on the build-story page.

### [ ] FE-20 · Dataset filters (role level, sector, region) — **L**
- Proper URL-param-driven filters with suppression recomputation.
- Defer until public dataset crosses ~200 rows; currently unjustified.

### [ ] FE-21 · Adopt `@base-ui-components/react` for a real modal / tooltip need — **L**
- Only when a concrete need appears (BYOK key help modal, radar-point tooltips, or the mobile nav dialog in FE-15).
- Do not adopt pre-emptively.

### [ ] FE-22 · Add `motion` (formerly framer-motion) for a specific animated reveal — **M**
- Only when FE-17's CSS approach isn't enough. Use `LazyMotion` + `m` component to keep bundle ≈4.6kb.

### [x] FE-23 · Custom `not-found.tsx` — **S**
- Branded 404 with a short navigation. Low priority; default Next.js is acceptable today.

---

## Suggested Next UI QA

The original focused half-day list has now been implemented except for deliberately deferred items. The next useful review is not another speculative package pass; it is a page-by-page browser check across light/dark themes, desktop/mobile widths, keyboard navigation, the assessment flow, result sharing, dataset suppression, and BYOK error states.

---

## Tracking

Update this file as tickets move. Keep tickets small enough that a single commit closes them. Any ticket that grows past its effort estimate — stop, split it, and file the new ones here.
