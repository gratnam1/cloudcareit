import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LocationComponent } from './pages/location/location.component';

// Blog (PAGES ONLY — no more src/app/blog/)
import { BlogListComponent } from './pages/blog/blog-list.component';
import { BlogPostComponent } from './pages/blog/blog-post.component';

// Service pages
import { GoogleWorkspaceComponent } from './pages/services/google-workspace/google-workspace.component';
import { Microsoft365Component } from './pages/services/microsoft-365/microsoft-365.component';
import { OfficeNetworkingComponent } from './pages/services/office-networking/office-networking.component';
import { AwsInfrastructureComponent } from './pages/services/aws-infrastructure/aws-infrastructure.component';
import { SecurityFirewallComponent } from './pages/services/security-firewall/security-firewall.component';
import { CrisisRecoveryComponent } from './pages/services/crisis-recovery/crisis-recovery.component';
import { WebDevelopmentComponent } from './pages/services/web-development/web-development.component';
import { SeoVisibilityComponent } from './pages/services/seo-visibility/seo-visibility.component';
import { LeadGenerationComponent } from './pages/services/lead-generation/lead-generation.component';
import { ManagedItComponent } from './pages/services/managed-it/managed-it.component';

export const routes: Routes = [
  // Home
  {
    path: '',
    component: HomeComponent,
    title: 'Managed IT Services Ontario | CtrlShift IT Services'
  },

  // ✅ CLEAN BLOG ROUTES (all under pages/blog)
  {
    path: 'blog',
    children: [
      {
        path: '',
        component: BlogListComponent,
        title: 'Blog | CtrlShift IT Services'
      },
      {
        path: ':slug',
        component: BlogPostComponent
      }
    ]
  },

  // Services
  {
    path: 'managed-it',
    component: ManagedItComponent,
    title: 'Managed IT Services | CtrlShift IT Services'
  },
  {
    path: 'google-workspace',
    component: GoogleWorkspaceComponent,
    title: 'Google Workspace Support | CtrlShift IT Services'
  },
  {
    path: 'microsoft-365',
    component: Microsoft365Component,
    title: 'Microsoft 365 Support | CtrlShift IT Services'
  },
  {
    path: 'office-networking',
    component: OfficeNetworkingComponent,
    title: 'Office Networking & Wi-Fi | CtrlShift IT Services'
  },
  {
    path: 'aws-infrastructure',
    component: AwsInfrastructureComponent,
    title: 'AWS Infrastructure Support | CtrlShift IT Services'
  },
  {
    path: 'security-firewall',
    component: SecurityFirewallComponent,
    title: 'Security & Firewall | CtrlShift IT Services'
  },
  {
    path: 'crisis-recovery',
    component: CrisisRecoveryComponent,
    title: 'Crisis Recovery | CtrlShift IT Services'
  },
  {
    path: 'web-development',
    component: WebDevelopmentComponent,
    title: 'Web Development | CtrlShift IT Services'
  },
  {
    path: 'seo-visibility',
    component: SeoVisibilityComponent,
    title: 'SEO & Visibility | CtrlShift IT Services'
  },
  {
    path: 'lead-generation',
    component: LeadGenerationComponent,
    title: 'Lead Generation | CtrlShift IT Services'
  },

  // City pages
  {
    path: 'it-support-vaughan',
    component: LocationComponent,
    data: {
      city: 'Vaughan',
      region: 'York Region',
      landmark: 'Vaughan Metropolitan Centre'
    }
  },
  {
    path: 'it-support-toronto',
    component: LocationComponent,
    data: {
      city: 'Toronto',
      region: 'GTA',
      landmark: 'Financial District'
    }
  },
  {
    path: 'it-support-mississauga',
    component: LocationComponent,
    data: {
      city: 'Mississauga',
      region: 'Peel Region',
      landmark: 'Square One'
    }
  },
  {
    path: 'it-support-thornhill',
    component: LocationComponent,
    data: {
      city: 'Thornhill',
      region: 'York Region',
      landmark: 'Promenade Shopping Centre'
    }
  },
  {
    path: 'it-support-richmond-hill',
    component: LocationComponent,
    data: {
      city: 'Richmond Hill',
      region: 'York Region',
      landmark: 'Hillcrest Mall'
    }
  },

  // Catch-all
  { path: '**', redirectTo: '' }
];
