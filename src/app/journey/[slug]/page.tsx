import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import PageHero from '@/components/ui/PageHero';
import TourGrid from '@/features/tours/components/TourGrid';
import { getJourneyType, journeyTypes } from '@/content/journeys';
import { getTours } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return journeyTypes.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const j = getJourneyType((await params).slug);
  if (!j) return {};
  return {
    title: `${j.name} Safaris`,
    description: j.description,
    alternates: { canonical: `/journey/${j.slug}` },
    openGraph: { images: [j.image.src] },
  };
}

export default async function JourneyTypePage({ params }: Props) {
  const j = getJourneyType((await params).slug);
  if (!j) notFound();
  const tours = getTours().filter((t) => t.tags.includes(j.slug));

  return (
    <>
      <Header overlay current={`/journey/${j.slug}`} />
      <PageHero image={j.image}>
        <Breadcrumb items={[{ label: 'Journey', href: '/journey' }, { label: j.name }]} />
        <h1 className="mt-4 max-w-[16ch] text-step-6">{j.name}</h1>
        <p className="mt-4 max-w-[46ch] text-step-1 text-[#dce2e6]">{j.teaser}</p>
      </PageHero>

      <section className="wrap pt-16">
        <div className="prose-safara">
          {j.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap mt-20" aria-labelledby="tours-heading">
        <h2 id="tours-heading" className="text-step-4 text-navy">
          {j.name} tours
        </h2>
        <p className="measure mt-3 text-slate">
          Every itinerary can be changed. Use these as a starting point, or ask us to design one from scratch.
        </p>
        <div className="mt-8">
          {tours.length > 0 ? (
            <TourGrid tours={tours} />
          ) : (
            <p className="text-ink/85">
              We are adding itineraries for this safari type. Tell us what you have in mind and we will design one for you.
            </p>
          )}
        </div>
      </section>

      <CtaBlock topic={`${j.name} safari`} />
    </>
  );
}
