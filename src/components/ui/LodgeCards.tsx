import Image from 'next/image';
import Link from 'next/link';
import type { Img } from '@/types/content';

export type LodgeTile = { slug: string; name: string; area: string; country: string; countryName: string; image: Img };

// The lodge grid used everywhere lodges are listed (home page, /accommodations, destination and park pages):
// tall photos with square corners, then the place and the lodge name. On hover a fine line draws under the name.
// Styles are the .lodge-card rules in globals.css.
export default function LodgeCards({ lodges, className = '' }: { lodges: LodgeTile[]; className?: string }) {
  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3 ${className}`}>
      {lodges.map((l) => (
        <li key={l.slug}>
          <Link href={`/accommodations/${l.slug}`} className="lodge-card">
            <div className="lodge-card__photo">
              <Image src={l.image.src} alt={l.image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="lodge-card__text">
              <p className="lodge-card__place">
                {l.area}, {l.countryName}
              </p>
              <h3 className="lodge-card__name">{l.name}</h3>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
