'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { MenuItem } from '@/config/menu';

const OPEN_DELAY = 120;
const CLOSE_DELAY = 220;

// Desktop mega menu. Items are disclosure buttons; panels hold ordinary links.
// The nav itself is not positioned, so panels anchor to the <header> and span its full width.
export default function MegaMenu({ items, activeId }: { items: MenuItem[]; activeId?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  // True when one panel replaced another: it skips the slide-down so the menu doesn't flicker.
  const [swapped, setSwapped] = useState(false);
  const openPanel = (id: string) => {
    setSwapped(openId !== null);
    setOpenId(id);
  };
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpenedAt = useRef(0);
  const pathname = usePathname();

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const close = () => {
    clearTimer();
    setOpenId(null);
  };

  // Close on navigation.
  useEffect(() => close(), [pathname]);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const button = document.getElementById(`mega-btn-${openId}`);
      close();
      button?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openId]);

  useEffect(() => clearTimer, []);

  function hoverItem(e: React.PointerEvent, id: string) {
    if (e.pointerType !== 'mouse') return;
    clearTimer();
    if (openId === id) return;
    const open = () => {
      hoverOpenedAt.current = Date.now();
      openPanel(id);
    };
    // Switching between items while a panel is open is instant.
    if (openId) open();
    else timer.current = setTimeout(open, OPEN_DELAY);
  }

  function leaveNav(e: React.PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    clearTimer();
    timer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY);
  }

  function clickItem(id: string) {
    clearTimer();
    // A click straight after hover-open shouldn't immediately close the panel.
    if (openId === id && Date.now() - hoverOpenedAt.current > 400) setOpenId(null);
    else openPanel(id);
    hoverOpenedAt.current = 0;
  }

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      onPointerEnter={(e) => e.pointerType === 'mouse' && clearTimer()}
      onPointerLeave={leaveNav}
      onBlur={(e) => {
        if (!navRef.current?.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      {/* Soft shade over the page while a panel is open; clicks pass through and close the menu. */}
      {openId && <div aria-hidden="true" className="mega-backdrop pointer-events-none absolute inset-x-0 top-full h-screen bg-black/35" />}
      <ul className="flex items-center gap-5 xl:gap-8">
        {items.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                id={`mega-btn-${item.id}`}
                aria-expanded={open}
                aria-controls={`mega-panel-${item.id}`}
                data-active={activeId === item.id || undefined}
                onPointerEnter={(e) => hoverItem(e, item.id)}
                onClick={() => clickItem(item.id)}
                onKeyDown={(e) => {
                  // ArrowDown opens the menu and moves to its first link.
                  if (e.key !== 'ArrowDown') return;
                  e.preventDefault();
                  openPanel(item.id);
                  requestAnimationFrame(() => document.querySelector<HTMLElement>(`#mega-panel-${item.id} a`)?.focus());
                }}
                className="nav-link flex cursor-pointer items-center py-2"
              >
                {item.label}
              </button>

              <div
                id={`mega-panel-${item.id}`}
                role="region"
                aria-label={item.label}
                hidden={!open}
                data-swap={(open && swapped) || undefined}
                onClick={(e) => (e.target as HTMLElement).closest('a') && close()}
                className="mega-panel glass absolute inset-x-1 top-[calc(100%+4px)] z-10 max-h-[calc(100svh-var(--header-h)-16px)] overflow-y-auto rounded-[20px] text-ink"
              >
                <Panel item={item} />
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Panel({ item }: { item: MenuItem }) {
  if (item.tiles) return <TilesPanel tiles={item.tiles} />;
  const cardsOnly = item.groups.length === 0;
  return (
    <div
      className={`mx-auto grid w-[min(100%-2rem,1140px)] gap-12 pt-10 pb-12 ${cardsOnly ? '' : item.cards.length ? 'grid-cols-[1fr_auto]' : ''}`}
    >
      {!cardsOnly && (
        <div className="grid auto-cols-fr grid-flow-col gap-10">
          {item.groups.map((group, i) => (
            <div key={group.heading ?? i}>
              {group.heading && <h2 className="mb-6 text-step-2 text-ink">{group.heading}</h2>}
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="sub-link group/link block">
                      <span className="font-sans text-step--1 font-bold uppercase tracking-[0.06em] text-deep-teal transition-colors duration-300 group-hover/link:text-gold-ink">
                        {link.label}
                      </span>
                      {link.note && <span className="mt-0.5 block text-step--1 font-normal text-ink">{link.note}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {item.cards.length > 0 && (
        <ul className={`grid gap-6 ${cardsOnly ? 'grid-cols-2 lg:max-w-3xl' : 'w-[22rem]'}`}>
          {item.cards.map((card) => (
            <li key={card.href}>
              <Link href={card.href} className="glass-card group/card block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-sand">
                  <Image
                    src={card.image.src}
                    alt=""
                    fill
                    sizes="352px"
                    className="object-cover transition-transform duration-800 group-hover/card:scale-[1.05]"
                  />
                </div>
                <p className="mt-3 px-1 font-sans text-step--1 font-bold uppercase tracking-[0.06em] text-deep-teal group-hover/card:text-gold-ink">
                  {card.title}
                </p>
                <p className="px-1 pb-1 text-step--1 font-bold text-gold-ink">
                  {card.cta} <span className="arrow group-hover/card:translate-x-1">→</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Optional heading over a four-column grid of glass cards: photo, title, then View and Enquire.
// More than four items (Journeys) switch to compact cards in a single row, so the panel stays short.
function TilesPanel({ tiles }: { tiles: NonNullable<MenuItem['tiles']> }) {
  if (tiles.items.length > 4) return <CompactTilesPanel tiles={tiles} />;
  return (
    <div className="mx-auto w-[min(100%-2rem,1140px)] pt-10 pb-12">
      <TilesHeader tiles={tiles} />
      <ul className={`${tiles.heading || tiles.links?.length ? 'mt-6' : ''} grid grid-cols-4 gap-x-5 gap-y-10 xl:gap-x-[30px]`}>
        {tiles.items.map((tile) => (
          <li key={tile.href} className="glass-card">
            {/* The photo repeats the View link, so it is skipped by keyboard and screen readers. */}
            <Link
              href={tile.href}
              tabIndex={-1}
              aria-hidden="true"
              className="group/tile relative block h-[136px] overflow-hidden rounded-[4px] bg-sand"
            >
              <Image
                src={tile.image.src}
                alt=""
                fill
                sizes="250px"
                className="object-cover transition-transform duration-800 group-hover/tile:scale-[1.05]"
              />
            </Link>
            <h2 className="mt-3.5 mb-2.5 px-1 text-center font-sans text-step--1 font-bold uppercase tracking-[0.06em] text-deep-teal">
              {tile.title}
            </h2>
            <div className="flex justify-center gap-5 pb-2.5 text-step--1 font-semibold text-ink">
              <Link href={tile.href} className="glass-card__action" aria-label={`View ${tile.title}`}>
                View
              </Link>
              <Link href="/contact#enquire" className="glass-card__action" aria-label={`Enquire about ${tile.title}`}>
                Enquire
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Small photo cards, four to a row, starting close under the heading so two rows fit without scrolling; each card is one link.
function CompactTilesPanel({ tiles }: { tiles: NonNullable<MenuItem['tiles']> }) {
  return (
    <div className="mx-auto w-[min(100%-2rem,1140px)] pt-4 pb-6">
      <TilesHeader tiles={tiles} arrows={false} />
      <ul className={`${tiles.heading || tiles.links?.length ? 'mt-3' : ''} grid grid-cols-4 gap-x-4 gap-y-3`}>
        {tiles.items.map((tile) => (
          <li key={tile.href}>
            <Link href={tile.href} className="glass-card group/tile block h-full">
              <div className="relative h-[124px] overflow-hidden rounded-[4px] bg-sand">
                <Image
                  src={tile.image.src}
                  alt=""
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-800 group-hover/tile:scale-[1.05]"
                />
              </div>
              <p className="px-1 pt-2 pb-1 text-center font-sans text-[0.75rem] leading-snug font-bold uppercase tracking-[0.06em] text-deep-teal group-hover/tile:text-gold-ink">
                {tile.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Panel heading on the left, quick links on the right.
function TilesHeader({ tiles, arrows = true }: { tiles: NonNullable<MenuItem['tiles']>; arrows?: boolean }) {
  return (
    <div className={`flex flex-wrap items-baseline gap-4 ${tiles.heading ? 'justify-between' : 'justify-end'}`}>
      {tiles.heading && <h2 className="text-step-2 text-ink">{tiles.heading}</h2>}
      <ul className="flex gap-6 text-step--1 font-bold">
        {(tiles.links ?? []).map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-gold-ink hover:text-deep-teal">
              {link.label}
              {arrows && (
                <>
                  {' '}
                  <span className="arrow">→</span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
