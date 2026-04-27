import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

interface GuideCategory {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly icon: string;
  readonly available: boolean;
}

const CATEGORIES: ReadonlyArray<GuideCategory> = [
  {
    slug: 'security',
    title: 'Security',
    summary:
      'Small business cybersecurity checklist, Microsoft 365 tenant hardening, phishing, MFA, ransomware, endpoints, backup, and cyber insurance readiness.',
    icon: 'bi-shield-lock',
    available: true
  },
  {
    slug: 'microsoft-365',
    title: 'Microsoft 365',
    summary:
      'Tenant setup, licensing, Exchange Online, SharePoint, Teams governance, and day-two administration for Canadian small businesses.',
    icon: 'bi-microsoft',
    available: false
  },
  {
    slug: 'computer-fixes',
    title: 'Computer Fixes',
    summary:
      'Practical fix-it guides for the most common Windows, macOS, and office device problems — from boot loops to printer driver chaos.',
    icon: 'bi-wrench-adjustable',
    available: false
  },
  {
    slug: 'networking',
    title: 'Networking',
    summary:
      'Office Wi-Fi design, VLANs, firewalls, zero-trust remote access, and DNS hygiene for small business networks.',
    icon: 'bi-router',
    available: false
  },
  {
    slug: 'virtualization',
    title: 'Virtualization',
    summary:
      'Hyper-V, VMware, Proxmox, and cloud VM patterns — when virtualization makes sense for a small business, and when it does not.',
    icon: 'bi-hdd-stack',
    available: false
  },
  {
    slug: 'containers',
    title: 'Containers',
    summary:
      'Docker and Kubernetes fundamentals oriented at small IT teams — how to evaluate, adopt, and keep container workloads boring.',
    icon: 'bi-box-seam',
    available: false
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    summary:
      'Integrating AI into real small business operations — Microsoft Copilot, workflow automation, and staying inside your risk tolerance.',
    icon: 'bi-robot',
    available: false
  }
];

@Component({
  standalone: true,
  selector: 'app-guides-hub',
  imports: [CommonModule, RouterModule],
  templateUrl: './guides-hub.component.html',
  styleUrls: ['./guides-hub.component.css']
})
export class GuidesHubComponent implements OnDestroy {
  private seo = inject(SeoService);

  readonly categories = CATEGORIES;

  private readonly COLLECTION_SCHEMA_ID = 'guides-hub-collection';
  private readonly BREADCRUMB_SCHEMA_ID = 'guides-hub-breadcrumb';

  constructor() {
    const title = 'IT Guides & Knowledge Base | CtrlShift IT Services';
    const description =
      'Practical IT guides for Canadian small businesses — cybersecurity, Microsoft 365, networking, virtualization, containers, and AI automation, written by the CtrlShift IT Services managed services team.';

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
      name: 'IT Guides & Knowledge Base',
      description,
      inLanguage: 'en-CA',
      isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
      publisher: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        url: BASE_URL
      },
      hasPart: CATEGORIES.filter((c) => c.available).map((c) => ({
        '@type': 'Article',
        name: c.title,
        url: `${BASE_URL}${PAGE_PATH}/${c.slug}`,
        description: c.summary
      }))
    });

    this.seo.setStructuredData(this.BREADCRUMB_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: PAGE_URL }
      ]
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.COLLECTION_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
