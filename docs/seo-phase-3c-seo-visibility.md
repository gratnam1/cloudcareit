# SEO Phase 3C — SEO Visibility Page Upgrade

Phase 3C focuses on a single small business marketing service page:
`/seo-visibility`. The goal is to turn it from a thin custom service page
(82 body lines, hero + sidebar pattern, no FAQ, no schema beyond Service)
into a serious, practical SEO visibility service page for small
businesses in Vaughan and the GTA — without rewriting other parts of
the site.

## Page improved

- `/seo-visibility`

## Branch

`seo-visibility-phase-3c` — cut from `main` after Phase 3B
(`seo-security-baseline-assessment-phase-3b`) was merged. No other
service pages were touched on this branch.

## Files changed

- `src/app/pages/services/seo-visibility/seo-visibility.component.ts`
  — new SEO title + description, FAQ data array, FAQ structured-data
  registration, schema cleanup on destroy, GSAP `ScrollTrigger` reveal
  with `prefers-reduced-motion` respected.
- `src/app/pages/services/seo-visibility/seo-visibility.component.html`
  — full-page rewrite: tightened hero, visibility snapshot panel,
  visibility scope stack, "What we improve" 12-card checklist, "When
  this makes sense" trigger grid, **SEO visibility map** (visual
  centerpiece), 7-step vertical process timeline, expanded
  deliverables grid (9 cards), visibility-blockers panel, trust /
  disclaimer card, audience grid, related-pages grid (8), FAQ
  accordion, final CTA.
- `src/app/pages/services/seo-visibility/seo-visibility.component.css`
  — full dark theme with green (`#10b981`) / cyan (`#06b6d4`)
  accents to differentiate visually from the indigo/cyan baseline
  page. Adds section-intro paragraph style, secondary CTA style,
  glow trigger / related cards, the visibility map shell (4-col grid +
  status pills `--cleanup`, `--strengthen`, `--deepen`, `--connect`,
  `--improve`, `--add`), vertical 7-step process layout, trust card
  with `Not / Is` pills, FAQ accordion. Component-scoped — no global
  selector pollution.
- `src/app/app.routes.ts` — updated the route's `title` field for
  `/seo-visibility` from `SEO Services Vaughan` to
  `SEO Visibility Services Vaughan` (33 characters, well under the
  60-character budget). No new routes added; no other routes
  touched.
- `docs/seo-phase-3c-seo-visibility.md` — this document.

## Sections added (in final order)

