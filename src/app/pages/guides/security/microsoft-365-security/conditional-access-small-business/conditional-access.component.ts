import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides/security/microsoft-365-security/conditional-access-small-business';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;
const STORAGE_KEY = 'ca-guide-checklist-v1';
const TESTING_STORAGE_KEY = 'ca-guide-testing-checklist-v1';

interface CaChecklistItem {
  readonly text: string;
  readonly fragment: string;
  readonly risk: 'critical' | 'high' | 'medium';
}

interface BaselinePolicy {
  readonly number: string;
  readonly title: string;
  readonly summary: string;
  readonly icon: string;
  readonly accentClass: string;
  readonly layerTag?: string;
  readonly steps: ReadonlyArray<string>;
  readonly warning?: string;
}

interface RolloutPhase {
  readonly phase: string;
  readonly title: string;
  readonly duration: string;
  readonly icon: string;
  readonly steps: ReadonlyArray<string>;
}

interface CommonMistake {
  readonly title: string;
  readonly body: string;
  readonly icon: string;
}

interface TestingChecklistItem {
  readonly text: string;
}

const CHECKLIST_ITEMS: ReadonlyArray<CaChecklistItem> = [
  { text: 'Break-glass account created, FIDO2-protected, and excluded from all CA policies', fragment: 'break-glass', risk: 'critical' },
  { text: 'Security Defaults disabled (required before CA policies can be enforced)', fragment: 'prerequisites', risk: 'critical' },
  { text: 'Policy 1: Require MFA for all users — active and enforced', fragment: 'policy-mfa', risk: 'critical' },
  { text: 'Policy 2: Block legacy authentication — active and enforced', fragment: 'policy-legacy', risk: 'critical' },
  { text: 'Policy 3: Require MFA for admin roles on every sign-in — enforced', fragment: 'policy-admins', risk: 'critical' },
  { text: 'Policy 4: Block high-risk sign-in locations — active', fragment: 'policy-locations', risk: 'high' },
  { text: 'All policies validated in report-only mode before full enforcement', fragment: 'rollout', risk: 'high' },
  { text: 'Sign-in logs reviewed and unexpected blocks resolved after enforcement', fragment: 'testing', risk: 'medium' },
];

const TESTING_CHECKLIST_ITEMS: ReadonlyArray<TestingChecklistItem> = [
  { text: 'Corporate device' },
  { text: 'Personal device' },
  { text: 'Mobile phone' },
  { text: 'External network' },
  { text: 'Guest account' },
  { text: 'Admin account' },
];

