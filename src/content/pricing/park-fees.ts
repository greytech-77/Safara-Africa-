import type { ParkFee } from '@/features/itineraries/schema';

// Park, concession and mountain fees, in USD per unit, for non-resident visitors.
// PLACEHOLDER — owner to confirm. Every figure must be checked against the current TANAPA and NCAA tariff
// before it is shown as final. Fee years run 1 July to 30 June. Add a new set of rows each year rather than editing old ones,
// so quotes made under last year's fees can still be explained.

export const VAT_RATE = 0.18;

const year = { validFrom: '2026-07-01', validTo: '2027-06-30', isPlaceholder: true } as const;
const nonResident = { residency: 'non-resident', ...year } as const;

const pair = (
  park: string,
  parkName: string,
  authority: ParkFee['authority'],
  feeType: ParkFee['feeType'],
  unit: ParkFee['unit'],
  adult: number,
  child: number,
  vatIncluded = false,
): ParkFee[] => [
  { park, parkName, authority, feeType, unit, age: 'adult', amountUsd: adult, vatIncluded, ...nonResident },
  { park, parkName, authority, feeType, unit, age: 'child', amountUsd: child, vatIncluded, ...nonResident },
];

export const parkFees: ParkFee[] = [
  ...pair('serengeti', 'Serengeti National Park', 'TANAPA', 'conservation', 'person-day', 70, 20),
  ...pair('serengeti', 'Serengeti National Park', 'TANAPA', 'concession', 'person-night', 60, 10),
  ...pair('tarangire', 'Tarangire National Park', 'TANAPA', 'conservation', 'person-day', 50, 15),
  ...pair('tarangire', 'Tarangire National Park', 'TANAPA', 'concession', 'person-night', 50, 10),
  ...pair('lake-manyara', 'Lake Manyara National Park', 'TANAPA', 'conservation', 'person-day', 50, 15),
  ...pair('arusha-national-park', 'Arusha National Park', 'TANAPA', 'conservation', 'person-day', 45, 15),
  ...pair('arusha-national-park', 'Arusha National Park', 'TANAPA', 'hut', 'person-night', 30, 10),
  ...pair('arusha-national-park', 'Arusha National Park', 'TANAPA', 'rescue', 'person-trip', 20, 20),
  ...pair('kilimanjaro', 'Kilimanjaro National Park', 'TANAPA', 'conservation', 'person-day', 70, 20),
  ...pair('kilimanjaro', 'Kilimanjaro National Park', 'TANAPA', 'camping', 'person-night', 50, 10),
  ...pair('kilimanjaro', 'Kilimanjaro National Park', 'TANAPA', 'hut', 'person-night', 60, 10),
  ...pair('kilimanjaro', 'Kilimanjaro National Park', 'TANAPA', 'rescue', 'person-trip', 20, 20),
  ...pair('ngorongoro', 'Ngorongoro Conservation Area', 'NCAA', 'conservation', 'person-day', 70, 20),
  ...pair('ngorongoro', 'Ngorongoro Conservation Area', 'NCAA', 'concession', 'person-night', 60, 10),
  // Charged per vehicle for each descent into the crater; the child row is unused but kept for symmetry.
  ...pair('ngorongoro', 'Ngorongoro Conservation Area', 'NCAA', 'crater-service', 'vehicle-entry', 295, 0, true),
];
