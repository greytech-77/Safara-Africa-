import type { Img } from '@/types/content';
import { unsplash } from '@/lib/unsplash';
import { countries } from '@/content/countries';

// Lodges and camps: /accommodations/[slug], listed on their country and park pages.
// STARTER COPY: confirm these are properties you book, check room types and amenities with each lodge,
// and replace the placeholder photos with images you have permission to use.
// Real photos so far are in public/images/lodges/, each with its licence credit in `image.credit`.

export type Accommodation = {
  slug: string;
  name: string;
  country: string;
  // Slug in content/parks.ts.
  park: string;
  area: string;
  teaser: string;
  overview: string[];
  rooms: { name: string; text: string }[];
  activities: string[];
  amenities: string[];
  image: Img;
  // Photos of this lodge for the "Unwind and relax" showcase on its page, shown with the main image first.
  // Only real photos of this property, licensed or supplied by the lodge (a trade/media library), each with
  // its `credit` if the licence needs one. With none, the rooms show as text.
  gallery?: Img[];
};

// A Wikimedia Commons photo of a lodge by Richard Mortel (CC BY 2.0), saved in public/images/lodges/.
const mortel = (name: string, alt: string, file: string): Img => ({
  src: `/images/lodges/${name}.jpg`,
  alt,
  credit: { author: 'Richard Mortel', licence: 'CC BY 2.0', source: `https://commons.wikimedia.org/wiki/File:${file}` },
});

const lodge = unsplash('1779218449605-792bf0bef5e0', 'Open-air lodge lounge under a thatched roof');
const tent = unsplash('1588445599591-efe468e9c3ce', 'A white tent on open ground below a mountain');

