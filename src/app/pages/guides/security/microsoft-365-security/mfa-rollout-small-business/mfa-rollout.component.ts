import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides/security/microsoft-365-security/mfa-rollout-small-business';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;
const ADMIN_STORAGE_KEY = 'mfa-rollout-admin-checklist-v1';

interface AdminChecklistItem {
  readonly text: string;
  readonly risk: 'critical' | 'high' | 'medium';
}

interface RolloutPhase {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly accentClass: string;
}

interface CommonMistake {
  readonly title: string;
  readonly body: string;
  readonly icon: string;
}

interface RolloutWeek {
  readonly week: string;
  readonly title: string;
  readonly tasks: ReadonlyArray<string>;
  readonly accentClass: string;
}

const ADMIN_CHECKLIST_ITEMS: ReadonlyArray<AdminChecklistItem> = [
  { text: 'Break-glass account created, FIDO2-protected, and excluded from all MFA policies', risk: 'critical' },
  { text: 'MFA method registered for all Global Administrators', risk: 'critical' },
  { text: 'MFA method registered for all Exchange Administrators', risk: 'critical' },
  { text: 'MFA method registered for all SharePoint Administrators', risk: 'critical' },
  { text: 'MFA method registered for all User Administrators', risk: 'critical' },
  { text: 'Admin Conditional Access policy enabled — confirmed via test sign-in', risk: 'high' },
  { text: 'Sign-in frequency set to 1 hour for admin accounts', risk: 'high' },
  { text: 'Sign-in logs reviewed and unexpected admin failures resolved', risk: 'medium' },
];

const ROLLOUT_PHASES: ReadonlyArray<RolloutPhase> = [
  {
    number: '01',
    title: 'Identity Inventory',
    description: 'Audit every account — service accounts, shared mailboxes, scanner identities, and break-glass gaps before a single policy is written',
    icon: 'bi-search',
    accentClass: 'phase--rose',
  },
  {
    number: '02',
    title: 'Admin Protection',
    description: 'Enforce MFA on every administrator role before any standard user policy is created or considered',
    icon: 'bi-shield-lock-fill',
    accentClass: 'phase--amber',
  },
  {
    number: '03',
    title: 'Pilot Users',
    description: 'Register and enforce MFA for a small volunteer group — resolve every issue before the broader rollout begins',
    icon: 'bi-people-fill',
    accentClass: 'phase--indigo',
  },
  {
    number: '04',
    title: 'Department Rollout',
    description: 'Expand department by department with advance communication, a support contact, and active sign-in log monitoring',
    icon: 'bi-building',
    accentClass: 'phase--cyan',
  },
  {
    number: '05',
    title: 'Legacy Auth Shutdown',
    description: 'Block IMAP, POP, SMTP AUTH, and all other legacy authentication protocols — only after sign-in logs confirm zero legitimate usage',
    icon: 'bi-ban',
    accentClass: 'phase--teal',
  },
];

const COMMON_MISTAKES: ReadonlyArray<CommonMistake> = [
  {
    title: 'No break-glass account',
    body: 'Enabling MFA tenant-wide without a break-glass exclusion can lock every administrator out simultaneously. There is no self-service recovery path once this happens. You will need to contact Microsoft Support, a process that can take days and may require legal verification of identity.',
    icon: 'bi-key-fill',
  },
  {
    title: 'Forcing MFA on shared mailboxes',
    body: 'Shared mailboxes do not support interactive MFA. Assigning MFA directly to a shared mailbox breaks delegation and any connector that uses that identity. Access shared mailboxes through user accounts with delegate permissions — the delegate\'s own MFA-protected account handles authentication.',
    icon: 'bi-envelope-exclamation-fill',
  },
  {
    title: 'Mixing Security Defaults with Conditional Access',
    body: 'Security Defaults and Conditional Access are mutually exclusive — Microsoft will not enforce CA policies while Security Defaults is active. Disable Security Defaults first, then immediately activate your CA policies. A gap between disabling Security Defaults and enabling Conditional Access means zero MFA enforcement during that window.',
    icon: 'bi-toggles',
  },
  {
    title: 'Enforcing policies tenant-wide immediately',
    body: 'Switching directly from no MFA to all-users enforcement without a pilot or report-only observation phase guarantees disruptions. Printers, service accounts, and legacy integrations fail silently until someone reports them — usually on a Monday morning when you have the least capacity to respond.',
    icon: 'bi-lightning-fill',
  },
];

