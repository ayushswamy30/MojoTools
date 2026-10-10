# Mojo Tools — Progress Report

**As of 10 Oct 2026 (updated after feedback round 2) · branch `pre-mojo`**

This is a plain-language summary of everything done so far. Details live in the linked docs.

## At a glance

| Area | Status |
|---|---|
| Planning documents (PRD, architecture, design, rules, tasks) | ✅ Consolidated and corrected (v0.2) |
| Launch marketing plan | ✅ Drafted; budget not decided |
| Company site (R0) | ✅ **Built with demo content.** Runs locally; not deployed yet |
| Real business content | ⏳ Waiting on the client meeting |
| Hosting / accounts (Vercel, Supabase, email, analytics) | ⏳ Needs the client's accounts |
| Online shop (R1) | ⏳ Not started; next phase |
| Public launch | 🎯 Whole site (company site + shop) together, within 3 months (by early Jan 2027) |

## 1. Planning (07–08 Oct)

1. **Five briefs received** (PRD, Architecture, Design, Rules, Tasks), reviewed and merged into one corrected set in `docs/`.
2. **41 issues fixed** across the briefs: contradictions between documents, colours that failed readability standards, missing data fields, and compliance gaps such as a cookie banner with no reject option and unconfirmed marketing claims. Each one is listed in [`CHANGELOG.md`](CHANGELOG.md#consolidation-log-08-oct-2026).
3. **Accessibility review**: the site targets WCAG 2.2 AA, the current web accessibility standard. Its rules are written into [`DESIGN.md §8`](DESIGN.md#8-accessibility-specification) and [`RULES.md §6`](RULES.md#6-accessibility-rules).
4. **Launch campaign plan** in [`LAUNCH-PLAN.md`](LAUNCH-PLAN.md): audience, messages, channels, an 8-week calendar, tracking and budget options.

## 2. Decisions from the owner (07–10 Oct)

- Build the **company site first**, then the shop on the same codebase.
- **No separate launch for the company site.** It is reviewed privately and goes public together with the full shop, within 3 months.
- Promise customers a reply **within 1 working day**.
- English only for now; enquiries arrive by email and are saved; home-page category tiles open the enquiry form.
- Mojo Tools already has a **Google Business Profile** and an **IndiaMART** listing.
- Menu: **About · Products · Distributorship · Awards · Contact**. The logo takes visitors home, so there's no separate Home item. On phones the menu (☰) sits on the left.
- "Brands" is now **Distributorship**: every brand listed is one Mojo Tools officially distributes.
- An AI assistant, **Mojo Mitra**, sits at the bottom right (Gemini or Groq, via API key).

All decisions are listed in [`DECISIONS.md`](DECISIONS.md).

## 3. What's been built (09–10 Oct)

### Pages
| Page | What it does |
|---|---|
| **Home** | Slideshow banner (pausable, keyboard-friendly), category tiles, brands, why choose us, stats, bulk-quote banner, visit-us section |
| **About** | Company story, purpose, mission, values (expandable list), timeline, why choose us, brands |
| **Products** | Every product category with a description, the brands for it, and "Enquire" + WhatsApp buttons |
| **Distributorship** | Brands Mojo Tools officially distributes, with filter buttons by product type; a page for each brand ("Official distributor" badge) with Enquire, Request price list and WhatsApp. Old `/brands` links redirect here. |
| **Awards** | Awards and certificates as cards (placeholders for now) |
| **Contact** | Contact details, enquiry form, map placeholder, help banner, newsletter sign-up |
| **Get a Quote** | Enquiry form that pre-fills from wherever the visitor clicked (brand, category, price list) |
| **Policies** | Draft Terms, Privacy and Accessibility pages (need owner / legal review) |
| **404 page** | Friendly "page not found" with links back |

### Features
- **Enquiry form**: types (product enquiry, bulk quote, price list, become a dealer, support); checks the mobile number and GSTIN; accepts an attached list up to 10 MB; gives an enquiry number. Once keys are added it emails sales (with the attachment) and sends the customer an auto-reply.
- **Spam protection**: Cloudflare captcha (once keys are added) plus a rate limit.
- **WhatsApp button** on every page: WhatsApp logo plus a "WhatsApp us" label, with a pre-written message saying which page the visitor came from.
- **Mojo Mitra, the AI assistant**: answers questions, finds product categories and brands, links to the right page, prepares a pre-filled quote form, and hands off to WhatsApp or phone. It never quotes prices or invents facts. It needs a Gemini or Groq API key; without one it shows quick links. Tested with a simulated model; the real model is untested until a key is added.
- **Cookie banner** with Accept / Reject / Manage. Google Analytics loads only after consent.
- **Campaign tracking**: every enquiry records where the visitor came from (QR code, Google, an ad, etc.).
- **Search engines**: page titles, descriptions and structured data are in place. Previews are hidden from Google until launch.
- **Mobile**: works on phones, with a slide-out menu.

### Behind the scenes
- **Database** (Supabase): brands, categories, enquiries and newsletter tables with security rules. Tested on a real Postgres engine.
- **Automatic checks** on every change: type check, code style, 24 unit tests, and **54 browser tests on desktop and mobile, including accessibility scans**. All pass.
- **GitHub Actions** runs these checks automatically on each push.

## 4. Demo / placeholder content (to replace)

| What | Currently | Where to change |
|---|---|---|
| Business details (address, phone, email, hours, GSTIN) | Placeholders (`+91 90000 00000`, `sales@example.com`) | `src/features/content/site.ts` |
| Brands | "Brand A–H", no logos, none marked authorised | `site.ts` + `supabase/seed.sql` |
| Categories | 8 standard categories with sample descriptions | `site.ts` + `supabase/seed.sql` |
| Stats | "XX+" | `site.ts` |
| About text, values, timeline | "Placeholder" text | `site.ts` |
| Photos | Grey striped blocks labelled "Placeholder" | To be added (owner photos) |
| Logo & colours | Text logo, yellow + charcoal | `globals.css` tokens + logo component |
| Policies | Draft wording (now includes the AI assistant) | `src/features/content/policies.ts` |
| Awards | 3 placeholder cards | `site.ts` → `awards` |
| AI assistant | Preview mode (no key) | Add `GOOGLE_GENERATIVE_AI_API_KEY` or `GROQ_API_KEY` in `.env.local` |
| Enquiries | **Demo mode**: checked but not saved or emailed (`DEMO-` number) | Add keys in `.env.local` (see `.env.example`) |

A yellow **"Preview — demo content"** bar shows on every page until real content is in.

## 5. What's next

**Waiting on the client** (full list in [`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md)):
1. Business details, logo, brand list (and which brands Mojo is authorised for), photos, About Us content.
2. Domain name and business email; who receives enquiry alerts; the list of brands Mojo officially distributes; awards/certificates.
3. A Gemini or Groq API key for Mojo Mitra, and whether chat logs should be kept.
4. Accounts: Vercel, Supabase, Resend, Cloudflare, Google Analytics.
5. For the shop: product spreadsheet, product photos, price lists, payment and delivery details.

**Next build steps:**
1. Swap in real content as it arrives, then deploy a private preview for the client to review.
2. Start the shop (R1): product database, catalogue import, product pages, search, cart and checkout ([`TASKS.md`](TASKS.md) Part B).
