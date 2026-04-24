import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides/security/microsoft-365-security/microsoft-365-backup-small-business';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'Does Microsoft back up my Microsoft 365 data?',
    a: 'Microsoft backs up the infrastructure that runs Microsoft 365 — not your organization\'s data. Under the shared responsibility model, Microsoft guarantees platform uptime and hardware redundancy. Your email, files, SharePoint content, and Teams data are your responsibility. Microsoft provides limited recovery features like the Recycle Bin and version history, but these are not backup — they have short retention windows and can be deleted by an admin or malicious actor.'
  },
  {
    q: 'Is OneDrive sync the same as a backup?',
    a: 'No. OneDrive sync mirrors your local files to the cloud — but it also mirrors deletions, corruption, and ransomware encryption. If a file is deleted on one device, that deletion syncs to all devices. If ransomware encrypts files locally, those encrypted versions sync over the originals. Sync is a file access and collaboration tool, not a recovery tool.'
  },
  {
    q: 'How long does the Microsoft 365 Recycle Bin retain deleted items?',
    a: 'Exchange Online mailbox items are retained for 30 days in the Deleted Items folder and an additional 14 days in the Recoverable Items folder by default. SharePoint and OneDrive use a two-stage Recycle Bin with a combined maximum of 93 days. These defaults can be shortened by admin action, retention policy misconfigurations, or intentional deletion. Items deleted by an admin with sufficient permissions bypass the standard Recycle Bin entirely.'
  },
  {
    q: 'What workloads should a Microsoft 365 backup solution cover?',
    a: 'A complete Microsoft 365 backup solution should cover Exchange Online mailboxes, OneDrive user storage, SharePoint document libraries, Teams conversations, Teams channel files, and optionally Planner data. Each workload has different recovery requirements — a mailbox restore is different from a SharePoint site restore. Verify that your backup solution supports granular restore (individual items, not just full mailbox or site) for each workload.'
  },
  {
    q: 'How often should Microsoft 365 backup run?',
    a: 'Daily backup is the minimum acceptable frequency for most small businesses. Some solutions offer more frequent snapshots — useful for high-activity environments like law firms or accounting practices where a single day of email or document changes represents significant work. Verify the backup frequency matches your recovery point objective: if you can only tolerate losing 4 hours of data, a daily backup is not sufficient.'
  },
  {
    q: 'Do small businesses really need Microsoft 365 backup?',
    a: 'Yes, if any of the following apply: you have compliance requirements (PIPEDA, PHIPA, legal hold), client contracts that require data retention, shared SharePoint environments where accidental deletion could affect multiple users, high email dependency for client communication, or a remote workforce. For businesses with cyber insurance, many insurers now require documented third-party backup as a coverage condition.'
  },
  {
    q: 'What does a verified restore mean?',
    a: 'A verified restore means you have actually tested recovering data from your backup — not just confirmed that backup jobs completed successfully. Testing should include restoring an individual file, a folder, a mailbox item, and a point-in-time recovery to confirm the process works before a real incident requires it. A backup you have never tested is not a backup strategy — it is an assumption.'
  },
];

@Component({
  standalone: true,
  selector: 'app-m365-backup',
  imports: [CommonModule, RouterModule],
  templateUrl: './m365-backup.component.html',
  styleUrls: ['./m365-backup.component.css']
})
export class M365BackupComponent implements OnDestroy, AfterViewInit {
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  readonly faqs = FAQS;

  private scrollHandler?: () => void;
  private observer?: IntersectionObserver;

  private readonly ARTICLE_SCHEMA_ID = 'guide-m365-backup-article';
  private readonly FAQ_SCHEMA_ID = 'guide-m365-backup-faq';
  private readonly BREADCRUMB_SCHEMA_ID = 'guide-m365-backup-breadcrumb';

  constructor() {
    const title =
      'Microsoft 365 Backup for Small Business: What You Actually Need | CtrlShift IT';
    const description =
      'Learn why OneDrive sync, recycle bins, and retention policies are not true backup — and what small businesses should verify before data loss happens.';

    this.seo.update({
      title,
      description,
      type: 'article',
      canonicalPath: PAGE_PATH,
      publishedTime: '2026-04-24T00:00:00+00:00'
    });

    this.seo.setStructuredData(this.ARTICLE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Microsoft 365 Backup for Small Business: What You Actually Need',
      description,
      url: PAGE_URL,
      inLanguage: 'en-CA',
      datePublished: '2026-04-24',
      dateModified: '2026-04-24',
      author: { '@type': 'Organization', name: 'CtrlShift IT Services', url: BASE_URL },
      publisher: { '@type': 'Organization', name: 'CtrlShift IT Services', url: BASE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      about: [
        'Microsoft 365 backup',
        'Microsoft 365 data protection',
        'OneDrive is not backup',
        'Microsoft 365 shared responsibility model',
        'Microsoft 365 recovery limitations',
        'small business Microsoft 365 backup strategy',
      ]
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    });

    this.seo.setStructuredData(this.BREADCRUMB_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
        { '@type': 'ListItem', position: 3, name: 'Security', item: `${BASE_URL}/guides/security` },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Microsoft 365 Security',
          item: `${BASE_URL}/guides/security/microsoft-365-security`
        },
        { '@type': 'ListItem', position: 5, name: 'Microsoft 365 Backup', item: PAGE_URL }
      ]
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initReadingProgress();
    this.initScrollAnimations();
  }

  private initReadingProgress(): void {
    const bar = document.getElementById('reading-progress');
    if (!bar) return;
    this.scrollHandler = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  private initScrollAnimations(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.ARTICLE_SCHEMA_ID);
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
      this.observer?.disconnect();
    }
  }
}
