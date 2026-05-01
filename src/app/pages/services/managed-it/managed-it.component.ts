import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

type FaqItem = { question: string; answer: string };

@Component({
  standalone: true,
  selector: 'app-managed-it',
  imports: [CommonModule, RouterModule],
  templateUrl: './managed-it.component.html',
  styleUrls: ['./managed-it.component.css']
})
export class ManagedItComponent implements AfterViewInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly SERVICE_SCHEMA_ID = 'managed-it-service-schema';
  private readonly BREADCRUMB_SCHEMA_ID = 'managed-it-breadcrumb';
  private readonly FAQ_SCHEMA_ID = 'managed-it-faq';
  private readonly HUB_ITEMLIST_SCHEMA_ID = 'managed-it-service-areas';

  readonly faqs: FaqItem[] = [
    {
      question: 'What is included in managed IT services?',
      answer:
        'Managed IT includes day-to-day helpdesk support, Microsoft 365 administration, endpoint protection oversight, backup monitoring, vendor coordination, onboarding and offboarding, patching, and quarterly planning. The goal is to own the operational IT layer so your team can focus on work rather than chasing IT issues.'
    },
    {
      question: 'How much does managed IT cost for a small business?',
      answer:
        'Pricing depends on user count, device count, platform complexity, and service scope. We scope engagements based on your actual environment rather than publishing a fixed rate that may not reflect your situation. The best starting point is a short conversation about your current setup and biggest recurring issues.'
    },
    {
      question: 'What is the difference between managed IT and IT support?',
      answer:
        'Reactive IT support fixes the issue in front of you — ticket by ticket, with limited ongoing ownership. Managed IT takes proactive responsibility for your environment: it includes support, but also security oversight, Microsoft 365 administration, backup monitoring, documentation, and planning. The goal is fewer incidents, not just faster resolution when they happen.'
    },
    {
      question: 'Do you include Microsoft 365 support?',
      answer:
        'Yes. Microsoft 365 administration is a core part of the service: user lifecycle management, mailbox and Teams settings, SharePoint access, MFA and Conditional Access, license management, anti-spoofing records, and account recovery. We treat Microsoft 365 as an operating environment, not just an email platform.'
    },
    {
      question: 'Do you include endpoint protection and security oversight?',
      answer:
        'Yes. Security is built into the operating model from the start: endpoint protection status, patch hygiene, MFA coverage, access hygiene, and backup confidence are reviewed continuously — not just during an incident. We surface security risk before it becomes a disruption.'
    },
    {
      question: 'Can you take over from another IT provider?',
      answer:
        'Yes. Transitions require care — we document what exists, identify what is working, and avoid disrupting systems that are already stable. The first 30 days focus on discovery and stabilization rather than changes for change sake.'
    },
    {
      question: 'Do you support hybrid or remote staff?',
      answer:
        'Yes. The service model is built around remote-first support: remote helpdesk, identity controls for home and office access, endpoint hygiene across device locations, and Microsoft 365 settings that work for hybrid teams.'
    },
    {
      question: 'Is this only for Vaughan businesses?',
      answer:
        'No. We work with small businesses across the GTA — Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill — and support remote and hybrid staff regardless of office location. Most day-to-day support and administration is handled remotely.'
    },
    {
      question: 'Do you work with businesses under 50 employees?',
      answer:
        'Yes — this is our primary focus. The service model is designed for 5–50 person businesses: professional offices, clinics, legal and accounting firms, and growing service companies that need practical IT ownership without a full internal IT department.'
    }
  ];

  constructor() {
    applyServicePageSeo(this.seo, {
      title: 'Managed IT Services for Small Businesses | CtrlShift IT',
      description:
        'Proactive managed IT for small businesses: support, Microsoft 365, endpoint protection, backup oversight, and IT planning for 5–50 person GTA offices.',
      canonicalPath: '/managed-it-services',
      serviceName: 'Managed IT Services',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });

    this.seo.setStructuredData(this.HUB_ITEMLIST_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Managed IT Service Areas',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Managed IT Services Vaughan', url: 'https://ctrlshiftit.ca/managed-it-services-vaughan' },
        { '@type': 'ListItem', position: 2, name: 'Managed IT Services Toronto', url: 'https://ctrlshiftit.ca/managed-it-services-toronto' },
        { '@type': 'ListItem', position: 3, name: 'Managed IT Services Mississauga', url: 'https://ctrlshiftit.ca/managed-it-services-mississauga' },
        { '@type': 'ListItem', position: 4, name: 'Managed IT Services Thornhill', url: 'https://ctrlshiftit.ca/managed-it-services-thornhill' },
        { '@type': 'ListItem', position: 5, name: 'Managed IT Services Richmond Hill', url: 'https://ctrlshiftit.ca/managed-it-services-richmond-hill' }
      ]
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://ctrlshiftit.ca/managed-it-services#faq',
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

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initAnimations();
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.HUB_ITEMLIST_SCHEMA_ID);
  }

  private async initAnimations(): Promise<void> {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      gsap.set('.mit-reveal, .mit-pillar, .mit-phase, .mit-tier', {
        y: 0,
        opacity: 1,
        clearProps: 'transform'
      });
      return;
    }

    ScrollTrigger.batch('.mit-reveal', {
      start: 'top 87%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.08 }
        );
      }
    });

    ScrollTrigger.batch('.mit-pillar', {
      start: 'top 84%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { y: 30, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
        );
      }
    });

    ScrollTrigger.batch('.mit-phase', {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 }
        );
      }
    });

    ScrollTrigger.batch('.mit-tier', {
      start: 'top 86%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.12 }
        );
      }
    });
  }
}
