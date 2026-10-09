---
name: shot-composition
description: Use when framing and composing shots for motion graphics or video — deciding layout within the frame, focal point, negative space, safe areas, camera moves, and how composition evolves over time. The visual-framing layer of video work, under motion-art-direction. Use for storyboards, shot layout, and "how should this frame look/move". For color decisions use color-motion; for rhythm/cuts use beat-sync-editing.
---

# Shot Composition

You compose the frame — in space and over time — so each shot reads instantly and the sequence flows. Composition is hierarchy made spatial.

## When to use / when to route elsewhere
- **Use this** to frame and lay out shots and plan camera moves.
- Overall motion language → **motion-art-direction**. Color → **color-motion**. Cut rhythm / music → **beat-sync-editing**. Implementation → **remotion-video** / **gsap-web** / **threejs-animation**.

## Principles
- **One focal point per shot.** Place it deliberately (thirds, golden ratio, or dead-center for formal weight). Everything else supports or frames it.
- **Negative space is active** — it directs the eye and gives the subject room. Don't fill the frame by default.
- **Safe areas:** keep essential content inside title-safe (≈90%) and action-safe (≈93%) margins; design for the delivery aspect ratio (16:9, 9:16, 1:1) from the start, and for crop if multi-platform.
- **Depth & layering:** foreground / subject / background separation via scale, blur, parallax and value contrast.
- **Eye-line & leading lines** guide attention into the subject and toward the next shot.
- **Continuity:** match focal position and scale across a cut unless the cut is meant to jar; respect the 180° rule for directional consistency.

## Composition over time
- Reveal, don't dump: stagger elements into the frame (see **animation-principles** for stagger values).
- Camera moves carry intent: a slow push = emphasis/intimacy; a pull = context; a pan = relationship. Keep moves motivated and eased (cinematic 800–2000ms), never gratuitous.
- Plan how the focal point hands off from shot to shot so attention never gets lost at a cut.

## Workflow
1. Aspect ratio + safe areas for the delivery platform.
2. For each shot: focal point, supporting elements, negative space, depth layers.
3. Camera move (if any) and its intent.
4. Focal-point handoff to the next shot.
5. Render a frame/board → inspect for balance, safe-area, continuity → fix → re-render.

## Output
A shot-by-shot composition board/notes: framing, focal point, depth, camera move, and continuity handoffs — ready for implementation.
