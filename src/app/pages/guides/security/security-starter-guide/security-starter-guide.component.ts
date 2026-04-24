import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';
import {
  SecurityStarterGuide,
  findSecurityGuideBySlug,
  findSecurityHubBySlug
} from '../security-guide-data';

const BASE_URL = 'https://ctrlshiftit.ca';

@Component({
  standalone: true,
  selector: 'app-security-starter-guide',
  imports: [CommonModule, RouterModule],
  templateUrl: './security-starter-guide.component.html',
  styleUrls: ['./security-starter-guide.component.css']
})
export class SecurityStarterGuideComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  readonly guide: SecurityStarterGuide;
  readonly hub = findSecurityHubBySlug(this.route.snapshot.paramMap.get('subcategory'));

  private readonly ARTICLE_SCHEMA_ID: string;
  private readonly BREADCRUMB_SCHEMA_ID: string;

  constructor() {
    const subcategory = this.route.snapshot.paramMap.get('subcategory');
    const guideSlug = this.route.snapshot.paramMap.get('guideSlug');
    const guide = findSecurityGuideBySlug(subcategory, guideSlug);

    if (!guide || !this.hub) {
      throw new Error(`Unknown security guide: ${subcategory}/${guideSlug}`);
    }

    this.guide = guide;
    this.ARTICLE_SCHEMA_ID = `guide-${guide.hubSlug}-${guide.slug}-article`;
    this.BREADCRUMB_SCHEMA_ID = `guide-${guide.hubSlug}-${guide.slug}-breadcrumb`;

    this.seo.update({
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: 'article',
      canonicalPath: guide.path
    });

    this.seo.setStructuredData(this.ARTICLE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${BASE_URL}${guide.path}`,
      url: `${BASE_URL}${guide.path}`,
      headline: guide.title,
      description: guide.metaDescription,
      inLanguage: 'en-CA',
      isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
      publisher: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        url: BASE_URL
      }
    });

    this.seo.setStructuredData(this.BREADCRUMB_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
        { '@type': 'ListItem', position: 3, name: 'Security', item: `${BASE_URL}/guides/security` },
        {
          '@type': 'ListItem',
          position: 4,
          name: this.hub.breadcrumbLabel,
          item: `${BASE_URL}${this.hub.path}`
        },
        { '@type': 'ListItem', position: 5, name: guide.title, item: `${BASE_URL}${guide.path}` }
      ]
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.ARTICLE_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
