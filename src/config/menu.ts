import 'server-only';

// The main menu, in order. Header passes it to Header (desktop links) and MobileMenu (phones and tablets).
// The header holds only chapter links; the footer is the full directory, so nothing is duplicated between them.
export type MenuItem = {
  id: string;
  label: string;
  href: string;
  // Path prefixes that mark this item as the current section ('/' only matches the home page).
  match: string[];
};

export function getMenu(): MenuItem[] {
  return [
    { id: 'destinations', label: 'Destinations', href: '/destinations', match: ['/destinations', '/parks'] },
    { id: 'safaris', label: 'Safaris', href: '/tours', match: ['/tours', '/journey', '/travel-styles'] },
    { id: 'kilimanjaro', label: 'Kilimanjaro', href: '/trekking/kilimanjaro', match: ['/trekking'] },
    { id: 'zanzibar', label: 'Zanzibar', href: '/beaches/zanzibar', match: ['/beaches'] },
    { id: 'about', label: 'About Us', href: '/about', match: ['/about', '/journal'] },
  ];
}
