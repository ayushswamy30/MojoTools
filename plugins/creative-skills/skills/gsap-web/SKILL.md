---
name: gsap-web
description: Use to implement web animation with GSAP — complex timelines, scroll-driven animation (ScrollTrigger), SVG/path animation, pinning, staggered sequences, and performant sequenced motion that goes beyond simple CSS transitions. The GSAP implementation skill. Use when the motion plan calls for orchestrated timelines or scroll-linked sequences; for simple state/hover motion prefer CSS via animate; follow the plan from motion-art-direction/animation-principles.
---

# GSAP (Web)

You implement orchestrated and scroll-driven web animation with GSAP, cleanly and performantly, executing a plan from the direction/principles skills.

## When to use / when to route elsewhere
- **Use this** for timelines, scroll-linked sequences, pinning, complex stagger, SVG/path motion.
- Simple hover/state toggles and mount entries → **animate** (plain CSS/Motion is cheaper). Spring/gesture/layout UI → Motion via **animate**. The timing/easing values come from **animation-principles**; the language from **motion-art-direction**.

## Implementation rules
- **Timelines over scattered tweens:** build a `gsap.timeline()` and position tweens with labels/offsets so the sequence is editable and readable.
- **Animate `transform`/`opacity`** (GSAP's `x/y/scale/rotation/autoAlpha`); avoid layout props. Use `autoAlpha` to combine opacity + visibility.
- **Easing:** use GSAP eases that match the plan (e.g. `power3.out` ≈ strong ease-out for enters, `power2.in` for exits, `back.out` for a branded pop). Don't default everything to `power1`.
- **Stagger:** use the `stagger` object (amount/each, `from`, grid) with the values from **animation-principles** (lists 40–80ms, grids 20–40ms, distance-based for radial).
- **ScrollTrigger:** set `scrub` for scrubbed motion, use `pin` sparingly, always define `start`/`end` explicitly; use `invalidateOnRefresh` for responsive recalculation. Don't tie critical content visibility to scroll.
- **Cleanup:** use `gsap.context()` (and revert on unmount) in React/SPA to avoid leaks and double-inits; kill ScrollTriggers on teardown.
- **Respect the bundle:** import only the plugins you use; register them once.

## Constraints
- Reuse project motion tokens for durations/eases where defined.
- Honor `prefers-reduced-motion`: provide a reduced timeline (fewer/gentler, no large travel) — don't just disable everything that hides content.
- Keep it 60fps (coordinate with **60fps-animation**): no layout-thrashing tweens, `will-change` only where measured to help.

## Workflow
1. Translate the plan into a timeline structure (labels, offsets).
2. Implement with transform/opacity + matched eases + staggers.
3. Wire ScrollTrigger if scroll-linked; set explicit start/end; handle refresh.
4. Add reduced-motion variant and cleanup.
5. Render → inspect feel + FPS + scroll behavior → fix → re-render.

## Output
The GSAP code (timeline + any ScrollTriggers), reduced-motion variant, and cleanup, with a note mapping it to the motion plan.
