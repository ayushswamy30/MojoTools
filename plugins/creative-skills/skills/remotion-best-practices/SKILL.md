---
name: remotion-best-practices
description: Use as the authoritative rule set for any Remotion work — the comprehensive best-practices reference covering animation, timing, audio, media, fonts, 3D, performance and rendering. Load this whenever working in a Remotion project and you're unsure which specific pattern applies. Pairs with remotion-video (construction). Read this when debugging Remotion rendering, flicker, audio drift, or non-deterministic output.
---

# Remotion Best Practices

The rules that keep Remotion compositions correct, deterministic and renderable. When a specific Remotion question comes up and you're unsure, apply these.

## When to use / when to route elsewhere
- **Use this** as the reference layer for all Remotion work; **remotion-video** builds, this governs.

## Timing & animation
- Everything is a function of `useCurrentFrame()`; never use wall-clock time or real timers. Convert seconds to frames with the composition `fps`.
- Prefer `interpolate()` with explicit `{extrapolateLeft:'clamp', extrapolateRight:'clamp'}` — unclamped interpolation causing out-of-range values is a top bug.
- Use `spring({frame, fps, config:{damping, stiffness, mass}})` for organic motion; keep spring params consistent across the piece.
- Scene placement: `<Sequence from durationInFrames>` and `<Series>`; offset child frames are relative to the Sequence. Use `premountFor`/`<Freeze>` where needed.

## Determinism (non-negotiable)
- No `Date.now()`, `Math.random()` (use Remotion's `random(seed)`), network calls in render, or reads of mutable globals. The same frame → identical output, always. Non-determinism shows up as flicker between renders and broken multi-threaded renders.

## Audio & media
- `<Audio src>` with `startFrom`/`endAt` (in frames); `volume` can be a function of frame for fades. Keep audio in sync by driving everything from frames.
- Use `<OffthreadVideo>` (not `<Video>`) for embedded video in renders for correct frame extraction; `<Img>` (not `<img>`) and `<Video>`/`<Audio>` so Remotion can wait for assets. Use `delayRender()`/`continueRender()` for async asset loading.
- `staticFile()` for local assets in `public/`; never hardcode paths.

## Fonts & layout
- Load fonts via `@remotion/google-fonts` or `@remotion/fonts` and await readiness before render (avoids FOUT/flicker). Keep per-frame layout cheap — memoize heavy computations; avoid measuring the DOM every frame.

## Dimensions, safe areas, codecs
- Set `width/height` to the platform (1920×1080, 1080×1920, 1080×1080); keep essential content in title/action-safe margins; ensure text contrast.
- Render with the right codec/format (`h264` MP4 default; `gif`/`webm`/`prores` as needed); set CRF/quality deliberately; use `--concurrency` to match cores.

## Performance & rendering
- Keep components pure and light; lazy-load big assets; avoid re-creating objects each frame. Use `calculateMetadata`/input props (validated with Zod) for data-driven videos. Prefer the latest stable Remotion API; check the installed version before using newer APIs.

## Debugging checklist
Flicker between renders → non-determinism. Audio drift → ms-based timing instead of frames. Missing/late assets → use Remotion media components + `delayRender`. Clamp issues → add `extrapolate*:'clamp'`. Font flash → await font load.

## Output
Apply as rules while building/rendering; when reviewing, cite the violated rule and the fix.
