import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import ImageCards from '@/components/ui/ImageCards';
import MonthRow from '@/components/ui/MonthRow';
import TourGrid from '@/features/tours/components/TourGrid';
import { beaches, getBeach } from '@/content/beaches';
import { getTours } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return beaches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = getBeach((await params).slug);
  if (!b) return {};
  return {
    title: `${b.name} holidays`,
    description: b.description,
    alternates: { canonical: `/beaches/${b.slug}` },
    openGraph: { images: [b.image.src] },
  };
}

export default async function BeachPage({ params }: Props) {
  const b = getBeach((await params).slug);
  if (!b) notFound();
  const all = getTours();
  const own = all.filter((t) => t.tags.includes(b.slug));
  // Fall back to other beach stays when this island has no itinerary of its own yet.
  const tours = own.length > 0 ? own : all.filter((t) => t.style === 'Beach');
  const others = beaches.filter((o) => o.slug !== b.slug);

  return (
    <div data-theme="beaches" className="contents">
      <Header overlay current={`/beaches/${b.slug}`} />
      <Hero
        image={b.image}
        eyebrow="Tanzania Coastal Circuit"
        title={b.name.replace(/ Island$/, '')}
        titleAccent="island escapes"
        breadcrumbs={[{ label: 'Beaches', href: '/beaches' }, { label: b.name }]}
      />

      <div className="band">
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_22rem]">
          <section aria-labelledby="explore-heading">
            <h2 id="explore-heading" className="text-step-4 text-ink">
              Explore {b.name}
            </h2>
            <div className="prose-safara mt-6">
              {b.intro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>
          <aside aria-labelledby="things-heading" className="h-fit bg-white p-6 shadow-[0_4px_3px_rgb(0_0_0/.08)]">
            <h2 id="things-heading" className="font-sans text-step-0 font-bold uppercase tracking-[0.08em] text-slate">
              Things to do
            </h2>
            <ul className="mt-4 space-y-3">
              {b.activities.map((a) => (
                <li key={a} className="flex items-start gap-3 font-semibold text-deep-teal">
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 fill-gold-ink">
                    <path d="M6.2 11.6 2.6 8l1.1-1.1 2.5 2.5 6.1-6.1L13.4 4.4z" />
                  </svg>
                  {a}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <section className="band" aria-labelledby="map-heading">
        <div className="wrap">
          <h2 id="map-heading" className="text-step-3 text-ink">
            Where is {b.name}?
          </h2>
          <div className="mt-6 aspect-[16/9] overflow-hidden bg-sand sm:aspect-[21/9]">
            <iframe
              title={`Map of ${b.name}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(b.map)}&z=9&output=embed`}
              loading="lazy"
              className="size-full border-0"
            />
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="when-heading">
        <div className="wrap">
          <h2 id="when-heading" className="text-step-3 text-ink">
            When to visit
          </h2>
          <div className="mt-6">
            <MonthRow months={b.months} />
          </div>
        </div>
      </section>

      {tours.length > 0 && (
        <section className="band" aria-labelledby="tours-heading">
          <div className="wrap">
            <h2 id="tours-heading" className="text-step-4 text-ink">
              {own.length > 0 ? `${b.name} packages` : 'Beach packages'}
            </h2>
            <div className="mt-8">
              <TourGrid tours={tours} />
            </div>
          </div>
        </section>
      )}

      <section className="band" aria-labelledby="related-heading">
        <div className="wrap">
          <h2 id="related-heading" className="text-step-4 text-ink">
            Related destinations
          </h2>
          <div className="mt-8">
            <ImageCards items={others.map((o) => ({ title: o.name, text: o.teaser, image: o.image, href: `/beaches/${o.slug}` }))} />
          </div>
        </div>
      </section>

      <CtaBlock title="Ready to plan your beach escape?" topic={b.name} />
    </div>
  );
}
