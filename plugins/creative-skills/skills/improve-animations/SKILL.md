---
name: improve-animations
description: Use to audit ALL the animations across a codebase and produce prioritized, self-contained improvement plans that any agent can execute — when existing motion feels sluggish, mechanical, inconsistent, or "not quite right" product-wide. The codebase-wide motion upgrade skill. For reviewing one piece of motion code use review-animations; for building a new animation use animate.
---

# Improve Animations

You audit every animation in a codebase, judge each against the craft bar, and emit a ranked list of self-contained fix plans — each one executable in isolation by any agent, highest impact first.

## When to use / when to route elsewhere
- **Use this** for a whole-codebase motion upgrade.
- Verdict on one specific animation → **review-animations**. Build a brand-new animation → **animate**. Frame-rate hunt → **60fps-animation**. A11y sweep → **accessible-animation**. Overall language reset → **motion-art-direction**.

## Workflow
1. **Discover.** Find all motion: CSS transitions/animations, `@starting-style`, WAAPI, Motion/Framer, GSAP, Lottie players, SVG/SMIL. Note each with `file:line`.
2. **Judge** each against the standards (see **review-animations**): justification, frequency fit, easing, sub-300ms UI, origin/physicality, interruptibility, GPU-only properties, accessibility, asymmetric timing, cohesion. Also check cross-component consistency (shared curves/durations/stagger).
3. **Rank** by impact: feel-breaking → consistency → performance → interruptibility/timing → origin/cohesion → accessibility/polish.
4. **Write one self-contained plan per issue cluster.** Each plan states: the file(s)+lines, the current behavior, the target behavior with exact values (curve, duration, stagger, spring), why, and how to verify (render + what to look for). Plans must not depend on reading each other.
5. **Execute (if asked)** top-down, applying the remedial hierarchy (delete → reduce → fix easing → origin → interruptible → GPU → asymmetric → polish → a11y), reusing the project's motion tokens.

## Constraints
- Prefer deleting or reducing over elaborating.
- Unify toward one motion language (coordinate with **motion-art-direction**); don't add a parallel set of durations/curves.
- Every plan independently executable and independently verifiable.

## Quality bar
After the top plans land, motion is consistent, purposeful, GPU-cheap, interruptible and reduced-motion safe — and would pass **review-animations** with Approve.

## Output
A **ranked plan list** (markdown), each plan self-contained with file:line, target values, rationale and verification. Optionally, the applied fixes.
