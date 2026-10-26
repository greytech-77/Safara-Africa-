import type { Place } from '@/features/itineraries/schema';

// Places used by itineraries. Coordinates are approximate (park centres, town centres) and only draw the route maps.
// `park` links to a page in content/parks.ts so park pages can list the trips that visit them.

export const places: Place[] = [
  // Northern Tanzania
  { slug: 'arusha', name: 'Arusha', kind: 'city', lat: -3.367, lng: 36.683 },
  { slug: 'kilimanjaro-airport', name: 'Kilimanjaro Airport', kind: 'airport', lat: -3.429, lng: 37.074 },
  { slug: 'moshi', name: 'Moshi', kind: 'city', lat: -3.335, lng: 37.34 },
  { slug: 'arusha-national-park', name: 'Arusha National Park', kind: 'park', lat: -3.24, lng: 36.86 },
  { slug: 'tarangire', name: 'Tarangire', kind: 'park', lat: -3.95, lng: 36.0, park: 'tarangire' },
  { slug: 'lake-manyara', name: 'Lake Manyara', kind: 'park', lat: -3.55, lng: 35.82, park: 'lake-manyara' },
  { slug: 'mto-wa-mbu', name: 'Mto wa Mbu', kind: 'village', lat: -3.36, lng: 35.86 },
  { slug: 'karatu', name: 'Karatu', kind: 'village', lat: -3.34, lng: 35.67 },
  { slug: 'ngorongoro', name: 'Ngorongoro', kind: 'park', lat: -3.2, lng: 35.55, park: 'ngorongoro' },
  { slug: 'ndutu', name: 'Ndutu', kind: 'park', lat: -3.0, lng: 35.0, park: 'serengeti' },
  { slug: 'central-serengeti', name: 'Central Serengeti', kind: 'park', lat: -2.45, lng: 34.83, park: 'serengeti' },
  { slug: 'northern-serengeti', name: 'Northern Serengeti', kind: 'park', lat: -1.62, lng: 34.85, park: 'serengeti' },
  { slug: 'lake-eyasi', name: 'Lake Eyasi', kind: 'lake', lat: -3.62, lng: 35.08 },
  { slug: 'lake-natron', name: 'Lake Natron', kind: 'lake', lat: -2.42, lng: 36.04 },
  { slug: 'kilimanjaro', name: 'Mount Kilimanjaro', kind: 'mountain', lat: -3.076, lng: 37.353, park: 'kilimanjaro' },
  { slug: 'mount-meru', name: 'Mount Meru', kind: 'mountain', lat: -3.246, lng: 36.748 },
  { slug: 'materuni', name: 'Materuni', kind: 'village', lat: -3.27, lng: 37.4 },
  { slug: 'lushoto', name: 'Lushoto', kind: 'village', lat: -4.78, lng: 38.29 },

  // Southern Tanzania and the coast
  { slug: 'dar-es-salaam', name: 'Dar es Salaam', kind: 'city', lat: -6.79, lng: 39.21 },
  { slug: 'nyerere', name: 'Nyerere', kind: 'park', lat: -7.75, lng: 38.0, park: 'nyerere' },
  { slug: 'ruaha', name: 'Ruaha', kind: 'park', lat: -7.6, lng: 34.9, park: 'ruaha' },
  { slug: 'stone-town', name: 'Stone Town', kind: 'city', lat: -6.163, lng: 39.192 },
  { slug: 'zanzibar-north', name: 'Zanzibar', kind: 'island', lat: -5.73, lng: 39.3 },
  { slug: 'zanzibar-east', name: 'Zanzibar', kind: 'island', lat: -6.27, lng: 39.53 },
  { slug: 'pemba', name: 'Pemba Island', kind: 'island', lat: -5.17, lng: 39.78 },
  { slug: 'mafia', name: 'Mafia Island', kind: 'island', lat: -7.92, lng: 39.68 },

  // Kenya
  { slug: 'nairobi', name: 'Nairobi', kind: 'city', lat: -1.29, lng: 36.82 },
  { slug: 'amboseli', name: 'Amboseli', kind: 'park', lat: -2.65, lng: 37.26, park: 'amboseli' },
  { slug: 'lake-nakuru', name: 'Lake Nakuru', kind: 'park', lat: -0.36, lng: 36.09, park: 'lake-nakuru' },
  { slug: 'maasai-mara', name: 'Maasai Mara', kind: 'park', lat: -1.49, lng: 35.14, park: 'maasai-mara' },
  { slug: 'samburu', name: 'Samburu', kind: 'park', lat: 0.56, lng: 37.53, park: 'samburu' },

  // Uganda and Rwanda
  { slug: 'entebbe', name: 'Entebbe', kind: 'city', lat: 0.05, lng: 32.46 },
  { slug: 'kibale', name: 'Kibale', kind: 'park', lat: 0.49, lng: 30.4, park: 'kibale' },
  { slug: 'bwindi', name: 'Bwindi', kind: 'park', lat: -1.05, lng: 29.65, park: 'bwindi' },
  { slug: 'kigali', name: 'Kigali', kind: 'city', lat: -1.95, lng: 30.06 },
  { slug: 'volcanoes', name: 'Volcanoes', kind: 'park', lat: -1.48, lng: 29.53, park: 'volcanoes' },
  { slug: 'akagera', name: 'Akagera', kind: 'park', lat: -1.88, lng: 30.72, park: 'akagera' },
  { slug: 'nyungwe', name: 'Nyungwe', kind: 'park', lat: -2.48, lng: 29.2, park: 'nyungwe' },
];
