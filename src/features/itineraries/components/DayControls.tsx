'use client';

import { useEffect, useState } from 'react';

// "Expand all / Collapse all" for the day-by-day list (#day-list).
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
    list.addEventListener('toggle', sync, true);
    return () => list.removeEventListener('toggle', sync, true);
  }, []);

  const setAll = (open: boolean) => {
    document.querySelectorAll<HTMLDetailsElement>('#day-list details').forEach((d) => {
      if (d.open !== open) d.open = open;
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
