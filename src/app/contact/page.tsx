import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { countries } from '@/content/countries';
import { parks } from '@/content/parks';
import { beaches } from '@/content/beaches';
import { treks } from '@/content/treks';
import PlanWizard from '@/features/enquiry/components/PlanWizard';
import { site } from '@/config/site';
import { whatsappLink, whatsappMessage } from '@/lib/whatsapp';
import { getTours } from '@/lib/content';
import { getTeamMember } from '@/content/team';

export const metadata: Metadata = {
  title: 'Plan your journey',
  description: `Plan your journey with ${site.name}, based in ${site.address.city}, ${site.address.country}. Answer a few short questions and a travel consultant will reply within one working day.`,
  alternates: { canonical: '/contact' },
};

type Props = { searchParams: Promise<{ tour?: string; consultant?: string }> };

// Contact page (no hero): the step-by-step "plan your journey" wizard straight under the header, then a short strip for people who
// would rather talk. Journey pages link here with ?tour=<slug>, which the wizard shows and sends along.
export default async function ContactPage({ searchParams }: Props) {
  const { tour, consultant } = await searchParams;
  const tourLabel = getTours().find((t) => t.slug === tour);
  // From a team profile's "Plan a safari with …" button.
  const member = consultant ? getTeamMember(consultant) : undefined;
  // Destination suggestions for the "Where" step: every country, park, beach and trek on the site.
  const suggestions = [...new Set([...countries, ...parks, ...beaches, ...treks].map((p) => p.name))].sort();

  return (
    <>
      <Header current="/contact" />

      <section className="bg-ivory px-4 pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24" aria-labelledby="contact-title">
        {/* The page title for screen readers and search; the wizard's own questions are the visible headings. */}
        <h1 id="contact-title" className="sr-only">
          Plan your journey
        </h1>
        <PlanWizard
          suggestions={suggestions}
          tour={tourLabel?.title}
          consultant={member ? (member.name ? `${member.name}, ${member.role}` : member.role) : undefined}
        />
      </section>

      <section className="band" aria-labelledby="talk-heading">
        <div className="wrap grid gap-10 text-center md:grid-cols-[1.2fr_1fr] md:text-left">
          <div>
            <h2 id="talk-heading" className="text-step-3 text-ink">
              Prefer to talk to our travel team?
            </h2>
            <ul className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap md:items-start">
              <li>
                <a className="btn btn-outline" href={whatsappLink(whatsappMessage())} target="_blank" rel="noopener">
                  WhatsApp us
                </a>
              </li>
              <li>
                <a className="btn btn-outline" href={`tel:${site.phone.tel}`}>
                  Call {site.phone.display}
                </a>
              </li>
              <li>
                <a className="btn btn-outline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-ink">Our office</p>
              <address className="mt-2 not-italic text-slate">
                {site.address.street}, {site.address.suburb}
                <br />
                {site.address.city}, {site.address.country}
              </address>
            </div>
            <div>
              <p className="font-semibold text-ink">Opening hours</p>
              <dl className="mt-2 grid gap-1 text-slate">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-center gap-3 md:justify-start">
                    <dt>{h.days}:</dt>
                    <dd className="text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-step--1 text-slate">Tanzania time (EAT)</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
