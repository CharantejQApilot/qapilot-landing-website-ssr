"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type {
  BaselineRow,
  DeviceFamilyRow,
  FilterState,
  MatrixSummary,
  Platform,
  DeviceType,
  WidgetStatus,
} from "./types";

export function useBaselineData() {
  const [data, setData] = useState<BaselineRow[]>([]);
  const [status, setStatus] = useState<WidgetStatus>("idle");

  useEffect(() => {
    setStatus("loading");
    fetch("/device-coverage/device_coverage_baseline.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((rows: BaselineRow[]) => {
        setData(rows);
        setStatus("ready");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  return { data, status };
}

export function useCountryOptions(data: BaselineRow[]) {
  return useMemo(() => {
    const map = new Map<string, string>();
    for (const row of data) {
      if (!map.has(row.country_code)) {
        map.set(row.country_code, row.country_name);
      }
    }
    return Array.from(map.entries())
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);
}

function aggregateFamilies(
  rows: BaselineRow[],
): Omit<DeviceFamilyRow, "cumulative_share" | "included">[] {
  const map = new Map<
    string,
    {
      family: string;
      oem: string;
      platform: Platform;
      deviceType: DeviceType;
      osVersions: Set<string>;
      models: string[];
      totalShare: number;
      typeCounts: Record<string, number>;
    }
  >();

  for (const row of rows) {
    const key = `${row.device_family || row.device_model}::${row.platform}`;
    let entry = map.get(key);
    if (!entry) {
      entry = {
        family: row.device_family || row.device_model,
        oem: row.device_oem,
        platform: row.platform,
        deviceType: row.device_type,
        osVersions: new Set(),
        models: [],
        totalShare: 0,
        typeCounts: {},
      };
      map.set(key, entry);
    }
    entry.osVersions.add(row.os_version);
    if (!entry.models.includes(row.device_model)) {
      entry.models.push(row.device_model);
    }
    entry.totalShare += row.share_active_devices;
    entry.typeCounts[row.device_type] = (entry.typeCounts[row.device_type] || 0) + 1;
  }

  return Array.from(map.values()).map((e) => {
    const sortedVersions = Array.from(e.osVersions).sort((a, b) => parseFloat(a) - parseFloat(b));
    const majorType =
      (Object.entries(e.typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as DeviceType) || "phone";

    return {
      device_family: e.family,
      device_oem: e.oem,
      platform: e.platform,
      device_type: majorType,
      os_version_range:
        sortedVersions.length === 1
          ? sortedVersions[0]
          : `${sortedVersions[0]} – ${sortedVersions[sortedVersions.length - 1]}`,
      combined_share: e.totalShare,
      model_count: e.models.length,
      representative_models: e.models.slice(0, 3).join(", "),
    };
  });
}

function platformLabel(filters: FilterState): string {
  if (filters.platform === "both") return "Android + iOS";
  if (filters.platform === "android") return "Android";
  return "iOS";
}

export function useFamilyMatrix(data: BaselineRow[], filters: FilterState): MatrixSummary | null {
  return useMemo(() => {
    if (!data.length || !filters.country) return null;

    const countryRow = data.find((r) => r.country_code === filters.country);
    if (!countryRow) return null;

    const filtered = data.filter((row) => {
      if (row.country_code !== filters.country) return false;
      if (filters.platform !== "both" && row.platform !== filters.platform) return false;
      return true;
    });

    if (!filtered.length) return null;

    const rawFamilies = aggregateFamilies(filtered);
    rawFamilies.sort((a, b) => b.combined_share - a.combined_share);

    const target = filters.coveragePct / 100;
    const pl = platformLabel(filters);

    if (target <= 0) {
      let cumulative = 0;
      const allFamilies: DeviceFamilyRow[] = rawFamilies.map((f) => {
        cumulative += f.combined_share;
        return {
          ...f,
          cumulative_share: cumulative,
          included: false,
        };
      });
      return {
        allFamilies,
        includedFamilyCount: 0,
        totalFamilyCount: allFamilies.length,
        achievedCoverage: 0,
        targetCoverage: filters.coveragePct,
        countryName: countryRow.country_name,
        platformLabel: pl,
      };
    }

    let cumulative = 0;
    let cutoffReached = false;

    const allFamilies: DeviceFamilyRow[] = rawFamilies.map((f) => {
      const wasIncluded = !cutoffReached;
      cumulative += f.combined_share;
      if (cumulative >= target) cutoffReached = true;

      return {
        ...f,
        cumulative_share: cumulative,
        included: wasIncluded,
      };
    });

    const includedCount = allFamilies.filter((f) => f.included).length;
    const achievedCoverage =
      includedCount > 0 ? allFamilies[includedCount - 1].cumulative_share : 0;

    return {
      allFamilies,
      includedFamilyCount: includedCount,
      totalFamilyCount: allFamilies.length,
      achievedCoverage,
      targetCoverage: filters.coveragePct,
      countryName: countryRow.country_name,
      platformLabel: pl,
    };
  }, [data, filters]);
}

export function useFilters(countries: { code: string; name: string }[]) {
  const defaultCountry = useMemo(
    () => (countries.some((c) => c.code === "IN") ? "IN" : (countries[0]?.code ?? "")),
    [countries],
  );

  const [filters, setFilters] = useState<FilterState>({
    country: "",
    platform: "both",
    coveragePct: 75,
  });

  useEffect(() => {
    if (!defaultCountry) return;
    setFilters((prev) => {
      const ok = countries.some((c) => c.code === prev.country);
      if (ok) return prev;
      return { ...prev, country: defaultCountry };
    });
  }, [countries, defaultCountry]);

  const setCountry = useCallback(
    (country: string) => setFilters((prev) => ({ ...prev, country })),
    [],
  );

  const setPlatform = useCallback(
    (platform: FilterState["platform"]) => setFilters((prev) => ({ ...prev, platform })),
    [],
  );

  const setCoveragePct = useCallback(
    (coveragePct: number) => setFilters((prev) => ({ ...prev, coveragePct })),
    [],
  );

  return { filters, setCountry, setPlatform, setCoveragePct };
}
