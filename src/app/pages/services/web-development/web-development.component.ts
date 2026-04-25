import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-web-development',
  imports: [CommonModule, RouterModule],
  templateUrl: './web-development.component.html',
  styleUrls: ['./web-development.component.css']
})
export class WebDevelopmentComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-web-development';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-web-development-breadcrumb';

  constructor() {
    const pageTitle = 'Web Development Vaughan Small Business | CtrlShift IT Services';
    const description =
      '15+ years of enterprise DevOps and IT support for Ontario small businesses. Web development services for Vaughan and GTA companies.';
    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/web-development',
      serviceName: 'Web Development Services',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
