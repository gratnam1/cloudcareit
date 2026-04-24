import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides/security/microsoft-365-security';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

interface Microsoft365Guide {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly icon: string;
  readonly path: string;
  readonly available: boolean;
}

const GUIDES: ReadonlyArray<Microsoft365Guide> = [
  {
    id: 'microsoft-365-checklist',
    title: 'Microsoft 365 Security Checklist',
    summary:
      'The complete 19-control Microsoft 365 hardening checklist for Canadian small businesses — MFA, Conditional Access, legacy auth, phishing defense, endpoints, backup, and incident response.',
    icon: 'bi-microsoft',
    path: '/guides/security/microsoft-365-security/microsoft-365-checklist',
    available: true
  },
  {
    id: 'phishing-protection',
    title: 'Phishing & Email Threat Defense',
    summary:
      'How to configure Microsoft Defender anti-phishing, Safe Links, and impersonation protection — plus a small-team awareness cadence that actually sticks.',
    icon: 'bi-envelope-exclamation',
    path: '/guides/security/microsoft-365-security/phishing-protection',
    available: true
  },
  {
    id: 'conditional-access-small-business',
    title: 'Conditional Access Policies for Small Business',
    summary:
      'How to design, test, and enforce Conditional Access in a Microsoft 365 Business Premium tenant — named locations, device compliance, sign-in risk, and the break-glass exclusions that keep you from locking yourself out.',
    icon: 'bi-sliders',
    path: '/guides/security/microsoft-365-security/conditional-access-small-business',
    available: true
  },
  {
    id: 'mfa-rollout',
    title: 'Rolling Out MFA Without Breaking Things',
    summary:
      'How to deploy Microsoft 365 MFA safely across shared mailboxes, service accounts, BYOD devices, and Conditional Access — without locking users out.',
    icon: 'bi-shield-check',
    path: '/guides/security/microsoft-365-security/mfa-rollout-small-business',
    available: true
  },
  {
    id: 'microsoft-365-backup',
    title: 'Microsoft 365 Backup: What You Actually Need',
    summary:
      'Why OneDrive sync and the Recycle Bin are not enough, how to evaluate third-party backup, and what a verified restore looks like in practice.',
    icon: 'bi-cloud-arrow-down',
    path: '',
    available: false
  }
];

@Component({
  standalone: true,
  selector: 'app-microsoft-365-security-hub',
  imports: [CommonModule, RouterModule],
  templateUrl: './microsoft-365-security-hub.component.html',
  styleUrls: ['./microsoft-365-security-hub.component.css']
})
export class Microsoft365SecurityHubComponent implements OnDestroy {
  private seo = inject(SeoService);

  readonly guides = GUIDES;

  private readonly COLLECTION_SCHEMA_ID = 'guides-m365-security-collection';
  private readonly BREADCRUMB_SCHEMA_ID = 'guides-m365-security-breadcrumb';

  constructor() {
    const title = 'Microsoft 365 Security Guides | CtrlShift IT Services';
    const description =
      'Practical Microsoft 365 security guides for Canadian small businesses — checklist, phishing defence, Conditional Access, MFA rollout, and backup planning.';

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
      name: 'Microsoft 365 Security Guides',
      description,
      inLanguage: 'en-CA',
      isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
      publisher: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        url: BASE_URL
      },
      hasPart: GUIDES.filter((guide) => guide.available).map((guide) => ({
        '@type': 'Article',
        name: guide.title,
        url: `${BASE_URL}${guide.path}`,
        description: guide.summary
      }))
    });

    this.seo.setStructuredData(this.BREADCRUMB_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
        { '@type': 'ListItem', position: 3, name: 'Security', item: `${BASE_URL}/guides/security` },
        { '@type': 'ListItem', position: 4, name: 'Microsoft 365 Security', item: PAGE_URL }
      ]
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.COLLECTION_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
