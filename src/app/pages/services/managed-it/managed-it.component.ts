import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-managed-it',
  imports: [CommonModule, RouterModule],
  templateUrl: './managed-it.component.html',
  styleUrls: ['./managed-it.component.css']
})
export class ManagedItComponent {
  private seo = inject(SeoService);

  constructor() {
    const pageTitle = 'Managed IT Services | CtrlShift IT Services';
    const description = 'Predictable, proactive IT for growing offices. Monitoring, patching, helpdesk support, backups, and security baselines—handled by senior engineers.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/managed-it'
    });
  }
}
