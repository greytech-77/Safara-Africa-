import { parkFees as defaultFees, VAT_RATE } from '@/content/pricing/park-fees';
import type { Itinerary, ParkFee, Stay } from './schema';

// Estimates the park, concession, mountain and crater fees inside an itinerary's price, from the fee table in
// content/pricing/park-fees.ts. It explains the price; it does not replace a quote.

export type FeeGroup = { adults: number; children?: number; residency?: ParkFee['residency'] };
export type FeeLine = {
  park: string;
  parkName: string;
  feeType: ParkFee['feeType'];
  unit: ParkFee['unit'];
  quantity: number;
  totalUsd: number;
};
export type FeeEstimate = {
  lines: FeeLine[];
  totalUsd: number;
  perPersonUsd: number;
  // Parks on the route that have no rows in the fee table (their fees are not in the total).
  missingParks: string[];
  isPlaceholder: boolean;
  validFrom?: string;
  validTo?: string;
};

const VEHICLE_SEATS = 6;

export function estimateParkFees(
  it: Pick<Itinerary, 'itinerary'>,
  stays: Map<string, Stay>,
  group: FeeGroup,
  { on, fees = defaultFees }: { on?: string; fees?: ParkFee[] } = {},
): FeeEstimate {
  const residency = group.residency ?? 'non-resident';
  const children = group.children ?? 0;
  const travellers = group.adults + children;
  const vehicles = Math.max(1, Math.ceil(travellers / VEHICLE_SEATS));
  const date = on ?? new Date().toISOString().slice(0, 10);
  const valid = fees.filter((f) => f.residency === residency && f.validFrom <= date && date <= f.validTo);
  const feeParks = new Set(valid.map((f) => f.park));

  const totals = new Map<string, FeeLine>();
  const missing = new Set<string>();
  const used: ParkFee[] = [];

  const gross = (f: ParkFee) => (f.vatIncluded ? f.amountUsd : f.amountUsd * (1 + VAT_RATE));
  const charge = (park: string, feeType: ParkFee['feeType'], units: number) => {
    const rows = valid.filter((f) => f.park === park && f.feeType === feeType);
    if (rows.length === 0) return;
    const adult = rows.find((f) => f.age === 'adult');
    const child = rows.find((f) => f.age === 'child');
    const unit = rows[0].unit;
    const perUnit =
      unit === 'vehicle-entry'
        ? adult
          ? gross(adult) * vehicles
          : 0
        : (adult ? gross(adult) * group.adults : 0) + (child ? gross(child) * children : 0);
    const key = `${park}:${feeType}`;
    const line = totals.get(key) ?? { park, parkName: rows[0].parkName, feeType, unit, quantity: 0, totalUsd: 0 };
    line.quantity += unit === 'vehicle-entry' ? units * vehicles : units;
    line.totalUsd += perUnit * units;
    totals.set(key, line);
    used.push(...rows);
  };

  const tripParks = new Set<string>();
  for (const day of it.itinerary) {
    for (const park of day.parks) {
      if (!feeParks.has(park)) {
        missing.add(park);
        continue;
      }
      tripParks.add(park);
      charge(park, 'conservation', 1);
    }
    if (day.craterDescent) charge('ngorongoro', 'crater-service', 1);
    const stay = day.stay ? stays.get(day.stay) : undefined;
    if (stay?.nightlyFee) {
      if (feeParks.has(stay.nightlyFee.park)) charge(stay.nightlyFee.park, stay.nightlyFee.feeType, 1);
      else missing.add(stay.nightlyFee.park);
    }
  }
  for (const park of tripParks) charge(park, 'rescue', 1);

  const lines = [...totals.values()].map((l) => ({ ...l, totalUsd: Math.round(l.totalUsd * 100) / 100 }));
  const totalUsd = Math.round(lines.reduce((s, l) => s + l.totalUsd, 0) * 100) / 100;
  return {
    lines,
    totalUsd,
    perPersonUsd: travellers ? Math.round((totalUsd / travellers) * 100) / 100 : 0,
    missingParks: [...missing],
    isPlaceholder: used.some((f) => f.isPlaceholder),
    validFrom: used[0]?.validFrom,
    validTo: used[0]?.validTo,
  };
}
