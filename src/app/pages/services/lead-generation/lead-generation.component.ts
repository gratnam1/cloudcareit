import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-lead-generation',
  imports: [CommonModule, RouterModule],
  templateUrl: './lead-generation.component.html',
  styleUrls: ['./lead-generation.component.css']
})
export class LeadGenerationComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-lead-generation';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-lead-generation-breadcrumb';

  constructor() {
    const pageTitle = 'B2B Lead Generation Oakville Small Business | CtrlShift IT Services';
    const description =
      '15+ years of enterprise DevOps and IT support for Ontario small businesses. Lead generation services for Vaughan and GTA businesses.';
    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/lead-generation',
      serviceName: 'B2B Lead Generation',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
