import {
  Component,
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
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  private seo = inject(SeoService);

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
      this.seo.update({ title: 'Post Not Found' });
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
      this.seo.update({
        title: `${registryPost.title} | CtrlShift IT Services`,
        canonicalPath: `/blog/${slug}`,
        type: 'article'
      });

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

      this.seo.update({
        title: `${effectiveTitle} | CtrlShift IT Services`,
        canonicalPath: `/blog/${slug}`,
        type: 'article'
      });

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
      this.seo.update({ title: 'Post Not Found' });
    } finally {
      clearTimeout(timeoutId);
      this.loading.set(false);
    }
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
