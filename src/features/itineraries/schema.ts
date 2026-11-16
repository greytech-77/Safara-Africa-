import { z } from 'zod';

// The itinerary data model. Trips are data, not code: add one by adding an object to src/content/itineraries/.
// Everything here is validated when the site builds (and in `npm test`), so broken references fail loudly.
// The same model as SQL lives in database/migrations/0001_itineraries.sql.

export const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'use lowercase words joined by hyphens');
const isoDate = z.iso.date();
const month = z.number().int().min(1).max(12);
const img = z.object({
  src: z.string().refine((s) => s.startsWith('/') || s.startsWith('https://'), 'must be a /public path or an https URL'),
  alt: z.string().min(3),
});

export const placeKinds = ['city', 'park', 'lake', 'mountain', 'island', 'village', 'airport'] as const;
export const placeSchema = z.object({
  slug,
  name: z.string(),
  kind: z.enum(placeKinds),
  lat: z.number().min(-12).max(5),
  lng: z.number().min(28).max(42),
  // Slug in content/parks.ts, so park pages can list trips that visit them.
  park: slug.optional(),
});

export const stayLevels = ['mountain', 'budget', 'mid', 'luxury'] as const;
export const stayTypes = ['lodge', 'tented-camp', 'mobile-camp', 'hotel', 'hut', 'campsite', 'beach-resort', 'guesthouse'] as const;
export const nightlyFeeTypes = ['concession', 'camping', 'hut'] as const;
export const staySchema = z.object({
  slug,
  name: z.string(),
  level: z.enum(stayLevels),
  type: z.enum(stayTypes),
  place: slug,
  // Slug in content/accommodations.ts when the lodge has its own page.
  accommodation: slug.optional(),
  // Park fee charged per person per night for sleeping here (inside a park or on the mountain).
  nightlyFee: z.object({ park: slug, feeType: z.enum(nightlyFeeTypes) }).optional(),
  // One short line on why it is a good place to sleep, shown after the lodge name ("Overnight: … — <benefit>").
  // Lives on the stay, so every tour describes the lodge the same way.
  benefit: z.string().max(90).optional(),
});

export const trekStageSchema = z.object({
  startAltM: z.number().int().positive(),
  maxAltM: z.number().int().positive(),
  sleepAltM: z.number().int().positive(),
  hikeHours: z.number().positive(),
  distanceKm: z.number().positive(),
});

export const daySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(3),
  description: z.string().min(20),
  // Places visited in order; the last one is where the night is spent.
  places: z.array(slug).min(1),
  // Parks whose daily conservation fee applies (slugs in content/pricing/park-fees.ts).
  parks: z.array(slug).default([]),
  driveHours: z.number().positive().optional(),
  activities: z.array(z.string()).default([]),
  craterDescent: z.boolean().optional(),
  meals: z.object({ b: z.boolean(), l: z.boolean(), d: z.boolean() }),
  // Null on the last day or when the night is not part of the trip.
  stay: slug.nullable(),
  trek: trekStageSchema.optional(),
  // Photo shown when the day is opened. Falls back to the lodge, then the park, then the trip's hero photo.
  image: img.optional(),
  // Booking-focused day copy (see docs/itinerary-writing.md). All optional: a day without them shows its description.
  // Hook: the day's promise in one italic sentence, under 15 words.
  hook: z.string().max(110).optional(),
  // The single best moment of the day, shown with a ✦.
  highlight: z.string().max(90).optional(),
  // Driving time and distance, or flight time, e.g. "About 2.5 h / 120 km from Arusha".
  practical: z.string().max(90).optional(),
  // One sentence from our guides: best seat, best time for photos…
  guideTip: z.string().max(200).optional(),
  // An optional extra for this day, e.g. "Walking safari in the conservation area"; priceFromUsd only if confirmed.
  addOn: z.object({ text: z.string(), priceFromUsd: z.number().positive().optional() }).optional(),
});

export const seasons = ['low', 'shoulder', 'high', 'peak'] as const;
export const tiers = ['Budget', 'Mid Range', 'Luxury'] as const;
export const pricingSchema = z
  .object({
    tier: z.enum(tiers),
    validFrom: isoDate,
    validTo: isoDate,
    rows: z
      .array(z.object({ season: z.enum(seasons), groupSize: z.number().int().min(1).max(12), perPersonUsd: z.number().positive() }))
      .min(1),
    singleSupplementUsd: z.number().nonnegative().optional(),
    // True until the owner confirms the figures. The page then labels every price as a placeholder.
    isPlaceholder: z.boolean(),
    note: z.string().optional(),
  })
  .refine((p) => p.validFrom < p.validTo, { message: 'validFrom must be before validTo', path: ['validTo'] })
  .refine((p) => new Set(p.rows.map((r) => `${r.season}:${r.groupSize}`)).size === p.rows.length, {
    message: 'duplicate season and group size row',
    path: ['rows'],
  });

