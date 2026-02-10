import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-lead-generation',
  imports: [CommonModule, RouterModule],
  templateUrl: './lead-generation.component.html',
  styleUrls: ['./lead-generation.component.css']
})
export class LeadGenerationComponent {
  private seo = inject(SeoService);

  constructor() {
    const pageTitle = 'Lead Generation | CtrlShift IT Services';
    const description = 'Turn traffic into revenue with practical funnels. Capture, qualify, and follow up with leads—without annoying spam tactics.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/lead-generation'
    });
  }
}
