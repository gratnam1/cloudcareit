# SEO Phase 3D — Lead Generation Internal Links

## Branch
`seo-visibility-internal-links`

## Files changed
- `src/app/shared/footer/footer.component.html` — added `/lead-generation` to footer Services list
- `src/app/pages/home/components/services-grid.component.html` — extended homepage teaser to include lead generation alongside SEO visibility

## Pages now linking to /lead-generation

| Page | Location | Anchor text |
|------|----------|-------------|
| Every page (footer) | Footer → Services column | "Lead Generation" |
| `/` (home) | Services grid section, bottom teaser paragraph | "lead generation" |
| `/lead-generation` itself | Related services grid | "Lead Generation" (self — already present) |
| `/seo-visibility` | Blockers panel (line 454) + related grid (line 539) | Already linked — no change needed |

## Anchor text used

- Footer: `Lead Generation` (matches surrounding footer link style — title case, no description)
- Homepage teaser: `lead generation` (lowercase, inline prose — matches `seo visibility` adjacent link)

## Links skipped and why

| Page / Route | Reason skipped |
|---|---|
| `/web-development` | No natural context for lead generation on a web development service page — would be a forced sidebar mention, not a contextual link |
| `/blog/lead-generation-strategies` | Route does not exist in `app.routes.ts` — cannot link to a 404 |
| `/blog/seo-visibility-guide` | Already links to `/lead-generation` in the existing related resources section — no change needed |

## Edit details

### `src/app/shared/footer/footer.component.html`
Added one line after the existing `/seo-visibility` entry in the Services column:
```html
<a class="site-footer-link" routerLink="/lead-generation">Lead Generation</a>
```

### `src/app/pages/home/components/services-grid.component.html`
Extended the existing SEO-only teaser paragraph at the bottom of the services grid:
```html
<!-- Before -->
Beyond IT, we also help service-based small businesses with
<a class="text-decoration-underline" routerLink="/seo-visibility">SEO visibility services</a>
— local SEO, Google Business Profile, technical SEO, and content depth.

<!-- After -->
Beyond IT, we also help service-based small businesses with
<a class="text-decoration-underline" routerLink="/seo-visibility">SEO visibility</a>
and <a class="text-decoration-underline" routerLink="/lead-generation">lead generation</a>
— local SEO, landing pages, CTAs, tracking, and follow-up workflows.
```

## Build result
**PASS** — `npm run build` completed in ~10.5 seconds, 81 routes prerendered. No errors or warnings.

## Safe to review in browser?
Yes. Both edits are additive-only (one new link in the footer, one extended prose sentence on the homepage). No layout changes, no new components, no route changes. The footer and homepage services grid are rendered on every page load — check:
- Footer Services column: confirm "Lead Generation" link appears between "SEO Visibility" and "IT Guides & Knowledge Base"
- Home `/` → scroll to services section bottom paragraph: confirm "SEO visibility" and "lead generation" both appear as links
