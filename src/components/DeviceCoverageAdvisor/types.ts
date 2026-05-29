export type Platform = "android" | "ios";
export type PlatformFilter = "both" | Platform;
export type DeviceType = "phone" | "tablet";

export interface BaselineRow {
  country_code: string;
  country_name: string;
  region: string;
  platform: Platform;
  os_version: string;
  os_version_full?: string;
  device_oem: string;
  device_model: string;
  device_family?: string;
  device_type: DeviceType;
  screen_size_bucket?: string;
  resolution_bucket?: string;
  share_active_devices: number;
  time_period: string;
  source: string;
  coverage_tier: string;
  notes?: string;
}

export interface DeviceFamilyRow {
  device_family: string;
  device_oem: string;
  platform: Platform;
  device_type: DeviceType;
  os_version_range: string;
  combined_share: number;
  cumulative_share: number;
  model_count: number;
  representative_models: string;
  included: boolean;
}

export interface FilterState {
  country: string;
  platform: PlatformFilter;
  coveragePct: number;
}

export interface MatrixSummary {
  allFamilies: DeviceFamilyRow[];
  includedFamilyCount: number;
  totalFamilyCount: number;
  achievedCoverage: number;
  targetCoverage: number;
  countryName: string;
  platformLabel: string;
}

export interface LeadFormData {
  email: string;
  company?: string;
  appLink?: string;
}

export type WidgetStatus = "idle" | "loading" | "ready" | "error";
