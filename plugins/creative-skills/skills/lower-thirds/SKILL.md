---
name: lower-thirds
description: Use to design and animate on-screen titles and overlays for video — lower-third name/title bars, captions and subtitle styling, callout labels, chapter/section titles, and bug/logo overlays — that are legible, on-brand and cleanly animated in and out. The video-titling/overlay skill. Use for "add a name bar / caption style / title to this video". Implement via remotion-video or svg/css; copy comes from tone-of-voice; brand from visual-art-direction.
---

# Lower Thirds & Overlays

You design the text that sits over footage — name bars, captions, callouts, titles — so it's instantly readable, on-brand, and animates in/out without stealing the shot.

## When to use / when to route elsewhere
- **Use this** for titles/captions/name-bars/overlays on video.
- Render → **remotion-video**. Expressive animated headlines → **kinetic-typography**. Copy wording → **tone-of-voice**. Brand look → **visual-art-direction**/**theme-factory**.

## Design rules
- **Legibility over footage:** guarantee contrast against moving, varied backgrounds — use a solid/gradient bar, a scrim, or a text stroke/shadow. Never rely on footage staying dark.
- **Placement & safe areas:** lower-thirds sit in the lower ~⅓ inside the action-safe margin and clear of platform UI (bottom ~20% on vertical). Captions centered-low and within safe zones.
- **Hierarchy:** name (primary) larger/bolder than title/role (secondary); one accent for the brand bar/rule.
- **Brand:** reuse brand type, colors and the product's tokens; a series uses one consistent template.

## Animation
- **In/out:** quick, clean entrance (slide + fade or mask-reveal, ~250–400ms, ease-out) and a matching exit (faster, ease-in path reversed). Hold long enough to read (≈0.3s + 0.08s/word).
- **Don't over-animate:** the overlay supports the person/footage; one signature move, reused. Captions pop/karaoke-style only when that's the format (short-form).
- Mask/clip reveals (overflow) rather than animating layout; `transform`/`opacity` only.

## Workflow
1. Content + hierarchy (name/title, caption text) — wording via **tone-of-voice**.
2. Design the bar/caption to brand with guaranteed contrast (bar/scrim/stroke).
3. Animate in/out with one reusable move; set a readable hold.
4. Build a reusable template/component (data-driven for series).
5. **Render loop:** place over the actual footage (brightest + busiest frames) → check contrast, safe area, hold, timing → fix → re-render.

## Constraints
- Readable over any frame it appears on; inside safe areas; consistent template; reduced-motion → static (fade only). Correct names/spelling.

## Output
The lower-third/caption/title component (reusable, brand-tokened) with in/out animation and a legibility check over real footage — via **remotion-video**.