1. **Hero** — H1 "SEO Visibility Services for Small Businesses",
   tightened lead + sublead, primary CTA ("Request a Visibility
   Review"), secondary "Want the playbook first?" link to
   `/blog/seo-visibility-guide`, badge row with five coverage areas
   (Technical SEO, Local SEO, Google Business Profile, Content
   depth, Internal linking).
2. **Visibility snapshot panel** (right side of hero) — six rows
   showing the areas being scored: technical SEO, local SEO, Google
   Business Profile, content gaps, internal links, indexing health.
3. **Visibility scope stack** *(NEW)* — five colour-coded layers
   (technical / local / GBP / content / links) with a short intro.
4. **What we improve** *(NEW — 12 cards)* — concrete checks across
   technical SEO basics, GBP setup, local landing pages, content
   structure, internal linking, title/meta cleanup, schema basics,
   indexing & sitemap hygiene, page speed / Core Web Vitals,
   review/reputation signals, breadcrumbs & navigation, image &
   alt-text discipline.
5. **When this makes sense — practical signals** *(NEW — 8 trigger
   cards)* — site exists but no leads, pages index inconsistently,
   location pages feel too similar, GBP under-used, service pages
   thin, competitors outrank locally, Search Console coverage issues,
   publishing content but nothing ranks. Uses example/scenario
   language; no fake testimonials.
6. **SEO visibility map** *(NEW — visual centerpiece)* — four-column
   grid (Area reviewed / Common issue / What CtrlShift checks /
   Typical next step) for six areas (Technical SEO, Local SEO,
   Content depth, Internal linking, Google Business Profile, Schema)
   with colour-coded status pills (`cleanup` / `strengthen` /
   `deepen` / `connect` / `improve` / `add`). Collapses to labelled
   stacked cells under 992 px.
7. **Process** *(NEW — 7 steps)* — visibility audit → Search
   Console / sitemap / indexing review → page-quality / content-depth
   review → local SEO / GBP review → internal-link & schema plan →
   prioritized fixes → reporting & next steps. Vertical numbered
   timeline with glowing nodes.
8. **What you receive** *(NEW — 9 deliverables)* — visibility audit
   summary, priority issue list, title/meta recommendations, local
   SEO recommendations, GBP improvements, content-gap plan,
   internal-linking recommendations, technical SEO notes, next-step
   roadmap.
9. **Common search-visibility blockers** *(NEW)* — analogue of the
   Phase 3B insurance panel. Lists pages discovered but not indexed,
   near-duplicate location pages, sparse GBP, generic title/meta
   tags, orphaned blog and service pages — paired with copy that
   links naturally to `/web-development` and `/lead-generation`.
10. **Trust / disclaimer callout** *(NEW)* — explicit "Not / Is"
    list stating the engagement is *not* a guaranteed first-page
    ranking, *not* fake reviews, *not* black-hat backlinks, *not* an
    instant SEO win; *is* a practical, plain-English review with
    prioritized improvements and honest measurement.
11. **Built for / Who this is for** *(NEW)* — 4 audience cards:
    medical & dental clinics, accounting & legal firms, trades &
    home services, B2B & consulting.
12. **Related work / Where to go next** *(NEW — 8 cards)* — service
    and guide pages that pair with a visibility engagement.
13. **FAQ** *(NEW)* — 8 unique questions: ranking guarantees, GBP,
    indexed-but-low-performing pages, SEO content writing, time to
    results, backlinks, geographic scope, Angular technical SEO.
    Backed by FAQ structured data.
14. **Final CTA** *(NEW)* — practical visibility review framing.

## Visual / UI improvements

- **Dark page surface** matching the rest of the site, but with a
  green (`#10b981`) / cyan (`#06b6d4`) accent palette to visually
  distinguish the SEO page from the indigo/rose Security Baseline
  Assessment page. Both palettes share the same surface and
  spacing rhythm so the pages still feel like one site.
- **Bracketed-style kicker chips** (`.seo-kicker`) used consistently
  as section labels, in green to match the SEO accent.
- **Reusable glow-card surface direction** across new sections
  (`.seo-trigger-card`, `.visibility-map`, `.seo-trust-card`,
  `.seo-related-card`, `.seo-faq-shell`) — all use a soft green/cyan
  radial-gradient pseudo-element, dark translucent base, subtle
  border, and `box-shadow` lift. Implemented purely in CSS.
- **Visibility map** has a styled header strip on desktop (green
  all-caps), hover-tinted body rows, icon tile per area, and
  colour-coded "next step" pills. On mobile it collapses cleanly
  to stacked, labelled cells — no horizontal scroll, no
  truncation.
- **Seven-step process timeline** uses a vertical numbered column
  with green/cyan radial-glow ring around each node, sitting on a
  glow-card row.
- **Trust card** uses red `Not` and green `Is` pills to make the
  engagement scope scannable in two seconds.
- **Related cards** use the now-familiar arrow-nudge hover pattern
  (translateX 4px) that ties the page back to the Phase 3B and
  service-location pages.
- **FAQ** uses a native `<details>` accordion with a custom
  plus/minus marker and a single rounded glow shell — no JavaScript
  needed.

## 21st.dev / Magic availability

- 21st.dev / Magic component-inspiration tooling: **available**
  (`mcp__magic__21st_magic_component_inspiration`).
- UI/UX Pro Max: **available** (`ui-ux-pro-max` skill).

Both gates passed before any file edits were made.

## How 21st.dev inspiration was used

- One inspiration query, `SEO visibility dashboard scorecard`, was
  made via `mcp__magic__21st_magic_component_inspiration`. The
  matches were a "Stats cards with links" pattern, "Statistics
  Card 2", and "Statistics Card 15" — all liquid-glass / scorecard
  style cards with small label + status badge + link out to deeper
  pages.
- The takeaways used as direction (not code):
    - Status / step pills as the primary "next step" indicator on
      each row of the visibility map (translated from the
      scorecard "metric badge" pattern).
    - A single grouped surface for the visibility map (not a
      collection of unrelated cards) — translated into the
      `.visibility-map` shell with a header row + body rows.
    - Cards-with-links as the layout shape for the trigger and
      related-services grids — explanatory copy paired with a
      clear forward arrow.
- **No 21st.dev / React / Tailwind / shadcn / Radix / lucide-react
  code was copied or installed.** No new npm dependencies were
  added. No `/components/ui` directory was created. All visuals are
  native Angular HTML and component-scoped CSS.

## Internal links added

All routes verified against `src/app/app.routes.ts` before linking.

From the new "Where to go next" related grid:

- `/web-development`
- `/lead-generation`
- `/managed-it-services`
- `/` (homepage)
- `/blog/seo-visibility-guide`
- `/blog/web-development-gta`
- `/guides`
- `/blog`

Plus existing in-page anchors:

- Hero "Want the playbook first?" secondary CTA →
  `/blog/seo-visibility-guide`.
- Visibility-blockers panel paragraph → `/web-development` and
  `/lead-generation`.

`/free-security-assessment` was intentionally **not** linked — the
brief said "only if relevant", and free-security-assessment is for
cybersecurity intent, not SEO intent. Adding it here would dilute
both pages.

No broken links: all paths exist as either eager service pages,
blog post components, or registered hub routes.

## Metadata / schema changes

- Route `<title>` updated:
    - Was: `SEO Services Vaughan`
    - Now: `SEO Visibility Services Vaughan`
- SeoService title (used for OG / Twitter):
    - Was: `SEO Services Vaughan Small Business | CtrlShift IT
      Services`
    - Now: `SEO Visibility Services Vaughan | CtrlShift IT
      Services`
- Meta description:
    - Was: `Local SEO support for Vaughan and GTA service
      businesses, covering page structure, technical fixes, content
      depth, and tracking.` (151 chars)
    - Now: `Improve local SEO, Google Business Profile, technical
      SEO, indexing, content depth, and internal links for small
      business websites in the GTA.` (148 chars)
- Canonical: unchanged (`/seo-visibility`).
- Open Graph: title / description updated automatically via
  `SeoService.update`; type stays `website`.
- Service schema: kept via `applyServicePageSeo` — name updated
  from `Local SEO and Visibility Services` to `SEO Visibility
  Services`, areaServed Vaughan / Toronto / Mississauga / Thornhill
  / Richmond Hill.
- Breadcrumb schema: kept (Home → SEO Visibility Services).
- **FAQ schema added** — `FAQPage` JSON-LD with eight `Question /
  Answer` entries matching the visible FAQ section. ID
  `service-seo-visibility-faq`. Cleaned up in `ngOnDestroy`.

Verified in built output: prerendered `<title>` and
`<meta name="description">` match the new copy; `data-seo-id`
script tags for `service-seo-visibility`,
`service-seo-visibility-breadcrumb`, and
`service-seo-visibility-faq` are present.

## Build result

- `npm run build` — passed (2026-04-30).
- 80 static routes prerendered.
- `seo-visibility-component` chunk: 60.22 kB raw (was ~10 kB
  before — growth from added content + glow surfaces). On par with
  the Phase 3B `security-baseline-assessment-component` chunk
  (60.20 kB).
- CSS purge succeeded: 77.5 KiB final, 67% reduction.
- No `lint` / `typecheck` script exists in `package.json` (only
  `test` for `ng test`) — the Angular build runs TypeScript
  checking inline and passed.

## Browser QA checklist

- ✅ Dev server check at `1440 × 900`: `scrollWidth` 1425, no
  horizontal overflow. 13 page sections render correctly.
- ✅ Dev server check at `390 × 844`: `scrollWidth` 375, no
  horizontal overflow.
- ✅ Hero stacks cleanly under 992 px (snapshot panel drops below
  the copy column).
- ✅ Trigger grid: 4-col (1440) → 2-col (≤1199) → 1-col (≤575) at
  the breakpoints.
- ✅ Visibility map collapses from 4-col grid (verified at
  1440 px: `282.7px 307.3px 393.4px 245.8px`) to single-column
  stacked, labelled cells under 992 px (verified at 390 px:
  `309px`, header hidden, `.map-cell-label` visible).
- ✅ Process timeline keeps vertical layout from desktop down to
  mobile (numbered node shrinks to ~2.4 rem at 575 px).
- ✅ Trust card "Not / Is" pill column stacks beneath the
  description on small screens.
- ✅ Related cards: 4-col → 2-col → 1-col responsive.
- ✅ Deliverables grid: 3-col (1440) → 2-col (≤1199) → 1-col
  (≤767).
- ✅ FAQ accordion is a native `<details>` element — keyboard
  accessible, no JS dependency, expands first item by default
  via `[attr.open]="i === 0 ? '' : null"`.
- ✅ `prefers-reduced-motion` disables card hover lift,
  related-arrow nudge, and GSAP reveal animations (existing code
  path).
- ✅ Page title and meta description match brief; FAQ schema
  present in the prerendered DOM.

## Remaining risks

- Cannibalization with `/blog/seo-visibility-guide` (called out in
  the audit doc) is unresolved. Phase 3C deliberately did not
  delete or redirect the blog post — both pages now have distinct
  intent (service page = commercial; blog post = top-of-funnel
  guide), and the service page links to the blog post in two
  places ("Want the playbook first?" hero CTA + related grid).
  Search Console should be monitored over the next 90 days to
  confirm Google treats them as different intents. If they
  converge, options are (a) retitle the blog post to a
  comparison/case-study angle, or (b) consolidate.
- The page commits to "no ranking guarantees" / "no fake reviews" /
  "no black-hat backlinks" copy in the trust card and FAQ. This is
  honest positioning but may surface differently in some
  generative-AI summaries — kept as-written because honest scoping
  matters more than soundbites.
- No automated tests cover this page; verification was via build +
  Playwright computed-style checks at 1440 and 390 widths.
- GSAP `ScrollTrigger` is loaded by the page (existing pattern from
  Phase 3B). All new sections opt into the existing `.seo-reveal`
  class so they fade in consistently. The `seo-visibility-component`
  chunk (60.22 kB) loads lazy-only when the route is visited.
- No new npm dependencies were introduced. Bootstrap Icons (already
  in the project) are used for all icons. No external UI libraries.

## Acceptance criteria check

- ✅ Only `/seo-visibility` is materially improved.
- ✅ Page is deeper, more useful, and visually stronger.
- ✅ It does not promise guaranteed rankings or instant leads.
- ✅ It has practical sections, visibility map, process,
  deliverables, FAQ, internal links, and trust box.
- ✅ It uses a premium dark/glow-card visual direction,
  implemented natively in Angular/CSS.
- ✅ It uses existing CtrlShift styling tokens and patterns.
- ✅ No fake testimonials.
- ✅ No external dependencies.
- ✅ No React/Tailwind/shadcn code copied.
- ✅ `npm run build` passes.
