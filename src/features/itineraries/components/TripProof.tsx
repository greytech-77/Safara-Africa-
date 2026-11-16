import { publishedTestimonials } from '@/content/testimonials';
import { publishedTrustPlatforms } from '@/content/trust-platforms';

// Social proof on the tour page, from real reviews only.
// Until real reviews exist, the dev server shows a labelled placeholder so the layout can be checked;
// production shows nothing. Never invent a review or a rating here.
const dev = process.env.NODE_ENV !== 'production';

/** One short guest quote, placed between days. */
export function GuestQuote() {
  const t = publishedTestimonials[0];
  if (!t) {
    if (!dev) return null;
    return (
      <p className="rounded-lg border border-dashed border-slate/40 px-4 py-3 text-step--1 text-slate">
        Guest review placeholder (dev only): add a real review in src/content/testimonials.ts and it appears here.
      </p>
    );
  }
  return (
    <figure className="border-l-2 border-gold-ink pl-5">
      <blockquote className="font-display text-step-1 italic text-heading">“{t.quote}”</blockquote>
      <figcaption className="mt-2 text-step--1 text-slate">
        {t.name} · {t.source}
      </figcaption>
    </figure>
  );
}

/** A small rating line under the booking form, from a real review profile. */
export function RatingLine() {
  // Real profiles only: sample entries (shown elsewhere on the dev server) never supply a rating here.
  const p = publishedTrustPlatforms.find((x) => !x.sample && x.rating && x.reviews);
  if (!p) {
    if (!dev) return null;
    return <p className="mt-2 text-center text-[12px] leading-tight text-slate">Rating placeholder (dev only)</p>;
  }
  return (
    <p className="mt-2 text-center text-[13px] leading-tight text-slate">
      <span className="text-gold-ink">★</span> {p.rating?.toFixed(1)} from {p.reviews} reviews on{' '}
      <a href={p.href} target="_blank" rel="noopener" className="trip-link">
        {p.name}
      </a>
    </p>
  );
}