const BASELINE_POLICIES: ReadonlyArray<BaselinePolicy> = [
  {
    number: '1',
    title: 'Require MFA for All Users',
    summary: 'Enforces multi-factor authentication for every sign-in across the tenant. The highest-impact single policy you can deploy — blocks the overwhelming majority of automated credential attacks.',
    icon: 'bi-person-lock',
    accentClass: 'policy-mfa',
    layerTag: 'Identity Protection Layer',
    steps: [
      'In Microsoft Entra admin centre, go to Protection → Conditional Access → New policy',
      'Name it "Require MFA — All Users"',
      'Under Users → Include: All users. Under Exclude: add your break-glass account group',
      'Under Target resources: All cloud apps',
      'Under Grant: select Grant access, then check Require multifactor authentication',
      'Set Enable policy to Report-only for two weeks, then switch to On',
    ],
    warning: 'Always exclude your break-glass account group before enabling this policy. Enabling it without the exclusion can simultaneously lock every admin out of the tenant.'
  },
  {
    number: '2',
    title: 'Block Legacy Authentication',
    summary: 'Blocks IMAP, POP3, and basic auth protocols that cannot enforce MFA — eliminating the side door that makes MFA irrelevant when credentials are stolen.',
    icon: 'bi-ban',
    accentClass: 'policy-legacy',
    layerTag: 'Identity Protection Layer',
    steps: [
      'Create a new policy named "Block Legacy Authentication"',
      'Under Users: All users. Exclude: break-glass group',
      'Under Target resources: All cloud apps',
      'Under Conditions → Client apps: select Exchange ActiveSync clients and Other clients',
      'Under Grant: select Block access',
      'Before enforcing: audit any printers, scanners, or line-of-business apps using basic SMTP auth and migrate them to OAuth or modern auth',
    ],
    warning: 'Audit before you enforce. Printers, document scanners, older CRMs, and helpdesk tools commonly use basic SMTP auth and will stop sending email the moment this policy goes on. Run report-only for at least two weeks and review the sign-in logs before switching to On.'
  },
  {
    number: '3',
    title: 'Require MFA for Admin Roles on Every Sign-In',
    summary: 'Forces MFA on every admin session without persistent session tokens. Admins control the entire tenant — they are the highest-value target and should never be remembered.',
    icon: 'bi-shield-lock-fill',
    accentClass: 'policy-admins',
    layerTag: 'Identity Protection Layer',
    steps: [
      'Create a policy named "Admin MFA — Every Sign-In"',
      'Under Users → Include: Directory role — select Global Administrator, Exchange Administrator, SharePoint Administrator, User Administrator, Security Administrator',
      'Under Target resources: All cloud apps',
      'Under Session: enable Sign-in frequency, set to 1 hour',
      'Under Grant: Require multifactor authentication',
      'This policy does not need a report-only phase — admin MFA should go live immediately',
    ]
  },
  {
    number: '4',
    title: 'Block Sign-Ins from High-Risk Locations',
    summary: 'Restricts access to countries your business actually operates in. Most Canadian SMBs have zero legitimate sign-in traffic from the regions attackers most commonly use.',
    icon: 'bi-geo-alt-fill',
    accentClass: 'policy-locations',
    steps: [
      'In Named locations, create a location set containing every country your team legitimately works from (Canada, plus any regular travel destinations)',
      'Create a policy named "Block High-Risk Locations"',
      'Under Users: All users. Exclude: break-glass group',
      'Under Conditions → Locations: Include Any location, Exclude your named safe-countries location',
      'Under Grant: Block access',
      'Review sign-in logs for at least one week before enforcing to identify any legitimate international access you may have missed',
    ],
    warning: 'Travel breaks this policy. If an employee works from the US, UK, or another country regularly, include those in your named locations before enforcing. Update the list before travel, not after someone is locked out at the airport.'
  },
  {
    number: '5',
    title: 'Require Compliant or Hybrid-Joined Devices',
    summary: 'Restricts tenant access to devices enrolled in Intune or joined to your domain. Prevents sign-ins from unknown personal devices entirely.',
    icon: 'bi-laptop',
    accentClass: 'policy-devices',
    steps: [
      'This policy requires Intune enrollment — do not enable until every company device is enrolled and marked compliant',
      'Create a policy named "Require Compliant Device — Users"',
      'Under Users: All users. Exclude: break-glass group and any BYOD-approved accounts',
      'Under Target resources: All cloud apps',
      'Under Grant: select Require device to be marked as compliant OR Require Hybrid Entra ID joined device',
      'Use Require one of the selected controls — not Require all selected controls',
    ],
    warning: 'Only deploy this after every company device is enrolled and compliant in Intune. Enforcing before enrollment immediately locks out all staff whose devices are not yet registered.'
  },
];

const ROLLOUT_PHASES: ReadonlyArray<RolloutPhase> = [
  {
    phase: '1',
    title: 'Report-Only Validation',
    duration: 'Week 1–2',
    icon: 'bi-file-earmark-text',
    steps: [
      'Create all policies but set every one to Report-only mode — nothing is blocked yet',
      'In Entra admin centre, open Sign-in logs and filter by Conditional Access status',
      'Review which accounts, apps, and devices would have been blocked under each policy',
      'Identify shared mailboxes, service accounts, and integrations that need exclusions',
      'Create exclusion groups for any legitimate exceptions and add them to affected policies',
    ]
  },
  {
    phase: '2',
    title: 'Pilot Group Enforcement',
    duration: 'Week 2–3',
    icon: 'bi-people-fill',
    steps: [
      'Create an Entra security group called "CA-Pilot" with 5–10 willing volunteers — not admins',
      'Switch Policy 1 (Require MFA All Users) to target this pilot group only, set to On',
      'Wait 48–72 hours and check for help desk tickets or sign-in failures in the logs',
      'Resolve any issues, expand the group incrementally — department by department is safer than all-at-once',
      'Repeat for each remaining policy before moving to full enforcement',
    ]
  },
  {
    phase: '3',
    title: 'Full Tenant Enforcement',
    duration: 'Week 3–4',
    icon: 'bi-shield-fill-check',
    steps: [
      'Switch all policies from pilot group scope to All users, set to On',
      'Communicate to all staff what changed and why — 24 hours before enforcement is better than same-day',
      'Monitor sign-in logs daily for the first week post-enforcement',
      'Keep break-glass account credentials in a documented, physically secure location',
      'Set a quarterly calendar reminder to review policy coverage, named locations, and exclusion groups',
    ]
  },
];

