'use client';

import { useEffect, useState } from 'react';

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Twelve month buttons; the chosen month shows its description and tags. Opens on the current month.
export default function MonthPicker({ months }: { months: { text: string; tags: string[] }[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => setActive(new Date().getMonth()), []);
  const m = months[active];

  return (
    <div>
      <div role="group" aria-label="Choose a month" className="grid grid-cols-6 gap-2 sm:grid-cols-12">
        {MONTHS.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            className={`rounded-lg border py-2.5 text-step--1 font-bold transition-colors ${active === i ? 'border-deep-teal bg-deep-teal text-salt' : 'border-deep-teal/20 bg-white text-deep-teal hover:border-deep-teal'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-6 bg-white p-6 shadow-[0_4px_3px_rgb(0_0_0/.08)] sm:p-8">
        <h3 className="text-step-2 text-ink">{FULL[active]}</h3>
        <p className="measure mt-2 text-ink">{m.text}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {m.tags.map((t) => (
            <li key={t} className="rounded-full bg-salt-deep px-3 py-1 text-step--1 font-semibold text-deep-teal">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
