import type { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { createServiceSupabaseClient } from "@/integrations/supabase/service";
import { getBearerToken } from "@/lib/admin/require-admin-request";

/**
 * Prefer service role for server routes; fall back to the admin user's JWT (RLS).
 */
export function createAdminSupabaseClient(
  request: NextRequest,
): SupabaseClient<Database> | null {
  const service = createServiceSupabaseClient();
  if (service) return service;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const token = getBearerToken(request);
  if (!url || !anonKey || !token) return null;

  return createClient<Database>(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
