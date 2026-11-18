export const PLAY_POLICY_ACCEPTED_EXTENSIONS = [".apk", ".xapk"] as const;

export const PLAY_POLICY_MAX_UPLOAD_BYTES = 110 * 1024 * 1024;

export type PlayStoreAppSummary = {
  appId: string;
  title: string;
  developer: string;
  icon: string;
  score?: number | null;
  free?: boolean;
  summary?: string;
};

export type PlayPolicyQuota = {
  used: number;
  limit: number;
  remaining: number;
};

export type PlayPolicyScanOk = { kind: "ok"; scanId: string };
export type PlayPolicyScanLimit = {
  kind: "limit";
  data: { used?: number; limit?: number } | unknown;
};
export type PlayPolicyScanResult = PlayPolicyScanOk | PlayPolicyScanLimit;

type ApiEnvelope<T> = {
  ok: boolean;
  error?: string;
  data?: T;
};

function getApiBase(): string {
  const base = process.env.NEXT_PUBLIC_PLAY_POLICY_API_URL?.trim();
  if (!base) {
    throw new Error(
      "Play Policy Checker is temporarily unavailable. Please try again later.",
    );
  }
  return base.replace(/\/$/, "");
}

async function parseJson(res: Response): Promise<ApiEnvelope<unknown>> {
  const text = await res.text();
  if (!text) {
    return { ok: false, error: `Request failed (${res.status})` };
  }
  try {
    return JSON.parse(text) as ApiEnvelope<unknown>;
  } catch {
    return { ok: false, error: `Request failed (${res.status})` };
  }
}

export function isAcceptedApkFilename(name: string): boolean {
  const lower = name.toLowerCase();
  return PLAY_POLICY_ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export async function searchPlayStore(
  q: string,
  num = 20,
): Promise<PlayStoreAppSummary[]> {
  const res = await fetch(
    `${getApiBase()}/api/playstore/search?${new URLSearchParams({
      q,
      num: String(num),
    })}`,
  );
  const json = await parseJson(res);
  if (!json.ok) throw new Error(json.error ?? "Search failed");
  return (json.data ?? []) as PlayStoreAppSummary[];
}

export async function checkQuota(email: string): Promise<PlayPolicyQuota> {
  const res = await fetch(`${getApiBase()}/api/public/quota`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const json = await parseJson(res);
  if (!json.ok) throw new Error(json.error ?? "Quota check failed");
  return json.data as PlayPolicyQuota;
}

export async function startPlaystoreScan(body: {
  email: string;
  packageName: string;
  projectName?: string;
  title?: string;
  developer?: string;
  iconUrl?: string;
}): Promise<PlayPolicyScanResult> {
  const payload: Record<string, string> = {
    email: body.email,
    packageName: body.packageName,
  };
  if (body.projectName) payload.projectName = body.projectName;
  if (body.title) payload.title = body.title;
  if (body.developer) payload.developer = body.developer;
  if (body.iconUrl) payload.iconUrl = body.iconUrl;

  const res = await fetch(`${getApiBase()}/api/public/scans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await parseJson(res);

  if (res.status === 429 || json.error === "limit_exceeded") {
    return { kind: "limit", data: json.data };
  }
  if (!json.ok) throw new Error(json.error ?? "Scan failed");

  const data = json.data as { scanId?: string } | undefined;
  if (!data?.scanId) throw new Error("Scan failed");
  return { kind: "ok", scanId: data.scanId };
}

export function uploadApkScan(
  email: string,
  file: File,
  opts?: { projectName?: string; onProgress?: (pct: number) => void },
): Promise<PlayPolicyScanResult> {
  return new Promise((resolve, reject) => {
    let base: string;
    try {
      base = getApiBase();
    } catch (err) {
      reject(err);
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${base}/api/public/scans/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && opts?.onProgress) {
        opts.onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      let json: ApiEnvelope<{ scanId?: string }>;
      try {
        json = JSON.parse(xhr.responseText) as ApiEnvelope<{ scanId?: string }>;
      } catch {
        reject(new Error(`Upload failed (${xhr.status})`));
        return;
      }

      if (xhr.status === 429 || json.error === "limit_exceeded") {
        resolve({ kind: "limit", data: json.data });
        return;
      }
      if (!json.ok) {
        reject(new Error(json.error ?? "Upload failed"));
        return;
      }
      const scanId = json.data?.scanId;
      if (!scanId) {
        reject(new Error("Upload failed"));
        return;
      }
      resolve({ kind: "ok", scanId });
    };
    xhr.onerror = () => reject(new Error("Network error"));
    xhr.onabort = () => reject(new Error("Upload cancelled"));

    const form = new FormData();
    form.append("email", email);
    if (opts?.projectName) form.append("projectName", opts.projectName);
    form.append("file", file, file.name);
    xhr.send(form);
  });
}
