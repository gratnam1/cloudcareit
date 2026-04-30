# SEO Phase 3B — Security Baseline Assessment Page Upgrade

Phase 3B focuses on a single conversion page: `/services/security-baseline-assessment`.
The goal is to turn it into a serious, practical security-assessment landing
page that supports the Vaughan cybersecurity / cyber insurance pages and the
broader managed-IT and Microsoft 365 pages — without rewriting other parts
of the site.

## Page improved

- `/services/security-baseline-assessment`

## Branch

`seo-security-baseline-assessment-phase-3b` — cut from `main` after the
prior Phase 3 work was merged. The Phase 3 documentation companion file
was committed onto its own branch first to keep this branch focused on
the baseline-assessment page only.

## Files changed

- `src/app/pages/services/security-baseline-assessment/security-baseline-assessment.component.ts`
  — new SEO title + description, FAQ data array, FAQ structured-data
  registration, schema cleanup on destroy. GSAP reveal kept as-is (it
  already respects `prefers-reduced-motion`).
- `src/app/pages/services/security-baseline-assessment/security-baseline-assessment.component.html`
  — full-page rewrite: tightened hero, baseline snapshot panel,
  assessment scope stack, "What we review" 12-card checklist, "When this
  makes sense" trigger grid, baseline control map (visual centerpiece),
  6-step vertical process timeline, expanded deliverables grid (8
  cards), insurance blockers panel, trust/disclaimer card, audience
  grid, related-services grid, FAQ accordion, final CTA.
- `src/app/pages/services/security-baseline-assessment/security-baseline-assessment.component.css`
  — added section-intro paragraph style, secondary CTA style,
  `.baseline-trigger-card` glow surface, `.control-map` grid + status
  pills (`--harden`, `--deploy`, `--validate`, `--close`, `--tighten`,
  `--document`), vertical 6-step process layout,
  `.baseline-trust-card` callout with `Not / Is` pills,
  `.baseline-related-card` glow card with hover arrow,
  `.baseline-faq-shell` accordion. Existing baseline tokens unchanged.
- `src/app/app.routes.ts` — updated the route's `title` field for
  `/services/security-baseline-assessment` from `Security Baseline
  Assessment` to `Security Baseline Assessment for SMBs` so the
  rendered `<title>` matches the new SEO positioning. No new routes
  added; no other routes touched.
- `docs/seo-phase-3b-security-baseline-assessment.md` — this document.

## Sections added (in final order)

1. Hero — H1 "Security Baseline Assessment for Small Businesses",
   tightened lead + sublead, primary CTA, secondary "Renewing cyber
   insurance?" link to `/cyber-insurance-readiness-vaughan`, badge row
   with five coverage areas.
2. Baseline snapshot panel (right side of hero) — five rows showing
   the controls being scored: Microsoft 365 identity, endpoint
   protection, backups, firewall / remote access, cyber-insurance
   readiness.
3. **Assessment scope stack** — five risk-stack layers (identity,
   endpoint, email, backup, access & remote work) with a short intro.
4. **What we review** — 12-card checklist (was 8), now including
   firewall & remote access, onboarding/offboarding hygiene, patching,
   incident response contacts.
5. **When this makes sense — practical triggers** *(NEW)* — eight
   trigger cards (cyber insurance renewal, after a phishing attempt,
   before hiring/replacing an MSP, after staff turnover, before
   moving offices, after adding remote/hybrid staff, untested backups,
   drifted Microsoft 365 permissions). Uses example/scenario language;
   no fake testimonials.
6. **Baseline control map** *(NEW — visual centerpiece)* — four-column
   grid (Area reviewed / Common risk / What CtrlShift checks / Typical
   next step) for six areas with colour-coded status pills
   (harden / deploy / validate / close / tighten / document).
   Collapses to labelled stacked cells under 992 px.
7. **Process** — expanded from four steps to six (intake & goals →
   access & scope review → Microsoft 365 / identity checks → endpoint,
   backup & firewall review → findings summary & action plan →
   optional managed IT handoff). Now uses a vertical numbered
   timeline with glowing nodes.
8. **What you receive** — expanded from five deliverables to eight,
   each with a one-line description.
