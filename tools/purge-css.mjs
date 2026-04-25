/**
 * Post-build PurgeCSS script
 *
 * Runs after `ng build` to strip unused CSS from the global stylesheet.
 * Uses all prerendered HTML files as content — every selector that appears
 * in ANY route's rendered HTML is preserved.
 *
 * Usage: node tools/purge-css.mjs
 */

import { PurgeCSS } from 'purgecss';
import fs from 'fs';
import path from 'path';
import { glob } from 'fs/promises'; // Node 22+; falls back to manual find below

const DIST = path.resolve('dist/ctrlshift-frontend/browser');

// ── Find the styles-*.css output file ────────────────────────────────────────
const cssFiles = fs
  .readdirSync(DIST)
  .filter((f) => f.startsWith('styles-') && f.endsWith('.css'))
  .map((f) => path.join(DIST, f));

if (cssFiles.length === 0) {
  console.error('No styles-*.css found in', DIST);
  process.exit(1);
}
const cssFile = cssFiles[0];
const originalSize = fs.statSync(cssFile).size;

// ── Collect all prerendered HTML files ───────────────────────────────────────
function findHtml(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtml(full, results);
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}
const htmlFiles = findHtml(DIST);

// ── Collect source files that contain runtime class names ────────────────────
function findSourceFiles(dir, extensions, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findSourceFiles(full, extensions, results);
    } else if (extensions.includes(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}
const sourceFiles = findSourceFiles(path.resolve('src'), ['.html', '.ts', '.css', '.scss']);

// ── Safelist ─────────────────────────────────────────────────────────────────
// Keep selectors that are toggled by JavaScript at runtime (not in static HTML)
const safelist = {
  standard: [
    // Bootstrap JS-toggled states
    'show', 'active', 'fade', 'in', 'out', 'collapsing', 'collapsed',
    'open', 'disabled', 'focus', 'hover',
    // Bootstrap form states
    'was-validated', 'is-valid', 'is-invalid',
    // Bootstrap responsive helpers toggled by JS
    'navbar-collapse', 'collapse',
    // Progress/spinner states
    'progress-bar-animated', 'progress-bar-striped',
    // Scroll-triggered class on navbar
    'scrolled',
    // Chat widget states added dynamically
    'chat-open', 'minimized',
    // Scan status classes set via TS
    'scan-status',
  ],
  patterns: [
    // Angular scoped attribute selectors
    /^\[?_ngcontent/,
    /^\[?_nghost/,
    // Bootstrap data- attribute selectors used by JS plugins
    /^data-bs-/,
    // Bootstrap Icons classes, including ones bound dynamically via ngClass
    /^bi$/,
    /^bi-/,
    // Any class starting with 'ng-' (Angular animation/transition classes)
    /^ng-/,
    // GSAP / animation utility classes
    /^gsap-/,
  ],
  greedy: [
    // Preserve all :not(), :is(), :where() pseudo-selectors Bootstrap uses internally
    /^:is\(/,
    /^:not\(/,
    /^:where\(/,
  ],
  keyframes: true,
  variables: true,
};

// ── Run PurgeCSS ─────────────────────────────────────────────────────────────
console.log(`Purging CSS: ${path.basename(cssFile)} (${(originalSize / 1024).toFixed(1)} KiB)`);
console.log(`Content: ${htmlFiles.length} prerendered HTML files`);
console.log(`Source scan: ${sourceFiles.length} app source files`);

const [result] = await new PurgeCSS().purge({
  css: [cssFile],
  content: [
    ...htmlFiles.map((f) => ({ raw: fs.readFileSync(f, 'utf-8'), extension: 'html' })),
    ...sourceFiles.map((f) => ({ raw: fs.readFileSync(f, 'utf-8'), extension: path.extname(f).slice(1) })),
  ],
  safelist,
  // Keep @font-face, @keyframes, CSS custom properties, etc.
  fontFace: false,
  keyframes: false,
  variables: false,
  // Bootstrap uses attribute selectors heavily; keep them all
  rejected: false,
});

const purgedSize = Buffer.byteLength(result.css, 'utf-8');
const saving = originalSize - purgedSize;

fs.writeFileSync(cssFile, result.css);

console.log(
  `Done: ${(purgedSize / 1024).toFixed(1)} KiB ` +
    `(saved ${(saving / 1024).toFixed(1)} KiB / ${Math.round((saving / originalSize) * 100)}%)`
);