const COMMON_MISTAKES: ReadonlyArray<CommonMistake> = [
  {
    title: 'Forgetting to exclude the break-glass account',
    body: 'If your break-glass account is caught by a Require MFA policy and the associated MFA device is unavailable, you lose all administrative access to the tenant with no recovery path. Create the break-glass exclusion group as the very first step — before writing any policy.',
    icon: 'bi-key-fill'
  },
  {
    title: 'Mixing Security Defaults with Conditional Access',
    body: 'Security Defaults and Conditional Access are mutually exclusive. Microsoft will not enforce CA policies while Security Defaults is active, and running both produces unpredictable behaviour. Disable Security Defaults first, then create your CA policies — do not leave a gap between disabling and enforcing.',
    icon: 'bi-toggles'
  },
  {
    title: 'Blocking all external access including your own remote work',
    body: 'A location-based block set to "all countries except Canada" will lock out any employee travelling internationally, working from a US satellite office, or using a VPN with a non-Canadian exit node. Define named locations deliberately before enforcing, and update the list before travel happens — not after a lockout.',
    icon: 'bi-globe'
  },
  {
    title: 'Skipping report-only mode',
    body: 'The most common lockout scenario: enabling a block policy against All users without first running report-only. Sign-in logs surface exceptions you did not know existed — shared mailboxes, CRM integrations, old printers using basic SMTP. Two weeks of observation prevents a Monday morning outage.',
    icon: 'bi-clipboard-x'
  },
  {
    title: 'Using All Users without defining exclusion groups',
    body: 'Always exclude at minimum your break-glass group. Decide upfront whether service accounts, guest users, and BYOD-approved accounts need separate treatment. Policies that catch unintended accounts are the leading cause of post-deployment help desk spikes.',
    icon: 'bi-people'
  },
  {
    title: 'Enforcing device compliance before Intune enrollment',
    body: 'Policy 5 will immediately block any user whose device is not enrolled in Intune. Only enable it after every company device is enrolled, marked compliant, and verified in the portal. Run an extra week in report-only before enforcing to confirm coverage is accurate.',
    icon: 'bi-laptop'
  },
];

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'What is the difference between Security Defaults and Conditional Access?',
    a: 'Security Defaults is a free, all-or-nothing baseline that enforces MFA for all users and blocks legacy authentication with no customization options. Conditional Access (requires Microsoft 365 Business Premium or Entra ID P1) lets you define granular rules based on user role, location, device compliance, and sign-in risk. Security Defaults is the right starting point if you have not yet upgraded licences. Conditional Access is the right long-term solution for any business managing more than five users.'
  },
  {
    q: 'Do I need to disable Security Defaults before setting up Conditional Access?',
    a: 'Yes — this is a hard requirement from Microsoft. Conditional Access policies will not be enforced while Security Defaults is active. Go to Microsoft Entra admin centre → Properties → Manage Security Defaults and turn it off. Do not leave a gap: immediately begin creating and enabling your CA policies after disabling Security Defaults, so MFA enforcement does not lapse even temporarily.'
  },
  {
    q: 'What is a break-glass account and why is it critical?',
    a: 'A break-glass account is a dedicated admin account that is intentionally excluded from all Conditional Access policies. Its sole purpose is emergency access — if a misconfigured policy locks every other admin account out of the tenant, the break-glass account lets you log in and fix it. It should be protected by a FIDO2 hardware security key (not an authenticator app), stored in a physically secure location with the credentials documented, and tested quarterly to confirm access still works.'
  },
  {
    q: 'Will Conditional Access break shared mailboxes or service accounts?',
    a: 'It can if those accounts are not handled explicitly. Shared mailboxes accessed through Outlook or the web work fine under MFA policies since users authenticate with their own delegate credentials. Service accounts that authenticate directly with basic auth will break when legacy authentication is blocked. Audit these before enforcing — audit sign-in logs in report-only mode, identify any service account using legacy protocols, and migrate them to OAuth or add them to a documented exclusion group with business justification.'
  },
  {
    q: 'Do guest users get affected by Conditional Access policies?',
    a: 'Yes, depending on how your policies are scoped. "All users" in a CA policy typically includes guest accounts unless you explicitly exclude them. For most SMBs, applying MFA to guests is appropriate — they access SharePoint and Teams content that is worth protecting. Test with a guest account during your report-only phase to confirm the sign-in experience is workable, particularly for external collaborators who may not have Microsoft authenticators configured.'
  },
  {
    q: 'What happens when an employee travels internationally?',
    a: 'If you have a location-based block policy, a traveller will be blocked unless their destination country is in your named safe locations list. Prepare for travel by updating the named locations list before departure. Your IT admin or helpdesk can temporarily add the destination, then remove it after the trip. If international travel is frequent, consider using Entra ID Protection sign-in risk policies that allow high-risk locations with step-up MFA rather than an outright block.'
  },
  {
    q: 'Can I use Conditional Access without Intune?',
    a: 'Yes. Policies 1–4 in the baseline set do not require Intune or any device management platform. Only Policy 5 (Require Compliant Device) depends on Intune enrollment for the device compliance signal. You can deploy and benefit from the first four policies immediately, without any MDM investment. Intune becomes relevant when you want to extend enforcement to device health, application protection policies, and configuration profiles.'
  },
  {
    q: 'Can Conditional Access stop adversary-in-the-middle phishing attacks?',
    a: 'Standard Authenticator app MFA does not fully stop AiTM token-theft attacks — the attacker proxies the MFA challenge and steals the resulting session cookie. Conditional Access helps by layering location, device compliance, and sign-in risk checks that make stolen tokens harder to use from unexpected contexts. To fully neutralize AiTM, deploy phishing-resistant MFA (FIDO2 keys or passkeys) for high-value users, and pair it with the phishing protection controls covered in our phishing defence guide.'
  },
  {
    q: 'How often should Conditional Access policies be reviewed?',
    a: 'Quarterly at minimum. Specific triggers that should prompt an immediate review: new employees or changed roles, new line-of-business app integrations, expanded or contracted remote work, staff international travel, Intune enrollment milestones, and any sign-in anomalies in your audit log. Many SMBs also review after cyber insurance renewal, as insurers increasingly ask for documented evidence of active CA policy management.'
  },
];

