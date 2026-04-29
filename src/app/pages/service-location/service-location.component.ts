import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';

type FaqItem = { q: string; a: string };
type SectionItem = { heading: string; body: string };
type ContextualLink = { label: string; path: string; text: string };

type FocusCard = { title: string; body: string; icon: string };
type ScenarioCard = { label: string; body: string };
type MapRow = { area: string; risk: string; check: string; icon: string };
type ProcessStep = { step: string; title: string; body: string };
type Deliverable = { title: string; body: string; icon: string };
type RelatedLink = { label: string; path: string; description: string };

export type ServiceLocationContent = {
  title: string;
  canonicalPath: string;
  city: string;
  region: string;
  serviceType: string; // e.g. "Cybersecurity Services" | "Cloud Services"
  mainHeading: string;
  intro: string;
  metaDescription: string;
  kicker: string;
  sections: SectionItem[];
  features: string[];
  hubPath: string;
  hubLabel: string;
  faq: FaqItem[];
  localCaseStudy?: { title: string; outcome: string; industry: string };
  serviceDeliveryMethod?: { title: string; details: string }[];
  contextualLink?: ContextualLink;
  // Phase 3 deeper-content fields
  focusLabel?: string;
  focusHeading?: string;
  focusIntro?: string;
  focusCards?: FocusCard[];
  scenariosLabel?: string;
  scenariosHeading?: string;
  scenariosIntro?: string;
  scenarios?: ScenarioCard[];
  mapLabel?: string;
  mapHeading?: string;
  mapIntro?: string;
  mapColumns?: { area: string; risk: string; check: string };
  mapRows?: MapRow[];
  processLabel?: string;
  processHeading?: string;
  processIntro?: string;
  processSteps?: ProcessStep[];
  deliverablesLabel?: string;
  deliverablesHeading?: string;
  deliverablesIntro?: string;
  deliverables?: Deliverable[];
  relatedLabel?: string;
  relatedHeading?: string;
  relatedIntro?: string;
  relatedLinks?: RelatedLink[];
};

