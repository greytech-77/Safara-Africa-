import Link from 'next/link';
import { levelLabel, stayTypeLabel } from '../labels';
import type { ItineraryDay, Place, Stay } from '../schema';

type Props = { days: ItineraryDay[]; stays: Map<string, Stay>; places: Map<string, Place> };

const MEALS = [
  ['b', 'B', 'Breakfast'],
  ['l', 'L', 'Lunch'],
  ['d', 'D', 'Dinner'],
] as const;

// Day-by-day accordion. Built on <details>, so it works without JavaScript; day 1 starts open.
export default function DayByDay({ days, stays, places }: Props) {
  return (
    <ol className="divide-y divide-navy/15 border-y border-navy/15">
      {days.map((d, i) => {
        const stay = d.stay ? stays.get(d.stay) : undefined;
        const parkNames = [
          ...new Set(
            d.places
              .map((p) => places.get(p)!)
              .filter((p) => p.kind === 'park')
              .map((p) => p.name),
          ),
        ];
        return (
          <li key={d.day}>
            <details className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start gap-4">
                <span className="mt-0.5 shrink-0 rounded-full bg-navy px-3 py-1 text-step--1 font-bold text-salt">Day {d.day}</span>
                <span className="flex-1">
                  <span className="block text-step-1 font-semibold text-navy">{d.title}</span>
                  <span className="block text-step--1 text-slate">{stay ? `Overnight: ${stay.name}` : 'End of the trip'}</span>
                </span>
                <span aria-hidden="true" className="mt-1 text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="mt-4 space-y-4 pl-0 sm:pl-[5.25rem]">
                {(d.driveHours || parkNames.length > 0) && (
                  <p className="text-step--1 font-semibold text-slate">
                    {[d.driveHours && `About ${d.driveHours} h driving`, parkNames.length > 0 && parkNames.join(', ')]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
                <p className="measure text-ink/90">{d.description}</p>

                {d.trek && (
                  <dl className="grid grid-cols-2 gap-3 rounded-lg bg-salt-deep p-4 text-step--1 sm:grid-cols-4">
                    {[
                      ['Highest point', `${d.trek.maxAltM.toLocaleString('en-GB')} m`],
                      ['Sleep at', `${d.trek.sleepAltM.toLocaleString('en-GB')} m`],
                      ['Walking', `about ${d.trek.hikeHours} h`],
                      ['Distance', `about ${d.trek.distanceKm} km`],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-slate">{k}</dt>
                        <dd className="font-bold text-navy">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {d.activities.length > 0 && (
                  <ul className="flex flex-wrap gap-2" aria-label="Activities">
                    {d.activities.map((a) => (
                      <li key={a} className="rounded-full bg-salt-deep px-3 py-1 text-step--1 font-semibold text-navy">
                        {a}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap items-stretch gap-4">
                  {stay && (
                    <div className="min-w-60 flex-1 rounded-lg border border-navy/15 bg-white p-4">
                      <p className="text-step--1 font-semibold uppercase tracking-[0.08em] text-slate">
                        {stay.level === 'mountain' ? stayTypeLabel[stay.type] : `${levelLabel[stay.level]} · ${stayTypeLabel[stay.type]}`}
                      </p>
                      <p className="mt-1 font-bold text-navy">
                        {stay.accommodation ? (
                          <Link href={`/accommodations/${stay.accommodation}`} className="underline underline-offset-4 hover:text-gold">
                            {stay.name}
                          </Link>
                        ) : (
                          stay.name
                        )}{' '}
                        <span className="font-normal text-slate">or similar</span>
                      </p>
                    </div>
                  )}
                  <div className="rounded-lg border border-navy/15 bg-white p-4">
                    <p className="text-step--1 font-semibold uppercase tracking-[0.08em] text-slate">Meals</p>
                    <ul className="mt-1 flex gap-1.5">
                      {MEALS.map(([key, short, long]) => (
                        <li
                          key={key}
                          title={long}
                          className={`grid size-8 place-items-center rounded-full text-step--1 font-bold ${d.meals[key] ? 'bg-gold text-white' : 'bg-salt-deep text-slate line-through'}`}
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
