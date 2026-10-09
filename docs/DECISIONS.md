# Mojo Tools — Decision Log

The single log for project, product and architecture decisions. Add a row whenever a decision is made or a rule is broken ([`RULES.md`](RULES.md)).
Status: ✅ decided · 🟡 default adopted, owner to confirm.

| ID | Date | Decision | Status | Context / source |
|----|------|----------|--------|------------------|
| P1 | 07 Oct 2026 | All project documentation lives in this repo under `docs/`. | ✅ | The briefs arrived across several chats; the repo is the shared memory. |
| P2 | 07 Oct 2026 | Documentation branch is `prd`. | ✅ | Owner asked for a recognisable branch name. |
| P3 | 07 Oct 2026 | **Company site first, e-commerce later.** | ✅ | Owner has many product files; the shop follows once the main site is up. |
| P4 | 08 Oct 2026 | Releases are named **R0** (company site), **R1** (e-commerce MVP), **R2**, **R3**. "Phase" means a build phase in `TASKS.md` only. | ✅ | Removes the clash between the earlier "Phase 1/2" wording and the TASKS phases. |
| P5 | 08 Oct 2026 | The five briefs were consolidated into corrected v0.2 documents; the originals and interim summaries were removed (still in git history). | ✅ | Owner request. Full list of fixes in `CHANGELOG.md`. |
| P6 | 07 Oct 2026 | v1 excludes: third-party marketplace, native apps, ERP replacement, credit / pay-later (R3). | ✅ | PRD §2 non-goals. |
| D1 | 07 Oct 2026 | Single Next.js app with route groups for site, shop, admin. | 🟡 | ARCHITECTURE §1 |
| D2 | 07 Oct 2026 | Supabase (Postgres + Auth + Storage). | 🟡 | ARCHITECTURE §1 |
| D3 | 07 Oct 2026 | Postgres FTS + trigram for search at launch; external engine only beyond ~100k SKUs. | ✅ | ARCHITECTURE §7 |
| D4 | 07 Oct 2026 | R1 B2B = RFQ + GST invoices + business verification; tiers R2; credit R3. | ✅ | PRD §10 #2 |
| D5 | 07 Oct 2026 | Money stored as paise `bigint`. | ✅ | ARCHITECTURE §5 |
| D6 | 07 Oct 2026 | Admin panel is the inventory master; XLSX import; no ERP sync until R3. | 🟡 | ARCHITECTURE §6.5 |
| D7 | 08 Oct 2026 | Framework versions: current stable Next.js/React at T1.1 (≥ 15), then pinned; Node active LTS. | ✅ | Replaces the hard "Next.js 15" lock. |
| D8 | 08 Oct 2026 | `next-intl` with `localePrefix: 'as-needed'`: English URLs unprefixed, Hindi under `/hi` (R2). | ✅ | Keeps URLs stable when Hindi is added. |
| D9 | 08 Oct 2026 | `enquiries` is the R0 lead table (types, attachment, UTM, consent, status) and converts to RFQs in R1; `newsletter_subscribers` from R0. | ✅ | ARCHITECTURE §5, §6.0 |
| D10 | 08 Oct 2026 | R0 has no auth and no admin UI: enquiries arrive by email and are stored in the DB; hero/site content in code. | 🟡 | Keeps R0 small; admin comes in R1. |
| D11 | 08 Oct 2026 | Accessibility target **WCAG 2.2 AA**, enforced in CI (axe + jsx-a11y) and by a manual screen-reader pass per release. | ✅ | DESIGN §8, RULES §6 |
| D12 | 08 Oct 2026 | Colour tokens corrected for contrast: `--brand-yellow #FFC20E` is fill-only; new `--steel-500` for secondary text; `--success #188038`, `--warning #9A5B00`; inputs bordered with `--steel-400`; WhatsApp FAB `#128C7E`. | ✅ | DESIGN §2.1 |
| D13 | 08 Oct 2026 | Cookie banner built in-house with Accept / Reject non-essential / Manage; analytics only after consent. | ✅ | DPDP; RULES §5 |
| D14 | 08 Oct 2026 | Mobile OTP login moved to R2 (with MSG91). | 🟡 | Resolves the PRD vs architecture conflict. |
| D15 | 08 Oct 2026 | R1 shipping = rules engine + manual courier/AWB entry; aggregator integration in R2. | 🟡 | Resolves the PRD vs architecture conflict. |
| D16 | 08 Oct 2026 | Product variants: data model from R1 (≥ 1 variant per product); picker UI in R2. | ✅ | PRD CA-4 |
| D17 | 08 Oct 2026 | Hindi language switch hidden until the Hindi UI ships (R2); R0 is English only. | 🟡 | PRD GL-1, GL-8 |
| D18 | 08 Oct 2026 | Unconfirmed business claims (authorised dealer, delivery reach, response time, returns) are placeholders and hidden in production until the owner confirms them. | ✅ | RULES §11 |
| D19 | 08 Oct 2026 | Generated PDFs (react-pdf, untagged) always have an HTML equivalent. | ✅ | DESIGN §8.6 |
| P7 | 09 Oct 2026 | **No separate public launch for the company site.** R0 is built first and reviewed on a private preview; the whole site (R0 + full shop R1) goes public together. No "coming soon" notice. | ✅ | Owner answer, 09 Oct 2026 |
| P8 | 09 Oct 2026 | Public launch target: **within 3 months (by early January 2027)**, with the full R1 scope. Catalogue data (T6.2) is on the critical path; R1 owner inputs start now in parallel with R0. | ✅ | Owner answer. ⚠️ Tight for the full R1 scope; review the date once catalogue data arrives. |
| P9 | 09 Oct 2026 | Enquiry / quote response promise: **within 1 working day**. | ✅ | Owner answer; replaces `{response promise}` |
| P10 | 09 Oct 2026 | R0 confirmed: English only; enquiries by email + database; category tiles open the enquiry form. | ✅ | Owner answer (R0-1, R0-2, R0-4) |
