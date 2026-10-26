import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import ImageCards from '@/components/ui/ImageCards';
import { beaches } from '@/content/beaches';

export const metadata: Metadata = {
  title: 'Tanzania beaches and islands',
  description: 'Zanzibar, Pemba, Mafia and Thanda: Indian Ocean islands for a beach stay before or after your safari.',
  alternates: { canonical: '/beaches' },
};

export default function BeachesIndexPage() {
  return (
    <>
      <Header current="/beaches" />
      <section className="wrap pt-12">
        <Breadcrumb tone="dark" items={[{ label: 'Beaches' }]} />
        <h1 className="mt-4 text-step-5 text-navy">Zanzibar and the islands</h1>
        <p className="measure mt-4 text-slate">
          Tanzania’s Indian Ocean islands are a short flight from the parks. Choose lively Zanzibar, green Pemba, quiet Mafia or a private
          island.
        </p>
        <div className="mt-12">
          <ImageCards
            columns={4}
            items={beaches.map((b) => ({ title: b.name, text: b.teaser, image: b.image, href: `/beaches/${b.slug}` }))}
          />
        </div>
      </section>
      <CtaBlock title="Ready to plan your beach escape?" />
    </>
  );
}
