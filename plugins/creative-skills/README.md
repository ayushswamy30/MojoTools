# creative-skills

48 global creative skills for Claude Code — design/UI, motion/animation, video/motion-graphics, and 3D/WebGL/illustration — organized as an intelligent **direction → construction → QA** hierarchy so they complement rather than fight each other.

## Install

```bash
# register this repo as a marketplace (one time)
claude plugin marketplace add ayushswamy30/MojoTools
# install all 48 skills at once
claude plugin install creative-skills@mojotools-creative
```

Inside a session you can also run `/plugin marketplace add ayushswamy30/MojoTools` then `/plugin` to install from the panel.

Once installed, the skills are available **globally in every project and session** on that machine. They auto-trigger when your request matches a skill's description, or you can invoke one explicitly as `/creative-skills:<skill-name>` (e.g. `/creative-skills:frontend-design`).

## What's inside (by group)

- **Design / UI:** design-system, frontend-design, impeccable, canvas-design, algorithmic-art, visual-art-direction, theme-factory, web-artifacts-builder, tone-of-voice, apple-hig, tweak
- **Motion / Animation:** motion-art-direction, animation-principles, shot-composition, color-motion, beat-sync-editing, animate, review-animations, improve-animations, find-animation-opportunities, logo-animation, motion-background, gsap-web, micro-interaction, svg-animation, lottie-animation, 60fps-animation, accessible-animation, page-transition-animation, kinetic-typography
- **Video / Motion graphics:** remotion-video, remotion-best-practices, explainer-video, short-form-video, ad-creative-video, product-demo-video, audiogram, presentation-video, diagram-animation, whiteboard-animation, javascript-animation, soundtrack, lower-thirds
- **3D / WebGL / Illustration:** threejs-animation, shader-glsl, particle-system, generative-illustration, webgl-art-direction

## Hierarchy

- `visual-art-direction` / `motion-art-direction` / `webgl-art-direction` decide the aesthetic/motion/3D direction first.
- `frontend-design` constructs UI; `design-system` / `theme-factory` handle tokens/themes.
- `animate` builds individual animations; implementation skills (gsap-web, svg/lottie, etc.) do the hands-on work.
- `impeccable` polishes UI; `review-animations` / `improve-animations` QA motion; `60fps-animation` / `accessible-animation` are quality gates.
- `remotion-video` builds programmatic video; the video-type skills storyboard and pace it.

Every skill prefers existing project design tokens, components and conventions, avoids generic AI-design clichés, ships `prefers-reduced-motion` + accessibility, and uses render → inspect → fix loops for visual/video work.
