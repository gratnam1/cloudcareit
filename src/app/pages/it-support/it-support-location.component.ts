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
  hubLinkAnchor?: string;
  city: string;
  region: string;
  mainHeading: string;
  intro: string;
  metaDescription: string;
  whatIsSection: string;
  services: string[];
  faq: FaqItem[];
  localSection?: { heading: string; body: string };
  localScenario?: { headline: string; situation: string; response: string; outcome: string };
};

const CONTENT: Record<string, ItSupportContent> = {
  vaughan: {
    title: 'IT Support Vaughan | Responsive Helpdesk & Troubleshooting | CtrlShift IT Services',
    canonicalPath: '/it-support-vaughan',
    hubPath: '/managed-it-services-vaughan',
    hubLabel: 'Managed IT Services Vaughan',
    hubLinkAnchor: 'managed IT services in Vaughan',
    city: 'Vaughan',
    region: 'York Region',
    mainHeading: 'IT Support in Vaughan',
    intro:
      'Responsive IT support for Vaughan offices — when something breaks today, you need it fixed today. We handle helpdesk tickets, troubleshooting, and Microsoft 365 issues for businesses across Concord, Woodbridge, Maple, and the Vaughan Metropolitan Centre, without locking you into a full managed-IT subscription. If you already have a managed-IT provider, we can act as overflow support; if you do not, this is the page to start with.',
    metaDescription:
      'Responsive IT support and helpdesk for Vaughan businesses — troubleshooting, Microsoft 365 issue resolution, and Wi-Fi / network fixes across Concord, Woodbridge, Maple, and the Vaughan Metropolitan Centre.',
    whatIsSection:
      'This page is for Vaughan offices that need responsive helpdesk and troubleshooting — break-fix, recurring issue cleanup, Microsoft 365 issue resolution, and Wi-Fi / device support — not a full monthly managed-IT subscription. If you instead want proactive monitoring, endpoint protection, backup, and vendor coordination on a flat monthly rate, see our managed IT services in Vaughan page below.',
    services: [
      'Helpdesk and ticket-based support — password resets, account lockouts, device problems',
      'Microsoft 365 issue resolution — Outlook sync, Teams call quality, mailbox access, MFA failures',
      'Wi-Fi and network troubleshooting — dead zones, slow uploads, dropping access points',
      'On-site visits for hardware, printers, and meeting-room equipment that will not behave',
      'User and device support — onboarding, offboarding, lost-laptop response, password resets',
      'Virus, ransomware, and account-compromise cleanup on individual devices',
      'Overflow helpdesk for Vaughan offices that already have an in-house IT person',
    ],
    faq: [
      {
        q: 'How is this IT support page different from your managed IT services Vaughan page?',
        a: 'IT support is reactive — you call us when something breaks and we fix it, on a per-ticket or hourly basis. Managed IT services are a flat monthly subscription that includes proactive monitoring, endpoint protection, patching, backup, and vendor coordination so most issues never surface in the first place. If you mostly need someone to call when something goes wrong, this page is the right starting point. If you want IT problems prevented rather than reacted to, see our managed IT services in Vaughan page.',
      },
      {
        q: 'How quickly can you respond to a Vaughan IT issue?',
        a: 'Remote triage starts as soon as a ticket lands. For straightforward problems — password resets, Outlook sync, Teams call issues — most Vaughan offices are back to working the same morning. On-site visits to Concord, Woodbridge, Maple, and the Vaughan Metropolitan Centre are typically same-day or next-business-day depending on severity and where the office is.',
      },
      {
        q: 'Can you fix a recurring Microsoft 365 problem at our Vaughan office?',
        a: 'Yes — and recurring Microsoft 365 issues are usually the most common reason Vaughan offices reach out. Repeated MFA prompts, Outlook profiles that keep corrupting, conditional access rules that lock out the wrong users, mailboxes refusing to send: most of these come back to a misconfigured tenant. We diagnose the underlying setting, fix it once, and document what changed so the issue stops repeating.',
      },
      {
        q: 'Do you fix Wi-Fi and network problems on a one-off basis?',
        a: 'Yes. We troubleshoot dead zones, dropping access points, slow uploads, and Teams or VoIP calls that fall apart under load — without requiring a full network redesign. If a deeper redesign is genuinely needed, we will tell you and quote it separately rather than billing endless ticket time.',
      },
      {
        q: 'Can you act as overflow IT support for a Vaughan office that already has an in-house person?',
        a: 'Yes. Plenty of Vaughan offices have one IT person who is at capacity — we take overflow tickets, after-hours work, or specialist tasks (Microsoft 365 security, Wi-Fi surveys, conditional access) so the in-house person is not the bottleneck.',
      },
      {
        q: 'When should we move from IT support to managed IT services?',
        a: 'Once a Vaughan office is logging more than a handful of tickets a month, or once a single ransomware incident, mailbox loss, or compromised account would be material to the business, the maths usually flips toward our managed IT services in Vaughan plan — flat monthly pricing, proactive monitoring, and endpoint protection on every device, instead of paying per ticket while a problem builds up in the background.',
      },
    ],
    localSection: {
      heading: 'Where We Help Vaughan Teams',
      body: 'Most Vaughan IT support tickets we handle come from three areas: the Vaughan Metropolitan Centre and Highway 7 corridor (modern offices, busy Wi-Fi, hybrid teams), Concord industrial-and-office hybrids where the back-of-house and front-office share networking, and Woodbridge / Maple professional practices where a small team needs reliable Microsoft 365 and a phone they can actually call. We dispatch on-site for anything we cannot fix remotely.',
    },
    localScenario: {
      headline: 'Local Scenario — Vaughan Metropolitan Centre',
      situation: 'A 12-person professional services office near the VMC raised a ticket: Microsoft Teams calls were dropping mid-meeting and several staff were getting repeated MFA prompts every hour even after signing in.',
      response: 'We triaged remotely the same day, found a misconfigured conditional access policy and a Wi-Fi access-point that had been failing over to the wrong band, fixed both, and documented what changed.',
      outcome: 'Calls and sign-ins stabilised by the next morning. The office stayed on responsive support for a few months and eventually moved onto our managed IT services in Vaughan plan once they wanted the same kind of issue prevented before it surfaced.',
    },
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
    title: 'IT Support Mississauga | Helpdesk, Microsoft 365 & Wi-Fi Fixes | CtrlShift IT Services',
    canonicalPath: '/it-support-mississauga',
    hubPath: '/managed-it-services-mississauga',
    hubLabel: 'Managed IT Services Mississauga',
    hubLinkAnchor: 'managed IT services in Mississauga',
    city: 'Mississauga',
    region: 'Peel Region',
    mainHeading: 'IT Support in Mississauga',
    intro:
      'Responsive IT support for Mississauga offices when something has already gone wrong — Microsoft 365 sign-in failures, Teams calls dropping in a multi-floor office, an access point that has stopped serving one floor, or a laptop nobody can log into. We handle helpdesk and troubleshooting across Square One / City Centre, Meadowvale, the Hurontario corridor, the Dixie–Eglinton belt, and the Airport Corporate Centre, without putting you on a full managed-IT subscription before you are ready for one.',
    metaDescription:
      'Responsive IT support for Mississauga offices — helpdesk, Microsoft 365 issue resolution, and Wi-Fi / VoIP troubleshooting across Square One, Meadowvale, Hurontario, Dixie–Eglinton, and the Airport Corporate Centre.',
    whatIsSection:
      'This page is for Mississauga offices that need responsive helpdesk and troubleshooting — break-fix, recurring issue cleanup, Microsoft 365 issue resolution, and Wi-Fi / VoIP support — not a flat-rate monthly managed-IT subscription. If you want proactive monitoring, endpoint protection on every device, tested backups, and vendor coordination on a flat monthly rate, see our managed IT services in Mississauga page below.',
    services: [
      'Helpdesk and ticket-based support — password resets, account lockouts, device issues',
      'Microsoft 365 issue resolution — Outlook sync, Teams call quality, mailbox access, MFA failures',
      'Multi-floor Wi-Fi troubleshooting in Square One, City Centre, and Hurontario towers',
      'VoIP and Teams call-quality fixes on shared warehouse-and-office circuits',
      'On-site visits for printers, hardware, and meeting-room equipment',
      'User and device support — onboarding, offboarding, lost-laptop response',
      'Overflow helpdesk for Mississauga offices with an in-house IT person at capacity',
    ],
    faq: [
      {
        q: 'How is this IT support page different from your managed IT services Mississauga page?',
        a: 'IT support is reactive — you raise a ticket, we fix the issue, you pay per ticket or hourly. Managed IT services are a flat monthly subscription that includes proactive monitoring, endpoint protection, patching, backup, and vendor coordination so most issues never surface. If you mostly need someone to call when Microsoft 365 or Wi-Fi misbehaves, this page is the right starting point. If you want issues prevented rather than reacted to, see our managed IT services in Mississauga page.',
      },
      {
        q: 'How quickly can you respond to an IT issue in Mississauga?',
        a: 'Remote triage starts as soon as a ticket lands. Most Microsoft 365, password, and Outlook problems are resolved the same morning. On-site dispatch to Square One / City Centre, Meadowvale, Hurontario, the Dixie–Eglinton corridor, and the Airport Corporate Centre is typically same-day for urgent issues, with timing depending on severity and where the office sits relative to the 401/403/427.',
      },
      {
        q: 'Can you fix Microsoft Teams calls dropping in our Mississauga office?',
        a: 'Yes — this is one of the more common Mississauga tickets we see, especially in airport-area sites where voice traffic shares a circuit with warehouse devices and bulk uploads. We test the live call path, check the access-point handoff between floors or between the office and the warehouse, and add quality-of-service rules so Teams traffic gets priority. Most cases are fixed in a single visit without redoing the whole network.',
      },
      {
        q: 'Can you troubleshoot Wi-Fi only on the second floor of our City Centre office?',
        a: 'Yes. We can isolate a single-floor or single-zone Wi-Fi issue without re-surveying the whole building. Common causes are a failed access point, a wrongly placed AP, or a roaming setting that does not work across floors. We diagnose the actual cause first and quote the fix specifically, rather than selling a full redesign you do not need.',
      },
      {
        q: 'Do you act as overflow IT support for Mississauga offices that already have an in-house person?',
        a: 'Yes. Many growing Mississauga offices have one internal IT person at capacity. We take overflow tickets, after-hours work, and specialist tasks — Microsoft 365 security, conditional access, VoIP fixes, multi-floor Wi-Fi — so the in-house person is not the only bottleneck when something urgent comes in.',
      },
      {
        q: 'When does it make sense to switch from IT support to managed IT services?',
        a: 'Once a Mississauga office is logging more than a handful of tickets a month, or once losing a single mailbox, getting an admin account phished, or having ransomware on one laptop would materially hurt the business, the maths usually tips toward our managed IT services in Mississauga plan — flat monthly pricing, endpoint protection on every device, tested backups, and Microsoft 365 access tightened before something goes wrong.',
      },
    ],
    localSection: {
      heading: 'Where We Help Mississauga Teams',
      body: 'Most Mississauga IT support tickets we handle come from three patterns: multi-floor offices in Square One / City Centre and along the Hurontario corridor where Wi-Fi handoff fails between floors, airport-area sites along Dixie and Eglinton where a back-of-house warehouse network shares the same circuit as the front-office VoIP, and Meadowvale professional services offices where Microsoft 365 sign-ins, Outlook, and Teams calls misbehave because the tenant was set up years ago and never tuned. We dispatch on-site for anything we cannot resolve remotely.',
    },
    localScenario: {
      headline: 'Local Scenario — Airport Corporate Centre',
      situation: 'A 20-person logistics-and-office site near the Airport Corporate Centre raised a ticket: Microsoft Teams calls in the front office were unusable every afternoon, while warehouse devices kept saturating the same circuit with bulk uploads.',
      response: 'We did not redesign the whole network. We separated voice and warehouse traffic on the existing firewall, fixed two access points that were dropping their VLAN, and added quality-of-service rules so Teams traffic took priority on the upload path.',
      outcome: 'Call quality stabilised the same week. The office stayed on responsive support for a couple of months and then moved to our managed IT services in Mississauga plan once they wanted endpoint protection and Microsoft 365 access locked down across all 20 staff.',
    },
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
