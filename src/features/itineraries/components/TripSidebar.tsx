'use client';

import { useEffect, useRef, useState } from 'react';

// Right column of the tour page from 1024px: the booking form, shown in full (never scrolling inside itself).
// It stays pinned below the header while the days scroll by (when the whole form fits on the screen). When the
// visitor reaches the last day it is released and scrolls away with the page, and from then on it stays in its
// place beside the last day: scrolling back up does not pin it again. On a screen too short for the whole form it is never pinned.
// Below 1024px the wrapper is display: contents, so the form becomes an item of the page grid after the day by day.
export default function TripSidebar({ form }: { form: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(true);
  const [released, setReleased] = useState(false);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    // --header-h may be written in px or rem.
    const headerH = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h').trim();
      return (raw.endsWith('rem') ? parseFloat(raw) * 16 : parseFloat(raw)) || 96;
    };
    const check = () => setFits(el.offsetHeight + headerH() + 16 + 4 <= window.innerHeight);
    // While pinned, the form's top sits at header + 16px. Once the end of the days pushes it above that line,
    // the visitor has reached the last day: release it for good.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (getComputedStyle(el).position !== 'sticky') return;
        if (el.getBoundingClientRect().top < headerH() + 16 - 2) setReleased(true);
      });
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    window.addEventListener('resize', check);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', check);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const pinned = fits && !released;
  return (
    <div className="contents lg:col-start-2 lg:row-start-1 lg:flex lg:flex-col">
      <div
        ref={inner}
        className={`order-3 lg:block ${pinned ? 'lg:sticky lg:top-[calc(var(--header-h)+16px)]' : released ? 'lg:mt-auto' : ''}`}
      >
        {form}
      </div>
    </div>
  );
}
