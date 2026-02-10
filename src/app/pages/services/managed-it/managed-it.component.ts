import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-managed-it',
  imports: [CommonModule, RouterModule],
  templateUrl: './managed-it.component.html',
  styleUrls: ['./managed-it.component.css']
})
export class ManagedItComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    const pageTitle = 'Managed IT Services | CtrlShift IT Services';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: 'Predictable, proactive IT for growing offices. Monitoring, patching, helpdesk support, backups, and security baselines—handled by senior engineers.' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: 'Predictable, proactive IT for growing offices. Monitoring, patching, helpdesk support, backups, and security baselines—handled by senior engineers.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
