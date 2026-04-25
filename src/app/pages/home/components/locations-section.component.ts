import { Component, AfterViewInit, Input, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-locations-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './locations-section.component.html',
  styleUrl: './locations-section.component.css'
})
export class LocationsSectionComponent implements AfterViewInit {
  @Input() prefersReducedMotion = false;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  async initAnimations() {
    if (this.prefersReducedMotion) return;
    
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch('.section-head-reveal', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });

    ScrollTrigger.batch('.locations-grid .reveal-card', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.1 });
      }
    });
  }
}
