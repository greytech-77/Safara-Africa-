// Shared content types. Loaders live in src/lib/content.ts; data lives in src/content/.

export type Img = {
  src: string;
  alt: string;
  // Required by the photo's licence, e.g. CC BY-SA: shown next to the photo on its detail page.
  credit?: { author: string; licence: string; source: string };
};
// A stop on a trip's route, in travel order. `park` is a content/parks.ts slug when the stop is a park.
export type Stop = { slug?: string; place: string; nights: number; park?: string };

// Summary of an itinerary used by cards, grids, menus and other pages.
// Built from the itinerary catalogue by src/features/itineraries/data.ts (toTour).
export type Tour = {
  slug: string;
  title: string;
  summary: string;
  days: number;
  kind: 'safari' | 'trek' | 'beach' | 'combo' | 'day-trip';
  style: 'Private luxury' | 'Fly-in' | 'Guided' | 'Trekking' | 'Beach';
  // Country slug (content/countries.ts) and the journey/beach/trek slugs this tour belongs to.
  country: string;
  tier?: 'Budget' | 'Mid Range' | 'Luxury';
  difficulty: 'easy' | 'moderate' | 'challenging' | 'strenuous';
  tags: string[];
  order: number;
  route: Stop[];
  // content/parks.ts slugs visited.
  parks: string[];
  bestMonths: number[];
  idealFor: string[];
  included: string[];
  hero: Img;
  gallery: Img[];
  fromUsd?: number;
  priceFrom?: string;
  // True while the price is a placeholder the owner has not confirmed.
  priceIsPlaceholder: boolean;
};

// The fields a tour card and the listing filters need. Sent to the browser on /tours, so keep it small.
export type TourCardData = Pick<
  Tour,
  | 'slug'
  | 'title'
  | 'days'
  | 'kind'
  | 'style'
  | 'country'
  | 'tier'
  | 'route'
  | 'hero'
  | 'fromUsd'
  | 'priceFrom'
  | 'priceIsPlaceholder'
  | 'parks'
  | 'bestMonths'
  | 'tags'
>;

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: Date;
  cover?: Img;
  // Country slugs the article is relevant to.
  tags: string[];
  draft: boolean;
  html: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  topic: 'Planning' | 'Travel' | 'On safari' | 'Booking';
};

// Season rating for one month, used by park and beach month strips.
export type MonthRating = 'best' | 'good' | 'mixed';
