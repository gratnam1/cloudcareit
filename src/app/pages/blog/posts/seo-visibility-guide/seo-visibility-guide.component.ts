import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';

@Component({
  selector: 'app-seo-visibility-guide',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seo-visibility-guide.component.html',
  styleUrl: './seo-visibility-guide.component.css'
})
export class SeoVisibilityGuideComponent implements OnInit {
  publishedDate = 'February 14, 2026';
  readingTime = '8 min read';

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.update({
      title: 'Local SEO Playbook for GTA IT Firms | CtrlShift IT Services',
      description: 'A local SEO playbook for IT service companies in Vaughan, Toronto, and the GTA — covering technical fixes, Google Business Profile, content architecture, and citation building.',
      type: 'article',
      canonicalPath: '/blog/seo-visibility-guide',
      publishedTime: '2026-02-14'
    });
  }
}
