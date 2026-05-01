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
  // Premium Vaughan-specific sections
  trustBadges?: { icon: string; label: string; desc: string }[];
  heroTriage?: { icon: string; label: string; done: boolean }[];
  whatWeFixCards?: { icon: string; title: string; body: string; link?: string }[];
  processSteps?: { num: string; title: string; body: string }[];
  comparisonSection?: {
    note: string;
    itSupport: { label: string; tag: string; bullets: string[]; cta: string; ctaPath: string };
    managedIt: { label: string; tag: string; bullets: string[]; cta: string; ctaPath: string };
  };
  localAreas?: { name: string; tag: string; blurb: string }[];
  afterCallDeliverables?: { icon: string; title: string; body: string }[];
  contextualLinks?: { path: string; label: string; icon: string }[];
  preCta?: { headline: string; subheading: string };
};

const CONTENT: Record<string, ItSupportContent> = {
  vaughan: {
    title: 'IT Support Vaughan | CtrlShift IT Services',
    canonicalPath: '/it-support-vaughan',
    hubPath: '/managed-it-services-vaughan',
    hubLabel: 'Managed IT Services Vaughan',
    hubLinkAnchor: 'managed IT services in Vaughan',
    city: 'Vaughan',
    region: 'York Region',
    mainHeading: 'IT Support in Vaughan for Small Businesses',
    intro:
      'Fast helpdesk, Microsoft 365 troubleshooting, Wi-Fi fixes, and on-site support for Vaughan offices that need issues resolved — without committing to a full managed IT contract.',
    metaDescription:
      'Fast IT support in Vaughan for Microsoft 365, Wi-Fi, devices, user issues, and on-site or remote troubleshooting for small businesses.',
    whatIsSection:
      'This page is for Vaughan offices that need responsive helpdesk and troubleshooting — break-fix, recurring issue cleanup, Microsoft 365 issue resolution, and Wi-Fi / device support — not a full monthly managed-IT subscription. If you instead want proactive monitoring, endpoint protection, backup, and vendor coordination on a flat monthly rate, see our managed IT services in Vaughan page below.',
    trustBadges: [
      { icon: 'bi-clock-history', label: 'Remote support starts fast', desc: 'Most remote issues triaged within 15 minutes of your call or ticket.' },
      { icon: 'bi-geo-alt', label: 'On-site visits in Vaughan when needed', desc: 'Same-day or next-business-day dispatch across Concord, Woodbridge, Maple, and the VMC.' },
      { icon: 'bi-tools', label: 'Microsoft 365, Wi-Fi, devices, and users', desc: 'Full stack helpdesk — not just one specialty.' },
    ],
    heroTriage: [
      { icon: 'bi-chat-left-text', label: 'Issue reported', done: true },
      { icon: 'bi-search', label: 'Remote triage', done: true },
      { icon: 'bi-wrench-adjustable', label: 'Fix applied', done: false },
      { icon: 'bi-file-earmark-text', label: 'Notes sent', done: false },
    ],
    whatWeFixCards: [
      {
        icon: 'bi-microsoft',
        title: 'Microsoft 365 issues',
        body: 'Mailbox access failures, license conflicts, admin console errors, and Teams policies that stopped working.',
        link: '/microsoft-365',
      },
      {
        icon: 'bi-envelope-check',
        title: 'Outlook and Teams',
        body: 'Stuck email sync, corrupted profiles, call drops, calendar conflicts, and shared mailbox permission errors.',
      },
      {
        icon: 'bi-wifi',
        title: 'Wi-Fi and network instability',
        body: 'Dead zones, dropping access points, slow uploads, and VoIP breakdowns on shared office circuits.',
        link: '/office-networking',
      },
      {
        icon: 'bi-printer',
        title: 'Printers and meeting rooms',
        body: 'Network printers that work sometimes, meeting room AV that refuses to connect, and shared device chaos.',
      },
      {
        icon: 'bi-person-plus',
        title: 'User setup and offboarding',
        body: 'New account provisioning, device setup, clean user exits, and permission cleanup in Microsoft 365.',
      },
      {
        icon: 'bi-laptop',
        title: 'Device troubleshooting',
        body: 'Slow laptops, blue screens, software conflicts, failed OS updates, and hardware-level diagnostics.',
      },
      {
        icon: 'bi-shield-lock',
        title: 'MFA and login problems',
        body: 'Repeated MFA prompts, account lockouts, conditional access misconfigurations, and tenant sign-in failures.',
        link: '/guides/security/microsoft-365-security/mfa-rollout-small-business',
      },
      {
        icon: 'bi-headset',
        title: 'Overflow IT support',
        body: 'After-hours help, specialist tasks, and capacity relief for Vaughan offices with an in-house IT person at capacity.',
      },
    ],
    processSteps: [
      { num: '01', title: 'Tell us what broke', body: 'Ticket, call, or email. Tell us the symptoms, any error message, and which users are affected.' },
      { num: '02', title: 'Remote triage starts', body: 'We connect and diagnose before changing anything. Most Vaughan offices are back to working in the same session.' },
      { num: '03', title: 'Fix or isolate the issue', body: 'We apply the fix, or isolate the root cause if something deeper is underneath the symptom.' },
      { num: '04', title: 'On-site visit if needed', body: 'When physical access is required — hardware, printers, cabling, access points — we dispatch to your Vaughan office.' },
      { num: '05', title: 'Plain-English notes to you', body: 'After every call, you get a summary of what changed, what caused it, and what to watch for next.' },
      { num: '06', title: 'Prevention only if warranted', body: 'If the same issue is recurring, we flag the pattern and explain your options — without pushing an engagement you do not need.' },
    ],
    comparisonSection: {
      note: "Not sure which fits? Once you're logging more than a few tickets per month, or one incident could materially hurt your business, the math usually tips toward managed IT.",
      itSupport: {
        label: 'IT Support',
        tag: 'Fix issues as they happen',
        bullets: [
          'Best for urgent or occasional issues',
          'Per-ticket, hourly, or support block',
          'Helpdesk, Microsoft 365, Wi-Fi, and device fixes',
          'No contract required',
          'Remote or on-site, as needed',
        ],
        cta: 'Book IT Support',
        ctaPath: '/it-assessment',
      },
      managedIt: {
        label: 'Managed IT Services',
        tag: 'Prevent issues before they happen',
        bullets: [
          'Best for ongoing coverage and prevention',
          'Flat monthly plan — predictable cost',
          'Monitoring, endpoint protection, patching, and backups',
          'Vendor coordination included',
          'Proactive security hardening',
        ],
        cta: 'View Managed IT Plans',
        ctaPath: '/managed-it-services-vaughan',
      },
    },
    localAreas: [
      {
        name: 'Vaughan Metropolitan Centre',
        tag: 'VMC & Highway 7',
        blurb: 'Modern towers, hybrid teams, and rapid headcount changes. Typical tickets: Teams call drops, conditional access failures, Wi-Fi handoff between floors, and new-user provisioning.',
      },
      {
        name: 'Concord',
        tag: 'Industrial & Office Hybrid',
        blurb: 'Warehouses and front offices sharing the same network. Typical tickets: Wi-Fi dead zones on the floor, VoIP breaking under bulk uploads, printer connectivity, and device sprawl.',
      },
      {
        name: 'Woodbridge',
        tag: 'Professional Offices & Clinics',
        blurb: 'Professional services, clinics, and real estate offices. Typical tickets: Outlook profile corruption, shared calendar issues, MFA prompt loops, and user account access.',
      },
      {
        name: 'Maple',
        tag: 'Local Offices & Retail',
        blurb: 'Small teams needing reliable remote and on-site support. Typical tickets: Remote access failures, device performance, basic Microsoft 365 administration, and connectivity.',
      },
      {
        name: 'Highway 7 / 400 Corridor',
        tag: 'Multi-Tenant & Logistics',
        blurb: 'Mixed device environments with multiple users and vendors. Typical tickets: Network reliability, Teams quality on shared circuits, vendor-caused changes, and device management.',
      },
    ],
    afterCallDeliverables: [
      { icon: 'bi-file-earmark-text', title: 'Plain-English summary', body: 'What changed, what was fixed, and what was deliberately left in place and why.' },
      { icon: 'bi-search', title: 'Root cause notes', body: 'Where possible, we document what caused the issue — not just what was patched.' },
      { icon: 'bi-arrow-right-circle', title: 'Recommended next steps', body: 'If your team has a follow-up action, we note it clearly before closing the ticket.' },
      { icon: 'bi-shield-exclamation', title: 'Security observations', body: 'If we spot a misconfiguration, risky permission, or open exposure during the fix, we flag it.' },
      { icon: 'bi-diagram-3', title: 'Escalation path', body: 'If the issue points toward managed IT, backup, or cybersecurity work, we explain the connection and your options.' },
    ],
    contextualLinks: [
      { path: '/microsoft-365', label: 'Microsoft 365 Support', icon: 'bi-microsoft' },
      { path: '/office-networking', label: 'Office Wi-Fi & Networking', icon: 'bi-wifi' },
      { path: '/cybersecurity-services-vaughan', label: 'Cybersecurity Services', icon: 'bi-shield-lock' },
      { path: '/managed-it-services-vaughan', label: 'Managed IT Services Vaughan', icon: 'bi-gear' },
      { path: '/guides/security/microsoft-365-security/microsoft-365-checklist', label: 'M365 Security Checklist', icon: 'bi-list-check' },
    ],
    preCta: {
      headline: "Not sure if this is a one-time issue or a bigger pattern?",
      subheading: "Send us the symptoms. We'll tell you whether it looks like a quick fix, a support block, or a managed IT problem — no pressure, no sales pitch.",
    },
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
        q: 'Do you provide one-time IT support in Vaughan?',
        a: 'Yes. You can engage us for a single ticket, a one-off project, or a block of pre-paid hours — there is no requirement to sign up for ongoing managed IT services. If after working together it makes sense to move to a managed plan, we will tell you, but we will not push that conversation before you are ready.',
      },
      {
        q: 'Can you help if we already have an internal IT person?',
        a: 'Yes. Many Vaughan offices have one IT person who is at capacity. We take overflow tickets, after-hours work, and specialist tasks — Microsoft 365 security, Wi-Fi surveys, conditional access configuration — so the in-house person is not the only bottleneck when something urgent lands.',
      },
      {
        q: 'Do you fix Microsoft 365 and Teams issues?',
        a: 'Yes — and recurring Microsoft 365 issues are the most common reason Vaughan offices reach out. Repeated MFA prompts, Outlook profiles that keep corrupting, conditional access rules that lock out the wrong users: most of these come back to a misconfigured tenant. We diagnose the underlying setting, fix it once, and document what changed so the issue stops repeating.',
      },
      {
        q: 'Can you help with Wi-Fi and network issues on a one-off basis?',
        a: 'Yes. We troubleshoot dead zones, dropping access points, slow uploads, and Teams or VoIP calls that fall apart under load — without requiring a full network redesign. If a deeper redesign is genuinely needed, we will tell you and quote it separately rather than billing endless ticket time.',
      },
      {
        q: 'When should we switch from break-fix support to managed IT services?',
        a: 'Once a Vaughan office is logging more than a handful of tickets a month, or once a single ransomware incident, mailbox loss, or compromised account would be material to the business, the maths usually flips toward our managed IT services in Vaughan plan — flat monthly pricing, proactive monitoring, and endpoint protection on every device, instead of paying per ticket while a problem builds in the background.',
      },
    ],
    localSection: {
      heading: 'Where We Help Vaughan Teams',
      body: 'Most Vaughan IT support tickets we handle come from three areas: the Vaughan Metropolitan Centre and Highway 7 corridor (modern offices, busy Wi-Fi, hybrid teams), Concord industrial-and-office hybrids where the back-of-house and front-office share networking, and Woodbridge / Maple professional practices where a small team needs reliable Microsoft 365 and a phone they can actually call. We dispatch on-site for anything we cannot fix remotely.',
    },
    localScenario: {
      headline: 'Common local situation — Vaughan Metropolitan Centre',
      situation: 'A small professional services office near the VMC notices Microsoft Teams calls dropping mid-meeting and staff getting repeated MFA prompts even after signing in.',
      response: 'CtrlShift IT Services would typically start with remote triage the same day — checking the Microsoft 365 conditional access policy and the Wi-Fi access-point handoff between bands — then correct the misconfiguration and document what changed.',
      outcome: 'After that kind of fix, the next step is usually to monitor calls and sign-ins for stability, then decide whether the office needs ongoing managed IT support instead of one-off troubleshooting. Offices that want the underlying issue prevented rather than reacted to next time would normally then move onto our managed IT services in Vaughan plan.',
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
      headline: 'Common local situation — Airport Corporate Centre',
      situation: 'A logistics-and-office site near the Airport Corporate Centre finds Microsoft Teams calls in the front office becoming unusable in the afternoon, while warehouse devices saturate the same circuit with bulk uploads.',
      response: 'CtrlShift IT Services would typically not redesign the whole network. The usual starting point is separating voice and warehouse traffic on the existing firewall, checking the access-point VLANs, and adding quality-of-service rules so Microsoft Teams traffic gets priority on the upload path.',
      outcome: 'After that kind of fix, the next step is usually to monitor call quality and network usage, then decide whether endpoint protection, tested backups, and Microsoft 365 access controls should be managed on an ongoing basis. Offices that want endpoint protection, tested backups, and Microsoft 365 access tightened beyond the immediate fix would normally then move onto our managed IT services in Mississauga plan.',
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
