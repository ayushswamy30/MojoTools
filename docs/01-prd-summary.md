# 01 — PRD Summary (Product Requirements)

**Source:** [`source-files/PRD.md`](source-files/PRD.md) · v0.1 draft for build · dated 07 Oct 2026 · owner: Yash (Mojo Tools)

The PRD defines **what** we are building and **for whom**. It names four companion docs that are still to come:
`ARCHITECTURE.md`, `RULES.md`, `DESIGN.md`, `TASKS.md`.

Status legend used by all briefs: ✅ decided · 🟡 default assumed, confirm with owner · ❓ open question.

---

## 1. The business, as of now

- Mojo Tools is an established trader of **tools, machinery and hardware materials**, with a working shop/warehouse and existing customers.
- Sales are **mostly B2B**: contractors, workshops, factories, resellers and institutional buyers. **B2C** walk-in/retail is the smaller segment.
- **No online presence today.** Buyers can't browse, check stock, get wholesale prices or order online.
- The owner **already has the catalogue data**: product names, brand-wise (company-wise) categories and SKU codes.

## 2. Goals

| # | Goal | Success measure |
|---|------|-----------------|
| G1 | Credible brand presence | Site live, indexed by Google, enquiries arriving |
| G2 | B2B buyers find products fast by **brand / category / SKU** | Search to product in under 3 clicks; exact SKU match ranked first |
| G3 | Capture B2B demand via **RFQ (quote requests)** and orders | RFQs per month, quote-to-order conversion |
| G4 | Sell to B2C online | Online orders, cart conversion |
| G5 | Cut sales-team load on price queries | **Wholesale price list PDFs** for verified dealers |
| G6 | Move clearance and budget stock | Sales from *Stock Clearance* and *Economy Series* |

**Not in v1:** third-party seller marketplace, native mobile apps, ERP/accounting replacement, credit / pay-later (later phase).

## 3. Who uses it

| Persona | Main needs |
|---------|-----------|
| B2B contractor / workshop | SKU search, quick bulk order, tier prices, GST invoice, reorder |
| B2B procurement (factory / institution) | RFQ, quote PDF, GST details, PO upload |
| Dealer / reseller | Wholesale price lists, dealer pricing, stock visibility |
| B2C buyer | Mobile-first browsing, offers, simple checkout, UPI/cards |
| Admin: owner / manager | Catalogue, prices, orders, RFQs, approvals, reports |
| Admin: sales / ops staff | RFQ inbox, order status, customer lookup |

## 4. Shape of the product

One codebase, **two faces + an admin panel**:

1. **Presentation site**: Home, About, Brands, Contact, policy pages.
2. **Shop**: catalogue, search, product pages, cart, checkout, B2B tools, customer account.
3. **Admin panel**: runs both.

### Sitemap

| Area | Routes |
|------|--------|
| Company site | `/`, `/about`, `/brands`, `/brands/[brand]`, `/contact`, `/policies/...` |
| Shop | `/shop`, `/shop/c/[...category]`, `/shop/b/[brand]`, `/shop/p/[slug]`, `/shop/search?q=` |
| Merchandising | `/shop/clearance`, `/shop/economy`, `/shop/offers` |
| B2B tools | `/price-lists`, `/quick-order`, `/rfq` |
| Buying | `/cart`, `/checkout` |
| Accounts | `/account/...`, `/auth/...` |
| Back office | `/admin/...` |

## 5. Requirements by priority

**P0** = at launch · **P1** = soon after · **P2** = later. Full tables with IDs are in the source PRD §6; this is the condensed view.

### P0: needed at launch

- **Global:** top nav (logo, big search, categories mega-menu, brands menu, Clearance, Economy, Offers, Support, Quote/Order button, EN/हिंदी switch, login, cart) · footer with trust strip, link columns, GST badge, payment icons · floating WhatsApp button · cookie banner · fully responsive.
- **Presentation site:** Stanley/DeWalt-style hero carousel · home sections (categories, brands, promos, why-us, stats, bulk-quote CTA, real testimonials only) · About (story, purpose/mission/values accordion, stats, photos) · Brands logo grid with filter chips · Contact (info card, form with captcha, map, Call/WhatsApp/ticket banner, newsletter + RFQ block) · policy pages.
- **Catalogue:** category tree of 3+ levels · brand as a first-class dimension (brand, then its categories) · full product data model (SKU, specs, unit, MOQ, pack size, HSN, GST %, MRP, B2C price, tier prices, stock, documents, tags) · Moglix-style shop landing · listing page with left filter sidebar, sort, grid/list, pagination · typo-tolerant search with **SKU exact/prefix match first** and autocomplete · full product page with **Add to cart + Add to quote**.
- **B2B:** business registration with **GSTIN validation** and admin approval · **RFQ** (from cart, product page, or a free-form list/file upload; admin prices it, buyer accepts, it becomes an order) · **Quick order** by SKU + qty or CSV · **brand-wise price list PDFs** (approved B2B only) · GST invoices with correct CGST/SGST vs IGST.
- **Checkout:** persistent cart (guest cart merges on login), MOQ/pack/stock checks · ship or warehouse pickup · **Razorpay** 🟡 · **NEFT on proforma** for B2B 🟡 · shipping rules (free threshold, flat, pincode) · confirmation email.
- **Account:** email/password, mobile OTP 🟡, Google login · dashboard (orders, quotes, addresses, company, downloads) · order tracking timeline with courier link.
- **Offers:** scheduled banners · Stock Clearance (% off, limited stock) · Economy Series badge · offer/info cards.
- **Admin:** roles (Owner, Manager, Sales, Catalogue editor) · **bulk CSV/XLSX import/export with validation report** · catalogue CRUD · B2B approvals · RFQ inbox with PDF quotes · order management, NEFT confirmation, invoice and packing slip · price-list PDF manager · banners and tagging · enquiries inbox.

