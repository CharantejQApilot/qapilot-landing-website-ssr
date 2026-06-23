export type Platform = 'android' | 'ios';
export type PlatformFilter = 'both' | Platform;
export type CoverageTier = 'P0' | 'P1' | 'P2' | 'P3';

export interface BaselineRow {
  country_code: string;
  country_name: string;
  region: string;
  platform: Platform;
  os_version: string;
  os_version_full?: string;
  device_oem: string;
  share_active_devices: number;
  time_period: string;
  source: string;
  coverage_tier: CoverageTier;
  notes?: string;
  explanation?: string;
}

/** Aggregated OEM + platform row shown in the matrix */
export interface CoverageMatrixRow {
  device_oem: string;
  platform: Platform;
  os_version_range: string;
  os_version_count: number;
  coverage_tier: CoverageTier;
  combined_share: number;
  cumulative_share: number;
  included: boolean;
}

export interface FilterState {
  country: string;
  platform: PlatformFilter;
  coveragePct: number;
}

export interface MatrixSummary {
  allRows: CoverageMatrixRow[];
  includedRowCount: number;
  totalRowCount: number;
  achievedCoverage: number;
  targetCoverage: number;
  countryName: string;
  platformLabel: string;
}

export type WidgetStatus = 'idle' | 'loading' | 'ready' | 'error';
