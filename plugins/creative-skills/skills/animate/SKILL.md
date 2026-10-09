---
name: animate
description: Use to BUILD a specific web animation from scratch — animate an element, add motion, build a transition or entrance/exit, make something feel alive. Works through the decisions in order (should it move, why, which tool, which properties, easing/duration, interruption, reduced-motion) then writes the code. For critiquing existing motion use review-animations; for auditing a whole codebase use improve-animations; for the overall motion language use motion-art-direction.
---

# Animate

You build one animation well, by making the right decisions in order and writing the cheapest code that achieves the intended feel. Craft over flair.

## When to use / when to route elsewhere
- **Use this** to construct an individual animation/transition.
- Critique existing motion → **review-animations**. Audit/upgrade a codebase's motion → **improve-animations**. Find where motion would help → **find-animation-opportunities**. Overall language/spec → **motion-art-direction**. Raw numbers → **animation-principles**. GSAP timelines → **gsap-web**.

## Build sequence
1. **Should it animate?** Never animate actions repeated 100+ times/day (e.g. keyboard shortcuts). Frequent actions → near-imperceptible or none. Reserve delight for rare, first-time moments.
2. **Purpose.** Name exactly one: feedback · spatial continuity · state indication · prevent a jarring jump · explanation · delight. Data the user is reading must not move for style.
3. **Tool — cheapest that works:** CSS transitions for hover/state toggles · `@starting-style` for mount entries · CSS animations for predetermined motion · WAAPI for programmatic control · Motion (Framer Motion) for springs, layout, exit and gestures.
4. **Properties.** Animate only `transform` and `opacity`. Avoid `scale(0)` — start ~0.9–0.97 with opacity 0. Anchor popover/transform-origin to the trigger (modals stay centered). In Motion, use full transform strings, not the `x`/`y`/`scale` shorthands.
5. **Easing & duration.** `ease-out` for enter/exit, `ease-in-out` for on-screen moves, `ease` for hover/color, `linear` only for constant motion. **Never `ease-in` on UI.** Use strong custom curves (see **animation-principles**), not the weak built-ins. Durations: button press 100–160ms · tooltip 125–200ms · dropdown 150–250ms · modal/drawer 200–500ms. Keep UI under 300ms. Springs for drag/gesture/lively elements with bounce ~0.1–0.3.
6. **Interruption & exit.** Transitions for rapidly re-triggered elements; keyframes only where appropriate; springs for gestures (retarget from current state). Exit along the path it entered. Slower timing for deliberate user phases, snappier for system responses.
7. **Reduced motion & pointer gating — ship with every animation.** `prefers-reduced-motion` means fewer/gentler (keep fades, drop movement), not nothing. Gate hover effects behind fine-pointer, hover-capable media queries.

## Never ship
`transition: all` · `scale(0)` entrances · `ease-in` on UI · animating layout props (width/height/margin/padding/top/left) · keyframes on toasts/toggles · missing reduced-motion handling · ungated hover motion · entrances that all fire at once instead of a short stagger.

## Constraints
- Reuse the project's motion tokens and existing component library (don't hand-roll dropdowns/toasts/drawers that a library provides).

## Quality bar
Purposeful, GPU-cheap, interruptible where triggered rapidly, reduced-motion safe, and consistent with the product's motion language. It would pass **review-animations**.

## Output
The animation code, plus a one-line note of purpose + chosen curve/duration.
