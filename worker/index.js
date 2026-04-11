const SYSTEM_PROMPT = `You are the AI assistant for CtrlShift IT Services, a managed IT company serving businesses in Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill, Ontario, Canada.

Your role is to answer questions about CtrlShift IT Services clearly and helpfully, and encourage visitors to book a free IT assessment or call.

Key facts:
- Services: Managed IT, cybersecurity, Microsoft 365, Google Workspace, AWS cloud, office networking & Wi-Fi, crisis recovery, web development, SEO, lead generation
- Service areas: Vaughan, Toronto, Mississauga, Thornhill, Richmond Hill (GTA)
- Response time: under 15 minutes for production-down issues
- Monitoring: 24/7
- Guarantee: 30-day satisfaction guarantee
- Pricing: flat-rate plans starting from $249/month per user
- Phone: (416) 624-4841
- Email: info@ctrlshiftit.ca
- Free IT assessment available at /it-assessment

Rules:
- Keep answers concise (2–4 sentences max)
- Always end with a CTA: suggest calling (416) 624-4841, emailing info@ctrlshiftit.ca, or booking a free assessment at /it-assessment
- If asked about pricing, give the starting price and suggest a call for a custom quote
- If you don't know something specific, say so honestly and direct them to call or email
- Do not make up specific prices beyond what is listed above
- Stay on topic: CtrlShift IT Services and IT support topics only`;

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
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
      const result = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast');
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

    return env.ASSETS.fetch(request);
  },
};