export const accommodations: Accommodation[] = [
  // Tanzania
  {
    slug: 'four-seasons-safari-lodge-serengeti',
    name: 'Four Seasons Safari Lodge Serengeti',
    country: 'tanzania',
    park: 'serengeti',
    area: 'Central Serengeti',
    teaser: 'A large lodge with a pool overlooking a busy waterhole.',
    overview: [
      'Four Seasons Safari Lodge sits in the heart of the central Serengeti, with rooms and walkways raised on stilts above the bush. Its infinity pool looks out over a waterhole where elephants and other wildlife come to drink.',
      'It suits travellers who want full hotel comfort on safari, families who need space and facilities, and anyone who wants to be close to the Seronera area’s year-round wildlife.',
    ],
    rooms: [
      { name: 'Rooms', text: 'Spacious rooms with a private balcony looking over the plains.' },
      { name: 'Suites', text: 'Extra living space for longer stays and families.' },
      { name: 'Villas', text: 'Private villas with their own plunge pool and outdoor deck.' },
    ],
    activities: [
      'Game drives in the central Serengeti',
      'Hot-air balloon flights (seasonal)',
      'Discovery centre talks',
      'Maasai cultural visits',
    ],
    amenities: ['Infinity pool overlooking a waterhole', 'Spa and fitness room', 'Several restaurants and bars', 'Kids’ programme'],
    image: lodge,
  },
  {
    slug: 'andbeyond-ngorongoro-crater-lodge',
    name: '&Beyond Ngorongoro Crater Lodge',
    country: 'tanzania',
    park: 'ngorongoro',
    area: 'Ngorongoro Crater rim',
    teaser: 'Ornate suites on the rim with views into the crater.',
    overview: [
      'Ngorongoro Crater Lodge is perched on the rim of the crater, with views straight down onto the crater floor. The lodge is divided into three small camps, each with its own lounge and dining area.',
      'Its richly decorated suites make it one of the most famous lodges in Africa, and its position means an early start for the first drive into the crater.',
    ],
    rooms: [
      { name: 'Crater-view suites', text: 'Ornate suites with fireplaces, large bathrooms and views into the crater.' },
      { name: 'Three camps', text: 'North, South and Tree Camp, each with its own living areas and butlers.' },
    ],
    activities: ['Full or half-day crater drives', 'Guided walks on the crater rim', 'Maasai village visits', 'Olduvai Gorge excursions'],
    amenities: ['Butler service', 'Fireplaces in every suite', 'All meals and drinks included', 'Crater-rim views'],
    image: lodge,
  },
  {
    slug: 'tarangire-treetops',
    name: 'Tarangire Treetops',
    country: 'tanzania',
    park: 'tarangire',
    area: 'Near Tarangire',
    teaser: 'Elevated treehouse rooms built around baobab and marula trees.',
    overview: [
      'Tarangire Treetops lies in a private conservation area bordering Tarangire National Park. Its rooms are treehouses raised among baobab and marula trees, with wide decks overlooking the bush.',
      'Being outside the park means activities not allowed inside it, such as walking safaris and night drives, while the park’s elephant herds are a short drive away.',
    ],
    rooms: [{ name: 'Treehouses', text: 'Large elevated rooms with private decks set among the trees.' }],
    activities: [
      'Game drives in Tarangire National Park',
      'Walking safaris',
      'Night drives in the conservation area',
      'Maasai community visits',
    ],
    amenities: ['Swimming pool', 'Raised treehouse decks', 'Lounge and dining area overlooking the bush', 'Sundowner spots'],
    image: {
      src: '/images/lodges/tarangire-treetops.jpg',
      alt: 'A raised tented room with a thatched roof beside a giant baobab tree',
      credit: {
        author: 'Richard Mortel',
        licence: 'CC BY 2.0',
        source: 'https://commons.wikimedia.org/wiki/File:Tarangire_Treetops_Lodge_(28715784605).jpg',
      },
    },
    gallery: [
      mortel(
        'tarangire-treetops-grounds',
        'The lodge grounds above the bush, with an elephant at the waterhole',
        'Elephant_visitor_at_Tarangire_Treetops_(3)_(28645903276).jpg',
      ),
      mortel(
        'tarangire-treetops-sunset',
        'The sun setting over distant hills, seen from the lodge',
        'Sunset_at_Tarangire_Treetops_Lodge_(2)_(28610165222).jpg',
      ),
      mortel(
        'tarangire-treetops-elephant',
        'An elephant drinking at the lodge waterhole',
        'Elephant_visitor_at_Tarangire_Treetops_(2)_(28060955354).jpg',
      ),
      mortel(
        'tarangire-treetops-twilight',
        'Twilight over the bush from the lodge',
        'Twilight_at_Tarangire_Treetops_Lodge_(2)_(28098124754).jpg',
      ),
      mortel(
        'tarangire-treetops-dusk-elephant',
        'An elephant feeding beside the lodge at dusk',
        'Elephant_visitor_at_dusk_at_Tarangire_Treetops_Lodge_(2)_(28646864626).jpg',
      ),
    ],
  },
  {
    slug: 'gibbs-farm',
    name: 'Gibb’s Farm',
    country: 'tanzania',
    park: 'ngorongoro',
    area: 'Ngorongoro highlands',
    teaser: 'Cottages on a working coffee farm near Karatu.',
    overview: [
      'Gibb’s Farm is a working coffee farm in the green highlands near Karatu, on the edge of the forest that leads up to the Ngorongoro Crater rim.',
      'Its cottages, gardens and farm-to-table food make it a calm base between Tarangire, the crater and the Serengeti, with walks and farm activities between game drives.',
    ],
    rooms: [
      { name: 'Farm cottages', text: 'Cottages set in gardens with views over the coffee farm and forest.' },
      { name: 'Family cottages', text: 'Larger cottages with space for families.' },
    ],
    activities: [
      'Day trips into the Ngorongoro Crater',
      'Coffee farm tours',
      'Forest walks to waterfalls and caves',
      'Village and craft visits',
    ],
    amenities: ['Farm-to-table restaurant', 'Spa', 'Gardens', 'Organic vegetable farm'],
    image: lodge,
  },

  // Kenya
  {
    slug: 'angama-mara',
    name: 'Angama Mara',
    country: 'kenya',
    park: 'maasai-mara',
    area: 'Maasai Mara',
    teaser: 'Suites on the Oloololo escarpment with views over the Mara.',
    overview: [
      'Angama Mara sits high on the Oloololo escarpment on the western edge of the Maasai Mara, with sweeping views over the plains below.',
      'The lodge is split into two small camps of glass-fronted tented suites. Game drives head down the escarpment into the Mara Triangle, close to the river crossings in season.',
    ],
    rooms: [{ name: 'Tented suites', text: 'Glass-fronted suites facing the plains, in two separate camps.' }],
    activities: [
      'Game drives in the Mara Triangle',
      'Hot-air balloon flights',
      'Photography studio and guided photo safaris',
      'Picnics on the plains',
    ],
    amenities: ['Escarpment-top views', 'Swimming pool', 'Shop and photo studio', 'Full board'],
    image: tent,
  },
  {
    slug: 'tortilis-camp',
    name: 'Tortilis Camp',
    country: 'kenya',
    park: 'amboseli',
    area: 'Amboseli',
    teaser: 'A tented camp facing Kilimanjaro in a private conservancy.',
    overview: [
      'Tortilis Camp is named after the umbrella thorn acacias that surround it, in a private conservancy next to Amboseli National Park, with views of Kilimanjaro.',
      'Being in a conservancy allows walking safaris and night drives as well as game drives in the park itself.',
    ],
    rooms: [
      { name: 'Tented rooms', text: 'Canvas rooms with private verandas and views towards Kilimanjaro.' },
      { name: 'Family tents', text: 'Larger tents for families.' },
    ],
    activities: ['Game drives in Amboseli', 'Walking safaris', 'Night drives in the conservancy', 'Maasai community visits'],
    amenities: ['Swimming pool', 'Kilimanjaro views', 'Kitchen garden', 'Full board'],
    image: tent,
  },
  {
    slug: 'giraffe-manor',
    name: 'Giraffe Manor',
    country: 'kenya',
    park: 'nairobi-national-park',
    area: 'Nairobi',
    teaser: 'A historic manor where giraffes visit at breakfast.',
    overview: [
      'Giraffe Manor is a 1930s manor house in Nairobi’s leafy Langata suburb, set in land shared with a herd of Rothschild’s giraffes.',
      'The giraffes put their heads through the windows at breakfast and in the late afternoon. It is popular, so it needs to be booked well in advance.',
    ],
    rooms: [
      { name: 'Manor rooms', text: 'Individually decorated rooms in the main house.' },
      { name: 'Garden Manor rooms', text: 'Rooms in a second house in the grounds.' },
    ],
    activities: [
      'Breakfast with the giraffes',
      'Visit to the Giraffe Centre',
      'Elephant orphanage visit',
      'Nairobi National Park half-day safari',
    ],
    amenities: ['Historic manor house', 'Gardens', 'All meals included', 'Close to Nairobi airports'],
    image: {
      src: '/images/lodges/giraffe-manor.jpg',
      alt: 'A giraffe looking in through an arched window of the dining room',
      credit: {
        author: 'Jason Zhao',
        licence: 'Unsplash License',
        source: 'https://unsplash.com/photos/giraffe-on-window-during-daytime-UwrdquEfJd4',
      },
    },
  },
  {
    slug: 'saruni-samburu',
    name: 'Saruni Samburu',
    country: 'kenya',
    park: 'samburu',
    area: 'Samburu',
    teaser: 'Villas on a hillside in the Kalama Conservancy.',
    overview: [
      'Saruni Samburu is built into a rocky hillside in the Kalama Conservancy, next to the Samburu National Reserve, with long views across northern Kenya.',
      'Its open-fronted villas, conservancy activities and Samburu guides make it a good base for the northern species and culture of the region.',
    ],
    rooms: [
      { name: 'Villas', text: 'Open-fronted villas with views over the conservancy.' },
      { name: 'Villas with plunge pool', text: 'Some villas have their own pool.' },
    ],
    activities: ['Game drives in Kalama and Samburu', 'Walking safaris with Samburu guides', 'Night drives', 'Cultural visits'],
    amenities: ['Rock pool', 'Spa treatments', 'Hillside views', 'Full board'],
    image: lodge,
  },

  // Uganda
  {
    slug: 'clouds-mountain-gorilla-lodge',
    name: 'Clouds Mountain Gorilla Lodge',
    country: 'uganda',
    park: 'bwindi',
    area: 'Bwindi (Nkuringo)',
    teaser: 'Stone cottages high on a ridge above the forest.',
    overview: [
      'Clouds Mountain Gorilla Lodge stands high on a ridge in the Nkuringo area of Bwindi, with views over the forest and towards the Virunga volcanoes.',
      'Its stone cottages each have a fireplace and a personal butler, and it is a short drive from the trailheads for gorilla trekking in the southern sectors.',
    ],
    rooms: [
      { name: 'Cottages', text: 'Stone cottages with fireplaces and views over the forest.' },
      { name: 'Family cottages', text: 'Larger cottages with two bedrooms.' },
    ],
    activities: ['Gorilla trekking', 'Community walks', 'Forest and ridge hikes', 'Birdwatching'],
    amenities: ['Butler service', 'Fireplaces', 'Massage treatments', 'Full board'],
    image: lodge,
  },
  {
    slug: 'bwindi-lodge',
    name: 'Bwindi Lodge',
    country: 'uganda',
    park: 'bwindi',
    area: 'Bwindi (Buhoma)',
    teaser: 'Bandas looking straight into the forest.',
    overview: [
      'Bwindi Lodge is in the Buhoma sector, on the edge of Bwindi Impenetrable National Park. Its bandas face the forest, which starts just beyond the lodge.',
      'Gorilla treks from Buhoma start a short walk away, and the lodge supports community projects in the area.',
    ],
    rooms: [{ name: 'Bandas', text: 'Private cottages with verandas facing the forest.' }],
    activities: ['Gorilla trekking from Buhoma', 'Village and community walks', 'Forest waterfall hikes', 'Birdwatching'],
    amenities: ['Forest views', 'Lounge and bar', 'Short walk to the trekking start', 'Full board'],
    image: {
      src: '/images/lodges/bwindi-lodge.jpg',
      alt: 'Thatched cottages among tall trees on a forested hillside',
      credit: {
        author: 'Esme Stewart',
        licence: 'CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:2-Bwindi_Lodge-DJI_0771.jpg',
      },
    },
  },
  {
    slug: 'kyambura-gorge-lodge',
    name: 'Kyambura Gorge Lodge',
    country: 'uganda',
    park: 'queen-elizabeth',
    area: 'Queen Elizabeth',
    teaser: 'A converted coffee store on the edge of Kyambura Gorge.',
    overview: [
      'Kyambura Gorge Lodge is built around a restored coffee store on a hillside overlooking Queen Elizabeth National Park and the forested Kyambura Gorge.',
      'It is well placed for chimpanzee tracking in the gorge, boat trips on the Kazinga Channel and game drives in the park.',
    ],
    rooms: [{ name: 'Bandas', text: 'Private cottages with views over the savanna.' }],
    activities: ['Chimpanzee tracking in Kyambura Gorge', 'Kazinga Channel boat trip', 'Game drives', 'Community coffee project visit'],
    amenities: ['Swimming pool', 'Savanna views', 'Lounge and bar', 'Full board'],
    image: {
      src: '/images/lodges/kyambura-gorge-lodge.jpg',
      alt: 'A round thatched lodge building among trees, with hills at sunrise behind',
      credit: {
        author: 'Esme Stewart',
        licence: 'CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:1-Kyambura_Gorge_Lodge-HDR_0002-4.jpg',
      },
    },
  },
  {
    slug: 'primate-lodge-kibale',
    name: 'Primate Lodge Kibale',
    country: 'uganda',
    park: 'kibale',
    area: 'Kibale Forest',
    teaser: 'Cottages and tents inside the forest, close to chimp tracking.',
    overview: [
      'Primate Lodge is inside Kibale National Park, a short walk from the starting point for chimpanzee tracking.',
      'Staying in the forest means the sounds of primates and birds around you, and an easy early start for the chimps.',
    ],
    rooms: [
      { name: 'Cottages', text: 'Forest cottages with private verandas.' },
      { name: 'Safari tents', text: 'Simpler tents for a closer feel of the forest.' },
      { name: 'Treehouse', text: 'A raised treehouse overlooking a forest clearing.' },
    ],
    activities: ['Chimpanzee tracking and habituation', 'Night forest walks', 'Bigodi Wetland walk', 'Crater lakes excursions'],
    amenities: ['Forest location', 'Restaurant and bar', 'Short walk to the tracking start', 'Full board'],
    image: tent,
  },

  // Rwanda
  {
    slug: 'bisate-lodge',
    name: 'Bisate Lodge',
    country: 'rwanda',
    park: 'volcanoes',
    area: 'Volcanoes National Park',
    teaser: 'Forest villas on the slopes of an eroded volcanic cone.',
    overview: [
      'Bisate Lodge sits in the amphitheatre of an eroded volcanic cone next to Volcanoes National Park, with views of the Virunga volcanoes.',
      'The lodge runs a reforestation programme on its land, and guests can plant trees during their stay. It is close to the park headquarters at Kinigi.',
    ],
    rooms: [{ name: 'Forest villas', text: 'Villas with fireplaces and views of the volcanoes.' }],
    activities: ['Gorilla trekking', 'Golden monkey tracking', 'Tree planting', 'Village visits'],
    amenities: ['Fireplaces', 'Volcano views', 'Lounge and dining area', 'Full board'],
    image: lodge,
  },
  {
    slug: 'one-and-only-gorillas-nest',
    name: 'One&Only Gorilla’s Nest',
    country: 'rwanda',
    park: 'volcanoes',
    area: 'Volcanoes National Park',
    teaser: 'Rooms set among eucalyptus trees near the park.',
    overview: [
      'One&Only Gorilla’s Nest is set in a eucalyptus forest close to Volcanoes National Park, with rooms raised among the trees.',
      'It combines resort facilities with easy access to gorilla and golden monkey treks.',
    ],
    rooms: [
      { name: 'Rooms and suites', text: 'Treetop-style rooms with fireplaces and decks.' },
      { name: 'Villa', text: 'A larger villa for families or small groups.' },
    ],
    activities: ['Gorilla trekking', 'Golden monkey tracking', 'Volcano hikes', 'Cultural visits'],
    amenities: ['Spa', 'Restaurants and bar', 'Fireplaces', 'Close to the park headquarters'],
    image: lodge,
  },
  {
    slug: 'magashi',
    name: 'Magashi',
    country: 'rwanda',
    park: 'akagera',
    area: 'Akagera',
    teaser: 'A tented camp on the shore of Lake Rwanyakazinga.',
    overview: [
      'Magashi is a small tented camp in the north of Akagera National Park, on the shore of Lake Rwanyakazinga, in an area with exclusive traversing rights.',
      'It is the most comfortable way to see Akagera’s Big Five, with game drives, boat trips and night drives from camp.',
    ],
    rooms: [{ name: 'Tents', text: 'Large tents with views over the lake.' }],
    activities: ['Game drives', 'Boat trips on Lake Rwanyakazinga', 'Night drives', 'Fishing'],
    amenities: ['Lakeside location', 'Small, private camp', 'Exclusive area of the park', 'Full board'],
    image: tent,
  },
  {
    slug: 'one-and-only-nyungwe-house',
    name: 'One&Only Nyungwe House',
    country: 'rwanda',
    park: 'nyungwe',
    area: 'Nyungwe Forest',
    teaser: 'Rooms on a tea plantation at the edge of the forest.',
    overview: [
      'One&Only Nyungwe House sits on the Gisakura tea estate, right on the edge of Nyungwe Forest.',
      'It is an easy base for chimpanzee tracking, the canopy walkway and forest hikes, with tea plantation walks on the doorstep.',
    ],
    rooms: [{ name: 'Rooms and suites', text: 'Rooms facing the forest or the tea plantation.' }],
    activities: ['Chimpanzee tracking', 'Canopy walkway', 'Tea plantation walks', 'Forest hikes'],
    amenities: ['Spa', 'Restaurant', 'Tea plantation setting', 'Forest views'],
    image: lodge,
  },
];

export const getAccommodation = (slug: string) => accommodations.find((a) => a.slug === slug);

// Tiles for the lodge grid (home page and /accommodations), and the countries that have at least one lodge.
export const lodgeTiles = accommodations.map((a) => ({
  slug: a.slug,
  name: a.name,
  area: a.area,
  country: a.country,
  countryName: countries.find((c) => c.slug === a.country)?.name ?? '',
  image: a.image,
}));
export const lodgeCountries = countries
  .filter((c) => accommodations.some((a) => a.country === c.slug))
  .map((c) => ({ slug: c.slug, name: c.name }));
