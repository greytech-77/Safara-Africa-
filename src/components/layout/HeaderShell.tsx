'use client';

import { useEffect, useState } from 'react';

// Scroll behaviour for the site header: it stays pinned to the top of the window.
// Over a hero it has no background; once the page scrolls past ~50px it turns solid #1a1a1a.
export default function HeaderShell({ overlay, children }: { overlay: boolean; children: React.ReactNode }) {
  const [solid, setSolid] = useState(!overlay);

  useEffect(() => {
    if (!overlay) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setSolid(window.scrollY >= 50);
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
    <header data-solid={solid || undefined} className={`site-header inset-x-0 top-0 z-30 text-white ${overlay ? 'fixed' : 'sticky'}`}>
      {children}
    </header>
  );
}
