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

  constructor() {
    const pageTitle = 'Managed IT Services | CtrlShift IT Services';
    const description = 'Predictable, proactive IT for growing offices. Monitoring, patching, helpdesk support, backups, and security baselines—handled by senior engineers.';
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
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.HUB_ITEMLIST_SCHEMA_ID);
  }
}
