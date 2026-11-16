'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import type { MenuItem } from '@/config/menu';

const FOCUSABLE = 'a[href], button:not([disabled])';

// Phones and tablets (below 1024px): a hamburger opens a full-height dark panel with a gold top line. Sections are
// stacked; tapping one expands its links in place (accordion). "Plan your journey" sits at the bottom.
// Page scroll is locked, Tab stays inside, and Escape or × closes it.
export default function MobileMenu({ items, activeId }: { items: MenuItem[]; activeId?: string }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const close = (returnFocus = true) => {
    setOpen(false);
    setExpanded(null);
    if (returnFocus) toggleRef.current?.focus();
  };

  useEffect(() => close(false), [pathname]);

  // Lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus the close button when the panel opens.
  useEffect(() => {
    if (open) dialogRef.current?.querySelector<HTMLElement>('[data-close]')?.focus();
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    // Keep Tab inside the panel.
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const nodes = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="grid size-11 cursor-pointer place-items-center text-white"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M3 6.5h18M3 12h18M3 17.5h18" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={onKeyDown}
          onClick={(e) => (e.target as HTMLElement).closest('a') && close(false)}
          className="mobile-nav slide-in fixed inset-0 z-50 flex flex-col overflow-y-auto border-t-[3px] border-nav-gold"
        >
          <div className="wrap flex h-[var(--header-h)] shrink-0 items-center justify-between gap-4">
            <Logo tone="white" height={48} />
            <button
              type="button"
              data-close
              onClick={() => close()}
              aria-label="Close menu"
              className="grid size-11 cursor-pointer place-items-center text-white"
            >
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav aria-label="Main" className="wrap flex-1 py-2">
            <ul className="border-t border-white/10">
              {items.map((item) => {
                const isOpen = expanded === item.id;
                // Plain link (Home, Kilimanjaro, Zanzibar).
                if (!item.children)
                  return (
                    <li key={item.id} className="border-b border-white/10">
                      <Link
                        href={item.href}
                        aria-current={activeId === item.id ? 'page' : undefined}
                        className={`mobile-nav__link block py-3.5 ${activeId === item.id ? 'text-nav-gold' : ''}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                return (
                  <li key={item.id} className="border-b border-white/10">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`m-nav-${item.id}`}
                      onClick={() => setExpanded(isOpen ? null : item.id)}
                      className={`mobile-nav__link flex w-full cursor-pointer items-center justify-between py-3.5 text-left ${
                        activeId === item.id ? 'text-nav-gold' : ''
                      }`}
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 10 10"
                        width="12"
                        height="12"
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      >
                        <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </button>
                    <ul id={`m-nav-${item.id}`} hidden={!isOpen} className="pb-3 pl-4">
                      {item.children.map((c) => (
                        <li key={c.href + c.label}>
                          <Link href={c.href} className="mobile-nav__sublink block py-2">
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

          <div className="wrap shrink-0 py-6">
            <Link href="/contact#enquire" className="btn btn-primary w-full">
              Plan your journey
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
