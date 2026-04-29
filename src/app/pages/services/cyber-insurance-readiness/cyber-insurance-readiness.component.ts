import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-cyber-insurance-readiness',
  imports: [CommonModule, RouterModule],
  templateUrl: './cyber-insurance-readiness.component.html',
  styleUrls: ['./cyber-insurance-readiness.component.css']
})
export class CyberInsuranceReadinessComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-cyber-insurance-readiness';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-cyber-insurance-readiness-breadcrumb';
  private readonly FAQ_SCHEMA_ID = 'service-cyber-insurance-readiness-faq';

  readonly readinessSignals = [
    { icon: 'bi-key', label: 'MFA enforced', status: 'Verify' },
    { icon: 'bi-pc-display-horizontal', label: 'Endpoint protection / EDR', status: 'Check' },
    { icon: 'bi-database-check', label: 'Tested backups', status: 'Evidence' },
    { icon: 'bi-person-lock', label: 'Admin access controlled', status: 'Review' },
    { icon: 'bi-diagram-3', label: 'Firewall / remote access reviewed', status: 'Assess' }
  ];

  readonly controlAreas = [
    {
      icon: 'bi-key',
      title: 'MFA enforcement',
      text: 'Microsoft 365, VPN, remote access, and administrator accounts are checked for practical MFA coverage.'
    },
    {
      icon: 'bi-pc-display-horizontal',
      title: 'Endpoint protection',
      text: 'Workstations and laptops are reviewed for antivirus, EDR, alerting, and response coverage.'
    },
    {
      icon: 'bi-database-check',
      title: 'Backup evidence',
      text: 'Backup scope, retention, restore testing, and documentation gaps are reviewed before renewal pressure.'
    },
    {
      icon: 'bi-diagram-3',
      title: 'Firewall and remote access',
      text: 'Firewall exposure, VPN posture, RDP risk, and external access paths are checked for obvious weak points.'
    },
    {
      icon: 'bi-person-lock',
      title: 'Admin access control',
      text: 'Privileged accounts, shared admin use, least privilege, and separation from daily user accounts are reviewed.'
    },
    {
      icon: 'bi-envelope-exclamation',
      title: 'Email and phishing protection',
      text: 'Mailbox protection, phishing controls, SPF, DKIM, DMARC basics, and user awareness gaps are documented.'
    },
    {
      icon: 'bi-arrow-repeat',
      title: 'Patching and offboarding',
      text: 'Update habits, onboarding, offboarding, stale accounts, and repeatable user-access procedures are assessed.'
    },
    {
      icon: 'bi-clipboard2-pulse',
      title: 'Incident contacts',
      text: 'Response contacts, escalation notes, and plain-English procedures are organized for broker conversations.'
    }
  ];

  readonly controlMappings = [
    {
      icon: 'bi-key',
      area: 'Identity',
      question: 'Do you enforce MFA?',
      meaning: 'Insurers often want to know whether sign-ins require more than a password.',
      action: 'We check Microsoft 365, VPN, remote access, and admin MFA coverage.'
    },
    {
      icon: 'bi-pc-display-horizontal',
      area: 'Endpoints',
      question: 'Do you use endpoint protection?',
      meaning: 'Company devices should have active protection, monitoring, and response capability.',
      action: 'We review antivirus or EDR coverage, alerting, and unmanaged devices.'
    },
    {
      icon: 'bi-database-check',
      area: 'Recovery',
      question: 'Are backups tested?',
      meaning: 'A backup is stronger when restore evidence exists and critical data is included.',
      action: 'We review backup scope, retention, restore testing, and documentation.'
    },
    {
      icon: 'bi-person-lock',
      area: 'Admin',
      question: 'Do you restrict admin access?',
      meaning: 'Administrator rights should be limited, separated, and easier to audit.',
      action: 'We look for shared admin use, excess privileges, and missing admin separation.'
    },
    {
      icon: 'bi-file-earmark-text',
      area: 'Procedures',
      question: 'Do you have written procedures?',
      meaning: 'Some questionnaires ask for repeatable access and incident response processes.',
      action: 'We help document onboarding, offboarding, escalation contacts, and IT notes.'
    },
    {
      icon: 'bi-diagram-3',
      area: 'Remote access',
      question: 'Is remote access protected?',
      meaning: 'Open RDP, weak VPN access, or unmanaged remote tools can raise renewal friction.',
      action: 'We check firewall exposure, VPN posture, remote access paths, and conditional access options.'
    },
    {
      icon: 'bi-envelope-exclamation',
      area: 'Email',
      question: 'Is email protected?',
      meaning: 'Email is a common entry point for account takeover and invoice fraud.',
      action: 'We review phishing protection, Microsoft 365 settings, SPF, DKIM, DMARC, and awareness gaps.'
    }
  ];

  readonly processSteps = [
    {
      label: '01',
      title: 'Review the questionnaire',
      text: 'We start with the insurer or broker questionnaire, renewal timing, and any requested control evidence.'
    },
    {
      label: '02',
      title: 'Check identity controls',
      text: 'Microsoft 365, admin accounts, MFA coverage, conditional access options, and user lifecycle gaps are reviewed.'
    },
    {
      label: '03',
      title: 'Review endpoints and backups',
      text: 'We check device protection, EDR or antivirus coverage, backup scope, restore testing, and recovery notes.'
    },
    {
      label: '04',
      title: 'Review network exposure',
      text: 'Firewall, VPN, RDP, and remote access exposure are assessed so obvious risks can be prioritized.'
    },
    {
      label: '05',
      title: 'Document next steps',
      text: 'You receive plain-English findings and a remediation plan prioritized by risk, effort, budget, and renewal timing.'
    }
  ];

  readonly deliverables = [
    {
      icon: 'bi-clipboard2-check',
      title: 'Readiness checklist',
      text: 'Prioritized cyber insurance readiness checklist'
    },
    {
      icon: 'bi-microsoft',
      title: 'Microsoft 365 findings',
      text: 'Identity, MFA, admin, and mailbox security observations'
    },
    {
      icon: 'bi-pc-display-horizontal',
      title: 'Endpoint gaps',
      text: 'Endpoint protection and EDR coverage gaps'
    },
    {
      icon: 'bi-database-check',
      title: 'Backup notes',
      text: 'Backup and restore review notes'
    },
    {
      icon: 'bi-diagram-3',
      title: 'Remote access notes',
      text: 'Firewall and remote-access exposure notes'
    },
    {
      icon: 'bi-list-check',
      title: 'Remediation plan',
      text: 'Plain-English remediation plan'
    },
    {
      icon: 'bi-chat-square-text',
      title: 'Broker discussion notes',
      text: 'Documentation to discuss with your broker or insurer'
    }
  ];

  readonly relatedLinks = [
    { label: 'Managed IT services', route: '/managed-it-services' },
    { label: 'Cybersecurity services in Vaughan', route: '/cybersecurity-services-vaughan' },
    { label: 'Firewall and network security', route: '/security-firewall' },
    { label: 'Microsoft 365 support', route: '/microsoft-365' },
    { label: 'Security baseline assessment', route: '/services/security-baseline-assessment' },
    { label: 'Free security assessment', route: '/free-security-assessment' },
    {
      label: 'Microsoft 365 security checklist',
      route: '/guides/security/microsoft-365-security/microsoft-365-checklist'
    },
    {
      label: 'EDR versus antivirus guide',
      route: '/guides/security/endpoint-security/edr-vs-antivirus'
    },
    {
      label: 'MFA rollout guide',
      route: '/guides/security/microsoft-365-security/mfa-rollout-small-business'
    },
    {
      label: 'Microsoft 365 backup guide',
      route: '/guides/security/microsoft-365-security/microsoft-365-backup-small-business'
    }
  ];

  readonly faqs = [
    {
      question: 'Can you guarantee cyber insurance approval?',
      answer:
        'No. CtrlShift IT Services does not guarantee approval, coverage, premium changes, or policy terms. The insurer and broker make the final decision.'
    },
    {
      question: 'Do you help complete the insurance questionnaire?',
      answer:
        'We can help gather accurate IT facts, review technical questions, and explain gaps in plain English. We do not provide legal or insurance advice.'
    },
    {
      question: 'What controls do insurers usually ask about?',
      answer:
        'Common questions involve MFA, endpoint protection, backups, restore testing, admin access, remote access, patching, email security, incident contacts, and documentation.'
    },
    {
      question: 'Do small businesses really need MFA and EDR?',
      answer:
        'Many small-business questionnaires now ask about MFA and endpoint protection because account takeover and ransomware risks affect smaller teams too.'
    },
    {
      question: 'Can you help before renewal?',
      answer:
        'Yes. A review before renewal gives your business time to check controls, gather evidence, fix high-priority gaps, and prepare clearer broker conversations.'
    },
    {
      question: 'Do you work with our broker?',
      answer:
        'We can coordinate with your broker when you want technical clarification or evidence prepared, while the broker remains responsible for insurance guidance.'
    },
    {
      question: 'What if we fail some requirements?',
      answer:
        'We document the gaps, prioritize practical fixes, and help you improve the technical controls that are realistic for your business and budget.'
    }
  ];

  constructor() {
    const pageTitle = 'Cyber Insurance Readiness Vaughan';
    const description =
      'Prepare for cyber insurance questionnaires with MFA, EDR, backup, Microsoft 365, and firewall readiness support for Vaughan small businesses.';

    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/cyber-insurance-readiness-vaughan',
      serviceName: 'Cyber Insurance Readiness',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://ctrlshiftit.ca/cyber-insurance-readiness-vaughan#faq',
      mainEntity: this.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
  }
}
