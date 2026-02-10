import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

type FaqItem = { q: string; a: string };

type LocationContent = {
  intro: string;
  heroBullets: string[];
  localWorkStyle: string;
  nearbyAreas: string[];
  painPoints: string[];
  industries: string[];
  services: string[];
  faq: FaqItem[];
};

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private meta = inject(Meta);
  private title = inject(Title);

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

  private LOCATION_CONTENT: Record<string, LocationContent> = {
    toronto: {
      intro:
        'Smart, secure managed IT for Toronto professional offices — we reduce downtime, harden Microsoft 365, and keep hybrid teams connected with dependable Wi-Fi, secure remote access, and fast support across the downtown core.',
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
          q: 'Do you offer on-site support in Toronto?',
          a: 'Yes. We handle on-site visits when needed, but we resolve most issues quickly through secure remote support.'
        }
      ]
    },

    mississauga: {
      intro:
        'Practical, secure, and responsive managed IT for Mississauga businesses — we keep your Wi-Fi reliable, your data protected, and your team productive with fast remote help and local on-site support when it matters.',
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
          q: 'Can you improve Wi-Fi coverage in our Mississauga office?',
          a: 'Yes. We diagnose coverage gaps, recommend access point placement, and configure guest/staff separation when needed.'
        }
      ]
    },

    vaughan: {
      intro:
        'Proactive managed IT for Vaughan and York Region — we stabilize your network, secure your cloud tools, and prevent outages with monitoring, patching, and clear documentation for growing professional offices.',
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
          q: 'Do you support clinics and professional offices in Vaughan?',
          a: 'Yes. We frequently work with professional offices and clinics that need stable systems and practical security.'
        }
      ]
    },

    thornhill: {
      intro:
        'Simple, dependable managed IT for Thornhill offices — we keep your email, Wi-Fi, and devices running smoothly with fast helpdesk support, practical security, and clear processes that reduce everyday IT friction.',
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
          q: 'Are you a good fit for smaller offices in Thornhill?',
          a: 'Yes. We specialize in small offices that want dependable IT without complexity.'
        }
      ]
    },

    'richmond hill': {
      intro:
        'Managed IT support for Richmond Hill businesses — proactive maintenance, strong account security, and responsive helpdesk so your team can focus on work instead of fighting with technology.',
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
          q: 'Do you provide proactive monitoring?',
          a: 'Yes. Our managed plans focus on preventing problems before they disrupt your team.'
        }
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

    const pageTitle = `Managed IT Support in ${this.city} | CtrlShift IT Services`;
    const description = `${this.intro} Serving offices near ${this.landmark}. Managed IT, Microsoft 365/Google Workspace, security, and networking support.`;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  private normalizeCityKey(city: string): string {
    return city.trim().toLowerCase();
  }

  private buildFallbackContent(
    city: string,
    region: string,
    landmark: string
  ): LocationContent {
    return {
      intro: `Managed IT support for ${city} businesses — reliable systems, practical security, and responsive helpdesk.`,
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
          q: `Do you provide IT support in ${city}?`,
          a: `Yes. We provide remote support and can arrange on-site visits for offices near ${landmark}.`
        }
      ]
    };
  }
}
