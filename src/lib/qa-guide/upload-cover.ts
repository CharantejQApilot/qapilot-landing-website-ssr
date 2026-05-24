import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const BUCKET = "blog-images";

export async function uploadQaGuideCover(
  supabase: SupabaseClient<Database>,
  pngBytes: Uint8Array,
  slug: string,
): Promise<{ id: string; url: string }> {
  const id = crypto.randomUUID();
  const path = `qa-guides/${slug}-cover-${id.slice(0, 8)}.png`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, pngBytes, {
    contentType: "image/png",
    upsert: false,
  });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { id, url: publicData.publicUrl };
}
