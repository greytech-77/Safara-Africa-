'use client';

import { useEffect, useRef, useState } from 'react';

// Scroll behaviour for the site header.
// Over a hero it starts transparent; elsewhere it starts solid.
// Scrolling down past the top hides it, scrolling up brings it back solid.
export default function HeaderShell({ overlay, children }: { overlay: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState({ hidden: false, solid: !overlay });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      // Keep it in place while a mega-menu panel is open.
      const menuOpen = !!ref.current?.querySelector('[aria-expanded="true"]');
      let hidden: boolean;
      if (y < 50) hidden = false;
      else if (Math.abs(y - lastY) < 4) {
        lastY = y;
        return;
      } else hidden = y > lastY && !menuOpen;
      const solid = !overlay || (y >= 50 && !hidden) || (y >= 50 && menuOpen);
      lastY = y;
      setState((s) => (s.hidden === hidden && s.solid === solid ? s : { hidden, solid }));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [overlay]);

  return (
    <header
      ref={ref}
      data-hidden={state.hidden || undefined}
      data-solid={state.solid || undefined}
      className={`site-header inset-x-0 top-0 z-30 data-solid:bg-salt data-solid:text-navy ${overlay ? 'fixed text-[#f4f5f0]' : 'sticky text-navy'}`}
    >
      {children}
    </header>
  );
}
