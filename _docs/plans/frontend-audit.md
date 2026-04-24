---
name: Frontend Audit and Recommendations
description: UI/UX and code-quality audit of AssessmentOptima's user-facing frontend, plus high-impact / low-effort recommendations.
created: 2026-04-24
---

# Frontend Audit And Recommendations

**Date:** 2026-04-24
**Scope:** All user-facing frontend code (`src/app/**`, `src/components/**`, `src/features/assessment/components/**`, `src/app/styles/**`, OG image routes, layout, and metadata).
**Method:** Parallel agent audit of every page and component + web research on current Next.js 16 / React 19 / Tailwind v4 best practices.
**Stack audited:** Next.js 16 (App Router), React 19.2, Tailwind v4, TypeScript strict, pnpm, Vitest 4. Installed deps: `lucide-react`, `zod`, `mongodb`.
**Implementation status:** quick-pass fixes applied 2026-04-24 12:04 BST, then package-level polish applied 2026-04-24 12:50 BST. Implemented: font swap, alert semantics, skip-link styling, active nav state, softened dataset copy, radar accessibility fallback, motion tokens, global loading/error fallbacks, mobile Likert sizing, keyboard hint, dataset archetype bars, Tailwind typography support, dev-only axe checks, next-themes dark mode, mobile navigation dialog, radar reveal animation, and branded 404. Deferred items remain tracked in [frontend-backlog.md](./frontend-backlog.md).

## Headline

The foundation is **strong**: semantic design tokens, disciplined typography scale, clean server/client component split, well-gated assessment flow, real autosave, OG cards that actually look good, warm and consistent copy tone, and no dead code. You are well past "scaffold" — this is a real product.

At audit time, the gap between where it was and "epic" was **polish and presence**, not architecture:

