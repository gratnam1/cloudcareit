import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-seo-visibility',
  imports: [CommonModule, RouterModule],
  templateUrl: './seo-visibility.component.html',
  styleUrls: ['./seo-visibility.component.css']
})
export class SeoVisibilityComponent {
  private seo = inject(SeoService);

  constructor() {
    const pageTitle = 'SEO & Visibility | CtrlShift IT Services';
    const description = 'Increase local visibility so GTA clients can find you. We focus on technical SEO, location pages, and content that ranks.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/seo-visibility'
    });
  }
}
