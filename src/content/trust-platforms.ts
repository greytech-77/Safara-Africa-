// "Recommended on" section on the home page: review platforms that list us, and the licences we hold.
//
// SAMPLES: every entry below is a sample for previewing the layout. Sample entries show on the dev
// server only and are dropped from production builds, so invented ratings can never go live.
// For each real entry: set the profile URL, rating and review count from the live profile, add the
// official logo to public/images/trust/, then delete `sample: true`.
// Never publish a platform, rating, award or licence number we don't actually have.

export type TrustPlatform = {
  name: string;
  /** Our profile page on the platform. */
  href: string;
  /** Official logo from the platform's press/brand page, e.g. '/images/trust/tripadvisor.svg'. Without it the name is shown. */
  logo?: { src: string; width: number; height: number };
  /** Current star rating out of 5, copied from the live profile. Leave out to hide. */
  rating?: number;
  /** Current number of reviews on the profile. Leave out to hide. */
  reviews?: number;
  sample?: boolean;
};

export type Credential = {
  name: string;
  /** e.g. "Licence No. 12345" or "Member No. 678" — only real numbers. */
  detail?: string;
  href?: string;
  logo?: { src: string; width: number; height: number };
  sample?: boolean;
};

export const trustPlatforms: TrustPlatform[] = [
  // TODO real data: profile URL, rating, review count, logo
  { name: 'Tripadvisor', href: 'https://www.tripadvisor.com/', rating: 5, reviews: 128, sample: true },
  { name: 'SafariBookings', href: 'https://www.safaribookings.com/', rating: 4.9, reviews: 64, sample: true },
  { name: 'Google', href: 'https://www.google.com/maps', rating: 4.9, reviews: 87, sample: true },
  { name: 'Trustpilot', href: 'https://www.trustpilot.com/', rating: 4.8, reviews: 41, sample: true },
  { name: 'GetYourGuide', href: 'https://www.getyourguide.com/', rating: 4.9, reviews: 23, sample: true },
  { name: 'Viator', href: 'https://www.viator.com/', rating: 5, reviews: 19, sample: true },
  { name: 'Facebook', href: 'https://www.facebook.com/', sample: true },
];

export const credentials: Credential[] = [
  // TODO real data: licence and membership numbers, logos
  { name: 'TALA licensed', detail: 'Licence No. ____', sample: true },
  { name: 'TATO member', detail: 'Member No. ____', href: 'https://www.tatotz.org/', sample: true },
  { name: 'KPAP partner', detail: 'Fair treatment of Kilimanjaro porters', href: 'https://kiliporters.org/', sample: true },
];

// Samples only outside production.
const live = <T extends { sample?: boolean }>(items: T[]) =>
  process.env.NODE_ENV === 'production' ? items.filter((i) => !i.sample) : items;

export const publishedTrustPlatforms = live(trustPlatforms);
export const publishedCredentials = live(credentials);
