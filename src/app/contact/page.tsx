import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import EnquiryForm from '@/features/enquiry/components/EnquiryForm';
import { site } from '@/config/site';
import { whatsappLink, whatsappMessage } from '@/lib/whatsapp';
import { getTours } from '@/lib/content';
import { getTeamMember } from '@/content/team';

export const metadata: Metadata = {
  title: 'Plan your journey',
  description: `Plan your journey with ${site.name}, based in ${site.address.city}, ${site.address.country}. Tell us your dates and what you would love to see, and a travel consultant will reply within one working day.`,
  alternates: { canonical: '/contact' },
};

type Props = { searchParams: Promise<{ tour?: string; consultant?: string }> };

// Contact page (no hero): a single short enquiry form, then a short strip for people who would rather talk.
// Tour pages link here with ?tour=<slug>; team profiles link with ?consultant=<slug>.
export default async function ContactPage({ searchParams }: Props) {
  const { tour, consultant } = await searchParams;
  const tours = getTours().map((t) => ({ slug: t.slug, label: t.title }));
  const member = consultant ? getTeamMember(consultant) : undefined;
  const consultantLabel = member ? (member.name ? `${member.name}, ${member.role}` : member.role) : undefined;

  return (
    <>
      <Header current="/contact" />

      <section id="enquire" className="scroll-mt-28 bg-ivory px-4 pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24" aria-labelledby="contact-title">
        <div className="wrap">
          <h1 id="contact-title" className="text-center text-step-4 text-heading">
            Plan your journey
          </h1>
          <p className="mx-auto mt-3 max-w-[52ch] text-center text-ink">
            Tell us your dates and what you would love to see. A consultant in Arusha will reply within one working day with ideas and a
            free, no-obligation quote.
          </p>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-deep-teal/10 bg-white/70 p-6 sm:p-8">
            <EnquiryForm tours={tours} preselect={tour} consultant={consultantLabel} />
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="talk-heading">
        <div className="wrap grid gap-10 text-center md:grid-cols-[1.2fr_1fr] md:text-left">
          <div>
            <h2 id="talk-heading" className="text-step-3 text-ink">
              Prefer to talk to our travel team?
            </h2>
            <div className="mt-6 flex flex-col items-center gap-4 md:items-start">
              <a className="btn btn-primary" href={whatsappLink(whatsappMessage())} target="_blank" rel="noopener">
                WhatsApp us
              </a>
              <p className="text-ink">
                Call{' '}
                <a className="font-semibold text-deep-teal underline underline-offset-4" href={`tel:${site.phone.tel}`}>
                  {site.phone.display}
                </a>{' '}
                or email{' '}
                <a className="font-semibold text-deep-teal underline underline-offset-4" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            </div>
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
