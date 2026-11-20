import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import FaqList from '@/components/ui/FaqList';
import Hero from '@/components/ui/Hero';
import JsonLd from '@/components/ui/JsonLd';
import EnquiryForm from '@/features/enquiry/components/EnquiryForm';
import { site } from '@/config/site';
import AltitudeProfile from '@/features/itineraries/components/AltitudeProfile';
import DayByDay from '@/features/itineraries/components/DayByDay';
import EnquiryPanel from '@/features/itineraries/components/EnquiryPanel';
import ParkFeeBreakdown from '@/features/itineraries/components/ParkFeeBreakdown';
import PriceTable from '@/features/itineraries/components/PriceTable';
import TripOverview, { type StayRun } from '@/features/itineraries/components/TripOverview';
import { getItinerary, getItineraries, getPlace, getStays, getTours, routeStops } from '@/features/itineraries/data';
import { estimateParkFees } from '@/features/itineraries/park-fees';
import { formatUsd, fromPrice } from '@/features/itineraries/pricing';
import TourGrid from '@/features/tours/components/TourGrid';
import { GuestQuote } from '@/features/itineraries/components/TripProof';

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
  // Where you'll stay: consecutive nights at the same lodge grouped into one line.
  const stayRuns: StayRun[] = [];
  for (const d of it.itinerary) {
    const stay = d.stay ? stays.get(d.stay) : undefined;
    if (!stay) continue;
    const last = stayRuns.at(-1);
    if (last && last.stay.slug === stay.slug) last.nights += 1;
    else stayRuns.push({ stay, place: getPlace(stay.place)?.name ?? stay.place, nights: 1 });
  }
  const startPlace = placeMap.get(it.itinerary[0].places[0])?.name;
  const endPlace = placeMap.get(it.itinerary.at(-1)!.places.at(-1)!)?.name;
  const price = fromPrice(it);
  const priceLabel = price && { label: formatUsd(price.amountUsd), groupSize: price.groupSize, isPlaceholder: price.isPlaceholder };
  const isTrek = it.itinerary.some((d) => d.trek);
  const others = getTours()
    .filter((t) => t.slug !== it.slug && t.country === it.country && t.kind === it.kind)
    .slice(0, 3);
  const tours = getTours().map((t) => ({ slug: t.slug, label: t.title }));
  const feeEstimate = estimateParkFees(it, stays, { adults: 2 });

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
    <div className="tour-page bg-off-white pb-24 lg:pb-0">
      <JsonLd data={ld} />
      <Header overlay current="/tours" />

      <Hero
        image={it.hero}
        className="hero--itinerary"
        title={it.title}
        cta={{ label: 'Plan your journey', href: '#enquire' }}
        breadcrumbs={[{ label: 'Journeys', href: '/tours' }, { label: it.title }]}
      />

      <TripOverview
        it={it}
        stops={route}
        stayRuns={stayRuns}
        start={startPlace}
        end={endPlace}
        price={priceLabel ? { label: priceLabel.label, isPlaceholder: priceLabel.isPlaceholder } : undefined}
      />

      {/* Day by day */}
      <section aria-labelledby="days-heading" className="wrap pb-section">
        <h2 id="days-heading" className={h2}>
          Day by day
        </h2>
        <div className="mt-4">
          {it.seasonNote && (
            <p className="mb-5 flex gap-3 rounded-lg border border-gold-ink/30 bg-white px-4 py-3 text-step--1 text-ink">
              <span aria-hidden="true" className="text-gold-ink">
                ◷
              </span>
              <span>
                <span className="font-medium text-heading">When to go: </span>
                {it.seasonNote}
              </span>
            </p>
          )}
          <DayByDay
            days={it.itinerary}
            stays={stays}
            places={placeMap}
            quoteAfterDay={it.days >= 4 ? Math.ceil(it.days / 2) + 1 : undefined}
            quote={<GuestQuote />}
          />
        </div>
      </section>

      {/* Pricing & park fees */}
      {(it.pricing || feeEstimate.lines.length > 0) && (
        <section id="pricing" aria-labelledby="pricing-heading" className="wrap scroll-mt-28 pb-section">
          <h2 id="pricing-heading" className={h2}>
            Pricing &amp; park fees
          </h2>
          <div className="mt-6">
            {it.pricing && <PriceTable pricing={it.pricing} />}
            {feeEstimate.lines.length > 0 && (
              <details className="group mt-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-step-1 font-semibold text-deep-teal">
                  Park and government fees in this price (example for 2 travellers)
                  <span aria-hidden="true" className="mt-1 text-gold-ink transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-4">
                  <ParkFeeBreakdown estimate={feeEstimate} travellers={2} />
                </div>
              </details>
            )}
          </div>
        </section>
      )}

      {/* Included / Not included */}
      <section id="included" aria-labelledby="included-heading" className="wrap scroll-mt-28 grid gap-8 pb-section md:grid-cols-2">
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

      {/* Why you'll love this journey */}
      {it.whyLove.length > 0 && (
        <div className="wrap pb-section">
          <div className="rounded-2xl bg-sand/50 p-6 sm:p-8">
            <h3 className="text-step-2 text-ink">Why you&apos;ll love this journey</h3>
            <ul className="mt-4 space-y-2">
              {it.whyLove.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden="true" className="text-gold-ink">
                    ✦
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <a href="#enquire" className="btn btn-primary mt-6">
              Plan your journey
            </a>
          </div>
        </div>
      )}

      {/* Altitude profile (treks) */}
      {isTrek && (
        <section aria-labelledby="altitude-heading" className="wrap pb-section">
          <h2 id="altitude-heading" className={h2}>
            Altitude profile
          </h2>
          {it.trek && <p className="measure mt-3 text-ink">{it.trek.successRateNote}</p>}
          <div className="mt-6">
            <AltitudeProfile days={it.itinerary} />
          </div>
        </section>
      )}

      {/* Enquiry form */}
      <section id="enquire" aria-labelledby="enquire-heading" className="wrap scroll-mt-28 pb-section">
        <h2 id="enquire-heading" className={h2}>
          Plan your journey
        </h2>
        <p className="measure mt-3 text-ink">
          Tell us your dates and we will tailor this trip to you and send a free, no-obligation quote.
        </p>
        <div className="mt-6 rounded-2xl border border-deep-teal/10 bg-white p-6 sm:p-8">
          <EnquiryForm tours={tours} preselect={it.slug} />
        </div>
      </section>

      {/* Questions */}
      {it.faqs.length > 0 && (
        <section aria-labelledby="faq-heading" className="wrap pb-section">
          <h2 id="faq-heading" className={h2}>
            Questions
          </h2>
          <div className="mt-6">
            <FaqList faqs={it.faqs} />
          </div>
        </section>
      )}

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
    </div>
  );
}
