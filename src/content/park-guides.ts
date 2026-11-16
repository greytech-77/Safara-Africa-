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
  whenToGo?: WhenToGo;
  wildlife?: string[];
  wildlifeNote?: string;
  activities?: { title: string; text: string; image: Img }[];
  // Things to do as a plain list, for parks without photo `activities`. From the park's own facts and highlights.
  thingsToDo?: string[];
  stayNote?: string;
};

// "When to go" on a park page (components/ui/ParkWhenToGo.tsx).
// The two season columns take their months from the park's month ratings (parks.ts `months`): Dry season = the
// "Best" months, Green season = the "Mixed" months. Write only the words here.
// TODO (content): parks with no `whenToGo` show their `bestTime` sentence instead of an intro and no "best for" notes:
//   saadani, lake-nakuru, samburu, tsavo, nairobi-national-park, bwindi, queen-elizabeth, kibale, murchison-falls,
//   lake-bunyonyi, volcanoes, akagera, nyungwe, lake-kivu.
// TODO (content): a green-season paragraph and `green.bestFor` are still needed for every park except ngorongoro
//   and lake-manyara, and `dry.bestFor` for nyerere. Add them only from checked facts.
export type SeasonNote = {
  // Defaults to "Dry season" / "Green season".
  title?: string;
  // One short line, shown in the accent colour under the months.
  bestFor?: string;
};
export type WhenToGo = {
  // One or two short paragraphs: what the green season is like, then when the best time is and why.
  intro: string[];
  dry?: SeasonNote;
  green?: SeasonNote;
};

const NORTHERN = 'Northern circuit';
const SOUTHERN = 'Southern circuit';
const WESTERN = 'Western circuit';

