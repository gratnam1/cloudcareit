import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

type FaqItem = { question: string; answer: string };

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
  private readonly FAQ_SCHEMA_ID = 'service-security-baseline-assessment-faq';

  readonly faqs: FaqItem[] = [
    {
      question: 'Is a security baseline assessment the same as a penetration test?',
      answer:
        'No. A penetration test actively tries to exploit a system. A security baseline assessment is a structured review of practical IT and security controls — Microsoft 365 identity, endpoints, backups, firewall and remote access, and cyber insurance readiness — and produces a plain-English findings summary and prioritized action plan.',
    },
    {
      question: 'Can this assessment help with our cyber insurance application or renewal?',
      answer:
        'It can help you identify the technical controls insurers commonly ask about — MFA, EDR, backups, admin separation, incident response — and document where you stand today. It does not guarantee coverage, premium reduction, or claim approval. Underwriting decisions are made by the insurer, not by us.',
    },
    {
      question: 'Do you need admin access to our systems to do the assessment?',
      answer:
        'For most reviews we need read-level visibility into your Microsoft 365 tenant, endpoint protection console, backup tool, and firewall. Where read-only access is not possible, we walk through configuration with your team on a screen-share. We never install persistent tooling without explicit written approval.',
    },
    {
      question: 'How long does the assessment take?',
      answer:
        'A typical small-business security baseline assessment runs over a few business days end-to-end, depending on scope and how quickly we can get the access we need. Most of that time is configuration review on our side, not interviews with your team.',
    },
    {
      question: 'What do we receive at the end?',
      answer:
        'You receive a plain-English findings summary, a prioritized remediation checklist (fix-now / soon / later), Microsoft 365 hardening notes, an endpoint protection gap list, backup and restore readiness notes, firewall and remote access observations, optional cyber insurance readiness notes, and a short next-step roadmap.',
    },
    {
      question: 'Can you also fix the issues you find?',
      answer:
        'Yes. We can implement remediations directly, hand the plan to your existing IT provider, or fold the work into one of our managed IT plans. The assessment is useful on its own — there is no requirement to engage us for ongoing services.',
    },
    {
      question: 'Is this only for Vaughan businesses?',
      answer:
        'No. We are based in the GTA and primarily work with small businesses in Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill, but the assessment runs remotely and is suitable for small offices anywhere in Ontario.',
    },
  ];

  constructor() {
    applyServicePageSeo(this.seo, {
      title: 'Security Baseline Assessment for SMBs | CtrlShift IT Services',
      description:
        'Find Microsoft 365, endpoint, backup, firewall, and cyber insurance readiness gaps with a practical security baseline assessment for small businesses.',
      canonicalPath: '/services/security-baseline-assessment',
      serviceName: 'Security Baseline Assessment',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID,
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://ctrlshiftit.ca/services/security-baseline-assessment#faq',
      mainEntity: this.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
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
