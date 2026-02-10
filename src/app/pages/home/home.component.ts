import { Component, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouterModule } from '@angular/router';


// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' // Note: Angular 17+ uses 'styleUrl' (singular)
})
export class HomeComponent implements AfterViewInit {
  submitted = false;
  isLoading = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    // Ensure we are in the browser before running GSAP
    if (isPlatformBrowser(this.platformId)) {
      // Small timeout to ensure DOM is fully painted
      setTimeout(() => {
        this.initAnimations();
      }, 100);
    }
  }

  initAnimations() {
    ScrollTrigger.refresh();
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // --- 1. NEW: Risk-Free Badge Animation ---
    // Entry: Slide down from top
    gsap.from(".badge-neon", {
      duration: 1,
      y: -30,
      opacity: 0,
      ease: "power3.out",
      delay: 0.2
    });

    // Pulse: Continuous glowing effect
    gsap.to(".badge-neon", {
      boxShadow: "0 0 25px rgba(34, 211, 238, 0.6)", // Electric Cyan Glow
      scale: 1.02,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // --- 2. Existing SVG Path Setup ---
    const paths = document.querySelectorAll('.draw-path');
    paths.forEach((path: any) => {
      // Check if getTotalLength exists to avoid errors on non-path elements
      if (path.getTotalLength) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, visibility: "visible" });
      }
    });

    // --- 3. Hero Sequence ---
    // Glass Card enters -> Paths draw -> Text reveals
    tl.from(".glass-card-interactive", { scale: 0.7, opacity: 0, duration: 1.4, ease: "elastic.out(1, 0.5)" })
      .to(".draw-path", { strokeDashoffset: 0, duration: 1.8, stagger: 0.4, ease: "power2.inOut" }, "-=0.5")
      .from(".hero-dark-modern h1, .hero-dark-modern p, .hero-dark-modern .btn", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1
      }, "-=1");

    // --- 4. Scroll Triggers (Service Cards) ---
    gsap.utils.toArray('.reveal-card').forEach((card: any) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // --- 5. Mouse Tilt Effect (Hero Card) ---
    const card = document.querySelector('.glass-card-interactive') as HTMLElement;
    if (card) {
      document.addEventListener("mousemove", (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 30;

        // Use gsap.to for smoother interpolation than setting style directly
        gsap.to(card, {
          rotationY: xAxis,
          rotationX: yAxis,
          duration: 0.6,
          ease: "power1.out"
        });
      });
    }
  }

  // --- FORM SUBMISSION LOGIC ---
  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
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
