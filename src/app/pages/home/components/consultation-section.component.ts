import { Component, AfterViewInit, Input, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-section.component.html',
  styleUrl: './consultation-section.component.css'
})
export class ConsultationSectionComponent implements AfterViewInit {
  @Input() prefersReducedMotion = false;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  isLoading = false;
  submitted = false;
  errorMessage: string | null = null;
  private formSubmitTimeoutMs = 15000;

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

    ScrollTrigger.batch('.consultation-reveal', {
      start: 'top 82%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out', stagger: 0.08 });
      }
    });

    this.setupMagneticButtons(gsap);
  }

  private setupMagneticButtons(gsap: any): void {
    if (this.prefersReducedMotion) return;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    const buttons = Array.from(document.querySelectorAll<HTMLElement>('.magnetic-btn'));
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
    });
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.errorMessage = null;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await this.fetchWithTimeout('https://formspree.io/f/mwvozjnn', {
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
        this.cdr.detectChanges();
      } else {
        const errorData = await response.json();
        this.errorMessage = "Form error: " + (errorData.error || "Check your Formspree ID");
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error("Error:", error);
      this.errorMessage =
        error instanceof DOMException && error.name === 'AbortError'
          ? 'This is taking longer than expected. Please try again.'
          : 'Network error. Please try again.';
      this.isLoading = false;
      this.cdr.detectChanges();
    } finally {
      if (this.isLoading && !this.submitted) {
        this.isLoading = false;
        this.errorMessage = this.errorMessage || 'Submission was interrupted. Please try again.';
        this.cdr.detectChanges();
      }
    }
  }

  private async fetchWithTimeout(input: string, init: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.formSubmitTimeoutMs);

    try {
      return await fetch(input, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
