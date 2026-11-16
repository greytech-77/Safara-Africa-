import type { Metadata } from 'next';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import ImageCards from '@/components/ui/ImageCards';
import { treks } from '@/content/treks';

export const metadata: Metadata = {
  title: 'Trekking in Tanzania',
  description: 'Climb Kilimanjaro and Mount Meru, take on Ol Doinyo Lengai or walk the Usambara Mountains with experienced local guides.',
  alternates: { canonical: '/trekking' },
};

export default function TrekkingIndexPage() {
  return (
    <>
      <Header overlay current="/trekking" />
      <Hero image={treks[0].image} title="Trekking" titleAccent="in Tanzania" breadcrumbs={[{ label: 'Trekking' }]} />
      <section className="band">
        <div className="wrap">
          <p className="measure mx-auto text-center text-ink">
            From Africa’s highest summit to gentle village walks, with licensed guides and fairly treated crews.
          </p>
          <div className="mt-12">
            <ImageCards
              columns={4}
              items={treks.map((t) => ({ title: t.name, text: t.teaser, image: t.image, href: `/trekking/${t.slug}` }))}
            />
          </div>
        </div>
      </section>
      <CtaBlock title="Ready to plan your trek?" />
    </>
  );
}
