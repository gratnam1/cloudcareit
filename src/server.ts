import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import crypto from 'node:crypto';
import { appendFile } from 'node:fs/promises';
import { promises as dns } from 'node:dns';
import net from 'node:net';
import { join } from 'node:path';
import {
  DEFAULT_PLACE_NAME,
  DEFAULT_REVIEWS_URL,
  loadGoogleReviewsServerConfig,
  type GoogleReviewsServerConfig,
} from './google-reviews.server-config';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.use(express.json({ limit: '100kb' }));
const angularApp = new AngularNodeAppEngine();
const LEGACY_REDIRECTS: Record<string, string> = {
  '/managed-it': '/managed-it-services',
  '/it-support': '/managed-it-services',
  '/it-services': '/managed-it-services',
  '/location': '/managed-it-services',
  '/locations': '/managed-it-services',

  '/managed-it-services/vaughan': '/managed-it-services-vaughan',
  '/managed-it-services/toronto': '/managed-it-services-toronto',
  '/managed-it-services/mississauga': '/managed-it-services-mississauga',
  '/managed-it-services/thornhill': '/managed-it-services-thornhill',
  '/managed-it-services/richmond-hill': '/managed-it-services-richmond-hill',

  '/it-support-vaughan': '/managed-it-services-vaughan',
  '/it-support-toronto': '/managed-it-services-toronto',
  '/it-support-mississauga': '/managed-it-services-mississauga',
  '/it-support-thornhill': '/managed-it-services-thornhill',
  '/it-support-richmond-hill': '/managed-it-services-richmond-hill',

  '/location/vaughan': '/managed-it-services-vaughan',
  '/location/toronto': '/managed-it-services-toronto',
  '/location/mississauga': '/managed-it-services-mississauga',
  '/location/thornhill': '/managed-it-services-thornhill',
  '/location/richmond-hill': '/managed-it-services-richmond-hill',

  '/locations/vaughan': '/managed-it-services-vaughan',
  '/locations/toronto': '/managed-it-services-toronto',
  '/locations/mississauga': '/managed-it-services-mississauga',
  '/locations/thornhill': '/managed-it-services-thornhill',
  '/locations/richmond-hill': '/managed-it-services-richmond-hill',

  '/services/managed-it': '/managed-it-services',
  '/services/google-workspace': '/google-workspace',
  '/services/microsoft-365': '/microsoft-365',
  '/services/office-networking': '/office-networking',
  '/services/aws-infrastructure': '/aws-infrastructure',
  '/services/security-firewall': '/security-firewall',
  '/services/crisis-recovery': '/crisis-recovery',
  '/services/web-development': '/web-development',
  '/services/seo-visibility': '/seo-visibility',
  '/services/lead-generation': '/lead-generation',
  '/services/cyber-insurance-readiness': '/cyber-insurance-readiness-vaughan',
  '/services/managed-it-for-medical-clinics': '/managed-it-for-medical-clinics-vaughan',

  '/cyber-insurance-readiness': '/cyber-insurance-readiness-vaughan',
  '/managed-it-for-medical-clinics': '/managed-it-for-medical-clinics-vaughan',

  '/blog/managed-it-vs-break-fix': '/blog/managed-it-benefits',
  '/blog/microsoft-365-security-basics': '/blog/microsoft-365-tips',
  '/blog/wifi-office-slow': '/blog/office-networking-basics',
  '/managed-it-vs-break-fix': '/blog/managed-it-benefits',
  '/microsoft-365-security-basics': '/blog/microsoft-365-tips',
  '/wifi-office-slow': '/blog/office-networking-basics',
};

type GooglePlaceReview = {
  author_name?: string;
  rating?: number;
  text?: string | { text?: string };
  relative_time_description?: string;
  time?: number;
  profile_photo_url?: string;
};

type GooglePlaceDetailsResult = {
  name?: string;
  place_id?: string;
  rating?: number;
  user_ratings_total?: number;
  url?: string;
  geometry?: {
    location?: {
      lat?: number;
      lng?: number;
    };
  };
  reviews?: GooglePlaceReview[];
};

type GooglePlaceDetailsResponse = {
  status?: string;
  error_message?: string;
  result?: GooglePlaceDetailsResult;
};

type PublicReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  time: number;
  profilePhotoUrl?: string;
};

type PublicReviewsPayload = {
  source: 'google' | 'fallback';
  configured: boolean;
  placeName: string;
  placeId: string;
  rating: number;
  userRatingsTotal: number;
  googleMapsUrl: string;
  fetchedAt: string;
  reviews: PublicReview[];
  error?: string;
};

type MapContext = {
  placeLabel?: string;
  searchQuery?: string;
  latitude?: number;
  longitude?: number;
};

const CACHE_TTL_MS = 10 * 60 * 1000;
const SECURITY_SCAN_RETENTION_MS = 48 * 60 * 60 * 1000;
const SECURITY_SCAN_RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_SCANS_PER_IP_WINDOW = 5;
const MAX_SCANS_PER_EMAIL_WINDOW = 3;
const MAX_SCANS_PER_DOMAIN_WINDOW = 3;
const MAX_SCAN_WORKERS = 2;
const SECURITY_SCAN_DNS_TIMEOUT_MS = 5000;
const SECURITY_SCAN_DEBUG_LOG = join(process.cwd(), 'security-scan-debug.log');

async function writeSecurityScanDebugLog(event: string, detail: Record<string, unknown> = {}) {
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    event,
    ...detail,
  });
  await appendFile(SECURITY_SCAN_DEBUG_LOG, `${entry}\n`, 'utf8').catch(() => undefined);
}

type SecurityScanStatus =
  | 'queued'
  | 'running'
  | 'completed'
  | 'failed'
  | 'review_required';

type SecurityScanRequestPayload = {
  fullName: string;
  companyName: string;
  email: string;
  phone?: string;
  officeSize?: string;
  industry?: string;
  targetDomain: string;
  message?: string;
  consentAuthorized: boolean;
  consentTerms: boolean;
  captchaToken?: string;
  website?: string;
};

type SecurityScanReport = {
  scannedDomain: string;
  checks: Array<{
    id: string;
    label: string;
    status: 'pass' | 'warn' | 'fail';
    detail: string;
  }>;
  riskSummary: string;
};

type SecurityScanJob = {
  requestId: string;
  createdAt: string;
  updatedAt: string;
  status: SecurityScanStatus;
  requesterIp: string;
  payload: SecurityScanRequestPayload;
  reportSummary?: string;
  report?: SecurityScanReport;
  error?: string;
};

const securityScanJobs = new Map<string, SecurityScanJob>();
const securityScanQueue: string[] = [];
const ipRateBuckets = new Map<string, number[]>();
const emailRateBuckets = new Map<string, number[]>();
const domainRateBuckets = new Map<string, number[]>();
let activeScanWorkers = 0;

const PRIVATE_IPV4_PREFIXES = [
  '10.',
  '127.',
  '169.254.',
  '172.16.',
  '172.17.',
  '172.18.',
  '172.19.',
  '172.20.',
  '172.21.',
  '172.22.',
  '172.23.',
  '172.24.',
  '172.25.',
  '172.26.',
  '172.27.',
  '172.28.',
  '172.29.',
  '172.30.',
  '172.31.',
  '192.168.',
];

function cleanRateBucket(bucketMap: Map<string, number[]>, key: string, now: number): number[] {
  const existing = bucketMap.get(key) || [];
  const fresh = existing.filter((timestamp) => now - timestamp < SECURITY_SCAN_RATE_WINDOW_MS);
  if (fresh.length > 0) {
    bucketMap.set(key, fresh);
  } else {
    bucketMap.delete(key);
  }
  return fresh;
}

function consumeRateLimit(
  bucketMap: Map<string, number[]>,
  key: string,
  maxRequests: number,
): boolean {
  const now = Date.now();
  const fresh = cleanRateBucket(bucketMap, key, now);
  if (fresh.length >= maxRequests) return false;
  fresh.push(now);
  bucketMap.set(key, fresh);
  return true;
}

