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

    this.title.setTitle(title);

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }

    this.meta.updateTag({ name: 'robots', content: robots ?? 'index,follow' });

    this.meta.updateTag({ property: 'og:title', content: title });
    if (description) {
      this.meta.updateTag({ property: 'og:description', content: description });
    }
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: SEO_SITE_NAME });
    if (publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: publishedTime });
    }

    this.meta.updateTag({ name: 'twitter:card', content: imageUrl ? 'summary_large_image' : 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    if (description) {
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }

    if (imageUrl) {
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
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
    try {
      return new URL(path, baseUrl).toString();
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
