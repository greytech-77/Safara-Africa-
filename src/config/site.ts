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

  // CONFIRM: licence and memberships. An empty value hides that line in the footer and on /about.
  licences: {
    // Tanzania Tourism Licensing Authority (TALA) tour operator licence number.
    tala: '',
    // Tanzania Association of Tour Operators membership number.
    tato: '',
    // Kilimanjaro Porters Assistance Project partner (porter welfare on Kilimanjaro).
    kpap: false as boolean,
  },

  // CONFIRM: booking terms shown on /terms. Placeholders until the owner sets them.
  booking: {
    depositPercent: 30,
    balanceDueDays: 60,
    // Days before departure → share of the trip price retained on cancellation.
    cancellation: [
      { daysBefore: 90, retainedPercent: 0, note: 'deposit refunded minus bank charges' },
      { daysBefore: 60, retainedPercent: 30, note: 'deposit retained' },
      { daysBefore: 30, retainedPercent: 50, note: '' },
      { daysBefore: 0, retainedPercent: 100, note: '' },
    ],
    isPlaceholder: true as boolean,
  },

  // CONFIRM: paste each profile's full URL. An empty value hides that icon; all empty hides the row.
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    x: '',
  } as Record<'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'x', string>,

  // The main menu lives in src/config/menu.ts.
} as const;
