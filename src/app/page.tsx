import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Logo from '@/components/layout/Logo';
import Hero from '@/components/ui/Hero';
import LodgeShowcase from '@/components/ui/LodgeShowcase';
import PillarArt, { type PillarArtName } from '@/components/ui/PillarArt';
import Testimonials from '@/features/reviews/components/Testimonials';
import TrustPlatforms from '@/features/reviews/components/TrustPlatforms';
import TourGrid from '@/features/tours/components/TourGrid';
import { pageHeroes } from '@/content/page-heroes';
import { publishedTestimonials } from '@/content/testimonials';
import { publishedCredentials, publishedTrustPlatforms } from '@/content/trust-platforms';
import { travelStyles } from '@/content/travel-styles';
import { lodgeCountries, lodgeTiles } from '@/content/accommodations';
import { formatDate, getPosts, getTours } from '@/lib/content';

// Six reasons to book with us. STARTER COPY: confirm each claim with the team.
const pillars: { title: string; body: string; art: PillarArtName }[] = [
  {
    title: 'Local experts',
    body: 'Plan directly with our team in Arusha, the people who run your trip, not a call centre on another continent.',
    art: 'kilimanjaro',
  },
  {
    title: 'Truly tailor-made',
    body: 'We get to know you first, then build the route around your dates, pace, budget and the moments you care about.',
    art: 'map',
  },
  {
    title: 'Professional guides',
    body: 'Licensed guides who read the land, the light and the wildlife, and turn each game drive into a story.',
    art: 'binoculars',
  },
  {
    title: 'Hand-picked camps',
    body: 'From simple bush camps to the finest lodges, places we know first-hand and match to how you travel.',
    art: 'tent',
  },
  {
    title: 'With you every step',
    body: 'One consultant from your first message to your flight home, and our team a WhatsApp away on the road.',
    art: 'vehicle',
  },
  {
    title: 'Travel that gives back',
    body: 'We favour partners that support conservation and local communities, so your trip helps protect what you came to see.',
    art: 'baobab',
  },
];

