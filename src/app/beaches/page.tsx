import type { Metadata } from 'next';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import ImageCards from '@/components/ui/ImageCards';
import { beaches } from '@/content/beaches';

export const metadata: Metadata = {
  title: 'Tanzania beaches and islands',
  description: 'Zanzibar, Pemba, Mafia and Thanda: Indian Ocean islands for a beach stay before or after your safari.',
  alternates: { canonical: '/beaches' },
};

export default function BeachesIndexPage() {
  return (
    <div data-theme="beaches" className="contents">
      <Header overlay current="/beaches" />
      <Hero
        image={beaches[0].image}
        eyebrow="Tanzania Coastal Circuit"
        title="Zanzibar and"
        titleAccent="the islands"
        breadcrumbs={[{ label: 'Beaches' }]}
      />
      <section className="band">
        <div className="wrap">
          <p className="measure mx-auto text-center text-ink">
            Tanzania’s Indian Ocean islands are a short flight from the parks. Choose lively Zanzibar, green Pemba, quiet Mafia or a private
            island.
          </p>
          <div className="mt-12">
            <ImageCards
              columns={4}
              items={beaches.map((b) => ({ title: b.name, text: b.teaser, image: b.image, href: `/beaches/${b.slug}` }))}
            />
          </div>
        </div>
      </section>
      <CtaBlock title="Ready to plan your beach escape?" />
    </div>
  );
}
