# 02 — Architecture Summary

**Source:** [`source-files/ARCHITECTURE.md`](source-files/ARCHITECTURE.md) · a living document, to be updated whenever a phase changes structure.

The architecture describes **how** the whole product (company site + shop + admin) is built.
This summary has two halves: the full picture as written, then the **Phase 1 slice** — what we actually build for the company site now ([`phasing.md`](phasing.md)).

Companion reviews written alongside this file:
- [`02a-accessibility-review.md`](02a-accessibility-review.md): WCAG 2.2 AA review of the architecture choices
- [`02b-launch-campaign-plan.md`](02b-launch-campaign-plan.md): marketing plan for launching the Phase 1 site

---

## Part A: The full architecture, as written

### At a glance

- **One Next.js app** (App Router, TypeScript) serving three surfaces through route groups: `(marketing)`, `(shop)`, `admin` (+ `(auth)`, `account`).
- **Supabase**: Postgres (data + full-text search), Auth (email/password, phone OTP, Google), Storage (images, PDFs), Row-Level Security.
- **Vercel**: hosting, edge CDN, ISR caching, cron jobs.
- **Third parties**: Razorpay (payments), Resend (email), MSG91 / WhatsApp Cloud API (OTP + notifications, R2), Google Maps embed, Cloudflare Turnstile (captcha), GA4.

### Technology stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 + CSS-variable design tokens (from `DESIGN.md`) |
| UI | shadcn/ui (Radix primitives) + lucide-react icons |
| Forms | React Hook Form + Zod, shared client/server schemas |
| Data | `@supabase/ssr` + generated DB types |
| Database | Supabase Postgres 15 with `pg_trgm`, `unaccent`, FTS |
| Files | Supabase Storage: public (product images, brand logos) / private (price lists, invoices, RFQ attachments) behind signed URLs |
| Payments | Razorpay Orders API + webhooks |
| PDF | `@react-pdf/renderer` (invoices, quotes, proforma) |
| Import | SheetJS + Zod row validation |
| Email | Resend + React Email |
| i18n | `next-intl` (EN default, HI in R2), UI strings only |
| Testing | Vitest, Playwright, Supabase local |
| Quality | ESLint, Prettier, Husky + lint-staged, GitHub Actions |
| Monitoring | Vercel Analytics, Sentry, GA4 |

### Rendering

| Route type | Rendering |
|-----------|-----------|
| Marketing pages | Static + ISR, revalidated on content change |
| Category / brand / product | ISR with on-demand revalidation by tag after admin edits |
| Search, cart, checkout, account | Dynamic per request |
| Admin | Dynamic, `noindex`, role-gated in middleware **and** RLS |

### Folder layout (key parts)

- `supabase/migrations/`: timestamped SQL, never edited after merge.
- `src/app/[locale]/(marketing|shop|auth)/`, `account/`, `admin/`. All routes sit under a locale segment.
- `src/components/{ui,layout,marketing,shop,admin}`.
- `src/features/<domain>/`: `queries.ts`, `actions.ts`, `schemas.ts`, `types.ts` per domain (catalog, search, cart, checkout, orders, rfq, accounts, pricing, tax, invoices, price-lists, content, import).
- `src/lib/`: Supabase clients (service-role client is server-only), Razorpay, email, PDF, formatting, GSTIN, Zod-validated `env.ts`.

### Data model (main tables)

| Area | Tables |
|------|--------|
| People | `profiles` (role, account type), `companies` (GSTIN, approval status), `addresses` |
| Catalogue | `brands`, `categories` (tree with `path`, `spec_filters`), `products` (incl. `country_of_origin`, clearance/economy flags, `search_tsv`), `product_variants` (SKU, MRP, price, MOQ, pack size; **every product has at least one variant**), `product_images/specs/documents`, `inventory` |
| Buying | `carts`/`cart_items` (profile or guest token), `rfqs`/`rfq_items`, `quotes`/`quote_items`, `orders`/`order_items`, `payments`, `invoices`, `order_events` |
| Content | `price_list_files`, `banners` (placement + schedule), `enquiries`, `audit_log` |
| Later | `price_tiers` (R2) |

Number formats: RFQ `RFQ-YYYY-#####`, quote `QT-…`, order `MT-YYYY-#####`, invoice per financial year `MT/26-27/00001`.

### Money and tax rules

- All money stored as **paise in `bigint`**, formatted only for display.
- Prices stored **GST-inclusive** for display 🟡 (to be confirmed). The tax split is computed at order time and saved on each order line.
- Place of supply: buyer state = Mojo's state → CGST + SGST; otherwise → IGST.

### Core flows (state machines)

- **B2B verification:** `pending → approved / rejected`, `rejected → pending` on resubmit, `approved ⇄ suspended`.
- **RFQ:** `submitted → in_review → quoted → accepted | rejected | expired`; a cron job expires quotes after `valid_until`. An accepted quote creates an order in `awaiting_payment`.
- **Order:** `awaiting_payment → confirmed → packed → dispatched → delivered → (return_requested → returned)`; cancellation from `awaiting_payment` or `confirmed`. Each step writes an `order_events` row.
- **Payment:** the server creates the Razorpay order, the client verifies the HMAC, and the **`payment.captured` webhook is the source of truth** (idempotent).
- **Catalogue import:** upload XLSX → parse → validate per row → preview errors → upsert by SKU in one transaction → revalidate → report. Images are matched by filename = SKU.

### Search