@Component({
  standalone: true,
  selector: 'app-conditional-access',
  imports: [CommonModule, RouterModule],
  templateUrl: './conditional-access.component.html',
  styleUrls: ['./conditional-access.component.css']
})
export class ConditionalAccessComponent implements OnDestroy, AfterViewInit {
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  readonly checklistItems = CHECKLIST_ITEMS;
  readonly baselinePolicies = BASELINE_POLICIES;
  readonly rolloutPhases = ROLLOUT_PHASES;
  readonly commonMistakes = COMMON_MISTAKES;
  readonly faqs = FAQS;
  readonly testingChecklistItems = TESTING_CHECKLIST_ITEMS;

  checklistChecked: boolean[] = new Array(CHECKLIST_ITEMS.length).fill(false);
  testingChecklistChecked: boolean[] = new Array(TESTING_CHECKLIST_ITEMS.length).fill(false);

  private scrollHandler?: () => void;
  private observer?: IntersectionObserver;

  private readonly ARTICLE_SCHEMA_ID = 'guide-security-ca-article';
  private readonly FAQ_SCHEMA_ID = 'guide-security-ca-faq';
  private readonly HOWTO_SCHEMA_ID = 'guide-security-ca-howto';
  private readonly BREADCRUMB_SCHEMA_ID = 'guide-security-ca-breadcrumb';

