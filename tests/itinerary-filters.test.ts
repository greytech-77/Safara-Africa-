import { describe, expect, it } from 'vitest';
import { matches } from '@/features/itineraries/components/ItineraryBrowser';
import type { TourCardData } from '@/types/content';

const card = (over: Partial<TourCardData>): TourCardData => ({
  slug: 'x',
  title: 'x',
  days: 7,
  kind: 'safari',
  style: 'Guided',
  country: 'tanzania',
  tier: 'Mid Range',
  route: [],
  hero: { src: '/x.jpg', alt: 'x' },
  fromUsd: 2500,
  priceFrom: '$2,500',
  priceIsPlaceholder: true,
  parks: ['serengeti', 'ngorongoro'],
  bestMonths: [7, 8, 9],
  tags: ['great-migration'],
  ...over,
});

const none = { kind: '', length: '', budget: '', park: '', month: '', style: '', country: '' };

describe('listing filters', () => {
  it('shows everything with no filter', () => {
    expect(matches(card({}), none)).toBe(true);
  });

  it('filters by type, park, month and experience', () => {
    expect(matches(card({}), { ...none, kind: 'trek' })).toBe(false);
    expect(matches(card({}), { ...none, park: 'serengeti' })).toBe(true);
    expect(matches(card({}), { ...none, park: 'tarangire' })).toBe(false);
    expect(matches(card({}), { ...none, month: '8' })).toBe(true);
    expect(matches(card({}), { ...none, month: '4' })).toBe(false);
    expect(matches(card({}), { ...none, style: 'great-migration' })).toBe(true);
  });

  it('filters by length and budget bands', () => {
    expect(matches(card({ days: 3 }), { ...none, length: '1-3' })).toBe(true);
    expect(matches(card({ days: 4 }), { ...none, length: '1-3' })).toBe(false);
    expect(matches(card({ days: 14 }), { ...none, length: '12+' })).toBe(true);
    expect(matches(card({ fromUsd: 1499 }), { ...none, budget: 'u1500' })).toBe(true);
    expect(matches(card({ fromUsd: 3000 }), { ...none, budget: '1500-3000' })).toBe(true);
    expect(matches(card({ fromUsd: 3001 }), { ...none, budget: '1500-3000' })).toBe(false);
  });

  it('excludes trips without a price from budget filters', () => {
    expect(matches(card({ fromUsd: undefined }), { ...none, budget: 'u1500' })).toBe(false);
  });
});
