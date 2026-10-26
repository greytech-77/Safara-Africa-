import { site } from '@/config/site';
import { parkFees } from '@/content/pricing/park-fees';
import { publishedTestimonials } from '@/content/testimonials';
import { getItineraries } from '@/features/itineraries/data';

// Things that must be fixed before the site goes live. `npm run check:launch` prints them and fails while any blocker remains.
// Warnings are listed but don't fail the check.

export type LaunchIssue = { level: 'blocker' | 'warning'; message: string };

const PLACEHOLDER_TEXT = /\b(CONFIRM|PLACEHOLDER)\b/;

export function launchIssues(today = new Date(), env: Record<string, string | undefined> = process.env): LaunchIssue[] {
  const issues: LaunchIssue[] = [];
  const blocker = (message: string) => issues.push({ level: 'blocker', message });
  const warning = (message: string) => issues.push({ level: 'warning', message });
  const day = today.toISOString().slice(0, 10);

  // Contact details (audit C1)
  if (/0{6,}/.test(site.phone.tel)) blocker('site.phone is still the placeholder number (src/config/site.ts)');
  if (/0{6,}/.test(site.whatsapp)) blocker('site.whatsapp is still the placeholder number (src/config/site.ts)');
  if (site.address.street === 'Street address' || site.address.suburb === 'Area')
    blocker('site.address is still a placeholder (src/config/site.ts)');
  if (!site.licences.tala) blocker('site.licences.tala: add the TALA tour operator licence number');
  if (!site.licences.tato) warning('site.licences.tato: add the TATO membership number if you are a member');

  // Booking terms
  if (site.booking.isPlaceholder)
    blocker('site.booking: confirm the deposit, balance and cancellation figures, then set isPlaceholder to false');

  // Enquiry delivery (audit C3). The host may set these, so this is a warning locally.
  if (!env.RESEND_API_KEY && !env.ENQUIRY_WEBHOOK_URL)
    warning('No RESEND_API_KEY or ENQUIRY_WEBHOOK_URL: enquiries will fail in production unless the host sets one');
  if (!env.TURNSTILE_SECRET_KEY) warning('No TURNSTILE_SECRET_KEY: the enquiry form relies on the honeypot and rate limit only');

  // Reviews (audit C2)
  if (publishedTestimonials.length === 0) warning('No real reviews yet: the homepage hides the reviews section');

  // Prices and fees
  for (const it of getItineraries()) {
    if (!it.pricing) continue;
    if (it.pricing.validTo < day) blocker(`${it.slug}: price table expired on ${it.pricing.validTo}`);
    else if (it.pricing.isPlaceholder) blocker(`${it.slug}: prices are placeholders`);
    const text = [...it.faqs.flatMap((f) => [f.q, f.a]), it.trek?.successRateNote ?? ''].join(' ');
    if (PLACEHOLDER_TEXT.test(text)) blocker(`${it.slug}: FAQ or trek text still contains CONFIRM/PLACEHOLDER`);
  }
  const currentFees = parkFees.filter((f) => f.validFrom <= day && day <= f.validTo);
  if (currentFees.length === 0) blocker(`No park fees valid on ${day}: add the current fee year in src/content/pricing/park-fees.ts`);
  else if (currentFees.some((f) => f.isPlaceholder))
    blocker('Park fees are placeholders: check them against the current TANAPA and NCAA tariff');

  return issues;
}
