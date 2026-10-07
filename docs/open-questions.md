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

## Inconsistencies spotted in the PRD

| # | Issue | Suggested resolution |
|---|-------|----------------------|
| I1 | The EN/हिंदी switch is in the P0 top nav (GL-1), but the Hindi UI is P1 / R2 (GL-8). | Hide the switch until R2, or ship it at launch with a partial translation. |
| I2 | Product variants (CA-4) are P1, but they are missing from the R2 release list. | **[Phase 2]** Put them in R2, or decide that R1 data has no variants. |
| I3 | Country of origin is legally required on the product page (§7) but missing from the product fields (CA-3). | **[Phase 2]** Add a `country_of_origin` field to the product data model and import template. |
| I4 | Shipping rules (CO-7) are P0, but the delivery partner is still open (Q3). | **[Phase 2]** Settle Q3 before building checkout. |
