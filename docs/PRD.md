# Mojo Tools — Product Requirements Document (PRD)

| Field | Value |
|---|---|
| Product | Mojo Tools corporate website + B2B/B2C e-commerce platform |
| Owner | Yash (Mojo Tools) |
| Version | **0.2**: consolidated and corrected (see [`CHANGELOG.md`](CHANGELOG.md)) |
| Date | 08 Oct 2026 |
| Companion docs | [`ARCHITECTURE.md`](ARCHITECTURE.md), [`RULES.md`](RULES.md), [`DESIGN.md`](DESIGN.md), [`TASKS.md`](TASKS.md), [`LAUNCH-PLAN.md`](LAUNCH-PLAN.md), [`DECISIONS.md`](DECISIONS.md), [`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md) |

> **Status legend** used across all docs: ✅ decided · 🟡 default assumed, confirm with owner · ❓ open question (tracked in [`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md)).
>
> **Release legend:** **R0** = company site (built first) · **R1** = e-commerce MVP · **R2**, **R3** = later releases. See §12.

---

## 1. Background

Mojo Tools is an established trader of **tools, machinery and hardware materials** with a running shop/warehouse and an existing customer base. Sales are mostly **B2B** (contractors, workshops, factories, resellers, institutional buyers), with a smaller **B2C** walk-in / retail segment. All sales are offline today.

Today the business has no online presence that lets buyers browse the catalogue, check stock, get wholesale pricing or place orders. The owner already holds the full catalogue data: product names, **brand-wise (company-wise) categories, SKU codes**, etc.

**Delivery approach (✅ decided 07 Oct 2026):** build and launch the **company site first (R0)**, then add the e-commerce shop (R1 onward) on the same codebase. Product data work starts with R1.

## 2. Goals

| # | Goal | Measure of success | Release |
|---|---|---|---|
| G1 | Establish a credible brand presence (presentation site) | Site live, indexed on Google, enquiries arriving via forms/WhatsApp/calls (targets in [`LAUNCH-PLAN.md`](LAUNCH-PLAN.md)) | R0 |
| G2 | Let B2B buyers find products fast by **brand, category or SKU** | Search-to-product < 3 clicks; SKU search returns exact match first | R1 |
| G3 | Capture B2B demand through **RFQ / bulk quote** and online orders | RFQs (R0: quote enquiries) per month, quote → order conversion | R0 (enquiry) → R1 (RFQ) |
| G4 | Sell online to B2C buyers with standard checkout | Online orders per month, cart conversion | R1 |
| G5 | Reduce sales-team load for price queries | **Brand-wise wholesale price list PDFs** downloadable by verified dealers (R0: requested via enquiry form) | R1 |
| G6 | Move stock-clearance and economy items | Sales from *Stock Clearance* and *Economy Series* sections | R1 |

### Non-goals (v1)
- Marketplace for third-party sellers.
- Native mobile apps (responsive web only; PWA optional later).
- Full ERP / accounting replacement.
- Credit / pay-later ledgers (R3).

## 3. Users & personas

| Persona | Description | Key needs |
|---|---|---|
| **B2B Buyer: Contractor / Workshop** | Buys repeatedly, knows SKUs, price-sensitive | SKU search, quick bulk order, tier pricing, GST invoice, reorder |
| **B2B Buyer: Procurement (factory / institution)** | Needs quotes approved internally | RFQ, downloadable quote PDF, GST details, PO upload |
| **Dealer / Reseller** | Resells brands Mojo distributes | Wholesale price list PDFs, dealer pricing, stock visibility |
| **B2C Buyer** | DIY / small purchase, mobile-first | Browse, offers, simple checkout, UPI/cards |
| **Admin: Owner / Manager** | Runs the business | Catalogue, prices, orders, RFQs, approvals, reports |
| **Admin: Sales / Ops staff** | Handles quotes and dispatch | RFQ inbox, order status updates, customer lookup |

## 4. Scope overview

The product has **two faces in one codebase**:

1. **Presentation site** (company website): Home, About Us, Brands/Distributors, Contact Us, policy pages. **Ships in R0.**
2. **Shop** (e-commerce): catalogue, search, product pages, cart, checkout, B2B features, customer account. **Ships from R1.**

