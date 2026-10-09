---
name: shader-glsl
description: Use to write GLSL shaders — fragment/vertex shaders for custom materials, post-processing effects, procedural patterns/noise, raymarched scenes, gradient/fluid/distortion effects, and shader-driven backgrounds — for Three.js/R3F, WebGL or shadertoy-style canvases. The GPU-shader skill. Use for "write a shader", "glsl effect", "custom material/post-process". Integrate into scenes via threejs-animation; direct the look via webgl-art-direction.
---

# Shader / GLSL

You write GPU shaders that are correct, performant and precision-safe — procedural visuals and effects computed per-pixel/per-vertex, with the math under control.

## When to use / when to route elsewhere
- **Use this** to author GLSL (fragment/vertex), post-processing, procedural patterns, raymarching, distortion/fluid/gradient effects.
- Scene integration/loading → **threejs-animation**. Look/mood direction → **webgl-art-direction**. GPU particle *simulation* (FBO/compute) → **particle-system**. Subtle CSS/canvas backdrop → **motion-background**.

## Essentials
- **Pipeline:** vertex shader positions geometry; fragment shader colors each pixel. Pass data via `attribute`→`varying`→fragment; constants via `uniform` (time, resolution, mouse, textures).
- **Normalize coordinates:** `vec2 uv = gl_FragCoord.xy / u_resolution; uv = uv * 2.0 - 1.0; uv.x *= aspect;` — fix aspect ratio so effects aren't stretched.
- **Precision & safety:** declare `precision highp float;` (fallback mediump on mobile where needed); avoid `if`-heavy branching in hot paths (use `step`/`mix`/`smoothstep`); never divide by zero (guard); keep loops bounded by constants (WebGL1 requires constant loop bounds).
- **Toolbox:** `mix`, `clamp`, `smoothstep`, `fract`, `mod`, `length`, `dot`; procedural noise (value/Perlin/simplex, fbm for layered detail); SDFs for shapes and raymarching; polar coords for radial effects.
- **Animate** with a `u_time` uniform; keep motion looping/seamless for backgrounds; drive from the render loop.

## Performance
- The fragment shader runs per pixel every frame — keep it cheap. Reduce texture lookups, heavy `pow`/`sin` counts, and raymarch step counts; cap DPR; render effects at a lower resolution target when acceptable.
- Reuse materials; don't recompile shaders per frame; set uniforms, don't rebuild programs.

## Constraints
- Test on the target precision (mobile mediump can band/overflow); provide a fallback (static image/CSS) for no-WebGL or reduced-motion. No strobing. Keep within the frame budget (**60fps-animation**).
- Match the palette/mood from **webgl-art-direction**.

## Workflow
1. Define the effect math (pattern/SDF/noise/post-process) and uniforms.
2. Write vertex + fragment with normalized, aspect-correct UVs and safe precision/branching.
3. Wire uniforms (time/resolution/mouse) and integrate (**threejs-animation**).
4. Add fallback + reduced-motion.
5. **Render loop:** run → inspect for stretching, banding, precision artifacts, FPS/DPR cost → fix → re-run.

## Output
The GLSL source (vertex+fragment) with documented uniforms, the integration snippet, and the fallback — within the performance budget.
