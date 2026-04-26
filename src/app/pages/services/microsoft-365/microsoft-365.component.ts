import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';
import { ServiceLandingComponent } from '../service-landing/service-landing.component';
import { SERVICE_PAGES } from '../service-landing/service-pages.data';

@Component({
  standalone: true,
  selector: 'app-microsoft-365',
  imports: [CommonModule, RouterModule, ServiceLandingComponent],
  templateUrl: './microsoft-365.component.html',
  styleUrls: ['./microsoft-365.component.css']
})
export class Microsoft365Component implements OnDestroy {
  private seo = inject(SeoService);
  readonly page = SERVICE_PAGES.microsoft365;
  private readonly SERVICE_SCHEMA_ID = 'service-microsoft-365';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-microsoft-365-breadcrumb';

  constructor() {
    const pageTitle = 'Microsoft 365 Support in Vaughan & GTA | CtrlShift IT Services';
    const description =
      '15+ years of enterprise DevOps and IT support for Ontario small businesses. Microsoft 365 support for Vaughan and GTA companies, handling security and reliability.';
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
