import { Component, AfterViewInit, OnInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';
import { GoogleReview, GoogleReviewsService } from './google-reviews.service';
import { HOME_SCHEMA_IDS, HOME_STRUCTURED_DATA } from './home.seo-data';

import { HeroSectionComponent } from './components/hero-section.component';
import { MarqueeSectionComponent } from './components/marquee-section.component';
import { StatsStripComponent } from './components/stats-strip.component';
import { ServicesGridComponent } from './components/services-grid.component';
import { LocationsSectionComponent } from './components/locations-section.component';
import { WhySwitchSectionComponent } from './components/why-switch-section.component';
import { CybersecuritySectionComponent } from './components/cybersecurity-section.component';
import { CaseStudiesSectionComponent } from './components/case-studies-section.component';
import { TeamSectionComponent } from './components/team-section.component';
import { AboutSectionComponent } from './components/about-section.component';
import { ReviewsSectionComponent } from './components/reviews-section.component';
import { RiskCalculatorSectionComponent } from './components/risk-calculator-section.component';
import { PricingSectionComponent } from './components/pricing-section.component';
import { FaqSectionComponent } from './components/faq-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    MarqueeSectionComponent,
    StatsStripComponent,
    ServicesGridComponent,
    LocationsSectionComponent,
    WhySwitchSectionComponent,
    CybersecuritySectionComponent,
    CaseStudiesSectionComponent,
    TeamSectionComponent,
    AboutSectionComponent,
    ReviewsSectionComponent,
    RiskCalculatorSectionComponent,
    PricingSectionComponent,
    FaqSectionComponent,
    ConsultationSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private seo = inject(SeoService);
  private router = inject(Router);
  private googleReviewsService = inject(GoogleReviewsService);
  private document = inject(DOCUMENT);

  reviewLink = 'https://maps.app.goo.gl/AHmLpmKhG88S54d37';
  reviewAggregateRating = 5;
  reviewAggregateCount = 0;
  reviewItems: GoogleReview[] = [];
  prefersReducedMotion = false;
  private destroyCallbacks: Array<() => void> = [];

  ngOnInit() {
    this.prefersReducedMotion = isPlatformBrowser(this.platformId) 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;

    this.seo.update({
      title: 'Managed IT Services in Vaughan & Scarborough | CtrlShift IT Services',
      description: 'CtrlShift IT Services provides enterprise-grade Managed IT, Cloud Infrastructure, and DevOps support for small businesses in Vaughan and Scarborough.',
      type: 'website',
      canonicalPath: '/'
    });

    // Load structured data from external file
    this.seo.setStructuredData(HOME_SCHEMA_IDS.LOCAL_BUSINESS, HOME_STRUCTURED_DATA.LOCAL_BUSINESS);
    this.seo.setStructuredData(HOME_SCHEMA_IDS.OFFER_CATALOG, HOME_STRUCTURED_DATA.OFFER_CATALOG);
    this.seo.setStructuredData(HOME_SCHEMA_IDS.FAQ, HOME_STRUCTURED_DATA.FAQ);
    this.seo.setStructuredData(HOME_SCHEMA_IDS.SPEAKABLE, HOME_STRUCTURED_DATA.SPEAKABLE);
    this.seo.setStructuredData(HOME_SCHEMA_IDS.HOWTO, HOME_STRUCTURED_DATA.HOWTO);
    this.seo.setStructuredData(HOME_SCHEMA_IDS.ORGANIZATION, HOME_STRUCTURED_DATA.ORGANIZATION);
    this.seo.setStructuredData(HOME_SCHEMA_IDS.SERVICE_AREA, HOME_STRUCTURED_DATA.SERVICE_AREA);

    this.loadGoogleReviews();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initGlobalAnimations();
      
      const fragment = this.getCurrentFragment();
      if (fragment) {
        setTimeout(() => this.queueFragmentScroll(fragment), 500);
      }
    }
  }

  ngOnDestroy() {
    this.destroyCallbacks.forEach(fn => fn());
  }

  private async initGlobalAnimations() {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    if (this.prefersReducedMotion) {
      this.document.querySelectorAll('.reveal-section').forEach(el => el.classList.add('revealed'));
      return;
    }

    // Reveal sections (fade in when in view)
    ScrollTrigger.batch('.reveal-section', {
      start: 'top 92%',
      onEnter: batch => {
        gsap.to(batch, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        batch.forEach((el: Element) => el.classList.add('revealed'));
      }
    });
  }

  private loadGoogleReviews() {
    const reviewsSub = this.googleReviewsService.getReviews().subscribe((payload) => {
      this.reviewLink = payload.googleMapsUrl?.trim() || this.reviewLink;
      this.reviewAggregateRating = Number.isFinite(payload.rating) ? payload.rating : 5;
      this.reviewAggregateCount = Number.isFinite(payload.userRatingsTotal) ? payload.userRatingsTotal : 0;
      this.reviewItems = payload.reviews.length > 0 ? payload.reviews : [];

      if (this.reviewAggregateCount > 0) {
        this.seo.setStructuredData(HOME_SCHEMA_IDS.AGGREGATE_RATING, {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'CtrlShift IT Services',
          url: 'https://ctrlshiftit.ca/',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: this.reviewAggregateRating.toFixed(1),
            reviewCount: this.reviewAggregateCount,
            bestRating: '5',
            worstRating: '1'
          }
        });
      }
      this.cdr.detectChanges();
    });
    this.destroyCallbacks.push(() => reviewsSub.unsubscribe());
  }

  private getCurrentFragment(): string | null {
    const routerFragment = this.router.parseUrl(this.router.url).fragment;
    if (routerFragment) return routerFragment;
    const hash = this.document.location.hash;
    return hash ? hash.replace('#', '') : null;
  }

  private queueFragmentScroll(fragment: string | null) {
    if (!fragment) return;
    const behavior: ScrollBehavior = this.prefersReducedMotion ? 'auto' : 'smooth';
    const target = this.document.getElementById(fragment);
    if (target) {
      target.scrollIntoView({ behavior, block: 'start' });
    }
  }
}
