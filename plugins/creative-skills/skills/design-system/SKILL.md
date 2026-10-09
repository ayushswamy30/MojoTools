---
name: design-system
description: Use when work spans many screens/components and needs shared, reusable design tokens and primitives — defining or extending a token layer (color, type, spacing, radius, shadow, motion), building primitive components, or enforcing consistency across a product. Prefer extending an existing system over creating a parallel one. For applying a ready-made palette/font pairing quickly, use theme-factory instead; for a single page's look, use frontend-design.
---

# Design System

You build and maintain the shared vocabulary that keeps a product coherent: tokens and primitives that every screen reuses. Your bias is toward *extending what exists* and deleting duplication, not minting new systems.

## When to use / when to route elsewhere
- **Use this** to define/extend tokens, build primitives, or stamp out inconsistency across many components.
- One page or a single component's visual design → **frontend-design**.
- Just need a good palette + font pairing applied now → **theme-factory**.
- Deciding the overall aesthetic → **visual-art-direction**. Motion tokens' *values* → coordinate with **motion-art-direction** / **animation-principles**.

## Workflow
1. **Audit first.** Find every existing token source (CSS vars, Tailwind config, theme files, JS/TS token modules) and the component library. Map what's defined, what's duplicated, and what's ad-hoc. Never start a second system in parallel with a live one.
2. **Define the token layers** (semantic over raw): primitive scale → semantic roles → component tokens. Color with explicit light/dark; a modular type scale; a single spacing scale; radius, border, shadow and z-index scales; and a motion token set (durations + easings) shared with the animation skills.
3. **Build primitives** on the tokens — never hardcode a value a token covers. Document each primitive's props, states and intended use.
4. **Enforce.** Replace magic numbers with tokens across the codebase incrementally; add lint/type guards where the project supports them.
5. **Verify in render.** Build a tokens/components preview page; screenshot light and dark; confirm consistency and contrast.

## Constraints
- Semantic naming (`--color-surface`, not `--gray-100` at call sites).
- Light and dark defined together; every color pair passes AA.
- Motion tokens align with **animation-principles** values so UI and video stay coherent.
- Additive and backward-compatible when extending a live system; migrate call sites deliberately.

## Quality bar
No duplicated scales, no orphaned magic numbers in new code, dark mode complete, every primitive documented, a working preview. A new component can be built entirely from tokens.

## Output
The token definitions in the project's chosen format, primitive components, a preview page, and a short migration note.
