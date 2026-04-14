import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';

type FaqItem = { q: string; a: string };

type ItSupportContent = {
  title: string;
  canonicalPath: string;
  hubPath: string;
  hubLabel: string;
  city: string;
  region: string;
  mainHeading: string;
  intro: string;
  metaDescription: string;
  whatIsSection: string;
  services: string[];
  faq: FaqItem[];
};

const CONTENT: Record<string, ItSupportContent> = {
  vaughan: {
    title: 'IT Support Vaughan | Fast On-Site & Remote Help | CtrlShift IT',
    canonicalPath: '/it-support-vaughan',
    hubPath: '/managed-it-services-vaughan',
    hubLabel: 'Managed IT Services Vaughan',
    city: 'Vaughan',
    region: 'York Region',
    mainHeading: 'IT Support in Vaughan',
    intro:
      'Fast, reliable IT support for Vaughan businesses — remote-first with on-site dispatch when you need it. We keep your staff productive, your systems secure, and your network running smoothly across Concord, Woodbridge, and the Vaughan Metropolitan Centre.',
    metaDescription:
      'IT Support in Vaughan — fast remote and on-site help for businesses in Concord, Woodbridge, and Maple. Responsive, flat-rate IT support from CtrlShift IT.',
    whatIsSection:
      'IT support covers day-to-day helpdesk requests, break-fix troubleshooting, and user account management. Businesses needing proactive monitoring and strategic IT management should explore our Managed IT Services in Vaughan — a fully managed plan that prevents issues before they interrupt your team.',
    services: [
      'Helpdesk support — password resets, account issues, device problems',
      'Remote support for Microsoft 365 and Google Workspace',
      'On-site visits for hardware, networking, and printer issues',
      'User onboarding and offboarding',
      'Virus removal and endpoint cleanup',
      'Office Wi-Fi troubleshooting and optimization',
    ],
    faq: [
      {
        q: 'What is the difference between IT support and managed IT services in Vaughan?',
        a: 'IT support is reactive — you call when something breaks. Managed IT services are proactive — we monitor, patch, and maintain your systems 24/7 to prevent issues before they happen. For growing Vaughan businesses, managed IT services deliver better value and fewer interruptions.',
      },
      {
        q: 'How quickly can you respond to IT issues in Vaughan?',
        a: 'Remote support starts immediately via our ticketing system. On-site visits to Concord, Woodbridge, Maple, and the Vaughan Metropolitan Centre are typically same-day or next-business-day depending on severity.',
      },
      {
        q: 'Do you support small offices in Vaughan with only a few employees?',
        a: 'Yes. We work with offices from 3 to 50+ staff. Small teams get the same fast response and security-first approach without paying for services they don\'t need.',
      },
      {
        q: 'Can you help fix recurring IT problems at our Vaughan office?',
        a: 'Yes. We identify root causes of recurring issues — whether it\'s a misconfigured network, an outdated device policy, or a software conflict — and fix them properly so your team stops dealing with the same problems repeatedly.',
      },
    ],
  },
  mississauga: {
    title: 'IT Support Mississauga | Fast Remote & On-Site Help | CtrlShift IT',
    canonicalPath: '/it-support-mississauga',
    hubPath: '/managed-it-services-mississauga',
    hubLabel: 'Managed IT Services Mississauga',
    city: 'Mississauga',
    region: 'Peel Region',
    mainHeading: 'IT Support in Mississauga',
    intro:
      'Responsive IT support for Mississauga businesses — remote resolution within minutes and on-site technicians available across Square One, Meadowvale, Airport Corporate Centre, and Heartland. We fix issues fast and follow up to prevent them from recurring.',
    metaDescription:
      'IT Support in Mississauga — fast remote and on-site help for Square One, Meadowvale, and Airport Corporate Centre businesses. CtrlShift IT.',
    whatIsSection:
      'IT support handles day-to-day helpdesk requests, break-fix incidents, and user account management. Businesses needing proactive monitoring and ongoing IT management should explore our Managed IT Services in Mississauga — a fully managed plan that reduces downtime before it starts.',
    services: [
      'Helpdesk support — password resets, account issues, device problems',
      'Remote support for Microsoft 365 and Google Workspace',
      'On-site visits for hardware, networking, and printer issues',
      'User onboarding and offboarding',
      'Virus removal and endpoint cleanup',
      'Office Wi-Fi troubleshooting across large Mississauga floorplans',
    ],
    faq: [
      {
        q: 'What is the difference between IT support and managed IT services in Mississauga?',
        a: 'IT support is reactive — you call when something breaks. Managed IT services are proactive — we monitor and maintain your systems continuously to prevent incidents. For Mississauga businesses with growing teams, managed IT services reduce downtime and lower the total cost of IT disruptions.',
      },
      {
        q: 'How quickly can you respond to IT issues in Mississauga?',
        a: 'Remote support starts within minutes through our ticketing system. On-site dispatch to Square One, Meadowvale, Airport Corporate Centre, and Heartland is typically same-day for critical issues.',
      },
      {
        q: 'Can you support a larger Mississauga office with multiple departments?',
        a: 'Yes. We handle multi-department environments, complex printer and scanner setups, large wireless networks, and mixed Microsoft 365 / Google Workspace environments across a single point of contact.',
      },
      {
        q: 'Do you offer on-site IT support near Square One in Mississauga?',
        a: 'Yes. We dispatch on-site technicians throughout Mississauga including the Square One area, Hurontario corridor, Meadowvale, and the Highway 401/403 business districts.',
      },
    ],
  },
};

@Component({
  selector: 'app-it-support-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './it-support-location.component.html',
  styleUrls: ['./it-support-location.component.css'],
})
export class ItSupportLocationComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  content!: ItSupportContent;

  private readonly FAQ_SCHEMA_ID = 'it-support-faq';
  private readonly BREADCRUMB_SCHEMA_ID = 'it-support-breadcrumb';

  ngOnInit(): void {
    const cityKey = (this.route.snapshot.data['cityKey'] as string) ?? 'vaughan';
    this.content = CONTENT[cityKey] ?? CONTENT['vaughan'];

    this.seo.update({
      title: this.content.title,
      description: this.content.metaDescription,
      imageUrl: 'https://ctrlshiftit.ca/favicon.svg',
      type: 'website',
      canonicalPath: this.content.canonicalPath,
    });

    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.content.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });

    this.seo.setStructuredData(this.BREADCRUMB_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ctrlshiftit.ca/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: `Managed IT Services ${this.content.city}`,
          item: `https://ctrlshiftit.ca${this.content.hubPath}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `IT Support ${this.content.city}`,
          item: `https://ctrlshiftit.ca${this.content.canonicalPath}`,
        },
      ],
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
  }
}
