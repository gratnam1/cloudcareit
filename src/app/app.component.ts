import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
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

  // --- AI Chat State (Kept Global) ---
  chatVisible = false;
  chatInput = '';
  messages: { text: string; isUser: boolean; isTyping?: boolean }[] = [
    { text: "Hello! I'm the CtrlShift IT Services AI. Are you looking for IT support in a specific city?", isUser: false }
  ];

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (!fragment) return;

        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 50);
      });
  }

  ngOnInit(): void {
    this.seo.setStructuredData('global-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CtrlShift IT Services',
      url: 'https://ctrlshiftit.ca',
      logo: 'https://ctrlshiftit.ca/wp-content/uploads/logo.png',
      telephone: '+1-647-503-5779',
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
