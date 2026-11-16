'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { Img } from '@/types/content';

const ADVANCE_MS = 4000; // time between automatic slides
const GLIDE_MS = 1400; // length of each slide: slow and eased

const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
// Treated as "reduce" on the server so nothing moves before the page is interactive.
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => true,
  );
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Lodge photos in one row that slides: one photo further every 4 seconds with a slow glide, looping at the end.
// Prev/next buttons sit below the row; arrow keys work when the row has focus. It holds still while hovered,
// focused or touched, while the tab is hidden, and always for reduced motion (the buttons then jump straight there).
// `note` explains what the photos show when they are not all of the lodge itself. Photo credits are on /photo-credits.
export default function LodgeGallery({ photos, note }: { photos: Img[]; note?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [fits, setFits] = useState<boolean | null>(null);
  const reduced = useReducedMotion();
  const holds = useRef(new Set<string>());
  const frame = useRef(0);

  const hold = (reason: string, on: boolean) => {
    if (on) holds.current.add(reason);
    else holds.current.delete(reason);
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setFits(el.scrollWidth <= el.clientWidth + 1));
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  // Glide to a scroll position over GLIDE_MS (native smooth scrolling is too quick for this effect).
  const glide = useCallback(
    (to: number) => {
      const el = track.current;
      if (!el) return;
      cancelAnimationFrame(frame.current);
      if (reduced) {
        el.scrollLeft = to;
        return;
      }
      const from = el.scrollLeft;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / GLIDE_MS);
        el.scrollLeft = from + (to - from) * easeInOut(t);
        if (t < 1) frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    },
    [reduced],
  );

  // Next or previous photo lined up with the left edge; loops at either end.
  const go = useCallback(
    (dir: 1 | -1) => {
      const el = track.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      const x = el.scrollLeft;
      const lefts = Array.from(el.children, (li) => Math.min(max, (li as HTMLElement).offsetLeft));
      const to =
        dir > 0
          ? x >= max - 2
            ? 0
            : (lefts.find((l) => l > x + 2) ?? max)
          : x <= 2
            ? max
            : ([...lefts].reverse().find((l) => l < x - 2) ?? 0);
      glide(to);
    },
    [glide],
  );

  useEffect(() => {
    if (fits !== false || reduced) return;
    const timer = setInterval(() => {
      if (holds.current.size === 0 && !document.hidden) go(1);
    }, ADVANCE_MS);
    return () => clearInterval(timer);
  }, [fits, reduced, go]);

  return (
    <div
      onMouseEnter={() => hold('hover', true)}
      onMouseLeave={() => hold('hover', false)}
      onFocus={() => hold('focus', true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hold('focus', false);
      }}
    >
      {note && <p className="measure -mt-4 mb-6 text-slate">{note}</p>}
      <ul
        ref={track}
        role="region"
        aria-label="Lodge photos"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            go(e.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        onPointerDown={() => hold('touch', true)}
        onPointerUp={() => hold('touch', false)}
        onPointerCancel={() => hold('touch', false)}
        onTouchStart={() => {
          cancelAnimationFrame(frame.current);
          hold('touch', true);
        }}
        onTouchEnd={() => setTimeout(() => hold('touch', false), 1500)}
        className={`relative flex gap-4 overflow-x-auto [scrollbar-width:none] md:gap-5 [&::-webkit-scrollbar]:hidden ${fits ? 'justify-center' : ''}`}
      >
        {photos.map((p) => (
          <li key={p.src} className="group relative aspect-[8/9] w-[85%] shrink-0 overflow-hidden bg-sand sm:w-[48%] lg:w-[32%]">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 85vw"
              className="zoom object-cover"
            />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        {fits === false ? (
          <div className="flex gap-3">
            <Arrow dir={-1} onClick={() => go(-1)} />
            <Arrow dir={1} onClick={() => go(1)} />
          </div>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir > 0 ? 'Next photo' : 'Previous photo'}
      className="grid size-12 cursor-pointer place-items-center rounded-full border border-deep-teal/30 text-deep-teal transition-colors duration-300 hover:border-deep-teal hover:bg-deep-teal hover:text-cream"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`size-5 ${dir < 0 ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
