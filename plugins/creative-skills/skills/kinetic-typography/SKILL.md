---
name: kinetic-typography
description: Use to animate text expressively — animated headlines, word/line/character reveals, text that moves with meaning, lyric/caption animation, variable-font animation, and type-driven motion graphics. The animated-typography skill. Use for "animate this headline/text", kinetic type sequences. Timing from animation-principles; language from motion-art-direction; for rendered video use remotion-video.
---

# Kinetic Typography

You animate type so the motion amplifies the meaning of the words — rhythm, emphasis and pacing that a reader *feels* — while the text stays readable.

## When to use / when to route elsewhere
- **Use this** to animate text/headlines/lyrics/captions expressively.
- Rendered video type → **remotion-video**. General UI motion → **animate**. Overall language → **motion-art-direction**. Beat sync for lyrics → **beat-sync-editing**.

## Principles
- **Readability is the floor:** never animate text the user is actively reading mid-read; reveal it, then let it rest. Hold long enough to read (rough rule: ~0.3s + ~0.08s/word of hold).
- **Unit of reveal carries meaning:** per-character for playful/mechanical energy; per-word for emphasis and pacing; per-line for calm, editorial reading. Choose deliberately.
- **Stagger is the rhythm:** stagger words/lines (40–80ms) and characters (20–40ms) per **animation-principles**; vary stagger to create emphasis (slow in on the key word).
- **Motion matches the word:** heavy words land heavy, light words float — use weight, scale, blur and overshoot to echo meaning, sparingly.
- **Variable fonts:** animate `font-variation-settings` (weight/width/optical size) for smooth, expressive transitions where the font supports it.

## Rules
- Animate `transform`/`opacity` (and `font-variation-settings`); clip reveals with a mask/overflow rather than animating layout.
- Keep line breaks intentional and stable; don't reflow mid-animation.
- One emphatic idea per sequence; the hero word gets the signature move.

## Constraints
- `prefers-reduced-motion`: show the text set, no movement (fade at most) — ship this. Ensure the final state is selectable/accessible real text, not just an image. Maintain contrast throughout.

## Workflow
1. Read the copy; decide the reveal unit and which word is the hero.
2. Set type (sizes, line breaks); choose stagger + curve from the plan.
3. Implement with transform/opacity (+ variable-font axes) and masked reveals.
4. Add reduced-motion fallback; confirm real-text accessibility.
5. Render → read it at speed → inspect readability, rhythm, emphasis, reflow → fix → re-render.

## Output
The kinetic type sequence (code or rendered), reduced-motion fallback, with a note on reveal unit + hero word.
