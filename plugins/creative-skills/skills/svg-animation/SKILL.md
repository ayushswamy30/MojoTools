---
name: svg-animation
description: Use to animate SVG — path drawing (stroke-dashoffset), morphing between shapes, animated icons, line illustrations, logo line-draws, and data/diagram reveals — using CSS, SMIL, WAAPI or GSAP. The vector-animation implementation skill. Use when the asset is vector art/icons/paths; for raster/designer-exported motion use lottie-animation; for logo motion specifically use logo-animation.
---

# SVG Animation

You animate vector graphics with precision — strokes that draw themselves, shapes that morph cleanly, icons that transition between states — keeping it crisp, light and performant.

## When to use / when to route elsewhere
- **Use this** for path draws, morphs, animated icons, line illustrations, diagram reveals.
- Designer-authored complex motion (AE export) → **lottie-animation**. Logo-specific choreography → **logo-animation**. Animated diagrams with labels/flow → **diagram-animation**. Orchestration/scroll → **gsap-web**.

## Techniques
- **Path draw:** set `stroke-dasharray` = path length and animate `stroke-dashoffset` from length→0. Use `pathLength="1"` to normalize so you can animate offset 1→0 regardless of real length.
- **Morph:** morph between paths with the **same number and order of points** for clean interpolation (GSAP MorphSVG or a points-matched CSS/WAAPI approach). Mismatched point counts cause popping.
- **Transform origin:** set `transform-box: fill-box; transform-origin: center` so scales/rotations pivot correctly on SVG elements.
- **Icons:** animate between two states with transform/opacity/offset; keep the viewBox stable.
- **Staggered reveals:** stagger child paths (values from **animation-principles**).

## Rules
- Prefer `transform`/`opacity`/`stroke-dashoffset` (cheap). Avoid animating geometry attributes (`d`, `x`, `width`) where a transform works; morphs are the exception.
- Optimize the SVG first (SVGO): remove editor cruft, flatten unnecessary groups, but keep the IDs/structure you animate.
- Easing/durations from **animation-principles**; match the product's **motion-art-direction** language.
- Honor `prefers-reduced-motion`: show the final drawn/resolved state instead of the draw.

## Workflow
1. Clean/prepare the SVG; identify the elements to animate and their origins.
2. Choose the technique (draw/morph/transform) and tool (CSS/WAAPI/GSAP).
3. Implement with normalized paths + matched points for morphs.
4. Add reduced-motion fallback.
5. Render → inspect for popping, pivot errors, jank → fix → re-render.

## Output
The animated SVG + driving code (CSS/JS/GSAP), reduced-motion fallback, and a note on technique used.
