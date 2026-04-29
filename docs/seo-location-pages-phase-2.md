# SEO Location Pages — Phase 2

**Site:** https://ctrlshiftit.ca
**Branch:** `seo-location-pages-phase-2`
**Date:** 2026-04-29
**Scope:** Differentiate the high-risk templated managed-IT city pages (Mississauga, Thornhill, Richmond Hill) and sharpen the IT-support pages (Vaughan, Mississauga) so they read as reactive helpdesk pages, not duplicates of the managed-IT subscription pages.

This phase is **strictly scoped** to location-page differentiation. No service-page rewrites, no industry-page changes, no redesign, no new routes. The 3 unrouted IT-support cities (Toronto, Thornhill, Richmond Hill) are deliberately untouched — that decision belongs to a later phase.

---

## 1. Pages changed

| URL | Status |
|---|---|
| `/managed-it-services-mississauga` | Rewritten content + neighborhood, challenges, testimonial added |
| `/managed-it-services-thornhill` | Rewritten content + neighborhood, challenges, testimonial added |
| `/managed-it-services-richmond-hill` | Rewritten content + neighborhood, challenges, testimonial added |
| `/it-support-vaughan` | Repositioned as reactive helpdesk; local section + scenario added; FAQ rewritten |
| `/it-support-mississauga` | Repositioned as reactive helpdesk; local section + scenario added; FAQ rewritten |

Other location pages (`/managed-it-services-vaughan`, `/managed-it-services-toronto`) were intentionally left alone — they already had `localTestimonial`, `neighborhoodFocus`, and `citySpecificChallenges` per the Phase 1 audit.

### Files modified

- `src/app/pages/location/location.component.ts` — managed-IT city data for Mississauga, Thornhill, Richmond Hill
- `src/app/pages/it-support/it-support-location.component.ts` — IT-support data for Vaughan, Mississauga (added two new optional fields to the `ItSupportContent` type: `localSection`, `localScenario`, plus `hubLinkAnchor` for clearer cross-link anchor text)
- `src/app/pages/it-support/it-support-location.component.html` — new local-section + local-scenario block; reworded hub-link card with anchor-text link to managed-IT page
- `src/app/pages/it-support/it-support-location.component.css` — styles for the new local-section block

The orphan IT-support content keys (`toronto`, `thornhill`, `richmond hill`) were **not** edited and remain unrouted — no orphan routes were shipped.

---

## 2. Sections added — managed-IT city pages

For Mississauga, Thornhill, and Richmond Hill (which were missing all three optional fields per the Phase 1 audit), these data fields are now populated and render through the existing `LocationComponent` template — no template changes:

| Field | Mississauga | Thornhill | Richmond Hill |
|---|---|---|---|
| `neighborhoodFocus` | Square One, Hurontario & the Airport Corridor | Promenade, Yonge & Bathurst / Centre Street Practices | Yonge Corridor, Hillcrest & the Bayview / Leslie Cluster |
| `citySpecificChallenges` (2 cards) | Multi-floor Wi-Fi & VoIP drift / Microsoft 365 access after turnover | Microsoft 365 set up years ago / Onboarding & offboarding gaps | Endpoint protection gaps / Backups nobody has restored |
| `localTestimonial` | Operations Manager — multi-floor professional services office, Square One area (anonymized, qualitative outcome) | Practice Owner — small accounting practice, Yonge Street corridor (anonymized) | Practice Manager — growing professional practice, Yonge / Highway 7 area (anonymized) |
| `intro` / `mainHeading` / `metaDescription` | Rewritten to focus on multi-floor offices, airport-area sites, VoIP, M365 access | Rewritten to focus on small professional practices, plaza Wi-Fi, M365 security, onboarding/offboarding | Rewritten to focus on growing offices, endpoint protection, tested backups, M365 security |
| `painPoints`, `industries`, `services` | Reworked around Square One, Meadowvale, Hurontario, Dixie–Eglinton, airport, multi-floor, VoIP, M365 | Reworked around Promenade, Yonge, Bathurst/Centre, plaza offices, accounting/legal/clinics | Reworked around Yonge corridor, Hillcrest, Bayview/Leslie, Highway 7/404, endpoint, backup |
| `supportContext` / `supportContextPoints` | Rewritten with Mississauga-specific framing | Rewritten with Thornhill-specific framing | Rewritten with Richmond Hill-specific framing |

All testimonials are anonymized. No client names, no fabricated metrics, no fake percentage outcomes — outcomes are described qualitatively (e.g., "calls have been clean since", "stopped repeating", "the first quarterly review was the first time anyone had explained our setup in writing").

