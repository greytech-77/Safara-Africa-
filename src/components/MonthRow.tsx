import type { MonthRating } from '@/content/beaches';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const STYLE: Record<MonthRating, { label: string; cls: string }> = {
  best: { label: 'Best', cls: 'bg-gold text-white' },
  good: { label: 'Good', cls: 'bg-sun/35 text-ink' },
  mixed: { label: 'Mixed', cls: 'bg-salt-deep text-slate' },
};

// January–December strip rated Best / Good / Mixed, with a legend.
export default function MonthRow({ months }: { months: MonthRating[] }) {
  return (
    <div>
      <ol className="grid grid-cols-6 gap-2 sm:grid-cols-12">
        {months.map((r, i) => (
          <li key={MONTHS[i]} className={`rounded-lg py-3 text-center text-step--1 font-bold ${STYLE[r].cls}`}>
            {MONTHS[i]}
            <span className="sr-only">: {STYLE[r].label}</span>
          </li>
        ))}
      </ol>
      <ul aria-label="Legend" className="mt-4 flex flex-wrap gap-5 text-step--1 text-slate">
        {(Object.keys(STYLE) as MonthRating[]).map((r) => (
          <li key={r} className="flex items-center gap-2">
            <span aria-hidden="true" className={`inline-block size-3 rounded-sm ${STYLE[r].cls}`} />
            {STYLE[r].label}
          </li>
        ))}
      </ul>
    </div>
  );
}
