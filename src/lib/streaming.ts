export async function resolveJamendoFLAC(trackId: string) {
  const r = await fetch(`/functions/v1/jamendo-resolve?id=${encodeURIComponent(trackId)}`);
  if (!r.ok) throw new Error(`Jamendo resolve failed: ${r.status}`);
  return r.json() as Promise<{ url: string; title?: string; artist?: string; cover?: string; license?: string }>;
}

export async function resolveIAFLAC(identifier: string) {
  const r = await fetch(`/functions/v1/ia-resolve?id=${encodeURIComponent(identifier)}`);
  if (!r.ok) throw new Error(`IA resolve failed: ${r.status}`);
  return r.json() as Promise<{ url: string; title?: string; artist?: string; date?: string }>;
}
