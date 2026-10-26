import Image from 'next/image';
import Link from 'next/link';
import type { Img } from '@/types/content';

export type ImageCardItem = { title: string; text?: string; meta?: string; image: Img; href?: string };

// Photo cards with a title and short text, linked when `href` is set.
export default function ImageCards({ items, columns = 3 }: { items: ImageCardItem[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
  return (
    <ul data-reveal-stagger className={`grid gap-8 ${cols}`}>
      {items.map((item) => {
        const body = (
          <>
            <div className="relative aspect-[3/2] overflow-hidden bg-salt-deep">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="zoom object-cover"
              />
            </div>
            {item.meta && <p className="mt-4 text-step--1 font-semibold uppercase tracking-[0.08em] text-slate">{item.meta}</p>}
            <h3 className={`${item.meta ? 'mt-1' : 'mt-4'} text-step-2 text-navy ${item.href ? 'transition-colors duration-300 group-hover:text-gold' : ''}`}>{item.title}</h3>
            {item.text && <p className="mt-1 text-ink/80">{item.text}</p>}
          </>
        );
        return (
          <li key={item.title}>
            {item.href ? <Link href={item.href} className="group block">{body}</Link> : <div className="group">{body}</div>}
          </li>
        );
      })}
    </ul>
  );
}
