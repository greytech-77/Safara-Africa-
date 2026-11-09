import type { Metadata } from 'next';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import LodgeShowcase from '@/components/ui/LodgeShowcase';
import { lodgeCountries, lodgeTiles } from '@/content/accommodations';
import { pageHeroes } from '@/content/page-heroes';

export const metadata: Metadata = {
  title: 'Camps and lodges',
  description: 'The safari camps and lodges we work with in Tanzania, Kenya, Uganda and Rwanda, from treehouse rooms to forest villas.',
  alternates: { canonical: '/accommodations' },
};

type Props = { searchParams: Promise<{ country?: string }> };

// Every lodge and camp, filtered by country. The home page's "Show all" button opens this page on the country chosen there.
export default async function AccommodationsPage({ searchParams }: Props) {
  const { country } = await searchParams;

  return (
    <>
      <Header overlay current="/accommodations" />
      <Hero
        size="md"
        image={pageHeroes.accommodations.image}
        title="Camps"
        titleAccent="& lodges"
        breadcrumbs={[{ label: 'Camps & lodges' }]}
      />
      <section className="band" aria-labelledby="lodges-heading">
        <div className="wrap">
          <h2 id="lodges-heading" className="text-step-4 text-ink">
            Hand-picked camps &amp; lodges
          </h2>
          <p className="measure mt-3 text-ink">
            Every place we suggest is chosen for its setting and the way it looks after you. Pick a country, then open a lodge to see its
            rooms and what you can do there.
          </p>
          <div className="mt-8">
            <LodgeShowcase lodges={lodgeTiles} countries={lodgeCountries} initialCountry={country} />
          </div>
        </div>
      </section>
      <CtaBlock title="Found a place you love?" text="Tell us which lodges caught your eye and we will build a journey around them." />
    </>
  );
}
