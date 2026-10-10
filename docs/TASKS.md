# Mojo Tools — Development Tasks

> **Version 0.2** (08 Oct 2026): consolidated and corrected. Tasks are **re-ordered so the company site (R0) ships first**, then the shop (R1). Task IDs were renumbered; no work had started. See [`CHANGELOG.md`](CHANGELOG.md).
> Work top to bottom. One task ≈ one PR ([`RULES.md §10`](RULES.md#10-git--pr-workflow)). Tick `[x]` when the Definition of Done is met.
> IDs (e.g. `T4.4`) are referenced in branches, commits and PRs. Requirement IDs in brackets point to [`PRD.md`](PRD.md).
>
> | Part | Release | Phases |
> |---|---|---|
> | **A** | **R0: Company site** (current) | 0–5 |
> | **B** | **R1: E-commerce MVP** | 6–17 |
> | **C** | R2, R3 | 18–19 |

---

# Part A — R0: Company site

> **Progress (10 Oct 2026):** Phases 1–4 built with demo content on branch `pre-mojo` (see notes on each task). Open: owner inputs (Phase 0), accounts/deploy (T1.10), real content (Phase 5).

## Phase 0 — Inputs & decisions for R0 (owner)
- [ ] **T0.1** Confirm R0 defaults: stack (Next.js + Supabase + Vercel), English only, enquiries by email + database (no admin inbox), hero slides in code. → [`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md)
- [ ] **T0.2** Supply brand assets: Mojo Tools logo (SVG) and brand colours → update `DESIGN.md §2` tokens **and re-run the contrast table**.
- [ ] **T0.3** Supply business details: legal name, GSTIN, address(es), hours, phone, WhatsApp, email; **domain + business email**.
- [ ] **T0.4** Supply About Us content (story, purpose, mission, values, timeline), real stats, team/warehouse photos, real testimonials (if any).
- [ ] **T0.5** Supply the brand list + logos + product types per brand, and mark **which brands Mojo is formally authorised for**; top-level categories with one image each; hero images/slogans.
- [x] **T0.6** ~~Response promise~~ (✅ within 1 working day) · ~~launch date~~ (✅ public launch with R1, within 3 months) · still open: who receives enquiry alerts, marketing budget tier ([`LAUNCH-PLAN.md §10`](LAUNCH-PLAN.md#10-next-steps)).
- [ ] **T0.7** Create accounts: GitHub repo access, Vercel, Supabase, Resend, Cloudflare Turnstile, Google Analytics 4, Google Search Console, Sentry, Google Business Profile.
- [ ] **T0.8** Run Claude Design prompts **0, 1-R0, 2, 3, 4, 5, 19** from `DESIGN.md §7`; export approved designs to `design/`.

## Phase 1 — Project setup
- [x] **T1.1** Init Next.js (current stable, ≥ 15, pinned) + TypeScript strict + pnpm + App Router + `src/` layout per `ARCHITECTURE.md §4`; Node LTS in `.nvmrc`. ✅ Next.js 16.4 / React 19.3, pnpm, Node 22 (`.nvmrc`).
- [x] **T1.2** Tailwind v4, design tokens in `globals.css` (colours incl. `steel-500`, `whatsapp`, focus ring, fonts, radius, shadows, z-index layers) from `DESIGN.md §2`; `next/font` for Archivo (wdth axis), Inter, JetBrains Mono. ✅
- [ ] **T1.3** shadcn/ui init + base primitives (Button variants incl. loading, Input, Textarea, Select, Checkbox, Form, Dialog, Sheet, Tabs, Accordion, Toast, Tooltip, Badge, Skeleton, Alert). 🟡 Button, Container, SectionTitle, Breadcrumbs + Radix Dialog/Accordion added; other primitives are added as tasks need them (KISS).
- [ ] **T1.4** ESLint (+ `eslint-plugin-jsx-a11y`), Prettier, Husky + lint-staged, commitlint (Conventional Commits). 🟡 ESLint (+ jsx-a11y), Prettier done; Husky/lint-staged/commitlint not yet (CI enforces the same checks).
- [x] **T1.5** `lib/env.ts` with Zod validation; `.env.example`. ✅
- [ ] **T1.6** Supabase CLI local stack; `@supabase/ssr` server/client/admin helpers; `pnpm db:types` script. 🟡 Supabase helpers + migration done; local CLI stack not run in this environment (no Docker daemon).
- [ ] **T1.7** next-intl with `[locale]` segment and **`localePrefix: 'as-needed'`** (EN only; HI scaffold, hidden). 🟡 Done with Next.js built-in i18n instead of next-intl (DECISIONS D20).
- [x] **T1.8** Vitest + Playwright + `@axe-core/playwright` configured, with one sample test each. ✅
- [x] **T1.9** GitHub Actions CI: typecheck, lint, unit tests, build, Playwright smoke + axe (fail on serious/critical). ✅ `.github/workflows/ci.yml`
- [ ] **T1.10** Vercel project linked; preview deployments per PR; Sentry + Vercel Analytics; security headers. ⏳ Needs the owner's Vercel/Sentry accounts (T0.7).
- [x] **T1.11** Add `CLAUDE.md` at the repo root pointing to `docs/README.md` and `RULES.md §0`. (The docs are already in `docs/`.) ✅

**Exit:** empty app deploys to preview with tokens, fonts and CI green (incl. axe).

## Phase 2 — Layout shell (R0 variant, built to extend)
- [x] **T2.1** `SkipLink`, `UtilityBar` (R0 content), `Header` R0 (logo, page links, GET A QUOTE). Built so R1 can swap in search/cart/account without rewriting. [GL-1] ✅
- [x] **T2.2** `MobileNav` R0: top bar + drawer (focus trap, Esc). [GL-7] ✅
- [x] **T2.3** `Footer` R0 with trust strip and columns (Mojo Tools, Help, Policies). [GL-3] ✅
- [x] **T2.4** `WhatsAppFab` (prefilled message, attribution) and in-house `CookieBanner` (Accept / Reject non-essential / Manage; consent cookie; content padding). [GL-4, GL-6] ✅
- [x] **T2.5** Analytics foundation: consent-gated GA4 loader, UTM/referrer first-party cookie, event helper with the R0 events from `ARCHITECTURE.md §11`. ✅
- [ ] **T2.6** Shared components: `SectionTitle`, `Breadcrumbs`, `EmptyState`, `StatusPill`, `CopyButton`, `ErrorSummary`, `CTABand`. 🟡 SectionTitle, Breadcrumbs, ErrorSummary (in the form), CTABand done; StatusPill/CopyButton/Pagination/EmptyState deferred to R1, where they are first used.
- [ ] **T2.7** `/dev/ui` page (dev only, `noindex`) showing all components and states for review. ⏳ Not built yet; the e2e + axe suite covers component states for now.
- [x] **T2.8** 404 and 500 pages (R0 version: links to Home, Brands, Contact). ✅

**Exit:** every page renders inside the shell; Lighthouse a11y ≥ 95 and axe clean on the shell; no overlay covers focused elements on 390 px.

## Phase 3 — Database foundation for R0
- [x] **T3.1** Migration: `updated_at` trigger function; `brands` (incl. `is_authorised`, `product_types[]`); `categories` (full tree schema, R0 uses top level; `image_alt`) + indexes + RLS (public read of active rows). ✅
- [x] **T3.2** Migration: `enquiries` (columns per `ARCHITECTURE.md §5`, `ENQ-YYYY-#####` sequence) and `newsletter_subscribers` + RLS (no public read; insert via server action only). ✅
- [x] **T3.3** Storage buckets `public-media` (public) and `enquiry-attachments` (private) + policies. ✅
- [x] **T3.4** Seed script with clearly fake data (8 brands, 8 top-level categories) marked `SEED`; real data loaded from the owner's lists once supplied (T0.5). ✅
- [x] **T3.5** RLS tests: anonymous visitor can read active brands/categories; cannot read enquiries/subscribers. ✅ (`supabase/tests/rls_r0.test.sql`; also checked against Postgres via PGlite)

**Exit:** `supabase db reset` builds everything; RLS tests pass; types generated.

## Phase 4 — Presentation site
- [x] **T4.1** Home R0: accessible `HeroCarousel` (`DESIGN.md §8.2`), category tiles (enquiry pre-fill), static brand grid, why-choose + stats (§8.3), testimonials slot (hidden when empty), CTA band, visit-us band. [PS-1, PS-2] ✅ (placeholder visuals until photos arrive)
- [x] **T4.2** About Us: hero, stats card, image + Purpose/Mission/Values accordion, timeline, why-choose cards. [PS-3] ✅
- [x] **T4.3** Brands page with filter chips + logo grid + stats; brand page R0 (about, product range, authorised badge only if `is_authorised`, Enquire / Request price list / WhatsApp CTAs); `brand_view` event. [PS-4] ✅
- [x] **T4.4** Contact page: info card, `EnquiryForm` (types, brand pre-fill, attachment, consent, Turnstile, rate limit, error summary, success with enquiry number) → `enquiries` + Resend alert to sales (signed attachment link) + auto-reply; map card with text address; help banner (support request); newsletter / notify block; `generate_lead` / `notify_signup` events. [PS-5, PS-8, OF-5] ✅ (demo mode until Supabase/Resend keys exist)
- [x] **T4.5** Reuse `EnquiryForm` as a "Get a Quote" dialog/page reachable from the header and every CTA. [PS-8] ✅ as a `/quote` page (pre-filled via `?type=&brand=&category=`) rather than a dialog
- [x] **T4.6** Policy pages from MDX: terms, privacy (DPDP: consent, data requests contact), accessibility statement. [PS-6, GL-9] ✅ (draft text — owner/legal review in T5.1)
- [x] **T4.7** SEO: metadata, `Organization` + `LocalBusiness` JSON-LD, `BreadcrumbList` on brand pages, OG images, `sitemap.ts` (pages + brands), `robots.ts`. ✅
- [x] **T4.8** E2E: all R0 pages render and pass axe; enquiry happy path, validation errors, attachment; consent gates GA4. ✅ 54 Playwright tests (desktop + mobile)
- [x] **T4.9** Products page (`/products`): category cards with description, matching brands, Enquire + WhatsApp CTAs, jump links; added to the menu between About and Brands; Home link removed from the menu (logo goes home). [PS-9] ✅
- [x] **T4.10** Mobile hamburger moved to the left; drawer slides from the left. [GL-1] ✅
- [x] **T4.11** Brands renamed to **Distributorship** (`/distributorship`, redirects from `/brands`), "Official distributor" wording and badge. [PS-4] ✅
- [x] **T4.12** **Awards** page (`/awards`) with placeholder cards. [PS-10] ✅
- [x] **T4.13** **Mojo Mitra** AI assistant (Gemini/Groq) + labelled WhatsApp button; tests with a mock model; preview mode without keys. [GL-10] ✅

**Exit:** company site complete with seed content, responsive, axe clean, enquiries arrive by email and in the database.

## Phase 5 — R0 review on private preview (no public launch)

> The site goes public only with R1 (✅ owner, 09 Oct 2026). R0 is finished and signed off on a password-protected preview; domain, tracking QA and the launch campaign move to Phase 17.
- [ ] **T5.1** Replace all `SEED` content with the owner's real content; confirm every claim ([`RULES.md §11`](RULES.md#11-content--copy-rules)); owner reviews terms/privacy.
- [ ] **T5.2** Performance pass: Core Web Vitals green on mobile for all R0 pages.
- [ ] **T5.3** Accessibility audit: axe + keyboard + 200 % zoom + NVDA / VoiceOver / TalkBack; fix all AA issues.
- [ ] **T5.4** Security pass: RLS review, headers (CSP, HSTS), secret scan, dependency audit, rate limits verified.
- [ ] **T5.5** Preview protection (Vercel password / deployment protection) and `noindex` on all preview URLs. *(Domain, DNS and production keys moved to T17.8.)*
- [ ] **T5.6** Check GA4 events and UTM capture on the preview with test traffic. *(Production tracking QA moved to T17.8.)*
- [ ] **T5.7** Owner walkthrough of every R0 page on the preview; collect changes.
- [ ] **T5.8** Short guide for sales: handling enquiry emails and updating `status`.
- [ ] **T5.9** ✅ Owner signs off R0 on the preview. R1 build starts (owner R1 inputs in Phase 6 should already be under way).

---

# Part B — R1: E-commerce MVP

## Phase 6 — Inputs & decisions for R1 (owner, **start now, in parallel with R0**)

> With a 3-month public-launch target, the catalogue data (T6.2) is on the critical path. It should arrive while R0 is being built.
- [ ] **T6.1** Confirm R1 🟡 items: payments (Razorpay + NEFT), inventory master (Tally?), public prices, GST-inclusive prices, single warehouse, delivery approach. → `OPEN-QUESTIONS.md`
- [ ] **T6.2** Supply the catalogue XLSX (category tree, products/SKUs, prices, HSN, GST %, stock, **country of origin**) + images named by SKU.
- [ ] **T6.3** Supply price-list PDFs per brand; returns/shipping/cancellation terms; grievance officer details.
- [ ] **T6.4** Create accounts: Razorpay (test, then live).
- [ ] **T6.5** Run Claude Design prompts **1, 6–18** (and the R1 frames of 2 and 4); export to `design/`.

## Phase 7 — Database for commerce
- [ ] **T7.1** Migration: `profiles`, `companies` (incl. `suspended`), `addresses` + `is_staff()` function + RLS; profile auto-creation trigger.
- [ ] **T7.2** Migration: `products`, `product_categories`, `product_variants`, `product_images` (alt), `product_specs`, `product_documents`, `inventory` + indexes + RLS.
- [ ] **T7.3** Search: `pg_trgm`, `unaccent`, generated `search_tsv`, GIN indexes; `search_products()` RPC with the ranking order from `ARCHITECTURE.md §7`.
- [ ] **T7.4** Migration: `carts`, `cart_items`, `rfqs` (incl. `enquiry_id`), `rfq_items`, `quotes`, `quote_items`.
- [ ] **T7.5** Migration: `orders` (incl. courier/AWB), `order_items`, `payments`, `order_events`, `invoices` + number sequences (order, RFQ, quote, invoice per FY).
- [ ] **T7.6** Migration: `price_list_files`, `banners`, `audit_log` (+ triggers for price/stock/status changes).
- [ ] **T7.7** Storage buckets: `price-lists`, `invoices`, `rfq-attachments` (private) + policies.
- [ ] **T7.8** Seed: 200 fake products across the seed brands/categories, marked `SEED`.
- [ ] **T7.9** RLS tests: guest / customer / B2B / staff access matrix.

## Phase 8 — Authentication & accounts
- [ ] **T8.1** Email/password sign-up & login, password reset, email verification. [AC-1]
- [ ] **T8.2** Google sign-in. [AC-1]
- [ ] **T8.3** Register choice screen: Personal vs Business. [B2B-1]
- [ ] **T8.4** Business registration form with **GSTIN validator** (`lib/gstin.ts`: format, state code, checksum) + PAN derivation; creates a `companies` row `pending`; GST certificate upload. [B2B-1]
- [ ] **T8.5** Middleware: session refresh, protect `/account/*`, staff-only `/admin/*`; admin MFA enforcement.
- [ ] **T8.6** Emails: welcome, business-registration received, approved, rejected (React Email + Resend).
- [ ] **T8.7** Turnstile + rate limiting on auth and registration.
- [ ] **T8.8** E2E: register personal; register business → pending.

*(Phone OTP moved to R2: T18.3.)*

## Phase 9 — Shop shell & catalogue browsing
- [ ] **T9.1** Header R1 (search input, Quote/Order, account, cart), `MainNav` + `MegaMenu` (Radix NavigationMenu, live category tree), `MobileNav` R1 bottom tabs; footer R1 columns. [GL-1, GL-2, GL-7]
- [ ] **T9.2** `features/catalog/queries.ts`: category tree, brand list, listing query (filters, sort, pagination) in one round trip. [CA-1, CA-2]
- [ ] **T9.3** Shop landing: category icon bar, Search-by-Category list, banner carousel + brand tabs, register bar, promo tiles, category sections. [CA-5]
- [ ] **T9.4** `ProductCard` + `ProductRow` with badges, stock (text), price, SKU copy.
- [ ] **T9.5** Listing pages `/shop/c/[...category]` and `/shop/b/[brand]` with URL-driven `FilterSidebar`, toolbar, density toggle, per-page, mobile bottom sheet, empty state. [CA-6]
- [ ] **T9.6** Dynamic spec filters per category (`categories.spec_filters`). [CA-6]
- [ ] **T9.7** PDP: gallery, PriceBlock, StockBadge, pack/MOQ, QtyStepper, specs, documents, related, recently viewed (local per viewer), country of origin, Product JSON-LD, mobile sticky bar. [CA-8]
- [ ] **T9.8** Clearance, Economy, Offers listing pages; offer cards. [OF-2, OF-3, OF-4]
- [ ] **T9.9** Upgrade R0 pages to R1: home promos + featured rail, category tiles → shop links, brand pages → shop/price list. [PS-2, PS-4]
- [ ] **T9.10** ISR + tag revalidation for catalogue pages; sitemap adds categories/products.

## Phase 10 — Search
- [ ] **T10.1** `search_products()` integration; `/shop/search` with exact-SKU card, tabs, listing layout. [CA-7]
- [ ] **T10.2** `/api/search/suggest` + header combobox autocomplete (SKU, products, brands, categories, recent searches). [CA-7]
- [ ] **T10.3** No-results state with mini RFQ form.
- [ ] **T10.4** Search analytics events (query, results count, click).
- [ ] **T10.5** Mojo Mitra R1 tools: real product search, stock/price lookup, add-to-cart / add-to-quote with confirmation, order status for logged-in users. [GL-10]

**Exit:** SKU exact match is always first; suggest responds < 300 ms p95.

## Phase 11 — Cart
- [ ] **T11.1** Cart model: guest token cookie + DB cart; merge on login. [CO-1]
- [ ] **T11.2** Add/update/remove server actions with MOQ, pack-size and stock checks. [CO-1]
- [ ] **T11.3** `CartDrawer` + `/cart` page with Undo, warnings, empty state.
- [ ] **T11.4** Shipping rule engine (free above threshold, flat rate, pincode serviceability list). [CO-7]
- [ ] **T11.5** Unit tests for cart totals.

## Phase 12 — Tax & invoicing core
- [ ] **T12.1** `features/tax`: GST split by place of supply (CGST+SGST vs IGST), inclusive/exclusive handling, rounding rules; unit tests. [B2B-6]
- [ ] **T12.2** Invoice numbering per FY (`MT/26-27/00001`), atomic.
- [ ] **T12.3** PDF templates: tax invoice, proforma invoice, quote (seller GSTIN, buyer GSTIN, HSN, rates, amounts in words) **+ matching HTML views**. [B2B-6]

## Phase 13 — Checkout & payments
- [ ] **T13.1** Checkout stepper: address (pincode → city/state), billing toggle, GSTIN section (locked for approved B2B). [CO-2]
- [ ] **T13.2** Delivery options: ship / warehouse pickup. [CO-2]
- [ ] **T13.3** Server-side order creation with re-priced totals and snapshot items; stock reservation.
- [ ] **T13.4** Razorpay: create order, Checkout.js, signature verify, **idempotent webhook**, failure/retry UI; keyboard/screen-reader check. [CO-3]
- [ ] **T13.5** NEFT / bank transfer for approved B2B: proforma PDF, `awaiting_payment`, admin confirm action. [CO-4]
- [ ] **T13.6** Order success page; confirmation emails (customer + sales). [CO-8]
- [ ] **T13.7** Auto-cancel unpaid online orders after N hours (cron) and release stock.
- [ ] **T13.8** E2E: B2C Razorpay test checkout; B2B NEFT checkout.

**Exit:** real test-mode orders flow end to end with correct GST.

## Phase 14 — B2B: RFQ, quick order, price lists
- [ ] **T14.1** "Add to quote" list (like the cart) + `/rfq` form: from cart, build list, free-text rows, attachment, required-by date. [B2B-3]
- [ ] **T14.2** RFQ submission → `rfqs` + emails; confirmation screen with RFQ number. [B2B-3]
- [ ] **T14.3** Buyer quote view (HTML + PDF): priced lines, valid-until date, Accept → order (`awaiting_payment`) → pay online/NEFT. [B2B-3]
- [ ] **T14.4** Cron: expire quotes past `valid_until`.
- [ ] **T14.5** `/quick-order`: rows with SKU autocomplete, paste parser, CSV upload + template, per-row validation, add all to cart / request quote. [B2B-4]
- [ ] **T14.6** `/price-lists`: brand cards, gated downloads via signed URLs, locked/pending states. [B2B-5]
- [ ] **T14.7** E2E: business register → admin approve → RFQ → quote → accept → order; price-list gate.

## Phase 15 — Customer account
- [ ] **T15.1** Account shell + dashboard (status badge, KPIs, recent orders, quotes needing action). [AC-2]
- [ ] **T15.2** Orders list + detail with `OrderTimeline`, invoice download, tracking link. [AC-3]
- [ ] **T15.3** Quotes & RFQs list/detail.
- [ ] **T15.4** Addresses CRUD; company profile (view, resubmit after rejection).
- [ ] **T15.5** Downloads (invoices, price lists).
- [ ] **T15.6** Cancellation request (before dispatch); data-deletion request (DPDP). [AC-4, AC-5]

## Phase 16 — Admin panel
- [ ] **T16.1** `AdminShell`, role guard, dashboard KPIs. [AD-1]
- [ ] **T16.2** Brands & categories CRUD (tree drag-sort, icons, spec filters, alt text). [AD-3]
- [ ] **T16.3** Products DataTable + edit drawer (basics, pricing, inventory, specs, media, documents, SEO, flags). [AD-3]
- [ ] **T16.4** **Import wizard** (XLSX/CSV → map → validate → preview → upsert by SKU → report + error file); image bulk upload matched by SKU. [AD-2]
- [ ] **T16.5** Export catalogue/prices/stock to XLSX. [AD-2]
- [ ] **T16.6** B2B approvals queue (approve / reject with reason / suspend). [AD-5]
- [ ] **T16.7** RFQ inbox + `QuoteBuilder` + send quote (PDF + HTML email). [AD-6]
- [ ] **T16.8** Orders: filters, status transitions, confirm NEFT, courier + AWB (manual), invoice & packing slip print, refunds via Razorpay. [AD-7]
- [ ] **T16.9** Price-list manager. [AD-8]
- [ ] **T16.10** Banners/offers manager with schedule (migrate R0 hero content); clearance/economy bulk tagging. [AD-9, OF-1, OF-4]
- [ ] **T16.11** Enquiries inbox (status, assignee, source, attachments, **convert to RFQ**). [AD-10]
- [ ] **T16.12** Staff user management (invite, role).

**Exit:** owner can load the real catalogue and run daily operations without a developer.

## Phase 17 — R1 hardening & launch
- [ ] **T17.1** Load the real catalogue via import; fix data issues with the owner.
- [ ] **T17.2** Replace all `SEED` shop content; R1 policy pages (shipping, returns & refunds, cancellation, grievance officer) reviewed by owner/advisor. [PS-6]
- [ ] **T17.3** SEO pass: metadata, JSON-LD validation, sitemap, robots, canonical, `noindex` rules.
- [ ] **T17.4** Performance pass: Core Web Vitals green on mobile for Home, listing, PDP.
- [ ] **T17.5** Accessibility audit (axe + keyboard + screen readers), incl. checkout and Razorpay flow.
- [ ] **T17.6** Security pass: RLS review, CSP update for Razorpay, secret scan, dependency audit, admin MFA on.
- [ ] **T17.7** Full E2E regression suite green on preview.
- [ ] **T17.8** Domain + SSL; business email DNS (SPF/DKIM/DMARC) for Resend; production keys (Turnstile, GA4, Razorpay live); tracking QA ([`LAUNCH-PLAN.md §7`](LAUNCH-PLAN.md#7-success-metrics)): GA4 events and conversions, UTMs, Search Console, sitemap. **Blocks paid campaigns.**
- [ ] **T17.9** Backups (PITR) enabled, restore drill, uptime monitoring.
- [ ] **T17.10** Owner & staff training + short admin guide.
- [ ] **T17.11** 🚀 **Public launch of the whole site (company site + shop)** and run the launch campaign ([`LAUNCH-PLAN.md`](LAUNCH-PLAN.md)); monitor errors, enquiries and orders for 2 weeks.

---

# Part C — Later releases

## Phase 18 — Release 2
- [ ] **T18.1** Customer groups + **tier & customer-specific pricing** (`price_tiers`, price resolution in `features/pricing`, tier table on PDP). [B2B-2, AD-4]
- [ ] **T18.2** Hindi UI translations + language switch (`/hi`). [GL-8]
- [ ] **T18.3** Phone OTP login (MSG91, DLT registration). [AC-1]
- [ ] **T18.4** WhatsApp/SMS notifications (order, quote, approval). [CO-8]
- [ ] **T18.5** COD for B2C with cap. [CO-5]
- [ ] **T18.6** Coupons / offer codes. [CO-6]
- [ ] **T18.7** Saved lists & reorder; PO number + PO upload at checkout. [B2B-8, B2B-9]
- [ ] **T18.8** Returns requests. [AC-4]
- [ ] **T18.9** Variant picker UI on PDP. [CA-4]
- [ ] **T18.10** Side widget (recently viewed, saved, cart). [GL-5]
- [ ] **T18.11** Shipping aggregator integration (rates, AWB, tracking). [CO-7]
- [ ] **T18.12** Reports (sales by brand/category, top SKUs, RFQ conversion, enquiry sources) + audit log viewer. [AD-11, AD-12]
- [ ] **T18.13** Newsletter sending (to subscribers collected since R0). [OF-5]

## Phase 19 — Release 3
- [ ] **T19.1** Credit terms, credit limits, outstanding ledger, payment reminders. [B2B-10]
- [ ] **T19.2** Multi-user companies (buyer / approver roles). [B2B-7]
- [ ] **T19.3** Tally / ERP stock & price sync.
- [ ] **T19.4** Verified reviews; product compare. [CA-9, CA-10]
- [ ] **T19.5** Blog / buying guides. [PS-7]
- [ ] **T19.6** Move search to Meilisearch/Typesense if the catalogue exceeds 100k SKUs.

---

## Suggested order of work with Claude Code

```
R0 ── Phase 0 (owner) ─┬─> 1 Setup ─> 2 Shell ─> 3 DB (R0) ─> 4 Presentation site ─> 5 Sign-off on preview
                       └─> Claude Design R0 prompts (T0.8) feed Phases 2 and 4

R1 ── Phase 6 (owner) ─┬─> 7 DB (commerce) ─> 8 Auth ─┬─> 9 Shop shell & catalogue ─> 10 Search
                       │                              ├─> 11 Cart ─> 12 Tax ─> 13 Checkout
                       │                              └─> 14 B2B ─> 15 Account
                       └─> Claude Design R1 prompts (T6.5)        16 Admin (can start after 7;
                                                                     import before 17)
                                                                  17 Public launch 🚀 (R0 + R1)
```

Prompt to start each Claude Code session:
> "Read `docs/README.md`, `docs/RULES.md`, `docs/ARCHITECTURE.md` and `docs/TASKS.md`. Do task **T#.#** only. List the files you will create/change, then build it, run typecheck/lint/tests (incl. axe), and tick the task."
