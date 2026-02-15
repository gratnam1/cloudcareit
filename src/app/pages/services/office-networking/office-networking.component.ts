import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-office-networking',
  imports: [CommonModule, RouterModule],
  templateUrl: './office-networking.component.html',
  styleUrls: ['./office-networking.component.css']
})
export class OfficeNetworkingComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-office-networking';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-office-networking-breadcrumb';

  constructor() {
    const pageTitle = 'Office Networking & Wi-Fi in Vaughan & GTA | CtrlShift IT Services';
    const description =
      'Office networking and Wi-Fi support across Vaughan and GTA. We design reliable connectivity, optimize coverage, and stabilize network performance for growing teams.';
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
