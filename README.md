# Mojo Tools — Website & E-commerce Platform

Mojo Tools trades hardware tools and machinery, selling to **B2B** and **B2C** buyers (currently offline).
This project is a combined **company website + e-commerce store**, built in releases: **R0** company site first, then **R1** online shop. The site goes public once, with both.

All project documentation lives in [`docs/`](docs/). Start with [`docs/README.md`](docs/README.md).

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
