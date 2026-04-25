import { Component, AfterViewInit, Input, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GoogleReview } from '../google-reviews.service';

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews-section.component.html',
  styleUrl: './reviews-section.component.css'
})
export class ReviewsSectionComponent implements AfterViewInit {
  @Input() reviewAggregateRating = 5.0;
  @Input() reviewAggregateCount = 15;
  @Input() reviewLink = 'https://maps.app.goo.gl/AHmLpmKhG88S54d37';
  @Input() reviewItems: GoogleReview[] = [];
  @Input() prefersReducedMotion = false;

  private platformId = inject(PLATFORM_ID);
  starScale = [1, 2, 3, 4, 5];

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
  }

  trackReview(_index: number, review: GoogleReview): string {
    const textToken = review.text.slice(0, 24).replace(/\s+/g, '-');
    return `${review.authorName}-${review.time}-${textToken}`;
  }

  getReviewerInitial(review: GoogleReview): string {
    const initial = review.authorName.trim().charAt(0);
    return initial ? initial.toUpperCase() : 'G';
  }
}
