'use client';

import Link from 'next/link';
import { useId, useState, useSyncExternalStore } from 'react';
import type { FooterColumn, FooterLink } from '@/config/footer';

// Phones (<640px) get an accordion: each heading is a button and the lists start closed.
// From 640px every list is open: a 2×2 grid, then four columns spread out from 1024px.
const MQ = '(max-width: 639px)';
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(MQ);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};
const isPhone = () => window.matchMedia(MQ).matches;

export default function FooterColumns({ columns }: { columns: FooterColumn[] }) {
  const phone = useSyncExternalStore(subscribe, isPhone, () => false);
  return (
    <nav aria-label="Footer" className="mb-16 lg:mb-6">
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:flex lg:justify-around">
        {columns.map((c) => (
          <Column key={c.title} title={c.title} links={c.links} phone={phone} />
        ))}
      </div>
    </nav>
  );
}

function Column({ title, links, phone }: { title: string; links: FooterLink[]; phone: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const shown = !phone || open;
  const heading = 'font-sans text-[18px] font-medium leading-tight text-[#d19f4d]';

  return (
    <div>
      {phone ? (
        <h2 className={heading}>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex min-h-12 cursor-pointer items-center gap-2"
          >
            {title}
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </h2>
      ) : (
        <h2 className={`${heading} mb-10 lg:mb-3`}>{title}</h2>
      )}
      <ul id={id} hidden={!shown} className="pb-4 sm:pb-0">
        {links.map((l) => (
          <li key={l.href}>
            {l.href.startsWith('/') ? (
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ) : (
              <a href={l.href} className={linkClass} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}>
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const linkClass =
  'block text-[14px] font-light leading-[40px] lg:leading-[34px] tracking-[0.35px] text-white transition-opacity duration-200 hover:opacity-60';
