import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import {
  DEFAULT_PLACE_NAME,
  DEFAULT_REVIEWS_URL,
  loadGoogleReviewsServerConfig,
  type GoogleReviewsServerConfig,
} from './google-reviews.server-config';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
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
