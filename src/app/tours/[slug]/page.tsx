import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import CtaBlock from '@/components/ui/CtaBlock';
import FaqList from '@/components/ui/FaqList';
import Hero from '@/components/ui/Hero';
import JsonLd from '@/components/ui/JsonLd';
import { site } from '@/config/site';
import AltitudeProfile from '@/features/itineraries/components/AltitudeProfile';
import DayByDay from '@/features/itineraries/components/DayByDay';
import EnquiryPanel from '@/features/itineraries/components/EnquiryPanel';
import RouteProgressMap from '@/features/itineraries/components/RouteProgressMap';
import { dayImage, getItinerary, getItineraries, getPlace, getStays, getTours, routePath, routeStops } from '@/features/itineraries/data';
import { kindLabel, tierLabel } from '@/features/itineraries/labels';
import { formatUsd, fromPrice } from '@/features/itineraries/pricing';
import TourGrid from '@/features/tours/components/TourGrid';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getItineraries().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const it = getItinerary((await params).slug);
  if (!it) return {};
  return {
    title: it.title,
    description: it.summary,
    alternates: { canonical: `/tours/${it.slug}` },
    openGraph: { images: [it.hero.src] },
  };
}

export default async function ItineraryPage({ params }: Props) {
  const it = getItinerary((await params).slug);
  if (!it) notFound();

  const stays = getStays();
  const placeMap = new Map(it.itinerary.flatMap((d) => d.places).map((p) => [p, getPlace(p)!]));
  const route = routeStops(it);
  const { points, dayEnds } = routePath(it);
  const dayImages = new Map(it.itinerary.map((d) => [d.day, dayImage(it, d)]));
  // PLACEHOLDER map drawn from place coordinates; swap for a tiled map (Mapbox, MapTiler…) once there is an API key.
  const routeMap = <RouteProgressMap points={points} dayEnds={dayEnds} days={it.itinerary.map((d) => ({ day: d.day, title: d.title }))} />;
  const price = fromPrice(it);
  const priceLabel = price && { label: formatUsd(price.amountUsd), groupSize: price.groupSize, isPlaceholder: price.isPlaceholder };
  const isTrek = it.itinerary.some((d) => d.trek);
  const others = getTours()
    .filter((t) => t.slug !== it.slug && t.country === it.country && t.kind === it.kind)
    .slice(0, 3);

  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: it.title,
    description: it.summary,
    image: it.hero.src,
    touristType: it.idealFor,
    itinerary: {
      '@type': 'ItemList',
      itemListElement: route.map((s, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Place', name: s.place } })),
    },
    provider: { '@type': 'TravelAgency', name: site.legalName, url: site.url },
  };
  // Offers only for confirmed prices: placeholder figures must never reach search results.
  if (price && !price.isPlaceholder && it.pricing) {
    ld.offers = {
      '@type': 'Offer',
      price: price.amountUsd,
      priceCurrency: 'USD',
      validFrom: it.pricing.validFrom,
      priceValidUntil: it.pricing.validTo,
      url: `${site.url}/tours/${it.slug}`,
    };
  }

  const h2 = 'text-step-4 text-ink';

  return (
    <div className="pb-24 lg:pb-0">
      <JsonLd data={ld} />
      <Header overlay current="/tours" />

      <Hero
        image={it.hero}
        eyebrow={`${it.days} ${it.days === 1 ? 'day' : 'days'} · ${tierLabel[it.tier]} · ${kindLabel[it.kind]}`}
        title={it.title}
        cta={{ label: 'Enquire about this trip', href: `/contact?tour=${it.slug}#enquire` }}
        breadcrumbs={[{ label: 'Journeys', href: '/tours' }, { label: it.title }]}
      />

      {/* The journey in a few lines, centred, before the detail. */}
      <section aria-labelledby="overview-heading" className="wrap flex flex-col items-center py-section text-center">
        <h2 id="overview-heading" className="text-step--1 font-bold uppercase tracking-[0.14em] text-gold-ink">
          The journey
        </h2>
        <p className="mt-3 max-w-[38ch] font-display text-step-3 leading-snug text-ink">{it.summary}</p>
        <ul className="mt-10 flex max-w-4xl flex-wrap justify-center gap-x-8 gap-y-3 text-ink/85">
          {it.highlights.map((h) => (
            <li key={h} className="flex items-center gap-3">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-gold" />
              {h}
            </li>
          ))}
        </ul>
        {it.idealFor.length > 0 && <p className="mt-8 text-step--1 text-ink">Ideal for: {it.idealFor.join(' · ')}</p>}
      </section>

      {/* Day by day on the left; the route map stays pinned on the right while the days scroll by. */}
      <div className="wrap grid gap-12 pb-section lg:grid-cols-[1fr_24rem] lg:gap-16">
        <section aria-labelledby="days-heading" className="min-w-0">
          <h2 id="days-heading" className={h2}>
            Day by day
          </h2>
          {/* Phones and tablets have no sidebar, so the map sits above the days instead. */}
          <div className="mt-6 max-w-md lg:hidden">{routeMap}</div>
          <div className="mt-6">
            <DayByDay days={it.itinerary} stays={stays} places={placeMap} images={dayImages} />
          </div>
        </section>
        <aside aria-label="Route map" className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+1rem)]">{routeMap}</div>
        </aside>
      </div>

      <div className="wrap space-y-16 pb-section">
        <section aria-labelledby="included-heading" className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 id="included-heading" className="text-step-2 text-ink">
              Included
            </h2>
            <ul className="mt-4 space-y-2">
              {it.included.map((x) => (
                <li key={x} className="flex gap-3">
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 fill-gold-ink">
                    <path d="M6.2 11.6 2.6 8l1.1-1.1 2.5 2.5 6.1-6.1L13.4 4.4z" />
                  </svg>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-step-2 text-ink">Not included</h2>
            <ul className="mt-4 space-y-2 text-ink/85">
              {it.excluded.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold text-slate">
                    ×
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {isTrek && (
          <section aria-labelledby="altitude-heading">
            <h2 id="altitude-heading" className={h2}>
              Altitude profile
            </h2>
            {it.trek && <p className="measure mt-3 text-ink">{it.trek.successRateNote}</p>}
            <div className="mt-6">
              <AltitudeProfile days={it.itinerary} />
            </div>
          </section>
        )}

        {it.faqs.length > 0 && (
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className={h2}>
              Questions
            </h2>
            <div className="mt-6">
              <FaqList faqs={it.faqs} />
            </div>
          </section>
        )}
      </div>

      <EnquiryPanel slug={it.slug} title={it.title} days={it.days} price={priceLabel || undefined} />

      {others.length > 0 && (
        <section className="wrap pb-section" aria-labelledby="more">
          <h2 id="more" className="text-step-4 text-ink">
            Similar journeys
          </h2>
          <div className="mt-8">
            <TourGrid tours={others} />
          </div>
        </section>
      )}

      <CtaBlock title="Want to change this trip?" topic={it.title} />
    </div>
  );
}
