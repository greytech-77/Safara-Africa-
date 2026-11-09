'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
// Only on wider screens, without data-saver, and when motion is welcome. Everyone else keeps the photo.
const canPlay = () =>
  matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches &&
  !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

// Background video for <Hero>. Renders nothing on the server, so the photo underneath is what loads first.
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const play = useSyncExternalStore(subscribe, canPlay, () => false);
  if (!play) return null;
  return (
    <video className="hero__media" autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden="true">
      <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
    </video>
  );
}
