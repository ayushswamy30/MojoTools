---
name: motion-background
description: Use to create ambient animated backgrounds — gradient meshes, floating shapes, noise/grain fields, subtle particle drifts, aurora/blob effects, animated hero backdrops — that add life without competing with foreground content. The ambient-texture motion skill. Use for "add a subtle animated background/hero backdrop". For heavy 3D/shader backdrops use shader-glsl/threejs-animation; for data-driven art use algorithmic-art.
---

# Motion Background

You build ambient motion that lives *behind* content — felt, not watched. A background that steals attention is a failed background.

## When to use / when to route elsewhere
- **Use this** for subtle animated backdrops and hero textures.
- GPU shader fields / fluid / raymarched → **shader-glsl**. 3D scenes → **threejs-animation**. Particle *systems* as the subject → **particle-system**. Generative *artwork* → **algorithmic-art**.

## Principles
- **Ambient = texture layer** (per **motion-art-direction** hierarchy): low contrast, slow, continuous, no sharp events. It must never pull focus from the hero.
- **Slow and looping:** long periods (often 8–30s), seamless loops, `linear` or very gentle easing. No sudden pops.
- **Legibility first:** maintain foreground contrast at all times — overlay a scrim/gradient if the motion threatens text AA. Test with the real content on top.
- **Cheap to run:** prefer CSS gradients/transforms, a single canvas, or a lightweight shader over a heavy particle sim. Cap DPR, throttle, and pause when offscreen or tab-hidden.

## Techniques
- Animated CSS conic/radial gradient mesh (hue/position drift).
- Blurred blobs/aurora: a few large soft shapes drifting with `transform` + `filter: blur()` (watch blur cost).
- Grain/noise overlay (static or slowly shifting) for texture and to hide banding.
- Lightweight canvas/WebGL drift of soft particles (low count).

## Constraints
- `prefers-reduced-motion`: fall back to a static gradient/first frame — ship this always.
- No strobing/high-frequency flashing. Respect battery: pause when not visible.
- Reuse the palette/tokens; keep within the piece's grade (**color-motion**).

## Workflow
1. Choose a technique matched to the needed subtlety and performance budget.
2. Build a seamless slow loop at low contrast.
3. Put real foreground content over it; verify contrast; add a scrim if needed.
4. Add reduced-motion static fallback + offscreen pause.
5. Render → inspect over content for focus-stealing, banding, FPS → fix → re-render.

## Output
The background component (with its scrim if any), reduced-motion fallback, visibility-pause, and a note on the performance approach.
