import { Component, inject, HostListener, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  menuOpen = false;
  locationsOpen = false;
  industriesOpen = false;
  guidesOpen = false;
  toolsOpen = false;

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeNavMenus();
      });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupNavbarScroll();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      this.locationsOpen = false;
      this.industriesOpen = false;
      this.guidesOpen = false;
      this.toolsOpen = false;
    }
  }

  toggleLocations(event: Event): void {
    event.preventDefault();
    this.locationsOpen = !this.locationsOpen;
    this.industriesOpen = false;
    this.guidesOpen = false;
    this.toolsOpen = false;
  }

  toggleIndustries(event: Event): void {
    event.preventDefault();
    this.industriesOpen = !this.industriesOpen;
    this.locationsOpen = false;
    this.guidesOpen = false;
    this.toolsOpen = false;
  }

  toggleGuides(event: Event): void {
    event.preventDefault();
    this.guidesOpen = !this.guidesOpen;
    this.locationsOpen = false;
    this.industriesOpen = false;
    this.toolsOpen = false;
  }

  toggleTools(event: Event): void {
    event.preventDefault();
    this.toolsOpen = !this.toolsOpen;
    this.locationsOpen = false;
    this.industriesOpen = false;
    this.guidesOpen = false;
  }

  closeNavMenus(): void {
    this.menuOpen = false;
    this.locationsOpen = false;
    this.industriesOpen = false;
    this.guidesOpen = false;
    this.toolsOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
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
    const nav = this.document.querySelector('.navbar');
    if (!nav || !this.document.defaultView) return;
    
    const onScroll = (): void => {
      const scrolled = (this.document.defaultView?.scrollY ?? 0) > 20;
      nav.classList.toggle('scrolled', scrolled);
    };
    this.document.defaultView.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}
