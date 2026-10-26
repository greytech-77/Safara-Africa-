import { site } from '@/config/site';

type Step = { daysBefore: number; retainedPercent: number; note: string };

// Turns a cancellation scale (furthest to nearest departure) into readable table rows.
export function cancellationRows(scale: readonly Step[] = site.booking.cancellation) {
  return scale.map((row, i) => {
    const prev = scale[i - 1];
    const when =
      i === 0
        ? `${row.daysBefore} days or more before departure`
        : row.daysBefore === 0
          ? `Fewer than ${prev.daysBefore} days before departure`
          : `${row.daysBefore}–${prev.daysBefore - 1} days before departure`;
    return {
      when,
      charge: row.retainedPercent === 0 ? 'No cancellation charge' : `${row.retainedPercent}% of the trip price`,
      note: row.note,
    };
  });
}
