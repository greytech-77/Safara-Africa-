import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
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
      <Header current="/trekking" />
      <section className="wrap pt-12">
        <Breadcrumb tone="dark" items={[{ label: 'Trekking' }]} />
        <h1 className="mt-4 text-step-5 text-navy">Trekking in Tanzania</h1>
        <p className="measure mt-4 text-slate">From Africa’s highest summit to gentle village walks, with licensed guides and fairly treated crews.</p>
        <div className="mt-12">
          <ImageCards columns={4} items={treks.map((t) => ({ title: t.name, text: t.teaser, image: t.image, href: `/trekking/${t.slug}` }))} />
        </div>
      </section>
      <CtaBlock title="Ready to plan your trek?" />
    </>
  );
}
