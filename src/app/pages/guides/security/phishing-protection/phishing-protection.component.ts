import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';

const BASE_URL = 'https://ctrlshiftit.ca';
const PAGE_PATH = '/guides/security/phishing-protection';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

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

const PREVENTION_STEPS: ReadonlyArray<{ text: string; fragment: string }> = [
  { text: 'Enforce MFA for all users — Authenticator app preferred over SMS', fragment: 'mfa' },
  { text: 'Block legacy authentication protocols (IMAP, POP, basic SMTP auth)', fragment: 'legacy-auth' },
  { text: 'Enable Microsoft Defender anti-phishing policy with impersonation protection', fragment: 'defender' },
  { text: 'Enable Safe Links for email and Office documents', fragment: 'safe-links' },
  { text: 'Enable Safe Attachments with Dynamic Delivery', fragment: 'safe-attachments' },
  { text: 'Configure SPF, DKIM, and DMARC on every domain you send mail from', fragment: 'domain-auth' },
  { text: 'Set up Conditional Access baseline policies (requires Business Premium)', fragment: 'conditional-access' },
  { text: 'Install the Microsoft Report Message add-in for all users', fragment: 'awareness' },
  { text: 'Run quarterly phishing simulations using Attack Simulator', fragment: 'awareness' },
  { text: 'Document and practise your response plan for a successful phishing click', fragment: 'incident-response' }
];

@Component({
  standalone: true,
  selector: 'app-phishing-protection',
  imports: [CommonModule, RouterModule],
  templateUrl: './phishing-protection.component.html',
  styleUrls: ['./phishing-protection.component.css']
})
export class PhishingProtectionComponent implements OnDestroy {
  private seo = inject(SeoService);

  readonly faqs = FAQS;
  readonly preventionSteps = PREVENTION_STEPS;

  private readonly ARTICLE_SCHEMA_ID = 'guide-security-phishing-article';
  private readonly FAQ_SCHEMA_ID = 'guide-security-phishing-faq';
  private readonly HOWTO_SCHEMA_ID = 'guide-security-phishing-howto';
  private readonly BREADCRUMB_SCHEMA_ID = 'guide-security-phishing-breadcrumb';

  constructor() {
    const title =
      'How to Protect Microsoft 365 Accounts From Phishing Attacks (Small Business Guide) | CtrlShift IT';
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
        'A 10-step phishing protection checklist for Canadian small businesses on Microsoft 365, covering Defender anti-phishing, MFA, Safe Links, Safe Attachments, SPF/DKIM/DMARC, and legacy authentication blocking.',
      totalTime: 'PT3H',
      step: PREVENTION_STEPS.map(({ text }, index) => ({
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
          name: 'Phishing Protection',
          item: PAGE_URL
        }
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
