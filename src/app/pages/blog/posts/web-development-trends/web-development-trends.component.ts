import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';

@Component({
  selector: 'app-web-development-trends',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './web-development-trends.component.html',
  styleUrl: './web-development-trends.component.css'
})
export class WebDevelopmentTrendsComponent implements OnInit {
  publishedDate = 'February 14, 2026';
  readingTime = '8 min read';

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.update({
      title: 'Web Development for GTA Small Business',
      description: 'How service businesses in the GTA can build faster, higher-converting websites — covering Core Web Vitals, mobile UX, trust signals, and page structure that turns visitors into leads.',
      type: 'article',
      canonicalPath: '/blog/web-development-gta',
      publishedTime: '2026-02-14'
    });
  }
}
