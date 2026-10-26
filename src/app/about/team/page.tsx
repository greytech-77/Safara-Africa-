import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Header from '@/components/layout/Header';
import PageHero from '@/components/ui/PageHero';
import { site } from '@/config/site';
import { unsplash } from '@/lib/unsplash';
import { departments, team, type TeamMember } from '@/content/team';

export const metadata: Metadata = {
  title: 'Meet the team',
  description: `Meet the people behind ${site.name}: reservations, professional safari and mountain guides, sales, marketing and brand, based in ${site.address.city}, Tanzania.`,
  alternates: { canonical: '/about/team' },
};

// Placeholder photos. Replace with a photo of your team and vehicles.
const banner = unsplash('1580145575237-75fec2a0320b', 'A large herd of wildebeest grazing on grassy plains with safari vehicles nearby');
const introPhoto = unsplash('1765706730020-561a6432abbd', 'Travellers on safari watching a buffalo on a dirt road');

const initials = (text: string) =>
  text
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

function Icon({ d }: { d: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 fill-gold"><path d={d} /></svg>
  );
}
const PHONE = 'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z';
const CHAT = 'M12 2a10 10 0 0 0-8.7 14.9L2 22l5.2-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z';
const MAIL = 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7.3V17h16V7.3z';

function MemberCard({ m }: { m: TeamMember }) {
  const title = m.name ? `${m.role}, ${m.name}` : m.role;
  const email = m.email ?? site.email;
  const whatsapp = m.whatsapp ?? site.whatsapp;
  return (
    <li className="group flex flex-col overflow-hidden bg-white shadow-[0_4px_3px_rgb(0_0_0/.08)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy">
        {m.photo ? (
          <Image src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <span aria-hidden="true" className="flex size-full items-center justify-center font-display text-[5rem] text-salt/80">{initials(m.name ?? m.role)}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-step-2 text-navy">{title}</h3>
        <p className="mt-2 text-step--1 text-ink/80">{m.bio}</p>
        <ul className="mt-5 space-y-2 border-t border-navy/10 pt-4 text-step--1 font-semibold text-navy">
          {m.phone && (
            <li><a href={`tel:${m.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-gold"><Icon d={PHONE} />{m.phone} (phone)</a></li>
          )}
          <li><a href={`https://wa.me/${whatsapp}`} className="flex items-center gap-2 hover:text-gold"><Icon d={CHAT} />WhatsApp</a></li>
          <li><a href={`mailto:${email}`} className="flex items-center gap-2 break-all hover:text-gold"><Icon d={MAIL} />{email}</a></li>
        </ul>
      </div>
    </li>
  );
}

export default function TeamPage() {
  return (
    <>
      <Header overlay current="/about" />
      <PageHero image={banner} short>
        <Breadcrumb items={[{ label: 'About Us', href: '/about' }, { label: 'Meet the team' }]} />
        <h1 className="mt-4 text-step-6">Our team</h1>
      </PageHero>

      <section className="bg-salt-deep" aria-labelledby="intro-heading">
        <div className="wrap grid gap-12 py-20 md:grid-cols-[2fr_3fr] md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={introPhoto.src} alt={introPhoto.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="text-step--1 font-bold uppercase tracking-[0.14em] text-gold">Our team</p>
            <h2 id="intro-heading" className="mt-2 text-step-4 text-navy">The people behind your journey</h2>
            <div className="prose-safara mt-6">
              <p>
                <strong>We live in the places we send you.</strong> Behind every {site.name} journey is a small team in {site.address.city}: reservation
                specialists, professional safari and mountain guides, travel consultants and storytellers, all sharing one goal, to give you a trip
                that is safe, seamless and deeply personal.
              </p>
              <p>
                We plan from first-hand knowledge, answer your messages ourselves, and stay with you from the first question to the moment you are
                home. Write to any of us directly; we would love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {departments.map((d) => {
        const members = team.filter((m) => m.department === d.name);
        if (members.length === 0) return null;
        const id = d.name.toLowerCase().replace(/\W+/g, '-');
        return (
          <section key={d.name} className="wrap mt-20" aria-labelledby={id}>
            <div className="flex items-center gap-4">
              <h2 id={id} className="shrink-0 font-sans text-step-0 font-bold uppercase tracking-[0.14em] text-navy">{d.name}</h2>
              <span aria-hidden="true" className="h-px flex-1 bg-navy/20" />
            </div>
            <p className="measure mt-3 text-slate">{d.intro}</p>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => <MemberCard key={m.role} m={m} />)}
            </ul>
          </section>
        );
      })}

      <section className="mt-24 bg-navy text-[#f4f5f0]" aria-labelledby="thanks-heading">
        <div className="wrap flex flex-col items-center py-24 text-center">
          <h2 id="thanks-heading" className="text-step-4">With gratitude</h2>
          <div className="mt-10 max-w-[38ch] space-y-6 font-display text-step-1 leading-relaxed text-[#e4e8ea]">
            <p>
              Before the first light reaches the plains,<br />
              someone here is already awake for you,<br />
              checking the road, warming the coffee,<br />
              listening for the lion’s call.
            </p>
            <p>
              We are the voice on the phone at midnight,<br />
              the hands that pack the bush breakfast,<br />
              the eyes that find the leopard in the fig tree<br />
              long before you do.
            </p>
            <p>
              This land raised us,<br />
              and nothing makes us prouder<br />
              than watching it change<br />
              the people we share it with.
            </p>
            <p>
              So thank you, for trusting us<br />
              with your time, your celebrations,<br />
              your once in a lifetime.<br />
              Come as our guest. Leave as family.
            </p>
            <p className="text-step-2 text-sun">Karibu sana.</p>
          </div>
          <p className="mt-6 text-step--1 text-[#c7d0d8]">“Karibu sana” is Swahili for “you are very welcome”.</p>
          <Link href="/contact#enquire" className="btn btn-primary mt-10">Start your journey with us</Link>
        </div>
      </section>
    </>
  );
}
