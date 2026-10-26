'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Scroll reveal. Marks <html> with .js-reveal (the CSS only hides content once this runs),
// then fades in [data-reveal] blocks and the children of [data-reveal-stagger] as they enter the viewport.
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in), [data-reveal-stagger]:not(.is-in)');
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.hasAttribute('data-reveal-stagger')) {
            [...el.children].forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
          }
          el.classList.add('is-in');
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
