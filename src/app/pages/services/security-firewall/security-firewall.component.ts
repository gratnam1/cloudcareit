import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-security-firewall',
  imports: [CommonModule, RouterModule],
  templateUrl: './security-firewall.component.html',
  styleUrls: ['./security-firewall.component.css']
})
export class SecurityFirewallComponent {
  private seo = inject(SeoService);

  constructor() {
    const pageTitle = 'Security & Firewall | CtrlShift IT Services';
    const description = 'Enterprise-style perimeter security for small offices. We harden your network edge and reduce risk from phishing and ransomware.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/security-firewall'
    });
  }
}
