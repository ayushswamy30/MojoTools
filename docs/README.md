# Mojo Tools — Project Documentation

Mojo Tools trades **tools, machinery and hardware materials**, mostly to B2B buyers (contractors, workshops, factories, resellers) with a smaller B2C walk-in segment. All sales are offline today. This project builds **one website that is both the company site and an e-commerce store**, plus an admin panel.

**Current release: ▶️ R0, the company site.** The online shop (R1) follows once the main site is live.

| Release | What ships |
|---|---|
| **R0: Company site** | Home, About, Brands, Contact, enquiry / quote form, WhatsApp, SEO, launch campaign |
| **R1: E-commerce MVP** | Catalogue, search, cart, checkout (Razorpay + NEFT), B2B accounts, RFQ, quick order, price lists, GST invoices, admin |
| **R2 / R3** | Tier pricing, Hindi, OTP, COD, returns… / credit, ERP sync, reviews, blog |

## The documents (all v0.2, corrected and consolidated)

| Doc | What it answers | Read it when |
|---|---|---|
| [`PRD.md`](PRD.md) | **What** we build and for whom: goals, personas, sitemap, every requirement tagged R0–R3, release plan | You need scope or a requirement ID |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | **How** it's built: stack, routes, data model, flows, security, analytics, R0 slice | Before touching code or data |
| [`DESIGN.md`](DESIGN.md) | **How it looks and behaves**: tokens (contrast-checked), components, UX rules, Claude Design prompts, accessibility spec | Designing or building UI |
| [`RULES.md`](RULES.md) | **How we work**: coding, security, accessibility, SEO, testing, git, Definition of Done | Before every task |
| [`TASKS.md`](TASKS.md) | **What's next**: ordered task list, R0 first (Phases 0–5), then R1 (6–17), R2/R3 | Picking the next piece of work |
| [`LAUNCH-PLAN.md`](LAUNCH-PLAN.md) | **How we launch R0**: audience, messages, channels, 8-week calendar, KPIs, budget tiers | Planning marketing |
| [`DECISIONS.md`](DECISIONS.md) | Every decision made and why | Before re-opening a settled point |
| [`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md) | What the owner still needs to answer or supply | Preparing for an owner check-in |
| [`CHANGELOG.md`](CHANGELOG.md) | History of the docs + the **consolidation log** (every issue found and how it was fixed) | Wondering why something changed |

## Status legend (used everywhere)

✅ decided · 🟡 default assumed, owner to confirm · ❓ open question.

## Starting a new chat or coding session

> "Continue the Mojo Tools project on branch `prd`. Read `docs/README.md` first, then `docs/RULES.md`."
