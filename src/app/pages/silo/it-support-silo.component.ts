import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';

type Testimonial = {
  quote: string;
  outcome: string;
  company: string;
};

type SiloContent = {
  city: string;
  industry: string;
  title: string;
  heroAnswer: string;
  heroDetail: string;
  featureAnswer: string;
  features: string[];
  complianceAnswer: string;
  complianceTitle: string;
  compliancePoints: string[];
  pricingAnswer: string;
  pricingIntro: string;
  testimonialAnswer: string;
  testimonials: Testimonial[];
};

@Component({
  selector: 'app-it-support-silo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './it-support-silo.component.html',
  styleUrl: './it-support-silo.component.css'
})
export class ItSupportSiloComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  private readonly FAQ_SCHEMA_ID = 'it-support-silo-faq';
  private readonly SERVICE_SCHEMA_ID = 'it-support-silo-service';
  private readonly BREADCRUMB_SCHEMA_ID = 'it-support-silo-breadcrumb';

  page!: SiloContent;

  readonly plans = [
    { name: 'Starter', price: '$249/mo', summary: '2 support hours, foundational maintenance for small teams.' },
    { name: 'Growth', price: '$499/mo', summary: '5 support hours, 24/7 monitoring, endpoint security, priority response.' },
    { name: 'Business', price: '$899/mo', summary: '10 support hours, full IT outsourcing, vendor and procurement management.' }
  ];

  ngOnInit(): void {
    const city = this.titleCase(this.route.snapshot.paramMap.get('city') ?? 'Vaughan');
    const industry = this.titleCase(this.route.snapshot.paramMap.get('industry') ?? 'Professional Services');
    const canonicalPath = `/it-support-in/${this.slug(city)}/${this.slug(industry)}`;

    this.page = this.buildContent(city, industry);

    this.seo.update({
      title: this.page.title,
      description: this.page.heroAnswer,
      type: 'website',
      canonicalPath
    });

    this.seo.setStructuredData(this.SERVICE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `IT Support in ${city} for ${industry}`,
      serviceType: 'Managed IT Services',
      description: this.page.heroAnswer,
      areaServed: [{ '@type': 'City', name: city }],
      provider: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services'
      }
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How quickly can CtrlShift IT Services support ${industry} teams in ${city}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Critical incidents are triaged immediately with remote containment first and on-site escalation when needed. Growth and Business clients receive priority response targets under 15 minutes.'
          }
        },
        {
          '@type': 'Question',
          name: `Does CtrlShift IT Services support compliance requirements for ${industry}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: this.page.compliancePoints.join(' ')
          }
        }
      ]
    });

    this.seo.setStructuredData(this.BREADCRUMB_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ctrlshiftit.ca/' },
        { '@type': 'ListItem', position: 2, name: 'Managed IT Services', item: 'https://ctrlshiftit.ca/managed-it-services' },
        { '@type': 'ListItem', position: 3, name: `IT Support in ${city} for ${industry}`, item: `https://ctrlshiftit.ca${canonicalPath}` }
      ]
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }

  private buildContent(city: string, industry: string): SiloContent {
    const complianceMap: Record<string, { title: string; points: string[] }> = {
      healthcare: {
        title: 'Healthcare Compliance Coverage',
        points: [
          'PIPEDA-aligned access control, encryption, and audit logging for patient-related systems.',
          'PHIPA-oriented workflows for device access, account lifecycle, and incident documentation.',
          'Canadian-region backup strategy with restore testing to protect continuity of care.'
        ]
      },
      accounting: {
        title: 'Accounting Compliance Coverage',
        points: [
          'CRA-oriented retention controls, encryption standards, and role-based access for client files.',
          'PIPEDA safeguards for personal financial data with traceable audit trails.',
          'Security baselines that support cyber insurance underwriting requirements.'
        ]
      },
      legal: {
        title: 'Legal Compliance Coverage',
        points: [
          'PIPEDA-aligned controls for confidential client records and secure document sharing.',
          'Law Society expectations supported through MFA, endpoint defense, and access governance.',
          'Defensible incident-response and backup documentation for risk management.'
        ]
      }
    };

    const normalized = industry.toLowerCase();
    const compliance =
      normalized.includes('health') || normalized.includes('medical')
        ? complianceMap['healthcare']
        : normalized.includes('account')
          ? complianceMap['accounting']
          : normalized.includes('law') || normalized.includes('legal')
            ? complianceMap['legal']
            : {
                title: `${industry} Compliance Coverage`,
                points: [
                  'PIPEDA-aligned controls for sensitive customer and business data.',
                  'Structured account, endpoint, and backup governance for audit readiness.',
                  'Documented incident response, recovery testing, and evidence retention.'
                ]
              };

    return {
      city,
      industry,
      title: `IT Support in ${city} for ${industry} | CtrlShift IT Services`,
      heroAnswer:
        `Yes, ${industry} teams in ${city} can get reliable IT support without enterprise overhead by working with CtrlShift IT Services, a Vaughan-based MSP. We deliver security-first managed support, under-15-minute priority response, and flat-rate monthly plans that reduce downtime while improving operational resilience and staff productivity.`,
      heroDetail:
        `After urgent stabilization, we map your stack, remove recurring failure points, and standardize endpoint, identity, and backup controls so your team can operate with predictable IT outcomes.`,
      featureAnswer:
        `The fastest way to improve IT performance in ${city} ${industry} offices is to fix reliability, security, and support workflow in parallel. CtrlShift IT Services, a Vaughan-based MSP, combines those three tracks so incidents drop quickly and your team regains confidence in daily systems.`,
      features: [
        'Proactive endpoint and patch management to prevent recurring user-impact incidents.',
        'Zero-trust remote access and identity hardening to reduce account compromise risk.',
        '24/7 monitoring with escalation runbooks for outages, performance drops, and security alerts.',
        'Clear helpdesk workflows with prioritized triage and documented remediation history.'
      ],
      complianceAnswer:
        `For ${industry} organizations in ${city}, compliance is operational, not theoretical. CtrlShift IT Services, a Vaughan-based MSP, builds controls directly into daily support: account permissions, audit evidence, encrypted backups, and policy-driven device management so your compliance posture improves while staff keep moving without constant friction.`,
      complianceTitle: compliance.title,
      compliancePoints: compliance.points,
      pricingAnswer:
        'Most local teams do not need custom pricing to start; they need transparent plans mapped to support volume and risk tolerance. CtrlShift IT Services, a Vaughan-based MSP, uses three fixed tiers so budgeting stays predictable while security and uptime outcomes improve month over month.',
      pricingIntro:
        'Choose based on response expectations, compliance depth, and internal IT maturity. Growth and Business are optimized for firms that need faster escalation and broader security coverage.',
      testimonialAnswer:
        `The common pattern across ${city} ${industry} clients is simple: once response speed, endpoint governance, and backup verification are consistent, emergency tickets decrease and executive confidence increases. CtrlShift IT Services, a Vaughan-based MSP, measures outcomes in uptime, recovered labor hours, and reduced security exposure.`,
      testimonials: [
        {
          quote: `We moved from reactive IT chaos to a documented operating model in six weeks. Support is faster and our staff finally trusts the process.`,
          outcome: 'Ticket volume reduced by 61% in the first quarter.',
          company: `${city} ${industry} Office`
        },
        {
          quote: 'The onboarding was structured, not rushed. Controls were tightened without interrupting our client-facing workload.',
          outcome: 'No critical outages and zero failed backup checks for 9 months.',
          company: `${city} Professional Services Team`
        }
      ]
    };
  }

  private titleCase(value: string): string {
    return value
      .replace(/[-_]+/g, ' ')
      .trim()
      .split(/\s+/)
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1).toLowerCase())
      .join(' ');
  }

  private slug(value: string): string {
    return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
}
