import { Component, AfterViewInit, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';


// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

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
  private destroyCallbacks: Array<() => void> = [];
  private prefersReducedMotion = false;
  private viewReady = false;
  private pendingFragment: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private seo: SeoService,
    private router: Router,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.seo.update({
      title: 'Managed IT Services Vaughan & Toronto | 30-Day Risk-Free | CtrlShift IT Services',
      description: 'Reliable business IT support for Vaughan & Toronto. CtrlShift IT Services offers a 30-day satisfaction guarantee for law firms & clinics. Get a 15-min response time.',
      type: 'website',
      canonicalPath: '/'
    });

    if (isPlatformBrowser(this.platformId)) {
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
        this.initAnimations(this.prefersReducedMotion);

        const fragment = this.pendingFragment ?? this.getCurrentFragment();
        if (fragment) {
          this.queueFragmentScroll(fragment, this.prefersReducedMotion);
        }
        this.pendingFragment = null;
      });
    }
  }

  ngOnDestroy() {
    this.destroyCallbacks.forEach(fn => fn());
    this.destroyCallbacks = [];
  }

  initAnimations(prefersReducedMotion: boolean) {
    if (prefersReducedMotion) {
      gsap.set('.badge-neon, .draw-path, .reveal-card, .glass-card-interactive, .hero-dark-modern h1, .hero-dark-modern p, .hero-dark-modern .btn', {
        clearProps: 'all'
      });
      return;
    }

    ScrollTrigger.refresh();
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // --- 1. NEW: Risk-Free Badge Animation ---
    // Pulse: Continuous glowing effect
    gsap.to(".badge-neon", {
      boxShadow: "0 0 25px rgba(34, 211, 238, 0.6)", // Electric Cyan Glow
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

    // --- 5. Mouse Tilt Effect (Hero Card) ---
    const card = document.querySelector('.glass-card-interactive') as HTMLElement;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (card && supportsHover) {
      const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2.out' });
      const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2.out' });
      const onMove = (e: MouseEvent) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
        rotateY(xAxis);
        rotateX(yAxis);
      };

      document.addEventListener('mousemove', onMove, { passive: true });
      this.destroyCallbacks.push(() => document.removeEventListener('mousemove', onMove));
    }
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
        form.reset();
        this.cdr.detectChanges(); // Force UI update
      } else {
        const errorData = await response.json();
        alert("Form error: " + (errorData.error || "Check your Formspree ID"));
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Please try again.");
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
