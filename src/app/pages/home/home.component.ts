import { Component, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  submitted = false;
  isLoading = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef // Required to update UI after fetch
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initAnimations();
      }, 100);
    }
  }

  initAnimations() {
    ScrollTrigger.refresh();
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Setup SVG Paths
    const paths = document.querySelectorAll('.draw-path');
    paths.forEach((path: any) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, visibility: "visible" });
    });

    // 2. Hero Animation
    tl.from(".glass-card-interactive", { scale: 0.7, opacity: 0, duration: 1.4, ease: "elastic.out(1, 0.5)" })
      .to(".draw-path", { strokeDashoffset: 0, duration: 1.8, stagger: 0.4, ease: "power2.inOut" }, "-=0.5")
      .from(".hero-dark-modern h1, .hero-dark-modern p, .hero-dark-modern .btn", { y: 30, opacity: 0, stagger: 0.1, duration: 1 }, "-=1");

    // 3. Scroll Triggers
    gsap.utils.toArray('.reveal-card').forEach((card: any) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
        y: 50, opacity: 0, duration: 0.8, ease: "power2.out"
      });
    });

    // 4. Mouse Tilt
    const card = document.querySelector('.glass-card-interactive') as HTMLElement;
    if (card) {
      document.addEventListener("mousemove", (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
        gsap.to(card, { rotationY: xAxis, rotationX: yAxis, duration: 0.6, ease: "power1.out" });
      });
    }
  }

  // --- RESTORED REAL FORM LOGIC ---
  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Your original Formspree ID
      const response = await fetch("https://formspree.io/f/mwvozjnn", {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
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
