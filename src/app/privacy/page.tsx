import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import DraftNotice from '@/components/ui/DraftNotice';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `How ${site.legalName} collects, uses and protects the personal data you share with us.`,
  alternates: { canonical: '/privacy' },
};

// TEMPLATE: have a lawyer review this page before launch (Tanzania Personal Data Protection Act 2022, EU/UK GDPR).
export default function PrivacyPage() {
  return (
    <>
      <Header current="/privacy" />
      <article className="wrap pt-16">
        <h1 className="text-step-5 text-navy">Privacy policy</h1>
        <DraftNotice>
          this is a template. It must be reviewed by a lawyer and confirmed by {site.legalName} before the site goes live.
        </DraftNotice>
        <div className="prose-safara mt-10">
          <h2>Who we are</h2>
          <p>
            {site.legalName} is a tour operator based in {site.address.city}, {site.address.country}. We are responsible for the personal
            data you share with us through this website, by email, by phone or on WhatsApp. Contact us about your data at{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              Details you give us in the enquiry form: name, email, phone or WhatsApp number, country of residence, travel dates, number and
              ages of travellers, the trip you are interested in and your message.
            </li>
            <li>
              When you book: passport details, dates of birth, dietary and medical needs you choose to share, insurance and flight details.
              We only collect what we need to run your trip.
            </li>
            <li>Basic technical data when analytics are switched on: pages visited, device type and approximate location.</li>
          </ul>

          <h2>Why we use it</h2>
          <ul>
            <li>To answer your enquiry and prepare a proposal, at your request, before any contract.</li>
            <li>To book and run your trip with lodges, parks, airlines and guides.</li>
            <li>To meet legal duties, such as permits and park registration.</li>
            <li>To improve the website using aggregated statistics. You can opt out.</li>
          </ul>

          <h2>Who we share it with</h2>
          <p>
            Only the suppliers needed for your trip (lodges and camps, Tanzania National Parks, the Ngorongoro Conservation Area Authority,
            domestic airlines, transfer and activity providers) and the services that run this website: hosting, email and enquiry delivery,
            spam protection and, if enabled, analytics. We never sell your data.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries that do not lead to a booking are deleted after 24 months. Booking records are kept for as long as tax and accounting
            law requires. You can ask us to delete your data earlier where the law allows.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask to see, correct, export or delete your data, or object to how we use it, by writing to{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>. If you live in the EU or UK you can also complain to your data protection
            authority.
          </p>

          <h2>Changes</h2>
          <p>We will post any change to this policy on this page.</p>
        </div>
      </article>
    </>
  );
}
