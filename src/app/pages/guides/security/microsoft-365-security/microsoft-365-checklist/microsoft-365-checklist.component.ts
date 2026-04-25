import { Component, OnDestroy, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides/security/microsoft-365-security/microsoft-365-checklist';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;
const STORAGE_KEY = 'm365-checklist-v2';

export interface ChecklistItem {
  text: string;
  risk: 'critical' | 'high' | 'medium';
  fragment: string;
}

const CHECKLIST_ITEMS: ReadonlyArray<ChecklistItem> = [
  { text: 'Multi-factor authentication enforced on all accounts',                        risk: 'critical', fragment: 'mfa' },
  { text: 'Legacy authentication protocols disabled',                                    risk: 'critical', fragment: 'legacy-auth' },
  { text: 'Conditional Access policies configured',                                      risk: 'critical', fragment: 'conditional-access' },
  { text: 'Dedicated admin accounts separated from daily-use accounts',                  risk: 'critical', fragment: 'admin-protection' },
  { text: 'Global admin accounts protected with phishing-resistant MFA',                 risk: 'critical', fragment: 'admin-protection' },
  { text: 'Endpoint detection and response deployed on every company device',            risk: 'critical', fragment: 'endpoint' },
  { text: 'Microsoft 365 data backed up with a third-party solution',                   risk: 'critical', fragment: 'backup' },
  { text: 'Anti-phishing policies configured in Microsoft Defender',                     risk: 'high',     fragment: 'email-security' },
  { text: 'Safe Links and Safe Attachments enabled tenant-wide',                         risk: 'high',     fragment: 'safe-links' },
  { text: 'DKIM configured on all sending domains',                                      risk: 'high',     fragment: 'dkim' },
  { text: 'DMARC policy published and enforced',                                         risk: 'high',     fragment: 'dkim' },
  { text: 'Mailbox auditing enabled on all mailboxes',                                   risk: 'high',     fragment: 'mailbox-auditing' },
  { text: 'External sharing controls reviewed in SharePoint and OneDrive',               risk: 'high',     fragment: 'sharing' },
  { text: 'Staff trained to identify and report phishing attempts',                      risk: 'high',     fragment: 'phishing-training' },
  { text: 'Incident response plan documented and tested',                                risk: 'high',     fragment: 'ransomware' },
  { text: 'Guest access reviewed and restricted to necessary users only',                risk: 'medium',   fragment: 'sharing' },
  { text: 'Unified audit logging enabled',                                               risk: 'medium',   fragment: 'monitoring' },
  { text: 'Alert policies configured for high-risk events',                              risk: 'medium',   fragment: 'monitoring' },
  { text: 'Microsoft Secure Score reviewed and tracked quarterly',                       risk: 'medium',   fragment: 'secure-score' },
];

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'What is Microsoft Secure Score and what should a small business target?',
    a: 'Microsoft Secure Score is a built-in dashboard in the Microsoft 365 Defender portal that measures how well your tenant is configured against Microsoft\'s security recommendations. For a small business running Microsoft 365 Business Standard or Business Premium, a score between 60% and 80% represents a strong, defensible baseline. Under 30% indicates high risk and missing critical controls. Access it at security.microsoft.com → Secure Score.'
  },
  {
    q: 'Do I need Microsoft 365 Business Premium for Conditional Access?',
    a: 'Yes. Conditional Access requires Microsoft 365 Business Premium or an Entra ID P1 licence. If you are on Business Standard, you can use Security Defaults (free, included in all plans) to enforce MFA and block legacy authentication — but you lose the granular control Conditional Access provides. For most 5–50 employee businesses, the Business Premium upgrade is worth the cost given the security controls it unlocks.'
  },
  {
    q: 'Is Microsoft 365 secure out of the box?',
    a: 'Microsoft 365 provides a secure platform but ships in a permissive default state. Multi-factor authentication is available but not enforced. Legacy authentication protocols remain active. SharePoint external sharing may allow anonymous access. Admin accounts have no separation from daily work accounts. These defaults simplify initial setup but represent real, exploitable gaps in a live business tenant.'
  },
  {
    q: 'What does DKIM protect against and how is it different from SPF?',
    a: 'SPF specifies which mail servers are authorized to send email on behalf of your domain. DKIM adds a cryptographic signature to each outbound message, allowing receiving servers to verify the email was not tampered with in transit and genuinely originated from your domain. DMARC builds on both — it tells receiving servers what to do when a message fails SPF or DKIM checks. All three are needed for complete email authentication.'
  },
  {
    q: 'What does cyber insurance require from a small business?',
    a: 'Canadian cyber insurers increasingly require enforced MFA on all users, endpoint detection and response (EDR), documented backups tested quarterly, a tested incident response plan, and evidence that legacy authentication is disabled. Insurers may also check for Conditional Access policies, DKIM/DMARC on sending domains, and audit logging. Missing controls can trigger coverage exclusions or denied claims after an incident.'
  },
  {
    q: 'Does Microsoft back up my emails and files in 365?',
    a: 'No — not in the sense a business recovery plan requires. Microsoft protects the platform and provides limited retention features (Recycle Bin, version history, litigation hold), but under the shared responsibility model, your data is your responsibility. These convenience features cannot restore your tenant after ransomware encryption, an admin deletion, a departed employee, or a misconfiguration that wipes data. A dedicated third-party backup is required for genuine recovery capability.'
  },
  {
    q: 'What is legacy authentication and why is it dangerous?',
    a: 'Legacy authentication refers to older Microsoft 365 sign-in protocols — IMAP, POP3, basic SMTP auth, and older ActiveSync connections — that cannot enforce MFA. Regardless of your MFA policies, a stolen password alone grants mailbox access through these protocols. Microsoft\'s telemetry links legacy authentication to over 99% of password spray incidents. Disabling legacy auth is one of the highest-impact, lowest-effort controls you can enable.'
  },
  {
    q: 'Do we really need MFA if we use strong passwords?',
    a: 'Yes. Strong passwords are routinely stolen through phishing, credential stuffing, and info-stealer malware that captures keystrokes or browser-saved credentials. MFA blocks the overwhelming majority of automated account takeover attempts even after a password is compromised. It is now considered a baseline control by Canadian cyber insurers and regulators, not a premium add-on.'
  },
  {
    q: 'What is the difference between antivirus and endpoint detection and response (EDR)?',
    a: 'Traditional antivirus matches files against a database of known malware signatures. Endpoint detection and response (EDR) monitors device behaviour continuously — identifying suspicious activity patterns, isolating compromised devices, and supporting human-led investigation after an incident. Most cyber insurance policies now expect EDR-level protection rather than basic antivirus, which misses novel and fileless malware variants.'
  },
  {
    q: 'How much should a small business spend on cybersecurity?',
    a: 'Most Canadian small businesses we work with spend between 3% and 8% of their IT budget on security controls — MFA, endpoint protection, email filtering, and third-party backup. The exact number depends on regulated data, cyber insurance requirements, and remote-work footprint. Microsoft 365 Business Premium consolidates many of these controls into a single licence, often reducing the per-control cost compared to purchasing them separately.'
  },
  {
    q: 'What should we do immediately if we suspect a Microsoft 365 breach?',
    a: 'Preserve evidence first — do not delete logs or reimage machines. Isolate affected accounts by revoking active sessions in Entra ID (Revoke sign-in sessions). Reset credentials for impacted users. Check for malicious inbox forwarding rules and newly created email filters. Notify leadership and contact your managed IT or incident response provider before making further changes to the environment. If you have cyber insurance, notify your insurer early — most policies have reporting windows.'
  },
  {
    q: 'How often should we run phishing awareness training for staff?',
    a: 'Short monthly phishing simulations plus quarterly micro-training consistently outperform a single annual session for small teams. Phishing tactics evolve quickly — monthly simulations keep recognition skills current without requiring long training blocks. Pair simulations with easy one-click reporting using the Microsoft "Report Message" Outlook add-in.'
  }
];

