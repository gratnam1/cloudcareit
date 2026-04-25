import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides/security/microsoft-365-security/phishing-protection';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;
const STORAGE_KEY = 'phishing-guide-checklist-v1';

interface PhishingChecklistItem {
  readonly text: string;
  readonly fragment: string;
  readonly category: 'identity' | 'email' | 'response';
}

interface VisualCard {
  readonly title: string;
  readonly body: string;
  readonly icon: string;
  readonly accentClass: string;
}

interface RedFlag {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly explanation: string;
}

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'Does Microsoft 365 Business Standard include phishing protection?',
    a: 'Basic Defender anti-phishing and spoof intelligence are included. Safe Links and Safe Attachments require Business Premium or a Defender for Office 365 Plan 1 add-on. If your team handles client financial data or regulated information, the Premium upgrade is worth it.'
  },
  {
    q: 'Is turning on Security Defaults enough for a small business?',
    a: 'Security Defaults enforces MFA for all users and blocks legacy authentication — both high-impact controls. But it does not give you Safe Links, Safe Attachments, anti-impersonation policies, or granular Conditional Access. Think of it as a strong starting point, not a complete posture.'
  },
  {
    q: 'How do I know if my domain has SPF and DMARC configured?',
    a: 'Run a free lookup at MXToolbox.com — enter your domain and check SPF, DKIM, and DMARC records separately. A missing or broken DMARC record means attackers can send email that appears to come from your own domain, and receiving servers will not know to block it.'
  },
  {
    q: 'Can phishing attacks bypass MFA?',
    a: 'Yes — modern adversary-in-the-middle (AiTM) kits proxy a real Microsoft login page, steal your session token after a successful MFA challenge, and use it to log in without your credentials. Phishing-resistant MFA (FIDO2 security keys or passkeys) eliminates this entirely. Standard Authenticator app MFA still blocks most attacks but is not immune to AiTM.'
  },
  {
    q: 'What is the most common way small businesses in Canada get compromised?',
    a: 'Credential phishing followed by business email compromise (BEC). The attacker silently reads email for days or weeks to understand payment processes, then diverts a wire transfer or impersonates the owner to redirect payroll. The mailbox access itself is often never detected without proactive monitoring.'
  },
  {
    q: 'How long does it take to configure these protections?',
    a: 'MFA and Security Defaults: under 30 minutes with no disruption to users. Anti-phishing, Safe Links, Safe Attachments policies: 1–2 hours including testing. SPF/DKIM/DMARC: 1–3 hours depending on DNS access and whether you send from multiple platforms. Legacy authentication blocking needs a one-hour audit first to avoid breaking line-of-business apps.'
  },
  {
    q: 'Do I need Business Premium or will Business Standard work?',
    a: 'Business Standard covers MFA, basic anti-phishing, spoof intelligence, and SPF/DKIM/DMARC. Business Premium adds Safe Links, Safe Attachments, Conditional Access, Microsoft Entra ID Protection, and Attack Simulator. If your team handles client financial, legal, or health data — or if you are going through cyber insurance underwriting — Premium is the right licence tier.'
  },
  {
    q: 'What should I do immediately after a suspected phishing compromise?',
    a: 'Reset the compromised account password, revoke all active sessions in Microsoft Entra admin centre, audit mail forwarding rules, and review sign-in logs for other affected accounts. Do not reimage the device or delete logs until an IT professional reviews them — that evidence matters for your cyber insurance claim.'
  }
];

const PHISHING_CHECKLIST_ITEMS: ReadonlyArray<PhishingChecklistItem> = [
  { text: 'MFA enabled for every user and admin account', fragment: 'mfa', category: 'identity' },
  { text: 'Legacy authentication blocked tenant-wide', fragment: 'legacy-auth', category: 'identity' },
  { text: 'Safe Links enabled for email and Microsoft 365 apps', fragment: 'safe-links', category: 'email' },
  { text: 'Safe Attachments enabled with SharePoint, OneDrive, and Teams coverage', fragment: 'safe-attachments', category: 'email' },
  { text: 'User reporting workflow documented with the Report Message add-in', fragment: 'awareness', category: 'response' },
  { text: 'SPF, DKIM, and DMARC checked on every sending domain', fragment: 'domain-auth', category: 'email' },
  { text: 'Staff phishing awareness training completed and refreshed regularly', fragment: 'awareness', category: 'response' },
  { text: 'Incident response steps documented for suspicious clicks and mailbox compromise', fragment: 'incident-response', category: 'response' }
];

