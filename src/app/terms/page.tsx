import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import DraftNotice from '@/components/ui/DraftNotice';
import Hero from '@/components/ui/Hero';
import { site } from '@/config/site';
import { pageHeroes } from '@/content/page-heroes';
import { cancellationRows } from '@/lib/booking-terms';

export const metadata: Metadata = {
  title: 'Booking terms',
  description: `Deposits, payments, cancellations and other booking conditions for trips with ${site.legalName}.`,
  alternates: { canonical: '/terms' },
};

const { depositPercent, balanceDueDays, isPlaceholder } = site.booking;

// TEMPLATE: the owner must confirm every figure and a lawyer should review the wording before launch.
export default function TermsPage() {
  return (
    <>
      <Header overlay current="/terms" />
      <Hero size="sm" image={pageHeroes.legal.image} title="Booking terms" cta={false} breadcrumbs={[{ label: 'Booking terms' }]} />
      <div className="band">
        <article className="wrap">
          {isPlaceholder && (
            <DraftNotice>
              the deposit, balance and cancellation figures below are placeholders until {site.legalName} confirms them.
            </DraftNotice>
          )}
          <div className="prose-safara mt-10">
            <h2>Quotes and prices</h2>
            <p>
              Every trip is quoted in US dollars per person for a stated group size and travel dates. A quote is valid for the period shown
              on it. Prices include the park and conservation fees in force on the date of the quote.
            </p>
            <p>
              Park, concession and government fees are set by Tanzania National Parks (TANAPA), the Ngorongoro Conservation Area Authority
              (NCAA) and the government, and can change at short notice. If they change after you book, we pass on the difference at cost
              and show you the official notice.
            </p>

            <h2>Deposit and balance</h2>
            <p>
              A deposit of <strong>{depositPercent}%</strong> of the trip price confirms your booking. The balance is due{' '}
              <strong>{balanceDueDays} days</strong> before your trip starts. If you book within {balanceDueDays} days of departure, the
              full amount is due at booking.
            </p>
            <p>We accept bank transfer and card payments. Card payments may carry a processing fee, which we show before you pay.</p>

            <h2>Cancellation by you</h2>
            <p>Please tell us in writing. The charges below apply from the day we receive your message.</p>
          </div>

          <table className="mt-6 w-full max-w-3xl border-collapse text-left">
            <thead>
              <tr className="border-b border-deep-teal/20 text-step--1 text-slate">
                <th className="py-2 pr-4 font-semibold">When you cancel</th>
                <th className="py-2 pr-4 font-semibold">Charge</th>
                <th className="py-2 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {cancellationRows().map((r) => (
                <tr key={r.when} className="border-b border-deep-teal/10">
                  <td className="py-2 pr-4">{r.when}</td>
                  <td className="py-2 pr-4 font-semibold text-deep-teal">{r.charge}</td>
                  <td className="py-2 text-ink/80">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="prose-safara mt-10">
            <h2>Changes by us</h2>
            <p>
              Weather, road and park conditions sometimes force a change of route or lodge. We replace like with like, or better, at no
              extra cost to you, and refund the difference if a replacement costs less.
            </p>

            <h2>Travel insurance</h2>
            <p>
              Insurance that covers medical treatment, evacuation and cancellation is required for every traveller. For Kilimanjaro and
              Mount Meru it must cover trekking to the summit altitude.
            </p>

            <h2>Passports, visas and health</h2>
            <p>
              You are responsible for a valid passport, visa and any health certificates your nationality and route require. We remind you
              of the rules we know about when we confirm your trip.
            </p>

            <h2>Questions and complaints</h2>
            <p>
              Tell your guide or our office straight away so we can fix things during your trip. After you return, write to{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a> and we will reply within 14 days.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
