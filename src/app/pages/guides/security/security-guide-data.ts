export interface SecurityGuideLink {
  readonly title: string;
  readonly path: string;
}

export interface SecurityGuideCard {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly icon: string;
  readonly path: string;
  readonly available: boolean;
}

export interface SecurityHub {
  readonly slug: string;
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly breadcrumbLabel: string;
  readonly schemaId: string;
  readonly breadcrumbSchemaId: string;
  readonly guides: ReadonlyArray<SecurityGuideCard>;
  readonly relatedLinks: ReadonlyArray<SecurityGuideLink>;
}

export interface SecurityStarterGuide {
  readonly slug: string;
  readonly hubSlug: string;
  readonly path: string;
  readonly title: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly intro: string;
  readonly coverItems: ReadonlyArray<string>;
  readonly icon: string;
  readonly relatedLinks: ReadonlyArray<SecurityGuideLink>;
}

export const SECURITY_HUBS: ReadonlyArray<SecurityHub> = [
  {
    slug: 'identity-attacks',
    path: '/guides/security/identity-attacks',
    title: 'Identity Attack Guides',
    description:
      'Practical guides to help small businesses understand password spray attacks, token theft, business email compromise, legacy authentication risks, and account takeover paths.',
    metaTitle: 'Identity Attack Guides for Small Business | CtrlShift IT Services',
    metaDescription:
      'Plain-English identity attack guides covering password spray, token theft, BEC, legacy authentication, and account takeover paths for small businesses.',
    breadcrumbLabel: 'Identity Attacks',
    schemaId: 'guides-security-identity-attacks-collection',
    breadcrumbSchemaId: 'guides-security-identity-attacks-breadcrumb',
    relatedLinks: [
      {
        title: 'MFA rollout for Microsoft 365',
        path: '/guides/security/microsoft-365-security/mfa-rollout-small-business'
      },
      {
        title: 'Conditional Access policies for small business',
        path: '/guides/security/microsoft-365-security/conditional-access-small-business'
      }
    ],
    guides: [
      {
        id: 'password-spray-attacks',
        title: 'Password Spray Attacks',
        summary:
          'How password spray attacks work, why MFA alone may not be enough, and what small businesses should monitor.',
        icon: 'bi-shield-exclamation',
        path: '/guides/security/identity-attacks/password-spray-attacks',
        available: true
      },
      {
        id: 'token-theft-attacks',
        title: 'Token Theft Attacks',
        summary:
          'How attackers steal session tokens, why users may appear legitimately signed in, and how Conditional Access helps reduce risk.',
        icon: 'bi-key',
        path: '/guides/security/identity-attacks/token-theft-attacks',
        available: true
      },
      {
        id: 'legacy-authentication-risk',
        title: 'Legacy Authentication Risk',
        summary:
          'Why old authentication protocols create account takeover risk in Microsoft 365 environments.',
        icon: 'bi-ban',
        path: '/guides/security/identity-attacks/legacy-authentication-risk',
        available: true
      },
      {
        id: 'business-email-compromise',
        title: 'Business Email Compromise',
        summary:
          'How mailbox compromise leads to invoice fraud, forwarding rules, and client impersonation.',
        icon: 'bi-envelope-exclamation',
        path: '/guides/security/identity-attacks/business-email-compromise',
        available: true
      }
    ]
  },
  {
    slug: 'network-attacks',
    path: '/guides/security/network-attacks',
    title: 'Network Attack Guides',
    description:
      'Plain-English guides explaining common network attack paths that affect small businesses, including DDoS, exposed remote access, VPN risk, and firewall misconfiguration.',
    metaTitle: 'Network Attack Guides for Small Business | CtrlShift IT Services',
    metaDescription:
      'Small business network attack guides covering DDoS, remote exploitation, exposed RDP, firewall misconfiguration, and VPN attack surface.',
    breadcrumbLabel: 'Network Attacks',
    schemaId: 'guides-security-network-attacks-collection',
    breadcrumbSchemaId: 'guides-security-network-attacks-breadcrumb',
    relatedLinks: [{ title: 'All small business cybersecurity guides', path: '/guides/security' }],
    guides: [
      {
        id: 'ddos-attacks-small-business',
        title: 'DDoS Attacks for Small Business',
        summary:
          'What a DDoS attack looks like, how it affects websites and cloud apps, and what realistic protection looks like.',
        icon: 'bi-cloud-lightning',
        path: '/guides/security/network-attacks/ddos-attacks-small-business',
        available: true
      },
      {
        id: 'remote-exploitation-attacks',
        title: 'Remote Exploitation Attacks',
        summary:
          'How exposed services, outdated VPNs, and unpatched systems become entry points.',
        icon: 'bi-broadcast-pin',
        path: '/guides/security/network-attacks/remote-exploitation-attacks',
        available: true
      },
      {
        id: 'exposed-rdp-risk',
        title: 'Exposed RDP Risk',
        summary:
          'Why exposing Remote Desktop to the internet is dangerous and what safer access patterns look like.',
        icon: 'bi-display',
        path: '/guides/security/network-attacks/exposed-rdp-risk',
        available: true
      },
      {
        id: 'firewall-misconfiguration-risk',
        title: 'Firewall Misconfiguration Risk',
        summary: 'How small firewall mistakes can expose internal systems or weaken protection.',
        icon: 'bi-bricks',
        path: '/guides/security/network-attacks/firewall-misconfiguration-risk',
        available: true
      },
      {
        id: 'vpn-attack-surface-small-business',
        title: 'VPN Attack Surface',
        summary:
          'Why VPN appliances and remote access systems need patching, MFA, and monitoring.',
        icon: 'bi-router',
        path: '/guides/security/network-attacks/vpn-attack-surface-small-business',
        available: true
      }
    ]
  },
  {
    slug: 'endpoint-security',
    path: '/guides/security/endpoint-security',
    title: 'Endpoint Security Guides',
    description:
      'Guides explaining how endpoint protection, EDR, MDR, patching, and device hardening reduce ransomware and malware risk for small businesses.',
    metaTitle: 'Endpoint Security Guides for Small Business | CtrlShift IT Services',
    metaDescription:
      'Endpoint security guides for small businesses covering EDR, MDR, endpoint isolation, patch management, and ransomware behaviour on devices.',
    breadcrumbLabel: 'Endpoint Security',
    schemaId: 'guides-security-endpoint-security-collection',
    breadcrumbSchemaId: 'guides-security-endpoint-security-breadcrumb',
    relatedLinks: [
      {
        title: 'Phishing and email threat defense',
        path: '/guides/security/microsoft-365-security/phishing-protection'
      },
      {
        title: 'Microsoft 365 backup for small business',
        path: '/guides/security/microsoft-365-security/microsoft-365-backup-small-business'
      },
      { title: 'All small business cybersecurity guides', path: '/guides/security' }
    ],
    guides: [
      {
        id: 'edr-vs-antivirus',
        title: 'EDR vs Antivirus',
        summary:
          'The practical difference between traditional antivirus and endpoint detection and response.',
        icon: 'bi-shield-plus',
        path: '/guides/security/endpoint-security/edr-vs-antivirus',
        available: true
      },
      {
        id: 'mdr-vs-edr',
        title: 'MDR vs EDR',
        summary:
          'How managed detection and response adds human investigation and response on top of endpoint telemetry.',
        icon: 'bi-person-workspace',
        path: '/guides/security/endpoint-security/mdr-vs-edr',
        available: true
      },
      {
        id: 'endpoint-isolation-explained',
        title: 'Endpoint Isolation Explained',
        summary:
          'What endpoint isolation does during a suspected compromise and why it matters.',
        icon: 'bi-pc-display-horizontal',
        path: '/guides/security/endpoint-security/endpoint-isolation-explained',
        available: true
      },
      {
        id: 'patch-management-basics',
        title: 'Patch Management Basics',
        summary:
          'Why patching operating systems, browsers, and applications is a security control, not just maintenance.',
        icon: 'bi-tools',
        path: '/guides/security/endpoint-security/patch-management-basics',
        available: true
      },
      {
        id: 'ransomware-behavior-endpoints',
        title: 'Ransomware Behavior on Endpoints',
        summary:
          'What ransomware commonly does on workstations and servers before files are encrypted.',
        icon: 'bi-bug',
        path: '/guides/security/endpoint-security/ransomware-behavior-endpoints',
        available: true
      }
    ]
  }
];

export const SECURITY_STARTER_GUIDES: ReadonlyArray<SecurityStarterGuide> =
  SECURITY_HUBS.flatMap((hub) =>
    hub.guides.map((guide) => ({
      slug: guide.id,
      hubSlug: hub.slug,
      path: guide.path,
      title: guide.title,
      metaTitle: `${guide.title} | ${hub.breadcrumbLabel} | CtrlShift IT Services`,
      metaDescription: guide.summary,
      intro: guide.summary,
      icon: guide.icon,
      coverItems: [
        `What ${guide.title.toLowerCase()} means in a small business environment`,
        'The warning signs, business impact, and common control gaps to look for',
        'Practical first steps before a deeper technical rollout or incident review'
      ],
      relatedLinks: hub.relatedLinks
    }))
  );

export function findSecurityHubBySlug(slug: string | null | undefined): SecurityHub | undefined {
  return SECURITY_HUBS.find((hub) => hub.slug === slug);
}

export function findSecurityGuideBySlug(
  hubSlug: string | null | undefined,
  guideSlug: string | null | undefined
): SecurityStarterGuide | undefined {
  return SECURITY_STARTER_GUIDES.find(
    (guide) => guide.hubSlug === hubSlug && guide.slug === guideSlug
  );
}
