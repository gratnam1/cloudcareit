import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './shared/seo/seo.service';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChatComponent } from './shared/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setStructuredData('global-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CtrlShift IT Services',
      url: 'https://ctrlshiftit.ca',
      logo: 'https://ctrlshiftit.ca/favicon.svg',
      telephone: '+1-416-624-4841',
      email: 'info@ctrlshiftit.ca',
      address: [
        {
          '@type': 'PostalAddress',
          addressLocality: 'Vaughan',
          addressRegion: 'ON',
          addressCountry: 'CA'
        },
        {
          '@type': 'PostalAddress',
          addressLocality: 'Scarborough',
          addressRegion: 'ON',
          addressCountry: 'CA'
        }
      ],
      sameAs: [
        'https://www.linkedin.com/company/ctrlshiftit-services/',
        'https://x.com/CtrlShiftIt',
        'https://maps.app.goo.gl/AHmLpmKhG88S54d37',
        'https://clutch.co/profile/ctrlshift-it-services',
        'https://www.goodfirms.co/company/ctrlshift-it-services'
      ],
      areaServed: [
        { '@type': 'City', name: 'Vaughan' },
        { '@type': 'City', name: 'Toronto' },
        { '@type': 'City', name: 'Mississauga' },
        { '@type': 'City', name: 'Thornhill' },
        { '@type': 'City', name: 'Richmond Hill' }
      ]
    });

    this.seo.setStructuredData('global-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'CtrlShift IT Services',
      url: 'https://ctrlshiftit.ca',
      inLanguage: 'en-CA',
      publisher: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://ctrlshiftit.ca/?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    });
  }
}
