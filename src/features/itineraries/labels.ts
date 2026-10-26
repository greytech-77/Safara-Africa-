import type { ItineraryDay, Stay } from './schema';

// Display labels for itinerary data.

export const MONTH_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const levelLabel: Record<Stay['level'], string> = {
  mountain: 'Mountain camp',
  budget: 'Budget',
  mid: 'Mid-range',
  luxury: 'Luxury',
};

export const stayTypeLabel: Record<Stay['type'], string> = {
  lodge: 'Lodge',
  'tented-camp': 'Tented camp',
  'mobile-camp': 'Seasonal mobile camp',
  hotel: 'Hotel',
  hut: 'Mountain hut',
  campsite: 'Mountain campsite',
  'beach-resort': 'Beach hotel',
  guesthouse: 'Guesthouse',
};

export const difficultyLabel = { easy: 'Easy', moderate: 'Moderate', challenging: 'Challenging', strenuous: 'Strenuous' } as const;

export const kindLabel = { safari: 'Safari', trek: 'Trek', beach: 'Beach', combo: 'Safari & beach', 'day-trip': 'Day trip' } as const;

export const mealsLabel = (m: ItineraryDay['meals']) =>
  [m.b && 'Breakfast', m.l && 'Lunch', m.d && 'Dinner'].filter(Boolean).join(', ') || 'No meals included';

// "Jun–Oct, Dec–Feb": consecutive months collapsed into ranges, wrapping over the new year.
export function monthRanges(months: number[]) {
  const set = new Set(months);
  const starts = MONTH_SHORT.map((_, i) => i + 1).filter((m) => set.has(m) && !set.has(m === 1 ? 12 : m - 1));
  if (starts.length === 0) return 'All year';
  return starts
    .map((start) => {
      let end = start;
      while (set.has((end % 12) + 1) && (end % 12) + 1 !== start) end = (end % 12) + 1;
      return end === start ? MONTH_SHORT[start - 1] : `${MONTH_SHORT[start - 1]}–${MONTH_SHORT[end - 1]}`;
    })
    .join(', ');
}
