import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';
import { ServiceLandingComponent } from '../service-landing/service-landing.component';
import { SERVICE_PAGES } from '../service-landing/service-pages.data';

@Component({
  standalone: true,
  selector: 'app-security-firewall',
  imports: [CommonModule, RouterModule, ServiceLandingComponent],
  templateUrl: './security-firewall.component.html',
  styleUrls: ['./security-firewall.component.css']
})
export class SecurityFirewallComponent implements OnDestroy {
  private seo = inject(SeoService);
  readonly page = SERVICE_PAGES.securityFirewall;
  private readonly SERVICE_SCHEMA_ID = 'service-security-firewall';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-security-firewall-breadcrumb';

  constructor() {
    const pageTitle = 'Security & Firewall Services Vaughan & GTA';
    const description =
      'Managed firewall and security support for Vaughan and GTA offices: endpoint protection, remote access, email trust, and response planning.';
    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/security-firewall',
      serviceName: 'Security and Firewall Services',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
