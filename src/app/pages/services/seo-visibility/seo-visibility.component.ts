import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-seo-visibility',
  imports: [CommonModule, RouterModule],
  templateUrl: './seo-visibility.component.html',
  styleUrls: ['./seo-visibility.component.css']
})
export class SeoVisibilityComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-seo-visibility';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-seo-visibility-breadcrumb';

  constructor() {
    const pageTitle = 'SEO Services Vaughan Small Business | CtrlShift IT Services';
    const description =
      '15+ years of enterprise DevOps and IT support for Ontario small businesses. Local SEO services for Vaughan and GTA businesses.';
    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/seo-visibility',
      serviceName: 'Local SEO and Visibility Services',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
