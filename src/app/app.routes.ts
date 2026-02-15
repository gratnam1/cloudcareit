import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  // Home
  {
    path: '',
    component: HomeComponent,
    title: 'Managed IT Services Vaughan, Toronto & GTA | CtrlShift IT Services'
  },

  // ✅ CLEAN BLOG ROUTES (all under pages/blog)
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
    title: 'Managed IT Services in Vaughan & GTA | CtrlShift IT Services'
  },
  {
    path: 'managed-it',
    redirectTo: 'managed-it-services',
    pathMatch: 'full'
  },
  {
    path: 'google-workspace',
    loadComponent: () =>
      import('./pages/services/google-workspace/google-workspace.component').then(
        (m) => m.GoogleWorkspaceComponent
      ),
    title: 'Google Workspace Support in Vaughan & GTA | CtrlShift IT Services'
  },
  {
    path: 'microsoft-365',
    loadComponent: () =>
      import('./pages/services/microsoft-365/microsoft-365.component').then(
        (m) => m.Microsoft365Component
      ),
    title: 'Microsoft 365 Support in Vaughan & GTA | CtrlShift IT Services'
  },
  {
    path: 'office-networking',
    loadComponent: () =>
      import('./pages/services/office-networking/office-networking.component').then(
        (m) => m.OfficeNetworkingComponent
      ),
    title: 'Office Networking & Wi-Fi in Vaughan & GTA | CtrlShift IT Services'
  },
  {
    path: 'aws-infrastructure',
    loadComponent: () =>
      import('./pages/services/aws-infrastructure/aws-infrastructure.component').then(
        (m) => m.AwsInfrastructureComponent
      ),
    title: 'AWS Infrastructure Support in Vaughan & GTA | CtrlShift IT Services'
  },
  {
    path: 'security-firewall',
    loadComponent: () =>
      import('./pages/services/security-firewall/security-firewall.component').then(
        (m) => m.SecurityFirewallComponent
      ),
    title: 'Security & Firewall Services in Vaughan & GTA | CtrlShift IT Services'
  },
  {
    path: 'crisis-recovery',
    loadComponent: () =>
      import('./pages/services/crisis-recovery/crisis-recovery.component').then(
        (m) => m.CrisisRecoveryComponent
      ),
    title: 'IT Crisis Recovery in Vaughan & GTA | CtrlShift IT Services'
  },
  {
    path: 'web-development',
    loadComponent: () =>
      import('./pages/services/web-development/web-development.component').then(
        (m) => m.WebDevelopmentComponent
      ),
    title: 'Web Development in Vaughan & GTA | CtrlShift IT Services'
  },
  {
    path: 'seo-visibility',
    loadComponent: () =>
      import('./pages/services/seo-visibility/seo-visibility.component').then(
        (m) => m.SeoVisibilityComponent
      ),
    title: 'SEO Services in Vaughan & GTA | CtrlShift IT Services'
  },
  {
    path: 'lead-generation',
    loadComponent: () =>
      import('./pages/services/lead-generation/lead-generation.component').then(
        (m) => m.LeadGenerationComponent
      ),
    title: 'B2B Lead Generation in Vaughan & GTA | CtrlShift IT Services'
  },

  // City pages
  {
    path: 'managed-it-services-vaughan',
    loadComponent: () =>
      import('./pages/location/location.component').then((m) => m.LocationComponent),
    title: 'Managed IT Services in Vaughan | CtrlShift IT Services',
    data: {
      city: 'Vaughan',
      region: 'York Region',
      landmark: 'Vaughan Metropolitan Centre'
    }
  },
  {
    path: 'it-support-vaughan',
    redirectTo: 'managed-it-services-vaughan',
    pathMatch: 'full'
  },
  {
    path: 'managed-it-services-toronto',
    loadComponent: () =>
      import('./pages/location/location.component').then((m) => m.LocationComponent),
    title: 'Managed IT Services in Toronto | CtrlShift IT Services',
    data: {
      city: 'Toronto',
      region: 'GTA',
      landmark: 'Financial District'
    }
  },
  {
    path: 'it-support-toronto',
    redirectTo: 'managed-it-services-toronto',
    pathMatch: 'full'
  },
  {
    path: 'managed-it-services-mississauga',
    loadComponent: () =>
      import('./pages/location/location.component').then((m) => m.LocationComponent),
    title: 'Managed IT Services in Mississauga | CtrlShift IT Services',
    data: {
      city: 'Mississauga',
      region: 'Peel Region',
      landmark: 'Square One'
    }
  },
  {
    path: 'it-support-mississauga',
    redirectTo: 'managed-it-services-mississauga',
    pathMatch: 'full'
  },
  {
    path: 'managed-it-services-thornhill',
    loadComponent: () =>
      import('./pages/location/location.component').then((m) => m.LocationComponent),
    title: 'Managed IT Services in Thornhill | CtrlShift IT Services',
    data: {
      city: 'Thornhill',
      region: 'York Region',
      landmark: 'Promenade Shopping Centre'
    }
  },
  {
    path: 'it-support-thornhill',
    redirectTo: 'managed-it-services-thornhill',
    pathMatch: 'full'
  },
  {
    path: 'managed-it-services-richmond-hill',
    loadComponent: () =>
      import('./pages/location/location.component').then((m) => m.LocationComponent),
    title: 'Managed IT Services in Richmond Hill | CtrlShift IT Services',
    data: {
      city: 'Richmond Hill',
      region: 'York Region',
      landmark: 'Hillcrest Mall'
    }
  },
  {
    path: 'it-support-richmond-hill',
    redirectTo: 'managed-it-services-richmond-hill',
    pathMatch: 'full'
  },

  // Catch-all
  { path: '**', redirectTo: '' }
];
