import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-web-development-trends',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './web-development-trends.component.html',
  styleUrl: './web-development-trends.component.css'
})
export class WebDevelopmentTrendsComponent {
  publishedDate = 'February 14, 2026';
  readingTime = '8 min read';
}
