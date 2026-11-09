import Link from 'next/link';
import JsonLd from './JsonLd';
import { site } from '@/config/site';

export type Crumb = { label: string; href?: string };

// Home > … > current page, in white over a hero. The last crumb is the current page and is not linked.
// Stays on one line and scrolls sideways when it is too long for a phone.
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={ld} />
      <ol className="flex items-center gap-x-2 overflow-x-auto whitespace-nowrap text-[13px] text-white [scrollbar-width:none]">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">›</span>}
              {c.href && !last ? (
                <Link href={c.href} className="underline-offset-4 hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{c.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
