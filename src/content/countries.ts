import type { Img } from '@/lib/content';
import { unsplash } from './unsplash';

// Countries: the Destinations menu, /destinations and /destinations/[slug].
// Tours appear on a country page when their `country` matches the slug; parks and lodges come from
// content/parks.ts and content/accommodations.ts.
// STARTER COPY: have the Safara team review before launch.

export type Month = { text: string; tags: string[] };

export type Country = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  overview: string[];
  experiences: { title: string; text: string }[];
  // January to December.
  months: Month[];
  faqs: { q: string; a: string }[];
  image: Img;
};


export const countries: Country[] = [
  {
    slug: 'tanzania',
    name: 'Tanzania',
    tagline: 'The Serengeti, Ngorongoro, Kilimanjaro and Zanzibar in one country.',
    description: 'Tanzania safaris from our Arusha base: the Serengeti, Ngorongoro Crater, Tarangire, Nyerere and Ruaha, Kilimanjaro climbs and Zanzibar beaches, with a month-by-month guide.',
    overview: [
      'Tanzania is our home and, for many travellers, the finest safari country in Africa. Around a third of its land is protected, including the Serengeti, where the Great Migration spends most of the year, and the Ngorongoro Crater, a volcanic caldera filled with wildlife.',
      'The northern circuit, starting from Arusha, links Tarangire, Lake Manyara, Ngorongoro and the Serengeti and can be explored by road in a week. The southern parks, Nyerere and Ruaha, are wilder and quieter, and best reached by light aircraft. Beyond the parks, Tanzania offers Kilimanjaro, Africa’s highest mountain, and the islands of Zanzibar, Pemba and Mafia on the Indian Ocean. That variety makes it easy to combine safari, trekking and beach in a single trip, all planned by our team on the ground in Arusha.',
    ],
    experiences: [
      { title: 'Great Migration', text: 'Calving in Ndutu or river crossings in the north.' },
      { title: 'Hot-air balloon', text: 'Sunrise flight over the Serengeti plains.' },
      { title: 'Kilimanjaro climb', text: 'Walk to the Roof of Africa.' },
      { title: 'Cultural visits', text: 'Maasai, Hadzabe and Datoga communities.' },
      { title: 'Walking safaris', text: 'On foot with an armed ranger in Tarangire or Ruaha.' },
      { title: 'Zanzibar', text: 'Stone Town and white-sand beaches.' },
    ],
    months: [
      { text: 'A short dry spell between the rains. The herds gather on the southern Serengeti plains and calving begins.', tags: ['Calving Season', 'Green Season', 'Birdwatching'] },
      { text: 'Peak calving in Ndutu and the southern Serengeti, with predators very active. Good weather for Kilimanjaro.', tags: ['Calving Season', 'Big Cats', 'Kilimanjaro'] },
      { text: 'Herds still in the south. The long rains usually start late in the month, and prices begin to drop.', tags: ['Calving Season', 'Low Season'] },
      { text: 'The long rains. Some camps close, but the parks are green, quiet and good value.', tags: ['Low Season', 'Green Season', 'Birdwatching'] },
      { text: 'The rains ease and the herds move north and west through the central Serengeti.', tags: ['Low Season', 'Migration on the Move'] },
      { text: 'The dry season begins. Herds cross the Grumeti River in the Western Corridor.', tags: ['Dry Season', 'Migration', 'Big Five'] },
      { text: 'Peak season. The herds reach the northern Serengeti and the Mara River crossings begin.', tags: ['Dry Season', 'River Crossings', 'Peak Season'] },
      { text: 'River crossings in the north and excellent game viewing everywhere. Book early.', tags: ['Dry Season', 'River Crossings', 'Peak Season'] },
      { text: 'Crossings continue, and dry-season concentrations of elephant in Tarangire and Ruaha.', tags: ['Dry Season', 'River Crossings', 'Big Five'] },
      { text: 'The end of the dry season. Herds in the far north, fewer visitors and great southern safaris.', tags: ['Dry Season', 'Shoulder Season'] },
      { text: 'The short rains. The herds head south again, and migratory birds arrive.', tags: ['Short Rains', 'Birdwatching', 'Shoulder Season'] },
      { text: 'The herds return to the southern plains. Green landscapes and a busy festive season.', tags: ['Green Season', 'Festive Season'] },
    ],
    faqs: [
      { q: 'When is the best time to visit Tanzania?', a: 'June to October is the dry season and the easiest time for game viewing. January to March is calving season in the southern Serengeti. The long rains fall from late March to May.' },
      { q: 'Do I need a visa?', a: 'Most visitors need a visa, which can usually be applied for online through the official e-visa portal. Check the current rules for your nationality before booking.' },
      { q: 'Is Tanzania safe for travellers?', a: 'Tanzania is a popular and welcoming destination. On safari you are always with a guide, and we follow up-to-date travel advice. Take normal precautions in towns.' },
      { q: 'Do I need vaccinations or malaria tablets?', a: 'Malaria is present in most areas below about 1,800 m. A yellow fever certificate is required if you arrive from a country with yellow fever risk. Speak to a travel clinic.' },
      { q: 'Can I combine Tanzania with other countries?', a: 'Yes. Kenya is easy to add by road or air, and Rwanda and Uganda are a short flight away for gorilla trekking.' },
    ],
    image: unsplash('1580145575237-75fec2a0320b', 'A large herd of wildebeest grazing on grassy plains with safari vehicles nearby'),
  },
  {
    slug: 'kenya',
    name: 'Kenya',
    tagline: 'The Maasai Mara, Amboseli and Samburu: the home of the classic safari.',
    description: 'Kenya safaris: the Maasai Mara, Amboseli, Samburu, Lake Nakuru and Tsavo, private conservancies and a month-by-month guide to the best time to go.',
    overview: [
      'Kenya is where the classic safari began, and it still offers some of the best wildlife viewing in Africa. The Maasai Mara is the Kenyan part of the Serengeti ecosystem and hosts the Great Migration from about July to October, when the herds cross the Mara River.',
      'Beyond the Mara, Amboseli is famous for its elephants walking beneath Kilimanjaro, Samburu in the north has species found nowhere further south, and Lake Nakuru protects black and white rhino. Kenya also pioneered private conservancies, where landowners and camps limit vehicle numbers and allow night drives, walking and off-road viewing. Nairobi is a major flight hub with good connections to the rest of the world, and Kenya combines easily with Tanzania for a two-country safari, or with the beaches of Diani or Zanzibar. We plan Kenya trips with trusted local partners and our own team’s knowledge of the region.',
    ],
    experiences: [
      { title: 'Migration in the Mara', text: 'River crossings from about July to October.' },
      { title: 'Private conservancies', text: 'Fewer vehicles, night drives and walks.' },
      { title: 'Hot-air balloon', text: 'Sunrise flight over the Maasai Mara.' },
      { title: 'Giraffe Centre', text: 'Meet Rothschild’s giraffes in Nairobi.' },
      { title: 'Samburu culture', text: 'Visits with Samburu communities in the north.' },
      { title: 'Beach extension', text: 'Diani Beach or a short flight to Zanzibar.' },
    ],
    months: [
      { text: 'Hot and dry, with good game viewing across the country and clear views of Kilimanjaro from Amboseli.', tags: ['Dry Season', 'Big Five'] },
      { text: 'Still dry and warm. A quieter month in the Mara, with resident predators active.', tags: ['Dry Season', 'Big Cats'] },
      { text: 'A transition month. The long rains usually begin late in March.', tags: ['Shoulder Season'] },
      { text: 'The long rains. Lush landscapes, fewer visitors and lower prices.', tags: ['Low Season', 'Green Season'] },
      { text: 'Rains continue early in the month, then ease. Many camps offer good value.', tags: ['Low Season', 'Green Season', 'Birdwatching'] },
      { text: 'The dry season begins. Good game viewing before the busy migration months.', tags: ['Dry Season'] },
      { text: 'The herds usually arrive in the Mara, and river crossings begin.', tags: ['Migration', 'River Crossings', 'Peak Season'] },
      { text: 'Peak migration season in the Mara. Book camps well ahead.', tags: ['Migration', 'River Crossings', 'Peak Season'] },
      { text: 'Crossings continue, with dry conditions and excellent viewing.', tags: ['Migration', 'River Crossings', 'Dry Season'] },
      { text: 'The herds start heading back south late in the month. Still excellent game viewing.', tags: ['Dry Season', 'Shoulder Season'] },
      { text: 'The short rains. Green landscapes, migratory birds and fewer people.', tags: ['Short Rains', 'Birdwatching'] },
      { text: 'Green and warm, with good game viewing and a busy festive season.', tags: ['Green Season', 'Festive Season'] },
    ],
    faqs: [
      { q: 'When is the best time to visit Kenya?', a: 'July to October for the migration in the Maasai Mara, and January to February for dry, warm weather. April and May are the long rains.' },
      { q: 'Do I need a visa?', a: 'Kenya uses an online Electronic Travel Authorisation (eTA) for most visitors. Check the current rules before travelling.' },
      { q: 'Can I combine Kenya and Tanzania?', a: 'Yes. It is easy to cross between the two by road or air, and many trips combine the Mara with the Serengeti.' },
      { q: 'What is a conservancy?', a: 'Private land next to a national reserve, leased from local communities. Camps limit vehicle numbers and can offer night drives and walks.' },
      { q: 'Is Kenya good for families?', a: 'Yes. Short flights, family-friendly camps and the Nairobi wildlife attractions make it a good choice for children.' },
    ],
    image: unsplash('1709402606682-400133d92ab2', 'Safari vehicle with passengers watching a lion'),
  },
  {
    slug: 'uganda',
    name: 'Uganda',
    tagline: 'Mountain gorillas, chimpanzees and the source of the Nile.',
    description: 'Uganda safaris: gorilla trekking in Bwindi, chimpanzees in Kibale, Queen Elizabeth and Murchison Falls national parks, and the best time to visit.',
    overview: [
      'Uganda is the place for primates. Bwindi Impenetrable National Park is home to around half of the world’s mountain gorillas, and Kibale Forest has one of the highest densities of primates in Africa, including habituated chimpanzee communities you can track on foot.',
      'The country also has classic savanna. Queen Elizabeth National Park is known for boat trips on the Kazinga Channel, with hippos, buffalo and elephants along the banks, and for the tree-climbing lions of the Ishasha sector. Murchison Falls National Park is where the Nile forces its way through a narrow gorge, with game drives and boat trips below the falls. Between the parks are green hills, tea plantations and crater lakes such as Lake Bunyonyi. Uganda is easy to combine with a Tanzania or Kenya safari, adding gorillas and chimpanzees to a trip focused on the plains.',
    ],
    experiences: [
      { title: 'Gorilla trekking', text: 'One hour with a mountain gorilla family in Bwindi.' },
      { title: 'Chimpanzee tracking', text: 'Follow habituated chimps in Kibale Forest.' },
      { title: 'Kazinga Channel', text: 'Boat trip past hippos, buffalo and elephants.' },
      { title: 'Murchison Falls', text: 'Boat trip to the foot of the falls.' },
      { title: 'Lake Bunyonyi', text: 'Rest days by a calm, island-dotted lake.' },
      { title: 'Community visits', text: 'Villages and projects around Bwindi.' },
    ],
    months: [
      { text: 'Dry and warm. A good month for gorilla trekking, with firmer trails.', tags: ['Dry Season', 'Gorilla Trekking'] },
      { text: 'Still dry. Good for both gorilla and chimpanzee trekking.', tags: ['Dry Season', 'Gorilla Trekking', 'Chimp Tracking'] },
      { text: 'The rains begin. Trails become muddy, but forests are lush.', tags: ['Wet Season', 'Birdwatching'] },
      { text: 'The heaviest rains. Fewer visitors and easier permit availability.', tags: ['Wet Season', 'Low Season'] },
      { text: 'Rains continue. Excellent birdwatching and green landscapes.', tags: ['Wet Season', 'Birdwatching'] },
      { text: 'The long dry season begins. Ideal for trekking and savanna parks.', tags: ['Dry Season', 'Gorilla Trekking'] },
      { text: 'Peak dry season and the busiest time. Book permits early.', tags: ['Dry Season', 'Peak Season'] },
      { text: 'Dry and busy, with good game viewing in Queen Elizabeth and Murchison Falls.', tags: ['Dry Season', 'Peak Season', 'Big Game'] },
      { text: 'Dry season continues, with good conditions in forests and savanna.', tags: ['Dry Season', 'Gorilla Trekking'] },
      { text: 'The short rains begin. Quieter, with afternoon showers.', tags: ['Wet Season', 'Shoulder Season'] },
      { text: 'Rains continue. Migrant birds arrive and the forests are green.', tags: ['Wet Season', 'Birdwatching'] },
      { text: 'Drier weather returns, with a busy festive season.', tags: ['Dry Season', 'Festive Season'] },
    ],
    faqs: [
      { q: 'How fit do I need to be for gorilla trekking?', a: 'Treks can take from one to several hours on steep, muddy slopes. A reasonable level of fitness helps, and porters can carry your bag.' },
      { q: 'How far ahead should I book permits?', a: 'Permits are limited and sell out, especially from June to September. Book several months ahead.' },
      { q: 'Do I need a visa?', a: 'Most visitors need a visa, available online. The East Africa Tourist Visa covers Uganda, Kenya and Rwanda on one visa.' },
      { q: 'Do I need a yellow fever vaccination?', a: 'Yes. Uganda requires proof of yellow fever vaccination for entry. Speak to a travel clinic about malaria prevention too.' },
      { q: 'Can I combine Uganda with Tanzania?', a: 'Yes. Flights connect Entebbe with Kilimanjaro and Dar es Salaam, making it easy to add gorillas to a Tanzania safari.' },
    ],
    image: unsplash('1762358511314-ac38f03cffbd', 'A large gorilla sitting in a green forest'),
  },
  {
    slug: 'rwanda',
    name: 'Rwanda',
    tagline: 'Gorillas in the Virunga volcanoes, the Land of a Thousand Hills.',
    description: 'Rwanda safaris: gorilla trekking in Volcanoes National Park, chimpanzees in Nyungwe, Big Five in Akagera and Lake Kivu, with the best months to visit.',
    overview: [
      'Rwanda, the Land of a Thousand Hills, is small, green and easy to travel. Its most famous attraction is gorilla trekking in Volcanoes National Park, on the slopes of the Virunga volcanoes, where Dian Fossey studied mountain gorillas. The park is only about three hours’ drive from Kigali.',
      'Rwanda has invested heavily in conservation and high-quality, low-volume tourism. Akagera National Park in the east is now a Big Five park after lions and rhinos were reintroduced, and Nyungwe Forest in the south-west has chimpanzees, colobus monkeys and a canopy walkway above the trees. Lake Kivu offers relaxed days by the water between treks. Kigali is clean, safe and well connected by air, and Rwanda combines easily with a Tanzania or Kenya safari for travellers who want to add gorillas to their trip.',
    ],
    experiences: [
      { title: 'Gorilla trekking', text: 'One hour with a mountain gorilla family.' },
      { title: 'Golden monkeys', text: 'Track these rare monkeys in the bamboo.' },
      { title: 'Dian Fossey’s grave', text: 'A hike to the Karisoke research site.' },
      { title: 'Nyungwe canopy walk', text: 'A suspension bridge above the forest.' },
      { title: 'Akagera game drives', text: 'Savanna wildlife, including lion and rhino.' },
      { title: 'Kigali', text: 'Markets, art galleries and the Genocide Memorial.' },
    ],
    months: [
      { text: 'The short dry season. Good trekking conditions and clear views of the volcanoes.', tags: ['Dry Season', 'Gorilla Trekking'] },
      { text: 'Dry and pleasant, a good month for all activities.', tags: ['Dry Season', 'Gorilla Trekking'] },
      { text: 'The long rains begin. Lush forests and muddy trails.', tags: ['Wet Season'] },
      { text: 'The wettest month. Fewer visitors on the treks.', tags: ['Wet Season', 'Low Season'] },
      { text: 'Rains continue and ease late in the month.', tags: ['Wet Season', 'Birdwatching'] },
      { text: 'The long dry season begins. Ideal for trekking.', tags: ['Dry Season', 'Gorilla Trekking'] },
      { text: 'Peak season, with dry trails. Book permits early.', tags: ['Dry Season', 'Peak Season'] },
      { text: 'Peak season continues. Good game viewing in Akagera.', tags: ['Dry Season', 'Peak Season', 'Big Five'] },
      { text: 'Dry and busy, with excellent conditions everywhere.', tags: ['Dry Season', 'Big Five'] },
      { text: 'The short rains begin, with afternoon showers.', tags: ['Wet Season', 'Shoulder Season'] },
      { text: 'Rain continues. Green landscapes and quieter parks.', tags: ['Wet Season', 'Birdwatching'] },
      { text: 'Drier weather returns for the festive season.', tags: ['Dry Season', 'Festive Season'] },
    ],
    faqs: [
      { q: 'How far is Volcanoes National Park from Kigali?', a: 'About two and a half to three hours by road, so a gorilla trek is possible on a short trip.' },
      { q: 'How far ahead should I book gorilla permits?', a: 'Several months ahead, especially for June to September. Permits are limited each day.' },
      { q: 'Do I need a visa?', a: 'Many nationalities can get a visa on arrival or online. The East Africa Tourist Visa also covers Kenya and Uganda.' },
      { q: 'Is Rwanda safe?', a: 'Rwanda is known as one of the safest and cleanest countries in Africa. Follow normal travel precautions.' },
      { q: 'Can I see the Big Five in Rwanda?', a: 'Yes, in Akagera National Park, where lions and rhinos have been reintroduced.' },
    ],
    image: unsplash('1786795468102-84cd1ac41cd8', 'Aerial view of Nyandungu Eco-Park in Kigali with winding paths and ponds'),
  },
];

export const getCountry = (slug: string) => countries.find((c) => c.slug === slug);
