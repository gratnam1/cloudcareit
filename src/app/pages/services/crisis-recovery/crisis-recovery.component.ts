import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-crisis-recovery',
  imports: [CommonModule, RouterModule],
  templateUrl: './crisis-recovery.component.html',
  styleUrls: ['./crisis-recovery.component.css']
})
export class CrisisRecoveryComponent {
  private seo = inject(SeoService);

  constructor() {
    const pageTitle = 'Crisis Recovery | CtrlShift IT Services';
    const description = 'Hardware failure or ransomware? We respond fast to get your office back online and reduce future risk with a clean recovery plan.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/crisis-recovery'
    });
  }
}
