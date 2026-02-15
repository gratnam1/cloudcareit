import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-managed-it',
  imports: [CommonModule, RouterModule],
  templateUrl: './managed-it.component.html',
  styleUrls: ['./managed-it.component.css']
})
export class ManagedItComponent implements OnDestroy {
  private seo = inject(SeoService);
  private readonly HUB_ITEMLIST_SCHEMA_ID = 'managed-it-service-areas';
  private readonly MANAGED_IT_SERVICE_SCHEMA_ID = 'managed-it-service-schema';

  constructor() {
    const pageTitle = 'Managed IT Services in Vaughan & GTA | CtrlShift IT Services';
    const description =
      'Managed IT services for Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill. Predictable support, cybersecurity baselines, free quarterly vulnerability scans, cloud administration, and fast incident response.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/managed-it-services'
    });

    this.seo.setStructuredData(this.HUB_ITEMLIST_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Managed IT Service Areas',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Managed IT Services Vaughan',
          url: 'https://ctrlshiftit.ca/managed-it-services-vaughan'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Managed IT Services Toronto',
          url: 'https://ctrlshiftit.ca/managed-it-services-toronto'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Managed IT Services Mississauga',
          url: 'https://ctrlshiftit.ca/managed-it-services-mississauga'
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Managed IT Services Thornhill',
          url: 'https://ctrlshiftit.ca/managed-it-services-thornhill'
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Managed IT Services Richmond Hill',
          url: 'https://ctrlshiftit.ca/managed-it-services-richmond-hill'
        }
      ]
    });

    this.seo.setStructuredData(this.MANAGED_IT_SERVICE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Managed IT Services',
      serviceType: 'Managed IT Services',
      description,
      url: 'https://ctrlshiftit.ca/managed-it-services',
      provider: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        url: 'https://ctrlshiftit.ca',
      },
      areaServed: [
        { '@type': 'City', name: 'Vaughan' },
        { '@type': 'City', name: 'Toronto' },
        { '@type': 'City', name: 'Mississauga' },
        { '@type': 'City', name: 'Thornhill' },
        { '@type': 'City', name: 'Richmond Hill' }
      ]
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.HUB_ITEMLIST_SCHEMA_ID);
    this.seo.removeStructuredData(this.MANAGED_IT_SERVICE_SCHEMA_ID);
  }
}