Plus an **Admin panel** to run both (R1; in R0 enquiries arrive by email and are stored in the database).

## 5. Information architecture (sitemap)

```
R0  /                         Home (hero carousel, brands, categories, why-us, stats, quote CTA)
R0  /about                    About Us (story, core purpose, mission, values, stats, why choose us)
R0  /brands                   Brands we distribute (filterable logo grid + stats)
R0  /brands/[brand]           Brand page (R0: info + enquire; R1: + links into shop, price list)
R0  /contact                  Contact Us (info card, enquiry form, map, WhatsApp, help banner)
R0  /policies/[slug]          R0: terms, privacy, accessibility · R1: shipping, returns & refunds,
                              cancellation, grievance officer
R1  /shop                     Shop landing (category bar, banners, category sections)
R1  /shop/c/[...category]     Category listing (left filter sidebar, grid/list)
R1  /shop/b/[brand]           Brand listing
R1  /shop/p/[slug]            Product detail page (PDP)
R1  /shop/search?q=           Search results (name / SKU / brand)
R1  /shop/clearance           Stock Clearance Sale
R1  /shop/economy             Economy Series
R1  /shop/offers              Offers & deals
R1  /price-lists              Brand-wise wholesale price list PDFs (gated for verified B2B)
R1  /quick-order              Bulk add by SKU + qty (paste / CSV)
R1  /rfq                      Request for Quote (cart-to-quote or form)
R1  /cart, /checkout          Cart and checkout
R1  /account/...              Dashboard, orders, quotes, addresses, company profile, downloads
R1  /auth/...                 Login, register (B2C / B2B), reset · OTP in R2
R1  /admin/...                Admin panel
```

