import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import { pageHeroes } from '@/content/page-heroes';
import EnquiryForm from '@/features/enquiry/components/EnquiryForm';
import { site } from '@/config/site';
import { whatsappLink, whatsappMessage } from '@/lib/whatsapp';
import { getTours } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Plan your journey',
  description: `Plan your Tanzania safari with ${site.name}, based in ${site.address.city}, ${site.address.country}.`,
  alternates: { canonical: '/contact' },
};

type Props = { searchParams: Promise<{ tour?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { tour } = await searchParams;
  const tours = getTours().map((t) => ({ slug: t.slug, label: `${t.title} (${t.days} days)` }));
  const mapQuery = encodeURIComponent(`${site.address.street}, ${site.address.suburb}, ${site.address.city}, ${site.address.country}`);
  const dt = 'text-step--1 font-semibold text-slate';

  return (
    <>
      <Header overlay current="/contact" />
      <Hero
        size="md"
        image={pageHeroes.contact.image}
        title="Plan your"
        titleAccent="trip"
        cta={{ label: 'Send an enquiry', href: '#enquire' }}
        breadcrumbs={[{ label: 'Contact us' }]}
      />
      <section className="band">
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="measure text-ink">
              Tell us roughly when, who and what you are dreaming of. A consultant in Arusha will reply with ideas and a proposal.
            </p>

            <dl className="mt-12 space-y-6">
              <div>
                <dt className={dt}>Email</dt>
                <dd className="text-step-1">
                  <a className="hover:text-gold-ink" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={dt}>Phone and WhatsApp</dt>
                <dd className="text-step-1">
                  <a className="hover:text-gold-ink" href={`tel:${site.phone.tel}`}>
                    {site.phone.display}
                  </a>
                </dd>
                <dd>
                  <a className="font-bold text-deep-teal underline underline-offset-4" href={whatsappLink(whatsappMessage())}>
                    Message us on WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className={dt}>Office</dt>
                <dd>
                  <address className="not-italic">
                    {site.address.street}, {site.address.suburb}
                    <br />
                    {site.address.city}, {site.address.country}
                  </address>
                  <a
                    className="font-bold text-deep-teal underline underline-offset-4"
                    target="_blank"
                    rel="noopener"
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  >
                    Open in Google Maps
                  </a>
                </dd>
              </div>
              <div>
                <dt className={dt}>Hours (Tanzania time)</dt>
                {site.hours.map((h) => (
                  <dd key={h.days}>
                    {h.days}: {h.time}
                  </dd>
                ))}
              </div>
            </dl>
          </div>

          <div id="enquire" className="scroll-mt-8 bg-sand p-6 sm:p-10">
            <h2 className="text-step-3 text-ink">Send an enquiry</h2>
            <div className="mt-8">
              <EnquiryForm tours={tours} preselect={tour} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
