'use client';

import { useEffect, useState } from 'react';
import TourCard from './TourCard';
import type { Tour } from '@/lib/content';

const label = (slug: string) => slug.charAt(0).toUpperCase() + slug.slice(1);

// Grid of tour cards. With `filters`, tabs above it narrow the grid by country;
// a ?country=kenya link opens on that tab.
export default function TourGrid({ tours, filters = false }: { tours: Tour[]; filters?: boolean }) {
  const countries = [...new Set(tours.map((t) => t.country))];
  const [active, setActive] = useState<string>('all');
  const shown = active === 'all' ? tours : tours.filter((t) => t.country === active);
  const tab = 'rounded-full border px-5 py-2 text-step--1 font-bold transition-colors';

  useEffect(() => {
    if (!filters) return;
    const c = new URLSearchParams(window.location.search).get('country');
    if (c && countries.includes(c)) setActive(c);
  }, []);

  return (
    <>
      {filters && countries.length > 1 && (
        <div role="group" aria-label="Filter journeys by country" className="mb-8 flex flex-wrap gap-2">
          {['all', ...countries].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
              className={`${tab} ${active === c ? 'border-navy bg-navy text-salt' : 'border-navy/25 text-navy hover:border-navy'}`}
            >
              {c === 'all' ? 'All journeys' : label(c)}
            </button>
          ))}
        </div>
      )}
      <div data-reveal-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t) => <TourCard key={t.slug} tour={t} />)}
      </div>
    </>
  );
}
