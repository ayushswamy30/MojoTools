# Mojo Tools — Project Documentation

This folder is the single source of truth for the project. It is built up incrementally
from five briefing files supplied by the client, each covering a different aspect of the project.

## Project overview (as stated at kickoff)

- **Company:** Mojo Tools
- **Business:** Trading of hardware tools and machinery
- **Owner (per PRD):** Yash
- **Sales channels today:** Mostly B2B (contractors, workshops, factories, resellers, institutions), smaller B2C walk-in; all offline
- **What we're building:** One codebase with a company site, an e-commerce shop (B2C checkout + B2B tools such as RFQ, quick order, dealer price lists) and an admin panel
- **Proposed stack (🟡 unconfirmed):** Next.js + Supabase + Vercel
- **Current phase:** ▶️ **Phase 1: company site first.** E-commerce comes after the main site is live. See [`phasing.md`](phasing.md).
- **Releases:** Phase 1 (company site) → PRD R1 MVP → R2 → R3

## Briefing files

| # | File | Aspect covered | Status | Summary doc |
|---|------|----------------|--------|-------------|
| 1 | [`PRD.md`](source-files/PRD.md) | Product requirements: goals, users, features, priorities, release plan | ✅ Received 2026-10-07 | [`01-prd-summary.md`](01-prd-summary.md) |
| 2 | `ARCHITECTURE.md` (expected) | Technical architecture | Not received | — |
| 3 | `RULES.md` (expected) | Rules / conventions | Not received | — |
| 4 | `DESIGN.md` (expected) | Visual & UX design | Not received | — |
| 5 | `TASKS.md` (expected) | Build task breakdown | Not received | — |

File names 2–5 are taken from the PRD's "Companion docs" list.

Original files are kept in [`source-files/`](source-files/); each gets a structured summary in this folder.

## Other docs

- [`phasing.md`](phasing.md) — what is in Phase 1 (company site) vs. later (e-commerce)
- [`decisions.md`](decisions.md) — decisions made along the way
- [`open-questions.md`](open-questions.md) — unresolved questions and gaps between the briefs
- [`changelog.md`](changelog.md) — what changed in the docs, and when
