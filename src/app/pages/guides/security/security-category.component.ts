import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides/security';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

interface SecurityHowTo {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly icon: string;
  readonly available: boolean;
}

const HOWTOS: ReadonlyArray<SecurityHowTo> = [
  {
    slug: 'microsoft-365-checklist',
    title: 'Microsoft 365 Security Checklist',
    summary:
      'The complete 11-point Microsoft 365 hardening checklist for Canadian small businesses — MFA, conditional access, legacy auth, phishing, endpoints, backup, and incident response.',
    icon: 'bi-microsoft',
    available: true
  },
  {
    slug: 'phishing-protection',
    title: 'Phishing & Email Threat Defense',
    summary:
      'How to configure Microsoft Defender anti-phishing, safe links, and impersonation protection — plus a small-team awareness training cadence that actually sticks.',
    icon: 'bi-envelope-exclamation',
    available: false
  },
  {
    slug: 'mfa-rollout',
    title: 'Multi-Factor Authentication Rollout',
    summary:
      'A staged MFA rollout plan for a small business on Microsoft 365 — methods, exceptions, break-glass accounts, and how to avoid the support tickets that derail the project.',
    icon: 'bi-shield-check',
    available: false
  },
  {
    slug: 'ransomware-recovery',
    title: 'Ransomware Recovery Playbook',
    summary:
      'Step-by-step containment, eradication, and recovery for a small business hit by ransomware — including the decisions that determine whether you pay, restore, or rebuild.',
    icon: 'bi-bug',
    available: false
  },
  {
    slug: 'cyber-insurance-readiness',
    title: 'Cyber Insurance Readiness',
    summary:
      'A practical checklist mapped to the controls Canadian cyber insurers actually verify — with the evidence you need to keep on hand for renewal and claims.',
    icon: 'bi-file-earmark-shield',
    available: false
  },
  {
    slug: 'endpoint-hardening',
    title: 'Endpoint Hardening (Windows 11 & macOS)',
    summary:
      'Baseline configuration, EDR deployment, BitLocker / FileVault, patching cadence, and admin separation for the laptops and desktops on your network.',
    icon: 'bi-laptop',
    available: false
  },
  {
    slug: 'microsoft-365-backup',
    title: 'Microsoft 365 Backup & DR Strategy',
    summary:
      'Why native retention is not a backup, how to evaluate third-party backup for Exchange / SharePoint / OneDrive / Teams, and what a tested restore actually looks like.',
    icon: 'bi-cloud-arrow-down',
    available: false
  }
];

@Component({
  standalone: true,
  selector: 'app-guides-security-category',
  imports: [CommonModule, RouterModule],
  templateUrl: './security-category.component.html',
  styleUrls: ['./security-category.component.css']
})
export class SecurityCategoryComponent implements OnDestroy {
  private seo = inject(SeoService);

  readonly howtos = HOWTOS;

  private readonly COLLECTION_SCHEMA_ID = 'guides-security-category-collection';
  private readonly BREADCRUMB_SCHEMA_ID = 'guides-security-category-breadcrumb';

  constructor() {
    const title = 'Small Business Cybersecurity Guides | CtrlShift IT Services';
    const description =
      'Practical cybersecurity how-tos for Canadian small businesses on Microsoft 365 — tenant hardening, phishing defense, MFA, ransomware, endpoint hardening, backup, and cyber insurance readiness.';

    this.seo.update({
      title,
      description,
      type: 'website',
      canonicalPath: PAGE_PATH
    });

    this.seo.setStructuredData(this.COLLECTION_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'Small Business Cybersecurity Guides',
      description,
      inLanguage: 'en-CA',
      isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
      publisher: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        url: BASE_URL
      },
      hasPart: HOWTOS.filter((h) => h.available).map((h) => ({
        '@type': 'Article',
        name: h.title,
        url: `${BASE_URL}${PAGE_PATH}/${h.slug}`,
        description: h.summary
      }))
    });

    this.seo.setStructuredData(this.BREADCRUMB_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
        { '@type': 'ListItem', position: 3, name: 'Security', item: PAGE_URL }
      ]
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.COLLECTION_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
