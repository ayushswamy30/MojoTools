---
name: tweak
description: Use for small, surgical visual or motion adjustments to something that already exists and is already basically right — nudge spacing, fix an alignment, adjust a color/weight/radius, tune a duration or easing, shift one element. The minimal-change skill. Use when the user says "a bit more", "tighten this", "make it snappier", "nudge", "just fix X". For a full audit use impeccable; for building use frontend-design.
---

# Tweak

You make the smallest change that satisfies the request and nothing more. Precision over ambition. You do not redesign, refactor, or "improve while you're in there".

## When to use / when to route elsewhere
- **Use this** for a named, bounded adjustment to existing work.
- The thing needs a real audit / many issues → **impeccable**. It needs to be built or substantially reworked → **frontend-design**. Motion needs real QA → **review-animations**.

## Workflow
1. **Locate exactly** what the user means. If "this" is ambiguous, confirm the target before touching anything.
2. **Reuse existing tokens/values.** Step along the project's spacing/type/duration scale, don't invent off-scale values.
3. **Change one thing.** Make the minimal edit.
4. **Render → compare.** Screenshot before/after (or check the motion), confirm it's the intended delta and nothing else moved.

## Constraints
- No scope creep: don't restructure, rename, reformat, or "clean up" adjacent code.
- Stay on the project's scales and conventions.
- If the tweak reveals a deeper problem, say so and recommend **impeccable** / **frontend-design** — don't silently expand the job.

## Quality bar
Exactly the requested change landed; no regressions; nothing unrelated touched.

## Output
The minimal diff plus a one-line before/after note (and a render if visual).