export default function HomePage() {
  const tours = getTours().slice(0, 3);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <Header overlay pinAfterHero current="/" />

      <Hero
        size="xl"
        className="hero--home"
        align="center"
        overlay="bottom"
        image={pageHeroes.home.image}
        video={pageHeroes.home.video}
        title="Tailor-made East Africa safaris"
        titleAccent="made for you"
        subtitle="Where your Africa story begins."
        cta={{ label: 'Discover our journeys', href: '/tours' }}
      />

      {/* Why book with us */}
      <section className="band bg-[#f8f8f3]" aria-labelledby="why-heading">
        <div className="wrap">
          <h2 data-reveal id="why-heading" className="text-center text-step-4 text-ink">
            Why book with us?
          </h2>
          <ul data-reveal-stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.title} className="flex flex-col items-center text-center">
                <PillarArt name={p.art} className="h-20 w-auto text-ink sm:h-24" />
                <h3 className="mt-3 text-step-2 text-ink">{p.title}</h3>
                <p className="mt-1.5 max-w-[34ch] text-step--1 text-ink">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journeys */}
      <section className="band bg-white" aria-labelledby="journeys">
        <div className="wrap">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="journeys" className="text-step-4 text-ink">
                Popular journeys
              </h2>
              <p className="mt-3 max-w-[48ch] text-ink">Starting points we rebuild around you.</p>
            </div>
            <Link
              href="/tours"
              className="font-bold text-deep-teal underline underline-offset-4 transition-colors duration-300 hover:text-gold"
            >
              View all journeys <span className="arrow">→</span>
            </Link>
          </div>
          <div className="mt-8">
            <TourGrid tours={tours} />
          </div>
          <div className="mt-10 text-center">
            <Link href="/tours" className="btn btn-primary">
              View all journeys
            </Link>
          </div>
        </div>
      </section>

      {/* Where to stay: lodges and camps, filtered by country */}
      <section className="band bg-[#f8f8f3]" aria-labelledby="stays-heading">
        <div className="wrap">
          <h2 data-reveal id="stays-heading" className="text-step-4 text-ink">
            Most hand-picked camps &amp; lodges
          </h2>
          {/* No scroll reveal here: the grid is taller than the screen, so it would never reach the reveal threshold. */}
          <div className="mt-8">
            <LodgeShowcase lodges={lodgeTiles} countries={lodgeCountries} limit={6} />
          </div>
        </div>
      </section>

      {/* Recommended on: review platforms and licences (samples show on the dev server only) */}
      {(publishedTrustPlatforms.length > 0 || publishedCredentials.length > 0) && (
        <section data-reveal className="band bg-salt" aria-labelledby="trust-heading">
          <div className="wrap">
            <TrustPlatforms platforms={publishedTrustPlatforms} credentials={publishedCredentials} />
          </div>
        </section>
      )}

      {/* Testimonials: hidden until there is at least one real review */}
      {publishedTestimonials.length > 0 && (
        <section className="band" aria-labelledby="reviews-heading">
          <div className="wrap">
            <h2 data-reveal id="reviews-heading" className="text-center text-step-4 text-ink">
              Don&apos;t take our word for it
            </h2>
            <div data-reveal className="mx-auto mt-8 max-w-5xl">
              <Testimonials items={publishedTestimonials} />
            </div>
          </div>
        </section>
      )}

      {/* Ways to travel: the Travel styles menu as a photo mosaic */}
      <section className="band band-tight bg-[#f8f8f3]" aria-labelledby="styles-heading">
        <div className="wrap">
          <div data-reveal>
            <p className="text-step--1 font-bold uppercase tracking-[0.14em] text-gold">Travel styles</p>
            <h2 id="styles-heading" className="mt-3 text-step-4 text-ink">
              Ways to travel
            </h2>
            <p className="mt-3 max-w-[50ch] text-ink">Blend them as you like.</p>
          </div>
          <ul data-reveal-stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:h-[32rem] lg:grid-cols-3 lg:grid-rows-2">
            {travelStyles.map((s, i) => (
              <li key={s.slug} className={i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}>
                <Link
                  href={`/travel-styles/${s.slug}`}
                  className="group relative flex h-full min-h-60 items-end overflow-hidden bg-deep-teal text-[#f4f5f0]"
                >
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="zoom object-cover"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-teal-deep/95 via-teal-deep/55 to-teal-deep/5" />
                  <div className="relative p-6 sm:p-8">
                    <h3 className="text-step-3">{s.name}</h3>
                    <p className="mt-2 max-w-[40ch] text-[#dce2e6]">{s.teaser}</p>
                    <span className="mt-4 inline-block font-bold text-sun">
                      Discover more <span className="arrow">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Custom trip */}
      <section data-reveal className="band">
        <div className="wrap flex flex-col items-center text-center">
          <div aria-hidden="true" className="opacity-90">
            <Logo height={60} />
          </div>
          <h2 className="mt-8 max-w-[22ch] text-step-4 text-ink">Didn&apos;t find the trip you had in mind?</h2>
          <p className="mt-4 max-w-[50ch] text-ink">
            Tell our travel team what you are hoping for, and we will plan it with you from the start.
          </p>
          <Link href="/contact#enquire" className="btn btn-primary mt-8">
            Talk to our travel team
          </Link>
        </div>
      </section>

      {/* Journal */}
      {posts.length > 0 && (
        <section className="band bg-white" aria-labelledby="journal">
          <div className="wrap">
            <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="journal" className="text-step-4 text-ink">
                From the journal
              </h2>
              <Link
                href="/journal"
                className="font-bold text-deep-teal underline underline-offset-4 transition-colors duration-300 hover:text-gold"
              >
                All articles <span className="arrow">→</span>
              </Link>
            </div>
            <ul data-reveal-stagger className="mt-8 grid gap-8 md:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/journal/${p.slug}`} className="group block">
                    {p.cover && (
                      <div className="relative aspect-[3/2] overflow-hidden bg-salt-deep">
                        <Image
                          src={p.cover.src}
                          alt={p.cover.alt}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="zoom object-cover"
                        />
                      </div>
                    )}
                    <time dateTime={p.date.toISOString()} className="mt-4 block text-step--1 text-slate">
                      {formatDate(p.date)}
                    </time>
                    <h3 className="mt-1 text-step-1 text-ink transition-colors duration-300 group-hover:text-gold">{p.title}</h3>
                    <p className="mt-1 text-step--1 text-ink">{p.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