  constructor() {
    const title =
      'Conditional Access (M365) for SMBs | CtrlShift IT Services';
    const description =
      'How to deploy a safe Conditional Access baseline in Microsoft 365 Business Premium — MFA enforcement, legacy auth blocking, location policies, break-glass accounts, rollout strategy, and lockout recovery for Canadian SMBs.';

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
      headline: 'Conditional Access Policies for Small Business (Microsoft 365)',
      description,
      url: PAGE_URL,
      inLanguage: 'en-CA',
      datePublished: '2026-04-19',
      dateModified: '2026-04-19',
      author: { '@type': 'Organization', name: 'CtrlShift IT Services', url: BASE_URL },
      publisher: { '@type': 'Organization', name: 'CtrlShift IT Services', url: BASE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      about: [
        'Conditional Access policies Microsoft 365',
        'Entra ID Conditional Access small business',
        'MFA enforcement Microsoft 365 Business Premium',
        'Legacy authentication blocking',
        'Break-glass account Microsoft 365',
        'Zero-trust identity security SMB',
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
      name: 'How to Deploy Conditional Access Policies in Microsoft 365 Business Premium',
      description,
      totalTime: 'PT4H',
      step: CHECKLIST_ITEMS.map(({ text }, index) => ({
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
        { '@type': 'ListItem', position: 4, name: 'Microsoft 365 Security', item: `${BASE_URL}/guides/security/microsoft-365-security` },
        { '@type': 'ListItem', position: 5, name: 'Conditional Access Policies', item: PAGE_URL }
      ]
    });
  }

  get completedCount(): number {
    return this.checklistChecked.filter(Boolean).length;
  }

  get completedPercent(): number {
    return Math.round((this.completedCount / CHECKLIST_ITEMS.length) * 100);
  }

  get isAllComplete(): boolean {
    return this.completedCount === CHECKLIST_ITEMS.length;
  }

  get testingCompletedCount(): number {
    return this.testingChecklistChecked.filter(Boolean).length;
  }

  get testingCompletedPercent(): number {
    return Math.round((this.testingCompletedCount / TESTING_CHECKLIST_ITEMS.length) * 100);
  }

  get isTestingChecklistComplete(): boolean {
    return this.testingCompletedCount === TESTING_CHECKLIST_ITEMS.length;
  }

  toggleChecklistItem(index: number): void {
    this.checklistChecked = [...this.checklistChecked];
    this.checklistChecked[index] = !this.checklistChecked[index];
    this.saveProgress();
  }

  clearChecklistProgress(): void {
    this.checklistChecked = new Array(CHECKLIST_ITEMS.length).fill(false);
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    }
  }

  toggleTestingChecklistItem(index: number): void {
    this.testingChecklistChecked = [...this.testingChecklistChecked];
    this.testingChecklistChecked[index] = !this.testingChecklistChecked[index];
    this.saveTestingProgress();
  }

  clearTestingChecklistProgress(): void {
    this.testingChecklistChecked = new Array(TESTING_CHECKLIST_ITEMS.length).fill(false);
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.removeItem(TESTING_STORAGE_KEY); } catch { /* ignore */ }
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadProgress();
    this.loadTestingProgress();
    this.initReadingProgress();
    this.initScrollAnimations();
  }

  private loadProgress(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const arr = JSON.parse(saved) as boolean[];
      if (Array.isArray(arr) && arr.length === CHECKLIST_ITEMS.length) {
        this.checklistChecked = arr;
      }
    } catch { /* ignore */ }
  }

  private saveProgress(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.checklistChecked)); } catch { /* ignore */ }
  }

  private loadTestingProgress(): void {
    try {
      const saved = localStorage.getItem(TESTING_STORAGE_KEY);
      if (!saved) return;
      const arr = JSON.parse(saved) as boolean[];
      if (Array.isArray(arr) && arr.length === TESTING_CHECKLIST_ITEMS.length) {
        this.testingChecklistChecked = arr;
      }
    } catch { /* ignore */ }
  }

  private saveTestingProgress(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try { localStorage.setItem(TESTING_STORAGE_KEY, JSON.stringify(this.testingChecklistChecked)); } catch { /* ignore */ }
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
