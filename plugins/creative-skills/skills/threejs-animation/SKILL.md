---
name: threejs-animation
description: Use to build 3D web scenes and animation with Three.js (or React Three Fiber) — 3D product/hero scenes, GLTF model loading and animation, cameras and lighting, scroll-driven 3D, interactive 3D, and integrating shaders/particles. The 3D-web construction skill. Use for "add a 3D scene/model", "Three.js animation". Direct the look with webgl-art-direction; custom materials via shader-glsl; GPU particles via particle-system; keep it smooth with 60fps-animation.
---

# Three.js Animation

You build real-time 3D for the web that looks intentional and runs smoothly: a correctly lit, composed scene animated per frame, loaded and disposed cleanly.

## When to use / when to route elsewhere
- **Use this** to construct Three.js / React Three Fiber scenes and animation.
- Overall 3D look/mood → **webgl-art-direction** first. Custom materials/effects → **shader-glsl**. GPU particle systems → **particle-system**. Frame budget → **60fps-animation**. Ambient backdrop only → **motion-background**.

## Scene fundamentals
- **Loop:** render via `requestAnimationFrame` (or R3F's loop); drive animation by **delta time** (`THREE.Clock`), not frame count. Pause the loop when offscreen/tab-hidden; in R3F use `frameloop="demand"` for mostly-static scenes.
- **Camera:** choose perspective FOV / ortho deliberately; compose the shot (**shot-composition** applies in 3D too); animate camera moves eased and motivated.
- **Lighting:** physically-based (lights + environment map / IBL) for realistic materials; keep light count low; bake where static. Set `renderer.toneMapping` + correct color space (`SRGBColorSpace`/linear workflow).
- **Models:** load GLTF/GLB with DRACO/meshopt compression; play clips via `AnimationMixer` (update with delta); reuse geometries/materials (instancing for repeats).

## Performance (critical for 3D)
- Cap devicePixelRatio (`setPixelRatio(Math.min(dpr, 2))`); size renderer to the canvas.
- Minimize draw calls: merge/instance; keep poly counts and texture sizes honest; use compressed textures (KTX2).
- **Dispose** geometries, materials, textures and render targets on teardown — the #1 leak source in 3D web.
- Keep per-frame CPU work light; avoid allocations in the loop.

## Constraints
- `prefers-reduced-motion`: reduce/stop camera and auto-motion, render a calm static view. Provide a non-WebGL fallback/poster for unsupported devices. Respect battery (pause offscreen).
- Reuse brand palette/materials direction from **webgl-art-direction**.

## Workflow
1. Define the look/mood (**webgl-art-direction**) and the shot/camera.
2. Build scene: camera, lights/env, models/geometry, materials (shaders via **shader-glsl** if custom).
3. Animate per delta; wire interaction/scroll; add camera moves.
4. Add reduced-motion + fallback + full disposal.
5. **Render loop:** run → profile FPS (throttled), check lighting/composition/color, verify no leaks on remount → fix → re-run.

## Output
The Three.js/R3F scene (loop, camera, lights, models, interaction), disposal + reduced-motion + fallback, and a note on the performance budget.
