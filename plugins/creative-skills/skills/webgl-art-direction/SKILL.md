---
name: webgl-art-direction
description: Use at the start of any 3D/WebGL/shader project to direct the overall look and feel before building — material/surface language, lighting mood, color grade, camera language, level of realism (stylized↔photoreal), and the performance budget. The art-direction layer for GPU visuals, parallel to visual-art-direction/motion-art-direction. Produces a look spec that threejs-animation, shader-glsl and particle-system execute against.
---

# WebGL Art Direction

You decide how a 3D/WebGL piece should *look and feel* before anyone writes a scene — committing to a material, lighting, color and camera language, and a realism level, within a stated performance budget.

## When to use / when to route elsewhere
- **Use this first** for any Three.js/shader/particle project with aesthetic stakes.
- Build the scene → **threejs-animation**. Author materials/effects → **shader-glsl**. Particle systems → **particle-system**. 2D/UI aesthetic → **visual-art-direction**. Motion language → **motion-art-direction**. Frame budget enforcement → **60fps-animation**.

## The look spec
- **Realism level:** place on stylized ↔ photoreal and commit. This drives material and lighting complexity (and cost).
- **Material/surface language:** metal/glass/matte/subsurface/toon; roughness/metalness ranges; whether to use PBR + environment maps or flat/toon shading. One coherent surface vocabulary.
- **Lighting mood:** key/fill/rim setup, color temperature, contrast, environment/IBL; soft vs hard; day/studio/night/neon. Lighting is the mood — decide it explicitly.
- **Color grade:** palette and a tone-mapping/grade direction (warm/cool bias, contrast, bloom/glow budget). Coordinate with **color-motion** if it's video.
- **Camera language:** lens feel (FOV), movement vocabulary (locked / slow drift / orbit / dolly), and composition approach (**shot-composition**).
- **Performance budget (stated up front):** target device tier, FPS target, DPR cap, draw-call/poly/texture ceilings, and the fallback plan for no-WebGL/reduced-motion. The look must be achievable within it — art direction that ignores the budget is a failed spec.

## Constraints
- One coherent look; every later shader/material/light choice must trace back to this spec.
- Reuse brand palette/materials where applicable.
- Budget is part of the art direction, not an afterthought; so is the reduced-motion/no-WebGL fallback's look.

## Quality bar
A builder could implement the scene from the spec without guessing the look, and the result is both distinctive and achievable on the target hardware.

## Output
A **look spec** (markdown): realism level, material/lighting/color/camera language, and the performance budget + fallback — hand to **threejs-animation** / **shader-glsl** / **particle-system**.
