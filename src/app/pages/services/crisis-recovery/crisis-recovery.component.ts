import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-crisis-recovery',
  imports: [CommonModule, RouterModule],
  templateUrl: './crisis-recovery.component.html',
  styleUrls: ['./crisis-recovery.component.css']
})
export class CrisisRecoveryComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    const pageTitle = 'Crisis Recovery | CtrlShift IT Services';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: 'Hardware failure or ransomware? We respond fast to get your office back online and reduce future risk with a clean recovery plan.' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: 'Hardware failure or ransomware? We respond fast to get your office back online and reduce future risk with a clean recovery plan.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
