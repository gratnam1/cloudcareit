import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BLOG_POSTS } from './data/blog-posts.registry';
import type { BlogPostMeta } from './data/blog.types';

@Component({
  selector: 'app-blog-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent {
  posts: BlogPostMeta[] = [...BLOG_POSTS].sort(
    (a, b) => (b.date ?? '').localeCompare(a.date ?? '')
  );

  trackBySlug = (_: number, p: BlogPostMeta) => p.slug;
}