const ROLLOUT_WEEKS: ReadonlyArray<RolloutWeek> = [
  {
    week: 'Week 1',
    title: 'Identity Audit',
    tasks: [
      'Enumerate all accounts in the Microsoft Entra admin centre',
      'Flag service accounts, shared mailboxes, scanners, and connectors',
      'Create the break-glass account and exclusion group',
      'Enable legacy auth report-only policy to baseline current usage',
    ],
    accentClass: 'week--rose',
  },
  {
    week: 'Week 2',
    title: 'Admin Protection',
    tasks: [
      'Register Microsoft Authenticator for all administrator roles',
      'Enable Conditional Access policy: Admin MFA — Every Sign-In',
      'Verify all admin sign-ins succeed with MFA',
      'Test break-glass account access with FIDO2 key',
    ],
    accentClass: 'week--amber',
  },
  {
    week: 'Week 3',
    title: 'Pilot Users',
    tasks: [
      'Identify 3–8 pilot volunteers (owner, manager, tech-comfortable employee)',
      'Walk each pilot user through Microsoft Authenticator registration',
      'Enable Conditional Access for pilot group only',
      'Collect feedback, resolve any sign-in issues',
    ],
    accentClass: 'week--indigo',
  },
  {
    week: 'Week 4',
    title: 'Department Rollout',
    tasks: [
      'Send user announcement email at least 48 hours before enforcement',
      'Roll out one department at a time, starting with smallest',
      'Provide support contact and walkthrough for Authenticator registration',
      'Monitor Entra sign-in logs for failures daily',
    ],
    accentClass: 'week--cyan',
  },
  {
    week: 'Week 5',
    title: 'Legacy Auth Shutdown',
    tasks: [
      'Confirm zero legacy auth sign-ins in report-only logs',
      'Enable Block Legacy Authentication Conditional Access policy',
      'Verify printers and scanners use modern authentication or direct send',
      'Set a quarterly review reminder for policy coverage and exclusions',
    ],
    accentClass: 'week--teal',
  },
];

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'Can I use Security Defaults instead of Conditional Access for MFA?',
    a: 'Security Defaults is free and enforces MFA for all users with no configuration — it is the right starting point if you do not yet have Business Premium. The limitation is that it applies the same rules to every account with no exceptions and no exclusions. It will generate MFA prompts for shared mailboxes, cannot exclude service accounts, and cannot be staged. Conditional Access (Business Premium or Entra ID P1) lets you target MFA precisely, exclude specific accounts, and roll out in controlled phases. Most businesses on Business Premium should move to Conditional Access.'
  },
  {
    q: 'Will shared mailboxes break when MFA is enabled?',
    a: 'Shared mailboxes accessed through delegate permissions in Outlook or the web work correctly — the delegating user authenticates with their own MFA. Problems occur when a shared mailbox has its own password and is used as an SMTP relay or automation identity. Those use cases require migration to service principal OAuth authentication or a dedicated service account before MFA enforcement. Never apply MFA directly to a shared mailbox account.'
  },
  {
    q: 'What happens to scanners and printers that send email through Microsoft 365?',
    a: 'Devices using SMTP relay with a username and password will stop sending when legacy authentication is blocked. The correct migration path is to reconfigure them to use Microsoft 365 direct send from a static IP (no authentication required) or to migrate to a service principal with OAuth. Most modern multi-function printers support modern authentication — check the firmware version and vendor documentation. If a device cannot be migrated, document the exception and schedule replacement.'
  },
  {
    q: 'How do I handle employees who refuse to install the Authenticator app on personal phones?',
    a: 'This is a legitimate concern in regulated industries and workplaces with personal-device policies. Options: provide a company-issued phone for authentication, issue a hardware TOTP token, or allow SMS as a fallback (less secure but functional). Emphasize that the Microsoft Authenticator app cannot access personal data — it only generates time-based codes. If company policy prohibits personal-device use for work authentication, deploy MFA for those employees only after their company device is issued. Do not delay the full rollout — use a temporary exclusion group and set a review date.'
  },
  {
    q: 'What is a break-glass account and why is it required?',
    a: 'A break-glass account is a dedicated Global Administrator account intentionally excluded from every Conditional Access policy. Its sole function is emergency recovery: if a misconfigured policy locks every other admin out of the tenant, the break-glass account lets you log in and fix it. It must be protected by a FIDO2 hardware key (not an authenticator app, which could be unavailable), stored physically in a secure location, and tested quarterly. Without it, a single policy mistake can make your tenant unrecoverable without calling Microsoft Support.'
  },
  {
    q: 'What if an employee gets locked out during the rollout?',
    a: 'Have a helpdesk contact defined before enforcement goes live. A locked-out user needs an admin to temporarily add them to a CA exclusion group, verify their MFA registration status, and walk them through Authenticator setup. The most common lockout causes are: MFA registration not completed before enforcement, a lost phone, or a new device without Authenticator configured. Publish a support number and SMS fallback option in the announcement email before any enforcement date.'
  },
];

