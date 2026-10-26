import { describe, expect, it } from 'vitest';
import { site } from '@/config/site';
import { cancellationRows } from '@/lib/booking-terms';

describe('booking terms', () => {
  it('describes each cancellation band without gaps', () => {
    const rows = cancellationRows([
      { daysBefore: 90, retainedPercent: 0, note: '' },
      { daysBefore: 60, retainedPercent: 30, note: '' },
      { daysBefore: 0, retainedPercent: 100, note: '' },
    ]);
    expect(rows.map((r) => r.when)).toEqual([
      '90 days or more before departure',
      '60–89 days before departure',
      'Fewer than 60 days before departure',
    ]);
    expect(rows[0].charge).toBe('No cancellation charge');
    expect(rows[2].charge).toBe('100% of the trip price');
  });

  it('keeps the configured scale ordered from furthest to nearest departure', () => {
    const days = site.booking.cancellation.map((c) => c.daysBefore);
    expect([...days].sort((a, b) => b - a)).toEqual(days);
    expect(days.at(-1)).toBe(0);
  });
});
