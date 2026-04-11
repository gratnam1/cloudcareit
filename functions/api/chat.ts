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

interface Env {
  CF_ACCOUNT_ID: string;
  CF_AI_API_TOKEN: string;
  AI?: {
    run: (model: string, payload: unknown) => Promise<{ response?: string }>;
  };
}

interface Message {
  role: string;
  content: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  let body: { messages?: Message[] };
  try {
    body = await request.json() as { messages?: Message[] };
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), { status: 400, headers: corsHeaders });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array is required.' }), { status: 400, headers: corsHeaders });
  }

  const safeMsgs = messages
    .filter((m) => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .slice(-10)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1000) }));

  const payload = {
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...safeMsgs],
    max_tokens: 200,
  };

  try {
    // Prefer Workers AI binding (no token needed, faster)
    if (env.AI) {
      const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', payload);
      const reply = result?.response?.trim();
      if (!reply) {
        return new Response(JSON.stringify({ error: 'Empty response from AI.' }), { status: 502, headers: corsHeaders });
      }
      return new Response(JSON.stringify({ reply }), { headers: corsHeaders });
    }

    // Fallback: REST API with token
    const accountId = env.CF_ACCOUNT_ID?.trim();
    const apiToken = env.CF_AI_API_TOKEN?.trim();
    if (!accountId || !apiToken) {
      return new Response(JSON.stringify({ error: 'AI service not configured.' }), { status: 503, headers: corsHeaders });
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
      return new Response(JSON.stringify({ error: 'AI service unavailable.' }), { status: 502, headers: corsHeaders });
    }

    const data = await cfRes.json() as { result?: { response?: string } };
    const reply = data?.result?.response?.trim();
    if (!reply) {
      return new Response(JSON.stringify({ error: 'Empty response from AI.' }), { status: 502, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ reply }), { headers: corsHeaders });

  } catch (err) {
    console.error('[chat] Error:', err);
    return new Response(JSON.stringify({ error: 'Internal error.' }), { status: 500, headers: corsHeaders });
  }
};
