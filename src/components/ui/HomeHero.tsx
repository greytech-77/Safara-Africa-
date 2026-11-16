'use client';

import Image from 'next/image';
import { Allura } from 'next/font/google';
import { useState, useSyncExternalStore } from 'react';

// Handwriting face for the home headline only.
const script = Allura({ subsets: ['latin'], weight: '400', display: 'swap' });

type Video = { mp4: string; webm?: string; mobileMp4?: string };

const subscribe = (cb: () => void) => {
  const mqs = ['(prefers-reduced-motion: reduce)', '(max-width: 767px)'].map((q) => window.matchMedia(q));
  mqs.forEach((m) => m.addEventListener('change', cb));
  return () => mqs.forEach((m) => m.removeEventListener('change', cb));
};
// Which video to play: none with reduced motion or data saver, the small file on phones, else the full one.
const pick = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none';
  if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return 'none';
  return window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop';
};

// Full-screen home hero: a poster photo shows at once, the video fades in over it once it can play, a short dark fade
// sits only at the top for the header, and the page's one <h1> sits dead centre with a small line near the bottom.
// Quiet on purpose: no buttons or extra copy. Styles: .home-hero in globals.css.
export default function HomeHero({
  title,
  tagline,
  poster,
  video,
}: {
  title: string;
  tagline: string;
  poster: { src: string; alt: string };
  video?: Video;
}) {
  const mode = useSyncExternalStore(subscribe, pick, () => 'none' as const);
  const [ready, setReady] = useState(false);
  const src = mode === 'mobile' ? (video?.mobileMp4 ?? video?.mp4) : video?.mp4;

  return (
    <section className="home-hero" data-hero aria-labelledby="home-hero-title">
      <Image src={poster.src} alt={poster.alt} fill priority sizes="100vw" className="home-hero__media" />
      {video && mode !== 'none' && (
        <video
          key={mode}
          className="home-hero__media home-hero__video"
          data-ready={ready || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
        >
          {mode === 'desktop' && video.webm && <source src={video.webm} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="home-hero__scrim" aria-hidden="true" />
      <div className="home-hero__content">
        <h1 id="home-hero-title" className={`home-hero__title ${script.className}`}>
          {title}
        </h1>
        <p className="home-hero__tagline">{tagline}</p>
      </div>
    </section>
  );
}
