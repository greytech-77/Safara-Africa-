// Footer content: edit columns, legal links and social profiles here. The layout lives in components/layout/Footer.tsx.
import { countries } from '@/content/countries';
import { site } from './site';
import { whatsappLink, whatsappMessage } from '@/lib/whatsapp';
import type { SocialPlatform } from '@/components/layout/social-icons';

export type FooterLink = { label: string; href: string; external?: boolean };
export type FooterColumn = { title: string; links: FooterLink[] };

export const footerColumns: FooterColumn[] = [
  {
    title: 'Journeys',
    links: [
      { label: 'All journeys', href: '/tours' },
      { label: 'Tailor-made trip', href: '/contact#enquire' },
      { label: 'Trekking', href: '/trekking' },
      { label: 'Beaches', href: '/beaches' },
      { label: 'Where to stay', href: '/accommodations' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      ...countries.map((c) => ({ label: c.name, href: `/destinations/${c.slug}` })),
      { label: 'All destinations', href: '/destinations' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Meet the team', href: '/about/team' },
      { label: 'Journal', href: '/journal' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    title: 'Talk to us',
    links: [
      { label: site.email, href: `mailto:${site.email}` },
      { label: site.phone.display, href: `tel:${site.phone.tel}` },
      { label: 'WhatsApp', href: whatsappLink(whatsappMessage()), external: true },
      { label: 'Contact us', href: '/contact' },
    ],
  },
];

// "Our partners" row, between the link columns and the logo.
// Logos are the owner's files in public/images/. Mark an entry `sample: true` to show it on the dev server only.
export type Partner = {
  name: string;
  href?: string;
  logo?: { src: string; width: number; height: number };
  sample?: boolean;
};

const partners: Partner[] = [
  {
    name: 'African Travel & Tourism Association',
    href: 'https://www.atta.travel/',
    logo: { src: '/images/1-atta.png', width: 907, height: 568 },
  },
  {
    name: 'AMREF Flying Doctors',
    href: 'https://www.flydoc.org/',
    logo: { src: '/images/2-amref.png', width: 859, height: 457 },
  },
  { name: 'Tanzania Wildlife Media Association', logo: { src: '/images/3-tawima.png', width: 475, height: 643 } },
  { name: 'Black Earth', logo: { src: '/images/4-black-earth.png', width: 457, height: 604 } },
  {
    name: 'Tanzania Association of Tour Operators',
    href: 'https://www.tatotz.org/',
    logo: { src: '/images/5-tato.png', width: 517, height: 493 },
  },
];

export const publishedPartners = process.env.NODE_ENV === 'production' ? partners.filter((p) => !p.sample) : partners;

export const legalLinks: FooterLink[] = [
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Booking terms', href: '/terms' },
  { label: 'Photo credits', href: '/photo-credits' },
];

const socialNames: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
  x: 'X',
};

// Only profiles with a URL in site.social are shown.
export const socialLinks = (Object.keys(socialNames) as SocialPlatform[])
  .filter((p) => site.social[p])
  .map((p) => ({ platform: p, name: socialNames[p], href: site.social[p] }));
