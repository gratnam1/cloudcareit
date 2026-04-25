import { Component, AfterViewInit, Input, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-grid.component.html',
  styleUrl: './services-grid.component.css'
})
export class ServicesGridComponent implements AfterViewInit, OnDestroy {
  @Input() prefersReducedMotion = false;
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private destroyCallbacks: Array<() => void> = [];

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
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    if (this.prefersReducedMotion) {
      gsap.set('.reveal-card, .section-head-reveal', { clearProps: 'all' });
      return;
    }

    // Section header
    ScrollTrigger.batch('.section-head-reveal', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });

    // Bento row animations
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

    this.setupCardTilt(gsap);
  }

  private setupCardTilt(gsap: any): void {
    if (this.prefersReducedMotion) return;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    // Use .bento-card for tilt on home page services
    const cards = Array.from(this.document.querySelectorAll<HTMLElement>('.bento-card'));
    cards.forEach((card) => {
      gsap.set(card, { transformPerspective: 1000, transformOrigin: 'center center' });
      const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2.out' });
      const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2.out' });

      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY(x * 4);
        rotateX(-y * 4);
      };

      const onLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      card.addEventListener('mousemove', onMove, { passive: true });
      card.addEventListener('mouseleave', onLeave);
      this.destroyCallbacks.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });
  }
}
