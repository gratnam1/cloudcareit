import { Component, AfterViewInit, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';
import { GoogleReview, GoogleReviewsService } from './google-reviews.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' // Note: Angular 17+ uses 'styleUrl' (singular)
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly formSubmitTimeoutMs = 20000;
  submitted = false;
  isLoading = false;
  errorMessage: string | null = null;
  readonly starScale = [1, 2, 3, 4, 5];
  reviewPlaceName = 'CtrlShift IT Services';
  reviewLink = 'https://share.google/cqXMO05MSN5gKLdCT';
  reviewAggregateRating = 5;
  reviewAggregateCount = 0;
  reviewItems: GoogleReview[] = [];
  reviewsConfigured = false;
  reviewsSource: 'google' | 'fallback' = 'fallback';
  reviewsError: string | null = null;
  private destroyCallbacks: Array<() => void> = [];
  private prefersReducedMotion = false;
  private viewReady = false;
  private pendingFragment: string | null = null;
  private readonly LOCAL_BUSINESS_SCHEMA_ID = 'local-business-home';
  private readonly OFFER_CATALOG_SCHEMA_ID = 'offer-catalog-home';
  private readonly FAQ_SCHEMA_ID = 'faq-home';
  private readonly AGGREGATE_RATING_SCHEMA_ID = 'aggregate-rating-home';
  private readonly SPEAKABLE_SCHEMA_ID = 'speakable-home';
  private readonly HOWTO_SCHEMA_ID = 'howto-onboarding';
  private readonly ORGANIZATION_SCHEMA_ID = 'organization-home';
  private readonly SERVICE_AREA_SCHEMA_ID = 'service-area-home';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private seo: SeoService,
    private router: Router,
    private zone: NgZone,
    private googleReviewsService: GoogleReviewsService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.seo.update({
      title: 'Managed IT Services in Vaughan & Scarborough | CtrlShift IT Services',
      description: 'CtrlShift IT Services provides enterprise-grade Managed IT, Cloud Infrastructure, and DevOps support for small businesses in Vaughan and Scarborough. Led by Kannan with 15+ years of experience.',
      type: 'website',
      canonicalPath: '/'
    });

    this.seo.setStructuredData(this.LOCAL_BUSINESS_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://ctrlshiftit.ca/#localbusiness',
      name: 'CtrlShift IT Services',
      image: 'https://ctrlshiftit.ca/favicon.svg',
      url: 'https://ctrlshiftit.ca/',
      telephone: '+1-416-624-4841',
      email: 'info@ctrlshiftit.ca',
      priceRange: '$$',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: '46 Ohr Maneachem Way',
          addressLocality: 'Vaughan',
          addressRegion: 'ON',
          addressCountry: 'CA'
        },
        {
          '@type': 'PostalAddress',
          streetAddress: '27 Carisbrooke Sq',
          addressLocality: 'Scarborough',
          addressRegion: 'ON',
          addressCountry: 'CA'
        }
      ],
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.8372,
        longitude: -79.5083
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      areaServed: [
        { '@type': 'City', name: 'Vaughan' },
        { '@type': 'City', name: 'Scarborough' },
        { '@type': 'City', name: 'Toronto' },
        { '@type': 'City', name: 'Mississauga' },
        { '@type': 'City', name: 'Thornhill' },
        { '@type': 'City', name: 'Richmond Hill' }
      ],
      sameAs: [
        'https://www.linkedin.com/company/ctrlshift-it-services',
        'https://www.facebook.com/ctrlshiftit'
      ],
      knowsAbout: [
        'Managed IT services',
        'Cybersecurity',
        'Endpoint detection and response',
        'Network firewall security',
        'Zero-trust remote access',
        'Microsoft 365 administration',
        'Google Workspace administration',
        'AWS cloud infrastructure',
        'Huntress',
        'Fortinet',
        'Tailscale'
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Managed IT Services for B2B Professional Offices',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'Industries Served',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Support for Law Firms' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Support for Accounting Firms' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Support for Medical Clinics' } }
            ]
          },
          {
            '@type': 'OfferCatalog',
            name: 'Core Security Stack',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Huntress AI-assisted endpoint detection' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fortinet network firewall security' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tailscale zero-trust secure access' } }
            ]
          }
        ]
      }
    });

    this.seo.setStructuredData(this.OFFER_CATALOG_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      '@id': 'https://ctrlshiftit.ca/#managed-it-pricing',
      name: 'Managed IT Support Plans',
      url: 'https://ctrlshiftit.ca/#pricing',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Starter',
          url: 'https://ctrlshiftit.ca/#pricing',
          category: 'Managed IT Support Plan',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '249',
            priceCurrency: 'CAD',
            billingDuration: 1,
            billingIncrement: 1,
            unitCode: 'MON'
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Starter Managed IT Support',
            description: '2 support hours per month, basic maintenance. Does not include 24/7 monitoring, endpoint protection, backup monitoring, network monitoring, priority response, or 30-day risk-free trial.'
          }
        },
        {
          '@type': 'Offer',
          name: 'Growth',
          url: 'https://ctrlshiftit.ca/#pricing',
          category: 'Managed IT Support Plan',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '499',
            priceCurrency: 'CAD',
            billingDuration: 1,
            billingIncrement: 1,
            unitCode: 'MON'
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Growth Managed IT Support',
            description: '5 support hours per month, 24/7 monitoring, endpoint protection, backup monitoring, patch management, Microsoft 365 support, network monitoring, priority response under 15 minutes, quarterly vulnerability scan, and 30-day risk-free trial.'
          }
        },
        {
          '@type': 'Offer',
          name: 'Business',
          url: 'https://ctrlshiftit.ca/#pricing',
          category: 'Managed IT Support Plan',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '899',
            priceCurrency: 'CAD',
            billingDuration: 1,
            billingIncrement: 1,
            unitCode: 'MON'
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Business Managed IT Support',
            description: '10 support hours per month, full IT department outsourcing, 24/7 monitoring, endpoint protection, backup monitoring, patch management, Microsoft 365 support, network monitoring, priority response under 15 minutes, quarterly vulnerability scan, hardware procurement, vendor management, and 30-day risk-free trial.'
          }
        }
      ]
    });

    // FAQPage structured data for home page FAQs (exactly from visible FAQ copy)
    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://ctrlshiftit.ca/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the 30-Day Guarantee work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For the Growth or Business plan, if the first 30 days do not deliver a clear stability improvement, you can cancel with no penalty. You get transparent monthly pricing, no hidden fees, and no surprise invoices.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can you take over from our current IT provider?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We run a structured transition covering credentials, tenant access, asset inventory, backup validation, and support handoff. The goal is a clean takeover with minimal disruption to your staff.'
          }
        },
        {
          '@type': 'Question',
          name: 'How fast do you respond when something breaks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Urgent production-impact incidents are triaged immediately, with remote-first response and on-site escalation when required. Growth and Business clients receive response within 15 minutes.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much does managed IT support cost in Vaughan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CtrlShift IT Services offers three flat-rate plans: Starter at $249/month with 2 support hours, Growth at $499/month with 5 hours and priority response, and Business at $899/month with 10 hours and full IT department outsourcing. All pricing is transparent with no hidden fees.'
          }
        },
        {
          '@type': 'Question',
          name: 'What cities do you provide IT support in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We provide managed IT services across the Greater Toronto Area: Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill. Our technicians offer both remote support and on-site visits throughout York Region, Peel Region, and the downtown Toronto core.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do you support both Google Workspace and Microsoft 365?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We are certified administrators for both platforms. We manage user accounts, email security, shared drive permissions, data retention policies, and device access controls for Google Workspace and Microsoft 365 environments.'
          }
        },
        {
          '@type': 'Question',
          name: 'What cybersecurity tools do you use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We deploy Huntress for AI-assisted endpoint detection with managed analyst response, Tailscale for zero-trust network access, and enforce multi-factor authentication, conditional access policies, and regular vulnerability scanning across all managed endpoints.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does the onboarding process work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our onboarding follows four steps: First, we audit your current IT environment including credentials, devices, and network. Second, we secure accounts with MFA and access policies. Third, we configure monitoring, backups, and patching. Fourth, we hand off documentation and train your team on the helpdesk workflow. Most onboardings complete within 5 business days.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do you support law firms, medical clinics, and accounting firms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We have dedicated expertise in regulated industries. For law firms we handle Law Society compliance and confidentiality requirements. For medical clinics we support PHIPA-compliant infrastructure. For accounting firms we ensure CRA-compliant data handling and encryption standards.'
          }
        },
        {
          '@type': 'Question',
          name: 'Are your IT services compliant with Canadian privacy laws?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All our managed IT services are designed to support PIPEDA compliance. We implement data retention policies, encrypted backups, access controls, and audit trails. For medical clinics and legal offices, we apply additional safeguards aligned with provincial health information and professional conduct requirements.'
          }
        }
      ]
    });

    // Speakable schema for voice assistants and AI engines
    this.seo.setStructuredData(this.SPEAKABLE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Managed IT Services & Cloud Support | CtrlShift IT Services',
      url: 'https://ctrlshiftit.ca/',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#speakable-about', '#faq .faq-content']
      }
    });

    // HowTo schema for onboarding process (AEO: featured snippets + AI answers)
    this.seo.setStructuredData(this.HOWTO_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Onboard with CtrlShift IT Services Managed IT',
      description: 'The CtrlShift IT Services onboarding process for new managed IT clients in the Greater Toronto Area takes approximately 5 business days.',
      totalTime: 'P5D',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'IT Environment Audit',
          text: 'We audit your current IT environment including credentials, devices, network topology, and existing service agreements.'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Security Hardening',
          text: 'We secure all accounts with multi-factor authentication, configure conditional access policies, and remove unauthorized access.'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Monitoring & Backup Setup',
          text: 'We configure endpoint monitoring, automated patching, backup schedules, and restore testing for all critical systems.'
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Documentation & Handoff',
          text: 'We deliver complete IT documentation and train your team on the helpdesk workflow for ongoing support requests.'
        }
      ]
    });

    // Organization schema — entity identity for Google Knowledge Graph
    this.seo.setStructuredData(this.ORGANIZATION_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://ctrlshiftit.ca/#organization',
      name: 'CtrlShift IT Services',
      url: 'https://ctrlshiftit.ca',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ctrlshiftit.ca/favicon.svg',
        caption: 'CtrlShift IT Services logo'
      },
      telephone: '+1-416-624-4841',
      email: 'info@ctrlshiftit.ca',
      description: 'CtrlShift IT Services is a managed IT provider serving Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill businesses with proactive IT support, cybersecurity, and cloud services.',
      foundingLocation: {
        '@type': 'Place',
        name: 'Vaughan, Ontario, Canada'
      },
      areaServed: [
        {
          '@type': 'AdministrativeArea',
          name: 'Vaughan',
          containedInPlace: { '@type': 'AdministrativeArea', name: 'York Region, Ontario, Canada' }
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Toronto',
          containedInPlace: { '@type': 'AdministrativeArea', name: 'Greater Toronto Area, Ontario, Canada' }
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Mississauga',
          containedInPlace: { '@type': 'AdministrativeArea', name: 'Peel Region, Ontario, Canada' }
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Thornhill',
          containedInPlace: { '@type': 'AdministrativeArea', name: 'York Region, Ontario, Canada' }
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Richmond Hill',
          containedInPlace: { '@type': 'AdministrativeArea', name: 'York Region, Ontario, Canada' }
        }
      ],
      sameAs: [
        'https://www.linkedin.com/company/ctrlshift-it-services',
        'https://www.facebook.com/ctrlshiftit'
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Managed IT Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Managed IT Services' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cybersecurity Services' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Microsoft 365 Administration' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Workspace Administration' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud & AWS Infrastructure' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office Networking & Wi-Fi' } }
        ]
      }
    });

    // ServiceArea schema — explicit geographic targeting for map-pack eligibility
    this.seo.setStructuredData(this.SERVICE_AREA_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://ctrlshiftit.ca/#managed-it-service',
      name: 'Managed IT Services',
      serviceType: 'Managed IT Services',
      description: 'Proactive managed IT support, cybersecurity, and cloud services for businesses in Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill.',
      url: 'https://ctrlshiftit.ca/managed-it-services',
      provider: {
        '@type': 'Organization',
        '@id': 'https://ctrlshiftit.ca/#organization',
        name: 'CtrlShift IT Services'
      },
      areaServed: [
        { '@type': 'City', name: 'Vaughan', containedInPlace: { '@type': 'State', name: 'Ontario' } },
        { '@type': 'City', name: 'Toronto', containedInPlace: { '@type': 'State', name: 'Ontario' } },
        { '@type': 'City', name: 'Mississauga', containedInPlace: { '@type': 'State', name: 'Ontario' } },
        { '@type': 'City', name: 'Thornhill', containedInPlace: { '@type': 'State', name: 'Ontario' } },
        { '@type': 'City', name: 'Richmond Hill', containedInPlace: { '@type': 'State', name: 'Ontario' } }
      ]
    });

    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleReviews();

      const navSub = this.router.events.subscribe(event => {
        if (!(event instanceof NavigationEnd)) return;
        const fragment = this.getCurrentFragment();
        if (!fragment) return;

        if (this.viewReady) {
          this.queueFragmentScroll(fragment, this.prefersReducedMotion);
        } else {
          this.pendingFragment = fragment;
        }
      });
      this.destroyCallbacks.push(() => navSub.unsubscribe());
    }
  }

  ngAfterViewInit() {
    // Ensure we are in the browser before running GSAP
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.viewReady = true;
        this.scheduleIdleTask(() => {
          void this.initAnimations(this.prefersReducedMotion);
        }, 1500);

        const fragment = this.pendingFragment ?? this.getCurrentFragment();
        if (fragment) {
          this.queueFragmentScroll(fragment, this.prefersReducedMotion);
        }
        this.pendingFragment = null;
      });
    }
  }

  private scheduleIdleTask(task: () => void, timeout = 1200): void {
    const anyWindow = window as any;
    if (typeof anyWindow.requestIdleCallback === 'function') {
      const idleId = anyWindow.requestIdleCallback(task, { timeout });
      if (typeof anyWindow.cancelIdleCallback === 'function') {
        this.destroyCallbacks.push(() => anyWindow.cancelIdleCallback(idleId));
      }
      return;
    }

    const timerId = window.setTimeout(task, 180);
    this.destroyCallbacks.push(() => window.clearTimeout(timerId));
  }

  ngOnDestroy() {
    this.seo.removeStructuredData(this.LOCAL_BUSINESS_SCHEMA_ID);
    this.seo.removeStructuredData(this.OFFER_CATALOG_SCHEMA_ID);
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.AGGREGATE_RATING_SCHEMA_ID);
    this.seo.removeStructuredData(this.SPEAKABLE_SCHEMA_ID);
    this.seo.removeStructuredData(this.HOWTO_SCHEMA_ID);
    this.seo.removeStructuredData(this.ORGANIZATION_SCHEMA_ID);
    this.seo.removeStructuredData(this.SERVICE_AREA_SCHEMA_ID);
    this.destroyCallbacks.forEach(fn => fn());
    this.destroyCallbacks = [];
  }

  async initAnimations(prefersReducedMotion: boolean) {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]);
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      gsap.set('.badge-neon, .draw-path, .reveal-card, .glass-card-interactive, .hero-orb, .hero-noise, .hero-title, .hero-subtitle, .hero-cta .btn, .hero-trust-strip, .hero-sla-chip, .hero-industry-chip, .hero-cert-chip, .arch-node, .arch-node-primary, .arch-node-accent, .reveal-section, .marquee-section, .section-head-reveal, .security-layer, .team-head-reveal, .team-cards-reveal, .reviews-head-reveal, .review-cards-reveal, .pricing-head-reveal, .pricing-cards-reveal, .faq-head-reveal, .faq-reveal, .consultation-reveal', {
        clearProps: 'all'
      });
      document.querySelectorAll('.reveal-section').forEach(el => el.classList.add('revealed'));
      this.setMetricCountersStatic();
      return;
    }

    ScrollTrigger.refresh();
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // --- 1. NEW: Risk-Free Badge Animation ---
    // Pulse: Continuous glowing effect
    gsap.to(".badge-neon", {
      boxShadow: "0 0 25px rgba(59, 130, 246, 0.58)", // Brand blue glow
      scale: 1.02,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // --- 2. Existing SVG Path Setup ---
    const paths = document.querySelectorAll('.draw-path');
    paths.forEach((path: any) => {
      // Check if getTotalLength exists to avoid errors on non-path elements
      if (path.getTotalLength) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, visibility: "visible" });
      }
    });

    // --- 3. Hero Sequence ---
    // Badge + text + card start together, paths draw in parallel.
    tl.addLabel('heroStart', 0)
      .from(".badge-neon", { duration: 0.95, y: -22, opacity: 0, ease: "power3.out" }, 'heroStart')
      .from(".hero-title", {
        y: 24,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.15,
        ease: 'power3.out'
      }, 'heroStart')
      .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.9
      }, 'heroStart+=0.15')
      .from(".hero-cta .btn", {
        y: 14,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08
      }, 'heroStart+=0.2')
      .from(".glass-card-interactive", { scale: 0.85, opacity: 0, duration: 1.1, ease: "elastic.out(1, 0.6)" }, 'heroStart')
      .to(".draw-path", { strokeDashoffset: 0, duration: 1.5, stagger: 0.3, ease: "power2.inOut" }, 'heroStart+=0.15')
      .from('.hero-trust-strip', { opacity: 0, y: -12, duration: 0.5, ease: 'power2.out' }, 'heroStart+=0.1')
      .from('.hero-sla-chip', { opacity: 0, x: -10, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, 'heroStart+=0.6')
      .from('.hero-industry-chip', { opacity: 0, y: 8, duration: 0.35, stagger: 0.06, ease: 'power2.out' }, 'heroStart+=0.8')
      .from('.hero-cert-chip', { opacity: 0, scale: 0.9, duration: 0.3, stagger: 0.07, ease: 'back.out(1.4)' }, 'heroStart+=1.0')
      .from('.arch-node, .arch-node-primary, .arch-node-accent', {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(2)',
        transformOrigin: 'center center'
      }, 'heroStart+=0.4');

    // --- 4. Scroll Triggers (Service Cards) ---
    // Animate each bento row together so cards within a row enter simultaneously
    const bentoRows = [
      ['#card-managed-it', '#card-security'],
      ['#card-microsoft', '#card-aws', '#card-networking'],
      ['#card-crisis', '#card-ai-integration'],
    ];
    bentoRows.forEach(ids => {
      ScrollTrigger.batch(ids.join(', '), {
        start: 'top 85%',
        onEnter: batch => {
          gsap.from(batch, {
            y: 30,
            opacity: 0,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0,
          });
        },
      });
    });

    // --- 4b. Marquee logo items (first set only, aria-hidden duplicates skipped) ---
    ScrollTrigger.batch('.marquee-section', {
      start: 'top 90%',
      once: true,
      onEnter: batch => {
        gsap.from(batch, { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' });
      }
    });

    // --- 4c. Section headings and content ---
    ScrollTrigger.batch('.section-head-reveal', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.security-layer', {
      start: 'top 84%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 });
      }
    });
    ScrollTrigger.batch('.team-head-reveal', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.team-cards-reveal .team-card', {
      start: 'top 82%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.reviews-head-reveal', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.review-cards-reveal', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.pricing-head-reveal', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.pricing-cards-reveal .pricing-dark-card', {
      start: 'top 80%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 });
      }
    });
    ScrollTrigger.batch('.faq-head-reveal', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.faq-reveal .faq-item', {
      start: 'top 80%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', stagger: 0.06 });
      }
    });
    ScrollTrigger.batch('.consultation-reveal', {
      start: 'top 82%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out', stagger: 0.08 });
      }
    });

    // Reveal sections (fade in when in view)
    ScrollTrigger.batch('.reveal-section', {
      start: 'top 92%',
      onEnter: batch => {
        gsap.to(batch, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        batch.forEach((el: Element) => el.classList.add('revealed'));
      }
    });

    this.setupHeroParallax(gsap, prefersReducedMotion);
    this.setupMagneticButtons(gsap, prefersReducedMotion);
    this.setupServiceCardTilt(gsap, prefersReducedMotion);
    this.setupMetricCounters(gsap, ScrollTrigger, prefersReducedMotion);
  }

  private setupHeroParallax(gsap: any, prefersReducedMotion: boolean): void {
    if (prefersReducedMotion) return;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    const hero = this.document.querySelector('.hero-dark-modern') as HTMLElement | null;
    const card = this.document.querySelector('.hero-parallax-target') as HTMLElement | null;
    if (!hero || !card) return;

    gsap.set(card, { transformPerspective: 900, transformOrigin: 'center center' });
    const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power2.out' });
    const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power2.out' });
    const shiftX = gsap.quickTo(card, 'x', { duration: 0.6, ease: 'power2.out' });
    const shiftY = gsap.quickTo(card, 'y', { duration: 0.6, ease: 'power2.out' });

    const onMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(hero, {
        '--pointer-x': `${(x * 28).toFixed(2)}px`,
        '--pointer-y': `${(y * 24).toFixed(2)}px`,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      rotateY(x * 8);
      rotateX(-y * 8);
      shiftX(x * 10);
      shiftY(y * 8);
    };

    const onLeave = () => {
      gsap.to(hero, {
        '--pointer-x': '0px',
        '--pointer-y': '0px',
        duration: 0.7,
        ease: 'power3.out'
      });
      rotateX(0);
      rotateY(0);
      shiftX(0);
      shiftY(0);
    };

    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', onLeave);
    this.destroyCallbacks.push(() => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    });
  }

  private setupMagneticButtons(gsap: any, prefersReducedMotion: boolean): void {
    if (prefersReducedMotion) return;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    const buttons = Array.from(this.document.querySelectorAll<HTMLElement>('.magnetic-btn'));
    buttons.forEach((button) => {
      const xTo = gsap.quickTo(button, 'x', { duration: 0.35, ease: 'power2.out' });
      const yTo = gsap.quickTo(button, 'y', { duration: 0.35, ease: 'power2.out' });

      const onMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        xTo(offsetX * 0.18);
        yTo(offsetY * 0.18);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      button.addEventListener('mousemove', onMove, { passive: true });
      button.addEventListener('mouseleave', onLeave);
      this.destroyCallbacks.push(() => {
        button.removeEventListener('mousemove', onMove);
        button.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  private setupServiceCardTilt(gsap: any, prefersReducedMotion: boolean): void {
    if (prefersReducedMotion) return;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    const cardBodies = Array.from(
      this.document.querySelectorAll<HTMLElement>('.reveal-card .card .card-body')
    );
    cardBodies.forEach((cardBody) => {
      gsap.set(cardBody, { transformPerspective: 800, transformOrigin: 'center center' });
      const rotateX = gsap.quickTo(cardBody, 'rotationX', { duration: 0.4, ease: 'power2.out' });
      const rotateY = gsap.quickTo(cardBody, 'rotationY', { duration: 0.4, ease: 'power2.out' });

      const onMove = (event: MouseEvent) => {
        const rect = cardBody.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY(x * 5);
        rotateX(-y * 5);
      };

      const onLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      cardBody.addEventListener('mousemove', onMove, { passive: true });
      cardBody.addEventListener('mouseleave', onLeave);
      this.destroyCallbacks.push(() => {
        cardBody.removeEventListener('mousemove', onMove);
        cardBody.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  private setupMetricCounters(gsap: any, ScrollTrigger: any, prefersReducedMotion: boolean): void {
    const counters = Array.from(this.document.querySelectorAll<HTMLElement>('.metric-counter'));
    if (counters.length === 0) return;

    if (prefersReducedMotion) {
      this.setMetricCountersStatic();
      return;
    }

    counters.forEach((counter) => {
      const target = Number(counter.dataset['target'] ?? '0');
      const suffix = counter.dataset['suffix'] ?? '';
      const prefix = counter.dataset['prefix'] ?? '';

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          if (!Number.isFinite(target) || target <= 0) {
            counter.textContent = `${prefix}0${suffix}`;
            return;
          }

          const state = { value: 0 };
          gsap.to(state, {
            value: target,
            duration: 1.25,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
            },
            onComplete: () => {
              counter.textContent = `${prefix}${target}${suffix}`;
            }
          });
        }
      });
    });
  }

  private setMetricCountersStatic(): void {
    const counters = Array.from(this.document.querySelectorAll<HTMLElement>('.metric-counter'));
    counters.forEach((counter) => {
      const rawTarget = counter.dataset['target'];
      const suffix = counter.dataset['suffix'] ?? '';
      const prefix = counter.dataset['prefix'] ?? '';
      const target = Number(rawTarget ?? '0');
      const safeValue = Number.isFinite(target) ? target : 0;
      counter.textContent = `${prefix}${safeValue}${suffix}`;
    });
  }

  private getCurrentFragment(): string | null {
    const routerFragment = this.router.parseUrl(this.router.url).fragment;
    if (routerFragment) return routerFragment;
    const hash = this.document.location.hash;
    return hash ? hash.replace('#', '') : null;
  }

  private queueFragmentScroll(fragment: string | null, prefersReducedMotion: boolean) {
    if (!fragment) return;

    const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
    const attemptScroll = () => {
      const target = this.document.getElementById(fragment);
      if (!target) return false;
      target.scrollIntoView({ behavior, block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      return true;
    };

    if (attemptScroll()) return;

    this.zone.runOutsideAngular(() => {
      let tries = 0;
      const maxTries = 12;
      const retry = () => {
        if (attemptScroll() || tries >= maxTries) return;
        tries += 1;
        setTimeout(retry, 120);
      };
      retry();
    });
  }

  trackReview(_index: number, review: GoogleReview): string {
    const textToken = review.text.slice(0, 24).replace(/\s+/g, '-');
    return `${review.authorName}-${review.time}-${textToken}`;
  }

  getReviewerInitial(review: GoogleReview): string {
    const initial = review.authorName.trim().charAt(0);
    return initial ? initial.toUpperCase() : 'G';
  }

  private loadGoogleReviews() {
    const reviewsSub = this.googleReviewsService.getReviews().subscribe((payload) => {
      this.reviewPlaceName = payload.placeName?.trim() || this.reviewPlaceName;
      this.reviewLink = payload.googleMapsUrl?.trim() || this.reviewLink;
      this.reviewAggregateRating = Number.isFinite(payload.rating)
        ? payload.rating
        : this.reviewAggregateRating;
      this.reviewAggregateCount = Number.isFinite(payload.userRatingsTotal)
        ? payload.userRatingsTotal
        : this.reviewAggregateCount;
      if (payload.reviews.length > 0) {
        this.reviewItems = payload.reviews;
      } else {
        this.reviewItems = [];
      }
      this.reviewsConfigured = payload.configured;
      this.reviewsSource = payload.source;
      this.reviewsError = payload.error ?? null;

      // Inject AggregateRating structured data from live review data
      if (this.reviewAggregateCount > 0) {
        this.seo.setStructuredData(this.AGGREGATE_RATING_SCHEMA_ID, {
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

  // --- FORM SUBMISSION LOGIC ---
  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.errorMessage = null;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await this.fetchWithTimeout('https://formspree.io/f/mwvozjnn', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        this.submitted = true;
        this.isLoading = false;
        this.errorMessage = null;
        form.reset();
        this.cdr.detectChanges(); // Force UI update
      } else {
        const errorData = await response.json();
        this.errorMessage = "Form error: " + (errorData.error || "Check your Formspree ID");
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error("Error:", error);
      this.errorMessage =
        error instanceof DOMException && error.name === 'AbortError'
          ? 'This is taking longer than expected. Please try again.'
          : 'Network error. Please try again.';
      this.isLoading = false;
      this.cdr.detectChanges();
    } finally {
      if (this.isLoading && !this.submitted) {
        this.isLoading = false;
        this.errorMessage = this.errorMessage || 'Submission was interrupted. Please try again.';
        this.cdr.detectChanges();
      }
    }
  }

  private async fetchWithTimeout(input: string, init: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.formSubmitTimeoutMs);

    try {
      return await fetch(input, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
