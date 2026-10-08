# Mojo Tools — Development Rules

> **Version 0.2** (08 Oct 2026): consolidated and corrected. See [`CHANGELOG.md`](CHANGELOG.md).
> Rules for anyone (human or Claude Code) working on this repo. If a rule must be broken, write why in the PR description and add an entry to [`DECISIONS.md`](DECISIONS.md).

---

## 0. How to work on this project (read first)

1. **Read the docs before coding** (all in `docs/`): [`README.md`](README.md) (index + current release), `PRD.md` (what), `ARCHITECTURE.md` (how it fits), `DESIGN.md` (how it looks), `TASKS.md` (what's next). Consult `DECISIONS.md` and `OPEN-QUESTIONS.md` before re-opening a settled point.
2. **Work one task at a time** from `TASKS.md`, in order. The current release is **R0 (company site)**; do not start R1 tasks until R0 has launched, unless a task says otherwise. Tick the checkbox in the same PR that completes it.
3. **Plan → build → verify → document.** Before writing code, state the files you will touch. Afterwards, run typecheck, lint and tests, and look at the page in a browser (desktop + mobile width, keyboard only, reduced motion on).
4. **Keep docs in sync.** New table, route, env var, integration or analytics event → update `ARCHITECTURE.md` in the same PR. New/changed token or component → `DESIGN.md`. New decision → `DECISIONS.md`. Changed docs → a line in `CHANGELOG.md`.
5. **Never invent business data** (prices, GSTIN, addresses, testimonials, stats, delivery reach, response times). Use clearly fake seed data marked `// SEED` or `{placeholder}` until the owner supplies real data.
6. **Ask, don't guess,** on anything marked ❓ in `OPEN-QUESTIONS.md`. A 🟡 item may be built on its stated default.

## 1. Principles

| Principle | In practice |
|---|---|
| **B2B first, B2C friendly** | Optimise for repeat, SKU-driven, bulk buyers; keep the path simple for one-off buyers |
| **Ship the company site first** | R0 builds only what the company site needs, in a way the shop (R1) can extend without rework |
| **Server first** | React Server Components by default; `"use client"` only for interactivity |
| **Security by default** | RLS on every table; validate every input on the server; least privilege |
| **Single source of truth** | Zod schemas shared between forms and server actions; design tokens only from `globals.css` |
| **Boring, proven tech** | No new dependency without a reason in the PR |
| **Accessible & fast** | WCAG 2.2 AA; Core Web Vitals green on mobile |
| **KISS / YAGNI** | Build what the current release needs; leave hooks (e.g. `pricing/` module) for known future work |
| **Data is money** | Prices, tax and stock changes are audited, transactional and tested |

## 2. Technology (locked for v1)

Next.js App Router (**current stable major at T1.1, ≥ 15, then pinned**) · React (matching) · TypeScript strict · Tailwind CSS v4 · shadcn/ui (Radix) · lucide-react · React Hook Form + Zod · Supabase (`@supabase/ssr`) · Resend + React Email · Cloudflare Turnstile · next-intl · Vitest · Playwright + `@axe-core/playwright` · ESLint (+ `eslint-plugin-jsx-a11y`) + Prettier · pnpm · Node.js active LTS (pinned in `.nvmrc` and `engines`).
From R1: Razorpay · `@react-pdf/renderer` · SheetJS.

Not allowed without a `DECISIONS.md` entry: other UI kits (MUI, Chakra, Bootstrap), CSS-in-JS, Redux, ORMs on top of Supabase, client-side data-fetching libraries for data that can be loaded on the server, third-party cookie-consent or chat widgets.

## 3. Project structure rules

- Follow the folder layout in [`ARCHITECTURE.md §4`](ARCHITECTURE.md#4-folder-structure).
- **Domain logic lives in `src/features/<domain>/`**: `queries.ts` (reads), `actions.ts` (server actions / mutations), `schemas.ts` (Zod), `types.ts`, `utils.ts`.
- `src/components/ui` = generic primitives with no business logic. `components/marketing`, `components/shop`, `components/layout` = composed UI that receives data via props.
- Pages (`page.tsx`) stay thin: fetch via `features/*/queries`, render components.
- No cross-imports between features except via their public `index.ts`.
- Server-only modules start with `import "server-only"`.
- R0 site content (hero slides, stats, values, timeline) lives in typed files in `src/features/content/` until the R1 admin replaces them.

## 4. Coding standards

### TypeScript
- `strict: true`, `noUncheckedIndexedAccess: true`. No `any`; use `unknown` + narrowing.
- Use the generated Supabase types (`pnpm db:types`); never hand-write DB row types.
- Prefer `type` for unions and props; use `interface` only when extending.
- Exhaustive `switch` on status enums with a `never` check.

### Naming
| Thing | Convention | Example |
|---|---|---|
| Components | PascalCase file + export | `ProductCard.tsx` |
| Hooks | `useX` camelCase | `useCart.ts` |
| Other files | kebab-case | `price-format.ts` |
| DB tables / columns | snake_case, plural tables | `order_items.unit_price` |
| Enums (DB) | snake_case values | `awaiting_payment` |
| Env vars | SCREAMING_SNAKE | `RESEND_API_KEY` |
| Routes | kebab-case | `/quick-order` |
| Analytics events | snake_case, from the list in `ARCHITECTURE.md §11` | `generate_lead` |

### React / Next.js
- Server Components by default. Client components are small leaves (`QtyStepper`, `FilterSidebar` state, carousels, forms).
- Mutations go through **server actions** that: (1) validate with Zod, (2) check auth/role (or captcha + rate limit for public forms), (3) run in a DB transaction where multiple writes happen, (4) `revalidateTag` affected data, (5) return a typed `{ ok: true, data } | { ok: false, error }`.
- Route handlers only for webhooks, cron and public JSON (search suggest).
- Every route has `loading.tsx` (skeletons) and `error.tsx`; `not-found.tsx` for brands, products and categories.
- Use `next/image` with explicit `sizes` and `alt`; `next/font` for fonts; no layout shift.
- The URL holds state for filters, sort, page and search (`searchParams`), so listings are shareable and crawlable.
- `next-intl` uses `localePrefix: 'as-needed'`: English URLs have no prefix.

### Styling
- Tailwind utilities using **tokens from `DESIGN.md §2`** only. No hard-coded hex values, no arbitrary pixel values unless documented.
- Mobile-first breakpoints. Test at 320, 360, 768, 1280, 1536 px.
- Use the `cn()` helper for conditional classes; variants via `class-variance-authority`.

### Money, numbers, dates
- Money is **integer paise** end-to-end; convert only in `lib/format.ts` → `₹1,23,456.00` (`en-IN`).
- Never compute money with floats. GST maths lives in `features/tax` with unit tests.
- Dates are stored as UTC (`timestamptz`) and displayed in `Asia/Kolkata`, format `07 Oct 2026`. Phones are displayed as `+91 98765 43210`.

### Database
- All schema changes go through **SQL migrations** in `supabase/migrations`; never edit a merged migration.
- Every table: `id uuid default gen_random_uuid()`, `created_at`, `updated_at` (trigger), RLS **enabled** with explicit policies.
- Foreign keys + indexes for every FK and every filter/sort column.
- Snapshot data on orders/quotes/invoices (name, SKU, HSN, price, GST). Never join back to live product data for historical documents.
- Sequential human numbers (enquiries, orders, invoices, RFQs, quotes) via Postgres sequences; the invoice sequence resets per financial year (Apr–Mar).

### Errors & logging
- Never show raw errors to users; map them to friendly messages. Log with context to Sentry.
- No `console.log` in committed code (use a logger util).
- Webhooks are idempotent and always return 2xx after a successful record, even on duplicates.

## 5. Security rules

- Secrets only in env vars, validated by `lib/env.ts`. `.env*` files are never committed (except `.env.example`).
- `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` and (R1) `RAZORPAY_KEY_SECRET` are used **only** in server-only modules.
- (R1) Verify Razorpay signatures (checkout + webhook). Re-calculate order totals on the server; never trust client prices.
- Authorisation is checked in the server action **and** enforced by RLS.
- Private files (enquiry attachments, price lists, invoices, RFQ attachments) are served only via signed URLs (≤ 10 min).
- File uploads: allow-list MIME types **and** extensions (PDF, XLSX, CSV, JPG, PNG, WEBP), max 10 MB, stored with generated names, never executed or rendered as HTML.
- Captcha (Turnstile) + rate limit on every public form (enquiry, newsletter) and on auth.
- Security headers from R0: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors 'none'`.
- Admin routes (R1): middleware guard + MFA + `noindex`.
- DPDP Act: unticked consent checkbox on forms (with `consent_at` stored), consent-gated analytics, privacy policy, data-deletion request path (R1 account page; R0 via email address on the privacy page).

## 6. Accessibility rules

Target **WCAG 2.2 AA**. The full spec is in [`DESIGN.md §8`](DESIGN.md#8-accessibility-specification).

- Semantic HTML first; one `<h1>` per page; landmarks (`header`, `nav`, `main`, `footer`), with multiple `nav`s labelled; skip link.
- Colour contrast ≥ 4.5:1 for text and ≥ 3:1 for UI boundaries and icons, using the checked tokens in `DESIGN.md §2.1`. **`--brand-yellow` is never used for text, icons or links on white/light surfaces.** Secondary text uses `--steel-500`, not `--steel-400`.
- Never convey information by colour alone (stock, status, clearance, errors).
- Every interactive element is keyboard reachable with a visible focus ring; no keyboard traps except intentional focus traps in dialogs/drawers (Esc closes).
- **Focus not obscured (2.4.11):** fixed overlays (cookie bar, WhatsApp FAB, bottom bars) must never cover the focused element; use the z-index tokens and scroll padding.
- **Target size:** ≥ 44 × 44 px on touch devices.
- Carousels: pause control first, no auto-advance under `prefers-reduced-motion`, slide semantics as specified. No auto-scrolling marquees.
- Animation respects `prefers-reduced-motion` (counters show final values, no zoom/parallax).
- Forms: visible labels, error text linked via `aria-describedby`, error summary on submit, helpful messages, correct `autocomplete`/`inputmode`.
- Images have meaningful `alt` (logo = brand name; product = brand + product name); decorative images `alt=""`. Alt text is a required field in content and admin.
- Generated PDFs always have an HTML equivalent.
- **Automation:** `eslint-plugin-jsx-a11y` in lint; `@axe-core/playwright` on every page in the e2e smoke run. Serious/critical violations fail CI.
- **Manual check before each release:** keyboard-only pass, 200 % zoom / 320 px reflow, NVDA + Chrome, VoiceOver + Safari (iOS), TalkBack + Chrome (Android).

## 7. Performance rules

- Budget: JS ≤ 170 KB gzipped on first load (marketing pages ≤ 120 KB; listing/PDP ≤ 170 KB); LCP < 2.5 s, CLS < 0.1, INP < 200 ms (mobile).
- Images: AVIF/WebP, max 1600 px, lazy below the fold, hero image `priority`.
- Analytics and maps load after consent / on interaction, never blocking render.
- Cache catalogue reads with tags; revalidate on admin changes.
- Paginate everything (listings 24/48/96 per page, admin tables 50).
- No N+1 queries: fetch listing data in one query with joins/RPC.

## 8. SEO rules

- `generateMetadata` on every page: title (`{Page} | Mojo Tools`; brand page `{Brand} dealer & distributor | Mojo Tools`; product `{Product} | {Brand} | Mojo Tools`), description, canonical, Open Graph image.
- JSON-LD: `Organization` + `LocalBusiness` (R0), `BreadcrumbList` (R0 brand pages; R1 listing/PDP), `Product` + `Offer` (R1 PDP).
- `sitemap.ts` covers marketing pages and brands (R0), plus categories and products (R1). `robots.ts` blocks `/admin`, `/account`, `/cart`, `/checkout`, `/dev`.
- Filter combinations: `noindex` beyond category + brand to avoid crawl bloat.
- URLs never change between releases; if one must, add a permanent redirect in the same PR.

## 9. Testing rules

| Level | Tool | Must cover |
|---|---|---|
| Unit | Vitest | R0: enquiry schema, phone/email/GSTIN-format validation, UTM capture, `lib/format`. R1: GST calc, price formatting, GSTIN checksum, import row validation, order totals |
| DB | Supabase local + SQL tests | R0: public cannot read `enquiries`/`newsletter_subscribers`; public reads only active brands/categories. R1: customer can't read others' orders; guest can't download price lists |
| E2E | Playwright + axe | R0: every page renders and passes axe; enquiry form happy path, validation errors, attachment upload; cookie consent gates GA4. R1: B2C checkout; B2B register → approve → RFQ → quote → order; quick order; price-list download gate; admin import |

A PR that changes enquiries, pricing, tax, checkout, auth or RLS **must** include tests.

## 10. Git & PR workflow

- `main` is always deployable. Work in branches `feat/<release>-<task-id>-<short-name>` (e.g. `feat/r0-t4.4-contact-page`), `fix/...`, `chore/...`, `docs/...`.
- Conventional Commits: `feat(enquiries): add attachment upload`, `fix(tax): igst for interstate`.
- Small PRs (< 400 lines changed where possible). One task from `TASKS.md` per PR.
- PR checklist:
  - [ ] Task ID from `TASKS.md` referenced and ticked
  - [ ] Typecheck, lint, tests (incl. axe) pass
  - [ ] Checked on mobile + desktop, with short and long content
  - [ ] Accessibility: keyboard, focus visibility, contrast, reduced motion checked
  - [ ] Docs updated (`ARCHITECTURE.md` / `DESIGN.md` / `DECISIONS.md` / `CHANGELOG.md`) if structure, UI tokens or decisions changed
  - [ ] No secrets, no `console.log`, no hard-coded colours, no invented business data

## 11. Content & copy rules

- Tone: confident, plain, practical ("Built for the jobsite"), not marketing fluff. Sentence case except display headings and primary buttons.
- UI strings live in `src/i18n/messages/*.json`, never inline in components.
- Indian English spelling; INR; Indian phone format `+91 98765 43210`.
- Only real testimonials, real client logos (with permission) and real stats from the owner.
- **Claims need owner confirmation before going live:** "authorised distributor" (per brand), delivery reach ("pan-India"), response times ("within 24 hours"), returns terms. Until confirmed, they are `{placeholders}` and hidden in production.

## 12. Definition of Done

A task is done when it:
- meets the acceptance criteria in `TASKS.md`;
- works on mobile and desktop;
- has tests where required;
- is accessible (axe clean, keyboard and reduced-motion checked);
- is deployed to a preview and checked;
- has its docs updated;
- has its checkbox ticked.
