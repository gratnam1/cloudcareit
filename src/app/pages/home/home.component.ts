import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' // <--- MAKE SURE THIS POINTS TO YOUR NEW CSS FILE
})
export class HomeComponent implements AfterViewInit {
  submitted = false;
  isLoading = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Only run GSAP in the browser (fixes SSR issues)
    if (isPlatformBrowser(this.platformId)) {

      // Use setTimeout to wait 1 tick for the DOM to settle
      setTimeout(() => {
        this.initAnimations();
      }, 100);
    }
  }

  initAnimations() {
    // Refresh ScrollTrigger to ensure it sees the new page height
    ScrollTrigger.refresh();

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Setup SVG Paths
    const paths = document.querySelectorAll('.draw-path');
    paths.forEach((path: any) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        visibility: "visible"
      });
    });

    // 2. Hero Animation Sequence
    tl.from(".glass-card-interactive", {
      scale: 0.7,
      opacity: 0,
      duration: 1.4,
      ease: "elastic.out(1, 0.5)"
    })
      .to(".draw-path", {
        strokeDashoffset: 0,
        duration: 1.8,
        stagger: 0.4,
        ease: "power2.inOut"
      }, "-=0.5")
      .from(".hero-dark-modern h1, .hero-dark-modern p, .hero-dark-modern .btn", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1
      }, "-=1");

    // 3. Scroll Triggers for Cards
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

    // 4. Mouse Tilt Logic
    const card = document.querySelector('.glass-card-interactive') as HTMLElement;
    if (card) {
      document.addEventListener("mousemove", (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
        gsap.to(card, {
          rotationY: xAxis,
          rotationX: yAxis,
          duration: 0.6,
          ease: "power1.out"
        });
      });
    }
  }

  // --- Form Logic ---
  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    setTimeout(() => {
      this.submitted = true;
      this.isLoading = false;
    }, 2000);
  }
}
