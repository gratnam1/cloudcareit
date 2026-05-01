import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

type FaqItem = { question: string; answer: string };

@Component({
  standalone: true,
  selector: 'app-web-development',
  imports: [CommonModule, RouterModule],
  templateUrl: './web-development.component.html',
  styleUrls: ['./web-development.component.css']
})
export class WebDevelopmentComponent implements AfterViewInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly SERVICE_SCHEMA_ID = 'service-web-development';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-web-development-breadcrumb';
  private readonly FAQ_SCHEMA_ID = 'service-web-development-faq';

  readonly faqs: FaqItem[] = [
    {
      question: 'Do you build websites for small businesses?',
      answer:
        'Yes — this service is specifically designed for service businesses with roughly 5–50 staff that need a professional website built around service-page depth, local SEO foundations, strong CTAs, and a structure that can support ongoing visibility and lead generation. We focus on practical, maintainable builds rather than template sites or design-only work.'
    },
    {
      question: 'Can you improve an existing website?',
      answer:
        'Yes — most engagements start with an existing website. We review what is there, identify what is costing you in search visibility and conversions, and produce a prioritized plan of improvements. We can work with whatever platform and codebase you are on, or rebuild from scratch where that is the more practical path.'
    },
    {
      question: 'Will a new website guarantee rankings or leads?',
      answer:
        'No — and anyone who claims otherwise is not being honest with you. A stronger website foundation improves the conditions for SEO visibility and lead generation by ensuring your pages are structured correctly, technically sound, and clear to visitors. It does not override market demand or guarantee a specific volume of search rankings or inquiries.'
    },
    {
      question: 'Do you include SEO basics?',
      answer:
        'Yes — technical SEO basics are part of every web development engagement: route-level meta tags, title tags, canonical URLs, sitemap configuration, and schema markup are all reviewed and set up. For deeper SEO work — content strategy, local visibility, and ongoing ranking improvement — our dedicated SEO visibility service covers those areas in more depth.'
    },
    {
      question: 'Can you connect the website to lead generation?',
      answer:
        'Yes. Service-specific inquiry forms, qualifying CTAs, and analytics event tracking are part of the web development engagement. For a full lead-generation review — including service-page conversion strategy, CTA optimization, form design, and follow-up workflows — we offer a separate lead generation service that builds directly on the website foundation work.'
    },
    {
      question: 'Do you build WordPress sites or Angular/static sites?',
      answer:
        'It depends on the business requirements and the existing technology stack. We have experience with both WordPress and modern Angular/static site builds. For small service businesses that need fast load times, strong security defaults, and low maintenance overhead, a static or lightweight Angular build is often the better long-term choice — but we scope each engagement based on the specific situation.'
    },
    {
      question: 'Is this only for Vaughan businesses?',
      answer:
        'No. We are based in the GTA and primarily work with small businesses in Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill, but web development engagements run remotely and are suitable for service-based small businesses anywhere in Ontario.'
    }
  ];

  constructor() {
    applyServicePageSeo(this.seo, {
      title: 'Web Development for Small Businesses | CtrlShift IT',
      description:
        'Build a faster, clearer small-business website with service pages, technical SEO basics, CTAs, forms, and conversion-focused structure.',
      canonicalPath: '/web-development',
      serviceName: 'Web Development Services',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://ctrlshiftit.ca/web-development#faq',
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
      gsap.set('.wd-reveal, .wd-process-step', {
        y: 0,
        opacity: 1,
        clearProps: 'transform'
      });
      return;
    }

    ScrollTrigger.batch('.wd-reveal', {
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

    ScrollTrigger.batch('.wd-process-step', {
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
