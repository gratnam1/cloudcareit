import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  private readonly PERSON_SCHEMA_ID = 'about-team';
  private readonly ORG_SCHEMA_ID = 'about-org';

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.update({
      title: 'Founder Story | Vaughan Managed IT Company | CtrlShift IT Services',
      description: 'Meet the team behind CtrlShift IT Services — MCSE, Security+, CCNA, and Google-certified engineers with 15+ years of experience serving law firms, medical clinics, and professional offices across the GTA.',
      type: 'website',
      canonicalPath: '/about'
    });

    this.seo.setStructuredData(this.ORG_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CtrlShift IT Services',
      url: 'https://ctrlshiftit.ca',
      logo: 'https://ctrlshiftit.ca/favicon.svg',
      telephone: '+1-416-624-4841',
      email: 'info@ctrlshiftit.ca',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vaughan',
        addressRegion: 'ON',
        addressCountry: 'CA'
      },
      sameAs: [
        'https://www.linkedin.com/company/ctrlshift-it-services',
        'https://www.facebook.com/ctrlshiftit'
      ],
      knowsAbout: [
        'Managed IT services',
        'Cybersecurity',
        'Microsoft 365 administration',
        'Google Workspace administration',
        'PIPEDA compliance',
        'PHIPA compliance',
        'Endpoint detection and response',
        'AWS cloud infrastructure'
      ]
    });

    this.seo.setStructuredData(this.PERSON_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'CtrlShift IT Services Engineering Team',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Person',
            jobTitle: 'Lead Systems Engineer',
            worksFor: { '@type': 'Organization', name: 'CtrlShift IT Services' },
            hasCredential: ['MCSE', 'CompTIA Security+', 'CCNA'],
            description: 'Over 15 years of infrastructure design for Ontario professional offices.',
            address: { '@type': 'PostalAddress', addressLocality: 'Vaughan', addressRegion: 'ON', addressCountry: 'CA' }
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Person',
            jobTitle: 'Cloud Solutions Architect',
            worksFor: { '@type': 'Organization', name: 'CtrlShift IT Services' },
            hasCredential: ['Google Cloud Certified', 'Microsoft 365 Certified'],
            description: 'Expert in hybrid cloud workflows and secure remote access architecture.',
            address: { '@type': 'PostalAddress', addressLocality: 'Vaughan', addressRegion: 'ON', addressCountry: 'CA' }
          }
        }
      ]
    });
  }

  ngOnDestroy() {
    this.seo.removeStructuredData(this.PERSON_SCHEMA_ID);
    this.seo.removeStructuredData(this.ORG_SCHEMA_ID);
  }
}
