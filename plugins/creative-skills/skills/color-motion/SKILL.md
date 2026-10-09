---
name: color-motion
description: Use to direct color in motion work — building a palette for an animated piece or video, planning how color evolves over time (grade, transitions, accent reveals), and keeping color consistent and legible across shots. The color layer of motion/video, under motion-art-direction. Use for "what colors should this animation use" and "how should color change over the timeline". For static palettes use theme-factory/visual-art-direction.
---

# Color in Motion

You direct color as it lives over time: a coherent palette, a deliberate grade, and transitions that carry meaning and energy without breaking legibility.

## When to use / when to route elsewhere
- **Use this** for palette + color-over-time in animation/video.
- Static UI/brand palette → **theme-factory** / **visual-art-direction**. Framing → **shot-composition**. Overall motion language → **motion-art-direction**.

## Palette for motion
- Pick a dominant, 1–2 supporting tones, and exactly one accent reserved for the moment that matters. Define values for both light and dark backgrounds if the piece inverts.
- Set a **grade/mood**: warm vs cool bias, contrast level, saturation ceiling. Commit to one; drifting grade between shots is a top cause of incoherence.
- Ensure text/subject contrast holds against every background the subject sits on (AA for any readable text).

## Color over time
- **Transitions:** color can carry a cut — a cross-grade, a hue shift on a beat, a desaturate-to-recolor reveal. Tie color changes to narrative beats, not decoration.
- **Accent reveals:** introduce the accent only at the peak/wow moment so it reads as special.
- **Energy via color:** rising saturation/contrast builds energy; cooling/desaturating settles. Map the color arc to the **motion-art-direction** energy arc.
- **Consistency:** the same semantic thing keeps the same color across shots; sync color-change timing to the beat grid where music is present (**beat-sync-editing**).

## Workflow
1. Palette (dominant/supporting/accent) + grade.
2. Map color to the energy arc and narrative beats.
3. Define transition color behavior and the accent-reveal moment.
4. Render representative frames → inspect contrast, grade consistency, accent restraint → fix → re-render.

## Constraints
- One accent, revealed late. One grade. Contrast never sacrificed for mood on readable content. Honor reduced-motion (don't rely on fast color flashing; no strobing).

## Output
A color spec for the piece: palette with roles, the grade, the color arc over the timeline, transition behavior, and the accent-reveal moment.
