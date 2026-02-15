import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-cyber-insurance-readiness',
  imports: [CommonModule, RouterModule],
  templateUrl: './cyber-insurance-readiness.component.html',
  styleUrls: ['./cyber-insurance-readiness.component.css']
})
export class CyberInsuranceReadinessComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-cyber-insurance-readiness';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-cyber-insurance-readiness-breadcrumb';

  constructor() {
    const pageTitle = 'Cyber Insurance Readiness in Vaughan | CtrlShift IT Services';
    const description =
      'Cyber insurance readiness services for Vaughan and GTA businesses. We close control gaps, improve evidence quality, and prepare renewal-ready documentation with practical remediation support.';

    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/cyber-insurance-readiness-vaughan',
      serviceName: 'Cyber Insurance Readiness',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}

