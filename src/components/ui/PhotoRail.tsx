'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Img } from '@/types/content';

export type PhotoRailItem = { title: string; text?: string; image: Img; href: string };

// Tall photos in a swipeable row, title and text laid over the bottom of each photo.
// Arrows page through the row on larger screens; phones swipe.
export default function PhotoRail({ items, label }: { items: PhotoRailItem[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const page = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' });

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li key={item.title} className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-2rem)/2.4)] lg:w-[calc((100%-3rem)/3.4)]">
            <Link href={item.href} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-salt-deep">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 78vw"
                className="zoom object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-teal-deep/90 via-teal-deep/30 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="block font-display text-step-3 leading-tight">{item.title}</span>
                {item.text && <span className="mt-2 block text-step--1 text-white/85">{item.text}</span>}
                <span className="mt-3 inline-block text-step--1 font-bold text-sun">
                  Explore <span className="arrow">→</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 hidden justify-end gap-3 sm:flex">
        <Arrow dir={-1} disabled={edges.start} onClick={() => page(-1)} />
        <Arrow dir={1} disabled={edges.end} onClick={() => page(1)} />
      </div>
    </div>
  );
}

function Arrow({ dir, disabled, onClick }: { dir: 1 | -1; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir < 0 ? 'Previous' : 'Next'}
      className="grid size-11 cursor-pointer place-items-center rounded-full border border-deep-teal/30 text-deep-teal transition-colors duration-200 hover:bg-deep-teal hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className={`size-4 ${dir < 0 ? 'rotate-180' : ''}`}>
        <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}
