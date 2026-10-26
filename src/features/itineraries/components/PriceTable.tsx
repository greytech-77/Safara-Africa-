import Link from 'next/link';
import DraftNotice from '@/components/ui/DraftNotice';
import { site } from '@/config/site';
import { formatDate } from '@/lib/content';
import { formatUsd, priceGrid } from '../pricing';
import type { Pricing } from '../schema';

// Price per person by season (rows) and group size (columns). The table scrolls sideways on phones; the page does not.
export default function PriceTable({ pricing }: { pricing: Pricing }) {
  const grid = priceGrid(pricing);
  return (
    <div>
      {pricing.isPlaceholder && (
        <DraftNotice>these prices are placeholders until {site.legalName} confirms them. Please ask for a quote.</DraftNotice>
      )}
      <div className="mt-6 overflow-x-auto rounded-xl border border-navy/15 bg-white">
        <table className="w-full min-w-[32rem] border-collapse text-left">
          <caption className="sr-only">Price per person in US dollars, by season and number of travellers</caption>
          <thead>
            <tr className="border-b border-navy/15 text-step--1 text-slate">
              <th scope="col" className="sticky left-0 bg-white px-4 py-3 font-semibold">
                Season
              </th>
              {grid.groupSizes.map((n) => (
                <th key={n} scope="col" className="px-4 py-3 font-semibold">
                  {n === 1 ? '1 traveller' : `${n} travellers`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.seasons.map((s) => (
              <tr key={s.id} className="border-b border-navy/10 last:border-0">
                <th scope="row" className="sticky left-0 bg-white px-4 py-3 font-semibold text-navy">
                  {s.label}
                </th>
                {grid.groupSizes.map((n) => {
                  const v = grid.cell(s.id, n);
                  return (
                    <td key={n} className="px-4 py-3 font-bold text-ink">
                      {v ? formatUsd(v) : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-4 space-y-1 text-step--1 text-slate">
        <li>
          Per person in US dollars, {pricing.tier.toLowerCase()} accommodation, valid for travel {formatDate(new Date(pricing.validFrom))}{' '}
          to {formatDate(new Date(pricing.validTo))}.
        </li>
        {pricing.singleSupplementUsd !== undefined && <li>Single room supplement: {formatUsd(pricing.singleSupplementUsd)}.</li>}
        {pricing.note && <li>{pricing.note}</li>}
        <li>
          A {site.booking.depositPercent}% deposit confirms your booking; the balance is due {site.booking.balanceDueDays} days before
          travel.{' '}
          <Link href="/terms" className="font-semibold text-navy underline underline-offset-4">
            Booking terms
          </Link>
        </li>
      </ul>
    </div>
  );
}
