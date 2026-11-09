'use client';

import { useEffect, useState } from 'react';

// Scroll behaviour for the site header: it stays pinned to the top of the window.
// Over a hero it starts transparent and turns solid once the page scrolls; elsewhere it is always solid.
// pinAfterHero (home page): the header scrolls away with the hero, then drops in pinned and solid once the hero has passed.
export default function HeaderShell({
  overlay,
  pinAfterHero = false,
  children,
}: {
  overlay: boolean;
  pinAfterHero?: boolean;
  children: React.ReactNode;
}) {
  const [solid, setSolid] = useState(!overlay);
  const [pinned, setPinned] = useState(!pinAfterHero);

  useEffect(() => {
    if (!overlay) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (pinAfterHero) {
        const hero = document.querySelector<HTMLElement>('.hero');
        const pin = y >= (hero ? hero.offsetTop + hero.offsetHeight : 0);
        setPinned(pin);
        setSolid(pin);
      } else setSolid(y >= 50);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [overlay, pinAfterHero]);

  const position = overlay ? (pinned ? 'fixed' : 'absolute') : 'sticky';
  return (
    <header
      data-solid={solid || undefined}
      data-dropped={(pinAfterHero && pinned) || undefined}
      className={`site-header inset-x-0 top-0 z-30 data-solid:bg-cream data-solid:text-deep-teal ${position} ${overlay ? 'text-white' : 'text-deep-teal'}`}
    >
      {children}
    </header>
  );
}
