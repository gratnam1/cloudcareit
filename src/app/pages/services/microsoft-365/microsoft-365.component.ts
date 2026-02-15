import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-microsoft-365',
  imports: [CommonModule, RouterModule],
  templateUrl: './microsoft-365.component.html',
  styleUrls: ['./microsoft-365.component.css']
})
export class Microsoft365Component implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-microsoft-365';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-microsoft-365-breadcrumb';

  constructor() {
    const pageTitle = 'Microsoft 365 Support in Vaughan & GTA | CtrlShift IT Services';
    const description =
      'Microsoft 365 support for Vaughan and GTA companies. We handle tenant security, Teams reliability, mailbox stability, and governance for business-critical collaboration.';
    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/microsoft-365',
      serviceName: 'Microsoft 365 Support',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
