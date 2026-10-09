---
name: presentation-video
description: Use to create animated presentation/slide-style videos — narrated decks, pitch videos, keynote-style animated slides, data-story videos, and talking-point sequences with smooth slide transitions and build-on bullet/figure animations. The animated-deck video skill. Use for "turn these slides into a video", "animated pitch/keynote video". Implement in remotion-video; for teaching a concept use explainer-video; for data figures use diagram-animation.
---

# Presentation Video

You turn structured talking points into a paced, narrated animated deck — each slide builds its idea, transitions carry continuity, and the whole thing reads clearly on its own.

## When to use / when to route elsewhere
- **Use this** for narrated/animated slide-style video.
- Build/render → **remotion-video**. Concept explainer with metaphors → **explainer-video**. Animated charts/figures → **diagram-animation**. Slide transitions as navigation → **page-transition-animation** patterns. Narration VO music → **soundtrack**.

## Principles
- **One idea per slide;** the slide builds that idea (title → key point → support), not a wall of bullets appearing at once.
- **Build-ons, staggered:** reveal bullets/figures in sequence (40–80ms stagger) timed to the narration — the current point is highlighted, prior ones recede.
- **Transitions carry meaning:** a consistent transition family between slides (one family, per **motion-art-direction**); directional logic for sections. Don't use a different wipe every time.
- **Narration-locked pacing:** timing follows the VO/script; each slide holds long enough to read its content (and to say it). Caption the narration.
- **Data slides:** animate figures to reveal the insight (defer to **diagram-animation**), not to decorate.

## Workflow
1. Outline: one idea per slide, in a logical arc (problem → insight → ask, or topic sequence).
2. Script narration; mark where each build-on lands.
3. Design slide layout/type to tokens; keep it airy and legible at output size.
4. Animate build-ons + one transition family; sync to narration.
5. **Render loop:** assemble → watch with audio → fix pacing (nothing too fast to read / too slow to bore), legibility, transition consistency → refine.

## Constraints
- One transition family. Legible type in safe areas. Caption narration. Reuse brand/deck tokens. Content paced to be readable and sayable.

## Quality bar
Each slide teaches its one point, builds in sync with narration, and the deck feels like one coherent piece.

## Output
Slide outline + narration script + per-slide build/transition plan — ready for **remotion-video**.