function sanitizeDomain(input: string): string | null {
  const normalized = input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (!normalized || normalized.length > 253) return null;
  if (!/^[a-z0-9.-]+$/.test(normalized)) return null;
  if (!normalized.includes('.')) return null;
  if (normalized.startsWith('.') || normalized.endsWith('.')) return null;
  return normalized;
}

function isForbiddenHost(host: string): boolean {
  const lower = host.toLowerCase();
  if (lower === 'localhost' || lower.endsWith('.local') || lower.endsWith('.internal')) {
    return true;
  }

  if (net.isIP(lower) === 4) {
    return PRIVATE_IPV4_PREFIXES.some((prefix) => lower.startsWith(prefix));
  }

  if (net.isIP(lower) === 6) {
    return lower === '::1' || lower.startsWith('fd') || lower.startsWith('fc');
  }

  return false;
}

function withTimeout<T>(promise: Promise<T>, ms: number, errorMessage: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(errorMessage)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

async function resolvesToPrivateAddress(host: string): Promise<boolean> {
  try {
    const resolution = await withTimeout(
      dns.lookup(host, { all: true }),
      SECURITY_SCAN_DNS_TIMEOUT_MS,
      'dns_lookup_timeout'
    );
    return resolution.some((entry) => isForbiddenHost(entry.address));
  } catch {
    return true;
  }
}

function emailDomainMatchesTarget(email: string, targetDomain: string): boolean {
  const at = email.lastIndexOf('@');
  if (at <= 0) return false;
  const emailDomain = email.slice(at + 1).toLowerCase().trim();
  return emailDomain === targetDomain || emailDomain.endsWith(`.${targetDomain}`);
}

async function verifyCaptchaToken(token: string | undefined): Promise<boolean> {
  const secret = process.env['SECURITY_SCAN_CAPTCHA_SECRET']?.trim();
  if (!secret) return true;
  if (!token?.trim()) return false;

  try {
    const body = new URLSearchParams({ secret, response: token.trim() });
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    });
    if (!response.ok) return false;
    const payload = (await response.json()) as { success?: boolean; score?: number };
    return Boolean(payload.success) && (payload.score === undefined || payload.score >= 0.5);
  } catch {
    return false;
  }
}

async function runExternalScan(targetDomain: string): Promise<SecurityScanReport> {
  const checks: SecurityScanReport['checks'] = [];
  console.log(`[SecurityScan] [${targetDomain}] Running initial HTTP/TLS checks...`);

  let httpsStatus = 0;
  let hasHsts = false;
  let hasCsp = false;
  let hasXFrame = false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(`https://${targetDomain}`, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
      });
      httpsStatus = response.status;
      hasHsts = Boolean(response.headers.get('strict-transport-security'));
      hasCsp = Boolean(response.headers.get('content-security-policy'));
      hasXFrame = Boolean(response.headers.get('x-frame-options'));
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    httpsStatus = 0;
  }

  checks.push({
    id: 'https',
    label: 'HTTPS Reachability',
    status: httpsStatus > 0 && httpsStatus < 500 ? 'pass' : 'fail',
    detail:
      httpsStatus > 0
        ? `HTTPS responded with status ${httpsStatus}.`
        : 'Unable to connect over HTTPS.',
  });

  const missingHeaders = [
    hasHsts ? null : 'HSTS',
    hasCsp ? null : 'CSP',
    hasXFrame ? null : 'X-Frame-Options',
  ].filter((value): value is string => Boolean(value));

  checks.push({
    id: 'http-headers',
    label: 'Security Headers',
    status: missingHeaders.length === 0 ? 'pass' : 'warn',
    detail:
      missingHeaders.length === 0
        ? 'Core security headers were detected.'
        : `Missing or weak header coverage: ${missingHeaders.join(', ')}.`,
  });

  console.log(`[SecurityScan] [${targetDomain}] Checking MX records...`);
  try {
    const mxRecords = await withTimeout(
      dns.resolveMx(targetDomain),
      SECURITY_SCAN_DNS_TIMEOUT_MS,
      'dns_mx_timeout'
    );
    checks.push({
      id: 'dns-mx',
      label: 'MX Record Baseline',
      status: mxRecords.length > 0 ? 'pass' : 'warn',
      detail:
        mxRecords.length > 0
          ? `${mxRecords.length} MX record(s) detected.`
          : 'No MX records detected.',
    });
  } catch {
    checks.push({
      id: 'dns-mx',
      label: 'MX Record Baseline',
      status: 'warn',
      detail: 'Unable to resolve MX records.',
    });
  }

  console.log(`[SecurityScan] [${targetDomain}] Checking NS delegation...`);
  try {
    const nsRecords = await withTimeout(
      dns.resolveNs(targetDomain),
      SECURITY_SCAN_DNS_TIMEOUT_MS,
      'dns_ns_timeout'
    );
    checks.push({
      id: 'dns-ns',
      label: 'NS Delegation Check',
      status: nsRecords.length >= 2 ? 'pass' : 'warn',
      detail:
        nsRecords.length >= 2
          ? `${nsRecords.length} NS record(s) detected.`
          : 'Low NS redundancy detected.',
    });
  } catch {
    checks.push({
      id: 'dns-ns',
      label: 'NS Delegation Check',
      status: 'warn',
      detail: 'Unable to resolve NS records.',
    });
  }

  console.log(`[SecurityScan] [${targetDomain}] Finalizing report.`);
  const failedChecks = checks.filter((check) => check.status === 'fail').length;
  const warningChecks = checks.filter((check) => check.status === 'warn').length;
  const riskSummary =
    failedChecks > 0
      ? `High priority: ${failedChecks} critical issue(s) found, plus ${warningChecks} warning(s).`
      : warningChecks > 0
        ? `Moderate priority: ${warningChecks} warning(s) found in baseline checks.`
        : 'Low priority: no major issues found in this external baseline scan.';

  return {
    scannedDomain: targetDomain,
    checks,
    riskSummary,
  };
}

function cleanupExpiredSecurityScans() {
  const cutoff = Date.now() - SECURITY_SCAN_RETENTION_MS;
  for (const [requestId, job] of securityScanJobs.entries()) {
    if (new Date(job.createdAt).getTime() < cutoff) {
      securityScanJobs.delete(requestId);
    }
  }
}

function maybeStartSecurityScanWorker() {
  while (activeScanWorkers < MAX_SCAN_WORKERS && securityScanQueue.length > 0) {
    const requestId = securityScanQueue.shift();
    if (!requestId) return;
    const job = securityScanJobs.get(requestId);
    if (!job || job.status !== 'queued') continue;

    activeScanWorkers += 1;
    void (async () => {
      job.status = 'running';
      job.updatedAt = new Date().toISOString();
      console.log(`[SecurityScan Worker] Starting scan for ${job.payload.targetDomain} (req: ${requestId})`);

      try {
        const report = await runExternalScan(job.payload.targetDomain);
        job.status = 'completed';
        job.report = report;
        job.reportSummary = report.riskSummary;
        job.updatedAt = new Date().toISOString();
        console.log(`[SecurityScan Worker] Completed scan for ${job.payload.targetDomain}. Risk Summary: ${report.riskSummary}`);
      } catch (error) {
        job.status = 'failed';
        job.error = error instanceof Error ? error.message : 'Unexpected scanning error.';
        job.reportSummary = 'Unable to complete automated checks. Manual review required.';
        job.updatedAt = new Date().toISOString();
        console.error(`[SecurityScan Worker] Failed scan for ${job.payload.targetDomain}:`, error);
      } finally {
        activeScanWorkers -= 1;
        maybeStartSecurityScanWorker();
      }
    })();
  }
}

const FALLBACK_REVIEWS: PublicReview[] = [
  {
    authorName: 'Toronto Law Office',
    rating: 5,
    text: 'Professional and knowledgeable team. They resolved our server incident quickly and documented every step clearly.',
    relativeTimeDescription: 'recently',
    time: Math.floor(Date.now() / 1000),
  },
  {
    authorName: 'Vaughan Accounting Practice',
    rating: 5,
    text: 'Excellent Microsoft 365 and endpoint rollout. Migration was organized, downtime was minimal, and staff adoption was smooth.',
    relativeTimeDescription: 'recently',
    time: Math.floor(Date.now() / 1000),
  },
  {
    authorName: 'GTA Medical Clinic',
    rating: 5,
    text: 'Reliable support and practical security guidance. Their team improved our backup confidence and daily IT stability.',
    relativeTimeDescription: 'recently',
    time: Math.floor(Date.now() / 1000),
  },
];

