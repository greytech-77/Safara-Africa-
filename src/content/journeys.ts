import type { Img } from '@/lib/content';
import { unsplash } from './unsplash';

// Safari types: the Journey menu, /journey and /journey/[slug].
// Tours appear on a page when their `tags` include the type's slug.
// STARTER COPY: have the Safara team review before launch.

export type JourneyType = {
  slug: string;
  name: string;
  teaser: string;
  description: string;
  intro: string[];
  image: Img;
};

export const journeyTypes: JourneyType[] = [
  {
    slug: 'great-migration',
    name: 'Great Migration',
    teaser: 'Follow the herds across the Serengeti and the Mara.',
    description: 'Great Migration safaris in Tanzania and Kenya: calving season in Ndutu, river crossings in the northern Serengeti and Maasai Mara, and camps placed to follow the herds.',
    intro: [
      'Every year around 1.5 million wildebeest, with hundreds of thousands of zebra and gazelle, move in a great loop between Tanzania’s Serengeti and Kenya’s Maasai Mara, following the rain and the fresh grass it brings. Predators follow them, and the result is some of the most dramatic wildlife viewing on earth.',
      'From January to March the herds gather on the short-grass plains of the southern Serengeti and Ndutu, where most calves are born within a few weeks and lion, cheetah and hyena are never far away. From July to October they reach the northern Serengeti and the Mara, where the famous river crossings take place. The timing shifts with the rain each year, so we follow reports from guides in the field and place you in camps, often mobile tented camps, close to where the herds are expected in the month you travel.',
    ],
    image: unsplash('1564101160531-4838e8a5f4e7', 'Wildebeest herd crossing a muddy river'),
  },
  {
    slug: 'honeymoon-safari',
    name: 'Honeymoon Safari',
    teaser: 'Private game drives, then barefoot days on the beach.',
    description: 'Honeymoon safaris in East Africa: romantic lodges, private game drives, bush dinners and a bush-to-beach finish on Zanzibar.',
    intro: [
      'A safari honeymoon combines adventure and romance like few other trips. Days start with private game drives in the soft morning light and end with sundowners on a kopje, dinner under the stars and a tent or suite with nobody else in sight.',
      'We choose small lodges and camps known for their setting and privacy, and plan a pace with time to rest as well as explore: a hot-air balloon flight over the Serengeti, a bush breakfast, a spa afternoon. Most couples then fly to Zanzibar, Pemba or Mafia for a few days on the Indian Ocean, so the trip moves from the excitement of the bush to quiet beaches and dhow cruises at sunset. Tell us your dates and how you like to travel, and we will design the whole journey around the two of you.',
    ],
    image: unsplash('1621583628955-42fbc37bf424', 'Wooden boats anchored in turquoise water off a sandy beach'),
  },
  {
    slug: 'family-safari',
    name: 'Family Safari',
    teaser: 'Private vehicles, shorter drives and child-friendly camps.',
    description: 'Family safaris in Tanzania and Kenya with private vehicles, child-friendly lodges, shorter drives and guides who make wildlife come alive for children.',
    intro: [
      'A family safari is one of the best trips you can take together. Children remember their first elephant for the rest of their lives, and a good guide turns every game drive into a lesson in tracking, animal behaviour and conservation.',
      'We plan family trips around private vehicles, so you can stop whenever you like and keep drives short. We choose lodges with family rooms or tents, swimming pools and activities for younger travellers, such as junior ranger programmes, bushcraft walks and visits to local schools or villages. Routes avoid long transfers and mix wildlife with variety: the Ngorongoro Crater, the open Serengeti, a Maasai village and a few days on the beach. Some camps set minimum ages for walking safaris and other activities, and we take this into account from the start.',
    ],
    image: unsplash('1710077539513-6d0b9cf273e2', 'A group of people on the back of a safari vehicle'),
  },
  {
    slug: 'fly-in-safari',
    name: 'Fly-in Safari',
    teaser: 'Light-aircraft flights between parks save time and effort.',
    description: 'Fly-in safaris in Tanzania and Kenya: scheduled light-aircraft flights between parks and to the beach, for more time on safari and less on the road.',
    intro: [
      'East Africa’s parks are far apart, and the roads between them can be long and bumpy. On a fly-in safari, short scheduled flights in light aircraft link the parks, so a full day on the road becomes a one-hour flight with views over the landscape below.',
      'Flying means more time on game drives and less fatigue, and it makes remote areas such as Ruaha, Nyerere, Katavi and the northern Serengeti easy to reach. Camps meet you at the airstrip with their own guides and vehicles. It is also the simplest way to combine safari with the coast, as many airstrips connect directly with Zanzibar. Luggage limits are strict on small aircraft, usually around 15 kg in a soft bag, and we send full details when you book.',
    ],
    image: unsplash('1695302938665-1853a2c35994', 'A small plane on a dirt airstrip'),
  },
  {
    slug: 'safari-from-zanzibar',
    name: 'Safari from Zanzibar',
    teaser: 'Short flights from the island to Nyerere, Mikumi or the Serengeti.',
    description: 'Safaris from Zanzibar: short fly-in trips from the island to Nyerere (Selous), Mikumi, the Serengeti and Tarangire.',
    intro: [
      'Staying on Zanzibar does not mean missing out on a safari. Light-aircraft flights leave the island every day for Tanzania’s parks, so you can spend one to four nights on safari and be back on the beach afterwards.',
      'The closest options are in the south. Nyerere National Park, once part of the Selous Game Reserve, offers game drives and boat safaris on the Rufiji River, and Mikumi National Park has open plains with elephant, giraffe and lion. For the classic northern circuit, flights reach the Serengeti, Tarangire and Lake Manyara in a few hours, and a two- or three-night trip is enough to see a great deal. We arrange the flights, camp, guide and transfers from your hotel, and can include the safari before or after your beach stay.',
    ],
    image: unsplash('1673283961733-244a7879ac2d', 'A large group of hippos in a river'),
  },
  {
    slug: 'gorilla-chimp-trekking',
    name: 'Gorilla & Chimp Trekking',
    teaser: 'Mountain gorillas and chimpanzees in Uganda and Rwanda.',
    description: 'Gorilla and chimpanzee trekking in Uganda and Rwanda: Bwindi, Volcanoes National Park and Kibale Forest, with permits, fitness advice and lodges.',
    intro: [
      'Spending an hour with a family of mountain gorillas is one of the great wildlife experiences. There are only around a thousand mountain gorillas left, all in the forests where Uganda, Rwanda and the Democratic Republic of the Congo meet, and visits to habituated families help pay for their protection.',
      'In Uganda, Bwindi Impenetrable National Park is home to around half of the population, and Kibale Forest is the best place to track chimpanzees. In Rwanda, Volcanoes National Park is about three hours from Kigali, and Nyungwe Forest has chimpanzees and a canopy walkway. Permits are limited and should be booked several months ahead. Treks can take from one to several hours on steep, muddy slopes, so a reasonable level of fitness helps; porters can carry your bag and help on difficult sections.',
    ],
    image: unsplash('1762358511314-ac38f03cffbd', 'A large gorilla sitting in a green forest'),
  },
  {
    slug: 'photographic-safari',
    name: 'Photographic Safari',
    teaser: 'Golden-hour drives, flexible vehicles and the best seasons.',
    description: 'Photographic safaris in Tanzania and Kenya: golden-hour game drives, private photo-equipped vehicles and planning around the best seasons for light and action.',
    intro: [
      'A photographic safari is planned around light and patience. The best images come early and late in the day, and from staying with a sighting for as long as it takes, which is hard to do in a shared vehicle on a fixed schedule.',
      'We arrange private vehicles with space for each photographer, beanbags or mounts, charging points, and guides who understand how to position the vehicle for light and background. Days start before sunrise and finish at dusk, with a rest in the middle when the light is harsh. We also plan around the seasons: calving on the southern Serengeti plains from January to March, river crossings in the northern Serengeti and Maasai Mara from July to October, and dry-season elephant herds in Tarangire. Balloon flights and conservancies with off-road driving add even more options.',
    ],
    image: unsplash('1759352370603-eeb21e082e74', 'A male lion walking across grassy savanna'),
  },
  {
    slug: 'cultural-safaris',
    name: 'Cultural Safaris',
    teaser: 'Time with Maasai, Hadzabe and Datoga communities.',
    description: 'Cultural safaris in Tanzania: respectful visits to Maasai, Hadzabe and Datoga communities, village walks and community-run experiences.',
    intro: [
      'Tanzania is home to more than 120 ethnic groups, and a cultural safari adds time with the people who live alongside the wildlife. Visits are arranged with the communities themselves, and part of what you pay goes directly to them.',
      'Around the Ngorongoro highlands you can visit a Maasai boma and walk with Maasai guides who explain how cattle, land and wildlife are managed together. At Lake Eyasi, you can spend a morning with the Hadzabe, one of the last hunter-gatherer peoples in Africa, and meet Datoga blacksmiths who work metal by hand. Other options include walking tours in Mto wa Mbu, coffee farms on the slopes of Kilimanjaro, village walks in the Usambara Mountains and the Swahili history of Stone Town. We plan visits that are respectful and unhurried, not staged shows.',
    ],
    image: unsplash('1776772838972-ee89adb85561', 'Three men in traditional Maasai clothing'),
  },
];

export const getJourneyType = (slug: string) => journeyTypes.find((j) => j.slug === slug);
