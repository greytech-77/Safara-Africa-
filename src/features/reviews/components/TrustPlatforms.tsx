'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Credential, TrustPlatform } from '@/content/trust-platforms';

// "Recommended on": logos of the review platforms that list us, each linking to our profile,
// with the rating and review count when we have them; licences and memberships below.
// Up to four platforms sit in a centred row; more become a swipeable row with arrows.
export default function TrustPlatforms({ platforms, credentials }: { platforms: TrustPlatform[]; credentials: Credential[] }) {
  if (platforms.length === 0 && credentials.length === 0) return null;
  return (
    <>
      <header className="mb-12 text-center">
        <h2 id="trust-heading" className="border-b border-deep-teal/10 pb-3 text-step-3 text-ink">
          Recommended by travellers on
        </h2>
        <p className="mt-3 text-ink">Independent reviews from people who&apos;ve travelled with us.</p>
      </header>

      {platforms.length > 4 ? (
        <Carousel platforms={platforms} />
      ) : (
        <ul className="flex flex-wrap justify-center gap-8">
          {platforms.map((p) => (
            <li key={p.name} className="w-[11rem]">
              <TrustBadge platform={p} />
            </li>
          ))}
        </ul>
      )}

      {credentials.length > 0 && (
        <ul className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-6 border-t border-deep-teal/10 pt-8">
          {credentials.map((c) => (
            <li key={c.name}>
              <CredentialItem credential={c} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Carousel({ platforms }: { platforms: TrustPlatform[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const page = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth, behavior: 'smooth' });

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Review platforms" className="relative md:px-12">
      <ul
        ref={track}
        className="-my-4 flex snap-x snap-mandatory overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {platforms.map((p, i) => (
          <li
            key={p.name}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${platforms.length}`}
            className="shrink-0 basis-1/2 snap-start px-2 md:basis-1/3 lg:basis-1/4"
          >
            <TrustBadge platform={p} />
          </li>
        ))}
      </ul>
      <Arrow dir={-1} disabled={edges.start} onClick={() => page(-1)} />
      <Arrow dir={1} disabled={edges.end} onClick={() => page(1)} />
    </div>
  );
}

function Arrow({ dir, disabled, onClick }: { dir: 1 | -1; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir < 0 ? 'Previous platforms' : 'Next platforms'}
      className={`absolute top-1/2 hidden size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-gold-ink bg-white text-gold-ink transition-opacity duration-200 hover:bg-gold-ink hover:text-white disabled:pointer-events-none disabled:opacity-30 md:grid ${dir < 0 ? 'left-0' : 'right-0'}`}
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className={`size-4 ${dir < 0 ? 'rotate-180' : ''}`}>
        <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}

function TrustBadge({ platform: p }: { platform: TrustPlatform }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read our reviews on ${p.name}${p.rating ? `, rated ${p.rating} out of 5` : ''} (opens in a new tab)`}
      className="relative flex h-full flex-col items-center rounded-xl bg-white px-4 py-5 text-center transition duration-200 hover:scale-[1.03] hover:shadow-[0_16px_48px_rgb(0_0_0/0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-ink"
    >
      {p.sample && (
        <span className="absolute right-2 top-2 rounded bg-sand px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate">
          Sample
        </span>
      )}
      <span className="flex h-20 w-[120px] items-center justify-center md:h-[90px] md:w-[140px] lg:h-[100px] lg:w-[150px]">
        {p.logo ? (
          <Image src={p.logo.src} alt={p.name} width={p.logo.width} height={p.logo.height} className="max-h-full w-auto object-contain" />
        ) : (
          <span className="font-display text-step-2 text-ink">{p.name}</span>
        )}
      </span>
      {p.rating !== undefined && (
        <span className="mt-2 flex items-center gap-1.5">
          <Stars rating={p.rating} />
          <span className="font-semibold text-ink">{p.rating.toFixed(1)}</span>
        </span>
      )}
      {p.reviews !== undefined && <span className="text-step--1 text-slate">{p.reviews.toLocaleString('en-GB')} reviews</span>}
      <span className="mt-2 text-step--1 font-bold text-gold-ink">Read reviews</span>
    </a>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-hidden="true" className="flex text-gold">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 16 16" className={`size-3.5 ${rating >= n - 0.25 ? 'fill-current' : 'fill-current opacity-25'}`}>
          <path d="M8 1.5 9.9 5.6l4.4.5-3.3 3 .9 4.4L8 11.3l-3.9 2.2.9-4.4-3.3-3 4.4-.5z" />
        </svg>
      ))}
    </span>
  );
}

function CredentialItem({ credential: c }: { credential: Credential }) {
  const body = (
    <span className="group flex items-center gap-3 text-left">
      {c.logo ? (
        <Image
          src={c.logo.src}
          alt=""
          width={c.logo.width}
          height={c.logo.height}
          className="h-12 w-auto opacity-70 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8 shrink-0 fill-none stroke-deep-teal/60 stroke-[1.5]">
          <path d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6z" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      )}
      <span>
        <span className="block text-step--1 font-bold text-ink">
          {c.name}
          {c.sample && <span className="ml-2 font-semibold uppercase tracking-[0.06em] text-slate">(sample)</span>}
        </span>
        {c.detail && <span className="block text-step--1 text-slate">{c.detail}</span>}
      </span>
    </span>
  );
  return c.href ? (
    <a href={c.href} target="_blank" rel="noopener noreferrer" className="rounded focus-visible:outline-2 focus-visible:outline-gold-ink">
      {body}
    </a>
  ) : (
    body
  );
}
