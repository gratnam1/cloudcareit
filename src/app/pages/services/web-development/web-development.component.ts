import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-web-development',
  imports: [CommonModule, RouterModule],
  templateUrl: './web-development.component.html',
  styleUrls: ['./web-development.component.css']
})
export class WebDevelopmentComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    const pageTitle = 'Web Development | CtrlShift IT Services';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: 'Fast, responsive, secure websites built on modern frameworks. Designed to load quickly and convert visitors into leads.' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: 'Fast, responsive, secure websites built on modern frameworks. Designed to load quickly and convert visitors into leads.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
