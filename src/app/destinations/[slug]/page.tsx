import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBlock from '@/components/ui/CtaBlock';
import FaqList from '@/components/ui/FaqList';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import ImageCards from '@/components/ui/ImageCards';
import MonthPicker from '@/components/ui/MonthPicker';
import PhotoList from '@/components/ui/PhotoList';
import PhotoRail from '@/components/ui/PhotoRail';
import PillarArt, { type PillarArtName } from '@/components/ui/PillarArt';
import SectionNav, { type SectionLink } from '@/components/ui/SectionNav';
import TourGrid from '@/features/tours/components/TourGrid';
import { accommodations } from '@/content/accommodations';
import { countries, getCountry } from '@/content/countries';
import { parkHref, parks } from '@/content/parks';
import { formatDate, getPosts, getTours } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCountry((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name} safaris and tours`,
    description: c.description,
    alternates: { canonical: `/destinations/${c.slug}` },
    openGraph: { images: [c.image.src] },
  };
}

const tabs: SectionLink[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'safaris', label: 'Safaris' },
  { id: 'parks', label: 'Parks & Reserves' },
  { id: 'accommodations', label: 'Accommodations' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'guide', label: 'Travel Guide' },
  { id: 'faqs', label: 'FAQs' },
];

const why: { title: string; body: string; art: PillarArtName }[] = [
  { title: 'Book direct', body: 'Plan with the local team who runs your trip, with no middlemen.', art: 'kilimanjaro' },
  { title: 'Private and custom safaris', body: 'Every itinerary is built around your dates, pace and budget.', art: 'map' },
  { title: 'Expert local guides', body: 'Experienced guides who know the parks, wildlife and people.', art: 'binoculars' },
  { title: '24/7 WhatsApp support', body: 'Reach our team at any time while you travel.', art: 'vehicle' },
];

export default async function CountryPage({ params }: Props) {
  const c = getCountry((await params).slug);
  if (!c) notFound();
  const tours = getTours().filter((t) => t.country === c.slug);
  const posts = getPosts()
    .filter((p) => p.tags.includes(c.slug))
    .slice(0, 3);
  const h2 = 'text-step-4 text-ink';
  // Anchors clear the section menu; html's scroll-padding already clears the header.
  const section = 'band scroll-mt-16';

  return (
    <>
      <Header overlay current={`/destinations/${c.slug}`} />
      <Hero
        size="xl"
        image={c.image}
        title={`${c.name} safaris`}
        titleAccent="made for you"
        breadcrumbs={[{ label: 'Destinations', href: '/destinations' }, { label: c.name }]}
      />
      <SectionNav label={`${c.name} sections`} links={tabs} />

      <section id="overview" className={section} aria-labelledby="overview-heading">
        <div className="wrap">
          <h2 id="overview-heading" className={`${h2} text-center`}>
            Overview
          </h2>
          <div className="prose-safara mx-auto mt-3 text-center">
            {c.overview.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="safaris" className={section} aria-labelledby="safaris-heading">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="safaris-heading" className={h2}>
              Most popular tours
            </h2>
            <Link href={`/tours?country=${c.slug}`} className="btn btn-outline text-deep-teal">
              View all {c.name} tours
            </Link>
          </div>
          <div className="mt-8">
            {tours.length > 0 ? (
              <TourGrid tours={tours.slice(0, 3)} />
            ) : (
              <p className="text-ink">We are adding {c.name} itineraries. Ask us for a tailor-made proposal.</p>
            )}
          </div>
        </div>
      </section>

      {/* Same design as "Why book with us" on the home page, with four pillars. */}
      <section className="band bg-[#f8f8f3]" aria-labelledby="why-heading">
        <div className="wrap">
          <h2 data-reveal id="why-heading" className="text-center text-step-4 text-ink">
            Why book with us?
          </h2>
          <ul data-reveal-stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <li key={w.title} className="flex flex-col items-center text-center">
                <PillarArt name={w.art} className="h-20 w-auto text-ink sm:h-24" />
                <h3 className="mt-3 text-step-2 text-ink">{w.title}</h3>
                <p className="mt-1.5 max-w-[34ch] text-step--1 text-ink">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="parks" className={section} aria-labelledby="parks-heading">
        <div className="wrap">
          <h2 id="parks-heading" className={h2}>
            Popular national parks
          </h2>
          <div className="mt-8">
            <PhotoRail
              label={`National parks in ${c.name}`}
              items={parks
                .filter((p) => p.country === c.slug)
                .map((p) => ({ title: p.name, text: p.teaser, image: p.image, href: parkHref(p) }))}
            />
          </div>
        </div>
      </section>

      <section id="accommodations" className={section} aria-labelledby="stay-heading">
        <div className="wrap">
          <h2 id="stay-heading" className={h2}>
            Popular accommodations
          </h2>
          <div className="mt-8">
            <ImageCards
              columns={4}
              items={accommodations
                .filter((a) => a.country === c.slug)
                .map((a) => ({ title: a.name, meta: a.area, text: a.teaser, image: a.image, href: `/accommodations/${a.slug}` }))}
            />
          </div>
        </div>
      </section>

      <section id="experiences" className={section} aria-labelledby="exp-heading">
        <div className="wrap">
          <h2 id="exp-heading" className={h2}>
            Experiences
          </h2>
          <div className="mt-12">
            <PhotoList items={c.experiences} />
          </div>
        </div>
      </section>

      <section id="guide" className={section} aria-labelledby="guide-heading">
        <div className="wrap">
          <h2 id="guide-heading" className={h2}>
            Best time to visit {c.name}
          </h2>
          <p className="measure mt-3 text-ink">Choose a month to see what to expect.</p>
          <div className="mt-8">
            <MonthPicker months={c.months} />
          </div>

          {posts.length > 0 && (
            <>
              <h3 className="mt-16 text-step-3 text-ink">Travel guide</h3>
              <div className="mt-6">
                <ImageCards
                  items={posts
                    .filter((p) => p.cover)
                    .map((p) => ({
                      title: p.title,
                      meta: formatDate(p.date),
                      text: p.excerpt,
                      image: p.cover!,
                      href: `/journal/${p.slug}`,
                    }))}
                />
              </div>
            </>
          )}
        </div>
      </section>

      <section id="faqs" className={section} aria-labelledby="faqs-heading">
        <div className="wrap">
          <h2 id="faqs-heading" className={h2}>
            {c.name} FAQs
          </h2>
          <div className="mt-8 max-w-4xl">
            <FaqList faqs={c.faqs} />
          </div>
        </div>
      </section>

      <CtaBlock topic={`${c.name} safari`} />
    </>
  );
}
