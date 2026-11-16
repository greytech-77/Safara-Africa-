'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { MenuItem } from '@/config/menu';

const CLOSE_DELAY = 150;

// Desktop menu (1024px and up): plain items are links; the others are buttons that open a plain dropdown list hanging from the bottom of
// the header bar. Hover opens it, with a short close delay so the mouse can travel from the link to the panel.
// Click, Enter or Space toggles it; ArrowDown moves into the list; Escape, a click outside or a page change closes it.
// Only one dropdown is open at a time.
export default function MegaMenu({ items, activeId }: { items: MenuItem[]; activeId?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      const button = document.getElementById(`nav-btn-${openId}`);
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

  const enter = (e: React.PointerEvent, id: string) => {
    if (e.pointerType !== 'mouse') return;
    clearTimer();
    setOpenId(id);
  };
  const leave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    clearTimer();
    timer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="h-full"
      onBlur={(e) => {
        if (!navRef.current?.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      <ul className="flex h-full items-stretch gap-5">
        {items.map((item) => {
          const open = openId === item.id;
          // Plain link (Home, Kilimanjaro, Zanzibar): no dropdown; hovering it closes any open one.
          if (!item.children)
            return (
              <li key={item.id} className="flex items-center" onPointerEnter={(e) => e.pointerType === 'mouse' && close()}>
                <Link
                  href={item.href}
                  className="nav-link py-2"
                  data-active={activeId === item.id || undefined}
                  aria-current={activeId === item.id ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          return (
            <li key={item.id} className="relative flex items-center" onPointerEnter={(e) => enter(e, item.id)} onPointerLeave={leave}>
              <button
                type="button"
                id={`nav-btn-${item.id}`}
                aria-expanded={open}
                aria-controls={`nav-menu-${item.id}`}
                data-active={activeId === item.id || undefined}
                onClick={() => {
                  clearTimer();
                  setOpenId(open ? null : item.id);
                }}
                onKeyDown={(e) => {
                  // ArrowDown opens the menu and moves to its first link.
                  if (e.key !== 'ArrowDown') return;
                  e.preventDefault();
                  setOpenId(item.id);
                  requestAnimationFrame(() => document.querySelector<HTMLElement>(`#nav-menu-${item.id} a`)?.focus());
                }}
                className="nav-link flex cursor-pointer items-center gap-1.5 py-2"
              >
                {item.label}
                <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true" className="nav-chevron">
                  <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <ul
                id={`nav-menu-${item.id}`}
                hidden={!open}
                onClick={(e) => (e.target as HTMLElement).closest('a') && close()}
                className="nav-dropdown"
              >
                {item.children.map((c) => (
                  <li key={c.href + c.label}>
                    <Link href={c.href} className="nav-dropdown__link">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
