import type { Metadata } from 'next';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import ImageCards from '@/components/ui/ImageCards';
import { countries } from '@/content/countries';

export const metadata: Metadata = {
  title: 'East Africa destinations',
  description:
    'Safaris in Tanzania, Kenya, Uganda and Rwanda: national parks, gorilla trekking, the Great Migration and the best time to visit each country.',
  alternates: { canonical: '/destinations' },
};

export default function DestinationsPage() {
  return (
    <>
      <Header overlay current="/destinations" />
      <Hero image={countries[0].image} title="East Africa" titleAccent="destinations" breadcrumbs={[{ label: 'Destinations' }]} />
      <section className="band">
        <div className="wrap">
          <p className="measure mx-auto text-center text-ink">
            We are based in Tanzania and plan safaris across East Africa. Most journeys combine more than one country, in whatever order
            suits you.
          </p>
          <div className="mt-12">
            <ImageCards
              columns={4}
              items={countries.map((c) => ({ title: c.name, text: c.tagline, image: c.image, href: `/destinations/${c.slug}` }))}
            />
          </div>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
