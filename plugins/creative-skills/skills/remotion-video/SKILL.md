---
name: remotion-video
description: Use to create programmatic video with Remotion — building React-based video compositions, scenes, data-driven/parameterized videos, and rendering to MP4/GIF/WebM. The Remotion construction skill. Use for "make a video in Remotion", "render this animation to video", or any code-driven video. Pair with remotion-best-practices for the rules; get storyboarding from the video-type skills (explainer-video, short-form-video, etc.).
---

# Remotion Video

You build video as React: compositions made of frames, where everything is a function of `frame` and `fps`. You implement a storyboard into a renderable composition.

## When to use / when to route elsewhere
- **Use this** to build and render a Remotion composition.
- The detailed rule set → **remotion-best-practices** (read it alongside this). Storyboard/pacing/structure first → **explainer-video** / **short-form-video** / **ad-creative-video** / **product-demo-video** / **presentation-video** / **audiogram** / **diagram-animation**. Motion feel values → **animation-principles**; music sync → **beat-sync-editing**; music → **soundtrack**; captions bar → **lower-thirds**.

## Core model
- A `<Composition>` declares `durationInFrames`, `fps`, `width`, `height` and a component. Everything animates from the current frame via `useCurrentFrame()` + `useVideoConfig()`.
- **Time in frames, not ms:** convert design durations to frames (`frames = round(seconds * fps)`); choose `fps` up front (30 for most, 60 for ultra-smooth, 24 for cinematic).
- **`interpolate()`** maps frame ranges to values; always set `extrapolateLeft/Right: 'clamp'`. Use `spring({frame, fps, config})` for natural motion.
- **`<Sequence>`** places scenes on the timeline (`from`, `durationInFrames`); `<Series>` for back-to-back scenes; `<Audio>`/`<Video>`/`<Img>`/`<OffthreadVideo>` for media; `<AbsoluteFill>` for full-frame layers.
- **Determinism:** the same frame must always render the same pixels — no `Date.now()`, no unseeded `Math.random()` (use `random(seed)`), no external mutable state in render.

## Workflow
1. Take the storyboard (scenes, durations, copy, assets) from the relevant video-type skill.
2. Set composition config (dimensions for the platform, fps, total frames). Parameterize via `defaultProps`/input props if data-driven; validate with Zod.
3. Build scenes as components; place with `<Sequence>`/`<Series>`; animate with `interpolate`/`spring` using values from **animation-principles**.
4. Add audio; sync key hits to the beat grid (**beat-sync-editing**); add captions/lower-thirds.
5. **Preview → inspect → fix (render loop):** use Remotion Studio/Player to scrub, check timing, safe areas, legibility and audio sync; fix; re-preview. Then render.

## Constraints
- Deterministic rendering only. Pin assets; preload fonts with `@remotion/google-fonts` or `staticFile`. Keep per-frame work cheap (avoid heavy layout each frame).
- Design for the target aspect ratio and title/action-safe areas; readable text.

## Output
The Remotion project/composition, parameterization, and the rendered video (correct dimensions/fps/codec for the platform), plus the render command used.
