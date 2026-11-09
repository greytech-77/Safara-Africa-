'use client';

import { useEffect, useState } from 'react';

export type SectionLink = { id: string; label: string };

// Sticky menu under a hero linking to the sections of a long page.
// The link for the section on screen is underlined. Styles are in globals.css (.section-nav).
export default function SectionNav({ label, links }: { label: string; links: SectionLink[] }) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const visible = new Set<string>();
    // A band just below the header and this menu counts as "on screen".
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const first = links.find((l) => visible.has(l.id));
        // Between sections nothing is in the band: keep the last one underlined.
        if (first) setActive(first.id);
      },
      { rootMargin: '-160px 0px -55% 0px' },
    );
    for (const l of links) {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [links]);

  return (
    <nav aria-label={label} className="section-nav">
      <ul className="section-nav__list wrap">
        {links.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} className="section-nav__link" aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
