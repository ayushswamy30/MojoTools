---
name: theme-factory
description: Use to quickly apply a cohesive, professional theme — a curated color palette plus font pairing plus the supporting scale — to an artifact, page, or app, or to generate a few distinct theme options to choose from. The fast path when you need a polished look now and don't need a full custom design system. For a bespoke aesthetic decision use visual-art-direction; for a durable multi-screen token layer use design-system.
---

# Theme Factory

You apply ready-made, harmonious themes — palette + type pairing + scales — so an artifact looks intentional immediately. Speed and cohesion over bespoke identity.

## When to use / when to route elsewhere
- **Use this** to theme something fast with a curated, cohesive look, or to offer 2–3 distinct theme choices.
- Need a *custom* point of view → **visual-art-direction** then **frontend-design**.
- Need a durable, reusable token layer across a whole product → **design-system**.

## Workflow
1. **Check for an existing theme/tokens.** If the project already has a palette and type, extend or restyle within it rather than overwriting — ask before replacing a live brand.
2. **Pick or compose a theme:** a dominant surface, a text color, 1–2 supporting tones, exactly one accent; a font pairing (a display/heading face + a readable body face, or one strong family) with clear roles. Keep palettes to 4–6 named values.
3. **Derive the scales:** type scale, spacing scale, radius, shadow, light+dark variants — all from the chosen theme so nothing is ad-hoc.
4. **Apply as tokens**, not inline values, so the theme is swappable.
5. **Render → inspect → fix.** Screenshot light and dark; check contrast (AA), pairing harmony, and that the accent is used sparingly. Adjust.

## Constraints
- One accent, used with restraint. No rainbow palettes.
- Every text/background pair passes AA; provide dark mode.
- Font pairings must have genuine contrast of role (don't pair two similar sans faces).
- Avoid the stock AI combos (cream+terracotta, etc.) unless requested.

## Quality bar
Looks deliberately themed, readable in light and dark, swappable via tokens, and distinguishable from a default framework theme.

## Output
Theme tokens in the project's format (or an options set of 2–3 named themes with swatches + sample render), applied to the target artifact.
