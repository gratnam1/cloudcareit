import type { BlogPostMeta } from './blog.types';

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: 'managed-it-benefits',
    title: 'Managed IT Services for Growing Offices: A Practical Operating Model',
    seoTitle: 'Managed IT for Small Offices',
    excerpt: 'A practical framework for reducing downtime, improving security posture, and making IT costs predictable.',
    date: '2026-02-14',
    tags: ['Managed IT', 'Operations']
  },
  {
    slug: 'google-workspace-guide',
    title: 'Google Workspace Administration for SMBs: Security, Structure, and Scale',
    seoTitle: 'Google Workspace Admin for SMBs',
    excerpt: 'Shared Drive governance, identity controls, and scalable admin workflows for growing teams.',
    date: '2026-02-14',
    tags: ['Google Workspace', 'Security']
  },
  {
    slug: 'microsoft-365-tips',
    title: 'Microsoft 365 Security and Operations: The Baseline Every Office Needs',
    seoTitle: 'M365 Security Baseline for SMBs',
    excerpt: 'A phased baseline for identity hardening, mail security, and SharePoint governance.',
    date: '2026-02-14',
    tags: ['Microsoft 365', 'Security']
  },
  {
    slug: 'office-networking-basics',
    title: 'Office Network & Wi-Fi Design Guide',
    excerpt: 'Learn how to design a reliable office network with proper segmentation, managed switches, and access-point placement. Practical guidance for GTA businesses from CtrlShift IT Services.',
    date: '2026-02-14',
    tags: ['Networking', 'Wi-Fi']
  },
  {
    slug: 'aws-infrastructure-best-practices',
    title: 'AWS Infrastructure for SMBs: Security, Cost Control, and Operational Discipline',
    seoTitle: 'AWS Infrastructure Guide for SMBs',
    excerpt: 'A cloud baseline for account design, least privilege, backup readiness, and spend governance.',
    date: '2026-02-14',
    tags: ['AWS', 'Cloud']
  },
  {
    slug: 'firewall-security-essentials',
    title: 'Firewall and Security Baselines for SMB Offices: Practical Defense Without Hype',
    seoTitle: 'SMB Firewall and Security Baseline',
    excerpt: 'How to combine firewall policy, endpoint controls, and identity hardening in a workable security model.',
    date: '2026-02-14',
    tags: ['Security', 'Firewall']
  },
  {
    slug: 'crisis-recovery-plan',
    title: 'Crisis Recovery for SMBs: How to Restore Operations After a Major IT Incident',
    seoTitle: 'IT Crisis Recovery Plan for SMBs',
    excerpt: 'A business-first recovery process with containment, restore testing, and post-incident hardening.',
    date: '2026-02-14',
    tags: ['Recovery', 'Continuity']
  },
  {
    slug: 'web-development-gta',
    title: 'Web Development for GTA Businesses',
    excerpt: 'How service businesses in the GTA can build faster, higher-converting websites — covering Core Web Vitals, mobile UX, trust signals, and page structure that turns visitors into leads.',
    date: '2026-02-14',
    tags: ['Web Development', 'Performance']
  },
  {
    slug: 'seo-visibility-guide',
    title: 'Local SEO Playbook for GTA IT Firms',
    excerpt: 'A local SEO playbook for IT service companies in Vaughan, Toronto, and the GTA — covering technical fixes, Google Business Profile, content architecture, and citation building.',
    date: '2026-02-14',
    tags: ['SEO', 'Local Search']
  },
  {
    slug: 'lead-generation-strategies',
    title: 'B2B Lead Generation for IT Services: Building a Funnel That Produces Qualified Opportunities',
    seoTitle: 'B2B Lead Generation for Small Firms',
    excerpt: 'How to align targeting, offers, landing pages, and follow-up workflows for better lead quality.',
    date: '2026-02-14',
    tags: ['Lead Generation', 'B2B']
  },
  {
    slug: 'post-quantum-small-business',
    title: 'Post-Quantum Security for Small Businesses',
    excerpt: 'What PQC means, what to do now, and how to plan upgrades.',
    date: '2026-02-06',
    tags: ['Security', 'PQC'],
    loadComponent: () =>
      import('../posts/post-quantum-small-business/post-quantum-small-business.component')
        .then((m) => m.PostQuantumSmallBusinessComponent)
  },
  {
    slug: 'managed-it-cost-toronto',
    title: 'How Much Does Managed IT Cost in Toronto? (2026 Guide)',
    seoTitle: 'Managed IT Cost for SMBs in Toronto',
    excerpt: 'A clear, honest breakdown of managed IT pricing in Toronto and the GTA — what you should pay, what\'s included, and what red flags to watch for.',
    date: '2026-03-10',
    tags: ['Managed IT', 'Pricing', 'Toronto']
  },
  {
    slug: 'cyber-insurance-requirements-canada',
    title: 'Cyber Insurance Requirements for Canadian Businesses in 2026',
    seoTitle: 'Cyber Insurance for Canadian SMBs',
    excerpt: 'What your insurer now requires before issuing a policy: MFA, endpoint detection, backup verification, and more — explained in plain English.',
    date: '2026-03-11',
    tags: ['Cyber Insurance', 'Security', 'Canada']
  },
  {
    slug: 'it-support-law-firms-toronto-guide',
    title: 'Best IT Support for Law Firms in Toronto: What to Look For',
    seoTitle: 'IT Support for Law Firms Toronto',
    excerpt: 'How to evaluate managed IT providers for a law firm — Law Society compliance, confidentiality controls, and why cybersecurity-first matters.',
    date: '2026-03-12',
    tags: ['Law Firms', 'Managed IT', 'Toronto']
  },
  {
    slug: 'ransomware-protection-toronto',
    title: 'How to Protect Your GTA Business from Ransomware in 2026',
    seoTitle: 'Ransomware Protection Vaughan Small Business',
    excerpt: 'The top ransomware entry vectors targeting Ontario SMBs and the exact controls that stop them — endpoint detection, zero-trust access, and tested backups.',
    date: '2026-03-13',
    tags: ['Ransomware', 'Security', 'GTA']
  },
  {
    slug: 'managed-it-vs-break-fix-gta',
    title: 'Managed IT vs Break-Fix IT: Which Is Right for Your GTA Business?',
    seoTitle: 'Managed IT vs Break-Fix for SMBs',
    excerpt: 'A clear comparison of proactive managed IT versus reactive break-fix support — costs, risks, response times, and which model makes sense for 5–50 person offices.',
    date: '2026-03-14',
    tags: ['Managed IT', 'Break-Fix', 'GTA']
  }
];
