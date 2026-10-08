# Open Questions

Questions to resolve with the client. Each one lists the brief it came from.
Legend: 🟡 default assumed, needs confirmation · ❓ no answer yet · ⚠️ inconsistency spotted while reviewing.

> Items marked **[Phase 2]** are not needed for the company site and can wait. Phase 1 questions are in [`phasing.md`](phasing.md#phase-1-open-questions).

## Business & operations

| # | Question | Source | Status |
|---|----------|--------|--------|
| Q1 | Is **Tally** (or another ERP/accounting tool) in use? It affects how stock and prices are imported. Default: the website admin is the master, fed by CSV/XLSX. | **[Phase 2]** PRD §10 #4 | 🟡 ❓ |
| Q2 | One warehouse or several locations? Default: one. | **[Phase 2]** PRD §10 #6 | ❓ |
| Q3 | Delivery: own vehicles locally plus a courier aggregator (e.g. Shiprocket) nationally? | **[Phase 2]** PRD §10 #7 | ❓ |
| Q4 | Domain name and business email? | PRD §10 #8 | ❓ |
| Q5 | Confirm the stack: Next.js + Supabase + Vercel. | PRD §10 #1 | 🟡 |
| Q6 | Confirm payments: Razorpay + NEFT at launch, COD later. | **[Phase 2]** PRD §10 #3, CO-3/4/5 | 🟡 |
| Q7 | Confirm mobile OTP login at launch (needs an SMS provider and DLT registration in India). | **[Phase 2]** PRD AC-1 | 🟡 |
| Q8 | Confirm that prices are public to everyone (one selling price + MRP), with bulk prices only via RFQ until R2. | **[Phase 2]** PRD §10 #5 | 🟡 |

| Q9 | Are prices stored GST-inclusive? | **[Phase 2]** ARCH §5 | 🟡 |
| Q10 | Mojo Tools' own state for CGST/SGST vs IGST (from the business GSTIN, A6) | **[Phase 2]** ARCH §5 | ❓ |

## Launch campaign (Phase 1)

| # | Question | Source | Status |
|---|----------|--------|--------|
| C1 | Target launch date for the company site | 02b §10 | ❓ |
| C2 | Marketing budget tier: Lean (₹0 media) / Starter (~₹40k) / Growth (~₹1.2L) over 8 weeks | 02b §8 | ❓ |
| C3 | Confirm targets (150 enquiries in 8 weeks, 25 reviews, 300 notify-list signups), or share past enquiry volumes | 02b §1, §7 | 🟡 |
| C4 | Response-time promise for enquiries, and who receives the alerts | 02b §10 | ❓ |
| C5 | Which brands is Mojo formally authorised for? This governs logo use and ad keywords. | 02b §9 | ❓ |
| C6 | Existing Google Business Profile / IndiaMART listing? | 02b §4 | ❓ |

## Assets still needed from the owner

| # | Item | Source | Status |
|---|------|--------|--------|
| A1 | Brand list + logos (PNG/SVG) | PRD §9 | ❓ |
| A2 | Product images, named by SKU | **[Phase 2]** PRD §9 | ❓ |
| A3 | Wholesale price list PDFs per brand | **[Phase 2]** PRD §9 | ❓ |
| A4 | Company content: story, purpose, mission, values, stats, photos | PRD §9 | ❓ |
| A5 | Mojo Tools logo + brand colours (until then: industrial yellow + charcoal) | PRD §9, §10 #9 | ❓ |
| A6 | Business details: address, GSTIN, hours, phone, WhatsApp, email | PRD §9 | ❓ |
| A7 | Grievance officer details (required by the E-Commerce Rules 2020) | PRD §7 | ❓ |

## Inconsistencies between the briefs

| # | Issue | Suggested resolution |
|---|-------|----------------------|
| I1 | The EN/हिंदी switch is in the P0 top nav (GL-1), but the Hindi UI is P1 / R2 (GL-8). | Hide the switch until R2, or ship it at launch with a partial translation. |
| I4 | Shipping rules (CO-7) are P0, but the delivery partner is still open (Q3). | **[Phase 2]** Settle Q3 before building checkout. |
| I5 | **[Phase 2]** Phone OTP is P0 in the PRD (AC-1), but MSG91 is R2 in the architecture. | Move MSG91 to R1, or make OTP login R2. |
| I6 | **[Phase 2]** Shiprocket is R2 in the architecture, but shipping rules and tracking links are P0 in the PRD. | R1 uses flat/threshold rules + manual AWB entry. |

## Resolved

| # | Was | Resolved by |
|---|-----|-------------|
| I2 | Variants missing from the release plan | Architecture data model: every product has ≥1 `product_variants` row from R1 |
| I3 | Country of origin missing | `products.country_of_origin` in the architecture |
