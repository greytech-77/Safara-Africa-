import 'server-only';
import { beaches } from '@/content/beaches';
import { countries } from '@/content/countries';
import { journeyTypes } from '@/content/journeys';
import { travelStyles } from '@/content/travel-styles';
import { treks } from '@/content/treks';
import type { Img } from '@/lib/content';

// The main menu. Header passes this to MegaMenu (desktop) and MobileMenu (phones).
// Journey, Destinations, Beaches, Trekking and Travel styles are generated from their content files.
// Desktop shows `tiles` where set; phones always use `groups` and `cards`.

export type MenuLink = { label: string; href: string; note?: string };
export type MenuGroup = { heading?: string; links: MenuLink[] };
export type MenuCard = { title: string; href: string; cta: string; image: Img };
// Desktop only: an optional heading over a grid of photo tiles, replacing groups and cards in the panel.
export type MenuTiles = { heading?: string; items: MenuCard[]; links?: MenuLink[] };
export type MenuItem = {
  id: string;
  label: string;
  // Path prefixes that mark this item as the current section.
  match: string[];
  groups: MenuGroup[];
  cards: MenuCard[];
  tiles?: MenuTiles;
};

export function getMenu(): MenuItem[] {
  const honeymoons = travelStyles.find((s) => s.slug === 'honeymoons') ?? travelStyles[0];

  return [
    {
      id: 'journey',
      label: 'Journey',
      match: ['/journey', '/tours'],
      groups: [
        {
          heading: 'East Africa Safaris',
          links: journeyTypes.map((j) => ({ label: j.name, href: `/journey/${j.slug}`, note: j.teaser })),
        },
        {
          heading: 'Your own way',
          links: [
            { label: 'Tailor-made trip', href: '/contact#enquire', note: 'Designed from scratch with a consultant' },
            { label: 'All journeys', href: '/tours' },
          ],
        },
      ],
      cards: [],
      tiles: {
        heading: 'East Africa Safaris',
        items: journeyTypes.map((j) => ({ title: j.name, href: `/journey/${j.slug}`, cta: j.teaser, image: j.image })),
        links: [
          { label: 'Tailor-made trip', href: '/contact#enquire' },
          { label: 'All journeys', href: '/tours' },
        ],
      },
    },
    {
      id: 'destinations',
      label: 'Destinations',
      match: ['/destinations', '/parks'],
      groups: [
        {
          links: [
            ...countries.map((c) => ({ label: c.name, href: `/destinations/${c.slug}`, note: c.tagline })),
            { label: 'All destinations', href: '/destinations' },
          ],
        },
      ],
      cards: [],
      tiles: {
        items: countries.map((c) => ({ title: c.name, href: `/destinations/${c.slug}`, cta: 'Discover more', image: c.image })),
        links: [{ label: 'All destinations', href: '/destinations' }],
      },
    },
    {
      id: 'beaches',
      label: 'Beaches',
      match: ['/beaches'],
      groups: [
        {
          heading: 'Zanzibar',
          links: beaches.map((b) => ({ label: b.name, href: `/beaches/${b.slug}`, note: b.teaser })),
        },
      ],
      cards: [],
      tiles: {
        heading: 'Zanzibar',
        items: beaches.map((b) => ({ title: b.name, href: `/beaches/${b.slug}`, cta: b.teaser, image: b.image })),
      },
    },
    {
      id: 'trekking',
      label: 'Trekking',
      match: ['/trekking'],
      groups: [
        {
          links: treks.map((t) => ({ label: t.name, href: `/trekking/${t.slug}`, note: t.teaser })),
        },
      ],
      cards: [],
      tiles: {
        items: treks.map((t) => ({ title: t.name, href: `/trekking/${t.slug}`, cta: t.teaser, image: t.image })),
      },
    },
    {
      id: 'styles',
      label: 'Travel styles',
      match: ['/travel-styles'],
      groups: [
        {
          heading: 'Ways to travel',
          links: travelStyles.map((s) => ({ label: s.name, href: `/travel-styles/${s.slug}`, note: s.teaser })),
        },
      ],
      cards: [{ title: `${honeymoons.name} in Tanzania`, href: `/travel-styles/${honeymoons.slug}`, cta: 'Discover more', image: honeymoons.image }],
    },
    {
      id: 'about',
      label: 'About Us',
      match: ['/about', '/journal', '/faqs', '/contact'],
      groups: [
        {
          links: [
            { label: 'About Us', href: '/about', note: 'Our story and why travel with us' },
            { label: 'Meet the team', href: '/about/team', note: 'The people behind your journey' },
            { label: 'Journal', href: '/journal', note: 'Stories and travel ideas' },
            { label: 'FAQs', href: '/faqs', note: 'Planning, travel and booking questions' },
            { label: 'Contact us', href: '/contact' },
          ],
        },
      ],
      cards: [],
    },
  ];
}