### Sections added — IT-support pages

The `ItSupportContent` type now supports two new optional fields rendered by the template:

- `localSection` — heading + body explaining where in the city this page actually serves traffic
- `localScenario` — anonymized situation / response / outcome triple, written as a vendor-honest scenario rather than a customer testimonial

Both Vaughan and Mississauga IT-support pages now include both blocks. No fake company names. The scenarios describe specific technical work (conditional access policy fix, AP roaming, voice/warehouse traffic separation with QoS) and qualitative outcomes only.

A new `hubLinkAnchor` field provides clearer anchor text for the cross-link to the managed-IT page (e.g., "managed IT services in Vaughan" instead of just the page label).

---

## 3. FAQs rewritten

### Managed-IT pricing FAQ (was verbatim across all 5 cities)

The Phase 1 audit flagged the pricing FAQ answer as identical across Vaughan, Mississauga, Thornhill, Richmond Hill (and Toronto with a small Huntress-branded variant). Each city now has its own answer that ties pricing to the realities of that city's offices:

- **Mississauga** — names the typical fit (multi-floor in Square One, warehouse-plus-office near the airport) and explains which tier those offices land in.
- **Thornhill** — frames pricing for small professional practices and notes why we keep the bill simple ("most clients do not have time to manage a complicated IT bill").
- **Richmond Hill** — frames pricing for growing offices and bundles managed EDR into the plan instead of as a separate antivirus line item.
- **Vaughan** — already differentiated in Phase 1 (mentions month-to-month + per-device pricing).
- **Toronto** — already differentiated (mentions Huntress EDR inline).

No verbatim pricing string is now shared between Mississauga, Thornhill, and Richmond Hill.

### Other managed-IT FAQs

Each city's FAQ list was rewritten for that city's actual buyer:

- Mississauga adds: multi-floor Wi-Fi fix, airport-area Teams call drops, growing-team M365 access tightening, mixed M365/Workspace handling.
- Thornhill adds: M365 baselining for inherited tenants, plaza Wi-Fi separation, ex-staff/locum offboarding, fit for small practices, taking over un-documented networks.
- Richmond Hill adds: managed EDR per device, real backup restore tests, M365 security, network re-design for offices that grew past their setup.

### IT-support FAQs (Vaughan, Mississauga)

The Phase 1 audit flagged verbatim FAQ openers like "What is the difference between IT support and managed IT services in {City}?" The new versions:

- Lead with **how this page differs from the managed-IT page**, not just the abstract "support vs managed" question — making the cross-link explicit.
- Drop the duplicated "managed service provider in {City}" question (those are now answered on the managed-IT page).
- Add reactive-intent specific questions: recurring Microsoft 365 issues, single-floor Wi-Fi troubleshooting, overflow support for offices with an in-house IT person, and "when does it make sense to switch to managed IT services" (which routes the user to the hub page).

---

## 4. Internal links added

- **IT-support → managed-IT** (Vaughan): `/it-support-vaughan` body and FAQs now link to `/managed-it-services-vaughan` with anchor text "managed IT services in Vaughan" (in the intro/whatIsSection paragraph, in two FAQ answers, and in the redesigned hub-link card).
- **IT-support → managed-IT** (Mississauga): same pattern with anchor text "managed IT services in Mississauga".
- **Hub-link card**: rewritten so the anchor text is meaningful ("managed IT services in {city}") rather than just the page label, and so the surrounding copy positions the hub page as "issues prevented, not just fixed."

The reverse direction (managed-IT → IT-support) already existed in the Phase 1 audit via `cityServiceLinks` for Vaughan and Mississauga in `LocationComponent.ngOnInit`. No changes needed there.

---

## 5. Remaining duplication risks

These were intentionally **not** addressed in this phase because they are out of scope per the task description:

