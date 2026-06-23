'use client';

import { useState, type FormEvent } from 'react';
import type { LeadFormData, MatrixSummary, FilterState } from './types';

interface AdvisorCtasProps {
  summary: MatrixSummary;
  filters: FilterState;
}

export default function AdvisorCtas({ summary, filters }: AdvisorCtasProps) {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'book' | 'email'>('book');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    email: '',
    company: '',
    appLink: '',
  });

  function handleCtaClick(type: 'book' | 'email') {
    setFormType(type);
    setShowForm(true);
    setSubmitted(false);
  }

  function handleDownloadCsv() {
    const included = summary.allFamilies.filter((f) => f.included);
    const headers = [
      'Family',
      'OEM',
      'Platform',
      'OS Range',
      'Type',
      'Models',
      'Representative Devices',
      'Share (%)',
      'Cumulative (%)',
    ];
    const csvRows = included.map((f) => [
      f.device_family,
      f.device_oem,
      f.platform,
      f.os_version_range,
      f.device_type,
      String(f.model_count),
      f.representative_models,
      (f.combined_share * 100).toFixed(1),
      (f.cumulative_share * 100).toFixed(1),
    ]);

    const csv = [headers, ...csvRows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `device-matrix-${filters.country}-${filters.coveragePct}pct.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const included = summary.allFamilies.filter((f) => f.included);
    const payload = {
      ...formData,
      ctaType: formType,
      filters,
      selectedFamilies: included.map((f) => ({
        family: f.device_family,
        oem: f.device_oem,
        share: f.combined_share,
        models: f.model_count,
      })),
    };

    console.log('[DeviceCoverageAdvisor] Lead captured:', payload);
    setSubmitted(true);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleCtaClick('book')}
          className="inline-flex items-center rounded-lg bg-[var(--qp-accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--qp-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--qp-accent)]/40 focus:ring-offset-2 transition"
        >
          Book a 30-minute working session
        </button>
        <button
          type="button"
          onClick={() => handleCtaClick('email')}
          className="inline-flex items-center rounded-lg border border-[var(--qp-accent)] bg-[var(--qp-card)] px-4 py-2 text-sm font-semibold text-[var(--qp-accent)] hover:bg-[var(--qp-accent-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--qp-accent)]/30 focus:ring-offset-2 transition"
        >
          Email me this matrix
        </button>
        <button
          type="button"
          onClick={handleDownloadCsv}
          className="inline-flex items-center rounded-lg border border-[var(--qp-border)] bg-[var(--qp-card)] px-4 py-2 text-sm font-medium text-[var(--qp-ink)]/80 hover:bg-[var(--qp-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--qp-border)] focus:ring-offset-2 transition"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download CSV
        </button>
      </div>

      {showForm && !submitted && (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-[var(--qp-border)] bg-[var(--qp-subtle)] p-4 space-y-3"
        >
          <h3 className="text-sm font-semibold text-[var(--qp-ink)]">
            {formType === 'book'
              ? 'Book a working session with our team'
              : 'We\'ll email you this device matrix'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="lead-email" className="block text-xs font-medium text-[var(--qp-muted)] mb-1">
                Work email *
              </label>
              <input
                id="lead-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-[var(--qp-border)] bg-[var(--qp-card)] px-3 py-2 text-sm focus:border-[var(--qp-accent)] focus:ring-2 focus:ring-[var(--qp-accent)]/20 focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="lead-company" className="block text-xs font-medium text-[var(--qp-muted)] mb-1">
                Company
              </label>
              <input
                id="lead-company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                placeholder="Acme Inc."
                className="w-full rounded-lg border border-[var(--qp-border)] bg-[var(--qp-card)] px-3 py-2 text-sm focus:border-[var(--qp-accent)] focus:ring-2 focus:ring-[var(--qp-accent)]/20 focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="lead-app" className="block text-xs font-medium text-[var(--qp-muted)] mb-1">
                App link
              </label>
              <input
                id="lead-app"
                type="url"
                value={formData.appLink}
                onChange={(e) => setFormData((p) => ({ ...p, appLink: e.target.value }))}
                placeholder="https://play.google.com/store/apps/..."
                className="w-full rounded-lg border border-[var(--qp-border)] bg-[var(--qp-card)] px-3 py-2 text-sm focus:border-[var(--qp-accent)] focus:ring-2 focus:ring-[var(--qp-accent)]/20 focus:outline-none transition"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-[var(--qp-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--qp-accent-hover)] transition"
            >
              {formType === 'book' ? 'Request session' : 'Send matrix'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-sm text-[var(--qp-muted)] hover:text-[var(--qp-ink)] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {submitted && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
          <strong>Thank you!</strong>{' '}
          {formType === 'book'
            ? 'We\'ll reach out to schedule your working session.'
            : 'The device matrix has been sent to your email.'}
          <span className="block mt-1 text-xs text-green-600">
            (Demo mode: check browser console for captured lead data)
          </span>
        </div>
      )}
    </div>
  );
}
