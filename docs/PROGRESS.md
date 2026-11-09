# Mojo Tools — Progress Report

**As of 09 Nov 2026 · branch `main` · preview at [mojotools.vercel.app](https://mojotools.vercel.app)**

This is a plain-language summary of everything done so far. Details live in the linked docs.

## At a glance

| Area | Status |
|---|---|
| Planning documents (PRD, architecture, design, rules, tasks) | ✅ Consolidated and corrected (v0.2), kept up to date as the owner gives feedback |
| Launch marketing plan | ✅ Drafted; budget not decided |
| Company site (R0) | ✅ **Built with demo content** and refined through 5 rounds of owner feedback |
| Preview | ✅ Online at mojotools.vercel.app, hidden from search engines (`noindex`) |
| Legal pages (terms, privacy, cookies, refunds, accessibility) | ✅ Drafted; need owner / legal review |
| Real business content | ⏳ Waiting on the owner |
| Owner's own accounts (Supabase, email, analytics, Sentry) | ⏳ Needs the owner's accounts |
| Online shop (R1) | ⏳ Not started; next phase |
| Public launch | 🎯 Whole site (company site + shop) together, within 3 months (by early Jan 2027) |

## 1. Planning (07–09 Oct)

1. **Five briefs received** (PRD, Architecture, Design, Rules, Tasks), reviewed and merged into one corrected set in `docs/`.
2. **41 issues fixed** across the briefs: contradictions between documents, colours that failed readability standards, missing data fields, and compliance gaps such as a cookie banner with no reject option and unconfirmed marketing claims. Each one is listed in [`CHANGELOG.md`](CHANGELOG.md#consolidation-log-08-oct-2026).
3. **Accessibility**: the site targets WCAG 2.2 AA. Its rules are in [`DESIGN.md §8`](DESIGN.md#8-accessibility-specification) and [`RULES.md §6`](RULES.md#6-accessibility-rules).
4. **Launch campaign plan** in [`LAUNCH-PLAN.md`](LAUNCH-PLAN.md): audience, messages, channels, an 8-week calendar, tracking and budget options.

## 2. Decisions from the owner

- Build the **company site first**, then the shop on the same codebase. **No separate launch** for the company site: it goes public together with the shop.
- Promise customers a reply **within 1 working day**. English only for now.
- Menu: **About · Products · Distributorship · Awards · Contact**; the logo takes visitors home. On phones the menu (☰) sits on the left.
- "Brands" is now **Distributorship**: every brand listed is one Mojo Tools officially distributes.
- An AI assistant, **Mojo Mitra**, sits at the bottom right (Gemini or Groq).
- **The Products page shows sample products with prices excluding GST** (P18) until the real list arrives.
- Home "Visit our store" shows a **4-photo gallery** instead of the address (P19).

All decisions are listed in [`DECISIONS.md`](DECISIONS.md).

## 3. What's been built

### Pages
| Page | What it does |
|---|---|
| **Home** | Slideshow banner (pausable, keyboard-friendly), picture grid of categories, scrolling brand strip on dark, four dark "Why Mojo Tools" cards with custom icons, bulk-quote banner, "Visit our store" photo gallery |
| **About** | Company story, purpose, mission, values (expandable list), timeline, brands |
| **Products** | A strip of category pictures; a grid of sample products (picture, name, brand, price excluding GST, "Sample" badge); clicking a product opens its details over the page. Links can be shared (`?category=` / `?product=`) |
| **Distributorship** | Brands Mojo Tools officially distributes, with filter buttons by product type; a page for each brand with Enquire, Request price list and WhatsApp. Old `/brands` links redirect here |
| **Awards** | Awards and certificates (placeholders, hidden until real ones arrive) |
| **Contact** | Contact details, enquiry form, click-to-load map, help banner, newsletter sign-up |
| **Get a Quote** | Enquiry form that pre-fills from wherever the visitor clicked (brand, category, price list) |
| **Policies** | Draft Terms, Privacy, Cookies, Refunds and returns, Accessibility (with a grievance officer section) |
| **404 page** | Friendly "page not found" with links back |

### Look and feel (owner feedback rounds 3–5, 29 Oct – 8 Nov)
- **Header** slides away while the footer's big **MOJO TOOLS** wordmark (ink → yellow gradient) is on screen, and comes back on scroll up. The top utility strip, footer legal bar and "Preview" banner were removed.
- **Section headings** use the same face as the wordmark (wide, extra-bold, uppercase).
- **Hero slideshow** keeps rotating when the mouse is used; only keyboard focus or the pause button stops it.
- **Brand strip** scrolls endlessly and pauses on hover or focus. A pause button for touch screens is still to do before launch.
- **Mojo Mitra launcher** is a small turning "Ask Mitra" seal (ink with a yellow edge) that no longer covers content (9 Nov).
- **Hover effect**: a yellow bar sweeps along the bottom of the "Why Mojo Tools" cards and store photos.

### Features
- **Enquiry form**: types (product enquiry, bulk quote, price list, become a dealer, support); checks the mobile number and GSTIN; accepts an attached list up to 10 MB; gives an enquiry number. Once keys are added it emails sales (with the attachment) and sends the customer an auto-reply.
- **Spam protection**: Cloudflare captcha (once keys are added) plus a rate limit.
- **WhatsApp links** in page content (Contact page, footer, quote bands, product and brand pages) with a pre-written message saying what the visitor was looking at. The floating WhatsApp button was removed on 9 Nov (P20).
- **Mojo Mitra, the AI assistant**: finds categories and brands, links to the right page, prepares a pre-filled quote form, and hands off to WhatsApp or phone. It never quotes prices or invents facts. Without an API key it shows quick links; the real model is untested until a key is added.
- **Cookie banner** with Accept / Reject / Manage. Google Analytics and campaign tracking load only after consent; withdrawing consent deletes their cookies.
- **Search engines**: page titles, descriptions and structured data are in place. The preview is hidden from Google until launch.

### Behind the scenes
- **Database** (Supabase): brands, categories, enquiries and newsletter tables with security rules, tested on Postgres.
- **Automatic checks** on every change (GitHub Actions): type check, code style, **25 unit tests** and **72 browser tests on desktop and mobile, including accessibility scans**.
- **Security**: Next.js upgraded to 16.4.3 on 1 Nov for three published vulnerabilities (one critical).

## 4. Demo / placeholder content (to replace)

| What | Currently | Where to change |
|---|---|---|
| Business details (address, phone, email, hours, GSTIN) | Placeholders (`+91 90000 00000`, `sales@example.com`) | `src/features/content/site.ts` |
| Brands | "Brand A–H", no logos, none marked authorised | `site.ts` + `supabase/seed.sql` |
| Categories | 8 standard categories with drawings and sample descriptions | `site.ts` + `supabase/seed.sql` |
| Products and prices | Sample products with made-up prices, badged "Sample" | `src/features/content/products.ts` |
| Store photos | 4 placeholder tiles (shop, tools in stock, warehouse, office) | `site.ts` → `storeGallery` (set `src`) |
| Stats, awards | Hidden until real figures arrive | `site.ts` |
| About text, values, timeline | "Placeholder" text | `site.ts` |
| Logo & colours | Text logo, yellow + charcoal | `globals.css` tokens + logo component |
| Policies | Draft wording | `src/features/content/policies.ts` |
| AI assistant | Preview mode (no key) | Add `GOOGLE_GENERATIVE_AI_API_KEY` or `GROQ_API_KEY` |
| Enquiries | **Demo mode**: checked but not saved or emailed (`DEMO-` number) | Add keys (see `.env.example`) |

## 5. What's next

**Waiting on the owner** (full list in [`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md)):
1. Business details, logo, brand list (and which brands Mojo is authorised for), About Us content.
2. **Photos**: shop, tools in stock, warehouse, office (store gallery), plus team and hero images.
3. The real product list with prices, to replace the sample products.
4. Domain and business email; who receives enquiry alerts; awards/certificates.
5. A Gemini or Groq API key for Mojo Mitra, and whether chat logs should be kept.
6. Accounts: Supabase, Resend, Cloudflare, Google Analytics, Sentry.

**Next build steps:**
1. Add a pause button to the brand strip for touch screens (WCAG 2.2.2) before launch.
2. Swap in real content as it arrives; owner walkthrough and sign-off on the preview (TASKS Phase 5).
3. Start the shop (R1): product database, catalogue import, product pages, search, cart and checkout ([`TASKS.md`](TASKS.md) Part B).
