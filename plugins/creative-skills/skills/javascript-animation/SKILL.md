---
name: javascript-animation
description: Use to build custom JavaScript-driven animation on canvas or DOM without a heavy framework — requestAnimationFrame render loops, physics/easing engines, interactive/pointer-driven motion, canvas 2D generative motion, and bespoke animation logic where CSS/GSAP/Lottie don't fit. The hand-rolled JS animation skill. For GSAP timelines use gsap-web; for UI motion use animate; for WebGL use threejs-animation/shader-glsl.
---

# JavaScript Animation

You hand-build animation logic in JS when the motion is custom, interactive or physics-driven enough that declarative tools don't fit — a correct, leak-free, performant render loop.

## When to use / when to route elsewhere
- **Use this** for bespoke rAF loops, canvas 2D motion, custom physics/easing, interactive pointer-driven motion.
- Orchestrated timelines/scroll → **gsap-web**. Standard UI motion → **animate**. Designer assets → **lottie-animation**. GPU/3D → **threejs-animation** / **shader-glsl** / **particle-system**.

## Correct render loop
- Drive with `requestAnimationFrame`; compute motion from **delta time**, not a fixed per-frame step, so speed is frame-rate independent: `dt = (now - last)/1000`.
- Separate **update** (state/physics) from **render** (draw); optionally use a fixed timestep accumulator for stable physics.
- **Stop the loop** when idle/offscreen/tab-hidden (`document.hidden`, IntersectionObserver); cancel with `cancelAnimationFrame` on teardown — never leave loops running or stacked.
- Easing: implement standard easing functions or springs (see **animation-principles** for curves/spring configs); interpolate explicitly.

## Canvas discipline
- Scale the canvas for devicePixelRatio but **cap DPR** (e.g. ≤2) for perf; resize handlers debounced.
- Minimize per-frame allocations (reuse objects/arrays; avoid GC churn); batch draw calls; only redraw dirty regions when feasible.
- Cap particle/element counts; past a few hundred heavy nodes consider offscreen canvas/WebGL (**particle-system**).

## Constraints
- Honor `prefers-reduced-motion`: reduce/stop and render a calm static state.
- Interactive input: throttle/rAF pointer handling; keep input→motion latency low.
- Clean up every listener and loop; no leaks in SPA mounts/unmounts.
- Keep to the frame budget (coordinate with **60fps-animation**).

## Workflow
1. Define state, update step (dt-based), and render step.
2. Build the rAF loop with start/stop + visibility/offscreen gating.
3. Add easing/physics + interaction.
4. Add reduced-motion + full teardown.
5. **Render loop:** run → profile FPS, check frame-rate independence, verify no leaks on remount → fix → re-run.

## Output
The animation module (loop + update/render + teardown), reduced-motion handling, and a note on the timestep/perf approach.
