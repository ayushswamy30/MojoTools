# 02a — Accessibility Review: Architecture & Planned Components

**Standard:** WCAG **2.2** AA (the PRD's target, §7; a superset of 2.1 AA) · **Date:** 2026-10-08
**Reviewed:** [`source-files/ARCHITECTURE.md`](source-files/ARCHITECTURE.md), plus the components the PRD specifies.

> **What kind of review this is.** No design or code exists yet, so this is a **pre-build** review. It checks whether the chosen stack, components and flows can meet WCAG 2.2 AA, flags the risks before they get built in, and sets requirements for `DESIGN.md` and the build.
> The colour contrast numbers are calculated values for the *proposed* yellow + charcoal palette (PRD §10 #9). Once the real Mojo logo colours arrive, run the check again on them.
> Manual testing with real screen readers (NVDA, VoiceOver, TalkBack) is still needed once pages exist.

## Summary

**Issues found:** 18 · **Critical:** 4 · **Major:** 8 · **Minor:** 6
Phase 1 (company site) is affected by **13** of them, marked **P1** below.

The stack is a good base. Radix-based shadcn/ui gives correct roles and keyboard behaviour for menus, dialogs, accordions and tabs, and server rendering produces real HTML. The risks sit in **custom components** (hero carousel, stats counters, floating buttons, mega-menu), **third-party widgets** (Turnstile, Google Maps, Razorpay), **generated PDFs**, and the **yellow brand colour**, which fails as text on white.

## Findings

### Perceivable

| # | Issue | WCAG | Severity | Phase | Recommendation |
|---|-------|------|----------|-------|----------------|
| 1 | **Brand yellow fails on white.** `#FFCC00` on white = **1.51:1**, `#FEBD17` on white = **1.68:1**. Yellow text, yellow links, yellow icons or yellow focus rings on light backgrounds all fail. | 1.4.3, 1.4.11 | 🔴 Critical | P1 | Use yellow **only as a fill** with charcoal text on top (`#1F1F1F` on `#FFCC00` = **10.9:1** ✅), or as text/accents on charcoal backgrounds. For links/accents on white, use a darkened "ink yellow" such as `#8A6D00` (**4.92:1** ✅). Write this rule into `DESIGN.md` tokens. |
| 2 | **Hero text over photos.** A full-bleed photo carousel with a white uppercase headline has no guaranteed contrast. | 1.4.3 | 🟡 Major | P1 | Add a dark gradient scrim under the text area (charcoal at ≥60 % opacity), or a solid text panel. Check every slide image before it's published. |
| 3 | **Images need real alt text.** Hero slides, brand logos, category tiles, warehouse/team photos and (later) product photos come from the owner without descriptions. | 1.1.1 | 🟡 Major | P1 | Make `alt` a **required field** in the `brands` / `categories` / content data. Brand logo alt = brand name. Decorative images get `alt=""`. Product images default to the product name + view. |
| 4 | **Generated PDFs are not tagged.** `@react-pdf/renderer` does not output tagged/accessible PDF structure, so invoices, quotes and proforma are unreadable to screen readers. Owner-uploaded **price-list PDFs** are also probably untagged scans or exports. | 1.3.1 (via PDF) | 🟡 Major | P2 | Always send an **HTML version** of the quote/invoice details (email body + account page) alongside the PDF. For price lists, ask brands for tagged PDFs where possible and show the effective date + brand in HTML next to each download. |
| 5 | **Structure from headings and landmarks.** Marketing pages are built from stacked sections (hero, stats, brand strip, testimonials) where headings are easy to get wrong. | 1.3.1, 2.4.6 | 🟢 Minor | P1 | One `<h1>` per page. Each section has a real heading (it can be visually styled small). Use `header` / `nav` / `main` / `footer` landmarks; label the two `nav`s ("Main", "Footer"). |
| 6 | **Indian number and price formatting** (₹1,23,456.00) read inconsistently by screen readers. | 1.3.1 | 🟢 Minor | P2 | Use `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`. Show strike-through MRP with a visually hidden "MRP" / "Price" label, not just styling. |
| 7 | **Reflow and zoom.** The PRD's references were reviewed at 50–60 % zoom (vashiisl, toolworld). Layouts that only look right zoomed out tend to break at 200 % / 320 px. | 1.4.4, 1.4.10 | 🟡 Major | P1 | Design mobile-first. Test every page at 320 px width and 200 % zoom, with no horizontal scroll except data tables. |

### Operable

| # | Issue | WCAG | Severity | Phase | Recommendation |
|---|-------|------|----------|-------|----------------|
| 8 | **Auto-rotating hero carousel.** Moving content longer than 5 s must be pausable. The PRD includes a pause button (good), but carousels usually also fail keyboard and screen-reader use. | 2.2.2, 2.1.1, 4.1.2 | 🔴 Critical | P1 | Pause button is **first** in the carousel's tab order. Rotation stops on hover, on focus, and when `prefers-reduced-motion` is set (start paused). Slides use `role="group"` + `aria-roledescription="slide"` + "Slide 2 of 5". Numbered pager buttons have names ("Go to slide 3"). Live region is `off` while rotating, `polite` when manual. Inactive slides are `inert`. |
| 9 | **Floating buttons cover focused content.** The WhatsApp FAB (PRD GL-4) and cookie banner (GL-6) are fixed overlays. On mobile they cover form fields and links as the user tabs or scrolls. Phase 2 adds the side widget (GL-5). | **2.4.11 Focus Not Obscured** (new in 2.2) | 🟡 Major | P1 | Reserve bottom padding equal to the FAB height. Place the FAB away from form submit buttons. Cookie banner pushes content (or is dismissed) before other focus. Use `scroll-padding-bottom` so focused elements scroll clear of overlays. |
| 10 | **Target size** of icon-only controls: FAB, carousel pager dots, social icons, footer links, filter checkboxes, qty stepper. | 2.5.8 (24 × 24 min) | 🟡 Major | P1 | 2.2 AA requires **24 × 24 px** minimum. Adopt **44 × 44 px** as the house rule for all touch targets, since most traffic is mobile. Numbered pager > dots. |
| 11 | **Mega-menu and brand menu** (PRD GL-1/GL-2) are custom multi-column panels: hover-only opening, keyboard traps and lost focus are common. | 2.1.1, 2.4.3, 1.4.13 | 🟡 Major | P2 | Build on Radix `NavigationMenu`, which opens on click/Enter and supports arrow keys and Escape. Hover-open needs a delay and must stay open while the pointer moves into it. Don't open on focus alone. Phase 1's trimmed nav is simple, so it's low risk now. |
| 12 | **Animated stats counters** (Home, About, Brands) count up on scroll. | 2.3.3 (AAA, advisory), 2.2.2 | 🟢 Minor | P1 | Respect `prefers-reduced-motion` and show the final number instantly. Put the final value in the DOM so screen readers never read intermediate numbers (`aria-hidden` on the animated span + a visually hidden final value). |
| 13 | **Skip link.** Header has logo, search, two menus, buttons, language switch, login, cart: a long tab sequence before content. | 2.4.1 | 🟢 Minor | P1 | Add "Skip to main content" as the first focusable element. |
| 14 | **Quote expiry / session timeouts.** Quotes expire (cron); Razorpay checkout sessions time out. | 2.2.1 | 🟢 Minor | P2 | Show the quote valid-until date clearly and allow "request a new quote" in one click. No unannounced timeout on our own forms. |

### Understandable

| # | Issue | WCAG | Severity | Phase | Recommendation |
|---|-------|------|----------|-------|----------------|
| 15 | **Form errors from React Hook Form + Zod** need wiring, which these libraries don't do by default. Affects contact, enquiry/quote forms in P1; register, GSTIN, checkout, quick-order in P2. | 3.3.1, 3.3.2, 3.3.3, 4.1.3 | 🔴 Critical | P1 | Use shadcn's `<Form>` wrapper (sets `aria-invalid` + `aria-describedby` on the input). Visible `<label>` on every field (no placeholder-only labels). On submit failure, move focus to an error summary listing each error as a link to its field. Zod messages say how to fix the problem: "GSTIN must be 15 characters, e.g. 27ABCDE1234F1Z5", not "Invalid". Success goes to a `role="status"` message. Set `autocomplete` (name, email, tel, organization, postal-code) and `inputmode="numeric"` for mobile/pincode. |
| 16 | **Language of page / parts.** Hindi UI in R2; Hindi words may appear in English pages earlier (e.g. the language switch "हिंदी"). | 3.1.1, 3.1.2 | 🟢 Minor | P1 | `<html lang>` comes from the `next-intl` locale. Wrap the "हिंदी" switch label in `lang="hi"`. |
| 17 | **Accessible authentication.** Phone OTP + captcha + GSTIN at registration. | **3.3.8 Accessible Authentication** (new in 2.2) | 🟡 Major | P2 | OTP input: single field (or properly grouped boxes) with `autocomplete="one-time-code"`, paste allowed, no time pressure under 2 min, plus a "resend" option. Allow password managers (no paste blocking). Email/password and Google stay as alternatives. |

### Robust

| # | Issue | WCAG | Severity | Phase | Recommendation |
|---|-------|------|----------|-------|----------------|
| 18 | **Third-party widgets** sit outside our control: **Turnstile** (forms), **Google Maps** iframe (contact), **Razorpay Checkout** (payment modal), **cookie banner** if a vendor script is used. | 4.1.2, 2.1.1, 2.4.3 | 🔴 Critical | P1 (Turnstile, Maps, cookie) · P2 (Razorpay) | **Turnstile**: use the "managed"/invisible mode, so most users never see a challenge. **Maps**: `title="Mojo Tools location map"` on the iframe, the address as text beside it, a "Get directions" text link, and keyboard users must not get stuck inside the iframe. **Cookie banner**: build it ourselves with shadcn rather than a third-party script; not modal; buttons reachable and labelled. **Razorpay**: test keyboard + screen reader flow early with test keys; keep NEFT as an alternative path. |

## Colour contrast check (proposed palette, PRD §10 #9)

Calculated with the WCAG relative-luminance formula.

| Pairing | Foreground | Background | Ratio | Required | Pass? |
|---------|-----------|------------|-------|----------|-------|
| Body text on white | `#1F1F1F` charcoal | `#FFFFFF` | 16.48:1 | 4.5:1 | ✅ |
| CTA label on yellow button | `#1F1F1F` | `#FFCC00` | 10.90:1 | 4.5:1 | ✅ |
| CTA label on DeWalt-style yellow | `#1F1F1F` | `#FEBD17` | 9.82:1 | 4.5:1 | ✅ |
| Yellow text on charcoal (dark sections) | `#FFCC00` | `#2B2B2B` | 9.36:1 | 4.5:1 | ✅ |
| **Yellow text / link on white** | `#FFCC00` | `#FFFFFF` | **1.51:1** | 4.5:1 | ❌ |
| **Yellow button edge on white** (non-text) | `#FFCC00` | `#FAFAFA` | **1.45:1** | 3:1 | ❌ (needs a charcoal border, or charcoal text that carries the meaning) |
| Darker "ink yellow" on white | `#B38F00` | `#FFFFFF` | 3.07:1 | 4.5:1 | ❌ text / ✅ large text & icons |
| Deep "ink yellow" on white | `#8A6D00` | `#FFFFFF` | 4.92:1 | 4.5:1 | ✅ |
| Muted grey text on white | `#6B7280` | `#FFFFFF` | 4.83:1 | 4.5:1 | ✅ |
| Muted grey on charcoal | `#6B7280` | `#1F1F1F` | 3.41:1 | 4.5:1 | ❌ — use `#9CA3AF` (6.49:1 ✅) |
| White on WhatsApp green | `#FFFFFF` | `#25D366` | 1.98:1 | 3:1 (icon) | ❌ — icon must be large + use the darker `#128C7E` (4.14:1 ✅ for icon / large text), or add a dark outline |

**Rule for `DESIGN.md`:** yellow is a **fill** colour, never a text colour on light backgrounds. Focus rings: 2 px charcoal on light, 2 px yellow on dark, with 2 px offset.

## Keyboard navigation (expected behaviour)

| Element | Tab order | Enter / Space | Escape | Arrow keys |
|---------|-----------|---------------|--------|------------|
| Skip link | 1st | Jumps to `<main>` | — | — |
| Main nav items | After logo | Open submenu / follow link | Close submenu, return focus to trigger | ← → between top items; ↓ into submenu |
| Hero carousel | Pause button → slide CTA → pager | Pause/play; go to slide | — | ← → on pager (optional) |
| About values accordion | Each header | Toggle panel | — | ↑ ↓ between headers (Radix default) |
| Brand filter chips | Chip group | Toggle filter; result count announced | — | ← → within group (optional) |
| Enquiry form | Fields in visual order → captcha → submit | Submit | — | — |
| Cookie banner | Reachable early, not a trap | Accept / reject / settings | Closes settings | — |
| WhatsApp FAB | Last in page order | Opens `wa.me` link (new tab, announced) | — | — |
| Dialogs (P2: cart drawer, quick view) | Focus moves in, trapped | — | Closes, focus returns to trigger | — |

## Screen reader (expected announcements)

| Element | Should be announced as | Common failure to avoid |
|---------|------------------------|-------------------------|
| Hero | "Featured, carousel. Slide 1 of 4, [headline]" | Announcing every auto-rotation |
| Pause button | "Pause slideshow, button" ↔ "Play slideshow" | Unlabelled icon button |
| Brand logo in grid | "Bosch, link" | "logo.png" or "image" |
| Stats counter | "25+ years in business" | Reading "0… 3… 12…" |
| WhatsApp FAB | "Chat with us on WhatsApp, link, opens in new tab" | Unlabelled icon |
| Form error | "Mobile number, invalid entry, Enter a 10-digit mobile number" | Red border only |
| Form success | "Thanks — we'll call you within one working day" (status) | Silent redirect |
| Cart count (P2) | "Cart, 3 items" | "Cart 3" with no context |

## Changes to the build process

1. **Automated checks in CI.** Add `@axe-core/playwright` to the existing Playwright smoke run and fail CI on serious/critical violations. Add `eslint-plugin-jsx-a11y` to ESLint. (The architecture's CI has no accessibility step today.)
2. **Definition of done for every component:** keyboard-only pass, visible focus, 200 % zoom pass, reduced-motion pass, axe clean.
3. **Manual screen-reader pass** before Phase 1 launch: NVDA + Chrome (Windows), VoiceOver + Safari (iOS), TalkBack + Chrome (Android). TalkBack matters most for an Indian mobile audience.
4. **Accessibility statement page** at `/policies/accessibility` with a contact for reporting problems. Cheap to add, and it fits the PRD's policy set.

## Priority fixes

1. **Yellow-on-white rule** (#1). It affects every page and every component, so it must go into `DESIGN.md` tokens before any UI is built.
2. **Accessible hero carousel** (#8, #2). This is the first thing every visitor sees; build it once, correctly.
3. **Form wiring** (#15). The enquiry form is the main conversion goal of Phase 1, so it must work for everyone.
4. **Third-party widgets** (#18). Turnstile mode, Maps fallback text, and a self-built cookie banner.
5. **Focus not obscured + target sizes** (#9, #10). Mobile users with the FAB and cookie banner.
6. **CI automation** (build process #1). It stops these from coming back.