export const itineraryKinds = ['safari', 'trek', 'beach', 'combo', 'day-trip'] as const;
export const travelStyles = ['Private luxury', 'Fly-in', 'Guided', 'Trekking', 'Beach'] as const;
export const difficulties = ['easy', 'moderate', 'challenging', 'strenuous'] as const;

export const itinerarySchema = z
  .object({
    slug,
    title: z.string().min(5),
    summary: z.string().min(40).max(300),
    kind: z.enum(itineraryKinds),
    // Slug in content/countries.ts.
    country: slug,
    travelStyle: z.enum(travelStyles),
    tier: z.enum(tiers),
    difficulty: z.enum(difficulties),
    days: z.number().int().positive(),
    bestMonths: z.array(month).min(1),
    // Journey types, trek and beach slugs this trip belongs to (content/journeys.ts, treks.ts, beaches.ts).
    styles: z.array(slug).default([]),
    hero: img,
    gallery: z.array(img).default([]),
    highlights: z.array(z.string()).min(1),
    idealFor: z.array(z.string()).default([]),
    itinerary: z.array(daySchema).min(1),
    included: z.array(z.string()).min(1),
    excluded: z.array(z.string()).min(1),
    pricing: pricingSchema.optional(),
    addOns: z.array(slug).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    trek: z
      .object({
        route: z.string(),
        summitAltM: z.number().int().positive().optional(),
        // CONFIRM: publish your own summit records here; never borrow another operator's figures.
        successRateNote: z.string(),
      })
      .optional(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
    lastReviewed: isoDate,
    // An honest seasonal note shown above the day by day (no invented urgency).
    seasonNote: z.string().max(220).optional(),
    // "Why you'll love this journey": three short reasons after the last day.
    whyLove: z.array(z.string()).max(3).default([]),
  })
  .superRefine((it, ctx) => {
    if (it.itinerary.length !== it.days) {
      ctx.addIssue({ code: 'custom', path: ['itinerary'], message: `has ${it.itinerary.length} days but "days" is ${it.days}` });
    }
    it.itinerary.forEach((d, i) => {
      if (d.day !== i + 1) ctx.addIssue({ code: 'custom', path: ['itinerary', i, 'day'], message: `expected day ${i + 1}, got ${d.day}` });
    });
    if (new Set(it.bestMonths).size !== it.bestMonths.length) {
      ctx.addIssue({ code: 'custom', path: ['bestMonths'], message: 'months repeat' });
    }
    if (it.kind === 'trek' && !it.trek) ctx.addIssue({ code: 'custom', path: ['trek'], message: 'trek itineraries need trek details' });
  });

export const addOnSchema = z.object({
  slug,
  title: z.string(),
  kind: z.enum(['beach', 'cultural', 'activity']),
  duration: z.string(),
  summary: z.string().min(20),
  places: z.array(slug).min(1),
  priceFromUsd: z.number().positive().optional(),
  isPlaceholder: z.boolean(),
});

export const seasonSchema = z.object({
  id: z.enum(seasons),
  label: z.string(),
  ranges: z.array(z.object({ from: z.string().regex(/^\d{2}-\d{2}$/), to: z.string().regex(/^\d{2}-\d{2}$/) })).min(1),
});

export const feeTypes = ['conservation', 'concession', 'camping', 'hut', 'rescue', 'crater-service'] as const;
export const feeUnits = ['person-day', 'person-night', 'person-trip', 'vehicle-entry'] as const;
export const parkFeeSchema = z.object({
  park: slug,
  parkName: z.string(),
  authority: z.enum(['TANAPA', 'NCAA', 'ZNZ', 'other']),
  feeType: z.enum(feeTypes),
  unit: z.enum(feeUnits),
  residency: z.enum(['non-resident', 'ea-resident']),
  age: z.enum(['adult', 'child']),
  amountUsd: z.number().nonnegative(),
  vatIncluded: z.boolean(),
  validFrom: isoDate,
  validTo: isoDate,
  isPlaceholder: z.boolean(),
});

export type Place = z.infer<typeof placeSchema>;
export type Stay = z.infer<typeof staySchema>;
export type ItineraryDay = z.infer<typeof daySchema>;
export type Pricing = z.infer<typeof pricingSchema>;
export type Season = z.infer<typeof seasonSchema>;
export type SeasonId = (typeof seasons)[number];
export type Itinerary = z.infer<typeof itinerarySchema>;
export type ItineraryInput = z.input<typeof itinerarySchema>;
export type AddOn = z.infer<typeof addOnSchema>;
export type ParkFee = z.infer<typeof parkFeeSchema>;
