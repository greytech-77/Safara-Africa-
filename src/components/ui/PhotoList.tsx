import Image from 'next/image';
import type { Img } from '@/types/content';

export type PhotoListItem = { title: string; text: string; image: Img };

// A light, open list: a round photo beside each title and line of text, in two columns, divided by hairlines.
export default function PhotoList({ items }: { items: PhotoListItem[] }) {
  return (
    <ul data-reveal-stagger className="grid gap-x-16 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="flex items-center gap-6 border-b border-deep-teal/15 py-6">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-salt-deep sm:size-28">
            <Image src={item.image.src} alt={item.image.alt} fill sizes="112px" className="object-cover" />
          </div>
          <div>
            <h3 className="text-step-2 text-ink">{item.title}</h3>
            <p className="mt-1 text-ink">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
