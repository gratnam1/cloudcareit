import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-security-firewall',
  imports: [CommonModule, RouterModule],
  templateUrl: './security-firewall.component.html',
  styleUrls: ['./security-firewall.component.css']
})
export class SecurityFirewallComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    const pageTitle = 'Security & Firewall | CtrlShift IT Services';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: 'Enterprise-style perimeter security for small offices. We harden your network edge and reduce risk from phishing and ransomware.' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: 'Enterprise-style perimeter security for small offices. We harden your network edge and reduce risk from phishing and ransomware.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
