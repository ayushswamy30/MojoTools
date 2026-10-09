# Mojo Tools — Design System & UI Prompts

> **Version 0.2** (08 Oct 2026): consolidated and corrected. Colour tokens were re-checked for WCAG 2.2 AA contrast (§2.1); release variants (R0 company site vs R1 shop) were added; the accessibility specification is §8. See [`CHANGELOG.md`](CHANGELOG.md).
> Covers the visual language, components, UX heuristics and ready-to-paste prompts for **Claude Design**.
> Colours and logo are placeholders until the Mojo Tools brand assets arrive ([`PRD.md §10`](PRD.md#10-assumptions) #8). Swap the token values in §2 and everything follows. **Re-run the contrast table (§2.1) whenever tokens change.**

---

## 1. Design direction

**"Jobsite-grade, warehouse-honest."** Yellow and charcoal like the tool brands Mojo sells (Stanley, DeWalt), with the dense, search-first layout of an industrial supplier (Moglix, MISUMI).

| Trait | Means |
|---|---|
| Bold | Large uppercase display headlines, full-bleed photography of real tools and jobsites |
| Efficient | Search bar is the hero of every shop page (R1); SKU visible everywhere; dense but scannable listings |
| Trustworthy | GST badge, real warehouse photos, brand logos, clear stock and delivery info |
| Industrial | Hard edges (small radii), yellow accent bars, diagonal "corner flash" motif from the Stanley hero |

Two modes of the same system:
- **Presentation site** (Home, About, Brands, Contact; R0) → dark frame, big type, imagery, generous spacing (DeWalt/Stanley feel).
- **Shop & account** (R1) → light surfaces, compact spacing, data-first (Moglix/MISUMI feel), same header and footer.

## 2. Design tokens

### 2.1 Colour

| Token | Value | Use |
|---|---|---|
| `--brand-yellow` | `#FFC20E` | Primary CTA fill, accent bars, active tab underline, badges. **Fill only.** |
| `--brand-yellow-hover` | `#E6AE00` | CTA hover |
| `--brand-yellow-soft` | `#FFF4CC` | Highlight backgrounds, selected filter chips |
| `--ink-900` (charcoal) | `#141414` | Dark frame, header (presentation), headings, text on yellow, focus ring on light |
| `--ink-800` | `#1F1F1F` | Dark surfaces, footer |
| `--ink-700` | `#2B2B2B` | Dark cards, nav bar |
| `--steel-600` | `#4A4F55` | Body text on light |
| `--steel-500` | `#6B7178` | **Secondary / meta text on light** (new: replaces steel-400 for text) |
| `--steel-400` | `#8A9097` | Icons, **input borders**, disabled text on light; secondary text **on dark** |
| `--steel-200` | `#D9DCE0` | Decorative borders, dividers (not for input borders) |
| `--steel-100` | `#EEF0F2` | Section backgrounds in shop |
| `--steel-50` | `#F7F8F9` | Page background (shop) |
| `--white` | `#FFFFFF` | Cards |
| `--success` | `#188038` | In stock, success (darkened from `#1E8E3E`) |
| `--warning` | `#9A5B00` | Low stock, pending (darkened from `#B26A00`) |
| `--danger` | `#D93025` | Out of stock, errors, **Clearance** badge, % off |
| `--info` | `#1A5FB4` | Links in shop, info notes |
| `--economy` | `#0E7C7B` | **Economy Series** badge |
| `--whatsapp` | `#128C7E` | WhatsApp FAB fill (white glyph, icon only) |
| `--whatsapp-dark` | `#075E54` | WhatsApp buttons with white text (7.67:1) |
| `--focus-ring` | `--ink-900` on light / `--brand-yellow` on dark | 2 px ring, 2 px offset |

**Rules**
- Yellow is a **fill**, never text, icons or links on white or light surfaces. Text on yellow is `--ink-900`.
- Body text uses `--steel-600`; secondary text uses `--steel-500` on light and `--steel-400` on dark.
- Input borders use `--steel-400` (they need 3:1 against the background); `--steel-200` is for decoration only.
- Shop body links use `--info` and are underlined.
- Status and badge colours are used as **solid fills with white text**, or as **text on white**. Pale tints only behind `--ink-700` text.

**Contrast check (WCAG 2.2 AA, calculated):**

| Pairing | Ratio | Needs | Result |
|---|---|---|---|
| ink-900 on brand-yellow (primary button) | 11.38 | 4.5 | ✅ |
| ink-900 on yellow-hover | 9.14 | 4.5 | ✅ |
| brand-yellow text on ink-900 / ink-700 (dark sections) | 11.38 / 8.75 | 4.5 | ✅ |
| **brand-yellow on white** | **1.62** | 4.5 | ❌ never as text, icon or link |
| steel-600 body on white / steel-50 / steel-100 | 8.27 / 7.77 / 7.23 | 4.5 | ✅ |
| steel-500 secondary on white / steel-50 | 4.93 / 4.64 | 4.5 | ✅ |
| steel-400 on white (old secondary text) | 3.22 | 4.5 | ❌ text · ✅ icons, input borders (3:1) |
| steel-400 on ink-800 (secondary text on dark) | 5.12 | 4.5 | ✅ |
| steel-200 border vs white | 1.38 | 3 (inputs) | ❌ for inputs, so input borders use steel-400 |
| white on ink-900 / ink-700 | 18.42 / 14.16 | 4.5 | ✅ |
| success `#188038` text on white / white on success | 5.02 | 4.5 | ✅ (old `#1E8E3E` = 4.21 ❌) |
| warning `#9A5B00` text on white / white on warning | 5.43 | 4.5 | ✅ (old `#B26A00` = 4.24 ❌) |
| danger on white / white on danger | 4.77 | 4.5 | ✅ |
| info on white / steel-50 | 6.29 / 5.91 | 4.5 | ✅ |
| economy on white / white on economy | 5.01 | 4.5 | ✅ |
| ink-900 on yellow-soft | 16.72 | 4.5 | ✅ |
| ink-700 on steel-100 (neutral status pill) | 12.39 | 4.5 | ✅ |
| white glyph on `--whatsapp` `#128C7E` | 4.14 | 3 (graphic) | ✅ (brand green `#25D366` = 1.98 ❌) |

### 2.2 Typography

| Role | Font (Google Fonts via `next/font`) | Weight / style | Size (desktop → mobile) |
|---|---|---|---|
| Display (hero) | **Archivo** (`wdth` 125, Expanded) | 800, UPPERCASE, tracking −1 % | 64/68 → 36/40 |
| H1 | Archivo Expanded | 800 uppercase | 40/44 → 28/32 |
| H2 | Archivo | 700 | 28/34 → 22/28 |
| H3 | Archivo | 700 | 20/26 → 18/24 |
| Body | **Inter** | 400 / 500 | 16/24 (shop dense: 14/20) |
| Small / meta | Inter | 400 | 13/18 (minimum size for meaningful text) |
| Label / button | Inter | 600, UPPERCASE for primary CTA, tracking +2 % | 14/16 |
| SKU / codes | **JetBrains Mono** | 500 | 13/18 |
| Price | Inter, tabular numbers | 700 | 20 (PDP 28) |

Uppercase is for display, H1 and primary buttons only. Body text, labels and error messages stay in sentence case for readability. Devanagari fallback (R2): **Noto Sans Devanagari**.

### 2.3 Spacing, radius, elevation, motion

| Token | Value |
|---|---|
| Spacing scale | 4, 8, 12, 16, 24, 32, 48, 64, 96 px |
| Container | max 1320 px, gutter 16 px mobile / 24 px tablet / 32 px desktop |
| Radius | `sm 2px` (buttons, inputs), `md 4px` (cards), `lg 8px` (modals), `full` (chips, avatars) |
| Border | 1 px `--steel-200` (decorative), 1 px `--steel-400` (inputs) |
| Shadow | `card: 0 1px 2px rgb(0 0 0 / .06)`; `hover: 0 6px 16px rgb(0 0 0 / .10)`; `overlay: 0 12px 32px rgb(0 0 0 / .18)` |
| Motion | 150 ms (hover), 220 ms (menus/drawers), ease `cubic-bezier(.2,.8,.2,1)`; hero crossfade 600 ms; **all motion off under `prefers-reduced-motion`** (carousel starts paused, counters show final values) |
| Breakpoints | `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536` |
| Touch targets | **≥ 44 × 44 px** on touch devices (house rule; WCAG 2.2 minimum is 24 px) |
| Z-index layers | content 0 · sticky header 40 · mobile bottom bar / PDP sticky bar 50 · WhatsApp FAB 55 · drawers/sheets 60 · cookie banner 70 · dialogs 80 · toasts 90 |

### 2.4 Signature motifs
- **Yellow rule:** 4 px yellow bar under the dark header and under section titles (from DeWalt).
- **Corner flash:** yellow right-triangle in the top-left of the hero (from Stanley). Decorative, `aria-hidden`.
- **Numbered pager:** `‹ 1 2 3 4 ━━ ›` with a pause button on carousels.
- **Spec chips:** small mono chips for SKU, pack size, MOQ.

## 3. Layout references (from the owner's reference doc)

| Area | Reference | Take this | Avoid |
|---|---|---|---|
| Hero | Stanley, DeWalt | Full-bleed photo, heavy uppercase headline bottom-left, 1–2 lines of copy, one yellow CTA, numbered pager | Video autoplay with sound; text over busy photo without a scrim |
| About | vashiisl.com (viewed at 60 % zoom ⇒ design at comfortable density) + khandelwalbusar.com | Photo left / Purpose-Mission-Values accordion right, stats strip, Why-Choose cards | Tiny 10 px text from the zoomed screenshot |
| Brands | khandelwalbusar.com/customers | White panel on dark section, filter chips, 4-col logo grid, stats tiles below | — |
| Contact | toolworld.in (viewed at 50 % zoom) | Info card + form side by side, help banner, newsletter + quote block | Image captcha (use Turnstile) |
| Shop landing (R1) | Moglix | Icon category bar, mega-menu, hero banner + brand tabs, promo tiles, per-category blocks | Overloaded banner clutter |
| Listing (R1) | Lion Tools Mart | Left filter sidebar, density toggle, sort, per-page | — |
| Category blocks (R1) | Moglix | "Top Brands & Related Categories" + sub-category tiles + product rail + View All | — |
| Price lists (R1) | Mundhra Brothers | Brand logo + PDF rows with Download | Plain unstyled table |
| Offers / nav (R1) | MISUMI | Categories + Brand dropdowns, Economy Series, Stock Clearance, Quote/Order button, side widget, register bar | — |
| Footer | Moglix | Trust strip, 5 columns, contact, socials, legal bar | — |

## 4. Component inventory

**Rel** = release in which the component (or variant) is first needed.

### Layout
| Component | Rel | Notes / states |
|---|---|---|
| `SkipLink` | R0 | "Skip to main content"; first focusable element; visible on focus |
| `UtilityBar` | R0 | Thin top strip. **R0:** "GST-registered supplier" (only once the GSTIN is supplied) · phone · WhatsApp. **R1 adds** "Pan-India delivery" (🟡 only once true). **R2 adds** the EN / हिंदी toggle. |
| `Header` | R0 / R1 | **R0:** logo (link to home; accessible name "Mojo Tools, home") · About · Products · Brands · Contact · yellow **GET A QUOTE**. **R1:** logo · search (wide) · Support · **QUOTE / ORDER** (yellow) · Login/Account · Cart (count badge). |
| `MainNav` | R1 | `Categories ▾` (dark button) · `Brands ▾` · Economy Series ("SAVE MORE" tag) · **Stock Clearance** (red dot + text, not colour alone) · Offers · Price Lists · About · Contact |
| `MegaMenu` | R1 | Left: L1 categories with icons; right: L2/L3 columns + featured brand; Radix `NavigationMenu`; opens on click/Enter, hover intent 150 ms; Esc closes and returns focus |
| `SearchBox` | R1 | Placeholder "Search by product, brand or SKU" (+ visible or visually hidden label); suggestions combobox (`role="combobox"`, `aria-activedescendant`): SKU matches first (mono), products with thumb + price, brands, categories, recent searches |
| `MobileNav` | R0 / R1 | **R0:** top bar (logo, menu) + slide-in drawer with page links, call and WhatsApp. **R1:** bottom tab bar (Home, Categories, Search, Quote, Account) + drawer with category drill-down |
| `Footer` | R0 / R1 | Trust strip · columns (**R0:** Mojo Tools, Help, Policies; **R1 adds** Shop, My Account) · address · socials · GST badge · legal bar · payment icons (R1) |
| `SideWidget` | R2 | Desktop right edge: Recently viewed · Saved list · Cart (count) |
| `WhatsAppFab` | R0 | Bottom-right, `--whatsapp` fill, 56 px; accessible name "Chat with us on WhatsApp (opens in new tab)"; prefilled message with page/brand; on mobile with the R1 bottom bar it sits above the bar; hidden on PDP mobile when the sticky Add-to-cart bar shows (WhatsApp moves into that bar) |
| `CookieBanner` | R0 | Bottom bar, **not modal**: Accept all · Reject non-essential (equal prominence) · Manage. Built in-house (no third-party script). Content gets bottom padding while it's shown. |

### Marketing
| Component | Rel | Notes |
|---|---|---|
| `HeroCarousel` | R0 | See §8.2 for the full accessibility spec |
| `SectionTitle` | R0 | Real heading level + yellow rule |
| `CategoryTiles` | R0 / R1 | **R0:** showcase tiles; click opens the enquiry form pre-filled with the category. **R1:** link to `/shop/c/...` with item counts |
| `BrandStrip` | R0 | **Static grid / horizontally scrollable row. No auto-scrolling marquee** (moving content needs a pause control) |
| `StatsStrip` | R0 | Count-up animation only without reduced motion; final values in the DOM (§8.3) |
| `ValuesAccordion` | R0 | Radix Accordion; yellow +/– icons on dark; `aria-expanded` |
| `WhyChooseCards` | R0 | — |
| `BrandGrid` + `FilterChips` | R0 | Chips are toggle buttons (`aria-pressed`); result count announced politely |
| `ContactInfoCard` | R0 | Address, hours, phone (`tel:`), WhatsApp, email, GSTIN |
| `EnquiryForm` | R0 | Types: Product enquiry · Bulk quote · Price list request · Become a dealer · Support. Fields + states in §8.4 |
| `HelpBanner` | R0 | Call / WhatsApp / Raise a support request (opens the enquiry form with type = support) |
| `NewsletterQuoteBlock` | R0 | Newsletter signup + Request a Quote |
| `Timeline` | R0 | Ordered list semantics |
| `CTABand` | R0 | "Buying in bulk? Get a quote within 1 working day" (✅ owner-confirmed promise) |
| `MapCard` | R0 | Iframe with `title`, address as text, "Get directions" link |

### Shop (R1 unless noted)
| Component | Key details |
|---|---|
| `CategoryIconBar` | Horizontal scroll of category icons + labels; active underline yellow (on dark) or ink (on light) |
| `PromoTile` | Image banner with optional % badge; text not baked into images |
| `CategorySection` | Title + View All · Top-brands circles · 4 sub-category tiles · `ProductRail` |
| `ProductCard` | Image (1:1), brand (small caps), name (2 lines), SKU (mono, copy on click), price + MRP struck (with hidden "MRP" label) + % off, stock dot **+ text**, badges (Clearance / Economy / New), Add to cart + Add to quote (labelled icons); hover: elevate + quick-view |
| `ProductRow` (list view) | Thumb, name, SKU, key specs, pack/MOQ, stock, price, qty stepper, Add |
| `FilterSidebar` | Collapsible groups: Category tree, Brand (search within + checkbox), Price (slider + presets), Availability, dynamic Specs, Tags (Clearance, Economy); applied chips row on top; mobile = bottom sheet |
| `ListingToolbar` | Result count (live region) · sort · density (list / 2 / 3 / 4 grid) · per page |
| `Pagination` | Numbers + prev/next in a `nav` labelled "Pagination", plus "Load more" on mobile |
| `Gallery` | Main image + thumbs, zoom on hover, swipe on mobile, keyboard arrows |
| `PriceBlock` | Price (incl. GST), MRP struck, % off, "₹x excl. GST" line, "Need 50+? Get a quote" link |
| `QtyStepper` | Steps by pack size, min = MOQ, max = stock; labelled +/– buttons; input is `inputmode="numeric"` |
| `StockBadge` | In stock / Low stock (n left) / Out of stock / On request (text always present) |
| `SpecTable` | Two-column `<table>` with `<th scope="row">`, zebra rows |
| `DocList` | Datasheet / manual PDFs (file type + size in the link text) |
| `CartDrawer` | Dialog semantics, focus trapped, Esc closes; line items, subtotal, "Checkout" + "Request quote for this cart" |
| `QuickOrderTable` | Rows: SKU input (autocomplete) · product resolved · pack · qty · price · line total · remove; paste area; CSV upload; per-row validation messages |
| `RFQForm` | Items (from cart or manual rows), company details pre-filled, message, attachment, required-by date |
| `QuoteCard` | Number, status pill, valid-until **date** (countdown visual only), total, Accept / Download PDF / View online |
| `PriceListBrandCard` | Logo, brand name, rows: title + effective date + Download (lock icon + text if not approved) |
| `CheckoutStepper` | Address → Delivery → Payment → Review; current step `aria-current="step"` |
| `OrderTimeline` | Vertical ordered list with timestamps |
| `StatusPill` | Colour **and** text per status (§9) |

### Feedback & utility
`Toast` (status role; actions also reachable elsewhere) · `Alert` (info/success/warning/danger) · `ErrorSummary` (R0: list of form errors with links to fields) · `EmptyState` (illustration + action) · `Skeleton` · `Dialog` · `Sheet` · `Tooltip` (not the only source of information) · `Breadcrumbs` · `Badge` · `Tabs` · `Accordion` · `CopyButton` (announces "Copied").

### Admin (R1)
`AdminShell` (left sidebar, top bar) · `KpiCard` · `DataTable` (search, filters, column toggle, bulk actions, CSV export) · `ImportWizard` (upload → map columns → preview errors → confirm → report) · `ApprovalCard` (GSTIN, details, approve/reject/suspend) · `QuoteBuilder` (line pricing, GST auto, validity, notes, preview PDF) · `EnquiryInbox` (status, assign, convert to RFQ) · `ImageDropzone` · `RichTextEditor` (light).

### Button variants
| Variant | Look | Use |
|---|---|---|
| `primary` | Yellow fill, ink text, uppercase | One main action per view (Get a Quote, Submit, Add to cart) |
| `secondary` | Ink fill, white text | Secondary main (Request Quote) |
| `outline` | 1 px ink border | Tertiary |
| `ghost` | Text only, underlined on hover | Inline/table actions |
| `danger` | Red fill, white text | Destructive (admin) |

Sizes: `sm 32` (desktop dense tables only), `md 40`, `lg 48` px height. On touch devices every button has a ≥ 44 px hit area. Loading state keeps the label and adds a spinner with `aria-busy`.

## 5. UX heuristics (apply to every screen)

1. **Search is king (B2B, R1):** visible on every shop page; an exact SKU match jumps straight to the product.
2. **Show the facts buyers decide on** at card level: price, stock, pack size/MOQ, SKU, brand.
3. **Two paths, always:** every product context offers **Add to cart** *and* **Add to quote**. In R0, every brand/category context offers **Enquire** *and* **WhatsApp**.
4. **Visibility of system status** (Nielsen 1): cart count, filter chips, order/quote status pills, upload progress, form success messages.
5. **Match the real world** (2): trade terms such as MOQ, pack, HSN, GST, proforma, PO.
6. **User control** (3): undo remove-from-cart toast, edit quick-order lines, clear filters.
7. **Consistency** (4): one yellow primary button per view; same card everywhere.
8. **Error prevention** (5): qty stepper respects MOQ/pack; GSTIN validated as typed; confirm before cancelling orders.
9. **Recognition over recall** (6): recently viewed, reorder, saved lists, recent searches.
10. **Efficiency for experts** (7): quick order, keyboard nav in tables, bulk CSV.
11. **Minimal design** (8): no auto-playing clutter; promo zones are fixed slots; the only auto-advancing element is the pausable home hero.
12. **Helpful errors** (9): say what happened and how to fix it ("SKU DW-1234 not found — check the code or search by name"; "Enter a 10-digit mobile number").
13. **Help** (10): WhatsApp button, "Need help choosing?" banner, FAQ links on checkout.
14. **Price transparency (R1):** show incl./excl. GST; delivery cost before the payment step.
15. **Trust signals** near forms, payment and on PDP: GST registered, genuine products, warehouse address. Only claims the owner has confirmed.
16. **Mobile:** sticky bottom Add-to-cart on PDP, filters in a bottom sheet, thumb-reach actions, no overlay covering focused fields.

## 6. Page blueprints (wireframe level)

```
HOME — R0 (desktop)
┌ SkipLink (on focus) · UtilityBar: GST-registered supplier · ☎ · WhatsApp ─────────────┐
├ Header: [LOGO]   About  Products  Brands  Contact     [GET A QUOTE] ┤
├══ 4px yellow rule ═══════════════════════════════════════════════════┤
│ HERO (full-bleed photo, dark gradient scrim left)                    │
│ ◤                                                                   │
│   BUILT FOR THE                                                      │
│   JOBSITE.                                                           │
│   1–2 lines copy                                                     │
│   [GET A BULK QUOTE]  Explore our brands →                           │
│   ⏸  ‹ 1 2 3 ━━ ›                                                    │
├ Category tiles (8, showcase → enquiry) ───────────────────────────────┤
├ Brands we distribute (static logo grid) · View all brands ────────────┤
├ Why choose Mojo (4 cards) + Stats strip ──────────────────────────────┤
├ Testimonials (real only; hide section if none) ───────────────────────┤
├ CTA band: Buying in bulk? Get a quote [REQUEST A QUOTE] [WHATSAPP] ──┤
├ Visit us band (warehouse photo, address, hours, directions) ──────────┤
└ Footer ───────────────────────────────────────────────────────────────┘
                                            (WhatsApp FAB bottom-right)

HOME — R1 additions
Header/MainNav switch to the R1 versions · hero CTA [SHOP NOW] + "Get a bulk quote →"
· category tiles link to shop · Clearance | Economy promo pair · featured products rail
· CTA band adds [REGISTER AS BUSINESS]

LISTING (R1)
┌ Breadcrumbs / H1 / short intro ───────────────────────────────┐
│ FilterSidebar (280px) │ Applied chips · count · sort · density · per page │
│                       │ Product grid (4 cols) / list rows                   │
│                       │ Pagination                                          │
└───────────────────────────────────────────────────────────────┘

PDP (R1)
┌ Breadcrumbs ──────────────────────────────────────────────────┐
│ Gallery (55%)     │ Brand · Name (H1) · SKU [copy]            │
│                   │ PriceBlock · Stock · Pack/MOQ             │
│                   │ Qty [– 10 +] [ADD TO CART] [ADD TO QUOTE] │
│                   │ Delivery estimate by pincode · trust row  │
│                   │ Country of origin                          │
├ Tabs: Specifications | Description | Documents ───────────────┤
├ Related products rail · Recently viewed ──────────────────────┤
└───────────────────────────────────────────────────────────────┘
```

## 7. Claude Design prompts

> **How to use:** paste **Prompt 0 (Master brief)** first in every new Claude Design session, then the page prompt. Attach the reference screenshots named in each prompt. Ask for **desktop 1440 px + mobile 390 px** frames and for interactive states (hover, **focus**, open menus, empty, loading, error).
> **R0 (company site) needs prompts 0, 1-R0, 2, 3, 4, 5 and 19.** The rest are for R1.

### Prompt 0 — Master brief (paste first, always)
```
You are designing "Mojo Tools", an Indian trader of tools, machinery and hardware
materials with a physical shop/warehouse. The website has two faces in one brand:
(1) a presentation site (Home, About, Brands, Contact), which launches first as
"R0" with no online shop, and (2) a B2B-first e-commerce shop that also serves retail
(B2C) buyers, added later as "R1". Each prompt says which release it designs.

Visual direction: "jobsite-grade, warehouse-honest". Yellow + charcoal like Stanley and
DeWalt, with the dense, search-first shop layout of Moglix and MISUMI.

Tokens (use exactly):
- Colours: brand-yellow #FFC20E (FILLS ONLY — never text, icons or links on white/light),
  yellow-hover #E6AE00, yellow-soft #FFF4CC, ink-900 #141414, ink-800 #1F1F1F,
  ink-700 #2B2B2B, steel-600 #4A4F55 (body text), steel-500 #6B7178 (secondary text on
  light), steel-400 #8A9097 (icons, input borders, secondary text on dark),
  steel-200 #D9DCE0 (decorative borders), steel-100 #EEF0F2, steel-50 #F7F8F9 (shop bg),
  success #188038, warning #9A5B00, danger #D93025 (clearance, % off),
  info #1A5FB4 (links, underlined), economy #0E7C7B, whatsapp #128C7E (white glyph).
- Type: Archivo Expanded 800 UPPERCASE for display/H1; Archivo 700 for H2/H3;
  Inter 400/500/600 for UI and body (sentence case); JetBrains Mono 500 for SKUs.
  Tabular numbers for prices. Minimum text size 13px.
- Radius 2px buttons/inputs, 4px cards, 8px modals. 4/8-pt spacing. Container 1320px.
- Motifs: 4px yellow rule under the dark nav and under section titles; yellow corner
  triangle top-left of hero; numbered carousel pager "‹ 1 2 3 ━━ ›" with pause.
- Primary button: yellow fill, ink text, uppercase Inter 600. Secondary: ink fill, white text.
- Focus ring: 2px ink-900 with 2px offset on light; 2px yellow on dark. Show it.

Global chrome — R0 (company site):
- Skip link. Utility bar (ink-900, 32px): "GST-registered supplier" left; phone and
  WhatsApp right. No language toggle yet.
- Header: logo left (links home); About, Products, Brands, Contact; yellow "GET A QUOTE" button.
- Footer: trust strip (Genuine brands, GST invoice, Expert help on WhatsApp),
  columns (Mojo Tools, Help, Policies), address + map link, socials, GST badge, legal bar.
- Floating WhatsApp button bottom-right; cookie bar (Accept all / Reject non-essential /
  Manage) that never covers form fields.

Global chrome — R1 (shop) replaces the header and nav with:
- Header: logo left, wide search "Search by product, brand or SKU", Support,
  yellow "QUOTE / ORDER" button, Login/Register, Cart with count badge.
- Main nav: dark "☰ Categories ▾" button, "Brands ▾", "Economy Series" with a small
  "SAVE MORE" tag, "Stock Clearance" with red dot, Offers, Price Lists, About, Contact.
- Footer adds Shop and My Account columns, "Secure payment" in the trust strip and
  payment icons. The EN | हिंदी toggle arrives later (R2) — do not show it.

Rules: WCAG 2.2 AA contrast, visible focus rings, 44px touch targets, status shown with
text as well as colour, Indian formats (₹1,23,456.00, +91 98765 43210, 07 Oct 2026).
Use realistic but clearly placeholder data (brands like "Brand A", stats like "XX+") —
no real logos, no invented testimonials, no unconfirmed claims (e.g. delivery reach,
response times — show them as {placeholders}).
Deliver desktop 1440 and mobile 390 frames, plus hover/focus/open/empty/loading/error states.
```

### Prompt 1-R0 — Header, footer & mobile navigation (company site)
```
Design the R0 global chrome from the master brief.
1. Desktop header default, with the skip link shown in its focused state.
2. Header sticky/compact on scroll.
3. Mobile 390: top bar (logo, Call icon, menu button); slide-in drawer with page links,
   "Get a quote", Call and WhatsApp buttons; focus trapped in the drawer, Esc/× closes.
4. Footer desktop + mobile (columns collapse to accordions).
5. WhatsApp FAB + cookie bar together on mobile: show how page content gets bottom
   padding so a focused form field is never hidden behind them.
```

### Prompt 1 — Header, mega-menu & mobile navigation (R1)
```
Design the R1 global header system from the master brief.
States to show:
1. Default header (desktop).
2. "Categories" mega-menu open: left column = L1 categories with line icons
   (Power Tools, Hand Tools, Machinery, Measuring & Testing, Cutting & Abrasives,
   Fasteners & Hardware, Safety & PPE, Welding, Pneumatics, Electrical); right =
   3–4 columns of L2/L3 links for the hovered/focused L1, plus a featured-brand card.
   Show keyboard focus moving through it. Reference: MISUMI "Categories" dropdown and
   the Moglix mega menu.
3. "Brands" dropdown: A–Z index + grid of 12 logo placeholders + "View all brands".
4. Search focused with suggestions: section "SKU match" (mono code + product),
   "Products" (thumb, name, brand, price), "Brands", "Categories", "Recent searches";
   highlighted option visible.
5. Sticky compact header on scroll (search + cart only).
6. Mobile 390: top bar (logo, search icon, cart), bottom tab bar (Home, Categories,
   Search, Quote, Account), slide-in category drawer with drill-down. WhatsApp FAB sits
   above the bottom bar.
```

### Prompt 2 — Home page
```
Design the Mojo Tools home page (presentation face, dark frame) for R0, then show the R1
differences as a second frame.
Hero: full-bleed carousel, 3 slides, 640px tall desktop / 520px mobile. Photo of tools
on a workshop bench with a dark left gradient scrim strong enough for white text.
Yellow corner triangle top-left. Headline bottom-left in Archivo Expanded 800 uppercase,
2–3 lines (e.g. "BUILT FOR THE JOBSITE."), one line of supporting copy.
R0 CTAs: yellow "GET A BULK QUOTE" button + text link "Explore our brands →".
R1 CTAs: yellow "SHOP NOW" + "Get a bulk quote →".
Pause button first, then numbered pager with progress bar. Thin yellow rule at bottom.
References: Stanley hero (layout, corner flash), DeWalt hero (dark frame, heavy type).
Then R0 sections:
1. Shop by category: 8 tiles with photo on steel-100 and label (R0: "Enquire" on hover;
   R1: item count, links to the shop).
2. Brands we distribute: static logo grid (no marquee), "View all brands".
3. Why Mojo Tools: 4 icon cards (Genuine brands, Bulk & B2B quotes, GST invoices,
   Expert advice) + stats strip (Years in business, SKUs, Brands, Customers — "XX+").
4. Testimonials slot (show as optional: hidden when there are no real testimonials).
5. B2B CTA band on ink-900: "Buying in bulk? Get a quote within within 1 working day"
   [REQUEST A QUOTE] [CHAT ON WHATSAPP].
6. Visit us: warehouse/store photo band with address, hours, "Get directions".
R1 frame adds: twin promo "STOCK CLEARANCE SALE — up to 40% off" (danger accent) and
"ECONOMY SERIES — dependable tools, lower prices" (economy accent); featured products
rail (8 ProductCards); CTA band adds [REGISTER AS BUSINESS].
Show hover and focus on category tile, the hero paused state, and the reduced-motion
state (hero paused on load, stats showing final values).
```

### Prompt 3 — About Us (R0)
```
Design the About Us page. Reference: vashiisl.com/about-us (layout only; the screenshot
was at 60% zoom — design at comfortable reading size) and khandelwalbusar.com.
1. Page hero (360px): dark photo of the warehouse with scrim, H1 "ABOUT MOJO TOOLS",
   breadcrumb.
2. Floating stats card overlapping the hero bottom: 4 stats with icons
   (Products, Brands, Customers, Years) — "XX+" placeholders.
3. Two-column: large team/warehouse photo left (4:5); right: "Core Purpose" (one line),
   "Our Mission" (short paragraph), "Values" accordion with 5 items (one expanded),
   yellow + / – icons on ink, or ink icons on light. Show focus on an accordion header.
4. Our story timeline: 5 milestones, horizontal on desktop, vertical on mobile.
5. "Why choose Mojo Tools": 5 cards: Wide reach, Diverse portfolio, Expert team,
   Customer focus, Quality assurance.
6. Brands strip + CTA band to Contact.
```

### Prompt 4 — Brands / Distributors
```
Design the Brands page (R0). Reference: khandelwalbusar.com/customers.
Ink-900 section background with faint diagonal shapes. Centred white panel:
H1 "BRANDS WE DISTRIBUTE" with a short yellow rule, subtitle line.
Filter chips (toggle buttons): All (selected: yellow fill + ink text + check icon),
Power Tools, Hand Tools, Machinery, Measuring, Safety, Fasteners & Hardware;
show "Showing 12 brands" count. 4-column logo grid (12 cards), brand name in small caps
below each logo (always visible, not hover-only); each card links to the brand page.
Below the panel: 4 stat tiles (yellow numbers on ink: "XX+ BRANDS", "XX,XXX+ SKUs").
Also design /brands/[brand]:
- R0: brand hero (logo, about, "Authorised distributor" badge — only for brands Mojo is
  authorised for), product range as category tiles (enquire on click),
  [ENQUIRE ABOUT <BRAND>] and [REQUEST PRICE LIST] buttons, WhatsApp link.
- R1 frame: tiles link into the shop, top products rail, "Download price list"
  (locked state for non-dealers), "Shop all <brand>" CTA.
```

### Prompt 5 — Contact Us (R0)
```
Design the Contact page. Reference: toolworld.in/contact (screenshot at 50% zoom; use
normal density).
1. Short hero band with H1 "CONTACT US".
2. Two columns: left "Contact us" card on yellow-soft with icon rows (address, store
   hours, phone, WhatsApp, email, GSTIN); right "Get in touch" form with visible labels:
   name, mobile (+91, 10 digits), email, company (optional), enquiry type select
   (Product enquiry / Bulk quote / Price list request / Become a dealer / Support),
   brand (optional, shown for quote/price list), message, attachment
   (PDF/XLSX/CSV/image, 10 MB), consent checkbox (unticked, linked privacy policy),
   Turnstile (managed — usually invisible), yellow SUBMIT.
   Show: error summary at the top of the form + inline errors after a failed submit;
   success message replacing the form ("Thanks, {name}. Your enquiry number is
   ENQ-2026-00012. We'll reply within within 1 working day.").
3. Embedded map card with the address in text beside it and "Get directions".
4. Help banner split: left yellow panel "Need help choosing the right tool?" with
   Call / WhatsApp / Raise a support request buttons; right panel newsletter
   (email + Subscribe) and "Request a Quote" outline button.
```

### Prompt 6 — Shop landing (R1)
```
Design /shop (shop face: light, dense). References: Moglix home, MISUMI home.
1. Category icon bar under the nav (10 icons + labels, horizontal scroll on mobile,
   "NEW" tag on one).
2. Hero row: left "Search by Category" vertical list with icons (MISUMI style, 280px);
   right banner carousel with arrows, numbered pager and pause (no auto-advance on
   mobile); under the banner a brand tab strip (5 tabs: brand name + "Up to 40% off" /
   "Best prices"), active tab underlined in ink.
3. Register bar (ink-800): "Not a business customer yet? Register with your GSTIN for
   GST invoices and bulk quotes" [REGISTER NOW].
4. 4 promo tiles (Clearance, Economy, New arrivals, Bulk deals).
5. Category sections (repeat 3×: Power Tools, Hand Tools, Safety): title + "VIEW ALL";
   left card "Top Brands & Related Categories" with 4 circular brand logos; 4 sub-category
   tiles with product on a pedestal; below, a horizontally scrolling rail of 8 ProductCards
   with arrow buttons.
6. Recently viewed rail; footer.
(Side widget is R2 — omit.)
```

### Prompt 7 — Category / brand listing with filters (R1)
```
Design the category listing page. Reference: liontoolsmart.com offers page (left filter).
Breadcrumbs, H1 "Angle Grinders", one-line intro, sub-category chips.
Left FilterSidebar 280px: "Filter by" + Clear all; collapsible groups with chevrons:
Category (tree), Brand (search box + checkboxes with counts), Price in INR (range
slider with two labelled inputs + presets: Below 1,000 / 1,000–5,000 / 5,000–15,000 /
Above 15,000), Availability (In stock), Specs (Disc size, Power W, Corded/Cordless),
Tags (Stock Clearance, Economy Series).
Top toolbar: applied filter chips with × (labelled "Remove filter: Bosch"),
"248 results", Sort by, density toggle (list / 2 / 3 / 4 columns), Show 24/48/96.
Grid of ProductCards (see brief) and the alternative list view with ProductRows
(thumb, name, SKU, 3 key specs, pack/MOQ, stock, price, qty stepper, Add).
States: loading skeletons, empty result ("No products match — clear filters or
request this item via quote"), mobile filter bottom sheet with "Show 248 results".
```

### Prompt 8 — Product detail page (R1)
```
Design the PDP for a power tool.
Left: gallery (main 1:1, 5 thumbnails, zoom on hover, mobile swipe with numbered
indicator "2 / 5").
Right: brand (link), H1 product name, SKU in mono with copy icon, rating hidden for v1,
PriceBlock (₹ price incl. GST, MRP struck, % off pill, "₹x + GST" line),
StockBadge (text + dot), pack size and MOQ chips, QtyStepper (steps by pack),
yellow ADD TO CART, ink ADD TO QUOTE, "Buying 50+? Get a bulk quote" link,
pincode delivery check, trust row (Genuine, GST invoice, returns per policy),
country of origin.
Tabs: Specifications (zebra table), Description, Documents (PDF rows with size).
Rails: Related products, Recently viewed.
Mobile: sticky bottom bar with price + ADD TO CART + quote + WhatsApp icons (the
floating WhatsApp button is hidden on this page on mobile).
States: out of stock (Notify me + Request quote), clearance variant (red badge,
"Only 6 left"), economy variant (teal badge), added-to-cart drawer open.
```

### Prompt 9 — Search results & no-results (R1)
```
Design /shop/search?q=. Header shows "Results for 'DW 4 inch grinder' (52)".
If an exact SKU match exists, show a highlighted "Exact SKU match" card on top.
Then tabs: Products | Brands | Categories, with the listing layout from Prompt 7.
No-results state: suggestions ("Did you mean…"), popular categories, and an
inline "Can't find it? Tell us what you need" mini RFQ form (item, qty, phone).
```

### Prompt 10 — Cart & cart drawer (R1)
```
Design the cart drawer (opens on add) and the full /cart page.
Line items: thumb, name, brand, SKU (mono), pack/MOQ note, QtyStepper, unit price,
line total, remove (with Undo toast). Order summary card: subtotal, GST included line,
shipping (or "Free above ₹X"), total; coupon field (R2 — omit);
buttons: yellow PROCEED TO CHECKOUT, ink "REQUEST QUOTE FOR THIS CART".
Warnings: qty below MOQ, item now out of stock. Empty cart state with category links.
```

### Prompt 11 — Checkout (R1)
```
Design a 4-step checkout with stepper: Address → Delivery → Payment → Review.
1. Address: saved address cards or form (name, mobile, pincode auto-fills city/state,
   address lines, landmark); billing same as shipping toggle; "Buying for a business?"
   section with GSTIN field (auto-filled and locked for approved B2B accounts;
   shows legal name after validation).
2. Delivery: Ship to address (est. date) or Pick up from warehouse.
3. Payment: Razorpay (UPI, cards, netbanking) as default; "Bank transfer / NEFT"
   option visible only to approved business accounts with a note that the order is
   confirmed after payment is received. (PO number is R2 — omit.)
4. Review: items, tax split (CGST+SGST or IGST), totals, terms checkbox, PLACE ORDER.
Right sticky summary on desktop. Show the success page: order number, next steps,
download proforma (NEFT) or invoice (paid) — each also viewable as a web page —
continue shopping.
```

### Prompt 12 — Quick order (bulk by SKU, R1)
```
Design /quick-order for B2B buyers. Title "QUICK ORDER", subtitle "Add many items by SKU".
Three input methods as tabs: Enter rows | Paste list | Upload CSV (with template download).
Rows table: SKU input with autocomplete → resolved product (thumb, name, brand),
pack size, qty, unit price, line total, status icon + text (OK / Not found /
Below MOQ / Out of stock), remove. "Add 10 more rows". Footer: items count, subtotal,
ADD ALL TO CART and REQUEST QUOTE. Show a row-level error and a successful paste of 15 lines.
```

### Prompt 13 — Request for Quote (R1)
```
Design /rfq. Two entry modes: "From my cart" (pre-filled items) and "Build a list"
(rows: product search or free-text description, qty, unit). Company & contact block
(pre-filled for logged-in business users; guest sees name, company, GSTIN optional,
email, mobile). Required-by date, delivery pincode, message, attachment upload
(PDF/XLSX/CSV/image, 10 MB). Submit → confirmation screen with RFQ number and
"We usually reply within within 1 working day".
Also design the buyer's quote view: Quote QT-2026-00042, status pill, valid-until date,
priced lines with GST, totals, buttons ACCEPT & PLACE ORDER / Download PDF /
Ask a question.
```

### Prompt 14 — Wholesale price lists (R1)
```
Design /price-lists. Reference: mundhrabrothers.com/price-list (improve the styling).
Intro: "Brand-wise wholesale price lists for registered business customers."
Search/filter by brand. 2-column grid of PriceListBrandCards: brand logo on a tile,
"<Brand> Price List" heading, rows of PDF title + "Effective 10 Jun 2026" +
DOWNLOAD button. Logged-out / unapproved state: rows visible but buttons show a lock
and the text "Log in as a business customer to download"; banner with REGISTER WITH GSTIN.
Pending-approval state banner: "Your business account is under review".
```

### Prompt 15 — Stock Clearance & Economy Series (R1)
```
Design two campaign listing pages sharing the listing layout:
- Stock Clearance Sale: red-accented banner "STOCK CLEARANCE SALE — limited stock,
  final prices", end date shown as text (no ticking countdown), cards show % off and
  "Only n left".
- Economy Series: teal-accented banner "ECONOMY SERIES — everyday tools, value
  prices", badge on cards, explainer strip (What is Economy Series? Same warranty,
  simpler finish, lower price).
Also design the "offer cards" component set (MISUMI-style): first-order discount card,
register-as-dealer card, bulk-buy benefit card, download-catalogue card.
```

### Prompt 16 — Auth & business registration (R1)
```
Design login and registration.
Login: email + password, Google button, links to register and reset.
(Mobile OTP tab arrives in R2 — show it as a separate R2 frame: one OTP field with
paste allowed, autocomplete one-time-code, resend after 30 s.)
Register: choose account type cards — "Personal (B2C)" vs "Business (B2B) —
GST invoices, bulk quotes, price lists".
Business registration 2-step form: (1) contact person, email, mobile;
(2) company legal name, GSTIN (validates format live; shows state from GSTIN),
PAN (auto from GSTIN), business type select, address, upload GST certificate (optional).
Post-submit screen: "Under review — usually within 1 working day", what unlocks after approval.
States: GSTIN invalid (message explains the format), rejected-with-reason banner.
```

### Prompt 17 — Customer account (R1)
```
Design /account dashboard with left sidebar (Dashboard, Orders, Quotes & RFQs,
Addresses, Company profile, Downloads, Privacy & data, Logout). (Saved lists are R2.)
Dashboard: greeting, business status badge (Approved / Pending), KPI cards
(open orders, open quotes, last order), recent orders table, quotes awaiting action.
Orders list with filters and status pills; order detail with OrderTimeline,
items, tax split, invoice download, courier tracking link, Cancel (before dispatch),
Reorder (R2 — omit). Quotes list and detail (see Prompt 13). Company profile showing
GSTIN, legal name, addresses. Downloads: invoices and price lists. Privacy & data:
request data deletion. Mobile variants.
```

### Prompt 18 — Admin panel (R1)
```
Design the admin panel (desktop-first, light, compact; ink sidebar with yellow
active indicator bar + bold label). Screens:
1. Dashboard: KPI cards (today's orders, revenue, open RFQs, new enquiries, pending
   approvals, low-stock SKUs), charts (orders by day, sales by brand), recent activity.
2. Products DataTable: search, filters (brand, category, status, tags), columns
   (image, name, SKU, brand, price, stock, flags), bulk actions (tag clearance/economy,
   activate), edit drawer with tabs (Basics, Pricing, Inventory, Specs, Media incl. alt
   text, SEO).
3. Import wizard: upload XLSX → column mapping → preview with row errors highlighted →
   confirm → report (created / updated / failed, download error file).
4. B2B approvals: list + detail card (GSTIN, legal name, state, documents) with
   APPROVE / REJECT (reason) / SUSPEND actions.
5. RFQ inbox and QuoteBuilder: RFQ items left; priced lines right with GST auto,
   discount, validity date, notes, live totals, Preview PDF, SEND QUOTE.
6. Orders: list with status filters; detail with status change, confirm NEFT payment,
   add courier + AWB, print invoice / packing slip.
7. Price lists manager: brands with uploaded PDFs, effective date, visibility toggle.
8. Banners & offers: placement, schedule, preview, alt text.
9. Enquiries inbox: type, source (UTM), status, assignee, attachment, CONVERT TO RFQ.
```

### Prompt 19 — System states & micro-interactions
```
Create a states board for Mojo Tools components: buttons (default/hover/focus/active/
disabled/loading), inputs (default/focus/error/success/disabled — error shown with icon
+ text, not colour alone), error summary box, form success message, ProductCard
(default/hover/out-of-stock/clearance/economy/loading skeleton), QtyStepper limits,
toasts (added to cart with undo, error), StatusPill colours for order, RFQ and enquiry
statuses, empty states (cart, orders, quotes, search), 404 and 500 pages (R0 version:
links to Home/Brands/Contact; R1 version adds search box and category links),
carousel pager playing/paused, mega-menu hover intent, cookie bar.
Note motion specs: 150ms hover, 220ms drawers, 600ms hero crossfade, reduced-motion
fallbacks (no auto-advance, no count-up, no zoom).
```

## 8. Accessibility specification

Standard: **WCAG 2.2 AA** ([`PRD.md §7`](PRD.md#7-non-functional-requirements)); build rules are in [`RULES.md §6`](RULES.md#6-accessibility-rules).

### 8.1 Page structure
- Landmarks: `header`, `nav` (labelled "Main" / "Footer" / "Breadcrumb" / "Pagination"), `main`, `footer`. One `<h1>` per page; every section has a real heading.
- `<html lang>` from the locale; the "हिंदी" toggle label (R2) is wrapped in `lang="hi"`.
- Skip link first. Visible focus everywhere (`--focus-ring`).
- Reflow: works at 320 px width and 200 % zoom with no horizontal page scroll (data tables may scroll inside their own container).

### 8.2 Hero carousel
- The **pause/play button comes first** in the carousel's tab order. It's labelled "Pause slideshow" / "Play slideshow".
- Auto-advance (≥ 6 s per slide) stops on hover, on keyboard focus inside the carousel, and permanently once the user pauses. Under `prefers-reduced-motion` the carousel **starts paused**.
- Container: `role="region"` + `aria-roledescription="carousel"` + `aria-label="Featured"`. Each slide: `role="group"` + `aria-roledescription="slide"` + `aria-label="2 of 3"`. Inactive slides are `inert`.
- Live region `aria-live="off"` while rotating, `"polite"` after manual navigation.
- Pager buttons are named "Go to slide 3"; the current one has `aria-current="true"`.
- Text sits on a scrim that keeps ≥ 4.5:1 for all slides; images that carry no information have `alt=""`.

### 8.3 Animated stats
- The final value is in the DOM as text (e.g. visually hidden "25+ years in business"); the animated number is `aria-hidden`.
- No animation under reduced motion.

### 8.4 Forms (enquiry, contact, newsletter; all R1 forms)
- Visible `<label>` on every field; required fields marked with text ("required"), not only `*`.
- shadcn `<Form>` wiring: `aria-invalid` + `aria-describedby` for the error text.
- On a failed submit: focus moves to an **error summary** at the top listing each error as a link to its field.
- Messages say how to fix: "Enter a 10-digit mobile number", "GSTIN must be 15 characters, e.g. 27ABCDE1234F1Z5".
- Success: the message is announced via `role="status"` and includes the enquiry number.
- `autocomplete`: `name`, `email`, `tel-national`, `organization`, `postal-code`; `inputmode="numeric"` for mobile and pincode; `autocomplete="one-time-code"` for OTP (R2).
- Turnstile in managed mode. The file input has a visible label listing allowed types and the size limit.
- Consent checkbox is unticked by default and links to the privacy policy.

### 8.5 Overlays and focus not obscured (WCAG 2.4.11)
- While the cookie bar shows, page content gets `padding-bottom` equal to its height. `scroll-padding-bottom` keeps focused elements above the WhatsApp FAB, mobile bottom bar and sticky bars.
- Layer order follows the z-index tokens (§2.3). The FAB never overlaps the cookie bar or the PDP sticky bar.
- Drawers and dialogs trap focus, close on Esc and return focus to their trigger. The cookie bar is not modal.

### 8.6 Third-party widgets
| Widget | Requirement |
|---|---|
| Turnstile | Managed/invisible mode; if a challenge appears it must be keyboard operable; the form explains the fallback (call or WhatsApp) |
| Google Maps | `title` on the iframe, address as text beside it, "Get directions" link; the map must not trap keyboard focus |
| Razorpay (R1) | Keyboard and screen-reader pass with test keys before launch; NEFT remains an alternative for B2B |
| Generated PDFs (R1) | Untagged (react-pdf), so every quote/invoice is also viewable as an HTML page and summarised in the email |

### 8.7 Keyboard behaviour

| Element | Tab order | Enter / Space | Escape | Arrow keys |
|---|---|---|---|---|
| Skip link | 1st | Jumps to `<main>` | — | — |
| Header nav (R0) | After logo | Follow link | — | — |
| Mega-menu (R1) | After logo | Open submenu / follow link | Close, focus to trigger | ← → top items; ↓ into submenu |
| Hero carousel | Pause → slide CTA → pager | Pause/play; go to slide | — | ← → on pager |
| Values accordion | Each header | Toggle panel | — | ↑ ↓ between headers |
| Brand filter chips | Each chip | Toggle; result count announced | — | — |
| Enquiry form | Fields in visual order → submit | Submit | — | Select: ↑ ↓ |
| Cookie bar | Early in order, not a trap | Accept / reject / manage | Closes the manage panel | — |
| WhatsApp FAB | Last | Opens `wa.me` (new tab, announced) | — | — |
| Drawers / dialogs | Focus moves in, trapped | — | Close, focus returns | — |
| Search combobox (R1) | In header | Select suggestion | Close list | ↑ ↓ through suggestions |

### 8.8 Screen reader announcements

| Element | Announced as | Failure to avoid |
|---|---|---|
| Hero | "Featured, carousel. 1 of 3, Built for the jobsite" | Announcing every auto-rotation |
| Pause button | "Pause slideshow, button" | Unlabelled icon |
| Brand logo card | "Brand A, link" | "logo.png" / "image" |
| Stats | "25+ years in business" | "0… 3… 12…" |
| WhatsApp FAB | "Chat with us on WhatsApp, link, opens in new tab" | Unlabelled icon |
| Form error | "Mobile number, invalid entry, Enter a 10-digit mobile number" | Red border only |
| Form success | "Thanks — your enquiry number is ENQ-2026-00012…" (status) | Silent redirect |
| Cart (R1) | "Cart, 3 items" | "Cart 3" |
| Price (R1) | "Price ₹1,499. MRP ₹1,999. 25 % off" | Strike-through with no label |
| Stock (R1) | "Low stock, 4 left" | Coloured dot only |

## 9. Status colours

Every status pill shows **text**; colour only reinforces it. Pills use solid fill + white text, except neutral ones (ink-700 text on steel-100).

| Status | Colour |
|---|---|
| `awaiting_payment`, `pending` (B2B), enquiry `new` | warning `#9A5B00` |
| `confirmed`, `quoted`, enquiry `contacted` | info `#1A5FB4` |
| `packed`, `dispatched`, `in_review`, `submitted`, enquiry `closed` | ink-700 on steel-100 |
| `delivered`, `accepted`, `approved`, enquiry `qualified` | success `#188038` |
| `cancelled`, `rejected`, `expired`, `suspended`, enquiry `spam` | danger `#D93025` |
