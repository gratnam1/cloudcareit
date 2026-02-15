import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-google-workspace',
  imports: [CommonModule, RouterModule],
  templateUrl: './google-workspace.component.html',
  styleUrls: ['./google-workspace.component.css']
})
export class GoogleWorkspaceComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-google-workspace';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-google-workspace-breadcrumb';

  constructor() {
    const pageTitle = 'Google Workspace Support in Vaughan & GTA | CtrlShift IT Services';
    const description =
      'Google Workspace support for Vaughan and GTA teams. We manage Gmail, Drive, account security, and admin workflows to keep business operations stable and secure.';
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
