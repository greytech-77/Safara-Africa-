import { describe, expect, it } from 'vitest';
import { travelStyles } from '@/content/travel-styles';
import { getItineraries, getItinerary, getStays, getTours, loadCatalogue, routeStops } from '@/features/itineraries/data';
import { estimateParkFees } from '@/features/itineraries/park-fees';
import { fromPrice, priceFor, priceGrid, seasonForDate } from '@/features/itineraries/pricing';
import { itinerarySchema, type ItineraryInput } from '@/features/itineraries/schema';

const BRIEF_CATALOGUE = [
  'tarangire-day-trip',
  'ngorongoro-crater-day-trip',
  'tarangire-manyara-ngorongoro-3-days',
  'serengeti-ngorongoro-4-days',
  'tarangire-serengeti-ngorongoro-5-days',
  'northern-circuit-classic-7-days',
  'great-migration-calving-8-days',
  'great-migration-central-serengeti-8-days',
  'great-migration-river-crossings-9-days',
  'kilimanjaro-machame-7-days',
  'kilimanjaro-lemosho-8-days',
  'kilimanjaro-marangu-6-days',
  'mount-meru-4-days',
  'safari-and-zanzibar-11-days',
];

describe('itinerary catalogue', () => {
  it('validates every itinerary and cross-reference', () => {
    expect(() => loadCatalogue()).not.toThrow();
  });

  it('contains every itinerary from the brief', () => {
    const slugs = getItineraries().map((i) => i.slug);
    for (const s of BRIEF_CATALOGUE) expect(slugs, s).toContain(s);
  });

  it('keeps every travel-style tour reference valid', () => {
    const slugs = new Set(getTours().map((t) => t.slug));
    for (const style of travelStyles) for (const t of style.tours) expect(slugs, `${style.slug} → ${t}`).toContain(t);
  });

  it('marks every seeded price as a placeholder until the owner confirms it', () => {
    for (const it of getItineraries()) if (it.pricing) expect(it.pricing.isPlaceholder, it.slug).toBe(true);
  });

  it('gives every multi-day trip a named stay for each night except the last day', () => {
    for (const it of getItineraries()) {
      if (it.days < 2) continue;
      it.itinerary.slice(0, -1).forEach((d) => expect(d.stay, `${it.slug} day ${d.day}`).not.toBeNull());
    }
  });

  it('gives every Kilimanjaro and Meru day an altitude stage', () => {
    for (const it of getItineraries().filter((i) => i.styles.includes('kilimanjaro') || i.styles.includes('mount-meru'))) {
      it.itinerary.forEach((d) => expect(d.trek, `${it.slug} day ${d.day}`).toBeDefined());
    }
  });

  it('rejects a trip whose day count does not match its days', () => {
    const base = getItinerary('tarangire-day-trip')! as unknown as ItineraryInput;
    const r = itinerarySchema.safeParse({ ...base, days: 2 });
    expect(r.success).toBe(false);
  });
});

describe('route', () => {
  it('merges consecutive nights in one place and keeps day visits', () => {
    const route = routeStops(getItinerary('northern-circuit-classic-7-days')!);
    expect(route.map((s) => `${s.place}:${s.nights}`)).toEqual([
      'Arusha:0',
      'Tarangire:1',
      'Lake Manyara:0',
      'Karatu:1',
      'Central Serengeti:3',
      'Ngorongoro:1',
      'Arusha:0',
    ]);
  });

  it('counts nights on the mountain for Kilimanjaro', () => {
    const route = routeStops(getItinerary('kilimanjaro-machame-7-days')!);
    expect(route.map((s) => `${s.place}:${s.nights}`)).toEqual(['Moshi:0', 'Mount Kilimanjaro:6', 'Moshi:1']);
  });
});

