import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-security-baseline-assessment',
  imports: [CommonModule, RouterModule],
  templateUrl: './security-baseline-assessment.component.html',
  styleUrls: ['./security-baseline-assessment.component.css'],
})
export class SecurityBaselineAssessmentComponent implements AfterViewInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly SERVICE_SCHEMA_ID = 'service-security-baseline-assessment';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-security-baseline-assessment-breadcrumb';

  constructor() {
    applyServicePageSeo(this.seo, {
      title: 'Security Baseline Assessment for Professional Offices',
      description:
        'Identify ransomware, Microsoft 365, endpoint, identity, and backup risks in under 48 hours with a structured security baseline assessment for Ontario professional offices.',
      canonicalPath: '/services/security-baseline-assessment',
      serviceName: 'Security Baseline Assessment',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID,
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initAnimations();
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }

  private async initAnimations(): Promise<void> {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      gsap.set('.baseline-reveal, .baseline-stack-layer, .baseline-process-step', {
        y: 0,
        opacity: 1,
        clearProps: 'transform',
      });
      return;
    }

    ScrollTrigger.batch('.baseline-reveal', {
      start: 'top 86%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.08 }
        );
      },
    });

    ScrollTrigger.batch('.baseline-stack-layer', {
      start: 'top 84%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 }
        );
      },
    });

    ScrollTrigger.batch('.baseline-process-step', {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.1 }
        );
      },
    });
  }
}
