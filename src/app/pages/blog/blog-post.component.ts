import {
  Component,
  ViewChild,
  ViewContainerRef,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BLOG_POSTS } from './data/blog-posts.registry';
import { SeoService } from '../../shared/seo/seo.service';

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  @ViewChild('vc', { read: ViewContainerRef, static: true })
  vc!: ViewContainerRef;

  notFound = false;

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
      this.notFound = true;
      this.seo.update({
        title: 'Blog post not found | CtrlShift IT Services',
        description: 'The blog post you are looking for could not be found.',
        type: 'website',
        canonicalPath: '/blog',
        robots: 'noindex, nofollow'
      });
      return;
    }

    // SSR-friendly SEO
    this.seo.update({
      title: `${post.title} | CtrlShift IT Services`,
      description: post.excerpt,
      type: 'article',
      canonicalPath: `/blog/${post.slug}`,
      publishedTime: post.date
    });

    this.vc.clear();
    const componentType = await post.loadComponent();
    this.vc.createComponent(componentType as any);
  }
}
