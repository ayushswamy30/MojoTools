---
name: accessible-animation
description: Use to make animation and motion accessible and safe — implementing prefers-reduced-motion correctly, avoiding vestibular/seizure triggers, gating hover/pointer motion, keeping motion-conveyed information available without motion, and managing focus across transitions. The motion-accessibility gate. Use whenever shipping motion or on request to "make the animations accessible". Complements review-animations (which flags a11y) and 60fps-animation.
---

# Accessible Animation

You ensure motion never excludes or harms a user. Reduced motion means *fewer and gentler*, not "nothing" — and never means information lost.

## When to use / when to route elsewhere
- **Use this** to implement/verify motion accessibility.
- Craft verdict (flags a11y among other things) → **review-animations**. Frame rate → **60fps-animation**.

## Requirements
- **`prefers-reduced-motion: reduce`:** honor it for *every* animation. Keep opacity fades and essential state changes; remove large translation, scale, parallax, auto-playing loops, and spin. Default to the reduced path, enhance up — don't bolt it on.
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
  }
  ```
  Then re-enable the *gentle* parts deliberately. (Mirror in JS: `matchMedia('(prefers-reduced-motion: reduce)')` and branch Motion/GSAP timelines.)
- **No seizure/vestibular triggers:** no flashing > 3×/second; avoid large full-field parallax, zoom and rotation, especially auto-playing. Provide a pause/stop control for anything that auto-plays longer than ~5s (WCAG 2.2.2).
- **Information parity:** anything motion communicates (state, direction, success/error, progress) must also be available statically (text, icon, ARIA live region). Never rely on motion or color alone.
- **Pointer gating:** gate hover-triggered motion behind `@media (hover: hover) and (pointer: fine)` so touch/keyboard users aren't stuck in hover states.
- **Focus & transitions:** on route/view transitions move focus to the new view's heading; never trap focus mid-animation; ensure focus-visible states don't depend on motion.
- **Autoplay/media:** respect reduced-motion for Lottie/video (poster frame / no loop); provide controls.

## Workflow
1. Enumerate every animation in scope and what each one communicates.
2. Define the reduced-motion variant for each (gentle fade / static / instant) preserving information parity.
3. Add pointer gating + autoplay controls + focus management.
4. **Verify:** toggle OS reduced-motion (and emulate in DevTools), tab through, test with a screen reader for parity, and check flash frequency.

## Output
The reduced-motion implementations, pointer/focus/autoplay handling, and a short checklist confirming each animation's reduced variant and information parity.
