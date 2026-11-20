import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import LodgeGallery from '@/components/ui/LodgeGallery';
import TourGrid from '@/features/tours/components/TourGrid';
import { accommodations, getAccommodation } from '@/content/accommodations';
import { getCountry } from '@/content/countries';
import { parks } from '@/content/parks';
import { getParkGuide } from '@/content/park-guides';
import { wildlifePhotos } from '@/content/wildlife-photos';
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
    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 fill-gold-ink">
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

  // Photos for "Unwind and relax": the lodge's own gallery when it has one. Until then, its setting: the lodge's
  // real main photo (if any), the park it stands in and that park's wildlife (one photo per species).
  const ownPhotos = a.gallery?.length ? [a.image, ...a.gallery] : null;
  const settingPhotos = [
    // The main photo only when it is a real, credited photo of this lodge (the rest are generic placeholders).
    ...(a.image.credit ? [a.image] : []),
    ...(park ? [park.image] : []),
    ...(getParkGuide(a.park).wildlife ?? []).flatMap((s) => wildlifePhotos[s]?.slice(0, 1) ?? []),
  ]
    .filter((p, i, all) => all.findIndex((q) => q.src === p.src) === i)
    .slice(0, 6);
  const photos = ownPhotos ?? (settingPhotos.length >= 3 ? settingPhotos : null);

  return (
    <>
      <Header overlay current={`/destinations/${country.slug}`} />
      <Hero
        image={a.image}
        eyebrow={a.area}
        title={a.name}
        cta={{ label: 'Plan your journey', href: '/contact#enquire' }}
        breadcrumbs={[
          { label: 'Destinations', href: '/destinations' },
          { label: country.name, href: `/destinations/${country.slug}#accommodations` },
          { label: a.name },
        ]}
      />

      <div className="band">
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_22rem]">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-step-4 text-ink">
              Overview of {a.name}
            </h2>
            <div className="prose-safara mt-6">
              {a.overview.map((t) => (
                <p key={t.slice(0, 40)}>{t}</p>
              ))}
            </div>
          </section>
          <aside className={`h-fit ${card}`} aria-label="At a glance">
            <dl className="divide-y divide-deep-teal/10">
              <div className="pb-3">
                <dt className="text-step--1 font-semibold text-slate">Location</dt>
                <dd className="font-semibold text-deep-teal">
                  {a.area}, {country.name}
                </dd>
              </div>
              {park && (
                <div className="py-3">
                  <dt className="text-step--1 font-semibold text-slate">Park</dt>
                  <dd>
                    <Link href={park.link ?? `/parks/${park.slug}`} className="font-semibold text-deep-teal underline underline-offset-4">
                      {park.name}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </div>

      <section className="band" aria-labelledby="rooms-heading">
        <div className="wrap">
          <h2 id="rooms-heading" className="text-step-4 text-gold-ink">
            Unwind and relax
          </h2>
          {photos ? (
            // Just the photos: the lodge's own, or its setting.
            <div className="mt-8">
              <LodgeGallery photos={photos} />
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {a.rooms.map((r) => (
                <li key={r.name} className={card}>
                  <h3 className="text-step-2 text-ink">{r.name}</h3>
                  <p className="mt-2 text-ink">{r.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="band" aria-labelledby="offer-heading">
        <div className="wrap">
          <h2 id="offer-heading" className="text-step-4 text-ink">
            Activities and amenities
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className={card}>
              <h3 className="font-sans text-step-0 font-bold uppercase tracking-[0.08em] text-ink">Activities</h3>
              <ul className="mt-4 space-y-3">
                {a.activities.map((x) => (
                  <li key={x} className="flex items-start gap-3 font-semibold text-deep-teal">
                    <Tick />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className={card}>
              <h3 className="font-sans text-step-0 font-bold uppercase tracking-[0.08em] text-ink">Amenities</h3>
              <ul className="mt-4 space-y-3">
                {a.amenities.map((x) => (
                  <li key={x} className="flex items-start gap-3 font-semibold text-deep-teal">
                    <Tick />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {tours.length > 0 && (
        <section className="band" aria-labelledby="tours-heading">
          <div className="wrap">
            <h2 id="tours-heading" className="text-step-4 text-ink">
              Related tours
            </h2>
            <p className="measure mt-3 text-ink">We can include {a.name} in any of these itineraries, or build a trip around it.</p>
            <div className="mt-8">
              <TourGrid tours={tours} />
            </div>
          </div>
        </section>
      )}

      <CtaBlock title={`Ready to plan your ${country.name} safari?`} topic={`a stay at ${a.name}`} />
    </>
  );
}
