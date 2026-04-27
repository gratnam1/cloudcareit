import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';
import { ServiceLandingComponent } from '../service-landing/service-landing.component';
import { SERVICE_PAGES } from '../service-landing/service-pages.data';

@Component({
  standalone: true,
  selector: 'app-medical-clinic-it',
  imports: [CommonModule, RouterModule, ServiceLandingComponent],
  templateUrl: './medical-clinic-it.component.html',
  styleUrls: ['./medical-clinic-it.component.css']
})
export class MedicalClinicItComponent implements OnDestroy {
  private seo = inject(SeoService);
  readonly page = SERVICE_PAGES.medicalClinicIt;
  private readonly SERVICE_SCHEMA_ID = 'service-medical-clinic-it';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-medical-clinic-it-breadcrumb';

  constructor() {
    const pageTitle = 'Managed IT for Vaughan Clinics';
    const description =
      'Managed IT for Vaughan medical clinics: Microsoft 365, endpoint protection, clinic Wi-Fi, backups, and vendor support.';

    applyServicePageSeo(this.seo, {
      title: pageTitle,
      description,
      canonicalPath: '/managed-it-for-medical-clinics-vaughan',
      serviceName: 'Managed IT for Medical Clinics',
      schemaId: this.SERVICE_SCHEMA_ID,
      breadcrumbId: this.BREADCRUMB_SCHEMA_ID
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
