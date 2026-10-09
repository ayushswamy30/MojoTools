---
name: audiogram
description: Use to create audiograms — short shareable videos of audio (podcast clips, quotes, music snippets) with an animated waveform, synced captions/transcript, cover art and branding. The audio-to-video skill. Use for "turn this podcast clip into a video", "waveform video", "audiogram". Implement in remotion-video; for music-visual beat work use beat-sync-editing; for captions styling use lower-thirds.
---

# Audiogram

You turn audio into a watchable, shareable clip: a reactive waveform, clean synced captions, and brand framing — legible and loopable in a muted feed.

## When to use / when to route elsewhere
- **Use this** for waveform/transcript audio clips.
- Build/render → **remotion-video**. Music-driven visual sync → **beat-sync-editing**. Caption/name bar styling → **lower-thirds**. Track selection → **soundtrack**.

## Composition
- **Format:** 1:1 (1080×1080) or 9:16 for feeds; 16:9 for YouTube. Keep captions and waveform in the safe zone.
- **Waveform:** derive bars/line from the real audio amplitude (precompute frequency/amplitude data per frame; in Remotion use `@remotion/media-utils` `visualizeAudio`/`useAudioData`). Bars react to the actual audio, not fake motion. Keep it subtle and on-brand — it frames the audio, it isn't the show.
- **Captions:** auto-transcribe then correct; display word- or line-synced, large and legible with contrast; this is what people actually read.
- **Framing:** cover art / guest photo / episode title / logo; consistent brand template so a series looks unified.

## Workflow
1. Pick the clip (the most quotable 20–60s); trim to a clean in/out.
2. Generate + proof the transcript; time captions to audio.
3. Build the template (waveform + captions + brand) at the target ratio.
4. Wire the waveform to real audio data; sync captions.
5. **Render loop:** preview → check caption sync, waveform reactivity, legibility muted, audio clarity → fix → render.

## Constraints
- Waveform reacts to real amplitude. Captions accurate and synced. Legible muted. Honor safe zones. Reuse brand tokens. If exposing a reduced-motion/web version, provide a calm fallback.

## Quality bar
Reads fully sound-off via captions, the waveform clearly tracks the audio, and it matches the series' brand template.

## Output
The audiogram video (correct ratio), the corrected synced transcript, and a reusable template — via **remotion-video**.
