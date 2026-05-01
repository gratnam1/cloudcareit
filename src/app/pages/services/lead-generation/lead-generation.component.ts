import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

type FaqItem = { question: string; answer: string };

@Component({
  standalone: true,
  selector: 'app-lead-generation',
  imports: [CommonModule, RouterModule],
  templateUrl: './lead-generation.component.html',
  styleUrls: ['./lead-generation.component.css']
})
export class LeadGenerationComponent implements AfterViewInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly SERVICE_SCHEMA_ID = 'service-lead-generation';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-lead-generation-breadcrumb';
  private readonly FAQ_SCHEMA_ID = 'service-lead-generation-faq';

  readonly faqs: FaqItem[] = [
    {
      question: 'Can you guarantee leads?',
      answer:
        'No — and anyone who does is not being honest with you. We improve the structure of your website, service pages, CTAs, forms, local SEO alignment, and follow-up process. These structural improvements reduce friction and improve conversion rates over time. They do not override market demand or guarantee a specific volume of inquiries.'
    },
    {
      question: 'Is this paid ads or SEO?',
      answer:
        'Neither, directly. This engagement focuses on improving what happens after a visitor arrives — service-page depth, CTA clarity, forms, landing-page structure, and follow-up. It works alongside both paid and organic traffic. If you also need SEO visibility work, we offer a separate SEO visibility service that pairs naturally with this one.'
    },
    {
      question: 'Do you build landing pages?',
      answer:
        'We review and plan landing-page structure as part of this engagement and provide specific recommendations. Actual build work is handled through our web development service. If both are needed, we typically scope them together so the plan and implementation are aligned from the start.'
    },
    {
      question: 'Can you improve an existing website?',
      answer:
        'Yes — most engagements start with an existing website. We review what is there, identify what is costing you inquiries, and produce a prioritized plan of improvements. We work with whatever platform you are on.'
    },
    {
      question: 'Do you help with tracking and forms?',
      answer:
        'Yes. Analytics and event tracking planning is a specific deliverable. We produce a tracking plan that covers which CTAs, forms, and pages should fire events, and what to measure in Google Analytics or equivalent. Form improvement recommendations — including qualifying question suggestions — are also included.'
    },
    {
      question: 'Is this only for Vaughan businesses?',
      answer:
        'No. We are based in the GTA and primarily work with small businesses in Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill, but lead-generation review engagements run remotely and are suitable for service-based small businesses anywhere in Ontario.'
    },
    {
      question: 'How does this connect to SEO visibility?',
      answer:
        'SEO visibility determines whether the right people find your site. Lead-generation structure determines whether they contact you once they arrive. Both need to work. Many engagements cover both together — we can scope them as a single review or as separate workstreams depending on where your biggest gaps are.'
    },
    {
      question: 'Do you do cold outreach or purchased lead lists?',
      answer:
        'No. We do not send cold emails, buy lead lists, do outbound prospecting, or run any form of unsolicited contact on your behalf. This engagement is entirely focused on improving inbound conversion — your existing traffic becomes better-qualified inquiries through structural improvements to your website and follow-up process.'
    }
  ];

  constructor() {
    applyServicePageSeo(this.seo, {
      title: 'Lead Generation Systems for SMBs | CtrlShift IT',
      description:
        'Turn website traffic into qualified inquiries with service pages, CTAs, forms, local SEO alignment, tracking, and follow-up workflows.',
      canonicalPath: '/lead-generation',
      serviceName: 'Lead Generation Systems',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://ctrlshiftit.ca/lead-generation#faq',
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
  }

  private async initAnimations(): Promise<void> {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      gsap.set('.lg-reveal, .lg-process-step', {
        y: 0,
        opacity: 1,
        clearProps: 'transform'
      });
      return;
    }

    ScrollTrigger.batch('.lg-reveal', {
      start: 'top 86%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.08 }
        );
      }
    });

    ScrollTrigger.batch('.lg-process-step', {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 }
        );
      }
    });
  }
}
