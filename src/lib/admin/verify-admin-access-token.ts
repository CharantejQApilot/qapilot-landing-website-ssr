/**
 * Same checks as `middleware.ts` admin gate: valid Supabase JWT + `user_roles.role = admin`.
 * Shared so route handlers (e.g. on-demand ISR revalidation) can authorize admin-only actions.
 */
export async function verifyAdminAccessToken(
  token: string,
): Promise<"ok" | "forbidden" | "unauthenticated"> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!supabaseUrl || !anonKey) return "unauthenticated";

  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!userRes.ok) return "unauthenticated";

  const user = (await userRes.json()) as { id?: string };
  if (!user.id) return "unauthenticated";

  const roleRes = await fetch(
    `${supabaseUrl}/rest/v1/user_roles?select=role&user_id=eq.${encodeURIComponent(
      user.id,
    )}&role=eq.admin&limit=1`,
    {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!roleRes.ok) return "forbidden";

  const rows = (await roleRes.json()) as Array<{ role: string }>;
  return rows.length > 0 ? "ok" : "forbidden";
}
