# Mojo Tools — Product Requirements Document (PRD)

| Field | Value |
|---|---|
| Product | Mojo Tools corporate website + B2B/B2C e-commerce platform |
| Owner | Yash (Mojo Tools) |
| Version | 0.1 (draft for build) |
| Date | 07 Oct 2026 |
| Companion docs | `ARCHITECTURE.md`, `RULES.md`, `DESIGN.md`, `TASKS.md` |

> **Status legend** used across all docs: ✅ decided · 🟡 default assumed, confirm with owner · ❓ open question.

---

## 1. Background

Mojo Tools is an established trader of **tools, machinery and hardware materials** with a running shop/warehouse and an existing customer base. Sales are mostly **B2B** (contractors, workshops, factories, resellers, institutional buyers) with a smaller **B2C** walk-in / retail segment.

Today the business has no online presence that lets buyers browse the catalogue, check stock, get wholesale pricing or place orders. The owner already holds the full catalogue data: product names, **brand-wise (company-wise) categories, SKU codes**, etc.

## 2. Goals

| # | Goal | Measure of success |
|---|---|---|
| G1 | Establish a credible brand presence (presentation site) | Site live, indexed on Google, enquiries arriving via forms/WhatsApp |
| G2 | Let B2B buyers find products fast by **brand, category or SKU** | Search-to-product < 3 clicks; SKU search returns exact match first |
| G3 | Capture B2B demand through **RFQ / bulk quote** and online orders | # RFQs per month, quote → order conversion |
| G4 | Sell online to B2C buyers with standard checkout | Online orders per month, cart conversion |
| G5 | Reduce sales-team load for price queries | **Brand-wise wholesale price list PDFs** downloadable by verified dealers |
| G6 | Move stock-clearance and economy items | Sales from *Stock Clearance* and *Economy Series* sections |

### Non-goals (v1)
- Marketplace for third-party sellers.
- Native mobile apps (responsive web only; PWA optional later).
- Full ERP / accounting replacement.
- Credit / pay-later ledgers (planned for a later phase — see §12).

## 3. Users & personas

| Persona | Description | Key needs |
|---|---|---|
| **B2B Buyer — Contractor / Workshop** | Buys repeatedly, knows SKUs, price-sensitive | SKU search, quick bulk order, tier pricing, GST invoice, reorder |
| **B2B Buyer — Procurement (factory/institution)** | Needs quotes approved internally | RFQ, downloadable quote PDF, GST details, PO upload |
| **Dealer / Reseller** | Resells brands Mojo distributes | Wholesale price list PDFs, dealer pricing, stock visibility |
| **B2C Buyer** | DIY / small purchase, mobile-first | Browse, offers, simple checkout, UPI/cards |
| **Admin — Owner / Manager** | Runs the business | Catalogue, prices, orders, RFQs, approvals, reports |
| **Admin — Sales / Ops staff** | Handles quotes and dispatch | RFQ inbox, order status updates, customer lookup |

## 4. Scope overview

The product has **two faces in one codebase**:

1. **Presentation site** (company website): Home, About Us, Brands/Distributors, Contact Us, and legal/policy pages.
2. **Shop** (e-commerce): catalogue, search, product pages, cart, checkout, B2B features, customer account.

Plus an **Admin panel** to run both.

## 5. Information architecture (sitemap)

```
/                         Home (hero carousel, brands, categories, offers, trust, CTA)
/about                    About Us (story, core purpose, mission, values, stats, why choose us)
/brands                   Brands we distribute (filterable logo grid + stats)
/brands/[brand]           Brand landing → links into shop filtered by brand
/contact                  Contact Us (info card, form, map, WhatsApp, branches)
/shop                     Shop landing (category bar, banners, category sections)
/shop/c/[...category]     Category listing (left filter sidebar, grid/list)
/shop/b/[brand]           Brand listing
/shop/p/[slug]            Product detail page (PDP)
/shop/search?q=           Search results (name / SKU / brand)
/shop/clearance           Stock Clearance Sale
/shop/economy             Economy Series
/shop/offers              Offers & deals
/price-lists              Brand-wise wholesale price list PDFs (gated for verified B2B)
/quick-order              Bulk add by SKU + qty (paste / CSV)
/rfq                      Request for Quote (cart-to-quote or form)
/cart, /checkout          Cart and checkout
/account/...              Dashboard, orders, quotes, addresses, company profile, saved lists
/auth/...                 Login, register (B2C / B2B), OTP, reset
/admin/...                Admin panel
/policies/...             Terms, privacy, shipping, returns & refunds, cancellation
```

## 6. Functional requirements

