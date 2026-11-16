import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FactChips, Portrait } from '@/components/team/TeamParts';
import { displayName, firstName, getTeamMember, teamInOrder } from '@/content/team';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return teamInOrder().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getTeamMember((await params).slug);
  if (!m) return {};
  return {
    title: m.name ? `${m.name}, ${m.role}` : m.role,
    description: m.bio,
    alternates: { canonical: `/about/team/${m.slug}` },
  };
}

// One team member: portrait on the left; name, role, facts, full bio, a personal quote and a button to plan a
// safari with them on the right. "Other team members" below. Content from src/content/team.ts.
export default async function TeamMemberPage({ params }: Props) {
  const m = getTeamMember((await params).slug);
  if (!m) notFound();

  const all = teamInOrder();
  const i = all.findIndex((x) => x.slug === m.slug);
  const others = [1, 2, 3].map((k) => all[(i + k) % all.length]);
  const first = firstName(m);
  // The full bio until it is written: the card bio (the dev server also shows a reminder).
  const bio = (m.fullBio ?? m.bio).split(/\n\s*\n/);
  const dev = process.env.NODE_ENV !== 'production';

  return (
    <div className="bg-off-white">
      <Header current="/about" />

      <section className="wrap pb-20 pt-10 sm:pt-14" aria-labelledby="member-name">
        <div className="[&_a]:text-ink [&_ol]:text-slate">
          <Breadcrumb
            items={[{ label: 'About Us', href: '/about' }, { label: 'Meet the team', href: '/about/team' }, { label: displayName(m) }]}
          />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="group relative aspect-[2/3] overflow-hidden bg-deep-teal md:sticky md:top-[calc(var(--header-h)+24px)] md:self-start">
            <Portrait m={m} sizes="(min-width: 768px) 40vw, 100vw" priority />
          </div>

          <div>
            <h1 id="member-name" className="text-[clamp(36px,4.5vw,52px)] leading-[1.1] text-ink">
              {displayName(m)}
            </h1>
            {m.name && <p className="mt-2 text-[17px] text-slate">{m.role}</p>}
            <div className="mt-5 empty:hidden">
              <FactChips m={m} />
            </div>

            <div className="mt-8 max-w-[62ch] space-y-5 text-left text-ink">
              {bio.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            {!m.fullBio && dev && (
              <p className="mt-4 rounded-lg border border-dashed border-slate/40 px-4 py-3 text-step--1 text-slate">
                Placeholder (dev only): add a 150–250 word full bio, a quote, years, languages and a favourite place in src/content/team.ts.
              </p>
            )}

            {m.quote && (
              <blockquote className="mt-10 border-l-2 border-gold pl-5 font-display text-[clamp(20px,2.2vw,26px)] italic leading-snug text-heading">
                “{m.quote}”
              </blockquote>
            )}

            <Link href={`/contact?consultant=${m.slug}#enquire`} className="btn btn-primary mt-10">
              {first ? `Plan a safari with ${first}` : 'Plan a safari with us'}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 py-16" aria-labelledby="others-heading">
        <div className="wrap">
          <h2 id="others-heading" className="text-step-3 text-ink">
            Other team members
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/about/team/${o.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-deep-teal">
                    <Portrait m={o} sizes="(min-width: 640px) 30vw, 100vw" />
                  </div>
                  <p className="mt-4 font-display text-[18px] font-bold text-ink group-hover:text-gold-ink">{displayName(o)}</p>
                  {o.name && <p className="text-[15px] text-slate">{o.role}</p>}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/about/team" className="mt-10 inline-block font-medium text-gold-ink underline-offset-4 hover:underline">
            Meet the whole team
          </Link>
        </div>
      </section>
    </div>
  );
}
