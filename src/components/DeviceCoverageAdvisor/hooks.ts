'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type {
  BaselineRow,
  CoverageMatrixRow,
  CoverageTier,
  FilterState,
  MatrixSummary,
  Platform,
  WidgetStatus,
} from './types';

const DATA_URL = '/device-coverage/device_coverage_april2026.json';

const TIER_RANK: Record<CoverageTier, number> = {
  P0: 0,
  P1: 1,
  P2: 2,
  P3: 3,
};

export function useBaselineData() {
  const [data, setData] = useState<BaselineRow[]>([]);
  const [status, setStatus] = useState<WidgetStatus>('idle');

  useEffect(() => {
    setStatus('loading');
    fetch(DATA_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((rows: BaselineRow[]) => {
        setData(rows);
        setStatus('ready');
      })
      .catch(() => {
        setStatus('error');
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

function bestTier(current: CoverageTier, candidate: CoverageTier): CoverageTier {
  return TIER_RANK[candidate] < TIER_RANK[current] ? candidate : current;
}

function aggregateOemPlatform(
  rows: BaselineRow[]
): Omit<CoverageMatrixRow, 'cumulative_share' | 'included'>[] {
  const map = new Map<
    string,
    {
      oem: string;
      platform: Platform;
      osVersions: Set<string>;
      totalShare: number;
      tier: CoverageTier;
    }
  >();

  for (const row of rows) {
    const key = `${row.device_oem}::${row.platform}`;
    let entry = map.get(key);
    if (!entry) {
      entry = {
        oem: row.device_oem,
        platform: row.platform,
        osVersions: new Set(),
        totalShare: 0,
        tier: row.coverage_tier,
      };
      map.set(key, entry);
    }
    entry.osVersions.add(row.os_version);
    entry.totalShare += row.share_active_devices;
    entry.tier = bestTier(entry.tier, row.coverage_tier);
  }

  return Array.from(map.values()).map((e) => {
    const sortedVersions = Array.from(e.osVersions).sort(
      (a, b) => parseFloat(a) - parseFloat(b)
    );

    return {
      device_oem: e.oem,
      platform: e.platform,
      os_version_range:
        sortedVersions.length === 1
          ? sortedVersions[0]
          : `${sortedVersions[0]} – ${sortedVersions[sortedVersions.length - 1]}`,
      os_version_count: sortedVersions.length,
      coverage_tier: e.tier,
      combined_share: e.totalShare,
    };
  });
}

function platformLabel(filters: FilterState): string {
  if (filters.platform === 'both') return 'Android + iOS';
  if (filters.platform === 'android') return 'Android';
  return 'iOS';
}

export function useCoverageMatrix(
  data: BaselineRow[],
  filters: FilterState
): MatrixSummary | null {
  return useMemo(() => {
    if (!data.length || !filters.country) return null;

    const countryRow = data.find((r) => r.country_code === filters.country);
    if (!countryRow) return null;

    const filtered = data.filter((row) => {
      if (row.country_code !== filters.country) return false;
      if (filters.platform !== 'both' && row.platform !== filters.platform) return false;
      return true;
    });

    if (!filtered.length) return null;

    const rawRows = aggregateOemPlatform(filtered);
    rawRows.sort((a, b) => b.combined_share - a.combined_share);

    const target = filters.coveragePct / 100;
    const pl = platformLabel(filters);

    if (target <= 0) {
      let cumulative = 0;
      const allRows: CoverageMatrixRow[] = rawRows.map((row) => {
        cumulative += row.combined_share;
        return {
          ...row,
          cumulative_share: cumulative,
          included: false,
        };
      });
      return {
        allRows,
        includedRowCount: 0,
        totalRowCount: allRows.length,
        achievedCoverage: 0,
        targetCoverage: filters.coveragePct,
        countryName: countryRow.country_name,
        platformLabel: pl,
      };
    }

    let cumulative = 0;
    let cutoffReached = false;

    const allRows: CoverageMatrixRow[] = rawRows.map((row) => {
      const wasIncluded = !cutoffReached;
      cumulative += row.combined_share;
      if (cumulative >= target) cutoffReached = true;

      return {
        ...row,
        cumulative_share: cumulative,
        included: wasIncluded,
      };
    });

    const includedCount = allRows.filter((r) => r.included).length;
    const achievedCoverage =
      includedCount > 0 ? allRows[includedCount - 1].cumulative_share : 0;

    return {
      allRows,
      includedRowCount: includedCount,
      totalRowCount: allRows.length,
      achievedCoverage,
      targetCoverage: filters.coveragePct,
      countryName: countryRow.country_name,
      platformLabel: pl,
    };
  }, [data, filters]);
}

export function useFilters(countries: { code: string; name: string }[]) {
  const defaultCountry = useMemo(
    () =>
      countries.some((c) => c.code === 'IN')
        ? 'IN'
        : countries[0]?.code ?? '',
    [countries]
  );

  const [filters, setFilters] = useState<FilterState>({
    country: '',
    platform: 'both',
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
    []
  );

  const setPlatform = useCallback(
    (platform: FilterState['platform']) =>
      setFilters((prev) => ({ ...prev, platform })),
    []
  );

  const setCoveragePct = useCallback(
    (coveragePct: number) =>
      setFilters((prev) => ({ ...prev, coveragePct })),
    []
  );

  return { filters, setCountry, setPlatform, setCoveragePct };
}
