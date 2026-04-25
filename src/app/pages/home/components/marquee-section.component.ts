import { Component, AfterViewInit, Input, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-marquee-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee-section.component.html',
  styleUrl: './marquee-section.component.css'
})
export class MarqueeSectionComponent implements AfterViewInit {
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

    ScrollTrigger.batch('.marquee-section', {
      start: 'top 90%',
      once: true,
      onEnter: batch => {
        gsap.from(batch, { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' });
      }
    });
  }
}
