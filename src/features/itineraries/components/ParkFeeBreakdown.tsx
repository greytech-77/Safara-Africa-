import { formatUsd } from '../pricing';
import type { FeeEstimate, FeeLine } from '../park-fees';

const FEE_LABEL: Record<FeeLine['feeType'], string> = {
  conservation: 'Conservation (entry) fee',
  concession: 'Concession fee for nights inside the park',
  camping: 'Mountain camping fee',
  hut: 'Mountain hut fee',
  rescue: 'Rescue fee',
  'crater-service': 'Crater service fee (per vehicle)',
};

const UNIT_LABEL: Record<FeeLine['unit'], [string, string]> = {
  'person-day': ['day', 'days'],
  'person-night': ['night', 'nights'],
  'person-trip': ['trip', 'trips'],
  'vehicle-entry': ['vehicle entry', 'vehicle entries'],
};

// What part of the price goes to the parks. Computed from the fee table, so it changes when the fees change.
export default function ParkFeeBreakdown({ estimate, travellers }: { estimate: FeeEstimate; travellers: number }) {
  if (estimate.lines.length === 0) return null;
  return (
    <div className="rounded-xl border border-deep-teal/15 bg-white p-5 sm:p-6">
      <h3 className="text-step-2 text-ink">Park and government fees in this price</h3>
      <p className="mt-1 text-step--1 text-ink">
        Estimate for {travellers} adult non-resident travellers, including VAT. Fees are set by the park authorities and passed on at cost.
      </p>
      <table className="mt-4 w-full border-collapse text-left text-step--1">
        <thead className="sr-only">
          <tr>
            <th scope="col">Fee</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {estimate.lines.map((l) => (
            <tr key={`${l.park}:${l.feeType}`} className="border-b border-deep-teal/10">
              <td className="py-2 pr-3">
                <span className="font-semibold text-deep-teal">{l.parkName}</span>
                <span className="block text-slate">{FEE_LABEL[l.feeType]}</span>
              </td>
              <td className="py-2 pr-3 whitespace-nowrap text-slate">
                {l.quantity} {UNIT_LABEL[l.unit][l.quantity === 1 ? 0 : 1]}
              </td>
              <td className="py-2 text-right font-bold whitespace-nowrap">{formatUsd(l.totalUsd)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" className="pt-3 text-left font-bold text-deep-teal">
              Total for the group
            </th>
            <td />
            <td className="pt-3 text-right font-bold">{formatUsd(estimate.totalUsd)}</td>
          </tr>
          <tr>
            <th scope="row" className="text-left font-semibold text-slate">
              Per person
            </th>
            <td />
            <td className="text-right font-semibold text-slate">{formatUsd(estimate.perPersonUsd)}</td>
          </tr>
        </tfoot>
      </table>
      {estimate.missingParks.length > 0 && (
        <p className="mt-3 text-step--1 text-ink">Fees for other areas on this route are included in the price but not itemised here.</p>
      )}
      {estimate.isPlaceholder && (
        <p className="mt-3 text-step--1 font-semibold text-gold-dark">
          Fee figures are placeholders for the {estimate.validFrom?.slice(0, 4)}/{estimate.validTo?.slice(2, 4)} fee year until confirmed
          against the official tariff.
        </p>
      )}
    </div>
  );
}
