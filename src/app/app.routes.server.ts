import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Home
  { path: '', renderMode: RenderMode.Prerender },

  // Blog
  { path: 'blog', renderMode: RenderMode.Prerender },
  { path: 'blog/:slug', renderMode: RenderMode.Server },

  // Services
  { path: 'managed-it-services', renderMode: RenderMode.Prerender },
  { path: 'google-workspace', renderMode: RenderMode.Prerender },
  { path: 'microsoft-365', renderMode: RenderMode.Prerender },
  { path: 'office-networking', renderMode: RenderMode.Prerender },
  { path: 'aws-infrastructure', renderMode: RenderMode.Prerender },
  { path: 'security-firewall', renderMode: RenderMode.Prerender },
  { path: 'crisis-recovery', renderMode: RenderMode.Prerender },
  { path: 'web-development', renderMode: RenderMode.Prerender },
  { path: 'seo-visibility', renderMode: RenderMode.Prerender },
  { path: 'lead-generation', renderMode: RenderMode.Prerender },

  // City pages (your existing ones)
  { path: 'managed-it-services-vaughan', renderMode: RenderMode.Prerender },
  { path: 'managed-it-services-toronto', renderMode: RenderMode.Prerender },
  { path: 'managed-it-services-mississauga', renderMode: RenderMode.Prerender },
  { path: 'managed-it-services-thornhill', renderMode: RenderMode.Prerender },
  { path: 'managed-it-services-richmond-hill', renderMode: RenderMode.Prerender },

  // Fallback (keep last)
  { path: '**', renderMode: RenderMode.Server }
];
