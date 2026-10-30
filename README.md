# Mojo Tools — Website & E-commerce Platform

Mojo Tools trades hardware tools and machinery, selling to **B2B** and **B2C** buyers (currently offline).
This project is a combined **company website + e-commerce store**, built in releases: **R0** company site first, then **R1** online shop. The site goes public once, with both.

All project documentation lives in [`docs/`](docs/). Start with [`docs/README.md`](docs/README.md).

**Preview:** [mojotools.vercel.app](https://mojotools.vercel.app). It shows demo content and is kept out of search engines until launch.

## What's built so far (R0 company site)

- **Pages:** Home, About, Products, Distributorship (with a page per brand; old `/brands` links redirect), Awards, Contact, Get a quote, policies (terms, privacy, cookies, refunds, accessibility) and a 404 page.
- **Home:** a hero carousel (pauses on keyboard focus or the pause button, starts paused under reduced motion), category tiles, an infinite brand carousel (pauses on hover or focus), "why choose us" cards and a bulk-quote call-to-action band.
- **Enquiries:** the quote/enquiry form takes an optional attachment (PDF, Excel, CSV or image, up to 10 MB), is protected by Turnstile and a rate limit, saves to Supabase and emails sales and the customer through Resend. Newsletter sign-up asks for its own separate consent.
- **Mojo Mitra:** an AI assistant (Gemini or Groq) that finds categories and brands, links pages and pre-fills the quote form. A WhatsApp button sits above it.
- **Privacy:** a cookie banner with Accept / Reject / Manage. GA4 and campaign (UTM) tracking load only after consent, and withdrawing consent deletes their cookies.
- **Layout:** a sticky header that slides away while the footer wordmark is on screen and returns on scroll up. The footer has a trust strip, link columns and a full-width MOJO TOOLS wordmark on an ink-to-yellow gradient.
- **Quality:** CI runs the type-check, lint, formatting check, unit tests, build, and Playwright browser tests with axe accessibility checks (WCAG 2.2 AA).

Next is **R1**, the online shop: see [`docs/TASKS.md`](docs/TASKS.md).

## Run it locally

Requires Node 22+ and pnpm.

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

No accounts or keys are needed: without them the site runs in **demo mode** (enquiries are validated but not stored or emailed). Copy `.env.example` to `.env.local` to connect Supabase, Resend, Turnstile and GA4.

| Command                           | What it does                                                            |
| --------------------------------- | ----------------------------------------------------------------------- |
| `pnpm typecheck`                  | Route types + TypeScript                                                |
| `pnpm lint` / `pnpm format:check` | ESLint (incl. accessibility rules) / Prettier                           |
| `pnpm test`                       | Unit tests (Vitest)                                                     |
| `pnpm build && pnpm test:e2e`     | Browser tests + axe accessibility checks (Playwright, desktop + mobile) |

Database: `supabase/migrations/` (schema + RLS), `supabase/seed.sql` (demo data), `supabase/tests/` (RLS tests, `supabase test db`).

Demo content to replace with real data: `src/features/content/site.ts`, `src/features/content/policies.ts`, `supabase/seed.sql` (all marked `SEED`).
