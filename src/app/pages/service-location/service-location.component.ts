import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';

type FaqItem = { q: string; a: string };
type SectionItem = { heading: string; body: string };

export type ServiceLocationContent = {
  title: string;
  canonicalPath: string;
  city: string;
  region: string;
  serviceType: string; // e.g. "Cybersecurity Services" | "Cloud Services"
  mainHeading: string;
  intro: string;
  metaDescription: string;
  kicker: string;
  sections: SectionItem[];
  features: string[];
  hubPath: string;
  hubLabel: string;
  faq: FaqItem[];
};

export const SERVICE_LOCATION_CONTENT: Record<string, ServiceLocationContent> = {
  'cybersecurity-vaughan': {
    title: 'Cybersecurity Services Vaughan | CtrlShift IT Services',
    canonicalPath: '/cybersecurity-services-vaughan',
    city: 'Vaughan',
    region: 'York Region',
    serviceType: 'Cybersecurity Services',
    mainHeading: 'Cybersecurity Services Vaughan',
    kicker: 'Cybersecurity for York Region Businesses',
    intro:
      'Security-first protection for Vaughan businesses — Huntress EDR, Fortinet firewall, MFA enforcement, and 24/7 threat monitoring so your team can work without worrying about breaches or ransomware.',
    metaDescription:
      'Security-first cybersecurity for Vaughan businesses — Huntress EDR, Fortinet firewall, MFA enforcement, and email protection. CtrlShift IT Services.',
    sections: [
      {
        heading: 'Threat Protection for Vaughan Businesses',
        body: 'Vaughan professional offices face the same threat landscape as large enterprises — phishing, ransomware, and credential theft. We deploy Huntress EDR for AI-assisted endpoint detection and respond to active threats before they spread across your network.',
      },
      {
        heading: 'Endpoint Security',
        body: 'Every device — laptops, desktops, and servers — is protected with managed endpoint detection, automated patch deployment, and device policy enforcement via Microsoft Intune. We catch vulnerabilities before attackers can exploit them.',
      },
      {
        heading: 'Email Security',
        body: 'Phishing is the #1 entry point for breaches. We harden Microsoft 365 and Google Workspace email with anti-spoofing policies (SPF, DKIM, DMARC), conditional access controls, and safe-link scanning to block malicious messages before they reach your inbox.',
      },
      {
        heading: 'Compliance Support',
        body: 'We help Vaughan businesses meet PIPEDA requirements and industry-specific frameworks. Law firms, medical clinics, and accounting practices get security controls mapped to their compliance obligations — documented and audit-ready.',
      },
      {
        heading: 'Why Choose CtrlShift IT Services in Vaughan',
        body: 'We are a local York Region team with 15+ years of experience. Our security-first managed IT approach means cybersecurity isn\'t an add-on — it\'s built into every plan. Flat-rate pricing, no surprise invoices, and a 30-day risk-free guarantee.',
      },
    ],
    features: [
      'Huntress EDR — AI-assisted endpoint detection & response',
      'Fortinet next-gen firewall management',
      'Microsoft 365 & Google Workspace security hardening',
      'MFA enforcement for all user accounts',
      'Email anti-phishing: SPF, DKIM, DMARC configuration',
      'Patch management & vulnerability remediation',
      'Security awareness guidance for staff',
      'PIPEDA compliance documentation support',
    ],
    hubPath: '/managed-it-services-vaughan',
    hubLabel: 'Managed IT Services Vaughan',
    faq: [
      {
        q: 'What cybersecurity services do you offer in Vaughan?',
        a: 'We provide endpoint detection and response (EDR) with Huntress, Fortinet firewall management, Microsoft 365 security hardening, MFA enforcement, email anti-phishing configuration, and patch management for Vaughan businesses.',
      },
      {
        q: 'How does cybersecurity fit into managed IT services in Vaughan?',
        a: 'Every managed IT plan includes a security baseline — MFA, patching, and safer access controls. Our higher tiers add Huntress EDR, Fortinet NGFW, and advanced email protection for businesses that need deeper coverage.',
      },
      {
        q: 'Can you help a Vaughan law firm or medical clinic meet compliance requirements?',
        a: 'Yes. We implement security controls aligned with PIPEDA and industry-specific requirements for law firms and medical clinics. We document your security posture so you are prepared for audits and insurance reviews.',
      },
      {
        q: 'How much does cybersecurity support cost for a Vaughan business?',
        a: 'Cybersecurity services are included in our flat-rate managed IT plans starting at $499/month. For standalone cybersecurity assessments or project-based hardening, contact us for a custom quote.',
      },
      {
        q: 'Do you offer cyber insurance readiness support in Vaughan?',
        a: 'Yes. We help Vaughan businesses prepare for cyber insurance applications by documenting security controls, implementing required safeguards like MFA and backups, and producing audit-ready evidence for underwriters.',
      },
    ],
  },

  'cloud-vaughan': {
    title: 'Cloud Services Vaughan | CtrlShift IT Services',
    canonicalPath: '/cloud-services-vaughan',
    city: 'Vaughan',
    region: 'York Region',
    serviceType: 'Cloud Services',
    mainHeading: 'Cloud Services Vaughan',
    kicker: 'Cloud Solutions for York Region Businesses',
    intro:
      'Practical cloud services for Vaughan businesses — Microsoft 365, Google Workspace, and AWS infrastructure managed properly, secured, and optimized for your team size and workflow.',
    metaDescription:
      'Cloud services for Vaughan businesses — Microsoft 365, Google Workspace, and AWS management with secure setup, migration, and ongoing support from CtrlShift IT Services.',
    sections: [
      {
        heading: 'Cloud Migration for Vaughan Businesses',
        body: 'Moving to the cloud should reduce complexity, not add to it. We plan and execute migrations from on-premise servers and legacy systems to Microsoft 365, Google Workspace, or AWS — with minimal downtime and complete data verification.',
      },
      {
        heading: 'Microsoft 365 Management',
        body: 'Microsoft 365 is more than email. We manage the full stack — Exchange Online, SharePoint, OneDrive, Teams, and Intune device management — with proper security policies, licensing optimization, and ongoing admin support for your team.',
      },
      {
        heading: 'Google Workspace Support',
        body: 'For Vaughan teams running Google Workspace, we handle user provisioning, shared drive permissions, Meet setup, and security hardening including 2-step verification and login auditing — all from a single point of contact.',
      },
      {
        heading: 'AWS Infrastructure',
        body: 'Growing Vaughan businesses using AWS benefit from properly configured VPCs, IAM policies, backup strategies, and cost optimization. We set up and maintain AWS environments aligned to your business requirements and security standards.',
      },
      {
        heading: 'Why Choose CtrlShift IT Services for Cloud in Vaughan',
        body: 'We are a local York Region team who understands the day-to-day cloud needs of professional offices. No overengineered solutions — just reliable cloud setups, secure access controls, and responsive support when your team needs help.',
      },
    ],
    features: [
      'Microsoft 365 setup, migration & administration',
      'Google Workspace setup, migration & administration',
      'AWS infrastructure management & cost optimization',
      'Cloud backup and disaster recovery planning',
      'SharePoint & Teams governance',
      'Identity management (Azure AD / Entra ID)',
      'Hybrid cloud and on-premise integration',
      'Ongoing cloud admin support for staff',
    ],
    hubPath: '/managed-it-services-vaughan',
    hubLabel: 'Managed IT Services Vaughan',
    faq: [
      {
        q: 'What cloud services do you offer in Vaughan?',
        a: 'We provide Microsoft 365 administration, Google Workspace administration, AWS infrastructure management, cloud migration planning, and ongoing cloud support for Vaughan businesses.',
      },
      {
        q: 'Can you migrate our Vaughan office from on-premise servers to the cloud?',
        a: 'Yes. We plan and execute migrations to Microsoft 365, Google Workspace, or AWS. We handle data transfer, user provisioning, email routing, and post-migration support to ensure a smooth transition with minimal disruption.',
      },
      {
        q: 'Do you support both Microsoft 365 and Google Workspace for Vaughan teams?',
        a: 'Yes. We manage both platforms and can support mixed environments where some staff use Microsoft 365 and others use Google Workspace — handling identity, email routing, and file access from a single point of contact.',
      },
      {
        q: 'How much do cloud services cost for a Vaughan business?',
        a: 'Cloud administration is included in our flat-rate managed IT plans. For standalone cloud projects like migrations or AWS infrastructure setup, we provide fixed-price quotes so you know the cost upfront.',
      },
      {
        q: 'Can you help reduce our Microsoft 365 licensing costs in Vaughan?',
        a: 'Yes. We audit your current 365 licensing, identify unused seats and over-licensed plans, and recommend the right licence tiers for each user role — often reducing monthly costs while maintaining full functionality.',
      },
    ],
  },
};

@Component({
  selector: 'app-service-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-location.component.html',
  styleUrls: ['./service-location.component.css'],
})
export class ServiceLocationComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  content!: ServiceLocationContent;

  private readonly FAQ_SCHEMA_ID = 'service-location-faq';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-location-breadcrumb';

  ngOnInit(): void {
    const contentKey = (this.route.snapshot.data['contentKey'] as string) ?? 'cybersecurity-vaughan';
    this.content = SERVICE_LOCATION_CONTENT[contentKey] ?? SERVICE_LOCATION_CONTENT['cybersecurity-vaughan'];

    this.seo.update({
      title: this.content.title,
      description: this.content.metaDescription,
      imageUrl: 'https://ctrlshiftit.ca/favicon.svg',
      type: 'website',
      canonicalPath: this.content.canonicalPath,
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.content.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });

    this.seo.setStructuredData(this.BREADCRUMB_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ctrlshiftit.ca/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: this.content.hubLabel,
          item: `https://ctrlshiftit.ca${this.content.hubPath}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${this.content.serviceType} ${this.content.city}`,
          item: `https://ctrlshiftit.ca${this.content.canonicalPath}`,
        },
      ],
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
