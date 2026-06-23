# Device Coverage Advisor Widget – Build Plan

## 1. Scope and Goals

**Goal:** Build a self-contained "Device Coverage Advisor" widget that you can:

- Run locally inside your existing Next.js app.
- Load device/OS baseline data from CSV or JSON files (no DB).
- Let a user pick region/platform and adjust a **coverage % slider** to see a recommended matrix.
- Display results at the **device-family level** (not individual models) for a cleaner, actionable view.
- Capture leads via "Book a working session" / "Email me this matrix".

This plan assumes:

- Next.js 13+ with the `/app` or `/pages` router.
- React 18.
- Optional: separate Vite project later if you want to package this as a standalone embeddable widget or component library.

---

## 2. Tech Stack and Data Strategy

### 2.1 Frontend

- **Framework:** React component inside your Next.js repo.
- **Styling:** Tailwind CSS (utility-first).
- **State:** Local React state (`useState`, `useMemo`).

### 2.2 Data

- **Format:** Start with JSON for simplicity (you can generate JSON from your CSV easily).
- **Location:** `public/device-coverage/device_coverage_baseline.json`
  - Served statically by Next, fetched client-side from `/device-coverage/device_coverage_baseline.json`.
- **Optional CSV parsing:** If you want to read CSV directly in the browser, you can use `PapaParse` / `react-papaparse` for client-side CSV parsing and JSON-to-CSV export for downloads.

---

## 3. Files and Project Structure (Next.js)

Inside your Next.js repo:

```text
device-coverage-matrix/
  src/
    app/
      device-coverage-demo/
        page.tsx          # Demo page that hosts the widget (for dev)
    components/
      DeviceCoverageAdvisor/
        index.tsx         # Main widget component
        types.ts          # Type definitions for data structures
        hooks.ts          # Hooks for data loading, aggregation, filtering
        AdvisorShell.tsx   # Card wrapper with header
        AdvisorForm.tsx    # Country, platform, and coverage slider controls
        AdvisorSummary.tsx # Summary stats
        AdvisorMatrixTable.tsx  # Family-level matrix table
        AdvisorCtas.tsx    # CTAs and lead capture form
  public/
    device-coverage/
      device_coverage_baseline.json
```

---

## 4. Data Model and Sample JSON

### 4.1 Baseline dataset (raw, per-device)

The raw JSON contains individual device entries. Each row represents one device model in one country:

```json
[
  {
    "country_code": "IN",
    "country_name": "India",
    "region": "Asia",
    "platform": "android",
    "os_version": "14",
    "os_version_full": "14.0",
    "device_oem": "Samsung",
    "device_model": "Galaxy A14",
    "device_family": "Galaxy A series",
    "device_type": "phone",
    "screen_size_bucket": "6.5-7.0",
    "resolution_bucket": "FHD",
    "share_active_devices": 0.082,
    "time_period": "2025-Q4",
    "source": "statcounter+curated",
    "coverage_tier": "P0",
    "notes": "High-share budget Android device in India; critical for checkout flows."
  }
]
```

### 4.2 Aggregated view (device-family level)

The widget **does not** show individual device models to the user. Instead, it aggregates at the **device family** level. For each family the widget computes:

- **Combined share** = sum of `share_active_devices` for all models in the family (within the filtered country/platform).
- **Model count** = number of individual models rolled up.
- **OS version range** = min – max OS versions across models in the family.
- **Representative device type** = most common type in the family (phone/tablet).

Families are then **sorted by combined share descending** — this is the greedy ordering used by the coverage slider.

### 4.3 TypeScript types

In `components/DeviceCoverageAdvisor/types.ts`:

```ts
export type Platform = 'android' | 'ios';
export type PlatformFilter = 'both' | Platform;
export type DeviceType = 'phone' | 'tablet';

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

// Aggregated family-level row shown in the matrix
export interface DeviceFamilyRow {
  device_family: string;
  device_oem: string;
  platform: Platform;
  device_type: DeviceType;
  os_version_range: string;       // e.g. "12 – 14"
  combined_share: number;         // sum of share_active_devices
  cumulative_share: number;       // running total (after sorting by share desc)
  model_count: number;            // how many individual models rolled up
  representative_models: string;  // e.g. "Galaxy A14, Galaxy A10s"
}

export interface FilterState {
  country: string;
  platform: PlatformFilter;
  coveragePct: number; // 0–100, the slider value
}

export interface MatrixSummary {
  families: DeviceFamilyRow[];       // families included to meet coveragePct
  includedFamilyCount: number;
  totalFamilyCount: number;          // all families for this country/platform
  achievedCoverage: number;          // actual cumulative % achieved
  targetCoverage: number;            // the slider value
  countryName: string;
  platformLabel: string;
}
```

---

## 5. Widget UX and Component Breakdown

### 5.1 Top-level component

`DeviceCoverageAdvisor/index.tsx` should encapsulate:

1. **Data loading**
   - `useEffect` + `fetch('/device-coverage/device_coverage_baseline.json')`.
   - Parse to `BaselineRow[]` and store in state.

2. **User inputs (Step 1)**
   - `country` select dropdown
   - `platform` toggle (Both / Android / iOS)
   - **Coverage % slider** — a range input from 0% to 100%
     - Default: 70%
     - As the user drags, the matrix below updates in real time
     - Shows the current % value next to the slider

3. **Matrix view (Step 2)**
   - Aggregated device-family rows, sorted by share descending.
   - A visual indicator showing which families are "included" vs. "below the cut".
   - Derived summary: number of families, achieved coverage.

4. **CTAs (Step 3)**
   - "Book a 30-minute working session"
   - "Email me this matrix"
   - Optional: "Download CSV"

