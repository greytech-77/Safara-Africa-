import type { Img, MonthRating } from '@/types/content';
import { unsplash } from '@/lib/unsplash';

// National parks and reserves. Each gets a page at /parks/[slug] unless `link` points elsewhere,
// and appears on its country's page in the order listed here.
// `place` must match the `place` used in tour routes so matching tours are listed (defaults to `name`).
// STARTER COPY: have the Safara team review before launch.

export type Park = {
  slug: string;
  name: string;
  place?: string;
  country: string;
  teaser: string;
  intro: string[];
  highlights: string[];
  bestTime: string;
  // January to December.
  months: MonthRating[];
  image: Img;
  link?: string;
};

// Typical seasonal patterns, January to December.
const NORTH_TZ: MonthRating[] = ['best', 'best', 'good', 'mixed', 'mixed', 'best', 'best', 'best', 'best', 'best', 'good', 'good'];
const DRY_SEASON: MonthRating[] = ['good', 'good', 'mixed', 'mixed', 'mixed', 'best', 'best', 'best', 'best', 'best', 'good', 'good'];
const MARA: MonthRating[] = ['good', 'good', 'mixed', 'mixed', 'mixed', 'good', 'best', 'best', 'best', 'best', 'good', 'good'];
const KENYA: MonthRating[] = ['best', 'best', 'good', 'mixed', 'mixed', 'best', 'best', 'best', 'best', 'best', 'good', 'good'];
const GREAT_LAKES: MonthRating[] = ['best', 'best', 'mixed', 'mixed', 'mixed', 'best', 'best', 'best', 'best', 'good', 'mixed', 'best'];

