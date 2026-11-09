import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import TourGrid from '@/features/tours/components/TourGrid';
import { getTravelStyle, travelStyles } from '@/content/travel-styles';
import { getTours } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return travelStyles.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getTravelStyle((await params).slug);
  if (!s) return {};
  return {
    title: `${s.name} in Tanzania`,
    description: s.teaser,
    alternates: { canonical: `/travel-styles/${s.slug}` },
    openGraph: { images: [s.image.src] },
  };
}

export default async function TravelStylePage({ params }: Props) {
  const s = getTravelStyle((await params).slug);
  if (!s) notFound();
  const tours = getTours().filter((t) => s.tours.includes(t.slug));

  return (
    <>
      <Header overlay current="/travel-styles" />

      <Hero
        image={s.image}
        eyebrow="Travel style"
        // Italicise the last word only where it reads naturally: Fly-in *safaris*, Kilimanjaro *climbs*.
        {...(/ (safaris|climbs)$/.test(s.name)
          ? { title: s.name.replace(/ \w+$/, ''), titleAccent: s.name.split(' ').at(-1) }
          : { title: s.name })}
        breadcrumbs={[{ label: 'Travel styles' }, { label: s.name }]}
      />

      <section className="band">
        <div className="wrap">
          <div className="prose-safara mx-auto text-center">
            {s.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {s.points.map((p) => (
              <li key={p.title} className="border-t border-deep-teal/20 pt-4">
                <h2 className="font-sans text-step-0 font-bold text-ink">{p.title}</h2>
                <p className="mt-1 text-ink">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link href="/contact#enquire" className="btn btn-primary">
              Plan your journey
            </Link>
          </div>
        </div>
      </section>

      {tours.length > 0 && (
        <section className="band" aria-labelledby="journeys">
          <div className="wrap">
            <h2 id="journeys" className="text-step-3 text-ink">
              Journeys that suit
            </h2>
            <div className="mt-8">
              <TourGrid tours={tours} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
