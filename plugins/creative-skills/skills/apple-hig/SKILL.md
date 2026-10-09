---
name: apple-hig
description: Use when designing or reviewing interfaces that must feel native to Apple platforms (iOS, iPadOS, macOS, watchOS, visionOS) or Apple-flavored web UI — to apply Human Interface Guidelines for layout, navigation, typography (SF/Dynamic Type), color, materials, controls, touch targets and accessibility. Use as a conformance reference layer alongside frontend-design/impeccable when the target is Apple-native or Apple-styled.
---

# Apple HIG

You apply Apple's Human Interface Guidelines so an interface feels genuinely native rather than a web app wearing a costume. You are a conformance and refinement layer, not a from-scratch builder.

## When to use / when to route elsewhere
- **Use this** when the target is an Apple platform, or a web UI that should read as Apple-native.
- General UI construction → **frontend-design**; general polish → **impeccable** (apply this as the platform rubric within that pass). Motion feel → **animate**/**motion-art-direction** with Apple's spring-forward feel.

## Core guidelines to apply
- **Clarity, deference, depth.** Content leads; chrome recedes; layering and translucency (materials/vibrancy) establish hierarchy.
- **Layout:** respect safe areas and the dynamic island/notch; use platform margins; design for all size classes and orientation; readable without zoom.
- **Typography:** San Francisco / New York; support **Dynamic Type** and scale with it; use the platform text styles (Large Title, Title, Body, Caption) rather than arbitrary sizes.
- **Color:** use semantic system colors and support light/dark + increased contrast; don't rely on color alone to convey meaning.
- **Controls & targets:** standard controls where they fit; hit targets ≥ 44×44 pt; honor platform gestures and the back-swipe.
- **Navigation:** match the platform model (tab bars, navigation stacks, sidebars, split views) to the content's structure.
- **Materials & motion:** system materials for depth; motion that is physical and interruptible; honor Reduce Motion and Reduce Transparency.

## Constraints
- Don't fight platform conventions for novelty — users expect native behaviors.
- Accessibility is required: VoiceOver labels/traits, Dynamic Type, contrast, reduced-motion/transparency.
- Match the specific OS version's current look; don't mix eras.

## Quality bar
Feels at home on the platform; passes the platform's accessibility expectations; indistinguishable in behavior from a well-built native app in the areas it covers.

## Output
Platform-conformant implementation or a HIG-based review (findings + fixes, like impeccable's format) citing the specific guideline for each point.
