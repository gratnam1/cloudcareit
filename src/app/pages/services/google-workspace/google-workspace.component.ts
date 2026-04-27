import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';
import { ServiceLandingComponent } from '../service-landing/service-landing.component';
import { SERVICE_PAGES } from '../service-landing/service-pages.data';

@Component({
  standalone: true,
  selector: 'app-google-workspace',
  imports: [CommonModule, RouterModule, ServiceLandingComponent],
  templateUrl: './google-workspace.component.html',
  styleUrls: ['./google-workspace.component.css']
})
export class GoogleWorkspaceComponent implements OnDestroy {
  private seo = inject(SeoService);
  readonly page = SERVICE_PAGES.googleWorkspace;
  private readonly SERVICE_SCHEMA_ID = 'service-google-workspace';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-google-workspace-breadcrumb';

  constructor() {
    const pageTitle = 'Google Workspace Support for SMBs';
    const description =
      'Google Workspace setup, migration, security, and ongoing admin support for small businesses across Vaughan and the GTA.';
    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/google-workspace',
      serviceName: 'Google Workspace Support',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
