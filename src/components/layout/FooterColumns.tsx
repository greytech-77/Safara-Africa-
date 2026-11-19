import Link from 'next/link';
import type { FooterColumn, FooterLink } from '@/config/footer';

// Phones (<640px) get a native <details> accordion; from 640px every column is open in a 2×2 grid, then four
// columns from 1024px.
export default function FooterColumns({ columns }: { columns: FooterColumn[] }) {
  return (
    <nav aria-label="Footer" className="mb-16 lg:mb-6">
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:flex lg:justify-around">
        {columns.map((c) => (
          <Column key={c.title} title={c.title} links={c.links} />
        ))}
      </div>
    </nav>
  );
}

const heading = 'font-sans text-[18px] font-medium leading-tight text-[#d19f4d]';

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      {/* Mobile: collapsed accordion. Desktop: always-open heading + list. */}
      <details className="group sm:hidden">
        <summary className={`${heading} flex min-h-12 cursor-pointer list-none items-center justify-between`}>
          {title}
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            className="transition-transform duration-200 group-open:rotate-180"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <ul className="pb-4">
          <LinkList links={links} />
        </ul>
      </details>

      <div className="hidden sm:block">
        <h2 className={`${heading} mb-10 lg:mb-3`}>{title}</h2>
        <ul>
          <LinkList links={links} />
        </ul>
      </div>
    </div>
  );
}

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <>
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
    </>
  );
}

const linkClass =
  'block text-[14px] font-light leading-[40px] lg:leading-[34px] tracking-[0.35px] text-white transition-opacity duration-200 hover:opacity-60';
