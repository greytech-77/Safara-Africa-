'use client';

import { useRef, useState } from 'react';
import type { Testimonial } from '@/content/testimonials';

// One review at a time on a soft card, with previous/next arrows either side.
// Reviews crossfade; the card can also be swiped or dragged.
export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  if (items.length === 0) return null;
  const t = items[index];
  const go = (step: number) => setIndex((i) => (i + step + items.length) % items.length);

  const arrow = (step: number, label: string, d: string) => (
    <button
      type="button"
      onClick={() => go(step)}
      aria-label={label}
      className="group/arrow grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-ink text-ink transition-colors duration-300 hover:bg-ink hover:text-salt sm:size-12"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-5 transition-transform duration-300 ${step < 0 ? 'group-hover/arrow:-translate-x-1' : 'group-hover/arrow:translate-x-1'}`}>
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  const prev = arrow(-1, 'Previous review', 'M16 10H4m5-5-5 5 5 5');
  const next = arrow(1, 'Next review', 'M4 10h12m-5-5 5 5-5 5');

  return (
    <div>
      <div className="flex items-center gap-8">
        <div className="hidden sm:block">{prev}</div>

        <div
          aria-live="polite"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
          className="flex-1 touch-pan-y bg-white px-6 py-10 text-center select-none sm:px-12 sm:py-12"
        >
          <figure key={index} className="crossfade">
            <h3 className="text-step-3 text-ink">“{t.title}”</h3>
            <blockquote className="mx-auto mt-5 max-w-[60ch] leading-relaxed text-ink/85">
              <p>{t.quote}</p>
            </blockquote>
            <p className="mt-6 flex justify-center gap-1 text-ink" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} aria-hidden="true" viewBox="0 0 16 16" className={`size-4.5 ${i < t.rating ? 'fill-current' : 'fill-ink/20'}`}>
                  <path d="M8 1.2 10 5.6l4.7.5-3.5 3.2 1 4.7L8 11.6l-4.2 2.4 1-4.7L1.3 6.1 6 5.6z" />
                </svg>
              ))}
            </p>
            <figcaption className="mt-4">
              <span className="block font-bold text-ink">{t.name}</span>
              <span className="block text-step--1 text-slate">Published {t.source}</span>
            </figcaption>
          </figure>
        </div>

        <div className="hidden sm:block">{next}</div>
      </div>
      {/* Phones: arrows sit under the card. */}
      <div className="mt-5 flex justify-center gap-4 sm:hidden">{prev}{next}</div>
    </div>
  );
}