Priority: **P0** = launch, **P1** = soon after launch, **P2** = later.

### 6.1 Global (all pages)
| ID | Requirement | Pri |
|---|---|---|
| GL-1 | **Upper horizontal navigation**: logo, large search (name / SKU / brand), Categories mega-menu, Brand menu, **Stock Clearance Sale**, **Economy Series**, Offers, Support, **Quote / Order** button, language switch (EN / हिंदी), Login/Register, Cart | P0 |
| GL-2 | Mega-menu for categories (multi-column, sub-categories, icons) | P0 |
| GL-3 | **Bottom panel / footer**: trust strip (genuine products, pan-India delivery, secure payment, GST invoice, help desk), link columns (Company, Help, Shop, Account, Policies), contact, social, payment icons, GST registration badge | P0 |
| GL-4 | Floating WhatsApp / help button | P0 |
| GL-5 | Floating side widget: Recently viewed, Saved list, Cart (desktop) | P1 |
| GL-6 | Cookie consent banner | P0 |
| GL-7 | Responsive: mobile, tablet, desktop | P0 |
| GL-8 | Hindi translation of UI strings (product data stays as entered) | P1 |

### 6.2 Presentation site
| ID | Requirement | Pri |
|---|---|---|
| PS-1 | **Home hero**: full-width image carousel, bold uppercase headline, short copy, single yellow CTA, numbered pager + pause (Stanley/DeWalt style) | P0 |
| PS-2 | Home sections: shop-by-category tiles, featured brands strip, clearance/economy promos, why-choose-us, stats counters, B2B CTA ("Get a bulk quote"), testimonials (real only) | P0 |
| PS-3 | **About Us**: hero, company story/timeline, image + Core Purpose / Mission / Values accordion, stats strip (years, SKUs, brands, customers), Why Choose Us cards, warehouse/team photos | P0 |
| PS-4 | **Brands / Distributors**: logo grid with filter chips (by product type), stats counters, each logo links to brand page | P0 |
| PS-5 | **Contact Us**: info card (address, hours, phone, email, GST), enquiry form (name, email, mobile, company, subject, message, captcha), Google map, "Need help choosing the right tool?" banner (Call / WhatsApp / Raise ticket), newsletter + Request-a-Quote block | P0 |
| PS-6 | Policy pages (terms, privacy, shipping, returns, refunds, cancellation) | P0 |
| PS-7 | Blog / buying guides | P2 |

### 6.3 Catalogue & discovery
| ID | Requirement | Pri |
|---|---|---|
| CA-1 | Category tree (≥3 levels) by **tool / material type** | P0 |
| CA-2 | Brand as a first-class dimension; **company-wise categories** (brand → its categories) | P0 |
| CA-3 | Product fields: name, slug, SKU, brand, categories, images, specs (key–value), description, unit (pc/box/set/kg/m), MOQ, pack size, HSN, GST %, MRP, B2C price, B2B tier prices, stock status, weight/dims, documents (datasheet/manual), tags (clearance, economy, new, offer) | P0 |
| CA-4 | Variants (e.g. size/voltage) with own SKU, price and stock | P1 |
| CA-5 | **Shop landing**: icon category bar, hero banner carousel with brand tabs, promo tiles, per-category sections (top brands + sub-category tiles + product rail) | P0 |
| CA-6 | **Listing page with left filter sidebar**: category, brand, price range, availability, specs (dynamic per category), clearance/economy; sort (relevance, price, newest); grid/list toggle; page size; pagination | P0 |
| CA-7 | Search: typo-tolerant name search, exact & prefix **SKU** match ranked first, brand match, autocomplete with thumbnails | P0 |
| CA-8 | PDP: gallery, title, brand, SKU (copyable), price, "Need bulk? Get a quote" prompt, (tier price table from R2), MOQ/pack, stock, qty stepper, Add to cart, **Add to quote**, specs table, documents, related products, recently viewed | P0 |
| CA-9 | Compare products (up to 4) | P2 |
| CA-10 | Product reviews (verified buyers only) | P2 |

