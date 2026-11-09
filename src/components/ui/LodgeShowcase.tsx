'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Img } from '@/types/content';

export type LodgeTile = { slug: string; name: string; area: string; country: string; countryName: string; image: Img };

// Lodges and camps: country filters above a grid of photo tiles.
// Each tile is a single link with the place and the lodge name under the photo.
// With `limit` (home page) only that many show, and "Show all" opens /accommodations on the same country.
export default function LodgeShowcase({
  lodges,
  countries,
  limit,
  initialCountry = 'all',
}: {
  lodges: LodgeTile[];
  countries: { slug: string; name: string }[];
  limit?: number;
  initialCountry?: string;
}) {
  const [country, setCountry] = useState(countries.some((c) => c.slug === initialCountry) ? initialCountry : 'all');
  const matching = country === 'all' ? lodges : lodges.filter((l) => l.country === country);
  const shown = limit ? matching.slice(0, limit) : matching;
  const filters = [{ slug: 'all', name: 'All' }, ...countries];

  return (
    <>
      {/* Plain text filters; the active one is dark with a gold bar underneath. Scrolls sideways on narrow screens. */}
      <div
        role="group"
        aria-label="Filter by country"
        className="flex flex-nowrap gap-x-12 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:shrink-0"
      >
        {filters.map((f) => {
          const active = f.slug === country;
          return (
            <button
              key={f.slug}
              type="button"
              aria-pressed={active}
              onClick={() => setCountry(f.slug)}
              className={`relative cursor-pointer py-2 text-[1.125rem] font-bold leading-snug transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-gold after:transition-opacity after:duration-500 after:content-[''] ${
                active ? 'text-ink after:opacity-100' : 'text-slate after:opacity-0 hover:text-ink'
              }`}
            >
              {f.name}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} lodges and camps shown
      </p>

      {/* The key replays the fade-in when the filter changes. */}
      {/* Tall photos with square corners, then the place and the name. On hover a fine line draws under the name. */}
      <ul key={country} className="crossfade mt-10 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
        {shown.map((l) => (
          <li key={l.slug}>
            <Link href={`/accommodations/${l.slug}`} className="lodge-card">
              <div className="lodge-card__photo">
                <Image src={l.image.src} alt={l.image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="lodge-card__text">
                <p className="lodge-card__place">
                  {l.area}, {l.countryName}
                </p>
                <h3 className="lodge-card__name">{l.name}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {limit && lodges.length > limit && (
        <div className="mt-10 text-center">
          <Link
            href={country === 'all' ? '/accommodations' : `/accommodations?country=${country}`}
            className="btn btn-outline text-deep-teal"
          >
            Show all {lodges.length} lodges and camps
          </Link>
        </div>
      )}
    </>
  );
}
