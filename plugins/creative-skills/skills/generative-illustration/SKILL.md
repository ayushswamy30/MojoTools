---
name: generative-illustration
description: Use to create illustrative/figurative generative artwork with code — characters, scenes, landscapes, decorative motifs, patterns, avatars and illustration systems generated procedurally (often SVG or canvas) with controllable style and variation. The generative-illustration skill. Use for "generate illustrations/avatars/patterns", procedural illustration systems. For abstract process-driven art use algorithmic-art; for static composed posters use canvas-design.
---

# Generative Illustration

You build systems that generate illustration — figurative or decorative artwork with a consistent, art-directed style and meaningful variation, not random noise.

## When to use / when to route elsewhere
- **Use this** for procedural illustration/avatars/patterns/scenes with a designed style.
- Abstract, process-as-subject art → **algorithmic-art**. One finished composed static piece → **canvas-design**. Real-time GPU art → **shader-glsl**/**particle-system**. Overall aesthetic → **visual-art-direction** first.

## Approach
- **Style first (art direction):** define the illustration style like a system — shape language (geometric/organic), line vs fill, palette (limited, with roles), proportion rules, level of detail, and the "grammar" of parts (how a face/tree/building is assembled). Get the direction from **visual-art-direction**.
- **Parameterize the grammar:** express the drawable elements as composable parts with parameters (counts, proportions, palette picks, pose/variation axes). Variation comes from the parameter space, constrained so *every* output is on-style — not from unconstrained randomness.
- **Seeded & reproducible:** seed randomness so a given seed/params reproduce the same illustration (so good ones can be kept/regenerated).
- **Medium:** SVG for crisp scalable vector illustration (preferred for avatars/patterns/icons); canvas/WebGL for painterly/dense/large-count work.
- **Tileable patterns:** build patterns seamless (wrap edges) and layer motifs with hierarchy.

## Constraints
- Original style, not an imitation of a specific artist. Constrain the space so bad outputs are rare — the *system* must be good, not one lucky seed.
- Reuse the project palette/tokens for brand-consistent illustration. Keep SVGs optimized. If animated, hand to **svg-animation**.

## Workflow
1. Art-direct the style (shape language, palette, grammar of parts).
2. Build the parameterized generator (parts + constraints + seed).
3. Generate a grid of seeds/params; curate; tighten constraints so most outputs are strong.
4. Export (optimized SVG/PNG) or expose controls.
5. **Render loop:** generate many → inspect the range for off-style/ugly outputs → constrain → regenerate until the system is reliable.

## Output
The generator (parameterized, seeded) + a curated sample grid + exports, with a short note on the style grammar and parameter space.
