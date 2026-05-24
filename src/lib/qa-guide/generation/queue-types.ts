export type QueueStatus = "pending" | "running" | "generated" | "failed" | "skip";

export type QueueCreateBody = {
  topic_cluster: string;
  primary_keyword: string;
  intent: string;
  secondary_keywords?: string[];
  competitor_url_1?: string | null;
  competitor_url_2?: string | null;
  competitor_url_3?: string | null;
  target_audience?: string | null;
  notes?: string | null;
};

export type QueuePatchBody = Partial<QueueCreateBody>;

export { parseSecondaryKeywords } from "@/lib/admin/parse-secondary-keywords";
