import { priceSeasons } from '@/content/pricing/seasons';
import type { Itinerary, Pricing, SeasonId } from './schema';

// Price lookups. Prices live in each itinerary's `pricing` block; nothing here hard-codes a figure.

const SEASON_ORDER: SeasonId[] = ['peak', 'high', 'shoulder', 'low'];

const monthDay = (d: Date) => `${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
const isoDay = (d: Date) => d.toISOString().slice(0, 10);

// The first season in content/pricing/seasons.ts whose ranges include the date.
export function seasonForDate(date: Date, seasons = priceSeasons): SeasonId {
  const md = monthDay(date);
  const hit = seasons.find((s) => s.ranges.some((r) => md >= r.from && md <= r.to));
  return hit?.id ?? 'high';
}

export const isPricingCurrent = (p: Pricing, today = new Date()) => isoDay(today) <= p.validTo;

export type FromPrice = { amountUsd: number; groupSize: number; isPlaceholder: boolean };

// Lowest per-person price among current rows. Expired price tables return undefined, so stale prices never show.
export function fromPrice(it: Pick<Itinerary, 'pricing'>, today = new Date()): FromPrice | undefined {
  const p = it.pricing;
  if (!p || !isPricingCurrent(p, today)) return undefined;
  const best = p.rows.reduce((a, b) => (b.perPersonUsd < a.perPersonUsd ? b : a));
  return { amountUsd: best.perPersonUsd, groupSize: best.groupSize, isPlaceholder: p.isPlaceholder };
}

// Price per person for a travel date and group size. Uses the row for the largest listed group size that fits
// the group, and falls back to the next season up when a trip has no row for the exact season.
export function priceFor(it: Pick<Itinerary, 'pricing'>, date: Date, groupSize: number): number | undefined {
  const p = it.pricing;
  if (!p) return undefined;
  const season = seasonForDate(date);
  const order = SEASON_ORDER.slice(SEASON_ORDER.indexOf(season)).concat(SEASON_ORDER.slice(0, SEASON_ORDER.indexOf(season)).reverse());
  for (const s of order) {
    const rows = p.rows.filter((r) => r.season === s && r.groupSize <= groupSize).sort((a, b) => b.groupSize - a.groupSize);
    if (rows.length) return rows[0].perPersonUsd;
  }
  return undefined;
}

export type PriceGrid = {
  seasons: { id: SeasonId; label: string }[];
  groupSizes: number[];
  cell: (season: SeasonId, size: number) => number | undefined;
};

// Season × group size table for display, with seasons in the order of content/pricing/seasons.ts.
export function priceGrid(p: Pricing): PriceGrid {
  const present = new Set(p.rows.map((r) => r.season));
  const seasons = priceSeasons.filter((s) => present.has(s.id)).map((s) => ({ id: s.id, label: s.label }));
  const groupSizes = [...new Set(p.rows.map((r) => r.groupSize))].sort((a, b) => a - b);
  return { seasons, groupSizes, cell: (season, size) => p.rows.find((r) => r.season === season && r.groupSize === size)?.perPersonUsd };
}

export const formatUsd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
