import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBlock from '@/components/ui/CtaBlock';
import FaqList from '@/components/ui/FaqList';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import TourGrid from '@/features/tours/components/TourGrid';
import { getTrek, treks } from '@/content/treks';
import { getTours } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return treks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTrek((await params).slug);
  if (!t) return {};
  return {
    title: `${t.name} trek`,
    description: t.description,
    alternates: { canonical: `/trekking/${t.slug}` },
    openGraph: { images: [t.image.src] },
  };
}

export default async function TrekPage({ params }: Props) {
  const t = getTrek((await params).slug);
  if (!t) notFound();
  const tours = getTours().filter((tour) => tour.tags.includes(t.slug));
  const facts = [
    ['Altitude', t.facts.altitude],
    ['Typical duration', t.facts.duration],
    ['Difficulty', t.facts.difficulty],
    ['Best months', t.facts.bestMonths],
    ['Start point', t.facts.start],
  ];

  return (
    <>
      <Header overlay current={`/trekking/${t.slug}`} />
      <Hero
        image={t.image}
        // Peaks are climbed; the Usambara Mountains are walked.
        title={/Mountains$/.test(t.name) ? `Walk the ${t.name}` : `Climb ${t.name}`}
        titleAccent="with us"
        breadcrumbs={[{ label: 'Trekking', href: '/trekking' }, { label: t.name }]}
      />

      <div className="band">
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_22rem]">
          <div className="prose-safara">
            {t.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <aside aria-labelledby="facts-heading" className="h-fit bg-white p-6 shadow-[0_4px_3px_rgb(0_0_0/.08)]">
            <h2 id="facts-heading" className="font-sans text-step-0 font-bold uppercase tracking-[0.08em] text-slate">
              Quick facts
            </h2>
            <dl className="mt-4 divide-y divide-deep-teal/10">
              {facts.map(([k, v]) => (
                <div key={k} className="py-3">
                  <dt className="text-step--1 font-semibold text-slate">{k}</dt>
                  <dd className="font-semibold text-deep-teal">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/contact#enquire" className="btn btn-primary mt-4 w-full">
              Plan your trek
            </Link>
          </aside>
        </div>
      </div>

      <section className="band" aria-labelledby="routes-heading">
        <div className="wrap">
          <h2 id="routes-heading" className="text-step-4 text-ink">
            Routes and trek options
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.routes.map((r) => (
              <li key={r.name} className="bg-white p-6 shadow-[0_4px_3px_rgb(0_0_0/.08)]">
                <p className="text-step--1 font-bold text-gold-ink">{r.days}</p>
                <h3 className="mt-1 text-step-2 text-ink">{r.name}</h3>
                <p className="mt-2 text-ink">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {tours.length > 0 && (
        <section className="band" aria-labelledby="tours-heading">
          <div className="wrap">
            <h2 id="tours-heading" className="text-step-4 text-ink">
              {t.name} tours
            </h2>
            <div className="mt-8">
              <TourGrid tours={tours} />
            </div>
          </div>
        </section>
      )}

      <div className="band">
        <div className="wrap grid gap-16 lg:grid-cols-[22rem_1fr]">
          <section aria-labelledby="pack-heading">
            <h2 id="pack-heading" className="text-step-3 text-ink">
              What to pack
            </h2>
            <ul className="mt-6 space-y-2">
              {t.pack.map((p) => (
                <li key={p} className="flex gap-3 text-ink/85">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
            {t.guide && (
              <Link href={t.guide.href} className="mt-6 inline-block font-bold text-deep-teal underline underline-offset-4">
                Read: {t.guide.title}
              </Link>
            )}
          </section>
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-step-3 text-ink">
              Questions
            </h2>
            <div className="mt-6">
              <FaqList faqs={t.faqs} />
            </div>
          </section>
        </div>
      </div>

      <CtaBlock title="Ready to plan your trek?" topic={t.name} />
    </>
  );
}