9. **Common cyber-insurance blockers** — kept; existing copy lightly
   reworked to point at `/cyber-insurance-readiness-vaughan`.
10. **Trust / disclaimer callout** *(NEW)* — explicit "Not / Is" list
    stating the assessment is *not* legal advice, *not* compliance
    certification, *not* a guarantee of cyber insurance approval, and
    *not* a guarantee of breach prevention; *is* a practical IT/
    security review with prioritized next steps.
11. **Built for / Who this is for** — clinics, accounting firms, law
    firms, engineering & consulting (existing copy, lightly rephrased).
12. **Related services / Where to go next** *(NEW)* — eight glow-card
    links (4 services + 4 guides) with route-safe anchors.
13. **FAQ** *(NEW)* — 7 unique questions: penetration test
    distinction, cyber insurance scope, admin access required,
    duration, deliverables, remediation help, geographic scope. Backed
    by FAQ structured data.
14. Final CTA — practical baseline review with Microsoft 365,
    endpoints, backups, firewall, email, and cyber insurance framing.

## Visual / UI improvements

- Bracketed-style kicker chips (existing `.baseline-kicker`) used
  consistently as section labels.
- Reusable glow-card surface direction across new sections
  (`.baseline-trigger-card`, `.control-map`, `.baseline-trust-card`,
  `.baseline-related-card`, `.baseline-faq-shell`) — all use a soft
  cyan/indigo radial-gradient pseudo-element, dark translucent base,
  subtle border, and `box-shadow` lift. Implemented purely in CSS.
- Control map has a styled header strip on desktop (cyan all-caps),
  hover-tinted body rows, icon tile per area, and colour-coded "next
  step" pills. On mobile it collapses cleanly to stacked, labelled
  cells — no horizontal scroll, no truncation.
- Six-step process timeline replaces the previous four-column layout.
  Numbered nodes use a radial cyan/indigo glow ring and sit on a
  vertical column. The CSS gracefully overrides the existing
  `.baseline-process` four-column grid by being scoped to
  `.baseline-process-vertical` only.
- Trust card uses red `Not` and green `Is` pills to make the scope of
  the assessment scannable in two seconds.
- Related cards use the now-familiar arrow-nudge hover pattern
  (translateX 4px) that ties the page back to the service-location
  pages from Phase 3.
- FAQ uses a native `<details>` accordion with a custom plus/minus
  marker and a single rounded glow shell — no JavaScript needed.

## 21st.dev / Magic availability

- 21st.dev / Magic component-inspiration tooling: **available**
  (`mcp__magic__21st_magic_component_inspiration`).
- UI/UX Pro Max: **available** (`ui-ux-pro-max` skill).

Both gates passed before any file edits were made.

## How 21st.dev inspiration was used

- One inspiration query, "security assessment scorecard dashboard",
  was made via `mcp__magic__21st_magic_component_inspiration`. The top
  match was a "Financial Score Cards" pattern — liquid-glass cards
  with strength / status badges (none / weak / moderate / strong) and
  a score-style display.
- The takeaways used as direction (not code):
    - Status pills as the primary "next step" indicator on each
      control row.
    - A single grouped surface for the control map (not a collection
      of unrelated cards) — translated into the `.control-map` shell
      with a header row + body rows.
    - Calm, explanatory copy paired with each scored area.
- **No 21st.dev / React / Tailwind / shadcn / Radix / lucide-react
  code was copied or installed.** No new npm dependencies were added.
  No `/components/ui` directory was created. All visuals are native
  Angular HTML and component-scoped CSS.

## Internal links added

All routes verified against `src/app/app.routes.ts` before linking.

From the new "Where to go next" related grid:

- `/cybersecurity-services-vaughan`
- `/cyber-insurance-readiness-vaughan`
- `/security-firewall`
- `/microsoft-365`
- `/managed-it-services`
- `/guides/security/microsoft-365-security/microsoft-365-checklist`
- `/guides/security/endpoint-security/edr-vs-antivirus`
- `/guides/security/microsoft-365-security/microsoft-365-backup-small-business`

Plus existing in-page anchors:

- Hero "Renewing cyber insurance?" secondary CTA →
  `/cyber-insurance-readiness-vaughan`.
