import Image from 'next/image';
import Link from 'next/link';
import type { TourCardData } from '@/types/content';
import { tierLabel } from '@/features/itineraries/labels';

// Photo card: duration badge top left, title, price and travel style over a dark fade.
// On hover the text lifts and a "View trip" line fades in; touch screens always show it.
export default function TourCard({ tour }: { tour: TourCardData }) {
  return (
    <article className="group relative has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-gold-ink h-[28rem] overflow-hidden rounded-2xl bg-deep-teal text-cream shadow-[0_4px_3px_rgb(0_0_0/.12)]">
      <Image src={tour.hero.src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="zoom object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(1_47_54/0)_40%,rgb(1_47_54/.94)_72%)]" />

      <p className="absolute left-6 top-6 rounded-full bg-gold px-4 py-1.5 text-step--1 font-bold text-on-gold">{tour.days} Days</p>
      {tour.tier && (
        <p className="absolute right-6 top-6 rounded-full bg-teal-deep/75 px-4 py-1.5 text-step--1 font-semibold text-white backdrop-blur-sm">
          {tierLabel[tour.tier]}
        </p>
      )}

      <div className="card-lift absolute inset-x-0 bottom-0 p-6 sm:px-8">
        <h3 className="text-step-2">{tour.title}</h3>
        <p className="mt-2 text-step--1 text-cream/80">{overnightStops(tour).join(' · ')}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/20 pt-4">
          <p className="font-bold">
            {tour.priceFrom ? (
              <>
                <span className="text-step--1 font-normal text-cream/80">from </span>
                {tour.priceFrom}
                <span className="text-step--1 font-normal text-cream/80"> p.p</span>
                {tour.priceIsPlaceholder && (
                  <span
                    className="ml-2 rounded bg-white/15 px-1.5 py-0.5 text-step--1 font-semibold text-cream"
                    title="Placeholder price: to be confirmed"
                  >
                    TBC
                  </span>
                )}
              </>
            ) : (
              'Price on request'
            )}
          </p>
          <p className="flex items-center gap-2 text-step--1 font-semibold">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-gold">
              <path d="M8 1.5 9.9 5.6l4.4.5-3.3 3 .9 4.4L8 11.3l-3.9 2.2.9-4.4-3.3-3 4.4-.5z" />
            </svg>
            {tour.style}
          </p>
        </div>
        <p aria-hidden="true" className="card-more mt-3 text-step--1 font-bold text-gold">
          View trip <span className="arrow">→</span>
        </p>
      </div>

      {/* The link sits over the whole card, so the photo, badges and text all click through. */}
      <Link href={`/tours/${tour.slug}`} className="absolute inset-0 z-10 rounded-2xl">
        <span className="sr-only">{tour.title}</span>
      </Link>
    </article>
  );
}

// Places where the trip spends nights; day trips fall back to every stop.
function overnightStops(tour: TourCardData) {
  const nights = tour.route.filter((s) => s.nights > 0).map((s) => s.place);
  return nights.length > 0 ? nights : [...new Set(tour.route.map((s) => s.place))];
}
