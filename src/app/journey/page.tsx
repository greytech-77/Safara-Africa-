import type { Metadata } from 'next';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import ImageCards from '@/components/ui/ImageCards';
import { journeyTypes } from '@/content/journeys';

export const metadata: Metadata = {
  title: 'East Africa safari types',
  description:
    'Great Migration, honeymoon, family, fly-in, gorilla trekking, photographic and cultural safaris across Tanzania, Kenya, Uganda and Rwanda.',
  alternates: { canonical: '/journey' },
};

export default function JourneyIndexPage() {
  return (
    <>
      <Header overlay current="/journey" />
      <Hero image={journeyTypes[0].image} title="East Africa" titleAccent="safaris" breadcrumbs={[{ label: 'Journeys' }]} />
      <section className="band">
        <div className="wrap">
          <p className="measure mx-auto text-center text-ink">
            Choose the kind of safari you are dreaming of. Each one can be combined with others, and every itinerary is fully tailor-made.
          </p>
          <div className="mt-12">
            <ImageCards
              columns={4}
              items={journeyTypes.map((j) => ({ title: j.name, text: j.teaser, image: j.image, href: `/journey/${j.slug}` }))}
            />
          </div>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
