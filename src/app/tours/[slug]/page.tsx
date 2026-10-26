import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CtaBlock from '@/components/ui/CtaBlock';
import FaqList from '@/components/ui/FaqList';
import JsonLd from '@/components/ui/JsonLd';
import { site } from '@/config/site';
import { parks } from '@/content/parks';
import AltitudeProfile from '@/features/itineraries/components/AltitudeProfile';
import DayByDay from '@/features/itineraries/components/DayByDay';
import EnquiryPanel from '@/features/itineraries/components/EnquiryPanel';
import KeyFacts from '@/features/itineraries/components/KeyFacts';
import ParkFeeBreakdown from '@/features/itineraries/components/ParkFeeBreakdown';
import PriceTable from '@/features/itineraries/components/PriceTable';
import RouteMap from '@/features/itineraries/components/RouteMap';
import { getAddOn, getItinerary, getItineraries, getPlace, getStays, getTours, routeStops } from '@/features/itineraries/data';
import { kindLabel } from '@/features/itineraries/labels';
import { estimateParkFees } from '@/features/itineraries/park-fees';
import { formatUsd, fromPrice } from '@/features/itineraries/pricing';
import RouteLine from '@/features/tours/components/RouteLine';
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

const FEE_EXAMPLE_TRAVELLERS = 2;

export default async function ItineraryPage({ params }: Props) {
  const it = getItinerary((await params).slug);
  if (!it) notFound();

  const stays = getStays();
  const placeMap = new Map(it.itinerary.flatMap((d) => d.places).map((p) => [p, getPlace(p)!]));
  const route = routeStops(it);
  const mapStops = route.map((s) => getPlace(s.slug!)!);
  const parkNames = [...new Set(route.flatMap((s) => (s.park ? [parks.find((p) => p.slug === s.park)?.name ?? s.place] : [])))];
  const price = fromPrice(it);
  const priceLabel = price && { label: formatUsd(price.amountUsd), groupSize: price.groupSize, isPlaceholder: price.isPlaceholder };
  const fees = estimateParkFees(it, stays, { adults: FEE_EXAMPLE_TRAVELLERS }, { on: it.pricing?.validFrom });
  const addOns = it.addOns.map((a) => getAddOn(a)!);
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

  const h2 = 'text-step-4 text-navy';

  return (
    <div className="pb-24 lg:pb-0">
      <JsonLd data={ld} />
      <Header overlay current="/tours" />

      <section className="relative isolate flex min-h-[60vh] items-end bg-navy text-[#f4f5f0] sm:min-h-[72vh]">
        <Image src={it.hero.src} alt={it.hero.alt} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/90 via-navy/30 to-navy/30" />
        <div className="wrap pb-12 pt-40">
          <Breadcrumb items={[{ label: 'Journeys', href: '/tours' }, { label: it.title }]} />
          <p className="mt-6 font-semibold text-[#dce2e6]">
            {it.days} {it.days === 1 ? 'day' : 'days'} · {it.tier} · {kindLabel[it.kind]}
          </p>
          <h1 className="mt-3 max-w-[20ch] text-step-6">{it.title}</h1>
          <div className="mt-8">
            <RouteLine route={route} tone="light" size="lg" />
          </div>
        </div>
      </section>

      <KeyFacts it={it} parkNames={parkNames} start={route[0].place} end={route.at(-1)!.place} priceFrom={priceLabel || undefined} />

      <div className="wrap grid gap-12 pt-14 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div className="min-w-0 space-y-16">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="sr-only">
              Overview
            </h2>
            <p className="measure text-step-1">{it.summary}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {it.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sun" />
                  {h}
                </li>
              ))}
            </ul>
            {it.idealFor.length > 0 && <p className="mt-6 text-step--1 text-slate">Ideal for: {it.idealFor.join(' · ')}</p>}
          </section>

          {new Set(mapStops.map((p) => p.slug)).size >= 3 && (
            <section aria-labelledby="map-heading">
              <h2 id="map-heading" className={h2}>
                Route
              </h2>
              <div className="mt-6">
                <RouteMap stops={mapStops} />
              </div>
            </section>
          )}

          {isTrek && (
            <section aria-labelledby="altitude-heading">
              <h2 id="altitude-heading" className={h2}>
                Altitude profile
              </h2>
              {it.trek && <p className="measure mt-3 text-slate">{it.trek.successRateNote}</p>}
              <div className="mt-6">
                <AltitudeProfile days={it.itinerary} />
              </div>
            </section>
          )}

          <section aria-labelledby="days-heading">
            <h2 id="days-heading" className={h2}>
              Day by day
            </h2>
            <div className="mt-6">
              <DayByDay days={it.itinerary} stays={stays} places={placeMap} />
            </div>
          </section>

          {it.pricing && (
            <section aria-labelledby="prices-heading">
              <h2 id="prices-heading" className={h2}>
                Prices
              </h2>
              <PriceTable pricing={it.pricing} />
              <div className="mt-8">
                <ParkFeeBreakdown estimate={fees} travellers={FEE_EXAMPLE_TRAVELLERS} />
              </div>
            </section>
          )}

          <section aria-labelledby="included-heading" className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 id="included-heading" className="text-step-2 text-navy">
                Included
              </h2>
              <ul className="mt-4 space-y-2">
                {it.included.map((x) => (
                  <li key={x} className="flex gap-3">
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 fill-gold">
                      <path d="M6.2 11.6 2.6 8l1.1-1.1 2.5 2.5 6.1-6.1L13.4 4.4z" />
                    </svg>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-step-2 text-navy">Not included</h2>
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

          {addOns.length > 0 && (
            <section aria-labelledby="addons-heading">
              <h2 id="addons-heading" className={h2}>
                Add to this trip
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {addOns.map((a) => (
                  <li key={a.slug} className="rounded-xl border border-navy/15 bg-white p-5">
                    <p className="text-step--1 font-semibold uppercase tracking-[0.08em] text-slate">{a.duration}</p>
                    <h3 className="mt-1 text-step-1 font-semibold text-navy">{a.title}</h3>
                    <p className="mt-2 text-step--1 text-ink/85">{a.summary}</p>
                    {a.priceFromUsd && (
                      <p className="mt-3 text-step--1 font-bold">
                        From {formatUsd(a.priceFromUsd)} pp
                        {a.isPlaceholder && <span className="font-normal text-slate"> (placeholder)</span>}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
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
      </div>

      {others.length > 0 && (
        <section className="wrap mt-24" aria-labelledby="more">
          <h2 id="more" className="text-step-3 text-navy">
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
