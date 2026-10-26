import type { Pricing } from '@/features/itineraries/schema';

// Building blocks shared by the itinerary files.

export const meals = {
  all: { b: true, l: true, d: true },
  bl: { b: true, l: true, d: false },
  bd: { b: true, l: false, d: true },
  ld: { b: false, l: true, d: true },
  b: { b: true, l: false, d: false },
  d: { b: false, l: false, d: true },
  none: { b: false, l: false, d: false },
} as const;

export const unsplash = (id: string, alt: string) => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`,
  alt,
});

// PLACEHOLDER — owner to confirm. Until real rates are entered, each trip's grid is generated from one figure:
// the high-season price per person for two travellers. Seasons and group sizes scale it by the factors below.
const SEASON_FACTOR = { peak: 1.12, high: 1, shoulder: 0.9, low: 0.8 } as const;
const GROUP_FACTOR: Record<number, number> = { 1: 1.55, 2: 1, 4: 0.82, 6: 0.72 };
const roundTo5 = (n: number) => Math.round(n / 5) * 5;

export function placeholderPricing(
  highFor2: number,
  tier: Pricing['tier'],
  opts: { peak?: boolean; groupSizes?: number[]; singleSupplementUsd?: number; note?: string } = {},
): Pricing {
  const seasonIds = (opts.peak ? ['peak', 'high', 'shoulder', 'low'] : ['high', 'shoulder', 'low']) as (keyof typeof SEASON_FACTOR)[];
  const sizes = opts.groupSizes ?? [2, 4, 6];
  return {
    tier,
    validFrom: '2026-07-01',
    validTo: '2027-06-30',
    rows: seasonIds.flatMap((season) =>
      sizes.map((groupSize) => ({ season, groupSize, perPersonUsd: roundTo5(highFor2 * SEASON_FACTOR[season] * GROUP_FACTOR[groupSize]) })),
    ),
    singleSupplementUsd: opts.singleSupplementUsd,
    isPlaceholder: true,
    note: opts.note,
  };
}

export const safariIncluded = [
  'Private 4x4 safari vehicle with pop-up roof and a professional English-speaking driver-guide',
  'Accommodation and meals as listed for each day',
  'Park, conservation, concession and crater fees',
  'Drinking water in the vehicle',
  'Airport transfers in Arusha or Kilimanjaro',
];

export const safariExcluded = [
  'International flights and visas',
  'Travel insurance (required)',
  'Tips for your guide and lodge staff',
  'Drinks at lodges, unless stated',
  'Optional activities such as balloon flights and cultural visits, unless listed',
];

export const trekIncluded = [
  'Licensed mountain guide, assistant guides, cook and porters',
  'Park, camping or hut, and rescue fees',
  'Mountain tents, sleeping mats and all meals on the mountain',
  'Filtered drinking water and daily health checks with a pulse oximeter',
  'Two nights in Moshi with breakfast, before and after the climb',
  'Kilimanjaro Airport transfers',
];

export const trekExcluded = [
  'International flights and visas',
  'Travel insurance covering trekking to the summit altitude (required)',
  'Tips for the mountain crew',
  'Sleeping bag and personal gear (available to hire)',
  'Extra hotel nights',
];
