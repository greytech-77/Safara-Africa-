import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import CtaBlock from '@/components/CtaBlock';
import FaqList from '@/components/FaqList';
import Header from '@/components/Header';
import ImageCards from '@/components/ImageCards';
import MonthPicker from '@/components/MonthPicker';
import PageHero from '@/components/PageHero';
import TourGrid from '@/components/TourGrid';
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

const tabs = [
  ['overview', 'Overview'],
  ['safaris', 'Safaris'],
  ['parks', 'Parks & Reserves'],
  ['accommodations', 'Accommodations'],
  ['experiences', 'Experiences'],
  ['guide', 'Travel Guide'],
  ['faqs', 'FAQs'],
];

const why = [
  { title: 'Book direct', body: 'Plan with the local team who runs your trip, with no middlemen.' },
  { title: 'Private and custom safaris', body: 'Every itinerary is built around your dates, pace and budget.' },
  { title: 'Expert local guides', body: 'Experienced guides who know the parks, wildlife and people.' },
  { title: '24/7 WhatsApp support', body: 'Reach our team at any time while you travel.' },
];

export default async function CountryPage({ params }: Props) {
  const c = getCountry((await params).slug);
  if (!c) notFound();
  const tours = getTours().filter((t) => t.country === c.slug);
  const posts = getPosts().filter((p) => p.tags.includes(c.slug)).slice(0, 3);
  const h2 = 'text-step-4 text-navy';
  const section = 'wrap mt-20 scroll-mt-24';

  return (
    <>
      <Header overlay current={`/destinations/${c.slug}`} />
      <PageHero image={c.image}>
        <Breadcrumb items={[{ label: 'Destinations', href: '/destinations' }, { label: c.name }]} />
        <h1 className="mt-4 text-step-6">{c.name}</h1>
        <p className="mt-4 max-w-[46ch] text-step-1 text-[#dce2e6]">{c.tagline}</p>
      </PageHero>

      <nav aria-label={`${c.name} sections`} className="sticky top-0 z-20 border-b border-navy/10 bg-salt/95 backdrop-blur">
        <ul className="wrap flex gap-6 overflow-x-auto py-4 text-step--1 font-bold whitespace-nowrap text-navy">
          {tabs.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="hover:text-gold">{label}</a></li>
          ))}
        </ul>
      </nav>

      <section id="overview" className="wrap scroll-mt-24 pt-16" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className={h2}>Overview</h2>
        <div className="prose-safara mt-6">
          {c.overview.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        </div>
      </section>

      <section id="safaris" className={section} aria-labelledby="safaris-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="safaris-heading" className={h2}>Most popular tours</h2>
          <Link href={`/tours?country=${c.slug}`} className="btn btn-outline text-navy">View all {c.name} tours</Link>
        </div>
        <div className="mt-8">
          {tours.length > 0 ? (
            <TourGrid tours={tours.slice(0, 3)} />
          ) : (
            <p className="text-ink/85">We are adding {c.name} itineraries. Ask us for a tailor-made proposal.</p>
          )}
        </div>
      </section>

      <section className="mt-20 bg-navy text-[#f4f5f0]" aria-labelledby="why-heading">
        <div className="wrap py-16">
          <h2 id="why-heading" className="text-step-3">Why book with us</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <li key={w.title} className="border-t border-white/25 pt-4">
                <h3 className="font-sans text-step-0 font-bold">{w.title}</h3>
                <p className="mt-1 text-[#c7d0d8]">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="parks" className={section} aria-labelledby="parks-heading">
        <h2 id="parks-heading" className={h2}>Popular national parks</h2>
        <div className="mt-8">
          <ImageCards items={parks.filter((p) => p.country === c.slug).map((p) => ({ title: p.name, text: p.teaser, image: p.image, href: parkHref(p) }))} />
        </div>
      </section>

      <section id="accommodations" className={section} aria-labelledby="stay-heading">
        <h2 id="stay-heading" className={h2}>Popular accommodations</h2>
        <div className="mt-8">
          <ImageCards columns={4} items={accommodations.filter((a) => a.country === c.slug).map((a) => ({ title: a.name, meta: a.area, text: a.teaser, image: a.image, href: `/accommodations/${a.slug}` }))} />
        </div>
      </section>

      <section id="experiences" className={section} aria-labelledby="exp-heading">
        <h2 id="exp-heading" className={h2}>Experiences</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.experiences.map((e) => (
            <li key={e.title} className="bg-white p-6 shadow-[0_4px_3px_rgb(0_0_0/.08)]">
              <h3 className="text-step-2 text-navy">{e.title}</h3>
              <p className="mt-1 text-ink/85">{e.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="guide" className={section} aria-labelledby="guide-heading">
        <h2 id="guide-heading" className={h2}>Best time to visit {c.name}</h2>
        <p className="measure mt-3 text-slate">Choose a month to see what to expect.</p>
        <div className="mt-8"><MonthPicker months={c.months} /></div>

        {posts.length > 0 && (
          <>
            <h3 className="mt-16 text-step-3 text-navy">Travel guide</h3>
            <div className="mt-6">
              <ImageCards
                items={posts.filter((p) => p.cover).map((p) => ({ title: p.title, meta: formatDate(p.date), text: p.excerpt, image: p.cover!, href: `/journal/${p.slug}` }))}
              />
            </div>
          </>
        )}
      </section>

      <section id="faqs" className={section} aria-labelledby="faqs-heading">
        <h2 id="faqs-heading" className={h2}>{c.name} FAQs</h2>
        <div className="mt-6 max-w-4xl"><FaqList faqs={c.faqs} /></div>
      </section>

      <CtaBlock />
    </>
  );
}
