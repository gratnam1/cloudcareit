import {
  Component,
  ViewChild,
  ViewContainerRef,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { BLOG_POSTS } from './data/blog-posts.registry';

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  @ViewChild('vc', { read: ViewContainerRef, static: true })
  vc!: ViewContainerRef;

  notFound = false;

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
      this.notFound = true;
      this.title.setTitle('Blog post not found | CtrlShift IT Services');
      return;
    }

    // SSR-friendly SEO
    this.title.setTitle(`${post.title} | CtrlShift IT Services`);
    if (post.excerpt) this.meta.updateTag({ name: 'description', content: post.excerpt });

    this.vc.clear();
    const cmp = await post.loadComponent();
    this.vc.createComponent(cmp);
  }
}
