import 'server-only';
import { countries } from '@/content/countries';
import { journeyTypes } from '@/content/journeys';

// The main menu, in order. Header passes it to MegaMenu (desktop dropdowns) and MobileMenu (phones and tablets).
// An item with `children` opens a plain one-level dropdown; an item with `href` and no children is a plain link.
// Destination and safari links are generated from their content files.
// FAQs and Contact are not in the header menu; they stay linked from the footer, and "Plan your journey" leads to
// the contact page.

export type MenuLink = { label: string; href: string };
export type MenuItem = {
  id: string;
  label: string;
  // Path prefixes that mark this item as the current section ('/' only matches the home page).
  match: string[];
} & ({ href: string; children?: never } | { href?: never; children: MenuLink[] });

export function getMenu(): MenuItem[] {
  return [
    { id: 'home', label: 'Home', href: '/', match: ['/'] },
    {
      id: 'destinations',
      label: 'Destinations',
      match: ['/destinations', '/parks'],
      children: countries.map((c) => ({ label: c.name, href: `/destinations/${c.slug}` })),
    },
    {
      id: 'safaris',
      label: 'Safaris',
      match: ['/journey', '/tours', '/travel-styles'],
      children: journeyTypes.map((j) => ({ label: j.name, href: `/journey/${j.slug}` })),
    },
    { id: 'kilimanjaro', label: 'Kilimanjaro', href: '/trekking/kilimanjaro', match: ['/trekking'] },
    { id: 'zanzibar', label: 'Zanzibar', href: '/beaches/zanzibar', match: ['/beaches'] },
    {
      id: 'about',
      label: 'About Us',
      match: ['/about', '/journal'],
      children: [
        { label: 'Our story', href: '/about' },
        { label: 'Meet the team', href: '/about/team' },
        { label: 'Journal', href: '/journal' },
      ],
    },
  ];
}
