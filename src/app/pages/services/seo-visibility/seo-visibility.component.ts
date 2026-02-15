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
    const pageTitle = 'SEO Services in Vaughan & GTA | CtrlShift IT Services';
    const description =
      'Local SEO services for Vaughan and GTA businesses. We improve technical SEO, service-page relevance, and content architecture to grow qualified organic traffic.';
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