Weighted tsvector (name > brand > category > description) + trigram SKU index. Order: **exact SKU → SKU prefix → FTS rank → name similarity**. Suggest endpoint returns the top 8 (200 ms debounce). Move to Meilisearch/Typesense beyond ~100k SKUs.

### Security

RLS on every table · staff check via an `is_staff()` SQL function · service-role key server-only · private buckets via short-lived signed URLs · Turnstile + rate limiting on forms and auth · admin MFA (TOTP).

### Environments

Local (Supabase CLI) → Preview (Vercel per PR + Supabase branch, Razorpay test keys) → Production (daily backups / PITR). CI: typecheck → lint → unit → build → Playwright smoke.

### Integrations by release

| Integration | Release |
|-------------|---------|
| Razorpay, Resend, Turnstile, Google Maps, GA4 + Sentry | R1 |
| MSG91 / WhatsApp Cloud API, Shiprocket (or similar) | R2 |
| Tally / ERP sync | R3 |

---

## Part B: Phase 1 slice (company site)

### What Phase 1 uses

| Piece | Phase 1 use |
|-------|-------------|
| Next.js app, `(marketing)` route group | Home, About, Brands, `/brands/[brand]`, Contact, Terms, Privacy. Static + ISR. |
| Tailwind + shadcn/ui + lucide | All UI |
| React Hook Form + Zod | Contact + enquiry forms |
| Supabase Postgres | `brands`, `categories` (top level only, for showcase tiles), `enquiries` |
| Supabase Storage | Public: brand logos, category images, site photos. Private: enquiry attachments. |
| Supabase Auth | **Not needed** unless we build an admin inbox (P1-Q3; default is no) |
| Resend | Enquiry notification to sales + auto-reply to the customer |
| Turnstile | Contact + enquiry forms |
| Google Maps embed | Contact page |
| GA4 + Vercel Analytics + Sentry | Analytics, errors. The event plan is in [`02b-launch-campaign-plan.md`](02b-launch-campaign-plan.md#7-success-metrics). |
| `next-intl` | Set up now, English only (see decision below) |
| CI: typecheck, lint, unit, build, Playwright | From day one, plus axe accessibility checks ([`02a`](02a-accessibility-review.md)) |

**Not used in Phase 1:** Razorpay, `@react-pdf/renderer`, SheetJS import, MSG91/WhatsApp API, search, carts/orders/RFQ/quotes/invoices tables, cron jobs, admin panel.

### Phase 1 adjustments recommended by this review

| # | Recommendation | Why |
|---|----------------|-----|
| AR-1 | **Extend `enquiries`** to be the Phase 1 lead table: `type` (`contact` / `quote` / `price_list` / `dealer`), `name`, `company`, `mobile`, `email`, `gstin` (optional), `message`, `brand_id` / `category_id` (optional, from pre-filled CTAs), `attachment_path`, `status` (`new` / `contacted` / `closed`), `source_page`, `utm_source/medium/campaign`, `consent_at`. | The architecture only says "contact form submissions". Phase 1 also needs quote requests, attribution for the launch campaign, DPDP consent, and a clean path to convert into `rfqs` in Phase 2. |
| AR-2 | Configure `next-intl` with **`localePrefix: 'as-needed'`** so English URLs have no `/en` prefix. | The folder tree puts everything under `[locale]`. If English URLs carry `/en/` now, or gain one later, indexed URLs break. As-needed keeps `/about` clean and adds `/hi/about` in R2. |
| AR-3 | Add a private **`enquiry-attachments`** bucket (or reuse `rfq-attachments`) with size and type limits (PDF, XLSX, CSV, JPG, PNG; ≤10 MB). | The quote form takes file uploads. |
| AR-4 | Hero slides, stats and company copy live in code or a JSON file in Phase 1. The `banners` table comes with the admin in Phase 2. | Matches the P1-Q4 default and avoids building admin early. |
| AR-5 | Set up the **schema for `brands`** fully now (slug, logo, `product_types[]`, description, `is_featured`, `sort`) and seed it from the owner's brand list. | The Brands page needs it, and the shop reuses it unchanged. |
| AR-6 | Add rate limiting + Turnstile on the enquiry endpoint from day one. | The site will be public and indexed, and an open form gets spammed. |
| AR-7 | Confirm framework versions at build time (Next.js 15 / React 19 named in the doc). | Newer stable majors may be out by build time; pick the current stable release. |

### Things the architecture settles from the PRD's open list

| PRD gap | Resolved by |
|---------|-------------|
| I2: variants missing from the release plan | Data model already has `product_variants` with `is_default`. Every product has ≥1 variant, so variants are structurally there from R1; only the UI for choosing variants is later. |
| I3: country of origin missing from product fields | `products.country_of_origin` exists. |
| Stack question (Q5) | Architecture commits to Next.js + Supabase + Vercel (still 🟡 in its own decision log). |

### New inconsistencies / questions raised

| # | Issue | Phase |
|---|-------|-------|
| I5 | **Phone OTP:** the PRD lists mobile OTP as P0 (AC-1), but the architecture puts MSG91 in R2. Either OTP login waits for R2, or MSG91 moves into R1. | Phase 2 |
| I6 | **Shiprocket in R2**, but PRD shipping rules (CO-7) and courier tracking links (AC-3) are P0. R1 would need manual AWB entry + flat/threshold rules with no live rates. | Phase 2 |
| Q9 | Are prices stored **GST-inclusive**? (marked 🟡 in architecture §5) | Phase 2 |
| Q10 | Mojo Tools' own **state** (for CGST/SGST vs IGST) — comes from the business GSTIN (A6). | Phase 2 |
