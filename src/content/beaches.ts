import type { Img, MonthRating } from '@/types/content';
import { unsplash } from '@/lib/unsplash';

// Islands: the Beaches menu, /beaches and /beaches/[slug].
// Tours appear on a page when their `tags` include the island's slug.
// STARTER COPY: have the Safara team review before launch.


export type Beach = {
  slug: string;
  name: string;
  subtitle: string;
  teaser: string;
  description: string;
  intro: string[];
  activities: string[];
  // Search term for the map embed.
  map: string;
  // January to December.
  months: MonthRating[];
  image: Img;
};

export const beaches: Beach[] = [
  {
    slug: 'zanzibar',
    name: 'Zanzibar',
    subtitle: 'Spice Island beaches and the old streets of Stone Town',
    teaser: 'White sand, Stone Town and spice farms.',
    description: 'Zanzibar holidays: Stone Town, spice tours, white-sand beaches at Nungwi, Kendwa and Paje, snorkelling, dolphins and Prison Island, after your safari.',
    intro: [
      'Zanzibar is the classic way to end a Tanzania safari: a short flight from the parks, with warm Indian Ocean water, coral reefs and long white beaches lined with palms. It is easy to spend a few days here doing very little, but the island has plenty to explore too.',
      'Stone Town, a UNESCO World Heritage Site, is a maze of narrow lanes, carved wooden doors, markets and old merchants’ houses that reflect centuries of Swahili, Arab, Indian and European trade. Spice tours show how cloves, nutmeg and vanilla are grown. On the coast, Nungwi and Kendwa in the north have swimming at all tides and lively sunsets, while Paje and the east coast are quieter, with wide tidal lagoons that suit kitesurfing. Boat trips go to Prison Island and its giant tortoises, to sandbanks for snorkelling, and to the south in search of dolphins.',
    ],
    activities: ['Guided walk in Stone Town', 'Spice farm tour', 'Snorkelling and diving', 'Dolphin trips', 'Prison Island and giant tortoises', 'Sunset dhow cruise', 'Kitesurfing on the east coast', 'Jozani Forest and red colobus monkeys'],
    map: 'Zanzibar, Tanzania',
    months: ['best', 'best', 'good', 'mixed', 'mixed', 'good', 'best', 'best', 'best', 'best', 'good', 'best'],
    image: unsplash('1575999502951-4ab25b5ca889', 'White sand beach with palm trees and a wooden pier in Zanzibar'),
  },
  {
    slug: 'pemba',
    name: 'Pemba Island',
    subtitle: 'The Green Island: quiet, undeveloped and made for divers',
    teaser: 'Green hills, clove farms and dramatic reef walls.',
    description: 'Pemba Island holidays: "The Green Island" north of Zanzibar, with some of East Africa’s best diving, clove plantations and quiet beaches.',
    intro: [
      'Pemba lies about 50 kilometres north of Zanzibar but sees only a small share of its visitors. Known as “The Green Island”, it is hillier and more fertile, covered in clove plantations, mango trees and patches of forest, with mangroves and small beaches along its shores.',
      'For divers, Pemba is the main attraction. The deep Pemba Channel runs close to the west coast, creating steep reef walls, strong currents and healthy coral with large fish, turtles and, at times, sharks and rays. Snorkellers find calmer reefs and sandbanks near the outer islands. On land, visits to clove farms and fishing villages show traditional island life, and Ngezi Forest protects the Pemba flying fox, a large fruit bat found only here. Accommodation is limited to a handful of small lodges, which keeps the island peaceful.',
    ],
    activities: ['Wall diving in the Pemba Channel', 'Snorkelling from a dhow', 'Clove farm and village visits', 'Ngezi Forest walk', 'Sandbank picnics', 'Sunset sailing'],
    map: 'Pemba Island, Tanzania',
    months: ['best', 'best', 'good', 'mixed', 'mixed', 'good', 'good', 'best', 'best', 'best', 'good', 'best'],
    image: unsplash('1594629242947-2f81cf63803e', 'A green island in the middle of a blue sea'),
  },
  {
    slug: 'mafia',
    name: 'Mafia Island',
    subtitle: 'Marine park, whale sharks and very low-key island life',
    teaser: 'Whale sharks, a marine park and quiet lodges.',
    description: 'Mafia Island holidays: Mafia Island Marine Park, whale sharks (roughly October to March), diving and relaxed, low-key island life.',
    intro: [
      'Mafia Island lies south of Zanzibar, off the Rufiji delta, and is the quietest of Tanzania’s main islands. There are no large resorts, just a few small lodges, sandy lanes and fishing villages, and much of the surrounding sea is protected as Mafia Island Marine Park.',
      'The marine park’s reefs, channels and lagoons offer excellent diving and snorkelling, with hard and soft corals, turtles and a huge variety of fish. From roughly October to March, whale sharks gather off Kilindoni to feed, and small, carefully managed boat trips let you snorkel alongside them. Other days can be spent sailing by dhow to Chole Island and its old ruins, walking through villages, or visiting sandbanks at low tide. Mafia is a short flight from Dar es Salaam and combines well with a fly-in safari to Nyerere National Park.',
    ],
    activities: ['Swimming with whale sharks (in season)', 'Diving in the marine park', 'Snorkelling at sandbanks', 'Dhow trips to Chole Island', 'Village and ruins walks', 'Turtle nesting (seasonal)'],
    map: 'Mafia Island, Tanzania',
    months: ['best', 'best', 'good', 'mixed', 'mixed', 'good', 'good', 'good', 'good', 'best', 'best', 'best'],
    image: unsplash('1540202404-b2979d19ed37', 'A whale shark swimming in deep blue water'),
  },
  {
    slug: 'thanda',
    name: 'Thanda Island',
    subtitle: 'A small private island for an exclusive stay',
    teaser: 'A private island in a marine reserve.',
    description: 'Thanda Island: an exclusive-use private island in a marine reserve in the Mafia archipelago, for a completely private beach stay.',
    intro: [
      'Thanda Island is a small private island in the Mafia archipelago, off Tanzania’s southern coast. It is booked on an exclusive-use basis, so for the length of your stay the island, its villa and its staff are for your group alone.',
      'The island sits within a marine reserve, and the surrounding reefs and seagrass beds are home to turtles, reef fish and, at certain times of year, whale sharks nearby. Days are spent snorkelling and diving, paddling, sailing, or simply relaxing on a beach with nobody else on it. It suits honeymoons, family celebrations and small groups of friends who want complete privacy at the end of a safari. Access is by light aircraft to Mafia, followed by a short boat transfer. Because it is exclusive, availability is limited and it should be booked well ahead.',
    ],
    activities: ['Exclusive use of the whole island', 'Snorkelling and diving', 'Kayaking and paddleboarding', 'Sailing trips', 'Private dining on the beach', 'Spa treatments'],
    map: 'Shungimbili Island, Mafia, Tanzania',
    months: ['best', 'best', 'good', 'mixed', 'mixed', 'good', 'good', 'good', 'good', 'best', 'best', 'best'],
    image: unsplash('1577702066866-6c8897d06443', 'Aerial view of a green island in the sea'),
  },
];

export const getBeach = (slug: string) => beaches.find((b) => b.slug === slug);
