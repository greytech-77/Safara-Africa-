import type { Img } from '@/types/content';
import { unsplash } from '@/lib/unsplash';

// Mountains: the Trekking menu, /trekking and /trekking/[slug].
// Tours appear on a page when their `tags` include the trek's slug.
// STARTER COPY: have the Safara team review before launch.

export type Trek = {
  slug: string;
  name: string;
  teaser: string;
  description: string;
  intro: string[];
  facts: { altitude: string; duration: string; difficulty: string; bestMonths: string; start: string };
  routes: { name: string; days: string; text: string }[];
  pack: string[];
  // Optional journal article to link from the packing list.
  guide?: { title: string; href: string };
  faqs: { q: string; a: string }[];
  image: Img;
};

const basePack = ['Broken-in walking boots', 'Layers: base layer, fleece and waterproof jacket', 'Sun hat, sunglasses and sunscreen', 'Refillable water bottles (2–3 litres)', 'Head torch with spare batteries', 'Personal first-aid kit and any medication'];

export const treks: Trek[] = [
  {
    slug: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    teaser: 'Africa’s highest summit, 5,895 m.',
    description: 'Climb Mount Kilimanjaro (5,895 m) with experienced local crews. Compare the Machame, Lemosho, Marangu, Rongai and Northern Circuit routes and the best months to go.',
    intro: [
      'At 5,895 metres, Kilimanjaro is the highest mountain in Africa and the tallest free-standing mountain in the world. You do not need climbing skills to reach the summit, Uhuru Peak, but you do need time: the biggest challenge is altitude, not the walking.',
      'Every route passes through five climate zones, from farmland and rainforest to heath, alpine desert and the glaciers near the top. Routes of seven days or more give your body time to acclimatise by climbing high during the day and sleeping lower, which makes a real difference to how you feel and to your chance of reaching the summit. We work with licensed guides trained in first aid, a cook and porters who are fairly paid and properly equipped, and we run daily health checks on the mountain. The driest months are January to early March and June to October.',
    ],
    facts: { altitude: '5,895 m (Uhuru Peak)', duration: '5–9 days on the mountain', difficulty: 'Challenging (non-technical, high altitude)', bestMonths: 'January to early March, June to October', start: 'Moshi or Arusha, near Kilimanjaro International Airport' },
    routes: [
      { name: 'Machame', days: '7 days', text: 'The most popular route, with varied scenery and good acclimatisation. Busy in peak season.' },
      { name: 'Lemosho', days: '8 days', text: 'Starts in the remote west and is quiet for the first days. Our choice for the best chance of the summit.' },
      { name: 'Marangu', days: '5–6 days', text: 'The only route with huts instead of tents. Shorter, so allow the extra day.' },
      { name: 'Rongai', days: '6–7 days', text: 'Approaches from the north. Drier and quieter, a good choice in the rainy months.' },
      { name: 'Northern Circuit', days: '8–9 days', text: 'The longest route, circling the north side. Excellent acclimatisation and very few people.' },
    ],
    pack: [...basePack, 'Warm sleeping bag (rated to about −10 °C)', 'Down jacket, warm gloves and hat for summit night', 'Trekking poles'],
    guide: { title: 'Choosing a Kilimanjaro route', href: '/journal/choosing-a-kilimanjaro-route' },
    faqs: [
      { q: 'Do I need climbing experience?', a: 'No. Kilimanjaro is a trek, not a technical climb. You should be in good health and comfortable walking for six to eight hours a day.' },
      { q: 'How many days should I choose?', a: 'At least seven days on the mountain. Longer routes give more time to acclimatise and have higher summit success.' },
      { q: 'What about altitude sickness?', a: 'Mild symptoms such as headache are common. Guides check your health twice a day, and anyone with serious symptoms descends. Speak to your doctor about medication before travelling.' },
      { q: 'How much should I tip the crew?', a: 'Tips are an important part of crew income. We send current guidelines for guides, cooks and porters when you book.' },
      { q: 'Is there a minimum age?', a: 'The park’s minimum age for the summit is 10 years.' },
    ],
    image: unsplash('1489392191049-fc10c97e64b6', 'Snow-capped Kilimanjaro rising above the clouds'),
  },
  {
    slug: 'mount-meru',
    name: 'Mount Meru',
    teaser: 'Tanzania’s second summit, 4,566 m, in Arusha National Park.',
    description: 'Trek Mount Meru (4,566 m) in Arusha National Park: a 3–4 day hut trek with wildlife on the lower slopes, ideal for acclimatising before Kilimanjaro.',
    intro: [
      'Mount Meru rises to 4,566 metres above the town of Arusha and is Tanzania’s second-highest mountain. It is quieter than Kilimanjaro, has comfortable mountain huts, and is often climbed as acclimatisation before a Kilimanjaro trek.',
      'The trek starts at Momella Gate in Arusha National Park, and because buffalo, giraffe and other wildlife live on the lower slopes, every group walks with an armed park ranger. The path climbs through forest to Miriakamba Hut and on to Saddle Hut, with a short side climb to Little Meru. Summit night follows a narrow, exposed ridge on the rim of the collapsed crater, with the ash cone below and sunrise views across to Kilimanjaro. It is steeper than it looks, but well within reach for fit walkers.',
    ],
    facts: { altitude: '4,566 m (Socialist Peak)', duration: '3–4 days', difficulty: 'Moderate to challenging (steep summit ridge)', bestMonths: 'June to October, December to February', start: 'Momella Gate, Arusha National Park' },
    routes: [
      { name: 'Momella Route, 4 days', days: '4 days', text: 'The standard trek, with nights at Miriakamba and Saddle huts and time to acclimatise.' },
      { name: 'Momella Route, 3 days', days: '3 days', text: 'A faster version for fit walkers who are already acclimatised.' },
      { name: 'Meru and Kilimanjaro', days: '11–13 days', text: 'Climb Meru first to acclimatise, rest a day, then start your Kilimanjaro climb.' },
    ],
    pack: [...basePack, 'Light sleeping bag for the huts', 'Warm layers for summit night'],
    faqs: [
      { q: 'Why does a ranger walk with us?', a: 'Arusha National Park has buffalo, elephant and other wildlife on the lower slopes, so park rules require an armed ranger with every group.' },
      { q: 'Is Meru harder than Kilimanjaro?', a: 'Meru is lower and shorter, but the summit ridge is steep and exposed. Most walkers find it a good, demanding preparation for Kilimanjaro.' },
      { q: 'Where do we sleep?', a: 'In simple shared mountain huts with bunk beds. Your crew cooks all meals.' },
      { q: 'Can I combine Meru and Kilimanjaro?', a: 'Yes. Climbing Meru first is one of the best ways to acclimatise. We usually add a rest day between the two.' },
    ],
    image: unsplash('1673667618122-359046273a77', 'A tall mountain peak seen across the plains'),
  },
  {
    slug: 'ol-doinyo-lengai',
    name: 'Ol Doinyo Lengai',
    teaser: 'A night climb of an active volcano above Lake Natron.',
    description: 'Climb Ol Doinyo Lengai (about 2,960 m), the active "Mountain of God" above Lake Natron: a steep night climb to the crater rim for sunrise.',
    intro: [
      'Ol Doinyo Lengai, the Maasai “Mountain of God”, is an active volcano that rises steeply above Lake Natron in northern Tanzania. At about 2,960 metres it is much lower than Kilimanjaro, but it is one of the toughest climbs in the country.',
      'Climbs start around midnight to avoid the heat and take five to seven hours on steep slopes of loose ash and rock, reaching the crater rim around sunrise. Lengai is known for its rare natrocarbonatite lava, which can appear black and turn white as it cools. Coming down is often harder than going up, so good boots and poles are essential. Most climbers base themselves at Lake Natron for two nights, which also allows time to walk to the Engare Sero waterfall and see the flamingos that gather on the lake. Climbs may be closed during periods of eruption.',
    ],
    facts: { altitude: 'About 2,960 m', duration: '1 night climb (5–7 hours up), 2–3 days with Lake Natron', difficulty: 'Difficult (very steep, loose ground)', bestMonths: 'June to October (dry season)', start: 'Engare Sero, Lake Natron' },
    routes: [
      { name: 'Sunrise summit climb', days: '1 night', text: 'The standard climb, starting around midnight and reaching the crater rim at dawn.' },
      { name: 'Lengai and Lake Natron', days: '3 days', text: 'Two nights at Lake Natron with the climb, the waterfall walk and the flamingos.' },
      { name: 'Lengai with a safari', days: '5–8 days', text: 'Continue from Natron to the Serengeti through the remote northern route.' },
    ],
    pack: [...basePack, 'Trekking poles (essential for the descent)', 'Gaiters for loose ash', 'Gloves to protect your hands on the rock'],
    faqs: [
      { q: 'How fit do I need to be?', a: 'Very. The climb is short but extremely steep, on loose ground, at night. It suits experienced hikers in good health.' },
      { q: 'Is the volcano safe to climb?', a: 'Local guides follow its activity closely, and climbs are stopped when it is erupting. We confirm conditions before you go.' },
      { q: 'Why climb at night?', a: 'To avoid the strong heat on the black slopes and to reach the rim for sunrise.' },
      { q: 'What else is there at Lake Natron?', a: 'A walk up the Engare Sero gorge to a waterfall, flamingos on the lake, and visits to Maasai communities.' },
    ],
    image: unsplash('1494500764479-0c8f2919a3d8', 'A tree standing in shallow water with mountains behind'),
  },
  {
    slug: 'usambara',
    name: 'Usambara Mountains',
    teaser: 'Gentle village walks in cool, green hills around Lushoto.',
    description: 'Walk the Usambara Mountains: gentle village-to-village hikes from Lushoto with viewpoints, farms, forest and cultural visits.',
    intro: [
      'The Usambara Mountains in north-eastern Tanzania are a world away from the dry savanna: cool, green hills, terraced farms, forest and small villages linked by footpaths. They are ideal for gentle walking and for meeting people in their daily lives.',
      'Most walks start in Lushoto, a small former colonial hill town. Day hikes lead to the Irente Viewpoint, with views down to the Maasai Steppe far below, and into Magamba Forest, where black-and-white colobus monkeys live. Longer walks follow paths from village to village, staying in simple guesthouses and visiting farms, markets and schools along the way. Walks are led by local guides and are suitable for most ages and fitness levels. The Usambaras are a good break between a safari and the coast, as they lie on the road towards Tanga and Dar es Salaam.',
    ],
    facts: { altitude: 'About 1,400 m in Lushoto, higher on the ridges', duration: '1–6 days', difficulty: 'Easy to moderate', bestMonths: 'June to October, December to February', start: 'Lushoto' },
    routes: [
      { name: 'Irente Viewpoint', days: '1 day', text: 'A half- or full-day walk through farms to the cliff-edge viewpoint.' },
      { name: 'Magamba Forest', days: '1 day', text: 'Forest trails, colobus monkeys and old German-era sites.' },
      { name: 'Village to village', days: '3–6 days', text: 'A multi-day walk staying in local guesthouses, for example towards Mtae.' },
    ],
    pack: ['Comfortable walking shoes', 'Rain jacket (showers are possible all year)', 'Warm layer for the evenings', 'Sun hat and sunscreen', 'Refillable water bottle'],
    faqs: [
      { q: 'Is it suitable for children?', a: 'Yes. Walks can be kept short, and the villages and farms are interesting for all ages.' },
      { q: 'Where do we stay?', a: 'In lodges in Lushoto and in simple, clean guesthouses on multi-day walks.' },
      { q: 'How do we get there?', a: 'By road, about five to six hours from Arusha or Moshi, or about six hours from Dar es Salaam.' },
      { q: 'Does it rain?', a: 'Showers are possible at any time of year, and the main rains fall from March to May.' },
    ],
    image: unsplash('1642670022167-3df5e498cd8d', 'A view of a mountain with trees in the foreground'),
  },
];

export const getTrek = (slug: string) => treks.find((t) => t.slug === slug);
