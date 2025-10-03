// Resolve a Jamendo track id to a proxied FLAC stream URL + metadata
const JAMENDO_ID = Deno.env.get("JAMENDO_ID")!;

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
  const id = searchParams.get("id"); // Jamendo track id stored in our DB/catalog
  
  if (!id) {
    return new Response("Missing id", { status: 400, headers: corsHeaders });
  }

  console.log('[jamendo-resolve] Resolving track:', id);

  const api = new URL("https://api.jamendo.com/v3.0/tracks");
  api.search = new URLSearchParams({
    client_id: JAMENDO_ID,
    format: "json",
    id,
    audioformat: "flac",     // streamable FLAC URL returned in `audio`
    include: "licenses"
  }).toString();

  const j = await (await fetch(api)).json();
  const tr = j?.results?.[0];
  
  if (!tr?.audio) {
    console.error('[jamendo-resolve] Not found for id:', id);
    return new Response("Not found", { status: 404, headers: corsHeaders });
  }

  console.log('[jamendo-resolve] Found:', tr.name, 'by', tr.artist_name);

  const payload = {
    // Proxied FLAC stream; the player should use this URL
    url: `/functions/v1/stream?src=${encodeURIComponent(tr.audio)}`,
    // Helpful metadata for UI
    title: tr.name,
    artist: tr.artist_name,
    cover: tr.album_image,
    license: tr.license_cc,
    // Raw source for debugging
    origin: tr.audio,
    // Note: If you ever need downloads, use `audiodownload` only if `audiodownload_allowed` is true.
  };

  return new Response(JSON.stringify(payload), { 
    headers: { 
      ...corsHeaders,
      "content-type": "application/json" 
    } 
  });
});
