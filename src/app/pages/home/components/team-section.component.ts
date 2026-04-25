import { Component, AfterViewInit, Input, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './team-section.component.html',
  styleUrl: './team-section.component.css'
})
export class TeamSectionComponent implements AfterViewInit {
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

    ScrollTrigger.batch('.team-head-reveal', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });

    ScrollTrigger.batch('.team-cards-reveal .col-md-5', {
      start: 'top 85%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.1 });
      }
    });
  }
}
