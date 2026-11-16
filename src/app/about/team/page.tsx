import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { site } from '@/config/site';
import { pageHeroes } from '@/content/page-heroes';
import { FactChips, Portrait } from '@/components/team/TeamParts';
import { displayName, teamInOrder, type TeamMember } from '@/content/team';

export const metadata: Metadata = {
  title: 'Meet the team',
  description: `Meet the people behind ${site.name}: our guides, consultants and reservations team in ${site.address.city}, Tanzania.`,
  alternates: { canonical: '/about/team' },
};

// TO REPLACE: a group photo of the whole team outdoors. Until then the page hero photo stands in.
const groupPhoto = pageHeroes.team.image;

// Meet the team: hero with a group photo, a short intro, the team grid (leadership, guides, office) and a closing
// call to action. All people come from src/content/team.ts.
export default function TeamPage() {
  const members = teamInOrder();
  return (
    <>
      <Header overlay current="/about" />

      {/* 1. Hero: group photo with a dark fade on the left behind the text. */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-footer text-white" aria-labelledby="team-title">
        <Image src={groupPhoto.src} alt={groupPhoto.alt} fill priority sizes="100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0/.72)_0%,rgb(0_0_0/.45)_40%,rgb(0_0_0/0)_75%),linear-gradient(180deg,rgb(0_0_0/.35)_0%,rgb(0_0_0/0)_30%)]"
        />
        <div className="wrap relative pb-16 pt-[calc(var(--header-h)+4rem)] sm:pb-20">
          <p className="font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-nav-gold">Our people</p>
          <h1 id="team-title" className="mt-4 text-[clamp(40px,5vw,56px)] leading-[1.1]">
            Meet the Team
          </h1>
          <p className="mt-4 max-w-[44ch] text-white/90">
            The guides, consultants and planners in {site.address.city} who look after your journey, from the first question to the flight
            home.
          </p>
          <Link href="/about" className="mt-6 inline-block font-medium text-white underline-offset-4 hover:text-nav-gold hover:underline">
            Our story
          </Link>
        </div>
      </section>

      {/* 2. Intro */}
      <section className="bg-off-white px-4 pb-16 pt-[100px] text-center" aria-labelledby="people-heading">
        <div className="mx-auto max-w-[760px]">
          <h2 id="people-heading" className="text-[clamp(32px,4vw,44px)] leading-[1.15] text-ink">
            The people behind your journey
          </h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-0.5 w-[60px] bg-gold" />
          {/* CONFIRM: add how many years the team has been guiding and planning once you have the figure. */}
          <p className="mt-6 text-ink">
            We are a small team based in {site.address.city}, at the foot of Mount Meru. Our guides, consultants and reservations team know
            the parks and the mountains first-hand, and every safari is planned personally, from your first message to the moment you fly
            home. When you travel with us, you are looked after by people who care about this land and want you to see it at its best.
          </p>
        </div>
      </section>

      {/* 3. Team grid: leadership, then guides, then the office team. */}
      <section className="bg-off-white px-4 pb-[100px]" aria-label="The team">
        <ul className="mx-auto grid max-w-[1100px] gap-x-12 gap-y-[72px] sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <MemberCard key={m.slug} m={m} />
          ))}
        </ul>
      </section>

      {/* 5. Closing call to action */}
      <section className="bg-footer px-4 py-20 text-center text-white" aria-labelledby="team-cta">
        <h2 id="team-cta" className="mx-auto max-w-[24ch] text-[clamp(28px,3.5vw,40px)] leading-[1.2]">
          Ready to plan with people who know Africa by heart?
        </h2>
        <Link href="/contact#enquire" className="btn btn-primary mt-8">
          Plan your journey
        </Link>
      </section>
    </>
  );
}

function MemberCard({ m }: { m: TeamMember }) {
  return (
    <li className="group flex flex-col">
      <div className="relative aspect-[2/3] overflow-hidden bg-deep-teal">
        <Portrait m={m} sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw" />
      </div>
      <h3 className="mt-6 text-[20px] font-bold leading-snug text-ink">{displayName(m)}</h3>
      {m.name && <p className="mb-3 mt-1 text-[15px] text-slate">{m.role}</p>}
      {!m.name && <div className="mb-3" />}
      <div className="mb-3 empty:hidden">
        <FactChips m={m} />
      </div>
      <p className="line-clamp-4 flex-1 text-left text-[15px] leading-[1.7] text-ink">{m.bio}</p>
      <Link
        href={`/about/team/${m.slug}`}
        aria-label={`Read more about ${displayName(m)}`}
        className="mt-5 self-start rounded-[3px] border border-gold-ink px-3.5 py-[5px] text-[14px] text-gold-ink transition-colors duration-300 hover:bg-gold-ink hover:text-white"
      >
        Read more
      </Link>
    </li>
  );
}
