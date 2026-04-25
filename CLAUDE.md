# Claude Code Instructions for cloudcareit

## Pull Requests
- **Always create a PR automatically after pushing changes** — do not wait for the user to ask
- Target branch: `main`
- Use the GitHub MCP tools (`mcp__github__create_pull_request`) to create the PR
- Include a clear summary of what changed and a test plan in the PR body

## Repository
- Owner: `kannan`
- Repo: `cloudcareit`
- Default development branch: create feature branches off `main`

## Deployment
- Hosted on **Cloudflare Workers + Static Assets** (NOT Pages — deploy command is `npx wrangler deploy`, config in `wrangler.jsonc`)
- Cloudflare runs `npm ci` — keep `package.json` and `package-lock.json` in sync
- Angular builds to `dist/cloudcare-frontend/browser` (prerendered static, `outputMode: "static"`) — served by the ASSETS binding
- Server-side endpoints live in `worker/index.js`, the Worker entrypoint (`main` in `wrangler.jsonc`). `run_worker_first: ["/api/*"]` forces `/api/*` through the Worker; everything else hits static assets directly
- The `functions/` directory (Pages Functions convention) and `_routes.json` are **not used** — Workers ignores them
- The Express `src/server.ts` is legacy Angular SSR boilerplate — unused in production
- Secrets (`CF_ACCOUNT_ID`, `CF_AI_API_TOKEN`, `RESEND_API_KEY`) are set in the Cloudflare dashboard under the Worker's Variables and Secrets

## Contact Info
- Phone: `+1-416-624-4841` / `(416) 624-4841`
- Email: `info@ctrlshiftit.ca`
