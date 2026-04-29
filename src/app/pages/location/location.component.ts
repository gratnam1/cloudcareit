import { Component, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';
import { ServiceAreaComponent } from './service-area.component';

type FaqItem = { q: string; a: string };
type LinkItem = { label: string; path: string };

type LocationContent = {
  title: string;
  canonicalPath: string;
  mainHeading: string;
  areasServedText?: string;
  intro: string;
  metaDescription: string;
  heroBullets: string[];
  localWorkStyle: string;
  nearbyAreas: string[];
  painPoints: string[];
  industries: string[];
  services: string[];
  faq: FaqItem[];
  geo?: {
    latitude: number;
    longitude: number;
  };
  mapImage?: string;
  sameAs?: string[];
  supportContext?: string;
  supportContextPoints?: string[];
  localTestimonial?: { quote: string; author: string; company: string };
  localExample?: { label: string; heading: string; body: string };
  citySpecificChallenges?: { title: string; description: string }[];
  neighborhoodFocus?: { heading: string; body: string };
};

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceAreaComponent],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);

  city = '';
  region = '';
  landmark = '';

  intro = '';
  heroBullets: string[] = [];
  localWorkStyle = '';
  nearbyAreas: string[] = [];
  painPoints: string[] = [];
  industries: string[] = [];
  services: string[] = [];
  faq: FaqItem[] = [];
  otherLocationLinks: LinkItem[] = [];
  cityServiceLinks: (LinkItem & { icon: string })[] = [];
  mainHeading = '';
  areasServedText = '';
  mapImage = '';
  supportContext = '';
  supportContextPoints: string[] = [];
  content!: LocationContent;
  readonly hubPagePath = '/managed-it-services';
  readonly hubPageLabel = 'Managed IT Services';
  readonly coreServiceLinks: LinkItem[] = [
    { label: 'Microsoft 365 Support', path: '/microsoft-365' },
    { label: 'Google Workspace Support', path: '/google-workspace' },
    { label: 'Office Networking & Wi-Fi', path: '/office-networking' },
    { label: 'Security & Firewall', path: '/security-firewall' },
  ];
  private readonly locationLinks: LinkItem[] = [
    { label: 'Managed IT Services Vaughan', path: '/managed-it-services-vaughan' },
    { label: 'Managed IT Services Toronto', path: '/managed-it-services-toronto' },
    { label: 'Managed IT Services Mississauga', path: '/managed-it-services-mississauga' },
    { label: 'Managed IT Services Thornhill', path: '/managed-it-services-thornhill' },
    { label: 'Managed IT Services Richmond Hill', path: '/managed-it-services-richmond-hill' },
  ];

  private readonly LOCAL_BUSINESS_SCHEMA_ID = 'local-business';
  private readonly LOCATION_SERVICE_SCHEMA_ID = 'location-service';
  private readonly FAQ_SCHEMA_ID = 'faq';
  private readonly BREADCRUMB_SCHEMA_ID = 'breadcrumb';
  private readonly SPEAKABLE_SCHEMA_ID = 'speakable-location';

  private LOCATION_CONTENT: Record<string, LocationContent> = {
    toronto: {
      title: 'Managed IT Services Toronto | CtrlShift IT Services',
      canonicalPath: '/managed-it-services-toronto',
      mainHeading: 'Managed IT Services & IT Support in Toronto',
      areasServedText:
        'Our technicians provide on-site IT support throughout Toronto, including the Financial District, North York business hubs, Midtown offices, and the Downtown Core. Whether your team is near Bay Street towers or operating in mixed-use spaces across the city, we provide fast response for critical network and cloud outages.',
      intro:
        'CtrlShift IT Services provides managed IT services and IT support for businesses in Toronto — from downtown professional offices and hybrid workforce firms to multi-location organizations across the Financial District, North York, and Midtown. As a security-first managed service provider Toronto teams rely on, we harden Microsoft 365, stabilize Wi-Fi in dense office towers, and deliver outsourced IT support Toronto law firms, medical clinics, and professional services depend on.',
      metaDescription:
        'Managed IT Services Toronto + IT Support Toronto for downtown offices and hybrid teams. Security-first managed service provider serving the Financial District, North York, and Midtown.',
      heroBullets: [
        'Hybrid-ready: secure remote access + device protection',
        'Microsoft 365 hardening + phishing protection',
        'Wi-Fi reliability improvements for busy buildings'
      ],
      localWorkStyle:
        'Toronto teams often run hybrid schedules and rely heavily on secure email, shared files, and stable Wi-Fi in busy buildings.',
      nearbyAreas: ['Financial District', 'North York', 'Midtown', 'Downtown Core'],
      painPoints: [
        'Wi-Fi interference and dead zones in high-density downtown office towers',
        'Phishing emails and account takeovers targeting Microsoft 365',
        'Slow file access due to messy permissions and sync conflicts across locations',
        'VPN and remote access issues for hybrid and distributed Toronto staff',
        'Inconsistent IT coverage across multi-location Toronto organizations'
      ],
      industries: [
        'Law firms in the Financial District and Bay Street towers',
        'Medical clinics in Midtown and North York',
        'Accounting practices near the downtown core',
        'Boutique professional services and consulting firms',
        'Multi-location organizations with Toronto headquarters'
      ],
      services: [
        'Microsoft 365 administration & security baseline for Toronto offices',
        'Office Wi-Fi troubleshooting & optimization for dense downtown buildings',
        'Endpoint patching + 24/7 monitoring',
        'Backup readiness and restore testing for compliance-sensitive Toronto firms',
        'Secure remote access and zero-trust VPN for hybrid Toronto teams',
        'Multi-location IT management for Toronto businesses with satellite offices'
      ],
      faq: [
        {
          q: 'How much does managed IT support cost for a Toronto business?',
          a: 'Our flat-rate plans start at $299/month for up to 5 business devices, $549/month for up to 12 devices with priority response, and $999/month for up to 25 devices with fully managed IT coordination. Every plan includes Huntress EDR-backed protection, with additional devices available for $15/device/month.'
        },
        {
          q: 'Can Toronto hybrid teams be supported remotely?',
          a: 'Yes. CtrlShift IT Services supports hybrid Toronto teams with Tailscale zero-trust remote access, Microsoft 365 conditional access policies, and consistent endpoint protection across office and home devices — so the experience is the same whether staff are in the Financial District or working from home.'
        },
        {
          q: 'Are you a managed service provider in Toronto for outsourced IT support?',
          a: 'Yes. CtrlShift IT Services is a managed service provider in Toronto delivering outsourced IT support for downtown offices, hybrid workforce firms, and multi-location organizations. Our flat-rate managed IT services Toronto plan includes 24/7 monitoring, security hardening, and priority helpdesk.'
        },
        {
          q: 'Do you offer on-site IT support in Toronto?',
          a: 'Yes. We provide on-site visits across the Financial District, North York, Midtown, and the downtown core. Most issues are resolved faster through secure remote support, but we dispatch on-site whenever physical intervention is needed.'
        },
        {
          q: 'Can you secure Microsoft 365 for legal and medical teams in Toronto?',
          a: 'Yes. We implement MFA, conditional access policies, safer sharing rules, and mailbox protection tailored for compliance-sensitive offices — including law firms and medical clinics.'
        },
        {
          q: 'How quickly can you respond to urgent downtime in Toronto?',
          a: 'Growth and Business plan clients receive a response within 15 minutes for production-critical incidents. We triage remotely first and dispatch on-site when required.'
        }
      ],
      geo: {
        latitude: 43.6532,
        longitude: -79.3832
      },
      sameAs: [
        'https://www.linkedin.com/company/ctrlshiftit-services/',
        'https://x.com/CtrlShiftIt',
        'https://maps.app.goo.gl/AHmLpmKhG88S54d37',
        'https://clutch.co/profile/ctrlshift-it-services',
        'https://www.goodfirms.co/company/ctrlshift-it-services'
      ],
      supportContext: 'Toronto professional offices — law firms in the Financial District, medical clinics in Midtown, accounting practices in North York, boutique consulting firms across the downtown core, and multi-location organizations with satellite sites around the GTA — face IT challenges that generic providers miss. Dense downtown office towers cause Wi-Fi interference and ISP-handoff issues, hybrid and distributed workforces create VPN and remote access complexity, and compliance requirements for legal, medical, and financial data demand a security-first managed IT approach with careful access controls, encrypted backups, and 24/7 endpoint monitoring.',
      supportContextPoints: [
        'Hybrid workforce support — Tailscale zero-trust remote access for downtown hybrid teams',
        'Wi-Fi optimization for high-density Bay Street, Midtown, and North York buildings',
        'Microsoft 365 security hardening for Toronto law firms, clinics, and accounting practices',
        'Multi-location IT management for Toronto headquarters with satellite offices across the GTA',
        'Response coverage: 15-minute remote triage target for Growth/Business clients with on-site dispatch to the Financial District, North York, Midtown, and the downtown core',
        'Security-first managed IT — Huntress EDR, MFA, conditional access, and encrypted Canadian-region backups'
      ],
      neighborhoodFocus: {
        heading: 'Financial District & Downtown Hubs',
        body: 'We specialize in supporting multi-tenant offices in dense towers like those on Bay Street and Adelaide. We navigate complex ISP handoffs and multi-floor Wi-Fi mesh setups that generic IT companies struggle with.'
      },
      citySpecificChallenges: [
        {
          title: 'High-Density Wi-Fi Interference',
          description: 'Bay Street towers are crowded with wireless signals. We use spectrum analysis to design stable Wi-Fi that does not drop during client meetings.'
        },
        {
          title: 'Regulatory Compliance (Law/Finance)',
          description: 'We harden Microsoft 365 to meet the strict data residency and security standards required for Toronto legal and financial firms.'
        }
      ],
      localExample: {
        label: 'Common local situation',
        heading: 'Hybrid office access for a downtown Toronto team',
        body: 'Example: a professional office with staff split between downtown workstations and home setups may run into VPN friction, inconsistent device access, and Microsoft 365 security gaps. CtrlShift IT Services would typically start by reviewing identity, device access, conditional access, and endpoint protection so the team can work securely without relying on fragile one-off workarounds.'
      }
    },

    mississauga: {
      title: 'Managed IT Services Mississauga | Multi-Floor & Airport-Area Offices | CtrlShift IT Services',
      canonicalPath: '/managed-it-services-mississauga',
      mainHeading: 'Managed IT Services in Mississauga',
      areasServedText:
        'Our technicians deliver on-site IT support across Mississauga, including Square One / City Centre, Meadowvale business parks, the Dixie–Eglinton corridor, the Hurontario spine, and airport-area offices around the 401/427 interchange. Whether your team works in a multi-floor office tower or a mixed warehouse-and-office unit near the airport, we respond quickly when networks, VoIP calls, or Microsoft 365 access fail.',
      intro:
        'CtrlShift IT Services provides managed IT services for Mississauga businesses with multi-floor offices, mixed warehouse-and-office networks, and growing Microsoft 365 environments. We work across Square One / City Centre office towers, Meadowvale business parks, the Hurontario corridor, the Dixie–Eglinton industrial belt, and airport-area logistics-plus-office sites. As a managed service provider Mississauga teams rely on for proactive support, we stabilise Wi-Fi across multi-floor footprints, keep VoIP and cloud calls clean, and tighten Microsoft 365 access control before staff turnover creates security gaps.',
      metaDescription:
        'Managed IT services for Mississauga multi-floor offices, airport-area sites, and growing Microsoft 365 teams. Proactive Wi-Fi, VoIP, and M365 access control across Square One, Meadowvale, Hurontario, and the Dixie–Eglinton corridor.',
      heroBullets: [
        'Multi-floor Wi-Fi stability across City Centre and Meadowvale',
        'VoIP and Teams call quality on shared business circuits',
        'Microsoft 365 access control as Mississauga teams grow'
      ],
      localWorkStyle:
        'Mississauga offices typically span multiple floors or combine a back-of-house warehouse with a customer-facing office — both are punishing on Wi-Fi, VoIP, and Microsoft 365 access if the network was never properly designed.',
      nearbyAreas: ['Square One / City Centre', 'Meadowvale', 'Dixie–Eglinton corridor', 'Hurontario', 'Airport Corporate Centre'],
      painPoints: [
        'Wi-Fi roaming gaps between floors in City Centre and Hurontario office towers',
        'VoIP and Microsoft Teams call quality dropping when warehouse traffic shares the same circuit as the office',
        'Microsoft 365 access drifting out of control as Mississauga teams hire across Meadowvale and Dixie',
        'Stale guest Wi-Fi, shared admin accounts, and ex-staff still in shared mailboxes after offboarding gaps',
        'Backup coverage that does not include the Microsoft 365 mailboxes and SharePoint sites the office actually depends on'
      ],
      industries: [
        'Multi-floor professional services offices in the Square One / City Centre cluster',
        'Accounting and tax practices along the Hurontario and Eglinton corridors',
        'Logistics and distribution offices around the Airport Corporate Centre and 401/427',
        'Health and wellness clinics in Meadowvale and the Dixie–Eglinton area',
        'Construction, real estate, and trades offices with a back-of-house warehouse'
      ],
      services: [
        'Multi-floor Wi-Fi survey and access-point design for City Centre and Meadowvale offices',
        'VoIP / Microsoft Teams call-quality troubleshooting on shared office + warehouse circuits',
        'Microsoft 365 identity, MFA, and conditional access tuned for Mississauga office turnover',
        'User onboarding and offboarding playbooks that close access on the day staff leave',
        'Backup readiness for Microsoft 365 mailboxes, OneDrive, and SharePoint — not just servers',
        'Network documentation for offices that have been added to or rewired over multiple moves'
      ],
      faq: [
        {
          q: 'How much does managed IT support cost for a Mississauga business?',
          a: 'Most Mississauga clients fit one of our three flat-rate tiers: a starter plan around $299/month for up to 5 devices, a $549/month plan for up to 12 devices with priority response, and a $999/month plan for up to 25 devices with fully managed coordination. Multi-floor offices in the Square One area and warehouse-plus-office sites near the airport usually sit in the middle tier. Additional devices are billed at $15/device/month. Plans are month-to-month and Huntress endpoint protection is included.'
        },
        {
          q: 'Can you improve Wi-Fi coverage across a multi-floor Mississauga office?',
          a: 'Yes. We survey real signal strength on every floor — including stairwells, meeting rooms, and warehouse zones — then place access points so devices roam cleanly between floors. We also separate staff, guest, and warehouse traffic so a busy back-of-house network does not slow down Microsoft Teams calls in the front office.'
        },
        {
          q: 'Why do our Microsoft Teams calls drop in our airport-area Mississauga office?',
          a: 'On most airport-area and Dixie–Eglinton sites we audit, voice traffic is competing with warehouse devices, security cameras, and bulk file uploads on the same circuit. We add quality-of-service rules so VoIP and Teams traffic gets priority, fix the access-point handoff between the office and the warehouse, and test under real load before signing off.'
        },
        {
          q: 'Can you tighten Microsoft 365 access for a growing Mississauga team?',
          a: 'Yes. We baseline MFA, conditional access, and admin-role separation, then add a documented onboarding and offboarding flow so a new hire in Meadowvale gets access on day one and a departing user loses every login the same day they leave — including shared mailboxes and SharePoint sites that usually get missed.'
        },
        {
          q: 'Do you support mixed Microsoft 365 and Google Workspace environments?',
          a: 'Yes. Mississauga offices that grew through acquisition often run both platforms side-by-side. We manage identity, email routing, file permissions, and device access controls across both from a single point of contact, and we document who owns what so handovers stop being painful.'
        },
        {
          q: 'Are you a managed service provider in Mississauga for outsourced IT support?',
          a: 'Yes. We act as the outsourced IT department for offices that do not want to hire in-house. The Mississauga plan covers proactive monitoring, patching, Microsoft 365 administration, vendor coordination (ISP, VoIP, copier, line-of-business apps), and an after-hours maintenance window so changes do not disrupt the working day.'
        }
      ],
      geo: {
        latitude: 43.5890,
        longitude: -79.6441
      },
      sameAs: [
        'https://www.linkedin.com/company/ctrlshiftit-services/',
        'https://x.com/CtrlShiftIt',
        'https://maps.app.goo.gl/AHmLpmKhG88S54d37',
        'https://clutch.co/profile/ctrlshift-it-services',
        'https://www.goodfirms.co/company/ctrlshift-it-services'
      ],
      supportContext: 'Mississauga businesses are usually one of two shapes: a multi-floor professional office in the Square One / City Centre or Hurontario clusters, or an airport-area site that combines a back-of-house warehouse with a customer-facing office along Dixie, Eglinton, or the 401/427 interchange. Both shapes punish a network that was never properly designed — Wi-Fi roaming fails between floors, VoIP and Microsoft Teams calls drop when bulk traffic shares the same circuit, and Microsoft 365 access drifts out of control as teams hire across Meadowvale and the Hurontario corridor. CtrlShift IT Services focuses on the network, voice, and identity layer that those offices actually live on.',
      supportContextPoints: [
        'Multi-floor Wi-Fi design for City Centre and Hurontario office towers',
        'VoIP / Microsoft Teams call-quality fixes on shared warehouse-and-office circuits',
        'Microsoft 365 access control, MFA, and conditional access for growing Mississauga teams',
        'Onboarding and offboarding playbooks that actually close access on the day staff leave',
        'Backup readiness for Microsoft 365 mailboxes, OneDrive, and SharePoint',
        'On-site dispatch across Square One / City Centre, Meadowvale, Dixie–Eglinton, Hurontario, and the Airport Corporate Centre'
      ],
      neighborhoodFocus: {
        heading: 'Square One, Hurontario & the Airport Corridor',
        body: 'Mississauga is split between vertical office towers around Square One / City Centre and Hurontario and horizontal warehouse-plus-office sites along Dixie, Eglinton, and the airport. We design networks for both — multi-floor Wi-Fi roaming on one side, and segmented voice / warehouse / staff traffic on the other — so a Microsoft Teams call in the front office is not held hostage by a bulk upload from the back of the building.'
      },
      citySpecificChallenges: [
        {
          title: 'Multi-floor Wi-Fi & VoIP Drift',
          description: 'In Square One, City Centre, and Hurontario towers, devices fail to roam cleanly between floors and VoIP calls drop on the handoff. We re-survey signal, re-tune access points, and add quality-of-service rules so calls and Teams meetings stay stable.'
        },
        {
          title: 'Microsoft 365 Access After Turnover',
          description: 'Mississauga offices hire and rotate fast — and shared mailboxes, SharePoint sites, and admin roles get left behind. We baseline MFA and conditional access and document onboarding/offboarding so departing staff actually lose access the day they leave.'
        }
      ],
      localExample: {
        label: 'Common local situation',
        heading: 'Two-floor office near Square One',
        body: 'Example: a small professional office spread across two floors near Square One often sees Wi-Fi handoff problems between floors and Microsoft Teams calls dropping in the afternoon. CtrlShift IT Services would typically start by re-surveying access points on both floors, separating guest and staff traffic, and tightening Microsoft 365 access — then document the network in writing so the next change is faster than the last one.'
      }
    },

    vaughan: {
      title: 'Managed IT Services Vaughan | CtrlShift IT Services',
      canonicalPath: '/managed-it-services-vaughan',
      mainHeading: 'Managed IT Services & IT Support in Vaughan',
      areasServedText:
        'Our technicians provide on-site IT support across the City of Vaughan, including the Concord industrial park, Woodbridge business district, and the Vaughan Metropolitan Centre (VMC). Whether your office is located near Highway 7 and the 400 or up in Maple, we offer rapid response times for critical network failures.',
      intro:
        'CtrlShift IT Services provides managed IT services and IT support for businesses in Vaughan — from Woodbridge and Maple to the Vaughan Metropolitan Centre and the Highway 7 corridor. As a local managed service provider Vaughan offices trust, we deliver outsourced IT support for medical practices, engineering firms, and professional offices with proactive monitoring, patching, and clear documentation.',
      metaDescription:
        'Managed IT Services Vaughan + IT Support Vaughan for Woodbridge, Maple, and the Vaughan Metropolitan Centre. Proactive managed service provider and outsourced IT support for York Region.',
      heroBullets: [
        'Reliable connectivity for clinics and professional services',
        'Microsoft 365 / Google Workspace administration',
        'Backup readiness and restore testing'
      ],
      localWorkStyle:
        'Vaughan businesses often need dependable networking, secure remote access, and predictable support as they expand.',
      nearbyAreas: ['Vaughan Metropolitan Centre', 'Highway 7 Corridor', 'Woodbridge', 'Maple'],
      painPoints: [
        'Office expansions needing network cleanup and documentation',
        'Inconsistent connectivity affecting VoIP and cloud apps',
        'Security gaps (missing MFA, weak passwords, outdated devices)',
        'Backups that exist but aren’t tested for restore'
      ],
      industries: ['Medical practices', 'Professional offices', 'Engineering firms', 'Growing startups'],
      services: [
        'Network tidy-up + reliability improvements',
        'Security baseline (MFA + device hardening)',
        'Backup + restore testing plan',
        'Helpdesk support for staff',
        'Microsoft 365 / Google Workspace admin'
      ],
      faq: [
        {
          q: 'How much does managed IT support cost for a Vaughan business?',
          a: 'Our flat-rate plans start at $299/month for up to 5 business devices, $549/month for up to 12 devices with under-15-minute priority response, and $999/month for up to 25 devices with fully managed IT coordination. All plans are month-to-month, and additional devices are $15/device/month.'
        },
        {
          q: 'Do you provide managed IT services in Vaughan?',
          a: 'Yes. CtrlShift IT Services provides managed IT services in Vaughan for offices in Woodbridge, Maple, Concord, and the Vaughan Metropolitan Centre. Our managed IT services Vaughan plan includes 24/7 monitoring, proactive patching, Microsoft 365 administration, and a priority helpdesk — all under a flat monthly rate.'
        },
        {
          q: 'Are you a managed service provider in Vaughan for outsourced IT support?',
          a: 'Yes. CtrlShift IT Services is a managed service provider in Vaughan delivering outsourced IT support for growing professional offices, medical practices, and engineering firms in York Region. Our flat-rate plans replace an in-house IT team with predictable monthly pricing.'
        },
        {
          q: 'Do you offer on-site IT support in Vaughan?',
          a: 'Yes. We provide on-site support across Vaughan, including Concord, Woodbridge, Maple, and the Vaughan Metropolitan Centre. Most issues are resolved remotely within minutes, but we dispatch on-site whenever hands-on work is required.'
        },
        {
          q: 'Can you support businesses in Concord and Woodbridge with multi-site IT?',
          a: 'Yes. We manage multi-location offices with standardized network setups, shared security policies, and centralized monitoring so every site runs consistently.'
        },
        {
          q: 'Do you handle after-hours maintenance for Vaughan offices?',
          a: 'Yes. We schedule patching, maintenance windows, and planned network changes outside business hours to avoid disrupting your team during the workday.'
        }
      ],
      geo: {
        latitude: 43.8372,
        longitude: -79.5083
      },
      sameAs: [
        'https://www.linkedin.com/company/ctrlshiftit-services/',
        'https://x.com/CtrlShiftIt',
        'https://maps.app.goo.gl/AHmLpmKhG88S54d37',
        'https://clutch.co/profile/ctrlshift-it-services',
        'https://www.goodfirms.co/company/ctrlshift-it-services'
      ],
      supportContext: 'Vaughan businesses in Woodbridge, Maple, Concord, and along the Highway 7 corridor often expand rapidly and find their IT infrastructure lagging behind growth. Medical practices, engineering firms, and professional offices in York Region need dependable connectivity for cloud tools, predictable IT costs, and a partner who can be on-site in the Vaughan Metropolitan Centre quickly when issues escalate.',
      supportContextPoints: [
        'Network cleanup and documentation for offices that have outgrown their original IT setup',
        'Security baseline (MFA, device hardening) for expanding Vaughan professional offices',
        'Backup and restore testing to protect data across Woodbridge and Concord locations',
        'Microsoft 365 and Google Workspace admin for multi-location Vaughan businesses',
        'Rapid on-site response to the Vaughan Metropolitan Centre and Highway 7 corridor'
      ],
      neighborhoodFocus: {
        heading: 'Vaughan Metropolitan Centre (VMC) & Concord',
        body: 'From modern offices in the VMC to established industrial hubs in Concord, we support Vaughan teams with on-site dispatch and specialized networking for mixed-use buildings and office expansions.'
      },
      citySpecificChallenges: [
        {
          title: 'Rapid Office Expansion',
          description: 'Vaughan startups and clinics grow fast. We standardize your network early so you do not have to "redo" everything when you add a second floor or new branch.'
        },
        {
          title: 'VoIP & Cloud Stability',
          description: 'Many Vaughan businesses struggle with ISP reliability. We implement failover and traffic shaping to ensure your phones and cloud apps never lag.'
        }
      ],
      localExample: {
        label: 'Common local situation',
        heading: 'Office network move in Woodbridge',
        body: 'Example: a growing office moving into or between Woodbridge locations may need its network documented, Wi-Fi coverage reviewed, firewall rules cleaned up, and staff devices reconnected with minimal disruption. CtrlShift IT Services would typically start by mapping the current setup, planning the cutover, and documenting the new network so future support is easier.'
      }
    },

    thornhill: {
      title: 'Managed IT Services Thornhill | Plaza Offices, Clinics & Professional Practices | CtrlShift IT Services',
      canonicalPath: '/managed-it-services-thornhill',
      mainHeading: 'Managed IT Services in Thornhill',
      areasServedText:
        'Our technicians support Thornhill offices on both the Vaughan and Markham sides — around Promenade Shopping Centre, along the Yonge Street corridor, the Bathurst / Centre Street stretch, and the shared business plazas around Steeles. Most clients are small accounting, legal, and medical practices with 5–25 staff that need their Wi-Fi, Microsoft 365, and onboarding/offboarding to just work.',
      intro:
        'CtrlShift IT Services provides managed IT services for Thornhill professional practices — accounting and tax firms, single-site law and notary offices, and medical and dental clinics in shared plazas around Promenade, Yonge, Bathurst, and Centre Street. As a managed service provider Thornhill owners trust, we focus on the things that quietly hurt small offices: Microsoft 365 security drift, plaza-shared Wi-Fi, and the onboarding/offboarding gaps that leave ex-staff and contractors with active accounts long after they have moved on.',
      metaDescription:
        'Managed IT services for Thornhill accounting, legal, and clinic offices around Promenade, Yonge, Bathurst, and Centre Street. Microsoft 365 security, plaza Wi-Fi, and tight onboarding / offboarding for small professional practices.',
      heroBullets: [
        'Microsoft 365 security tuned for accounting and legal offices',
        'Plaza Wi-Fi separated from neighbouring tenants',
        'Documented onboarding and offboarding for small teams'
      ],
      localWorkStyle:
        'Thornhill clients are usually small professional practices — accountants, lawyers, dentists, family clinics — where the same person handles bookings, billing, and IT. They need IT that runs quietly in the background, not another vendor to chase.',
      nearbyAreas: ['Promenade Shopping Centre', 'Yonge Street corridor', 'Bathurst / Centre Street', 'Steeles plazas', 'Royal Orchard'],
      painPoints: [
        'Microsoft 365 set up years ago without MFA, conditional access, or proper admin separation',
        'Plaza Wi-Fi shared with neighbouring tenants, with no separation between staff devices and guest traffic',
        'Ex-staff, locum dentists, and outside accountants still in shared mailboxes and file shares months after leaving',
        'Recurring Outlook, password, and printer issues nobody has time to root-cause',
        'Backups assumed to be working — until someone actually needs to restore a deleted SharePoint folder or mailbox'
      ],
      industries: [
        'Accounting and tax practices around Promenade and Yonge Street',
        'Single-site law firms and notary offices along the Bathurst / Centre Street corridor',
        'Family medical and dental clinics in shared plazas',
        'Boutique consulting and financial-advisory practices',
        'Local retail and service businesses with a small back-office team'
      ],
      services: [
        'Microsoft 365 security baseline — MFA, conditional access, admin-role separation',
        'Plaza Wi-Fi cleanup with separated staff, guest, and POS traffic',
        'Documented onboarding and offboarding for accounting, legal, and clinic practices',
        'Helpdesk for Outlook, password, MFA, and printer issues that keep coming back',
        'Backup readiness for Microsoft 365 mailboxes, OneDrive, and SharePoint',
        'Practical patch management and endpoint hygiene for small Thornhill offices'
      ],
      faq: [
        {
          q: 'How much does managed IT support cost for a Thornhill business?',
          a: 'Most Thornhill practices fit our small-office tier of around $299/month for up to 5 devices, with a $549/month plan for up to 12 devices and priority response when the practice grows past one location. Pricing is flat and month-to-month, additional devices are $15/device/month, and Huntress endpoint protection is included so you do not pay separately for antivirus. We deliberately keep the plan simple because most Thornhill clients do not have the time to manage a complicated IT bill.'
        },
        {
          q: 'Can you secure Microsoft 365 for a Thornhill accounting or legal practice?',
          a: 'Yes — and this is usually the first thing we fix. Most Microsoft 365 tenants we inherit in Thornhill were set up years ago without MFA, without conditional access, and with the admin role attached to a regular user mailbox. We separate admin roles, enforce MFA, restrict legacy authentication, and add conditional access policies sized for a 5–25 person practice — without breaking how staff actually log in.'
        },
        {
          q: 'Our plaza Wi-Fi is shared with other tenants — can you fix that?',
          a: 'Yes. We separate your staff network from the plaza-shared circuit, put guests on their own SSID, and lock the staff Wi-Fi to your business devices so neighbouring tenants cannot accidentally land on your subnet. Where the building only offers a shared circuit, we add a small business-grade firewall so your office is not depending on the plaza router for security.'
        },
        {
          q: 'How do you stop ex-staff and locums from staying in our systems after they leave?',
          a: 'We build a documented offboarding checklist for the practice — Microsoft 365 account, shared mailboxes, SharePoint sites, MFA tokens, line-of-business apps, and any clinic or accounting software — and run it the same day someone leaves. New hires get the same checklist in reverse, so a locum dentist or a contract accountant has access on day one and loses it on the day the engagement ends.'
        },
        {
          q: 'Are you a good fit for a small Thornhill practice with no in-house IT?',
          a: 'Yes — most of our Thornhill clients are 5 to 25 staff with no in-house technology team. We act as the IT department: one phone number, one ticket queue, one quarterly review where we walk the office owner through what changed, what is at risk, and what we are going to fix next.'
        },
        {
          q: 'Can you take over an older Thornhill network that was never properly documented?',
          a: 'Yes. The first 30 days are usually a documentation pass — we map the cabling, the access points, the Microsoft 365 tenant, the line-of-business apps, the printers, and the vendor logins — then we hand the practice owner a written summary so the next IT change is faster and safer than the last one was.'
        }
      ],
      geo: {
        latitude: 43.8161,
        longitude: -79.4246
      },
      sameAs: [
        'https://www.linkedin.com/company/ctrlshiftit-services/',
        'https://x.com/CtrlShiftIt',
        'https://maps.app.goo.gl/AHmLpmKhG88S54d37',
        'https://clutch.co/profile/ctrlshift-it-services',
        'https://www.goodfirms.co/company/ctrlshift-it-services'
      ],
      supportContext: 'Thornhill is a city of small professional practices, not big corporate offices. Accounting and tax firms around Promenade, single-site law and notary offices along the Bathurst / Centre Street corridor, and family medical and dental clinics in shared plazas around Steeles all share the same risk profile: a Microsoft 365 tenant set up years ago without proper security, plaza Wi-Fi that nobody owns end-to-end, and onboarding/offboarding that lives in someone\'s head instead of in a checklist. CtrlShift IT Services focuses on those three things first because they are where Thornhill practices actually get hurt.',
      supportContextPoints: [
        'Microsoft 365 security baseline for Thornhill accounting, legal, and clinic practices',
        'Plaza Wi-Fi separation around Promenade, Yonge, and the Bathurst / Centre Street corridor',
        'Documented onboarding and offboarding so ex-staff and locums actually lose access on the day they leave',
        'Outlook / password / MFA / printer recurring-issue cleanup',
        'Backup readiness for Microsoft 365 mailboxes, OneDrive, and SharePoint',
        'On-site support for offices near Promenade, Yonge Street, Bathurst / Centre, and the Steeles plazas'
      ],
      neighborhoodFocus: {
        heading: 'Promenade, Yonge & Bathurst / Centre Street Practices',
        body: 'Thornhill practices cluster in three areas: Promenade and the surrounding plazas, the Yonge Street corridor up from Steeles, and the Bathurst / Centre Street stretch where most accounting, legal, and dental offices sit. We tune Microsoft 365 security, plaza Wi-Fi, and onboarding/offboarding around what those offices actually run — not the corporate-headquarters IT that bigger MSPs over-engineer for them.'
      },
      citySpecificChallenges: [
        {
          title: 'Microsoft 365 Set Up Years Ago',
          description: 'Most Thornhill tenants we inherit have no MFA, no conditional access, and an admin role attached to a regular user mailbox. We baseline security in stages so a 10-person practice gets the protection without the disruption.'
        },
        {
          title: 'Onboarding & Offboarding Gaps',
          description: 'Locums, contract accountants, and former staff routinely keep access to shared mailboxes and SharePoint folders for months. We replace the verbal handover with a written checklist that runs the same day someone leaves.'
        }
      ],
      localExample: {
        label: 'Common local situation',
        heading: 'Small accounting or legal practice off Yonge',
        body: 'Example: a small accounting or legal practice off Yonge in Thornhill — five-or-so staff plus seasonal contractors — often inherits a Microsoft 365 tenant set up years ago without MFA and with the admin role attached to a regular user mailbox. CtrlShift IT Services would typically start by separating the admin account, enforcing MFA, and adding a one-page onboarding/offboarding checklist the practice can run every time a contractor finishes.'
      }
    },

    'richmond hill': {
      title: 'Managed IT Services Richmond Hill | Endpoint Protection, Backup & Microsoft 365 | CtrlShift IT Services',
      canonicalPath: '/managed-it-services-richmond-hill',
      mainHeading: 'Managed IT Services in Richmond Hill',
      areasServedText:
        'Our technicians provide on-site IT support across Richmond Hill — along the Yonge Street corridor between Highway 7 and Elgin Mills, around the Hillcrest area and Hillcrest Mall, and through the Bayview / Leslie office clusters with quick access from Highway 7 and the 404. Most clients are growing professional practices and clinics that have outgrown a "one IT person we know" arrangement and need real endpoint protection, backup, and Microsoft 365 security.',
      intro:
        'CtrlShift IT Services provides managed IT services for Richmond Hill professional practices, clinics, and growing offices along the Yonge Street corridor, the Hillcrest area, and the Bayview / Leslie office cluster. As a managed service provider Richmond Hill businesses rely on, we focus on the controls that growing offices skip until something goes wrong — endpoint protection on every device, backups that have actually been restored at least once, and a Microsoft 365 tenant locked down with MFA, conditional access, and proper admin separation.',
      metaDescription:
        'Managed IT services for Richmond Hill clinics, professional services, and growing offices. Endpoint protection, tested backups, and Microsoft 365 security across Yonge Street, Hillcrest, and the Bayview / Leslie corridor with Highway 7 / 404 access.',
      heroBullets: [
        'Endpoint protection on every laptop and desktop',
        'Backups that get restore-tested, not just scheduled',
        'Microsoft 365 security tuned for growing York Region offices'
      ],
      localWorkStyle:
        'Richmond Hill offices tend to be growing — adding staff, opening a second location, or moving from a residential setup to a real office along Yonge or near Hillcrest — and the IT setup has not kept pace with the growth.',
      nearbyAreas: ['Yonge Street corridor', 'Hillcrest area / Hillcrest Mall', 'Bayview / Leslie offices', 'Highway 7 / 404 access', 'Elgin Mills'],
      painPoints: [
        'Endpoint protection patchy or missing — a mix of free antivirus, expired licences, and unmanaged personal devices',
        'Backups assumed to work but never restore-tested — including Microsoft 365 mailboxes and OneDrive',
        'Microsoft 365 still using basic password sign-in, with shared admin accounts and no conditional access',
        'Network drops hurting calls and Teams meetings as offices grow past their original Wi-Fi design',
        'No documented IT — the office "knows a guy" and nothing is written down for the next person who has to look at it'
      ],
      industries: [
        'Medical, dental, and family clinics around the Hillcrest area',
        'Accounting, financial-advisory, and tax practices along the Yonge Street corridor',
        'Law firms and notary offices in the Bayview / Leslie cluster',
        'Engineering, architecture, and consulting offices with quick Highway 7 / 404 access',
        'Growing professional practices opening a second Richmond Hill location'
      ],
      services: [
        'Endpoint protection deployment with managed EDR on every business device',
        'Backup strategy and scheduled restore testing — including Microsoft 365 mailboxes, OneDrive, and SharePoint',
        'Microsoft 365 security baseline — MFA, conditional access, admin-role separation',
        'Network reliability work for offices that have grown past their original Wi-Fi design',
        'Documented IT — written network map, vendor list, recovery steps, and quarterly review',
        'Helpdesk and proactive monitoring for Richmond Hill offices with no in-house IT'
      ],
      faq: [
        {
          q: 'How much does managed IT support cost for a Richmond Hill business?',
          a: 'Most growing Richmond Hill offices fit our $549/month plan for up to 12 devices with priority response, with a $299/month starter tier for smaller practices and a $999/month plan for offices closer to 25 devices. Pricing is flat and month-to-month, additional devices are $15/device/month, and managed endpoint protection (Huntress) is included on every device — so you do not pay separately for antivirus, EDR, or after-the-fact incident response.'
        },
        {
          q: 'Can you put real endpoint protection on every device in our Richmond Hill office?',
          a: 'Yes — and on most engagements we find at least one laptop without working antivirus, an expired licence somewhere, or a personal device sitting on the staff Wi-Fi. We deploy managed EDR (Huntress) on every business device, get visibility on the personal devices touching company data, and lock the gaps in stages so we are not breaking how staff actually work.'
        },
        {
          q: 'How do you verify our Richmond Hill backups actually work?',
          a: 'We do not trust a green tick on a backup dashboard. We schedule real restore tests — pick a file, a mailbox, a SharePoint folder — and prove they come back, then write the steps down so anyone in the office could follow them in an emergency. Most Richmond Hill offices we onboard have backups that look fine on paper but have never been tested.'
        },
        {
          q: 'Can you secure Microsoft 365 for a Richmond Hill clinic or professional office?',
          a: 'Yes. We separate the admin role from a regular user mailbox, enforce MFA across the tenant, restrict legacy authentication, and add conditional access policies sized for the office — so a Yonge Street accounting practice or a Hillcrest clinic gets the same security a much larger office would have, without the friction of an enterprise rollout.'
        },
        {
          q: 'Our Wi-Fi and Teams calls are dropping as we grow — can you fix that?',
          a: 'Yes. Most Richmond Hill offices we audit grew from 5 staff to 15+ on the same Wi-Fi setup, and the network is now under-provisioned. We redo the access-point design, separate staff and guest traffic, and add quality-of-service rules so Teams and VoIP calls stay clean even when the office is full.'
        },
        {
          q: 'Are you a managed service provider in Richmond Hill for outsourced IT?',
          a: 'Yes. We act as the outsourced IT department for Richmond Hill offices that do not want to hire in-house. The plan covers endpoint protection, monitoring, patching, backup, Microsoft 365 administration, vendor coordination, and a quarterly review where the office owner gets a written summary of what changed, what is at risk, and what we are fixing next.'
        }
      ],
      geo: {
        latitude: 43.8828,
        longitude: -79.4403
      },
      sameAs: [
        'https://www.linkedin.com/company/ctrlshiftit-services/',
        'https://x.com/CtrlShiftIt',
        'https://maps.app.goo.gl/AHmLpmKhG88S54d37',
        'https://clutch.co/profile/ctrlshift-it-services',
        'https://www.goodfirms.co/company/ctrlshift-it-services'
      ],
      supportContext: 'Richmond Hill offices are usually growing — adding staff, opening a second location, or moving out of a home-office setup into a real office along Yonge, Hillcrest, or the Bayview / Leslie corridor — and the IT setup has not kept pace. Endpoint protection is a mix of free antivirus and expired licences, backups have never been restore-tested, and the Microsoft 365 tenant is still running on basic passwords with the admin role attached to someone\'s personal mailbox. CtrlShift IT Services fixes those three layers first because they are where Richmond Hill offices actually get hurt — ransomware on an unprotected laptop, a lost mailbox that backup cannot recover, and a phished admin account that opens the whole tenant.',
      supportContextPoints: [
        'Managed endpoint protection on every business device — replacing free or expired antivirus',
        'Backup strategy and real restore testing for Microsoft 365, OneDrive, and SharePoint',
        'Microsoft 365 security baseline — MFA, conditional access, admin-role separation',
        'Network re-design for offices that have grown past their original Wi-Fi setup',
        'Quick on-site dispatch via Highway 7 / 404 to Yonge, Hillcrest, Bayview / Leslie, and Elgin Mills',
        'Documented IT — written network map, vendor list, and quarterly review for the practice owner'
      ],
      neighborhoodFocus: {
        heading: 'Yonge Corridor, Hillcrest & the Bayview / Leslie Cluster',
        body: 'Richmond Hill business activity sits in three bands: the Yonge Street corridor between Highway 7 and Elgin Mills, the Hillcrest area and Hillcrest Mall surrounds, and the Bayview / Leslie office cluster reachable from Highway 7 and the 404. We design endpoint protection, backup, and Microsoft 365 security around what offices in those bands actually look like — growing professional practices and clinics, not enterprise headquarters.'
      },
      citySpecificChallenges: [
        {
          title: 'Endpoint Protection Gaps',
          description: 'Most Richmond Hill offices we onboard have at least one device with expired antivirus, a personal laptop on the staff Wi-Fi, or a free product that does not actually respond to ransomware. We deploy managed EDR on every business device and document the personal devices touching company data.'
        },
        {
          title: 'Backups Nobody Has Restored',
          description: 'A green tick on a backup dashboard does not mean the data comes back. We schedule real restore tests for Microsoft 365 mailboxes, OneDrive, and SharePoint, and write down the recovery steps before an emergency ever happens.'
        }
      ],
      localExample: {
        label: 'Common local situation',
        heading: 'Growing professional practice on the Yonge / Highway 7 corridor',
        body: 'Example: a professional practice that has grown well past its original IT setup along Yonge near Highway 7 typically still runs on patchy antivirus, an untested Microsoft 365 backup, and an admin account that doubles as a regular user mailbox. CtrlShift IT Services would typically start by deploying managed endpoint protection on every device, restore-testing the backup, and locking down the admin account properly — then walk the practice owner through a written summary at the first quarterly review.'
      }
    }
  };

  ngOnInit(): void {
    const data = this.route.snapshot.data as {
      city?: string;
      region?: string;
      landmark?: string;
    };

    this.city = data.city ?? 'Your City';
    this.region = data.region ?? 'Ontario';
    this.landmark = data.landmark ?? 'your area';

    const key = this.normalizeCityKey(this.city);
    const content =
      this.LOCATION_CONTENT[key] ??
      this.buildFallbackContent(this.city, this.region, this.landmark);

    this.content = content;
    this.intro = content.intro;
    this.heroBullets = content.heroBullets;
    this.localWorkStyle = content.localWorkStyle;
    this.nearbyAreas = content.nearbyAreas;
    this.painPoints = content.painPoints;
    this.industries = content.industries;
    this.services = content.services;
    this.faq = content.faq;
    this.otherLocationLinks = this.locationLinks.filter(
      (item) => item.path !== content.canonicalPath
    );
    this.mainHeading = content.mainHeading;

    // Only include spoke links where a real dedicated page actually exists.
    // Do not generate dynamic paths for cities without published service pages — those
    // would fall through to the catch-all and redirect home.
    const CITY_SERVICE_PAGES: Record<string, (LinkItem & { icon: string })[]> = {
      vaughan: [
        { label: 'IT Support Vaughan',            path: '/it-support-vaughan',            icon: 'bi-headset' },
        { label: 'Cybersecurity Services Vaughan', path: '/cybersecurity-services-vaughan', icon: 'bi-shield-lock' },
        { label: 'Cloud Services Vaughan',         path: '/cloud-services-vaughan',         icon: 'bi-cloud-check' },
        { label: 'Microsoft 365 Support',          path: '/microsoft-365',                  icon: 'bi-microsoft' },
      ],
      mississauga: [
        { label: 'IT Support Mississauga', path: '/it-support-mississauga', icon: 'bi-headset' },
        { label: 'Microsoft 365 Support',   path: '/microsoft-365',          icon: 'bi-microsoft' },
        { label: 'Google Workspace',        path: '/google-workspace',       icon: 'bi-google' },
        { label: 'Office Networking',       path: '/office-networking',      icon: 'bi-router' },
      ],
    };
    const cityKey = this.normalizeCityKey(this.city);
    this.cityServiceLinks = CITY_SERVICE_PAGES[cityKey] ?? [
      { label: 'Managed IT Services',  path: '/managed-it-services', icon: 'bi-hdd-network' },
      { label: 'Microsoft 365 Support', path: '/microsoft-365',       icon: 'bi-microsoft' },
      { label: 'Google Workspace',      path: '/google-workspace',    icon: 'bi-google' },
      { label: 'Office Networking',     path: '/office-networking',   icon: 'bi-router' },
    ];
    this.areasServedText = content.areasServedText ?? '';
    this.mapImage = content.mapImage ?? '';
    this.supportContext = content.supportContext ?? '';
    this.supportContextPoints = content.supportContextPoints ?? [];

    this.seo.removeStructuredData(this.LOCAL_BUSINESS_SCHEMA_ID);
    this.seo.removeStructuredData(this.LOCATION_SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);

    this.seo.update({
      title: content.title,
      description: content.metaDescription,
      imageUrl: 'https://ctrlshiftit.ca/favicon.svg',
      type: 'website',
      canonicalPath: content.canonicalPath
    });

    const localBusinessSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'CtrlShift IT Services',
      image: content.mapImage
        ? ['https://ctrlshiftit.ca/favicon.svg', content.mapImage]
        : 'https://ctrlshiftit.ca/favicon.svg',
      url: `https://ctrlshiftit.ca${content.canonicalPath}`,
      telephone: '+1-416-624-4841',
      email: 'info@ctrlshiftit.ca',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: this.city,
        addressRegion: 'ON',
        addressCountry: 'CA'
      },
      areaServed: content.nearbyAreas.map((name) => ({ '@type': 'City', name })),
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Managed IT Services',
        itemListElement: content.services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service
          }
        }))
      }
    };

    if (content.geo) {
      localBusinessSchema.geo = {
        '@type': 'GeoCoordinates',
        latitude: content.geo.latitude,
        longitude: content.geo.longitude
      };
    }

    if (content.sameAs) {
      localBusinessSchema.sameAs = content.sameAs;
    }

    this.seo.setStructuredData(this.LOCAL_BUSINESS_SCHEMA_ID, localBusinessSchema);

    this.seo.setStructuredData(this.LOCATION_SERVICE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Managed IT Services in ${this.city}`,
      serviceType: 'Managed IT Services',
      description: content.metaDescription,
      url: `https://ctrlshiftit.ca${content.canonicalPath}`,
      provider: {
        '@type': 'Organization',
        name: 'CtrlShift IT Services',
        url: 'https://ctrlshiftit.ca'
      },
      areaServed: [
        { '@type': 'City', name: this.city },
        ...content.nearbyAreas.map((name) => ({ '@type': 'Place', name }))
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `Managed IT Services ${this.city}`,
        itemListElement: content.services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service
          }
        }))
      }
    });

    this.setFaqSchema();
    this.setBreadcrumbSchema(content.canonicalPath);

    // Speakable schema for voice assistants and AI engines
    this.seo.setStructuredData(this.SPEAKABLE_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: content.title,
      url: `https://ctrlshiftit.ca${content.canonicalPath}`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.hero-lead', '.faq-content']
      }
    });
  }

  private normalizeCityKey(city: string): string {
    return city.trim().toLowerCase();
  }

  private buildFallbackContent(
    city: string,
    region: string,
    landmark: string
  ): LocationContent {
    const canonicalPath = `/managed-it-services-${this.normalizeCityKey(city).replace(/\s+/g, '-')}`;
    return {
      title: `Managed IT Services in ${city} | CtrlShift IT Services`,
      canonicalPath,
      mainHeading: `Managed IT Services in ${city}`,
      intro: `Managed IT services for ${city} businesses — reliable systems, practical security, and responsive helpdesk.`,
      metaDescription: `Managed IT services for ${city} businesses. Reliable systems, practical security, and responsive helpdesk to keep your team productive.`,
      heroBullets: [
        'Fast remote support',
        'Microsoft 365 / Google Workspace support',
        'Reliable Wi-Fi and backups'
      ],
      localWorkStyle: `We help ${region} offices stay productive with stable email, secure file access, and dependable Wi-Fi.`,
      nearbyAreas: [landmark],
      painPoints: [
        'Email and account login issues',
        'Slow devices and recurring interruptions',
        'Wi-Fi instability and dead zones',
        'Security gaps like missing MFA and outdated patches'
      ],
      industries: ['Professional services', 'Small offices', 'Local businesses'],
      services: [
        'Helpdesk support',
        'Microsoft 365 / Google Workspace support',
        'Patch management + security baseline',
        'Backup readiness'
      ],
      faq: [
        {
          q: 'What are the hourly rates for IT support in the GTA?',
          a: 'Our managed IT plans are flat-rate to ensure predictable budgeting. For specific projects or ad-hoc support, we offer competitive hourly rates. Contact us for a detailed quote.'
        },
        {
          q: `Do you provide IT support in ${city}?`,
          a: `Yes. We provide remote support and can arrange on-site visits for offices near ${landmark}.`
        },
        {
          q: `Can you help improve Wi-Fi and cloud app reliability in ${city}?`,
          a: 'Yes. We identify bottlenecks, clean up network configuration, and optimize connectivity for business-critical tools.'
        },
        {
          q: 'Do you provide proactive maintenance, not just break-fix support?',
          a: 'Yes. Our managed approach includes patching, monitoring, and preventive security controls to reduce recurring incidents.'
        }
      ]
    };
  }

  goToPlans(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;
    event.preventDefault();

    this.router.navigate(['/'], { fragment: 'pricing' }).then(() => {
      this.scrollToPricing();
    });
  }

  private scrollToPricing() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const attemptScroll = () => {
      const target = this.document.getElementById('pricing');
      if (!target) return false;

      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const behavior = !mediaQuery || mediaQuery.matches ? 'instant' : 'smooth';
      target.scrollIntoView({ behavior, block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });

      return true;
    };

    if (attemptScroll()) return;

    let tries = 0;
    const maxTries = 15;
    const retry = () => {
      if (attemptScroll() || tries >= maxTries) return;
      tries += 1;
      setTimeout(retry, 120);
    };
    retry();
  }

  private setFaqSchema() {
    this.seo.setStructuredData(this.FAQ_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    });
  }

  private setBreadcrumbSchema(path: string) {
    const pageName = `Managed IT Services ${this.city}`;
    this.seo.setStructuredData(this.BREADCRUMB_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://ctrlshiftit.ca/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: this.hubPageLabel,
          item: `https://ctrlshiftit.ca${this.hubPagePath}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: pageName,
          item: `https://ctrlshiftit.ca${path}`
        }
      ]
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData(this.LOCAL_BUSINESS_SCHEMA_ID);
    this.seo.removeStructuredData(this.LOCATION_SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);
    this.seo.removeStructuredData(this.SPEAKABLE_SCHEMA_ID);
  }
}
