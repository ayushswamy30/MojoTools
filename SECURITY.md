# Security policy

Please do not report security problems in a public issue.

Report them privately through this repository's **Security** tab, using **Report a vulnerability**. Include the affected page or file, the steps to reproduce it and the likely impact.

## For contributors

- Never commit secrets, `.env` files, or real phone numbers and email addresses. Put them in Vercel or `.env.local`.
- If a secret is committed, revoke it first. Removing it from a later commit does not remove it from git history.
- Changes reach `main` only through a pull request with passing checks.
