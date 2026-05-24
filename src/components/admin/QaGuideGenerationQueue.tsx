"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { parseSecondaryKeywords } from "@/lib/admin/parse-secondary-keywords";
import {
  runGenerationById,
  runGenerationNext,
  type GenerationQueueItem,
} from "@/lib/admin/qa-guide-generation-client";
import { ExternalLink, Loader2, Play, Plus, RefreshCw } from "lucide-react";
import QaGuidesCMS from "@/components/admin/QaGuidesCMS";

type Cluster = { slug: string; title: string };

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "running", label: "Running" },
  { value: "generated", label: "Generated" },
  { value: "failed", label: "Failed" },
  { value: "skip", label: "Skipped" },
];

function statusBadgeClass(status: string): string {
  switch (status) {
    case "pending":
      return "bg-muted text-muted-foreground";
    case "running":
      return "bg-amber-500/15 text-amber-800 dark:text-amber-200";
    case "generated":
      return "bg-green-500/15 text-green-800 dark:text-green-200";
    case "failed":
      return "bg-red-500/15 text-red-800 dark:text-red-200";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function QaGuideGenerationAdmin() {
  const router = useRouter();
  const { toast } = useToast();
  const [token, setToken] = useState<string | null>(null);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [items, setItems] = useState<GenerationQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [runningAction, setRunningAction] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedDetail, setExpandedDetail] = useState<GenerationQueueItem | null>(null);

  const [form, setForm] = useState({
    topic_cluster: "",
    primary_keyword: "",
    intent: "",
    secondary_keywords: "",
    competitor_url_1: "",
    competitor_url_2: "",
    competitor_url_3: "",
    target_audience: "",
    notes: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setToken(data.session?.access_token ?? null);
    });
  }, []);

  useEffect(() => {
    supabase
      .from("qa_guide_topic_clusters")
      .select("slug, title")
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        const list = (data as Cluster[]) ?? [];
        setClusters(list);
        if (list[0]) {
          setForm((f) => (f.topic_cluster ? f : { ...f, topic_cluster: list[0].slug }));
        }
      });
  }, []);

  const loadQueue = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("qa_guide_generation_queue")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter && statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }
      const q = search.trim();
      if (q) {
        query = query.ilike("primary_keyword", `%${q}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setItems((data as GenerationQueueItem[]) ?? []);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      const hint =
        message.includes("qa_guide_generation_queue") ||
        message.includes("schema cache")
          ? " Run the migration supabase/migrations/20260524120000_qa_guide_generation_queue.sql in Supabase."
          : "";
      toast({
        title: "Failed to load queue",
        description: message + hint,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, toast]);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  useEffect(() => {
    const hasRunning = items.some((i) => i.status === "running");
    if (!hasRunning) return;
    const interval = setInterval(() => {
      loadQueue();
    }, 3000);
    return () => clearInterval(interval);
  }, [items, loadQueue]);

  useEffect(() => {
    if (!token || !expandedId) return;
    const row = items.find((i) => i.id === expandedId);
    if (row?.status !== "running") {
      setExpandedDetail(row ?? null);
      return;
    }

    const interval = setInterval(async () => {
      const { data, error } = await supabase
        .from("qa_guide_generation_queue")
        .select("*")
        .eq("id", expandedId)
        .maybeSingle();
      if (error || !data) return;
      const detail = data as GenerationQueueItem;
      setExpandedDetail(detail);
      setItems((prev) => prev.map((i) => (i.id === detail.id ? detail : i)));
      if (detail.status !== "running") {
        clearInterval(interval);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [expandedId, items]);

  const handleCreate = async () => {
    if (!form.topic_cluster || !form.primary_keyword.trim() || !form.intent.trim()) {
      toast({ title: "Fill cluster, keyword, and intent", variant: "destructive" });
      return;
    }
    try {
      const { error } = await supabase.from("qa_guide_generation_queue").insert({
        topic_cluster: form.topic_cluster,
        primary_keyword: form.primary_keyword.trim(),
        intent: form.intent.trim(),
        secondary_keywords: parseSecondaryKeywords(form.secondary_keywords),
        competitor_url_1: form.competitor_url_1.trim() || null,
        competitor_url_2: form.competitor_url_2.trim() || null,
        competitor_url_3: form.competitor_url_3.trim() || null,
        target_audience: form.target_audience.trim() || null,
        notes: form.notes.trim() || null,
        status: "pending",
      });
      if (error) throw error;
      toast({ title: "Brief added to queue" });
      setShowForm(false);
      setForm({
        topic_cluster: form.topic_cluster,
        primary_keyword: "",
        intent: "",
        secondary_keywords: "",
        competitor_url_1: "",
        competitor_url_2: "",
        competitor_url_3: "",
        target_audience: "",
        notes: "",
      });
      loadQueue();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      const hint =
        message.includes("qa_guide_generation_queue") ||
        message.includes("schema cache")
          ? " Apply migration 20260524120000_qa_guide_generation_queue.sql in Supabase SQL editor."
          : message.toLowerCase().includes("invalid api key")
            ? " Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local match your project."
            : "";
      toast({
        title: "Create failed",
        description: message + hint,
        variant: "destructive",
      });
    }
  };

  const handleRunNext = async () => {
    if (!token) return;
    setRunningAction("next");
    try {
      const { queue_id } = await runGenerationNext(token);
      toast({ title: "Generation started", description: "This may take several minutes." });
      setExpandedId(queue_id);
      loadQueue();
    } catch (e) {
      toast({
        title: "Could not start generation",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setRunningAction(null);
    }
  };

  const handleRunRow = async (id: string, force = false) => {
    if (!token) return;
    if (force && !confirm("Re-run will generate a new draft for this brief. Continue?")) {
      return;
    }
    setRunningAction(id);
    try {
      await runGenerationById(token, id, force);
      toast({ title: "Generation started" });
      setExpandedId(id);
      loadQueue();
    } catch (e) {
      toast({
        title: "Run failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setRunningAction(null);
    }
  };

  const handleSkip = async (id: string) => {
    if (!confirm("Skip this brief?")) return;
    try {
      const { error } = await supabase
        .from("qa_guide_generation_queue")
        .update({ status: "skip" })
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Skipped" });
      loadQueue();
    } catch (e) {
      toast({
        title: "Skip failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <Tabs defaultValue="queue" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="queue">Generation queue</TabsTrigger>
        <TabsTrigger value="guides">Guides</TabsTrigger>
      </TabsList>

      <TabsContent value="queue" className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Add article briefs, then run generation to create a draft at{" "}
          <code>/seo-drafts/…</code>. Review in Guides and publish to add the page to the QA
          Guide hub and sitemap.
        </p>

        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Search keyword…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[200px]"
            />
            <Button variant="outline" size="icon" onClick={loadQueue} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setShowForm((v) => !v)}>
              <Plus className="h-4 w-4 mr-1" />
              New brief
            </Button>
            <Button onClick={handleRunNext} disabled={runningAction !== null}>
              {runningAction === "next" ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-1" />
              )}
              Generate next pending
            </Button>
          </div>
        </div>

        {showForm ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New article brief</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Topic cluster</Label>
                <Select
                  value={form.topic_cluster}
                  onValueChange={(v) => setForm((f) => ({ ...f, topic_cluster: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Cluster" />
                  </SelectTrigger>
                  <SelectContent>
                    {clusters.map((c) => (
                      <SelectItem key={c.slug} value={c.slug}>
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Primary keyword</Label>
                <Input
                  value={form.primary_keyword}
                  onChange={(e) => setForm((f) => ({ ...f, primary_keyword: e.target.value }))}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Intent / use case</Label>
                <Textarea
                  value={form.intent}
                  onChange={(e) => setForm((f) => ({ ...f, intent: e.target.value }))}
                  rows={2}
                  placeholder="e.g. comparison guide for fintech QA leads"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Secondary keywords (comma-separated)</Label>
                <Input
                  value={form.secondary_keywords}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, secondary_keywords: e.target.value }))
                  }
                />
              </div>
              {[1, 2, 3].map((n) => (
                <div key={n} className="space-y-2">
                  <Label>Competitor URL {n}</Label>
                  <Input
                    value={form[`competitor_url_${n}` as keyof typeof form] as string}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        [`competitor_url_${n}`]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}
              <div className="space-y-2">
                <Label>Target audience (optional)</Label>
                <Input
                  value={form.target_audience}
                  onChange={(e) => setForm((f) => ({ ...f, target_audience: e.target.value }))}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Notes (optional)</Label>
                <Textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={2}
                />
              </div>
              <div className="sm:col-span-2 flex gap-2">
                <Button onClick={handleCreate}>Save to queue</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {loading ? (
          <p className="text-muted-foreground">Loading queue…</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground">No briefs in the queue.</p>
        ) : (
          <div className="space-y-3">
            {items.map((row) => {
              const canRun = row.status === "pending" || row.status === "failed";
              const isRunning = row.status === "running";
              return (
                <Card key={row.id}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${statusBadgeClass(row.status)}`}
                          >
                            {row.status}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {row.topic_cluster}
                          </span>
                          {row.quality_recommendation ? (
                            <span className="text-xs text-muted-foreground">
                              AI: {row.quality_recommendation}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="font-semibold mt-1">{row.primary_keyword}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {row.intent}
                        </p>
                        {row.last_error ? (
                          <p className="text-xs text-destructive mt-1">{row.last_error}</p>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap gap-2 shrink-0">
                        {row.generated_qa_guide_id ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              router.push(`/admin/qa-guide/${row.generated_qa_guide_id}`)
                            }
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View draft
                          </Button>
                        ) : null}
                        {canRun ? (
                          <Button
                            size="sm"
                            onClick={() => handleRunRow(row.id)}
                            disabled={runningAction !== null}
                          >
                            {runningAction === row.id ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <Play className="h-4 w-4 mr-1" />
                            )}
                            Run
                          </Button>
                        ) : null}
                        {row.status === "generated" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRunRow(row.id, true)}
                            disabled={runningAction !== null}
                          >
                            Re-run
                          </Button>
                        ) : null}
                        {row.status === "pending" ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSkip(row.id)}
                          >
                            Skip
                          </Button>
                        ) : null}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setExpandedId((id) => (id === row.id ? null : row.id))
                          }
                        >
                          {expandedId === row.id ? "Hide log" : "Log"}
                        </Button>
                      </div>
                    </div>
                    {expandedId === row.id && (expandedDetail?.id === row.id || isRunning) ? (
                      <div className="rounded-md bg-muted/50 p-3 text-xs font-mono space-y-1 max-h-48 overflow-y-auto">
                        {(expandedDetail?.run_log ?? row.run_log).length === 0 ? (
                          <p className="text-muted-foreground">No log entries yet.</p>
                        ) : (
                          (expandedDetail?.run_log ?? row.run_log).map((line, i) => (
                            <div key={i}>{line}</div>
                          ))
                        )}
                        {isRunning ? (
                          <p className="text-amber-700 dark:text-amber-300 flex items-center gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Running…
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </TabsContent>

      <TabsContent value="guides">
        <QaGuidesCMS />
      </TabsContent>
    </Tabs>
  );
}
