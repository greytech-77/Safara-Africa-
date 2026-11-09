import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import ImageCards from '@/components/ui/ImageCards';
import MonthRow from '@/components/ui/MonthRow';
import PhotoList from '@/components/ui/PhotoList';
import PhotoRail from '@/components/ui/PhotoRail';
import SectionNav, { type SectionLink } from '@/components/ui/SectionNav';
import TourGrid from '@/features/tours/components/TourGrid';
import { accommodations } from '@/content/accommodations';
import { getCountry } from '@/content/countries';
import { getParkGuide } from '@/content/park-guides';
import { getPark, parkHref, parks } from '@/content/parks';
import { getTours } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return parks.filter((p) => !p.link).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPark((await params).slug);
  if (!p) return {};
  const country = getCountry(p.country);
  return {
    title: `${p.name}, ${country?.name ?? ''}`,
    description: `${p.teaser} ${p.bestTime}`,
    alternates: { canonical: `/parks/${p.slug}` },
    openGraph: { images: [p.image.src] },
  };
}

const section = 'band scroll-mt-32';
const h2 = 'text-step-4 text-ink';
const eyebrow = 'text-step--1 font-bold uppercase tracking-[0.14em] text-gold';

export default async function ParkPage({ params }: Props) {
  const p = getPark((await params).slug);
  if (!p) notFound();
  const country = getCountry(p.country)!;
  const guide = getParkGuide(p.slug);
  const all = getTours();
  const own = all.filter((t) => t.parks.includes(p.slug));
  // When no itinerary visits this park yet, suggest trips in the same country.
  const tours = (own.length > 0 ? own : all.filter((t) => t.country === p.country)).slice(0, 4);
  const stays = accommodations.filter((a) => a.park === p.slug);
  const related = parks.filter((o) => o.country === p.country && o.slug !== p.slug).slice(0, 6);
  const hasWildlife = (guide.wildlife?.length ?? 0) > 0;
  const hasActivities = (guide.activities?.length ?? 0) > 0;
  const hasStay = stays.length > 0 || Boolean(guide.stayNote);

  // The menu lists only the sections this park has.
  const tabs: SectionLink[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'when', label: 'When to go' },
    ...(hasWildlife ? [{ id: 'wildlife', label: 'Wildlife' }] : []),
    ...(hasActivities ? [{ id: 'things-to-do', label: 'Things to do' }] : []),
    ...(tours.length > 0 ? [{ id: 'journeys', label: 'Journeys' }] : []),
    ...(hasStay ? [{ id: 'stay', label: 'Where to stay' }] : []),
    ...(guide.drives?.length ? [{ id: 'getting-there', label: 'Getting there' }] : []),
  ];

  return (
    <>
      <Header overlay current={`/destinations/${country.slug}`} />
      <Hero
        size="xl"
        image={p.image}
        eyebrow={[guide.circuit, country.name].filter(Boolean).join(' · ')}
        title={p.name}
        subtitle={guide.tagline}
        cta={{ label: 'Plan your journey', href: '/contact#enquire' }}
        breadcrumbs={[
          { label: 'Destinations', href: '/destinations' },
          { label: country.name, href: `/destinations/${country.slug}` },
          { label: p.name },
        ]}
      />
      <SectionNav label={`${p.name} sections`} links={tabs} />

      {/* Overview: the story, the key facts, then why to go beside a photo */}
      <section id="overview" className={`${section} bg-white`} aria-labelledby="overview-heading">
        <div className="wrap">
          <h2 id="overview-heading" className={`${h2} text-center`}>
            Explore {p.name}
          </h2>
          <div className="prose-safara mx-auto mt-3 text-center">
            {p.intro.map((t) => (
              <p key={t.slice(0, 40)}>{t}</p>
            ))}
          </div>

          {guide.facts && (
            <dl className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-x-12 gap-y-6 border-y border-deep-teal/15 py-6 text-center">
              {guide.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-step--1 font-semibold uppercase tracking-[0.08em] text-slate">{f.label}</dt>
                  <dd className="mt-1 font-display text-step-2 text-deep-teal">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-salt-deep">
              <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className={eyebrow}>Why go</p>
              <h3 className="mt-1 text-step-3 text-ink">What makes it special</h3>
              <ul className="mt-5 space-y-3">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-ink">
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 fill-gold">
                      <path d="M6.2 11.6 2.6 8l1.1-1.1 2.5 2.5 6.1-6.1L13.4 4.4z" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
              {guide.whoFor && (
                <p className="mt-6 text-ink">
                  <strong>Who it suits:</strong> {guide.whoFor}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="when" className={`${section} bg-[#f8f8f3]`} aria-labelledby="when-heading">
        <div className="wrap">
          <p className={eyebrow}>Month by month</p>
          <h2 id="when-heading" className={`mt-1 ${h2}`}>
            When to go
          </h2>
          <p className="measure mt-3 text-ink">{p.bestTime}</p>
          <div className="mt-6">
            <MonthRow months={p.months} />
          </div>
          {guide.seasons && (
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {guide.seasons.map((s) => (
                <div key={s.name} className="border-t border-deep-teal/20 pt-4">
                  <h3 className="text-step-2 text-ink">{s.name}</h3>
                  <p className="mt-1 text-step--1 font-bold text-gold">{s.months}</p>
                  <p className="mt-2 text-ink">{s.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {hasWildlife && (
        <section id="wildlife" className={`${section} bg-white`} aria-labelledby="wildlife-heading">
          <div className="wrap text-center">
            <h2 id="wildlife-heading" className={h2}>
              Wildlife you may see
            </h2>
            <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
              {guide.wildlife!.map((w) => (
                <li key={w} className="rounded-full border border-deep-teal/25 px-4 py-2 text-deep-teal">
                  {w}
                </li>
              ))}
            </ul>
            {guide.wildlifeNote && <p className="measure mx-auto mt-6 text-ink">{guide.wildlifeNote}</p>}
          </div>
        </section>
      )}

      {hasActivities && (
        <section id="things-to-do" className={`${section} bg-[#f8f8f3]`} aria-labelledby="things-heading">
          <div className="wrap">
            <h2 id="things-heading" className={h2}>
              Things to do
            </h2>
            <div className="mt-8">
              <PhotoList items={guide.activities!} />
            </div>
          </div>
        </section>
      )}

      {tours.length > 0 && (
        <section id="journeys" className={`${section} bg-white`} aria-labelledby="tours-heading">
          <div className="wrap">
            <h2 id="tours-heading" className={h2}>
              Journeys to inspire you
            </h2>
            <div className="mt-8">
              <TourGrid tours={tours} />
            </div>
          </div>
        </section>
      )}

      {hasStay && (
        <section id="stay" className={`${section} bg-[#f8f8f3]`} aria-labelledby="stay-heading">
          <div className="wrap">
            <h2 id="stay-heading" className={h2}>
              Where to stay
            </h2>
            {guide.stayNote && <p className="measure mt-3 text-ink">{guide.stayNote}</p>}
            {stays.length > 0 && (
              <div className="mt-8">
                <ImageCards
                  items={stays.map((a) => ({
                    title: a.name,
                    meta: a.area,
                    text: a.teaser,
                    image: a.image,
                    href: `/accommodations/${a.slug}`,
                  }))}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {guide.drives && guide.drives.length > 0 && (
        <section id="getting-there" className={`${section} bg-white`} aria-labelledby="getting-heading">
          <div className="wrap">
            <h2 id="getting-heading" className={h2}>
              Getting there
            </h2>
            <p className="measure mt-3 text-ink">Typical drive times by road. We build them into your plan, with stops along the way.</p>
            <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-3">
              {guide.drives.map((d) => (
                <div key={d.from} className="border-t border-deep-teal/20 pt-4">
                  <dt className="text-step--1 font-semibold text-slate">From {d.from}</dt>
                  <dd className="mt-1 font-display text-step-2 text-deep-teal">{d.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="band bg-[#f8f8f3]" aria-labelledby="related-heading">
          <div className="wrap">
            <h2 id="related-heading" className={h2}>
              More places in {country.name}
            </h2>
            <div className="mt-8">
              <PhotoRail
                label={`More places in ${country.name}`}
                items={related.map((o) => ({ title: o.name, text: o.teaser, image: o.image, href: parkHref(o) }))}
              />
            </div>
          </div>
        </section>
      )}

      <CtaBlock title={`Ready to plan your ${country.name} safari?`} topic={p.name} />
    </>
  );
}
