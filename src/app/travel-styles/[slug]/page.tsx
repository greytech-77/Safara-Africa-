import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import TourGrid from '@/components/TourGrid';
import { getTravelStyle, travelStyles } from '@/content/travel-styles';
import { getTours } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return travelStyles.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getTravelStyle((await params).slug);
  if (!s) return {};
  return {
    title: `${s.name} in Tanzania`,
    description: s.teaser,
    alternates: { canonical: `/travel-styles/${s.slug}` },
    openGraph: { images: [s.image.src] },
  };
}

export default async function TravelStylePage({ params }: Props) {
  const s = getTravelStyle((await params).slug);
  if (!s) notFound();
  const tours = getTours().filter((t) => s.tours.includes(t.slug));

  return (
    <>
      <Header overlay current="/travel-styles" />

      <section className="relative isolate flex min-h-[70vh] items-end bg-navy text-[#f4f5f0]">
        <Image src={s.image.src} alt={s.image.alt} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/90 via-navy/30 to-navy/30" />
        <div className="wrap pb-14 pt-40">
          <p className="font-semibold text-[#dce2e6]">Travel style</p>
          <h1 className="mt-3 max-w-[14ch] text-step-6">{s.name}</h1>
          <p className="mt-4 max-w-[46ch] text-step-1 text-[#dce2e6]">{s.teaser}</p>
        </div>
      </section>

      <section className="wrap pt-16">
        <div className="prose-safara">
          {s.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
        <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {s.points.map((p) => (
            <li key={p.title} className="border-t border-navy/20 pt-4">
              <h2 className="font-sans text-step-0 font-bold text-navy">{p.title}</h2>
              <p className="mt-1 text-ink/85">{p.body}</p>
            </li>
          ))}
        </ul>
        <Link href="/contact#enquire" className="btn btn-primary mt-12">Plan your trip</Link>
      </section>

      {tours.length > 0 && (
        <section className="wrap mt-24" aria-labelledby="journeys">
          <h2 id="journeys" className="text-step-3 text-navy">Journeys that suit</h2>
          <div className="mt-8"><TourGrid tours={tours} /></div>
        </section>
      )}
    </>
  );
}
