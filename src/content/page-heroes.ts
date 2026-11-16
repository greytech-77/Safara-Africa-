import { unsplash } from '@/lib/unsplash';
import type { Img } from '@/types/content';

// Hero media for pages without a content image of their own.
// PLACEHOLDERS: replace with your own photos (2400×1400) and videos (1920×1080, under 8 MB, 10–20 s, no sound).
type PageHero = { image: Img; video?: string; webm?: string; mobileVideo?: string };

const herdAndVehicles = unsplash(
  '1580145575237-75fec2a0320b',
  'A large herd of wildebeest grazing on grassy plains with safari vehicles nearby',
);

export const pageHeroes = {
  home: {
    // Calm 8s loop cut from the rhino shot in 0519.mp4 (slowed, seamless), compressed with ffmpeg. Poster = its first frame.
    image: { src: '/images/hero/home-poster.jpg', alt: 'A black rhino standing among bare thorn bushes at dusk' },
    video: '/videos/home-hero.mp4',
    webm: '/videos/home-hero.webm',
    mobileVideo: '/videos/home-hero-mobile.mp4',
  },
  tours: { image: unsplash('1518459384564-ecfd8e80721f', 'A herd of wildebeest running across dry savanna with safari vehicles') },
  about: { image: herdAndVehicles },
  team: { image: herdAndVehicles },
  journal: { image: unsplash('1765706730020-561a6432abbd', 'Travellers on safari watching a buffalo on a dirt road') },
  faqs: { image: unsplash('1710077539513-6d0b9cf273e2', 'A group of people on the back of a safari vehicle') },
  accommodations: { image: unsplash('1779218449605-792bf0bef5e0', 'Open-air lodge lounge under a thatched roof') },
  contact: { image: unsplash('1779218449605-792bf0bef5e0', 'Open-air lodge lounge under a thatched roof') },
  legal: { image: unsplash('1635595358293-03620e36be48', 'A herd of zebra on a dry grass field') },
  notFound: { image: unsplash('1494500764479-0c8f2919a3d8', 'A tree standing in shallow water with mountains behind') },
} satisfies Record<string, PageHero>;
