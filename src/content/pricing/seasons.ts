import type { Season } from '@/features/itineraries/schema';

// Price seasons for northern Tanzania, by date (MM-DD, inclusive). When ranges overlap, the first match in this list wins,
// so `peak` sits first. CONFIRM: set these to match your lodge contracts.
export const priceSeasons: Season[] = [
  {
    id: 'peak',
    label: 'Peak (river crossings, festive)',
    ranges: [
      { from: '07-01', to: '09-30' },
      { from: '12-20', to: '12-31' },
      { from: '01-01', to: '01-05' },
    ],
  },
  {
    id: 'high',
    label: 'High season',
    ranges: [
      { from: '06-01', to: '10-31' },
      { from: '12-20', to: '12-31' },
      { from: '01-01', to: '02-29' },
    ],
  },
  {
    id: 'shoulder',
    label: 'Shoulder season',
    ranges: [
      { from: '03-01', to: '03-31' },
      { from: '11-01', to: '12-19' },
    ],
  },
  { id: 'low', label: 'Low (green) season', ranges: [{ from: '04-01', to: '05-31' }] },
];
