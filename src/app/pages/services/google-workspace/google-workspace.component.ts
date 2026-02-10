import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-google-workspace',
  imports: [CommonModule, RouterModule],
  templateUrl: './google-workspace.component.html',
  styleUrls: ['./google-workspace.component.css']
})
export class GoogleWorkspaceComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    const pageTitle = 'Google Workspace Support | CtrlShift IT Services';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: 'Certified administration for Gmail and Drive. We help you stay productive while applying practical security and PIPEDA-friendly policies.' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: 'Certified administration for Gmail and Drive. We help you stay productive while applying practical security and PIPEDA-friendly policies.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