let reviewsCache: {
  payload: PublicReviewsPayload;
  expiresAt: number;
  cacheKey: string;
} | null = null;
const PLACE_ID_PATTERN = /^ChI[0-9A-Za-z_-]+$/;
const FEATURE_ID_PATTERN = /^0x[0-9a-f]+:0x[0-9a-f]+$/i;
const NAME_STOP_WORDS = new Set([
  'services',
  'service',
  'solutions',
  'solution',
  'inc',
  'ltd',
  'corp',
  'corporation',
  'company',
  'co',
  'group',
  'the',
  'it',
  'tech',
  'technologies',
]);

function buildFallbackPayload(
  configured: boolean,
  error?: string,
  placeId = '',
  googleMapsUrlOverride?: string,
  useCuratedReviews = false,
): PublicReviewsPayload {
  const showCuratedFallback = !configured || useCuratedReviews;
  return {
    source: 'fallback',
    configured,
    placeName: DEFAULT_PLACE_NAME,
    placeId,
    rating: showCuratedFallback ? 5 : 0,
    userRatingsTotal: showCuratedFallback ? FALLBACK_REVIEWS.length : 0,
    googleMapsUrl: googleMapsUrlOverride?.trim() || DEFAULT_REVIEWS_URL,
    fetchedAt: new Date().toISOString(),
    reviews: showCuratedFallback ? FALLBACK_REVIEWS : [],
    error: useCuratedReviews ? undefined : error,
  };
}

function normalizeReview(review: GooglePlaceReview): PublicReview | null {
  const rawText = review.text;
  const text =
    typeof rawText === 'string'
      ? rawText.trim()
      : typeof rawText?.text === 'string'
        ? rawText.text.trim()
        : '';
  const rating = Number.isFinite(review.rating) ? Number(review.rating) : 5;
  const safeText = text || `Rated ${rating} stars on Google.`;

  return {
    authorName: review.author_name?.trim() || 'Google User',
    rating,
    text: safeText,
    relativeTimeDescription: review.relative_time_description?.trim() || 'recently',
    time: Number.isFinite(review.time)
      ? Number(review.time)
      : Math.floor(Date.now() / 1000),
    profilePhotoUrl: review.profile_photo_url,
  };
}

function isCanonicalPlaceId(value: string): boolean {
  return PLACE_ID_PATTERN.test(value.trim());
}

function isFeatureId(value: string): boolean {
  return FEATURE_ID_PATTERN.test(value.trim());
}

function tokenizeBusinessName(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !NAME_STOP_WORDS.has(token));
}

function businessStem(value: string): string {
  return tokenizeBusinessName(value).join('');
}

function namesLikelyMatch(expectedName: string, actualName: string): boolean {
  const expectedTokens = tokenizeBusinessName(expectedName);
  const actualTokens = tokenizeBusinessName(actualName);

  if (expectedTokens.length === 0 || actualTokens.length === 0) return true;

  const expectedStem = businessStem(expectedName);
  const actualStem = businessStem(actualName);
  if (!expectedStem || !actualStem) return true;

  // Strong exact/stem checks first.
  if (expectedStem === actualStem) return true;
  if (
    expectedTokens.length >= 2 &&
    expectedStem.length >= 6 &&
    (actualStem.includes(expectedStem) || expectedStem.includes(actualStem))
  ) {
    return true;
  }

  // Token checks should be exact, not fuzzy substrings.
  const exactTokenMatches = expectedTokens.filter((token) =>
    actualTokens.includes(token),
  ).length;

  if (expectedTokens.length === 1) {
    // For a single-token expected name (often too generic), require closer parity.
    return exactTokenMatches === 1 && actualTokens.length <= 2;
  }

  return exactTokenMatches >= Math.min(2, expectedTokens.length);
}

function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c;
}

function parseMapContext(rawUrl: string): MapContext {
  try {
    const parsed = new URL(rawUrl);
    const decodedPath = decodeURIComponent(parsed.pathname);
    const placeMatch = decodedPath.match(/\/maps\/place\/([^/]+)/i);
    const placeLabel = placeMatch?.[1]?.replace(/\+/g, ' ').trim();
    // Maps URLs often contain both viewport center (@lat,lng) and exact place coordinates (!3dlat!4dlng).
    // Prefer exact place coordinates to avoid biased lookups around the wrong point.
    const exactLocationMatch = decodedPath.match(
      /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
    );
    const viewportMatch = decodedPath.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
    const latitude = exactLocationMatch
      ? Number(exactLocationMatch[1])
      : viewportMatch
        ? Number(viewportMatch[1])
        : undefined;
    const longitude = exactLocationMatch
      ? Number(exactLocationMatch[2])
      : viewportMatch
        ? Number(viewportMatch[2])
        : undefined;
    const query = parsed.searchParams.get('q')?.trim();
    const searchQuery = [placeLabel, query].filter((value): value is string => Boolean(value)).join(' ');

    return {
      placeLabel,
      searchQuery: searchQuery || undefined,
      latitude: Number.isFinite(latitude) ? latitude : undefined,
      longitude: Number.isFinite(longitude) ? longitude : undefined,
    };
  } catch {
    return {};
  }
}

async function deriveMapContextFromReviewUrl(
  rawReviewUrl?: string,
): Promise<MapContext> {
  if (!rawReviewUrl) return {};

  const directContext = parseMapContext(rawReviewUrl);
  if (directContext.placeLabel || directContext.searchQuery) return directContext;

  try {
    const response = await fetch(rawReviewUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: { Accept: 'text/html,*/*;q=0.1' },
    });
    const resolvedContext = parseMapContext(response.url);
    if (resolvedContext.placeLabel || resolvedContext.searchQuery) return resolvedContext;
  } catch (error) {
    console.error('Unable to derive map context from GOOGLE_REVIEW_PAGE_URL:', error);
  }

  return directContext;
}

function buildSearchQueryFromUrl(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl);
    const q = parsed.searchParams.get('q')?.trim();
    const query = parsed.searchParams.get('query')?.trim();
    const kgmid = parsed.searchParams.get('kgmid')?.trim();
    const kgs = parsed.searchParams.get('kgs')?.trim();
    const decodedPath = decodeURIComponent(parsed.pathname);
    const mapPlaceMatch = decodedPath.match(/\/maps\/place\/([^/]+)/i);
    const placeLabel = mapPlaceMatch
      ? mapPlaceMatch[1].replace(/\+/g, ' ').trim()
      : null;

    const tokens = [q, query, placeLabel, kgmid ? `kgmid ${kgmid}` : null, kgs ? `kgs ${kgs}` : null]
      .filter((token): token is string => Boolean(token))
      .map((token) => token.trim());

    return tokens.length > 0 ? tokens.join(' ') : null;
  } catch {
    return null;
  }
}

function extractFeatureIdFromString(input: string): string | null {
  const match = input.match(/0x[0-9a-f]+:0x[0-9a-f]+/i);
  return match ? match[0] : null;
}

function extractFeatureIdFromUrl(rawUrl: string): string | null {
  const direct = extractFeatureIdFromString(rawUrl);
  if (direct) return direct;

  try {
    const parsed = new URL(rawUrl);
    const decodedPath = decodeURIComponent(parsed.pathname);
    const decodedSearch = decodeURIComponent(parsed.search);
    return (
      extractFeatureIdFromString(decodedPath) ||
      extractFeatureIdFromString(decodedSearch) ||
      null
    );
  } catch {
    return null;
  }
}