### P1: soon after launch

Side widget (recently viewed / saved / cart) · Hindi UI strings · product variants · customer groups and tier pricing · PO number/upload · saved lists and reorder · COD with cap · coupons · WhatsApp/SMS notifications · returns/cancellations · newsletter · admin pricing tools · reports · audit log.

### P2: later

Blog / buying guides · product compare · verified reviews · multiple users per company · credit terms and ledger.

## 6. Non-functional requirements

| Area | Target |
|------|--------|
| Performance | LCP < 2.5 s on 4G mobile; server-rendered, cached listings; CDN images in AVIF/WebP |
| Scale | 50,000+ SKUs, 200+ brands |
| Availability | 99.5 % monthly |
| Security | OWASP Top 10, Postgres Row-Level Security, no card data stored (Razorpay handles PCI), admin 2FA |
| Legal (India) | DPDP Act 2023 (consent, deletion requests), IT Act, Consumer Protection (E-Commerce) Rules 2020: seller details, grievance officer, return policy, country of origin on product page |
| Tax | GST invoices (HSN, rates, place of supply), invoice numbering per financial year |
| SEO | SSR, clean URLs, sitemap, robots, schema.org Product/Organization/Breadcrumb, canonicals |
| Accessibility | WCAG 2.2 AA |
| Browsers | Last 2 versions of Chrome, Edge, Safari, Firefox, plus Android Chrome and iOS Safari |
| Locale | English default, Hindi UI, INR, Indian number format (₹1,23,456.00) |
| Analytics | GA4 + server-side funnel events (search → product → cart → checkout / RFQ) |

## 7. Key user flows

1. **B2C purchase:** browse/search → filter → product → cart → checkout → Razorpay → confirmation.
2. **B2B registration:** register with GSTIN → `pending` → admin approves → unlocks GST invoices, RFQ, quick order, price lists.
3. **RFQ:** add to quote (or upload list) → admin prices → buyer gets email + PDF → accepts → order → pays by NEFT or online.
4. **Quick order:** paste `SKU, qty` → validate → add all to cart → checkout.
5. **Price list:** Price Lists page → brand → download PDF (approved B2B only).
6. **Contact:** form + captcha → stored, emailed to sales, auto-reply sent.

## 8. Data the owner must supply

| Data | Format | Status |
|------|--------|--------|
| Product master | XLSX/CSV (template from admin) | ✅ owner has it |
| Category tree + icons | XLSX | ✅ owner has company-wise categories |
| Brand list + logos | PNG/SVG | ❓ |
| Product images | JPG/PNG named by SKU | ❓ |
| Wholesale price list PDFs per brand | PDF | ❓ |
| Company content (story, mission, values, stats, photos) | Text + images | ❓ |
| Mojo Tools logo + brand colours | SVG | ❓ |
| Business details (address, GSTIN, hours, phone, WhatsApp, email) | Text | ❓ |

## 9. Design references (from the owner)

| Section | Reference site | Take |
|---------|----------------|------|
| Hero | stanleytools.com, dewalt.com | Full-bleed photo carousel, heavy uppercase headline, yellow CTA, numbered pager + pause, dark frame |
| About Us | vashiisl.com/about-us, khandelwalbusar.com | Image + Purpose/Mission/Values accordion, stats strip, Why-Choose cards |
| Brands | khandelwalbusar.com/customers | Logo grid with filter chips, stats counters |
| Contact | toolworld.in/contact | Info card, form + captcha, help banner, newsletter + RFQ, multi-branch footer |
| Filter sidebar | liontoolsmart.com | Category/brand/price checkboxes, density toggle, sort, per-page |
| Shop landing + category sections | moglix.com | Icon category bar, mega-menu, hero with brand tabs, promo tiles, per-category blocks |
| Price lists | mundhrabrothers.com/price-list | Brand logo + PDF list with effective dates |
| Offers / side widget / top nav | in.misumi-ec.com | Category side list, promo banners, register bar, floating widget, Economy/Clearance/Quote nav items, language switch |
| Footer | moglix.com | Trust strip, 5 link columns, contact, socials, legal bar |

## 10. Release plan

| Release | Contents |
|---------|----------|
| **R1 (MVP)** | Presentation site, catalogue + search + filters, cart/checkout (Razorpay + NEFT), B2C and B2B accounts with GSTIN verification, RFQ, quick order, price-list PDFs, clearance/economy, admin essentials, GST invoices |
| **R2** | Tier and customer pricing, Hindi UI, WhatsApp notifications, COD, coupons, saved lists/reorder, PO upload, reports, audit log, side widget |
| **R3** | Credit terms and ledger, multi-user companies, ERP/Tally sync, reviews, compare, blog |

## 11. Assumptions in the PRD

| # | Item | Status |
|---|------|--------|
| 1 | Stack: Next.js + Supabase + Vercel | 🟡 |
| 2 | Launch B2B = RFQ + GST invoices + account verification; tier pricing in R2; credit in R3 | ✅ |
| 3 | Payments: Razorpay + NEFT; COD for B2C later | 🟡 |
| 4 | Website admin is the inventory master, fed by CSV/XLSX; no ERP sync at launch | 🟡 |
| 5 | Public prices for everyone (single selling price + MRP); bulk pricing via RFQ until R2 | 🟡 |
| 9 | Brand colours: industrial yellow + charcoal until the logo arrives | 🟡 |

Questions still open from this file (Tally, warehouses, delivery, domain, missing assets) are tracked in [`open-questions.md`](open-questions.md).
