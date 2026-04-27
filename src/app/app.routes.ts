import { Routes } from '@angular/router';

export const routes: Routes = [
  // Home
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Managed IT Services & Cloud Support | CtrlShift IT Services'
  },

  // Blog
  {
    path: 'blog',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/blog/blog-list.component').then((m) => m.BlogListComponent),
        title: 'Blog | CtrlShift IT Services'
      },
      {
        path: 'office-networking-basics',
        loadComponent: () =>
          import('./pages/blog/posts/office-networking-basics/office-networking-basics.component')
            .then((m) => m.OfficeNetworkingBasicsComponent),
        title: 'Office Networking & Wi-Fi for SMBs | CtrlShift IT Services'
      },
      {
        path: 'seo-visibility-guide',
        loadComponent: () =>
          import('./pages/blog/posts/seo-visibility-guide/seo-visibility-guide.component')
            .then((m) => m.SeoVisibilityGuideComponent),
        title: 'Local SEO for Small Businesses | CtrlShift IT Services'
      },
      {
        path: 'web-development-gta',
        loadComponent: () =>
          import('./pages/blog/posts/web-development-trends/web-development-trends.component')
            .then((m) => m.WebDevelopmentTrendsComponent),
        title: 'Web Development for GTA Small Business'
      },
      {
        path: 'post-quantum-small-business',
        loadComponent: () =>
          import('./pages/blog/posts/post-quantum-small-business/post-quantum-small-business.component')
            .then((m) => m.PostQuantumSmallBusinessComponent),
        title: 'Post-Quantum Security for SMBs | CtrlShift IT Services'
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./pages/blog/blog-post.component').then((m) => m.BlogPostComponent)
      }
    ]
  },

  // Services
  {
    path: 'managed-it-services',
    loadComponent: () =>
      import('./pages/services/managed-it/managed-it.component').then((m) => m.ManagedItComponent),
    title: 'Managed IT Services Vaughan & GTA'
  },
  {
    path: 'google-workspace',
    loadComponent: () =>
      import('./pages/services/google-workspace/google-workspace.component').then(
        (m) => m.GoogleWorkspaceComponent
      ),
    title: 'Google Workspace Support for SMBs'
  },
  {
    path: 'microsoft-365',
    loadComponent: () =>
      import('./pages/services/microsoft-365/microsoft-365.component').then(
        (m) => m.Microsoft365Component
      ),
    title: 'Microsoft 365 Support Vaughan & GTA'
  },
  {
    path: 'office-networking',
    loadComponent: () =>
      import('./pages/services/office-networking/office-networking.component').then(
        (m) => m.OfficeNetworkingComponent
      ),
    title: 'Office Networking & Wi-Fi Vaughan'
  },
  {
    path: 'aws-infrastructure',
    loadComponent: () =>
      import('./pages/services/aws-infrastructure/aws-infrastructure.component').then(
        (m) => m.AwsInfrastructureComponent
      ),
    title: 'AWS Cloud Services for GTA Small Business'
  },
  {
    path: 'security-firewall',
    loadComponent: () =>
      import('./pages/services/security-firewall/security-firewall.component').then(
        (m) => m.SecurityFirewallComponent
      ),
    title: 'Security & Firewall Services Vaughan'
  },
  {
    path: 'crisis-recovery',
    loadComponent: () =>
      import('./pages/services/crisis-recovery/crisis-recovery.component').then(
        (m) => m.CrisisRecoveryComponent
      ),
    title: 'IT Disaster Recovery Vaughan'
  },
  {
    path: 'ai-integration',
    loadComponent: () =>
      import('./pages/services/ai-integration/ai-integration.component').then(
        (m) => m.AiIntegrationComponent
      ),
    title: 'AI Integration Services for Small Business'
  },
  {
    path: 'web-development',
    loadComponent: () =>
      import('./pages/services/web-development/web-development.component').then(
        (m) => m.WebDevelopmentComponent
      ),
    title: 'Web Development Vaughan'
  },
  {
    path: 'seo-visibility',
    loadComponent: () =>
      import('./pages/services/seo-visibility/seo-visibility.component').then(
        (m) => m.SeoVisibilityComponent
      ),
    title: 'SEO Services Vaughan'
  },
  {
    path: 'lead-generation',
    loadComponent: () =>
      import('./pages/services/lead-generation/lead-generation.component').then(
        (m) => m.LeadGenerationComponent
      ),
    title: 'B2B Lead Generation for Small Business'
  },
  {
    path: 'cyber-insurance-readiness-vaughan',
    loadComponent: () =>
      import('./pages/services/cyber-insurance-readiness/cyber-insurance-readiness.component').then(
        (m) => m.CyberInsuranceReadinessComponent
      ),
    title: 'Cyber Insurance Readiness Vaughan'
  },
  {
    path: 'services/security-baseline-assessment',
    loadComponent: () =>
      import('./pages/services/security-baseline-assessment/security-baseline-assessment.component').then(
        (m) => m.SecurityBaselineAssessmentComponent
      ),
    title: 'Security Baseline Assessment'
  },
  {
    path: 'managed-it-for-medical-clinics-vaughan',
    loadComponent: () =>
      import('./pages/services/medical-clinic-it/medical-clinic-it.component').then(
        (m) => m.MedicalClinicItComponent
      ),
    title: 'Managed IT for Vaughan Clinics'
  },

  // Service + location pages
  {
    path: 'cybersecurity-services-vaughan',
    loadComponent: () =>
      import('./pages/service-location/service-location.component').then((m) => m.ServiceLocationComponent),
    title: 'Cybersecurity Services Vaughan | CtrlShift IT Services',
    data: { contentKey: 'cybersecurity-vaughan' }
  },
  {
    path: 'cloud-services-vaughan',
    loadComponent: () =>
      import('./pages/service-location/service-location.component').then((m) => m.ServiceLocationComponent),
    title: 'Cloud Services Vaughan | CtrlShift IT Services',
    data: { contentKey: 'cloud-vaughan' }
  },

  // City pages
  {
    path: 'managed-it-services-vaughan',
    loadComponent: () =>
      import('./pages/location/location.component').then((m) => m.LocationComponent),
    title: 'Managed IT Services in Vaughan | CtrlShift IT Services',
    data: { city: 'Vaughan', region: 'York Region', landmark: 'Vaughan Metropolitan Centre' }
  },
  {
    path: 'it-support-vaughan',
    loadComponent: () =>
      import('./pages/it-support/it-support-location.component').then((m) => m.ItSupportLocationComponent),
    title: 'IT Support Vaughan | CtrlShift IT Services',
    data: { cityKey: 'vaughan' }
  },
  {
    path: 'managed-it-services-toronto',
    loadComponent: () =>
      import('./pages/location/location.component').then((m) => m.LocationComponent),
    title: 'Managed IT Services in Toronto | CtrlShift IT Services',
    data: { city: 'Toronto', region: 'GTA', landmark: 'Financial District' }
  },
  {
    path: 'managed-it-services-mississauga',
    loadComponent: () =>
      import('./pages/location/location.component').then((m) => m.LocationComponent),
    title: 'Managed IT Services in Mississauga | CtrlShift IT Services',
    data: { city: 'Mississauga', region: 'Peel Region', landmark: 'Square One' }
  },
  {
    path: 'it-support-mississauga',
    loadComponent: () =>
      import('./pages/it-support/it-support-location.component').then((m) => m.ItSupportLocationComponent),
    title: 'IT Support Mississauga | CtrlShift IT Services',
    data: { cityKey: 'mississauga' }
  },
  {
    path: 'managed-it-services-thornhill',
    loadComponent: () =>
      import('./pages/location/location.component').then((m) => m.LocationComponent),
    title: 'Managed IT Services in Thornhill | CtrlShift IT Services',
    data: { city: 'Thornhill', region: 'York Region', landmark: 'Promenade Shopping Centre' }
  },
  {
    path: 'managed-it-services-richmond-hill',
    loadComponent: () =>
      import('./pages/location/location.component').then((m) => m.LocationComponent),
    title: 'Managed IT for SMBs Richmond Hill | CtrlShift IT Services',
    data: { city: 'Richmond Hill', region: 'York Region', landmark: 'Hillcrest Mall' }
  },
  {
    path: 'it-support-in/:city/:industry',
    loadComponent: () =>
      import('./pages/silo/it-support-silo.component').then((m) => m.ItSupportSiloComponent),
    title: 'IT Support in City and Industry | CtrlShift IT Services'
  },

  // Guides
  {
    path: 'guides',
    loadComponent: () =>
      import('./pages/guides/guides-hub.component').then((m) => m.GuidesHubComponent),
    title: 'IT Guides & Knowledge Base | CtrlShift IT Services'
  },
  {
    path: 'guides/security',
    loadComponent: () =>
      import('./pages/guides/security/security-category.component').then(
        (m) => m.SecurityCategoryComponent
      ),
    title: 'Small Business Cybersecurity Guides | CtrlShift IT Services'
  },
  {
    path: 'guides/security/microsoft-365-security',
    loadComponent: () =>
      import('./pages/guides/security/microsoft-365-security/microsoft-365-security-hub.component').then(
        (m) => m.Microsoft365SecurityHubComponent
      ),
    title: 'Microsoft 365 Security Guides | CtrlShift IT Services'
  },
  {
    path: 'guides/security/:subcategory',
    loadComponent: () =>
      import('./pages/guides/security/security-subcategory-hub/security-subcategory-hub.component').then(
        (m) => m.SecuritySubcategoryHubComponent
      )
  },
  {
    path: 'guides/security/microsoft-365-security/microsoft-365-checklist',
    loadComponent: () =>
      import('./pages/guides/security/microsoft-365-security/microsoft-365-checklist/microsoft-365-checklist.component').then(
        (m) => m.MicrosoftSecurityChecklistComponent
      ),
    title: 'M365 Security Checklist for SMBs | CtrlShift IT Services'
  },
  {
    path: 'guides/security/microsoft-365-security/phishing-protection',
    loadComponent: () =>
      import('./pages/guides/security/microsoft-365-security/phishing-protection/phishing-protection.component').then(
        (m) => m.PhishingProtectionComponent
      ),
    title: 'M365 Anti-Phishing Guide for SMBs | CtrlShift IT Services'
  },
  {
    path: 'guides/security/microsoft-365-security/conditional-access-small-business',
    loadComponent: () =>
      import('./pages/guides/security/microsoft-365-security/conditional-access-small-business/conditional-access.component').then(
        (m) => m.ConditionalAccessComponent
      ),
    title: 'Conditional Access (M365) for SMBs | CtrlShift IT Services'
  },
  {
    path: 'guides/security/microsoft-365-security/mfa-rollout-small-business',
    loadComponent: () =>
      import('./pages/guides/security/microsoft-365-security/mfa-rollout-small-business/mfa-rollout.component').then(
        (m) => m.MfaRolloutComponent
      ),
    title: 'MFA Rollout for Small Business | CtrlShift IT Services'
  },
  {
    path: 'guides/security/microsoft-365-security/microsoft-365-backup-small-business',
    loadComponent: () =>
      import('./pages/guides/security/microsoft-365-security/m365-backup/m365-backup.component').then(
        (m) => m.M365BackupComponent
      ),
    title: 'M365 Backup for Small Business | CtrlShift IT Services'
  },
  {
    path: 'guides/security/:subcategory/:guideSlug',
    loadComponent: () =>
      import('./pages/guides/security/security-starter-guide/security-starter-guide.component').then(
        (m) => m.SecurityStarterGuideComponent
      )
  },

  // About
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About CtrlShift IT Services'
  },

  // IT Assessment
  {
    path: 'it-assessment',
    loadComponent: () =>
      import('./pages/it-assessment/it-assessment.component').then(
        (m) => m.ItAssessmentComponent
      ),
    title: 'Book a Free IT Assessment | CtrlShift IT Services'
  },

  // Lead Magnets
  {
    path: 'free-security-assessment',
    loadComponent: () =>
      import('./pages/free-security-assessment/free-security-assessment.component').then(
        (m) => m.FreeSecurityAssessmentComponent
      ),
    title: 'Free IT Security Assessment Vaughan Business'
  },
  {
    path: 'office-it-relocation',
    loadComponent: () =>
      import('./pages/office-relocation/office-relocation.component').then(
        (m) => m.OfficeRelocationComponent
      ),
    title: 'Office IT Relocation Services Toronto & GTA'
  },

  // Industry Pages
  {
    path: 'it-support-law-firms-toronto',
    loadComponent: () =>
      import('./pages/industries/industry-page.component').then((m) => m.IndustryPageComponent),
    title: 'IT Support for Law Firms Toronto | CtrlShift IT Services',
    data: { industry: 'law-firms' }
  },
  {
    path: 'it-support-accounting-firms-gta',
    loadComponent: () =>
      import('./pages/industries/industry-page.component').then((m) => m.IndustryPageComponent),
    title: 'Accounting Firm IT Support GTA',
    data: { industry: 'accounting-firms' }
  },
  {
    path: 'it-support-medical-clinics-ontario',
    loadComponent: () =>
      import('./pages/industries/industry-page.component').then((m) => m.IndustryPageComponent),
    title: 'Medical Clinic IT Support Vaughan',
    data: { industry: 'medical-clinics' }
  },
  {
    path: 'it-support-engineering-firms-toronto',
    loadComponent: () =>
      import('./pages/industries/industry-page.component').then((m) => m.IndustryPageComponent),
    title: 'Engineering Firm IT Support Toronto | CtrlShift IT Services',
    data: { industry: 'engineering-firms' }
  },
  {
    path: 'it-support-small-businesses-gta',
    loadComponent: () =>
      import('./pages/industries/industry-page.component').then((m) => m.IndustryPageComponent),
    title: 'Small Business IT Support GTA',
    data: { industry: 'small-businesses' }
  },

  // Catch-all: serve home page, no redirect
  {
    path: '**',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Managed IT Services & Cloud Support | CtrlShift IT Services'
  }
];
