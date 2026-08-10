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

/**
 * Returns a Supabase client, or `null` if `NEXT_PUBLIC_SUPABASE_URL` /
 * `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing.
 *
 * Does **not** throw, so `next build` and Vercel deploys succeed even when env is
 * only attached to Production/Preview (or missing on a fork). Callers must null-check
 * before running queries. Same as `tryCreateServerSupabaseClient`.
 */
export function createServerSupabaseClient(): SupabaseClient<Database> | null {
  return createClientFromEnv();
}

/**
 * Alias for `createServerSupabaseClient`. Prefer this name in public/marketing routes
 * to signal optional CMS data.
 */
export function tryCreateServerSupabaseClient(): SupabaseClient<Database> | null {
  return createClientFromEnv();
}
