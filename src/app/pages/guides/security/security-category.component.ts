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
      'The Microsoft 365 security cluster for Canadian small businesses — checklist, phishing protection, Conditional Access policies, and the related rollout guides in one place.',
    icon: 'bi-microsoft',
    path: '/guides/security/microsoft-365-security',
    available: true
  },
  {
    id: 'identity-attacks',
    title: 'Identity Attacks',
    summary:
      'Password spray, token theft, business email compromise, legacy authentication risks, and the account takeover paths small businesses should understand.',
    icon: 'bi-person-lock',
    path: '/guides/security/identity-attacks',
    available: true
  },
  {
    id: 'network-attacks',
    title: 'Network Attacks',
    summary:
      'Plain-English guides for DDoS, exposed remote access, VPN risk, firewall misconfiguration, and other network attack paths that affect small businesses.',
    icon: 'bi-router',
    path: '/guides/security/network-attacks',
    available: true
  },
  {
    id: 'endpoint-security',
    title: 'Endpoint Security',
    summary:
      'Guides on endpoint protection, EDR, MDR, patching, device hardening, and reducing ransomware and malware risk across workstations and servers.',
    icon: 'bi-pc-display-horizontal',
    path: '/guides/security/endpoint-security',
    available: true
  },
  {
    id: 'password-management-mfa',
    title: 'Password Management & MFA Setup',
    summary:
      'How to stage a Microsoft 365 MFA deployment across a real small business — shared mailboxes, service accounts, BYOD exceptions, break-glass accounts, and the user communication that keeps the help desk quiet.',
    icon: 'bi-shield-check',
    path: '',
    available: false
  },
  {
    id: 'ransomware-prevention',
    title: 'Ransomware Prevention & Recovery Guide',
    summary:
      'Ransomware protection controls for small business Microsoft 365 environments, plus what to do in the first 60 minutes after an incident — containment, evidence preservation, and the pay-vs-restore decision.',
    icon: 'bi-bug',
    path: '',
    available: false
  },
  {
    id: 'small-business-backup-strategy',
    title: 'Small Business Data Backup Strategy',
    summary:
      'Why OneDrive sync and the Recycle Bin are not a backup strategy, how to evaluate Microsoft 365 backup solutions for Exchange, SharePoint, OneDrive, and Teams, and what a verified restore test looks like.',
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
      'Practical cybersecurity guides for Canadian small businesses on Microsoft 365 — MFA rollout, Conditional Access policies, phishing protection for small business, ransomware prevention, and backup strategy. Written by CtrlShift IT Services.';

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
      name: 'Small Business Cybersecurity Guides (Canada)',
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