- Insurance-blockers panel paragraph →
  `/cyber-insurance-readiness-vaughan`.

No broken links: all paths exist as either eager service pages,
service-location pages, or registered guide routes.

## Metadata / schema changes

- Route `<title>` updated:
    - Was: `Security Baseline Assessment`
    - Now: `Security Baseline Assessment for SMBs`
- SeoService title (used for OG / Twitter):
    - Was: `Security Baseline Assessment for Professional Offices`
    - Now: `Security Baseline Assessment for SMBs | CtrlShift IT
      Services`
- Meta description:
    - Was: `Identify ransomware, Microsoft 365, endpoint, identity,
      and backup risks in under 48 hours with a structured security
      baseline assessment for Ontario professional offices.`
    - Now: `Find Microsoft 365, endpoint, backup, firewall, and cyber
      insurance readiness gaps with a practical security baseline
      assessment for small businesses.`
- Canonical: unchanged (`/services/security-baseline-assessment`).
- Open Graph: title / description updated automatically via
  `SeoService.update`; type stays `website`.
- Service schema: kept via `applyServicePageSeo` — name `Security
  Baseline Assessment`, areaServed Vaughan / Toronto / Mississauga /
  Thornhill / Richmond Hill.
- Breadcrumb schema: kept (Home → Security Baseline Assessment).
- **FAQ schema added** — `FAQPage` JSON-LD with seven `Question /
  Answer` entries matching the visible FAQ section. ID
  `service-security-baseline-assessment-faq`. Cleaned up in
  `ngOnDestroy`.

Verified in built output: prerendered `<title>` and `<meta
name="description">` match the new copy; OG and FAQ structured data
present.

## Build result

- `npm run build` — passed (2026-04-30).
- 80 static routes prerendered.
- `security-baseline-assessment-component` chunk: 59.97 kB raw
  (was ~50 kB before, growth from added content + glow surfaces).
- CSS purge succeeded: 77.0 KiB final, 67% reduction.
- No `lint` or `typecheck` script exists in `package.json` — the
  Angular build runs TypeScript checking inline and passed.

## Browser QA checklist

- ✅ Dev server check at `1440 × 900`: `scrollWidth` 1425, no
  horizontal overflow.
- ✅ Dev server check at `390 × 844`: `scrollWidth` 375, no horizontal
  overflow.
- ✅ Hero stacks cleanly under 992 px (snapshot panel drops below the
  copy).
- ✅ Trigger grid: 4-col → 2-col → 1-col across 1200 / 992 / 575 px
  breakpoints.
- ✅ Control map collapses from 4-col grid to stacked, labelled cells
  under 992 px; column header is hidden on mobile and per-cell labels
  appear instead. Verified via computed `gridTemplateColumns`.
- ✅ Process timeline keeps vertical layout from desktop down to
  mobile (numbered node shrinks to ~2.4 rem at 575 px).
- ✅ Trust card "Not / Is" pill column stacks beneath the description
  on small screens.
- ✅ Related cards: 4-col → 2-col → 1-col responsive.
- ✅ FAQ accordion is a native `<details>` element — keyboard
  accessible, no JS dependency, expands first item by default.
- ✅ `prefers-reduced-motion` disables card hover lift, related-arrow
  nudge, and GSAP reveal animations (existing code path).
- ✅ Page title and meta description match brief; FAQ schema present
  in DOM.

## Remaining risks

- The page title in the route file was updated (`Security Baseline
  Assessment for SMBs`). If anything elsewhere in the site links to
  this page using the old title literally as anchor text, it will look
  inconsistent — current internal links use descriptive anchors and
  are unaffected.
- The new route title abbreviates "Small and Medium-sized Businesses"
  to "SMBs". Spelled-out variants are still used in the H1 and copy,
  so the abbreviation does not appear in body content.
- No automated tests cover this page; verification was via build +
  manual screenshot diff at desktop and mobile widths.
- GSAP `ScrollTrigger` is still loaded by the page (existing
  behaviour). No new animations were added; the new sections
  (`triggers`, `control-map`, `trust`, `related`, `faq`) opt into the
  existing `.baseline-reveal` class so they fade in consistently.
