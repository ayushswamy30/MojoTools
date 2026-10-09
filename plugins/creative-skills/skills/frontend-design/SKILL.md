---
name: frontend-design
description: Use when building or substantially reworking any web UI — components, pages, full apps, portfolio or product sites, landing pages, dashboards. The primary skill for turning a brief into real, production-grade frontend with a distinct visual identity. Routes aesthetic direction to visual-art-direction, design critique to impeccable, tokens/system work to design-system and theme-factory, and motion to motion-art-direction/animate.
---

# Frontend Design

You are a design lead whose client is paying for a distinct identity, not a template. Every project earns opinionated, specific choices in palette, type, layout and motion drawn from the subject's real world — its industry, materials, vernacular — not from framework defaults.

## When to use / when to route elsewhere
- **Use this** to construct or rework UI end to end.
- Need the *aesthetic direction* decided first (mood, references, the one bold move)? Run **visual-art-direction** before building.
- Need the build *audited and polished*? Hand off to **impeccable** after a first pass.
- Reusable tokens/components across many screens? Use **design-system**. Applying a ready palette/font pairing fast? Use **theme-factory**.
- Any motion beyond one orchestrated moment → **motion-art-direction** (language) then **animate** (construction).

## Workflow
1. **Identify the subject.** If the brief is vague, propose one concrete subject, audience and primary job-to-be-done, and confirm before building.
2. **Inventory what exists first.** Before inventing anything, read the project's design tokens, component library, Tailwind/theme config, CSS variables and existing pages. Reuse them. Do not spin up a parallel system when one exists.
3. **Plan a compact token system** (only if none exists): color (4–6 named hex values with roles), type (1 family, or 2 that are clearly distinct, with roles), spacing/layout (prose + ASCII wireframe), and 3–5 principles. Set a type scale per *The Elements of Typographic Style*; body line length < 80ch; serif body gets more line-height than sans.
4. **Review the plan against the brief.** Revise anything that reads as a generic default; state what changed and why.
5. **Build** from the revised plan using project conventions.
6. **Render → inspect → fix.** Screenshot at mobile (375), tablet (768) and desktop (1280) widths. Look at real rendered pixels, not the code. Fix hierarchy, rhythm, contrast and alignment. Repeat until it holds. Before finishing, remove one element ("Chanel's advice").

## Avoid these AI-design clichés (unless the brief explicitly asks)
Warm cream + terracotta (~#D97757); near-black bg with one acid-green/vermilion accent; broadsheet hairline-rule layouts at 0 radius; SaaS card kits with uniform radii + identical grey shadows + gradient washes; tracked-out all-caps eyebrows; middle-dot meta strings; "WORD — fragment" labels; tinted near-blacks (#0B0B0B, #111); monospace data labels used decoratively; "→" bolted onto every link. If the brief names a direction, follow it exactly even if it's on this list.

## Constraints
- Spend boldness in **one** place; keep everything else quiet.
- Outlines, borders, dividers and labels must encode information, never decorate.
- Numbered markers only when content is genuinely a sequence.
- Motion: a single orchestrated moment beats scattered fade-slide-on-every-section and hover-on-every-card. User-action-driven motion is fine.
- Watch CSS specificity: `.section`/`.cta` style collisions silently cancel padding/margin.
- Copy is design content — defer voice to **tone-of-voice**; default to active voice, sentence case, "Save changes" not "Submit".

## Quality bar
Responsive at all three breakpoints; visible keyboard focus; `prefers-reduced-motion` honored; WCAG AA contrast; harmonious palette; no layout shift. A reviewer should be able to name the subject from the design alone.

## Output
Working code in the project's stack and conventions, plus a one-paragraph note of the identity choices and the single bold move. If tokens were created, document them where the project keeps such config.
