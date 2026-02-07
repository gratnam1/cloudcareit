import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LocationComponent } from './pages/location/location.component';

export const routes: Routes = [
  // The Main Hub (Your original content)
  {
    path: '',
    component: HomeComponent,
    title: 'Managed IT Services Ontario | CtrlShift'
  },

  // The SEO Spokes (Dynamic City Pages)
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

  // --- NEW ADDITIONS START HERE ---
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
  // --- NEW ADDITIONS END HERE ---

  // Catch-all (Redirects 404s to Home)
  { path: '**', redirectTo: '' }
];
