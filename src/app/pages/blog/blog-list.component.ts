import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService, type BlogPost } from './blog.service';
import { BLOG_POSTS } from './data/blog-posts.registry';
import { SeoService } from '../../shared/seo/seo.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit, OnDestroy {
  private blogService = inject(BlogService);
  private seo = inject(SeoService);
  private readonly BLOG_LIST_SCHEMA_ID = 'blog-list';

  posts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  availableTags: string[] = [];

  loading = false;
  searchTerm = '';
  activeTag = 'all';

  ngOnInit(): void {
    this.seo.update({
      title: 'IT Support Blog | Managed IT, Security & Cloud Insights',
      description:
        'Actionable IT guidance for Vaughan and GTA businesses: managed IT services, Microsoft 365, Google Workspace, networking, security, and continuity.',
      canonicalPath: '/blog',
      type: 'website'
    });

    // Show fallback registry posts immediately.
    this.setPosts(BLOG_POSTS);

    this.blogService.getPosts().subscribe({
      next: (posts) => {
        this.setPosts(posts);
        this.loading = false;
      },
      error: () => {
        // Keep preloaded fallback posts if background fetch fails unexpectedly.
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.BLOG_LIST_SCHEMA_ID);
  }

  onSearchInput(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onTagChange(event: Event): void {
    this.activeTag = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.activeTag = 'all';
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.searchTerm.trim().length > 0 || this.activeTag !== 'all';
  }

  trackBySlug(_: number, post: BlogPost): string {
    return post.slug;
  }

  private setPosts(posts: BlogPost[]): void {
    this.posts = this.sortPostsByDateDesc(posts);
    this.availableTags = this.extractTags(this.posts);
    this.applyFilters();
    this.updateBlogListSchema(this.posts);
  }

  private applyFilters(): void {
    const query = this.searchTerm.trim().toLowerCase();

    this.filteredPosts = this.posts.filter((post) => {
      const postTags = post.tags ?? [];
      const matchesTag = this.activeTag === 'all' || postTags.includes(this.activeTag);

      if (!matchesTag) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableText = [
        post.title,
        post.excerpt ?? '',
        post.date ?? '',
        ...postTags
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }

  private sortPostsByDateDesc(posts: BlogPost[]): BlogPost[] {
    return [...posts].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  }

  private extractTags(posts: BlogPost[]): string[] {
    const tags = new Set<string>();

    for (const post of posts) {
      for (const tag of post.tags ?? []) {
        tags.add(tag);
      }
    }

    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }

  private updateBlogListSchema(posts: BlogPost[]): void {
    this.seo.setStructuredData(this.BLOG_LIST_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'CtrlShift IT Services Blog',
      description:
        'Managed IT, cybersecurity, cloud operations, and growth-focused IT strategy insights for GTA businesses.',
      url: 'https://ctrlshiftit.ca/blog',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://ctrlshiftit.ca/blog/${post.slug}`,
          name: post.title
        }))
      }
    });
  }
}
