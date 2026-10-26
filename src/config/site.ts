// Single source of truth for business details.
// Header, footer, contact page, metadata and structured data all read from here.

export const site = {
  name: 'Safara Africa',
  legalName: 'Safara Africa Expeditions',
  tagline: 'Private, tailor-made safaris across Tanzania',
  description:
    'Safara Africa is an Arusha-based tour operator crafting private safaris, Kilimanjaro climbs and Zanzibar beach holidays across Tanzania.',
  url: 'https://www.safaraafrica.com',

  email: 'info@safaraafrica.com',
  // CONFIRM: placeholder number. Enter the Tanzanian office line (+255) before launch.
  phone: { display: '+255 000 000 000', tel: '+255000000000' },
  whatsapp: '255000000000',

  // CONFIRM: street and area of the Arusha office.
  address: {
    street: 'Street address',
    suburb: 'Area',
    city: 'Arusha',
    country: 'Tanzania',
    countryCode: 'TZ',
  },

  hours: [
    { days: 'Monday to Friday', time: '8:30 – 17:30' },
    { days: 'Saturday', time: '9:00 – 14:00' },
    { days: 'Sunday', time: 'Closed' },
  ],

  // Add real profiles; an empty list hides the row.
  social: [] as { label: string; href: string }[],

  // The main menu lives in src/config/menu.ts.
} as const;
