---
name: 60fps-animation
description: Use to diagnose and fix janky, stuttering or dropped-frame web animation and guarantee smooth 60fps (120fps on capable displays) — profiling the rendering pipeline, eliminating layout thrash/paint storms, moving work to the compositor, and budgeting main-thread work. The animation-performance skill. Use when motion "stutters/lags/drops frames". For craft/feel QA use review-animations; for a11y use accessible-animation.
---

# 60fps Animation

You make motion smooth. A frame budget is 16.7ms (60fps) or 8.3ms (120fps); anything that blows it drops frames. You profile, find the cost, and move it off the critical path.

## When to use / when to route elsewhere
- **Use this** to fix jank and hit the frame budget.
- Feel/craft issues → **review-animations**. Reduced-motion/a11y → **accessible-animation**. Heavy 3D/shader cost → **webgl-art-direction** / **shader-glsl**.

## The rules that keep frames
- **Animate only `transform` and `opacity`.** These skip layout + paint and run on the compositor. Animating width/height/top/left/margin/padding/box-shadow/filter triggers layout/paint every frame — the #1 cause of jank.
- **Avoid layout thrash:** never read layout (`offsetWidth`, `getBoundingClientRect`) then write styles in a loop. Batch reads, then writes. Use `requestAnimationFrame` for JS-driven motion; never animate from `setInterval`/scroll/resize handlers without rAF throttling.
- **Compositor promotion:** use `will-change: transform` (or `transform: translateZ(0)`) *only* on elements about to animate, and remove it after — leaving it on everything wastes GPU memory and backfires.
- **Paint & filters:** large `blur()`/`box-shadow`/`backdrop-filter` are expensive; reduce radius/area, pre-bake, or confine. Avoid animating them.
- **DOM/particle count:** cap element/particle counts; use canvas/WebGL past a few hundred moving nodes; cap devicePixelRatio for heavy canvases.
- **Offscreen/idle:** pause animations when offscreen (IntersectionObserver) and when the tab is hidden.

## Workflow (profile → fix → verify)
1. **Profile** with DevTools Performance: record the animation, look for long tasks, purple "Layout"/green "Paint" per frame, and the FPS/frame chart. Identify what exceeds budget.
2. **Fix** top offenders: convert layout props to transforms; batch DOM reads/writes; add/remove `will-change` precisely; reduce paint area/particle count.
3. **Verify:** re-record and confirm a steady frame line at the target rate on a mid-tier device profile (throttle CPU 4–6×). Check on a real low-end device if possible.

## Constraints
- Don't "fix" by disabling the animation; preserve the intended feel (coordinate with **review-animations**).
- Don't scatter `will-change` as a blanket. Measure before and after — claims of "smoother" must be backed by the profile.

## Output
Before/after profile evidence (frame times / dropped frames), the specific fixes with `file:line`, and confirmation of the target frame rate under CPU throttle.
