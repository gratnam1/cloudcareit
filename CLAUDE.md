# Claude Code Instructions for cloudcareit

## Pull Requests
- **Always create a PR automatically after pushing changes** — do not wait for the user to ask
- Target branch: `main`
- Use the GitHub MCP tools (`mcp__github__create_pull_request`) to create the PR
- Include a clear summary of what changed and a test plan in the PR body

## Repository
- Owner: `gratnam1`
- Repo: `cloudcareit`
- Default development branch: create feature branches off `main`

## Deployment
- Hosted on **Cloudflare Pages**
- Cloudflare runs `npm ci` — keep `package.json` and `package-lock.json` in sync
- The Express `server.ts` does NOT run on Cloudflare Pages; use `functions/api/*.ts` for any server-side API endpoints
- Environment variables are set in the Cloudflare Pages dashboard (runtime, not build-time)

## Contact Info
- Phone: `+1-416-624-4841` / `(416) 624-4841`
- Email: `info@ctrlshiftit.ca`
