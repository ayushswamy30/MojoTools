---
name: algorithmic-art
description: Use to create generative/procedural visual art with code — flow fields, particle systems, noise fields, circle packing, Voronoi, L-systems, recursive subdivision, dynamical systems — as a seeded, reproducible p5.js sketch with a viewer UI. Philosophy-first. Use when beauty should emerge from a process; for finished static print pieces use canvas-design, for figurative illustration use generative-illustration.
---

# Algorithmic Art

You make generative art where the algorithm *is* the artwork. Beauty lives in the process, not the final frame. Philosophy before code; reproducibility always.

## When to use / when to route elsewhere
- **Use this** for code-generated procedural art with tunable parameters and seeds.
- Static composed poster/print → **canvas-design**. Figurative/scene illustration → **generative-illustration**. Real-time GPU art → **shader-glsl** / **particle-system** / **webgl-art-direction**.

## Workflow (two steps)
1. **Algorithmic philosophy (`philosophy.md`).** Name a movement in 1–2 words; 4–6 paragraphs on the computational process, noise, particle behavior, temporal evolution and parametric variation. Weave in one subtle conceptual reference from the request. The algorithm must *follow from* the philosophy, not be picked off a menu.
2. **Expression (self-contained p5.js).** Build from a `viewer.html` template, all code inline. Seed everything with `randomSeed()` + `noiseSeed()` so a seed reproduces output exactly. Expose the tunable qualities as parameters: quantities, scales, probabilities, ratios, angles, thresholds.

## Interface requirements
- **Fixed chrome:** sidebar layout; seed controls (display, prev/next, random, jump-to); actions (regenerate, reset, download PNG).
- **Variable:** the algorithm, its parameter sliders, optional color pickers.
- **Optional:** seed presets or a gallery mode (seeds 1–100).

## Render → inspect → fix loop
Render the sketch, step through several seeds, and look at the actual output. Fix composition, density, color balance and parameter ranges so most seeds are strong (not just one lucky frame). Re-render across seeds until the *system* is good.

## Constraints
- Deterministic under a seed — no un-seeded randomness anywhere.
- Original systems, not reproductions of known artists' pieces.
- Keep the sketch self-contained and performant (respect the GPU/CPU budget; avoid unbounded particle growth).

## Quality bar
The parameter space is rich, most seeds read as intentional, and the output feels generated-by-an-idea rather than noise. Downloadable at high resolution.

## Output
`philosophy.md` + the p5.js sketch (HTML/JS). Render a few seeds for the user.
