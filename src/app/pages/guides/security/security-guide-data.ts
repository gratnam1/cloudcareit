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

export interface SecurityHubMeta {
  readonly label: string;
  readonly value: string;
}

export interface SecurityHubBlock {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export interface SecurityHubStat {
  readonly value: string;
  readonly label: string;
}

export interface SecurityHubTableRow {
  readonly threat: string;
  readonly group?: string;
  readonly path?: string;
  readonly icon?: string;
  readonly howItShowsUp: string;
  readonly businessImpact: string;
  readonly firstControl: string;
}

export interface SecurityHubFaq {
  readonly q: string;
  readonly a: string;
}

export interface SecurityHubTier {
  readonly title: string;
  readonly fit: string;
  readonly controls: ReadonlyArray<string>;
}

export interface SecurityHubRichContent {
  readonly slug: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly intro: ReadonlyArray<string>;
  readonly meta: ReadonlyArray<SecurityHubMeta>;
  readonly heroStats?: ReadonlyArray<SecurityHubStat>;
  readonly quickLinks: ReadonlyArray<{ readonly label: string; readonly fragment: string }>;
  readonly whoFor: ReadonlyArray<SecurityHubBlock>;
  readonly explanationTitle: string;
  readonly explanation: ReadonlyArray<string>;
  readonly scenarioTitle: string;
  readonly scenario: ReadonlyArray<string>;
  readonly flowTitle: string;
  readonly flowSubtitle: string;
  readonly flow: ReadonlyArray<SecurityHubBlock>;
  readonly tableTitle: string;
  readonly tableIntro: string;
  readonly tableRows: ReadonlyArray<SecurityHubTableRow>;
  readonly warningSigns: ReadonlyArray<SecurityHubBlock>;
  readonly firstSteps: ReadonlyArray<SecurityHubBlock>;
  readonly responseSteps?: ReadonlyArray<SecurityHubBlock>;
  readonly mistakes: ReadonlyArray<SecurityHubBlock>;
  readonly controls: ReadonlyArray<SecurityHubBlock>;
  readonly licenseTiers?: ReadonlyArray<SecurityHubTier>;
  readonly ctaTitle: string;
  readonly ctaCopy: string;
  readonly faqs: ReadonlyArray<SecurityHubFaq>;
}

export interface SecurityGuideFact {
  readonly label: string;
  readonly value: string;
}

export interface SecurityGuideBullet {
  readonly title: string;
  readonly description: string;
}

export interface SecurityGuideSection {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly paragraphs: ReadonlyArray<string>;
  readonly bullets?: ReadonlyArray<SecurityGuideBullet>;
}

export interface SecurityGuideDiagram {
  readonly title: string;
  readonly intro: string;
  readonly steps: ReadonlyArray<SecurityGuideBullet & { readonly icon: string }>;
}

export interface SecurityStarterGuide {
  readonly slug: string;
  readonly hubSlug: string;
  readonly path: string;
  readonly title: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly intro: ReadonlyArray<string>;
  readonly coverItems?: ReadonlyArray<string>;
  readonly icon: string;
  readonly facts: ReadonlyArray<SecurityGuideFact>;
  readonly whatItMeans: SecurityGuideSection;
  readonly businessImpact: SecurityGuideSection;
  readonly diagram?: SecurityGuideDiagram;
  readonly warningSigns: ReadonlyArray<SecurityGuideBullet>;
  readonly howAttackStarts?: SecurityGuideSection;
  readonly attackerGoals?: ReadonlyArray<SecurityGuideBullet>;
  readonly smallBusinessScenario?: SecurityGuideSection;
  readonly signalsToCheck?: ReadonlyArray<SecurityGuideBullet>;
  readonly firstSteps?: ReadonlyArray<SecurityGuideBullet>;
  readonly reduceRisk: ReadonlyArray<SecurityGuideBullet>;
  readonly commonMistakes?: ReadonlyArray<SecurityGuideBullet>;
  readonly ctrlShiftChecks: ReadonlyArray<SecurityGuideBullet>;
  readonly faqs?: ReadonlyArray<SecurityHubFaq>;
  readonly relatedLinks: ReadonlyArray<SecurityGuideLink>;
}

const MICROSOFT_365_RELATED_LINKS: ReadonlyArray<SecurityGuideLink> = [
  {
    title: 'MFA rollout for Microsoft 365',
    path: '/guides/security/microsoft-365-security/mfa-rollout-small-business'
  },
  {
    title: 'Conditional Access policies for small business',
    path: '/guides/security/microsoft-365-security/conditional-access-small-business'
  },
  {
    title: 'Microsoft 365 security checklist',
    path: '/guides/security/microsoft-365-security/microsoft-365-checklist'
  },
  {
    title: 'Microsoft 365 backup for small business',
    path: '/guides/security/microsoft-365-security/microsoft-365-backup-small-business'
  },
  {
    title: 'Phishing and email threat defense',
    path: '/guides/security/microsoft-365-security/phishing-protection'
  }
];

export const SECURITY_HUBS: ReadonlyArray<SecurityHub> = [
  {
    slug: 'gta-business',
    path: '/guides/security/gta-business',
    title: 'GTA Small Business Cybersecurity Checklist',
    description:
      'A practical 10-point security baseline for offices in Vaughan, Toronto, and Mississauga. Covering MFA, EDR, backups, and local compliance.',
    metaTitle: 'Cybersecurity Checklist for GTA Small Businesses | CtrlShift IT Services',
    metaDescription:
      'A practical 10-point security baseline for offices in Vaughan, Toronto, and Mississauga. Covering MFA, EDR, backups, and local compliance.',
    breadcrumbLabel: 'GTA Business Security',
    schemaId: 'guides-security-gta-business-collection',
    breadcrumbSchemaId: 'guides-security-gta-business-breadcrumb',
    relatedLinks: [
      { title: 'All small business cybersecurity guides', path: '/guides/security' },
      { title: 'Microsoft 365 security checklist', path: '/guides/security/microsoft-365-security/microsoft-365-checklist' }
    ],
    guides: [
      {
        id: 'gta-small-business-cybersecurity-checklist',
        title: 'Cybersecurity Checklist for GTA Small Businesses',
        summary: 'The 10-point security baseline every professional office in the GTA should have active.',
        icon: 'bi-check2-all',
        path: '/guides/security/gta-business/gta-small-business-cybersecurity-checklist',
        available: true
      }
    ]
  },
  {
    slug: 'identity-attacks',
    path: '/guides/security/identity-attacks',
    title: 'Identity Attacks: How Small Businesses Get Compromised',
    description:
      'A practical field guide to credential phishing, MFA fatigue, password spraying, token theft, business email compromise, OAuth consent attacks, and Microsoft 365 account takeover risk.',
    metaTitle: 'Identity Attacks: Small Business Account Takeover Guide | CtrlShift IT Services',
    metaDescription:
      'Learn how identity attacks compromise small businesses, including phishing, MFA fatigue, password spraying, token theft, BEC, OAuth consent, and admin takeover.',
    breadcrumbLabel: 'Identity Attacks',
    schemaId: 'guides-security-identity-attacks-collection',
    breadcrumbSchemaId: 'guides-security-identity-attacks-breadcrumb',
    relatedLinks: MICROSOFT_365_RELATED_LINKS.slice(0, 3),
    guides: [
      {
        id: 'password-spray-attacks',
        title: 'Password Spray Attacks',
        summary:
          'How password spray attacks work, why MFA and Conditional Access matter, and what small businesses should monitor.',
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
    title: 'Common Network Attacks Small Businesses Should Understand',
    description:
      'A practical guide to DDoS, port scanning, remote exploitation, rogue Wi-Fi, VPN abuse, exposed RDP, DNS attacks, lateral movement, firewall rules, and segmentation basics.',
    metaTitle: 'Common Network Attacks for Small Business | CtrlShift IT Services',
    metaDescription:
      'Understand common network attacks that affect small businesses, including DDoS, port scanning, VPN abuse, exposed RDP, DNS attacks, and lateral movement.',
    breadcrumbLabel: 'Network Attacks',
    schemaId: 'guides-security-network-attacks-collection',
    breadcrumbSchemaId: 'guides-security-network-attacks-breadcrumb',
    relatedLinks: [
      { title: 'All small business cybersecurity guides', path: '/guides/security' },
      {
        title: 'Microsoft 365 security checklist',
        path: '/guides/security/microsoft-365-security/microsoft-365-checklist'
      }
    ],
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
        id: 'port-scanning-risk',
        title: 'Port Scanning Risk',
        summary:
          'How internet scans find exposed services and how small businesses should review public attack surface.',
        icon: 'bi-radar',
        path: '/guides/security/network-attacks/port-scanning-risk',
        available: true
      },
      {
        id: 'remote-exploitation-attacks',
        title: 'Remote Exploitation Attacks',
        summary: 'How exposed services, outdated VPNs, and unpatched systems become entry points.',
        icon: 'bi-broadcast-pin',
        path: '/guides/security/network-attacks/remote-exploitation-attacks',
        available: true
      },
      {
        id: 'man-in-the-middle-attacks-small-business',
        title: 'Man-in-the-Middle Attacks',
        summary:
          'Where interception risk appears for Wi-Fi, remote work, unmanaged devices, and unsafe traffic paths.',
        icon: 'bi-signpost-split',
        path: '/guides/security/network-attacks/man-in-the-middle-attacks-small-business',
        available: true
      },
      {
        id: 'rogue-wifi-risk',
        title: 'Rogue Wi-Fi Risk',
        summary:
          'How fake or unmanaged wireless networks create risk for offices, clinics, and visitor-heavy workplaces.',
        icon: 'bi-wifi-off',
        path: '/guides/security/network-attacks/rogue-wifi-risk',
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
        summary: 'Why VPN appliances and remote access systems need patching, MFA, and monitoring.',
        icon: 'bi-router',
        path: '/guides/security/network-attacks/vpn-attack-surface-small-business',
        available: true
      },
      {
        id: 'dns-attack-risk-small-business',
        title: 'DNS Attack Risk',
        summary:
          'Why DNS and registrar security matter for email delivery, websites, Microsoft 365, and client trust.',
        icon: 'bi-diagram-2',
        path: '/guides/security/network-attacks/dns-attack-risk-small-business',
        available: true
      },
      {
        id: 'lateral-movement-risk',
        title: 'Lateral Movement Risk',
        summary:
          'How one compromised endpoint can reach file shares, servers, and backups when segmentation is weak.',
        icon: 'bi-hdd-network',
        path: '/guides/security/network-attacks/lateral-movement-risk',
        available: true
      }
    ]
  },
  {
    slug: 'endpoint-security',
    path: '/guides/security/endpoint-security',
    title: 'Endpoint Security for Small Business: Laptops, Servers, and Workstations',
    description:
      'A practical endpoint security guide for small businesses covering antivirus, EDR, MDR, patching, local admin risk, disk encryption, browser security, USB controls, and ransomware prevention.',
    metaTitle: 'Endpoint Security for Small Business | CtrlShift IT Services',
    metaDescription:
      'Learn how small businesses should secure laptops, servers, and workstations with EDR, MDR, patching, local admin controls, encryption, and ransomware prevention.',
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

export const SECURITY_STARTER_GUIDES: ReadonlyArray<SecurityStarterGuide> = [
  {
    slug: 'password-spray-attacks',
    hubSlug: 'identity-attacks',
    path: '/guides/security/identity-attacks/password-spray-attacks',
    title: 'Password Spray Attacks',
    metaTitle: 'Password Spray Attacks: Small Business Microsoft 365 Guide | CtrlShift IT Services',
    metaDescription:
      'Learn how password spray attacks target Microsoft 365 accounts, warning signs to monitor, and practical controls for small businesses.',
    icon: 'bi-shield-exclamation',
    intro: [
      'A password spray attack is a quiet account takeover technique: instead of trying thousands of passwords against one account, attackers try a small set of common passwords across many accounts. For a 20-person office, that might mean every mailbox receives one or two attempts every few hours rather than one account being hammered until it locks.',
      'This matters because small businesses often have Microsoft 365 as the front door to email, files, invoicing, calendars, and client communication. A single weak password can become a mailbox compromise, invoice redirection, or internal phishing campaign. The goal is not to scare staff into impossible password rules; it is to close the predictable gaps attackers rely on.'
    ],
    facts: [
      { label: 'Primary target', value: 'Microsoft 365 and other cloud sign-ins' },
      { label: 'Typical entry point', value: 'Common passwords across many users' },
      { label: 'Key controls', value: 'MFA, Conditional Access, smart lockout, legacy auth blocking' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'Password spraying is different from a normal brute-force attack. A brute-force attack focuses on one user and tries many password combinations. Password spraying reverses that pattern: attackers choose passwords that people commonly use, then test those passwords against a broad list of usernames.',
        'The method is designed to avoid obvious lockouts. If your policy locks an account after ten bad attempts, an attacker may only try one password per account, wait, then try again later. The activity can look like background noise unless someone reviews sign-in logs across all users instead of only one mailbox.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'Professional offices usually have public staff directories, predictable email formats, and users who sign in from home, mobile devices, and client sites. That makes username discovery easy and makes unusual sign-in patterns harder to notice without centralized logging.',
        'In a law firm or accounting office, one compromised mailbox can expose client conversations, tax documents, closing instructions, or payment discussions. In a clinic, it can disrupt scheduling and patient communication. The business impact is usually operational first: lost trust, urgent password resets, payment verification calls, and time spent reconstructing what the account accessed.'
      ],
      bullets: [
        {
          title: 'Mailbox access',
          description: 'Attackers may read mail, search for invoices, and learn who approves payments.'
        },
        {
          title: 'Internal phishing',
          description: 'A compromised staff account is more believable than an outside sender.'
        },
        {
          title: 'Cloud data exposure',
          description: 'If the account has OneDrive, SharePoint, or Teams access, email is not the only concern.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Many failed logins across different users',
        description: 'The pattern matters more than any single account. Look for repeated failures spread across the tenant.'
      },
      {
        title: 'Attempts from unfamiliar countries, networks, or hosting providers',
        description: 'Sign-ins from locations where your staff do not work deserve review, especially when they target several accounts.'
      },
      {
        title: 'Impossible travel or rapid location changes',
        description: 'A user appearing in the GTA and then another country within minutes may indicate stolen credentials or automated attempts.'
      },
      {
        title: 'Repeated failures followed by a successful sign-in',
        description: 'A successful login after spray activity should be treated as a priority investigation item.'
      }
    ],
    reduceRisk: [
      {
        title: 'Require MFA for all users',
        description: 'MFA prevents a guessed password from being enough on its own. Prioritize admins, finance, partners, and shared workflows first if rollout must be staged.'
      },
      {
        title: 'Use Conditional Access where licensing allows',
        description: 'Conditional Access can require MFA based on risk, location, device compliance, or user group, making enforcement more practical for small teams.'
      },
      {
        title: 'Block legacy authentication',
        description: 'POP, IMAP, and older protocols may not enforce modern MFA properly. Blocking them removes a common bypass path.'
      },
      {
        title: 'Review sign-in logs regularly',
        description: 'Microsoft 365 sign-in logs show failed attempts, locations, client apps, and risk signals that help identify spray patterns.'
      },
      {
        title: 'Use smart lockout and a sensible password policy',
        description: 'Avoid password rules that encourage predictable patterns. Combine length, banned password lists, lockout protections, and MFA.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Tenant-wide sign-in pattern review',
        description: 'We look for failures spread across users, unfamiliar client apps, repeated source networks, and successful sign-ins after failed attempts.'
      },
      {
        title: 'MFA and Conditional Access coverage',
        description: 'We check whether all human users are covered and whether exceptions are documented, intentional, and monitored.'
      },
      {
        title: 'Legacy authentication exposure',
        description: 'We verify whether POP, IMAP, SMTP AUTH, or older clients are still in use and identify safer replacement options.'
      },
      {
        title: 'High-risk account review',
        description: 'We pay special attention to admin, billing, finance, partner, and mailbox-delegated accounts because they create higher business impact.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS
  },
  {
    slug: 'token-theft-attacks',
    hubSlug: 'identity-attacks',
    path: '/guides/security/identity-attacks/token-theft-attacks',
    title: 'Token Theft Attacks',
    metaTitle: 'Token Theft Attacks and Microsoft 365 Sessions | CtrlShift IT Services',
    metaDescription:
      'Plain-English guide to session token theft, why MFA alone may not stop active session abuse, and controls for small businesses.',
    icon: 'bi-key',
    intro: [
      'Token theft happens when an attacker steals the proof that a user has already signed in. After a successful Microsoft 365 sign-in, the user receives session tokens so they do not need to enter a password and MFA code for every click. If those tokens are stolen through phishing, malware, or a compromised device, the attacker may appear to be the already-authenticated user.',
      'For small businesses, token theft is uncomfortable because it can bypass the simple mental model of MFA. MFA is still essential, but an active stolen session changes the problem: the question becomes whether the sign-in session should be trusted based on device health, location, risk, and ongoing behaviour.'
    ],
    facts: [
      { label: 'Primary target', value: 'Browser and app sessions' },
      { label: 'Typical entry point', value: 'Phishing proxy, malicious browser extension, compromised endpoint' },
      { label: 'Key controls', value: 'Conditional Access, compliant devices, session controls, EDR' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'A session token is like a temporary pass that says the user has already authenticated. Modern cloud apps rely on tokens because constantly re-prompting users would make normal work painful. Token theft abuses that convenience.',
        'Attackers can steal tokens through phishing pages that sit between the user and Microsoft 365, malicious software on a device, unsafe browser extensions, or device compromise. Once a token is stolen, the attacker may not need the password again until the session expires or is revoked.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A stolen token can let an attacker read email, access Teams chats, download files, or create mailbox rules while appearing to use a legitimate session. In a 5- to 50-person office, that can be difficult to spot because staff often move between office Wi-Fi, home networks, phones, and client locations.',
        'For accountants, clinics, consultants, and law firms, the practical risk is unauthorized access to sensitive conversations and files. The attacker may quietly monitor messages, wait for a payment conversation, and then act at the right moment.'
      ],
      bullets: [
        {
          title: 'MFA fatigue is not the only issue',
          description: 'Even strong MFA can be sidestepped if a valid session token is captured after authentication.'
        },
        {
          title: 'Device trust becomes important',
          description: 'A compliant, managed device gives better assurance than an unknown browser on an unmanaged computer.'
        },
        {
          title: 'Session revocation matters',
          description: 'Changing a password may not immediately end every cloud session unless tokens are revoked.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Successful sign-ins from unusual browsers or locations',
        description: 'Watch for sessions that do not match the user, device, or expected working pattern.'
      },
      {
        title: 'MFA completed but activity still looks wrong',
        description: 'A user may have completed MFA on a phishing proxy while the attacker captured the resulting session.'
      },
      {
        title: 'New inbox rules or file downloads after a suspicious login',
        description: 'Post-login actions often reveal more than the login event itself.'
      },
      {
        title: 'Endpoint alerts around browser credential storage',
        description: 'Malware or suspicious tools touching browser data should be treated as identity risk, not only endpoint risk.'
      }
    ],
    reduceRisk: [
      {
        title: 'Use Conditional Access session controls',
        description: 'Require reauthentication for risky sessions, limit persistent browser sessions, and apply stricter rules to unmanaged devices.'
      },
      {
        title: 'Require compliant or trusted devices for sensitive access',
        description: 'For admin, finance, and client-data workflows, device compliance reduces the chance that unknown endpoints can carry valid sessions.'
      },
      {
        title: 'Monitor sign-in risk and user risk',
        description: 'Microsoft risk signals can help identify sessions that deserve step-up authentication or blocking.'
      },
      {
        title: 'Protect endpoints with EDR or MDR',
        description: 'Endpoint monitoring helps detect malware, suspicious browser activity, and credential theft behaviour.'
      },
      {
        title: 'Revoke sessions during account response',
        description: 'When an account is suspected compromised, revoke refresh tokens in addition to changing passwords and reviewing MFA methods.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Session and token response process',
        description: 'We confirm administrators know how to revoke sessions, reset MFA methods, and verify recovery details.'
      },
      {
        title: 'Conditional Access session posture',
        description: 'We review persistent sessions, unmanaged device access, sign-in frequency, and risk-based controls.'
      },
      {
        title: 'Endpoint and identity correlation',
        description: 'We compare endpoint alerts with Microsoft 365 sign-ins so device compromise is not investigated in isolation.'
      },
      {
        title: 'Sensitive account hardening',
        description: 'We check admin, finance, and owner accounts for stronger session controls and reduced exposure.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS
  },
  {
    slug: 'legacy-authentication-risk',
    hubSlug: 'identity-attacks',
    path: '/guides/security/identity-attacks/legacy-authentication-risk',
    title: 'Legacy Authentication Risk',
    metaTitle: 'Legacy Authentication Risk in Microsoft 365 | CtrlShift IT Services',
    metaDescription:
      'Understand how POP, IMAP, SMTP AUTH, and older clients create Microsoft 365 account risk for small businesses.',
    icon: 'bi-ban',
    intro: [
      'Legacy authentication refers to older sign-in methods and protocols that were designed before modern MFA and Conditional Access became standard. In Microsoft 365 environments, POP, IMAP, SMTP AUTH, and older Office clients are common examples.',
      'For small businesses, the risk is practical: an attacker with a stolen password may be able to authenticate through an older protocol that does not enforce the same protections as a modern browser or Outlook client. Blocking legacy authentication is one of the highest-value Microsoft 365 security improvements, but it should be planned so printers, scanners, and older apps do not break unexpectedly.'
    ],
    facts: [
      { label: 'Primary target', value: 'Older mail protocols and clients' },
      { label: 'Typical entry point', value: 'Stolen password used through POP, IMAP, or SMTP AUTH' },
      { label: 'Key controls', value: 'Disable legacy auth, modern authentication, sign-in log review' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'Modern authentication supports stronger controls such as MFA, Conditional Access, device checks, and risk-based decisions. Legacy authentication usually presents a simpler username-and-password path.',
        'The danger is not that every older protocol is actively malicious. The issue is that attackers prefer the weakest available door. If modern sign-ins require MFA but an older mail protocol still accepts only a password, the tenant has an avoidable gap.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'Small offices often discover legacy authentication through old scan-to-email setups, accounting software connectors, mobile mail apps configured years ago, or former IT decisions nobody documented. These dependencies are normal, but they need to be identified before enforcement.',
        'A clinic may rely on a multifunction printer to send scanned forms. A law office may have an older mail client on a partner laptop. An accounting firm may use SMTP AUTH for a line-of-business app. Security improvement should preserve operations while replacing weak authentication paths.'
      ],
      bullets: [
        {
          title: 'MFA bypass risk',
          description: 'Older protocols may allow password-only authentication even when users believe MFA protects the account.'
        },
        {
          title: 'Silent operational dependencies',
          description: 'Printers, scripts, and older applications often fail without clear user-facing errors.'
        },
        {
          title: 'Low attacker effort',
          description: 'Legacy protocols are easy to test automatically once usernames and passwords are obtained.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Sign-in logs showing POP, IMAP, SMTP, or old Office clients',
        description: 'Client app details in Microsoft 365 logs help identify who or what still uses legacy authentication.'
      },
      {
        title: 'Scan-to-email using a mailbox password',
        description: 'Printer workflows that authenticate directly to Microsoft 365 often need redesign before blocking SMTP AUTH.'
      },
      {
        title: 'Unexpected successful sign-ins without MFA prompts',
        description: 'Password-only access paths should be reviewed immediately.'
      },
      {
        title: 'Users with very old Outlook or mobile mail configurations',
        description: 'Older clients may need updates, account reconfiguration, or replacement.'
      }
    ],
    reduceRisk: [
      {
        title: 'Inventory legacy usage before blocking',
        description: 'Review sign-in logs for legacy client apps over a representative period so business dependencies are visible.'
      },
      {
        title: 'Disable legacy authentication',
        description: 'Use tenant settings and Conditional Access controls to block old protocols once exceptions have been remediated.'
      },
      {
        title: 'Move to modern authentication',
        description: 'Update Outlook, mobile apps, and connectors so they can support MFA and Conditional Access.'
      },
      {
        title: 'Replace weak scan-to-email patterns',
        description: 'Use supported relay, application-specific options, or vendor-recommended modern methods rather than a shared mailbox password.'
      },
      {
        title: 'Monitor after enforcement',
        description: 'Expect a short cleanup period. Logs help distinguish a real outage from an old device that needs reconfiguration.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Legacy client app report',
        description: 'We identify users, protocols, source locations, and devices still authenticating with older methods.'
      },
      {
        title: 'Operational dependency review',
        description: 'We map printers, scanners, apps, and service accounts that may be affected before enforcement.'
      },
      {
        title: 'Conditional Access and Security Defaults alignment',
        description: 'We verify that the chosen Microsoft 365 security model blocks legacy paths without creating unmanaged gaps.'
      },
      {
        title: 'Post-change validation',
        description: 'We check mail flow, scan-to-email, user sign-ins, and alerts after the change so the cleanup is controlled.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS
  },
  {
    slug: 'business-email-compromise',
    hubSlug: 'identity-attacks',
    path: '/guides/security/identity-attacks/business-email-compromise',
    title: 'Business Email Compromise',
    metaTitle: 'Business Email Compromise Guide for Small Business | CtrlShift IT Services',
    metaDescription:
      'Practical guide to business email compromise, invoice fraud, mailbox rules, and Microsoft 365 controls for small businesses.',
    icon: 'bi-envelope-exclamation',
    intro: [
      'Business email compromise, or BEC, is a practical fraud problem more than a technical spectacle. Attackers gain access to a mailbox or impersonate a trusted sender, then use normal business conversations to redirect payments, request gift cards, change banking details, or harvest confidential information.',
      'Small businesses are attractive because payment approval is often relationship-based. A law clerk, clinic administrator, bookkeeper, or consultant may know the requester personally and want to keep work moving. The best defence combines Microsoft 365 controls with simple finance procedures that make unusual requests easier to verify.'
    ],
    facts: [
      { label: 'Primary target', value: 'Mailboxes, finance workflows, vendor conversations' },
      { label: 'Typical entry point', value: 'Phishing, stolen password, weak MFA, inbox rule abuse' },
      { label: 'Key controls', value: 'MFA, mailbox auditing, alerting, payment verification' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'BEC can involve full mailbox compromise, lookalike domains, display-name spoofing, or a changed reply-to address. In many cases, the message does not contain malware. It works because it fits into a real business process.',
        'After mailbox access, attackers often search for words like invoice, payment, wire, closing, retainer, payroll, or tax. They may create forwarding rules, hide replies, and wait until the right conversation appears.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A professional office may have a small finance team, a managing partner who approves payments by email, and vendors that send invoices as PDFs. That is normal, but it creates predictable workflows attackers can study.',
        'The impact can include misdirected funds, delayed closings, vendor disputes, client notification work, mailbox cleanup, and staff confidence issues. Even when money is recovered, the business loses time proving what happened and tightening the process.'
      ],
      bullets: [
        {
          title: 'Invoice redirection',
          description: 'Attackers change banking details during an active vendor or client conversation.'
        },
        {
          title: 'Hidden mailbox rules',
          description: 'Rules can forward messages externally or move replies to folders users rarely check.'
        },
        {
          title: 'Trusted account abuse',
          description: 'Messages from a real staff mailbox can bypass the healthy skepticism people apply to unknown senders.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'New inbox or forwarding rules',
        description: 'Rules that delete, archive, forward, or hide messages are a common compromise indicator.'
      },
      {
        title: 'Changed reply-to or unusual sender domain',
        description: 'A message may look familiar while replies go somewhere else.'
      },
      {
        title: 'Strange sent mail or missing sent items',
        description: 'Attackers may send messages then delete traces or use rules to hide responses.'
      },
      {
        title: 'Urgent vendor payment changes',
        description: 'Banking detail changes should be verified through a known phone number or established out-of-band process.'
      }
    ],
    reduceRisk: [
      {
        title: 'Require MFA and monitor MFA changes',
        description: 'MFA reduces password-only compromise, while alerts for new MFA methods help catch account takeover attempts.'
      },
      {
        title: 'Enable mailbox auditing and alerting',
        description: 'Audit logs, inbox rule alerts, forwarding alerts, and suspicious sending alerts make response faster.'
      },
      {
        title: 'Use payment verification procedures',
        description: 'Verify new banking details or urgent payment changes through a known phone number, not by replying to the email thread.'
      },
      {
        title: 'Train staff on workflow checks',
        description: 'Training should focus on practical moments: invoice changes, executive requests, new vendors, and unexpected secrecy.'
      },
      {
        title: 'Review external forwarding',
        description: 'Disable or tightly control automatic forwarding to external addresses unless there is a documented business need.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Mailbox rule and forwarding review',
        description: 'We check for suspicious rules, external forwarding, hidden folders, and unusual mailbox permissions.'
      },
      {
        title: 'Audit and alert readiness',
        description: 'We confirm that Microsoft 365 logging captures the events needed to investigate mailbox compromise.'
      },
      {
        title: 'Finance workflow exposure',
        description: 'We identify payment approval paths that rely only on email and recommend lightweight verification steps.'
      },
      {
        title: 'Account recovery hygiene',
        description: 'We review MFA methods, password resets, session revocation, and risky sign-in history for affected users.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS
  },
  {
    slug: 'ddos-attacks-small-business',
    hubSlug: 'network-attacks',
    path: '/guides/security/network-attacks/ddos-attacks-small-business',
    title: 'DDoS Attacks for Small Business',
    metaTitle: 'DDoS Attacks for Small Business Websites and Remote Access | CtrlShift IT Services',
    metaDescription:
      'Learn what DDoS attacks mean for small business websites, VPNs, and cloud-facing services, plus practical mitigation steps.',
    icon: 'bi-cloud-lightning',
    intro: [
      'A distributed denial-of-service attack, or DDoS, tries to overwhelm a website, VPN, remote access service, or other internet-facing system with more traffic than it can handle. The attacker is not necessarily trying to steal data; the goal is to make the service unavailable.',
      'For a small business, even a short outage can be disruptive. A clinic portal, appointment booking page, ecommerce form, client file exchange, or remote access VPN may be part of daily work. The right preparation is usually a mix of provider-level protection, DNS/CDN decisions, firewall rules, and a clear escalation plan.'
    ],
    facts: [
      { label: 'Primary target', value: 'Websites, VPNs, DNS, exposed services' },
      { label: 'Typical entry point', value: 'Traffic overload from many sources' },
      { label: 'Key controls', value: 'CDN/DNS protection, hosting mitigation, ISP escalation, logging' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'DDoS is about availability. Attack traffic may come from many compromised systems or rented infrastructure, making it hard to block by one IP address. Some attacks flood bandwidth; others target web application resources, DNS, or VPN login pages.',
        'Small businesses usually do not mitigate DDoS alone on an office firewall. Effective mitigation often happens upstream at the DNS provider, CDN, hosting provider, cloud platform, or ISP before traffic reaches the business connection.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A professional services firm may experience missed lead forms, unavailable client portals, slow remote access, or interrupted VoIP if the internet connection is saturated. Staff may describe it as the website being down or the VPN being unusable, even though internal computers are otherwise fine.',
        'The operational impact depends on what faces the internet. A static marketing site going down is annoying; a remote access gateway used by a hybrid office on payroll day is more serious. Planning should reflect business dependency, not generic fear.'
      ],
      bullets: [
        {
          title: 'Website or booking outage',
          description: 'Clients cannot reach forms, appointment pages, or public information.'
        },
        {
          title: 'Remote work interruption',
          description: 'VPN or hosted app access slows down or fails during peak traffic.'
        },
        {
          title: 'Support confusion',
          description: 'Without logs and provider contacts, teams waste time troubleshooting the wrong layer.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Sudden traffic spike',
        description: 'Hosting, CDN, firewall, or provider dashboards may show traffic far outside normal patterns.'
      },
      {
        title: 'Website or VPN slow for everyone',
        description: 'Broad slowness that affects many users at once is different from one user having a local issue.'
      },
      {
        title: 'Provider alerts',
        description: 'DNS, CDN, hosting, ISP, or cloud alerts may identify traffic floods or mitigation activity.'
      },
      {
        title: 'Firewall resource exhaustion',
        description: 'High connection counts, CPU, or memory on an edge device can indicate overload.'
      }
    ],
    reduceRisk: [
      {
        title: 'Use DNS and CDN protection for websites',
        description: 'A reputable DNS/CDN layer can absorb or filter traffic before it reaches the origin server.'
      },
      {
        title: 'Confirm hosting provider mitigation options',
        description: 'Know what your website host, cloud provider, or SaaS vendor will do during an attack and how to reach them.'
      },
      {
        title: 'Limit exposed services',
        description: 'Do not expose admin panels, test apps, or unused services that increase the number of targets.'
      },
      {
        title: 'Document ISP escalation',
        description: 'If office bandwidth is saturated, the ISP may need to filter upstream. Keep account details and support paths available.'
      },
      {
        title: 'Monitor availability',
        description: 'External uptime checks help distinguish internal office issues from public service outages.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Internet-facing service inventory',
        description: 'We identify public DNS records, exposed services, hosting dependencies, and single points of failure.'
      },
      {
        title: 'Provider readiness',
        description: 'We review CDN, DNS, host, firewall, and ISP support options so escalation is not improvised during an outage.'
      },
      {
        title: 'Firewall and VPN exposure',
        description: 'We check whether edge devices are logging traffic and whether unnecessary services are reachable.'
      },
      {
        title: 'Business continuity fit',
        description: 'We align mitigation with the services that actually matter to the office, such as booking, remote access, or client portals.'
      }
    ],
    relatedLinks: [
      {
        title: 'Microsoft 365 security checklist',
        path: '/guides/security/microsoft-365-security/microsoft-365-checklist'
      },
      {
        title: 'Microsoft 365 backup for small business',
        path: '/guides/security/microsoft-365-security/microsoft-365-backup-small-business'
      },
      { title: 'All small business cybersecurity guides', path: '/guides/security' }
    ]
  },
  {
    slug: 'port-scanning-risk',
    hubSlug: 'network-attacks',
    path: '/guides/security/network-attacks/port-scanning-risk',
    title: 'Port Scanning Risk',
    metaTitle: 'Port Scanning Risk for Small Business Networks | CtrlShift IT Services',
    metaDescription:
      'Learn how port scanning exposes small business attack surface, what logs to review, and how to close unnecessary public services.',
    icon: 'bi-radar',
    intro: [
      'Port scanning is how attackers and automated tools discover what a public IP address is willing to answer. It does not mean the business has been compromised by itself, but it often reveals the doorway an attacker will try next.',
      'For a small office, a scan may find an old port forward, exposed RDP, a VPN portal, a firewall admin page, a camera system, or a forgotten vendor test service. The useful response is not panic; it is maintaining a clean external exposure inventory and closing what no longer needs to be public.'
    ],
    facts: [
      { label: 'Primary target', value: 'Public IP addresses, exposed ports, remote access services' },
      { label: 'Typical entry point', value: 'Discovery of reachable internet-facing services' },
      { label: 'Key controls', value: 'External exposure review, firewall cleanup, logging, service ownership' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'A port is a network doorway for a service. Web servers, VPNs, remote desktop, mail services, and admin panels all listen on ports. Scanning checks which doors respond from the internet.',
        'Most public networks receive scanning noise constantly. The risk depends on what the scan finds and whether the exposed service is patched, protected, monitored, and truly needed.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'Small businesses often accumulate exceptions over time. A vendor asks for temporary access, a remote-work fix is added quickly, or a test server is published and then forgotten. Port scanning turns those leftovers into visible targets.',
        'For a law firm, accounting firm, or clinic, the business impact is usually indirect: scanning identifies the route that later becomes password attacks, exploitation attempts, or unauthorized access. Keeping public exposure small makes every other control easier.'
      ],
      bullets: [
        { title: 'Forgotten services', description: 'Old port forwards and test systems can remain reachable long after the business need ends.' },
        { title: 'Remote access discovery', description: 'RDP, VPN, and admin portals become easier to target when they are publicly visible.' },
        { title: 'Noisy logs', description: 'Scanning creates background noise that can hide more meaningful attempts unless reviewed well.' }
      ]
    },
    warningSigns: [
      { title: 'Inbound hits on unused ports', description: 'Firewall logs show repeated attempts against services the business does not intentionally publish.' },
      { title: 'Unknown exposed service', description: 'An external scan finds a system nobody can map to a current business owner.' },
      { title: 'Admin panels on public IPs', description: 'Firewall, NAS, camera, or app management pages should not be broadly reachable.' },
      { title: 'Repeated scan patterns before login attempts', description: 'Discovery activity often comes before focused attempts against VPN, RDP, or web apps.' }
    ],
    reduceRisk: [
      { title: 'Run regular external exposure reviews', description: 'Validate what your public IPs and DNS records expose from outside the office.' },
      { title: 'Close unnecessary ports', description: 'Remove stale firewall rules and port forwards that no longer support a current workflow.' },
      { title: 'Assign service ownership', description: 'Every public service should have a named owner, business purpose, and review date.' },
      { title: 'Restrict admin access', description: 'Management interfaces should be private, VPN-only, or protected by strong access controls.' },
      { title: 'Monitor scan-to-login patterns', description: 'Correlate scanning with later authentication failures or exploit alerts.' }
    ],
    ctrlShiftChecks: [
      { title: 'External service map', description: 'We map public IPs, DNS records, certificates, open ports, and reachable login pages.' },
      { title: 'Firewall rule ownership', description: 'We match inbound rules to current business owners and remove undocumented exposure.' },
      { title: 'Remote access validation', description: 'We confirm RDP, VPN, and admin interfaces are not exposed in unsafe ways.' },
      { title: 'Logging usefulness', description: 'We check whether firewall logs can distinguish routine noise from meaningful attempts.' }
    ],
    relatedLinks: [
      { title: 'Remote exploitation attacks', path: '/guides/security/network-attacks/remote-exploitation-attacks' },
      { title: 'Firewall misconfiguration risk', path: '/guides/security/network-attacks/firewall-misconfiguration-risk' },
      { title: 'Exposed RDP risk', path: '/guides/security/network-attacks/exposed-rdp-risk' },
      { title: 'VPN attack surface', path: '/guides/security/network-attacks/vpn-attack-surface-small-business' }
    ]
  },
  {
    slug: 'remote-exploitation-attacks',
    hubSlug: 'network-attacks',
    path: '/guides/security/network-attacks/remote-exploitation-attacks',
    title: 'Remote Exploitation Attacks',
    metaTitle: 'Remote Exploitation Attacks: Small Business Network Guide | CtrlShift IT Services',
    metaDescription:
      'Practical guide to exposed services, vulnerable VPNs, unpatched servers, and remote exploitation risk for small businesses.',
    icon: 'bi-broadcast-pin',
    intro: [
      'Remote exploitation happens when attackers abuse a software flaw or exposed service over the internet. They do not need to be inside the office first. If a VPN appliance, remote access portal, server, firewall, or web application has a known vulnerability and is reachable, it may become an entry point.',
      'For small businesses, the issue is often visibility. A port forward created years ago, an old VPN firmware version, or a forgotten test system can remain online long after the original need is gone. The practical goal is to know what is exposed, patch what must remain online, and close everything else.'
    ],
    facts: [
      { label: 'Primary target', value: 'VPNs, firewalls, servers, web apps, remote access portals' },
      { label: 'Typical entry point', value: 'Known vulnerability on an exposed system' },
      { label: 'Key controls', value: 'Patching, exposure review, MFA, monitoring, least privilege' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'A remote exploitation attack uses the network path to reach vulnerable software. Instead of tricking a user into opening a file, the attacker sends traffic to the exposed service and tries to trigger a weakness.',
        'This risk increases when systems are internet-facing, unpatched, unsupported, or poorly monitored. It also increases when admin interfaces are exposed publicly or when remote access lacks MFA.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A small office may have only one server, one firewall, and one remote access system. That simplicity is helpful, but it also means one exposed weakness can affect the whole business. Attackers may use remote exploitation to install remote tools, create accounts, dump credentials, or move toward file shares and backups.',
        'For clinics and professional firms, the result may be downtime, ransomware response, emergency vendor calls, and a difficult question: what did the attacker reach before anyone noticed? Good logs and patch discipline make that question easier to answer.'
      ],
      bullets: [
        {
          title: 'Fast entry',
          description: 'Public exploit code can make known vulnerabilities easy to abuse at scale.'
        },
        {
          title: 'Credential follow-on',
          description: 'Attackers often use the first system to capture credentials and move deeper.'
        },
        {
          title: 'Backup exposure',
          description: 'If backup consoles or storage are reachable from compromised systems, recovery options can be affected.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Unexpected admin logins',
        description: 'Look for new admin sessions, unknown accounts, or logins from unfamiliar source addresses.'
      },
      {
        title: 'Edge device alerts',
        description: 'Firewall, VPN, or EDR alerts about exploit attempts should be reviewed promptly.'
      },
      {
        title: 'New services or scheduled tasks',
        description: 'Persistence often appears as new tasks, services, users, or startup items.'
      },
      {
        title: 'Unusual outbound traffic',
        description: 'Compromised systems may contact remote command servers or transfer data.'
      }
    ],
    reduceRisk: [
      {
        title: 'Patch internet-facing systems first',
        description: 'VPNs, firewalls, remote access servers, web apps, and exposed Windows servers should be at the top of the patch queue.'
      },
      {
        title: 'Close unnecessary exposed ports',
        description: 'Every public service should have a current business owner and reason to exist.'
      },
      {
        title: 'Require MFA for remote access',
        description: 'MFA does not patch vulnerabilities, but it reduces password-based follow-on compromise.'
      },
      {
        title: 'Review vulnerability exposure',
        description: 'External scans and vendor advisories help identify systems that need urgent attention.'
      },
      {
        title: 'Collect useful logs',
        description: 'Firewall, VPN, server, and endpoint logs are essential for confirming whether an exploit attempt succeeded.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'External exposure scan',
        description: 'We identify public services, ports, certificates, and login panels visible from the internet.'
      },
      {
        title: 'Firmware and patch posture',
        description: 'We compare firewalls, VPN appliances, servers, and business apps against available security updates.'
      },
      {
        title: 'Remote access control review',
        description: 'We confirm MFA, user scope, admin restrictions, and logging for remote access paths.'
      },
      {
        title: 'Incident readiness',
        description: 'We verify backups, endpoint monitoring, and response steps in case exploitation is suspected.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS.slice(1)
  },
  {
    slug: 'man-in-the-middle-attacks-small-business',
    hubSlug: 'network-attacks',
    path: '/guides/security/network-attacks/man-in-the-middle-attacks-small-business',
    title: 'Man-in-the-Middle Attacks for Small Business',
    metaTitle: 'Man-in-the-Middle Attacks for Small Business Wi-Fi and Remote Work | CtrlShift IT Services',
    metaDescription:
      'Plain-English guide to man-in-the-middle risk for small businesses, including Wi-Fi, HTTPS, VPN, device trust, and user guidance.',
    icon: 'bi-signpost-split',
    intro: [
      'A man-in-the-middle attack means traffic passes through an untrusted point where it can be observed, redirected, or tampered with. For small businesses, the practical concern is usually unsafe Wi-Fi, rogue access points, unmanaged devices, or staff working from locations the business does not control.',
      'Modern HTTPS and cloud apps reduce a lot of old interception risk, but they do not remove every issue. Staff can still be led to fake portals, prompted by captive networks, exposed through unmanaged devices, or tricked into trusting the wrong network.'
    ],
    facts: [
      { label: 'Primary target', value: 'Wi-Fi users, browsers, remote workers, unmanaged devices' },
      { label: 'Typical entry point', value: 'Untrusted network path or fake access point' },
      { label: 'Key controls', value: 'Trusted Wi-Fi, HTTPS, VPN where needed, device management, user guidance' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'The “middle” is any network position between the user and the service they meant to reach. That could be a fake Wi-Fi network, an unsafe guest network, a compromised router, or a malicious hotspot portal.',
        'The goal for defenders is to make trusted paths easy and risky paths obvious. Managed devices, secure Wi-Fi, browser updates, certificate warnings, and clear staff guidance all help.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A consultant working from a cafe, a clinic employee using guest Wi-Fi, or a law clerk travelling between client sites may all connect through networks the business does not manage. If the device is unmanaged or users ignore browser warnings, credentials and sessions become harder to protect.',
        'The impact is often identity-related: fake login pages, session exposure, or staff trusting the wrong portal. That is why this topic connects closely to MFA, Conditional Access, compliant devices, and phishing protection.'
      ],
      bullets: [
        { title: 'Credential exposure', description: 'Users may be redirected to fake sign-in pages or unsafe portals.' },
        { title: 'Session risk', description: 'Untrusted paths increase concern around browser sessions and unmanaged devices.' },
        { title: 'Remote-work uncertainty', description: 'Without device controls, it is hard to know whether access came from a trusted environment.' }
      ]
    },
    warningSigns: [
      { title: 'Unexpected certificate warnings', description: 'Users should report browser security warnings instead of clicking through them.' },
      { title: 'Duplicate or lookalike Wi-Fi names', description: 'Networks with similar names near the office can confuse staff and guests.' },
      { title: 'Captive portals asking for work credentials', description: 'Public Wi-Fi portals should not request Microsoft 365 passwords.' },
      { title: 'Sign-ins from unmanaged devices', description: 'Microsoft 365 logs may show access from devices outside the business management baseline.' }
    ],
    reduceRisk: [
      { title: 'Use trusted office Wi-Fi designs', description: 'Separate staff, guest, and device networks with strong encryption and documented access.' },
      { title: 'Require managed devices for sensitive access', description: 'Conditional Access can limit high-risk apps to compliant or trusted devices.' },
      { title: 'Keep browsers and operating systems updated', description: 'Modern browser security helps users identify unsafe certificates and suspicious redirects.' },
      { title: 'Use VPN where it fits the workflow', description: 'A VPN can protect traffic on untrusted networks, especially for internal resources.' },
      { title: 'Train users on practical signals', description: 'Teach staff to stop on certificate warnings, fake portals, and unexpected login prompts.' }
    ],
    ctrlShiftChecks: [
      { title: 'Wi-Fi trust review', description: 'We check staff, guest, and device wireless networks for separation and encryption settings.' },
      { title: 'Conditional Access fit', description: 'We review whether sensitive apps should require managed or compliant devices.' },
      { title: 'Remote-work device posture', description: 'We validate browser updates, endpoint protection, and VPN needs for mobile staff.' },
      { title: 'User reporting path', description: 'We make sure staff know how to report suspicious Wi-Fi, portals, and browser warnings.' }
    ],
    relatedLinks: [
      { title: 'Rogue Wi-Fi risk', path: '/guides/security/network-attacks/rogue-wifi-risk' },
      { title: 'Token theft attacks', path: '/guides/security/identity-attacks/token-theft-attacks' },
      { title: 'Conditional Access policies for small business', path: '/guides/security/microsoft-365-security/conditional-access-small-business' },
      { title: 'VPN attack surface', path: '/guides/security/network-attacks/vpn-attack-surface-small-business' }
    ]
  },
  {
    slug: 'rogue-wifi-risk',
    hubSlug: 'network-attacks',
    path: '/guides/security/network-attacks/rogue-wifi-risk',
    title: 'Rogue Wi-Fi Risk',
    metaTitle: 'Rogue Wi-Fi Risk for Small Business Offices and Clinics | CtrlShift IT Services',
    metaDescription:
      'Learn how fake or unmanaged Wi-Fi creates small business risk and how to manage staff, guest, and device wireless networks.',
    icon: 'bi-wifi-off',
    intro: [
      'Rogue Wi-Fi means a wireless network exists outside the design the business intended. It may be a fake network using a familiar name, an unmanaged access point plugged in by staff, a vendor device broadcasting its own network, or guest Wi-Fi that can reach business systems.',
      'For professional offices, Wi-Fi feels ordinary, so it is easy to overlook. But wireless is often the first network staff, visitors, phones, printers, payment devices, and personal laptops touch. It deserves the same ownership and review as firewall rules.'
    ],
    facts: [
      { label: 'Primary target', value: 'Staff Wi-Fi, guest Wi-Fi, unmanaged access points, office devices' },
      { label: 'Typical entry point', value: 'Fake network name or unauthorized access point' },
      { label: 'Key controls', value: 'Wi-Fi inventory, WPA2/3, guest separation, monitoring, staff guidance' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'A rogue network breaks the trust model. Staff may believe they are joining the office network when they are not, or an unmanaged access point may bridge traffic around the firewall and segmentation.',
        'Not every unknown network is hostile. Some are neighbouring businesses or vendor equipment. The point is to know which wireless networks belong to the business and what each one can reach.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A clinic may have staff Wi-Fi, guest Wi-Fi, tablets, printers, medical devices, and vendor equipment in the same physical space. If those networks are not separated, a guest or unmanaged device may reach systems it should never see.',
        'A law office or accounting firm may also have visitors, contractors, and personal devices in the building. Clean wireless design protects staff productivity while reducing unnecessary trust.'
      ],
      bullets: [
        { title: 'Wrong network trust', description: 'Staff may connect to a lookalike network and expose browsing or sign-in activity.' },
        { title: 'Segmentation bypass', description: 'An unauthorized access point can bridge around the intended network design.' },
        { title: 'Guest access creep', description: 'Guest Wi-Fi that reaches printers, servers, or admin pages creates avoidable risk.' }
      ]
    },
    warningSigns: [
      { title: 'Unknown SSIDs near the office', description: 'New or lookalike network names should be investigated and documented.' },
      { title: 'Consumer routers plugged into office ports', description: 'Small routers or extenders can create unmanaged paths.' },
      { title: 'Guest devices reaching internal systems', description: 'Guest Wi-Fi should not browse file shares, printers, or management interfaces.' },
      { title: 'Shared Wi-Fi passwords that never change', description: 'Long-lived shared secrets spread beyond current staff and vendors.' }
    ],
    reduceRisk: [
      { title: 'Inventory wireless networks', description: 'Document authorized SSIDs, access points, ownership, and intended users.' },
      { title: 'Separate staff, guest, and device traffic', description: 'Use VLANs or equivalent segmentation so each network reaches only what it needs.' },
      { title: 'Use strong encryption', description: 'Use WPA2 or WPA3 with good password handling or enterprise authentication where appropriate.' },
      { title: 'Review physical network ports', description: 'Prevent unmanaged routers from being plugged in unnoticed.' },
      { title: 'Give staff clear connection names', description: 'Make the trusted network obvious and provide a reporting path for lookalikes.' }
    ],
    ctrlShiftChecks: [
      { title: 'SSID and access point inventory', description: 'We identify authorized and unknown wireless networks around the office.' },
      { title: 'Guest separation validation', description: 'We confirm guest devices cannot reach business systems unnecessarily.' },
      { title: 'Wireless password and access review', description: 'We check password handling, staff turnover impact, and vendor access.' },
      { title: 'Network port and device review', description: 'We look for unmanaged routers, extenders, and devices bypassing intended controls.' }
    ],
    relatedLinks: [
      { title: 'Man-in-the-middle attacks', path: '/guides/security/network-attacks/man-in-the-middle-attacks-small-business' },
      { title: 'Firewall misconfiguration risk', path: '/guides/security/network-attacks/firewall-misconfiguration-risk' },
      { title: 'Lateral movement risk', path: '/guides/security/network-attacks/lateral-movement-risk' },
      { title: 'Endpoint security for small business', path: '/guides/security/endpoint-security' }
    ]
  },
  {
    slug: 'exposed-rdp-risk',
    hubSlug: 'network-attacks',
    path: '/guides/security/network-attacks/exposed-rdp-risk',
    title: 'Exposed RDP Risk',
    metaTitle: 'Exposed RDP Risk for Small Business Remote Access | CtrlShift IT Services',
    metaDescription:
      'Why internet-facing Remote Desktop is risky for small businesses and safer alternatives using MFA, gateways, VPN, or zero-trust access.',
    icon: 'bi-display',
    intro: [
      'Remote Desktop Protocol, or RDP, is useful for administering Windows systems and accessing desktops. The problem is direct internet exposure. When RDP is reachable from anywhere, attackers can repeatedly try passwords, test stolen credentials, and look for vulnerabilities.',
      'Many small businesses exposed RDP during a busy remote-work transition and never revisited it. For a professional office, direct RDP exposure can turn one weak password or unpatched server into a full business disruption. Safer remote access patterns exist and are usually achievable without making staff work harder.'
    ],
    facts: [
      { label: 'Primary target', value: 'Windows desktops and servers with public RDP' },
      { label: 'Typical entry point', value: 'Brute force, credential stuffing, exploitation' },
      { label: 'Key controls', value: 'Disable direct exposure, VPN or gateway with MFA, monitoring' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'Exposed RDP means TCP port 3389, or a changed public port forwarding to RDP, is reachable from the internet. Changing the port can reduce noise, but it does not make the service private.',
        'Attackers scan the internet continuously for remote access services. Once found, they may try credential stuffing, password spraying, brute force, or exploitation against old systems. If they get in, they have an interactive Windows session.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A small firm may expose RDP to a server that also holds file shares, accounting software, legal documents, or clinic admin tools. That creates a high-impact entry point because the attacker lands close to business data.',
        'The impact can include ransomware deployment, data access, disabled backups, new admin accounts, and staff lockout. Even if no data is taken, cleanup is time-consuming because every credential and remote access path must be reviewed.'
      ],
      bullets: [
        {
          title: 'Password attack surface',
          description: 'Public RDP invites repeated login attempts against real user accounts.'
        },
        {
          title: 'Interactive access',
          description: 'A successful attacker can operate the system much like a remote employee.'
        },
        {
          title: 'Ransomware path',
          description: 'RDP compromise has historically been a common path into file servers and backups.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'High failed logon counts',
        description: 'Windows security logs may show repeated failures, especially for administrator-like usernames.'
      },
      {
        title: 'Unknown successful RDP sessions',
        description: 'Logons outside business hours or from unfamiliar IP addresses need investigation.'
      },
      {
        title: 'New local users or admin group changes',
        description: 'Attackers may create persistence after gaining access.'
      },
      {
        title: 'Firewall port forwards to RDP',
        description: 'A rule forwarding public traffic to 3389 or another RDP port is the core exposure.'
      }
    ],
    reduceRisk: [
      {
        title: 'Remove direct internet exposure',
        description: 'Do not publish RDP directly to the internet. Close the port forward and confirm externally that it is no longer reachable.'
      },
      {
        title: 'Use VPN with MFA or a remote access gateway',
        description: 'Require users to authenticate through a controlled access layer before reaching internal desktops.'
      },
      {
        title: 'Consider zero-trust access options',
        description: 'For some offices, identity-aware access tools reduce the need for traditional inbound exposure.'
      },
      {
        title: 'Limit who can use RDP',
        description: 'Restrict RDP rights to necessary users and use separate admin accounts for administration.'
      },
      {
        title: 'Monitor Windows and firewall logs',
        description: 'Track failed logons, successful remote sessions, and source addresses.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Public RDP validation',
        description: 'We check external exposure, including nonstandard ports that forward to Remote Desktop.'
      },
      {
        title: 'Firewall and NAT rule review',
        description: 'We identify stale remote access rules and replace them with safer access patterns.'
      },
      {
        title: 'Remote access user audit',
        description: 'We review who can sign in remotely and whether MFA protects the access path.'
      },
      {
        title: 'Server hardening and logs',
        description: 'We check patching, local admin membership, lockout settings, and useful log retention.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS.slice(0, 4)
  },
  {
    slug: 'firewall-misconfiguration-risk',
    hubSlug: 'network-attacks',
    path: '/guides/security/network-attacks/firewall-misconfiguration-risk',
    title: 'Firewall Misconfiguration Risk',
    metaTitle: 'Firewall Misconfiguration Risk for Small Business Networks | CtrlShift IT Services',
    metaDescription:
      'Learn how overly broad firewall rules, stale port forwards, and exposed admin panels create small business security risk.',
    icon: 'bi-bricks',
    intro: [
      'A firewall is only as useful as the rules it enforces. Misconfiguration happens when rules are too broad, old exceptions remain in place, admin interfaces are exposed, logging is off, or nobody knows why a port forward exists.',
      'Small businesses often inherit firewall rules from previous vendors, emergency fixes, or one-time projects. The device may be capable, but the configuration no longer matches the business. A practical firewall review focuses on least privilege, visibility, and clean documentation.'
    ],
    facts: [
      { label: 'Primary target', value: 'Edge firewall rules and exposed services' },
      { label: 'Typical entry point', value: 'Overly broad allow rules or stale port forwards' },
      { label: 'Key controls', value: 'Rule review, least privilege, logging, change documentation' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'Firewall misconfiguration is not always dramatic. It may be an any-any rule added during troubleshooting, a port forward left open after a vendor project, or a management page reachable from the public internet.',
        'The risk is that the firewall stops representing business intent. Instead of allowing only required traffic, it permits traffic nobody has reviewed recently.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'In a small office, the firewall may protect workstations, printers, phones, servers, Wi-Fi, and remote access. A weak rule can expose internal systems or allow unnecessary movement between networks.',
        'For clinics, law firms, and accounting offices, firewall mistakes can also complicate incident response. If logging is disabled or rules are undocumented, it becomes harder to confirm what was reachable and when.'
      ],
      bullets: [
        {
          title: 'Unexpected public exposure',
          description: 'Internal services can become reachable from the internet through old port forwards.'
        },
        {
          title: 'Flat internal access',
          description: 'Guest Wi-Fi, office devices, servers, and phones may communicate more freely than intended.'
        },
        {
          title: 'Poor investigation data',
          description: 'Without logs, the firewall cannot help answer basic incident questions.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Any-any or overly broad allow rules',
        description: 'Rules that allow all traffic from broad networks should have a very clear, current reason.'
      },
      {
        title: 'Exposed admin panels',
        description: 'Firewall, NAS, camera, or application admin interfaces should not be publicly reachable.'
      },
      {
        title: 'Stale port forwards',
        description: 'Rules for former vendors, old servers, or abandoned projects should be removed.'
      },
      {
        title: 'No change notes',
        description: 'If nobody can explain a rule, it needs validation before it remains trusted.'
      }
    ],
    reduceRisk: [
      {
        title: 'Review rules against current business needs',
        description: 'Every inbound rule, port forward, and broad internal allow rule should have an owner and purpose.'
      },
      {
        title: 'Apply least privilege',
        description: 'Allow only the source, destination, port, and protocol required, not broad networks by default.'
      },
      {
        title: 'Restrict administrative access',
        description: 'Management interfaces should be limited to trusted networks or VPN access with strong authentication.'
      },
      {
        title: 'Enable useful logging',
        description: 'Log denied traffic, inbound hits, VPN activity, and security events in a way someone can review.'
      },
      {
        title: 'Document changes',
        description: 'Simple notes explaining who requested a change and why are invaluable during cleanup.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Inbound and outbound rule review',
        description: 'We identify broad rules, unused port forwards, and exceptions that no longer match business needs.'
      },
      {
        title: 'Admin exposure check',
        description: 'We verify that firewall and device management pages are not reachable from the public internet.'
      },
      {
        title: 'Network segmentation review',
        description: 'We check whether guest Wi-Fi, servers, printers, phones, and workstations are separated appropriately.'
      },
      {
        title: 'Logging and backup configuration',
        description: 'We confirm firewall logs are useful and that the configuration is backed up before major changes.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS.slice(1, 4)
  },
  {
    slug: 'vpn-attack-surface-small-business',
    hubSlug: 'network-attacks',
    path: '/guides/security/network-attacks/vpn-attack-surface-small-business',
    title: 'VPN Attack Surface',
    metaTitle: 'VPN Attack Surface for Small Business Remote Access | CtrlShift IT Services',
    metaDescription:
      'Practical small business guide to VPN appliance risk, firmware patching, MFA, logging, and account review.',
    icon: 'bi-router',
    intro: [
      'A VPN can be a good remote access tool, but it is also a public-facing doorway into the office network. That means the VPN appliance, user accounts, authentication settings, firmware, and logs all matter.',
      'Small businesses often treat VPN as set-and-forget infrastructure. The risk grows when firmware is old, MFA is missing, former employees still have accounts, or nobody reviews failed logins. Good VPN security is mostly operational discipline: patch, restrict, monitor, and clean up access.'
    ],
    facts: [
      { label: 'Primary target', value: 'VPN appliances and remote access accounts' },
      { label: 'Typical entry point', value: 'Old firmware, weak credentials, missing MFA' },
      { label: 'Key controls', value: 'MFA, patching, restricted access, logs, account review' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'VPN attack surface includes every part of the remote access setup an attacker can interact with: the login portal, supported protocols, firmware, user accounts, MFA integration, certificates, and firewall rules.',
        'Because VPNs are intentionally exposed to the internet, vulnerabilities and weak configuration are high-priority. Attackers routinely scan for VPN products and test known weaknesses.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A VPN account may give access to file shares, remote desktops, accounting applications, clinic systems, or management interfaces. If the VPN is compromised, the attacker may bypass many perimeter controls because they appear to be connected like a remote employee.',
        'Operationally, a VPN incident creates immediate questions: which accounts connected, what could they reach, were logs retained, and is the appliance patched? The more prepared the business is, the faster those answers become.'
      ],
      bullets: [
        {
          title: 'Credential replay',
          description: 'Stolen passwords from other breaches may work if MFA is not required.'
        },
        {
          title: 'Appliance vulnerability',
          description: 'Old firmware can expose known flaws even if user passwords are strong.'
        },
        {
          title: 'Overbroad network access',
          description: 'Once connected, users may reach more systems than their role requires.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Failed VPN logins across many accounts',
        description: 'Spray or stuffing attempts against VPN accounts should be investigated.'
      },
      {
        title: 'Logins from unexpected locations',
        description: 'VPN sessions from unfamiliar countries, hosting providers, or odd hours deserve review.'
      },
      {
        title: 'Old firmware or end-of-support hardware',
        description: 'Unsupported VPN appliances are difficult to secure and should be replaced or redesigned.'
      },
      {
        title: 'Former staff accounts still enabled',
        description: 'Remote access should be removed promptly during offboarding.'
      }
    ],
    reduceRisk: [
      {
        title: 'Require MFA for VPN access',
        description: 'VPN should not rely on username and password alone, especially for staff with access to sensitive systems.'
      },
      {
        title: 'Patch VPN firmware promptly',
        description: 'Treat VPN and firewall updates as security work, not optional maintenance.'
      },
      {
        title: 'Restrict who can connect',
        description: 'Only users with a current business need should have VPN access, and access should match their role.'
      },
      {
        title: 'Review logs',
        description: 'Track failed logins, successful sessions, source locations, and unusual duration or timing.'
      },
      {
        title: 'Reduce internal reach',
        description: 'Limit VPN users to required systems instead of granting broad network access by default.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'VPN firmware and support status',
        description: 'We check appliance versions, vendor advisories, licensing, and whether the platform is still supportable.'
      },
      {
        title: 'MFA and account review',
        description: 'We validate MFA enforcement and remove stale or unnecessary remote access accounts.'
      },
      {
        title: 'Access scope review',
        description: 'We confirm VPN users can reach only the systems they need.'
      },
      {
        title: 'Logging and alerting',
        description: 'We make sure VPN events are retained and reviewed rather than disappearing when needed most.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS.slice(0, 4)
  },
  {
    slug: 'dns-attack-risk-small-business',
    hubSlug: 'network-attacks',
    path: '/guides/security/network-attacks/dns-attack-risk-small-business',
    title: 'DNS Attack Risk',
    metaTitle: 'DNS Attack Risk for Small Business Domains and Email | CtrlShift IT Services',
    metaDescription:
      'Understand DNS attack risk for small businesses, including registrar takeover, record changes, email authentication, outages, and practical controls.',
    icon: 'bi-diagram-2',
    intro: [
      'DNS is the address book for your domain. It tells the internet where your website lives, how Microsoft 365 receives mail, which services are trusted, and which systems are allowed to send email for your business.',
      'For small businesses, DNS risk is easy to underestimate because it sits behind the scenes. If a registrar account is compromised, records are changed, or email authentication is misconfigured, clients may be sent to the wrong place, email may fail, or attackers may impersonate the business more convincingly.'
    ],
    facts: [
      { label: 'Primary target', value: 'Domain registrar, DNS zone, website and mail records' },
      { label: 'Typical entry point', value: 'Registrar compromise, weak change control, record misconfiguration' },
      { label: 'Key controls', value: 'Registrar MFA, DNS change control, SPF/DKIM/DMARC, monitoring' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'DNS records point your domain to websites, Microsoft 365, verification services, client portals, and email security settings. Attackers do not need to touch your office network if they can change where your domain points.',
        'The risk can be compromise or mistake. A stolen registrar login can redirect traffic. A rushed record change can break email. A weak DMARC policy can make spoofed email harder to reject.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A law firm, clinic, or accounting office depends on its domain for trust. Clients recognize the website and email address. If DNS is changed, users may see outages, warning pages, missing email, or convincing impersonation attempts.',
        'DNS incidents also create confusion because the computers may look healthy while public services fail. A clear record inventory and change process shorten the outage and reduce guessing.'
      ],
      bullets: [
        { title: 'Email disruption', description: 'MX, SPF, DKIM, or DMARC errors can break delivery or weaken anti-spoofing.' },
        { title: 'Website redirection', description: 'A changed A, CNAME, or nameserver record can send visitors to the wrong service.' },
        { title: 'Trust damage', description: 'Clients lose confidence when email bounces, warnings appear, or messages look spoofed.' }
      ]
    },
    diagram: {
      title: 'How DNS supports everyday work',
      intro: 'Think of DNS as the control panel that routes trust for your public business systems.',
      steps: [
        { title: 'Domain registrar', description: 'Controls ownership and nameservers for the domain.', icon: 'bi-person-badge' },
        { title: 'DNS zone', description: 'Stores records for websites, email, and verification.', icon: 'bi-diagram-2' },
        { title: 'Business services', description: 'Microsoft 365, website hosting, portals, and apps depend on those records.', icon: 'bi-cloud-check' },
        { title: 'Client trust', description: 'Clients reach the right site and mail systems when records stay clean.', icon: 'bi-shield-check' }
      ]
    },
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'DNS attacks usually start with access to the registrar or DNS provider, a compromised admin mailbox used for recovery, weak MFA, or a vendor making unreviewed changes. Sometimes the issue is not hostile; a record is simply edited without understanding what depends on it.',
        'Once DNS is changed, the impact appears outside the office: email routes incorrectly, a website points to the wrong host, or security records no longer prove that Microsoft 365 is authorized to send mail.'
      ],
      bullets: [
        { title: 'Registrar account access', description: 'A weak or shared registrar login can expose the whole domain.' },
        { title: 'Nameserver change', description: 'Changing nameservers can effectively move control of all DNS records.' },
        { title: 'Email authentication drift', description: 'SPF, DKIM, and DMARC records can become stale as vendors change.' }
      ]
    },
    attackerGoals: [
      { title: 'Redirect traffic', description: 'Send visitors or login attempts to infrastructure the attacker controls.' },
      { title: 'Break communication', description: 'Disrupt email, websites, portals, or verification systems.' },
      { title: 'Improve impersonation', description: 'Weak email authentication makes spoofed messages harder to block.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 25-person professional office changes website vendors. During the handoff, nameservers are changed without a record backup. The website works, but Microsoft 365 email starts failing because old MX, DKIM, and verification records were not copied.',
        'A clean DNS process would export the existing zone, identify required records, make the change during a planned window, validate website and mail flow, and keep registrar MFA enforced for the domain owner.'
      ]
    },
    warningSigns: [
      { title: 'Unexpected DNS record changes', description: 'New nameservers, MX records, A records, or TXT records should have an approved change note.' },
      { title: 'Email bounce or spoofing increase', description: 'Delivery failures or impersonation attempts may indicate mail records need review.' },
      { title: 'Registrar login from unfamiliar location', description: 'Domain-provider access should be protected and monitored like an admin account.' },
      { title: 'Website certificate or destination mismatch', description: 'Visitors seeing warnings or unfamiliar pages can indicate routing problems.' }
    ],
    signalsToCheck: [
      { title: 'Registrar security', description: 'Check MFA, recovery contacts, account ownership, domain lock, and recent login history.' },
      { title: 'DNS zone backup', description: 'Confirm current records are exported or documented before major changes.' },
      { title: 'Mail records', description: 'Review MX, SPF, DKIM, DMARC, autodiscover, and Microsoft 365 verification records.' },
      { title: 'Change history', description: 'Compare recent DNS edits against vendor work and approved requests.' }
    ],
    firstSteps: [
      { title: 'Secure the registrar account', description: 'Enforce MFA, remove shared access, and verify recovery email and phone settings.' },
      { title: 'Export the DNS zone', description: 'Keep a known-good copy before changing nameservers, mail records, or website records.' },
      { title: 'Validate mail and website routing', description: 'Test Microsoft 365 delivery, DKIM signing, website resolution, and certificate behavior.' },
      { title: 'Document ownership', description: 'Record who can approve DNS changes and which vendors depend on each record.' }
    ],
    reduceRisk: [
      { title: 'Use MFA on registrar and DNS provider accounts', description: 'Treat domain control like administrator access.' },
      { title: 'Enable domain lock where available', description: 'Registrar lock reduces accidental or unauthorized domain transfer risk.' },
      { title: 'Maintain SPF, DKIM, and DMARC', description: 'Email authentication should match current senders and be reviewed after vendor changes.' },
      { title: 'Restrict DNS change authority', description: 'Only trusted administrators should modify records, and changes should be logged.' },
      { title: 'Monitor critical records', description: 'Watch nameservers, MX, A, CNAME, and TXT records for unexpected changes.' }
    ],
    commonMistakes: [
      { title: 'Letting a vendor own the domain', description: 'The business should control the registrar account, even if a vendor manages DNS.' },
      { title: 'Changing nameservers without copying records', description: 'A website migration can accidentally break Microsoft 365 or other services.' },
      { title: 'Overstuffed SPF records', description: 'Too many or stale senders can break SPF evaluation and weaken email posture.' },
      { title: 'No record inventory', description: 'Without notes, every DNS change becomes a risky archaeology project.' }
    ],
    ctrlShiftChecks: [
      { title: 'Domain control review', description: 'We verify registrar ownership, MFA, domain lock, recovery details, and vendor access.' },
      { title: 'DNS record inventory', description: 'We document critical website, Microsoft 365, verification, and vendor records.' },
      { title: 'Email authentication review', description: 'We validate SPF, DKIM, DMARC alignment, and mail-flow records.' },
      { title: 'Change-control cleanup', description: 'We define who can request, approve, and validate DNS changes.' },
      { title: 'Monitoring readiness', description: 'We identify records that should trigger review when changed.' }
    ],
    faqs: [
      { q: 'Why does DNS matter for cybersecurity?', a: 'DNS controls where your domain sends web and email traffic. If it is changed or misconfigured, services can fail or users can be routed to the wrong place.' },
      { q: 'Who should own the domain registrar account?', a: 'The business should own it. Vendors can have delegated access, but the domain should not be trapped in a third-party account.' },
      { q: 'What DNS records affect Microsoft 365 email?', a: 'MX, SPF, DKIM, DMARC, autodiscover, and verification TXT records are the main records to review.' },
      { q: 'Should DNS changes be documented?', a: 'Yes. Record the reason, requester, approver, old value, new value, and validation results.' }
    ],
    relatedLinks: [
      { title: 'DDoS attacks for small business', path: '/guides/security/network-attacks/ddos-attacks-small-business' },
      { title: 'Firewall misconfiguration risk', path: '/guides/security/network-attacks/firewall-misconfiguration-risk' },
      MICROSOFT_365_RELATED_LINKS[4],
      MICROSOFT_365_RELATED_LINKS[2],
      { title: 'All small business cybersecurity guides', path: '/guides/security' }
    ]
  },
  {
    slug: 'lateral-movement-risk',
    hubSlug: 'network-attacks',
    path: '/guides/security/network-attacks/lateral-movement-risk',
    title: 'Lateral Movement Risk',
    metaTitle: 'Lateral Movement Risk for Small Business Networks | CtrlShift IT Services',
    metaDescription:
      'Learn how one compromised device can spread through a small business network, and how segmentation, least privilege, EDR, and admin separation reduce risk.',
    icon: 'bi-hdd-network',
    intro: [
      'Lateral movement is what happens after an attacker gets an initial foothold and starts looking for other systems to reach. One compromised laptop may scan file shares, test saved credentials, reach servers, or try to access backups.',
      'For small businesses, lateral movement risk is often caused by flat networks, broad file permissions, shared local admin passwords, and remote access that lands users near too many systems. The fix is not one product; it is reducing unnecessary reach.'
    ],
    facts: [
      { label: 'Primary target', value: 'File shares, servers, admin accounts, backups, peer devices' },
      { label: 'Typical entry point', value: 'Compromised endpoint, stolen credentials, overbroad access' },
      { label: 'Key controls', value: 'Segmentation, least privilege, EDR/MDR, admin separation' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'Initial access is the first door. Lateral movement is the hallway after that door. Attackers use the first compromised account or device to discover what else can be reached.',
        'The goal is to make that hallway short. A front-desk workstation should not automatically reach server admin tools, backup consoles, every file share, and every other workstation.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'In a flat office network, one infected laptop can become a business-wide incident. The attacker may access shared folders, accounting apps, server admin tools, printer address books, or backups using the same network path normal staff use.',
        'Segmentation and least privilege reduce blast radius. They do not stop every initial compromise, but they help keep one device problem from becoming a full-office outage.'
      ],
      bullets: [
        { title: 'Shared data exposure', description: 'Broad permissions let one account reach folders it does not need.' },
        { title: 'Ransomware spread', description: 'Attackers look for writable shares, servers, and backups before encrypting.' },
        { title: 'Credential reuse', description: 'Shared or reused admin credentials make movement easier.' }
      ]
    },
    diagram: {
      title: 'How one device becomes a wider incident',
      intro: 'The risk grows when each step is reachable without enough separation or monitoring.',
      steps: [
        { title: 'Compromised laptop', description: 'Phishing, malware, or stolen credentials create the first foothold.', icon: 'bi-laptop' },
        { title: 'Discovery', description: 'The device probes shares, servers, printers, and admin tools.', icon: 'bi-radar' },
        { title: 'Credential use', description: 'Saved passwords or broad rights unlock more systems.', icon: 'bi-key' },
        { title: 'Impact', description: 'Files, backups, and business apps become part of the incident.', icon: 'bi-exclamation-triangle' }
      ]
    },
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Lateral movement starts after an initial compromise: a phishing attachment runs on a workstation, a VPN account is abused, RDP is exposed, or an unpatched system is exploited.',
        'The attacker then maps the network from that foothold. They look for file shares, server names, cached credentials, admin sessions, backup consoles, and systems with weak permissions.'
      ],
      bullets: [
        { title: 'Flat network', description: 'Workstations, servers, printers, and guest devices can see too much of each other.' },
        { title: 'Excess permissions', description: 'Users can access folders and systems beyond their role.' },
        { title: 'Shared admin rights', description: 'The same admin credential works across many devices.' }
      ]
    },
    attackerGoals: [
      { title: 'Find valuable data', description: 'Shared drives, matter folders, patient documents, tax files, and project data are common targets.' },
      { title: 'Reach backup systems', description: 'Attackers try to weaken recovery before causing visible damage.' },
      { title: 'Increase privileges', description: 'More access creates more options for persistence, theft, or ransomware.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 30-person office has staff laptops, a file server, printers, guest Wi-Fi, and a backup appliance all on a mostly flat network. One laptop is compromised through a fake invoice. The device starts scanning file shares and attempting connections to servers.',
        'A safer design separates guest Wi-Fi, limits workstation-to-workstation traffic, restricts server access by role, protects admin accounts, and uses EDR to alert when a device starts behaving like a scanner.'
      ]
    },
    warningSigns: [
      { title: 'One device connecting to many internal systems', description: 'A workstation suddenly touching many hosts or shares may be performing discovery.' },
      { title: 'Failed access attempts across shares', description: 'Repeated denied access can indicate probing.' },
      { title: 'Unexpected admin logons', description: 'Admin credentials used from a normal workstation should be reviewed.' },
      { title: 'Backup console access from user devices', description: 'Normal staff devices should not directly manage backup infrastructure.' }
    ],
    signalsToCheck: [
      { title: 'EDR network telemetry', description: 'Look for internal scanning, unusual SMB/RDP activity, and suspicious process chains.' },
      { title: 'File share logs', description: 'Review denied attempts, mass file access, and writes from unusual devices.' },
      { title: 'Admin group membership', description: 'Check local admins, domain admins, and privileged cloud roles.' },
      { title: 'Network segmentation rules', description: 'Confirm guest, workstation, server, printer, and backup networks have clear boundaries.' }
    ],
    firstSteps: [
      { title: 'Contain suspicious devices', description: 'Isolate endpoints showing scanning, credential theft, or ransomware-like behavior.' },
      { title: 'Review file and server access', description: 'Identify what the compromised account or device could reach.' },
      { title: 'Reset exposed credentials', description: 'Change passwords and revoke sessions for accounts used on the affected device.' },
      { title: 'Protect backups', description: 'Confirm backup repositories and consoles were not reachable or modified.' }
    ],
    reduceRisk: [
      { title: 'Segment the network', description: 'Separate guest Wi-Fi, servers, printers, workstations, phones, and backup systems where practical.' },
      { title: 'Apply least privilege', description: 'Give users access to the shares and apps they need, not every folder by default.' },
      { title: 'Separate admin accounts', description: 'Use dedicated admin accounts and avoid daily work from privileged sessions.' },
      { title: 'Use EDR or MDR', description: 'Behavior monitoring helps catch scanning, credential access, and ransomware preparation.' },
      { title: 'Harden remote access', description: 'VPN, RDP, and remote tools should use MFA, logging, and narrow access.' }
    ],
    commonMistakes: [
      { title: 'Assuming small networks do not need segmentation', description: 'A smaller office can still have high-value data and backups worth separating.' },
      { title: 'Everyone has access to every share', description: 'Convenience creates a larger blast radius during compromise.' },
      { title: 'Using admin accounts for daily work', description: 'Privileged sessions on everyday devices are attractive to attackers.' },
      { title: 'Backups reachable like normal files', description: 'Recovery systems need stronger separation than ordinary shares.' }
    ],
    ctrlShiftChecks: [
      { title: 'Segmentation review', description: 'We map which networks can reach workstations, servers, printers, guest Wi-Fi, and backups.' },
      { title: 'Permission and share audit', description: 'We review broad access, stale groups, and high-risk writable shares.' },
      { title: 'Admin separation check', description: 'We identify shared admin credentials, daily-use admin accounts, and privileged session risk.' },
      { title: 'EDR/MDR signal review', description: 'We confirm internal scanning and ransomware-like behavior would generate useful alerts.' },
      { title: 'Backup isolation validation', description: 'We check whether compromised endpoints could reach or delete backup data.' }
    ],
    faqs: [
      { q: 'What is lateral movement?', a: 'It is the process of moving from one compromised account or device to other systems inside the environment.' },
      { q: 'Does a small business need network segmentation?', a: 'Yes, at a practical level. Guest Wi-Fi, servers, backups, printers, and workstations should not all have equal trust.' },
      { q: 'What is the fastest way to reduce lateral movement risk?', a: 'Limit broad file access, remove direct public RDP, enforce MFA on remote access, separate admin accounts, and deploy monitored endpoint protection.' },
      { q: 'How do we know if lateral movement is happening?', a: 'Look for one device connecting to many systems, unusual share access, failed logons, admin sessions from unexpected devices, and EDR alerts for internal scanning.' }
    ],
    relatedLinks: [
      { title: 'Exposed RDP risk', path: '/guides/security/network-attacks/exposed-rdp-risk' },
      { title: 'VPN attack surface', path: '/guides/security/network-attacks/vpn-attack-surface-small-business' },
      { title: 'Firewall misconfiguration risk', path: '/guides/security/network-attacks/firewall-misconfiguration-risk' },
      { title: 'MDR vs EDR', path: '/guides/security/endpoint-security/mdr-vs-edr' },
      { title: 'Ransomware behavior on endpoints', path: '/guides/security/endpoint-security/ransomware-behavior-endpoints' },
      { title: 'All small business cybersecurity guides', path: '/guides/security' }
    ]
  },
  {
    slug: 'edr-vs-antivirus',
    hubSlug: 'endpoint-security',
    path: '/guides/security/endpoint-security/edr-vs-antivirus',
    title: 'EDR vs Antivirus',
    metaTitle: 'EDR vs Antivirus for Small Business Endpoint Security | CtrlShift IT Services',
    metaDescription:
      'Understand the difference between antivirus and EDR, and why small businesses need behaviour monitoring and investigation capability.',
    icon: 'bi-shield-plus',
    intro: [
      'Traditional antivirus and endpoint detection and response, or EDR, both protect devices, but they solve different parts of the problem. Antivirus focuses heavily on blocking known malicious files. EDR watches behaviour, records endpoint activity, and helps investigate suspicious actions.',
      'For a 5- to 50-person business, the difference matters because modern attacks often use legitimate tools, stolen credentials, scripts, and fileless techniques. The business does not need enterprise complexity, but it does need visibility when something unusual happens on a workstation or server.'
    ],
    facts: [
      { label: 'Primary target', value: 'Workstations, laptops, and servers' },
      { label: 'Typical risk', value: 'Unknown or behaviour-based threats missed by legacy antivirus' },
      { label: 'Key controls', value: 'EDR, endpoint monitoring, investigation, isolation' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'Antivirus is still useful. It blocks known malware, scans files, and provides a baseline layer of protection. The limitation is that attackers do not always deliver obvious malware files.',
        'EDR looks at behaviour such as suspicious PowerShell, unusual process chains, credential dumping attempts, ransomware-like file changes, and connections to risky infrastructure. It also gives responders a timeline of what happened instead of only saying a file was blocked.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A small office may not have an internal security team, which makes endpoint visibility even more important. If a bookkeeper laptop starts running suspicious scripts or a server begins mass-changing files, someone needs to see it quickly.',
        'Professional offices often hold client documents locally, sync files through OneDrive, and access cloud systems from laptops. Endpoint compromise can become identity compromise, file exposure, or ransomware. EDR helps connect those dots.'
      ],
      bullets: [
        {
          title: 'Better investigation',
          description: 'EDR can show process history, user context, file activity, and network connections.'
        },
        {
          title: 'Behaviour detection',
          description: 'Suspicious activity can be flagged even when no known malware signature exists.'
        },
        {
          title: 'Response options',
          description: 'Many EDR tools support isolation, file quarantine, and remote investigation actions.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Security tool only reports file blocks',
        description: 'If the product cannot explain behaviour, investigation will be limited during an incident.'
      },
      {
        title: 'No central device visibility',
        description: 'Unmanaged laptops and servers create blind spots.'
      },
      {
        title: 'Repeated suspicious script activity',
        description: 'PowerShell, command-line tools, and unusual process chains may indicate attacker activity.'
      },
      {
        title: 'No way to isolate a device',
        description: 'If a device is suspected compromised, the team should be able to contain it quickly.'
      }
    ],
    reduceRisk: [
      {
        title: 'Use EDR on workstations and servers',
        description: 'Prioritize devices used by owners, finance, administrators, and staff with client-data access.'
      },
      {
        title: 'Keep antivirus protection enabled',
        description: 'EDR complements baseline antivirus controls; it does not mean basic protection should be disabled.'
      },
      {
        title: 'Integrate endpoint and identity monitoring',
        description: 'Endpoint alerts should be reviewed alongside Microsoft 365 sign-in events and mailbox activity.'
      },
      {
        title: 'Define response actions',
        description: 'Know who can isolate a device, collect details, contact the user, and decide whether credentials need reset.'
      },
      {
        title: 'Patch endpoints consistently',
        description: 'EDR reduces detection gaps, but patching removes known vulnerabilities attackers use.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Endpoint coverage report',
        description: 'We identify unmanaged devices, stale agents, disabled protection, and missing server coverage.'
      },
      {
        title: 'Alert quality review',
        description: 'We check whether alerts provide enough context for a real investigation.'
      },
      {
        title: 'Isolation capability',
        description: 'We verify whether suspicious devices can be isolated without losing investigation access.'
      },
      {
        title: 'Operational fit',
        description: 'We align tooling with the business size so protection is monitored and maintainable.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS
  },
  {
    slug: 'mdr-vs-edr',
    hubSlug: 'endpoint-security',
    path: '/guides/security/endpoint-security/mdr-vs-edr',
    title: 'MDR vs EDR',
    metaTitle: 'MDR vs EDR for Small Businesses Without Security Teams | CtrlShift IT Services',
    metaDescription:
      'Learn how MDR adds human monitoring, triage, investigation, and response on top of EDR technology for small businesses.',
    icon: 'bi-person-workspace',
    intro: [
      'EDR is the technology that collects endpoint telemetry and detects suspicious behaviour. MDR, or managed detection and response, adds people and process: monitoring alerts, triaging severity, investigating activity, and helping respond.',
      'For small businesses without an internal security team, MDR can be the difference between having alerts and having an operational response. A good tool still needs someone to decide what matters at 7:00 p.m. on a Friday.'
    ],
    facts: [
      { label: 'Primary target', value: 'Endpoint alerts and incident response workflow' },
      { label: 'Typical risk', value: 'Alerts exist but nobody owns triage' },
      { label: 'Key controls', value: 'MDR monitoring, response playbooks, escalation paths' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'EDR answers: what happened on the endpoint? MDR adds: who is looking, how urgent is it, what should we do next, and who needs to be contacted?',
        'MDR providers or MSP security teams review alerts, suppress noise, escalate real issues, and may take containment actions such as isolating a device. The value is not magic detection; it is operational follow-through.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A small office may have capable endpoint tools but no one with time to investigate every alert. Owners, office managers, and clinic administrators cannot be expected to interpret process trees during a busy workday.',
        'MDR helps close that gap. It gives the business a clearer path from detection to decision: is this false positive, malware, credential theft, ransomware behaviour, or a device that needs isolation?'
      ],
      bullets: [
        {
          title: 'Human triage',
          description: 'Alerts are reviewed for context and urgency rather than left in a dashboard.'
        },
        {
          title: 'Faster containment',
          description: 'A suspicious workstation can be isolated while business impact is assessed.'
        },
        {
          title: 'Clear escalation',
          description: 'The right internal contact is notified with a plain-English explanation and recommended action.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Endpoint alerts are rarely reviewed',
        description: 'A dashboard nobody checks is not a response capability.'
      },
      {
        title: 'No after-hours escalation',
        description: 'Ransomware and credential theft do not respect office hours.'
      },
      {
        title: 'Unclear authority to isolate devices',
        description: 'If nobody knows who can take action, response slows down.'
      },
      {
        title: 'Repeated false positives without tuning',
        description: 'Alert fatigue causes real issues to be missed.'
      }
    ],
    reduceRisk: [
      {
        title: 'Decide who owns alert triage',
        description: 'Whether internal, MSP, or MDR provider, someone must be accountable for reviewing endpoint alerts.'
      },
      {
        title: 'Define response thresholds',
        description: 'Document when to isolate a device, reset credentials, call leadership, or pause user activity.'
      },
      {
        title: 'Connect MDR with Microsoft 365 context',
        description: 'Endpoint events should be correlated with sign-in logs, mailbox changes, and Conditional Access events.'
      },
      {
        title: 'Keep device inventory accurate',
        description: 'MDR is weaker when devices are missing agents or assigned to the wrong user.'
      },
      {
        title: 'Practice communication',
        description: 'Small businesses need simple escalation language that staff understand during a real event.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Monitoring ownership',
        description: 'We confirm who receives alerts, who triages them, and how urgent events are escalated.'
      },
      {
        title: 'EDR coverage and health',
        description: 'We check whether all endpoints report correctly and whether agent health is monitored.'
      },
      {
        title: 'Response playbook review',
        description: 'We define practical actions for malware, ransomware behaviour, suspicious logins, and device theft.'
      },
      {
        title: 'Business impact coordination',
        description: 'We make sure containment actions are fast but coordinated with the realities of the office.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS
  },
  {
    slug: 'endpoint-isolation-explained',
    hubSlug: 'endpoint-security',
    path: '/guides/security/endpoint-security/endpoint-isolation-explained',
    title: 'Endpoint Isolation Explained',
    metaTitle: 'Endpoint Isolation Explained for Small Business Security | CtrlShift IT Services',
    metaDescription:
      'Understand how endpoint isolation contains suspicious devices while preserving investigation access for small business incident response.',
    icon: 'bi-pc-display-horizontal',
    intro: [
      'Endpoint isolation is a containment action used when a workstation or server appears suspicious. The security tool cuts off most network communication so the device cannot easily spread malware, access file shares, or communicate with other internal systems.',
      'For small businesses, isolation is valuable because it buys time. Instead of immediately powering off a device and losing context, the team can limit spread while keeping enough access for investigation and cleanup.'
    ],
    facts: [
      { label: 'Primary target', value: 'Suspicious laptops, desktops, and servers' },
      { label: 'Typical trigger', value: 'Ransomware behaviour, suspicious process, credential theft signs' },
      { label: 'Key controls', value: 'EDR/MDR, response authority, backup readiness' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'Isolation is not the same as deleting files or wiping a device. It is a network control. The endpoint remains powered on, but communication is restricted, often allowing only the security management channel to remain available.',
        'This is useful during uncertain moments. If a laptop is running suspicious scripts or showing ransomware-like file activity, isolating it can stop further access to shared folders while preserving evidence.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'Isolation can interrupt one employee, but it may protect the whole office. A receptionist workstation in a clinic or a bookkeeper laptop in an accounting firm may have access to shared drives, cloud sync folders, and line-of-business apps. If it is compromised, speed matters.',
        'The business impact is a tradeoff: short disruption for one device versus possible spread to many devices. Clear communication helps staff understand that isolation is a protective step, not a punishment.'
      ],
      bullets: [
        {
          title: 'Limits spread',
          description: 'The device cannot freely reach file shares, peers, or internal services.'
        },
        {
          title: 'Preserves investigation',
          description: 'Security teams can often still collect telemetry and review what happened.'
        },
        {
          title: 'Supports measured response',
          description: 'Isolation gives the business time to decide whether rebuild, cleanup, or credential resets are needed.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Rapid file changes',
        description: 'Large numbers of renamed, encrypted, or modified files may indicate ransomware behaviour.'
      },
      {
        title: 'Suspicious process chains',
        description: 'Office apps launching scripts or command-line tools can indicate malicious activity.'
      },
      {
        title: 'Credential access alerts',
        description: 'Tools touching password stores, LSASS, browser sessions, or token material should be treated seriously.'
      },
      {
        title: 'Network scanning',
        description: 'A workstation probing many internal systems may be looking for reachable targets.'
      }
    ],
    reduceRisk: [
      {
        title: 'Deploy EDR with isolation capability',
        description: 'Confirm that the tool can isolate endpoints and that administrators know how to use it.'
      },
      {
        title: 'Decide who can approve isolation',
        description: 'For high-confidence threats, response should not wait for a long approval chain.'
      },
      {
        title: 'Protect backups separately',
        description: 'Isolation helps containment, but clean backups remain essential for recovery.'
      },
      {
        title: 'Pair isolation with credential review',
        description: 'If the device may have exposed credentials, reset affected passwords and revoke sessions.'
      },
      {
        title: 'Document return-to-service steps',
        description: 'Know when a device can be released, rebuilt, or replaced.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Isolation readiness test',
        description: 'We confirm the endpoint tool can isolate and release a test device without breaking management access.'
      },
      {
        title: 'Authority and escalation path',
        description: 'We define who can isolate devices and who receives business-impact notifications.'
      },
      {
        title: 'Telemetry review',
        description: 'We check whether the tool captures process, file, user, and network details needed for investigation.'
      },
      {
        title: 'Recovery coordination',
        description: 'We connect isolation steps with backup, rebuild, and credential reset procedures.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS
  },
  {
    slug: 'patch-management-basics',
    hubSlug: 'endpoint-security',
    path: '/guides/security/endpoint-security/patch-management-basics',
    title: 'Patch Management Basics',
    metaTitle: 'Patch Management Basics for Small Business Security | CtrlShift IT Services',
    metaDescription:
      'Small business guide to patching operating systems, browsers, VPN firmware, firewall firmware, and business applications.',
    icon: 'bi-tools',
    intro: [
      'Patch management is the routine process of applying security and stability updates to operating systems, browsers, business applications, servers, firewalls, VPN appliances, and other devices. It is not glamorous, but it closes known vulnerabilities attackers already understand.',
      'For small businesses, patching should be predictable rather than chaotic. The goal is a cadence that keeps risk down while respecting work hours, testing needs, and line-of-business applications that cannot break during payroll, tax season, clinic hours, or legal deadlines.'
    ],
    facts: [
      { label: 'Primary target', value: 'OS, browsers, apps, servers, VPNs, firewalls' },
      { label: 'Typical risk', value: 'Known vulnerabilities remain exploitable' },
      { label: 'Key controls', value: 'Patch cadence, testing, reporting, firmware updates' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'A patch fixes a known issue. Some patches improve reliability; others close security vulnerabilities. Attackers pay attention to public security updates because they reveal what weaknesses exist in unpatched systems.',
        'Patch management means more than clicking update randomly. It includes knowing what you own, prioritizing internet-facing systems, testing where needed, scheduling restarts, confirming completion, and following up on failures.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A 15-person accounting firm may have Windows laptops, a file server, browsers, PDF tools, tax software, a firewall, a VPN, and printers. If any of those remain old enough, they can become an entry point or operational problem.',
        'The business impact of poor patching is not only breach risk. It also includes surprise restarts, failed updates, incompatible software, unsupported systems, and emergency work when a critical vulnerability receives public attention.'
      ],
      bullets: [
        {
          title: 'Known vulnerabilities',
          description: 'Attackers often exploit weaknesses after fixes are available but before businesses apply them.'
        },
        {
          title: 'Operational disruption',
          description: 'Unplanned patching causes more disruption than a controlled maintenance cadence.'
        },
        {
          title: 'Unsupported software',
          description: 'Old operating systems and applications may stop receiving security updates entirely.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'No patch reporting',
        description: 'If nobody can show update status, the business is guessing.'
      },
      {
        title: 'Long uptime on workstations or servers',
        description: 'Devices that never restart may not complete important updates.'
      },
      {
        title: 'Old browsers or unsupported operating systems',
        description: 'Browsers, Office apps, and operating systems need regular updates because they face daily internet content.'
      },
      {
        title: 'Firewall or VPN firmware ignored',
        description: 'Edge devices are high-value patch targets because they face the internet.'
      }
    ],
    reduceRisk: [
      {
        title: 'Create a monthly patch cadence',
        description: 'Use a predictable schedule for normal updates, with faster handling for critical internet-facing vulnerabilities.'
      },
      {
        title: 'Prioritize exposed systems',
        description: 'Patch VPNs, firewalls, remote access systems, servers, browsers, and email clients promptly.'
      },
      {
        title: 'Test business-critical apps',
        description: 'For accounting, clinic, or legal software, test updates before broad rollout where practical.'
      },
      {
        title: 'Track completion',
        description: 'Reports should show which devices succeeded, failed, or have not checked in.'
      },
      {
        title: 'Plan for firmware updates',
        description: 'Firewalls, VPN appliances, NAS devices, and switches need maintenance windows and backups before upgrades.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'Patch coverage report',
        description: 'We identify missing OS, browser, application, server, and firmware updates.'
      },
      {
        title: 'Critical exposure prioritization',
        description: 'We separate routine patching from urgent updates affecting internet-facing systems.'
      },
      {
        title: 'Maintenance window planning',
        description: 'We schedule restarts and firmware changes around the business rather than during peak work.'
      },
      {
        title: 'Unsupported system review',
        description: 'We flag systems that no longer receive updates and need replacement, isolation, or compensating controls.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS
  },
  {
    slug: 'ransomware-behavior-endpoints',
    hubSlug: 'endpoint-security',
    path: '/guides/security/endpoint-security/ransomware-behavior-endpoints',
    title: 'Ransomware Behavior on Endpoints',
    metaTitle: 'Ransomware Behavior on Endpoints: Small Business Guide | CtrlShift IT Services',
    metaDescription:
      'Learn early endpoint warning signs of ransomware, including unusual file changes, suspicious processes, credential access, and network scanning.',
    icon: 'bi-bug',
    intro: [
      'Ransomware is often described by its final outcome: encrypted files and a demand for payment. On endpoints, there are usually earlier behaviours worth detecting before the worst damage is done. Those behaviours may include suspicious scripts, credential access, network scanning, disabling protections, and rapid file changes.',
      'For small businesses, early detection matters because one infected workstation can reach shared folders, synced files, or servers. The goal is layered protection: EDR or MDR, reliable backups, least privilege, patching, MFA, and staff who know when to report unusual behaviour.'
    ],
    facts: [
      { label: 'Primary target', value: 'Workstations, servers, file shares, synced folders' },
      { label: 'Typical entry point', value: 'Phishing, stolen credentials, exposed remote access, unpatched systems' },
      { label: 'Key controls', value: 'EDR/MDR, backups, least privilege, patching, MFA' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    whatItMeans: {
      id: 'what-it-means',
      title: 'What it means',
      icon: 'bi-lightbulb',
      paragraphs: [
        'Ransomware on an endpoint is software or attacker-driven activity that prepares for, starts, or supports file encryption and extortion. It may try to stop security tools, delete backups, discover network shares, steal credentials, or spread before encrypting files.',
        'Not every suspicious behaviour is ransomware, and not every ransomware incident looks identical. The practical approach is to detect combinations of behaviours that do not match normal office work.'
      ]
    },
    businessImpact: {
      id: 'business-impact',
      title: 'How it affects small businesses',
      icon: 'bi-building-exclamation',
      paragraphs: [
        'A small office may rely on a shared drive, cloud sync folder, practice management system, accounting database, or local server. If a compromised device can modify those files, the damage spreads quickly from one user to the whole team.',
        'The business impact includes downtime, recovery work, client communication, possible data review, and lost productivity. Clean, tested backups reduce panic, but prevention and early containment still matter because restoration takes time.'
      ],
      bullets: [
        {
          title: 'File share damage',
          description: 'A user with broad write permissions can unintentionally give ransomware broad reach.'
        },
        {
          title: 'Backup targeting',
          description: 'Attackers may try to delete or encrypt backups before revealing themselves.'
        },
        {
          title: 'Credential theft',
          description: 'Ransomware incidents often involve credential access before or during encryption.'
        }
      ]
    },
    warningSigns: [
      {
        title: 'Unusual file changes',
        description: 'Mass renaming, rapid modifications, new extensions, or unexpected encryption-like activity are urgent signals.'
      },
      {
        title: 'Suspicious processes and scripts',
        description: 'Command shells, PowerShell, or unknown tools launched from unusual locations should be reviewed.'
      },
      {
        title: 'Credential access behaviour',
        description: 'Attempts to access password stores, tokens, or system memory may indicate preparation for wider compromise.'
      },
      {
        title: 'Network scanning or share enumeration',
        description: 'A workstation touching many internal systems or shares can be looking for targets.'
      }
    ],
    reduceRisk: [
      {
        title: 'Use EDR or MDR',
        description: 'Endpoint behaviour monitoring is one of the strongest practical controls for early ransomware detection.'
      },
      {
        title: 'Maintain tested backups',
        description: 'Backups should include important cloud and local data, be protected from normal user access, and be restored in tests.'
      },
      {
        title: 'Apply least privilege',
        description: 'Users should not have broad admin rights or write access to every shared location unless truly required.'
      },
      {
        title: 'Patch endpoints and remote access',
        description: 'Close known vulnerabilities in operating systems, browsers, VPNs, firewalls, and business apps.'
      },
      {
        title: 'Require MFA and train users',
        description: 'MFA reduces credential abuse, while practical training helps staff report suspicious prompts, files, and emails quickly.'
      }
    ],
    ctrlShiftChecks: [
      {
        title: 'EDR/MDR coverage and alert review',
        description: 'We confirm endpoints are monitored and that ransomware-like behaviours generate actionable alerts.'
      },
      {
        title: 'Backup readiness',
        description: 'We review backup scope, retention, separation from normal accounts, and restore testing.'
      },
      {
        title: 'Permission and admin rights review',
        description: 'We identify users with excessive local admin rights or broad file share access.'
      },
      {
        title: 'Likely entry path review',
        description: 'We assess phishing exposure, remote access, patch gaps, and Microsoft 365 identity controls together.'
      }
    ],
    relatedLinks: MICROSOFT_365_RELATED_LINKS
  }
];

export const SECURITY_HUB_RICH_CONTENT: ReadonlyArray<SecurityHubRichContent> = [
  {
    slug: 'gta-small-business-cybersecurity-checklist',
    eyebrow: 'Local Business Security',
    title: 'Cybersecurity Checklist for GTA Small Businesses',
    subtitle: 'A practical 10-point security baseline for offices in Vaughan, Toronto, and Mississauga.',
    intro: [
      'Small businesses in the Greater Toronto Area are increasingly targets for automated ransomware and phishing campaigns. Unlike large enterprises, most SMBs lack a dedicated security team.',
      'This checklist provides a senior-engineer-vetted baseline for professional offices (law firms, clinics, accounting practices) to protect their data, reputation, and client trust.'
    ],
    meta: [
      { label: 'Target Audience', value: 'GTA Small Business Owners' },
      { label: 'Time to Review', value: '15 Minutes' },
      { label: 'Cost to Implement', value: 'Low to Medium' },
      { label: 'Last Updated', value: 'April 2026' }
    ],
    quickLinks: [
      { label: 'The 10-Point Checklist', fragment: 'checklist' },
      { label: 'Vaughan/Toronto Compliance', fragment: 'compliance' },
      { label: 'Next Steps', fragment: 'next-steps' }
    ],
    whoFor: [
      { title: 'Law Firms', description: 'Protecting client confidentiality and meeting Law Society of Ontario guidance.', icon: 'bi-bank' },
      { title: 'Medical Clinics', description: 'Ensuring PHIPA compliance and protecting sensitive patient records.', icon: 'bi-hospital' },
      { title: 'Accounting Firms', description: 'Securing financial data and meeting CRA record-keeping expectations.', icon: 'bi-calculator' }
    ],
    explanationTitle: 'Why GTA Businesses are Targeted',
    explanation: [
      'Cybercriminals often target businesses in prosperous hubs like Vaughan and Toronto because they assume these offices handle high-value transactions but have weaker IT defenses than major banks.',
      'A single breach can cost a GTA small business an average of $50,000 in recovery costs, lost billable hours, and reputational damage.'
    ],
    scenarioTitle: 'A Typical Local Attack Scenario',
    scenario: [
      'An office manager at a Vaughan engineering firm receives a "missed invoice" email. They click a link, enter their Microsoft 365 credentials on a fake login page, and within 2 hours, the attacker has set up email forwarding rules to intercept client payments.',
      'Without MFA or sign-in monitoring, this breach often goes unnoticed for weeks until a client reports a payment issue.'
    ],
    flowTitle: 'The 10-Point Security Baseline',
    flowSubtitle: 'Every GTA professional office should have these controls active.',
    flow: [
      { title: 'Enforce MFA', description: 'Multi-Factor Authentication on all email and remote access accounts.', icon: 'bi-shield-lock' },
      { title: 'EDR Monitoring', description: 'Replace basic antivirus with Endpoint Detection and Response (like Huntress).', icon: 'bi-cpu' },
      { title: 'Managed Backups', description: 'Encrypted daily backups with a tested 4-hour recovery target.', icon: 'bi-cloud-arrow-up' },
      { title: 'Email Hardening', description: 'DKIM, SPF, and DMARC records correctly configured to prevent spoofing.', icon: 'bi-envelope-check' },
      { title: 'Zero-Trust Access', description: 'Removing legacy VPNs in favor of secure access like Tailscale or Twingate.', icon: 'bi-lock' },
      { title: 'Automatic Patching', description: 'Windows and third-party apps updated automatically within 48 hours.', icon: 'bi-arrow-repeat' },
      { title: 'Device Encryption', description: 'BitLocker active on all company laptops to protect lost/stolen hardware.', icon: 'bi-laptop' },
      { title: 'Least Privilege', description: 'Staff should not have "Local Admin" rights on their workstations.', icon: 'bi-person-badge' },
      { title: 'Security Awareness', description: 'Short, monthly training for staff on identifying modern phishing.', icon: 'bi-people' },
      { title: 'Incident Plan', description: 'A documented list of who to call when a breach is suspected.', icon: 'bi-file-earmark-text' }
    ],
    tableTitle: 'Local Compliance Realities',
    tableIntro: 'How this checklist aligns with Ontario and Federal requirements.',
    tableRows: [
      { threat: 'PIPEDA / PHIPA', howItShowsUp: 'Data Privacy Laws', businessImpact: 'Fines & Liability', firstControl: 'Encryption & MFA' },
      { threat: 'Law Society (LSO)', howItShowsUp: 'Tech Competence Guidance', businessImpact: 'Professional Discipline', firstControl: 'Access Controls' },
      { threat: 'Cyber Insurance', howItShowsUp: 'Policy Renewals', businessImpact: 'Loss of Coverage', firstControl: 'EDR & Backups' }
    ],
    warningSigns: [
      { title: 'Slow Performance', description: 'Unexpected slowdowns can indicate background crypto-mining or data exfiltration.', icon: 'bi-speedometer' },
      { title: 'Unknown Logins', description: 'Sign-in alerts from locations like Russia, China, or even other Canadian cities.', icon: 'bi-geo-alt' }
    ],
    firstSteps: [
      { title: 'Audit Your MFA', description: 'Verify that every single user has MFA enabled — no exceptions.', icon: 'bi-check2-circle' },
      { title: 'Test a Restore', description: 'Dont assume backups work. Attempt to restore one folder today.', icon: 'bi-cloud-download' }
    ],
    mistakes: [
      { title: 'The Antivirus Myth', description: 'Traditional antivirus cannot stop modern ransomware. You need EDR.', icon: 'bi-x-circle' },
      { title: 'Ignoring Mobile', description: 'Staff accessing email on unsecured personal phones is a major risk.', icon: 'bi-phone' }
    ],
    controls: [
      { title: 'Huntress EDR', description: 'Our preferred tool for 24/7 human-backed threat hunting.', icon: 'bi-shield-shaded' },
      { title: 'Fortinet NGFW', description: 'Enterprise-grade firewall protection for the office perimeter.', icon: 'bi-router' }
    ],
    ctaTitle: 'Not sure where your office stands?',
    ctaCopy: 'Book a free 15-minute Security Risk Review. We will audit your top 3 risks and provide a clear remediation path.',
    faqs: [
      { q: 'Is this checklist enough for cyber insurance?', a: 'It covers the primary requirements (MFA, EDR, Backups), but every insurer has specific nuances we can help you navigate.' },
      { q: 'We are already in the cloud, do we need this?', a: 'Yes. Cloud providers secure the infrastructure, but you are responsible for securing your data and identities within it.' }
    ]
  },
  {
    slug: 'identity-attacks',
    eyebrow: 'Identity Security Guide',
    title: 'Identity Attacks: How Small Businesses Get Compromised',
    subtitle:
      'A plain-English guide to the account takeover paths that matter most in Microsoft 365 environments: phishing, MFA fatigue, password spraying, token theft, BEC, OAuth consent abuse, shared mailbox misuse, and admin compromise.',
    intro: [
      'For most small businesses, identity is now the new perimeter. Staff open email in Microsoft 365, store files in OneDrive and SharePoint, join Teams meetings from phones, and approve payments from wherever work happens. That flexibility is useful, but it also means a stolen password or hijacked session can become a business-wide incident quickly.',
      'Identity attacks are not only a technical problem. They affect payment approvals, client communication, legal files, patient scheduling, tax documents, and day-to-day trust inside a small office. The practical goal is to make account compromise harder, make suspicious activity visible, and make response steps clear before anyone is under pressure.'
    ],
    meta: [
      { label: 'Estimated reading time', value: '14 minutes' },
      { label: 'Primary systems', value: 'Microsoft 365, Entra ID, email, Teams, SharePoint, OneDrive, finance workflows' },
      { label: 'Who this guide is for', value: 'Owners, office managers, clinic administrators, law firms, accountants, consultants, and Microsoft 365 decision-makers at 5-50 employee businesses.' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    heroStats: [
      { value: '8', label: 'identity attack paths' },
      { value: '15m', label: 'response target' },
      { value: '4', label: 'control layers' }
    ],
    quickLinks: [
      { label: 'Who it is for', fragment: 'who-for' },
      { label: 'Plain English', fragment: 'plain-english' },
      { label: 'Scenario', fragment: 'scenario' },
      { label: 'Attack paths', fragment: 'attack-paths' },
      { label: 'Deep dives', fragment: 'guides' },
      { label: 'Warning signs', fragment: 'warning-signs' },
      { label: 'First steps', fragment: 'first-steps' },
      { label: 'Response runbook', fragment: 'response-runbook' },
      { label: 'Licensing path', fragment: 'licensing-path' },
      { label: 'FAQ', fragment: 'faq' }
    ],
    whoFor: [
      {
        title: 'Microsoft 365 offices',
        description: 'Businesses using Exchange Online, Teams, OneDrive, SharePoint, and cloud sign-ins as the center of daily work.',
        icon: 'bi-microsoft'
      },
      {
        title: 'Professional service firms',
        description: 'Law, accounting, consulting, engineering, and advisory firms where email threads often drive approvals and client work.',
        icon: 'bi-briefcase'
      },
      {
        title: 'Clinics and regulated offices',
        description: 'Teams with sensitive scheduling, intake, and client or patient communication that cannot afford messy account recovery.',
        icon: 'bi-clipboard2-pulse'
      }
    ],
    explanationTitle: 'What identity attacks mean in plain English',
    explanation: [
      'An identity attack targets the account, session, or permission that proves someone is allowed to access business systems. Instead of breaking into a server first, the attacker tries to sign in as a real person, trick them into approving access, steal their session, or abuse an app permission the user granted.',
      'That is why these attacks feel normal at first. The sign-in may be for a real user. The email may come from a real mailbox. The SharePoint access may use a real token. The defence has to look beyond “was the password correct?” and ask whether the behaviour makes sense for that user, device, location, and business process.'
    ],
    scenarioTitle: 'Real-world scenario: a small accounting firm during tax season',
    scenario: [
      'A bookkeeper receives a Microsoft 365 sign-in prompt after clicking what appears to be a shared document from a client. The password and MFA prompt are completed on a phishing proxy. The attacker captures the active session, searches the mailbox for invoice and payment terms, then creates an inbox rule that hides replies from the firm owner.',
      'Nothing looks like a Hollywood breach. Email still works. The bookkeeper can still sign in. Two days later, a vendor receives updated payment instructions from the compromised mailbox. This is why identity security needs MFA, Conditional Access, mailbox auditing, payment verification, and endpoint monitoring working together.'
    ],
    flowTitle: 'How identity compromise usually unfolds',
    flowSubtitle: 'Most incidents we see are a chain of ordinary-looking events, not one dramatic event.',
    flow: [
      { title: '1. Lure or credential attempt', description: 'Phishing email, password spray, MFA prompt fatigue, stolen password, or malicious OAuth consent request.', icon: 'bi-envelope-exclamation-fill' },
      { title: '2. Session or mailbox access', description: 'The attacker signs in, steals a token, adds an app permission, or enters through a legacy protocol.', icon: 'bi-door-open-fill' },
      { title: '3. Discovery and persistence', description: 'Mailbox searches, forwarding rules, MFA method changes, app grants, or hidden inbox rules help maintain access.', icon: 'bi-search' },
      { title: '4. Business action', description: 'Invoice redirection, internal phishing, data download, password resets, or administrator takeover attempts follow.', icon: 'bi-cash-coin' }
    ],
    tableTitle: 'Identity attack paths small businesses should recognize',
    tableIntro:
      'These attacks overlap. A single incident may start with phishing, continue through token theft, and end as business email compromise.',
    tableRows: [
      { threat: 'Credential phishing', group: 'Initial access', icon: 'bi-envelope-exclamation', howItShowsUp: 'Fake Microsoft, DocuSign, courier, bank, or file-sharing login page.', businessImpact: 'Mailbox access, SharePoint data exposure, internal phishing.', firstControl: 'MFA, phishing-resistant training, Safe Links, sign-in review.' },
      { threat: 'MFA fatigue', group: 'Initial access', icon: 'bi-phone-vibrate', howItShowsUp: 'Repeated approval prompts until a user taps approve to make them stop.', businessImpact: 'Account access despite the password not being newly entered.', firstControl: 'Number matching, Conditional Access, user reporting process.' },
      { threat: 'Password spraying', group: 'Initial access', path: '/guides/security/identity-attacks/password-spray-attacks', icon: 'bi-shield-exclamation', howItShowsUp: 'Common passwords tried slowly across many staff accounts.', businessImpact: 'One weak password becomes email or cloud file access.', firstControl: 'MFA, smart lockout, legacy auth block, sign-in log monitoring.' },
      { threat: 'Session/token theft', group: 'Session abuse', path: '/guides/security/identity-attacks/token-theft-attacks', icon: 'bi-key', howItShowsUp: 'User appears already authenticated from an unusual browser or device.', businessImpact: 'MFA may not re-prompt during an active stolen session.', firstControl: 'Conditional Access, session controls, compliant devices, EDR.' },
      { threat: 'Business email compromise', group: 'Business impact', path: '/guides/security/identity-attacks/business-email-compromise', icon: 'bi-envelope-paper', howItShowsUp: 'Inbox rules, strange sent mail, invoice changes, hidden replies.', businessImpact: 'Payment fraud, client trust issues, urgent investigation work.', firstControl: 'Mailbox auditing, forwarding alerts, payment verification.' },
      { threat: 'OAuth consent abuse', group: 'Persistence', icon: 'bi-puzzle', howItShowsUp: 'A user grants a third-party app permission to read mail or files.', businessImpact: 'Persistent access without a normal interactive login.', firstControl: 'Admin consent workflow, app governance, permission reviews.' },
      { threat: 'Shared mailbox abuse', group: 'Operational blind spots', icon: 'bi-people', howItShowsUp: 'Too many users have access, or a shared workflow masks who acted.', businessImpact: 'Harder investigations and weak accountability.', firstControl: 'Delegate review, audit logs, no shared passwords.' },
      { threat: 'Legacy authentication', group: 'Protocol risk', path: '/guides/security/identity-attacks/legacy-authentication-risk', icon: 'bi-ban', howItShowsUp: 'Old mail protocols keep accepting basic authentication paths.', businessImpact: 'MFA and modern sign-in controls may not apply as expected.', firstControl: 'Block legacy auth and review sign-in logs.' },
      { threat: 'Admin takeover', group: 'Tenant control', icon: 'bi-person-lock', howItShowsUp: 'Admin account sign-in from odd location or new MFA method added.', businessImpact: 'Tenant-wide control, mailbox access, data and policy changes.', firstControl: 'Separate admin accounts, phishing-resistant MFA, alerts.' }
    ],
    warningSigns: [
      { title: 'Impossible travel or unfamiliar sign-ins', description: 'A user appears in Toronto and another country within minutes, or signs in from networks never used by the business.', icon: 'bi-geo-alt' },
      { title: 'New inbox rules or forwarding', description: 'Rules that hide replies, move messages, or forward mail externally are common in BEC cases.', icon: 'bi-inboxes' },
      { title: 'Unexpected MFA changes', description: 'New phone numbers, authenticator devices, or security info changes need immediate review.', icon: 'bi-phone-vibrate' },
      { title: 'Suspicious app consent', description: 'A user authorizes an app that requests broad mailbox, files, or offline access.', icon: 'bi-puzzle' },
      { title: 'Failed logins across many users', description: 'A tenant-wide pattern is more important than one account having a few failed attempts.', icon: 'bi-bar-chart' },
      { title: 'Payment or vendor changes by email only', description: 'Banking changes should be verified through a known out-of-band method, not the same email thread.', icon: 'bi-bank' }
    ],
    firstSteps: [
      { title: 'Enforce MFA everywhere', description: 'Start with admins, owners, finance, and high-risk users, then cover every human account.', icon: 'bi-shield-check' },
      { title: 'Turn on Conditional Access where licensed', description: 'Require stronger checks for risky sign-ins, unmanaged devices, admins, and external locations.', icon: 'bi-sliders' },
      { title: 'Disable legacy authentication', description: 'Remove POP, IMAP, and basic SMTP paths that can weaken MFA enforcement.', icon: 'bi-ban' },
      { title: 'Review mailbox rules and app permissions', description: 'Look for external forwarding, hidden rules, and broad OAuth grants.', icon: 'bi-list-check' },
      { title: 'Protect endpoints', description: 'Token theft and browser credential theft often start on a compromised device.', icon: 'bi-laptop' },
      { title: 'Document payment verification', description: 'Make staff comfortable pausing and verifying payment changes before money moves.', icon: 'bi-clipboard-check' }
    ],
    responseSteps: [
      { title: '1. Contain the account', description: 'Revoke sessions, reset the password, reset MFA methods, and temporarily block sign-in if ownership is uncertain.', icon: 'bi-person-fill-lock' },
      { title: '2. Preserve evidence', description: 'Export sign-in logs, mailbox audit records, inbox rules, forwarding settings, and suspicious messages before cleanup.', icon: 'bi-archive' },
      { title: '3. Hunt for persistence', description: 'Check OAuth app grants, new MFA devices, hidden mailbox rules, delegated access, external forwarding, and admin role changes.', icon: 'bi-search' },
      { title: '4. Protect money movement', description: 'Warn finance and client-facing staff, verify any payment changes out-of-band, and review recent invoice or banking requests.', icon: 'bi-bank' },
      { title: '5. Reset affected trust', description: 'Rotate exposed credentials, review device health, remove risky app consent, and notify impacted contacts when needed.', icon: 'bi-arrow-repeat' },
      { title: '6. Close the control gap', description: 'Document the entry path, tighten Conditional Access or mailbox controls, and add monitoring so the same path is visible next time.', icon: 'bi-clipboard2-check' }
    ],
    mistakes: [
      { title: 'Assuming MFA solves every identity risk', description: 'MFA is essential, but token theft, OAuth consent, and active sessions still need monitoring and policy controls.', icon: 'bi-shield-exclamation' },
      { title: 'Leaving shared passwords in use', description: 'Shared mailbox workflows should use delegation and auditing, not one password passed around the office.', icon: 'bi-people' },
      { title: 'Ignoring admin accounts', description: 'Global admins should not be daily email accounts. They need stronger MFA and tighter monitoring.', icon: 'bi-person-lock' },
      { title: 'Treating finance controls as “not IT”', description: 'BEC prevention requires both technical controls and a simple payment verification process.', icon: 'bi-cash-stack' }
    ],
    controls: [
      { title: 'Microsoft 365 identity baseline', description: 'MFA, Conditional Access, blocked legacy auth, admin separation, mailbox auditing, alert policies, and Secure Score review.', icon: 'bi-microsoft' },
      { title: 'Endpoint and browser protection', description: 'EDR or MDR, browser update management, credential theft detection, and device compliance for sensitive roles.', icon: 'bi-display' },
      { title: 'Email and mailbox controls', description: 'Anti-phishing policies, external forwarding restrictions, DKIM/DMARC, Safe Links, mailbox rule alerts, and user reporting.', icon: 'bi-envelope-check' },
      { title: 'Operational response', description: 'Know how to revoke sessions, reset MFA methods, preserve logs, review inbox rules, and communicate with affected staff.', icon: 'bi-diagram-3' }
    ],
    licenseTiers: [
      {
        title: 'Security Defaults / basics',
        fit: 'Useful for very small tenants that need MFA on quickly.',
        controls: ['Enable MFA baseline coverage', 'Block obvious legacy sign-in paths', 'Review admin accounts manually']
      },
      {
        title: 'Microsoft 365 Business Premium',
        fit: 'Best practical target for most 5-50 person professional offices.',
        controls: ['Conditional Access policies', 'Intune device compliance', 'Defender for Business and stronger identity controls']
      },
      {
        title: 'Higher-risk roles',
        fit: 'Owners, finance, admins, partners, and users handling sensitive client records.',
        controls: ['Phishing-resistant MFA where practical', 'Separate admin accounts', 'Tighter alerts and session review']
      }
    ],
    ctaTitle: 'Want a practical identity risk review?',
    ctaCopy:
      'CtrlShift IT can review your Microsoft 365 sign-in policies, MFA coverage, mailbox rules, admin accounts, endpoint protection, and identity logs so you know where the real gaps are.',
    faqs: [
      { q: 'Are identity attacks mostly a Microsoft 365 problem?', a: 'Microsoft 365 is a common target because email, files, Teams, and identity all meet there. The same principles apply to Google Workspace, accounting portals, CRM systems, and remote access tools.' },
      { q: 'Can MFA be bypassed?', a: 'MFA greatly reduces risk, but active session theft, phishing proxies, OAuth consent abuse, and compromised devices can still create access. That is why Conditional Access, endpoint protection, and logging matter.' },
      { q: 'What should we check first after a suspected mailbox compromise?', a: 'Revoke sessions, reset the password and MFA methods, review inbox and forwarding rules, check sign-in logs, inspect sent mail, and preserve audit logs before cleanup.' },
      { q: 'Do small businesses need separate admin accounts?', a: 'Yes. Admin accounts should be separate from daily email accounts, protected with strong MFA, and used only for administration.' }
    ]
  },
  {
    slug: 'network-attacks',
    eyebrow: 'Network Security Guide',
    title: 'Common Network Attacks Small Businesses Should Understand',
    subtitle:
      'A practical guide to the network risks that show up in real small-business environments: exposed remote access, VPN abuse, rogue Wi-Fi, DNS problems, firewall mistakes, scanning, exploitation, and lateral movement.',
    intro: [
      'Small business networks are no longer just a server, a switch, and a few desktops. Most offices now have cloud apps, remote workers, Wi-Fi, VoIP phones, printers, VPNs, firewall rules, and sometimes a local server or NAS. Attackers look for the weak connection between those pieces.',
      'A good network security posture is not about buying the biggest firewall. It is about knowing what is exposed, keeping remote access patched and monitored, separating risky traffic, and making sure logs can explain what happened if something looks wrong.'
    ],
    meta: [
      { label: 'Estimated reading time', value: '13 minutes' },
      { label: 'Primary systems', value: 'Firewalls, VPNs, Wi-Fi, DNS, switches, servers, remote access, ISP and hosting providers' },
      { label: 'Who this guide is for', value: 'Small offices with remote access, Wi-Fi, local servers, VPNs, cloud apps, phones, printers, and limited internal IT capacity.' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    quickLinks: [
      { label: 'Who it is for', fragment: 'who-for' },
      { label: 'Scenario', fragment: 'scenario' },
      { label: 'Attack paths', fragment: 'attack-paths' },
      { label: 'Red flags', fragment: 'warning-signs' },
      { label: 'First steps', fragment: 'first-steps' },
      { label: 'FAQ', fragment: 'faq' }
    ],
    whoFor: [
      { title: 'Hybrid and remote teams', description: 'Businesses using VPN, remote desktops, cloud apps, or remote access gateways for staff outside the office.', icon: 'bi-router' },
      { title: 'Offices with local infrastructure', description: 'Teams still relying on file servers, NAS devices, printers, phones, or line-of-business apps on the LAN.', icon: 'bi-hdd-network' },
      { title: 'Guest Wi-Fi environments', description: 'Clinics, showrooms, and offices where visitors, contractors, or personal devices connect to Wi-Fi.', icon: 'bi-wifi' }
    ],
    explanationTitle: 'What network attacks mean in plain English',
    explanation: [
      'A network attack targets how systems connect. That may mean flooding a service with traffic, finding exposed ports, exploiting a vulnerable VPN, tricking users onto unsafe Wi-Fi, abusing DNS, or moving from one internal system to another after the first compromise.',
      'For small businesses, the most important question is not “could any attack exist?” It is “what can someone reach from the internet, from guest Wi-Fi, from a compromised laptop, or through a VPN account?” Those paths define the practical risk.'
    ],
    scenarioTitle: 'Real-world scenario: exposed remote access at a law office',
    scenario: [
      'A law office opens Remote Desktop during an urgent work-from-home transition. The port is changed from 3389 to another number, but it still forwards directly to a server. Months later, automated scans find the service. Attackers try reused passwords, eventually get a session, and start looking for file shares and backups.',
      'The problem was not that remote work existed. The problem was direct exposure without MFA, no regular rule review, limited logging, and too much internal reach once connected. A safer design would use a VPN or gateway with MFA, patched appliances, limited access, and monitoring.'
    ],
    flowTitle: 'How network compromise commonly progresses',
    flowSubtitle: 'Network incidents usually move from discovery to access to expansion unless a control interrupts the path.',
    flow: [
      { title: '1. Discovery', description: 'Port scanning, DNS enumeration, leaked VPN portals, or public service discovery.', icon: 'bi-radar' },
      { title: '2. Initial access', description: 'Exposed RDP, vulnerable VPN, weak firewall rule, rogue Wi-Fi, or remote exploitation.', icon: 'bi-door-open' },
      { title: '3. Internal movement', description: 'The attacker maps shares, servers, printers, admin panels, and reachable subnets.', icon: 'bi-diagram-3' },
      { title: '4. Business impact', description: 'DDoS outage, data access, ransomware staging, DNS disruption, or service downtime.', icon: 'bi-exclamation-triangle' }
    ],
    tableTitle: 'Network attack paths to understand',
    tableIntro:
      'These are the network risks small businesses should recognize and review during routine IT maintenance.',
    tableRows: [
      { threat: 'DDoS', group: 'Availability pressure', path: '/guides/security/network-attacks/ddos-attacks-small-business', icon: 'bi-cloud-lightning', howItShowsUp: 'Website, VPN, or public service becomes slow or unavailable.', businessImpact: 'Client access, bookings, remote work, or public site availability suffers.', firstControl: 'CDN/DNS protection, hosting mitigation, ISP escalation plan.' },
      { threat: 'Port scanning', group: 'External discovery', path: '/guides/security/network-attacks/port-scanning-risk', icon: 'bi-radar', howItShowsUp: 'Repeated probes against public IPs and services.', businessImpact: 'Attackers find exposed RDP, VPN, admin panels, or old test systems.', firstControl: 'External exposure review and unnecessary port closure.' },
      { threat: 'Remote exploitation', group: 'External discovery', path: '/guides/security/network-attacks/remote-exploitation-attacks', icon: 'bi-broadcast-pin', howItShowsUp: 'Known vulnerability targeted on VPN, firewall, server, or web app.', businessImpact: 'Initial access without a user clicking anything.', firstControl: 'Patch internet-facing systems and monitor logs.' },
      { threat: 'Man-in-the-middle', group: 'Trust and interception', path: '/guides/security/network-attacks/man-in-the-middle-attacks-small-business', icon: 'bi-signpost-split', howItShowsUp: 'Unsafe Wi-Fi, rogue access points, or intercepted traffic paths.', businessImpact: 'Credential and session exposure, especially on unmanaged devices.', firstControl: 'Trusted Wi-Fi, HTTPS, VPN where needed, device management.' },
      { threat: 'Rogue Wi-Fi', group: 'Trust and interception', path: '/guides/security/network-attacks/rogue-wifi-risk', icon: 'bi-wifi-off', howItShowsUp: 'Fake network name or unmanaged access point appears near the office.', businessImpact: 'Staff may connect to an attacker-controlled or untrusted network.', firstControl: 'Wi-Fi inventory, WPA2/3, guest separation, staff guidance.' },
      { threat: 'VPN abuse', group: 'Remote access', path: '/guides/security/network-attacks/vpn-attack-surface-small-business', icon: 'bi-router', howItShowsUp: 'Old firmware, missing MFA, stale accounts, suspicious login locations.', businessImpact: 'Attackers connect like remote staff and reach internal systems.', firstControl: 'MFA, patching, account review, VPN logs.' },
      { threat: 'Exposed RDP', group: 'Remote access', path: '/guides/security/network-attacks/exposed-rdp-risk', icon: 'bi-display', howItShowsUp: 'Remote Desktop reachable from the internet.', businessImpact: 'Brute force, credential stuffing, ransomware path.', firstControl: 'Remove direct exposure; use VPN or gateway with MFA.' },
      { threat: 'DNS attacks', group: 'Infrastructure control plane', path: '/guides/security/network-attacks/dns-attack-risk-small-business', icon: 'bi-diagram-2', howItShowsUp: 'Domain records changed, DNS outage, or misdirected traffic.', businessImpact: 'Email, website, and app access can fail or route incorrectly.', firstControl: 'Registrar MFA, DNS change control, DKIM/SPF/DMARC review.' },
      { threat: 'Lateral movement', group: 'Internal spread', path: '/guides/security/network-attacks/lateral-movement-risk', icon: 'bi-hdd-network', howItShowsUp: 'Compromised device scans shares or reaches servers it should not.', businessImpact: 'One infected laptop becomes a wider incident.', firstControl: 'Segmentation, least privilege, EDR, admin separation.' }
    ],
    warningSigns: [
      { title: 'Unexpected open ports', description: 'External scans show services nobody currently owns or recognizes.', icon: 'bi-broadcast-pin' },
      { title: 'VPN logins from unusual places', description: 'Remote sessions from unfamiliar countries, hosting providers, or odd hours need review.', icon: 'bi-globe2' },
      { title: 'Firewall rules with no owner', description: 'Any-any rules and stale port forwards are signs the firewall has drifted from business intent.', icon: 'bi-bricks' },
      { title: 'Unknown Wi-Fi networks or access points', description: 'Rogue or unmanaged wireless can bypass the segmentation you thought existed.', icon: 'bi-wifi-off' },
      { title: 'Internal scanning from a workstation', description: 'A user device probing many internal systems can indicate compromise.', icon: 'bi-pc-display' },
      { title: 'Provider outage or DNS alerts', description: 'Hosting, CDN, ISP, or registrar notices should be tied into your incident process.', icon: 'bi-cloud-alert' }
    ],
    firstSteps: [
      { title: 'Run an external exposure review', description: 'Confirm what services are visible from the internet and close anything not required.', icon: 'bi-search' },
      { title: 'Remove direct RDP exposure', description: 'Remote Desktop should not be publicly reachable; use VPN, gateway, or identity-aware access with MFA.', icon: 'bi-display' },
      { title: 'Patch firewalls and VPN appliances', description: 'Edge devices face the internet and should not be treated as set-and-forget hardware.', icon: 'bi-arrow-repeat' },
      { title: 'Review firewall rules', description: 'Every inbound rule and broad internal allow rule should have an owner, purpose, and review date.', icon: 'bi-list-check' },
      { title: 'Segment guest and office traffic', description: 'Guest Wi-Fi, phones, printers, servers, and workstations should not all live in one flat trust zone.', icon: 'bi-diagram-2' },
      { title: 'Turn on useful logging', description: 'Firewall, VPN, DNS, and endpoint logs should answer who connected, from where, and what they reached.', icon: 'bi-journal-text' }
    ],
    mistakes: [
      { title: 'Changing a port and calling it secure', description: 'A nonstandard RDP or admin port can still be discovered by scans.', icon: 'bi-shuffle' },
      { title: 'Ignoring firmware', description: 'Firewall and VPN updates are security work, not cosmetic maintenance.', icon: 'bi-cpu' },
      { title: 'Flat networks everywhere', description: 'Guest devices, printers, servers, and staff laptops should not automatically trust each other.', icon: 'bi-hdd-rack' },
      { title: 'No ISP or hosting escalation plan', description: 'During DDoS or DNS trouble, knowing who to call saves precious time.', icon: 'bi-telephone' }
    ],
    controls: [
      { title: 'Firewall least privilege', description: 'Tight inbound rules, documented exceptions, restricted admin access, and regular rule cleanup.', icon: 'bi-shield-lock' },
      { title: 'Secure remote access', description: 'VPN or gateway with MFA, patched appliances, limited users, location review, and session logging.', icon: 'bi-router' },
      { title: 'Network segmentation', description: 'Separate guest Wi-Fi, servers, printers, IoT, phones, and staff endpoints based on business need.', icon: 'bi-diagram-3' },
      { title: 'Monitoring and recovery', description: 'Logs, external uptime checks, config backups, DNS registrar MFA, and a documented escalation path.', icon: 'bi-activity' }
    ],
    ctaTitle: 'Need a clean view of your network exposure?',
    ctaCopy:
      'CtrlShift IT can review your firewall rules, VPN posture, exposed services, Wi-Fi segmentation, DNS settings, and remote access design without turning it into a giant enterprise project.',
    faqs: [
      { q: 'Is a firewall enough for a small business network?', a: 'A firewall is important, but configuration matters more than the logo on the appliance. Rules, firmware, VPN settings, segmentation, logging, and review cadence determine the real posture.' },
      { q: 'Should RDP ever be exposed directly to the internet?', a: 'For small businesses, direct public RDP is not a good pattern. Use a VPN, remote access gateway, or identity-aware access with MFA and logging.' },
      { q: 'How often should firewall rules be reviewed?', a: 'At least quarterly, and whenever vendors, remote access, servers, or office layouts change. Stale exceptions are one of the most common issues.' },
      { q: 'What is the easiest network win for a small office?', a: 'Close unnecessary exposed ports, require MFA on remote access, patch the firewall or VPN, and separate guest Wi-Fi from business devices.' }
    ]
  },
  {
    slug: 'endpoint-security',
    eyebrow: 'Endpoint Security Guide',
    title: 'Endpoint Security for Small Business: Laptops, Servers, and Workstations',
    subtitle:
      'A practical guide to protecting the devices where work actually happens: employee laptops, office desktops, servers, browsers, local admin rights, patches, encryption, USB controls, EDR, MDR, and ransomware behaviour.',
    intro: [
      'Endpoints are the devices people use to run the business: laptops, desktops, servers, tablets, and sometimes shared clinic or front-desk workstations. They open email attachments, browse the web, sync files, store credentials, run business apps, and connect to Microsoft 365.',
      'Antivirus is still useful, but endpoint security now needs more than known-file blocking. Small businesses need patching, EDR or MDR, local admin control, disk encryption, browser security, backup readiness, and a way to isolate a suspicious device before one laptop becomes a company-wide incident.'
    ],
    heroStats: [
      { value: '24/7', label: 'Endpoint monitoring target' },
      { value: '100%', label: 'Servers and workstations covered' },
      { value: '< 1 hr', label: 'Critical isolation goal' }
    ],
    meta: [
      { label: 'Estimated reading time', value: '15 minutes' },
      { label: 'Primary systems', value: 'Windows, macOS, servers, browsers, EDR/MDR, patching, backup, Microsoft 365 device access' },
      { label: 'Who this guide is for', value: 'Small businesses managing employee laptops, office desktops, shared workstations, and servers without a full internal security team.' },
      { label: 'Last reviewed', value: 'April 2026' }
    ],
    quickLinks: [
      { label: 'Who it is for', fragment: 'who-for' },
      { label: 'Scenario', fragment: 'scenario' },
      { label: 'Control layers', fragment: 'attack-paths' },
      { label: 'Endpoint stack', fragment: 'threat-table' },
      { label: 'Deep dives', fragment: 'guides' },
      { label: 'Warning signs', fragment: 'warning-signs' },
      { label: 'First steps', fragment: 'first-steps' },
      { label: 'FAQ', fragment: 'faq' }
    ],
    whoFor: [
      { title: 'Laptop-heavy teams', description: 'Hybrid staff using Microsoft 365, browsers, Wi-Fi, and cloud apps from home, client sites, and the office.', icon: 'bi-laptop' },
      { title: 'Offices with shared workstations', description: 'Front desks, clinics, labs, warehouses, and admin teams where multiple users may touch the same device.', icon: 'bi-pc-display-horizontal' },
      { title: 'Businesses without a security team', description: 'Companies that need monitored protection and clear response steps without hiring internal analysts.', icon: 'bi-person-workspace' }
    ],
    explanationTitle: 'What endpoints are and why they matter',
    explanation: [
      'An endpoint is any user or server device that connects to your business systems. A laptop with Outlook and browser-saved sessions is an endpoint. A server running an accounting database is an endpoint. A shared reception desktop is an endpoint.',
      'Endpoints matter because they sit where people, files, credentials, browsers, and business apps meet. If a device is compromised, the attacker may steal browser sessions, access OneDrive files, scan the network, reach file shares, or use the user’s permissions inside Microsoft 365.'
    ],
    scenarioTitle: 'Real-world scenario: ransomware behaviour starts on one laptop',
    scenario: [
      'A consultant laptop opens a malicious attachment that launches a script. Traditional antivirus does not recognize the file. The script starts checking mapped drives, touching many files quickly, and trying to access saved credentials. The user notices the laptop slowing down but assumes it is a normal update.',
      'With EDR or MDR, that pattern can trigger an alert, isolate the device, and give the response team a timeline. Without it, the first clear sign may be renamed files across a shared drive. Endpoint security is about catching the behaviour while there is still time to limit spread.'
    ],
    flowTitle: 'Endpoint protection layers',
    flowSubtitle: 'No single endpoint control does everything. The strength comes from layers that reduce, detect, contain, and recover.',
    flow: [
      { title: '1. Reduce exposure', description: 'Patch operating systems, browsers, VPN clients, business apps, and firmware that attackers commonly target.', icon: 'bi-tools' },
      { title: '2. Limit privilege', description: 'Remove unnecessary local admin rights and keep sensitive data access role-based.', icon: 'bi-person-lock' },
      { title: '3. Detect behaviour', description: 'Use EDR or MDR to spot suspicious scripts, credential access, lateral movement, and ransomware activity.', icon: 'bi-activity' },
      { title: '4. Contain and recover', description: 'Isolate devices, reset credentials, restore files, and rebuild endpoints when trust is lost.', icon: 'bi-life-preserver' }
    ],
    tableTitle: 'Endpoint controls and what they solve',
    tableIntro:
      'The right endpoint stack is practical and maintainable. These controls cover the most common gaps in small-business environments.',
    tableRows: [
      { threat: 'Antivirus', group: 'Detection stack', path: '/guides/security/endpoint-security/edr-vs-antivirus', icon: 'bi-shield-plus', howItShowsUp: 'Blocks known malware and suspicious files.', businessImpact: 'Useful baseline, but limited against new or fileless attacks.', firstControl: 'Keep enabled, centrally managed, and updated.' },
      { threat: 'EDR', group: 'Detection stack', path: '/guides/security/endpoint-security/edr-vs-antivirus', icon: 'bi-activity', howItShowsUp: 'Monitors process, file, network, and user behaviour.', businessImpact: 'Helps investigate and contain suspicious activity.', firstControl: 'Deploy to every company workstation and server.' },
      { threat: 'MDR', group: 'Detection stack', path: '/guides/security/endpoint-security/mdr-vs-edr', icon: 'bi-person-workspace', howItShowsUp: 'Human monitoring and triage on top of EDR telemetry.', businessImpact: 'Useful when the business has no internal security team.', firstControl: 'Define escalation and response authority.' },
      { threat: 'Patch management', group: 'Reduce exposure', path: '/guides/security/endpoint-security/patch-management-basics', icon: 'bi-tools', howItShowsUp: 'Regular OS, browser, app, VPN, and firmware updates.', businessImpact: 'Closes known vulnerabilities before they become incidents.', firstControl: 'Monthly cadence plus urgent critical patches.' },
      { threat: 'Local admin control', group: 'Reduce exposure', icon: 'bi-person-lock', howItShowsUp: 'Users cannot install or change everything by default.', businessImpact: 'Limits malware and attacker control after compromise.', firstControl: 'Remove routine local admin rights.' },
      { threat: 'Disk encryption', group: 'Device hardening', icon: 'bi-lock', howItShowsUp: 'BitLocker or FileVault protects data if a laptop is lost.', businessImpact: 'Reduces exposure from theft or misplaced devices.', firstControl: 'Enable encryption and store recovery keys securely.' },
      { threat: 'Browser security', group: 'Device hardening', icon: 'bi-browser-edge', howItShowsUp: 'Updated browsers, extension control, safer password practices.', businessImpact: 'Reduces token theft, malicious extensions, and phishing impact.', firstControl: 'Patch browsers and restrict risky extensions.' },
      { threat: 'USB/device controls', group: 'Device hardening', icon: 'bi-usb-drive', howItShowsUp: 'Limits unknown removable media or unmanaged device transfer.', businessImpact: 'Reduces accidental data movement and malware risk.', firstControl: 'Apply role-based controls where needed.' },
      { threat: 'Endpoint isolation', group: 'Contain and recover', path: '/guides/security/endpoint-security/endpoint-isolation-explained', icon: 'bi-pc-display-horizontal', howItShowsUp: 'A suspicious device can be cut off while investigation continues.', businessImpact: 'Limits spread before one device reaches file shares or servers.', firstControl: 'Confirm isolation works before an incident.' },
      { threat: 'Ransomware readiness', group: 'Contain and recover', path: '/guides/security/endpoint-security/ransomware-behavior-endpoints', icon: 'bi-bug', howItShowsUp: 'EDR/MDR alerts, least privilege, protected backups, isolation.', businessImpact: 'Improves chance of containment and recovery.', firstControl: 'Test backup restores and endpoint isolation.' }
    ],
    warningSigns: [
      { title: 'Unusual file changes', description: 'Mass renames, new extensions, rapid modifications, or encrypted-looking files are urgent signals.', icon: 'bi-file-earmark-lock' },
      { title: 'Suspicious scripts or process chains', description: 'Office apps launching PowerShell or command-line tools should be investigated.', icon: 'bi-terminal' },
      { title: 'Credential access alerts', description: 'Attempts to access browser sessions, password stores, or system memory can indicate theft.', icon: 'bi-key' },
      { title: 'Missing or unhealthy agents', description: 'Devices not reporting to endpoint protection create blind spots.', icon: 'bi-heart-pulse' },
      { title: 'Long uptime and failed updates', description: 'Devices that never restart often fall behind on patches.', icon: 'bi-clock-history' },
      { title: 'Users with local admin rights by default', description: 'Routine admin rights make malware and misconfiguration easier.', icon: 'bi-person-gear' }
    ],
    firstSteps: [
      { title: 'Inventory every endpoint', description: 'Know which laptops, desktops, servers, and shared devices exist and who owns them.', icon: 'bi-list-columns' },
      { title: 'Deploy monitored endpoint protection', description: 'Use EDR, and consider MDR or MSP monitoring if nobody internally owns alert triage.', icon: 'bi-shield-plus' },
      { title: 'Create a patch cadence', description: 'Patch operating systems, browsers, business apps, VPN clients, firewalls, and servers consistently.', icon: 'bi-calendar-check' },
      { title: 'Remove routine local admin rights', description: 'Use elevation only when needed instead of giving everyone permanent admin access.', icon: 'bi-person-lock' },
      { title: 'Enable disk encryption', description: 'Use BitLocker or FileVault for laptops and store recovery keys somewhere controlled.', icon: 'bi-lock' },
      { title: 'Test isolation and restore', description: 'Make sure you can isolate a device and restore business data before an incident.', icon: 'bi-arrow-counterclockwise' }
    ],
    responseSteps: [
      { title: 'Isolate the affected device', description: 'Use EDR or network controls to stop the endpoint from reaching file shares, servers, and other workstations.', icon: 'bi-pc-display-horizontal' },
      { title: 'Preserve the timeline', description: 'Capture alert details, logged-in user, recent processes, network connections, and file changes before rebuilding.', icon: 'bi-clock-history' },
      { title: 'Reset exposed credentials', description: 'Change passwords and revoke sessions for the affected user, local admins, service accounts, and any cached privileged access.', icon: 'bi-key' },
      { title: 'Restore and harden', description: 'Restore clean data, rebuild devices that cannot be trusted, patch the exploited gap, and confirm backups are usable.', icon: 'bi-life-preserver' }
    ],
    mistakes: [
      { title: 'Assuming antivirus equals endpoint security', description: 'Antivirus is a baseline. EDR/MDR adds behaviour monitoring, investigation, and response.', icon: 'bi-shield-exclamation' },
      { title: 'Protecting laptops but ignoring servers', description: 'Servers and shared systems often hold the highest-value data and need endpoint coverage too.', icon: 'bi-server' },
      { title: 'Letting every user be local admin', description: 'Convenience creates a larger blast radius when a device is compromised.', icon: 'bi-person-x' },
      { title: 'Skipping restore tests', description: 'Backups are only useful if restores work and cover the data the business actually needs.', icon: 'bi-database-check' }
    ],
    controls: [
      { title: 'EDR or MDR coverage', description: 'Behaviour monitoring, alert triage, investigation, and isolation capability across workstations and servers.', icon: 'bi-activity' },
      { title: 'Patch and configuration management', description: 'Operating system, browser, app, and firmware updates with reporting and follow-up.', icon: 'bi-tools' },
      { title: 'Hardening basics', description: 'Local admin control, disk encryption, browser extension review, USB policy, screen lock, and device compliance.', icon: 'bi-sliders' },
      { title: 'Recovery readiness', description: 'Protected backups, restore testing, documented rebuild steps, and credential reset procedures.', icon: 'bi-life-preserver' }
    ],
    ctaTitle: 'Need endpoint protection that someone actually watches?',
    ctaCopy:
      'CtrlShift IT can review your endpoint coverage, patch status, local admin rights, encryption, backup readiness, and EDR/MDR monitoring so protection is practical for a small team.',
    faqs: [
      { q: 'Is antivirus still needed if we have EDR?', a: 'Yes. Antivirus remains a useful baseline, while EDR adds behaviour detection, investigation, and response. Most modern endpoint platforms include both layers.' },
      { q: 'What is MDR in simple terms?', a: 'MDR adds human monitoring and triage to endpoint detection. It is useful for small businesses that have tools but no internal team watching alerts.' },
      { q: 'Should servers have endpoint protection too?', a: 'Yes. Servers often hold file shares, databases, and backup access. They should be monitored and patched carefully.' },
      { q: 'What is the fastest endpoint improvement?', a: 'Inventory devices, deploy monitored endpoint protection, remove unnecessary local admin rights, and verify patch reporting. Those steps close many common gaps.' }
    ]
  }
];

export function findSecurityHubRichContentBySlug(
  slug: string | null | undefined
): SecurityHubRichContent | undefined {
  return SECURITY_HUB_RICH_CONTENT.find((content) => content.slug === slug);
}

export function findSecurityHubBySlug(slug: string | null | undefined): SecurityHub | undefined {
  return SECURITY_HUBS.find((hub) => hub.slug === slug);
}

const ALL_SECURITY_HUB_LINK: SecurityGuideLink = {
  title: 'All small business cybersecurity guides',
  path: '/guides/security'
};

const IDENTITY_GUIDE_LINKS: ReadonlyArray<SecurityGuideLink> = [
  { title: 'Password spray attacks', path: '/guides/security/identity-attacks/password-spray-attacks' },
  { title: 'Token theft attacks', path: '/guides/security/identity-attacks/token-theft-attacks' },
  { title: 'Legacy authentication risk', path: '/guides/security/identity-attacks/legacy-authentication-risk' },
  { title: 'Business email compromise', path: '/guides/security/identity-attacks/business-email-compromise' }
];

const NETWORK_GUIDE_LINKS: ReadonlyArray<SecurityGuideLink> = [
  { title: 'DDoS attacks for small business', path: '/guides/security/network-attacks/ddos-attacks-small-business' },
  { title: 'Port scanning risk', path: '/guides/security/network-attacks/port-scanning-risk' },
  { title: 'Remote exploitation attacks', path: '/guides/security/network-attacks/remote-exploitation-attacks' },
  { title: 'Man-in-the-middle attacks', path: '/guides/security/network-attacks/man-in-the-middle-attacks-small-business' },
  { title: 'Rogue Wi-Fi risk', path: '/guides/security/network-attacks/rogue-wifi-risk' },
  { title: 'Exposed RDP risk', path: '/guides/security/network-attacks/exposed-rdp-risk' },
  { title: 'Firewall misconfiguration risk', path: '/guides/security/network-attacks/firewall-misconfiguration-risk' },
  { title: 'VPN attack surface', path: '/guides/security/network-attacks/vpn-attack-surface-small-business' },
  { title: 'DNS attack risk', path: '/guides/security/network-attacks/dns-attack-risk-small-business' },
  { title: 'Lateral movement risk', path: '/guides/security/network-attacks/lateral-movement-risk' }
];

const ENDPOINT_GUIDE_LINKS: ReadonlyArray<SecurityGuideLink> = [
  { title: 'EDR vs antivirus', path: '/guides/security/endpoint-security/edr-vs-antivirus' },
  { title: 'MDR vs EDR', path: '/guides/security/endpoint-security/mdr-vs-edr' },
  { title: 'Endpoint isolation explained', path: '/guides/security/endpoint-security/endpoint-isolation-explained' },
  { title: 'Patch management basics', path: '/guides/security/endpoint-security/patch-management-basics' },
  { title: 'Ransomware behavior on endpoints', path: '/guides/security/endpoint-security/ransomware-behavior-endpoints' }
];

type SecurityGuideExpansion = Pick<
  SecurityStarterGuide,
  | 'howAttackStarts'
  | 'attackerGoals'
  | 'smallBusinessScenario'
  | 'signalsToCheck'
  | 'firstSteps'
  | 'commonMistakes'
  | 'diagram'
  | 'ctrlShiftChecks'
  | 'faqs'
  | 'relatedLinks'
>;

const SECURITY_GUIDE_EXPANSIONS: Record<string, SecurityGuideExpansion> = {
  'password-spray-attacks': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Password spray usually starts with a list of email addresses and a short list of common passwords. The email addresses may come from your website, LinkedIn, old breach data, public directories, or predictable formats like first initial plus last name.',
        'Instead of hammering one account, the attacker tries one password across many users, waits, then tries another. This slow pattern is meant to avoid obvious lockouts and blend into normal failed sign-in noise.'
      ],
      bullets: [
        { title: 'Public usernames', description: 'Staff names, role mailboxes, and predictable email formats make target lists easy to build.' },
        { title: 'Common passwords', description: 'Seasonal passwords, company-name variants, and reused passwords are the usual first guesses.' },
        { title: 'Legacy clients', description: 'Older authentication paths can make password-only attempts more useful to attackers.' }
      ]
    },
    attackerGoals: [
      { title: 'Find one weak account', description: 'The attacker only needs one mailbox or cloud account to start reading email and testing access.' },
      { title: 'Avoid lockouts', description: 'Low-and-slow attempts are designed to stay below per-account lockout thresholds.' },
      { title: 'Use the account for follow-on fraud', description: 'A successful login can lead to internal phishing, invoice review, or attempts to reach SharePoint and Teams.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 22-person accounting firm notices nothing unusual during the day. Overnight, Microsoft 365 records failed sign-ins against almost every user from several hosting-provider IP addresses. No one account has enough failures to trigger concern on its own.',
        'One junior mailbox eventually has a successful sign-in because the password was reused from an older service. The attacker searches for client names and invoices, then sends a phishing email to two internal users from the real mailbox. The issue is caught because the tenant has MFA coverage gaps and sign-in logs are reviewed after the unusual pattern appears.'
      ]
    },
    signalsToCheck: [
      { title: 'Microsoft 365 sign-in logs', description: 'Filter for repeated failures across many users, unfamiliar countries, and legacy client apps.' },
      { title: 'Smart lockout and risk events', description: 'Review accounts with lockout events, impossible travel, unfamiliar sign-in properties, or risky sign-in flags.' },
      { title: 'Successful login after failures', description: 'Prioritize any account where spray activity is followed by a successful authentication.' },
      { title: 'Legacy authentication usage', description: 'Check POP, IMAP, SMTP AUTH, and older clients because they may weaken your MFA posture.' }
    ],
    firstSteps: [
      { title: 'Confirm whether any login succeeded', description: 'Do not stop at failed attempts. Identify successful sign-ins from the same time window, source networks, or client apps.' },
      { title: 'Reset and revoke affected accounts', description: 'For any suspicious success, reset the password, revoke sessions, and review MFA methods.' },
      { title: 'Check mailbox rules', description: 'Look for forwarding, hidden rules, and unusual sent mail on accounts that may have been accessed.' },
      { title: 'Tighten MFA and legacy auth controls', description: 'Close obvious gaps before the next spray cycle starts.' }
    ],
    commonMistakes: [
      { title: 'Only reviewing one user at a time', description: 'Password spray is a tenant-wide pattern. Looking at one account hides the signal.' },
      { title: 'Ignoring failed login noise', description: 'A few failures per user can be meaningful when the same pattern hits the whole office.' },
      { title: 'Leaving legacy authentication enabled', description: 'Password-only protocols can undermine an otherwise reasonable MFA rollout.' },
      { title: 'Using predictable password rules', description: 'Forced complexity often creates seasonal patterns that attackers already test.' }
    ],
    ctrlShiftChecks: [
      { title: 'Tenant-wide failed sign-in pattern', description: 'We review failed and successful sign-ins by user, IP, geography, user agent, and client app.' },
      { title: 'MFA and Conditional Access coverage', description: 'We confirm every human account is covered and exceptions are documented and monitored.' },
      { title: 'Legacy authentication exposure', description: 'We identify POP, IMAP, SMTP AUTH, and older clients that should be disabled or replaced.' },
      { title: 'Mailbox compromise indicators', description: 'We inspect rules, forwarding, delegated access, sent mail, and suspicious session history.' },
      { title: 'Password and lockout policy fit', description: 'We check whether password guidance, banned passwords, and lockout settings fit the business.' }
    ],
    faqs: [
      { q: 'Can MFA stop password spray attacks?', a: 'MFA usually prevents a guessed password from being enough to access the account. It does not stop the spray attempts themselves, so sign-in logging, Conditional Access, lockout protections, and legacy authentication blocking still matter.' },
      { q: 'How do I know if my tenant is being sprayed?', a: 'Look for failed sign-ins spread across many users, repeated source networks, unfamiliar geographies, and attempts against legacy client apps. The pattern is often visible only when you review the tenant as a whole.' },
      { q: 'Is password spray the same as brute force?', a: 'No. Brute force usually tries many passwords against one account. Password spray tries a small number of common passwords across many accounts to avoid obvious lockouts.' },
      { q: 'Should we force everyone to change passwords after a spray?', a: 'Not automatically. First confirm whether any account had a suspicious successful sign-in. Reset affected accounts, revoke sessions, close MFA gaps, and review mailbox rules before making broad changes.' }
    ],
    relatedLinks: [
      ...MICROSOFT_365_RELATED_LINKS,
      IDENTITY_GUIDE_LINKS[1],
      IDENTITY_GUIDE_LINKS[2],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'token-theft-attacks': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Token theft usually starts after a user interacts with a phishing page, malicious browser extension, compromised device, or phishing proxy. The user may complete a legitimate-looking Microsoft 365 sign-in and MFA prompt, but the attacker captures the active session token created after authentication.',
        'The important point for a small business is that the attacker may not need to know the password again. They try to reuse the already-authenticated session until it expires, is revoked, or is blocked by device, risk, or session controls.'
      ],
      bullets: [
        { title: 'Phishing proxy', description: 'A fake sign-in flow relays authentication and captures the resulting session.' },
        { title: 'Compromised endpoint', description: 'Malware or suspicious tooling can target browser session data and saved credentials.' },
        { title: 'Unsafe browser extension', description: 'Extensions with broad permissions can create unexpected exposure around browser sessions.' }
      ]
    },
    attackerGoals: [
      { title: 'Bypass repeated MFA prompts', description: 'A stolen session can let the attacker appear already authenticated.' },
      { title: 'Access email and files quietly', description: 'The attacker may read mail, download files, or create rules without triggering a new password prompt.' },
      { title: 'Maintain access long enough to act', description: 'The practical goal is often invoice fraud, internal phishing, or data review before the session is revoked.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 35-person consulting firm receives a fake Microsoft shared-document email. A project manager signs in and approves MFA. A few hours later, the same account shows activity from an unfamiliar browser session outside the normal device pattern.',
        'The user insists they did not share their password, and that may be true. The useful response is to revoke sessions, reset credentials, check mailbox rules, review endpoint alerts, and tighten Conditional Access for unmanaged devices and persistent sessions.'
      ]
    },
    signalsToCheck: [
      { title: 'Sign-in session details', description: 'Review device, browser, IP, country, user agent, and whether the session came from a managed or unmanaged device.' },
      { title: 'MFA timing', description: 'Compare the MFA approval time with the suspicious session and any phishing report from the user.' },
      { title: 'Mailbox and file activity', description: 'Check inbox rules, forwarding, downloads, SharePoint access, and unusual sent mail after the session began.' },
      { title: 'Endpoint telemetry', description: 'Look for browser credential access, suspicious extensions, info-stealer indicators, or unusual process activity.' }
    ],
    firstSteps: [
      { title: 'Revoke active sessions', description: 'Terminate refresh tokens for the suspected user so stolen sessions cannot continue silently.' },
      { title: 'Reset password and MFA methods', description: 'Change the password and review registered MFA devices, phone numbers, and recovery details.' },
      { title: 'Inspect the endpoint', description: 'Treat token theft as both an identity and endpoint issue until the device is verified clean.' },
      { title: 'Review access after the suspicious session', description: 'Identify mail, files, apps, and rules touched while the attacker may have had access.' }
    ],
    commonMistakes: [
      { title: 'Assuming MFA means the session is safe', description: 'MFA is essential, but active session theft is a different problem than password guessing.' },
      { title: 'Only changing the password', description: 'Password resets may not immediately end every active session unless tokens are revoked.' },
      { title: 'Ignoring unmanaged devices', description: 'Unknown browsers and personal devices make session trust harder to assess.' },
      { title: 'Separating endpoint and identity alerts', description: 'Browser credential theft on a device can explain suspicious Microsoft 365 sessions.' }
    ],
    ctrlShiftChecks: [
      { title: 'Session revocation readiness', description: 'We confirm administrators can revoke sessions, reset MFA methods, and preserve investigation data.' },
      { title: 'Conditional Access session controls', description: 'We review sign-in frequency, persistent sessions, unmanaged devices, and risk-based policies.' },
      { title: 'Endpoint protection coverage', description: 'We check whether EDR/MDR covers the user device and records browser or credential theft signals.' },
      { title: 'Mailbox and file audit review', description: 'We inspect rules, downloads, forwarding, SharePoint activity, and sensitive file access.' },
      { title: 'User reporting workflow', description: 'We verify users know how to report suspicious sign-ins, prompts, and document links quickly.' }
    ],
    faqs: [
      { q: 'Can token theft bypass MFA?', a: 'It can bypass the need for a new MFA prompt if the attacker successfully steals an already-authenticated session. MFA is still critical, but session controls, device trust, and token revocation are also needed.' },
      { q: 'Should I reset the password after token theft?', a: 'Yes, but do not stop there. Revoke sessions, review MFA methods, inspect mailbox rules, and check the endpoint that may have exposed the token.' },
      { q: 'How does Conditional Access help with token theft?', a: 'Conditional Access can restrict unmanaged devices, require compliant devices for sensitive access, control persistent sessions, and respond to risky sign-ins.' },
      { q: 'Can token theft happen on a clean Microsoft 365 tenant?', a: 'Yes. Token theft can start from phishing or endpoint compromise even when tenant settings are reasonable. The goal is to reduce likelihood and improve detection.' }
    ],
    relatedLinks: [
      MICROSOFT_365_RELATED_LINKS[1],
      MICROSOFT_365_RELATED_LINKS[0],
      MICROSOFT_365_RELATED_LINKS[4],
      ENDPOINT_GUIDE_LINKS[0],
      ENDPOINT_GUIDE_LINKS[1],
      IDENTITY_GUIDE_LINKS[0],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'legacy-authentication-risk': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Legacy authentication risk usually starts with an old protocol or client that still accepts a username and password without the same modern checks as browser-based sign-in. POP, IMAP, SMTP AUTH, and older mail clients are common examples in Microsoft 365 environments.',
        'Attackers do not need the protocol to be fancy. If a stolen password works through a weaker sign-in path, they can attempt mailbox access while the business believes MFA is protecting every login.'
      ],
      bullets: [
        { title: 'Old scan-to-email setup', description: 'Printers and scanners often use SMTP AUTH with a mailbox password.' },
        { title: 'Older mail clients', description: 'Legacy Outlook, mobile mail apps, or archived device profiles can continue using old protocols.' },
        { title: 'Stolen password testing', description: 'Attackers test older protocols because they can be easier to automate and may not enforce MFA.' }
      ]
    },
    attackerGoals: [
      { title: 'Bypass modern MFA controls', description: 'Older protocols may allow password-only access if not blocked.' },
      { title: 'Read or send mail', description: 'Mailbox access can support fraud, reconnaissance, or internal phishing.' },
      { title: 'Find weak service workflows', description: 'Accounts used by scanners or apps may have weak passwords and little monitoring.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 12-person clinic enables MFA for staff, but an old scan-to-email mailbox still uses SMTP AUTH. The password was set years ago and is stored on a multifunction printer. Sign-in logs show repeated SMTP attempts that no one reviews because interactive MFA appears healthy.',
        'The fix is not to break scanning during clinic hours. The practical approach is to inventory legacy usage, replace the workflow with a supported relay or modern method, then block legacy authentication and monitor the cleanup period.'
      ]
    },
    signalsToCheck: [
      { title: 'Client app in sign-in logs', description: 'Filter Microsoft 365 sign-ins by POP, IMAP, SMTP AUTH, Exchange ActiveSync, or older Office clients.' },
      { title: 'Accounts used by devices', description: 'Identify scanner, printer, app, and service accounts that authenticate with mailbox passwords.' },
      { title: 'Successful non-interactive sign-ins', description: 'Review successful password-based attempts that did not require modern authentication.' },
      { title: 'Conditional Access report-only results', description: 'Use reporting to understand what would break before enforcing a block.' }
    ],
    firstSteps: [
      { title: 'Inventory usage before blocking', description: 'Use sign-in logs to identify who or what still uses legacy protocols.' },
      { title: 'Replace business dependencies', description: 'Move scan-to-email, app connectors, and old clients to supported modern options.' },
      { title: 'Block legacy authentication', description: 'Use tenant settings and Conditional Access where available.' },
      { title: 'Monitor after enforcement', description: 'Watch sign-in failures and user reports so legitimate workflows are corrected quickly.' }
    ],
    commonMistakes: [
      { title: 'Turning on MFA but leaving old protocols', description: 'MFA coverage can look good while password-only paths still exist.' },
      { title: 'Forgetting printers and scanners', description: 'Scan-to-email is one of the most common blockers in small offices.' },
      { title: 'Using shared mailbox passwords', description: 'Shared workflows should be redesigned rather than protected with a shared secret.' },
      { title: 'Blocking without a rollback plan', description: 'A planned change window and validation checklist prevent avoidable disruption.' }
    ],
    ctrlShiftChecks: [
      { title: 'Legacy protocol usage report', description: 'We identify users, devices, apps, source IPs, and client types still using older authentication.' },
      { title: 'Scan-to-email and app dependency review', description: 'We map printers, scanners, line-of-business apps, and service accounts before enforcement.' },
      { title: 'Modern authentication readiness', description: 'We verify Outlook, mobile apps, and connectors can use modern authentication.' },
      { title: 'Conditional Access alignment', description: 'We confirm Security Defaults or Conditional Access policies block the right paths.' },
      { title: 'Post-change validation', description: 'We test mail flow, scanning, user sign-ins, and alerts after the change.' }
    ],
    faqs: [
      { q: 'What is legacy authentication in Microsoft 365?', a: 'It refers to older sign-in protocols and clients, such as POP, IMAP, SMTP AUTH, and older ActiveSync connections, that may not support modern MFA and Conditional Access properly.' },
      { q: 'Will blocking legacy authentication break scan-to-email?', a: 'It can if a printer uses SMTP AUTH with a mailbox password. Review sign-in logs and replace that workflow before enforcement.' },
      { q: 'Is SMTP AUTH always bad?', a: 'SMTP AUTH can be needed in some controlled cases, but it should not be broadly enabled. Any exception should be documented, restricted, and monitored.' },
      { q: 'How do I find legacy authentication usage?', a: 'Use Microsoft 365 sign-in logs and filter by client app or protocol. Review both successful and failed sign-ins over a representative period.' }
    ],
    relatedLinks: [
      MICROSOFT_365_RELATED_LINKS[2],
      MICROSOFT_365_RELATED_LINKS[1],
      MICROSOFT_365_RELATED_LINKS[0],
      IDENTITY_GUIDE_LINKS[0],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'business-email-compromise': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Business email compromise usually starts with mailbox access, lookalike domains, display-name impersonation, or a compromised vendor or client account. The message often contains no malware. It works because it fits into a real business workflow.',
        'Once attackers have a mailbox or convincing impersonation path, they study invoices, retainers, payroll, wire instructions, closing dates, or vendor conversations. The attack becomes a process problem as much as a security problem.'
      ],
      bullets: [
        { title: 'Mailbox compromise', description: 'A real user account is used to send or monitor payment-related conversations.' },
        { title: 'Impersonation', description: 'A display name, reply-to address, or lookalike domain makes an outside message appear familiar.' },
        { title: 'Vendor thread hijack', description: 'Attackers enter an existing conversation and wait for the right payment moment.' }
      ]
    },
    attackerGoals: [
      { title: 'Change payment details', description: 'The common goal is redirecting an invoice, retainer, payroll, or vendor payment.' },
      { title: 'Hide replies', description: 'Inbox rules may move replies away from the user so the fraud can continue.' },
      { title: 'Use trust inside the business', description: 'Messages from a real mailbox are more believable than outside spam.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 28-person law office receives updated payment instructions during an active closing. The message appears in the same thread and uses familiar wording. The attacker has access to one mailbox and created a rule that hides replies containing words like bank, wire, and invoice.',
        'The office catches the issue because its payment process requires phone verification using a known number, not the number in the email. The technical cleanup still matters: revoke sessions, check rules, review sign-ins, and inspect other mailboxes that may have received internal phishing.'
      ]
    },
    signalsToCheck: [
      { title: 'Inbox and forwarding rules', description: 'Look for rules that delete, archive, move, or forward messages externally.' },
      { title: 'Mailbox audit logs', description: 'Review rule creation, message access, sent items, delegate changes, and suspicious logins.' },
      { title: 'Reply-to and domain details', description: 'Check whether replies go to an unexpected address or a lookalike domain.' },
      { title: 'Payment-change history', description: 'Trace when banking details changed, who approved it, and what verification occurred.' }
    ],
    firstSteps: [
      { title: 'Pause payment changes', description: 'Stop related transfers until the request is verified through a known out-of-band method.' },
      { title: 'Secure suspected mailboxes', description: 'Reset credentials, revoke sessions, review MFA methods, and remove suspicious rules.' },
      { title: 'Preserve evidence', description: 'Keep headers, messages, audit logs, and approval notes for investigation and insurance conversations.' },
      { title: 'Notify affected internal stakeholders', description: 'Finance, leadership, and the account owner should understand what was seen and what to watch for.' }
    ],
    commonMistakes: [
      { title: 'Treating BEC as only a phishing issue', description: 'BEC is often a mix of mailbox security, payment process, and user verification.' },
      { title: 'Not reviewing mailbox rules', description: 'Rules are one of the most common ways attackers hide their activity.' },
      { title: 'Verifying by replying to the thread', description: 'If the thread is compromised, replies may go back to the attacker.' },
      { title: 'Ignoring vendor compromise', description: 'The suspicious message may come from a real vendor account, not your own tenant.' }
    ],
    ctrlShiftChecks: [
      { title: 'Mailbox rule and forwarding audit', description: 'We review forwarding, hidden rules, mailbox permissions, delegates, and unusual sent mail.' },
      { title: 'MFA and session review', description: 'We confirm MFA coverage, revoke suspicious sessions, and check security info changes.' },
      { title: 'Email authentication posture', description: 'We review SPF, DKIM, DMARC, anti-phishing policies, and external sender handling.' },
      { title: 'Finance workflow review', description: 'We identify where email-only approval creates avoidable payment risk.' },
      { title: 'Alerting and logging readiness', description: 'We check whether mailbox auditing, forwarding alerts, and suspicious sign-in alerts are usable.' }
    ],
    faqs: [
      { q: 'What is business email compromise?', a: 'Business email compromise is fraud that abuses trusted email relationships, often through mailbox compromise, impersonation, or hijacked vendor conversations.' },
      { q: 'Does BEC always involve malware?', a: 'No. Many BEC attempts contain no malware and rely on trust, timing, and normal payment workflows.' },
      { q: 'What should we check first after a suspected BEC incident?', a: 'Check mailbox rules, forwarding, sign-in logs, sent mail, MFA methods, and the payment approval trail. Preserve evidence before deleting anything.' },
      { q: 'How can a small office reduce BEC risk quickly?', a: 'Require MFA, enable mailbox auditing and alerts, restrict external forwarding, and verify payment changes through a known phone number or established process.' }
    ],
    relatedLinks: [
      MICROSOFT_365_RELATED_LINKS[4],
      MICROSOFT_365_RELATED_LINKS[2],
      MICROSOFT_365_RELATED_LINKS[0],
      MICROSOFT_365_RELATED_LINKS[1],
      IDENTITY_GUIDE_LINKS[1],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'ddos-attacks-small-business': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'A DDoS attack usually starts when a public service is flooded with more traffic than it or the upstream connection can handle. The target may be a website, DNS record, VPN portal, booking page, or remote access service.',
        'Small businesses rarely mitigate serious DDoS traffic directly on an office firewall. The effective response usually happens at the hosting provider, CDN, DNS provider, cloud provider, or ISP.'
      ],
      bullets: [
        { title: 'Public web property', description: 'Marketing sites, booking pages, and portals are common visible targets.' },
        { title: 'Remote access dependency', description: 'VPN or remote app portals can become unavailable when flooded.' },
        { title: 'Upstream saturation', description: 'If the office internet circuit is overwhelmed, the local firewall may never get a fair chance.' }
      ]
    },
    attackerGoals: [
      { title: 'Disrupt availability', description: 'The main goal is outage or severe slowness, not necessarily data theft.' },
      { title: 'Distract the team', description: 'A DDoS incident can consume support attention while other issues are missed.' },
      { title: 'Pressure a business process', description: 'Outages matter most when they hit booking, remote work, ecommerce, or client portals.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 15-person clinic relies on an online appointment form and VoIP phones. The website becomes unreachable and remote staff report VPN timeouts. The firewall shows unusually high connection counts, but the real bottleneck is upstream at the host and ISP.',
        'The practical response is to confirm the affected service, contact the hosting provider or ISP, enable CDN or provider mitigation where available, and keep staff informed about alternate intake or phone workflows.'
      ]
    },
    signalsToCheck: [
      { title: 'Availability monitoring', description: 'External uptime checks show whether the issue is public-facing or only local.' },
      { title: 'Hosting and CDN dashboards', description: 'Look for traffic spikes, mitigation events, origin errors, and geographic patterns.' },
      { title: 'Firewall logs and resource usage', description: 'Review connection counts, CPU, memory, and denied traffic.' },
      { title: 'ISP or provider alerts', description: 'Provider notices can confirm upstream filtering or circuit saturation.' }
    ],
    firstSteps: [
      { title: 'Confirm scope', description: 'Identify whether the website, VPN, DNS, office internet, or a provider-hosted service is affected.' },
      { title: 'Escalate upstream', description: 'Contact the host, CDN, DNS provider, or ISP using documented support paths.' },
      { title: 'Avoid random firewall changes', description: 'Emergency changes can make recovery harder if they are not documented and reversible.' },
      { title: 'Communicate alternate workflows', description: 'Give staff temporary instructions for bookings, remote access, or client communication.' }
    ],
    commonMistakes: [
      { title: 'Expecting the office firewall to absorb everything', description: 'Large traffic floods need upstream mitigation before they reach the office.' },
      { title: 'No provider contact plan', description: 'During an outage is the worst time to search for account numbers and escalation paths.' },
      { title: 'Hosting critical services too cheaply', description: 'Low-cost hosting may not include meaningful mitigation or support response.' },
      { title: 'No external monitoring', description: 'Without outside checks, teams may mistake a public outage for a local workstation issue.' }
    ],
    ctrlShiftChecks: [
      { title: 'Public dependency map', description: 'We identify websites, DNS, VPNs, portals, ISPs, and hosting providers that affect availability.' },
      { title: 'Provider mitigation review', description: 'We check whether DNS, CDN, hosting, and ISP plans include usable DDoS escalation paths.' },
      { title: 'Firewall exposure and logging', description: 'We review public services, firewall health, logging, and unnecessary open ports.' },
      { title: 'Continuity workflow', description: 'We document practical fallback steps for remote work, phones, bookings, and client intake.' },
      { title: 'Post-incident cleanup', description: 'We review what changed during response and return rules or DNS records to a clean state.' }
    ],
    faqs: [
      { q: 'Can a small business stop a DDoS attack?', a: 'A small business can prepare and reduce impact, but serious mitigation usually needs the hosting provider, CDN, DNS provider, cloud provider, or ISP.' },
      { q: 'Does DDoS mean data was stolen?', a: 'Not by itself. DDoS is primarily an availability attack. You should still watch for suspicious activity around the same time, but outage does not automatically mean compromise.' },
      { q: 'What should be protected first?', a: 'Protect services that affect revenue and operations: appointment booking, ecommerce, client portals, VPN, DNS, and public websites.' },
      { q: 'Is a CDN useful for DDoS protection?', a: 'For websites, a CDN can absorb and filter traffic before it reaches the origin server. It does not protect every service, such as an office VPN.' }
    ],
    relatedLinks: [
      NETWORK_GUIDE_LINKS[1],
      NETWORK_GUIDE_LINKS[4],
      NETWORK_GUIDE_LINKS[3],
      MICROSOFT_365_RELATED_LINKS[3],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'port-scanning-risk': {
    diagram: {
      title: 'How a scan turns into a target list',
      intro: 'Port scanning is discovery. The danger is what the scan reveals and what attackers try next.',
      steps: [
        { title: 'Public IP', description: 'The attacker starts with an address or domain tied to the business.', icon: 'bi-globe2' },
        { title: 'Open ports', description: 'Reachable services answer from the internet.', icon: 'bi-radar' },
        { title: 'Service fingerprint', description: 'Product names, banners, certificates, and login pages give clues.', icon: 'bi-fingerprint' },
        { title: 'Follow-on attack', description: 'The attacker tries passwords, exploits, or exposed admin panels.', icon: 'bi-arrow-right-circle' }
      ]
    },
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Port scanning usually starts with automated internet-wide discovery. Attackers and bots test public IP addresses to see which services respond: RDP, VPN, web servers, admin portals, camera systems, NAS devices, and old vendor tools.',
        'The scan itself is not proof of compromise. It is the attacker building a map. The risk rises when the map shows something exposed, outdated, or unnecessary.'
      ],
      bullets: [
        { title: 'Old port forward', description: 'A temporary vendor or remote-work rule remains open.' },
        { title: 'Public admin page', description: 'A management interface is reachable without being limited to trusted locations.' },
        { title: 'Forgotten test system', description: 'A server or app created for a project remains online after the need ends.' }
      ]
    },
    attackerGoals: [
      { title: 'Identify weak doors', description: 'Scans reveal which services deserve a closer attack.' },
      { title: 'Find remote access', description: 'RDP, VPN, and admin portals are useful targets because they can lead inside.' },
      { title: 'Prioritize known vulnerabilities', description: 'Product fingerprints help attackers match exposed systems to public advisories.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 20-person office changed MSPs and inherited firewall rules from several years of quick fixes. An external scan finds a public VPN portal, an old camera admin page, and a port forward to a retired server.',
        'The cleanup is straightforward but important: confirm owners, close stale exposure, restrict management access, document the remaining public services, and review logs for attempts against anything that stayed open.'
      ]
    },
    signalsToCheck: [
      { title: 'External scan results', description: 'Compare public scan findings to known business services.' },
      { title: 'Firewall NAT rules', description: 'Review every inbound rule and port forward for owner, purpose, and last review date.' },
      { title: 'Certificates and banners', description: 'Public services may reveal product names, old hostnames, or vendor details.' },
      { title: 'Scan followed by logins', description: 'Correlate discovery traffic with later VPN, RDP, or admin login attempts.' }
    ],
    firstSteps: [
      { title: 'Map what is public', description: 'Create a simple list of exposed IPs, ports, services, owners, and business reasons.' },
      { title: 'Close what is not needed', description: 'Remove old port forwards, test services, and public admin pages.' },
      { title: 'Harden what must stay exposed', description: 'Patch, require MFA where applicable, restrict source access, and monitor logs.' },
      { title: 'Schedule recurring reviews', description: 'Review public exposure after vendor changes, office moves, and remote access changes.' }
    ],
    commonMistakes: [
      { title: 'Treating scans as harmless noise', description: 'Scanning is common, but exposed services still need ownership and review.' },
      { title: 'Relying on nonstandard ports', description: 'Changing a port number may reduce noise, but scanners can still find it.' },
      { title: 'No public asset inventory', description: 'If no one knows what should be exposed, no one can spot what should not be exposed.' },
      { title: 'Leaving admin panels online', description: 'Management interfaces should be private or tightly restricted.' }
    ],
    ctrlShiftChecks: [
      { title: 'External exposure map', description: 'We map public IPs, DNS names, open ports, certificates, and visible login pages.' },
      { title: 'Firewall rule cleanup', description: 'We match each inbound rule to a current business owner and remove stale exposure.' },
      { title: 'Remote access review', description: 'We verify VPN, RDP, and admin interfaces are patched, restricted, and monitored.' },
      { title: 'Scan-to-login correlation', description: 'We compare discovery activity with authentication failures and exploit attempts.' },
      { title: 'Review schedule', description: 'We create a recurring exposure review tied to vendor and firewall changes.' }
    ],
    faqs: [
      { q: 'Is port scanning an attack?', a: 'It is usually reconnaissance. The scan maps what is reachable so attackers can decide what to try next.' },
      { q: 'Can we stop all port scanning?', a: 'Not realistically. The practical goal is to expose less, patch what remains public, and monitor meaningful follow-on activity.' },
      { q: 'How often should exposure be reviewed?', a: 'Quarterly is a good baseline, plus after firewall changes, vendor projects, office moves, or remote access changes.' },
      { q: 'What should never be public?', a: 'Firewall admin pages, NAS admin pages, camera admin panels, direct RDP, and abandoned test systems should not be broadly reachable.' }
    ],
    relatedLinks: [
      NETWORK_GUIDE_LINKS[2],
      NETWORK_GUIDE_LINKS[5],
      NETWORK_GUIDE_LINKS[6],
      NETWORK_GUIDE_LINKS[7],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'man-in-the-middle-attacks-small-business': {
    diagram: {
      title: 'Where interception risk appears',
      intro: 'The risk sits between the user and the service they intended to reach.',
      steps: [
        { title: 'User device', description: 'Laptop, phone, or tablet starts a normal work session.', icon: 'bi-phone' },
        { title: 'Untrusted path', description: 'Fake Wi-Fi, captive portal, or unmanaged router sits in the middle.', icon: 'bi-signpost-split' },
        { title: 'Cloud service', description: 'Microsoft 365, banking, portals, and SaaS apps receive the request.', icon: 'bi-cloud' },
        { title: 'Trust decision', description: 'HTTPS, VPN, device trust, and user caution reduce exposure.', icon: 'bi-shield-lock' }
      ]
    },
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Man-in-the-middle risk usually starts when a user connects through a network the business does not control. That could be public Wi-Fi, a lookalike network, a compromised home router, or a captive portal that trains users to click through warnings.',
        'Modern HTTPS protects many sessions, but attackers can still redirect users, present fake login pages, downgrade trust, or exploit unmanaged devices that ignore warnings.'
      ],
      bullets: [
        { title: 'Fake or lookalike Wi-Fi', description: 'A network name resembles a trusted office, hotel, or client network.' },
        { title: 'Captive portal confusion', description: 'Users become used to clicking through prompts before working.' },
        { title: 'Unmanaged device', description: 'Personal devices may lack trusted certificates, updates, VPN, or browser policy.' }
      ]
    },
    attackerGoals: [
      { title: 'Capture credentials', description: 'Fake portals and phishing flows try to collect sign-in details or session tokens.' },
      { title: 'Redirect traffic', description: 'Users may be sent to lookalike pages or unsafe destinations.' },
      { title: 'Observe weak traffic', description: 'Poorly protected apps or old devices can expose more than modern HTTPS sites.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A consultant signs into Microsoft 365 from a coffee shop Wi-Fi network with a generic name. The user receives a login prompt after a captive portal and approves MFA. Later, the tenant shows an unfamiliar browser session and mailbox activity.',
        'The response is to revoke sessions, inspect the device, review sign-in details, and tighten guidance: use managed devices, trusted networks, VPN where needed, and report certificate or login oddities quickly.'
      ]
    },
    signalsToCheck: [
      { title: 'Sign-in context', description: 'Review device, browser, IP, location, MFA timing, and managed-device status.' },
      { title: 'Certificate warnings', description: 'Users should report browser or app certificate warnings instead of clicking through.' },
      { title: 'New sessions after public Wi-Fi use', description: 'Compare suspicious activity with travel, client visits, and public network use.' },
      { title: 'Endpoint health', description: 'Check whether the device is patched, managed, encrypted, and protected.' }
    ],
    firstSteps: [
      { title: 'Revoke suspicious sessions', description: 'End cloud sessions if a user may have signed in through an unsafe path.' },
      { title: 'Inspect the device', description: 'Look for suspicious browser extensions, proxy settings, malware, or certificate changes.' },
      { title: 'Clarify safe network guidance', description: 'Staff should know which office SSIDs are trusted and when to use VPN.' },
      { title: 'Require managed devices for sensitive work', description: 'Finance, admin, and client-data workflows deserve stronger device trust.' }
    ],
    commonMistakes: [
      { title: 'Assuming HTTPS solves everything', description: 'HTTPS helps, but users can still be routed to fake pages or unsafe login flows.' },
      { title: 'Ignoring personal devices', description: 'Unmanaged devices weaken visibility and trust decisions.' },
      { title: 'No guidance for public Wi-Fi', description: 'Staff need simple rules for hotels, clinics, courts, client sites, and coffee shops.' },
      { title: 'Dismissing certificate warnings', description: 'Those warnings are often the browser doing its job.' }
    ],
    ctrlShiftChecks: [
      { title: 'Remote-work access review', description: 'We review where staff connect from and which workflows require stronger device trust or VPN.' },
      { title: 'Conditional Access posture', description: 'We check unmanaged device controls, session settings, MFA behavior, and risky sign-in handling.' },
      { title: 'Endpoint health check', description: 'We verify devices are patched, encrypted, protected, and free of suspicious proxy or certificate changes.' },
      { title: 'Wi-Fi and travel guidance', description: 'We create simple user guidance for public networks, client sites, and certificate warnings.' },
      { title: 'Incident response pairing', description: 'We pair suspicious network use with session revocation, mailbox review, and endpoint inspection.' }
    ],
    faqs: [
      { q: 'Are man-in-the-middle attacks still relevant with HTTPS?', a: 'Yes. HTTPS reduces much of the old risk, but fake portals, phishing proxies, unsafe Wi-Fi, unmanaged devices, and certificate warnings still matter.' },
      { q: 'Should staff use VPN on public Wi-Fi?', a: 'For sensitive work or unmanaged networks, VPN or identity-aware access can reduce exposure. Managed devices and strong cloud controls also matter.' },
      { q: 'What should users report?', a: 'Unexpected login prompts, certificate warnings, lookalike Wi-Fi names, repeated MFA prompts, and strange captive portals should be reported quickly.' },
      { q: 'Does MFA stop interception?', a: 'MFA helps, but phishing proxies can capture active sessions. Device trust, session controls, and user reporting are still important.' }
    ],
    relatedLinks: [
      NETWORK_GUIDE_LINKS[4],
      IDENTITY_GUIDE_LINKS[1],
      MICROSOFT_365_RELATED_LINKS[1],
      ENDPOINT_GUIDE_LINKS[0],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'rogue-wifi-risk': {
    diagram: {
      title: 'Why wireless separation matters',
      intro: 'A clean Wi-Fi design keeps different trust levels from blending together.',
      steps: [
        { title: 'Staff Wi-Fi', description: 'Managed staff devices reach business apps and approved internal services.', icon: 'bi-wifi' },
        { title: 'Guest Wi-Fi', description: 'Visitors reach the internet without seeing business systems.', icon: 'bi-person' },
        { title: 'Device network', description: 'Printers, phones, and specialty devices get limited access.', icon: 'bi-printer' },
        { title: 'Firewall rules', description: 'Segmentation decides what each network can and cannot reach.', icon: 'bi-bricks' }
      ]
    },
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Rogue Wi-Fi risk starts when an access point appears that the business did not approve, or when a lookalike network convinces staff to connect. It can be malicious, but it can also be a consumer router, extender, vendor device, or old access point plugged in for convenience.',
        'The danger is misplaced trust. Staff may believe they are on the office network, or an unmanaged access point may bridge around the firewall design.'
      ],
      bullets: [
        { title: 'Lookalike SSID', description: 'A fake network name resembles the real office Wi-Fi.' },
        { title: 'Unmanaged router', description: 'A small router or extender creates an undocumented network path.' },
        { title: 'Flat guest access', description: 'Guest Wi-Fi reaches internal systems because segmentation was never tested.' }
      ]
    },
    attackerGoals: [
      { title: 'Attract staff connections', description: 'A trusted-looking network can lead users into unsafe sign-in or browsing paths.' },
      { title: 'Bypass controls', description: 'An unauthorized access point may avoid firewall policy and logging.' },
      { title: 'Reach internal devices', description: 'Poor guest separation can expose printers, file shares, or admin pages.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A clinic has staff Wi-Fi, guest Wi-Fi, tablets, printers, and vendor equipment. A consumer extender is added to improve signal near reception. It works, but it also places unmanaged wireless traffic on the same network as business devices.',
        'The fix is to inventory authorized SSIDs, remove unmanaged hardware, separate staff, guest, and device networks, and give staff clear guidance on the exact Wi-Fi names to trust.'
      ]
    },
    signalsToCheck: [
      { title: 'SSID inventory', description: 'Compare visible networks around the office to the approved list.' },
      { title: 'Switch port review', description: 'Look for consumer routers, extenders, and unknown access points plugged into office ports.' },
      { title: 'Guest network reachability', description: 'Test whether guest devices can reach printers, shares, servers, or admin interfaces.' },
      { title: 'Wi-Fi password lifecycle', description: 'Review shared passwords after staff turnover, vendor changes, and tenant moves.' }
    ],
    firstSteps: [
      { title: 'Document trusted SSIDs', description: 'Give staff exact network names and a simple reporting path for lookalikes.' },
      { title: 'Remove unauthorized access points', description: 'Find and disconnect unmanaged routers, extenders, or old APs.' },
      { title: 'Separate guest and staff access', description: 'Use VLANs or equivalent controls so guest devices reach only what they should.' },
      { title: 'Rotate shared Wi-Fi secrets', description: 'Change passwords when access has spread beyond current staff and vendors.' }
    ],
    commonMistakes: [
      { title: 'Using one Wi-Fi network for everything', description: 'Staff laptops, guests, printers, and specialty devices do not need the same trust level.' },
      { title: 'Never changing Wi-Fi passwords', description: 'Shared secrets drift over time through staff, visitors, and vendors.' },
      { title: 'Assuming signal extenders are harmless', description: 'Consumer gear can create unmanaged paths around business controls.' },
      { title: 'Not testing guest isolation', description: 'A guest SSID is not separated until reachability has been validated.' }
    ],
    ctrlShiftChecks: [
      { title: 'Wireless network inventory', description: 'We document approved SSIDs, access points, owners, passwords, and intended users.' },
      { title: 'Unknown access point review', description: 'We look for consumer routers, extenders, and unauthorized APs on office ports.' },
      { title: 'Guest isolation test', description: 'We validate that guest devices cannot reach business systems or admin interfaces.' },
      { title: 'Segmentation design', description: 'We separate staff, guest, printer, phone, and specialty-device traffic where appropriate.' },
      { title: 'Wi-Fi access lifecycle', description: 'We align passwords and access changes with staff turnover and vendor access.' }
    ],
    faqs: [
      { q: 'What is rogue Wi-Fi?', a: 'It is an unauthorized, fake, or unmanaged wireless network that appears near or inside the business environment.' },
      { q: 'Is rogue Wi-Fi always malicious?', a: 'No. It can be a well-intentioned extender or vendor router, but it still creates risk if unmanaged.' },
      { q: 'Should guest Wi-Fi be isolated?', a: 'Yes. Guest devices should not reach business workstations, servers, printers, or admin pages by default.' },
      { q: 'How do staff know which Wi-Fi to trust?', a: 'Publish the exact approved network names and tell staff to report lookalike or unexpected networks.' }
    ],
    relatedLinks: [
      NETWORK_GUIDE_LINKS[3],
      NETWORK_GUIDE_LINKS[6],
      NETWORK_GUIDE_LINKS[9],
      ENDPOINT_GUIDE_LINKS[0],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'remote-exploitation-attacks': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Remote exploitation starts when a vulnerable service is reachable from outside the office. The service may be a VPN appliance, firewall, web application, remote access portal, server, or forgotten port forward.',
        'Attackers scan broadly for known products and versions. If the system is unpatched or misconfigured, they may be able to gain access without a staff member clicking anything.'
      ],
      bullets: [
        { title: 'Internet-facing software', description: 'VPN, firewall, RDP gateway, web app, and server services are high-priority targets.' },
        { title: 'Known vulnerability', description: 'Public advisories and vendor patches tell attackers what unpatched systems may be weak.' },
        { title: 'Forgotten exposure', description: 'Old vendor access, test servers, and stale port forwards often remain after the project ends.' }
      ]
    },
    attackerGoals: [
      { title: 'Get initial access', description: 'The first goal is a foothold on a reachable system.' },
      { title: 'Steal credentials', description: 'Once inside, attackers often look for passwords, tokens, or admin sessions.' },
      { title: 'Move laterally', description: 'The exposed system may become a path to file shares, servers, backups, or domain resources.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 40-person professional office uses a VPN appliance that has not been patched in several months. A critical vendor advisory is published, but no one owns firmware updates. The appliance remains exposed and starts showing unfamiliar login and service activity.',
        'The response is to patch or isolate the device, review logs for successful access, rotate affected credentials, check endpoints and servers for follow-on activity, and confirm backup access was not exposed.'
      ]
    },
    signalsToCheck: [
      { title: 'External exposure scan', description: 'Confirm which services and versions are reachable from the internet.' },
      { title: 'Firewall and VPN logs', description: 'Review login attempts, admin sessions, configuration changes, and unusual source addresses.' },
      { title: 'Patch and firmware status', description: 'Compare internet-facing systems against current vendor advisories.' },
      { title: 'Endpoint and server alerts', description: 'Look for new accounts, scheduled tasks, remote tools, and unusual outbound connections.' }
    ],
    firstSteps: [
      { title: 'Contain the exposed service', description: 'Patch, restrict, or temporarily disable the service if exploitation is suspected.' },
      { title: 'Preserve logs', description: 'Export firewall, VPN, server, and endpoint logs before rotating or rebuilding systems.' },
      { title: 'Reset exposed credentials', description: 'Change passwords, revoke sessions, and review service accounts connected to the system.' },
      { title: 'Check for lateral movement', description: 'Review nearby servers, admin accounts, file shares, and backup systems.' }
    ],
    commonMistakes: [
      { title: 'Patching only Windows', description: 'VPN and firewall appliances are often more exposed than workstations.' },
      { title: 'Assuming no user click means no incident', description: 'Remote exploitation can start without phishing.' },
      { title: 'Leaving vendor access open', description: 'Temporary port forwards and admin panels often become permanent risk.' },
      { title: 'No useful logs', description: 'If edge logs roll over quickly, it becomes hard to know whether an exploit succeeded.' }
    ],
    ctrlShiftChecks: [
      { title: 'External attack surface review', description: 'We identify exposed services, product fingerprints, certificates, ports, and management panels.' },
      { title: 'Patch priority review', description: 'We prioritize internet-facing firewalls, VPNs, servers, and apps against current advisories.' },
      { title: 'Access control review', description: 'We confirm MFA, admin restrictions, service account scope, and source restrictions.' },
      { title: 'Log retention and alerting', description: 'We check whether logs are retained long enough to support a real investigation.' },
      { title: 'Backup and recovery exposure', description: 'We verify backup systems are not reachable from compromised paths without controls.' }
    ],
    faqs: [
      { q: 'What does remote exploitation mean?', a: 'It means a reachable service is abused through a software flaw or misconfiguration, often without a user opening an attachment or clicking a link.' },
      { q: 'Which systems should be patched first?', a: 'Prioritize internet-facing firewalls, VPN appliances, remote access portals, servers, and web applications.' },
      { q: 'How do I know what is exposed?', a: 'Use an external exposure review or scan, then compare the results to your firewall rules, DNS records, and business requirements.' },
      { q: 'Does MFA stop remote exploitation?', a: 'MFA helps with credential use, but it does not patch software flaws. Patching, exposure reduction, and logging are still required.' }
    ],
    relatedLinks: [
      NETWORK_GUIDE_LINKS[4],
      NETWORK_GUIDE_LINKS[2],
      NETWORK_GUIDE_LINKS[3],
      ENDPOINT_GUIDE_LINKS[3],
      ENDPOINT_GUIDE_LINKS[1],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'exposed-rdp-risk': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Exposed RDP starts with a firewall rule that forwards internet traffic to Remote Desktop on a server or workstation. Changing the public port does not make the service private; scanners can still find it.',
        'Once found, attackers try stolen passwords, password spraying, brute force, or known weaknesses in older systems. A successful RDP login gives interactive access, which is why the risk is higher than a normal web form.'
      ],
      bullets: [
        { title: 'Port forward to RDP', description: 'Traffic from the internet reaches a Windows Remote Desktop service directly.' },
        { title: 'Credential attempts', description: 'Attackers test reused passwords and common admin usernames.' },
        { title: 'Old server exposure', description: 'Unsupported or unpatched Windows systems increase the risk further.' }
      ]
    },
    attackerGoals: [
      { title: 'Interactive access', description: 'RDP gives the attacker a desktop-like session on an internal system.' },
      { title: 'Reach file shares and backups', description: 'The compromised system may have access to shared drives or backup consoles.' },
      { title: 'Deploy ransomware', description: 'RDP compromise is a common path for staging tools and encrypting shared data.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 16-person office opened RDP to a server during a remote-work rush. The port was changed and only two staff members knew the address. Months later, Windows logs show repeated failed logons for administrator-like usernames followed by a successful login from an unfamiliar IP.',
        'A safer response is to close direct exposure, move access behind VPN or a gateway with MFA, review local administrators, reset credentials, and inspect the server and nearby file shares for follow-on activity.'
      ]
    },
    signalsToCheck: [
      { title: 'Firewall NAT and port forward rules', description: 'Look for any public rule forwarding to RDP, including nonstandard ports.' },
      { title: 'Windows security logs', description: 'Review failed and successful logons, source IPs, usernames, and logon type.' },
      { title: 'Local admin membership', description: 'Check for new users, unexpected admin group changes, and stale vendor accounts.' },
      { title: 'Endpoint alerts', description: 'Look for suspicious remote tools, credential dumping, ransomware behavior, or disabled protections.' }
    ],
    firstSteps: [
      { title: 'Close public RDP exposure', description: 'Remove the port forward and verify externally that RDP is no longer reachable.' },
      { title: 'Review recent logons', description: 'Identify any successful sessions from unfamiliar IP addresses or accounts.' },
      { title: 'Reset credentials', description: 'Change passwords for accounts that used RDP and review local administrator membership.' },
      { title: 'Replace with safer access', description: 'Use VPN with MFA, a remote access gateway, or identity-aware access instead of direct exposure.' }
    ],
    commonMistakes: [
      { title: 'Assuming RDP is safe behind a port change', description: 'Obscurity reduces noise but does not create real access control.' },
      { title: 'Using shared admin accounts', description: 'Shared credentials make investigations and containment much harder.' },
      { title: 'No account lockout monitoring', description: 'Repeated failed logons should not be treated as normal background noise.' },
      { title: 'Leaving RDP rights too broad', description: 'Only users with a current business need should be allowed remote desktop access.' }
    ],
    ctrlShiftChecks: [
      { title: 'External RDP exposure validation', description: 'We confirm whether RDP is reachable directly or through nonstandard public ports.' },
      { title: 'Firewall rule cleanup', description: 'We remove stale rules and document safer remote access requirements.' },
      { title: 'Remote user and admin audit', description: 'We review who can log in through RDP and who has local administrator rights.' },
      { title: 'MFA-protected access design', description: 'We move remote access behind VPN, gateway, or zero-trust-style controls with MFA.' },
      { title: 'Server and backup review', description: 'We check whether exposed systems can reach sensitive file shares or backup systems.' }
    ],
    faqs: [
      { q: 'Is RDP safe behind a firewall?', a: 'RDP can be safe for internal or controlled remote access, but it should not be directly exposed to the internet through a simple port forward.' },
      { q: 'Should RDP ever be open to the internet?', a: 'For small businesses, direct public RDP is not a good practice. Use a VPN, remote desktop gateway, or identity-aware access with MFA.' },
      { q: 'What is safer than exposed RDP?', a: 'VPN with MFA, remote access gateways, managed remote support tools, and zero-trust access options are safer patterns when configured and monitored properly.' },
      { q: 'Does changing the RDP port help?', a: 'It may reduce automated noise, but scanners can still find the service. It is not a substitute for removing direct exposure.' }
    ],
    relatedLinks: [
      NETWORK_GUIDE_LINKS[1],
      NETWORK_GUIDE_LINKS[4],
      NETWORK_GUIDE_LINKS[3],
      ENDPOINT_GUIDE_LINKS[1],
      ENDPOINT_GUIDE_LINKS[4],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'firewall-misconfiguration-risk': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Firewall misconfiguration risk usually starts as an operational shortcut: a broad rule added during troubleshooting, a vendor port opened temporarily, a management interface exposed for convenience, or guest Wi-Fi placed on the same network as business systems.',
        'The firewall may be a capable device, but the rules no longer match the business. Attackers and malware benefit from unnecessary reachability, weak segmentation, and missing logs.'
      ],
      bullets: [
        { title: 'Stale port forward', description: 'A rule created for an old server or vendor project remains active.' },
        { title: 'Overly broad allow rule', description: 'A rule permits more source networks, destinations, or ports than required.' },
        { title: 'Exposed management', description: 'Admin panels for firewalls, NAS devices, cameras, or apps become reachable publicly.' }
      ]
    },
    attackerGoals: [
      { title: 'Find reachable systems', description: 'Broad rules can expose systems that should have remained internal.' },
      { title: 'Move inside the network', description: 'Weak segmentation can let one compromised device reach many others.' },
      { title: 'Avoid detection', description: 'Missing logs and undocumented changes make investigation slower.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 30-person office has a firewall rule named temporary vendor access. No one remembers the vendor, but the rule allows inbound traffic to an old server. Guest Wi-Fi also reaches printers and a file share because the original setup was flat.',
        'The fix is a rule-by-rule review: identify owners, remove stale port forwards, restrict admin access, separate guest traffic, back up the firewall configuration, and enable logging that someone can actually review.'
      ]
    },
    signalsToCheck: [
      { title: 'Inbound NAT and allow rules', description: 'Review every rule for owner, purpose, source, destination, port, and last review date.' },
      { title: 'Management interface exposure', description: 'Confirm firewall, NAS, camera, and application admin panels are not publicly reachable.' },
      { title: 'Inter-VLAN traffic', description: 'Check whether guests, phones, printers, servers, and workstations can reach each other unnecessarily.' },
      { title: 'Firewall logs', description: 'Verify denied and allowed events are captured for inbound, VPN, admin, and security events.' }
    ],
    firstSteps: [
      { title: 'Back up the configuration', description: 'Export the current firewall config before cleanup.' },
      { title: 'Remove obvious stale exposure', description: 'Disable unused port forwards and admin access rules first.' },
      { title: 'Tighten broad rules', description: 'Replace any-any or broad network rules with least-privilege source, destination, and port scopes.' },
      { title: 'Document the remaining rules', description: 'Every exception should have a business owner and review date.' }
    ],
    commonMistakes: [
      { title: 'Trusting ISP router defaults', description: 'Provider devices may not be configured for business segmentation, logging, or review.' },
      { title: 'No change documentation', description: 'If no one knows why a rule exists, cleanup becomes risky and slow.' },
      { title: 'Flat guest Wi-Fi', description: 'Guest networks should not reach business devices by default.' },
      { title: 'Logging everything but reviewing nothing', description: 'Logs are useful only if retained, searchable, and tied to response.' }
    ],
    ctrlShiftChecks: [
      { title: 'Firewall rule audit', description: 'We review inbound, outbound, NAT, VPN, and inter-network rules for necessity and scope.' },
      { title: 'Public exposure validation', description: 'We compare firewall rules with external scan results to confirm what is actually reachable.' },
      { title: 'Segmentation review', description: 'We check guest Wi-Fi, printers, phones, servers, and workstations for appropriate separation.' },
      { title: 'Management access hardening', description: 'We restrict admin panels to trusted networks or MFA-protected remote access.' },
      { title: 'Logging and configuration backup', description: 'We confirm useful logs are retained and the firewall config can be restored.' }
    ],
    faqs: [
      { q: 'What is a firewall misconfiguration?', a: 'It is a rule or setting that exposes more than intended, allows unnecessary traffic, weakens segmentation, or prevents useful monitoring.' },
      { q: 'How often should firewall rules be reviewed?', a: 'At least quarterly, and after vendor work, remote access changes, server changes, or office moves.' },
      { q: 'Are any-any rules always bad?', a: 'They are rarely appropriate long term. If one exists, it should have a documented reason, narrow scope, and review date.' },
      { q: 'Should guest Wi-Fi be separated?', a: 'Yes. Guest devices should not reach business workstations, servers, printers, or management interfaces unless there is a clear controlled need.' }
    ],
    relatedLinks: [
      NETWORK_GUIDE_LINKS[2],
      NETWORK_GUIDE_LINKS[4],
      NETWORK_GUIDE_LINKS[1],
      ENDPOINT_GUIDE_LINKS[3],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'vpn-attack-surface-small-business': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How the attack usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'VPN risk usually starts with a public login portal, old appliance firmware, missing MFA, stale user accounts, or overbroad internal access once connected. A VPN is intentionally exposed, so operational discipline matters.',
        'Attackers scan for VPN products, test credentials, and watch for known vulnerabilities. If they get in, they may look like a remote employee unless logs and policies say otherwise.'
      ],
      bullets: [
        { title: 'Missing MFA', description: 'Username and password alone is not enough for remote network access.' },
        { title: 'Old firmware', description: 'VPN appliances need security updates just like servers and laptops.' },
        { title: 'Stale accounts', description: 'Former staff and vendors often retain access longer than intended.' }
      ]
    },
    attackerGoals: [
      { title: 'Connect like a remote user', description: 'VPN access can place the attacker near internal systems.' },
      { title: 'Reach sensitive services', description: 'Once connected, broad access may expose file shares, RDP, admin panels, and apps.' },
      { title: 'Use credentials for lateral movement', description: 'VPN access can support credential theft and internal reconnaissance.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 45-person firm has a VPN created years ago for remote work. MFA was never added, firmware updates are ad hoc, and several former contractors still have accounts. Logs show repeated failed attempts from unfamiliar countries, but no one receives alerts.',
        'The practical fix is to patch the appliance, enforce MFA, remove stale accounts, restrict access by role, and review logs regularly. For some teams, a modern remote access gateway may be a better fit than a broad network VPN.'
      ]
    },
    signalsToCheck: [
      { title: 'VPN login logs', description: 'Review failed attempts, successful sessions, source locations, timing, and session duration.' },
      { title: 'Firmware and vendor advisories', description: 'Confirm the appliance is supported and current against security updates.' },
      { title: 'Account roster', description: 'Compare VPN users to current staff, vendors, and business needs.' },
      { title: 'Internal access after connection', description: 'Check what VPN users can reach once connected.' }
    ],
    firstSteps: [
      { title: 'Enable MFA', description: 'Require MFA for every VPN user, especially admins, vendors, and remote staff.' },
      { title: 'Patch the appliance', description: 'Apply supported firmware updates and review vendor security advisories.' },
      { title: 'Remove stale accounts', description: 'Disable former employee, contractor, and unused vendor access.' },
      { title: 'Limit reach', description: 'Restrict VPN users to the systems they need rather than the whole network.' }
    ],
    commonMistakes: [
      { title: 'Treating VPN as set-and-forget', description: 'VPN appliances need patching, account review, and log monitoring.' },
      { title: 'No MFA on remote access', description: 'Remote network access should not rely on passwords alone.' },
      { title: 'Giving VPN users full network access', description: 'Broad access increases the blast radius of one compromised account.' },
      { title: 'Ignoring failed login patterns', description: 'Repeated attempts can indicate password spraying or credential stuffing.' }
    ],
    ctrlShiftChecks: [
      { title: 'VPN posture review', description: 'We check firmware, support status, exposed portals, authentication settings, and encryption options.' },
      { title: 'MFA enforcement validation', description: 'We confirm MFA is required for all users and exceptions are documented.' },
      { title: 'Account and vendor access cleanup', description: 'We remove stale accounts and align access with current business roles.' },
      { title: 'Access scope testing', description: 'We verify what a VPN user can reach and reduce unnecessary internal access.' },
      { title: 'Log and alert review', description: 'We check whether VPN events are retained and monitored for suspicious patterns.' }
    ],
    faqs: [
      { q: 'Is VPN still safe for small businesses?', a: 'VPN can be safe when patched, protected with MFA, monitored, and restricted. The risk comes from old firmware, weak authentication, stale accounts, and broad access.' },
      { q: 'Does every VPN user need MFA?', a: 'Yes. Remote access should not rely on username and password alone.' },
      { q: 'How often should VPN accounts be reviewed?', a: 'Review at least monthly for small teams, and immediately during employee or vendor offboarding.' },
      { q: 'What should VPN users be allowed to access?', a: 'Only the systems needed for their role. Avoid giving every VPN user full network reach by default.' }
    ],
    relatedLinks: [
      NETWORK_GUIDE_LINKS[1],
      NETWORK_GUIDE_LINKS[2],
      NETWORK_GUIDE_LINKS[3],
      MICROSOFT_365_RELATED_LINKS[0],
      ENDPOINT_GUIDE_LINKS[1],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'edr-vs-antivirus': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How endpoint incidents usually start',
      icon: 'bi-play-circle',
      paragraphs: [
        'Endpoint incidents often start with phishing, a malicious attachment, a risky browser session, an unpatched app, or a stolen credential used on a workstation. Traditional antivirus may block known malware, but many incidents involve scripts, built-in tools, or suspicious behaviour rather than one obvious malicious file.',
        'EDR gives the business visibility into what happened on the device: process activity, file changes, network connections, user context, and containment options.'
      ],
      bullets: [
        { title: 'Known malware file', description: 'Antivirus is still useful for blocking recognized threats.' },
        { title: 'Suspicious behaviour', description: 'EDR focuses on activity patterns such as scripts, credential access, and lateral movement.' },
        { title: 'Investigation need', description: 'When something happens, EDR helps answer what ran, under which user, and what it touched.' }
      ]
    },
    attackerGoals: [
      { title: 'Run code on a device', description: 'The endpoint is where email, browser sessions, and business apps meet.' },
      { title: 'Steal credentials or tokens', description: 'Compromised endpoints can expose passwords, browser sessions, and cloud access.' },
      { title: 'Prepare for ransomware', description: 'Attackers may test tools, scan shares, and disable protections before encryption.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 20-person consulting firm has antivirus on laptops but no central endpoint visibility. One laptop runs suspicious PowerShell after a user opens a fake invoice. Antivirus does not flag the file because the activity uses built-in Windows tools.',
        'With EDR, the alert shows the parent process, script activity, user, network connections, and whether files were touched. The device can be isolated while the team checks Microsoft 365 sessions and resets credentials if needed.'
      ]
    },
    signalsToCheck: [
      { title: 'Process tree', description: 'Review what launched the suspicious process and what it launched next.' },
      { title: 'File activity', description: 'Look for mass changes, unusual extensions, or access to shared folders.' },
      { title: 'Credential access indicators', description: 'Check for tools touching browser data, LSASS, password stores, or token material.' },
      { title: 'Device coverage', description: 'Confirm all workstations and servers have healthy, reporting agents.' }
    ],
    firstSteps: [
      { title: 'Confirm coverage', description: 'Identify devices with no endpoint protection or stale agents.' },
      { title: 'Investigate the timeline', description: 'Use EDR telemetry to understand what ran and what it accessed.' },
      { title: 'Isolate if needed', description: 'Contain suspicious devices while preserving investigation access.' },
      { title: 'Review related identity activity', description: 'Check Microsoft 365 sign-ins and sessions for the affected user.' }
    ],
    commonMistakes: [
      { title: 'Assuming antivirus is enough', description: 'Antivirus blocks known threats; EDR adds behaviour detection and investigation.' },
      { title: 'No server coverage', description: 'Servers often hold the most valuable data and need endpoint visibility too.' },
      { title: 'No one reviews alerts', description: 'A dashboard without ownership is not a response capability.' },
      { title: 'Ignoring identity correlation', description: 'Endpoint compromise and Microsoft 365 compromise often overlap.' }
    ],
    ctrlShiftChecks: [
      { title: 'Endpoint coverage audit', description: 'We identify devices missing agents, stale agents, or disabled protections.' },
      { title: 'Alert quality review', description: 'We check whether alerts provide enough process, user, file, and network context.' },
      { title: 'Isolation capability test', description: 'We confirm suspicious devices can be isolated and later restored to service safely.' },
      { title: 'Server and high-risk user coverage', description: 'We prioritize servers, owners, finance, administrators, and client-data users.' },
      { title: 'Identity correlation', description: 'We compare endpoint alerts with Microsoft 365 sign-ins and mailbox activity.' }
    ],
    faqs: [
      { q: 'Do small businesses still need antivirus?', a: 'Yes. Antivirus remains a baseline control, but it should be part of a broader endpoint platform that includes behaviour monitoring and response.' },
      { q: 'Is EDR worth it for a small office?', a: 'For most 5-50 employee businesses, EDR is worth it because it improves detection, containment, and investigation when something suspicious happens.' },
      { q: 'What does EDR detect that antivirus misses?', a: 'EDR can flag suspicious scripts, unusual process chains, credential access, lateral movement, ransomware-like file activity, and risky network connections.' },
      { q: 'Does EDR replace user training?', a: 'No. EDR helps detect and respond, while training helps reduce risky clicks and encourages fast reporting.' }
    ],
    relatedLinks: [
      ENDPOINT_GUIDE_LINKS[1],
      ENDPOINT_GUIDE_LINKS[2],
      ENDPOINT_GUIDE_LINKS[4],
      MICROSOFT_365_RELATED_LINKS[2],
      IDENTITY_GUIDE_LINKS[1],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'mdr-vs-edr': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How detection gaps usually start',
      icon: 'bi-play-circle',
      paragraphs: [
        'The gap between EDR and MDR usually appears after the tool is installed. EDR may generate useful alerts, but no one has time, skill, or responsibility to triage them quickly.',
        'MDR adds human monitoring and response workflow. For small businesses, the value is practical: someone reviews suspicious behaviour, decides whether it matters, and escalates with recommended action.'
      ],
      bullets: [
        { title: 'Unowned alerts', description: 'Endpoint alerts exist, but no one checks them during busy days or after hours.' },
        { title: 'Alert fatigue', description: 'Too many low-value alerts cause important signals to be ignored.' },
        { title: 'Slow containment', description: 'Without authority and process, suspicious devices stay connected too long.' }
      ]
    },
    attackerGoals: [
      { title: 'Stay below the response threshold', description: 'Attackers benefit when alerts are delayed or dismissed.' },
      { title: 'Move before containment', description: 'The longer a device remains connected, the more time attackers have to access data or credentials.' },
      { title: 'Exploit small-team capacity', description: 'Small offices often lack dedicated analysts, especially outside business hours.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 32-person firm deploys EDR but routes alerts to a shared inbox. A suspicious credential access alert arrives Friday evening and is not reviewed until Monday. By then, the user has also had unusual Microsoft 365 sign-in activity.',
        'With MDR or MSP-led monitoring, the alert is triaged, the device is isolated, the user is contacted, and Microsoft 365 sessions are reviewed before the issue becomes a wider incident.'
      ]
    },
    signalsToCheck: [
      { title: 'Alert queue age', description: 'Review how long high and medium alerts sit before triage.' },
      { title: 'Escalation contacts', description: 'Confirm who receives urgent alerts and who can approve isolation.' },
      { title: 'Device isolation history', description: 'Check whether containment is actually used when needed.' },
      { title: 'False positive tuning', description: 'Repeated noisy alerts should be tuned so real issues are not buried.' }
    ],
    firstSteps: [
      { title: 'Assign alert ownership', description: 'Decide who reviews endpoint alerts and when.' },
      { title: 'Define escalation thresholds', description: 'Document when to isolate, call leadership, reset credentials, or involve incident response.' },
      { title: 'Validate contact paths', description: 'Make sure urgent alerts reach a person, not only a mailbox.' },
      { title: 'Connect endpoint and identity response', description: 'Endpoint alerts should trigger Microsoft 365 session and sign-in review where relevant.' }
    ],
    commonMistakes: [
      { title: 'Buying EDR without monitoring', description: 'The tool is only useful if someone owns triage and response.' },
      { title: 'No after-hours plan', description: 'Incidents often begin outside normal office hours.' },
      { title: 'Unclear authority to isolate', description: 'If no one can approve containment, response slows down.' },
      { title: 'Treating MDR as magic', description: 'MDR still needs accurate asset inventory, good contacts, and agreed response rules.' }
    ],
    ctrlShiftChecks: [
      { title: 'Monitoring ownership review', description: 'We confirm who triages alerts, who receives escalations, and what response authority exists.' },
      { title: 'EDR health and coverage', description: 'We check whether agents are installed, healthy, and assigned to the right users.' },
      { title: 'Escalation workflow test', description: 'We validate after-hours contacts and practical communication steps.' },
      { title: 'Response playbook alignment', description: 'We define what happens for malware, credential theft, ransomware behavior, and suspicious scripts.' },
      { title: 'Business impact controls', description: 'We balance fast containment with operational reality for clinics, law firms, and offices.' }
    ],
    faqs: [
      { q: 'What is the difference between EDR and MDR?', a: 'EDR is the endpoint detection technology. MDR adds human monitoring, triage, investigation, escalation, and sometimes containment actions.' },
      { q: 'Do small businesses need MDR?', a: 'If no one internally reviews alerts consistently, MDR or MSP-led monitoring is often a practical improvement.' },
      { q: 'Can MDR isolate a device?', a: 'Many MDR arrangements can recommend or perform isolation, but authority and process should be agreed before an incident.' },
      { q: 'Is MDR only for large companies?', a: 'No. Small businesses often benefit because they do not have internal security staff watching endpoint alerts.' }
    ],
    relatedLinks: [
      ENDPOINT_GUIDE_LINKS[0],
      ENDPOINT_GUIDE_LINKS[2],
      ENDPOINT_GUIDE_LINKS[4],
      MICROSOFT_365_RELATED_LINKS[2],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'endpoint-isolation-explained': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'When endpoint isolation usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Endpoint isolation usually starts after a security tool or analyst sees behavior that could spread, steal credentials, or damage data. The trigger might be ransomware-like file changes, suspicious scripts, credential access, or network scanning.',
        'Isolation is a containment step. It limits network communication while often preserving the management channel needed to investigate the device.'
      ],
      bullets: [
        { title: 'Ransomware-like activity', description: 'Rapid file changes or encryption patterns may require immediate containment.' },
        { title: 'Credential theft signals', description: 'Attempts to access browser sessions or password material may justify isolation.' },
        { title: 'Internal scanning', description: 'A workstation probing many systems may be looking for targets.' }
      ]
    },
    attackerGoals: [
      { title: 'Spread to other systems', description: 'Attackers may try to reach file shares, servers, or peer devices.' },
      { title: 'Keep command access', description: 'Suspicious processes may continue contacting external infrastructure.' },
      { title: 'Access credentials', description: 'A compromised endpoint may expose cloud and local credentials.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A front-desk workstation in a clinic begins making rapid file changes in a shared folder. The endpoint tool also sees unusual script activity. Instead of powering the machine off immediately, the device is isolated so it cannot reach shared folders while telemetry remains available.',
        'The team reviews what happened, resets the user’s Microsoft 365 sessions, checks backups, and decides whether to rebuild the device. The short disruption to one workstation helps avoid a wider outage.'
      ]
    },
    signalsToCheck: [
      { title: 'Isolation trigger alert', description: 'Review the exact detection that caused isolation and the confidence level.' },
      { title: 'Process and file timeline', description: 'Identify what ran, what files changed, and whether shared folders were touched.' },
      { title: 'Network connections', description: 'Check internal scanning and external destinations before and after isolation.' },
      { title: 'User and identity activity', description: 'Review Microsoft 365 sessions and sign-ins for the user on the isolated device.' }
    ],
    firstSteps: [
      { title: 'Keep the device powered on if safe', description: 'Isolation often preserves evidence better than immediately shutting down.' },
      { title: 'Confirm business impact', description: 'Identify what workflow the user loses and provide a temporary replacement if needed.' },
      { title: 'Review credentials', description: 'Reset passwords or revoke sessions if the device may have exposed identity material.' },
      { title: 'Decide rebuild or release', description: 'Use evidence to choose whether the endpoint can be cleaned, released, rebuilt, or replaced.' }
    ],
    commonMistakes: [
      { title: 'Waiting too long to isolate', description: 'Containment loses value if suspicious activity continues spreading.' },
      { title: 'Powering off without preserving evidence', description: 'Immediate shutdown can remove useful volatile context in some cases.' },
      { title: 'No authority defined', description: 'Teams should know who can isolate devices before an incident.' },
      { title: 'Forgetting credential response', description: 'A contained device may still have exposed passwords or tokens.' }
    ],
    ctrlShiftChecks: [
      { title: 'Isolation capability test', description: 'We verify the endpoint tool can isolate and release devices reliably.' },
      { title: 'Approval and escalation workflow', description: 'We document who can isolate and who must be notified.' },
      { title: 'Telemetry completeness', description: 'We confirm process, file, user, and network context remains available during isolation.' },
      { title: 'Backup and rebuild path', description: 'We check whether the business can restore files and rebuild devices cleanly.' },
      { title: 'Identity response tie-in', description: 'We pair isolation with Microsoft 365 session revocation where appropriate.' }
    ],
    faqs: [
      { q: 'What does endpoint isolation do?', a: 'It cuts off most network communication from a suspicious device while usually keeping security management access available for investigation.' },
      { q: 'Is endpoint isolation the same as wiping a device?', a: 'No. Isolation contains the device. Wiping or rebuilding is a later recovery decision.' },
      { q: 'When should a device be isolated?', a: 'Common triggers include ransomware-like file changes, credential theft alerts, suspicious scripts, or internal scanning.' },
      { q: 'Can the user keep working during isolation?', a: 'Usually not on that device. The business should provide a temporary workflow while the investigation continues.' }
    ],
    relatedLinks: [
      ENDPOINT_GUIDE_LINKS[0],
      ENDPOINT_GUIDE_LINKS[1],
      ENDPOINT_GUIDE_LINKS[4],
      MICROSOFT_365_RELATED_LINKS[3],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'patch-management-basics': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How patch-related incidents usually start',
      icon: 'bi-play-circle',
      paragraphs: [
        'Patch-related incidents usually start when a known vulnerability remains open after a fix is available. Attackers and automated tools often move quickly once a vulnerability becomes public, especially for internet-facing systems.',
        'Small businesses often patch Windows but forget browsers, PDF tools, VPN clients, firewall firmware, NAS devices, and line-of-business applications. Those gaps matter because attackers target the full environment, not only Windows Update.'
      ],
      bullets: [
        { title: 'Known vulnerability', description: 'A public advisory explains a weakness and a patch exists.' },
        { title: 'Delayed restart', description: 'Updates may download but not apply because devices never restart.' },
        { title: 'Forgotten firmware', description: 'VPNs, firewalls, and NAS devices often fall outside normal workstation patching.' }
      ]
    },
    attackerGoals: [
      { title: 'Exploit known weaknesses', description: 'Known vulnerabilities are attractive because defenders have already been told what to fix.' },
      { title: 'Target exposed systems first', description: 'Internet-facing VPNs, firewalls, and remote services are high-value targets.' },
      { title: 'Use one device as a foothold', description: 'An unpatched laptop or server can lead to credential theft, lateral movement, or ransomware.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 25-person accounting firm has monthly Windows updates, but its VPN appliance firmware is two years behind. During tax season, a vendor advisory becomes urgent and remote access has to be patched during business hours because no maintenance window or tested backup config exists.',
        'A better approach is a patch calendar, separate priority path for critical exposed systems, reporting for failed updates, and planned firmware maintenance outside peak business periods.'
      ]
    },
    signalsToCheck: [
      { title: 'Patch compliance reports', description: 'Review which devices are current, failed, pending reboot, or missing from reporting.' },
      { title: 'Browser and application versions', description: 'Check browsers, Office apps, PDF tools, VPN clients, and business apps.' },
      { title: 'Firmware versions', description: 'Compare firewalls, VPNs, NAS devices, and switches against vendor-supported releases.' },
      { title: 'Unsupported systems', description: 'Identify operating systems and applications that no longer receive security updates.' }
    ],
    firstSteps: [
      { title: 'Inventory systems and apps', description: 'Know what endpoints, servers, appliances, and business applications need updates.' },
      { title: 'Prioritize internet-facing systems', description: 'Patch VPNs, firewalls, remote access, and exposed servers before lower-risk systems.' },
      { title: 'Schedule restarts', description: 'Updates that never reboot are not finished.' },
      { title: 'Track failures', description: 'Follow up on devices that repeatedly fail updates or stop reporting.' }
    ],
    commonMistakes: [
      { title: 'Patching only Windows', description: 'Browsers, apps, VPNs, firewalls, and firmware also need security updates.' },
      { title: 'No testing for business apps', description: 'Critical accounting, clinic, and legal apps may need a small pilot before broad rollout.' },
      { title: 'No maintenance windows', description: 'Unplanned updates during busy periods create avoidable disruption.' },
      { title: 'No reporting', description: 'If no one can show patch status, the business is guessing.' }
    ],
    ctrlShiftChecks: [
      { title: 'Patch coverage report', description: 'We review OS, browser, app, server, firewall, VPN, and firmware patch status.' },
      { title: 'Critical exposure priority', description: 'We identify urgent updates for internet-facing systems separately from routine patching.' },
      { title: 'Restart and failure tracking', description: 'We check pending reboots, failed updates, and devices that stopped reporting.' },
      { title: 'Business app compatibility', description: 'We plan testing for apps where updates could affect billing, scheduling, or deadlines.' },
      { title: 'Unsupported technology plan', description: 'We flag systems that need replacement, isolation, or compensating controls.' }
    ],
    faqs: [
      { q: 'How often should small businesses patch?', a: 'Monthly is a practical baseline for routine updates, with faster action for critical vulnerabilities on internet-facing systems.' },
      { q: 'Do firewalls and VPNs need patching?', a: 'Yes. Edge appliances are often more exposed than workstations and should be treated as security-priority systems.' },
      { q: 'Should patches be tested?', a: 'For standard workstations, staged rollout is often enough. For critical business apps and servers, testing is important before broad deployment.' },
      { q: 'What if a device cannot be patched?', a: 'Plan replacement, isolate it, reduce access, monitor it closely, and document the business reason until it can be removed.' }
    ],
    relatedLinks: [
      ENDPOINT_GUIDE_LINKS[0],
      ENDPOINT_GUIDE_LINKS[4],
      NETWORK_GUIDE_LINKS[1],
      NETWORK_GUIDE_LINKS[4],
      MICROSOFT_365_RELATED_LINKS[2],
      ALL_SECURITY_HUB_LINK
    ]
  },
  'ransomware-behavior-endpoints': {
    howAttackStarts: {
      id: 'how-it-starts',
      title: 'How ransomware activity usually starts',
      icon: 'bi-play-circle',
      paragraphs: [
        'Ransomware activity often starts before files are encrypted. The early stage may involve phishing, credential theft, exposed remote access, an unpatched system, or a compromised endpoint running scripts and discovery tools.',
        'On endpoints, the useful signals are behavior-based: unusual file changes, suspicious processes, credential access, network scanning, attempts to disable protections, and access to backup locations.'
      ],
      bullets: [
        { title: 'Initial compromise', description: 'Phishing, VPN abuse, exposed RDP, or unpatched systems provide the first foothold.' },
        { title: 'Discovery', description: 'Attackers look for shares, servers, backups, and accounts with useful permissions.' },
        { title: 'Encryption preparation', description: 'Tools may stop services, delete shadows, or test file access before mass encryption.' }
      ]
    },
    attackerGoals: [
      { title: 'Encrypt useful data', description: 'Shared drives, servers, synced folders, and business databases are common targets.' },
      { title: 'Disable recovery options', description: 'Attackers may try to delete snapshots or reach backup consoles.' },
      { title: 'Increase pressure', description: 'Downtime and uncertainty create leverage, which is why tested recovery matters.' }
    ],
    smallBusinessScenario: {
      id: 'small-business-scenario',
      title: 'What it looks like in a real small business',
      icon: 'bi-building',
      paragraphs: [
        'A 38-person engineering office sees an endpoint alert for rapid file modifications from one workstation. The user reports the device became slow after opening a project-related attachment. The workstation has access to several shared folders.',
        'The response is to isolate the device, stop sync if needed, review file changes, confirm backup restore points, reset exposed credentials, and check whether other devices show similar process or network activity.'
      ]
    },
    signalsToCheck: [
      { title: 'Mass file changes', description: 'Look for rapid renames, new extensions, encrypted-looking files, or unusual writes to shares.' },
      { title: 'Suspicious process behavior', description: 'Review scripts, command shells, archive tools, remote tools, and unexpected service stops.' },
      { title: 'Credential and network activity', description: 'Check for credential access attempts, internal scanning, and connections to many hosts.' },
      { title: 'Backup access attempts', description: 'Review whether backup consoles, repositories, or snapshots were touched.' }
    ],
    firstSteps: [
      { title: 'Isolate suspicious devices', description: 'Contain devices showing ransomware-like behavior while preserving telemetry.' },
      { title: 'Protect backups', description: 'Confirm backups are intact, separated from normal user access, and not being modified.' },
      { title: 'Reset affected credentials', description: 'Revoke sessions and reset passwords for users or admins exposed by the device.' },
      { title: 'Scope before restoring', description: 'Identify entry point and spread before reconnecting devices or restoring files.' }
    ],
    commonMistakes: [
      { title: 'Waiting for encryption to be obvious', description: 'Early behavior often appears before the final damage.' },
      { title: 'Not testing restore', description: 'Backups that have never been restored are assumptions, not recovery plans.' },
      { title: 'Everyone has broad file access', description: 'Excess permissions let one compromised user affect too many folders.' },
      { title: 'Ignoring remote access paths', description: 'RDP, VPN, and unpatched edge systems are common ransomware entry points.' }
    ],
    ctrlShiftChecks: [
      { title: 'EDR/MDR ransomware signal review', description: 'We confirm behavior detections are active and alerts reach someone who can act.' },
      { title: 'Backup and restore validation', description: 'We check backup coverage, separation, retention, and recent restore tests.' },
      { title: 'Permission review', description: 'We identify users with excessive write access to shared data.' },
      { title: 'Remote access and patch posture', description: 'We review exposed RDP, VPN MFA, firewall firmware, and patch gaps.' },
      { title: 'Incident response workflow', description: 'We define isolation, communication, credential reset, and restoration steps.' }
    ],
    faqs: [
      { q: 'What are early signs of ransomware on an endpoint?', a: 'Rapid file changes, suspicious scripts, attempts to disable protections, credential access alerts, and internal scanning are common early signs.' },
      { q: 'Should we shut down a suspicious device?', a: 'Often isolation is better because it limits spread while preserving investigation data. Follow your incident response process or MSP guidance.' },
      { q: 'Do backups prevent ransomware?', a: 'Backups do not prevent ransomware, but protected and tested backups reduce downtime and improve recovery options.' },
      { q: 'What controls reduce ransomware risk most?', a: 'EDR/MDR, tested backups, least privilege, patching, MFA, secure remote access, and user reporting work best together.' }
    ],
    relatedLinks: [
      ENDPOINT_GUIDE_LINKS[1],
      ENDPOINT_GUIDE_LINKS[2],
      ENDPOINT_GUIDE_LINKS[3],
      MICROSOFT_365_RELATED_LINKS[3],
      NETWORK_GUIDE_LINKS[2],
      NETWORK_GUIDE_LINKS[4],
      ALL_SECURITY_HUB_LINK
    ]
  }
};

const GUIDE_RELATED_LINK_DEFAULTS: Record<string, ReadonlyArray<SecurityGuideLink>> = {
  'remote-exploitation-attacks': SECURITY_GUIDE_EXPANSIONS['remote-exploitation-attacks'].relatedLinks,
  'firewall-misconfiguration-risk': SECURITY_GUIDE_EXPANSIONS['firewall-misconfiguration-risk'].relatedLinks,
  'vpn-attack-surface-small-business': SECURITY_GUIDE_EXPANSIONS['vpn-attack-surface-small-business'].relatedLinks,
  'mdr-vs-edr': SECURITY_GUIDE_EXPANSIONS['mdr-vs-edr'].relatedLinks,
  'endpoint-isolation-explained': SECURITY_GUIDE_EXPANSIONS['endpoint-isolation-explained'].relatedLinks,
  'patch-management-basics': SECURITY_GUIDE_EXPANSIONS['patch-management-basics'].relatedLinks,
  'ransomware-behavior-endpoints': SECURITY_GUIDE_EXPANSIONS['ransomware-behavior-endpoints'].relatedLinks
};

function mergeGuideExpansion(guide: SecurityStarterGuide): SecurityStarterGuide {
  const expansion = SECURITY_GUIDE_EXPANSIONS[guide.slug];
  if (!expansion) {
    return {
      ...guide,
      relatedLinks: GUIDE_RELATED_LINK_DEFAULTS[guide.slug] ?? guide.relatedLinks
    };
  }

  return {
    ...guide,
    ...expansion,
    relatedLinks: expansion.relatedLinks
  };
}

export function findSecurityGuideBySlug(
  hubSlug: string | null | undefined,
  guideSlug: string | null | undefined
): SecurityStarterGuide | undefined {
  const guide = SECURITY_STARTER_GUIDES.find(
    (guide) => guide.hubSlug === hubSlug && guide.slug === guideSlug
  );
  return guide ? mergeGuideExpansion(guide) : undefined;
}

