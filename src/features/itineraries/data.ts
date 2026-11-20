import 'server-only';
import { accommodations } from '@/content/accommodations';
import { addOns as addOnData } from '@/content/add-ons';
import { beaches } from '@/content/beaches';
import { countries } from '@/content/countries';
import { itineraryData } from '@/content/itineraries';
import { journeyTypes } from '@/content/journeys';
import { parks } from '@/content/parks';
import { places as placeData } from '@/content/places';
import { parkFees } from '@/content/pricing/park-fees';
import { stays as stayData } from '@/content/stays';
import { treks } from '@/content/treks';
import type { Img, Stop, Tour, TourCardData } from '@/types/content';
import { fromPrice, formatUsd } from './pricing';
import { addOnSchema, itinerarySchema, placeSchema, staySchema, type AddOn, type Itinerary, type Place, type Stay } from './schema';

// The one place pages read itineraries from. Moving the catalogue to a database later means changing this file only.

type Catalogue = {
  itineraries: Itinerary[];
  places: Map<string, Place>;
  stays: Map<string, Stay>;
  addOns: Map<string, AddOn>;
};

let cache: Catalogue | null = null;

function parseAll<T>(
  label: string,
  schema: { safeParse: (v: unknown) => { success: boolean; data?: T; error?: { issues: { path: PropertyKey[]; message: string }[] } } },
  items: unknown[],
  key: (i: unknown) => string,
  problems: string[],
): T[] {
  const out: T[] = [];
  for (const item of items) {
    const r = schema.safeParse(item);
    if (r.success) out.push(r.data as T);
    else for (const issue of r.error!.issues) problems.push(`${label} "${key(item)}" → ${issue.path.join('.')}: ${issue.message}`);
  }
  return out;
}

const slugOf = (i: unknown) => String((i as { slug?: string }).slug ?? '?');

// Validates the whole catalogue and every cross-reference. Throws one error listing every problem found.
export function loadCatalogue(): Catalogue {
  if (cache) return cache;
  const problems: string[] = [];

  const placeList = parseAll<Place>('place', placeSchema, placeData, slugOf, problems);
  const stayList = parseAll<Stay>('stay', staySchema, stayData, slugOf, problems);
  const addOnList = parseAll<AddOn>('add-on', addOnSchema, addOnData, slugOf, problems);
  const itineraries = parseAll<Itinerary>('itinerary', itinerarySchema, itineraryData, slugOf, problems);

  const unique = <T extends { slug: string }>(label: string, list: T[]) => {
    const seen = new Set<string>();
    for (const x of list) {
      if (seen.has(x.slug)) problems.push(`${label} "${x.slug}" is defined twice`);
      seen.add(x.slug);
    }
    return new Map(list.map((x) => [x.slug, x]));
  };
  const places = unique('place', placeList);
  const stays = unique('stay', stayList);
  const addOns = unique('add-on', addOnList);
  unique('itinerary', itineraries);

  const parkSlugs = new Set(parks.map((p) => p.slug));
  const feeParks = new Set(parkFees.map((f) => f.park));
  const countrySlugs = new Set(countries.map((c) => c.slug));
  const styleSlugs = new Set([...journeyTypes, ...treks, ...beaches].map((s) => s.slug));
  const accommodationSlugs = new Set(accommodations.map((a) => a.slug));

  for (const p of placeList)
    if (p.park && !parkSlugs.has(p.park)) problems.push(`place "${p.slug}" → park "${p.park}" is not in content/parks.ts`);
  for (const s of stayList) {
    if (!places.has(s.place)) problems.push(`stay "${s.slug}" → unknown place "${s.place}"`);
    if (s.accommodation && !accommodationSlugs.has(s.accommodation))
      problems.push(`stay "${s.slug}" → unknown accommodation "${s.accommodation}"`);
    if (s.nightlyFee && !feeParks.has(s.nightlyFee.park)) problems.push(`stay "${s.slug}" → no fees for park "${s.nightlyFee.park}"`);
  }
  for (const a of addOnList) for (const p of a.places) if (!places.has(p)) problems.push(`add-on "${a.slug}" → unknown place "${p}"`);

  for (const it of itineraries) {
    const at = `itinerary "${it.slug}"`;
    if (!countrySlugs.has(it.country)) problems.push(`${at} → unknown country "${it.country}"`);
    for (const s of it.styles) if (!styleSlugs.has(s)) problems.push(`${at} → unknown style "${s}"`);
    for (const a of it.addOns) if (!addOns.has(a)) problems.push(`${at} → unknown add-on "${a}"`);
    for (const d of it.itinerary) {
      const day = `${at} day ${d.day}`;
      for (const p of d.places) if (!places.has(p)) problems.push(`${day} → unknown place "${p}"`);
      for (const p of d.parks) if (!feeParks.has(p) && !parkSlugs.has(p)) problems.push(`${day} → unknown park "${p}"`);
      if (d.stay && !stays.has(d.stay)) problems.push(`${day} → unknown stay "${d.stay}"`);
      if (it.kind === 'trek' && it.trek?.summitAltM && d.trek && d.trek.maxAltM > it.trek.summitAltM)
        problems.push(`${day} → altitude above the summit`);
    }
  }

  if (problems.length) throw new Error(`Itinerary content has ${problems.length} problem(s):\n- ${problems.join('\n- ')}`);

  cache = { itineraries: itineraries.filter((i) => !i.draft).sort((a, b) => a.order - b.order), places, stays, addOns };
  return cache;
}

