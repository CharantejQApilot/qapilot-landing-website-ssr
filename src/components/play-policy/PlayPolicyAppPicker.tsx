"use client";

import { useCallback, useId, useRef, useState } from "react";
import {
  isAcceptedApkFilename,
  PLAY_POLICY_MAX_UPLOAD_BYTES,
  searchPlayStore,
  type PlayStoreAppSummary,
} from "@/lib/play-policy-api";
import { cn } from "@/lib/utils";

export type PlayPolicySelection =
  | { kind: "playstore"; app: PlayStoreAppSummary }
  | { kind: "file"; file: File };

type PlayPolicyAppPickerProps = {
  selection: PlayPolicySelection | null;
  onSelectionChange: (value: PlayPolicySelection | null) => void;
  disabled?: boolean;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PlayPolicyAppPicker({
  selection,
  onSelectionChange,
  disabled = false,
}: PlayPolicyAppPickerProps) {
  const searchId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchSeq = useRef(0);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlayStoreAppSummary[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const selectedAppId =
    selection?.kind === "playstore" ? selection.app.appId : null;
  const selectedFile = selection?.kind === "file" ? selection.file : null;

  const runSearch = useCallback(async () => {
    const q = query.trim();
    if (q.length < 1 || q.length > 200) {
      setSearchError(
        q.length > 200
          ? "Search must be 200 characters or fewer"
          : "Enter an app name to search",
      );
      return;
    }

    const seq = ++searchSeq.current;
    setSearching(true);
    setSearchError(null);
    setSearched(true);

    try {
      const data = await searchPlayStore(q, 20);
      if (seq !== searchSeq.current) return;
      setResults(data);
    } catch (err) {
      if (seq !== searchSeq.current) return;
      setResults([]);
      setSearchError(
        err instanceof Error ? err.message : "Search failed. Please try again.",
      );
    } finally {
      if (seq === searchSeq.current) setSearching(false);
    }
  }, [query]);

  const acceptFile = useCallback(
    (file: File | undefined | null) => {
      setFileError(null);
      if (!file) return;

      if (!isAcceptedApkFilename(file.name)) {
        setFileError("Only .apk and .xapk files are supported");
        return;
      }
      if (file.size > PLAY_POLICY_MAX_UPLOAD_BYTES) {
        setFileError("File must be 110 MB or smaller");
        return;
      }

      onSelectionChange({ kind: "file", file });
    },
    [onSelectionChange],
  );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="qg-label">Select from Play Store</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <label htmlFor={searchId} className="sr-only">
              Search the Play Store
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              maxLength={200}
              disabled={disabled}
              onChange={(e) => {
                setQuery(e.target.value);
                if (searchError) setSearchError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void runSearch();
                }
              }}
              placeholder="Search the Play Store by app name"
              aria-invalid={searchError ? true : undefined}
              className="qg-input"
            />
          </div>
          <button
            type="button"
            className="qg-btn qg-btn--secondary shrink-0"
            disabled={disabled || searching}
            onClick={() => void runSearch()}
          >
            {searching ? "Searching" : "Search"}
          </button>
        </div>
        {searchError ? (
          <p className="qg-error" role="alert">
            {searchError}
          </p>
        ) : null}
      </div>

      {(searching || searched) && (
        <div
          className="qg-results"
          role="listbox"
          aria-label="Play Store search results"
        >
          {searching ? (
            <p className="qg-results__empty">Searching…</p>
          ) : results.length === 0 ? (
            <p className="qg-results__empty">
              No apps found. Try another name, or upload an APK below.
            </p>
          ) : (
            <ul>
              {results.map((app) => {
                const selected = selectedAppId === app.appId;
                return (
                  <li key={app.appId}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      disabled={disabled}
                      onClick={() => {
                        setFileError(null);
                        onSelectionChange({ kind: "playstore", app });
                      }}
                      className={cn("qg-result", selected && "is-selected")}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- Play Store CDN icons; host not in remotePatterns */}
                      <img src={app.icon} alt="" width={40} height={40} />
                      <span className="min-w-0 flex-1">
                        <span className="qg-result__title">{app.title}</span>
                        <span className="qg-result__meta">{app.developer}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      <div className="qg-or" aria-hidden>
        or
      </div>

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".apk,.xapk,application/vnd.android.package-archive"
          className="sr-only"
          disabled={disabled}
          onChange={(e) => {
            acceptFile(e.target.files?.[0] ?? null);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled) setDragging(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(false);
            if (!disabled) acceptFile(e.dataTransfer.files?.[0] ?? null);
          }}
          className={cn(
            "qg-drop",
            dragging && "is-hot",
            selectedFile && "is-selected",
          )}
        >
          {selectedFile ? (
            <>
              <span className="qg-drop__name">{selectedFile.name}</span>
              <span className="qg-drop__meta">
                {formatBytes(selectedFile.size)} · Click or drop to replace
              </span>
            </>
          ) : (
            <>
              <span className="qg-drop__name">
                Drop your APK or XAPK file here to upload
              </span>
              <span className="qg-drop__meta">
                or click to browse · Max 110 MB
              </span>
            </>
          )}
        </button>
        {fileError ? (
          <p className="qg-alert mt-2" role="alert">
            {fileError}
          </p>
        ) : null}
      </div>
    </div>
  );
}
