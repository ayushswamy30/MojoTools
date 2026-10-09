---
name: lottie-animation
description: Use to integrate, control or optimize Lottie animations on web/app — embedding a .lottie/JSON, controlling playback (play/pause/segments/speed), scroll- or state-driven playback, interactivity, theming/recoloring, and performance/size optimization. The Lottie implementation skill for designer-authored (After Effects/Figma) motion. For hand-coded vector motion use svg-animation; for logo motion use logo-animation.
---

# Lottie Animation

You bring designer-authored motion (After Effects/LottieFiles/Figma) to life on the web/app and wire it to the product: playback control, interactivity, theming and performance.

## When to use / when to route elsewhere
- **Use this** to embed and control Lottie/dotLottie assets.
- Hand-authored path/icon motion → **svg-animation**. Logo choreography → **logo-animation**. Programmatic video → **remotion-video**.

## Implementation
- Prefer the modern **dotLottie** player (`@lottiefiles/dotlottie-web` / web component) or `lottie-web`; use the `.lottie` format for smaller payloads.
- **Renderer:** SVG renderer for crispness on small/medium assets; canvas for many/large assets where SVG DOM cost hurts. Measure.
- **Control playback:** expose play/pause/stop, `playSegments`, speed, direction, and `loop`. Drive from state (e.g. success tick on submit) or scroll (map scroll progress → frame) rather than always autoplaying.
- **Interactivity:** use the interactivity/state-machine API (hover, click, scroll-sync) instead of ad-hoc timers where available.
- **Theming:** recolor via the player's color APIs or by editing the JSON's color keys; don't ship multiple near-duplicate files when one themed file works.

## Performance & size
- Optimize the source: reduce layers/keyframes/precision, remove hidden layers, avoid huge embedded rasters and expression-heavy comps.
- Lazy-load below-the-fold animations; pause when offscreen (IntersectionObserver) and when the tab is hidden.
- Keep file size honest — a Lottie that's heavier than a short video is a smell.

## Constraints
- Honor `prefers-reduced-motion`: render a static poster frame or stop looping.
- Provide accessible text alternatives for anything conveying meaning; decorative animations get `aria-hidden`.
- Reuse the product's palette (**theme-factory** / tokens) when recoloring.

## Workflow
1. Validate/optimize the asset; pick format + renderer.
2. Embed; wire playback to the right trigger (state/scroll/hover).
3. Theme to tokens; add offscreen pause + reduced-motion fallback.
4. Render → inspect fidelity, size, FPS, trigger behavior → fix → re-render.

## Output
The integrated player code, the optimized asset, triggers/theming, and accessibility/reduced-motion handling.
