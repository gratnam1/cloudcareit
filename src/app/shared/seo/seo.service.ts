import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { SEO_BASE_URL, SEO_SITE_NAME } from './seo.config';

export type SeoConfig = {
  title: string;
  description?: string;
  type?: 'website' | 'article';
  imageUrl?: string;
  canonicalPath?: string;
  robots?: string;
  publishedTime?: string;
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly defaultDescription =
    'Managed IT services in Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill. Proactive support, cybersecurity, and cloud management for growing offices.';

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  update(config: SeoConfig): void {
    const {
      title,
      description,
      type = 'website',
      imageUrl,
      canonicalPath,
      robots,
      publishedTime
    } = config;
    const effectiveDescription = description ?? this.defaultDescription;

    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: effectiveDescription });

    this.meta.updateTag({ name: 'robots', content: robots ?? 'index,follow' });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: effectiveDescription });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: SEO_SITE_NAME });
    this.meta.updateTag({ property: 'og:locale', content: 'en_CA' });
    if (publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: publishedTime });
    } else {
      this.meta.removeTag("property='article:published_time'");
    }

    this.meta.updateTag({ name: 'twitter:card', content: imageUrl ? 'summary_large_image' : 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: effectiveDescription });

    if (imageUrl) {
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    } else {
      this.meta.removeTag("property='og:image'");
      this.meta.removeTag("name='twitter:image'");
    }

    const canonicalUrl = this.resolveCanonicalUrl(canonicalPath);
    if (canonicalUrl) {
      this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
      this.meta.updateTag({ name: 'twitter:url', content: canonicalUrl });
      this.setCanonicalLink(canonicalUrl);
    }
  }

  setStructuredData(id: string, payload: unknown): void {
    const head = this.document?.head;
    if (!head) return;

    let script = head.querySelector(
      `script[type="application/ld+json"][data-seo-id="${id}"]`
    ) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-id', id);
      head.appendChild(script);
    }

    script.textContent = JSON.stringify(payload);
  }

  removeStructuredData(id: string): void {
    const script = this.document?.head?.querySelector(
      `script[type="application/ld+json"][data-seo-id="${id}"]`
    );
    script?.remove();
  }

  private resolveCanonicalUrl(canonicalPath?: string): string | null {
    const origin = this.document?.location?.origin;
    const baseUrl = origin && origin !== 'null' ? origin : SEO_BASE_URL;
    if (!baseUrl) return null;

    const path = canonicalPath ?? this.router.url ?? '/';
    const [pathWithoutFragment] = path.split('#');
    try {
      const resolved = new URL(pathWithoutFragment, baseUrl);
      resolved.hash = '';
      resolved.search = '';
      return resolved.toString();
    } catch {
      return null;
    }
  }

  private setCanonicalLink(url: string): void {
    const head = this.document?.head;
    if (!head) return;

    let link = head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
