import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-lead-generation',
  imports: [CommonModule, RouterModule],
  templateUrl: './lead-generation.component.html',
  styleUrls: ['./lead-generation.component.css']
})
export class LeadGenerationComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    const pageTitle = 'Lead Generation | CtrlShift IT Services';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: 'Turn traffic into revenue with practical funnels. Capture, qualify, and follow up with leads—without annoying spam tactics.' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: 'Turn traffic into revenue with practical funnels. Capture, qualify, and follow up with leads—without annoying spam tactics.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