export const parks: Park[] = [
  // Tanzania
  {
    slug: 'serengeti',
    name: 'Serengeti',
    country: 'tanzania',
    teaser: 'Endless plains, big cats and the Great Migration.',
    intro: [
      'The Serengeti is Tanzania’s best-known park: open grassland running to the horizon, granite kopjes and some of the highest densities of lion, leopard and cheetah in Africa.',
      'Its herds of wildebeest and zebra move in a year-round loop. We place your camp where the action is in the month you travel, from the calving plains in the south to the Mara River in the north.',
    ],
    highlights: [
      'The Great Migration and its river crossings',
      'Big cats on the central Seronera plains',
      'Hot-air balloon flight at sunrise',
      'Calving season on the southern plains',
    ],
    bestTime: 'All year. January to March for calving in the south; July to October for river crossings in the north.',
    months: ['best', 'best', 'good', 'mixed', 'good', 'best', 'best', 'best', 'best', 'best', 'good', 'good'],
    image: unsplash('1787250230779-562abca4ddf5', 'A lone acacia tree on golden savanna under a cloudy sky'),
  },
  {
    slug: 'ngorongoro',
    name: 'Ngorongoro Crater',
    place: 'Ngorongoro',
    country: 'tanzania',
    teaser: 'A wildlife-filled volcanic crater and Maasai highlands.',
    intro: [
      'The Ngorongoro Crater is the world’s largest unbroken volcanic caldera, its floor home to lion, elephant, buffalo, hippo and one of the last black rhino populations in northern Tanzania.',
      'Lodges sit on the crater rim, so you can drive down at first light. The wider conservation area is shared with Maasai herders, and with Olduvai Gorge, one of the most important sites for human origins.',
    ],
    highlights: [
      'A full day on the crater floor',
      'Black rhino, lion and huge herds of buffalo',
      'Maasai village visits',
      'Olduvai Gorge and its museum',
    ],
    bestTime: 'All year. June to October is dry; the crater rim is cool and misty in the early morning.',
    months: NORTH_TZ,
    image: unsplash('1507088164404-020d1e905959', 'A pride of lions walking across dry grass'),
  },
  {
    slug: 'tarangire',
    name: 'Tarangire',
    country: 'tanzania',
    teaser: 'Baobab trees and some of Africa’s largest elephant herds.',
    intro: [
      'Tarangire is shaped by its river, which draws wildlife from a huge surrounding area in the dry season. Elephant herds of several hundred are a common sight.',
      'Ancient baobabs, tree-climbing pythons and excellent birdlife make it a quieter, often overlooked contrast to the Serengeti.',
    ],
    highlights: [
      'Large elephant herds along the Tarangire River',
      'Giant baobab trees',
      'Walking safaris and night drives in the private areas',
      'More than 500 bird species',
    ],
    bestTime: 'June to October, when the river is the only water for miles.',
    months: DRY_SEASON,
    image: unsplash('1728238054897-05023133fe90', 'A herd of elephants walking across a river in Tarangire'),
  },
  {
    slug: 'lake-manyara',
    name: 'Lake Manyara',
    country: 'tanzania',
    teaser: 'Groundwater forest, flamingos and the Rift Valley wall.',
    intro: [
      'Lake Manyara National Park lies at the foot of the Great Rift Valley escarpment, between Tarangire and the Ngorongoro highlands.',
      'In a few hours you pass from groundwater forest busy with baboons and blue monkeys to open floodplain with giraffe, buffalo and, when the water is right, flamingos on the lake.',
    ],
    highlights: [
      'Tree-climbing lions (sightings vary)',
      'Flamingos and pelicans on the soda lake',
      'Treetop walkway through the forest',
      'Cultural visits in Mto wa Mbu village',
    ],
    bestTime: 'June to October for game; November to June for birdlife.',
    months: NORTH_TZ,
    image: unsplash('1538209647246-bb82d2e4b372', 'Giraffes on an open grass plain'),
  },
  {
    slug: 'nyerere',
    name: 'Nyerere National Park',
    place: 'Nyerere',
    country: 'tanzania',
    teaser: 'Boat safaris on the Rufiji River and wild dog.',
    intro: [
      'Nyerere National Park was created in 2019 from the northern part of the Selous Game Reserve and is one of the largest protected areas in Africa. The Rufiji River, its lakes and channels are at the heart of the park.',
      'It is known for boat safaris among hippos and crocodiles, walking safaris and one of Africa’s most important populations of African wild dog. It is a short flight from Dar es Salaam or Zanzibar.',
    ],
    highlights: [
      'Boat safaris on the Rufiji River',
      'African wild dog, lion and elephant',
      'Walking safaris and fly camping',
      'Easy fly-in from Zanzibar',
    ],
    bestTime: 'June to October, the dry season. Some camps close from March to May.',
    months: DRY_SEASON,
    image: unsplash('1673283961733-244a7879ac2d', 'A large group of hippos in a river'),
  },
  {
    slug: 'mikumi',
    name: 'Mikumi National Park',
    place: 'Mikumi',
    country: 'tanzania',
    teaser: 'Open plains within easy reach of Dar es Salaam.',
    intro: [
      'Mikumi lies on the main road west of Dar es Salaam and borders Nyerere to the south. Its central Mkata floodplain is open grassland often compared to the Serengeti.',
      'Elephant, giraffe, zebra, buffalo and lion are seen on short drives, making it a good choice for a short safari from Dar es Salaam or Zanzibar, or as a stop on the way to Ruaha.',
    ],
    highlights: ['Open plains of the Mkata floodplain', 'Elephant, giraffe and lion', 'Hippo pools', 'Short safaris from Dar es Salaam'],
    bestTime: 'June to October for the easiest game viewing.',
    months: DRY_SEASON,
    image: unsplash('1783531800856-8d3e3f819fac', 'Safari vehicle at the entrance of Mikumi National Park'),
  },
  {
    slug: 'ruaha',
    name: 'Ruaha',
    country: 'tanzania',
    teaser: 'Wild, remote and big on predators in southern Tanzania.',
    intro: [
      'Ruaha is one of Tanzania’s largest national parks and one of its least visited. A handful of small camps share a landscape of baobabs, rocky hills and the Great Ruaha River.',
      'It is known for lion prides, wild dog and large elephant numbers, and is easy to reach by light aircraft or as a short add-on from Zanzibar or Dar es Salaam.',
    ],
    highlights: [
      'Large lion prides and African wild dog',
      'Few vehicles at sightings',
      'Walking safaris',
      'Fly-in camps along the Great Ruaha River',
    ],
    bestTime: 'June to October, the dry season, when wildlife gathers at the river.',
    months: DRY_SEASON,
    image: unsplash('1737284274116-3b7c77905343', 'An elephant standing in long grass'),
  },
  {
    slug: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    country: 'tanzania',
    teaser: 'Africa’s highest mountain, 5,895 m.',
    intro: [],
    highlights: [],
    bestTime: '',
    months: NORTH_TZ,
    image: unsplash('1489392191049-fc10c97e64b6', 'Snow-capped Kilimanjaro above the clouds'),
    link: '/trekking/kilimanjaro',
  },
  {
    slug: 'saadani',
    name: 'Saadani National Park',
    place: 'Saadani',
    country: 'tanzania',
    teaser: 'Where the bush meets the Indian Ocean beach.',
    intro: [
      'Saadani is Tanzania’s only national park on the coast, where savanna and mangroves run down to the beaches of the Indian Ocean, north of Dar es Salaam and opposite Zanzibar.',
      'Game viewing is quieter than in the big northern parks, but you can combine game drives with boat trips on the Wami River and time on the beach, all in one stay.',
    ],
    highlights: [
      'Game drives that end on the beach',
      'Boat safaris on the Wami River',
      'Elephant, giraffe and buffalo',
      'Short hop from Zanzibar',
    ],
    bestTime: 'June to October and January to February, outside the main rains.',
    months: ['best', 'best', 'good', 'mixed', 'mixed', 'good', 'best', 'best', 'best', 'best', 'good', 'good'],
    image: unsplash('1665449831038-ba84c387a711', 'A beach with palm trees and a hut'),
  },
  {
    slug: 'arusha-national-park',
    name: 'Arusha National Park',
    place: 'Arusha National Park',
    country: 'tanzania',
    teaser: 'Walking safaris and canoeing beneath Mount Meru.',
    intro: [
      'Arusha National Park sits about 50 km from Arusha, so it is an easy first or last day of a trip. Mount Meru rises above it, and on a clear day you can see Kilimanjaro as well.',
      'There are few predators here, which means you can leave the vehicle and walk with an armed ranger. You can also canoe on the Momella Lakes and walk to a waterfall.',
    ],
    highlights: [
      'Guided walks among giraffe and buffalo',
      'Canoeing on the Momella Lakes',
      'A waterfall walk',
      'Views of Meru and Kilimanjaro',
    ],
    bestTime: 'All year. June to October is driest, and the skies are often clearest for mountain views.',
    months: NORTH_TZ,
    image: unsplash('1673667618122-359046273a77', 'A tall mountain peak seen across the plains'),
  },
  {
    slug: 'lake-natron',
    name: 'Lake Natron',
    country: 'tanzania',
    teaser: 'A red soda lake, flamingos and a sacred volcano.',
    intro: [],
    highlights: [],
    bestTime: '',
    months: DRY_SEASON,
    image: unsplash('1494500764479-0c8f2919a3d8', 'A tree standing in shallow water with mountains behind'),
    link: '/trekking/ol-doinyo-lengai',
  },
  {
    slug: 'mkomazi',
    name: 'Mkomazi National Park',
    place: 'Mkomazi',
    country: 'tanzania',
    teaser: 'A quiet park with rhino, oryx and Kilimanjaro views.',
    intro: [
      'Few travellers reach Mkomazi, in the north-east of Tanzania. It shares a wildlife route with Kenya’s Tsavo, and Kilimanjaro stands on the horizon on a clear day.',
      'The park has recovered well from heavy poaching in the past. Black rhino live in a protected sanctuary, and elephant, wild dog and oryx are all here. Big cats are present but harder to find.',
    ],
    highlights: ['A black rhino sanctuary', 'Oryx and elephant on open plains', 'Rewarding birdlife', 'Very few other vehicles'],
    bestTime: 'June to October, the dry season, when wildlife is easiest to see.',
    months: DRY_SEASON,
    image: unsplash('1635595358293-03620e36be48', 'A herd of zebra on a dry grass field'),
  },
  {
    slug: 'mahale',
    name: 'Mahale Mountains',
    place: 'Mahale',
    country: 'tanzania',
    teaser: 'Wild chimpanzees above the beaches of Lake Tanganyika.',
    intro: [
      'Mahale is far out in western Tanzania, where forested mountains drop to the beaches of Lake Tanganyika. You arrive by small plane and then by boat, and very few people make the trip.',
      'There are no roads in the park, so you explore on foot. You walk through the forest to find chimpanzees, past waterfalls and plunge pools, and you can snorkel in the lake.',
    ],
    highlights: [
      'Chimpanzee tracking on foot',
      'Beaches on Lake Tanganyika',
      'Forest waterfalls and plunge pools',
      'Snorkelling in the lake',
    ],
    bestTime: 'June to October, the dry season, when forest trails are easier to walk.',
    months: DRY_SEASON,
    image: unsplash('1742328114761-18b9304e0c95', 'A chimpanzee sitting on a tree branch in the forest'),
  },

  // Kenya
  {
    slug: 'maasai-mara',
    name: 'Maasai Mara',
    country: 'kenya',
    teaser: 'Big cats and the migration river crossings.',
    intro: [
      'The Maasai Mara National Reserve is the Kenyan part of the Serengeti ecosystem. Its rolling grassland, riverine forest and the Mara and Talek rivers support some of the highest predator numbers in Africa.',
      'From about July to October the migration herds arrive from Tanzania and cross the Mara River. Around the reserve, private conservancies limit vehicle numbers and allow walks and night drives.',
    ],
    highlights: [
      'Mara River crossings, about July to October',
      'Lion, leopard and cheetah all year',
      'Hot-air balloon flights',
      'Private conservancies with fewer vehicles',
    ],
    bestTime: 'July to October for the migration; good game viewing all year.',
    months: MARA,
    image: unsplash('1518459384564-ecfd8e80721f', 'A herd of wildebeest running across dry savanna with safari vehicles'),
  },
  {
    slug: 'amboseli',
    name: 'Amboseli',
    country: 'kenya',
    teaser: 'Elephants with Kilimanjaro behind them.',
    intro: [
      'Amboseli National Park lies at the foot of Kilimanjaro, just across the border in Kenya. Swamps fed by the mountain’s snowmelt keep the park green even in the dry season.',
      'It is famous for its large, relaxed elephant families, studied here for decades, and for the classic view of elephants walking beneath the snow-capped summit.',
    ],
    highlights: [
      'Elephant families at close range',
      'Views of Kilimanjaro at dawn and dusk',
      'Observation Hill over the swamps',
      'Maasai community visits',
    ],
    bestTime: 'June to October and January to February, when skies are clearest.',
    months: KENYA,
    image: unsplash('1489392191049-fc10c97e64b6', 'Snow-capped Kilimanjaro above the clouds'),
  },
  {
    slug: 'lake-nakuru',
    name: 'Lake Nakuru',
    country: 'kenya',
    teaser: 'A rhino sanctuary around a Rift Valley lake.',
    intro: [
      'Lake Nakuru National Park surrounds a soda lake on the floor of the Rift Valley. The whole park is fenced as a sanctuary for black and white rhino.',
      'Flamingo numbers rise and fall with the lake level, but the park reliably offers rhino, Rothschild’s giraffe, buffalo and woodland birds, and makes a good stop between Nairobi and the Mara.',
    ],
    highlights: [
      'Black and white rhino',
      'Rothschild’s giraffe',
      'Flamingos and pelicans (vary with water levels)',
      'Baboon Cliff viewpoint',
    ],
    bestTime: 'June to March; good all year.',
    months: KENYA,
    image: unsplash('1710136678658-a12caee832a7', 'A group of flamingos wading in water'),
  },
  {
    slug: 'samburu',
    name: 'Samburu',
    country: 'kenya',
    teaser: 'Northern species and the Ewaso Ng’iro River.',
    intro: [
      'Samburu National Reserve lies in Kenya’s dry north, along the Ewaso Ng’iro River. The landscape of doum palms, red earth and rocky hills feels very different from the south.',
      'It is home to the “Samburu Special Five”: Grevy’s zebra, reticulated giraffe, Beisa oryx, gerenuk and Somali ostrich, along with elephant, lion and leopard along the river.',
    ],
    highlights: ['The Samburu Special Five', 'Elephants along the Ewaso Ng’iro', 'Leopard sightings', 'Samburu community visits'],
    bestTime: 'June to October and January to February.',
    months: KENYA,
    image: unsplash('1702498257321-6b5907efcda5', 'A giraffe standing in a field with trees behind'),
  },
  {
    slug: 'tsavo',
    name: 'Tsavo',
    country: 'kenya',
    teaser: 'Vast wilderness and elephants dusted red.',
    intro: [
      'Tsavo East and Tsavo West together form one of the largest protected areas in Africa, between Nairobi and the coast. Their size means you can drive for hours without seeing another vehicle.',
      'Tsavo East is known for elephants coloured red by the dust, and Tsavo West for volcanic landscapes, the Mzima Springs and rhino sanctuary.',
    ],
    highlights: ['Red-dust elephants', 'Mzima Springs', 'Lava flows and volcanic hills', 'Easy combination with the Kenya coast'],
    bestTime: 'June to October and January to February.',
    months: KENYA,
    image: unsplash('1643735240112-adf0c4f45d31', 'An elephant standing in a grassy field'),
  },
  {
    slug: 'nairobi-national-park',
    name: 'Nairobi National Park',
    place: 'Nairobi',
    country: 'kenya',
    teaser: 'Wildlife within sight of the city skyline.',
    intro: [
      'Nairobi National Park lies just outside the capital, with lion, rhino, giraffe and buffalo grazing in front of the city skyline.',
      'It is ideal for a half-day safari on arrival or before an evening flight, and pairs well with visits to the Giraffe Centre and an elephant orphanage nearby.',
    ],
    highlights: ['Black rhino close to the city', 'Half-day safaris from Nairobi', 'Giraffe Centre nearby', 'Ivory Burning Site monument'],
    bestTime: 'All year; driest from June to October and January to February.',
    months: KENYA,
    image: unsplash('1635595358293-03620e36be48', 'A herd of zebra on a dry grass field'),
  },

  // Uganda
  {
    slug: 'bwindi',
    name: 'Bwindi Impenetrable',
    place: 'Bwindi',
    country: 'uganda',
    teaser: 'Home to around half of all mountain gorillas.',
    intro: [
      'Bwindi Impenetrable National Park protects steep, ancient rainforest in south-western Uganda and is home to around half of the world’s mountain gorillas.',
      'Gorilla families are trekked from four sectors, Buhoma, Ruhija, Rushaga and Nkuringo, so we match the sector to your lodge and fitness. The forest is also rich in birds and other primates.',
    ],
    highlights: [
      'Mountain gorilla trekking',
      'Four trekking sectors',
      'Forest birds, including Albertine Rift endemics',
      'Community walks around Buhoma',
    ],
    bestTime: 'June to September and December to February, the drier months.',
    months: GREAT_LAKES,
    image: unsplash('1653645800971-b46f2322da3c', 'A group of people walking through a green forest'),
  },
  {
    slug: 'queen-elizabeth',
    name: 'Queen Elizabeth',
    country: 'uganda',
    teaser: 'Kazinga Channel boat trips and tree-climbing lions.',
    intro: [
      'Queen Elizabeth National Park stretches between Lakes Edward and George, with savanna, crater lakes and forest beneath the Rwenzori Mountains.',
      'A boat trip on the Kazinga Channel passes hippos, buffalo, elephants and waterbirds, and the southern Ishasha sector is known for lions that rest in fig trees.',
    ],
    highlights: [
      'Kazinga Channel boat trip',
      'Tree-climbing lions in Ishasha',
      'Chimpanzees in Kyambura Gorge',
      'Crater lakes and salt flats',
    ],
    bestTime: 'June to September and December to February.',
    months: GREAT_LAKES,
    image: unsplash('1664760536094-d236cb75e506', 'A hippo in tall grass'),
  },
  {
    slug: 'kibale',
    name: 'Kibale Forest',
    place: 'Kibale',
    country: 'uganda',
    teaser: 'Chimpanzee tracking and many other primates.',
    intro: [
      'Kibale National Park is one of the best places in Africa to track chimpanzees, with habituated communities and a high density of primates, including red colobus and L’Hoest’s monkeys.',
      'Tracking takes a few hours in the forest, and a longer habituation experience lets you spend more time with the chimps. Nearby Bigodi Wetland is excellent for birds and primates on foot.',
    ],
    highlights: ['Chimpanzee tracking', 'Chimpanzee habituation experience', 'Bigodi Wetland walk', 'Crater lakes near Fort Portal'],
    bestTime: 'June to September and December to February.',
    months: GREAT_LAKES,
    image: unsplash('1782664467973-7d3c93f8c47e', 'A chimpanzee resting on a tree branch'),
  },
  {
    slug: 'murchison-falls',
    name: 'Murchison Falls',
    country: 'uganda',
    teaser: 'The Nile forces through a narrow gorge.',
    intro: [
      'Murchison Falls National Park is Uganda’s largest park, where the Victoria Nile squeezes through a gap in the rock only a few metres wide before plunging down to Lake Albert.',
      'Boat trips run upstream to the foot of the falls past hippos, crocodiles and elephants, and the northern bank offers game drives with giraffe, buffalo, lion and many antelope.',
    ],
    highlights: ['Hike to the top of the falls', 'Boat trip on the Nile', 'Game drives north of the river', 'Shoebill trips in the delta'],
    bestTime: 'December to February and June to September.',
    months: GREAT_LAKES,
    image: unsplash('1671360788724-100050645e10', 'A river with a waterfall'),
  },
  {
    slug: 'lake-bunyonyi',
    name: 'Lake Bunyonyi',
    country: 'uganda',
    teaser: 'Terraced hills, islands and canoe trips.',
    intro: [
      'Lake Bunyonyi lies in the hills of south-western Uganda, close to Bwindi. Its calm water is dotted with small islands and surrounded by terraced farms.',
      'It is a peaceful place to rest after gorilla trekking, with canoe trips, island visits and walks, and it is free of crocodiles and hippos, so swimming is popular.',
    ],
    highlights: ['Dugout canoe trips', 'Island visits', 'Swimming in the lake', 'Rest days after gorilla trekking'],
    bestTime: 'All year; driest from June to September and December to February.',
    months: GREAT_LAKES,
    image: unsplash('1551357141-f73a8402ceb3', 'Aerial view of hills and trees'),
  },

  // Rwanda
  {
    slug: 'volcanoes',
    name: 'Volcanoes National Park',
    place: 'Volcanoes',
    country: 'rwanda',
    teaser: 'Mountain gorillas and golden monkeys.',
    intro: [
      'Volcanoes National Park covers the Rwandan side of the Virunga volcanoes, where Dian Fossey studied mountain gorillas. It is about three hours by road from Kigali.',
      'Treks start at Kinigi and climb through farmland, bamboo and forest to habituated gorilla families. Golden monkey tracking and hikes to Dian Fossey’s grave or crater lakes add more to a stay.',
    ],
    highlights: ['Mountain gorilla trekking', 'Golden monkey tracking', 'Hike to Dian Fossey’s grave', 'Volcano and crater lake hikes'],
    bestTime: 'June to September and December to February, the drier months.',
    months: GREAT_LAKES,
    image: unsplash('1773975006646-04184f1eb137', 'A gorilla mother carrying her baby through green foliage'),
  },
  {
    slug: 'akagera',
    name: 'Akagera',
    country: 'rwanda',
    teaser: 'Savanna, lakes and the Big Five.',
    intro: [
      'Akagera National Park in eastern Rwanda is a landscape of savanna, woodland, lakes and papyrus swamps. Lions were reintroduced in 2015 and rhinos in 2017, making it a Big Five park.',
      'Game drives, boat trips on Lake Ihema and night drives make it a good contrast to gorilla trekking, and it is about two to three hours from Kigali.',
    ],
    highlights: ['Big Five game drives', 'Boat trip on Lake Ihema', 'Night drives', 'Hippos, crocodiles and waterbirds'],
    bestTime: 'June to September for the driest weather.',
    months: GREAT_LAKES,
    image: unsplash('1664793484534-497c51a08efb', 'A group of zebras in a grassy field'),
  },
  {
    slug: 'nyungwe',
    name: 'Nyungwe Forest',
    place: 'Nyungwe',
    country: 'rwanda',
    teaser: 'Chimpanzees and a canopy walkway.',
    intro: [
      'Nyungwe National Park in south-western Rwanda protects one of the oldest montane rainforests in Africa, with chimpanzees, many other primates and hundreds of bird species.',
      'A canopy walkway hangs high above the forest, and trails lead to waterfalls and viewpoints. Chimpanzee tracking starts early in the morning.',
    ],
    highlights: ['Chimpanzee tracking', 'Canopy walkway', 'Colobus monkeys', 'Waterfall and forest trails'],
    bestTime: 'June to September and December to February.',
    months: GREAT_LAKES,
    image: unsplash('1489640818597-89b1edc97db5', 'A road beside a forest'),
  },
  {
    slug: 'lake-kivu',
    name: 'Lake Kivu',
    country: 'rwanda',
    teaser: 'Beaches, boat trips and relaxed lakeside towns.',
    intro: [
      'Lake Kivu runs along Rwanda’s western border, with lakeside towns such as Rubavu (Gisenyi), Karongi (Kibuye) and Rusizi.',
      'It is a relaxed place to rest between treks, with boat trips to islands, kayaking, coffee farm visits and the Congo Nile Trail for cyclists and walkers.',
    ],
    highlights: ['Boat trips and kayaking', 'Coffee farm visits', 'Congo Nile Trail', 'Sunsets over the lake'],
    bestTime: 'All year; driest from June to September.',
    months: GREAT_LAKES,
    image: unsplash('1697947864867-3e1ec7c4f9f1', 'A large lake surrounded by trees'),
  },
];

export const getPark = (slug: string) => parks.find((p) => p.slug === slug && !p.link);
export const parkHref = (p: Park) => p.link ?? `/parks/${p.slug}`;
