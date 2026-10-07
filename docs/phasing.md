# Phasing: company site first, e-commerce later

**Decided 2026-10-07 by the owner:** build and launch the **presentation (company) site first**.
The e-commerce part (shop, checkout, B2B tools) starts once the main site is live.
Product data files are many and will be documented in the e-commerce phase.

This changes the PRD's release plan (R1/R2/R3, see [`01-prd-summary.md`](01-prd-summary.md#10-release-plan)).
A new **Phase 1** comes before R1, and R1 becomes the first e-commerce release.

| Phase | What ships | Status |
|-------|-----------|--------|
| **Phase 1: Company site** | Presentation site + lead capture + minimal admin | ▶️ Current |
| **Phase 2: E-commerce MVP** | The PRD's R1 minus whatever Phase 1 already delivered | Later |
| **Phase 3 / 4** | The PRD's R2 / R3 | Later |

---

## Phase 1 scope

### In scope

| PRD ID | Item | Phase 1 notes |
|--------|------|---------------|
| PS-1 | Home hero carousel (Stanley/DeWalt style) | As specified |
| PS-2 | Home sections | Category tiles and brand strip are **showcase only** (no links into a shop). Clearance/economy promos become "enquire" CTAs or are dropped. Bulk-quote CTA leads to the enquiry form. |
| PS-3 | About Us | As specified |
| PS-4 | Brands / distributors logo grid with filter chips + stats | As specified |
| — | `/brands/[brand]` pages | Brand info + product range description + "Enquire about this brand" CTA (no shop link yet) |
| PS-5 | Contact Us | As specified: info card, form + captcha, map, Call/WhatsApp banner, newsletter signup |
| PS-6 | Policy pages | **Terms and privacy only.** Shipping, returns, refunds and cancellation pages wait for Phase 2. |
| GL-1 | Top navigation | **Trimmed:** logo, Home, About, Brands, Contact, a "Get a Quote / Enquire" button, WhatsApp. Search, mega-menu, Clearance, Economy, Offers, Login and Cart wait for Phase 2. |
| GL-3 | Footer | Trust strip, Company / Contact link columns, socials, GST badge. Shop, Account and payment-icon items wait. |
| GL-4 | Floating WhatsApp button | As specified |
| GL-6 | Cookie consent | As specified |
| GL-7 | Responsive | As specified |
| — | **Enquiry / quote request form** (simple) | Name, company, mobile, email, GSTIN (optional), what they need (free text + optional file upload). Stored and emailed to sales. This is the Phase 1 stand-in for RFQ (B2B-3). |
| AD-10 | Enquiries inbox | Minimal admin, or email-only to start (see P1-Q3) |
| OF-1 | Banner management | Optional: hero slides can be hard-coded at first (see P1-Q4) |
| §7 | Performance, SEO, accessibility, analytics, DPDP consent | All apply to Phase 1. Schema.org Organization + Breadcrumb now; Product schema in Phase 2. |

### Deferred to Phase 2+

Shop and catalogue (CA-*) · search · cart / checkout / payments (CO-*) · customer accounts (AC-*) · B2B registration, quick order, GST invoices (B2B-*) · price list PDFs (B2B-5) · clearance / economy / offers sections (OF-2/3/4) · most of the admin panel (AD-1 to AD-9, AD-11, AD-12) · product data import.

### Build so Phase 2 slots in cleanly

- Use the same codebase and stack planned for the shop (PRD: Next.js + Supabase + Vercel 🟡), so the shop is added rather than migrated.
- Keep the PRD's URL structure (`/about`, `/brands/[brand]`, `/contact`) so links indexed by Google keep working.
- Store brands in the database now (name, slug, logo, product types, description). The shop needs them later as a first-class dimension.
- Store enquiries in a table shaped so they can later be converted into RFQs.

## Phase 1 data needed from the owner

Only what the company site needs (product files are **not** needed yet):

- Mojo Tools logo + brand colours (A5)
- Business details: address, GSTIN, hours, phone, WhatsApp, email (A6)
- Company story, purpose, mission, values, stats, team/warehouse photos (A4)
- Brand list + logos + product types per brand (A1), plus a short line per brand if possible
- Top-level categories with an image each, for the showcase tiles
- Hero banner images / slogans
- Domain + business email (Q4)

## Phase 1 open questions

| # | Question | Default if unanswered |
|---|----------|-----------------------|
| P1-Q1 | Should home-page category tiles link anywhere before the shop exists? | No link; tile opens the enquiry form pre-filled with the category |
| P1-Q2 | Show the Hindi language switch in Phase 1? | No; English only |
| P1-Q3 | Enquiries: admin inbox, or just email to sales (+ stored in the database)? | Email + database, no admin UI yet |
| P1-Q4 | Hero banners editable by staff, or fixed in code? | Fixed in code; editable in Phase 2 |
| P1-Q5 | Offer price list PDFs on request via the enquiry form or WhatsApp? | Yes, "Request price list" option in the enquiry form |
| P1-Q6 | Any "coming soon: online ordering" teaser? | Small banner on home page |
