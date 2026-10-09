# Mojo Tools — Documentation Changelog

## History

- **07 Oct 2026**: Project kickoff; documentation structure set up.
- **07 Oct 2026**: Received the PRD (brief 1/5); summarised; open questions logged; branch renamed to `prd`.
- **07 Oct 2026**: Owner decided to build the company site first and the e-commerce shop later.
- **08 Oct 2026**: Received ARCHITECTURE (brief 2/5). Wrote an architecture summary, a WCAG 2.2 AA accessibility review (design skill) and a launch campaign plan (campaign-planning skill).
- **08 Oct 2026**: Received DESIGN, RULES and TASKS (briefs 3–5). **Consolidated all five briefs into corrected v0.2 documents**: `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `RULES.md`, `TASKS.md`, plus `LAUNCH-PLAN.md`, `DECISIONS.md` and `OPEN-QUESTIONS.md`. Earlier reviews were folded in: the accessibility review → `DESIGN.md §8` + `RULES.md §6`; the campaign plan → `LAUNCH-PLAN.md`; the architecture recommendations → `ARCHITECTURE.md`. Removed the original briefs (`source-files/`), interim summaries (`01-…`, `02-…`) and `phasing.md`; they remain in git history (commit `d7e269b` and earlier).
- **09 Oct 2026**: Owner answers recorded: no separate R0 launch (the site goes public with the full shop, within 3 months); reply within 1 working day; English only; enquiries by email + DB; category tiles → enquiry form; GBP + IndiaMART exist; budget undecided. Updated PRD, DESIGN, TASKS (Phase 5 = preview sign-off; launch, domain and tracking moved to Phase 17; Phase 6 starts now), RULES, LAUNCH-PLAN, OPEN-QUESTIONS, DECISIONS P7–P10. Removed the "coming soon" notice.

## Consolidation log (08 Oct 2026)

Every contradiction, gap or defect found across the five briefs, and how it was resolved in v0.2.

### Between the briefs

| # | Issue | Found in | Resolution | Now in |
|---|-------|----------|------------|--------|
| I1 | EN/हिंदी switch was in the launch nav, but the Hindi UI is R2 | PRD GL-1 vs GL-8; DESIGN utility bar | Switch hidden until R2 | PRD GL-1, DESIGN `UtilityBar`, D17 |
| I2 | Product variants were missing from the release plan | PRD CA-4 vs §12 | Data model R1, picker UI R2 | PRD CA-4, TASKS T18.9, D16 |
| I3 | Country of origin was legally required but not a product field | PRD §7 vs CA-3 | Added to CA-3 and the import template | PRD CA-3, ARCH `products` |
| I4 | Shipping rules were needed at launch, but the delivery partner is open | PRD CO-7 vs §10 | R1 rules engine + manual AWB; aggregator R2 | PRD CO-7, D15 |
| I5 | Phone OTP was P0 in the PRD but its provider (MSG91) R2 in the architecture | PRD AC-1 vs ARCH §10 | OTP moved to R2 | PRD AC-1, TASKS T18.3, D14 |
| I6 | Shiprocket was R2, but tracking links were P0 | ARCH §10 vs PRD AC-3 | Manual courier + AWB + tracking URL in R1 | ARCH `orders`, TASKS T16.8 |
| X1 | Brand yellow had three different values: `#FFC20E` (DESIGN), `#FFCD11` (RULES), `#FFCC00` (earlier review) | DESIGN §2.1, RULES §6 | `DESIGN.md` token `#FFC20E` is canonical; RULES refers to the token, not a hex | DESIGN §2.1, RULES §6 |
| X2 | "Phase 1/2" release wording clashed with the TASKS build phases 0–16 | phasing.md vs TASKS | Releases renamed R0/R1/R2/R3; "Phase" = build phase only | All docs, P4 |
| X3 | TASKS built the presentation site *after* the full commerce DB and auth, contradicting "company site first" | TASKS order | TASKS re-ordered into Part A (R0, Phases 0–5) and Part B (R1, Phases 6–17); IDs renumbered | TASKS |
| X4 | DESIGN and PRD assumed the full shop header, nav, home sections and brand pages at launch | DESIGN §4, §6, §7; PRD PS-2, PS-4 | R0 variants defined for header, mobile nav, footer, home, brand pages, 404; new prompt 1-R0 | DESIGN §4, §6, §7; PRD §6.2 |
| X5 | `newsletter_subscribers` was in TASKS but not in the data model; newsletter was P1 in the PRD but R2 in TASKS | TASKS T3.6, ARCH §5, PRD OF-5 | Table added; collect from R0, send from R2 | ARCH §5, PRD OF-5 |
| X6 | `enquiries` was "contact form submissions" only, so it couldn't hold quote requests, attachments, consent or attribution | ARCH §5 | Full column set; types aligned across PRD PS-8, DESIGN `EnquiryForm`, ARCH; converts to RFQ in R1 | ARCH §5, §6.0, D9 |
| X7 | No storage bucket for enquiry attachments | ARCH §2, TASKS T3.7 | `enquiry-attachments` (private) added | ARCH §5, TASKS T3.3 |
| X8 | "Raise ticket" button with no ticket system anywhere | PRD PS-5, DESIGN `HelpBanner` | "Raise a support request" = enquiry type *support* | PRD PS-5, DESIGN |
| X9 | `[locale]` route segment would add `/en/` to URLs, or change them when Hindi arrives | ARCH §4, TASKS T1.7 | `localePrefix: 'as-needed'` | ARCH §2, D8 |
| X10 | Decision log split between ARCHITECTURE §11 and `decisions.md` | ARCH §11, RULES header | Single `DECISIONS.md` | DECISIONS |
| X11 | Next.js 15 "locked" while newer stable versions may exist at build time | ARCH §2, RULES §2 | Current stable at T1.1, then pinned | D7 |
| X12 | Analytics events and UTM attribution needed by the launch plan were missing from the architecture and tasks | Launch plan vs ARCH/TASKS | ARCH §11 event list; TASKS T2.5, T5.6 | ARCH §11 |
| X13 | Grievance officer, shipping, returns and cancellation pages were scheduled with the presentation site, but they apply to e-commerce | TASKS T5.5 | R0: terms, privacy, accessibility; R1: the rest | PRD PS-6, TASKS T4.6, T17.2 |
| X14 | Returns were P1 but missing from R2; TASKS had cancellation in R1 | PRD AC-4 vs §12, TASKS | Cancellation R1, returns R2 | PRD AC-4, TASKS T15.6, T18.8 |
| X15 | Company status `suspended` was in the flow diagram but not in the table enum | ARCH §6.1 vs §5 | Added to `companies.status` | ARCH §5 |
| X16 | Response promise had three versions: "24 hours", "24 working hours", "1 working day" | DESIGN prompts 2, 13, 16 | Single `{response promise}` placeholder until the owner sets it (C4) | DESIGN, LAUNCH-PLAN |
| X17 | TASKS T1.11 said to copy the docs into `docs/`, but they're already there | TASKS | T1.11 now only adds `CLAUDE.md` | TASKS T1.11 |
| X18 | Data inputs mixed R0 and R1 needs | PRD §9 | Split by release | PRD §9, OPEN-QUESTIONS |