async function derivePlaceIdFromReviewUrl(rawReviewUrl?: string): Promise<string | null> {
  if (!rawReviewUrl) return null;

  const direct = extractFeatureIdFromUrl(rawReviewUrl);
  if (direct && isCanonicalPlaceId(direct)) return direct;

  const placeIdFromUrl = rawReviewUrl.match(/ChI[0-9A-Za-z_-]+/);
  if (placeIdFromUrl?.[0]) return placeIdFromUrl[0];

  try {
    const directParsed = new URL(rawReviewUrl);
    const placeParam = directParsed.searchParams.get('place_id')?.trim();
    if (placeParam && isCanonicalPlaceId(placeParam)) return placeParam;
  } catch {
    // Ignore invalid URL parsing and continue with fetch fallback.
  }

  // Do not return feature IDs (0x...:0x...) here. Place Details requires canonical place_id.

  try {
    const response = await fetch(rawReviewUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: { Accept: 'text/html,*/*;q=0.1' },
    });

    const fromFinalUrl = response.url.match(/ChI[0-9A-Za-z_-]+/);
    if (fromFinalUrl?.[0]) return fromFinalUrl[0];

    const html = await response.text();
    const fromHtml = html.match(/ChI[0-9A-Za-z_-]+/);
    if (fromHtml?.[0]) return fromHtml[0];
  } catch (error) {
    console.error('Unable to derive place_id from GOOGLE_REVIEW_PAGE_URL:', error);
  }

  return null;
}

async function deriveSearchQuery(
  config: GoogleReviewsServerConfig,
  mapContext?: MapContext,
): Promise<string | null> {
  const explicitQuery = config.searchQuery?.trim();
  if (explicitQuery) return explicitQuery;

  const contextualQuery = mapContext?.searchQuery?.trim();
  if (contextualQuery) return contextualQuery;

  const rawReviewUrl = config.reviewPageUrl?.trim();
  if (!rawReviewUrl) return null;

  const direct = buildSearchQueryFromUrl(rawReviewUrl);
  if (direct) return direct;

  try {
    const response = await fetch(rawReviewUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: { Accept: 'text/html,*/*;q=0.1' },
    });

    const resolved = buildSearchQueryFromUrl(response.url);
    if (resolved) return resolved;
  } catch (error) {
    console.error('Unable to resolve GOOGLE_REVIEW_PAGE_URL:', error);
  }

  return null;
}

