import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import CtaBlock from '@/components/CtaBlock';
import Header from '@/components/Header';
import ImageCards from '@/components/ImageCards';
import { countries } from '@/content/countries';

export const metadata: Metadata = {
  title: 'East Africa destinations',
  description: 'Safaris in Tanzania, Kenya, Uganda and Rwanda: national parks, gorilla trekking, the Great Migration and the best time to visit each country.',
  alternates: { canonical: '/destinations' },
};

export default function DestinationsPage() {
  return (
    <>
      <Header current="/destinations" />
      <section className="wrap pt-12">
        <Breadcrumb tone="dark" items={[{ label: 'Destinations' }]} />
        <h1 className="mt-4 text-step-5 text-navy">Destinations</h1>
        <p className="measure mt-4 text-slate">We are based in Tanzania and plan safaris across East Africa. Most journeys combine more than one country, in whatever order suits you.</p>
        <div className="mt-12">
          <ImageCards columns={4} items={countries.map((c) => ({ title: c.name, text: c.tagline, image: c.image, href: `/destinations/${c.slug}` }))} />
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
