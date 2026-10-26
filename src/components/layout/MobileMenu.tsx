'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import type { MenuItem } from '@/config/menu';
import { site } from '@/config/site';

const FOCUSABLE = 'a[href], button:not([disabled])';

// Phone and tablet menu: a full-screen dialog that drills down one level per item.
export default function MobileMenu({ items, overlay }: { items: MenuItem[]; overlay: boolean }) {
  const [open, setOpen] = useState(false);
  const [levelId, setLevelId] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const level = items.find((i) => i.id === levelId);

  const close = (returnFocus = true) => {
    setOpen(false);
    setLevelId(null);
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

  // Move focus to the first control on each level.
  useEffect(() => {
    if (open) dialogRef.current?.querySelector<HTMLElement>(`[data-level] ${FOCUSABLE}`)?.focus();
  }, [open, levelId]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    // Keep Tab inside the dialog.
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
        onClick={() => setOpen(true)}
        className={`btn cursor-pointer ${overlay ? 'btn-outline-light' : 'btn-outline'}`}
      >
        Menu
      </button>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={onKeyDown}
          onClick={(e) => (e.target as HTMLElement).closest('a') && close(false)}
          className="slide-in fixed inset-0 z-50 flex flex-col overflow-y-auto bg-salt text-ink"
        >
          <div className="wrap flex items-center justify-between gap-4 border-b border-navy/10 py-4">
            <Logo tone="navy" height={48} />
            <button type="button" onClick={() => close()} className="btn btn-outline cursor-pointer text-navy">
              Close
            </button>
          </div>

          <div data-level={levelId ?? 'root'} key={levelId ?? 'root'} className={`wrap flex-1 py-6 ${levelId ? 'slide-in-sm' : ''}`}>
            {!level ? (
              <ul className="divide-y divide-navy/15 border-y border-navy/15">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setLevelId(item.id)}
                      className="flex w-full cursor-pointer items-center justify-between py-4 text-left font-display text-step-2 text-navy"
                    >
                      {item.label}
                      <span aria-hidden="true" className="arrow text-gold">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <button type="button" onClick={() => setLevelId(null)} className="cursor-pointer py-2 text-step--1 font-bold text-navy"><span aria-hidden="true" className="arrow arrow-back">←</span>
                  {' '}Back
                </button>
                <h2 className="mt-3 text-step-3 text-navy">{level.label}</h2>

                {level.groups.map((group, i) => (
                  <div key={group.heading ?? i} className="mt-6">
                    {group.heading && <h3 className="font-sans text-step--1 font-bold uppercase tracking-[0.12em] text-slate">{group.heading}</h3>}
                    <ul className="mt-2 divide-y divide-navy/10">
                      {group.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link href={link.href} className="block py-3">
                            <span className="font-semibold text-navy">{link.label}</span>
                            {link.note && <span className="block text-step--1 text-slate">{link.note}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {level.cards.length > 0 && (
                  <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                    {level.cards.map((card) => (
                      <li key={card.href}>
                        <Link href={card.href} className="block">
                          <div className="relative aspect-[16/9] overflow-hidden bg-salt-deep">
                            <Image src={card.image.src} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                          </div>
                          <p className="mt-2 font-display text-step-1 text-navy">{card.title}</p>
                          <p className="text-step--1 font-bold text-gold">{card.cta} →</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          <div className="wrap grid gap-3 border-t border-navy/10 py-6 sm:grid-cols-3">
            <a href={`tel:${site.phone.tel}`} className="btn btn-outline text-navy">Call {site.phone.display}</a>
            <a href={`https://wa.me/${site.whatsapp}`} className="btn btn-outline text-navy">WhatsApp</a>
            <Link href="/contact#enquire" className="btn btn-primary">Plan your trip</Link>
          </div>
        </div>
      )}
    </>
  );
}
