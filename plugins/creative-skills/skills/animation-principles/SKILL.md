---
name: animation-principles
description: Use as the tech-agnostic foundation for deciding HOW something should move — choosing easing curves, durations, stagger offsets, spring configs — and for diagnosing motion that looks stiff, floaty, robotic, cheap or janky. Produces concrete numbers ready to hand to any implementation (CSS, GSAP, Motion, Lottie, After Effects, Remotion). The reference layer under animate, motion-art-direction and every implementation skill.
---

# Animation Principles

You turn intent into concrete, defensible motion numbers, independent of any tool. When motion feels wrong, you name why and prescribe the fix.

## When to use / when to route elsewhere
- **Use this** to pick curves/durations/stagger/springs or to diagnose bad feel.
- Decide the overall motion *language* → **motion-art-direction**. Build a specific UI animation → **animate**. Guarantee performance → **60fps-animation**. Honor accessibility → **accessible-animation**.

## Settle intent first
Three pillars before numbers: **emotional intent**, **visual narrative**, **motion craft**. Three layers in any scene: **primary** (the hero move), **secondary** (supporting reactions), **ambient** (background life).

## Easing (cubic-bezier)
- Enter (ease-out): `cubic-bezier(0.16, 1, 0.3, 1)`
- Exit (ease-in): `cubic-bezier(0.7, 0, 0.84, 0)`
- Reposition (ease-in-out): `cubic-bezier(0.65, 0, 0.35, 1)`
- Branded pop (overshoot): `cubic-bezier(0.34, 1.56, 0.64, 1)`
- `linear` is reserved for continuous loops only. Never `ease-in` on UI entrances.

## Durations
- Micro-interactions 100–200ms · UI transitions 200–400ms · hero/full-screen 400–800ms · cinematic camera 800–2000ms.
- Enter 300–500ms · exit 200–300ms (exits faster than enters) · move 300–400ms · branded pop 400–600ms.
- Scale with distance/size: add ~30–50% when travel distance or area doubles to keep perceived velocity steady.

## Stagger & rhythm
- Lists 40–80ms/item · dense grids 20–40ms/item · cap a group reveal at ~600–800ms total.
- Distance-based stagger for items radiating from a focal point.
- **1/3 rule:** no element travels more than ~⅓ of the screen without an intermediate keyframe; with 3+ elements, no more than ~⅓ move at once.

## Physical feel
- Anticipation: a 60–120ms counter-move before the main action.
- Follow-through: attached elements settle 40–80ms after the main body.
- Use arcs, not straight lines, for organic objects.

## Springs
- Snappy default: stiffness 300, damping 30, mass 1. Keep bounce modest (0.1–0.3) for UI.
- Springs for interruptible, gesture-driven motion; duration-based easing for timeline-locked sequences.

## Beat sync
At 120 BPM a beat = 500ms, an eighth note = 250ms. Land impacts on the beat grid (see **beat-sync-editing**).

## Diagnosing
- Stiff/robotic → switch enters to ease-out (strong curve). · Floaty/sluggish → cut duration ~30% and sharpen the curve. · Cheap/janky → add stagger and scale durations by element size. · Mechanical → add anticipation, follow-through and arcs.

## Output
Concrete values (durations, named curves, stagger offsets, spring configs) plus the one-line rationale, ready to hand to the implementing skill.
