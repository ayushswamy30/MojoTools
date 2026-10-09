---
name: motion-art-direction
description: Use at the start of any motion project (motion graphics, animated UI, video, explainer) to define the overall motion LANGUAGE before animating — tone, pacing, hierarchy, the signature easing/timing, transition family, and restraint. Sits above the implementation skills (animate, gsap-web, lottie, remotion). Produces a motion spec that every shot/component then conforms to. For individual UI animation construction use animate; for tech-agnostic timing math use animation-principles.
---

# Motion Art Direction

You are the motion director. You decide *how this thing moves* as a coherent language, then hand a spec to the builders. Direction is mostly deciding what **not** to move.

## When to use / when to route elsewhere
- **Use this first** for any multi-shot or product-wide motion so everything feels like one hand.
- Build an individual animation → **animate**. Get the raw timing/easing numbers → **animation-principles**. QA the result → **review-animations** / **improve-animations**.
- Video-specific framing/pacing → **shot-composition**; color-in-motion → **color-motion**; music sync → **beat-sync-editing**.

## Workflow
1. **Brief:** audience, core message, platform, duration, three mood adjectives → one line of creative intent.
2. **Tone & energy:** place on the matrix — calm↔kinetic × soft↔sharp. Pick **one** cell and commit (mixing cells is the #1 cause of inconsistent motion):
   - calm-soft: luxury, wellness, editorial · calm-sharp: premium tech, fintech · kinetic-soft: playful, lifestyle, kids · kinetic-sharp: sports, hype, gaming.
3. **Choose a motion personality** (preset): Playful 150–300ms, overshoot 10–20% · Premium 350–600ms, no overshoot · Corporate 200–400ms, overshoot 0–3% (default for UI/product) · Energetic 100–250ms, overshoot 15–30%.
4. **Fill the motion-language spec:** one signature easing family; a base timing unit (all durations are multiples of it); one transition family (how shots/views connect); one stagger rhythm; a motion-intensity budget (travel, scale, overshoot); and hold discipline (minimum rest between moves). Cap at **two** eases — one for exits, one for entrances/landings.
5. **Hierarchy:** rank every element Hero / Support / Texture. Hero gets the boldest, slowest move; Support stays out of the hero's way; Texture is subtle ambient only. If two elements compete in one frame, demote one.
6. **Restraint pass:** list what stays static. Stagger reveals instead of moving whole frames; never stack transitions; don't animate text people are still reading; no overshoot on serious content; **one** "wow" moment per piece.
7. **Energy arc & consistency check:** plan energy across the timeline (low open → build → peak → settled end); sync key moments to audio. Audit every shot against the spec before sign-off: shared easings, durations as multiples of the base unit, one transition family, identical stagger, adequate holds, exactly one hero per frame.

## Constraints
- Reuse the project's existing motion tokens (durations/easings from **design-system**) rather than inventing a parallel set.
- Commit to the spec; deviations must be deliberate and justified.

## Quality bar
Every shot/component reads as the same voice; nothing moves without meaning; the energy arc is intentional.

## Output
A **motion spec** (markdown): intent, tone cell, personality, the spec table, the hierarchy map, the restraint list, the energy arc, and the consistency checklist. Hand to the implementation skills.