@Component({
  standalone: true,
  selector: 'app-microsoft-365-checklist',
  imports: [CommonModule, RouterModule],
  templateUrl: './microsoft-365-checklist.component.html',
  styleUrls: ['./microsoft-365-checklist.component.css']
})
export class MicrosoftSecurityChecklistComponent implements OnDestroy, AfterViewInit {
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  readonly faqs = FAQS;
  readonly checklistItems = CHECKLIST_ITEMS;
  checklistChecked: boolean[] = new Array(CHECKLIST_ITEMS.length).fill(false);

  private scrollHandler?: () => void;
  private observer?: IntersectionObserver;

  private readonly ARTICLE_SCHEMA_ID = 'guide-security-m365-checklist-article';
  private readonly FAQ_SCHEMA_ID = 'guide-security-m365-checklist-faq';
  private readonly HOWTO_SCHEMA_ID = 'guide-security-m365-checklist-howto';
  private readonly BREADCRUMB_SCHEMA_ID = 'guide-security-m365-checklist-breadcrumb';

  get completedCount(): number {
    return this.checklistChecked.filter(Boolean).length;
  }

  get completedPercent(): number {
    return Math.round((this.completedCount / CHECKLIST_ITEMS.length) * 100);
  }

  get isAllComplete(): boolean {
    return this.completedCount === CHECKLIST_ITEMS.length;
  }

