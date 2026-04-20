import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../shared/seo/seo.service';

@Component({
  selector: 'app-post-quantum-small-business',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-quantum-small-business.component.html',
  styleUrl: './post-quantum-small-business.component.css'
})
export class PostQuantumSmallBusinessComponent implements OnInit {
  publishedDate = 'February 9, 2026';
  readingTime = '6 min read';

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.update({
      title: 'Post-Quantum Security for SMBs | CtrlShift IT Services',
      description: 'What post-quantum cryptography means for small businesses — what to do now, which algorithms to adopt, and how to plan upgrades before quantum threats become real.',
      type: 'article',
      canonicalPath: '/blog/post-quantum-small-business',
      publishedTime: '2026-02-06'
    });
  }
}
