---
name: web-artifacts-builder
description: Use when building a self-contained web artifact — a single-file or small-bundle HTML/CSS/JS (or React) page meant to run standalone as a shareable artifact, demo, prototype, microsite or interactive explainer. Covers structure, dependency/CDN discipline, theming, responsiveness and packaging so the artifact renders correctly in isolation. For a full project-integrated UI use frontend-design; for data charts load the dataviz skill.
---

# Web Artifacts Builder

You build standalone web artifacts that must run correctly on their own — no build step assumed, dependencies pinned, themed and responsive, degrading gracefully when storage or network is unavailable.

## When to use / when to route elsewhere
- **Use this** for self-contained pages/prototypes/microsites/explainers that ship as an artifact.
- UI inside an existing app/repo → **frontend-design**. Charts/dashboards → load the host's **dataviz** skill. Heavy motion/3D → compose with the motion/WebGL skills but keep the bundle self-contained.

## Workflow
1. **Scope the artifact:** one page or a tiny multi-file bundle, the interactions it needs, and whether it needs any runtime capability (persistence, live data). Keep it minimal.
2. **Structure:** semantic HTML, a clear `<title>` (a 2–4 word name), a short description, and a single source of truth for styles. Prefer vanilla or a pinned framework over an un-versioned one.
3. **Dependencies:** load external scripts/styles only from trusted CDNs, each pinned to an exact, not-brand-new version. Inline everything else. Count any embedded `data:` assets against the size budget.
4. **Theme:** define colors as `:root` tokens; provide dark mode via the standard guarded media-query pattern; give `body` an explicit background. Reuse any theme the host provides.
5. **Responsiveness:** works at phone width (16px side gutter, no horizontal scroll) through desktop.
6. **Resilience:** wrap every `localStorage`/`sessionStorage`/IndexedDB access in try/catch and render correctly when it's empty or blocked; never rely on browser storage for shared or durable state.
7. **Render → inspect → fix.** Open it, screenshot mobile + desktop + dark, click through interactions, check the console. Fix and repeat.

## Constraints
- Self-contained: it must render in isolation, offline for its core content where feasible.
- Pin versions; no bare `latest`. Stay within the size budget.
- Accessible: keyboard operable, visible focus, AA contrast, `prefers-reduced-motion` honored.

## Quality bar
Loads clean with no console errors, correct in light/dark and at every width, interactions work, and nothing breaks when storage is unavailable.

## Output
The artifact file(s), ready to publish/share, plus a one-line note of any runtime capability it needs.
