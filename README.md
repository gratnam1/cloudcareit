# CtrlShift Angular Blog Add-on (Drop-in)

This adds:
- `/blog` list page
- `/blog/:slug` post page
- Markdown-based posts stored in `src/assets/blog/`

## 1) Copy files into your Angular repo
Copy the folders from this zip into your repo:
- `src/app/blog/*`
- `src/assets/blog/*`
- `tools/generate-sitemap.js` (optional)

## 2) Install dependency (markdown parser)
From your repo root:
```bash
npm i marked
```

## 3) Ensure HttpClient is enabled
In Angular 15+ standalone apps, make sure you have:
```ts
provideHttpClient()
```
in your `app.config.ts` / providers setup.

## 4) Add routes
Open your `src/app/app.routes.ts` (or wherever your routes are) and add:

```ts
import { BLOG_ROUTES } from './app/blog/blog.routes'; // adjust path if needed

export const routes: Routes = [
  ...BLOG_ROUTES,
  // your existing routes...
];
```

## 5) Add a nav link
Add "Blog" to your header navigation, linking to `/blog`.

## 6) (Recommended) Prerender / SSR for best SEO
Your repo already includes `tsconfig.server.json` which strongly suggests SSR/prerender is available.
If your deploy supports it, enable prerender so each blog URL returns HTML to crawlers.

## 7) Update sitemap.xml
Add:
- `/blog`
- each `/blog/<slug>` URL

You can print blog URLs via:
```bash
node tools/generate-sitemap.js
```

## 8) Write new posts
1. Add a markdown file: `src/assets/blog/<slug>.md`
2. Add a record in `src/assets/blog/index.json` with the same slug.

Done.
