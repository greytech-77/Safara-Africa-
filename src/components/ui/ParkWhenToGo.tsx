import { DrySeasonSunsetIcon, GreenSeasonIcon } from '@/components/park-highlights/ParkHighlightIcons';
import type { WhenToGo } from '@/content/park-guides';
import { monthRanges } from '@/lib/season-months';
import type { MonthRating } from '@/types/content';

// "When to go" on a park page: eyebrow and headline, a short intro, two season columns (dry and green) with a line
// icon each.
// Season months come from the park's month ratings in parks.ts (Best = dry season, Mixed = green season).
// Parks without `whenToGo` content show their one-line `bestTime` as the intro.
export default function ParkWhenToGo({
  parkName,
  months,
  bestTime,
  content,
  className = '',
}: {
  parkName: string;
  months: MonthRating[];
  bestTime: string;
  content?: WhenToGo;
  className?: string;
}) {
  const intro = content?.intro.length ? content.intro : bestTime ? [bestTime] : [];
  const seasons = [
    {
      key: 'dry',
      Icon: DrySeasonSunsetIcon,
      title: content?.dry?.title ?? 'Dry season',
      months: monthRanges(months, 'best'),
      bestFor: content?.dry?.bestFor,
    },
    {
      key: 'green',
      Icon: GreenSeasonIcon,
      title: content?.green?.title ?? 'Green season',
      months: monthRanges(months, 'mixed'),
      bestFor: content?.green?.bestFor,
    },
  ].filter((s) => s.months);

  return (
    <section id="when" className={`band scroll-mt-32 ${className}`} aria-labelledby="when-heading">
      <div className="wrap">
        <div className="mx-auto max-w-[830px] text-center">
          <p className="text-step--1 font-bold uppercase tracking-[0.14em] text-gold-ink">When to go</p>
          <h2 id="when-heading" className="mt-1 text-step-4 text-ink">
            Best time to visit {parkName}
          </h2>
          {intro.length > 0 && (
            <div className="mx-auto mt-5 max-w-[65ch] space-y-4 text-[1.25rem] font-light leading-relaxed text-ink">
              {intro.map((t) => (
                <p key={t.slice(0, 40)}>{t}</p>
              ))}
            </div>
          )}

          {seasons.length > 0 && (
            <div className="mt-12 grid justify-center gap-x-16 gap-y-10 sm:grid-cols-[repeat(2,minmax(0,16.25rem))]">
              {seasons.map(({ key, Icon, title, months: when, bestFor }) => (
                <div key={key}>
                  <Icon size={64} className="mx-auto text-gold-ink" />
                  <h3 className="mt-4 text-step-3 text-ink">{title}</h3>
                  <p className="mt-2 text-ink">{when}</p>
                  {bestFor && <p className="mt-2 text-gold-ink">Best for: {bestFor}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
