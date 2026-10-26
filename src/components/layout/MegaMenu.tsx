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
export default function MegaMenu({ items, activeId, overlay }: { items: MenuItem[]; activeId?: string; overlay: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
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
      setOpenId(id);
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
    else setOpenId(id);
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
      <ul className="flex items-center gap-5 text-step--1 font-semibold xl:gap-7">
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
                className="nav-link flex cursor-pointer items-center gap-1.5 py-2"
              >
                {item.label}
                <svg aria-hidden="true" viewBox="0 0 10 6" className={`size-2.5 transition-transform ${open ? 'rotate-180' : ''}`}>
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              <div
                id={`mega-panel-${item.id}`}
                hidden={!open}
                onClick={(e) => (e.target as HTMLElement).closest('a') && close()}
                className={`mega-panel absolute inset-x-0 top-full z-10 border-t bg-salt text-ink shadow-[0_24px_40px_-24px_rgb(31_46_64/0.45)] ${overlay ? 'border-white/20' : 'border-navy/10'}`}
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
    <div className={`wrap grid gap-12 py-10 ${cardsOnly ? '' : item.cards.length ? 'grid-cols-[1fr_auto]' : ''}`}>
      {!cardsOnly && (
        <div className="grid auto-cols-fr grid-flow-col gap-10">
          {item.groups.map((group, i) => (
            <div key={group.heading ?? i}>
              {group.heading && (
                <h2 className="mb-4 font-sans text-step--1 font-bold uppercase tracking-[0.12em] text-slate">{group.heading}</h2>
              )}
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="sub-link group/link block">
                      <span className="font-display text-step-1 text-navy transition-colors duration-300 group-hover/link:text-gold">
                        {link.label}
                      </span>
                      {link.note && <span className="block text-step--1 font-normal text-slate">{link.note}</span>}
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
              <Link href={card.href} className="group/card block">
                <div className="relative aspect-[16/10] overflow-hidden bg-salt-deep">
                  <Image
                    src={card.image.src}
                    alt=""
                    fill
                    sizes="352px"
                    className="object-cover transition-transform duration-800 group-hover/card:scale-[1.05]"
                  />
                </div>
                <p className="mt-3 font-display text-step-1 text-navy group-hover/card:text-gold">{card.title}</p>
                <p className="text-step--1 font-bold text-gold">
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

// Optional heading over a four-column grid of white photo tiles, each labelled underneath.
function TilesPanel({ tiles }: { tiles: NonNullable<MenuItem['tiles']> }) {
  return (
    <div className="wrap max-h-[calc(100vh-7rem)] overflow-y-auto py-10">
      <div className={`flex flex-wrap items-baseline gap-4 ${tiles.heading ? 'justify-between' : 'justify-end'}`}>
        {tiles.heading && <h2 className="text-step-2 text-navy">{tiles.heading}</h2>}
        <ul className="flex gap-6 text-step--1 font-bold">
          {(tiles.links ?? []).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-gold hover:text-gold-dark">
                {link.label} <span className="arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul className={`${tiles.heading || tiles.links?.length ? 'mt-6' : ''} grid grid-cols-4 gap-5`}>
        {tiles.items.map((tile) => (
          <li key={tile.href}>
            <Link
              href={tile.href}
              className="group/tile block h-full bg-white p-2.5 shadow-[0_4px_3px_rgb(0_0_0/.12)] transition-shadow hover:shadow-[0_10px_24px_-8px_rgb(31_46_64/.35)]"
            >
              <div className="relative h-[206px] overflow-hidden bg-salt-deep">
                <Image
                  src={tile.image.src}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-800 group-hover/tile:scale-[1.05]"
                />
              </div>
              <p className="mt-3 px-1 font-sans text-step--1 font-bold uppercase tracking-[0.06em] text-navy group-hover/tile:text-gold">
                {tile.title}
              </p>
              <p className="px-1 pb-1 text-step--1 text-slate">{tile.cta}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
