import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

type FaqItem = { question: string; answer: string };

@Component({
  standalone: true,
  selector: 'app-seo-visibility',
  imports: [CommonModule, RouterModule],
  templateUrl: './seo-visibility.component.html',
  styleUrls: ['./seo-visibility.component.css']
})
export class SeoVisibilityComponent implements AfterViewInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly SERVICE_SCHEMA_ID = 'service-seo-visibility';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-seo-visibility-breadcrumb';
  private readonly FAQ_SCHEMA_ID = 'service-seo-visibility-faq';

  readonly faqs: FaqItem[] = [
    {
      question: 'Can you guarantee first-page rankings on Google?',
      answer:
        'No — and any agency that does is not telling you the truth. Google controls ranking and indexing. We focus on practical improvements (technical SEO, local SEO, Google Business Profile, content depth, internal linking, schema) that historically move qualified search visibility for small businesses, then measure honestly over time.'
    },
    {
      question: 'Do you work on Google Business Profile?',
      answer:
        'Yes. GBP is one of the highest-leverage areas for service-based small businesses. We review categories, services, attributes, hours, photos, posts, products, and review velocity, and recommend a concrete list of improvements. We do not buy, fake, or gate reviews.'
    },
    {
      question: 'Can you help with pages that are indexed but not performing?',
      answer:
        'Yes. We review the page against the actual buyer query — intent fit, content depth, structure, internal links, schema, page speed — and recommend specific changes. Often the page is already indexed and just needs to match real intent more closely than competing pages do.'
    },
    {
      question: 'Do you write SEO content?',
      answer:
        'We focus on structure, intent fit, and recommendations rather than producing volume. We will outline section structure, FAQs, and key talking points, and we can write or edit specific high-value pages. We will not run a content mill or publish low-quality pages just to fill a calendar.'
    },
    {
      question: 'How long does SEO take to show results?',
      answer:
        'Honestly, months — not days. Technical fixes can show up in Search Console quickly, but ranking and traffic movement is usually measured over 90 days and beyond. Anyone promising instant results is either misleading you or doing something that will hurt long-term.'
    },
    {
      question: 'Do you build backlinks?',
      answer:
        'We do not run paid link schemes, private blog networks, link exchanges, or any other tactic that violates Google\'s spam policies. We will help you earn links the safe way — through useful content, genuine partnerships, and real local citations.'
    },
    {
      question: 'Is this service only for Vaughan businesses?',
      answer:
        'No. We are based in the GTA and primarily work with small businesses in Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill, but visibility engagements run remotely and are suitable for service-based small businesses anywhere in Ontario.'
    },
    {
      question: 'Can you fix technical SEO on Angular websites?',
      answer:
        'Yes. We work on Angular sites every day, including this one. We understand prerendering, route-level metadata, canonical handling, structured data, and the practical differences between Angular SSR, prerendering, and SPA rendering modes that often trip up search visibility.'
    }
  ];

  constructor() {
    applyServicePageSeo(this.seo, {
      title: 'SEO Visibility Services Vaughan | CtrlShift IT Services',
      description:
        'Improve local SEO, Google Business Profile, technical SEO, indexing, content depth, and internal links for small business websites in the GTA.',
      canonicalPath: '/seo-visibility',
      serviceName: 'SEO Visibility Services',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://ctrlshiftit.ca/seo-visibility#faq',
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
      gsap.set('.seo-reveal, .seo-stack-layer, .seo-process-step', {
        y: 0,
        opacity: 1,
        clearProps: 'transform'
      });
      return;
    }

    ScrollTrigger.batch('.seo-reveal', {
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

    ScrollTrigger.batch('.visibility-stack-layer', {
      start: 'top 84%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 }
        );
      }
    });

    ScrollTrigger.batch('.seo-process-step', {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.1 }
        );
      }
    });
  }
}
