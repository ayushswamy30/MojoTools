---
name: particle-system
description: Use to build particle systems — emitters, forces/physics, flow fields, GPU/FBO particle simulations, interactive particle effects, point clouds, and large-count particle art for web (canvas or WebGL/Three.js). The particle-simulation skill. Use for "particle effect/system", "point cloud", "flow-field particles". For GPU math use shader-glsl; for scene integration use threejs-animation; for seeded generative art use algorithmic-art.
---

# Particle System

You design particle systems that are expressive and scale without melting the GPU — emission, forces and life handled correctly, and the count-vs-technique call made deliberately.

## When to use / when to route elsewhere
- **Use this** for emitters/forces/flow-fields/GPU particle sims/point clouds.
- GPU simulation math (FBO/ping-pong, compute via fragment) → author with **shader-glsl**. Scene/camera integration → **threejs-animation**. Seeded, reproducible generative *artwork* → **algorithmic-art**. Subtle ambient drift only → **motion-background**.

## Model
- **Lifecycle:** emit (rate/burst, spawn shape) → update (velocity, forces, age) → render → recycle/kill at end of life. Use a **pool** (fixed-size reusable buffer), never allocate per particle per frame.
- **Forces:** gravity, drag, curl/flow-field (sample a noise field for organic motion), attractors/repulsors, mouse interaction. Integrate with delta time.
- **Appearance:** size/opacity/color over life (fade in and out — no popping); additive blending for light/energy looks; textured sprites for softness.

## Count vs technique (choose by scale)
- **≤ ~1–2k:** canvas 2D or Three.js `Points` with CPU update is fine.
- **~2k–100k+:** `THREE.Points`/instanced with updates in a shader, or a **GPU/FBO simulation** (positions/velocities in float textures, updated by fragment shaders, ping-pong buffers) — route the sim math to **shader-glsl**.
- Don't brute-force huge counts on the CPU; cap DPR; cull offscreen.

## Constraints
- Pool and reuse; zero per-frame allocation in the hot loop. Pause when offscreen/tab-hidden.
- `prefers-reduced-motion`: reduce count/motion or show a calm static state. Fallback for no-WebGL. Keep to the frame budget (**60fps-animation**).
- Seed any randomness you need reproducible.

## Workflow
1. Pick the look + target count → choose CPU vs GPU technique.
2. Build emitter + lifecycle with a pool; add forces (incl. flow field) with delta integration.
3. Appearance over life (size/opacity/color, blending); interaction if any.
4. Reduced-motion + fallback + offscreen pause.
5. **Render loop:** run → profile FPS at target count (throttled), check for popping/leaks/overdraw → tune count/forces → re-run.

## Output
The particle system (emitter/update/render + pool, forces, appearance), the chosen technique rationale, reduced-motion + fallback, within budget.