5. **Tracking hooks (future)**
   - `onOpen`, `onGenerate`, `onCtaClick` callbacks or direct analytics calls.

### 5.2 Coverage slider algorithm

The coverage slider drives the matrix with a **greedy accumulation** approach:

1. Filter raw data by selected country and platform.
2. Group rows by `device_family` (falling back to `device_model` if family is empty).
3. For each family, compute `combined_share` = sum of all models' `share_active_devices`.
4. Sort families by `combined_share` descending.
5. Walk the sorted list, accumulating `cumulative_share`.
6. Include all families where `cumulative_share <= coveragePct / 100`.
   - Always include the family that _crosses_ the threshold (so achieved >= target).
7. The resulting list is the recommended matrix.

This means:
- Slider at **30%** → only the top 2–3 highest-share families.
- Slider at **70%** → a solid mid-range matrix (sensible default).
- Slider at **95%+** → nearly all families, including long-tail.

### 5.3 Suggested sub-components

- `<AdvisorShell>` — the card/modal chrome, title, description.
- `<AdvisorForm>` — country select, platform toggle, **coverage % slider**.
- `<AdvisorSummary>` — "5 device families → ~72.3% coverage for India (Android + iOS)".
- `<AdvisorMatrixTable>` — table of device families sorted by share, with included/excluded visual split.
- `<AdvisorCtas>` — buttons and minimal lead form.

---

## 6. Implementation Phases

### Phase 1 – Skeleton and data loading

1. **Create the page to host the widget**

`app/device-coverage-demo/page.tsx`:

```tsx
import DeviceCoverageAdvisor from '@/components/DeviceCoverageAdvisor';

export default function DeviceCoverageDemoPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Device Coverage Advisor (Dev)
      </h1>
      <DeviceCoverageAdvisor />
    </main>
  );
}
```

2. **Implement minimal `DeviceCoverageAdvisor`**

- Use `useState<'idle' | 'loading' | 'ready' | 'error'>` for loading state.
- On mount, fetch JSON and store `baselineData`.
- Render a basic card with "Start" button.

3. **Verify local run**

- `npm run dev`
- Visit `/device-coverage-demo`
- Confirm data loads.

### Phase 2 – Aggregation, slider, and matrix rendering

1. **Add control state**

- `selectedCountry` (default from first country in dataset).
- `selectedPlatform` (`'both' | 'android' | 'ios'`).
- `coveragePct` (number, 0–100, default 70).

2. **Aggregation logic** (in a memoized hook)

- Filter raw rows by `country_code` and `platform`.
- Group by `device_family` → compute `combined_share`, `model_count`, `os_version_range`, `representative_models`.
- Sort families by `combined_share` descending.
- Compute `cumulative_share` as a running total.

3. **Slider-driven filtering**

- Walk the sorted family list. Include families until `cumulative_share >= coveragePct / 100`.
- The family that crosses the threshold is included (so we always meet or slightly exceed the target).

4. **Render matrix**

Table at the **device-family level**:

- Columns: Family, OEM, Platform, OS Range, Type, Models, Share (%), Cumulative (%).
- Rows that are "included" appear normally; rows below the cutoff are dimmed or collapsed.

5. **Summary**

Above the table:

- "For **{countryName}**, **{platformLabel}**, targeting **{coveragePct}%** coverage requires **{familyCount} device families** (achieving **{achievedCoverage}%**)."

### Phase 3 – CTAs and lead capture

1. **Add CTA buttons below the matrix**

- `Book a 30-minute working session`
- `Email me this matrix`

2. **Inline lead form**

On click:

- Toggle a simple inline form:
  - `email` (required)
  - `company` (optional)
  - `app link` (optional)
- On submit:
  - For now, just `console.log` the payload:
    - User details
    - `selectedCountry`, `selectedPlatform`, `coveragePct`
    - Slice of selected family rows.
  - You can later send this to your backend or Zapier.

3. **Analytics hooks (optional)**

Add `useEffect` or direct calls around:

- Widget open
- Matrix generated
- Slider adjusted (debounced)
- CTA clicked

---

## 7. Optional: CSV support and downloads

If you want to **store baseline data as CSV** or allow CSV export of the chosen matrix:

1. **Client-side CSV parsing**

- Use `react-papaparse`'s `readRemoteFile` or `readString` to parse CSV hosted under `/device-coverage/device_coverage_baseline.csv`.
- Map rows to your `BaselineRow` type.

2. **CSV download**

- Export the **family-level** matrix (not raw rows) as CSV.
- Columns: Family, OEM, Platform, OS Range, Type, Models, Combined Share (%), Cumulative (%).

---

## 8. Local Dev and Testing Checklist

- [ ] Place `device_coverage_baseline.json` under `public/device-coverage/`.
- [ ] Implement `DeviceCoverageAdvisor` with:
  - [ ] Data load from static JSON.
  - [ ] Region / platform inputs.
  - [ ] **Coverage % slider** with real-time matrix updates.
  - [ ] Device-family aggregation and greedy accumulation logic.
  - [ ] Family-level matrix table rendering.
  - [ ] Summary text.
  - [ ] Basic CTAs (even if they only log to console initially).
- [ ] Create `/device-coverage-demo` page to host and test the widget.
- [ ] Run `npm run dev` and iterate on:
  - [ ] Data correctness (sanity check aggregation and slider breakpoints).
  - [ ] UX friction (can a QA manager finish in under 60 seconds?).
  - [ ] Visual integration with your existing design.

Once this is stable, you can:

- Embed `<DeviceCoverageAdvisor />` on the homepage or solutions page.
- Optionally extract the component into a Vite-built library if you want an embeddable, script-tag-style widget for external sites later.
