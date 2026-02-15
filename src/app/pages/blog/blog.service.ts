import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import type { Type } from '@angular/core';
import { Observable, catchError, map, of, startWith, timeout } from 'rxjs';
import { BLOG_POSTS } from './data/blog-posts.registry';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  loadComponent?: () => Promise<Type<unknown>>;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  getPosts(): Observable<BlogPost[]> {
    const registryPosts = this.sortByDateDesc(BLOG_POSTS.map((post) => ({ ...post })));

    // Avoid server-side self-fetches during SSR/prerender.
    if (isPlatformServer(this.platformId)) {
      return of(registryPosts);
    }

    return this.http.get<BlogPost[]>('/assets/blog/index.json').pipe(
      timeout(5000),
      map((assetPosts) => this.mergePosts(assetPosts ?? [], registryPosts)),
      catchError((error) => {
        console.error('Error loading /assets/blog/index.json, using registry posts only:', error);
        return of(registryPosts);
      }),
      // Ensure the page renders immediately, even if HTTP is slow/failing.
      startWith(registryPosts)
    );
  }

  private mergePosts(assetPosts: BlogPost[], registryPosts: BlogPost[]): BlogPost[] {
    const bySlug = new Map<string, BlogPost>();

    for (const post of assetPosts) {
      bySlug.set(post.slug, post);
    }

    // Registry posts win by slug so route components are available when present.
    for (const post of registryPosts) {
      const previous = bySlug.get(post.slug);
      bySlug.set(post.slug, { ...previous, ...post });
    }

    return this.sortByDateDesc(Array.from(bySlug.values()));
  }

  private sortByDateDesc(posts: BlogPost[]): BlogPost[] {
    return [...posts].sort((a, b) => {
      const aDate = a.date ? new Date(a.date).getTime() : 0;
      const bDate = b.date ? new Date(b.date).getTime() : 0;
      return bDate - aDate;
    });
  }
}
