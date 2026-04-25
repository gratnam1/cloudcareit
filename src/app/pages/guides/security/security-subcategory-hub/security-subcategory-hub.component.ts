import { Component, OnDestroy, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';
import {
  SecurityHub,
  SecurityHubRichContent,
  SecurityHubTableRow,
  findSecurityHubBySlug,
  findSecurityHubRichContentBySlug
} from '../security-guide-data';

const BASE_URL = 'https://ctrlshiftit.ca';

@Component({
  standalone: true,
  selector: 'app-security-subcategory-hub',
  imports: [CommonModule, RouterModule],
  templateUrl: './security-subcategory-hub.component.html',
  styleUrls: ['./security-subcategory-hub.component.css']
})
export class SecuritySubcategoryHubComponent implements OnDestroy, AfterViewInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  readonly hub: SecurityHub;
  readonly content: SecurityHubRichContent;
  readonly faqSchemaId: string;

  private scrollHandler?: () => void;
  private observer?: IntersectionObserver;

  get groupedThreatRows(): ReadonlyArray<{ group: string; rows: ReadonlyArray<SecurityHubTableRow> }> {
    const groups = new Map<string, SecurityHubTableRow[]>();
    this.content.tableRows.forEach((row) => {
      const group = row.group ?? 'Key areas';
      const rows = groups.get(group) ?? [];
      rows.push(row);
      groups.set(group, rows);
    });
    return Array.from(groups, ([group, rows]) => ({ group, rows }));
  }

  get uniqueHubRelatedLinks() {
    const fixedPaths = new Set([
      '/guides/security',
      '/guides/security/microsoft-365-security',
      '/guides/security/microsoft-365-security/microsoft-365-checklist'
    ]);
    const seen = new Set<string>();
    return this.hub.relatedLinks.filter((link) => {
      if (fixedPaths.has(link.path) || seen.has(link.path)) return false;
      seen.add(link.path);
      return true;
    });
  }

  constructor() {
    const slug = this.route.snapshot.paramMap.get('subcategory');
    const hub = findSecurityHubBySlug(slug);

    if (!hub) {
      throw new Error(`Unknown security guide hub: ${slug}`);
    }

    const content = findSecurityHubRichContentBySlug(slug);
    if (!content) {
      throw new Error(`Unknown security guide hub content: ${slug}`);
    }

    this.hub = hub;
    this.content = content;
    this.faqSchemaId = `${hub.schemaId}-faq`;

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

    this.seo.setStructuredData(this.faqSchemaId, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${BASE_URL}${hub.path}#faq`,
      mainEntity: content.faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
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

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initReadingProgress();
    this.initScrollAnimations();
  }

  private initReadingProgress(): void {
    const bar = document.getElementById('reading-progress');
    if (!bar) return;
    this.scrollHandler = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.scrollHandler();
  }

  private initScrollAnimations(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.hub.schemaId);
    this.seo.removeStructuredData(this.hub.breadcrumbSchemaId);
    this.seo.removeStructuredData(this.faqSchemaId);
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
      this.observer?.disconnect();
    }
  }
}
