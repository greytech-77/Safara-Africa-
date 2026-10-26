import Link from 'next/link';
import { tripMessage, whatsappLink } from '@/lib/whatsapp';

type Props = { slug: string; title: string; days: number; price?: { label: string; groupSize: number; isPlaceholder: boolean } };

// Sticky sidebar on large screens; a bottom bar on phones and tablets (the site-wide Call/Enquire bar hides on trip pages).
export default function EnquiryPanel({ slug, title, days, price }: Props) {
  const quote = `/contact?tour=${slug}#enquire`;
  const wa = whatsappLink(tripMessage(title, days));
  return (
    <>
      <aside className="hidden self-start rounded-xl bg-navy p-6 text-[#f4f5f0] lg:sticky lg:top-24 lg:block" aria-label="Book this trip">
        {price ? (
          <p>
            <span className="text-step--1 text-[#c7d0d8]">From </span>
            <span className="font-display text-step-3">{price.label}</span>
            <span className="text-step--1 text-[#c7d0d8]"> per person</span>
            <span className="block text-step--1 text-[#c7d0d8]">based on {price.groupSize} travellers sharing</span>
            {price.isPlaceholder && (
              <span className="mt-1 block text-step--1 font-semibold text-sun">Placeholder price: owner to confirm</span>
            )}
          </p>
        ) : (
          <p className="font-display text-step-2">Price on request</p>
        )}
        <p className="mt-4 text-step--1 text-[#d3dae0]">Every trip is private and can be changed: dates, lodges, length, extra nights.</p>
        <Link href={quote} className="btn btn-primary mt-5 w-full">
          Request a quote
        </Link>
        <a href={wa} className="btn btn-outline-light mt-3 w-full">
          WhatsApp us about this trip
        </a>
        <p className="mt-4 text-step--1 text-[#c7d0d8]">A consultant in Arusha replies within one working day.</p>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-navy/10 bg-salt/95 px-4 py-3 backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            {price ? (
              <p className="truncate font-bold text-navy">
                From {price.label} <span className="font-normal text-slate">pp{price.isPlaceholder ? ' · TBC' : ''}</span>
              </p>
            ) : (
              <p className="font-bold text-navy">Price on request</p>
            )}
          </div>
          <a href={wa} aria-label="WhatsApp us about this trip" className="btn btn-outline text-navy">
            WhatsApp
          </a>
          <Link href={quote} className="btn btn-primary">
            Quote
          </Link>
        </div>
      </div>
    </>
  );
}
