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
      'Fast, reliable IT support for Vaughan businesses — remote-first with on-site dispatch across Concord, Woodbridge, and the Vaughan Metropolitan Centre. Whether you need break-fix help or fully outsourced IT support in Vaughan, CtrlShift IT Services keeps your staff productive with managed IT services designed for growing York Region businesses.',
    metaDescription:
      'IT support for Vaughan businesses — fast remote and on-site help in Concord, Woodbridge, and Maple. Security-first, flat-rate support from CtrlShift IT Services.',
    whatIsSection:
      'IT support covers day-to-day helpdesk requests, break-fix troubleshooting, and user account management. Businesses looking for a managed service provider in Vaughan should explore our Managed IT Services in Vaughan — a fully managed plan with flat-rate pricing and proactive monitoring that prevents issues before they interrupt your team.',
    services: [
      'Helpdesk support — password resets, account issues, device problems',
      'Remote support for Microsoft 365 and Google Workspace',
      'On-site visits for hardware, networking, and printer issues',
      'User onboarding and offboarding',
      'Virus removal and endpoint cleanup',
      'Office Wi-Fi troubleshooting and optimization',
      'Outsourced IT support for Vaughan businesses without in-house IT staff',
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
      {
        q: 'Are you a managed service provider in Vaughan?',
        a: 'Yes. CtrlShift IT Services is a managed service provider serving Vaughan businesses with proactive monitoring, patch management, security hardening, and helpdesk support — all under a predictable flat monthly rate.',
      },
      {
        q: 'Do you offer outsourced IT support in Vaughan?',
        a: 'Yes. We serve as a fully outsourced IT department for Vaughan businesses without in-house staff — handling helpdesk requests, vendor coordination, device management, and security so you can focus on running your business.',
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
      'Responsive IT support for Toronto businesses — remote-first resolution for hybrid offices in the Financial District, North York, Midtown, and downtown core. CtrlShift IT Services delivers managed IT services, cybersecurity services, and cloud consulting for Toronto companies that need reliable infrastructure and a security-first approach to growth.',
    metaDescription:
      'IT support for Toronto businesses — fast remote and on-site help for hybrid offices across the Financial District, North York, and Midtown. CtrlShift IT Services.',
    whatIsSection:
      'IT support covers day-to-day helpdesk requests, break-fix troubleshooting, and user account management. Toronto businesses looking for a managed service provider should explore our Managed IT Services in Toronto — a fully managed plan with proactive monitoring and security hardening that prevents issues before they interrupt your team.',
    services: [
      'Helpdesk support — password resets, account issues, device problems',
      'Remote support for Microsoft 365 and Google Workspace',
      'On-site visits for hardware, networking, and printer issues',
      'VPN and secure remote access for hybrid Toronto teams',
      'Virus removal and endpoint cleanup',
      'Microsoft 365 security hardening for law firms and medical practices',
      'Cloud consulting and AWS advisory for Toronto businesses',
      'Cybersecurity services including endpoint protection and threat monitoring',
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
      {
        q: 'Are you a managed service provider in Toronto?',
        a: 'Yes. CtrlShift IT Services is a managed service provider serving Toronto businesses with proactive monitoring, patch management, security hardening, and helpdesk support — all on a predictable flat monthly plan.',
      },
      {
        q: 'Do you provide cloud consulting or AWS consulting in Toronto?',
        a: 'Yes. We offer cloud consulting for Toronto businesses evaluating AWS, Microsoft Azure, or hybrid cloud architectures. Our team helps you right-size your infrastructure, reduce cloud spend, and migrate workloads securely.',
      },
      {
        q: 'What cybersecurity services do you provide in Toronto?',
        a: 'Our cybersecurity services for Toronto businesses include endpoint threat detection, MFA enforcement, email security hardening, conditional access policies, and security awareness training — designed to meet compliance requirements for law firms, medical clinics, and financial services.',
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
      'Responsive IT support for Mississauga businesses — fast remote resolution and on-site technicians available across Square One, Meadowvale, Airport Corporate Centre, and Heartland. Whether you need break-fix help or fully outsourced IT support in Mississauga, CtrlShift IT Services keeps your team productive with managed IT services tailored to Peel Region businesses.',
    metaDescription:
      'Responsive IT support for Mississauga offices near Square One, Meadowvale, Heartland, and Airport Corporate Centre.',
    whatIsSection:
      'IT support handles day-to-day helpdesk requests, break-fix incidents, and user account management. Businesses looking for a managed service provider in Mississauga should explore our Managed IT Services in Mississauga — a fully managed plan with proactive monitoring that reduces downtime before it starts.',
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
      {
        q: 'Do you offer outsourced IT support in Mississauga?',
        a: 'Yes. CtrlShift IT Services acts as a fully outsourced IT support provider for Mississauga businesses without an internal IT team. We handle helpdesk, security, device management, and vendor coordination under a single flat monthly plan.',
      },
      {
        q: 'Are you a managed service provider in Mississauga?',
        a: 'Yes. As a managed service provider serving Mississauga, CtrlShift IT Services delivers proactive monitoring, patch management, security hardening, and helpdesk support under a predictable flat monthly agreement — so you can plan IT costs and prevent most issues before they affect your team.',
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
      'Simple, dependable IT support for Thornhill offices — fast remote help and on-site technicians available near Promenade, Yonge Street, and the Bathurst corridor. CtrlShift IT Services delivers managed IT services for Thornhill businesses that want reliable IT without the complexity or cost of an in-house team.',
    metaDescription:
      'IT support for Thornhill businesses — fast remote and on-site help near Promenade, Yonge Street, and the Bathurst corridor. Dependable support from CtrlShift IT Services.',
    whatIsSection:
      'IT support handles day-to-day helpdesk requests, device problems, and user account management. Thornhill businesses looking for a managed service provider should explore our Managed IT Services in Thornhill — a flat-rate plan with proactive monitoring and patch management that reduces recurring IT friction.',
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
      {
        q: 'Are you a managed service provider in Thornhill?',
        a: 'Yes. CtrlShift IT Services is a managed service provider for Thornhill businesses. Our flat-rate managed IT plans include monitoring, patching, helpdesk, and security — so your team gets consistent IT coverage without unpredictable bills.',
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
      'Proactive IT support for Richmond Hill businesses — fast remote help and on-site technicians serving the Hillcrest Mall area, Yonge Street business strip, and Leslie Street office parks. CtrlShift IT Services delivers managed IT services for Richmond Hill teams that need reliable systems, maintained devices, and security-first account management.',
    metaDescription:
      'Proactive IT support for Richmond Hill offices: device maintenance, Microsoft 365 security, backups, and fast remote help.',
    whatIsSection:
      'IT support covers day-to-day helpdesk requests, device maintenance, and user account management. Richmond Hill businesses looking for a managed service provider should explore our Managed IT Services in Richmond Hill — a fully managed plan with 24/7 monitoring that catches issues before your team notices them.',
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
      {
        q: 'Are you a managed service provider in Richmond Hill?',
        a: 'Yes. As a managed service provider serving Richmond Hill, CtrlShift IT Services handles monitoring, patching, security, and helpdesk under a flat monthly plan — giving your team consistent IT coverage without the cost of in-house staff.',
      },
      {
        q: 'Do Richmond Hill businesses receive on-site IT support?',
        a: 'Yes. We dispatch on-site technicians throughout Richmond Hill — including the Hillcrest Mall area, Yonge Street, Elgin Mills, and the Leslie Street office parks — typically same-day for critical issues.',
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
