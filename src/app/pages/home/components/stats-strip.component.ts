import { Component, AfterViewInit, Input, inject, PLATFORM_ID, OnDestroy } from '@angular/common';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-stats-strip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-strip.component.html',
  styleUrl: './stats-strip.component.css'
})
export class StatsStripComponent implements AfterViewInit, OnDestroy {
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
      this.setMetricCountersStatic();
      return;
    }

    const counters = Array.from(this.document.querySelectorAll<HTMLElement>('.metric-counter'));
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

    ScrollTrigger.batch('.consultation-reveal', {
      start: 'top 82%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out', stagger: 0.08 });
      }
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
}
