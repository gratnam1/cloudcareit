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
      title: 'Managed IT Services in Toronto | CtrlShift IT Services',
      canonicalPath: '/managed-it-services-toronto',
      mainHeading: 'Managed IT Services in Toronto',
      areasServedText:
        'Our technicians provide on-site IT support throughout Toronto, including the Financial District, North York business hubs, Midtown offices, and the Downtown Core. Whether your team is near Bay Street towers or operating in mixed-use spaces across the city, we provide fast response for critical network and cloud outages.',
      intro:
        'Smart, secure managed IT for Toronto professional offices — we reduce downtime, harden Microsoft 365, and keep hybrid teams connected with dependable Wi-Fi, secure remote access, and fast support across the downtown core.',
      metaDescription:
        'Smart, secure managed IT for Toronto professional offices. We reduce downtime, harden Microsoft 365, and keep hybrid teams connected with dependable Wi-Fi.',
      heroBullets: [
        'Hybrid-ready: secure remote access + device protection',
        'Microsoft 365 hardening + phishing protection',
        'Wi-Fi reliability improvements for busy buildings'
      ],
      localWorkStyle:
        'Toronto teams often run hybrid schedules and rely heavily on secure email, shared files, and stable Wi-Fi in busy buildings.',
      nearbyAreas: ['Financial District', 'North York', 'Midtown', 'Downtown Core'],
      painPoints: [
        'Wi-Fi interference and dead zones in high-density buildings',
        'Phishing emails and account takeovers targeting Microsoft 365',
        'Slow file access due to messy permissions and sync conflicts',
        'VPN and remote access issues for hybrid staff'
      ],
      industries: ['Law firms', 'Medical clinics', 'Accounting practices', 'Boutique consulting'],
      services: [
        'Microsoft 365 administration & security baseline',
        'Office Wi-Fi troubleshooting & optimization',
        'Endpoint patching + monitoring',
        'Backup readiness and restore testing',
        'Secure remote access for hybrid teams'
      ],
      faq: [
        {
          q: 'How much does managed IT support cost for a Toronto business?',
          a: 'Our flat-rate plans start at $249/month for basic maintenance, $499/month for full managed IT with 24/7 monitoring and priority response, and $899/month for complete IT department outsourcing. All pricing is transparent with no hidden fees or surprise invoices.'
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
        'https://www.linkedin.com/company/ctrlshift-it-services',
        'https://www.facebook.com/ctrlshiftit'
      ],
      supportContext: 'Toronto professional offices — law firms in the Financial District, medical clinics in Midtown, accounting practices in North York, and boutique consulting firms across the downtown core — face unique IT challenges. Dense office buildings cause Wi-Fi interference, hybrid work creates VPN and remote access complexity, and compliance requirements for legal and medical data demand careful security controls.',
      supportContextPoints: [
        'Hybrid workforce support — secure remote access for office and home workers',
        'Wi-Fi optimization for high-density downtown and Midtown buildings',
        'Microsoft 365 security hardening for law firms and medical practices',
        'Multi-location IT management for Toronto businesses with satellite offices',
        'Fast on-site dispatch to Financial District, North York, and Midtown'
      ]
    },

    mississauga: {
      title: 'Managed IT Services in Mississauga | CtrlShift IT Services',
      canonicalPath: '/managed-it-services-mississauga',
      mainHeading: 'Managed IT Services in Mississauga',
      areasServedText:
        'Our technicians deliver on-site IT support across Mississauga, including Square One, Meadowvale, Airport Corporate Centre, and Heartland business districts. Whether your office is near Hurontario or operating close to Highway 401 and 403 corridors, we respond quickly to urgent network and productivity incidents.',
      intro:
        'Practical, secure, and responsive managed IT for Mississauga businesses — we keep your Wi-Fi reliable, your data protected, and your team productive with fast remote help and local on-site support when it matters.',
      metaDescription:
        'Practical, secure managed IT for Mississauga businesses. We keep your Wi-Fi reliable, data protected, and teams productive with fast remote & on-site support.',
      heroBullets: [
        'Local response across Peel Region and Square One',
        'Microsoft 365 / Google Workspace management',
        'Office networking, backups, and cybersecurity basics'
      ],
      localWorkStyle:
        'Mississauga offices often have larger floorplans and mixed devices that depend on clean networking.',
      nearbyAreas: ['Square One', 'Meadowvale', 'Airport Corporate Centre', 'Heartland'],
      painPoints: [
        'Large office layouts causing Wi-Fi coverage gaps',
        'Printer/scanner connectivity issues across floors',
        'ISP and modem/router problems causing random drops',
        'Onboarding/offboarding users quickly as teams grow'
      ],
      industries: ['Dental clinics', 'Professional services', 'Real estate brokerages', 'Small corporate offices'],
      services: [
        'Office networking + Wi-Fi coverage design',
        'User onboarding/offboarding + device setup',
        'Microsoft 365 or Google Workspace support',
        'Backup monitoring + recovery readiness',
        'Security hardening (MFA + patching)'
      ],
      faq: [
        {
          q: 'How much does managed IT support cost for a Mississauga business?',
          a: 'Our flat-rate plans start at $249/month for basic maintenance, $499/month for full managed IT with 24/7 monitoring and priority response, and $899/month for complete IT department outsourcing. All pricing is transparent — no hidden fees, no surprise invoices.'
        },
        {
          q: 'Can you improve Wi-Fi coverage across our Mississauga office?',
          a: 'Yes. We survey for dead zones, recommend access point placement across large floorplans, and configure separate guest and staff networks when needed.'
        },
        {
          q: 'Do you support mixed Microsoft 365 and Google Workspace environments?',
          a: 'Yes. We manage identity, email routing, file permissions, and device access controls across both platforms from a single point of contact.'
        },
        {
          q: 'Can you help standardize IT onboarding for fast-growing teams?',
          a: 'Yes. We create repeatable onboarding and offboarding checklists so accounts, devices, security settings, and access rights are provisioned consistently every time — no gaps, no forgotten steps.'
        }
      ],
      geo: {
        latitude: 43.5890,
        longitude: -79.6441
      },
      sameAs: [
        'https://www.linkedin.com/company/ctrlshift-it-services',
        'https://www.facebook.com/ctrlshiftit'
      ],
      supportContext: 'Mississauga businesses at Airport Corporate Centre, Meadowvale business parks, and the Hurontario corridor often operate in large open-plan offices with complex networking needs and growing hybrid teams. Dental clinics, real estate brokerages, and professional services firms in Peel Region depend on stable connectivity, fast device onboarding, and clean Wi-Fi coverage across expansive floorplans.',
      supportContextPoints: [
        'Large-footprint office Wi-Fi surveys and access point planning',
        'Device onboarding and offboarding for fast-growing Mississauga teams',
        'Support for multi-department environments with complex printer and scanner setups',
        'Microsoft 365 and Google Workspace administration from a single point of contact',
        'On-site dispatch across Square One, Meadowvale, Airport Corporate Centre, and Heartland'
      ]
    },

    vaughan: {
      title: 'Managed IT Services Vaughan | CtrlShift IT Services',
      canonicalPath: '/managed-it-services-vaughan',
      mainHeading: 'Managed IT Services & IT Support in Vaughan',
      areasServedText:
        'Our technicians provide on-site IT support across the City of Vaughan, including the Concord industrial park, Woodbridge business district, and the Vaughan Metropolitan Centre (VMC). Whether your office is located near Highway 7 and the 400 or up in Maple, we offer rapid response times for critical network failures.',
      intro:
        'Proactive managed IT for Vaughan and York Region — we stabilize your network, secure your cloud tools, and prevent outages with monitoring, patching, and clear documentation for growing professional offices.',
      metaDescription:
        'Reliable Managed IT Services in Vaughan. Proactive IT support, cybersecurity, and cloud solutions for businesses in Concord, Woodbridge, and Maple.',
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
          a: 'Our flat-rate plans start at $249/month for basic maintenance, $499/month for full managed IT with 24/7 monitoring and under-15-minute priority response, and $899/month for complete IT department outsourcing. All plans are month-to-month with no hidden fees.'
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
        'https://www.linkedin.com/company/ctrlshift-it-services',
        'https://www.facebook.com/ctrlshiftit'
      ],
      supportContext: 'Vaughan businesses in Woodbridge, Maple, Concord, and along the Highway 7 corridor often expand rapidly and find their IT infrastructure lagging behind growth. Medical practices, engineering firms, and professional offices in York Region need dependable connectivity for cloud tools, predictable IT costs, and a partner who can be on-site in the Vaughan Metropolitan Centre quickly when issues escalate.',
      supportContextPoints: [
        'Network cleanup and documentation for offices that have outgrown their original IT setup',
        'Security baseline (MFA, device hardening) for expanding Vaughan professional offices',
        'Backup and restore testing to protect data across Woodbridge and Concord locations',
        'Microsoft 365 and Google Workspace admin for multi-location Vaughan businesses',
        'Rapid on-site response to the Vaughan Metropolitan Centre and Highway 7 corridor'
      ]
    },

    thornhill: {
      title: 'Managed IT Services in Thornhill | CtrlShift IT Services',
      canonicalPath: '/managed-it-services-thornhill',
      mainHeading: 'Managed IT Services in Thornhill',
      areasServedText:
        'Our technicians provide on-site IT support across Thornhill, including offices near Promenade Shopping Centre, Yonge Street commercial corridors, and surrounding business plazas. Whether your team operates on the Vaughan side or Markham side of Thornhill, we provide rapid support for connectivity and security-critical failures.',
      intro:
        'Simple, dependable managed IT for Thornhill offices — we keep your email, Wi-Fi, and devices running smoothly with fast helpdesk support, practical security, and clear processes that reduce everyday IT friction.',
      metaDescription:
        'Simple, dependable managed IT for Thornhill offices. We keep email, Wi-Fi, and devices running smoothly with fast helpdesk support and practical security.',
      heroBullets: [
        'Fast remote support for small offices',
        'Wi-Fi troubleshooting and upgrades',
        'Microsoft 365 / Google Workspace support'
      ],
      localWorkStyle:
        'Thornhill offices often need simple, dependable IT: stable Wi-Fi, secure email, and fast support when devices misbehave.',
      nearbyAreas: ['Promenade Shopping Centre', 'Bathurst Corridor', 'Yonge Street', 'Steeles Area'],
      painPoints: [
        'Recurring Wi-Fi slowdowns and disconnects',
        'Email login issues and password resets',
        'Shared file permissions that get messy over time',
        'Unpatched laptops and outdated security settings'
      ],
      industries: ['Accounting practices', 'Professional services', 'Medical offices', 'Small local businesses'],
      services: [
        'Helpdesk support for staff',
        'Wi-Fi troubleshooting and upgrades',
        'Microsoft 365 / Google Workspace administration',
        'Patch management + security baseline',
        'Backup readiness + recovery steps'
      ],
      faq: [
        {
          q: 'How much does managed IT support cost for a Thornhill business?',
          a: 'Our flat-rate plans start at $249/month for basic maintenance, $499/month for full managed IT with 24/7 monitoring and priority response, and $899/month for complete IT department outsourcing. There are no hidden fees and no surprise invoices.'
        },
        {
          q: 'Are you a good fit for smaller offices in Thornhill?',
          a: 'Yes. Many of our clients are small offices — 5 to 20 staff — that want dependable IT without the complexity or cost of a full in-house team. We scale to fit your size.'
        },
        {
          q: 'Can you fix recurring email and login issues for our staff?',
          a: 'Yes. We troubleshoot account lockouts, MFA failures, and profile sync issues, then tighten policies so the same problems don\'t keep coming back.'
        },
        {
          q: 'Do you help with older networks that were never properly set up?',
          a: 'Yes. We audit, document, and clean up legacy network setups so future troubleshooting and upgrades are faster, safer, and less disruptive.'
        }
      ],
      geo: {
        latitude: 43.8161,
        longitude: -79.4246
      },
      sameAs: [
        'https://www.linkedin.com/company/ctrlshift-it-services',
        'https://www.facebook.com/ctrlshiftit'
      ],
      supportContext: 'Thornhill offices — from Promenade Shopping Centre area businesses to mixed-use professional offices along the Yonge Street and Bathurst corridors — tend to be smaller practices with 5 to 20 staff. Accounting practices, medical offices, and local retail service businesses in Thornhill need simple, dependable IT: email that just works, Wi-Fi that stays connected, and a support team that picks up the phone.',
      supportContextPoints: [
        'Practical Wi-Fi troubleshooting and upgrades for small Thornhill office environments',
        'Email and login issue resolution for Thornhill accounting and medical practices',
        'Shared file permission cleanup for teams that have grown over time',
        'Patch management and device security for Thornhill retail and service businesses',
        'On-site support for offices near Promenade, Yonge Street, and the Steeles corridor'
      ]
    },

    'richmond hill': {
      title: 'Managed IT Services in Richmond Hill | CtrlShift IT Services',
      canonicalPath: '/managed-it-services-richmond-hill',
      mainHeading: 'Managed IT Services in Richmond Hill',
      areasServedText:
        'Our technicians provide on-site IT support across Richmond Hill, including the Hillcrest Mall area, Highway 7 corridor, and key office zones along Yonge Street and Leslie Street. Whether your business is in a medical, legal, or professional office cluster, we offer fast response for high-impact outages and recurring IT disruptions.',
      intro:
        'Managed IT support for Richmond Hill businesses — proactive maintenance, strong account security, and responsive helpdesk so your team can focus on work instead of fighting with technology.',
      metaDescription:
        'Managed IT support for Richmond Hill businesses. Proactive maintenance, strong account security, and responsive helpdesk so your team can focus on work.',
      heroBullets: [
        'Device maintenance and patching',
        'Microsoft 365 security (MFA + access control)',
        'Backup strategy and restore testing'
      ],
      localWorkStyle:
        'Richmond Hill teams often rely on Microsoft 365, cloud files, and multi-device setups.',
      nearbyAreas: ['Hillcrest Mall', 'Yonge Street', 'Elgin Mills', 'Leslie Corridor'],
      painPoints: [
        'Slow laptops and devices due to lack of maintenance',
        'Phishing risk and weak account protection',
        'Network drops affecting calls and meetings',
        'Backup uncertainty (not sure what is protected)'
      ],
      industries: ['Professional services', 'Clinics', 'Local offices', 'Growing businesses'],
      services: [
        'Device maintenance + patching',
        'Account security (MFA + access control)',
        'Network reliability troubleshooting',
        'Backup strategy + restore testing',
        'Ongoing helpdesk and admin support'
      ],
      faq: [
        {
          q: 'How much does managed IT support cost for a Richmond Hill business?',
          a: 'Our flat-rate plans start at $249/month for basic maintenance, $499/month for full managed IT with 24/7 monitoring and priority response, and $899/month for complete IT department outsourcing. All plans are month-to-month with no hidden fees.'
        },
        {
          q: 'Do you provide proactive monitoring for Richmond Hill offices?',
          a: 'Yes. Our managed plans include 24/7 endpoint and network monitoring. We catch and address issues before they turn into downtime — so your team rarely needs to call us with an emergency.'
        },
        {
          q: 'Can you speed up slow laptops and desktops for our Richmond Hill team?',
          a: 'Yes. We tune startup processes, apply OS patches, remove risky legacy software, and standardize device configurations for better day-to-day performance.'
        },
        {
          q: 'How do you verify backups actually work for Richmond Hill businesses?',
          a: 'We run scheduled restore tests on a regular basis and document the recovery steps so you have proof your data is recoverable before an emergency ever happens.'
        }
      ],
      geo: {
        latitude: 43.8828,
        longitude: -79.4403
      },
      sameAs: [
        'https://www.linkedin.com/company/ctrlshift-it-services',
        'https://www.facebook.com/ctrlshiftit'
      ],
      supportContext: 'Richmond Hill businesses along the Hillcrest Mall area, the Yonge Street business strip, and the Leslie Street office parks tend to rely heavily on Microsoft 365, cloud-based file access, and multi-device setups. Professional services firms, clinics, and growing local offices in York Region need proactive maintenance to prevent slow devices, phishing incidents, and backup gaps before they become emergencies.',
      supportContextPoints: [
        'Device maintenance and patch management for Richmond Hill professional offices',
        'Microsoft 365 security hardening (MFA, conditional access) for Yonge Street businesses',
        'Backup strategy and scheduled restore testing for Leslie Street and Hillcrest area offices',
        'Network reliability troubleshooting for offices experiencing call and meeting drops',
        'Proactive 24/7 monitoring to prevent downtime for Richmond Hill clinics and law practices'
      ]
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
