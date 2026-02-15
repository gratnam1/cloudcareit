import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ViewContainerRef,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { SeoService } from '../../shared/seo/seo.service';
import { BLOG_POSTS } from './data/blog-posts.registry';

type RelatedService = {
  label: string;
  path: string;
};

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BlogPostComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  private seo = inject(SeoService);
  private readonly BLOG_POST_SCHEMA_ID = 'blog-post';

  @ViewChild('vc', { read: ViewContainerRef, static: true })
  private vc!: ViewContainerRef;

  loading = signal(true);
  notFound = signal(false);
  markdownContent = signal<SafeHtml | null>(null);

  postTitle = signal('Blog Post');
  postSummary = signal('');
  publishedDate = signal('');
  readingTime = signal('');
  postTags = signal<string[]>([]);
  relatedService = signal<RelatedService | null>(null);

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.loading.set(false);
      this.notFound.set(true);
      this.seo.update({
        title: 'Post Not Found | CtrlShift IT Services',
        description: 'The requested blog article could not be found.',
        canonicalPath: '/blog',
        robots: 'noindex,nofollow'
      });
      this.seo.removeStructuredData(this.BLOG_POST_SCHEMA_ID);
      return;
    }

    const registryPost = BLOG_POSTS.find((post) => post.slug === slug);
    if (registryPost) {
      this.postTitle.set(registryPost.title);
      this.postSummary.set(registryPost.excerpt ?? '');
      this.publishedDate.set(this.formatPublishedDate(registryPost.date));
      this.postTags.set(registryPost.tags ?? []);
      this.relatedService.set(this.getRelatedService(slug));
    }

    if (registryPost?.loadComponent) {
      const publishedIso = this.toIsoDate(registryPost.date);
      const summary =
        registryPost.excerpt ??
        'Practical guidance from CtrlShift IT Services for secure, reliable, and scalable business operations.';
      this.applyArticleSeo(
        slug,
        registryPost.title,
        summary,
        publishedIso,
        registryPost.tags ?? []
      );

      try {
        const componentType = await registryPost.loadComponent();
        this.vc.clear();
        this.vc.createComponent(componentType);
        this.loading.set(false);
        return;
      } catch (error) {
        console.error('Error loading registry blog post component:', error);
      }
    }

    void this.loadMarkdownPost(slug);
  }

  private async loadMarkdownPost(slug: string): Promise<void> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    try {
      const response = await fetch(`/assets/blog/${slug}.md`, {
        signal: controller.signal,
        headers: {
          Accept: 'text/markdown,text/plain,*/*'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for /assets/blog/${slug}.md`);
      }

      const rawMarkdown = await response.text();
      const { title, body } = this.extractPrimaryHeading(rawMarkdown);
      const effectiveTitle = title || this.postTitle() || 'Blog Post';

      this.postTitle.set(effectiveTitle);
      if (!this.postSummary()) {
        this.postSummary.set(this.extractSummary(body));
      }
      this.readingTime.set(this.estimateReadingTime(body));

      const effectiveDescription = this.postSummary() || this.extractSummary(body);
      const registryPost = BLOG_POSTS.find((post) => post.slug === slug);
      const publishedIso = this.toIsoDate(registryPost?.date);
      this.applyArticleSeo(
        slug,
        effectiveTitle,
        effectiveDescription,
        publishedIso,
        this.postTags()
      );

      try {
        const html = await marked.parse(body);
        this.markdownContent.set(this.sanitizer.bypassSecurityTrustHtml(html));
        this.notFound.set(false);
      } catch (error) {
        console.error('Markdown parsing error:', error);
        this.notFound.set(true);
      }
    } catch (error) {
      console.error(`Error loading markdown post for slug "${slug}":`, error);
      this.notFound.set(true);
      this.seo.update({
        title: 'Post Not Found | CtrlShift IT Services',
        description: 'The requested blog article could not be found.',
        canonicalPath: '/blog',
        robots: 'noindex,nofollow'
      });
      this.seo.removeStructuredData(this.BLOG_POST_SCHEMA_ID);
    } finally {
      clearTimeout(timeoutId);
      this.loading.set(false);
    }
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.BLOG_POST_SCHEMA_ID);
  }

  private extractPrimaryHeading(markdown: string): { title: string; body: string } {
    const match = markdown.match(/^#\s+(.+)$/m);
    const title = match ? match[1].trim() : '';

    if (!match || !match[0]) {
      return { title, body: markdown };
    }

    const body = markdown.replace(match[0], '').replace(/^\s+/, '');
    return { title, body };
  }

  private extractSummary(markdown: string): string {
    const blocks = markdown
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter((block) => block.length > 0);

    for (const block of blocks) {
      if (block.startsWith('#') || block.startsWith('```') || block.startsWith('* ') || block.startsWith('- ')) {
        continue;
      }

      const plain = block
        .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
        .replace(/[>*_`]/g, '')
        .trim();

      if (plain.length > 0) {
        return plain.length > 180 ? `${plain.slice(0, 177)}...` : plain;
      }
    }

    return 'Practical guidance from CtrlShift IT Services for secure, reliable, and scalable business operations.';
  }

  private estimateReadingTime(markdown: string): string {
    const textOnly = markdown
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
      .replace(/[#>*_`-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const words = textOnly ? textOnly.split(' ').length : 0;
    const minutes = Math.max(1, Math.ceil(words / 220));
    return `${minutes} min read`;
  }

  private formatPublishedDate(date?: string): string {
    if (!date) return '';

    const parsed = new Date(`${date}T12:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return '';

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(parsed);
  }

  private toIsoDate(date?: string): string | undefined {
    if (!date) return undefined;
    const parsed = new Date(`${date}T12:00:00Z`);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  }

  private applyArticleSeo(
    slug: string,
    title: string,
    description: string,
    publishedIso?: string,
    tags: string[] = []
  ): void {
    const canonicalPath = `/blog/${slug}`;
    const canonicalUrl = `https://ctrlshiftit.ca${canonicalPath}`;
    this.seo.update({
      title: `${title} | CtrlShift IT Services`,
      description,
      canonicalPath,
      type: 'article',
      publishedTime: publishedIso
    });

    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      url: canonicalUrl,
      mainEntityOfPage: canonicalUrl,
      author: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services'
      },
      publisher: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        logo: {
          '@type': 'ImageObject',
          url: 'https://ctrlshiftit.ca/wp-content/uploads/logo.png'
        }
      }
    };

    if (publishedIso) {
      schema['datePublished'] = publishedIso;
      schema['dateModified'] = publishedIso;
    }

    if (tags.length > 0) {
      schema['keywords'] = tags.join(', ');
      schema['about'] = tags.map((tag) => ({
        '@type': 'Thing',
        name: tag
      }));
    }

    this.seo.setStructuredData(this.BLOG_POST_SCHEMA_ID, schema);
  }

  private getRelatedService(slug: string): RelatedService | null {
    const related: Record<string, RelatedService> = {
      'managed-it-benefits': { label: 'Managed IT Services', path: '/managed-it-services' },
      'google-workspace-guide': { label: 'Google Workspace Support', path: '/google-workspace' },
      'microsoft-365-tips': { label: 'Microsoft 365 Support', path: '/microsoft-365' },
      'office-networking-basics': { label: 'Office Networking & Wi-Fi', path: '/office-networking' },
      'aws-infrastructure-best-practices': { label: 'AWS Infrastructure Support', path: '/aws-infrastructure' },
      'firewall-security-essentials': { label: 'Security & Firewall', path: '/security-firewall' },
      'crisis-recovery-plan': { label: 'Crisis Recovery', path: '/crisis-recovery' },
      'web-development-trends': { label: 'Web Development', path: '/web-development' },
      'seo-visibility-guide': { label: 'SEO & Visibility', path: '/seo-visibility' },
      'lead-generation-strategies': { label: 'Lead Generation', path: '/lead-generation' },
    };

    return related[slug] ?? null;
  }
}
