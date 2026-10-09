---
name: diagram-animation
description: Use to animate diagrams, data and technical figures — flowcharts, architecture/system diagrams, graphs and charts revealing over time, process/sequence flows, data transitions, and animated schematics that build understanding step by step. The animated-figure skill. Use for "animate this diagram/chart/flow". Implement via svg-animation/gsap-web or remotion-video; for static chart design load the dataviz skill; for hand-drawn style use whiteboard-animation.
---

# Diagram Animation

You animate explanatory figures so structure and causality reveal in a readable order. Motion is the teaching tool: it shows *how* the parts relate and *what changes*.

## When to use / when to route elsewhere
- **Use this** to animate diagrams/charts/flows/schematics.
- Static chart design/color/encoding → load **dataviz** first, then animate here. Vector drawing → **svg-animation**; orchestration → **gsap-web**; video render → **remotion-video**; hand-drawn aesthetic → **whiteboard-animation**.

## Principles
- **Reveal in reading order:** build the diagram in the order a person would explain it — nodes before edges, cause before effect, left-to-right / top-down per its logic. Don't show everything then animate noise.
- **One relationship at a time:** highlight the active node/edge/data point; dim the rest; move focus deliberately so the viewer follows the argument.
- **Flow along direction:** animate connectors/arrows *drawing* in the direction of flow (stroke-dashoffset); particles/pulses along a path to show movement/data.
- **Data transitions:** when a chart changes, tween the marks (bars/points/paths) between states so the viewer sees what changed; keep axes stable or animate them explicitly. Preserve correct encoding at every frame.
- **Labels last / with their element:** reveal a label with its node; keep labels legible and non-overlapping throughout.

## Workflow
1. Get the figure right statically first (structure + encoding; **dataviz** for charts).
2. Decide the reveal order and the focus path (what the viewer should look at, when).
3. Animate: draw connectors along flow, stagger nodes, tween data between states, move the highlight.
4. Pace to comprehension; caption/narrate if it's standalone video.
5. **Render loop:** watch → can a newcomer follow the build? any overlap/illegibility/misleading frame? → fix → re-render.

## Constraints
- Never misrepresent data in an intermediate frame. Legible labels, no overlap. `transform`/`opacity`/`stroke` for web; reduced-motion → show the resolved figure. Reuse chart palette/tokens.

## Quality bar
The animation makes the structure/insight clearer than a static version would, in a readable order, with honest data throughout.

## Output
The animated figure (code or rendered) with its reveal-order/focus plan, reduced-motion fallback, and accurate final state.