### 6.4 B2B features
| ID | Requirement | Pri |
|---|---|---|
| B2B-1 | **Business account registration** with company name, GSTIN (format + checksum validation), address, contact; status `pending → approved / rejected` by admin | P0 |
| B2B-2 | **Customer groups & tier pricing**: price by group (e.g. Retail, Dealer, Contractor) and quantity slabs; customer-specific overrides. *At launch, special/bulk pricing is given only through RFQ; schema is built tier-ready.* | P1 |
| B2B-3 | **RFQ / Request for Quote** (the launch mechanism for B2B / bulk pricing): from cart, PDP "Add to quote", or free-form form (item list + file upload). Admin responds with priced quote (validity date) → buyer accepts → converts to order | P0 |
| B2B-4 | **Quick order**: paste/enter SKU + qty lines or upload CSV; shows matches, errors, adds to cart | P0 |
| B2B-5 | **Brand-wise wholesale price list PDFs**: brand logo cards, each with list of downloadable PDFs (title + effective date); visible to approved B2B accounts (public view shows "Login as dealer to download") | P0 |
| B2B-6 | GST tax invoice with buyer GSTIN; CGST/SGST vs IGST by place of supply | P0 |
| B2B-7 | Multiple users per company (buyer, approver) | P2 |
| B2B-8 | PO number + PO file upload at checkout | P1 |
| B2B-9 | Saved lists / reorder from past order | P1 |
| B2B-10 | Credit terms (Net 15/30), credit limit, outstanding ledger | P2 |

### 6.5 Cart, checkout & payments
| ID | Requirement | Pri |
|---|---|---|
| CO-1 | Persistent cart (guest → merged on login), MOQ & pack-size enforcement, stock check | P0 |
| CO-2 | Checkout: address (shipping/billing), GSTIN (auto-filled for B2B), delivery option (ship / pickup from warehouse), order notes | P0 |
| CO-3 | Payment: **Razorpay** (UPI, cards, netbanking, wallets) 🟡 | P0 |
| CO-4 | **Bank transfer / NEFT** on proforma invoice for B2B (order stays `awaiting_payment` until admin confirms) 🟡 | P0 |
| CO-5 | Cash on delivery for B2C with order value cap 🟡 | P1 |
| CO-6 | Coupons / offer codes | P1 |
| CO-7 | Shipping charge rules (free above threshold, flat, pincode serviceability) | P0 |
| CO-8 | Order confirmation email + SMS/WhatsApp | P0 email / P1 WhatsApp |

### 6.6 Customer account
| ID | Requirement | Pri |
|---|---|---|
| AC-1 | Sign up / login: email + password, **mobile OTP** 🟡, Google | P0 |
| AC-2 | Dashboard: orders, quotes, addresses, company profile, downloads (invoices, price lists) | P0 |
| AC-3 | Order tracking with status timeline (placed → confirmed → packed → dispatched → delivered) + courier tracking link | P0 |
| AC-4 | Returns / cancellation request | P1 |

### 6.7 Offers & merchandising
| ID | Requirement | Pri |
|---|---|---|
| OF-1 | Admin-managed banners (home hero, shop hero, promo tiles) with schedule | P0 |
| OF-2 | **Stock Clearance Sale** section (tag-driven, show % off, limited stock) | P0 |
| OF-3 | **Economy Series** section (budget range, distinct badge) | P0 |
| OF-4 | Offer cards / misc info cards (first-order discount, register-as-dealer, bulk benefits) | P0 |
| OF-5 | Newsletter subscription | P1 |

### 6.8 Admin panel
| ID | Requirement | Pri |
|---|---|---|
| AD-1 | Role-based access: Owner, Manager, Sales, Catalogue editor | P0 |
| AD-2 | **Bulk catalogue import/export via CSV/XLSX** (brands, categories, products, prices, stock) with validation report | P0 |
| AD-3 | CRUD: products, brands, categories, images, specs, documents | P0 |
| AD-4 | Pricing: customer groups, tier prices, overrides | P1 |
| AD-5 | B2B account approvals (view GSTIN, approve/reject; assign group from R2) | P0 |
| AD-6 | RFQ inbox: price lines, add notes, send quote (PDF + email), track status | P0 |
| AD-7 | Orders: list/filter, status updates, confirm NEFT payment, print invoice & packing slip | P0 |
| AD-8 | Price-list PDF manager (upload per brand, effective date, visibility) | P0 |
| AD-9 | Banners/offers, clearance & economy tagging | P0 |
| AD-10 | Contact enquiries inbox | P0 |
| AD-11 | Reports: sales by brand/category, top SKUs, RFQ conversion | P1 |
| AD-12 | Audit log of price/stock/status changes | P1 |

