import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import ImageCards from '@/components/ui/ImageCards';
import MonthRow from '@/components/ui/MonthRow';
import PageHero from '@/components/ui/PageHero';
import TourGrid from '@/features/tours/components/TourGrid';
import { accommodations } from '@/content/accommodations';
import { getCountry } from '@/content/countries';
import { getPark, parkHref, parks } from '@/content/parks';
import { getTours } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return parks.filter((p) => !p.link).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPark((await params).slug);
  if (!p) return {};
  const country = getCountry(p.country);
  return {
    title: `${p.name}, ${country?.name ?? ''}`,
    description: `${p.teaser} ${p.bestTime}`,
    alternates: { canonical: `/parks/${p.slug}` },
    openGraph: { images: [p.image.src] },
  };
}

export default async function ParkPage({ params }: Props) {
  const p = getPark((await params).slug);
  if (!p) notFound();
  const country = getCountry(p.country)!;
  const all = getTours();
  const own = all.filter((t) => t.parks.includes(p.slug));
  // When no itinerary visits this park yet, suggest trips in the same country.
  const tours = (own.length > 0 ? own : all.filter((t) => t.country === p.country)).slice(0, 4);
  const stays = accommodations.filter((a) => a.park === p.slug);
  const related = parks.filter((o) => o.country === p.country && o.slug !== p.slug).slice(0, 3);

  return (
    <>
      <Header overlay current={`/destinations/${country.slug}`} />
      <PageHero image={p.image}>
        <Breadcrumb
          items={[
            { label: 'Destinations', href: '/destinations' },
            { label: country.name, href: `/destinations/${country.slug}` },
            { label: p.name },
          ]}
        />
        <h1 className="mt-4 max-w-[16ch] text-step-6">{p.name}</h1>
        <p className="mt-4 max-w-[46ch] text-step-1 text-[#dce2e6]">{p.teaser}</p>
      </PageHero>

      <div className="wrap grid gap-16 pt-16 lg:grid-cols-[1fr_22rem]">
        <section aria-labelledby="explore-heading">
          <h2 id="explore-heading" className="text-step-4 text-navy">
            Explore {p.name}
          </h2>
          <div className="prose-safara mt-6">
            {p.intro.map((t) => (
              <p key={t.slice(0, 40)}>{t}</p>
            ))}
          </div>
        </section>
        <aside aria-labelledby="more-heading" className="h-fit bg-white p-6 shadow-[0_4px_3px_rgb(0_0_0/.08)]">
          <h2 id="more-heading" className="font-sans text-step-0 font-bold uppercase tracking-[0.08em] text-slate">
            Explore more
          </h2>
          <ul className="mt-4 space-y-3">
            {p.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 font-semibold text-navy">
                <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 fill-gold">
                  <path d="M6.2 11.6 2.6 8l1.1-1.1 2.5 2.5 6.1-6.1L13.4 4.4z" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
          <Link href="/contact#enquire" className="btn btn-primary mt-6 w-full">
            Plan a trip to {p.name}
          </Link>
        </aside>
      </div>

      <section className="wrap mt-20" aria-labelledby="when-heading">
        <p className="text-step--1 font-bold uppercase tracking-[0.14em] text-gold">Month-by-month guide</p>
        <h2 id="when-heading" className="mt-1 text-step-3 text-navy">
          When to visit
        </h2>
        <p className="measure mt-3 text-slate">{p.bestTime}</p>
        <div className="mt-6">
          <MonthRow months={p.months} />
        </div>
      </section>

      {tours.length > 0 && (
        <section className="wrap mt-20" aria-labelledby="tours-heading">
          <p className="text-step--1 font-bold uppercase tracking-[0.14em] text-gold">Sample itineraries</p>
          <h2 id="tours-heading" className="mt-1 text-step-4 text-navy">
            Trips to inspire
          </h2>
          <div className="mt-8">
            <TourGrid tours={tours} />
          </div>
        </section>
      )}

      {stays.length > 0 && (
        <section className="wrap mt-20" aria-labelledby="stay-heading">
          <h2 id="stay-heading" className="text-step-4 text-navy">
            Where to stay
          </h2>
          <div className="mt-8">
            <ImageCards
              items={stays.map((a) => ({ title: a.name, meta: a.area, text: a.teaser, image: a.image, href: `/accommodations/${a.slug}` }))}
            />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="wrap mt-20" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-step-4 text-navy">
            Related national parks
          </h2>
          <div className="mt-8">
            <ImageCards items={related.map((o) => ({ title: o.name, text: o.teaser, image: o.image, href: parkHref(o) }))} />
          </div>
        </section>
      )}

      <CtaBlock title={`Ready to plan your ${country.name} safari?`} topic={p.name} />
    </>
  );
}
