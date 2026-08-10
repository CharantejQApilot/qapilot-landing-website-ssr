import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { QaGuideWriter } from "@/components/qa-guide/QaGuideArticle";

export async function loadQaGuideWriter(
  supabase: SupabaseClient<Database>,
  writerId: string | null | undefined,
): Promise<QaGuideWriter | null> {
  if (!writerId) return null;
  const { data } = await supabase
    .from("writers")
    .select("name, designation, description, linkedin_url, profile_image")
    .eq("id", writerId)
    .maybeSingle();
  return data;
}
