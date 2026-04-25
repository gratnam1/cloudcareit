import { Component, OnDestroy, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';
import {
  SecurityStarterGuide,
  findSecurityGuideBySlug,
  findSecurityHubBySlug
} from '../security-guide-data';

const BASE_URL = 'https://ctrlshiftit.ca';

@Component({
  standalone: true,
  selector: 'app-security-starter-guide',
  imports: [CommonModule, RouterModule],
  templateUrl: './security-starter-guide.component.html',
  styleUrls: ['./security-starter-guide.component.css']
})
export class SecurityStarterGuideComponent implements OnDestroy, AfterViewInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  readonly guide: SecurityStarterGuide;
  readonly hub = findSecurityHubBySlug(this.route.snapshot.paramMap.get('subcategory'));
  readonly categoryLabel: string;
  readonly supportingIntro: string;
  readonly articleMetadata: ReadonlyArray<{ label: string; value: string }>;
  readonly guideSections: ReadonlyArray<{ label: string; fragment: string; icon: string }>;

  private readonly ARTICLE_SCHEMA_ID: string;
  private readonly BREADCRUMB_SCHEMA_ID: string;
  private readonly FAQ_SCHEMA_ID: string;
  private scrollHandler?: () => void;

  constructor() {
    const subcategory = this.route.snapshot.paramMap.get('subcategory');
    const guideSlug = this.route.snapshot.paramMap.get('guideSlug');
    const guide = findSecurityGuideBySlug(subcategory, guideSlug);

    if (!guide || !this.hub) {
      throw new Error(`Unknown security guide: ${subcategory}/${guideSlug}`);
    }

    this.guide = guide;
    this.categoryLabel = this.hub.breadcrumbLabel;
    this.supportingIntro =
      guide.intro[1] ??
      'Use this guide to understand the practical business impact, warning signs, and controls that matter most for small teams.';
    this.articleMetadata = [
      { label: 'Estimated reading time', value: '8 minutes' },
      { label: 'Primary systems', value: this.findFactValue('Primary target') },
      {
        label: 'Who this guide is for',
        value:
          'Small-business owners, office managers, clinics, law firms, accounting firms, consultants, and IT decision-makers with 5-50 employees.'
      },
      { label: 'Last reviewed', value: this.findFactValue('Last reviewed') }
    ];
    this.guideSections = this.buildGuideSections();
    this.ARTICLE_SCHEMA_ID = `guide-${guide.hubSlug}-${guide.slug}-article`;
    this.BREADCRUMB_SCHEMA_ID = `guide-${guide.hubSlug}-${guide.slug}-breadcrumb`;
    this.FAQ_SCHEMA_ID = `guide-${guide.hubSlug}-${guide.slug}-faq`;

    this.seo.update({
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: 'article',
      canonicalPath: guide.path
    });

    this.seo.setStructuredData(this.ARTICLE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${BASE_URL}${guide.path}`,
      url: `${BASE_URL}${guide.path}`,
      headline: guide.title,
      description: guide.metaDescription,
      inLanguage: 'en-CA',
      isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
      publisher: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        url: BASE_URL
      }
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
          name: this.hub.breadcrumbLabel,
          item: `${BASE_URL}${this.hub.path}`
        },
        { '@type': 'ListItem', position: 5, name: guide.title, item: `${BASE_URL}${guide.path}` }
      ]
    });

    if (guide.faqs?.length) {
      this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a
          }
        }))
      });
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initReadingProgress();
    this.initRevealAnimation();
  }

  private findFactValue(label: string): string {
    return this.guide.facts.find((fact) => fact.label === label)?.value ?? 'Small business security controls';
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
    this.scrollHandler();
  }

  private buildGuideSections(): ReadonlyArray<{ label: string; fragment: string; icon: string }> {
    const sections = [
      { label: this.guide.whatItMeans.title, fragment: this.guide.whatItMeans.id, icon: this.guide.whatItMeans.icon },
      { label: this.guide.businessImpact.title, fragment: this.guide.businessImpact.id, icon: this.guide.businessImpact.icon },
      this.guide.diagram ? { label: this.guide.diagram.title, fragment: 'concept-diagram', icon: 'bi-diagram-3' } : null,
      this.guide.howAttackStarts ? { label: this.guide.howAttackStarts.title, fragment: this.guide.howAttackStarts.id, icon: this.guide.howAttackStarts.icon } : null,
      this.guide.attackerGoals?.length ? { label: 'Attacker goals', fragment: 'attacker-goals', icon: 'bi-bullseye' } : null,
      this.guide.smallBusinessScenario ? { label: 'Small-business scenario', fragment: this.guide.smallBusinessScenario.id, icon: this.guide.smallBusinessScenario.icon } : null,
      { label: 'Warning signs', fragment: 'warning-signs', icon: 'bi-exclamation-circle' },
      this.guide.signalsToCheck?.length ? { label: 'Signals to check', fragment: 'signals-to-check', icon: 'bi-clipboard-data' } : null,
      this.guide.firstSteps?.length ? { label: 'What to do first', fragment: 'what-to-do-first', icon: 'bi-list-check' } : null,
      { label: 'Reduce the risk', fragment: 'reduce-risk', icon: 'bi-shield-check' },
      this.guide.commonMistakes?.length ? { label: 'Common mistakes', fragment: 'common-mistakes', icon: 'bi-cone-striped' } : null,
      { label: 'Review checklist', fragment: 'ctrlshift-checks', icon: 'bi-search' },
      this.guide.faqs?.length ? { label: 'FAQ', fragment: 'faq', icon: 'bi-question-circle' } : null
    ];

    return sections.filter((section): section is { label: string; fragment: string; icon: string } => section !== null);
  }

  private async initRevealAnimation(): Promise<void> {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.guide-reveal'));

    if (reduceMotion || targets.length === 0) {
      targets.forEach((target) => target.classList.add('guide-reveal-ready'));
      return;
    }

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(targets, { autoAlpha: 0, y: 22 });
    targets.forEach((target) => {
      gsap.to(target, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: target,
          start: 'top 84%',
          once: true
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.ARTICLE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    if (isPlatformBrowser(this.platformId) && this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }
}