export const getItineraries = () => loadCatalogue().itineraries;
export const getItinerary = (slug: string) => getItineraries().find((i) => i.slug === slug);
export const getPlace = (slug: string) => loadCatalogue().places.get(slug);
export const getStay = (slug: string) => loadCatalogue().stays.get(slug);
export const getAddOn = (slug: string) => loadCatalogue().addOns.get(slug);
export const getStays = () => loadCatalogue().stays;

// The photo for a day in the day-by-day: its own, else the lodge's, else the last park visited, else the trip's hero.
export function dayImage(it: Itinerary, day: Itinerary['itinerary'][number]): Img {
  if (day.image) return day.image;
  const { places, stays } = loadCatalogue();
  const lodge = day.stay ? stays.get(day.stay)?.accommodation : undefined;
  const lodgeImage = lodge && accommodations.find((a) => a.slug === lodge)?.image;
  if (lodgeImage) return lodgeImage;
  const park = day.places
    .map((p) => places.get(p)?.park)
    .filter(Boolean)
    .at(-1);
  return parks.find((p) => p.slug === park)?.image ?? it.hero;
}

// Stops in travel order with nights per stop. Consecutive days in the same place merge into one stop;
// places passed through during the day appear with 0 nights.
export function routeStops(it: Itinerary): Stop[] {
  const { places, stays } = loadCatalogue();
  const stops: Stop[] = [];
  const visit = (slug: string) => {
    if (stops.at(-1)?.slug !== slug) {
      const p = places.get(slug)!;
      stops.push({ slug, place: p.name, nights: 0, park: p.park });
    }
  };
  for (const day of it.itinerary) {
    day.places.forEach(visit);
    const stay = day.stay ? stays.get(day.stay) : undefined;
    if (stay) {
      visit(stay.place);
      stops.at(-1)!.nights += 1;
    }
  }
  return stops;
}

// Park pages (content/parks.ts slugs) this itinerary visits.
export const parksVisited = (it: Itinerary) => [...new Set(routeStops(it).flatMap((s) => (s.park ? [s.park] : [])))];

// Summary used by cards, grids and other pages.
export function toTour(it: Itinerary): Tour {
  const price = fromPrice(it);
  return {
    slug: it.slug,
    title: it.title,
    summary: it.summary,
    days: it.days,
    kind: it.kind,
    style: it.travelStyle,
    country: it.country,
    tier: it.tier,
    difficulty: it.difficulty,
    tags: it.styles,
    order: it.order,
    route: routeStops(it),
    parks: parksVisited(it),
    bestMonths: it.bestMonths,
    idealFor: it.idealFor,
    included: it.included,
    hero: it.hero,
    gallery: it.gallery,
    fromUsd: price?.amountUsd,
    priceFrom: price ? formatUsd(price.amountUsd) : undefined,
    priceIsPlaceholder: price?.isPlaceholder ?? false,
  };
}

let tours: Tour[] | null = null;
export function getTours(): Tour[] {
  tours ??= getItineraries().map(toTour);
  return tours;
}
export const getTour = (slug: string) => getTours().find((t) => t.slug === slug);

// Tours with at least one night at a lodge that has its own page in content/accommodations.ts.
export function getToursStayingAt(accommodationSlug: string): Tour[] {
  const { stays } = loadCatalogue();
  const slugs = new Set(
    getItineraries()
      .filter((it) => it.itinerary.some((d) => d.stay && stays.get(d.stay)?.accommodation === accommodationSlug))
      .map((it) => it.slug),
  );
  return getTours().filter((t) => slugs.has(t.slug));
}

// Card fields only, for data sent to the browser.
export const toCard = ({
  slug,
  title,
  days,
  kind,
  style,
  country,
  tier,
  route,
  hero,
  fromUsd,
  priceFrom,
  priceIsPlaceholder,
  parks,
  bestMonths,
  tags,
}: Tour): TourCardData => ({
  slug,
  title,
  days,
  kind,
  style,
  country,
  tier,
  route,
  hero,
  fromUsd,
  priceFrom,
  priceIsPlaceholder,
  parks,
  bestMonths,
  tags,
});
