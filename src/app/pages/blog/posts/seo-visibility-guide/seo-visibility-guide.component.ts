import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seo-visibility-guide',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seo-visibility-guide.component.html',
  styleUrl: './seo-visibility-guide.component.css'
})
export class SeoVisibilityGuideComponent {
  publishedDate = 'February 14, 2026';
  readingTime = '8 min read';
}
