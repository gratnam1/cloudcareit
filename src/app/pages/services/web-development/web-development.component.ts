import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-web-development',
  imports: [CommonModule, RouterModule],
  templateUrl: './web-development.component.html',
  styleUrls: ['./web-development.component.css']
})
export class WebDevelopmentComponent {
  private seo = inject(SeoService);

  constructor() {
    const pageTitle = 'Web Development | CtrlShift IT Services';
    const description = 'Fast, responsive, secure websites built on modern frameworks. Designed to load quickly and convert visitors into leads.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/web-development'
    });
  }
}
