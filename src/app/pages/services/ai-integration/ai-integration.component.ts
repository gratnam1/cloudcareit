import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';
import { ServiceLandingComponent } from '../service-landing/service-landing.component';
import { SERVICE_PAGES } from '../service-landing/service-pages.data';

@Component({
  standalone: true,
  selector: 'app-ai-integration',
  imports: [CommonModule, RouterModule, ServiceLandingComponent],
  templateUrl: './ai-integration.component.html',
  styleUrls: ['./ai-integration.component.css']
})
export class AiIntegrationComponent implements OnDestroy {
  private seo = inject(SeoService);
  readonly page = SERVICE_PAGES.aiIntegration;
  private readonly SERVICE_SCHEMA_ID = 'service-ai-integration';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-ai-integration-breadcrumb';

  constructor() {
    const pageTitle = 'AI Integration Services Brampton Small Business | CtrlShift IT Services';
    const description =
      '15+ years of enterprise DevOps and IT support for Ontario small businesses. Production-grade AI integrations tailored to your business operations.';
    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/ai-integration',
      serviceName: 'AI Integration Services',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
