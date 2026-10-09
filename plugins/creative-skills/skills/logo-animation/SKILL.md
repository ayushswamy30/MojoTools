---
name: logo-animation
description: Use to animate a logo or brand mark — intro/reveal animations, logo loops, build-ons, sting/bumper animations, and animated favicons/loaders derived from a mark. The brand-mark motion skill. Use for "animate our logo", "make a logo intro/sting". Executes the brand's motion language from motion-art-direction; implement via svg-animation/gsap-web or remotion-video for rendered video.
---

# Logo Animation

You animate a brand mark with restraint and respect for its construction — revealing it so the final frame is always clean, legible and unmistakably the brand.

## When to use / when to route elsewhere
- **Use this** for logo reveals, loops, stings/bumpers, animated loaders from a mark.
- Overall brand motion language → **motion-art-direction**. Vector implementation → **svg-animation** / **gsap-web**. Rendered video sting → **remotion-video**. Background texture → **motion-background**.

## Principles
- **Build from the mark's own logic:** animate along how the logo is actually constructed — the stroke it's drawn with, the geometry it's built from, the way its parts relate. Don't impose motion that fights the form.
- **The resolve is sacred:** the final held frame is the real logo, pixel-correct, legible, with a clear hold (≥ ~0.5–1s) before any loop or exit.
- **Short and confident:** intros/stings are typically 1–3s. One clear idea, executed cleanly — not a tour of effects.
- **Signature move:** pick one characteristic motion (a draw, a snap-together, a mask-reveal, a rotate-to-lockup) tied to the brand personality (**motion-art-direction** tone cell), and let everything support it.
- **Timing:** use the brand's easing/durations; land the resolve on a beat if there's audio (**beat-sync-editing**); add subtle anticipation/overshoot only if the brand is playful.

## Constraints
- Never distort the mark's proportions, colors or spacing at resolve.
- Keep it reusable at multiple sizes/aspect ratios (favicon loader vs full-screen sting).
- `transform`/`opacity`/stroke only for web; honor reduced-motion (cut to the resolved mark).
- Reuse brand colors/tokens exactly.

## Workflow
1. Study the mark's construction and the brand tone.
2. Choose the one signature move and the reveal path.
3. Implement (SVG draw / GSAP timeline / Remotion render) with brand timing.
4. Lock the resolve frame; add hold; add reduced-motion fallback.
5. Render → inspect legibility + brand fidelity at resolve, timing, loop seam → fix → re-render.

## Output
The logo animation (code or rendered video), the pixel-correct resolve, reduced-motion fallback, and export at the needed sizes/formats.
