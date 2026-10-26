import type { Img } from '@/types/content';

// Ways to travel, shown in the menu and on /travel-styles/[slug].
// `tours` lists tour slugs (file names in content/tours) that suit the style.
// STARTER COPY: have the Safara team review before launch.

export type TravelStyle = {
  slug: string;
  name: string;
  teaser: string;
  intro: string[];
  points: { title: string; body: string }[];
  tours: string[];
  image: Img;
};

// Placeholder Unsplash photos. Replace with your own before launch.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const travelStyles: TravelStyle[] = [

  {
    slug: 'private-luxury',
    name: 'Private luxury',
    teaser: 'Exclusive camps, your own guide and complete privacy.',
    intro: [
      'A private safari is planned around your party alone: your own guide and vehicle, small camps chosen for their location and privacy, and a pace you set each day.',
    ],
    points: [
      { title: 'Your own guide', body: 'One guide for the whole safari, who gets to know how you like to travel.' },
      { title: 'Camps in the right place', body: 'Small, high-end camps placed where the wildlife is in the month you travel.' },
      { title: 'Light-aircraft flights', body: 'Fly between parks to spend your days on game drives, not on the road.' },
    ],
    tours: ['tanzania-luxury'],
    image: { src: unsplash('1782070584433-1f75fbe90aca'), alt: 'Elephants silhouetted against an African sunset' },
  },
  {
    slug: 'fly-in-safaris',
    name: 'Fly-in safaris',
    teaser: 'Link the parks and the coast by light aircraft.',
    intro: [
      'Tanzania’s parks are far apart. Scheduled bush flights link the Serengeti, the southern parks and Zanzibar, turning long drives into short, scenic flights.',
    ],
    points: [
      { title: 'More time on safari', body: 'A one-hour flight replaces a full day on the road.' },
      { title: 'North and south in one trip', body: 'Combine the Serengeti with remote Ruaha, then fly to the beach.' },
      { title: 'Easy beach extensions', body: 'Airstrips connect directly with Zanzibar for a few days by the sea.' },
    ],
    tours: ['tanzania-fly-in', 'tanzania-luxury'],
    image: { src: unsplash('1707410436217-9ac6188cd762'), alt: 'A hot-air balloon flying low over green plains' },
  },
  {
    slug: 'honeymoons',
    name: 'Honeymoons',
    teaser: 'Sundowners in the Serengeti, then barefoot days on Zanzibar.',
    intro: [
      'A Tanzania honeymoon pairs the drama of safari with the calm of the Indian Ocean: balloon flights and bush dinners, then quiet beaches and dhow cruises at sunset.',
    ],
    points: [
      { title: 'Privacy first', body: 'Secluded tents and private activities at every stop.' },
      { title: 'Moments to remember', body: 'Balloon flights, sundowners on a kopje and dinners under the stars.' },
      { title: 'Safari and beach', body: 'End with time to rest on Zanzibar’s white-sand coast.' },
    ],
    tours: ['tanzania-luxury', 'tanzania-fly-in'],
    image: { src: unsplash('1621583628955-42fbc37bf424'), alt: 'Wooden boats anchored in turquoise water off a sandy beach' },
  },
  {
    slug: 'family-safaris',
    name: 'Family safaris',
    teaser: 'Private guides and vehicles that move at your family’s pace.',
    intro: [
      'Travelling privately means the day can bend around children: shorter drives, breaks when needed and a guide who makes wildlife come alive for every age.',
    ],
    points: [
      { title: 'Your own vehicle', body: 'Stop when you want, for as long as you want.' },
      { title: 'Family-friendly camps', body: 'Family tents, pools and activities for younger travellers.' },
      { title: 'Varied days', body: 'Crater, plains, Maasai villages and the beach keep every day different.' },
    ],
    tours: ['tanzania-classic', 'tanzania-luxury'],
    image: { src: unsplash('1710077539513-6d0b9cf273e2'), alt: 'A group of people on the back of a safari vehicle' },
  },


  {
    slug: 'kilimanjaro-climbs',
    name: 'Kilimanjaro climbs',
    teaser: 'Guided treks to the Roof of Africa.',
    intro: [
      'Kilimanjaro needs no technical skills, but it does need time to acclimatise. We plan routes with enough days on the mountain and experienced crews who know it well.',
    ],
    points: [
      { title: 'Routes with good success rates', body: 'Machame and Lemosho give time to climb high and sleep low.' },
      { title: 'Experienced crews', body: 'Qualified guides, fair pay for porters and daily health checks.' },
      { title: 'Safari afterwards', body: 'Recover on a safari or on Zanzibar once you are down.' },
    ],
    tours: ['kilimanjaro-machame'],
    image: { src: unsplash('1631646109248-a7264aae1790'), alt: 'A giraffe standing in a field with a mountain behind' },
  },
];

export const getTravelStyle = (slug: string) => travelStyles.find((s) => s.slug === slug);
