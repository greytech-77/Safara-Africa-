import { describe, expect, it } from 'vitest';
import { monthRanges } from '@/lib/season-months';
import type { MonthRating } from '@/types/content';

const row = (s: string) => s.split(' ').map((c) => ({ b: 'best', g: 'good', m: 'mixed' })[c] as MonthRating);

describe('monthRanges', () => {
  it('joins consecutive months into a range', () => {
    expect(monthRanges(row('g g m m m b b b b b g g'), 'best')).toBe('June to October');
    expect(monthRanges(row('g g m m m b b b b b g g'), 'mixed')).toBe('March to May');
  });
  it('keeps a run across the new year together', () => {
    expect(monthRanges(row('b b m m m b b b b g m b'), 'best')).toBe('June to September & December to February');
  });
  it('lists single months and separate runs', () => {
    expect(monthRanges(row('b b g m g b b b b b g g'), 'mixed')).toBe('April');
    expect(monthRanges(row('b b m m m b b b b g m b'), 'mixed')).toBe('March to May & November');
  });
  it('handles all year and none', () => {
    expect(monthRanges(row('b b b b b b b b b b b b'), 'best')).toBe('All year');
    expect(monthRanges(row('b b b b b b b b b b b b'), 'mixed')).toBe('');
  });
});
