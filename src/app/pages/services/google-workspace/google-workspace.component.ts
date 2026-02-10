import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-google-workspace',
  imports: [CommonModule, RouterModule],
  templateUrl: './google-workspace.component.html',
  styleUrls: ['./google-workspace.component.css']
})
export class GoogleWorkspaceComponent {
  private seo = inject(SeoService);

  constructor() {
    const pageTitle = 'Google Workspace Support | CtrlShift IT Services';
    const description = 'Certified administration for Gmail and Drive. We help you stay productive while applying practical security and PIPEDA-friendly policies.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/google-workspace'
    });
  }
}
