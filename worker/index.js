const SYSTEM_PROMPT = `You are the Lead Solutions Consultant for CtrlShift IT Services (ctrlshiftit.ca). Your mission is to provide expert-level IT guidance to businesses in the Greater Toronto Area (Vaughan, North York, Richmond Hill) and convert casual inquiries into Free IT Assessments or discovery calls.

## Tone & Voice
- Professional Peer: Speak as an expert partner, not a support bot. Use phrases like "We've seen this work well for..." or "Typically, we recommend..."
- Human-First: Never say "As an AI..." or "Building this is a complex task." Instead say "We can definitely help with that—it's about choosing the right tech stack for your specific needs."
- Use Canadian English (e.g., centre, specialized, labour)
- Keep responses under 150 words for fast execution and high mobile engagement

## Response Structure
Follow this three-part flow naturally in every response. NEVER output labels like "Acknowledge", "Contribute", or "Explore" — just weave the flow into a conversational reply:
1. Start by validating the user's question or pain point
2. Offer one specific, high-value piece of advice (e.g., local privacy compliance, specific tech recommendations, infrastructure tips)
3. End with a qualifying question and a soft offer to book a Free IT Assessment or Discovery Call

## Business Context
- Core Services: Managed IT, Web Development, Custom AI Solutions, Infrastructure/DevOps, Cybersecurity, Microsoft 365, Google Workspace, AWS Cloud, Office Networking, Crisis Recovery
- Target Sectors: Law firms, accounting practices, medical clinics in the GTA
- Service Areas: Vaughan, Toronto, North York, Mississauga, Thornhill, Richmond Hill
- Response time: under 15 minutes for production-down issues
- Monitoring: 24/7
- Guarantee: 30-day satisfaction guarantee
- Pricing: flat-rate plans starting from $249/month per user
- Privacy Focus: We emphasize local execution and privacy-focused AI configurations
- Phone: (416) 624-4841
- Email: info@ctrlshiftit.ca
- Free IT Assessment: /it-assessment

## Rules
- Write in plain text only — no Markdown, no bold markers (**), no bullet points, no headings. The chat UI does not render Markdown
- Never output internal labels like "Acknowledge:", "Contribute:", or "Explore:" in your replies
- For casual greetings (e.g., "hi", "hello"), respond warmly and briefly, then ask how you can help — do not launch into a full sales pitch
- Get straight to the value—avoid fluff greetings like "I hope this helps"
- Never ask for passwords or sensitive credentials
- If asked about pricing, give the starting price and suggest a call for a custom quote
- If you don't know something specific, say so honestly and direct them to call or email
- Do not make up specific prices beyond what is listed above
- Stay on topic: CtrlShift IT Services and IT-related topics only`;

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders },
  });
}

const REVIEWS_FALLBACK = {
  source: 'fallback',
  configured: false,
  placeName: 'CtrlShift IT Services',
  placeId: 'ChIJuYi__3KoS2cRJ7SkFIWUd-o',
  rating: 5,
  userRatingsTotal: 0,
  googleMapsUrl: 'https://maps.google.com/?cid=16895135826401604647',
  reviews: [],
};

const LEGACY_REVIEWS_ENDPOINT = 'https://cloudcareit.kannnan24.workers.dev/api/google-reviews';

function normalizeLegacyReview(review) {
  const authorName = String(review?.authorName || '').trim();
  const text = String(review?.text || '').trim();
  if (!authorName || !text) return null;

  return {
    authorName,
    rating: Number.isFinite(review.rating) ? review.rating : 5,
    text,
    relativeTimeDescription: String(review.relativeTimeDescription || 'recently').trim(),
    time: review.time,
    profilePhotoUrl: review.profilePhotoUrl,
  };
}

