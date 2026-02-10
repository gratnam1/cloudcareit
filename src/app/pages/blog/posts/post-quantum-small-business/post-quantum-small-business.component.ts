import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-quantum-small-business',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-quantum-small-business.component.html',
  styleUrl: './post-quantum-small-business.component.css'
})
export class PostQuantumSmallBusinessComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);

  publishedDate = 'February 9, 2026';
  readingTime = '6 min read';

  ngOnInit(): void {
    const pageTitle = 'Post‑Quantum Cybersecurity: What Small Businesses Should Do Now | CtrlShift IT Services';
    const description =
      'Google is urging preparation for quantum-era cybersecurity. Here’s what it means for small businesses and a safe, practical action plan—plus how to get help.';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'article:published_time', content: '2026-02-09' });
  }
}
