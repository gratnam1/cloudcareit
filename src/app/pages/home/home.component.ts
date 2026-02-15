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
  submitted = false;
  isLoading = false;
  errorMessage: string | null = null;
  readonly starScale = [1, 2, 3, 4, 5];
  reviewPlaceName = 'CtrlShift IT Services';
  reviewLink = 'https://www.google.com/search?q=CtrlShift+IT+Services+reviews';
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
      title: 'Managed IT Services GTA & Toronto | CtrlShift IT Services',
      description: 'Reliable managed IT services for businesses in Vaughan, Toronto & GTA. Proactive IT support, cybersecurity, and cloud management with fast response times.',
      type: 'website',
      canonicalPath: '/'
    });

    this.seo.setStructuredData(this.LOCAL_BUSINESS_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'CtrlShift IT Services',
      image: 'https://ctrlshiftit.ca/wp-content/uploads/logo.png',
      url: 'https://ctrlshiftit.ca/',
      telephone: '+1-647-503-5779',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vaughan',
        addressRegion: 'ON',
        addressCountry: 'CA'
      },
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
        { '@type': 'City', name: 'Toronto' },
        { '@type': 'City', name: 'Mississauga' },
        { '@type': 'City', name: 'Thornhill' },
        { '@type': 'City', name: 'Richmond Hill' }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Managed IT Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Managed IT Support' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cybersecurity' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud Management' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tailscale Zero Trust Access' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Huntress AI-Assisted Managed Security' } }
        ]
      }
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
      gsap.set('.badge-neon, .draw-path, .reveal-card, .glass-card-interactive, .hero-orb, .hero-noise, .hero-dark-modern h1, .hero-dark-modern p, .hero-dark-modern .btn, .reveal-section, .logo-reveal, .section-head-reveal, .team-head-reveal, .team-cards-reveal, .reviews-head-reveal, .review-cards-reveal, .pricing-head-reveal, .pricing-cards-reveal, .faq-head-reveal, .faq-reveal, .consultation-reveal', {
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
      .to(".draw-path", { strokeDashoffset: 0, duration: 1.5, stagger: 0.3, ease: "power2.inOut" }, 'heroStart+=0.15');

    // --- 4. Scroll Triggers (Service Cards) ---
    ScrollTrigger.batch('.reveal-card', {
      start: 'top 85%',
      onEnter: batch => {
        gsap.from(batch, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08
        });
      }
    });

    // --- 4b. Logos strip ---
    ScrollTrigger.batch('.logo-reveal .col-4', {
      start: 'top 88%',
      onEnter: batch => {
        gsap.from(batch, {
          y: 24,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.06
        });
      }
    });

    // --- 4c. Section headings and content ---
    ScrollTrigger.batch('.section-head-reveal', {
      start: 'top 85%',
      onEnter: batch => {
        gsap.from(batch, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.team-head-reveal', {
      start: 'top 85%',
      onEnter: batch => {
        gsap.from(batch, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.team-cards-reveal .p-4', {
      start: 'top 82%',
      onEnter: batch => {
        gsap.from(batch, { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12 });
      }
    });
    ScrollTrigger.batch('.reviews-head-reveal', {
      start: 'top 85%',
      onEnter: batch => {
        gsap.from(batch, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.review-cards-reveal .review-card', {
      start: 'top 82%',
      onEnter: batch => {
        gsap.from(batch, { y: 28, opacity: 0, duration: 0.55, ease: 'power2.out', stagger: 0.08 });
      }
    });
    ScrollTrigger.batch('.pricing-head-reveal', {
      start: 'top 85%',
      onEnter: batch => {
        gsap.from(batch, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.pricing-cards-reveal .pricing-card', {
      start: 'top 80%',
      onEnter: batch => {
        gsap.from(batch, { y: 36, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 });
      }
    });
    ScrollTrigger.batch('.faq-head-reveal', {
      start: 'top 85%',
      onEnter: batch => {
        gsap.from(batch, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
    ScrollTrigger.batch('.faq-reveal .faq-item', {
      start: 'top 80%',
      onEnter: batch => {
        gsap.from(batch, { y: 20, opacity: 0, duration: 0.45, ease: 'power2.out', stagger: 0.06 });
      }
    });
    ScrollTrigger.batch('.consultation-reveal', {
      start: 'top 82%',
      onEnter: batch => {
        gsap.from(batch, { y: 24, opacity: 0, duration: 0.65, ease: 'power2.out', stagger: 0.08 });
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
      this.cdr.detectChanges();
    });

    this.destroyCallbacks.push(() => reviewsSub.unsubscribe());
  }

  // --- FORM SUBMISSION LOGIC ---
  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/mwvozjnn", {
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
      this.errorMessage = "Network error. Please try again.";
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
