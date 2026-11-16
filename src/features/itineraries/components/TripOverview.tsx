import Link from 'next/link';
import type { Stop } from '@/types/content';
import { levelLabel, monthRanges, stayTypeLabel, tierLabel } from '../labels';
import type { Itinerary, Stay } from '../schema';

export type StayRun = { stay: Stay; place: string; nights: number };

type Props = {
  it: Itinerary;
  stops: Stop[];
  stayRuns: StayRun[];
  start?: string;
  end?: string;
  price?: { label: string; isPlaceholder: boolean };
};

const nightsLabel = (n: number) => `${n} night${n === 1 ? '' : 's'}`;
/** "Luxury lodge", "Mid-range tented camp", "Mountain hut". */
export const stayCategory = (s: Stay) =>
  s.level === 'mountain' ? stayTypeLabel[s.type] : `${levelLabel[s.level]} ${stayTypeLabel[s.type].toLowerCase()}`;

// Trip overview, straight after the hero: the briefing, key facts, the route in order, where you sleep,
// then highlights and who it suits. Everything comes from the tour data; missing facts are left out.
export default function TripOverview({ it, stops, stayRuns, start, end, price }: Props) {
  const nights = it.itinerary.filter((d) => d.stay).length;
  const facts = [
    { icon: 'clock', label: 'Duration', value: `${it.days} day${it.days === 1 ? '' : 's'}${nights ? ` / ${nightsLabel(nights)}` : ''}` },
    start && end && { icon: 'route', label: 'Start → end', value: start === end ? start : `${start} → ${end}` },
    { icon: 'compass', label: 'Travel style', value: it.travelStyle },
    { icon: 'tag', label: 'Level', value: tierLabel[it.tier] },
    it.bestMonths.length > 0 && { icon: 'sun', label: 'Best time', value: monthRanges(it.bestMonths) },
  ].filter(Boolean) as { icon: keyof typeof icons; label: string; value: string }[];

  return (
    <section aria-labelledby="overview-heading" className="wrap py-section">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-gold-ink">Trip overview</p>
        <h2 id="overview-heading" className="mt-3 text-step-4 text-ink">
          Your journey at a glance
        </h2>
        <p className="mx-auto mt-5 max-w-[62ch] text-ink">{it.summary}</p>
        {price && (
          <p className="mx-auto mt-5 max-w-[62ch] text-step--1 text-slate">
            <span className="text-step-0 font-medium text-heading">From {price.label} per person</span>
            {price.isPlaceholder ? ' (to be confirmed)' : ''} · Includes{' '}
            {it.included
              .slice(0, 3)
              .map((x) => x.charAt(0).toLowerCase() + x.slice(1))
              .join(', ')}
            .{' '}
            <a href="#included" className="trip-link">
              See everything included
            </a>
          </p>
        )}
      </div>

      {/* At a glance */}
      <dl className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-deep-teal/10 bg-deep-teal/10 lg:grid-cols-5 [&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-1.5 bg-paper px-4 py-5 text-center">
            <Icon name={f.icon} />
            <dt className="text-step--1 text-slate">{f.label}</dt>
            <dd className="font-medium text-heading">{f.value}</dd>
          </div>
        ))}
      </dl>

      {/* Where you'll go: the stops in order, nights at each. Horizontal from 768px, a vertical list on phones. */}
      <div className="mt-14">
        <h3 className="text-step-2 text-ink">Where you&apos;ll go</h3>
        <ol className="route-line mt-6">
          {stops.map((s, i) => (
            <li key={`${s.place}-${i}`} className="route-line__stop">
              <span aria-hidden="true" className="route-line__dot">
                {i + 1}
              </span>
              <span className="route-line__text">
                <span className="block font-medium text-heading">{s.place}</span>
                <span className="block text-step--1 text-slate">
                  {s.nights > 0 ? nightsLabel(s.nights) : i === 0 ? 'Start' : i === stops.length - 1 ? 'End' : 'Passing through'}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Where you'll stay: each lodge once, with its nights; names link to the lodge page when there is one. */}
        {stayRuns.length > 0 && (
          <div>
            <h3 className="text-step-2 text-ink">Where you&apos;ll stay</h3>
            <ul className="mt-6 divide-y divide-deep-teal/10 rounded-2xl border border-deep-teal/10 bg-white">
              {stayRuns.map((r, i) => (
                <li key={`${r.stay.slug}-${i}`} className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    {r.stay.accommodation ? (
                      <Link href={`/accommodations/${r.stay.accommodation}`} className="trip-link font-medium">
                        {r.stay.name}
                      </Link>
                    ) : (
                      <p className="font-medium text-heading">{r.stay.name}</p>
                    )}
                    <p className="text-step--1 text-slate">
                      {r.place} · <span className="whitespace-nowrap">{stayCategory(r.stay)}</span>
                    </p>
                  </div>
                  <p className="shrink-0 whitespace-nowrap text-step--1 font-medium text-heading">{nightsLabel(r.nights)}</p>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-step--1 text-slate">Or similar, depending on availability.</p>
          </div>
        )}

        {/* Highlights and who it suits */}
        <div className="grid content-start gap-8 rounded-2xl bg-sand/50 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-1">
          <div>
            <h3 className="font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-gold-ink">Highlights</h3>
            <ul className="mt-4 space-y-2">
              {it.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-ink" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          {it.idealFor.length > 0 && (
            <div>
              <h3 className="font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-gold-ink">Ideal for</h3>
              <ul className="mt-4 space-y-2">
                {it.idealFor.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-ink" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Small line icons for the key facts.
const icons = {
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3 2',
  route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M8 17h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M15.5 8.5l-2 5-5 2 2-5z',
  tag: 'M3.5 12.5V4.5h8l9 9-8 8z M8 9h.01',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M12 2.5v2 M12 19.5v2 M4.6 4.6l1.4 1.4 M18 18l1.4 1.4 M2.5 12h2 M19.5 12h2 M4.6 19.4 6 18 M18 6l1.4-1.4',
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-gold-ink"
    >
      <path d={icons[name]} />
    </svg>
  );
}
