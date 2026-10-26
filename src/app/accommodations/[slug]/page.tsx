import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import PageHero from '@/components/ui/PageHero';
import TourGrid from '@/features/tours/components/TourGrid';
import { accommodations, getAccommodation } from '@/content/accommodations';
import { getCountry } from '@/content/countries';
import { parks } from '@/content/parks';
import { getToursStayingAt } from '@/features/itineraries/data';
import { getTours } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return accommodations.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getAccommodation((await params).slug);
  if (!a) return {};
  return {
    title: `${a.name}, ${a.area}`,
    description: `${a.teaser} Rooms, activities and safaris that include ${a.name}.`,
    alternates: { canonical: `/accommodations/${a.slug}` },
    openGraph: { images: [a.image.src] },
  };
}

function Tick() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 fill-gold">
      <path d="M6.2 11.6 2.6 8l1.1-1.1 2.5 2.5 6.1-6.1L13.4 4.4z" />
    </svg>
  );
}

export default async function AccommodationPage({ params }: Props) {
  const a = getAccommodation((await params).slug);
  if (!a) notFound();
  const country = getCountry(a.country)!;
  const park = parks.find((p) => p.slug === a.park);
  const all = getTours();
  // Trips that stay at this lodge first, then other trips through the same park.
  const staying = getToursStayingAt(a.slug);
  const inPark = park ? all.filter((t) => t.parks.includes(park.slug) && !staying.includes(t)) : [];
  const own = [...staying, ...inPark];
  const tours = (own.length > 0 ? own : all.filter((t) => t.country === a.country)).slice(0, 4);
  const card = 'bg-white p-6 shadow-[0_4px_3px_rgb(0_0_0/.08)]';

  return (
    <>
      <Header overlay current={`/destinations/${country.slug}`} />
      <PageHero image={a.image} short>
        <Breadcrumb
          items={[
            { label: 'Destinations', href: '/destinations' },
            { label: country.name, href: `/destinations/${country.slug}#accommodations` },
            { label: a.name },
          ]}
        />
        <p className="mt-6 text-step--1 font-bold uppercase tracking-[0.14em] text-sun">{a.area}</p>
        <h1 className="mt-2 max-w-[20ch] text-step-6">{a.name}</h1>
        <p className="mt-4 max-w-[46ch] text-step-1 text-[#dce2e6]">{a.teaser}</p>
      </PageHero>

      <div className="wrap grid gap-16 pt-16 lg:grid-cols-[1fr_22rem]">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-step-4 text-navy">
            Overview of {a.name}
          </h2>
          <div className="prose-safara mt-6">
            {a.overview.map((t) => (
              <p key={t.slice(0, 40)}>{t}</p>
            ))}
          </div>
        </section>
        <aside className={`h-fit ${card}`} aria-label="At a glance">
          <dl className="divide-y divide-navy/10">
            <div className="pb-3">
              <dt className="text-step--1 font-semibold text-slate">Location</dt>
              <dd className="font-semibold text-navy">
                {a.area}, {country.name}
              </dd>
            </div>
            {park && (
              <div className="py-3">
                <dt className="text-step--1 font-semibold text-slate">Park</dt>
                <dd>
                  <Link href={park.link ?? `/parks/${park.slug}`} className="font-semibold text-navy underline underline-offset-4">
                    {park.name}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
          <Link href="/contact#enquire" className="btn btn-primary mt-4 w-full">
            Ask about this lodge
          </Link>
        </aside>
      </div>

      <section className="wrap mt-20" aria-labelledby="rooms-heading">
        <p className="text-step--1 font-bold uppercase tracking-[0.14em] text-gold">Unwind and relax</p>
        <h2 id="rooms-heading" className="mt-1 text-step-4 text-navy">
          Rooms at {a.name}
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {a.rooms.map((r) => (
            <li key={r.name} className={card}>
              <h3 className="text-step-2 text-navy">{r.name}</h3>
              <p className="mt-2 text-ink/85">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap mt-20" aria-labelledby="offer-heading">
        <h2 id="offer-heading" className="text-step-4 text-navy">
          Activities and amenities
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className={card}>
            <h3 className="font-sans text-step-0 font-bold uppercase tracking-[0.08em] text-slate">Activities</h3>
            <ul className="mt-4 space-y-3">
              {a.activities.map((x) => (
                <li key={x} className="flex items-start gap-3 font-semibold text-navy">
                  <Tick />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className={card}>
            <h3 className="font-sans text-step-0 font-bold uppercase tracking-[0.08em] text-slate">Amenities</h3>
            <ul className="mt-4 space-y-3">
              {a.amenities.map((x) => (
                <li key={x} className="flex items-start gap-3 font-semibold text-navy">
                  <Tick />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {tours.length > 0 && (
        <section className="wrap mt-20" aria-labelledby="tours-heading">
          <h2 id="tours-heading" className="text-step-4 text-navy">
            Related tours
          </h2>
          <p className="measure mt-3 text-slate">We can include {a.name} in any of these itineraries, or build a trip around it.</p>
          <div className="mt-8">
            <TourGrid tours={tours} />
          </div>
        </section>
      )}

      <CtaBlock title={`Ready to plan your ${country.name} safari?`} topic={`a stay at ${a.name}`} />
    </>
  );
}
