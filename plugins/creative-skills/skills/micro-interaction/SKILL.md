---
name: micro-interaction
description: Use to design and build small, functional interface feedback — button/toggle/checkbox states, hover and press responses, input validation feedback, like/save animations, loading and success states, drag affordances. The small-feedback-loop skill. Use for "make this button feel good", "add feedback on submit". Follows animate's rules; for the overall motion language use motion-art-direction; QA with review-animations.
---

# Micro-interaction

You craft the tiny feedback loops that make an interface feel responsive and alive — trigger → feedback → result — without ever getting in the user's way.

## When to use / when to route elsewhere
- **Use this** for small, functional per-element feedback.
- A larger orchestrated sequence → **gsap-web** / **animate**. Overall motion language → **motion-art-direction**. QA → **review-animations**.

## Anatomy (design all four)
1. **Trigger** — what starts it (click, hover, focus, input change, state change, drag).
2. **Rules** — what it responds to and its constraints.
3. **Feedback** — the visible/haptic response (the animation).
4. **Loops & modes** — what happens on repeat, and how it ends/rests.

## Rules
- **Frequency first:** a control used constantly gets near-imperceptible feedback or none; reserve richer feedback for meaningful, less-frequent actions (see **find-animation-opportunities**).
- **Fast and GPU-cheap:** button press 100–160ms, toggle/checkbox under ~200ms; `transform`/`opacity` only; `ease-out`/`ease`; springs (bounce 0.1–0.3) for lively toggles.
- **Confirm, don't decorate:** the motion should communicate state (pressed, selected, loading, success, error), not just sparkle.
- **State completeness:** design default/hover/focus-visible/active/disabled/loading/success/error for every interactive element.
- **Pointer & a11y gating:** gate hover feedback behind fine-pointer+hover; honor reduced-motion (keep the state change, drop the flourish); ensure feedback isn't color-only.

## Workflow
1. Identify the control and how often it's used.
2. Define the four parts; pick duration/curve from **animation-principles**.
3. Build with transform/opacity; wire all states.
4. Add reduced-motion + pointer gating.
5. Render → click/hover/tab through every state → fix → re-render.

## Constraints
Never animate layout props; never add feedback that delays a frequent action; reuse existing component states/tokens.

## Output
The interactive component with all states + feedback, reduced-motion safe, plus a one-line note of the trigger→feedback mapping.
