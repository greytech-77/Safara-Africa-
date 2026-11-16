import type { MonthRating } from '@/types/content';

const NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// The months with a given rating as readable ranges, e.g. "June to October" or "June to September & December to February".
// Runs that cross the new year stay together. Used for the season columns, so they always match the month tiles.
export function monthRanges(months: MonthRating[], rating: MonthRating): string {
  const on = months.map((r) => r === rating);
  if (on.every(Boolean)) return 'All year';
  const runs: string[] = [];
  for (let i = 0; i < 12; i++) {
    if (!on[i] || on[(i + 11) % 12]) continue; // only start at the first month of a run
    let end = i;
    while (on[(end + 1) % 12]) end = (end + 1) % 12;
    runs.push(end === i ? NAMES[i] : `${NAMES[i]} to ${NAMES[end]}`);
  }
  return runs.join(' & ');
}
