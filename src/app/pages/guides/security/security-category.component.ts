import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides/security';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

interface SecurityHowTo {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly icon: string;
  readonly path: string;
  readonly available: boolean;
}

const HOWTOS: ReadonlyArray<SecurityHowTo> = [
  {
    id: 'microsoft-365-security',
    title: 'Microsoft 365 Security',
    summary:
      'A dedicated Microsoft 365 security cluster covering the checklist, phishing protection, Conditional Access, and the related rollout guides Canadian small businesses actually need.',
    icon: 'bi-microsoft',
    path: '/guides/security/microsoft-365-security',
    available: true
  },
  {
    id: 'mfa-rollout',
    title: 'Rolling Out MFA Without Breaking Things',
    summary:
      'How to stage a Microsoft 365 MFA deployment across a real small business — handling shared mailboxes, service accounts, BYOD exceptions, break-glass accounts, and the user communication that keeps the help desk quiet.',
    icon: 'bi-shield-check',
    path: '',
    available: false
  },
  {
    id: 'ransomware-recovery',
    title: 'Ransomware Response Playbook',
    summary:
      'What to do in the first 60 minutes after a ransomware hit — containment steps, who decides what, how to preserve evidence for your insurer, and the pay-vs-restore decision most businesses are not prepared to make.',
    icon: 'bi-bug',
    path: '',
    available: false
  },
  {
    id: 'endpoint-hardening',
    title: 'Endpoint Hardening (Windows 11 & macOS)',
    summary:
      'Device-level security for small business laptops — BitLocker and FileVault encryption, EDR deployment, auto-patching enforcement, local admin removal, and a BYOD policy that holds up at insurance renewal.',
    icon: 'bi-laptop',
    path: '',
    available: false
  },
  {
    id: 'microsoft-365-backup',
    title: 'Microsoft 365 Backup: What You Actually Need',
    summary:
      'Why OneDrive sync and the Recycle Bin are not a backup, how to evaluate third-party solutions for Exchange, SharePoint, OneDrive, and Teams, and what a verified restore test looks like in practice.',
    icon: 'bi-cloud-arrow-down',
    path: '',
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
        url: `${BASE_URL}${h.path}`,
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
