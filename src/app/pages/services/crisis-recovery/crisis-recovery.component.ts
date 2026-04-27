import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';
import { ServiceLandingComponent } from '../service-landing/service-landing.component';
import { SERVICE_PAGES } from '../service-landing/service-pages.data';

@Component({
  standalone: true,
  selector: 'app-crisis-recovery',
  imports: [CommonModule, RouterModule, ServiceLandingComponent],
  templateUrl: './crisis-recovery.component.html',
  styleUrls: ['./crisis-recovery.component.css']
})
export class CrisisRecoveryComponent implements OnDestroy {
  private seo = inject(SeoService);
  readonly page = SERVICE_PAGES.crisisRecovery;
  private readonly SERVICE_SCHEMA_ID = 'service-crisis-recovery';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-crisis-recovery-breadcrumb';

  constructor() {
    const pageTitle = 'IT Disaster Recovery Vaughan Small Business | CtrlShift IT Services';
    const description =
      'IT disaster recovery support for Vaughan and GTA offices: outage triage, containment, restore coordination, and post-incident hardening.';
    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/crisis-recovery',
      serviceName: 'IT Crisis Recovery',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
