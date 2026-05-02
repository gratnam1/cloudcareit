import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type FooterLink = {
  label: string;
  path: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly footerSections: FooterSection[] = [
    {
      title: 'Services',
      links: [
        { label: 'Managed IT Services', path: '/managed-it-services' },
        { label: 'IT Support', path: '/it-support-small-businesses-gta' },
        { label: 'Cybersecurity', path: '/cybersecurity-services-vaughan' },
        { label: 'Microsoft 365', path: '/microsoft-365' }
      ]
    },
    {
      title: 'Locations',
      links: [
        { label: 'Vaughan IT Support', path: '/it-support-vaughan' },
        { label: 'Mississauga IT Support', path: '/it-support-mississauga' },
        { label: 'Toronto IT Support', path: '/managed-it-services-toronto' },
        { label: 'Richmond Hill IT Support', path: '/managed-it-services-richmond-hill' }
      ]
    },
    {
      title: 'Guides',
      links: [
        { label: 'Security Guides', path: '/guides/security' },
        { label: 'Microsoft 365 Security', path: '/guides/security/microsoft-365-security' },
        {
          label: 'Backup Guide',
          path: '/guides/security/microsoft-365-security/microsoft-365-backup-small-business'
        },
        {
          label: 'MFA Rollout Guide',
          path: '/guides/security/microsoft-365-security/mfa-rollout-small-business'
        }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Contact', path: 'mailto:info@ctrlshiftit.ca', external: true },
        { label: 'Free Tools', path: '/free-security-assessment' },
        { label: 'Sitemap', path: '/sitemap.xml', external: true }
      ]
    }
  ];

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