## 7. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | LCP < 2.5 s on 4G mobile; listing pages server-rendered and cached; images via CDN in AVIF/WebP |
| Scale | ≥ 50,000 SKUs, ≥ 200 brands without redesign |
| Availability | 99.5 % monthly |
| Security | OWASP Top 10; Postgres Row-Level Security; no card data stored (PCI handled by Razorpay); admin 2FA |
| Privacy & legal | India DPDP Act 2023 consent & data-deletion request; IT Act; Consumer Protection (E-Commerce) Rules 2020 — seller details, grievance officer, return policy, country of origin on PDP |
| Tax | GST-compliant invoices (HSN, rates, place of supply); invoice numbering per financial year |
| SEO | SSR, clean URLs, sitemap.xml, robots, schema.org Product / Organization / Breadcrumb, canonical tags |
| Accessibility | WCAG 2.2 AA |
| Browser support | Last 2 versions of Chrome, Edge, Safari, Firefox; Android Chrome; iOS Safari |
| Localisation | English default, Hindi UI; INR; Indian number format (₹1,23,456.00) |
| Analytics | GA4 + server events for funnel (search → PDP → cart → checkout / RFQ) |

## 8. Key user flows

1. **B2C purchase**: Home → category/search → listing (filter) → PDP → cart → checkout → pay (Razorpay) → confirmation.
2. **B2B registration**: Register as business → GSTIN + details → `pending` → admin approves → buyer gets GST invoices, RFQ, quick order and price-list downloads.
3. **RFQ**: Add items to quote (or upload list) → submit → admin prices → buyer gets email + PDF → accepts → order created → pay (NEFT/online).
4. **Quick order**: Paste `SKU, qty` lines → validate → add all to cart → checkout.
5. **Price list download**: Price Lists page → brand card → download PDF (approved B2B only).
6. **Contact enquiry**: Contact page → form + captcha → stored + emailed to sales → auto-reply.

## 9. Data inputs from owner

| Data | Format expected | Status |
|---|---|---|
| Product master (name, SKU, brand, category, specs, unit, HSN, GST %, MRP, prices, stock) | XLSX/CSV per template in admin | ✅ owner has it |
| Brand list + logos | PNG/SVG | ❓ |
| Category tree + icons | XLSX | ✅ owner has company-wise categories |
| Product images | JPG/PNG, named by SKU | ❓ |
| Wholesale price list PDFs per brand | PDF | ❓ |
| Company content: story, purpose, mission, values, stats, photos | Text + images | ❓ |
| Mojo Tools logo + brand colours | SVG | ❓ |
| Business details: address, GSTIN, hours, phone, WhatsApp, email | Text | ❓ |

## 10. Assumptions & open questions

| # | Item | Status |
|---|---|---|
| 1 | Stack: Next.js + Supabase + Vercel | 🟡 |
| 2 | Launch B2B set: **RFQ + GST invoices + business account verification**; tier/customer pricing in R2; credit terms in R3 | ✅ |
| 3 | Payments: Razorpay + NEFT on invoice; COD for B2C later | 🟡 |
| 4 | Inventory master = website admin, with CSV/XLSX import (no ERP sync at launch) | 🟡 — ❓ Is Tally used? |
| 5 | Prices shown publicly to everyone (single selling price + MRP); bulk pricing via RFQ until R2 | 🟡 |
| 6 | Single warehouse or multiple locations? (default: single) | ❓ |
| 7 | Delivery: own vehicle locally + courier aggregator (e.g. Shiprocket) nationally? | ❓ |
| 8 | Domain name and business email | ❓ |
| 9 | Brand colours — design uses industrial yellow + charcoal (from Stanley/DeWalt refs) until the logo is supplied | 🟡 |

## 11. Reference mapping (from owner's reference document)

| Section | Reference | What to take |
|---|---|---|
| Hero | stanleytools.com, dewalt.com | Full-bleed photo carousel, bold condensed/extended uppercase headline, yellow CTA, numbered pager + pause; DeWalt's dark frame and heavy font |
| About Us | vashiisl.com/about-us (at ~60 % zoom), khandelwalbusar.com | Image + Core Purpose / Mission / Values accordion, stats strip, Why-Choose cards |
| Brands / Distributors | khandelwalbusar.com/customers | Logo grid with filter chips, stats counters |
| Contact Us | toolworld.in/contact (at ~50 % zoom) | Info card + form + captcha, help banner (Call/WhatsApp/Ticket), newsletter + RFQ block, multi-branch footer |
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
| **R1 — MVP** | Presentation site, catalogue + search + filters, cart/checkout (Razorpay + NEFT), B2C & B2B accounts with GSTIN verification, RFQ, quick order, price-list PDFs, clearance/economy, admin essentials, GST invoices |
| **R2** | Tier & customer-specific pricing, Hindi UI, WhatsApp notifications, COD, coupons, saved lists/reorder, PO upload, reports, audit log, side widget |
| **R3** | Credit terms & ledger, multi-user companies, ERP/Tally sync, reviews, compare, blog |
