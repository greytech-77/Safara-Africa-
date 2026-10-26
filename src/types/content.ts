// Shared content types. Loaders live in src/lib/content.ts; data lives in src/content/.

export type Img = { src: string; alt: string };
export type Stop = { place: string; nights: number };

export type Tour = {
  slug: string;
  title: string;
  summary: string;
  days: number;
  style: 'Private luxury' | 'Fly-in' | 'Guided' | 'Trekking' | 'Beach';
  // Country slug (content/countries.ts), comfort tier, and the journey/beach/trek slugs this tour belongs to.
  country: string;
  tier?: 'Budget' | 'Mid Range' | 'Luxury';
  tags: string[];
  order: number;
  route: Stop[];
  idealFor: string[];
  included: string[];
  hero: Img;
  gallery: Img[];
  itineraryUrl?: string;
  priceFrom?: string;
  draft: boolean;
  html: string;
};

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
