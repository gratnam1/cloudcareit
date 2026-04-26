import { AfterViewInit, Component, Input, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceLandingPage } from './service-landing.model';

@Component({
  standalone: true,
  selector: 'app-service-landing',
  imports: [CommonModule, RouterModule],
  templateUrl: './service-landing.component.html',
  styleUrls: ['./service-landing.component.css'],
})
export class ServiceLandingComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) page!: ServiceLandingPage;

  private readonly platformId = inject(PLATFORM_ID);
  private animationContext?: { revert: () => void };

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initAnimations();
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }

  private async initAnimations(): Promise<void> {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.service-reveal, .service-card, .service-diagram-item, .service-process-step', {
          y: 0,
          opacity: 1,
          clearProps: 'transform',
        });
        return;
      }

      ScrollTrigger.batch('.service-reveal', {
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

      ScrollTrigger.batch('.service-card', {
        start: 'top 87%',
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.08 }
          );
        },
      });

      ScrollTrigger.batch('.service-diagram-item, .service-process-step', {
        start: 'top 85%',
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 }
          );
        },
      });
    });
  }
}
