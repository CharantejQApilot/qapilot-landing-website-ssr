import type { Session, SupabaseClient } from "@supabase/supabase-js";

type AdminAccessState =
  | { status: "unauthenticated"; session: null }
  | { status: "forbidden"; session: Session }
  | { status: "ok"; session: Session };

export async function getAdminAccessState(
  client: SupabaseClient,
): Promise<AdminAccessState> {
  const {
    data: { session },
  } = await client.auth.getSession();

  if (!session) {
    return { status: "unauthenticated", session: null };
  }

  const { data: roleData } = await client
    .from("user_roles")
    .select("role")
    .eq("user_id", session.user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!roleData) {
    return { status: "forbidden", session };
  }

  return { status: "ok", session };
}
