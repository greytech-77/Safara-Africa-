import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBlock from '@/components/ui/CtaBlock';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import ParkWhenToGo from '@/components/ui/ParkWhenToGo';
import PhotoRail from '@/components/ui/PhotoRail';
import SectionNav, { type SectionLink } from '@/components/ui/SectionNav';
import WildlifeStrip from '@/components/ui/WildlifeStrip';
import TourGrid from '@/features/tours/components/TourGrid';
import { accommodations, lodgeTiles } from '@/content/accommodations';
import LodgeCards from '@/components/ui/LodgeCards';
import { getCountry } from '@/content/countries';
import { getParkGuide } from '@/content/park-guides';
import ParkHighlights from '@/components/park-highlights/ParkHighlights';
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
const eyebrow = 'font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-gold-ink';

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

  // Every park and reserve page has the same five sections, in this order. A section with no content yet shows a
  // short line inviting the traveller to ask the team, so nothing is invented.
  const tabs: SectionLink[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'when', label: 'When to go' },
    { id: 'wildlife', label: 'Wildlife' },
    { id: 'journeys', label: 'Journeys' },
    { id: 'stay', label: 'Where to stay' },
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
      <section id="overview" className={section} aria-labelledby="overview-heading">
        <div className="wrap">
          <h2 id="overview-heading" className={`${h2} text-center`}>
            Explore {p.name}
          </h2>
          <div className="prose-safara mx-auto mt-3 text-center">
            {p.intro.map((t) => (
              <p key={t.slice(0, 40)}>{t}</p>
            ))}
          </div>

          {guide.facts && <ParkHighlights parkSlug={p.slug} items={guide.facts} />}

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
              <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className={eyebrow}>Why go</p>
              <h3 className="mt-1 text-step-3 text-ink">What makes it special</h3>
              <ul className="mt-5 space-y-3">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-ink">
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 fill-gold-ink">
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

      <ParkWhenToGo parkName={p.name} months={p.months} bestTime={p.bestTime} content={guide.whenToGo} />

      <WildlifeStrip
        title="Wildlife you may see"
        species={guide.wildlife ?? []}
        note={guide.wildlifeNote}
        empty={<AskUs dark>Our team can tell you what you are likely to see in {p.name} in the month you travel.</AskUs>}
      />

      <section id="journeys" className={section} aria-labelledby="tours-heading">
        <div className="wrap">
          <h2 id="tours-heading" className={h2}>
            Journeys to inspire you
          </h2>
          {tours.length > 0 ? (
            <div className="mt-8">
              <TourGrid tours={tours} />
            </div>
          ) : (
            <AskUs>We do not have a set journey here yet, but we can plan one around {p.name} for you.</AskUs>
          )}
        </div>
      </section>

      <section id="stay" className={section} aria-labelledby="stay-heading">
        <div className="wrap">
          <h2 id="stay-heading" className={h2}>
            Where to stay
          </h2>
          {guide.stayNote && <p className="measure mt-3 text-ink">{guide.stayNote}</p>}
          {stays.length > 0 ? (
            <LodgeCards lodges={lodgeTiles.filter((l) => stays.some((s) => s.slug === l.slug))} className="mt-8" />
          ) : (
            !guide.stayNote && <AskUs>Tell us your dates and budget, and we will suggest places to stay in or near {p.name}.</AskUs>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="band" aria-labelledby="related-heading">
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

// Stand-in for a section with no content yet: one line and a link to the travel team.
function AskUs({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`measure mt-3 ${dark ? 'text-cream/85' : 'text-ink'}`}>
      {children}{' '}
      <Link
        href="/contact#enquire"
        className={`font-bold underline underline-offset-4 transition-colors duration-300 ${dark ? 'text-gold hover:text-cream' : 'text-deep-teal hover:text-gold-ink'}`}
      >
        Talk to our travel team
      </Link>
    </p>
  );
}
