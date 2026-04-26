import { RenderMode, ServerRoute } from '@angular/ssr';

const BLOG_SLUGS = [
  'managed-it-benefits',
  'google-workspace-guide',
  'microsoft-365-tips',
  'office-networking-basics',
  'aws-infrastructure-best-practices',
  'firewall-security-essentials',
  'crisis-recovery-plan',
  'web-development-gta',
  'seo-visibility-guide',
  'lead-generation-strategies',
  'post-quantum-small-business',
  'managed-it-cost-toronto',
  'cyber-insurance-requirements-canada',
  'it-support-law-firms-toronto-guide',
  'ransomware-protection-toronto',
  'managed-it-vs-break-fix-gta',
];

const SECURITY_SUBCATEGORY_SLUGS = ['identity-attacks', 'network-attacks', 'endpoint-security'];

const SECURITY_GUIDE_PARAMS = [
  { subcategory: 'identity-attacks', guideSlug: 'password-spray-attacks' },
  { subcategory: 'identity-attacks', guideSlug: 'token-theft-attacks' },
  { subcategory: 'identity-attacks', guideSlug: 'legacy-authentication-risk' },
  { subcategory: 'identity-attacks', guideSlug: 'business-email-compromise' },
  { subcategory: 'network-attacks', guideSlug: 'ddos-attacks-small-business' },
  { subcategory: 'network-attacks', guideSlug: 'port-scanning-risk' },
  { subcategory: 'network-attacks', guideSlug: 'remote-exploitation-attacks' },
  { subcategory: 'network-attacks', guideSlug: 'man-in-the-middle-attacks-small-business' },
  { subcategory: 'network-attacks', guideSlug: 'rogue-wifi-risk' },
  { subcategory: 'network-attacks', guideSlug: 'exposed-rdp-risk' },
  { subcategory: 'network-attacks', guideSlug: 'firewall-misconfiguration-risk' },
  { subcategory: 'network-attacks', guideSlug: 'vpn-attack-surface-small-business' },
  { subcategory: 'network-attacks', guideSlug: 'dns-attack-risk-small-business' },
  { subcategory: 'network-attacks', guideSlug: 'lateral-movement-risk' },
  { subcategory: 'endpoint-security', guideSlug: 'edr-vs-antivirus' },
  { subcategory: 'endpoint-security', guideSlug: 'mdr-vs-edr' },
  { subcategory: 'endpoint-security', guideSlug: 'endpoint-isolation-explained' },
  { subcategory: 'endpoint-security', guideSlug: 'patch-management-basics' },
  { subcategory: 'endpoint-security', guideSlug: 'ransomware-behavior-endpoints' },
];

export const serverRoutes: ServerRoute[] = [
  // Home
  { path: '', renderMode: RenderMode.Prerender },

  // Blog
  { path: 'blog', renderMode: RenderMode.Prerender },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return BLOG_SLUGS.map((slug) => ({ slug }));
    },
  },

  // Services
  { path: 'managed-it-services', renderMode: RenderMode.Prerender },
  { path: 'google-workspace', renderMode: RenderMode.Prerender },
  { path: 'microsoft-365', renderMode: RenderMode.Prerender },
  { path: 'office-networking', renderMode: RenderMode.Prerender },
  { path: 'aws-infrastructure', renderMode: RenderMode.Prerender },
  { path: 'security-firewall', renderMode: RenderMode.Prerender },
  { path: 'crisis-recovery', renderMode: RenderMode.Prerender },
  { path: 'ai-integration', renderMode: RenderMode.Prerender },
  { path: 'web-development', renderMode: RenderMode.Prerender },
  { path: 'seo-visibility', renderMode: RenderMode.Prerender },
  { path: 'lead-generation', renderMode: RenderMode.Prerender },
  { path: 'cyber-insurance-readiness-vaughan', renderMode: RenderMode.Prerender },
  { path: 'services/security-baseline-assessment', renderMode: RenderMode.Prerender },
  { path: 'managed-it-for-medical-clinics-vaughan', renderMode: RenderMode.Prerender },

  // City pages (your existing ones)
  { path: 'managed-it-services-vaughan', renderMode: RenderMode.Prerender },
  { path: 'managed-it-services-toronto', renderMode: RenderMode.Prerender },
  { path: 'managed-it-services-mississauga', renderMode: RenderMode.Prerender },
  { path: 'managed-it-services-thornhill', renderMode: RenderMode.Prerender },
  { path: 'managed-it-services-richmond-hill', renderMode: RenderMode.Prerender },

  // IT Support spoke pages
  { path: 'it-support-vaughan', renderMode: RenderMode.Prerender },
  { path: 'it-support-mississauga', renderMode: RenderMode.Prerender },

  // Service + location pages
  { path: 'cybersecurity-services-vaughan', renderMode: RenderMode.Prerender },
  { path: 'cloud-services-vaughan', renderMode: RenderMode.Prerender },

  // Guides (hub + category index + how-to pages)
  { path: 'guides', renderMode: RenderMode.Prerender },
  { path: 'guides/security', renderMode: RenderMode.Prerender },
  { path: 'guides/security/microsoft-365-security', renderMode: RenderMode.Prerender },
  { path: 'guides/security/microsoft-365-security/microsoft-365-checklist', renderMode: RenderMode.Prerender },
  { path: 'guides/security/microsoft-365-security/phishing-protection', renderMode: RenderMode.Prerender },
  { path: 'guides/security/microsoft-365-security/conditional-access-small-business', renderMode: RenderMode.Prerender },
  { path: 'guides/security/microsoft-365-security/mfa-rollout-small-business', renderMode: RenderMode.Prerender },
  { path: 'guides/security/microsoft-365-security/microsoft-365-backup-small-business', renderMode: RenderMode.Prerender },
  {
    path: 'guides/security/:subcategory',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SECURITY_SUBCATEGORY_SLUGS.map((subcategory) => ({ subcategory }));
    },
  },
  {
    path: 'guides/security/:subcategory/:guideSlug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SECURITY_GUIDE_PARAMS;
    },
  },

  // About & utility pages
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'it-assessment', renderMode: RenderMode.Prerender },
  { path: 'free-security-assessment', renderMode: RenderMode.Prerender },
  { path: 'office-it-relocation', renderMode: RenderMode.Prerender },

  // Industry pages
  { path: 'it-support-law-firms-toronto', renderMode: RenderMode.Prerender },
  { path: 'it-support-accounting-firms-gta', renderMode: RenderMode.Prerender },
  { path: 'it-support-medical-clinics-ontario', renderMode: RenderMode.Prerender },
  { path: 'it-support-engineering-firms-toronto', renderMode: RenderMode.Prerender },
  { path: 'it-support-small-businesses-gta', renderMode: RenderMode.Prerender },

  // Fallback (keep last)
  { path: '**', renderMode: RenderMode.Client }
];
