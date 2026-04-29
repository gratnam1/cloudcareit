# SEO Phase 3: Cyber Insurance Internal Links

## Files Changed

- `src/app/pages/home/components/cybersecurity-section.component.html`
- `src/app/pages/services/service-landing/service-pages.data.ts`
- `src/app/pages/service-location/service-location.component.ts`
- `src/app/pages/service-location/service-location.component.html`
- `src/app/pages/services/security-baseline-assessment/security-baseline-assessment.component.html`
- `src/app/pages/free-security-assessment/free-security-assessment.component.html`
- `src/app/shared/footer/footer.component.html`
- `src/assets/blog/cyber-insurance-requirements-canada.md`
- `src/app/pages/guides/security/security-guide-data.ts`
- `docs/seo-phase-3-cyber-insurance-internal-links.md`

## Pages Linked From

- `/`
- `/managed-it-services`
- `/security-firewall`
- `/microsoft-365`
- `/cybersecurity-services-vaughan`
- `/services/security-baseline-assessment`
- `/free-security-assessment`
- `/blog/cyber-insurance-requirements-canada`
- `/guides/security/endpoint-security/edr-vs-antivirus`
- Site footer Services list

## Anchor Text Used

- `cyber insurance readiness support`
- `cyber insurance readiness assessment`
- `cyber insurance IT control review`
- `Cyber insurance readiness support`
- `cyber insurance readiness for Vaughan businesses`
- `prepare for cyber insurance questionnaires`
- `Cyber Insurance Readiness`

## Links Intentionally Skipped

- `/guides/security/microsoft-365-security/microsoft-365-checklist` already had visible links to `/cyber-insurance-readiness-vaughan` in the page body and related resources.
- `/guides/security/microsoft-365-security/mfa-rollout-small-business` already had a related-resource link to `/cyber-insurance-readiness-vaughan`.
- `/guides/security/microsoft-365-security/microsoft-365-backup-small-business` already had a related-resource link to `/cyber-insurance-readiness-vaughan`.
- Main navigation was not changed because the existing nav structure did not clearly support another top-level service item; footer service-list inclusion was a better fit.
- Location pages were not changed, per the controlled-scope instruction to avoid modifying location pages.

## Build Result

- `npm run build` passed on 2026-04-29.
- Build output prerendered 80 static routes and completed CSS purge successfully.
- Served-output link check returned 200 for the linked source pages and confirmed `/cyber-insurance-readiness-vaughan` hrefs on each checked page.
