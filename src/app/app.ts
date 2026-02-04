import { Component, signal, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser'; // <--- 1. Import Title Service
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('ctrlshift-it-services');

  // --- Form State ---
  submitted = false;
  isLoading = false;

  // --- AI Chat State ---
  chatVisible = false;
  chatInput = '';
  messages: { text: string; isUser: boolean; isTyping?: boolean }[] = [
    { text: "Hello! I'm the CtrlShift AI. Are you reporting an emergency outage in Ontario, or looking for a project quote?", isUser: false }
  ];

  // 2. Inject Title Service in Constructor
  constructor(
    private cdr: ChangeDetectorRef,
    private titleService: Title
  ) {
    // 3. Set the Browser Tab Title immediately
    this.titleService.setTitle("CtrlShift IT Services | Managed IT & Web Solutions");
  }

  ngAfterViewInit() {
    // ---------------------------------------------------------
    // 1. HERO & GLASS CARD ANIMATION
    // ---------------------------------------------------------
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    const paths = document.querySelectorAll('.draw-path');
    paths.forEach((path: any) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        visibility: "visible"
      });
    });

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

    // ---------------------------------------------------------
    // 2. 3D MOUSE TILT EFFECT
    // ---------------------------------------------------------
    const card = document.querySelector('.glass-card-interactive');
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

    // ---------------------------------------------------------
    // 3. SCROLL TRIGGERS
    // ---------------------------------------------------------
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

    // ---------------------------------------------------------
    // 4. MAGNETIC BUTTON
    // ---------------------------------------------------------
    const magBtn = document.querySelector('.magnetic-btn') as HTMLElement;
    if (magBtn) {
      magBtn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = magBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(magBtn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
      });
      magBtn.addEventListener('mouseleave', () => {
        gsap.to(magBtn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      });
    }
  }

  // ---------------------------------------------------------
  // FORM LOGIC
  // ---------------------------------------------------------
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
        this.cdr.detectChanges();
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

  // ---------------------------------------------------------
  // CHAT LOGIC
  // ---------------------------------------------------------
  toggleChat() {
    this.chatVisible = !this.chatVisible;
  }

  sendMessage() {
    if (!this.chatInput.trim()) return;
    this.messages.push({ text: this.chatInput, isUser: true });
    const query = this.chatInput.toLowerCase();
    this.chatInput = '';
    this.messages.push({ text: 'Engineer is typing...', isUser: false, isTyping: true });

    setTimeout(() => {
      this.messages = this.messages.filter(m => !m.isTyping);
      let response = "I've logged that. For immediate service, please use our 'Request Consultation' form below.";
      if (query.includes("price") || query.includes("cost")) response = "Our managed plans start at $99/mo.";
      this.messages.push({ text: response, isUser: false });
    }, 1500);
  }
}
