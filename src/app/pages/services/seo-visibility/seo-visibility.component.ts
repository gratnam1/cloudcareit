import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-seo-visibility',
  imports: [CommonModule, RouterModule],
  templateUrl: './seo-visibility.component.html',
  styleUrls: ['./seo-visibility.component.css']
})
export class SeoVisibilityComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    const pageTitle = 'SEO & Visibility | CtrlShift IT Services';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: 'Increase local visibility so GTA clients can find you. We focus on technical SEO, location pages, and content that ranks.' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: 'Increase local visibility so GTA clients can find you. We focus on technical SEO, location pages, and content that ranks.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
