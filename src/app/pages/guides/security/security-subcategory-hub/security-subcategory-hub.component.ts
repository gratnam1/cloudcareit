import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';
import { SecurityHub, findSecurityHubBySlug } from '../security-guide-data';

const BASE_URL = 'https://ctrlshiftit.ca';

@Component({
  standalone: true,
  selector: 'app-security-subcategory-hub',
  imports: [CommonModule, RouterModule],
  templateUrl: './security-subcategory-hub.component.html',
  styleUrls: ['./security-subcategory-hub.component.css']
})
export class SecuritySubcategoryHubComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  readonly hub: SecurityHub;

  constructor() {
    const slug = this.route.snapshot.paramMap.get('subcategory');
    const hub = findSecurityHubBySlug(slug);

    if (!hub) {
      throw new Error(`Unknown security guide hub: ${slug}`);
    }

    this.hub = hub;

    this.seo.update({
      title: hub.metaTitle,
      description: hub.metaDescription,
      type: 'website',
      canonicalPath: hub.path
    });

    this.seo.setStructuredData(hub.schemaId, {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}${hub.path}`,
      url: `${BASE_URL}${hub.path}`,
      name: hub.title,
      description: hub.metaDescription,
      inLanguage: 'en-CA',
      isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
      publisher: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        url: BASE_URL
      },
      hasPart: hub.guides
        .filter((guide) => guide.available)
        .map((guide) => ({
          '@type': 'Article',
          name: guide.title,
          url: `${BASE_URL}${guide.path}`,
          description: guide.summary
        }))
    });

    this.seo.setStructuredData(hub.breadcrumbSchemaId, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
        { '@type': 'ListItem', position: 3, name: 'Security', item: `${BASE_URL}/guides/security` },
        {
          '@type': 'ListItem',
          position: 4,
          name: hub.breadcrumbLabel,
          item: `${BASE_URL}${hub.path}`
        }
      ]
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.hub.schemaId);
    this.seo.removeStructuredData(this.hub.breadcrumbSchemaId);
  }
}
