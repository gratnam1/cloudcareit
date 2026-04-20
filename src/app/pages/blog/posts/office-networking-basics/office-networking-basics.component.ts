import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';

@Component({
  selector: 'app-office-networking-basics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './office-networking-basics.component.html',
  styleUrl: './office-networking-basics.component.css'
})
export class OfficeNetworkingBasicsComponent implements OnInit {
  publishedDate = 'February 14, 2026';
  readingTime = '8 min read';

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.update({
      title: 'Office Network & Wi-Fi Design Guide | CtrlShift IT Services',
      description: 'Learn how to design a reliable office network with proper segmentation, managed switches, and access-point placement. Practical guidance for GTA businesses.',
      type: 'article',
      canonicalPath: '/blog/office-networking-basics',
      publishedTime: '2026-02-14'
    });
  }
}
