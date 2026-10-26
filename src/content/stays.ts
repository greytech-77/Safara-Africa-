import type { Stay } from '@/features/itineraries/schema';

// Lodges, camps, hotels and mountain camps named in itineraries. Pages add "or similar" after every name.
// CONFIRM: these are typical choices for each level, not confirmed contracts. Replace with the properties you book.
// `nightlyFee` adds a park concession, camping or hut fee for each night spent here (see content/pricing/park-fees.ts).

const concession = (park: string) => ({ park, feeType: 'concession' as const });
const camping = (park: string) => ({ park, feeType: 'camping' as const });
const hut = (park: string) => ({ park, feeType: 'hut' as const });

export const stays: Stay[] = [
  // Arusha and Moshi
  { slug: 'kibo-palace-arusha', name: 'Kibo Palace Hotel', level: 'mid', type: 'hotel', place: 'arusha' },
  { slug: 'gran-melia-arusha', name: 'Gran Meliá Arusha', level: 'luxury', type: 'hotel', place: 'arusha' },
  { slug: 'moshi-town-hotel', name: 'Moshi town hotel (3★)', level: 'mid', type: 'hotel', place: 'moshi' },

  // Tarangire, Manyara, Karatu and Ngorongoro
  {
    slug: 'tarangire-safari-lodge',
    name: 'Tarangire Safari Lodge',
    level: 'mid',
    type: 'lodge',
    place: 'tarangire',
    nightlyFee: concession('tarangire'),
  },
  {
    slug: 'tarangire-treetops',
    name: 'Tarangire Treetops',
    level: 'luxury',
    type: 'lodge',
    place: 'tarangire',
    accommodation: 'tarangire-treetops',
  },
  { slug: 'marera-valley-lodge', name: 'Marera Valley Lodge', level: 'budget', type: 'lodge', place: 'karatu' },
  { slug: 'ngorongoro-farm-house', name: 'Ngorongoro Farm House', level: 'mid', type: 'lodge', place: 'karatu' },
  { slug: 'gibbs-farm', name: 'Gibbs Farm', level: 'luxury', type: 'lodge', place: 'karatu', accommodation: 'gibbs-farm' },
  {
    slug: 'ngorongoro-serena',
    name: 'Ngorongoro Serena Safari Lodge',
    level: 'mid',
    type: 'lodge',
    place: 'ngorongoro',
    nightlyFee: concession('ngorongoro'),
  },
  {
    slug: 'andbeyond-crater-lodge',
    name: '&Beyond Ngorongoro Crater Lodge',
    level: 'luxury',
    type: 'lodge',
    place: 'ngorongoro',
    accommodation: 'andbeyond-ngorongoro-crater-lodge',
    nightlyFee: concession('ngorongoro'),
  },

  // Serengeti
  {
    slug: 'serengeti-heritage-camp',
    name: 'Serengeti Heritage Tented Camp',
    level: 'mid',
    type: 'tented-camp',
    place: 'central-serengeti',
    nightlyFee: concession('serengeti'),
  },
  {
    slug: 'four-seasons-serengeti',
    name: 'Four Seasons Safari Lodge Serengeti',
    level: 'luxury',
    type: 'lodge',
    place: 'central-serengeti',
    accommodation: 'four-seasons-safari-lodge-serengeti',
    nightlyFee: concession('serengeti'),
  },
  {
    slug: 'ndutu-safari-lodge',
    name: 'Ndutu Safari Lodge',
    level: 'mid',
    type: 'lodge',
    place: 'ndutu',
    nightlyFee: concession('ngorongoro'),
  },
  {
    slug: 'ndutu-luxury-camp',
    name: 'Seasonal luxury camp at Ndutu',
    level: 'luxury',
    type: 'mobile-camp',
    place: 'ndutu',
    nightlyFee: concession('ngorongoro'),
  },
  {
    slug: 'northern-serengeti-mobile-camp',
    name: 'Seasonal tented camp near the Mara River',
    level: 'mid',
    type: 'mobile-camp',
    place: 'northern-serengeti',
    nightlyFee: concession('serengeti'),
  },
  {
    slug: 'northern-serengeti-luxury-camp',
    name: 'Luxury camp in the Kogatende area',
    level: 'luxury',
    type: 'tented-camp',
    place: 'northern-serengeti',
    nightlyFee: concession('serengeti'),
  },

  // Lake Natron, Usambara
  { slug: 'lake-natron-tented-camp', name: 'Lake Natron tented camp', level: 'mid', type: 'tented-camp', place: 'lake-natron' },
  { slug: 'lushoto-guesthouse', name: 'Lushoto mountain guesthouse', level: 'budget', type: 'guesthouse', place: 'lushoto' },

  // Kilimanjaro camps and huts
  {
    slug: 'mti-mkubwa-camp',
    name: 'Mti Mkubwa (Big Tree) Camp, 2,780 m',
    level: 'mountain',
    type: 'campsite',
    place: 'kilimanjaro',
    nightlyFee: camping('kilimanjaro'),
  },
  {
    slug: 'machame-camp',
    name: 'Machame Camp, 2,835 m',
    level: 'mountain',
    type: 'campsite',
    place: 'kilimanjaro',
    nightlyFee: camping('kilimanjaro'),
  },
  {
    slug: 'shira-1-camp',
    name: 'Shira 1 Camp, 3,610 m',
    level: 'mountain',
    type: 'campsite',
    place: 'kilimanjaro',
    nightlyFee: camping('kilimanjaro'),
  },
  {
    slug: 'shira-2-camp',
    name: 'Shira 2 Camp, 3,850 m',
    level: 'mountain',
    type: 'campsite',
    place: 'kilimanjaro',
    nightlyFee: camping('kilimanjaro'),
  },
  {
    slug: 'barranco-camp',
    name: 'Barranco Camp, 3,960 m',
    level: 'mountain',
    type: 'campsite',
    place: 'kilimanjaro',
    nightlyFee: camping('kilimanjaro'),
  },
  {
    slug: 'karanga-camp',
    name: 'Karanga Camp, 4,035 m',
    level: 'mountain',
    type: 'campsite',
    place: 'kilimanjaro',
    nightlyFee: camping('kilimanjaro'),
  },
  {
    slug: 'barafu-camp',
    name: 'Barafu Camp, 4,673 m',
    level: 'mountain',
    type: 'campsite',
    place: 'kilimanjaro',
    nightlyFee: camping('kilimanjaro'),
  },
  {
    slug: 'mweka-camp',
    name: 'Mweka Camp, 3,100 m',
    level: 'mountain',
    type: 'campsite',
    place: 'kilimanjaro',
    nightlyFee: camping('kilimanjaro'),
  },
  {
    slug: 'mandara-hut',
    name: 'Mandara Hut, 2,720 m',
    level: 'mountain',
    type: 'hut',
    place: 'kilimanjaro',
    nightlyFee: hut('kilimanjaro'),
  },
  {
    slug: 'horombo-hut',
    name: 'Horombo Hut, 3,720 m',
    level: 'mountain',
    type: 'hut',
    place: 'kilimanjaro',
    nightlyFee: hut('kilimanjaro'),
  },
  { slug: 'kibo-hut', name: 'Kibo Hut, 4,703 m', level: 'mountain', type: 'hut', place: 'kilimanjaro', nightlyFee: hut('kilimanjaro') },

  // Mount Meru huts
  {
    slug: 'miriakamba-hut',
    name: 'Miriakamba Hut, 2,514 m',
    level: 'mountain',
    type: 'hut',
    place: 'mount-meru',
    nightlyFee: hut('arusha-national-park'),
  },
  {
    slug: 'saddle-hut',
    name: 'Saddle Hut, 3,570 m',
    level: 'mountain',
    type: 'hut',
    place: 'mount-meru',
    nightlyFee: hut('arusha-national-park'),
  },

  // Southern parks and the coast
  { slug: 'rufiji-river-camp', name: 'Rufiji River Camp', level: 'mid', type: 'tented-camp', place: 'nyerere' },
  { slug: 'ruaha-river-camp', name: 'Ruaha riverside tented camp', level: 'luxury', type: 'tented-camp', place: 'ruaha' },
  { slug: 'emerson-spice', name: 'Emerson Spice Hotel', level: 'mid', type: 'hotel', place: 'stone-town' },
  { slug: 'zanzibar-east-beach', name: 'Breezes Beach Club', level: 'mid', type: 'beach-resort', place: 'zanzibar-east' },
  { slug: 'zanzibar-north-luxury', name: 'Zuri Zanzibar', level: 'luxury', type: 'beach-resort', place: 'zanzibar-north' },
  { slug: 'pemba-beach-lodge', name: 'Pemba beach lodge', level: 'mid', type: 'lodge', place: 'pemba' },
  { slug: 'mafia-beach-lodge', name: 'Chole Bay beach lodge', level: 'mid', type: 'lodge', place: 'mafia' },

  // Kenya
  { slug: 'nairobi-hotel', name: 'Nairobi boutique hotel', level: 'mid', type: 'hotel', place: 'nairobi' },
  { slug: 'giraffe-manor', name: 'Giraffe Manor', level: 'luxury', type: 'hotel', place: 'nairobi', accommodation: 'giraffe-manor' },
  { slug: 'tortilis-camp', name: 'Tortilis Camp', level: 'luxury', type: 'tented-camp', place: 'amboseli', accommodation: 'tortilis-camp' },
  { slug: 'lake-nakuru-lodge', name: 'Lake Nakuru lodge', level: 'mid', type: 'lodge', place: 'lake-nakuru' },
  { slug: 'mara-tented-camp', name: 'Maasai Mara tented camp', level: 'mid', type: 'tented-camp', place: 'maasai-mara' },
  { slug: 'angama-mara', name: 'Angama Mara', level: 'luxury', type: 'lodge', place: 'maasai-mara', accommodation: 'angama-mara' },
  { slug: 'saruni-samburu', name: 'Saruni Samburu', level: 'luxury', type: 'lodge', place: 'samburu', accommodation: 'saruni-samburu' },

  // Uganda and Rwanda
  { slug: 'entebbe-hotel', name: 'Entebbe lakeside hotel', level: 'mid', type: 'hotel', place: 'entebbe' },
  {
    slug: 'primate-lodge-kibale',
    name: 'Primate Lodge Kibale',
    level: 'mid',
    type: 'lodge',
    place: 'kibale',
    accommodation: 'primate-lodge-kibale',
  },
  { slug: 'bwindi-lodge', name: 'Bwindi Lodge', level: 'luxury', type: 'lodge', place: 'bwindi', accommodation: 'bwindi-lodge' },
  { slug: 'kigali-hotel', name: 'Kigali boutique hotel', level: 'mid', type: 'hotel', place: 'kigali' },
  { slug: 'bisate-lodge', name: 'Bisate Lodge', level: 'luxury', type: 'lodge', place: 'volcanoes', accommodation: 'bisate-lodge' },
  { slug: 'magashi', name: 'Magashi', level: 'luxury', type: 'tented-camp', place: 'akagera', accommodation: 'magashi' },
  {
    slug: 'nyungwe-house',
    name: 'One&Only Nyungwe House',
    level: 'luxury',
    type: 'lodge',
    place: 'nyungwe',
    accommodation: 'one-and-only-nyungwe-house',
  },
];
