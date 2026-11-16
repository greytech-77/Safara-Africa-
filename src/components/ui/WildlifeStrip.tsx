'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { wildlifePhotos, type WildlifePhoto } from '@/content/wildlife-photos';

// Heights of the 5-step rhythm (px). Must match the .wildlife-strip__item rules in globals.css; used here for `sizes`.
const MOBILE = [210, 320, 250, 280, 220];
const DESKTOP = [290, 420, 350, 380, 270];
const ADVANCE_MS = 3000;

// The user's motion setting, kept in sync if it changes. Treated as "reduce" on the server so nothing auto-plays early.
const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => true,
  );

// "Wildlife you may see" on a park page: a dark band with a header and prev/next arrows, then one edge-to-edge row
// of photos at their natural shape, staggered by a repeating 5-step height rhythm. It moves on by one photo every
// 3 seconds and loops, pausing on hover, keyboard focus, touch or swipe, and when the tab is hidden; with reduced
// motion it never moves by itself. When the photos fit on screen they are centred, with no arrows and no auto-advance.
// Every park shows five photos (or as many as exist): one per species in the park's order, then second photos and
// so on, so a park with only chimpanzees still gets five chimpanzee moments. Species not shown, and the park's note,
// are listed under the strip. Photo credits are on /photo-credits.
const PER_PARK = 5;

function pickPhotos(species: string[]) {
  const lists = species.map((s) => ({ s, list: wildlifePhotos[s] ?? [] })).filter((x) => x.list.length > 0);
  const out: { species: string; photo: WildlifePhoto }[] = [];
  for (let round = 0; out.length < PER_PARK; round++) {
    const before = out.length;
    for (const { s, list } of lists) {
      if (out.length < PER_PARK && list[round]) out.push({ species: s, photo: list[round] });
    }
    if (out.length === before) break;
  }
  return out;
}

export default function WildlifeStrip({
  title,
  species,
  note,
  empty,
}: {
  title: string;
  species: string[];
  note?: string;
  // Shown instead of the strip when the park has no wildlife list yet.
  empty?: React.ReactNode;
}) {
  const photos = pickPhotos(species);
  const shown = new Set(photos.map((p) => p.species));
  const rest = species.filter((s) => !shown.has(s));

  const scroller = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLUListElement>(null);
  // null until measured: arrows stay hidden and the row is not centred until we know whether it overflows.
  const [fits, setFits] = useState<boolean | null>(null);
  const reduced = useReducedMotion();
  // Reasons to hold still (hover, focus, touch, wheel); auto-advance runs only when this is empty.
  const holds = useRef(new Set<string>());
  const wheelTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const hold = (reason: string, on: boolean) => {
    if (on) holds.current.add(reason);
    else holds.current.delete(reason);
  };

  useEffect(() => {
    const el = scroller.current;
    const inner = row.current;
    if (!el || !inner) return;
    // Fires once on observe, then on every resize of the scroller or the row.
    const ro = new ResizeObserver(() => setFits(inner.scrollWidth <= el.clientWidth + 1));
    ro.observe(el);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  // Scroll so the next (or previous) photo lines up with the container edge. Loops at either end.
  const go = useCallback(
    (dir: 1 | -1) => {
      const el = scroller.current;
      const inner = row.current;
      if (!el || !inner) return;
      const pad = parseFloat(getComputedStyle(inner).paddingLeft);
      const max = el.scrollWidth - el.clientWidth;
      const x = el.scrollLeft;
      const lefts = Array.from(inner.children, (li) => Math.min(max, (li as HTMLElement).offsetLeft - pad));
      let target: number;
      if (dir > 0) target = x >= max - 2 ? 0 : (lefts.find((l) => l > x + 2) ?? max);
      else target = x <= 2 ? max : ([...lefts].reverse().find((l) => l < x - 2) ?? 0);
      el.scrollTo({ left: target, behavior: reduced ? 'auto' : 'smooth' });
    },
    [reduced],
  );

  useEffect(() => {
    if (fits !== false || reduced) return;
    const timer = setInterval(() => {
      if (holds.current.size === 0 && !document.hidden) go(1);
    }, ADVANCE_MS);
    return () => clearInterval(timer);
  }, [fits, reduced, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      go(e.key === 'ArrowRight' ? 1 : -1);
    }
  };

  return (
    <section
      id="wildlife"
      className="band wildlife-band scroll-mt-32 bg-deep-teal text-cream"
      aria-labelledby="wildlife-heading"
      onMouseEnter={() => hold('hover', true)}
      onMouseLeave={() => hold('hover', false)}
      onFocus={() => hold('focus', true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hold('focus', false);
      }}
    >
      <div className="wrap flex items-end justify-between gap-6">
        <h2 id="wildlife-heading" className="text-step-4 text-cream">
          {title}
        </h2>
        {fits === false && (
          <div className="hidden shrink-0 gap-3 md:flex">
            <Arrow dir={-1} onClick={() => go(-1)} />
            <Arrow dir={1} onClick={() => go(1)} />
          </div>
        )}
      </div>

      {photos.length > 0 && (
        <div
          ref={scroller}
          role="region"
          aria-label="Wildlife photos"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={() => hold('touch', true)}
          onPointerUp={() => hold('touch', false)}
          onPointerCancel={() => hold('touch', false)}
          onTouchStart={() => hold('touch', true)}
          onTouchEnd={() => setTimeout(() => hold('touch', false), 1500)}
          onWheel={() => {
            hold('wheel', true);
            clearTimeout(wheelTimer.current);
            wheelTimer.current = setTimeout(() => hold('wheel', false), 2000);
          }}
          data-fits={fits ? '' : undefined}
          className="wildlife-strip mt-8"
        >
          <ul ref={row} className="wildlife-strip__row">
            {photos.map(({ species: s, photo: p }, i) => {
              const ratio = p.width / p.height;
              const sizes = `(min-width: 768px) ${Math.ceil(DESKTOP[i % 5] * ratio)}px, ${Math.ceil(MOBILE[i % 5] * ratio)}px`;
              return (
                <li key={p.src} className="wildlife-strip__item">
                  <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes={sizes} className="wildlife-strip__img" />
                  <span className="wildlife-strip__caption">{s}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {(rest.length > 0 || note || (species.length === 0 && empty)) && (
        <div className="wrap mt-8 space-y-3">
          {rest.length > 0 && (
            <p className="measure text-cream/85">
              <span className="font-bold text-gold">{photos.length > 0 ? 'Also look out for: ' : 'You may see: '}</span>
              {rest.join(', ')}
            </p>
          )}
          {note && <p className="measure text-cream/85">{note}</p>}
          {species.length === 0 && empty}
        </div>
      )}
    </section>
  );
}

function Arrow({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir > 0 ? 'Next photo' : 'Previous photo'}
      className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/20 text-cream transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-on-gold"
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
