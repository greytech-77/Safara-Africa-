import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
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

// "Honeymoon Safari" → Honeymoon *safari*; "Great Migration" → Great Migration *safaris*.
function heroTitle(name: string) {
  const m = name.match(/^(.+) (safaris?|trekking)$/i);
  if (m) return { title: m[1], titleAccent: m[2].toLowerCase() };
  return /safari/i.test(name) ? { title: name } : { title: name, titleAccent: 'safaris' };
}

export default async function JourneyTypePage({ params }: Props) {
  const j = getJourneyType((await params).slug);
  if (!j) notFound();
  const tours = getTours().filter((t) => t.tags.includes(j.slug));

  return (
    <>
      <Header overlay current={`/journey/${j.slug}`} />
      <Hero image={j.image} {...heroTitle(j.name)} breadcrumbs={[{ label: 'Journeys', href: '/journey' }, { label: j.name }]} />

      <section className="band">
        <div className="wrap">
          <div className="prose-safara mx-auto text-center">
            {j.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="tours-heading">
        <div className="wrap">
          <h2 id="tours-heading" className="text-step-4 text-ink">
            {j.name} tours
          </h2>
          <p className="measure mt-3 text-ink">
            Every itinerary can be changed. Use these as a starting point, or ask us to design one from scratch.
          </p>
          <div className="mt-8">
            {tours.length > 0 ? (
              <TourGrid tours={tours} />
            ) : (
              <p className="text-ink">
                We are adding itineraries for this safari type. Tell us what you have in mind and we will design one for you.
              </p>
            )}
          </div>
        </div>
      </section>

      <CtaBlock topic={`${j.name} safari`} />
    </>
  );
}
