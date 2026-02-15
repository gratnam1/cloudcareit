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
  mainHeading = '';
  areasServedText = '';
  mapImage = '';
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
          q: 'What are the hourly rates for IT support in the GTA?',
          a: 'Our managed IT plans are flat-rate to ensure predictable budgeting. For specific projects or ad-hoc support, we offer competitive hourly rates. Contact us for a detailed quote.'
        },
        {
          q: 'Do you offer on-site support in Toronto?',
          a: 'Yes. We handle on-site visits when needed, but we resolve most issues quickly through secure remote support.'
        },
        {
          q: 'Can you secure Microsoft 365 for legal and medical teams in Toronto?',
          a: 'Yes. We implement MFA, conditional access, safer sharing rules, and mailbox protection policies tailored for compliance-sensitive offices.'
        },
        {
          q: 'How quickly can you respond to urgent downtime in downtown Toronto?',
          a: 'Critical incidents are triaged immediately through our helpdesk, with remote containment first and rapid on-site dispatch when physical intervention is required.'
        }
      ],
      geo: {
        latitude: 43.6532,
        longitude: -79.3832
      },
      sameAs: [
        'https://www.linkedin.com/company/ctrlshift-it-services',
        'https://www.facebook.com/ctrlshiftit'
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
          q: 'What are the hourly rates for IT support in the GTA?',
          a: 'Our managed IT plans are flat-rate to ensure predictable budgeting. For specific projects or ad-hoc support, we offer competitive hourly rates. Contact us for a detailed quote.'
        },
        {
          q: 'Can you improve Wi-Fi coverage in our Mississauga office?',
          a: 'Yes. We diagnose coverage gaps, recommend access point placement, and configure guest/staff separation when needed.'
        },
        {
          q: 'Do you support mixed Microsoft 365 and Google Workspace environments?',
          a: 'Yes. We manage identity, email routing, file permissions, and device access controls across both platforms.'
        },
        {
          q: 'Can you help standardize onboarding for fast-growing teams?',
          a: 'Absolutely. We create repeatable onboarding and offboarding checklists so accounts, devices, security settings, and access rights are provisioned consistently.'
        }
      ],
      geo: {
        latitude: 43.5890,
        longitude: -79.6441
      },
    },

    vaughan: {
      title: 'Managed IT Services Vaughan | 24/7 IT Support & Security | CtrlShift IT',
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
          q: 'What are the hourly rates for IT support in the GTA?',
          a: 'Our managed IT plans are flat-rate to ensure predictable budgeting. For specific projects or ad-hoc support, we offer competitive hourly rates. Contact us for a detailed quote.'
        },
        {
          q: 'Do you offer on-site IT support in Vaughan?',
          a: 'Yes, CtrlShift IT provides both remote helpdesk and on-site emergency support for businesses throughout Vaughan and York Region.'
        },
        {
          q: 'Can you support businesses in Concord and Woodbridge with multi-site IT?',
          a: 'Yes. We support multi-location offices with standardized network setups, shared security policies, and centralized monitoring.'
        },
        {
          q: 'Do you handle after-hours maintenance for Vaughan offices?',
          a: 'Yes. We can schedule patching, maintenance windows, and planned network changes outside business hours to minimize disruption.'
        }
      ],
      geo: {
        latitude: 43.8372,
        longitude: -79.5083
      },
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
          q: 'What are the hourly rates for IT support in the GTA?',
          a: 'Our managed IT plans are flat-rate to ensure predictable budgeting. For specific projects or ad-hoc support, we offer competitive hourly rates. Contact us for a detailed quote.'
        },
        {
          q: 'Are you a good fit for smaller offices in Thornhill?',
          a: 'Yes. We specialize in small offices that want dependable IT without complexity.'
        },
        {
          q: 'Can you fix recurring email and login issues for staff?',
          a: 'Yes. We troubleshoot account lockouts, authentication failures, and profile issues, then harden policies to prevent repeats.'
        },
        {
          q: 'Do you help with older networks that were never documented?',
          a: 'Yes. We audit, map, and clean up legacy setups so future troubleshooting and upgrades are faster and safer.'
        }
      ],
      geo: {
        latitude: 43.8161,
        longitude: -79.4246
      },
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
          q: 'What are the hourly rates for IT support in the GTA?',
          a: 'Our managed IT plans are flat-rate to ensure predictable budgeting. For specific projects or ad-hoc support, we offer competitive hourly rates. Contact us for a detailed quote.'
        },
        {
          q: 'Do you provide proactive monitoring?',
          a: 'Yes. Our managed plans focus on preventing problems before they disrupt your team.'
        },
        {
          q: 'Can you improve endpoint performance for slow laptops and desktops?',
          a: 'Yes. We tune startup load, patch operating systems, remove risky legacy software, and standardize device baselines for better stability.'
        },
        {
          q: 'How do you test backups for Richmond Hill businesses?',
          a: 'We run scheduled restore tests and document recovery steps so you know data can be recovered before an emergency happens.'
        }
      ],
      geo: {
        latitude: 43.8828,
        longitude: -79.4403
      },
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
    this.areasServedText = content.areasServedText ?? '';
    this.mapImage = content.mapImage ?? '';

    this.seo.removeStructuredData(this.LOCAL_BUSINESS_SCHEMA_ID);
    this.seo.removeStructuredData(this.LOCATION_SERVICE_SCHEMA_ID);
    this.seo.removeStructuredData(this.FAQ_SCHEMA_ID);
    this.seo.removeStructuredData(this.BREADCRUMB_SCHEMA_ID);

    this.seo.update({
      title: content.title,
      description: content.metaDescription,
      imageUrl: 'https://ctrlshiftit.ca/wp-content/uploads/logo.png',
      type: 'website',
      canonicalPath: content.canonicalPath
    });

    const localBusinessSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'CtrlShift IT Services',
      image: content.mapImage
        ? ['https://ctrlshiftit.ca/wp-content/uploads/logo.png', content.mapImage]
        : 'https://ctrlshiftit.ca/wp-content/uploads/logo.png',
      url: `https://ctrlshiftit.ca${content.canonicalPath}`,
      telephone: '6475035779',
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
  }
}
