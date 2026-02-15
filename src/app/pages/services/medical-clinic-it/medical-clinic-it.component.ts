import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';
import { applyServicePageSeo } from '../service-page-seo';

@Component({
  standalone: true,
  selector: 'app-medical-clinic-it',
  imports: [CommonModule, RouterModule],
  templateUrl: './medical-clinic-it.component.html',
  styleUrls: ['./medical-clinic-it.component.css']
})
export class MedicalClinicItComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly SERVICE_SCHEMA_ID = 'service-medical-clinic-it';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-medical-clinic-it-breadcrumb';

  constructor() {
    const pageTitle = 'Managed IT for Medical Clinics in Vaughan | CtrlShift IT Services';
    const description =
      'Managed IT services for medical clinics in Vaughan and the GTA. We improve uptime, secure PHI workflows, and support front-desk and clinical systems with proactive maintenance.';

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

