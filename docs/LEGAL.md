# Mojo Tools — Legal & Compliance

> **Version 0.1** (11 Oct 2026). A working checklist, **not legal advice**. Before the public launch (T17.11) a lawyer should review the policy pages and this list.
> Policy text: `src/features/content/policies.ts`. Business facts: `src/features/content/site.ts`.

## 1. Laws that apply

| Law | What it means for this site |
|---|---|
| **Digital Personal Data Protection Act 2023** + **DPDP Rules 2025** (notified Nov 2025; most duties apply from **May 2027**, 18 months later) | Clear notice, consent, easy withdrawal, rights requests, breach reporting, logs kept ≥ 1 year. We comply now rather than retrofit. |
| **IT Act 2000** + SPDI Rules 2011 | Reasonable security practices; privacy policy published. |
| **Consumer Protection Act 2019** + **E-Commerce Rules 2020** | Show legal name, address, contact and a **grievance officer** (acknowledge in 48 h, resolve in 1 month); refund, return and cancellation policy; no unfair cancellation charges; no fake reviews. |
| **CCPA Dark Patterns Guidelines 2023** | No pre-ticked boxes, false urgency, hidden costs or nagging; equal "Accept" and "Reject" buttons. |
| **Legal Metrology (Packaged Commodities) Rules 2011** (R1) | Product pages must show MRP, net quantity, manufacturer/importer, **country of origin** and consumer-care details. |
| **GST law** | Correct tax invoices; keep accounts for the period the law requires. |
| **Trade Marks Act 1999 / Copyright Act 1957** | Brand names, logos and product photos belong to their owners; use only with permission. |
| **BIS Quality Control Orders** (R1) | Some tools and electrical goods must carry BIS marks; sell only compliant stock. |

## 2. Done on the site (11 Oct 2026)

- Policy pages at `/policies/terms`, `/privacy`, `/cookies`, `/refunds` and `/accessibility`, linked from every page footer.
- Grievance officer section in Terms and Privacy (details still placeholders: A12).
- Cookie banner: Accept / Reject / Manage with equal weight; nothing non-essential before consent; **Cookie settings** in the footer and cookie policy to change or withdraw; withdrawal stops GA and deletes `_ga*` and `mt_attr`.
- Campaign attribution cookie only after analytics consent.
- Third-party embeds: Google Maps is click-to-load with a notice; Turnstile is the only third-party script that loads without consent (security). Fonts are self-hosted (no Google Fonts requests). No social widgets, chat widgets or ad pixels.
- Forms: enquiry consent checkbox (unticked, required, links the privacy policy); newsletter has its **own** unticked consent box. Only name + mobile + message are required.
- No fake or placeholder claims are published: testimonials empty, placeholder award cards removed, "XX" stats hidden, Organization structured data off until real details exist. The assistant is told never to invent prices, stock, awards or specs.
- Accessibility: WCAG 2.2 AA, axe on every page in CI, keyboard-only flows, contrast fixed (D31), visible labels, errors linked to fields.

## 3. The owner must supply or decide before launch

| # | Item | Why |
|---|---|---|
| A6 | Legal name, full address, GSTIN, phone, email | E-Commerce Rules r.4(2); invoices; currently placeholders |
| A12 | **Grievance officer** name, designation, email, phone | Required by law |
| A11 | Founding year | Backs the "5+ years of trust" claim |
| A13 | Policy defaults (7-day reporting, 7-working-day refunds, 3-year enquiry retention, 30-day privacy replies, return exclusions) | Business decisions written into the policies |
| A14 | Paid Gemini key, or Groq only | Gemini's free tier lets Google use chat content to improve its products |
| C5 | Which brands Mojo **officially** distributes, with proof (letter/certificate) | "Official distributor" is a factual claim |
| A1, A8 | Brand logos and product photos **with permission** | Copyright and trademark (see §5) |
| — | A lawyer's review of all five policy pages | Final wording |

## 4. Launch set-up checklist (T17)

- [ ] Google Analytics: set data retention to **14 months** (the privacy policy says so) and switch off Google Signals and ads personalisation.
- [ ] Sign the data-processing terms of Vercel, Supabase, Resend, Cloudflare and Google (most are click-through in each dashboard).
- [ ] Supabase region: prefer **Mumbai (ap-south-1)**; otherwise the privacy policy's "outside India" section already covers it.
- [ ] Keep server and access logs at least **1 year** (DPDP Rules), then delete.
- [ ] Add Vercel Analytics or Sentry only after updating the privacy and cookie policies.
- [ ] Write down a breach-response contact and steps (who tells the Data Protection Board and affected people).
- [ ] Re-run this checklist when R1 adds accounts, payments (Razorpay), invoices and product pages.

## 5. Images and copyright

There are **no photos or raster images** on the site yet. Icons are `lucide-react` (ISC licence). Fonts (Archivo, Inter, JetBrains Mono) are SIL Open Font Licence. The WhatsApp glyph is used only to link to WhatsApp, which its brand guidelines allow.

Rules for every image added later:

1. **Own photos** (shop, team, warehouse): fine. Get written consent from anyone recognisable.
2. **Brand logos and product photos:** use only official assets from the brand or its distributor portal, with written permission (usually in the dealer/distributor agreement). Don't copy them from Amazon, IndiaMART or other sellers.
3. **Stock photos:** only from a licence that allows commercial use (e.g. a paid licence, Unsplash or Pexels), recorded in a credits list.
4. **Never** AI-generate a fake product image or a fake "real" photo of the shop or people.
5. Every meaningful image needs `alt` text; decorative ones get `alt=""`.

## 6. Risk register

| Risk | Likelihood | Impact | Mitigation | Status |
|---|---|---|---|---|
| Placeholder details (address, phone, email) go live | Medium | High (misleading, E-Com Rules breach) | Preview stays `noindex`; T5.1 replaces every `SEED`; `isDemoContent` banner | Open until A6 |
| No named grievance officer | High if not supplied | High | Placeholder in policies; launch blocked on A12 | Open |
| Unsupported claims ("official distributor", "5+ years", "genuine") | Medium | Medium–High (CCPA, trademark) | Owner confirms C5 and A11; keep proof on file | Open |
| Brand logos or product photos used without permission | Medium | Medium (takedown, infringement) | §5 rules; only official assets | Open (R1) |
| AI assistant gives wrong price, spec or promise | Medium | Medium | Instructions forbid prices/specs; "can make mistakes" label; Terms §7 | Mitigated |
| Chat data used by an AI provider for training | High on Gemini free tier | Medium | Paid key or Groq (A14); disclosed in privacy policy | Open |
| Analytics without valid consent | Low | Medium | Consent-gated, withdrawal, e2e tests | Mitigated |
| Spam or abuse via forms | Medium | Low | Turnstile, rate limits, file type and size checks | Mitigated |
| Accessibility complaint | Low | Medium | WCAG 2.2 AA + axe in CI; accessibility statement with contact | Mitigated |
| R1: missing Legal Metrology fields, MRP or country of origin on product pages | Medium | High | Required fields in the catalogue import (T6.2) | Planned |
| R1: cancellation fee asymmetry or hidden charges | Low | Medium | Show total price with GST and delivery before payment; free cancellation before dispatch | Planned |