English URLs carry **no locale prefix**; Hindi (R2) lives under `/hi/...` (see [`ARCHITECTURE.md §3`](ARCHITECTURE.md#3-route-map)).

## 6. Functional requirements

**Rel** = the release that ships the requirement. Original priorities map as P0 → R0/R1, P1 → R2 (with the exceptions noted), P2 → R3.

### 6.1 Global (all pages)
| ID | Requirement | Rel |
|---|---|---|
| GL-1 | **Upper horizontal navigation.** **R1 full version:** logo, large search (name / SKU / brand), Categories mega-menu, Brands menu, **Stock Clearance**, **Economy Series**, Offers, Price Lists, About, Contact, Support, **Quote / Order** button, Login/Register, Cart. **R0 version:** logo, Home, About, Brands, Contact, phone, WhatsApp, yellow **Get a Quote** button. The **EN / हिंदी switch appears only in R2**, once the Hindi UI exists. | R0 / R1 |
| GL-2 | Mega-menu for categories (multi-column, sub-categories, icons) | R1 |
| GL-3 | **Footer:** trust strip (genuine products, GST invoice, help desk; *pan-India delivery* and *secure payment* only once true, R1), link columns (Company, Help, Shop, Account, Policies; Shop/Account from R1), contact, social, payment icons (R1), GST registration badge | R0 / R1 |
| GL-4 | Floating WhatsApp / help button | R0 |
| GL-5 | Floating side widget: Recently viewed, Saved list, Cart (desktop) | R2 |
| GL-6 | Cookie consent banner (Accept all / Reject non-essential / Manage). Analytics loads only after consent. | R0 |
| GL-7 | Responsive: mobile, tablet, desktop | R0 |
| GL-8 | Hindi translation of UI strings (product data stays as entered) | R2 |
| GL-9 | Accessibility statement page with a contact for reporting problems | R0 |

### 6.2 Presentation site
| ID | Requirement | Rel |
|---|---|---|
| PS-1 | **Home hero:** full-width image carousel, bold uppercase headline, short copy, single yellow CTA, numbered pager + pause (Stanley/DeWalt style). Must meet the carousel accessibility spec in [`DESIGN.md §8`](DESIGN.md#8-accessibility-specification). | R0 |
| PS-2 | Home sections. **R0:** category tiles (showcase; open the enquiry form pre-filled), featured brands strip, why-choose-us, stats counters, B2B CTA ("Get a bulk quote"), testimonials (real only), warehouse/visit-us band, "online ordering coming soon" notice. **R1 adds:** clearance/economy promos, featured product rail, links into the shop. | R0 / R1 |
| PS-3 | **About Us:** hero, company story/timeline, image + Core Purpose / Mission / Values accordion, stats strip (years, SKUs, brands, customers), Why Choose Us cards, warehouse/team photos | R0 |
| PS-4 | **Brands / Distributors:** logo grid with filter chips (by product type), stats counters, each logo links to its brand page. **Brand page R0:** logo, about, product range, authorised-distributor badge (only where authorised ❓), "Enquire about this brand" / "Request price list" CTAs. **R1 adds:** brand's categories into the shop, top products rail, gated price-list download, "Shop all". | R0 / R1 |
| PS-5 | **Contact Us:** info card (address, hours, phone, email, GSTIN), enquiry form (name, email, mobile, company, enquiry type, message, optional attachment, consent, captcha), Google map with text address + directions link, "Need help choosing the right tool?" banner (Call / WhatsApp / **Raise a support request** = enquiry of type *support*), newsletter / "notify me when online ordering launches" signup + Request-a-Quote block | R0 |
| PS-6 | Policy pages. **R0:** terms, privacy, accessibility. **R1:** shipping, returns & refunds, cancellation, grievance officer. | R0 / R1 |
| PS-7 | Blog / buying guides | R3 |
| PS-8 | **Enquiry / quote request form** (the R0 stand-in for RFQ): types *contact*, *quote*, *price list*, *dealer*, *support*; optional brand/category pre-fill, optional GSTIN, file upload (PDF/XLSX/CSV/JPG/PNG/WEBP, ≤ 10 MB). Stored, emailed to sales, auto-reply to the customer. In R1 a *quote* enquiry can be converted into an RFQ. | R0 |

### 6.3 Catalogue & discovery
| ID | Requirement | Rel |
|---|---|---|
| CA-1 | Category tree (≥ 3 levels) by **tool / material type** | R1 (R0 uses top-level categories only, for showcase tiles) |
| CA-2 | Brand as a first-class dimension; **company-wise categories** (brand → its categories) | R1 (brands table exists from R0) |
| CA-3 | Product fields: name, slug, SKU, brand, categories, images (+ alt text), specs (key–value), description, unit (pc/box/set/kg/m), MOQ, pack size, HSN, GST %, MRP, B2C price, B2B tier prices (R2), stock status, weight/dims, documents (datasheet/manual), **country of origin**, tags (clearance, economy, new, offer) | R1 |
| CA-4 | Variants (e.g. size/voltage), each with its own SKU, price and stock. **Data model from R1** (every product has ≥ 1 variant); **variant picker UI in R2.** | R1 / R2 |
| CA-5 | **Shop landing:** icon category bar, hero banner carousel with brand tabs, promo tiles, per-category sections (top brands + sub-category tiles + product rail) | R1 |
| CA-6 | **Listing page with left filter sidebar:** category, brand, price range, availability, specs (dynamic per category), clearance/economy; sort (relevance, price, newest); grid/list toggle; page size; pagination | R1 |
| CA-7 | Search: typo-tolerant name search, exact & prefix **SKU** match ranked first, brand match, autocomplete with thumbnails | R1 |
| CA-8 | PDP: gallery, title, brand, SKU (copyable), price (incl. and excl. GST), "Need bulk? Get a quote" prompt, tier price table (R2), MOQ/pack, stock, qty stepper, Add to cart, **Add to quote**, specs table, documents, country of origin, related products, recently viewed | R1 |
| CA-9 | Compare products (up to 4) | R3 |
| CA-10 | Product reviews (verified buyers only) | R3 |

### 6.4 B2B features
| ID | Requirement | Rel |
|---|---|---|
| B2B-1 | **Business account registration** with company name, GSTIN (format + checksum validation), address, contact; status `pending → approved / rejected` (+ `suspended`) by admin | R1 |
| B2B-2 | **Customer groups & tier pricing:** price by group (e.g. Retail, Dealer, Contractor) and quantity slabs; customer-specific overrides. At R1, special/bulk pricing is only given through RFQ; the schema is built tier-ready. | R2 |
| B2B-3 | **RFQ / Request for Quote** (the R1 mechanism for B2B / bulk pricing): from cart, PDP "Add to quote", or a free-form form (item list + file upload). Admin responds with a priced quote (validity date) → buyer accepts → converts to order | R1 |
| B2B-4 | **Quick order:** paste/enter SKU + qty lines or upload CSV; shows matches and errors, then adds to cart | R1 |
| B2B-5 | **Brand-wise wholesale price list PDFs:** brand logo cards, each with a list of downloadable PDFs (title + effective date); visible to approved B2B accounts (public view shows "Log in as a business customer to download"). R0: requested via enquiry form. | R1 |
| B2B-6 | GST tax invoice with buyer GSTIN; CGST/SGST vs IGST by place of supply | R1 |
| B2B-7 | Multiple users per company (buyer, approver) | R3 |
| B2B-8 | PO number + PO file upload at checkout | R2 |
| B2B-9 | Saved lists / reorder from past order | R2 |
| B2B-10 | Credit terms (Net 15/30), credit limit, outstanding ledger | R3 |

### 6.5 Cart, checkout & payments
| ID | Requirement | Rel |
|---|---|---|
| CO-1 | Persistent cart (guest cart merged on login), MOQ & pack-size enforcement, stock check | R1 |
| CO-2 | Checkout: address (shipping/billing), GSTIN (auto-filled for B2B), delivery option (ship / pickup from warehouse), order notes | R1 |
| CO-3 | Payment: **Razorpay** (UPI, cards, netbanking, wallets) 🟡 | R1 |
| CO-4 | **Bank transfer / NEFT** on proforma invoice for approved B2B (order stays `awaiting_payment` until admin confirms) 🟡 | R1 |
| CO-5 | Cash on delivery for B2C with order value cap 🟡 | R2 |
| CO-6 | Coupons / offer codes | R2 |
| CO-7 | Shipping charge rules (free above threshold, flat, pincode serviceability list). **R1: rules engine + manual courier/AWB entry by admin; R2: live rates and AWB from a shipping aggregator.** | R1 / R2 |
| CO-8 | Order confirmation by email (R1); SMS/WhatsApp (R2) | R1 / R2 |

### 6.6 Customer account
| ID | Requirement | Rel |
|---|---|---|
| AC-1 | Sign up / login: email + password and Google (R1); **mobile OTP in R2**, when the SMS provider (MSG91, DLT-registered) is live 🟡 | R1 / R2 |
| AC-2 | Dashboard: orders, quotes, addresses, company profile, downloads (invoices, price lists) | R1 |
| AC-3 | Order tracking with status timeline (placed → confirmed → packed → dispatched → delivered) + courier tracking link (manual AWB in R1) | R1 |
| AC-4 | **Cancellation request before dispatch (R1)**; returns requests (R2) | R1 / R2 |
| AC-5 | Data-deletion request (DPDP Act) | R1 |

### 6.7 Offers & merchandising
| ID | Requirement | Rel |
|---|---|---|
| OF-1 | Admin-managed banners (home hero, shop hero, promo tiles) with schedule. R0: hero slides managed in code/content files. | R1 |
| OF-2 | **Stock Clearance Sale** section (tag-driven, shows % off, limited stock) | R1 |
| OF-3 | **Economy Series** section (budget range, distinct badge) | R1 |
| OF-4 | Offer cards / misc info cards (first-order discount, register-as-dealer, bulk benefits) | R1 |
| OF-5 | Newsletter: **collect subscribers from R0**; send campaigns from R2 | R0 / R2 |

### 6.8 Admin panel
| ID | Requirement | Rel |
|---|---|---|
| AD-1 | Role-based access: Owner, Manager, Sales, Catalogue editor | R1 |
| AD-2 | **Bulk catalogue import/export via CSV/XLSX** (brands, categories, products, prices, stock) with validation report | R1 |
| AD-3 | CRUD: products, brands, categories, images, specs, documents | R1 |
| AD-4 | Pricing: customer groups, tier prices, overrides | R2 |
| AD-5 | B2B account approvals (view GSTIN, approve/reject/suspend; assign group from R2) | R1 |
| AD-6 | RFQ inbox: price lines, add notes, send quote (PDF + email), track status | R1 |
| AD-7 | Orders: list/filter, status updates, confirm NEFT payment, add courier + AWB, print invoice & packing slip | R1 |
| AD-8 | Price-list PDF manager (upload per brand, effective date, visibility) | R1 |
| AD-9 | Banners/offers, clearance & economy tagging | R1 |
| AD-10 | Enquiries inbox (R0: email alerts + database only; inbox UI in R1, including "convert to RFQ") | R1 |
| AD-11 | Reports: sales by brand/category, top SKUs, RFQ conversion, enquiry sources | R2 |
| AD-12 | Audit log of price/stock/status changes (written from R1, viewer in R2) | R1 / R2 |

## 7. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | LCP < 2.5 s, CLS < 0.1, INP < 200 ms on 4G mobile; listing pages server-rendered and cached; images via CDN in AVIF/WebP |
| Scale | ≥ 50,000 SKUs, ≥ 200 brands without redesign |
| Availability | 99.5 % monthly |
| Security | OWASP Top 10; Postgres Row-Level Security; no card data stored (PCI handled by Razorpay); admin 2FA; captcha + rate limits on public forms |
| Privacy & legal | India DPDP Act 2023: consent on forms, consent-gated analytics, data-deletion requests. IT Act. Consumer Protection (E-Commerce) Rules 2020 (from R1): seller details, grievance officer, return policy, country of origin on PDP |
| Tax | GST-compliant invoices (HSN, rates, place of supply); invoice numbering per financial year |
| SEO | SSR, clean URLs, sitemap.xml, robots, schema.org Organization / LocalBusiness / Breadcrumb (R0), Product (R1), canonical tags |
| Accessibility | **WCAG 2.2 AA**, enforced by automated checks in CI plus a manual screen-reader pass before each release (see [`DESIGN.md §8`](DESIGN.md#8-accessibility-specification), [`RULES.md §6`](RULES.md#6-accessibility-rules)) |
| Browser support | Last 2 versions of Chrome, Edge, Safari, Firefox; Android Chrome; iOS Safari |
| Localisation | English default; Hindi UI (R2); INR; Indian number format (₹1,23,456.00); dates `07 Oct 2026`; phones `+91 98765 43210` |
| Analytics | GA4 (after consent) + server-side events. R0: lead funnel (page → enquiry / WhatsApp / call) with UTM attribution. R1: shop funnel (search → PDP → cart → checkout / RFQ). Event list in [`ARCHITECTURE.md §11`](ARCHITECTURE.md#11-analytics--attribution). |

## 8. Key user flows

0. **Enquiry (R0):** any page → "Get a Quote" / brand or category CTA → enquiry form (pre-filled) + captcha → stored → email to sales + auto-reply → sales follows up by phone/WhatsApp.
1. **B2C purchase (R1):** Home → category/search → listing (filter) → PDP → cart → checkout → pay (Razorpay) → confirmation.
2. **B2B registration (R1):** Register as business → GSTIN + details → `pending` → admin approves → buyer gets GST invoices, RFQ, quick order, NEFT and price-list downloads.
3. **RFQ (R1):** Add items to quote (or upload list) → submit → admin prices → buyer gets email + PDF → accepts → order created → pay (NEFT/online).
4. **Quick order (R1):** Paste `SKU, qty` lines → validate → add all to cart → checkout.
5. **Price list download (R1):** Price Lists page → brand card → download PDF (approved B2B only).
6. **Contact enquiry (R0):** Contact page → form + captcha → stored + emailed to sales → auto-reply.

## 9. Data inputs from owner

| Data | Format expected | Needed for | Status |
|---|---|---|---|
| Mojo Tools logo + brand colours | SVG | R0 | ❓ |
| Business details: legal name, address, GSTIN, hours, phone, WhatsApp, email | Text | R0 | ❓ |
| Company content: story, purpose, mission, values, real stats, photos | Text + images | R0 | ❓ |
| Brand list + logos + product types per brand (+ which brands Mojo is authorised for) | PNG/SVG + list | R0 | ❓ |
| Top-level categories with one image each | List + images | R0 | ✅ owner has company-wise categories; images ❓ |
| Hero banner images / slogans | JPG + text | R0 | ❓ |
| Domain name + business email | — | R0 | ❓ |
| Product master (name, SKU, brand, category, specs, unit, HSN, GST %, MRP, prices, stock, country of origin) | XLSX/CSV per admin template | R1 | ✅ owner has it |
| Full category tree + icons | XLSX | R1 | ✅ |
| Product images | JPG/PNG, named by SKU | R1 | ❓ |
| Wholesale price list PDFs per brand | PDF | R1 | ❓ |

## 10. Assumptions

| # | Item | Status |
|---|---|---|
| 1 | Stack: Next.js + Supabase + Vercel | 🟡 |
| 2 | R1 B2B set: **RFQ + GST invoices + business account verification**; tier/customer pricing in R2; credit terms in R3 | ✅ |
| 3 | Payments: Razorpay + NEFT on proforma in R1; COD for B2C in R2 | 🟡 |
| 4 | Inventory master = website admin, with CSV/XLSX import (no ERP sync until R3). Is Tally used? | 🟡 ❓ |
| 5 | Prices shown publicly to everyone (single selling price + MRP); bulk pricing via RFQ until R2 | 🟡 |
| 6 | Single warehouse / location | 🟡 ❓ |
| 7 | Delivery: own vehicle locally + courier nationally; aggregator (e.g. Shiprocket) integrated in R2 | 🟡 ❓ |
| 8 | Brand colours: industrial yellow + charcoal (tokens in `DESIGN.md §2`) until the logo is supplied | 🟡 |
| 9 | Prices stored GST-inclusive for display | 🟡 |
| 10 | Mobile OTP login deferred to R2 | 🟡 |
| 11 | R0 is English only | 🟡 |

## 11. Reference mapping (from the owner's reference document)

| Section | Reference | What to take |
|---|---|---|
| Hero | stanleytools.com, dewalt.com | Full-bleed photo carousel, bold condensed/extended uppercase headline, yellow CTA, numbered pager + pause; DeWalt's dark frame and heavy font |
| About Us | vashiisl.com/about-us (viewed at ~60 % zoom), khandelwalbusar.com | Image + Core Purpose / Mission / Values accordion, stats strip, Why-Choose cards |
| Brands / Distributors | khandelwalbusar.com/customers | Logo grid with filter chips, stats counters |
| Contact Us | toolworld.in/contact (viewed at ~50 % zoom) | Info card + form + captcha, help banner (Call/WhatsApp/Support), newsletter + RFQ block, multi-branch footer |
| Left filter sidebar | liontoolsmart.com | Categories / Brand / Price checkboxes, grid-density toggle, sort, per-page |
| Shop landing | moglix.com | Icon category bar, mega-menu, hero carousel with brand tabs, promo tiles |
| Category sections | moglix.com | Per-category block: top brands + sub-category tiles + product rail with View All |
| Price lists | mundhrabrothers.com/price-list | Brand logo + list of PDFs with Download buttons, effective dates |
| Offers / cards | in.misumi-ec.com | "Search by Category" side list, promo banners, register/first-order bar, floating side widget |
| Upper nav | in.misumi-ec.com | Categories + Brand dropdowns, Economy Series, Stock Clearance, Support, Quote/Order, language switch |
| Footer | moglix.com | Trust strip, 5 link columns, contact, socials, legal bar |

## 12. Release plan

| Release | Contents |
|---|---|
| **R0: Company site** (current) | Home, About, Brands + brand pages, Contact, terms/privacy/accessibility; R0 header/footer; WhatsApp button; cookie consent; enquiry / quote request form with attachments and attribution; newsletter / notify-me signup; SEO (Organization/LocalBusiness), GA4 lead events; launch campaign ([`LAUNCH-PLAN.md`](LAUNCH-PLAN.md)) |
| **R1: E-commerce MVP** | Full header + mega-menu, catalogue + search + filters, cart/checkout (Razorpay + NEFT), B2C & B2B accounts (email + Google) with GSTIN verification, RFQ, quick order, price-list PDFs, clearance/economy/offers, GST invoices, shipping rules with manual AWB, cancellation & data-deletion requests, admin essentials (incl. enquiries inbox and catalogue import), R1 policy pages |
| **R2** | Tier & customer-specific pricing, Hindi UI + language switch, mobile OTP, WhatsApp/SMS notifications, COD, coupons, saved lists/reorder, PO upload, returns, variant picker, shipping aggregator, newsletter sending, reports, audit-log viewer, side widget |
| **R3** | Credit terms & ledger, multi-user companies, ERP/Tally sync, reviews, compare, blog, external search engine if > 100k SKUs |
