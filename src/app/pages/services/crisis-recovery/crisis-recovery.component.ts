import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-crisis-recovery',
  imports: [CommonModule, RouterModule],
  templateUrl: './crisis-recovery.component.html',
  styleUrls: ['./crisis-recovery.component.css']
})
export class CrisisRecoveryComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-crisis-recovery';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-crisis-recovery-breadcrumb';

  constructor() {
    const pageTitle = 'IT Disaster Recovery Vaughan Small Business | CtrlShift IT Services';
    const description =
      '15+ years of enterprise DevOps and IT support for Ontario small businesses. Rapid crisis recovery for Vaughan and GTA offices, hardening environments after outages.';
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
