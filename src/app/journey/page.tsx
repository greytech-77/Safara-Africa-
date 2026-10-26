import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import CtaBlock from '@/components/CtaBlock';
import Header from '@/components/Header';
import ImageCards from '@/components/ImageCards';
import { journeyTypes } from '@/content/journeys';

export const metadata: Metadata = {
  title: 'East Africa safari types',
  description: 'Great Migration, honeymoon, family, fly-in, gorilla trekking, photographic and cultural safaris across Tanzania, Kenya, Uganda and Rwanda.',
  alternates: { canonical: '/journey' },
};

export default function JourneyIndexPage() {
  return (
    <>
      <Header current="/journey" />
      <section className="wrap pt-12">
        <Breadcrumb tone="dark" items={[{ label: 'Journey' }]} />
        <h1 className="mt-4 text-step-5 text-navy">East Africa Safaris</h1>
        <p className="measure mt-4 text-slate">Choose the kind of safari you are dreaming of. Each one can be combined with others, and every itinerary is fully tailor-made.</p>
        <div className="mt-12">
          <ImageCards columns={4} items={journeyTypes.map((j) => ({ title: j.name, text: j.teaser, image: j.image, href: `/journey/${j.slug}` }))} />
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
