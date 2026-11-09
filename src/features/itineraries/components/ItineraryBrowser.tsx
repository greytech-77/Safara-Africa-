'use client';

import { useEffect, useMemo, useState } from 'react';
import TourCard from '@/features/tours/components/TourCard';
import type { TourCardData } from '@/types/content';

export type Option = { value: string; label: string };
export type FilterOptions = { kinds: Option[]; parks: Option[]; styles: Option[]; countries: Option[] };

type Filters = { kind: string; length: string; budget: string; park: string; month: string; style: string; country: string };
const EMPTY: Filters = { kind: '', length: '', budget: '', park: '', month: '', style: '', country: '' };
const KEYS = Object.keys(EMPTY) as (keyof Filters)[];

const LENGTHS: (Option & { min: number; max: number })[] = [
  { value: '1-3', label: '1–3 days', min: 1, max: 3 },
  { value: '4-7', label: '4–7 days', min: 4, max: 7 },
  { value: '8-11', label: '8–11 days', min: 8, max: 11 },
  { value: '12+', label: '12 days or more', min: 12, max: Infinity },
];
const BUDGETS: (Option & { min: number; max: number })[] = [
  { value: 'u1500', label: 'Under $1,500 pp', min: 0, max: 1499 },
  { value: '1500-3000', label: '$1,500–3,000 pp', min: 1500, max: 3000 },
  { value: '3000-5000', label: '$3,000–5,000 pp', min: 3001, max: 5000 },
  { value: '5000+', label: 'Over $5,000 pp', min: 5001, max: Infinity },
];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function matches(t: TourCardData, f: Filters) {
  if (f.kind && t.kind !== f.kind) return false;
  if (f.country && t.country !== f.country) return false;
  if (f.park && !t.parks.includes(f.park)) return false;
  if (f.style && !t.tags.includes(f.style)) return false;
  if (f.month && !t.bestMonths.includes(Number(f.month))) return false;
  const len = LENGTHS.find((l) => l.value === f.length);
  if (len && (t.days < len.min || t.days > len.max)) return false;
  const budget = BUDGETS.find((b) => b.value === f.budget);
  if (budget && (t.fromUsd === undefined || t.fromUsd < budget.min || t.fromUsd > budget.max)) return false;
  return true;
}

const fromQuery = (search: string): Filters => {
  const q = new URLSearchParams(search);
  return Object.fromEntries(KEYS.map((k) => [k, q.get(k) ?? ''])) as Filters;
};

// Listing with filters. Every trip renders without JavaScript; filters then narrow the list and are kept in the URL,
// so a filtered view can be shared (e.g. /tours?kind=trek or /tours?country=kenya from the destination pages).
export default function ItineraryBrowser({ tours, options }: { tours: TourCardData[]; options: FilterOptions }) {
  const [filters, setFilters] = useState<Filters>(EMPTY);

  // Read the filters from the URL once on load (the page itself is static).
  useEffect(() => setFilters(fromQuery(window.location.search)), []);

  const shown = useMemo(() => tours.filter((t) => matches(t, filters)), [tours, filters]);
  const active = KEYS.some((k) => filters[k]);

  function update(key: keyof Filters, value: string) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    const q = new URLSearchParams(KEYS.flatMap((k) => (next[k] ? [[k, next[k]]] : [])));
    window.history.replaceState(null, '', `${window.location.pathname}${q.size ? `?${q}` : ''}`);
  }

  function clear() {
    setFilters(EMPTY);
    window.history.replaceState(null, '', window.location.pathname);
  }

  const select = (key: keyof Filters, label: string, anyLabel: string, opts: Option[]) => (
    <label className="block text-step--1 font-semibold text-deep-teal">
      {label}
      <select
        value={filters[key]}
        onChange={(e) => update(key, e.target.value)}
        className="mt-1 w-full rounded-lg border border-deep-teal/25 bg-white px-3 py-2.5 font-normal text-ink focus:border-deep-teal focus:outline-none"
      >
        <option value="">{anyLabel}</option>
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <>
      <form role="search" aria-label="Filter journeys" onSubmit={(e) => e.preventDefault()} className="rounded-xl bg-salt-deep p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {select('kind', 'Type of trip', 'All types', options.kinds)}
          {select('length', 'Length', 'Any length', LENGTHS)}
          {select('budget', 'Budget', 'Any budget', BUDGETS)}
          {select(
            'month',
            'Travel month',
            'Any month',
            MONTHS.map((m, i) => ({ value: String(i + 1), label: m })),
          )}
          {select('park', 'Park or area', 'Anywhere', options.parks)}
          {select('style', 'Experience', 'Any experience', options.styles)}
          {select('country', 'Country', 'All countries', options.countries)}
          <div className="flex items-end">
            <button
              type="button"
              onClick={clear}
              disabled={!active}
              className="btn btn-outline w-full cursor-pointer text-deep-teal disabled:cursor-default disabled:opacity-40"
            >
              Clear filters
            </button>
          </div>
        </div>
      </form>

      <p aria-live="polite" className="mt-6 text-step--1 font-semibold text-ink">
        {shown.length === tours.length ? `${tours.length} journeys` : `${shown.length} of ${tours.length} journeys match`}
      </p>

      {shown.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-deep-teal/15 bg-white p-8 text-center">
          <p className="text-step-1 font-semibold text-deep-teal">No sample journey matches all of these.</p>
          <p className="mt-2 text-ink">Every trip is tailor-made, so tell us what you have in mind, or clear a filter.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={clear} className="btn btn-outline cursor-pointer text-deep-teal">
              Clear filters
            </button>
            <a href="/contact#enquire" className="btn btn-primary">
              Ask for a tailor-made trip
            </a>
          </div>
        </div>
      )}
    </>
  );
}
