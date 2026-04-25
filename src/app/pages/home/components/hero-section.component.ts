import { Component, AfterViewInit, Input, inject, PLATFORM_ID, ElementRef, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements AfterViewInit, OnDestroy {
  @Input() prefersReducedMotion = false;
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private destroyCallbacks: Array<() => void> = [];

  @ViewChild('hero') heroRef?: ElementRef<HTMLElement>;
  @ViewChild('card') cardRef?: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  ngOnDestroy() {
    this.destroyCallbacks.forEach(fn => fn());
  }

  async initAnimations() {
    const { gsap } = await import('gsap');
    
    if (this.prefersReducedMotion) {
      gsap.set('.badge-neon, .draw-path, .glass-card-interactive, .hero-orb, .hero-noise, .hero-title, .hero-subtitle, .hero-cta .btn, .hero-trust-strip, .hero-sla-chip, .hero-industry-chip, .hero-cert-chip, .arch-node, .arch-node-primary, .arch-node-accent', {
        clearProps: 'all'
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Pulse: Continuous glowing effect
    gsap.to(".badge-neon", {
      boxShadow: "0 0 25px rgba(59, 130, 246, 0.58)",
      scale: 1.02,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // SVG Path Setup
    const paths = this.document.querySelectorAll('.draw-path');
    paths.forEach((path: any) => {
      if (path.getTotalLength) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, visibility: "visible" });
      }
    });

    // Hero Sequence
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
      .from('.hero-cert-chip', { opacity: 0, scale: 0.9, duration: 0.3, stagger: 0.07, ease: 'back.out(1.4)' }, 'heroStart+=1.0')
      .from('.arch-node, .arch-node-primary, .arch-node-accent', {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(2)',
        transformOrigin: 'center center'
      }, 'heroStart+=0.4');

    this.setupHeroParallax(gsap);
    this.setupMagneticButtons(gsap);
  }

  private setupHeroParallax(gsap: any): void {
    if (this.prefersReducedMotion) return;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    const hero = this.heroRef?.nativeElement;
    const card = this.cardRef?.nativeElement;
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

  private setupMagneticButtons(gsap: any): void {
    if (this.prefersReducedMotion) return;
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
}