async function resolvePlaceIdFromSearch(
  apiKey: string,
  searchQuery: string,
  mapContext?: MapContext,
  expectedPlaceName?: string,
): Promise<string | null> {
  console.log(`[Google Reviews] 🔍 Starting Place ID resolution for query: "${searchQuery}"`);
  try {
    const findPlaceParams = new URLSearchParams({
      input: searchQuery,
      inputtype: 'textquery',
      fields: 'place_id,name,rating,user_ratings_total',
      key: apiKey,
    });
    if (
      Number.isFinite(mapContext?.latitude) &&
      Number.isFinite(mapContext?.longitude)
    ) {
      findPlaceParams.set(
        'locationbias',
        `circle:15000@${mapContext!.latitude},${mapContext!.longitude}`,
      );
    }

    const findPlaceResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${findPlaceParams.toString()}`,
      { headers: { Accept: 'application/json' } },
    );

    if (findPlaceResponse.ok) {
      const findPlaceData = (await findPlaceResponse.json()) as {
        status?: string;
        error_message?: string;
        candidates?: Array<{ place_id?: string; name?: string }>;
      };
      if (findPlaceData.status === 'REQUEST_DENIED') {
        console.error(`[Google Reviews] ❌ Find Place API REQUEST_DENIED: ${findPlaceData.error_message} - Check API Key permissions.`);
      }
      const findPlaceCandidates = (findPlaceData.candidates ?? []).filter(
        (item) =>
          item.place_id &&
          isCanonicalPlaceId(item.place_id) &&
          (!expectedPlaceName ||
            (item.name && namesLikelyMatch(expectedPlaceName, item.name))),
      );
      const findPlaceCandidate = findPlaceCandidates[0];
      if (findPlaceCandidate?.place_id && isCanonicalPlaceId(findPlaceCandidate.place_id)) {
        console.log(`[Google Reviews] ✅ Match found via 'Find Place' API: ${findPlaceCandidate.place_id}`);
        return findPlaceCandidate.place_id.trim();
      }
    }

    const textSearchParams = new URLSearchParams({
      query: searchQuery,
      key: apiKey,
    });
    if (
      Number.isFinite(mapContext?.latitude) &&
      Number.isFinite(mapContext?.longitude)
    ) {
      textSearchParams.set(
        'location',
        `${mapContext!.latitude},${mapContext!.longitude}`,
      );
      textSearchParams.set('radius', '20000');
    }
    const textSearchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?${textSearchParams.toString()}`,
      { headers: { Accept: 'application/json' } },
    );

    if (!textSearchResponse.ok) {
      console.warn(`[Google Reviews] Text Search failed with HTTP ${textSearchResponse.status}`);
      // Fall through to Nearby Search instead of returning null
    }

    const textSearchData = textSearchResponse.ok ? (await textSearchResponse.json()) as {
      status?: string;
      error_message?: string;
      results?: Array<{
        place_id?: string;
        name?: string;
        geometry?: { location?: { lat?: number; lng?: number } };
      }>;
    } : { status: 'HTTP_ERROR', results: [] };

    console.log(`[Google Reviews] Strategy 2 (Text Search): Status ${textSearchData.status}, Found ${textSearchData.results?.length ?? 0} results`);

    if (textSearchData.status === 'REQUEST_DENIED') {
      console.error(`[Google Reviews] ❌ Text Search API REQUEST_DENIED: ${textSearchData.error_message} - Check API Key permissions.`);
    }
    if (textSearchData.status !== 'OK' && textSearchData.status !== 'ZERO_RESULTS') {
      console.error(`[Google Reviews] Text Search API Error: ${textSearchData.status} - ${textSearchData.error_message}`);
    }
    const textSearchCandidates = (textSearchData.results ?? []).filter(
      (item) => {
        const hasId = item.place_id && isCanonicalPlaceId(item.place_id);
        const nameMatch = !expectedPlaceName || (item.name && namesLikelyMatch(expectedPlaceName, item.name));
        
        if (!nameMatch && item.name) {
          console.log(`[Google Reviews] Skipping candidate "${item.name}" - Name does not match expected "${expectedPlaceName}"`);
        }
        return hasId && nameMatch;
      }
    );

    const textSearchCandidate =
      Number.isFinite(mapContext?.latitude) &&
      Number.isFinite(mapContext?.longitude)
        ? textSearchCandidates
            .slice()
            .sort((a, b) => {
              const aLat = a.geometry?.location?.lat;
              const aLng = a.geometry?.location?.lng;
              const bLat = b.geometry?.location?.lat;
              const bLng = b.geometry?.location?.lng;
              const aDistance =
                Number.isFinite(aLat) && Number.isFinite(aLng)
                  ? haversineDistanceKm(
                      mapContext!.latitude!,
                      mapContext!.longitude!,
                      Number(aLat),
                      Number(aLng),
                    )
                  : Number.POSITIVE_INFINITY;
              const bDistance =
                Number.isFinite(bLat) && Number.isFinite(bLng)
                  ? haversineDistanceKm(
                      mapContext!.latitude!,
                      mapContext!.longitude!,
                      Number(bLat),
                      Number(bLng),
                    )
                  : Number.POSITIVE_INFINITY;
              return aDistance - bDistance;
            })[0]
        : textSearchCandidates[0];
    if (textSearchCandidate?.place_id && isCanonicalPlaceId(textSearchCandidate.place_id)) {
      console.log(`[Google Reviews] ✅ Match found via 'Text Search' API: ${textSearchCandidate.place_id}`);
      return textSearchCandidate.place_id.trim();
    }

    // Do not use the first search result when the name does not match—that would show another business's reviews.

    const searchLat = mapContext?.latitude ?? 43.8372; // Default to Vaughan Lat
    const searchLng = mapContext?.longitude ?? -79.5083; // Default to Vaughan Lng

    if (
      Number.isFinite(searchLat) &&
      Number.isFinite(searchLng)
    ) {
      const nearbyParams = new URLSearchParams({
        location: `${searchLat},${searchLng}`,
        radius: '25000',
        keyword: expectedPlaceName || searchQuery,
        key: apiKey,
      });
      console.log(`[Google Reviews] Attempting Strategy 3 (Nearby Search) at ${searchLat},${searchLng}...`);
      const nearbyResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${nearbyParams.toString()}`,
        { headers: { Accept: 'application/json' } },
      );

      if (nearbyResponse.ok) {
        const nearbyData = (await nearbyResponse.json()) as {
          status?: string;
          error_message?: string;
          results?: Array<{
            place_id?: string;
            name?: string;
            geometry?: { location?: { lat?: number; lng?: number } };
          }>;
        };
        console.log(`[Google Reviews] Strategy 3 (Nearby Search): Status ${nearbyData.status}, Found ${nearbyData.results?.length ?? 0} results`);

        if (nearbyData.status === 'REQUEST_DENIED') {
          console.error(`[Google Reviews] ❌ Nearby Search API REQUEST_DENIED: ${nearbyData.error_message} - Check API Key permissions.`);
        }
        const nearbyCandidates = (nearbyData.results ?? []).filter(
          (item) =>
            item.place_id &&
            isCanonicalPlaceId(item.place_id) &&
            (!expectedPlaceName ||
              (item.name && namesLikelyMatch(expectedPlaceName, item.name))),
        );
        const nearbyBest = nearbyCandidates
          .slice()
          .sort((a, b) => {
            const aLat = a.geometry?.location?.lat;
            const aLng = a.geometry?.location?.lng;
            const bLat = b.geometry?.location?.lat;
            const bLng = b.geometry?.location?.lng;
            const aDistance =
              Number.isFinite(aLat) && Number.isFinite(aLng)
                ? haversineDistanceKm( // Non-null assertion is safe here due to outer check
                    searchLat!,
                    searchLng!,
                    Number(aLat),
                    Number(aLng),
                  )
                : Number.POSITIVE_INFINITY;
            const bDistance =
              Number.isFinite(bLat) && Number.isFinite(bLng)
                ? haversineDistanceKm( // Non-null assertion is safe here due to outer check
                    searchLat!,
                    searchLng!,
                    Number(bLat),
                    Number(bLng),
                  )
                : Number.POSITIVE_INFINITY;
            return aDistance - bDistance;
          })[0];
        if (nearbyBest?.place_id && isCanonicalPlaceId(nearbyBest.place_id)) {
          console.log(`[Google Reviews] ✅ Match found via 'Nearby Search' API: ${nearbyBest.place_id}`);
          return nearbyBest.place_id.trim();
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Place ID resolution failed:', error);
    return null;
  }
}

async function loadGoogleReviews(): Promise<PublicReviewsPayload> {
  const config = loadGoogleReviewsServerConfig();
  const googlePlacesApiKey = config.apiKey;
  const mapContext = await deriveMapContextFromReviewUrl(config.reviewPageUrl);
  const expectedPlaceName =
    config.expectedPlaceName?.trim() ||
    mapContext.placeLabel?.trim() ||
    DEFAULT_PLACE_NAME;
  let googlePlaceId = config.placeId?.trim();
  let invalidPlaceIdProvided = false;
  const placeIdExplicitlySet = Boolean(
    config.placeId?.trim() &&
      !isFeatureId(config.placeId.trim()) &&
      isCanonicalPlaceId(config.placeId.trim()),
  );
  const cacheKey = JSON.stringify({
    placeId: config.placeId || '',
    searchQuery: config.searchQuery || '',
    reviewUrl: config.reviewPageUrl || '',
    expectedName: config.expectedPlaceName || '',
  });

  if (!googlePlacesApiKey) {
    return buildFallbackPayload(
      false,
      'Set GOOGLE_PLACES_API_KEY (or GOOGLE_MAPS_API_KEY) in environment variables or .env.local.',
      config.placeId || '',
      config.reviewPageUrl,
      true,
    );
  }

  if (googlePlaceId) {
    if (isFeatureId(googlePlaceId)) {
      invalidPlaceIdProvided = true;
      googlePlaceId = undefined;
    } else if (!isCanonicalPlaceId(googlePlaceId)) {
      invalidPlaceIdProvided = true;
      googlePlaceId = undefined;
    }
  }

  if (!googlePlaceId) {
    const derivedPlaceId = await derivePlaceIdFromReviewUrl(config.reviewPageUrl);
    if (derivedPlaceId && isCanonicalPlaceId(derivedPlaceId)) {
      googlePlaceId = derivedPlaceId;
    }
  }

  const searchQuery =
    config.searchQuery?.trim() ||
    (await deriveSearchQuery(config, mapContext)) ||
    DEFAULT_PLACE_NAME;

  if (!googlePlaceId) {
    if (searchQuery) {
      const resolved = await resolvePlaceIdFromSearch(
        googlePlacesApiKey,
        searchQuery,
        mapContext,
        expectedPlaceName,
      );
      if (resolved) {
        console.log(`[Google Reviews] Successfully resolved Place ID: ${resolved}`);
        googlePlaceId = resolved;
      }
    }
  }

  if (!googlePlaceId) {
    return buildFallbackPayload(
      true,
      invalidPlaceIdProvided
        ? 'Invalid GOOGLE_PLACE_ID format. Use canonical place_id (ChIJ...), not feature IDs (0x...:0x...).'
        : `Unable to resolve place_id for query "${searchQuery}". Set GOOGLE_PLACE_ID (ChIJ...) explicitly.`,
      config.placeId || '',
      config.reviewPageUrl,
      true,
    );
  }

  if (
    reviewsCache &&
    reviewsCache.expiresAt > Date.now() &&
    reviewsCache.cacheKey === cacheKey
  ) {
    // Do not use cache from a different place (e.g. wrong company from a previous search fallback).
    if (placeIdExplicitlySet && reviewsCache.payload.placeId !== config.placeId?.trim()) {
      reviewsCache = null;
    } else {
      return reviewsCache.payload;
    }
  }

  const params = new URLSearchParams({
    place_id: googlePlaceId,
    fields: 'name,place_id,rating,user_ratings_total,url,reviews,geometry',
    key: googlePlacesApiKey,
  });

  const requestUrl = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`;
  console.log(`[Google Reviews] Attempting to fetch details for Place ID: "${googlePlaceId}"`);

  try {
    const response = await fetch(
      requestUrl,
      { headers: { Accept: 'application/json' } },
    );

    if (!response.ok) {
      console.error(`[Google Reviews] API request failed with status: ${response.status}`);
      return buildFallbackPayload(
        true,
        `Google API request failed (${response.status}).`,
        googlePlaceId,
        config.reviewPageUrl,
        true,
      );
    }

    let data = (await response.json()) as GooglePlaceDetailsResponse;

    const placeIdNoLongerValid =
      (data.error_message?.toLowerCase().includes('no longer valid') ||
        data.error_message?.toLowerCase().includes('place id is no longer valid')) ?? false;

    if (data.status !== 'OK' || !data.result) {
      // Auto-recovery: If Place ID is invalid/rotated, try to find the new one via search.
      const isInvalidId =
        data.status === 'INVALID_REQUEST' ||
        data.status === 'NOT_FOUND' ||
        placeIdNoLongerValid;

      if (isInvalidId) {
        console.warn(`[Google Reviews] API Error for ID "${googlePlaceId}": ${data.status} - ${data.error_message}`);
        console.log('[Google Reviews] Attempting auto-recovery via search...');

        const recoverySearchQuery = searchQuery || DEFAULT_PLACE_NAME;
        const newId = await resolvePlaceIdFromSearch(
          googlePlacesApiKey,
          recoverySearchQuery,
          mapContext,
          expectedPlaceName,
        );

        if (newId) {
          console.log(`[Google Reviews] Resolved new Place ID: ${newId}. Retrying fetch...`);
          params.set('place_id', newId);
          const retryResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`,
            { headers: { Accept: 'application/json' } },
          );
          if (retryResponse.ok) {
            data = (await retryResponse.json()) as GooglePlaceDetailsResponse;
            if (data.status === 'OK' && data.result) {
              googlePlaceId = newId; // Update for cache
            }
          }
        }
      }
    }

    if (data.status !== 'OK' || !data.result) {
      const reason = data.error_message || data.status || 'unknown error';
      const actionableMessage = placeIdNoLongerValid
        ? 'The cached Place ID is no longer valid. Get a fresh Place ID from Google Maps: open maps.google.com, search your business, open the listing, click Share and copy the link. Use the Place ID finder (see Google Cloud Places docs) with that Maps link to get the current Place ID, then set GOOGLE_PLACE_ID in .env.local. The ID in search.google.com/reviews may be deprecated for the API.'
        : `Google API response error: ${reason}.`;
      return buildFallbackPayload(true, actionableMessage, googlePlaceId, config.reviewPageUrl, true);
    }

    const resolvedPlaceName = data.result.name?.trim() || '';
    if (
      !placeIdExplicitlySet &&
      expectedPlaceName &&
      resolvedPlaceName &&
      !namesLikelyMatch(expectedPlaceName, resolvedPlaceName)
    ) {
      return buildFallbackPayload(
        true,
        `Resolved place "${resolvedPlaceName}" does not match expected "${expectedPlaceName}". Set GOOGLE_PLACE_ID (ChIJ...) explicitly.`,
        googlePlaceId,
        config.reviewPageUrl,
        true,
      );
    }

    if (
      !placeIdExplicitlySet &&
      Number.isFinite(mapContext.latitude) &&
      Number.isFinite(mapContext.longitude) &&
      Number.isFinite(data.result.geometry?.location?.lat) &&
      Number.isFinite(data.result.geometry?.location?.lng)
    ) {
      const resolvedLatitude = Number(data.result.geometry!.location!.lat);
      const resolvedLongitude = Number(data.result.geometry!.location!.lng);
      const distanceKm = haversineDistanceKm(
        mapContext.latitude!,
        mapContext.longitude!,
        resolvedLatitude,
        resolvedLongitude,
      );

      // Any resolved place hundreds of kilometers away from the map link is almost certainly wrong.
      if (distanceKm > 250) {
        return buildFallbackPayload(
          true,
          `Resolved place "${resolvedPlaceName}" is ${Math.round(
            distanceKm,
          )}km away from the provided map URL context. Set GOOGLE_PLACE_ID (ChIJ...) explicitly.`,
          googlePlaceId,
          config.reviewPageUrl,
          true,
        );
      }
    }

    let reviews = (data.result.reviews ?? [])
      .map((review) => normalizeReview(review))
      .filter((review): review is PublicReview => Boolean(review))
      .sort((a, b) => b.time - a.time)
      .slice(0, 6);

    const rating = Number.isFinite(data.result.rating) ? Number(data.result.rating) : 5;
    const userRatingsTotal = Number.isFinite(data.result.user_ratings_total)
      ? Number(data.result.user_ratings_total)
      : Math.max(reviews.length, FALLBACK_REVIEWS.length);

    const missingTextFromGoogle = reviews.length === 0 && userRatingsTotal > 0;
    if (missingTextFromGoogle) {
      reviews = [
        {
          authorName: 'Google User',
          rating,
          text: `Google reports ${userRatingsTotal} rating${userRatingsTotal === 1 ? '' : 's'} for this listing. Written review text was not returned by the Places API response.`,
          relativeTimeDescription: 'Google',
          time: Math.floor(Date.now() / 1000),
        },
      ];
    }

    const payload: PublicReviewsPayload = {
      source: 'google',
      configured: true,
      placeName: data.result.name?.trim() || DEFAULT_PLACE_NAME,
      placeId: data.result.place_id?.trim() || googlePlaceId,
      rating,
      userRatingsTotal,
      googleMapsUrl: data.result.url?.trim() || DEFAULT_REVIEWS_URL,
      fetchedAt: new Date().toISOString(),
      reviews,
      error:
        reviews.length > 0
          ? missingTextFromGoogle
            ? 'Google returned rating data but not written review text for this place.'
            : undefined
          : 'No public reviews returned by Google API.',
    };

    reviewsCache = { payload, expiresAt: Date.now() + CACHE_TTL_MS, cacheKey };
    return payload;
  } catch (error) {
    console.error('Google reviews fetch failed:', error);
    return buildFallbackPayload(
      true,
      'Unable to fetch reviews from Google right now.',
      googlePlaceId || '',
      config.reviewPageUrl,
      true,
    );
  }
}

// ===== IT Assessment request endpoint =====
app.post('/api/it-assessment', async (req, res) => {
  const body = req.body as {
    fullName?: string;
    companyName?: string;
    email?: string;
    phone?: string;
    officeSize?: string;
    industry?: string;
    message?: string;
    website?: string;
  };

  // Honeypot
  if (body.website) {
    res.status(200).json({ ok: true });
    return;
  }

  const fullName = String(body.fullName || '').trim();
  const companyName = String(body.companyName || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const officeSize = String(body.officeSize || '').trim();
  const industry = String(body.industry || '').trim();
  const message = String(body.message || '').trim();

  if (!fullName || !email) {
    res.status(400).json({ error: 'Name and email are required.' });
    return;
  }

  const RESEND_API_KEY = process.env['RESEND_API_KEY'] || '';
  const NOTIFY_EMAIL = process.env['ASSESSMENT_NOTIFY_EMAIL'] || 'info@ctrlshiftit.ca';

  if (!RESEND_API_KEY) {
    console.error('[it-assessment] RESEND_API_KEY not set');
    res.status(500).json({ error: 'Email service not configured.' });
    return;
  }

  const htmlBody = `
    <h2>New IT Assessment Request</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${fullName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${companyName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone || '—'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Employees</td><td style="padding:8px;border:1px solid #ddd">${officeSize || '—'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Industry</td><td style="padding:8px;border:1px solid #ddd">${industry || '—'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${message || '—'}</td></tr>
    </table>
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CtrlShift IT <noreply@ctrlshiftit.ca>',
        to: [NOTIFY_EMAIL],
        subject: `New IT Assessment Request — ${fullName} (${companyName || email})`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => '');
      console.error('[it-assessment] Resend error:', resendRes.status, errText);
      res.status(500).json({ error: 'Failed to send email notification.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[it-assessment] Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected server error.' });
  }
});

app.post('/api/security-scans/request', async (req, res) => {
  cleanupExpiredSecurityScans();

  const payload = (req.body ?? {}) as Partial<SecurityScanRequestPayload>;
  const requesterIp = (req.ip || req.socket.remoteAddress || 'unknown').toString();
  const normalizedPayload: SecurityScanRequestPayload = {
    fullName: String(payload.fullName || '').trim(),
    companyName: String(payload.companyName || '').trim(),
    email: String(payload.email || '').trim().toLowerCase(),
    phone: String(payload.phone || '').trim(),
    officeSize: String(payload.officeSize || '').trim(),
    industry: String(payload.industry || '').trim(),
    targetDomain: String(payload.targetDomain || '').trim().toLowerCase(),
    message: String(payload.message || '').trim(),
    consentAuthorized: Boolean(payload.consentAuthorized),
    consentTerms: Boolean(payload.consentTerms),
    captchaToken: String(payload.captchaToken || '').trim(),
    website: String(payload.website || '').trim(),
  };

  const requestStartedAt = Date.now();
  await writeSecurityScanDebugLog('request_received', {
    requesterIp,
    email: normalizedPayload.email,
    targetDomain: normalizedPayload.targetDomain,
  });

  if (normalizedPayload.website) {
    res.status(202).json({ accepted: true });
    return;
  }

  const targetDomain = sanitizeDomain(normalizedPayload.targetDomain);
  if (
    !normalizedPayload.fullName ||
    !normalizedPayload.companyName ||
    !normalizedPayload.email ||
    !targetDomain
  ) {
    res.status(400).json({ error: 'Please complete all required fields.' });
    return;
  }

  if (!normalizedPayload.consentAuthorized || !normalizedPayload.consentTerms) {
    res.status(400).json({ error: 'Authorization and consent are required.' });
    return;
  }

  await writeSecurityScanDebugLog('dns_guard_start', { targetDomain });
  const privateResolution = await resolvesToPrivateAddress(targetDomain);
  await writeSecurityScanDebugLog('dns_guard_done', { targetDomain, privateResolution });
  if (isForbiddenHost(targetDomain) || privateResolution) {
    res.status(400).json({ error: 'This request target is not allowed.' });
    return;
  }

  if (!emailDomainMatchesTarget(normalizedPayload.email, targetDomain)) {
    res.status(403).json({
      error:
        'Ownership verification failed. Use a business email matching the requested domain.',
    });
    return;
  }

  const captchaValid = await verifyCaptchaToken(normalizedPayload.captchaToken);
  await writeSecurityScanDebugLog('captcha_validated', { targetDomain, captchaValid });
  if (!captchaValid) {
    res.status(400).json({ error: 'Captcha validation failed.' });
    return;
  }

  const canProceed =
    consumeRateLimit(ipRateBuckets, requesterIp, MAX_SCANS_PER_IP_WINDOW) &&
    consumeRateLimit(emailRateBuckets, normalizedPayload.email, MAX_SCANS_PER_EMAIL_WINDOW) &&
    consumeRateLimit(domainRateBuckets, targetDomain, MAX_SCANS_PER_DOMAIN_WINDOW);
  if (!canProceed) {
    res.status(429).json({ error: 'Too many scan requests. Please try again later.' });
    return;
  }

  normalizedPayload.targetDomain = targetDomain;
  const requestId = crypto.randomUUID();
  const now = new Date().toISOString();
  const job: SecurityScanJob = {
    requestId,
    createdAt: now,
    updatedAt: now,
    status: 'queued',
    requesterIp,
    payload: normalizedPayload,
    reportSummary: 'Scan queued for external baseline checks.',
  };
  securityScanJobs.set(requestId, job);
  securityScanQueue.push(requestId);
  maybeStartSecurityScanWorker();
  await writeSecurityScanDebugLog('request_accepted', {
    requestId,
    targetDomain,
    elapsedMs: Date.now() - requestStartedAt,
  });

  console.log(
    '[SecurityScan] request_created',
    JSON.stringify({
      requestId,
      requesterIp,
      email: normalizedPayload.email,
      targetDomain,
      companyName: normalizedPayload.companyName,
    }),
  );

  res.status(202).json({
    requestId,
    status: job.status,
  });
});

app.post('/api/security-scans/client-debug', async (req, res) => {
  const payload = (req.body ?? {}) as {
    stage?: string;
    detail?: Record<string, unknown>;
  };
  await writeSecurityScanDebugLog('client_stage', {
    stage: String(payload.stage || '').trim() || 'unknown',
    detail: payload.detail ?? {},
  });
  res.status(202).json({ accepted: true });
});

app.get('/api/security-scans/:requestId', (req, res) => {
  cleanupExpiredSecurityScans();
  const requestId = String(req.params['requestId'] || '').trim();
  const job = securityScanJobs.get(requestId);
  if (!job) {
    res.status(404).json({ error: 'Scan request not found.' });
    return;
  }

  res.json({
    requestId: job.requestId,
    status: job.status,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    reportSummary: job.reportSummary,
    checks:
      job.status === 'completed'
        ? job.report?.checks.map((check) => ({
            id: check.id,
            label: check.label,
            status: check.status,
            detail: check.detail,
          }))
        : [],
  });
});

app.get('/api/security-scans/:requestId/report', (req, res) => {
  cleanupExpiredSecurityScans();
  const requestId = String(req.params['requestId'] || '').trim();
  const job = securityScanJobs.get(requestId);
  if (!job) {
    res.status(404).json({ error: 'Scan request not found.' });
    return;
  }

  res.json({
    requestId: job.requestId,
    status: job.status,
    scannedDomain: job.report?.scannedDomain || job.payload.targetDomain,
    summary: job.reportSummary || '',
    checks: job.report?.checks || [],
    error: job.error,
  });
});

app.get('/api/security-scans/:requestId/download-agent', (req, res) => {
  const requestId = String(req.params['requestId'] || '').trim();
  const job = securityScanJobs.get(requestId);
  if (!job) {
    res.status(404).send('Scan request not found.');
    return;
  }

  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.get('host');
  const apiUrl = `${protocol}://${host}/api/security-scans/agent-report`;

  const scriptContent = [
    '$ErrorActionPreference = "SilentlyContinue"',
    '$ProgressPreference = "SilentlyContinue"',
    '',
    `$RequestId = "${requestId}"`,
    `$ApiUrl = "${apiUrl}"`,
    '',
    'Write-Host "Starting CtrlShift IT Deep Local Scan..." -ForegroundColor Cyan',
    '',
    '$Result = @{',
    '    RequestId = $RequestId',
    '    Checks = @()',
    '}',
    '',
    '# 1. OS Info',
    'Write-Host "Checking Operating System..."',
    '$Os = Get-CimInstance Win32_OperatingSystem',
    '$Status = "fail"',
    'if ($Os.Caption -match "Windows 11") { $Status = "pass" } elseif ($Os.Caption -match "Windows 10") { $Status = "warn" }',
    '$Result.Checks += @{',
    '    Id = "agent-os-version"',
    '    Label = "Operating System"',
    '    Status = $Status',
    '    Detail = $Os.Caption',
    '}',
    '',
    '# 2. Antivirus',
    'Write-Host "Checking Antivirus Status..."',
    '$AvCount = 0',
    'try {',
    '    $Av = Get-CimInstance -Namespace root\\\\SecurityCenter2 -ClassName AntivirusProduct',
    '    $AvCount = if ($null -eq $Av) { 0 } elseif ($Av -is [array]) { $Av.Count } else { 1 }',
    '    $AvNames = if ($AvCount -gt 0) { ($Av | Select-Object -ExpandProperty displayName) -join ", " } else { "None detected" }',
    '    $Result.Checks += @{',
    '        Id = "agent-antivirus"',
    '        Label = "Local Antivirus"',
    '        Status = if ($AvCount -gt 0) { "pass" } else { "fail" }',
    '        Detail = if ($AvCount -gt 0) { "Active: $AvNames" } else { "No recognized AV detected in SecurityCenter." }',
    '    }',
    '} catch {',
    '    $Result.Checks += @{ Id = "agent-antivirus"; Label = "Local Antivirus"; Status = "warn"; Detail = "Unable to query SecurityCenter." }',
    '}',
    '',
    '# 3. Firewall',
    'Write-Host "Checking Windows Firewall..."',
    'try {',
    '    $Fw = Get-NetFirewallProfile -Name Domain,Private,Public',
    '    $EnabledCount = ($Fw | Where-Object { $_.Enabled -eq "True" }).Count',
    '    $Result.Checks += @{',
    '        Id = "agent-firewall"',
    '        Label = "Windows Firewall"',
    '        Status = if ($EnabledCount -eq 3) { "pass" } elseif ($EnabledCount -eq 0) { "fail" } else { "warn" }',
    '        Detail = "$EnabledCount of 3 profiles enabled."',
    '    }',
    '} catch {',
    '    $Result.Checks += @{ Id = "agent-firewall"; Label = "Windows Firewall"; Status = "warn"; Detail = "Unable to query Firewall." }',
    '}',
    '',
    '# 4. Local Admins',
    'Write-Host "Checking Local Administrators..."',
    'try {',
    '    $Admins = Get-LocalGroupMember -Group "Administrators"',
    '    $AdminCount = if ($null -eq $Admins) { 0 } elseif ($Admins -is [array]) { $Admins.Count } else { 1 }',
    '    $Result.Checks += @{',
    '        Id = "agent-local-admins"',
    '        Label = "Local Administrators"',
    '        Status = if ($AdminCount -gt 3) { "warn" } else { "pass" }',
    '        Detail = "$AdminCount users/groups in Administrators."',
    '    }',
    '} catch {',
    '    $Result.Checks += @{ Id = "agent-local-admins"; Label = "Local Administrators"; Status = "warn"; Detail = "Unable to query local groups." }',
    '}',
    '',
    'Write-Host "Sending results to CtrlShift IT..."',
    '$JsonPayload = $Result | ConvertTo-Json -Depth 5 -Compress',
    '',
    'try {',
    '    Invoke-RestMethod -Uri $ApiUrl -Method Post -Body $JsonPayload -ContentType "application/json"',
    '    Write-Host "Audit complete. The results have been securely sent. Please check your browser." -ForegroundColor Green',
    '} catch {',
    '    Write-Host "Failed to send results back to the server: $_" -ForegroundColor Red',
    '}',
    '',
    'Start-Sleep -Seconds 5'
  ].join('\\n');

  res.setHeader('Content-disposition', `attachment; filename="ctrlshift-audit-${requestId.substring(0, 8)}.ps1"`);
  res.setHeader('Content-type', 'application/octet-stream');
  res.send(scriptContent);
});

app.get('/api/security-scans/:requestId/download-agent-sh', (req, res) => {
  const requestId = String(req.params['requestId'] || '').trim();
  const job = securityScanJobs.get(requestId);
  if (!job) {
    res.status(404).send('Scan request not found.');
    return;
  }

  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.get('host');
  const apiUrl = `${protocol}://${host}/api/security-scans/agent-report`;

  const scriptContent = [
    '#!/usr/bin/env bash',
    '',
    `REQUEST_ID="${requestId}"`,
    `API_URL="${apiUrl}"`,
    '',
    'echo "Starting CtrlShift IT Deep Local Scan (Mac/Linux)..."',
    '',
    'OS_NAME=$(uname -s)',
    'OS_VERSION=$(uname -r)',
    '',
    'FIREWALL_STATUS="fail"',
    'FIREWALL_DETAIL="Disabled or Unknown"',
    'ADMINS_COUNT=0',
    'AV_STATUS="warn"',
    'AV_DETAIL="AV checks require root or are OS-specific."',
    '',
    'if [ "$OS_NAME" = "Darwin" ]; then',
    '    OS_INFO="macOS $(sw_vers -productVersion 2>/dev/null || echo $OS_VERSION)"',
    '    ',
    '    ALF=$(defaults read /Library/Preferences/com.apple.alf globalstate 2>/dev/null || echo "0")',
    '    if [ "$ALF" = "1" ] || [ "$ALF" = "2" ]; then',
    '        FIREWALL_STATUS="pass"',
    '        FIREWALL_DETAIL="macOS Application Firewall is Enabled."',
    '    fi',
    '',
    '    ADMIN_MSG=$(dscl . -read /Groups/admin GroupMembership 2>/dev/null)',
    '    ADMINS_COUNT=$(echo "$ADMIN_MSG" | wc -w)',
    'else',
    '    if [ -f /etc/os-release ]; then',
    '        OS_INFO=$(grep PRETTY_NAME /etc/os-release | cut -d\'"\' -f2)',
    '    else',
    '        OS_INFO="Linux $OS_VERSION"',
    '    fi',
    '',
    '    if command -v ufw >/dev/null 2>&1; then',
    '        UFW_STATUS=$(ufw status 2>/dev/null | grep -i active)',
    '        if [ -n "$UFW_STATUS" ]; then',
    '            FIREWALL_STATUS="pass"',
    '            FIREWALL_DETAIL="UFW is Active."',
    '        fi',
    '    fi',
    '',
    '    if grep -q "^sudo:" /etc/group 2>/dev/null; then',
    '        ADMINS=$(grep "^sudo:" /etc/group | cut -d: -f4)',
    '        ADMINS_COUNT=$(echo "$ADMINS" | tr "," "\\n" | grep -v "^$" | wc -l)',
    '    elif grep -q "^wheel:" /etc/group 2>/dev/null; then',
    '        ADMINS=$(grep "^wheel:" /etc/group | cut -d: -f4)',
    '        ADMINS_COUNT=$(echo "$ADMINS" | tr "," "\\n" | grep -v "^$" | wc -l)',
    '    fi',
    'fi',
    '',
    'OS_STATUS="pass"',
    'if [ "$OS_NAME" != "Darwin" ] && [ "$OS_NAME" != "Linux" ]; then',
    '    OS_STATUS="warn"',
    'fi',
    '',
    'ADMIN_STATUS="pass"',
    'if [ "$ADMINS_COUNT" -gt 3 ]; then',
    '    ADMIN_STATUS="warn"',
    'fi',
    '',
    'JSON_PAYLOAD=$(cat <<EOF',
    '{',
    '  "RequestId": "$REQUEST_ID",',
    '  "Checks": [',
    '    {',
    '      "Id": "agent-os-version",',
    '      "Label": "Operating System",',
    '      "Status": "$OS_STATUS",',
    '      "Detail": "$OS_INFO"',
    '    },',
    '    {',
    '      "Id": "agent-antivirus",',
    '      "Label": "Local Antivirus",',
    '      "Status": "$AV_STATUS",',
    '      "Detail": "$AV_DETAIL"',
    '    },',
    '    {',
    '      "Id": "agent-firewall",',
    '      "Label": "Local Firewall",',
    '      "Status": "$FIREWALL_STATUS",',
    '      "Detail": "$FIREWALL_DETAIL"',
    '    },',
    '    {',
    '      "Id": "agent-local-admins",',
    '      "Label": "Local Administrators",',
    '      "Status": "$ADMIN_STATUS",',
    '      "Detail": "$ADMINS_COUNT users/groups with admin privileges."',
    '    }',
    '  ]',
    '}',
    'EOF',
    ')',
    '',
    'echo "Sending results to CtrlShift IT..."',
    'curl -s -X POST -H "Content-Type: application/json" -d "$JSON_PAYLOAD" "$API_URL" > /dev/null',
    '',
    'echo "Audit complete. The results have been securely sent. Please check your browser."',
    'sleep 3'
  ].join('\n');

  res.setHeader('Content-disposition', `attachment; filename="ctrlshift-audit-${requestId.substring(0, 8)}.sh"`);
  res.setHeader('Content-type', 'application/x-sh');
  res.send(scriptContent);
});

app.post('/api/security-scans/agent-report', (req, res) => {
  const payload = req.body as { RequestId?: string; Checks?: any[] };
  const requestId = payload.RequestId;
  if (!requestId) {
    res.status(400).json({ error: 'Missing RequestId' });
    return;
  }
  const job = securityScanJobs.get(requestId);
  if (!job) {
    res.status(404).json({ error: 'Scan request not found.' });
    return;
  }

  if (!job.report) {
    job.report = {
      scannedDomain: job.payload.targetDomain,
      checks: [],
      riskSummary: job.reportSummary || 'Combined scan in progress.',
    };
  }

  if (Array.isArray(payload.Checks)) {
    for (const remoteCheck of payload.Checks) {
      if (remoteCheck.Id && remoteCheck.Label && remoteCheck.Status && remoteCheck.Detail) {
        job.report.checks = job.report.checks.filter(c => c.id !== remoteCheck.Id);
        job.report.checks.push({
          id: remoteCheck.Id,
          label: remoteCheck.Label,
          status: remoteCheck.Status as any,
          detail: remoteCheck.Detail,
        });
      }
    }
    
    // Update summary string if there are agent checks
    const failCount = job.report.checks.filter(c => c.status === 'fail').length;
    const warnCount = job.report.checks.filter(c => c.status === 'warn').length;
    job.reportSummary = failCount > 0 
      ? `High priority: ${failCount} critical issue(s) and ${warnCount} warning(s) found across external and local scans.`
      : warnCount > 0 
        ? `Moderate priority: ${warnCount} warning(s) found across external and local scans.`
        : 'Low priority: No major issues found in external and local scans.';
    job.report.riskSummary = job.reportSummary;
  }

  job.updatedAt = new Date().toISOString();
  res.status(200).json({ received: true });
});

app.get('/api/google-reviews', async (_req, res) => {
  const payload = await loadGoogleReviews();
  const cacheHeader =
    payload.source === 'google'
      ? 'public, max-age=300, s-maxage=600, stale-while-revalidate=600'
      : 'public, max-age=60';

  res.setHeader('Cache-Control', cacheHeader);
  res.json(payload);
});

app.use((req, res, next) => {
  const normalizedPath = req.path.replace(/\/+$/, '') || '/';
  const queryIndex = req.originalUrl.indexOf('?');
  const query = queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : '';

  const directTarget = LEGACY_REDIRECTS[normalizedPath];
  if (directTarget) {
    res.redirect(301, `${directTarget}${query}`);
    return;
  }

  const legacyBlogMatch = normalizedPath.match(/^\/(?:post|posts|article|articles)\/([^/?#]+)$/);
  if (legacyBlogMatch) {
    res.redirect(301, `/blog/${legacyBlogMatch[1]}${query}`);
    return;
  }

  next();
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
