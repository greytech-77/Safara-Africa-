import Image from 'next/image';
import type { Img } from '@/types/content';

// Full-bleed photo hero with a dark fade. Pair with <Header overlay>.
export default function PageHero({ image, children, short = false }: { image: Img; children: React.ReactNode; short?: boolean }) {
  return (
    <section className={`relative isolate flex overflow-hidden items-end bg-navy text-[#f4f5f0] ${short ? 'min-h-[60vh]' : 'min-h-[72vh]'}`}>
      <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="hero-zoom -z-10 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/90 via-navy/30 to-navy/30" />
      <div className="rise wrap pb-14 pt-40">{children}</div>
    </section>
  );
}
