'use client';

import { useEffect, useState } from 'react';

// "Expand all / Collapse all" for the day-by-day list (#day-list), and the link to the route map: when a day is
// opened, an `itinerary:day` event tells RouteProgressMap to move to that day.
export default function DayControls() {
  const [allOpen, setAllOpen] = useState(false);

  useEffect(() => {
    const list = document.getElementById('day-list');
    if (!list) return;
    const sync = () => {
      const all = [...list.querySelectorAll('details')];
      setAllOpen(all.length > 0 && all.every((d) => d.open));
    };
    // `toggle` does not bubble, so listen in the capture phase.
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement;
      if (d.dataset.bulk !== undefined) delete d.dataset.bulk;
      else if (d.open && d.dataset.day) window.dispatchEvent(new CustomEvent('itinerary:day', { detail: Number(d.dataset.day) }));
      sync();
    };
    list.addEventListener('toggle', onToggle, true);
    return () => list.removeEventListener('toggle', onToggle, true);
  }, []);

  const setAll = (open: boolean) => {
    document.querySelectorAll<HTMLDetailsElement>('#day-list details').forEach((d) => {
      if (d.open !== open) {
        // Opening many days at once should not jump the map around.
        d.dataset.bulk = '';
        d.open = open;
      }
    });
    setAllOpen(open);
  };

  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={() => setAll(!allOpen)}
        aria-controls="day-list"
        className="cursor-pointer text-step--1 font-medium text-gold-ink underline-offset-4 hover:underline"
      >
        {allOpen ? 'Collapse all' : 'Expand all'}
      </button>
    </div>
  );
}
