import Image from 'next/image';
import Link from 'next/link';
import type { Img } from '@/types/content';
import { levelLabel, stayTypeLabel } from '../labels';
import type { ItineraryDay, Place, Stay } from '../schema';

type Props = { days: ItineraryDay[]; stays: Map<string, Stay>; places: Map<string, Place>; images: Map<number, Img> };

const MEALS = [
  ['b', 'B', 'Breakfast'],
  ['l', 'L', 'Lunch'],
  ['d', 'D', 'Dinner'],
] as const;

const label = 'text-step--1 font-semibold uppercase tracking-[0.08em] text-ink';

// Day-by-day accordion: each day opens to a photo, the day's summary and where you stay.
// Built on <details>, so it works without JavaScript; day 1 starts open.
export default function DayByDay({ days, stays, places, images }: Props) {
  return (
    <ol className="divide-y divide-deep-teal/15 border-y border-deep-teal/15">
      {days.map((d, i) => {
        const stay = d.stay ? stays.get(d.stay) : undefined;
        const image = images.get(d.day);
        const parkNames = [
          ...new Set(
            d.places
              .map((p) => places.get(p)!)
              .filter((p) => p.kind === 'park')
              .map((p) => p.name),
          ),
        ];
        return (
          // The id is the anchor the route map links to and tracks while scrolling.
          <li key={d.day} id={`day-${d.day}`} className="scroll-mt-8">
            <details className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start gap-4">
                <span className="mt-0.5 shrink-0 rounded-full bg-deep-teal px-3 py-1 text-step--1 font-bold text-cream">Day {d.day}</span>
                <span className="flex-1">
                  <span className="block text-step-1 font-semibold text-deep-teal">{d.title}</span>
                  <span className="block text-step--1 text-slate">{stay ? `Overnight: ${stay.name}` : 'End of the trip'}</span>
                </span>
                <span aria-hidden="true" className="mt-1 text-gold-ink transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="mt-5 space-y-6">
                {image && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-sand">
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className={label}>Day summary</h3>
                  {(d.driveHours || parkNames.length > 0) && (
                    <p className="text-step--1 font-semibold text-deep-teal">
                      {[d.driveHours && `About ${d.driveHours} h driving`, parkNames.length > 0 && parkNames.join(', ')]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
                  <p className="measure text-ink">{d.description}</p>

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
                          <dd className="font-bold text-deep-teal">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {d.activities.length > 0 && (
                    <ul className="flex flex-wrap gap-2" aria-label="Activities">
                      {d.activities.map((a) => (
                        <li key={a} className="rounded-full bg-sand px-3 py-1 text-step--1 font-semibold text-deep-teal">
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-wrap items-stretch gap-4">
                  {stay && (
                    <div className="min-w-60 flex-1 rounded-lg border border-deep-teal/15 bg-white p-4">
                      <h3 className={label}>Accommodation</h3>
                      <p className="mt-2 text-step-1 font-semibold text-deep-teal">
                        {stay.name} <span className="text-step--1 font-normal text-slate">or similar</span>
                      </p>
                      <p className="text-step--1 text-ink">
                        {stay.level === 'mountain' ? stayTypeLabel[stay.type] : `${levelLabel[stay.level]} · ${stayTypeLabel[stay.type]}`}
                      </p>
                      {stay.accommodation && (
                        <Link
                          href={`/accommodations/${stay.accommodation}`}
                          className="mt-3 inline-block font-bold text-deep-teal underline underline-offset-4 transition-colors duration-300 hover:text-gold-ink"
                        >
                          See more about this lodge <span className="arrow">→</span>
                        </Link>
                      )}
                    </div>
                  )}
                  <div className="rounded-lg border border-deep-teal/15 bg-white p-4">
                    <p className={label}>Meals</p>
                    <ul className="mt-2 flex gap-1.5">
                      {MEALS.map(([key, short, long]) => (
                        <li
                          key={key}
                          title={long}
                          className={`grid size-8 place-items-center rounded-full text-step--1 font-bold ${d.meals[key] ? 'bg-badge text-on-badge' : 'bg-sand text-slate line-through'}`}
                        >
                          <span aria-hidden="true">{short}</span>
                          <span className="sr-only">
                            {long} {d.meals[key] ? 'included' : 'not included'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </details>
          </li>
        );
      })}
    </ol>
  );
}