describe('pricing', () => {
  it('finds the season for a date', () => {
    expect(seasonForDate(new Date('2027-04-15'))).toBe('low');
    expect(seasonForDate(new Date('2027-08-10'))).toBe('peak');
    expect(seasonForDate(new Date('2026-11-10'))).toBe('shoulder');
    expect(seasonForDate(new Date('2027-02-10'))).toBe('high');
  });

  it('shows the lowest current price and hides expired price tables', () => {
    const it = getItinerary('northern-circuit-classic-7-days')!;
    const p = fromPrice(it, new Date('2026-10-26'));
    expect(p?.amountUsd).toBe(Math.min(...it.pricing!.rows.map((r) => r.perPersonUsd)));
    expect(fromPrice(it, new Date('2027-07-01'))).toBeUndefined();
  });

  it('prices by season and group size, falling back to the next season up', () => {
    const it = getItinerary('northern-circuit-classic-7-days')!;
    const row = (season: string, size: number) => it.pricing!.rows.find((r) => r.season === season && r.groupSize === size)!.perPersonUsd;
    expect(priceFor(it, new Date('2027-04-15'), 4)).toBe(row('low', 4));
    expect(priceFor(it, new Date('2027-04-15'), 5)).toBe(row('low', 4));
    // No peak rows on this trip: August falls back to high season.
    expect(priceFor(it, new Date('2027-08-10'), 2)).toBe(row('high', 2));
  });

  it('builds a season × group-size grid', () => {
    const grid = priceGrid(getItinerary('great-migration-river-crossings-9-days')!.pricing!);
    expect(grid.seasons.map((s) => s.id)).toEqual(['peak', 'high', 'shoulder', 'low']);
    expect(grid.groupSizes).toEqual([2, 4, 6]);
    expect(grid.cell('peak', 2)).toBeGreaterThan(grid.cell('low', 2)!);
  });
});

describe('park fees', () => {
  const stays = () => getStays();
  const on = '2026-10-26';

  it('charges Tarangire conservation for a day trip, with VAT', () => {
    const est = estimateParkFees(getItinerary('tarangire-day-trip')!, stays(), { adults: 2 }, { on });
    expect(est.lines).toHaveLength(1);
    expect(est.lines[0]).toMatchObject({ park: 'tarangire', feeType: 'conservation', quantity: 1 });
    expect(est.totalUsd).toBeCloseTo(50 * 1.18 * 2, 2);
    expect(est.isPlaceholder).toBe(true);
  });

  it('charges the crater service fee per vehicle, not per person', () => {
    const two = estimateParkFees(getItinerary('ngorongoro-crater-day-trip')!, stays(), { adults: 2 }, { on });
    const crater = (e: typeof two) => e.lines.find((l) => l.feeType === 'crater-service')!;
    expect(crater(two).totalUsd).toBe(295);
    const seven = estimateParkFees(getItinerary('ngorongoro-crater-day-trip')!, stays(), { adults: 7 }, { on });
    expect(crater(seven).totalUsd).toBe(590);
  });

  it('adds concession fees for nights inside a park and rescue fees once per mountain', () => {
    const kili = estimateParkFees(getItinerary('kilimanjaro-machame-7-days')!, stays(), { adults: 1 }, { on });
    const line = (t: string) => kili.lines.find((l) => l.feeType === t)!;
    expect(line('conservation').quantity).toBe(7);
    expect(line('camping').quantity).toBe(6);
    expect(line('rescue').quantity).toBe(1);
  });

  it('reports parks that have no fee data instead of guessing', () => {
    const est = estimateParkFees(getItinerary('tanzania-fly-in')!, stays(), { adults: 2 }, { on });
    expect(est.missingParks).toContain('ruaha');
  });

  it('charges children at the child rate', () => {
    const adultsOnly = estimateParkFees(getItinerary('tarangire-day-trip')!, stays(), { adults: 2 }, { on });
    const withChild = estimateParkFees(getItinerary('tarangire-day-trip')!, stays(), { adults: 2, children: 1 }, { on });
    expect(withChild.totalUsd - adultsOnly.totalUsd).toBeCloseTo(15 * 1.18, 2);
  });
});
