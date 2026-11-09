import Link from 'next/link';
import { tripMessage, whatsappLink } from '@/lib/whatsapp';

type Props = { slug: string; title: string; days: number; price?: { label: string; groupSize: number; isPlaceholder: boolean } };

// Bottom bar on phones and tablets (the site-wide Call/Enquire bar hides on trip pages).
export default function EnquiryPanel({ slug, title, days, price }: Props) {
  const quote = `/contact?tour=${slug}#enquire`;
  const wa = whatsappLink(tripMessage(title, days));
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-deep-teal/10 bg-salt/95 px-4 py-3 backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <div className="min-w-0 flex-1">
          {price ? (
            <p className="truncate font-bold text-deep-teal">
              From {price.label} <span className="font-normal text-slate">pp{price.isPlaceholder ? ' · TBC' : ''}</span>
            </p>
          ) : (
            <p className="font-bold text-deep-teal">Price on request</p>
          )}
        </div>
        <a href={wa} aria-label="WhatsApp us about this trip" className="btn btn-outline text-deep-teal">
          WhatsApp
        </a>
        <Link href={quote} className="btn btn-primary">
          Quote
        </Link>
      </div>
    </div>
  );
}