export const SERVICE_LOCATION_CONTENT: Record<string, ServiceLocationContent> = {
  'cybersecurity-vaughan': {
    title: 'Cybersecurity Services Vaughan | CtrlShift IT Services',
    canonicalPath: '/cybersecurity-services-vaughan',
    city: 'Vaughan',
    region: 'York Region',
    serviceType: 'Cybersecurity Services',
    mainHeading: 'Cybersecurity Services Vaughan',
    kicker: 'Security-first IT for York Region small businesses',
    intro:
      'Practical cybersecurity for Vaughan small businesses — Microsoft 365 hardening, endpoint protection, firewall and remote access, email and phishing controls, backup readiness, and the technical evidence cyber insurers ask for.',
    metaDescription:
      'Local Vaughan cybersecurity services for small businesses — Microsoft 365 hardening, EDR, firewall, email security, backup readiness, and cyber insurance controls.',
    sections: [
      {
        heading: 'Built for small Vaughan businesses, not enterprise security teams',
        body: 'Most Vaughan offices we meet — accountants, lawyers, clinics, trades, construction back-offices — do not have a dedicated IT or security team. They have Microsoft 365, a few laptops, a printer/router, maybe a server, and staff who need things to just work. Our cybersecurity engagements are built around that reality, not around enterprise SOC catalogues.',
      },
      {
        heading: 'A security baseline you can actually explain',
        body: 'After our review, you should be able to answer the core questions an insurer or client will ask: who has admin access, is MFA enforced, what is on each laptop, where do backups live, and who responds when something goes wrong. We aim for documented, defensible answers — not a stack of acronyms.',
      },
    ],
    features: [
      'Microsoft 365 identity and admin role review',
      'MFA enforcement and conditional access',
      'Endpoint protection / EDR rollout',
      'Firewall and remote access review',
      'Email authentication (SPF, DKIM, DMARC)',
      'Backup and restore readiness check',
      'Onboarding/offboarding security checklist',
      'Cyber insurance questionnaire support',
    ],
    contextualLink: {
      label: 'cyber insurance readiness for Vaughan businesses',
      path: '/cyber-insurance-readiness-vaughan',
      text: 'For businesses renewing cyber insurance, CtrlShift IT Services can also review the technical controls insurers commonly ask about, including MFA, EDR, backups, firewall exposure, and documentation.'
    },
    hubPath: '/managed-it-services-vaughan',
    hubLabel: 'Managed IT Services Vaughan',

    focusLabel: 'What we protect',
    focusHeading: 'The seven areas a small business actually has to defend',
    focusIntro:
      'Cybersecurity for a 5–50 person Vaughan office is not abstract. It comes down to a handful of concrete surfaces that attackers and insurers both pay attention to.',
    focusCards: [
      {
        icon: 'bi-microsoft',
        title: 'Microsoft 365 accounts and admin roles',
        body: 'Global admins, MFA coverage, legacy auth, guest access, and shared mailboxes — the most common foothold in small business breaches.',
      },
      {
        icon: 'bi-laptop',
        title: 'Endpoints and laptops',
        body: 'Company-owned and BYOD devices: disk encryption, EDR coverage, patch level, local admin rights, and screen lock policy.',
      },
      {
        icon: 'bi-router',
        title: 'Firewall and remote access',
        body: 'Office firewall rules, VPN access, exposed services, and any leftover port-forwarding from a previous IT provider.',
      },
      {
        icon: 'bi-envelope-exclamation',
        title: 'Email and phishing exposure',
        body: 'SPF, DKIM, DMARC, anti-impersonation, attachment and link scanning, and how staff report suspicious messages.',
      },
      {
        icon: 'bi-cloud-arrow-up',
        title: 'Backups and recovery readiness',
        body: 'Where Microsoft 365, file server, and SaaS data is backed up, how often, and whether anyone has tested a restore in the last year.',
      },
      {
        icon: 'bi-people',
        title: 'Staff onboarding and offboarding',
        body: 'How accounts, MFA, devices, and shared drives are added when someone joins — and fully removed when they leave.',
      },
      {
        icon: 'bi-clipboard-check',
        title: 'Cyber insurance questionnaire controls',
        body: 'The MFA, EDR, backup, and incident response evidence underwriters ask for — collected and documented in plain English.',
      },
    ],

    scenariosLabel: 'Common Vaughan scenarios',
    scenariosHeading: 'Security gaps we see in real Vaughan offices',
    scenariosIntro:
      'These are example situations we run into during assessments — not specific clients. If any sound familiar, they are worth fixing before they become incidents or insurance findings.',
    scenarios: [
      {
        label: 'Example scenario — professional services office',
        body: 'A small accounting or legal office uses Microsoft 365 across the team, but MFA is only enforced for some users, and the original admin account is shared between the owner and an external IT contact.',
      },
      {
        label: 'Example scenario — medical or dental clinic',
        body: 'A clinic relies on a single shared admin login for the practice management software and has no documented list of which staff member uses which device.',
      },
      {
        label: 'Example scenario — construction or trades office',
        body: 'Foremen and project managers carry laptops between sites, but there is no EDR, no disk encryption check, and patches are installed only when someone notices a slow machine.',
      },
      {
        label: 'Example scenario — small office with consumer Wi-Fi',
        body: 'The office is running a consumer-grade router with default admin credentials, an open guest Wi-Fi on the same network as workstations, and no logging of who connects.',
      },
      {
        label: 'Example scenario — cyber insurance renewal',
        body: 'A business is renewing its cyber insurance and discovers the questionnaire asks for EDR coverage, MFA on all admins, and tested backups — none of which are currently documented.',
      },
    ],

    mapLabel: 'Security control map',
    mapHeading: 'The controls we review and improve',
    mapIntro:
      'Every Vaughan cybersecurity engagement walks through this control map. The goal is to know where each control stands today, what risk it actually reduces, and what the next concrete step is.',
    mapColumns: { area: 'Control area', risk: 'Risk it reduces', check: 'What CtrlShift checks / improves' },
    mapRows: [
      {
        icon: 'bi-shield-lock',
        area: 'MFA and conditional access',
        risk: 'Account takeover from leaked or phished passwords.',
        check: 'Confirm MFA is enforced for all users, review legacy auth, and tune sign-in conditions.',
      },
      {
        icon: 'bi-shield-check',
        area: 'Endpoint protection / EDR',
        risk: 'Ransomware, malware, and unmanaged laptops.',
        check: 'Inventory devices, deploy EDR, confirm coverage, and review alert handling.',
      },
      {
        icon: 'bi-arrow-counterclockwise',
        area: 'Backup and restore testing',
        risk: 'Data loss from ransomware, deletion, or SaaS errors.',
        check: 'Map what is backed up (M365, file server, SaaS), how often, and run a test restore.',
      },
      {
        icon: 'bi-router',
        area: 'Firewall and remote access',
        risk: 'Exposed services, weak VPN, leftover rules from prior IT.',
        check: 'Review firewall rules, VPN/ZTNA access, exposed ports, and admin credentials.',
      },
      {
        icon: 'bi-envelope-check',
        area: 'Email authentication and phishing',
        risk: 'Brand spoofing, invoice fraud, and credential phishing.',
        check: 'Configure SPF, DKIM, DMARC; review impersonation, link, and attachment policies.',
      },
      {
        icon: 'bi-person-badge',
        area: 'Admin account separation',
        risk: 'Single compromised admin = full tenant compromise.',
        check: 'Separate admin from daily-use accounts and limit standing global admin rights.',
      },
      {
        icon: 'bi-arrow-repeat',
        area: 'Patching and device hygiene',
        risk: 'Known vulnerabilities being exploited on out-of-date devices.',
        check: 'Review OS, browser, and Microsoft 365 app patch levels and update cadence.',
      },
      {
        icon: 'bi-telephone',
        area: 'Incident response contacts',
        risk: 'Confusion and downtime when something actually goes wrong.',
        check: 'Document who calls whom, in what order, with current numbers and tenant details.',
      },
    ],

    processLabel: 'How we engage',
    processHeading: 'How a Vaughan cybersecurity engagement works',
    processIntro:
      'A typical engagement runs over a few weeks and is designed to be light on your team — most of it is configuration review, not interviews.',
    processSteps: [
      {
        step: '01',
        title: 'Discovery and risk review',
        body: 'Short scoping call to understand the business, current tools, who has admin access, and what is keeping the owner up at night.',
      },
      {
        step: '02',
        title: 'Microsoft 365 / identity review',
        body: 'Tenant-level review: admin roles, MFA, conditional access, guest access, mail flow, and licensing fit.',
      },
      {
        step: '03',
        title: 'Endpoint and firewall review',
        body: 'Inventory of devices and EDR coverage, firewall rules, VPN/remote access, and Wi-Fi exposure.',
      },
      {
        step: '04',
        title: 'Backup and recovery review',
        body: 'Where data lives, what is and is not backed up, how restores would actually work in an incident.',
      },
      {
        step: '05',
        title: 'Remediation plan',
        body: 'A prioritized, plain-English plan: must-fix now, should-fix soon, and nice-to-have. Mapped to risk, not vendor stack.',
      },
      {
        step: '06',
        title: 'Ongoing monitoring or managed IT handoff',
        body: 'You can keep handling day-to-day IT, hand it off to your existing provider, or have us run it under a managed IT plan.',
      },
    ],

    deliverablesLabel: 'Deliverables',
    deliverablesHeading: 'What you get at the end of the engagement',
    deliverablesIntro:
      'Every Vaughan cybersecurity engagement ends with a defined set of artifacts you can keep, share with insurers, and act on with any IT provider.',
    deliverables: [
      { icon: 'bi-clipboard-data', title: 'Security findings summary', body: 'A short, plain-English summary of what was reviewed and what was found — no acronym soup.' },
      { icon: 'bi-list-check', title: 'Prioritized remediation list', body: 'Issues grouped as fix-now, soon, and later, each with the risk it reduces.' },
      { icon: 'bi-microsoft', title: 'Microsoft 365 hardening notes', body: 'Specific tenant-level changes for identity, mail flow, and admin roles.' },
      { icon: 'bi-laptop', title: 'Endpoint protection gap list', body: 'Which devices are missing EDR, encryption, or current patches, and how to close the gap.' },
      { icon: 'bi-router', title: 'Firewall and remote access review', body: 'Findings on firewall rules, VPN, exposed services, and Wi-Fi configuration.' },
      { icon: 'bi-arrow-counterclockwise', title: 'Backup / restore readiness notes', body: 'What is currently protected, what is not, and how a real restore would play out.' },
      { icon: 'bi-journal-text', title: 'Plain-English action plan', body: 'A short document an owner or office manager can actually read and act on.' },
    ],

    relatedLabel: 'Related services and guides',
    relatedHeading: 'Where to go next',
    relatedIntro: 'Pages and guides that pair naturally with a Vaughan cybersecurity engagement.',
    relatedLinks: [
      { label: 'Security & firewall services', path: '/security-firewall', description: 'Broader commercial security, firewall, and email protection service page.' },
      { label: 'Microsoft 365 management', path: '/microsoft-365', description: 'Microsoft 365 administration, security, and licensing for small businesses.' },
      { label: 'Security baseline assessment', path: '/services/security-baseline-assessment', description: 'A scoped assessment of identity, endpoints, email, and backup controls.' },
      { label: 'Cyber insurance readiness Vaughan', path: '/cyber-insurance-readiness-vaughan', description: 'Map your controls to common cyber insurance questionnaires.' },
      { label: 'Managed IT Services Vaughan', path: '/managed-it-services-vaughan', description: 'Ongoing managed IT with security baked in, not bolted on.' },
      { label: 'Guide: EDR vs antivirus', path: '/guides/security/endpoint-security/edr-vs-antivirus', description: 'How modern endpoint protection differs from traditional antivirus.' },
      { label: 'Guide: MFA rollout for small business', path: '/guides/security/microsoft-365-security/mfa-rollout-small-business', description: 'A practical MFA rollout plan for a small Microsoft 365 tenant.' },
    ],

    faq: [
      {
        q: 'Do small businesses in Vaughan really need EDR, or is regular antivirus enough?',
        a: 'In our experience, traditional antivirus is no longer enough on its own. Modern attacks frequently bypass signature-based AV. EDR adds behaviour-based detection, response actions, and visibility into what happened on a device — which is also what most cyber insurance questionnaires now expect.',
      },
      {
        q: 'Can you help us secure Microsoft 365 without a full migration?',
        a: 'Yes. Most engagements work with the Microsoft 365 tenant you already have. We review admin roles, MFA, conditional access, mail flow, sharing, and licensing — and tighten the configuration without changing how staff log in day-to-day.',
      },
      {
        q: 'Do you replace our firewall, or work with what we already have?',
        a: 'Both. If your current firewall is healthy and well-configured, we tune it. If it is consumer-grade, end-of-life, or full of leftover rules from a previous provider, we will recommend a replacement and explain why.',
      },
      {
        q: 'Can a security review help with our cyber insurance questionnaire?',
        a: 'Yes. We map findings to the controls insurers commonly ask about — MFA, EDR, backups, admin separation, incident response — so you can answer the questionnaire honestly and back up your answers with evidence.',
      },
      {
        q: 'Do you provide ongoing monitoring after the review?',
        a: 'You can keep handling day-to-day IT yourself, stay with your existing provider, or move to one of our managed IT plans. The cybersecurity review is useful on its own; ongoing monitoring is optional.',
      },
      {
        q: 'Do you support clinics, law firms, accounting firms, and trades offices?',
        a: 'Yes. Most of our small-business clients fall into those categories. The control map is the same; the priorities and compliance overlays differ — for example, healthcare-related privacy, professional regulator expectations, or trades offices with unmanaged field laptops.',
      },
      {
        q: 'What if we only need a security review first, not a full engagement?',
        a: 'That is a normal starting point. We can do a scoped security baseline review, deliver findings and a remediation plan, and stop there. You can implement the changes yourself, hand them to your current provider, or come back to us when you want.',
      },
    ],
  },

  'cloud-vaughan': {
    title: 'Cloud Services Vaughan | CtrlShift IT Services',
    canonicalPath: '/cloud-services-vaughan',
    city: 'Vaughan',
    region: 'York Region',
    serviceType: 'Cloud Services',
    mainHeading: 'Cloud Services Vaughan',
    kicker: 'Cloud planning and support for York Region small businesses',
    intro:
      'Cloud support for Vaughan small businesses using Microsoft 365, Google Workspace, AWS, cloud backup, and remote access — set up properly, secured, and documented so you actually own your cloud stack.',
    metaDescription:
      'Local Vaughan cloud services for small businesses — Microsoft 365, Google Workspace, AWS, cloud backup, file permissions, and email migration.',
    sections: [
      {
        heading: 'Cloud help for the way small Vaughan businesses actually work',
        body: 'Most Vaughan small businesses we work with are not "all-in" on one cloud. They have Microsoft 365 for email, OneDrive and SharePoint mixed with personal Google Drive folders, a few AWS resources nobody fully owns, and remote staff using whatever works. Our role is to clean that up, secure it, and make it documented and supportable.',
      },
      {
        heading: 'A cloud stack you can hand to anyone',
        body: 'After our engagement, you should know which cloud platforms you depend on, who has admin access to each one, what is backed up, and how a new hire or a departing employee is handled. That matters for security, for cyber insurance, and for the day you change IT providers.',
      },
    ],
    features: [
      'Microsoft 365 vs Google Workspace planning',
      'File sharing and permission cleanup',
      'Cloud backup for SaaS and infrastructure',
      'Identity and remote access review',
      'AWS hosting and infrastructure support',
      'Email migration and DNS readiness',
      'Cloud admin documentation',
      'Vendor coordination on your behalf',
    ],
    hubPath: '/managed-it-services-vaughan',
    hubLabel: 'Managed IT Services Vaughan',

    focusLabel: 'Cloud decisions we help with',
    focusHeading: 'The cloud questions every small business eventually has to answer',
    focusIntro:
      'Cloud planning for a 5–50 person Vaughan business usually comes down to a handful of practical decisions, not a multi-year transformation strategy.',
    focusCards: [
      { icon: 'bi-microsoft', title: 'Microsoft 365 vs Google Workspace', body: 'Which platform fits how your team actually works — email, files, video, and identity — and how to live with both if needed.' },
      { icon: 'bi-folder2-open', title: 'File sharing and permissions', body: 'OneDrive, SharePoint, Google Shared Drives: who can see what, who shouldn\'t, and how external sharing is controlled.' },
      { icon: 'bi-cloud-arrow-up', title: 'Cloud backup and restore', body: 'Third-party backup for Microsoft 365, Google Workspace, and key SaaS — including how a real restore would work.' },
      { icon: 'bi-person-lock', title: 'Remote access and identity', body: 'Single sign-on, MFA, conditional access, and how remote staff get into business systems safely.' },
      { icon: 'bi-amazon', title: 'AWS hosting and infrastructure', body: 'Right-sizing AWS for a small business: VPC, IAM, backups, cost guardrails, and who actually owns the account.' },
      { icon: 'bi-envelope-paper', title: 'Email migration and DNS', body: 'Migrating between providers without breaking SPF, DKIM, DMARC, MX, or ongoing mail flow.' },
      { icon: 'bi-people', title: 'Vendor coordination', body: 'Talking to Microsoft, Google, AWS, your line-of-business vendor, and your ISP so your team doesn\'t have to.' },
    ],

    scenariosLabel: 'Common Vaughan cloud scenarios',
    scenariosHeading: 'Cloud problems we see in real Vaughan offices',
    scenariosIntro:
      'These are example situations we run into, not specific clients. They are the patterns most small Vaughan businesses ask us to clean up.',
    scenarios: [
      { label: 'Example scenario — files everywhere', body: 'Documents are scattered between OneDrive, SharePoint, local desktops, USB drives, and personal Google Drives. Nobody is sure where the latest version of a contract actually lives.' },
      { label: 'Example scenario — staff turnover', body: 'A team member leaves, but their Microsoft 365 account, shared drive access, VPN credential, and SaaS logins are still active weeks later.' },
      { label: 'Example scenario — email migration gone sideways', body: 'A previous attempt to move from another email provider left mail flow inconsistent, MX records partially updated, and some staff still on the old system.' },
      { label: 'Example scenario — no SaaS backup', body: 'Microsoft 365 or Google Workspace data is assumed to be "backed up by the vendor", but no third-party backup exists and no restore has ever been tested.' },
      { label: 'Example scenario — orphan AWS account', body: 'AWS resources are running and being billed, but the account was set up by someone who has left the business and current staff are nervous about touching it.' },
      { label: 'Example scenario — remote workarounds', body: 'Remote staff are using a mix of personal email, file forwarding, and unmanaged devices to get their work done — outside the security controls the office has.' },
    ],

    mapLabel: 'Cloud readiness map',
    mapHeading: 'The cloud areas we review and clean up',
    mapIntro:
      'Every Vaughan cloud engagement walks through this readiness map. The goal is one shared view of what you have, what risk it carries, and what the next concrete step is.',
    mapColumns: { area: 'Cloud area', risk: 'Business risk', check: 'What CtrlShift checks / improves' },
    mapRows: [
      { icon: 'bi-microsoft', area: 'Microsoft 365 permissions', risk: 'Over-shared SharePoint sites and uncontrolled external sharing.', check: 'Review sites, sharing links, and guest access; tighten without breaking workflows.' },
      { icon: 'bi-google', area: 'Google Workspace Shared Drives', risk: 'Files lost when accounts are removed; unclear ownership.', check: 'Move shared content into Shared Drives and document ownership.' },
      { icon: 'bi-cloud-arrow-up', area: 'Cloud backup', risk: 'No real recovery path for SaaS data loss.', check: 'Implement third-party backup for M365 / Workspace and validate restore.' },
      { icon: 'bi-person-badge', area: 'Admin roles', risk: 'Too many global admins, shared logins, or ex-staff still active.', check: 'Inventory admin roles, separate from daily accounts, and remove unused access.' },
      { icon: 'bi-envelope-check', area: 'DNS and email authentication', risk: 'Spoofing, deliverability problems, and broken mail flow.', check: 'Audit and align SPF, DKIM, DMARC, MX with your actual mail providers.' },
      { icon: 'bi-amazon', area: 'AWS cost and security basics', risk: 'Unowned resources, weak IAM, surprise bills.', check: 'Review IAM, enable basic guardrails, tag and document key resources.' },
      { icon: 'bi-laptop', area: 'Device access', risk: 'Personal or unmanaged devices accessing business cloud.', check: 'Review which devices can access what, and where conditional access should apply.' },
    ],

    processLabel: 'How we engage',
    processHeading: 'How a Vaughan cloud engagement works',
    processIntro:
      'A typical cloud engagement is a few weeks of focused work — light on meetings, focused on visibility, cleanup, and documentation.',
    processSteps: [
      { step: '01', title: 'Review your current cloud stack', body: 'Identify every Microsoft 365, Google Workspace, AWS, and SaaS surface the business actually depends on.' },
      { step: '02', title: 'Identify access and security gaps', body: 'Look for over-shared files, stale users, missing MFA, and weak admin separation across each platform.' },
      { step: '03', title: 'Clean up permissions', body: 'Tighten file sharing, group memberships, and admin roles without breaking how staff currently work.' },
      { step: '04', title: 'Stabilize email, files, and backup', body: 'Confirm mail flow is correct, files have a clear home, and a third-party backup is in place where it matters.' },
      { step: '05', title: 'Document admin ownership', body: 'Produce a short document showing who owns each cloud platform, where logins live, and how to recover access.' },
      { step: '06', title: 'Provide a next-step roadmap', body: 'A short, prioritized roadmap for migrations, license changes, or AWS/cloud work that should come next — or none, if not needed.' },
    ],

    deliverablesLabel: 'Deliverables',
    deliverablesHeading: 'What you get at the end of the engagement',
    deliverablesIntro:
      'Every Vaughan cloud engagement ends with a defined set of artifacts your team — and any future IT provider — can actually use.',
    deliverables: [
      { icon: 'bi-cloud', title: 'Cloud stack summary', body: 'A short list of every cloud platform the business depends on, with its purpose and admin owner.' },
      { icon: 'bi-key', title: 'Permission and access review', body: 'Who has access to what across Microsoft 365, Google Workspace, and key SaaS — with anything unusual flagged.' },
      { icon: 'bi-arrow-counterclockwise', title: 'Backup / restore readiness notes', body: 'What is currently protected, what is not, and how a restore would actually work.' },
      { icon: 'bi-person-badge', title: 'Admin ownership list', body: 'Named owners for each cloud platform, plus break-glass / recovery contacts.' },
      { icon: 'bi-arrow-left-right', title: 'Migration plan if needed', body: 'A scoped plan for any email, file, or platform migration — only if the business actually needs one.' },
      { icon: 'bi-shield-check', title: 'Security recommendations', body: 'Concrete cloud security improvements: MFA, conditional access, sharing, and identity hygiene.' },
      { icon: 'bi-journal-text', title: 'Plain-English roadmap', body: 'A short roadmap an owner or office manager can read in one sitting and use to plan the next quarter.' },
    ],

    relatedLabel: 'Related services and guides',
    relatedHeading: 'Where to go next',
    relatedIntro: 'Pages and guides that pair naturally with a Vaughan cloud engagement.',
    relatedLinks: [
      { label: 'Microsoft 365 services', path: '/microsoft-365', description: 'Microsoft 365 setup, security, and ongoing administration.' },
      { label: 'Google Workspace services', path: '/google-workspace', description: 'Google Workspace setup, security, and admin support.' },
      { label: 'AWS infrastructure', path: '/aws-infrastructure', description: 'AWS-specific infrastructure, IAM, and cost basics.' },
      { label: 'Managed IT Services Vaughan', path: '/managed-it-services-vaughan', description: 'Ongoing managed IT including cloud admin support.' },
      { label: 'Security baseline assessment', path: '/services/security-baseline-assessment', description: 'Scoped security review across identity, endpoints, and cloud.' },
      { label: 'Guide: Microsoft 365 backup for small business', path: '/guides/security/microsoft-365-security/microsoft-365-backup-small-business', description: 'Why third-party Microsoft 365 backup matters and how to think about it.' },
      { label: 'Guide: Microsoft 365 security checklist', path: '/guides/security/microsoft-365-security/microsoft-365-checklist', description: 'A practical Microsoft 365 hardening checklist for small business.' },
    ],

    faq: [
      {
        q: 'Do you support both Microsoft 365 and Google Workspace for Vaughan businesses?',
        a: 'Yes. We support both, and many of our small business clients run a mix — for example, Microsoft 365 for the core team and Google Workspace for a particular department or legacy reason. We can stabilize either or help you consolidate over time.',
      },
      {
        q: 'Can you help us clean up file permissions in OneDrive, SharePoint, or Google Drive?',
        a: 'Yes. Permission cleanup is one of the most common requests. We review who has access to which sites and folders, where external sharing is enabled, and tighten things without breaking how staff currently work.',
      },
      {
        q: 'Do we really need third-party Microsoft 365 backup?',
        a: 'Microsoft 365 has good resiliency, but it is not a backup product for your data. If a user permanently deletes mailboxes, OneDrive folders, or SharePoint files, or an attacker does, recovery options are limited. Most small businesses we work with end up adding a third-party backup once they understand that.',
      },
      {
        q: 'Can you help with AWS even if we are a small Vaughan business?',
        a: 'Yes. We do not run massive AWS estates, but we regularly help small businesses with AWS that has grown organically — basic IAM hygiene, tagging, cost guardrails, backups, and clear ownership. If a workload doesn\'t actually need AWS, we will say so.',
      },
      {
        q: 'Can you help us migrate email or files between providers?',
        a: 'Yes. We plan and execute mailbox and file migrations between Microsoft 365, Google Workspace, and on-premise sources. We also handle DNS, MX, SPF, DKIM, and DMARC so mail flow stays clean during and after the cutover.',
      },
      {
        q: 'Do you document who has admin access to our cloud platforms?',
        a: 'Yes. Documenting admin access is part of every cloud engagement. By the end, you will have a short document showing who owns Microsoft 365, Google Workspace, AWS, and key SaaS, along with break-glass contacts.',
      },
      {
        q: 'Can this be part of an ongoing managed IT plan?',
        a: 'Yes. Cloud administration is included in our managed IT plans, so once the initial cleanup is done, you do not have to think about it again. You can also stay project-based if you prefer.',
      },
    ],
  },
};

@Component({
  selector: 'app-service-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-location.component.html',
  styleUrls: ['./service-location.component.css'],
})
export class ServiceLocationComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  content!: ServiceLocationContent;

  private readonly FAQ_SCHEMA_ID = 'service-location-faq';
  private readonly BREADCRUMB_SCHEMA_ID = 'service-location-breadcrumb';

  ngOnInit(): void {
    const contentKey = (this.route.snapshot.data['contentKey'] as string) ?? 'cybersecurity-vaughan';
    this.content = SERVICE_LOCATION_CONTENT[contentKey] ?? SERVICE_LOCATION_CONTENT['cybersecurity-vaughan'];

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
          name: this.content.hubLabel,
          item: `https://ctrlshiftit.ca${this.content.hubPath}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${this.content.serviceType} ${this.content.city}`,
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
