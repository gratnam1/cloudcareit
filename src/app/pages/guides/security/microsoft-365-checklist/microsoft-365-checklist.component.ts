import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides/security/microsoft-365-checklist';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'How much should a small business spend on cybersecurity?',
    a: 'Most Canadian small businesses we work with spend between 3% and 8% of their IT budget on security controls such as MFA, endpoint protection, email filtering, and third-party backup. The exact number depends on regulated data, cyber insurance requirements, and remote-work footprint.'
  },
  {
    q: 'Is Microsoft 365 secure out of the box?',
    a: 'Microsoft 365 provides a secure platform, but default tenant settings leave important gaps. Multi-factor authentication, conditional access, legacy authentication blocking, and third-party backup still need to be configured to reach a defensible posture.'
  },
  {
    q: 'What does cyber insurance require from a small business?',
    a: 'Canadian cyber insurers increasingly require enforced MFA on all users, endpoint detection and response (EDR), documented backups, a tested incident response plan, and evidence that legacy authentication is disabled. Missing controls can trigger coverage exclusions or denied claims.'
  },
  {
    q: 'Do we really need MFA if we use strong passwords?',
    a: 'Yes. Strong passwords still get stolen through phishing, credential stuffing, and info-stealer malware. MFA stops most automated account takeovers and is now considered a baseline control by insurers and regulators, not a premium add-on.'
  },
  {
    q: 'What is legacy authentication and why is it dangerous?',
    a: 'Legacy authentication refers to older Microsoft 365 sign-in protocols like IMAP, POP, and basic SMTP auth that cannot enforce MFA. Attackers specifically target these protocols because a stolen password alone grants access. Disabling legacy auth is one of the highest-impact controls you can enable.'
  },
  {
    q: 'What is the difference between antivirus and endpoint protection (EDR)?',
    a: 'Traditional antivirus matches known malware signatures. Endpoint detection and response (EDR) watches device behavior, identifies suspicious activity, isolates compromised devices, and supports human-led investigation. Most cyber insurance policies now expect EDR, not basic antivirus.'
  },
  {
    q: 'Does Microsoft back up my emails and files in 365?',
    a: 'Microsoft protects the platform and provides limited retention, but under the shared responsibility model your data is your responsibility. Recycle Bin and version history are not a backup. A dedicated third-party backup is what restores your business after ransomware, insider deletion, or a departed employee.'
  },
  {
    q: 'How often should we run security awareness training for staff?',
    a: 'A short monthly phishing simulation plus quarterly micro-training works better for small teams than a single annual session. Frequency matters more than length because phishing tactics evolve continuously.'
  },
  {
    q: 'What should we do immediately if we suspect a breach?',
    a: 'Preserve evidence, isolate affected accounts and devices, reset credentials for impacted users, notify leadership, and contact your managed IT or incident response provider before changing the environment. Do not delete logs or reimage machines until an investigator reviews them.'
  },
  {
    q: 'Is cyber insurance worth it for a 20-person business in Canada?',
    a: 'For most Canadian SMBs the answer is yes. A single ransomware event can cost 6 to 7 figures in recovery, downtime, and legal notification. Insurance is meaningful only when your underlying controls match what the policy requires, so readiness and coverage go together.'
  }
];

const CHECKLIST: ReadonlyArray<string> = [
  'Multi-factor authentication enabled on all Microsoft 365 accounts',
  'Legacy authentication disabled in Microsoft 365',
  'Conditional access policies restricting risky sign-ins',
  'Staff trained to spot phishing emails',
  'Anti-phishing policies configured in Microsoft Defender',
  'Endpoint protection on every company device (including BYOD)',
  'Automatic OS and software updates enforced',
  'Admin accounts separated from daily-use accounts',
  'Microsoft 365 data backed up with a third-party solution',
  'Incident response plan documented and tested',
  'Quarterly security review scheduled'
];

@Component({
  standalone: true,
  selector: 'app-microsoft-365-checklist',
  imports: [CommonModule, RouterModule],
  templateUrl: './microsoft-365-checklist.component.html',
  styleUrls: ['./microsoft-365-checklist.component.css']
})
export class MicrosoftSecurityChecklistComponent implements OnDestroy {
  private seo = inject(SeoService);

  readonly faqs = FAQS;
  readonly checklist = CHECKLIST;

  private readonly ARTICLE_SCHEMA_ID = 'guide-security-m365-checklist-article';
  private readonly FAQ_SCHEMA_ID = 'guide-security-m365-checklist-faq';
  private readonly HOWTO_SCHEMA_ID = 'guide-security-m365-checklist-howto';
  private readonly BREADCRUMB_SCHEMA_ID = 'guide-security-m365-checklist-breadcrumb';

  constructor() {
    const title = 'Microsoft 365 Security Checklist for Small Businesses (2026) | CtrlShift IT Services';
    const description =
      'The complete Microsoft 365 security checklist for Canadian small businesses — phishing, MFA, identity protection, ransomware, endpoints, and backup. Cyber insurance ready.';

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
      headline: 'Small Business Cybersecurity: The Complete Checklist & Protection Guide for Microsoft 365',
      description,
      url: PAGE_URL,
      inLanguage: 'en-CA',
      datePublished: '2026-04-18',
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
        'Microsoft 365 security',
        'Phishing protection',
        'Multi-factor authentication',
        'Ransomware protection',
        'Endpoint security',
        'Backup and disaster recovery',
        'Cyber insurance readiness'
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
      name: 'The 11-Point Small Business Cybersecurity Checklist',
      description:
        'An ordered Microsoft 365 security checklist for Canadian small businesses, covering MFA, legacy authentication, conditional access, phishing, endpoint protection, backup, and incident response.',
      totalTime: 'PT2H',
      step: CHECKLIST.map((text, index) => ({
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
        { '@type': 'ListItem', position: 4, name: 'Microsoft 365 Checklist', item: PAGE_URL }
      ]
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.ARTICLE_SCHEMA_ID);
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.HOWTO_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
