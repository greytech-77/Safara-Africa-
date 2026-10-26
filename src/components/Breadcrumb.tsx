import Link from 'next/link';
import JsonLd from './JsonLd';
import { site } from '@/config/site';

export type Crumb = { label: string; href?: string };

// Home > … > current page. The last crumb is the current page and is not linked.
export default function Breadcrumb({ items, tone = 'light' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, ...(c.href ? { item: `${site.url}${c.href}` } : {}) })),
  };
  const muted = tone === 'light' ? 'text-[#dce2e6]' : 'text-slate';

  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={ld} />
      <ol className={`flex flex-wrap items-center gap-x-2 text-step--1 font-semibold ${muted}`}>
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">›</span>}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="underline underline-offset-4 hover:no-underline">{c.label}</Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
