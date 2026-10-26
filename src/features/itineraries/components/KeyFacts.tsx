import { difficultyLabel, MONTH_FULL, MONTH_SHORT, monthRanges } from '../labels';
import type { Itinerary } from '../schema';

type Props = {
  it: Itinerary;
  parkNames: string[];
  start: string;
  end: string;
  priceFrom?: { label: string; groupSize: number; isPlaceholder: boolean };
};

// The facts bar under the hero: length, parks, price, best months, difficulty, start and end.
export default function KeyFacts({ it, parkNames, start, end, priceFrom }: Props) {
  const facts: [string, React.ReactNode][] = [
    ['Length', `${it.days} ${it.days === 1 ? 'day' : 'days'}`],
    ['Parks', parkNames.length ? parkNames.join(', ') : '—'],
    [
      'Price from',
      priceFrom ? (
        <>
          {priceFrom.label} <span className="font-normal text-slate">pp, {priceFrom.groupSize} travellers</span>
          {priceFrom.isPlaceholder && <span className="block text-step--1 font-normal text-gold-dark">Placeholder: owner to confirm</span>}
        </>
      ) : (
        'On request'
      ),
    ],
    ['Difficulty', difficultyLabel[it.difficulty]],
    ['Start → end', start === end ? start : `${start} → ${end}`],
  ];

  return (
    <section aria-label="Key facts" className="border-b border-navy/10 bg-white">
      <div className="wrap grid gap-x-8 gap-y-5 py-6 *:min-w-0 sm:grid-cols-2 lg:grid-cols-5">
        {facts.map(([label, value]) => (
          <div key={label}>
            <p className="text-step--1 font-semibold uppercase tracking-[0.08em] text-slate">{label}</p>
            <p className="mt-1 font-bold text-navy">{value}</p>
          </div>
        ))}
        <div className="sm:col-span-2 lg:col-span-5">
          <p className="text-step--1 font-semibold uppercase tracking-[0.08em] text-slate">
            Best months <span className="font-normal normal-case tracking-normal">({monthRanges(it.bestMonths)})</span>
          </p>
          {/* Twelve equal cells that always fit: one letter on phones, three from small screens up. */}
          <ol className="mt-2 grid max-w-3xl grid-cols-12 gap-1" aria-label="Best months to travel">
            {MONTH_SHORT.map((m, i) => {
              const good = it.bestMonths.includes(i + 1);
              return (
                <li
                  key={m}
                  className={`rounded py-1 text-center text-step--1 font-bold ${good ? 'bg-gold text-white' : 'bg-salt-deep text-slate'}`}
                >
                  <span aria-hidden="true" className="sm:hidden">
                    {m[0]}
                  </span>
                  <span className="hidden sm:inline">{m}</span>
                  <span className="sr-only">
                    {MONTH_FULL[i]}: {good ? 'recommended' : 'possible'}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
