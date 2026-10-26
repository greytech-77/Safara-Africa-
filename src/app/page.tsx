import { DM_Sans, Fraunces } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Logo from '@/components/layout/Logo';
import PillarArt, { type PillarArtName } from '@/components/ui/PillarArt';
import Testimonials from '@/features/reviews/components/Testimonials';
import TourGrid from '@/features/tours/components/TourGrid';
import { testimonials } from '@/content/testimonials';
import { travelStyles } from '@/content/travel-styles';
import { formatDate, getPosts, getTours } from '@/lib/content';

const HERO = 'https://images.unsplash.com/photo-1564101160531-4838e8a5f4e7?auto=format&fit=crop&w=2000&q=80';
const HERO_VIDEO = '/videos/hero-migration.mp4';
// Hero statement only: free stand-ins for Jacada's licensed New Spirit Condensed and CircularXX.
const heroSerif = Fraunces({ subsets: ['latin'], weight: ['500'], display: 'swap' });
const heroSans = DM_Sans({ subsets: ['latin'], weight: ['300'], display: 'swap' });

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
      <Header overlay current="/" />

      {/* Hero */}
      <section className="relative isolate flex min-h-[120svh] items-center justify-center bg-navy text-center text-[#f4f5f0]">
        <Image
          src={HERO}
          alt="Wildebeest herd crossing a river during the Great Migration"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        {/* Background video; the photo above shows while it loads and for visitors who prefer reduced motion. */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full object-cover motion-reduce:hidden"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-deep/40" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(31_46_64/.55)_0%,transparent_22%,transparent_70%,rgb(31_46_64/.6)_100%)]"
        />

        <div className="wrap flex flex-col items-center pb-24 pt-64">
          <h1
            className={`${heroSerif.className} rise max-w-[16ch] text-[clamp(2.5rem,1.6rem+4vw,4.5rem)] leading-[1.05] tracking-[-0.01em]`}
          >
            Explore the wonders of Africa
          </h1>
          <p
            className={`${heroSans.className} rise rise-1 mt-6 max-w-[40ch] text-[clamp(1.125rem,1.05rem+0.4vw,1.3125rem)] leading-[1.6] text-[#dce2e6]`}
          >
            The soul’s peace, beyond purpose.
          </p>
          <div className="rise rise-2 mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/tours" className="btn btn-outline-light">
              Browse journeys
            </Link>
          </div>
        </div>
      </section>

      {/* Acknowledgement */}
      <section className="relative isolate overflow-hidden py-12 sm:py-14" aria-labelledby="thanks-heading">
        {/* The wildebeest alone, cut out of the logo artwork (public/images/brand/wildebeest-navy.png), as a faint watermark. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[min(92vw,820px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        >
          <Image src="/images/brand/wildebeest-navy.png" alt="" width={662} height={417} className="h-auto w-full" />
        </div>

        <div data-reveal className="wrap flex flex-col items-center text-center">
          <p className="text-step--1 font-bold uppercase tracking-[0.14em] text-gold">Asante sana · Thank you</p>
          <h2 id="thanks-heading" className="mt-4 max-w-[20ch] text-step-5 text-navy">
            Before you plan anything, thank you.
          </h2>
          <div className="mt-8 max-w-[92ch] space-y-5 text-[clamp(1.125rem,1rem+0.55vw,1.5rem)] leading-[1.75] text-ink/85">
            <p>
              Thank you for thinking of us. Choosing who will look after the journey you have dreamed of for years, the honeymoon, the
              family reunion, the summit you promised yourself, is no small thing.
            </p>
            <p>
              We are a small Tanzanian team crafting private journeys, one story at a time. With us you are not a booking number. You are
              our guest, and Tanzania is our home.
            </p>
          </div>
          <p className="mt-6 font-display text-step-2 text-navy">The Safara Africa team</p>
          <p className="text-step--1 text-slate">Arusha, Tanzania</p>
        </div>
      </section>

      {/* Why book with us */}
      <section className="bg-salt-deep" aria-labelledby="why-heading">
        <div className="wrap py-12 sm:py-14">
          <h2 data-reveal id="why-heading" className="text-center text-step-4 text-ink">
            Why book with us?
          </h2>
          <ul data-reveal-stagger className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.title} className="flex flex-col items-center text-center">
                <PillarArt name={p.art} className="h-20 w-auto text-ink sm:h-24" />
                <h3 className="mt-3 text-step-2 text-ink">{p.title}</h3>
                <p className="mt-1.5 max-w-[34ch] text-step--1 text-ink/80">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journeys */}
      <section className="wrap pt-12 sm:pt-14" aria-labelledby="journeys">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="journeys" className="text-step-5 text-navy">
              Popular journeys
            </h2>
            <p className="mt-3 max-w-[48ch] text-slate">Starting points we rebuild around you.</p>
          </div>
          <Link href="/tours" className="font-bold text-navy underline underline-offset-4 transition-colors duration-300 hover:text-gold">
            View all journeys <span className="arrow">→</span>
          </Link>
        </div>
        <div className="mt-8">
          <TourGrid tours={tours} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-12 bg-salt-deep sm:mt-14" aria-labelledby="reviews-heading">
        <div className="wrap py-12 sm:py-14">
          <h2 data-reveal id="reviews-heading" className="text-center text-step-4 text-ink">
            Don&apos;t take our word for it
          </h2>
          <div data-reveal className="mx-auto mt-8 max-w-5xl">
            <Testimonials items={testimonials} />
          </div>
        </div>
      </section>

      {/* Ways to travel: the Travel styles menu as a photo mosaic */}
      <section className="wrap pt-12 sm:pt-14" aria-labelledby="styles-heading">
        <div data-reveal>
          <p className="text-step--1 font-bold uppercase tracking-[0.14em] text-gold">Travel styles</p>
          <h2 id="styles-heading" className="mt-3 text-step-5 text-navy">
            Ways to travel
          </h2>
          <p className="mt-3 max-w-[50ch] text-slate">Blend them as you like.</p>
        </div>
        <ul data-reveal-stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:h-[32rem] lg:grid-cols-3 lg:grid-rows-2">
          {travelStyles.map((s, i) => (
            <li key={s.slug} className={i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}>
              <Link
                href={`/travel-styles/${s.slug}`}
                className="group relative flex h-full min-h-60 items-end overflow-hidden bg-navy text-[#f4f5f0]"
              >
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="zoom object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/55 to-navy-deep/5" />
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
      </section>

      {/* Custom trip */}
      <section data-reveal className="wrap flex flex-col items-center py-12 text-center sm:py-14">
        <div aria-hidden="true" className="opacity-90">
          <Logo height={60} />
        </div>
        <h2 className="mt-8 max-w-[22ch] text-step-4 text-navy">Didn&apos;t find the trip you had in mind?</h2>
        <p className="mt-4 max-w-[50ch] text-slate">Tell a travel consultant what you are hoping for and we will design it from scratch.</p>
        <Link href="/contact#enquire" className="btn btn-primary mt-8">
          Talk to a consultant
        </Link>
      </section>

      {/* Journal */}
      {posts.length > 0 && (
        <section className="wrap" aria-labelledby="journal">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="journal" className="text-step-3 text-navy">
              From the journal
            </h2>
            <Link
              href="/journal"
              className="font-bold text-navy underline underline-offset-4 transition-colors duration-300 hover:text-gold"
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
                  <h3 className="mt-1 text-step-1 text-navy transition-colors duration-300 group-hover:text-gold">{p.title}</h3>
                  <p className="mt-1 text-step--1 text-ink/80">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
