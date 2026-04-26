import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';
import { ServiceLandingComponent } from '../service-landing/service-landing.component';
import { SERVICE_PAGES } from '../service-landing/service-pages.data';

@Component({
  standalone: true,
  selector: 'app-office-networking',
  imports: [CommonModule, RouterModule, ServiceLandingComponent],
  templateUrl: './office-networking.component.html',
  styleUrls: ['./office-networking.component.css']
})
export class OfficeNetworkingComponent implements OnDestroy {
  private seo = inject(SeoService);
  readonly page = SERVICE_PAGES.officeNetworking;
  private readonly SERVICE_SCHEMA_ID = 'service-office-networking';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-office-networking-breadcrumb';

  constructor() {
    const pageTitle = 'Office Networking & Wi-Fi in Vaughan & GTA | CtrlShift IT Services';
    const description =
      '15+ years of enterprise DevOps and IT support for Ontario small businesses. Office networking and Wi-Fi support across Vaughan and GTA.';
    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/office-networking',
      serviceName: 'Office Networking and Wi-Fi',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