### Accessibility and design defects (WCAG 2.2 AA)

| # | Issue | Resolution | Now in |
|---|-------|------------|--------|
| A-1 | Secondary text `steel-400 #8A9097` = 3.22:1 on white (needs 4.5) | New `--steel-500 #6B7178` (4.93); steel-400 only for icons, input borders and text on dark | DESIGN §2.1 |
| A-2 | `--success #1E8E3E` = 4.21:1 and `--warning #B26A00` = 4.24:1 for badge text | Darkened to `#188038` (5.02) and `#9A5B00` (5.43) | DESIGN §2.1, §9 |
| A-3 | Input borders `steel-200` = 1.38:1 (needs 3:1) | Inputs bordered with `steel-400` (3.22) | DESIGN §2.1, §2.3 |
| A-4 | WhatsApp green with white glyph = 1.98:1 | FAB uses `#128C7E` (4.14) | DESIGN `--whatsapp` |
| A-5 | Brand strip "marquee": auto-moving content with no pause | Static grid / user-scrolled row | DESIGN `BrandStrip` |
| A-6 | Cookie banner, WhatsApp FAB, mobile bottom bar and PDP sticky bar could overlap and hide focused fields (2.4.11) | Z-index layer tokens, scroll padding, FAB hidden when the PDP bar shows | DESIGN §2.3, §8.5 |
| A-7 | Hero carousel accessibility only partly specified | Full spec: pause first, stop on focus, start paused under reduced motion, slide semantics, scrim | DESIGN §8.2 |
| A-8 | Animated counters read intermediate numbers aloud | Final value in the DOM; animation `aria-hidden` | DESIGN §8.3 |
| A-9 | Form error handling not specified | Error summary, linked errors, helpful messages, autocomplete | DESIGN §8.4 |
| A-10 | react-pdf produces untagged PDFs | HTML equivalent for every quote/invoice | DESIGN §8.6, D19 |
| A-11 | No automated accessibility testing | axe in Playwright + jsx-a11y in lint, failing CI | ARCH §9, RULES §6, TASKS T1.8–T1.9 |
| A-12 | Status, stock and clearance shown by colour only | Text always present | DESIGN §4, §9 |
| A-13 | No skip link or accessibility statement | `SkipLink` component; `/policies/accessibility` | DESIGN §4, PRD GL-9 |

### Compliance and content defects

| # | Issue | Resolution | Now in |
|---|-------|------------|--------|
| K-1 | Cookie banner had only Accept / Manage (DPDP needs a real choice); analytics not gated | Accept / Reject non-essential / Manage; GA4 after consent | PRD GL-6, D13 |
| K-2 | Unconfirmed claims in design copy: "Pan-India delivery", "Easy returns", "authorised distributor", "24 hours" | Placeholders, hidden in production until confirmed; `brands.is_authorised` | RULES §11, D18 |
| K-3 | R0 hero CTA "SHOP NOW" with no shop | R0: "GET A BULK QUOTE" + "Explore our brands"; R1 restores Shop Now | DESIGN Prompt 2 |
| K-4 | Login design showed a Mobile OTP tab in R1 | OTP shown as an R2 frame | DESIGN Prompt 16 |
