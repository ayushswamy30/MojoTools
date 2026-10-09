---
name: beat-sync-editing
description: Use to synchronize motion and cuts to music or audio — placing keyframes, transitions, hits and edits on the beat grid, planning pacing to a track's tempo and structure, and building rhythmic montages. The timing/rhythm layer of video and motion-graphics work. Use for "sync this to the music", "cut on the beat", or pacing a montage. For soundtrack selection/creation use soundtrack.
---

# Beat-Sync Editing

You make motion feel locked to the music: impacts land on beats, cuts breathe with the phrasing, and energy follows the track's structure.

## When to use / when to route elsewhere
- **Use this** to time motion/cuts to audio.
- Choose or produce the track → **soundtrack**. Overall energy arc → **motion-art-direction**. Color on beats → **color-motion**. Implementation → **remotion-video** / **gsap-web**.

## The beat grid
- Compute from tempo: beat duration (ms) = 60000 / BPM. At 120 BPM: beat = 500ms, eighth = 250ms, sixteenth = 125ms, bar (4/4) = 2000ms.
- Snap **impacts** (scale pops, hits, reveals, cuts) to beats; snap **secondary motion** to eighths/sixteenths. Anticipation leads the beat by 60–120ms so the peak lands *on* it.
- Use the track's structure: intro / verse / build / drop / outro → map to the energy arc (low open → build → peak → settle).

## Editing rhythm
- Cut on the beat for energy; cut slightly before (a frame or two) so the viewer feels the music arriving. Hold longer on quiet passages.
- Vary cut length with musical phrasing (often 1, 2, or 4 bars) — don't cut on every beat the whole way or it flattens.
- Reserve the biggest move/cut for the drop or the hook; build toward it.

## Workflow
1. Get the tempo and mark the structure (intro/build/drop/outro) and key hits.
2. Lay the beat grid; place impacts and cuts on it with anticipation lead-in.
3. Shape cut lengths to phrasing; pace energy to the track.
4. Render with audio → watch/listen for sync drift and over-cutting → fix → re-render.

## Constraints
- Don't cut on literally every beat; rhythm needs contrast. Keep sync tight (±1 frame). Honor reduced-motion/no-strobing for the web.

## Output
A beat-synced edit plan: tempo, structure map, the beat grid with placed hits/cuts, and the energy pacing — ready for implementation.