1. No dark mode (brand tokens are semantic — cheap to add).
2. No active-state on nav (users can't see where they are).
3. Fonts load without `display: "swap"` (avoidable CLS on LinkedIn previews).
4. Errors are announced visually but not to screen readers (`role="alert"` missing).
5. No skip link.
6. Mobile Likert touch targets sit below WCAG AAA (48×48).
7. Motion is present on key controls, but it is not yet tokenised as a reusable motion system.
8. No developer-mode a11y checking (`axe-core` dev-only).
9. `@tailwindcss/typography` absent — long-form pages (science, how-i-built-this, privacy, limitations) are hand-styled, which will drift.
10. No loading/error boundary files — MongoDB hiccups currently surface technical copy inline.

Most of these were quick-pass fixes. Package-level enhancements remain in the frontend backlog so they can be handled with deliberate visual QA.

---

## Strengths To Preserve

- **Token system** at [base.css:36–91](../../src/app/styles/base.css) — 55+ semantic tokens, no magic numbers found in audit scope.
- **Client-boundary discipline** — no page-level `"use client"`; the first client boundary is at [assessment-form.tsx:1](../../src/features/assessment/components/assessment-form.tsx).
- **Likert a11y** at [likert-buttons.tsx](../../src/features/assessment/components/likert-buttons.tsx) — proper `radiogroup`, `aria-checked`, `aria-label` per option.
- **Assessment flow gating** with real localStorage autosave, validation before next, "skip for now" on optional context.
- **OG routes** at [api/og/[token]/route.tsx](../../src/app/api/og/[token]/route.tsx) and [api/og/archetype/[slug]/route.tsx](../../src/app/api/og/archetype/[slug]/route.tsx) — genuinely good-looking cards with correct data gating (no private tokens in share-safe archetype card).
- **Suppression UX** on the dataset page — transparent, non-punitive copy when sample size hasn't cleared thresholds.
- **Copy tone** — approachable, evidence-led, no legalese drift across any page in scope. This is rare and worth guarding.

---

## Findings By Dimension

### 1. Design System Coherence
- Tokens, radii, shadows, spacing: consistent across all pages. No drift.
- **Gap:** no dark mode (`color-scheme: light` only). Tokens are semantic, so one additional `@media (prefers-color-scheme: dark)` block or a `next-themes` toggle would unlock it.
- **Gap:** no motion tokens (`--ao-duration-fast`, `--ao-ease`). Buttons and nav links have transitions, but their timing values are still hard-coded in CSS instead of coming from the design system.

### 2. Accessibility
- Focus ring (`outline: 2px solid` + 5px soft halo at [base.css:139–143](../../src/app/styles/base.css)) is genuinely good — rare to get right.
- Landmarks, heading hierarchy, `aria-live` on save status: present.
- **Gap:** [site-header.tsx](../../src/components/site-header.tsx) has no skip link. Six nav items stand between screen-reader users and `<main>`.
- **Gap:** Inline form errors render as plain `<div class="form-error">` — need `role="alert"` or `aria-live="assertive"` so screen readers announce validation failures.
- **Gap:** no `aria-current="page"` on active nav link.
- **Gap:** Mobile Likert at [assessment-flow.module.css:425–440](../../src/features/assessment/components/assessment-flow.module.css) shrinks to ~48px height × half width — under WCAG AAA 48×48 minimum. Fiddly on phones.
- **Gap:** Keyboard 1–5 handler lives in the parent form (assessment-form.tsx:445–462) but is undiscoverable — no on-screen hint.

### 3. Copy Tone
No issues found. Every page audited holds the "developmental, approachable, evidence-led" line. This is a moat; document the tone in a short style note so future edits don't erode it.

### 4. Assessment Flow UX
- Gated: yes. Autosave: real. Validation: present. Back/skip: works.
- Submit button has inline loading state but no `useActionState` / `useFormStatus` pattern — fine today, worth knowing for the BYOK form below.
- Mobile: sticky action bar with backdrop-blur works well. Only real gap is touch-target size noted above.

### 5. Results Page
- Radar chart at [radar-chart.tsx](../../src/components/radar-chart.tsx) is a lean SVG (~3kb), accessible via `role="img"` + `aria-label`. Missing per-point `<title>` tooltips and a hidden `<table>` fallback for screen readers to actually read the nine values.
- Archetype hero + score bars + pressure callout: well-composed.
- Print styles exist at [responsive.css:76–116](../../src/app/styles/responsive.css).
- Social share actions at [result-actions.tsx](../../src/features/assessment/components/result-actions.tsx): clipboard, LinkedIn, calendar, delete — all present.

### 6. Dataset Page
- Uses the same score-bar primitive, not a charting library. Good call for editorial feel + zero bundle cost.
- Small-cell suppression, export locks, reliability (Cronbach α) blocks all gated with clear user-facing copy.
- **Gap:** no filters on the public dataset dashboard. Spec defers this; fine for launch. Could be a later research-dashboard win.
- **Gap:** archetype distribution is rendered as a `<p>` list rather than visualised — a thin bar-of-badges would sell the "data observatory" look.
- **Gap:** MongoDB-down state surfaces technical language ("MongoDB Atlas", "Vercel traffic") — rephrase.

### 7. Performance
- Server components everywhere except `AssessmentForm`, `AiAnalysisForm`, `ResultActions`, `LikertButtons`. Surgical boundaries.
- No `<Image>` components in scope — all visuals are inline SVG or generated OG. No perf risk from images.
- **Gap:** No `display: "swap"` on any of the three fonts at [layout.tsx:16–31](../../src/app/layout.tsx) — easy Lighthouse + CLS win.
- `lucide-react` tree-shakes fine with Next 16's `optimizePackageImports` allowlist. No action needed.

### 8. Navigation
- Header IA is good: Assessment first (primary CTA), then Science / Dataset / AI (research cluster), then About / Build story (meta).
- **Gap:** no active-state highlight. Requires a tiny client sub-component using `usePathname()`.
- **Gap:** on mobile, nav items horizontally scroll with hidden scrollbar. Works, but a disclosure button (e.g. Base UI or Radix Dialog) would be clearer on narrow viewports. Low priority.

### 9. Metadata / SEO
- `metadataBase`, `title.template`, default OG, Twitter card all set correctly in root layout.
- Per-page `metadata` exports present on every page in scope.
- Archetype pages set dynamic `openGraph.images` — this is the viral path and it's already wired.
- No `robots` directives. Fine for public site. Add `noindex` if/when you build admin routes.

### 10. Error / Loading / Empty States
- `notFound()` used correctly for invalid tokens and archetype slugs.
- **Gap:** no `error.tsx`, no `loading.tsx`, no custom `not-found.tsx`. All fall back to Next.js defaults.
- For v0 this is acceptable; a single `src/app/error.tsx` + one `src/app/loading.tsx` would lift the whole app.

### 11. Dead Code
None found. Clean codebase.

---

## Package Recommendations (Opinionated, Constrained)

User constraint: **high-impact, low-effort. No architectural migrations.** The research agent surfaced ~8 candidate additions; I'm recommending only the three that meet that bar now. Everything else is deferred with rationale.

### Install now (additive, ~5kb gzip total in production)
| Package | Purpose | Why now |
|---|---|---|
| `next-themes` (~1kb) | Dark mode toggle + SSR flash-free `prefers-color-scheme` handling | Tokens are already semantic. Portfolio-piece expectation in 2026. ~2h end-to-end including palette tuning. |
| `@tailwindcss/typography` (dev) | `prose` utility for long-form content | Build-story, science, privacy, limitations pages will drift without it. Works on Tailwind v4 via `@plugin "@tailwindcss/typography"` in CSS. |
| `axe-core` (dev only) | Dev-time console warnings for a11y violations | Zero production bundle. Catches the next 10 a11y regressions before they ship. |

### Defer (valid, but not worth the effort right now)
| Package | Reason to defer |
|---|---|
| `motion` (formerly `framer-motion`) | CSS transitions + one View Transitions hint on the stepper is enough for v0. Add only when you want a specific animated reveal (e.g. radar chart draw-in). |
| `@base-ui-components/react` | Your Likert, stepper, and forms are already well-built with native HTML. Adopt when you add a modal (e.g. BYOK key help) or a real tooltip layer for radar points. |
| `@visx/*` | Current SVG charts are fine. Adopt when the dataset page gets interactive filters or a correlation matrix heatmap. |
| `react-hook-form` | `useActionState` + zod covers the assessment and BYOK forms in Next 16. Adding RHF now reintroduces client state that fights server actions. |
| Analytics (Plausible / Vercel) | Privacy page currently makes a clean claim; add only with a Privacy-page update and clear consent UX. `@vercel/speed-insights` is safe to add for Web Vitals only if desired. |

### Avoid (EOL / maintenance-mode as of early 2026)
- `framer-motion` the package name — use `motion` if/when you add motion.
- `@vercel/og` the package — use `next/og` (you already do).
- `react-share` — write 5 lines of JSX instead.
- `classnames` — use template literals or `clsx` (1-dep).
- TanStack Table v9 — still alpha; stick with plain `<table>` or v8 if needed.

---

## Top-10 Fixes (Ranked By Impact × Effort)

These are the ones I'd ship first. Detailed tickets are in [frontend-backlog.md](./frontend-backlog.md).

1. **Add `display: "swap"` to all three fonts** — one-line change per font. CLS + LCP win. 5 min.
2. **Add `role="alert"` to form errors** — screen readers silently miss validation today. 5 min.
3. **Add a skip link** — WCAG Level A compliance. 10 min.
4. **Active-state on nav** — add tiny client component using `usePathname()` + `aria-current="page"`. 15 min.
5. **Add `<title>` tooltips to radar chart points + hidden data table** — real a11y for the hero chart. 20 min.
6. **Install `@tailwindcss/typography` and convert long-form pages to `prose`** — prevents typographic drift on editorial pages. 30 min.
7. **Add motion tokens and replace hard-coded transition timings** — `--ao-duration-fast: 150ms`, `--ao-ease`, then consume those tokens on buttons and nav links. 30 min.
8. **Create `src/app/error.tsx` and `src/app/loading.tsx`** — global fallbacks. 30 min.
9. **Soften MongoDB-down copy on `/dataset`** — replace "Vercel traffic / MongoDB Atlas" with user-facing language. 10 min.
10. **Install `next-themes` and add dark mode** — semantic tokens make this a palette pass, not a redesign. 2-3 h.

**Total for 1–9 = ~2h. Plus #10 at ~2–3h = half a day of focused work for a noticeable level-up.**

---

## What I'd Not Touch

- The copy tone. It's the strongest thing in the product. Write a one-page tone note to protect it.
- The design tokens. Refactoring them is churn; they are already semantic.
- The Likert component. It works. Larger touch targets on mobile is the only change worth making.
- Swapping `lucide-react`. It tree-shakes fine.
- Moving to a UI kit (shadcn / Base UI / Radix). You would spend days and the product is already mostly there. Pull one primitive later when a real need appears.

---

## Known Tensions

- **Analytics vs. privacy claim.** The privacy page currently implies no tracking. Adding Plausible is technically defensible but rhetorically needs a sentence on the Privacy page. Don't add analytics silently.
- **Dark mode vs. brand palette contrast table.** The audited contrast ratios in [brand-guidelines.md:120–132](../master-docs/brand-guidelines.md) are light-mode. Dark mode requires re-checking those pairings. Budget 30 min of the dark-mode spike for contrast verification.
- **Motion vs. "calm lab" brand.** Do not use motion libraries for decorative motion. Stick to functional: hover/press/focus transitions, stepper progress, radar draw-in on initial view. Nothing ambient.

---

## Sources

- [Motion (formerly framer-motion) upgrade guide](https://motion.dev/docs/react-upgrade-guide)
- [Next.js `generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js `ImageResponse`](https://nextjs.org/docs/app/api-reference/functions/image-response)
- [React docs: `useActionState`](https://react.dev/reference/react/useActionState)
- [Tailwind v4 typography plugin](https://github.com/tailwindlabs/tailwindcss-typography)
- [axe-core](https://github.com/dequelabs/axe-core-npm)
- [next-themes](https://github.com/pacocoursey/next-themes)
