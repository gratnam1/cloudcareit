import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BLOG_POSTS } from './data/blog-posts.registry';
import type { BlogPostMeta } from './data/blog.types';
import { SeoService } from '../../shared/seo/seo.service';

@Component({
  selector: 'app-blog-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  constructor(private seo: SeoService) {}

  posts: BlogPostMeta[] = [...BLOG_POSTS].sort(
    (a, b) => (b.date ?? '').localeCompare(a.date ?? '')
  );

  ngOnInit() {
    this.seo.update({
      title: 'Blog | CtrlShift IT Services',
      description: 'Practical IT and security insights for Ontario offices: managed IT, Microsoft 365, backups, and cybersecurity guidance.',
      type: 'website',
      canonicalPath: '/blog'
    });
  }

  trackBySlug = (_: number, p: BlogPostMeta) => p.slug;
}
