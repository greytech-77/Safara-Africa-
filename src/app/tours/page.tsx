import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import { beaches } from '@/content/beaches';
import { countries } from '@/content/countries';
import { journeyTypes } from '@/content/journeys';
import { pageHeroes } from '@/content/page-heroes';
import { parks } from '@/content/parks';
import { treks } from '@/content/treks';
import ItineraryBrowser, { type FilterOptions } from '@/features/itineraries/components/ItineraryBrowser';
import { toCard } from '@/features/itineraries/data';
import { kindLabel } from '@/features/itineraries/labels';
import { getTours } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Tanzania tours and safaris',
  description:
    'Safaris from one day to two weeks, the Great Migration, Kilimanjaro and Mount Meru climbs, and Zanzibar stays, each with a day-by-day plan and prices. Filter by length, budget, park and month.',
  alternates: { canonical: '/tours' },
};

export default function ToursPage() {
  const tours = getTours();
  const used = <T extends { slug: string }>(list: T[], has: (slug: string) => boolean) => list.filter((x) => has(x.slug));

  // Only offer filter values that at least one trip has.
  const options: FilterOptions = {
    kinds: (Object.keys(kindLabel) as (keyof typeof kindLabel)[])
      .filter((k) => tours.some((t) => t.kind === k))
      .map((k) => ({ value: k, label: kindLabel[k] })),
    parks: used(parks, (s) => tours.some((t) => t.parks.includes(s))).map((p) => ({ value: p.slug, label: p.name })),
    styles: used([...journeyTypes, ...treks, ...beaches], (s) => tours.some((t) => t.tags.includes(s))).map((s) => ({
      value: s.slug,
      label: s.name,
    })),
    countries: used(countries, (s) => tours.some((t) => t.country === s)).map((c) => ({ value: c.slug, label: c.name })),
  };

  return (
    <>
      <Header overlay current="/tours" />
      <Hero size="md" image={pageHeroes.tours.image} title="Our" titleAccent="journeys" breadcrumbs={[{ label: 'Journeys' }]} />
      <section className="band">
        <div className="wrap">
          <p className="measure mx-auto text-center text-ink">
            Sample trips with a day-by-day plan and prices. Start from one and we will change the dates, lodges and length to suit you, or
            design something new.
          </p>
        </div>
      </section>
      <section className="band" aria-label="All journeys">
        <div className="wrap">
          <ItineraryBrowser tours={tours.map(toCard)} options={options} />
        </div>
      </section>
    </>
  );
}
