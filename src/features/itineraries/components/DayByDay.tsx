import Link from 'next/link';
import DayControls from './DayControls';
import type { ItineraryDay, Place, Stay } from '../schema';

type Props = {
  days: ItineraryDay[];
  stays: Map<string, Stay>;
  places: Map<string, Place>;
  /** A guest quote shown between two days (after this day number). */
  quoteAfterDay?: number;
  quote?: React.ReactNode;
};

const MEALS = [
  ['b', 'B', 'Breakfast'],
  ['l', 'L', 'Lunch'],
  ['d', 'D', 'Dinner'],
] as const;

// Day-by-day accordion, kept compact: no photos.
// Closed: the day badge, the title ("Arusha → Tarangire") and the hook (or, without one, the route line).
// Open: the story, ✦ the day's highlight, activities, the practical line (driving or flight time), a guide's tip,
// where you sleep (linked to the lodge page, with the lodge's one-line benefit), meals, and an optional add-on.
// Lodge names come only from the stays catalogue, so they match the overview and the lodge pages everywhere.
// Built on <details>, so it works without JavaScript; day 1 starts open. DayControls adds Expand all / Collapse all.
export default function DayByDay({ days, stays, places, quoteAfterDay, quote }: Props) {
  // Where each day starts: the place the previous day ended.
  const ends = days.map((d) => (d.stay ? stays.get(d.stay)?.place : undefined) ?? d.places.at(-1)!);

  return (
    <div>
      <DayControls />
      <ol id="day-list" className="mt-3 divide-y divide-deep-teal/15 border-y border-deep-teal/15">
        {days.map((d, i) => {
          const stay = d.stay ? stays.get(d.stay) : undefined;
          const path = [i > 0 ? ends[i - 1] : undefined, ...d.places].filter((p, j, all): p is string => !!p && p !== all[j - 1]);
          const route = [path.map((p) => places.get(p)?.name ?? p).join(' → '), d.driveHours && `about ${d.driveHours} h driving`]
            .filter(Boolean)
            .join(' · ');
          const practical = d.practical ?? (d.driveHours ? `About ${d.driveHours} h driving` : undefined);
          return [
            // The id is the anchor other links jump to.
            <li key={d.day} id={`day-${d.day}`} className="scroll-mt-28">
              <details className="group py-4" open={i === 0} data-day={d.day}>
                <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="mt-0.5 shrink-0 rounded-full bg-deep-teal px-3 py-1 text-step--1 font-medium text-cream">
                    Day {d.day}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-step-1 font-medium text-heading">{d.title}</span>
                    {d.hook ? (
                      <span className="block font-display text-step-0 italic text-slate">{d.hook}</span>
                    ) : (
                      <span className="block text-step--1 text-slate">{route}</span>
                    )}
                  </span>
                  <span aria-hidden="true" className="mt-1 text-xl leading-none text-gold-ink transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="mt-4 space-y-4 pl-0 sm:pl-[4.75rem]">
                  <p className="measure text-ink">{d.description}</p>

                  {d.highlight && (
                    <p className="flex gap-2 font-medium text-heading">
                      <span aria-hidden="true" className="text-gold-ink">
                        ✦
                      </span>
                      <span>
                        <span className="sr-only">Day highlight: </span>
                        {d.highlight}
                      </span>
                    </p>
                  )}

                  {d.trek && (
                    <dl className="grid grid-cols-2 gap-3 rounded-lg bg-sand p-4 text-step--1 sm:grid-cols-4">
                      {[
                        ['Highest point', `${d.trek.maxAltM.toLocaleString('en-GB')} m`],
                        ['Sleep at', `${d.trek.sleepAltM.toLocaleString('en-GB')} m`],
                        ['Walking', `about ${d.trek.hikeHours} h`],
                        ['Distance', `about ${d.trek.distanceKm} km`],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-slate">{k}</dt>
                          <dd className="font-medium text-deep-teal">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {d.activities.length > 0 && (
                    <ul className="grid gap-1 text-step--1 text-ink sm:grid-cols-2" aria-label="Activities">
                      {d.activities.map((a) => (
                        <li key={a} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-ink" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}

                  {practical && (
                    <p className="flex items-center gap-2 text-step--1 text-slate">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden="true"
                      >
                        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3 2" strokeLinecap="round" />
                      </svg>
                      {practical}
                    </p>
                  )}

                  {d.guideTip && (
                    <aside className="rounded-lg border-l-2 border-gold-ink bg-sand/60 px-4 py-3 text-step--1">
                      <p className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-gold-ink">Guide&apos;s tip</p>
                      <p className="mt-1 text-ink">{d.guideTip}</p>
                    </aside>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-deep-teal/10 pt-4 text-step--1">
                    <p>
                      {stay ? (
                        <>
                          <span className="text-slate">Overnight: </span>
                          {stay.accommodation ? (
                            <Link href={`/accommodations/${stay.accommodation}`} className="trip-link font-medium">
                              {stay.name}
                            </Link>
                          ) : (
                            <span className="font-medium text-heading">{stay.name}</span>
                          )}
                          {stay.benefit && <span className="text-ink"> — {stay.benefit}</span>}{' '}
                          <span className="ml-0.5 text-slate/80">(or similar)</span>
                        </>
                      ) : (
                        <span className="text-slate">End of the trip</span>
                      )}
                    </p>
                    <ul className="flex items-center gap-1.5" aria-label="Meals">
                      {MEALS.map(([key, short, long]) => (
                        <li
                          key={key}
                          title={`${long} ${d.meals[key] ? 'included' : 'not included'}`}
                          className={`grid size-7 place-items-center rounded-full text-[12px] font-medium ${
                            d.meals[key] ? 'bg-badge text-on-badge' : 'border border-slate/40 text-slate line-through'
                          }`}
                        >
                          <span aria-hidden="true">{short}</span>
                          <span className="sr-only">
                            {long} {d.meals[key] ? 'included' : 'not included'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {d.addOn && (
                    <p className="text-step--1 text-slate">
                      <span className="font-medium text-heading">Add-on:</span> {d.addOn.text}
                      {d.addOn.priceFromUsd ? ` (from $${d.addOn.priceFromUsd.toLocaleString('en-US')} pp)` : ''}{' '}
                      <a href="#book" className="trip-link">
                        ask us
                      </a>
                    </p>
                  )}
                </div>
              </details>
            </li>,
            quote && quoteAfterDay === d.day ? (
              <li key="quote" className="py-6">
                {quote}
              </li>
            ) : null,
          ];
        })}
      </ol>
    </div>
  );
}
