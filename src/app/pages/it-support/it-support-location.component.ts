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
    title: 'IT Support Vaughan | CtrlShift IT Services',
    canonicalPath: '/it-support-vaughan',
    hubPath: '/managed-it-services-vaughan',
    hubLabel: 'Managed IT Services Vaughan',
    city: 'Vaughan',
    region: 'York Region',
    mainHeading: 'IT Support in Vaughan',
    intro:
      'Fast, reliable IT support for Vaughan businesses — remote-first with on-site dispatch when you need it. We keep your staff productive, your systems secure, and your network running smoothly across Concord, Woodbridge, and the Vaughan Metropolitan Centre.',
    metaDescription:
      'IT support for Vaughan businesses — fast remote and on-site help in Concord, Woodbridge, and Maple. Security-first, flat-rate support from CtrlShift IT Services.',
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
  toronto: {
    title: 'IT Support Toronto | CtrlShift IT Services',
    canonicalPath: '/managed-it-services-toronto',
    hubPath: '/managed-it-services-toronto',
    hubLabel: 'Managed IT Services Toronto',
    city: 'Toronto',
    region: 'GTA',
    mainHeading: 'IT Support in Toronto',
    intro:
      'Responsive IT support for Toronto businesses — remote-first resolution for hybrid offices in the Financial District, North York, Midtown, and downtown core. We keep your Microsoft 365 secure, your Wi-Fi reliable, and your team productive.',
    metaDescription:
      'IT support for Toronto businesses — fast remote and on-site help for hybrid offices across the Financial District, North York, and Midtown. CtrlShift IT Services.',
    whatIsSection:
      'IT support covers day-to-day helpdesk requests, break-fix troubleshooting, and user account management. Toronto businesses needing proactive monitoring and strategic IT management should explore our Managed IT Services in Toronto — a fully managed plan that prevents issues before they interrupt your team.',
    services: [
      'Helpdesk support — password resets, account issues, device problems',
      'Remote support for Microsoft 365 and Google Workspace',
      'On-site visits for hardware, networking, and printer issues',
      'VPN and secure remote access for hybrid Toronto teams',
      'Virus removal and endpoint cleanup',
      'Microsoft 365 security hardening for law firms and medical practices',
    ],
    faq: [
      {
        q: 'Do you offer on-site IT support in Toronto?',
        a: 'Yes. We provide on-site visits across the Financial District, North York, Midtown, and the downtown core. Most issues are resolved faster through secure remote support, but we dispatch on-site whenever physical intervention is needed.',
      },
      {
        q: 'Can you support hybrid Toronto offices with both remote and in-office staff?',
        a: 'Yes. We configure and support secure remote access via Tailscale zero-trust VPN, manage Microsoft 365 conditional access policies, and ensure consistent endpoint protection whether your staff are in the office or working from home.',
      },
      {
        q: 'How quickly can you respond to IT emergencies in Toronto?',
        a: 'Remote support starts immediately via our ticketing system. Growth and Business plan clients receive a response within 15 minutes for production-critical incidents. We triage remotely first and dispatch on-site when required.',
      },
      {
        q: 'Can you secure Microsoft 365 for law firms and medical offices in Toronto?',
        a: 'Yes. We implement MFA, conditional access policies, safer sharing rules, and mailbox protection tailored for compliance-sensitive offices — including Law Society requirements for legal practices and PHIPA standards for medical clinics.',
      },
    ],
  },

  mississauga: {
    title: 'IT Support Mississauga | CtrlShift IT Services',
    canonicalPath: '/it-support-mississauga',
    hubPath: '/managed-it-services-mississauga',
    hubLabel: 'Managed IT Services Mississauga',
    city: 'Mississauga',
    region: 'Peel Region',
    mainHeading: 'IT Support in Mississauga',
    intro:
      'Responsive IT support for Mississauga businesses — remote resolution within minutes and on-site technicians available across Square One, Meadowvale, Airport Corporate Centre, and Heartland. We fix issues fast and follow up to prevent them from recurring.',
    metaDescription:
      'IT support for Mississauga businesses — fast remote and on-site help at Square One, Meadowvale, and Airport Corporate Centre. Responsive support from CtrlShift IT Services.',
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

  thornhill: {
    title: 'IT Support Thornhill | CtrlShift IT Services',
    canonicalPath: '/managed-it-services-thornhill',
    hubPath: '/managed-it-services-thornhill',
    hubLabel: 'Managed IT Services Thornhill',
    city: 'Thornhill',
    region: 'York Region',
    mainHeading: 'IT Support in Thornhill',
    intro:
      'Simple, dependable IT support for Thornhill offices — fast remote help and on-site technicians available near Promenade, Yonge Street, and the Bathurst corridor. We fix what is broken and help you prevent the same issues from recurring.',
    metaDescription:
      'IT support for Thornhill businesses — fast remote and on-site help near Promenade, Yonge Street, and the Bathurst corridor. Dependable support from CtrlShift IT Services.',
    whatIsSection:
      'IT support handles day-to-day helpdesk requests, device problems, and user account management. Thornhill businesses needing ongoing maintenance and proactive monitoring should explore our Managed IT Services in Thornhill — a flat-rate managed plan that reduces recurring IT friction.',
    services: [
      'Helpdesk support — password resets, account issues, device problems',
      'Wi-Fi troubleshooting and coverage improvements',
      'Microsoft 365 and Google Workspace support',
      'User onboarding and offboarding for small Thornhill offices',
      'Patch management and device cleanup',
      'Shared file permission reviews and cleanup',
    ],
    faq: [
      {
        q: 'Are you a good fit for small offices in Thornhill?',
        a: 'Yes. Many of our clients are small offices — 5 to 20 staff — that want dependable IT without the complexity or cost of a full in-house team. We scale to fit your size and budget.',
      },
      {
        q: 'How quickly can you respond to IT issues in Thornhill?',
        a: 'Remote support starts immediately via our ticketing system. On-site visits to offices near Promenade, Yonge Street, Bathurst, and the Steeles corridor are typically same-day or next-business-day depending on issue severity.',
      },
      {
        q: 'Can you fix recurring Wi-Fi problems at our Thornhill office?',
        a: 'Yes. We survey your office layout, identify dead zones and interference sources, recommend access point placement, and configure separate guest and staff networks where needed — so your Wi-Fi stays reliable.',
      },
      {
        q: 'Do you help with email and login issues for Thornhill accounting and medical offices?',
        a: 'Yes. We troubleshoot account lockouts, MFA failures, and Outlook sync issues, then tighten security policies so the same problems stop repeating for your team.',
      },
    ],
  },

  'richmond hill': {
    title: 'IT Support Richmond Hill | CtrlShift IT Services',
    canonicalPath: '/managed-it-services-richmond-hill',
    hubPath: '/managed-it-services-richmond-hill',
    hubLabel: 'Managed IT Services Richmond Hill',
    city: 'Richmond Hill',
    region: 'York Region',
    mainHeading: 'IT Support in Richmond Hill',
    intro:
      'Proactive IT support for Richmond Hill businesses — fast remote help and on-site technicians serving the Hillcrest Mall area, Yonge Street business strip, and Leslie Street office parks. We maintain your devices, secure your accounts, and prevent downtime before it starts.',
    metaDescription:
      'IT support for Richmond Hill businesses — proactive maintenance, account security, and responsive helpdesk for Hillcrest, Yonge Street, and Leslie Street offices. CtrlShift IT Services.',
    whatIsSection:
      'IT support covers day-to-day helpdesk requests, device maintenance, and user account management. Richmond Hill businesses that want proactive monitoring and strategic IT oversight should explore our Managed IT Services in Richmond Hill — a fully managed plan that catches issues before your team notices them.',
    services: [
      'Helpdesk support — password resets, account issues, device problems',
      'Device maintenance, patching, and performance tuning',
      'Microsoft 365 security (MFA + conditional access)',
      'Backup strategy and scheduled restore testing',
      'Network reliability troubleshooting for calls and meetings',
      'User onboarding and offboarding',
    ],
    faq: [
      {
        q: 'Do you provide proactive IT support for Richmond Hill businesses?',
        a: 'Yes. Our managed plans include 24/7 endpoint and network monitoring. We catch and address issues before they turn into downtime — so your team rarely needs to call us with an emergency.',
      },
      {
        q: 'How quickly can you respond to IT issues in Richmond Hill?',
        a: 'Remote support starts immediately via our ticketing system. On-site dispatch to the Hillcrest Mall area, Yonge Street, Elgin Mills, and the Leslie Street corridor is typically same-day for critical issues.',
      },
      {
        q: 'Can you speed up slow laptops for our Richmond Hill team?',
        a: 'Yes. We tune startup processes, apply OS patches, remove legacy software, and standardize device configurations for better day-to-day performance — without replacing hardware prematurely.',
      },
      {
        q: 'How do you verify backups actually work for Richmond Hill businesses?',
        a: 'We run scheduled restore tests on a regular basis and document the recovery steps so you have proof your data is recoverable before an emergency ever happens.',
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
