import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'About us',
  description: `${site.legalName} is a destination management company in ${site.address.city}, planning private safaris across Tanzania.`,
  alternates: { canonical: '/about' },
};

// STARTER COPY: add the founders' story and have the Safara team review before launch.
const reasons = [
  { title: 'Based in Tanzania', body: 'Our team lives and works in Arusha, the gateway to the northern parks, so we plan from first-hand knowledge.' },
  { title: 'Fully tailor-made', body: 'Every itinerary is a starting point. We rebuild it around your dates, pace and interests.' },
  { title: 'Hand-picked lodges', body: 'We know the camps and lodges personally and match them to how you like to travel.' },
  { title: 'Expert guides', body: 'Experienced guides who know the wildlife, the landscapes and the stories behind them.' },
  { title: 'One point of contact', body: 'A single consultant plans your trip from first enquiry to the day you fly home.' },
  { title: 'Support on the ground', body: 'If anything changes while you travel, our Arusha office is a phone call away.' },
];

export default function AboutPage() {
  return (
    <>
      <Header current="/about" />
      <section className="wrap pt-16">
        <h1 className="max-w-[18ch] text-step-5 text-navy">A journey beyond the ordinary</h1>
        <div className="prose-safara mt-8">
          <p>
            {site.legalName} is a licensed tour operator in {site.address.city}. We design private, tailor-made journeys across
            Tanzania, from the Serengeti and the Ngorongoro Crater to the summit of Kilimanjaro and the beaches of Zanzibar.
          </p>
          <p>
            Because we live here, we plan with first-hand knowledge: where the migration herds are each month, which camp sits closest to the
            river crossings, which Kilimanjaro route suits you, which guide your children will love.
          </p>
        </div>
      </section>

      <section id="why" className="mt-20 scroll-mt-8 bg-navy text-[#f4f5f0]" aria-labelledby="why-heading">
        <div className="wrap py-24">
          <h2 id="why-heading" className="text-step-4">Why travel with us</h2>
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <li key={r.title} className="border-t border-white/25 pt-4">
                <h3 className="font-sans text-step-0 font-bold">{r.title}</h3>
                <p className="mt-1 text-[#c7d0d8]">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap flex flex-col items-center pt-24 text-center">
        <h2 className="max-w-[22ch] text-step-4 text-navy">Start planning with a consultant</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact#enquire" className="btn btn-primary">Plan your trip</Link>
          <Link href="/about/team" className="btn btn-outline text-navy">Meet the team</Link>
        </div>
      </section>
    </>
  );
}
