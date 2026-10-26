import { describe, expect, it } from 'vitest';
import { accommodations } from '@/content/accommodations';
import { countries } from '@/content/countries';
import { parks } from '@/content/parks';
import { getFaqs, getPosts, getTours } from '@/lib/content';

describe('content', () => {
  const tours = getTours();
  const countrySlugs = new Set(countries.map((c) => c.slug));

  it('loads every published tour', () => {
    expect(tours.length).toBeGreaterThanOrEqual(17);
  });

  it('gives each tour a unique slug', () => {
    expect(new Set(tours.map((t) => t.slug)).size).toBe(tours.length);
  });

  it('links each tour to a known country', () => {
    for (const t of tours) expect(countrySlugs, t.slug).toContain(t.country);
  });

  it('gives each tour a route whose nights fit its length', () => {
    for (const t of tours) {
      const nights = t.route.reduce((n, s) => n + s.nights, 0);
      expect(nights, t.slug).toBeLessThan(t.days);
    }
  });

  it('links each lodge to a known park and country', () => {
    const parkSlugs = new Set(parks.map((p) => p.slug));
    for (const a of accommodations) {
      expect(parkSlugs, a.slug).toContain(a.park);
      expect(countrySlugs, a.slug).toContain(a.country);
    }
  });

  it('loads posts newest first and FAQs', () => {
    const posts = getPosts();
    expect(posts.length).toBeGreaterThan(0);
    for (let i = 1; i < posts.length; i++) expect(posts[i - 1].date >= posts[i].date).toBe(true);
    expect(getFaqs().length).toBeGreaterThan(0);
  });
});
