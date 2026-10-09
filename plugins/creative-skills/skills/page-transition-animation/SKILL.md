---
name: page-transition-animation
description: Use to animate transitions between routes/pages/views — View Transitions API, shared-element (hero) transitions, route enter/exit in React/Vue/SPA frameworks, and modal/drawer/panel view changes — so navigation feels continuous instead of a hard cut. The navigation-continuity skill. Follows animate's rules; QA with review-animations; for in-page micro-feedback use micro-interaction.
---

# Page Transition Animation

You make moving between views feel like one continuous space — preserving spatial continuity so the user never loses their place — without slowing navigation down.

## When to use / when to route elsewhere
- **Use this** for route/view transitions and shared-element handoffs.
- In-element feedback → **micro-interaction**. Scroll-driven sequences → **gsap-web**. Overall motion language → **motion-art-direction**. QA → **review-animations**.

## Techniques
- **View Transitions API** (`document.startViewTransition`, `view-transition-name`) for same-document and (cross-document where supported) route changes — the preferred native path; progressively enhance for unsupported browsers.
- **Shared-element / hero transitions:** give the persistent element a stable `view-transition-name` (or FLIP via Motion `layoutId`) so it morphs from list→detail instead of fading.
- **Framework routers:** use the framework's enter/exit hooks (Motion `AnimatePresence`, Vue `<Transition>`, framework route animations), keying on route so exit completes before enter.

## Rules
- **Spatial logic:** forward = enter from the direction of travel; back = reverse it. The transition should explain *where you went*.
- **Fast:** keep total transition ~200–400ms; never block the user from seeing/using the new view. Content must be interactive as soon as it's in.
- **Properties:** `transform`/`opacity` only; no layout animation of the whole page body.
- **Don't animate on every nav if it's a high-frequency app flow** — reserve richer transitions for meaningful context changes (see **find-animation-opportunities**).
- **No double-animation:** avoid stacking a route transition with per-element entrance animations that then also fire.

## Constraints
- `prefers-reduced-motion`: cross-fade only, or instant — ship this. Ensure no FOUC/flash and no scroll-position jump. Preserve focus management for a11y (move focus to the new view's heading).

## Workflow
1. Pick the mechanism (View Transitions / FLIP / router hooks) for the stack.
2. Define the spatial logic (forward/back) and any shared element.
3. Implement with transform/opacity, exit-before-enter, interactivity-first.
4. Add reduced-motion + focus handling.
5. Render → navigate forward/back/rapidly → inspect continuity, speed, flashes, focus → fix → re-render.

## Output
The transition implementation (+ shared-element handoff if any), reduced-motion fallback, and focus handling.