| Risk | Why deferred | Future phase |
|---|---|---|
| Identical `sameAs` arrays across all 5 city `LocalBusiness` schemas | We have no real city-specific citations (no per-city Google Maps profile, no per-city directory listings). The audit explicitly says: do not invent links. | Phase 5 — needs real per-city citations to be added externally first; document only for now |
| `LocalBusiness` schema is otherwise structurally identical across cities (same opening hours, same telephone, same priceRange) | This is correct — there is one business with one phone number. Per-city differentiation here would be fabrication. | Acceptable as-is |
| `cityServiceLinks` populated for Vaughan and Mississauga only | Other cities don't have the spoke pages (cybersecurity-{city}, cloud-{city}) yet. Adding placeholders would 302 to home. | Out of phase — needs real spoke pages first |
| Toronto IT-support orphan content (and Thornhill / Richmond Hill orphan IT-support content) | User explicitly excluded shipping these routes in this phase. | Future decision phase: ship or delete the orphan keys |
| Markham / Scarborough coverage gap (audit §3.4) | Out of scope per task. | Future decision phase |
| Pricing duplication between the managed-IT city pages and `/managed-it-services` core service | The core page does not currently quote the same dollar values, so no immediate verbatim duplicate. The audit's preferred long-term fix (move pricing to a single `/pricing` page and link out from each city) is still the cleanest answer. | Phase 2 #7 in the audit roadmap — out of scope here |
| Hero CTA copy ("Start 30-Day Trial" / "View Managed IT Plans") is shared across all 5 city hero buttons | This phase rewrote in-page CTA-adjacent copy where it lived in data (intro, supportContext). The hero buttons themselves are in the shared template, and city-specific button copy would require a template change. Lower-impact than the FAQ + body rewrites done here. | Future minor improvement — defer |
| `/it-support-vaughan` and `/it-support-mississauga` still share the same template skeleton | The template itself is fine; this phase added enough data-level differentiation (local section + scenario + tightened FAQs + repositioned intro) to clearly distinguish them from the managed-IT pages. Shipping a new template purely for two pages would be premature. | Acceptable as-is |

---

## 6. Schema issues not fixed

Two issues remain in the `LocalBusiness` JSON-LD per the Phase 1 audit. Neither is being patched in this phase because doing so honestly requires real-world inputs that don't exist yet:

1. **Identical `sameAs` arrays** across all 5 city pages.
   The current `sameAs` array is `[LinkedIn, X, Google Maps profile, Clutch, GoodFirms]` — all of which are corporate-level profiles, not city-specific. Differentiating them per city would require:
   - A real city-specific Google Maps Business Profile per city (currently one), or
   - Real per-city listings on regional directories (currently none confirmed).
   Per the task description's instruction ("Do not add fake city-specific sameAs links … document the issue instead of inventing links"), we leave the arrays identical and flag this here.

2. **`address.addressLocality`** is set to the city name on each page, but `address.streetAddress` is not present — i.e. a single business address is *not* being asserted per city. This is correct behaviour given there is one CtrlShift IT Services office and we do not want to imply per-city physical premises. No change needed.

---

## 7. Build result

`npm run build` was run after the changes. The build pipeline is `ng build && node tools/purge-css.mjs`.

Result: **success.** Application bundle generation completed in ~10s, 80 static routes were prerendered (this includes all 5 managed-IT city routes and both routed IT-support city routes), and the post-build CSS purge ran cleanly (233.7 KiB → 76.8 KiB, 67% saved). No Angular template type-check errors. No new TypeScript errors. The `location-component` lazy chunk grew slightly to reflect the added city data; nothing else changed materially in the bundle map. The only console message during the build was a pre-existing Node `[DEP0169] url.parse()` deprecation warning that is upstream of this change set and unrelated to the rewrite.

`package.json` does not currently expose `lint` or `typecheck` scripts. `ng lint` is not configured in `angular.json` either. So no separate lint/typecheck step was run beyond what `ng build` itself enforces (TypeScript compilation + Angular template type-checking, which both run during the build).

---

## 8. Acceptance criteria — self-check

| Criterion | Result |
|---|---|
| Mississauga, Thornhill, Richmond Hill no longer feel like thin copies of Vaughan/Toronto | Met — all three now have `localTestimonial`, `neighborhoodFocus`, `citySpecificChallenges`, plus rewritten intro / pain points / industries / services / FAQ / supportContext |
| Pricing FAQ no longer verbatim across all city pages | Met — each city's pricing answer is now distinct |
| IT-support pages clearly differentiated from managed-IT pages | Met — repositioned as reactive helpdesk, hub-link card now reads "Want IT issues prevented, not just fixed?" with explicit anchor-text link to managed-IT page |
| No fake testimonials | Met — testimonials are anonymized to role + office type, with qualitative outcomes only |
| No unsupported claims | Met — no fabricated metrics, no invented client names, no specific percentage improvements |
| No broad redesign | Met — only the data layer for the city entries was rewritten; one new optional `<section>` was added to the IT-support template (gated by `*ngIf` so unused city entries are unaffected) |
| No unrelated refactors | Met — `service-landing`, industry pages, the Vaughan/Toronto managed-IT entries, and the orphan IT-support content keys are all untouched |
| Existing dark theme and component structure preserved | Met — only minor additive CSS for the new IT-support local-section block; existing tokens and classes reused where possible |
