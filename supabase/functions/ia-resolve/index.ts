// Resolve an Internet Archive item identifier to a proxied FLAC stream URL + metadata
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Internet Archive "identifier" stored in our catalog
  
  if (!id) {
    return new Response("Missing id", { status: 400, headers: corsHeaders });
  }

  console.log('[ia-resolve] Resolving identifier:', id);

  const mdUrl = `https://archive.org/metadata/${encodeURIComponent(id)}`;
  const md = await (await fetch(mdUrl)).json();
  const files = md?.files ?? [];
  const flac = files.find((f: any) => typeof f.name === "string" && f.name.endsWith(".flac"));
  
  if (!flac) {
    console.error('[ia-resolve] No FLAC found for identifier:', id);
    return new Response("No FLAC", { status: 404, headers: corsHeaders });
  }

  console.log('[ia-resolve] Found FLAC:', flac.name);

  const origin = `https://archive.org/download/${encodeURIComponent(id)}/${encodeURIComponent(flac.name)}`;
  const payload = {
    url: `/functions/v1/stream?src=${encodeURIComponent(origin)}`,
    title: md?.metadata?.title,
    artist: md?.metadata?.creator,
    date: md?.metadata?.date,
    origin
  };
  
  return new Response(JSON.stringify(payload), { 
    headers: { 
      ...corsHeaders,
      "content-type": "application/json" 
    } 
  });
});
