/**
 * Generate a full XML sitemap and write it to /public/sitemap.xml.
 *
 * Usage:
 *   node tools/generate-sitemap.js
 */
const fs = require('node:fs');
const path = require('node:path');

const baseUrl = 'https://ctrlshiftit.ca';
const todayIso = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: '/', priority: '1.00', changefreq: 'weekly' },
  { path: '/managed-it-services', priority: '0.90', changefreq: 'weekly' },
  { path: '/managed-it-services-vaughan', priority: '0.90', changefreq: 'weekly' },
  { path: '/cybersecurity-services-vaughan', priority: '0.87', changefreq: 'monthly' },
  { path: '/cloud-services-vaughan', priority: '0.87', changefreq: 'monthly' },
  { path: '/managed-it-services-toronto', priority: '0.85', changefreq: 'weekly' },
  { path: '/managed-it-services-mississauga', priority: '0.85', changefreq: 'weekly' },
  { path: '/managed-it-services-thornhill', priority: '0.85', changefreq: 'weekly' },
  { path: '/managed-it-services-richmond-hill', priority: '0.85', changefreq: 'weekly' },
  { path: '/google-workspace', priority: '0.80', changefreq: 'monthly' },
  { path: '/microsoft-365', priority: '0.80', changefreq: 'monthly' },
  { path: '/office-networking', priority: '0.80', changefreq: 'monthly' },
  { path: '/aws-infrastructure', priority: '0.80', changefreq: 'monthly' },
  { path: '/security-firewall', priority: '0.80', changefreq: 'monthly' },
  { path: '/crisis-recovery', priority: '0.80', changefreq: 'monthly' },
  { path: '/web-development', priority: '0.80', changefreq: 'monthly' },
  { path: '/seo-visibility', priority: '0.80', changefreq: 'monthly' },
  { path: '/lead-generation', priority: '0.80', changefreq: 'monthly' },
  { path: '/cyber-insurance-readiness-vaughan', priority: '0.82', changefreq: 'monthly' },
  { path: '/services/security-baseline-assessment', priority: '0.84', changefreq: 'monthly' },
  { path: '/managed-it-for-medical-clinics-vaughan', priority: '0.82', changefreq: 'monthly' },
  { path: '/it-support-law-firms-toronto', priority: '0.82', changefreq: 'monthly' },
  { path: '/it-support-accounting-firms-gta', priority: '0.82', changefreq: 'monthly' },
  { path: '/it-support-medical-clinics-ontario', priority: '0.82', changefreq: 'monthly' },
  { path: '/it-support-engineering-firms-toronto', priority: '0.82', changefreq: 'monthly' },
  { path: '/it-support-small-businesses-gta', priority: '0.82', changefreq: 'monthly' },
  { path: '/about', priority: '0.70', changefreq: 'monthly' },
  { path: '/it-assessment', priority: '0.75', changefreq: 'monthly' },
  { path: '/free-security-assessment', priority: '0.73', changefreq: 'monthly' },
  { path: '/office-it-relocation', priority: '0.85', changefreq: 'monthly' },
  { path: '/blog', priority: '0.75', changefreq: 'weekly' },
  { path: '/guides', priority: '0.78', changefreq: 'monthly' },
  { path: '/guides/security', priority: '0.78', changefreq: 'monthly' },
  { path: '/guides/security/microsoft-365-security', priority: '0.78', changefreq: 'monthly' },
  { path: '/guides/security/microsoft-365-security/microsoft-365-checklist', priority: '0.80', changefreq: 'monthly' },
  { path: '/guides/security/microsoft-365-security/phishing-protection', priority: '0.74', changefreq: 'monthly' },
  { path: '/guides/security/microsoft-365-security/conditional-access-small-business', priority: '0.74', changefreq: 'monthly' },
  { path: '/guides/security/microsoft-365-security/mfa-rollout-small-business', priority: '0.74', changefreq: 'monthly' },
  { path: '/guides/security/microsoft-365-security/microsoft-365-backup-small-business', priority: '0.74', changefreq: 'monthly' },
  { path: '/guides/security/identity-attacks', priority: '0.78', changefreq: 'monthly' },
  { path: '/guides/security/identity-attacks/password-spray-attacks', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/identity-attacks/token-theft-attacks', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/identity-attacks/legacy-authentication-risk', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/identity-attacks/business-email-compromise', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/network-attacks', priority: '0.78', changefreq: 'monthly' },
  { path: '/guides/security/network-attacks/ddos-attacks-small-business', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/network-attacks/remote-exploitation-attacks', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/network-attacks/exposed-rdp-risk', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/network-attacks/firewall-misconfiguration-risk', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/network-attacks/vpn-attack-surface-small-business', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/endpoint-security', priority: '0.78', changefreq: 'monthly' },
  { path: '/guides/security/endpoint-security/edr-vs-antivirus', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/endpoint-security/mdr-vs-edr', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/endpoint-security/endpoint-isolation-explained', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/endpoint-security/patch-management-basics', priority: '0.72', changefreq: 'monthly' },
  { path: '/guides/security/endpoint-security/ransomware-behavior-endpoints', priority: '0.72', changefreq: 'monthly' },
];

const repoRoot = process.cwd();
const blogIndexPath = path.join(repoRoot, 'src/assets/blog/index.json');
const outputPath = path.join(repoRoot, 'public/sitemap.xml');

const indexPosts = JSON.parse(fs.readFileSync(blogIndexPath, 'utf8'));
const dateBySlug = new Map(
  indexPosts
    .filter((post) => post?.slug)
    .map((post) => [String(post.slug), String(post.date || todayIso)])
);

const componentOnlySlugs = ['post-quantum-small-business'];
const blogSlugs = Array.from(
  new Set([...indexPosts.map((post) => post.slug), ...componentOnlySlugs])
).filter(Boolean).sort();

const lines = [];
lines.push('<?xml version="1.0" encoding="UTF-8"?>');
lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
lines.push('');

for (const route of staticRoutes) {
  const routeLastMod = `${todayIso}T00:00:00+00:00`;
  lines.push('  <url>');
  lines.push(`    <loc>${baseUrl}${route.path}</loc>`);
  lines.push(`    <lastmod>${routeLastMod}</lastmod>`);
  lines.push(`    <changefreq>${route.changefreq}</changefreq>`);
  lines.push(`    <priority>${route.priority}</priority>`);
  lines.push('  </url>');
}

for (const slug of blogSlugs) {
  const publishedDate = dateBySlug.get(slug) || todayIso;
  lines.push('  <url>');
  lines.push(`    <loc>${baseUrl}/blog/${slug}</loc>`);
  lines.push(`    <lastmod>${publishedDate}T00:00:00+00:00</lastmod>`);
  lines.push('    <changefreq>monthly</changefreq>');
  lines.push('    <priority>0.70</priority>');
  lines.push('  </url>');
}

lines.push('</urlset>');
lines.push('');

fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
console.log(`Sitemap written: ${outputPath}`);
console.log(`Static URLs: ${staticRoutes.length}, Blog URLs: ${blogSlugs.length}`);
