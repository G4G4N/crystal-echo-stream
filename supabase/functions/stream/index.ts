// Deno runtime (Supabase Edge Function)
// Proxy: /functions/v1/stream?src=<url-encoded FLAC origin url>
const WHITELIST = [
  /^https:\/\/archive\.org\//,
  /^https:\/\/(audio|cdn)\.jamendo\.com\//,
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, range',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src") ?? "";
  const ok = WHITELIST.some((rx) => rx.test(src));
  
  if (!ok) {
    console.error('[stream] Rejected src:', src);
    return new Response("Bad src", { status: 400, headers: corsHeaders });
  }

  console.log('[stream] Proxying:', src);

  // Optional: TODO verify short-lived HMAC signature here (anti open-proxy).

  const range = req.headers.get("Range") ?? undefined;
  const upstream = await fetch(src, { headers: range ? { Range: range } : {} });

  const resp = new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });

  // Set strong cache if origin doesn't provide one (helps CDN byte-range caching)
  if (!resp.headers.get("Cache-Control")) {
    resp.headers.set("Cache-Control", "public, s-maxage=604800, max-age=86400, immutable");
  }
  
  // CORS: front-end can fetch this
  resp.headers.set("Access-Control-Allow-Origin", "*");
  resp.headers.set("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type, range");
  
  console.log('[stream] Response status:', resp.status, 'Content-Type:', resp.headers.get('Content-Type'));
  
  return resp;
});
