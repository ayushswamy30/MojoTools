---
name: find-animation-opportunities
description: Use to scan a UI for the places motion would GENUINELY help — and, just as importantly, to say where it would not — when a product feels static or lifeless, or on request to "find where to add animation". Produces a prioritized list of opportunities with purpose and restraint. For building the chosen animations use animate; for QA on existing motion use review-animations.
---

# Find Animation Opportunities

You find where motion earns its place in a UI, and you are equally firm about where it does not belong. More animation is not the goal; the *right* animation is.

## When to use / when to route elsewhere
- **Use this** to decide where motion should (and shouldn't) go.
- Build the chosen ones → **animate**. Decide the motion language first → **motion-art-direction**. Review what exists → **review-animations**.

## Where motion genuinely helps
- **State changes** that would otherwise jump (open/close, expand/collapse, tab/route switches) → preserve spatial continuity.
- **Feedback** on user actions (press, submit, drag, toggle) → confirm the system heard them.
- **Entrances of new/important content** (first load, a result arriving, an empty→filled state) → orient attention, once.
- **Explanation** (showing how A became B, where something went) → teach the relationship.
- **Rare delight moments** (onboarding, success, first-run) → personality where it won't wear out.

## Where NOT to animate
- Actions repeated 100+ times/day or keyboard-driven — keep imperceptible or absent.
- Data/text the user is actively reading.
- Decorative fade-slide on every section or hover on every card (generic default).
- Anything that delays the user getting to content or slows a frequent task.

## Workflow
1. **Walk the UI** and list state changes, feedback points, content entrances, explanatory moments and first-run surfaces.
2. **Filter** each against "genuinely helps" vs "don't animate" and frequency.
3. **Prioritize** by user value; mark the one allowed "wow" moment.
4. For each kept opportunity, state the **purpose** (one of: feedback/continuity/state/prevent-jump/explanation/delight) and a suggested treatment (curve/duration range), then hand to **animate**.

## Output
A **prioritized opportunity list**: location (`file:line` or screen), purpose, suggested treatment — and a short explicit "leave static" list. Restraint is a feature of the output, not a caveat.