export const parkGuides: Record<string, ParkGuide> = {
  ngorongoro: {
    whenToGo: {
      intro: [
        'In the green season the crater turns lush and there are fewer vehicles. Expect some rain, and beautiful light for photographs.',
        'The dry season is the easiest time to see wildlife, because the grass is short. It is also when the crater is busiest, so we go down at first light. The rim is cool and misty in the early morning.',
      ],
      dry: { bestFor: 'Easy wildlife viewing on short grass' },
      green: { bestFor: 'Fewer vehicles and beautiful light for photographs' },
    },
    circuit: NORTHERN,
    tagline: 'A vast volcanic bowl, with lion, rhino and buffalo on its floor.',
    facts: [
      { label: 'Conservation area', value: 'About 8,292 km²' },
      { label: 'The crater', value: 'About 260 km², 19 km across' },
      { label: 'Crater walls', value: 'About 610 m high' },
      { label: 'World Heritage Site', value: 'Since 1979' },
    ],
    whoFor: 'First-time visitors, keen safari travellers and nature lovers.',
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
  },
  serengeti: {
    thingsToDo: [
      'A hot-air balloon flight at sunrise',
      'Game drives for big cats on the central Seronera plains',
      'River crossings in the north, July to October',
      'Calving season on the southern plains, January to March',
    ],
    whenToGo: {
      intro: [
        'The Serengeti is good all year. Its herds of wildebeest and zebra move in a year-round loop, and we place your camp where they are in the month you travel.',
        'January to March is calving season on the southern plains. July to October is the time for river crossings in the north.',
      ],
      dry: { bestFor: 'Calving on the southern plains and river crossings in the north' },
    },
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
    thingsToDo: [
      'Game drives along the Tarangire River',
      'Walking safaris in the private areas',
      'Night drives in the private areas',
      'Birdwatching, with more than 500 species',
    ],
    whenToGo: {
      intro: [
        'The best time to visit is June to October, the dry season. The Tarangire River is then the only water for miles, and it draws wildlife from across the park.',
      ],
      dry: { bestFor: 'Wildlife gathered along the Tarangire River' },
    },
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
    thingsToDo: [
      'The treetop walkway through the forest',
      'Game drives from the forest to the floodplain',
      'Flamingos and pelicans on the soda lake',
      'Cultural visits in Mto wa Mbu village',
    ],
    whenToGo: {
      intro: ['June to October is the best time for game viewing. For birdlife, come between November and June.'],
      dry: { bestFor: 'Game viewing' },
      green: { bestFor: 'Birdlife' },
    },
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
    thingsToDo: [
      'Guided walks with an armed ranger',
      'Canoeing on the Momella Lakes',
      'A walk to a waterfall',
      'Views of Mount Meru and Kilimanjaro',
    ],
    whenToGo: {
      intro: [
        'Arusha National Park is good all year. June to October is driest, and the skies are often clearest for views of Mount Meru and Kilimanjaro.',
      ],
      dry: { bestFor: 'Clear skies for mountain views' },
    },
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
    thingsToDo: ['Game drives along the Great Ruaha River', 'Walking safaris'],
    whenToGo: {
      intro: [
        'The best time to visit is June to October, the dry season. East and southern African species meet in Ruaha, and the dry season brings them to the Great Ruaha River.',
      ],
      dry: { bestFor: 'Wildlife gathered at the Great Ruaha River' },
    },
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
    thingsToDo: ['Boat safaris on the Rufiji River', 'Game drives', 'Walking safaris', 'Fly camping'],
    whenToGo: {
      intro: [
        'The best time to visit is June to October, the dry season.',
        'Some camps close from March to May, so check availability early if you plan to travel then.',
      ],
    },
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
    thingsToDo: ['Game drives on the Mkata floodplain', 'Hippo pools', 'A walk to Kinole Waterfall'],
    whenToGo: {
      intro: ['June to October is the best time to visit, with the easiest game viewing.'],
      dry: { bestFor: 'The easiest game viewing' },
    },
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
    thingsToDo: ['A visit to the black rhino sanctuary', 'Game drives on the open plains', 'Birdwatching'],
    whenToGo: {
      intro: ['June to October, the dry season, is when wildlife is easiest to see.'],
      dry: { bestFor: 'Wildlife at its easiest to see' },
    },
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
    thingsToDo: [
      'Chimpanzee tracking on foot',
      'Walks to forest waterfalls and plunge pools',
      'Snorkelling in Lake Tanganyika',
      'Time on the lake’s beaches',
    ],
    whenToGo: {
      intro: ['The best time to visit is June to October, the dry season, when the forest trails are easier to walk.'],
      dry: { bestFor: 'Easier walking on the forest trails to find chimpanzees' },
    },
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
  'maasai-mara': {
    wildlife: ['Lion', 'Leopard', 'Cheetah'],
    wildlifeNote: 'From about July to October the migration herds arrive from Tanzania and cross the Mara River.',
    thingsToDo: [
      'Game drives for lion, leopard and cheetah',
      'Mara River crossings, about July to October',
      'Hot-air balloon flights',
      'Walks and night drives in the private conservancies',
    ],
    whenToGo: {
      intro: [
        'Game viewing in the Maasai Mara is good all year.',
        'From about July to October the migration herds arrive from Tanzania and cross the Mara River.',
      ],
      dry: { bestFor: 'The migration herds and Mara River crossings' },
    },
  },
  amboseli: {
    wildlife: ['Elephant'],
    wildlifeNote: 'Amboseli is famous for its large, relaxed elephant families, studied here for decades.',
    thingsToDo: [
      'Game drives among the elephant families',
      'Views of Kilimanjaro at dawn and dusk',
      'Observation Hill over the swamps',
      'Maasai community visits',
    ],
    whenToGo: {
      intro: [
        'The best months are June to October and January to February, when the skies are clearest for the classic view of elephants beneath Kilimanjaro.',
      ],
      dry: { bestFor: 'Clear skies and views of Kilimanjaro' },
    },
  },
  saadani: {
    wildlife: ['Elephant', 'Giraffe', 'Buffalo'],
    thingsToDo: ['Game drives that end on the beach', 'Boat safaris on the Wami River', 'Time on the beach'],
  },
  'lake-nakuru': {
    wildlife: ['Black rhino', 'White rhino', 'Rothschild’s giraffe', 'Buffalo', 'Flamingo', 'Pelican'],
    wildlifeNote: 'The whole park is fenced as a rhino sanctuary. Flamingo numbers rise and fall with the lake level.',
    thingsToDo: ['Game drives for black and white rhino', 'The Baboon Cliff viewpoint'],
  },
  samburu: {
    wildlife: ['Grevy’s zebra', 'Reticulated giraffe', 'Beisa oryx', 'Gerenuk', 'Somali ostrich', 'Elephant', 'Lion', 'Leopard'],
    wildlifeNote: 'The first five are known as the Samburu Special Five.',
    thingsToDo: ['Game drives along the Ewaso Ng’iro River', 'Samburu community visits'],
  },
  tsavo: {
    wildlife: ['Elephant', 'Rhino'],
    wildlifeNote: 'Tsavo East is known for elephants coloured red by the dust, and Tsavo West has a rhino sanctuary.',
    thingsToDo: ['Mzima Springs in Tsavo West', 'Lava flows and volcanic hills', 'Easy to combine with the Kenya coast'],
  },
  'nairobi-national-park': {
    wildlife: ['Lion', 'Black rhino', 'Giraffe', 'Buffalo'],
    wildlifeNote: 'All of them graze in front of the city skyline.',
    thingsToDo: [
      'A half-day safari from Nairobi',
      'The Giraffe Centre nearby',
      'An elephant orphanage nearby',
      'The Ivory Burning Site monument',
    ],
  },
  bwindi: {
    wildlife: ['Mountain gorilla'],
    wildlifeNote:
      'Around half of the world’s mountain gorillas live here. The forest is also rich in birds, including Albertine Rift endemics, and other primates.',
    thingsToDo: ['Mountain gorilla trekking', 'Birdwatching for Albertine Rift endemics', 'Community walks around Buhoma'],
  },
  'queen-elizabeth': {
    wildlife: ['Hippo', 'Buffalo', 'Elephant', 'Lion', 'Chimpanzee', 'Waterbirds'],
    wildlifeNote: 'In the southern Ishasha sector, lions rest in fig trees.',
    thingsToDo: [
      'A boat trip on the Kazinga Channel',
      'Chimpanzee tracking in Kyambura Gorge',
      'Tree-climbing lions in Ishasha',
      'Crater lakes and salt flats',
    ],
  },
  kibale: {
    wildlife: ['Chimpanzee', 'Red colobus', 'L’Hoest’s monkey'],
    wildlifeNote: 'Kibale has a high density of primates, and nearby Bigodi Wetland is excellent for birds.',
    thingsToDo: [
      'Chimpanzee tracking',
      'The chimpanzee habituation experience',
      'A walk in Bigodi Wetland',
      'Crater lakes near Fort Portal',
    ],
  },
  'murchison-falls': {
    wildlife: ['Hippo', 'Crocodile', 'Elephant', 'Giraffe', 'Buffalo', 'Lion', 'Shoebill'],
    wildlifeNote: 'Many kinds of antelope live on the northern bank of the Nile.',
    thingsToDo: [
      'A hike to the top of the falls',
      'A boat trip on the Nile to the foot of the falls',
      'Game drives north of the river',
      'Shoebill trips in the delta',
    ],
  },
  volcanoes: {
    wildlife: ['Mountain gorilla', 'Golden monkey'],
    thingsToDo: ['Mountain gorilla trekking', 'Golden monkey tracking', 'A hike to Dian Fossey’s grave', 'Volcano and crater lake hikes'],
  },
  akagera: {
    wildlife: ['Lion', 'Rhino', 'Hippo', 'Crocodile', 'Waterbirds'],
    wildlifeNote: 'Lions were reintroduced in 2015 and rhinos in 2017, making Akagera a Big Five park.',
    thingsToDo: ['Big Five game drives', 'A boat trip on Lake Ihema', 'Night drives'],
  },
  nyungwe: {
    wildlife: ['Chimpanzee', 'Colobus monkey'],
    wildlifeNote: 'The forest is home to many other primates and hundreds of bird species.',
    thingsToDo: ['Chimpanzee tracking', 'The canopy walkway', 'Waterfall and forest trails'],
  },
  'lake-bunyonyi': {
    thingsToDo: ['Dugout canoe trips', 'Island visits', 'Swimming in the lake', 'Walks in the hills'],
  },
  'lake-kivu': {
    thingsToDo: ['Boat trips to the islands', 'Kayaking', 'Coffee farm visits', 'The Congo Nile Trail, by bike or on foot'],
  },
};

export const getParkGuide = (slug: string): ParkGuide => parkGuides[slug] ?? {};
