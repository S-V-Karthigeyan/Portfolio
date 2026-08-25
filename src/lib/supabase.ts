import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public (anon) keys are safe to ship to the browser — access is controlled by
// Row Level Security policies on the Supabase project, not by keeping this
// value secret. See supabase/schema.sql for the policies this app expects.
const env = (typeof process !== "undefined" ? process.env : {}) as Record<string, string | undefined>;

const SUPABASE_URL = (import.meta.env['VITE_SUPABASE_URL'] ?? env['SUPABASE_URL']) as
  | string
  | undefined;
const SUPABASE_ANON_KEY = (import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ??
  import.meta.env['VITE_SUPABASE_ANON_KEY'] ??
  env['SUPABASE_PUBLISHABLE_KEY']) as string | undefined;

let cachedClient: SupabaseClient | null | undefined;

/**
 * Returns a shared Supabase client, or `null` if the project hasn't been
 * connected yet (no VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Callers
 * should treat `null` as "content editing is unavailable right now" rather
 * than throwing, so the site still renders fine without a backend.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return cachedClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