@Component({
  standalone: true,
  selector: 'app-mfa-rollout',
  imports: [CommonModule, RouterModule],
  templateUrl: './mfa-rollout.component.html',
  styleUrls: ['./mfa-rollout.component.css']
})
export class MfaRolloutComponent implements OnDestroy, AfterViewInit {
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  readonly adminChecklistItems = ADMIN_CHECKLIST_ITEMS;
  readonly rolloutPhases = ROLLOUT_PHASES;
  readonly commonMistakes = COMMON_MISTAKES;
  readonly rolloutWeeks = ROLLOUT_WEEKS;
  readonly faqs = FAQS;

  adminChecklistChecked: boolean[] = new Array(ADMIN_CHECKLIST_ITEMS.length).fill(false);

  private scrollHandler?: () => void;
  private observer?: IntersectionObserver;

  private readonly ARTICLE_SCHEMA_ID = 'guide-mfa-rollout-article';
  private readonly FAQ_SCHEMA_ID = 'guide-mfa-rollout-faq';
  private readonly HOWTO_SCHEMA_ID = 'guide-mfa-rollout-howto';
  private readonly BREADCRUMB_SCHEMA_ID = 'guide-mfa-rollout-breadcrumb';

  constructor() {
    const title =
      'MFA Rollout for Small Business | CtrlShift IT Services';
    const description =
      'How to deploy Microsoft 365 MFA safely in a small business — staged rollout across shared mailboxes, service accounts, BYOD devices, and Conditional Access without locking users out. Canadian SMB guide.';

    this.seo.update({
      title,
      description,
      type: 'article',
      canonicalPath: PAGE_PATH,
      publishedTime: '2026-04-23T00:00:00+00:00'
    });

    this.seo.setStructuredData(this.ARTICLE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Rolling Out MFA Without Breaking Things (Microsoft 365 Small Business)',
      description,
      url: PAGE_URL,
      inLanguage: 'en-CA',
      datePublished: '2026-04-23',
      dateModified: '2026-04-23',
      author: { '@type': 'Organization', name: 'CtrlShift IT Services', url: BASE_URL },
      publisher: { '@type': 'Organization', name: 'CtrlShift IT Services', url: BASE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      about: [
        'Microsoft 365 MFA rollout small business',
        'Deploy MFA safely Microsoft 365',
        'Conditional Access rollout small business',
        'Staged MFA deployment Microsoft 365',
        'Enable MFA without locking users out',
        'Legacy authentication shutdown Microsoft 365',
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

    this.seo.setStructuredData(this.HOWTO_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Roll Out Microsoft 365 MFA Without Breaking Things',
      description,
      totalTime: 'PT5W',
      step: ROLLOUT_WEEKS.map(({ title, week }, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: `${week}: ${title}`,
        text: `${week}: ${title}`
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
        { '@type': 'ListItem', position: 5, name: 'MFA Rollout Small Business', item: PAGE_URL }
      ]
    });
  }

  get adminCompletedCount(): number {
    return this.adminChecklistChecked.filter(Boolean).length;
  }

  get adminCompletedPercent(): number {
    return Math.round((this.adminCompletedCount / ADMIN_CHECKLIST_ITEMS.length) * 100);
  }

  get isAdminChecklistComplete(): boolean {
    return this.adminCompletedCount === ADMIN_CHECKLIST_ITEMS.length;
  }

  toggleAdminChecklistItem(index: number): void {
    this.adminChecklistChecked = [...this.adminChecklistChecked];
    this.adminChecklistChecked[index] = !this.adminChecklistChecked[index];
    this.saveAdminProgress();
  }

  clearAdminChecklistProgress(): void {
    this.adminChecklistChecked = new Array(ADMIN_CHECKLIST_ITEMS.length).fill(false);
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.removeItem(ADMIN_STORAGE_KEY); } catch { /* ignore */ }
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadAdminProgress();
    this.initReadingProgress();
    this.initScrollAnimations();
  }

  private loadAdminProgress(): void {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (!saved) return;
      const arr = JSON.parse(saved) as boolean[];
      if (Array.isArray(arr) && arr.length === ADMIN_CHECKLIST_ITEMS.length) {
        this.adminChecklistChecked = arr;
      }
    } catch { /* ignore */ }
  }

  private saveAdminProgress(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try { localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(this.adminChecklistChecked)); } catch { /* ignore */ }
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
    this.seo.removeStructuredData(this.HOWTO_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
      this.observer?.disconnect();
    }
  }
}
