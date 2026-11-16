import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { accommodations } from '@/content/accommodations';
import { beaches } from '@/content/beaches';
import { countries } from '@/content/countries';
import { journeyTypes } from '@/content/journeys';
import { parks } from '@/content/parks';
import { travelStyles } from '@/content/travel-styles';
import { treks } from '@/content/treks';
import { getPosts, getTours } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '',
    '/tours',
    '/journey',
    '/destinations',
    '/beaches',
    '/trekking',
    '/accommodations',
    '/journal',
    '/faqs',
    '/about',
    '/about/team',
    '/contact',
    '/privacy',
    '/terms',
    '/photo-credits',
  ];
  const paths = [
    ...pages,
    ...getTours().map((t) => `/tours/${t.slug}`),
    ...journeyTypes.map((j) => `/journey/${j.slug}`),
    ...countries.map((c) => `/destinations/${c.slug}`),
    ...parks.filter((p) => !p.link).map((p) => `/parks/${p.slug}`),
    ...accommodations.map((a) => `/accommodations/${a.slug}`),
    ...beaches.map((b) => `/beaches/${b.slug}`),
    ...treks.map((t) => `/trekking/${t.slug}`),
    ...travelStyles.map((s) => `/travel-styles/${s.slug}`),
  ];
  const posts = getPosts().map((p) => ({ url: `${site.url}/journal/${p.slug}`, lastModified: p.date }));
  return [...paths.map((p) => ({ url: `${site.url}${p}` })), ...posts];
}