async function fetchLegacyGoogleReviews(requestUrl) {
  try {
    const currentHost = new URL(requestUrl).hostname;
    const legacyHost = new URL(LEGACY_REVIEWS_ENDPOINT).hostname;
    if (currentHost === legacyHost) return null;

    const res = await fetch(LEGACY_REVIEWS_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const payload = await res.json();
    const reviews = Array.isArray(payload.reviews)
      ? payload.reviews.map(normalizeLegacyReview).filter(Boolean)
      : [];

    if (reviews.length === 0 && !Number.isFinite(payload.rating)) return null;

    return {
      source: payload.source === 'google' ? 'google' : 'fallback',
      configured: Boolean(payload.configured),
      placeName: String(payload.placeName || REVIEWS_FALLBACK.placeName).trim(),
      placeId: String(payload.placeId || '').trim(),
      rating: Number.isFinite(payload.rating) ? payload.rating : REVIEWS_FALLBACK.rating,
      userRatingsTotal: Number.isFinite(payload.userRatingsTotal) ? payload.userRatingsTotal : reviews.length,
      googleMapsUrl: String(payload.googleMapsUrl || REVIEWS_FALLBACK.googleMapsUrl).trim(),
      fetchedAt: payload.fetchedAt || new Date().toISOString(),
      reviews,
      error: payload.error,
    };
  } catch (err) {
    console.error('[google-reviews] Legacy fallback error:', err);
    return null;
  }
}

async function handleGoogleReviews(env, requestUrl) {
  const apiKey = (env.GOOGLE_PLACES_API_KEY || env.GOOGLE_MAPS_API_KEY || '').trim();
  const placeId = (env.GOOGLE_PLACE_ID || env.GOOGLE_BUSINESS_PLACE_ID || '').trim();
  const fetchedAt = new Date().toISOString();

  if (!apiKey || !placeId) {
    const legacyPayload = await fetchLegacyGoogleReviews(requestUrl);
    if (legacyPayload) {
      return jsonResponse(
        legacyPayload,
        200,
        { 'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=600' }
      );
    }

    return jsonResponse(
      { ...REVIEWS_FALLBACK, fetchedAt, error: 'Google Reviews API is not configured.' },
      200,
      { 'Cache-Control': 'public, max-age=60' }
    );
  }

  try {
    // Use Places API v1 (new) — required for service-area businesses
    const fieldMask = 'id,displayName,rating,userRatingCount,googleMapsUri,reviews';
    const apiUrl = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

    const res = await fetch(apiUrl, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
    });
    const place = await res.json();

    if (place.error) {
      console.error('[google-reviews] Places API v1 error:', place.error);
      return jsonResponse(
        { ...REVIEWS_FALLBACK, fetchedAt, error: `Google Places API: ${place.error.status}` },
        200,
        { 'Cache-Control': 'public, max-age=60' }
      );
    }

    const reviews = (place.reviews || []).map((r) => ({
      authorName: r.authorAttribution?.displayName,
      rating: r.rating,
      text: r.text?.text,
      relativeTimeDescription: r.relativePublishTimeDescription,
      time: r.publishTime,
      profilePhotoUrl: r.authorAttribution?.photoUri,
    }));

    return jsonResponse(
      {
        source: 'google',
        configured: true,
        placeName: place.displayName?.text || REVIEWS_FALLBACK.placeName,
        placeId,
        rating: place.rating ?? REVIEWS_FALLBACK.rating,
        userRatingsTotal: place.userRatingCount ?? reviews.length,
        googleMapsUrl: place.googleMapsUri || REVIEWS_FALLBACK.googleMapsUrl,
        fetchedAt,
        reviews: reviews.length > 0 ? reviews : REVIEWS_FALLBACK.reviews,
      },
      200,
      { 'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=600' }
    );
  } catch (err) {
    console.error('[google-reviews] Error:', err);
    return jsonResponse(
      { ...REVIEWS_FALLBACK, fetchedAt, error: 'Failed to fetch reviews.' },
      200,
      { 'Cache-Control': 'public, max-age=60' }
    );
  }
}

async function handleChat(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400);
  }

  const messages = body && body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonResponse({ error: 'messages array is required.' }, 400);
  }

  const safeMsgs = messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-10)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1000) }));

  const payload = {
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...safeMsgs],
    max_tokens: 200,
  };

  try {
    if (env && env.AI) {

      // const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', payload);
      const result = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', payload);
      const reply = result && result.response && result.response.trim();
      if (!reply) return jsonResponse({ error: 'Empty response from AI.' }, 502);
      return jsonResponse({ reply });
    }

    const accountId = env && env.CF_ACCOUNT_ID && env.CF_ACCOUNT_ID.trim();
    const apiToken = env && env.CF_AI_API_TOKEN && env.CF_AI_API_TOKEN.trim();
    if (!accountId || !apiToken) {
      return jsonResponse({ error: 'AI service not configured.' }, 503);
    }

    const cfRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!cfRes.ok) {
      const text = await cfRes.text().catch(() => '');
      console.error('[chat] Cloudflare AI error:', cfRes.status, text);
      return jsonResponse({ error: 'AI service unavailable.' }, 502);
    }

    const data = await cfRes.json();
    const reply = data && data.result && data.result.response && data.result.response.trim();
    if (!reply) return jsonResponse({ error: 'Empty response from AI.' }, 502);
    return jsonResponse({ reply });
  } catch (err) {
    console.error('[chat] Error:', err);
    return jsonResponse({ error: 'Internal error.' }, 500);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/chat') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
      }
      return handleChat(request, env);
    }

    if (url.pathname === '/api/google-reviews') {
      if (request.method !== 'GET') {
        return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET' } });
      }
      return handleGoogleReviews(env, request.url);
    }

    // For HTML page routes (no file extension), resolve to the explicit index.html
    // path rather than a directory path. env.ASSETS.fetch() does not reliably resolve
    // directory indexes when called from inside a Worker — it falls through to
    // not_found_handling and serves root index.html instead of the prerendered file.
    // Explicitly requesting /path/index.html bypasses this entirely.
    if (!/\.[a-zA-Z0-9]+$/.test(url.pathname)) {
      const base = url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '');
      const asset = new URL(request.url);
      asset.pathname = base + '/index.html';
      const assetRes = await env.ASSETS.fetch(new Request(asset.toString(), request));
      if (assetRes.status !== 404) return assetRes;
      // No prerendered file for this path — serve root shell for Angular client-side routing.
      const root = new URL(request.url);
      root.pathname = '/index.html';
      return env.ASSETS.fetch(new Request(root.toString(), request));
    }

    return env.ASSETS.fetch(request);
  },
};
