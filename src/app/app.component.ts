import { Component, OnInit, inject, Inject, HostListener } from '@angular/core';
import { CommonModule, ViewportScroller, DOCUMENT } from '@angular/common';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { SeoService } from './shared/seo/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private seo = inject(SeoService);
  menuOpen = false;
  locationsOpen = false;

  // --- AI Chat State (Kept Global) ---
  chatVisible = false;
  chatInput = '';
  messages: { text: string; isUser: boolean; isTyping?: boolean }[] = [
    { text: "Hello! I'm the CtrlShift IT Services AI. Are you looking for IT support in a specific city?", isUser: false }
  ];

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeNavMenus();
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (!fragment) return;

        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
          const el = this.document.getElementById(fragment);
          if (el) {
            el.setAttribute('tabindex', '-1');
            el.focus({ preventScroll: true });
          }
        }, 50);
      });
  }

  ngOnInit(): void {
    this.setupNavbarScroll();
    this.seo.setStructuredData('global-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CtrlShift IT Services',
      url: 'https://ctrlshiftit.ca',
      logo: 'https://ctrlshiftit.ca/wp-content/uploads/logo.png',
      telephone: '+1-647-503-5779',
      sameAs: [
        'https://www.linkedin.com/company/ctrlshift-it-services',
        'https://www.facebook.com/ctrlshiftit',
        'https://clutch.co/profile/ctrlshift-it-services'
      ],
      areaServed: [
        { '@type': 'City', name: 'Vaughan' },
        { '@type': 'City', name: 'Toronto' },
        { '@type': 'City', name: 'Mississauga' },
        { '@type': 'City', name: 'Thornhill' },
        { '@type': 'City', name: 'Richmond Hill' }
      ]
    });

    this.seo.setStructuredData('global-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'CtrlShift IT Services',
      url: 'https://ctrlshiftit.ca',
      inLanguage: 'en-CA',
      publisher: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services'
      }
    });
  }

  toggleChat() {
    this.chatVisible = !this.chatVisible;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      this.locationsOpen = false;
    }
  }

  toggleLocations(event: Event): void {
    event.preventDefault();
    this.locationsOpen = !this.locationsOpen;
  }

  closeNavMenus(): void {
    this.menuOpen = false;
    this.locationsOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node | null;
    const nav = this.document.querySelector('.navbar');
    if (!target || !nav) return;
    if (!nav.contains(target)) {
      this.closeNavMenus();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeNavMenus();
  }

  private setupNavbarScroll(): void {
    if (typeof this.document.defaultView === 'undefined') return;
    const nav = this.document.querySelector('.navbar');
    if (!nav) return;
    const onScroll = (): void => {
      const scrolled = (this.document.defaultView?.scrollY ?? 0) > 20;
      nav.classList.toggle('scrolled', scrolled);
    };
    this.document.defaultView?.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  sendMessage() {
    if (!this.chatInput.trim()) return;
    this.messages.push({ text: this.chatInput, isUser: true });

    // Simulate thinking
    this.messages.push({ text: '...', isUser: false, isTyping: true });

    setTimeout(() => {
      this.messages = this.messages.filter(m => !m.isTyping);
      this.messages.push({ text: "I've logged your request. Please check our Locations menu for local support teams.", isUser: false });
      this.chatInput = '';
    }, 1500);
  }
}
