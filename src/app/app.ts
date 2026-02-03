import { Component, signal, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  protected readonly title = signal('cloudcare-frontend');

  // --- Form State ---
  submitted = false;
  isLoading = false;

  // --- AI Chat State ---
  chatVisible = false;
  chatInput = '';
  messages: { text: string; isUser: boolean; isTyping?: boolean }[] = [
    { text: "Hello! I'm the CloudCare Triage AI. Are you reporting an emergency outage in Ontario, or looking for a project quote?", isUser: false }
  ];

  // 1. INJECT THE CHANGE DETECTOR
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // --- GSAP Animations ---
    gsap.from(".hero-content", {
      duration: 1.2,
      y: 40,
      opacity: 0,
      stagger: 0.2,
      ease: "power4.out"
    });

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

  // --- 2. UPDATED SUBMIT LOGIC ---
  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // REPLACE THIS WITH YOUR REAL FORMSPREE ID
      const response = await fetch("https://formspree.io/f/mwvozjnn", {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // 3. FORCE THE SCREEN UPDATE
        this.submitted = true;
        this.isLoading = false;
        this.cdr.detectChanges(); // <--- This is the magic line that fixes the stickiness
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

  // --- Chat Logic ---
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
