import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import RouteLine from '@/components/RouteLine';
import TourGrid from '@/components/TourGrid';
import { site } from '@/config/site';
import { getTour, getTours } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getTours().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = getTour((await params).slug);
  if (!tour) return {};
  return {
    title: tour.title,
    description: tour.summary,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: { images: [tour.hero.src] },
  };
}

export default async function TourPage({ params }: Props) {
  const tour = getTour((await params).slug);
  if (!tour) notFound();
  const others = getTours().filter((t) => t.slug !== tour.slug && t.country === tour.country).slice(0, 3);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.summary,
    image: tour.hero.src,
    touristType: tour.idealFor,
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tour.route.map((s, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Place', name: s.place } })),
    },
    provider: { '@type': 'TravelAgency', name: site.legalName, url: site.url },
  };

  return (
    <>
      <JsonLd data={ld} />
      <Header overlay current="/tours" />

      <section className="relative isolate flex min-h-[78vh] items-end bg-navy text-[#f4f5f0]">
        <Image src={tour.hero.src} alt={tour.hero.alt} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/90 via-navy/30 to-navy/30" />
        <div className="wrap pb-14 pt-40">
          <p className="font-semibold text-[#dce2e6]">{tour.days} days, {tour.style.toLowerCase()}</p>
          <h1 className="mt-3 max-w-[14ch] text-step-6">{tour.title}</h1>
          <div className="mt-10"><RouteLine route={tour.route} tone="light" size="lg" /></div>
        </div>
      </section>

      <div className="wrap grid gap-16 pt-16 lg:grid-cols-[1fr_20rem]">
        <article>
          <p className="measure text-step-1">{tour.summary}</p>
          <div className="prose-safara mt-10" dangerouslySetInnerHTML={{ __html: tour.html }} />

          {tour.gallery.length > 0 && (
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {tour.gallery.map((img) => (
                <div key={img.src} className="relative aspect-[4/3] overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </article>

        <aside className="space-y-10 self-start lg:sticky lg:top-8">
          {tour.idealFor.length > 0 && (
            <div>
              <h2 className="font-sans text-step-0 font-bold text-navy">Who it suits</h2>
              <ul className="mt-3 space-y-2 text-ink/85">{tour.idealFor.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          )}
          {tour.included.length > 0 && (
            <div>
              <h2 className="font-sans text-step-0 font-bold text-navy">Included</h2>
              <ul className="mt-3 space-y-2 text-ink/85">{tour.included.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          )}
          <div className="bg-navy p-6 text-[#f4f5f0]">
            {tour.priceFrom && <p className="text-step--1 text-[#c7d0d8]">From {tour.priceFrom} per person</p>}
            <p className="font-display text-step-2">Make this journey yours</p>
            <Link href={`/contact?tour=${tour.slug}#enquire`} className="btn btn-primary mt-5 w-full">Enquire about this trip</Link>
            {tour.itineraryUrl && (
              <a href={tour.itineraryUrl} target="_blank" rel="noopener" className="btn btn-outline-light mt-3 w-full">
                View day-by-day itinerary
              </a>
            )}
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="wrap mt-24" aria-labelledby="more">
          <h2 id="more" className="text-step-3 text-navy">Other journeys</h2>
          <div className="mt-8"><TourGrid tours={others} /></div>
        </section>
      )}
    </>
  );
}
