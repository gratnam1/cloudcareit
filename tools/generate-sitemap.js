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
  { path: '/blog', priority: '0.75', changefreq: 'weekly' },
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
