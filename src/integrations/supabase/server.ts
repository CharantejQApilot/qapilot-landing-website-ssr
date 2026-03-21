import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

function createClientFromEnv(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
    },
  });
}

/** Use when the route must fail fast if env is missing (e.g. production CMS routes). */
export function createServerSupabaseClient(): SupabaseClient<Database> {
  const client = createClientFromEnv();
  if (!client) {
    throw new Error('Missing Supabase environment variables');
  }
  return client;
}

/**
 * Use for optional UI (banner, featured blocks) or graceful degradation when
 * `NEXT_PUBLIC_SUPABASE_*` are unset so local preview still renders.
 */
export function tryCreateServerSupabaseClient(): SupabaseClient<Database> | null {
  return createClientFromEnv();
}
