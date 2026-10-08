# Decisions Log

| Date | Decision | Context |
|------|----------|---------|
| 2026-10-07 | Keep all project documentation in this repo under `docs/` | The briefs arrive across several chats; the repo is the shared memory between them. |
| 2026-10-07 | Branch renamed to `prd` | The owner asked for a branch name that is easier to recognise. |
| 2026-10-07 | Launch B2B scope = RFQ + GST invoices + business account verification. Tier pricing in R2, credit terms in R3. | Marked ✅ decided in PRD §10 #2. |
| 2026-10-07 | v1 excludes: third-party marketplace, native apps, ERP replacement, credit / pay-later | PRD §2 non-goals. |
| 2026-10-07 | **Company site first, e-commerce later.** New Phase 1 = presentation site + enquiry form; PRD R1 becomes Phase 2. | Owner has many product files; product data and the shop will be handled once the main site is up. See `phasing.md`. |
| 2026-10-08 | Architecture decisions D1–D6 adopted as documented: single Next.js app with route groups 🟡, Supabase 🟡, Postgres FTS + trigram search ✅, launch B2B scope ✅, money as paise `bigint` ✅, admin is the inventory master with XLSX import 🟡 | ARCHITECTURE §11 |
| 2026-10-08 | Accessibility target is WCAG **2.2** AA, enforced in CI (axe + jsx-a11y). Brand yellow is a fill colour only, never text on light backgrounds. | `02a-accessibility-review.md` |
| 2026-10-08 | Phase 1 `enquiries` table extended for quote requests, UTM attribution and consent; `next-intl` uses `localePrefix: 'as-needed'` | `02-architecture-summary.md` AR-1, AR-2 |
