import type { Img } from '@/types/content';
import { unsplash } from '@/lib/unsplash';

// Extra detail for a park's page and its card in the home showcase. Every field is optional:
// a section appears on /parks/[slug] only when it has content.
// STARTER COPY: facts are from public travel guides, in our own words. Have the Safara team check them, and the
// distances, before launch. Photos are Unsplash placeholders reused from elsewhere on the site.

export type ParkGuide = {
  circuit?: string;
  tagline?: string;
  facts?: { label: string; value: string }[];
  whoFor?: string;
  seasons?: { name: string; months: string; text: string }[];
  wildlife?: string[];
  wildlifeNote?: string;
  activities?: { title: string; text: string; image: Img }[];
  stayNote?: string;
  // Road travel times, because published distances vary.
  drives?: { from: string; time: string }[];
};

const NORTHERN = 'Northern circuit';
const SOUTHERN = 'Southern circuit';
const WESTERN = 'Western circuit';

export const parkGuides: Record<string, ParkGuide> = {
  ngorongoro: {
    circuit: NORTHERN,
    tagline: 'A vast volcanic bowl, with lion, rhino and buffalo on its floor.',
    facts: [
      { label: 'Conservation area', value: 'About 8,292 km²' },
      { label: 'The crater', value: 'About 260 km², 19 km across' },
      { label: 'Crater walls', value: 'About 610 m high' },
      { label: 'World Heritage Site', value: 'Since 1979' },
    ],
    whoFor: 'First-time visitors, keen safari travellers and nature lovers.',
    seasons: [
      {
        name: 'Dry season',
        months: 'June to October, December to February',
        text: 'Short grass makes wildlife easy to see. This is also when the crater is busiest, so we go down at first light.',
      },
      {
        name: 'Green season',
        months: 'March to May, November',
        text: 'The crater turns lush and there are fewer vehicles. Expect some rain, and beautiful light for photographs.',
      },
    ],
    wildlife: [
      'Lion',
      'Black rhino',
      'Buffalo',
      'Elephant',
      'Hippo',
      'Spotted hyena',
      'Zebra',
      'Wildebeest',
      'Grant’s and Thomson’s gazelle',
      'Eland',
      'Serval',
      'Flamingo',
      'Crowned crane',
    ],
    wildlifeNote: 'Giraffe stay out of the crater, as the walls are too steep for them. Leopard and cheetah are harder to find here.',
    activities: [
      {
        title: 'Game drive on the crater floor',
        text: 'Drive down at first light through grassland, swamp and the shores of Lake Magadi.',
        image: unsplash('1710077539513-6d0b9cf273e2', 'A group of people on the back of a safari vehicle'),
      },
      {
        title: 'Walk on the crater rim',
        text: 'Walk with an armed ranger through the highland forest, with the crater far below.',
        image: unsplash('1642670022167-3df5e498cd8d', 'A view of a mountain with trees in the foreground'),
      },
      {
        title: 'Coffee farms around Karatu',
        text: 'Spend a slow afternoon in the green highlands and see how the coffee is grown.',
        image: unsplash('1777310569880-e20082e2c8ea', 'Rolling green hills with scattered trees'),
      },
      {
        title: 'Olduvai Gorge',
        text: 'Visit one of the world’s most important sites for human origins, and its small museum.',
        image: unsplash('1787250230779-562abca4ddf5', 'A lone acacia tree on golden savanna under a cloudy sky'),
      },
      {
        title: 'Meet the Maasai',
        text: 'More than 40,000 Maasai live in the conservation area, alongside their cattle and the wildlife.',
        image: unsplash('1776772838972-ee89adb85561', 'Three men in traditional Maasai clothing'),
      },
    ],
    stayNote:
      'Nobody sleeps on the crater floor. A few lodges and one campsite sit on the rim. Many travellers stay in the Karatu highlands, about an hour’s drive away.',
    drives: [
      { from: 'Arusha', time: 'About 3 hours' },
      { from: 'Tarangire', time: 'About 2.5 hours' },
      { from: 'Serengeti (Naabi Gate)', time: 'About 3 hours' },
    ],
  },
  serengeti: {
    circuit: NORTHERN,
    tagline: 'Open plains, big cats and about 1.5 million wildebeest on the move.',
    facts: [
      { label: 'The migration', value: 'About 1.5 million wildebeest' },
      { label: 'Status', value: 'World Heritage Site' },
      { label: 'Landscape', value: 'Grassland, kopjes and rivers' },
      { label: 'Wildlife', value: 'Good all year' },
    ],
    whoFor: 'First-time visitors, keen safari travellers and families.',
    wildlife: ['Lion', 'Leopard', 'Cheetah', 'Elephant', 'Buffalo', 'Wildebeest', 'Zebra', 'Hippo', 'Giraffe'],
    stayNote:
      'You can choose from simple camps through to high-end lodges, so we match your stay to your budget and to the month you travel.',
  },
  tarangire: {
    circuit: NORTHERN,
    tagline: 'Elephant paths lead through the baobabs to the river.',
    facts: [
      { label: 'Known for', value: 'Elephant herds and baobabs' },
      { label: 'Birdlife', value: 'More than 500 species' },
      { label: 'Best season', value: 'June to October' },
    ],
    whoFor: 'First-time visitors, keen safari travellers and families.',
    wildlife: ['Elephant', 'Lion', 'Leopard', 'Buffalo', 'Giraffe', 'Zebra'],
    wildlifeNote: 'In the dry season the Tarangire River draws animals from across the park.',
  },
  'lake-manyara': {
    circuit: NORTHERN,
    tagline: 'A small park of forest and soda lake, below the Rift Valley wall.',
    facts: [
      { label: 'Known for', value: 'Forest shore and seasonal flamingos' },
      { label: 'Lake', value: 'Alkaline, in the Rift Valley' },
      { label: 'Best for wildlife', value: 'The dry season' },
    ],
    whoFor: 'First-time visitors, families and nature lovers.',
    wildlife: ['Buffalo', 'Flamingo', 'Lion', 'Elephant', 'Hippo'],
    wildlifeNote: 'Lions live here but can be hard to spot.',
  },
  'arusha-national-park': {
    circuit: NORTHERN,
    tagline: 'A day on foot and by canoe, close to town.',
    facts: [
      { label: 'From Arusha', value: 'About 50 km' },
      { label: 'Birdlife', value: 'About 400 species' },
      { label: 'Try', value: 'Walking and canoeing' },
    ],
    whoFor: 'Nature lovers, active travellers and first-time visitors.',
    wildlife: ['Giraffe', 'Buffalo', 'Zebra', 'Warthog', 'Waterbuck', 'Hippo'],
  },
  ruaha: {
    circuit: SOUTHERN,
    tagline: 'Elephants under the baobabs, and few other visitors.',
    facts: [
      { label: 'Plant life', value: 'About 1,650 species' },
      { label: 'Known for', value: 'Predators along the river' },
      { label: 'Best season', value: 'June to October' },
    ],
    whoFor: 'Keen safari travellers, photographers and anyone seeking quiet.',
    wildlife: ['Elephant', 'Lion', 'Leopard', 'Buffalo', 'Giraffe'],
    wildlifeNote: 'East and southern African species meet here, and the dry season brings them to the Ruaha River.',
  },
  nyerere: {
    circuit: SOUTHERN,
    tagline: 'Game drives, boat safaris and walks in one great wilderness.',
    facts: [
      { label: 'Status', value: 'World Heritage Site (Selous)' },
      { label: 'Try', value: 'Drives, boats and walks' },
      { label: 'Visitors', value: 'Fewer than in the north' },
    ],
    whoFor: 'Keen safari travellers, return visitors and photographers.',
    wildlife: ['Elephant', 'Buffalo', 'Hippo', 'Lion', 'Wild dog'],
    wildlifeNote: 'Wild dog and black rhino are rare, so a sighting is a real privilege.',
  },
  mikumi: {
    circuit: SOUTHERN,
    tagline: 'Open plains and big herds within reach of Dar es Salaam.',
    facts: [
      { label: 'From Dar es Salaam', value: 'About 218 km' },
      { label: 'The Big Five', value: 'Four of the five, no rhino' },
      { label: 'Try', value: 'A walk to Kinole Waterfall' },
    ],
    whoFor: 'Keen safari travellers, first-time visitors and return visitors.',
    wildlife: ['Elephant', 'Buffalo', 'Lion', 'Leopard', 'Wild dog'],
    wildlifeNote: 'Lion and leopard keep to the riverbanks. Wild dog are rare.',
  },
  mkomazi: {
    circuit: NORTHERN,
    tagline: 'A quiet comeback story, with Kilimanjaro on the horizon.',
    facts: [
      { label: 'Known for', value: 'Black rhino sanctuary' },
      { label: 'Wildlife route', value: 'Shared with Kenya’s Tsavo' },
      { label: 'Visitors', value: 'Very few' },
    ],
    whoFor: 'Nature lovers, birders and anyone seeking quiet.',
    wildlife: ['Black rhino', 'Elephant', 'Wild dog', 'Oryx', 'Lion', 'Leopard', 'Cheetah', 'Hyena'],
  },
  mahale: {
    circuit: WESTERN,
    tagline: 'Chimpanzees in the forest, and a beach at the end of the walk.',
    facts: [
      { label: 'Getting there', value: 'Small plane, then boat' },
      { label: 'In the park', value: 'On foot only' },
      { label: 'Known for', value: 'Wild chimpanzees' },
    ],
    whoFor: 'Adventurous travellers, return visitors and outdoor lovers.',
    wildlife: ['Chimpanzee'],
  },
};

export const getParkGuide = (slug: string): ParkGuide => parkGuides[slug] ?? {};