const PROTECTION_LAYERS: ReadonlyArray<VisualCard> = [
  {
    title: 'User Awareness',
    body: 'Short monthly training, one-click reporting, and a no-blame culture reduce how often suspicious emails become incidents.',
    icon: 'bi-mortarboard-fill',
    accentClass: 'layer-awareness'
  },
  {
    title: 'Identity Protection',
    body: 'MFA, Conditional Access, and blocking legacy auth stop most credential-only phishing from turning into mailbox access.',
    icon: 'bi-person-lock',
    accentClass: 'layer-identity'
  },
  {
    title: 'Email Security Controls',
    body: 'Anti-phishing, Safe Links, Safe Attachments, SPF, DKIM, and DMARC reduce spoofing, malicious links, and attachment risk.',
    icon: 'bi-envelope-check-fill',
    accentClass: 'layer-email'
  },
  {
    title: 'Response & Recovery',
    body: 'Fast reporting, session revocation, mailbox review, and a practiced response process shorten dwell time and limit fraud.',
    icon: 'bi-arrow-repeat',
    accentClass: 'layer-response'
  }
];

const THREAT_CARDS: ReadonlyArray<VisualCard> = [
  {
    title: 'Credential Phishing',
    body: 'Fake login prompts steal passwords or session cookies and are still the most common entry point into Microsoft 365 tenants.',
    icon: 'bi-key-fill',
    accentClass: 'threat-credential'
  },
  {
    title: 'Business Email Compromise',
    body: 'Attackers quietly monitor real mailboxes, learn approval flows, and redirect payments or payroll without deploying malware.',
    icon: 'bi-cash-coin',
    accentClass: 'threat-bec'
  },
  {
    title: 'Malicious Attachments',
    body: 'Weaponized invoices, resumes, and “shared documents” deliver malware or lure users into enabling risky macros.',
    icon: 'bi-file-earmark-zip-fill',
    accentClass: 'threat-attachment'
  },
  {
    title: 'Fake Microsoft 365 Login Pages',
    body: 'Lookalike Microsoft sign-in pages use urgency, branding, and MFA prompts to make the phishing flow feel legitimate.',
    icon: 'bi-window-stack',
    accentClass: 'threat-login'
  }
];

const RED_FLAGS: ReadonlyArray<RedFlag> = [
  {
    id: 'sender',
    label: '1',
    title: 'Suspicious sender address',
    explanation: 'The display name looks normal, but the actual sender domain does not match Microsoft or your known vendor domain.'
  },
  {
    id: 'urgency',
    label: '2',
    title: 'Urgency and account-threat language',
    explanation: '“Immediate action required” and “mailbox deactivation” language is designed to override caution and push a fast click.'
  },
  {
    id: 'link',
    label: '3',
    title: 'Login link that does not match the real destination',
    explanation: 'Phishing emails hide suspicious destinations behind reassuring button text. Safe Links helps, but users still need to pause before clicking.'
  },
  {
    id: 'request',
    label: '4',
    title: 'Unexpected credential request',
    explanation: 'Microsoft almost never asks users to re-verify credentials from a cold email. Unexpected login prompts should always be treated cautiously.'
  }
];

const RESPONSE_STEPS: ReadonlyArray<{ title: string; body: string; icon: string }> = [
  {
    title: 'Suspicious email reported',
    body: 'User flags the message through the Report Message add-in or directly to IT.',
    icon: 'bi-flag-fill'
  },
  {
    title: 'Assess impact',
    body: 'Confirm whether the user only received the message, clicked it, entered credentials, or approved MFA.',
    icon: 'bi-search'
  },
  {
    title: 'Isolate account if needed',
    body: 'If compromise is possible, disable sign-in or isolate the device while triage begins.',
    icon: 'bi-shield-lock-fill'
  },
  {
    title: 'Reset password and revoke sessions',
    body: 'Rotate credentials, revoke active sessions, and force fresh authentication.',
    icon: 'bi-arrow-repeat'
  },
  {
    title: 'Review mailbox rules and sign-in logs',
    body: 'Look for forwarding rules, OAuth grants, unfamiliar IPs, and suspicious app activity.',
    icon: 'bi-journal-text'
  },
  {
    title: 'Communicate next steps',
    body: 'Tell leadership and affected staff what happened, what changed, and what to watch for next.',
    icon: 'bi-chat-left-text-fill'
  }
];

