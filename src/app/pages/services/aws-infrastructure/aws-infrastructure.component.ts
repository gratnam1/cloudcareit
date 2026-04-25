import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-aws-infrastructure',
  imports: [CommonModule, RouterModule],
  templateUrl: './aws-infrastructure.component.html',
  styleUrls: ['./aws-infrastructure.component.css']
})
export class AwsInfrastructureComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-aws-infrastructure';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-aws-infrastructure-breadcrumb';

  constructor() {
    const pageTitle = 'AWS Cloud Services Brampton Small Business | CtrlShift IT Services';
    const description =
      '15+ years of enterprise DevOps and IT support for Ontario small businesses. Secure AWS infrastructure support for Vaughan and GTA businesses.';
    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/aws-infrastructure',
      serviceName: 'AWS Infrastructure Support',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
