import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-ai-integration',
  imports: [CommonModule, RouterModule],
  templateUrl: './ai-integration.component.html',
  styleUrls: ['./ai-integration.component.css']
})
export class AiIntegrationComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-ai-integration';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-ai-integration-breadcrumb';

  constructor() {
    const pageTitle = 'AI Integration Services Brampton Small Business';
    const description =
      'We build production-grade AI integrations — voice agents, intelligent chat, tool-calling workflows, and multi-channel automation — tailored to your business operations.';
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