@Component({
  standalone: true,
  selector: 'app-phishing-protection',
  imports: [CommonModule, RouterModule],
  templateUrl: './phishing-protection.component.html',
  styleUrls: ['./phishing-protection.component.css']
})
export class PhishingProtectionComponent implements OnDestroy, AfterViewInit {
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  readonly faqs = FAQS;
  readonly phishingChecklistItems = PHISHING_CHECKLIST_ITEMS;
  readonly protectionLayers = PROTECTION_LAYERS;
  readonly threatCards = THREAT_CARDS;
  readonly redFlags = RED_FLAGS;
  readonly responseSteps = RESPONSE_STEPS;
  checklistChecked: boolean[] = new Array(PHISHING_CHECKLIST_ITEMS.length).fill(false);
  activeRedFlagId: string | null = RED_FLAGS[0]?.id ?? null;

  private scrollHandler?: () => void;
  private observer?: IntersectionObserver;

  private readonly ARTICLE_SCHEMA_ID = 'guide-security-phishing-article';
  private readonly FAQ_SCHEMA_ID = 'guide-security-phishing-faq';
  private readonly HOWTO_SCHEMA_ID = 'guide-security-phishing-howto';
  private readonly BREADCRUMB_SCHEMA_ID = 'guide-security-phishing-breadcrumb';

  constructor() {
    const title =
      'Microsoft 365 Phishing Protection | CtrlShift IT Services';
    const description =
      'Step-by-step phishing protection for Canadian small businesses on Microsoft 365 — Defender anti-phishing, MFA, Safe Links, Safe Attachments, SPF/DKIM/DMARC, and what to do when someone clicks.';

    this.seo.update({
      title,
      description,
      type: 'article',
      canonicalPath: PAGE_PATH,
      publishedTime: '2026-04-19T00:00:00+00:00'
    });

    this.seo.setStructuredData(this.ARTICLE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'How to Protect Microsoft 365 Accounts From Phishing Attacks (Small Business Guide)',
      description,
      url: PAGE_URL,
      inLanguage: 'en-CA',
      datePublished: '2026-04-19',
      dateModified: '2026-04-19',
      author: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        url: BASE_URL
      },
      publisher: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        url: BASE_URL
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      about: [
        'Microsoft 365 phishing protection',
        'Anti-phishing policy configuration',
        'Safe Links and Safe Attachments',
        'SPF DKIM DMARC setup',
        'MFA enforcement',
        'Legacy authentication blocking',
        'Conditional Access for small business'
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
      name: 'How to Protect Microsoft 365 Accounts From Phishing Attacks',
      description:
        'A practical phishing protection checklist for Canadian small businesses on Microsoft 365, covering Defender anti-phishing, MFA, Safe Links, Safe Attachments, SPF/DKIM/DMARC, and legacy authentication blocking.',
      totalTime: 'PT3H',
      step: PHISHING_CHECKLIST_ITEMS.map(({ text }, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: text,
        text
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
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Phishing Protection',
          item: PAGE_URL
        }
      ]
    });
  }

  get completedCount(): number {
    return this.checklistChecked.filter(Boolean).length;
  }

  get completedPercent(): number {
    return Math.round((this.completedCount / PHISHING_CHECKLIST_ITEMS.length) * 100);
  }

  get isAllComplete(): boolean {
    return this.completedCount === PHISHING_CHECKLIST_ITEMS.length;
  }

  toggleChecklistItem(index: number): void {
    this.checklistChecked = [...this.checklistChecked];
    this.checklistChecked[index] = !this.checklistChecked[index];
    this.saveProgress();
  }

  clearChecklistProgress(): void {
    this.checklistChecked = new Array(PHISHING_CHECKLIST_ITEMS.length).fill(false);
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    }
  }

  toggleRedFlag(flagId: string): void {
    this.activeRedFlagId = this.activeRedFlagId === flagId ? null : flagId;
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
      if (!saved) return;
      const arr = JSON.parse(saved) as boolean[];
      if (Array.isArray(arr) && arr.length === PHISHING_CHECKLIST_ITEMS.length) {
        this.checklistChecked = arr;
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