  toggleItem(i: number): void {
    this.checklistChecked = [...this.checklistChecked];
    this.checklistChecked[i] = !this.checklistChecked[i];
    this.saveProgress();
  }

  clearProgress(): void {
    this.checklistChecked = new Array(CHECKLIST_ITEMS.length).fill(false);
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadProgress();
    this.initReadingProgress();
    this.initScrollAnimations();
  }

  private loadProgress(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const arr = JSON.parse(saved) as boolean[];
        if (Array.isArray(arr) && arr.length === CHECKLIST_ITEMS.length) {
          this.checklistChecked = arr;
        }
      }
    } catch { /* ignore */ }
  }

  private saveProgress(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.checklistChecked)); } catch { /* ignore */ }
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
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.ARTICLE_SCHEMA_ID);
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.HOWTO_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
      this.observer?.disconnect();
    }
  }

  constructor() {
    const title = 'M365 Security Checklist (2026) | CtrlShift IT Services';
    const description =
      'The complete Microsoft 365 security checklist for small businesses — MFA, Conditional Access, DKIM/DMARC, Safe Links, audit logging, backup, and Secure Score benchmarks. Written for Microsoft 365 Business Standard and Business Premium tenants with 5–50 employees.';

    this.seo.update({
      title,
      description,
      type: 'article',
      canonicalPath: PAGE_PATH,
      publishedTime: '2026-04-18T00:00:00+00:00'
    });

    this.seo.setStructuredData(this.ARTICLE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Microsoft 365 Security Checklist for Small Businesses (2026)',
      description,
      url: PAGE_URL,
      inLanguage: 'en-CA',
      datePublished: '2026-04-18',
      dateModified: '2026-04-19',
      author: { '@type': 'Organization', name: 'CtrlShift IT Services', url: BASE_URL },
      publisher: { '@type': 'Organization', name: 'CtrlShift IT Services', url: BASE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      about: [
        'Microsoft 365 security checklist', 'Microsoft 365 tenant security',
        'Microsoft 365 security best practices', 'Microsoft 365 Business Premium security setup',
        'Multi-factor authentication', 'Conditional Access', 'DKIM DMARC configuration',
        'Microsoft Secure Score', 'Ransomware protection', 'Backup and disaster recovery',
        'Cyber insurance readiness'
      ]
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question', name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    });

    this.seo.setStructuredData(this.HOWTO_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Microsoft 365 Security Checklist for Small Businesses',
      description: 'A 19-point Microsoft 365 security checklist for small businesses running Business Standard or Business Premium.',
      totalTime: 'PT4H',
      step: CHECKLIST_ITEMS.map((item, index) => ({
        '@type': 'HowToStep', position: index + 1, name: item.text, text: item.text
      }))
    });

    this.seo.setStructuredData(this.BREADCRUMB_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
        { '@type': 'ListItem', position: 3, name: 'Security', item: `${BASE_URL}/guides/security` },
        { '@type': 'ListItem', position: 4, name: 'Microsoft 365 Security', item: `${BASE_URL}/guides/security/microsoft-365-security` },
        { '@type': 'ListItem', position: 5, name: 'Microsoft 365 Security Checklist', item: PAGE_URL }
      ]
    });
  }
}
