---
name: whiteboard-animation
description: Use to create whiteboard/hand-drawn explainer animations — the "drawing hand" style where illustrations and text are sketched on in sequence to narration, building a scene element by element. The hand-drawn explainer skill. Use for "whiteboard animation", "draw-on explainer", sketch-style teaching video. Implement via svg-animation (path draw) + remotion-video; for clean technical figures use diagram-animation; for structure/script use explainer-video.
---

# Whiteboard Animation

You create the draw-on, sketch-style explainer: line art and lettering appear as if being drawn, in step with a narration, assembling a scene that teaches one idea at a time.

## When to use / when to route elsewhere
- **Use this** for hand-drawn / draw-on explainer style.
- Script/structure the explainer → **explainer-video** first. Clean data/technical figures → **diagram-animation**. The draw-on mechanic → **svg-animation** (stroke-dashoffset). Render → **remotion-video**. VO/music → **soundtrack**.

## Principles
- **Draw-on reveal:** each stroke/illustration draws in via `stroke-dashoffset` (path length → 0), in the order the narration introduces it. Optionally show a hand/marker following the stroke tip.
- **Scene builds cumulatively:** elements stay on the board and accumulate into a composition; relationships become clear as pieces connect. Clear or pan the board between major sections.
- **Pace to the voice:** a stroke/element lands as its word/phrase is spoken; keep draw speed readable (not too fast to follow, not tediously slow).
- **Consistent sketch aesthetic:** one line weight/style, a limited marker palette (often mono + 1–2 accents), hand-lettered or a handwriting font. Keep it genuinely sketch-like, not polished vector that happens to draw on.
- **Hierarchy via order and size:** the hero element is biggest/center; supporting sketches orbit it.

## Workflow
1. Script + beat map from **explainer-video**.
2. Prepare line-art SVGs per element (clean single paths that draw well; set `pathLength`).
3. Sequence draw-ons to narration; place the hand/marker if used; plan board clears/pans.
4. Assemble in Remotion with staggered stroke reveals synced to VO; add captions.
5. **Render loop:** watch with audio → check draw timing vs narration, legibility, composition build, sketch consistency → fix → re-render.

## Constraints
- Paths must be single, clean strokes that draw convincingly. Reduced-motion → show completed board. Caption narration. Keep the aesthetic consistent across scenes.

## Quality bar
Feels genuinely drawn-on, lands each element with its narration, and the finished board clearly tells the story.

## Output
Line-art assets + the draw-on sequence synced to narration (via **svg-animation** + **remotion-video**), with captions.
