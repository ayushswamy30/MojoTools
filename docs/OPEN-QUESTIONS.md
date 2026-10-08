# Mojo Tools — Open Questions for the Owner

Only questions that still need the owner's answer. Contradictions between the briefs have been resolved; see [`CHANGELOG.md`](CHANGELOG.md#consolidation-log-08-oct-2026).
Legend: 🟡 a default is in place and work can proceed (please confirm) · ❓ no answer yet; blocks the linked task.

## Needed for R0 (company site)

| # | Question | Default / note | Status | Blocks |
|---|----------|----------------|--------|--------|
| Q4 | Domain name and business email? | — | ❓ | T5.5, QR print in the launch plan |
| Q5 | Confirm the stack: Next.js + Supabase + Vercel | As documented | 🟡 | T1.1 |
| R0-1 | English only for R0? | Yes; Hindi in R2 | 🟡 | — |
| R0-2 | Enquiries handled by email + database (no admin inbox until R1)? | Yes | 🟡 | T4.4 |
| R0-3 | Hero slides and site copy fixed in code until R1? | Yes | 🟡 | T4.1 |
| R0-4 | Category tiles open the enquiry form (no shop yet)? | Yes | 🟡 | T4.1 |
| R0-5 | Price lists requested via the enquiry form until R1? | Yes | 🟡 | T4.3 |
| R0-6 | Show an "online ordering coming soon" notice + notify signup? | Yes | 🟡 | T4.1 |
| C1 | Target launch date for the company site | — | ❓ | Launch plan dates |
| C2 | Marketing budget tier: Lean (₹0 media) / Starter (~₹40k) / Growth (~₹1.2L) over 8 weeks | Starter recommended | ❓ | Launch plan §8 |
| C3 | Confirm targets (150 enquiries in 8 weeks, 25 Google reviews, 300 notify signups), or share past enquiry volumes | As stated | 🟡 | Launch plan §7 |
| C4 | **Response-time promise** for enquiries and quotes, and who receives enquiry alerts | Shown as `{response promise}` until set | ❓ | T4.4, copy everywhere |
| C5 | Which brands is Mojo **formally authorised** for? | No badge until confirmed | ❓ | T4.3 (`is_authorised`) |
| C6 | Existing Google Business Profile / IndiaMART listing? | — | ❓ | Launch plan L-4 |

### Assets for R0

| # | Item | Status |
|---|------|--------|
| A1 | Brand list + logos (PNG/SVG) + product types per brand | ❓ |
| A4 | Company content: story, purpose, mission, values, timeline, real stats, photos, real testimonials | ❓ |
| A5 | Mojo Tools logo + brand colours (until then: yellow + charcoal tokens) | ❓ |
| A6 | Business details: legal name, address, GSTIN, hours, phone, WhatsApp, email | ❓ |
| A8 | Top-level categories with one image each; hero images / slogans | ❓ |

## Needed for R1 (e-commerce), can wait

| # | Question | Default / note | Status |
|---|----------|----------------|--------|
| Q1 | Is **Tally** (or another ERP) in use? | Website admin is the master, fed by XLSX | 🟡 ❓ |
| Q2 | One warehouse or several locations? | One | 🟡 |
| Q3 | Delivery: own vehicles locally + which courier(s) nationally? | Manual AWB in R1, aggregator in R2 | ❓ |
| Q6 | Payments: Razorpay + NEFT in R1, COD in R2? | As stated | 🟡 |
| Q7 | Mobile OTP login in R2 (needs SMS provider + DLT registration)? | R2 | 🟡 |
| Q8 | Prices public to everyone (one selling price + MRP); bulk via RFQ until R2? | Yes | 🟡 |
| Q9 | Prices stored GST-inclusive? | Yes | 🟡 |
| Q10 | Mojo's own state for CGST/SGST vs IGST | From the GSTIN (A6) | ❓ |
| A2 | Product images named by SKU | — | ❓ |
| A3 | Wholesale price list PDFs per brand | — | ❓ |
| A7 | Grievance officer details; shipping, returns and cancellation terms | — | ❓ |
