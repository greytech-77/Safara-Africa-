import { describe, expect, it } from 'vitest';
import { publishedTestimonials, testimonials } from '@/content/testimonials';

describe('testimonials', () => {
  it('never publishes a sample review', () => {
    expect(publishedTestimonials.every((t) => !t.sample)).toBe(true);
  });

  it('flags every placeholder entry as a sample', () => {
    const placeholders = testimonials.filter((x) => /placeholder|sample review|guest name/i.test(`${x.title} ${x.quote} ${x.name}`));
    for (const t of placeholders) {
      expect(t.sample, t.title).toBe(true);
    }
  });
});
