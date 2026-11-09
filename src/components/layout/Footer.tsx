import Link from 'next/link';
import Logo from './Logo';
import { site } from '@/config/site';
import { whatsappLink, whatsappMessage } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-deep-teal text-[#e8ecee]">
      <div className="wrap grid gap-10 pb-8 pt-10 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo tone="white" height={72} />
          <p className="mt-5 max-w-xs text-[#b7c2cb]">
            A licensed tour operator in Arusha, planning private safaris, climbs and beach stays across Tanzania.
          </p>
          <TrustLines />
        </div>

        <div>
          <h2 className="mb-3 font-sans text-step-0 font-bold">Office</h2>
          <address className="not-italic leading-relaxed text-[#c7d0d8]">
            {site.address.street}
            <br />
            {site.address.suburb}, {site.address.city}
            <br />
            {site.address.country}
          </address>
        </div>

        <div>
          <h2 className="mb-3 font-sans text-step-0 font-bold">Talk to us</h2>
          <ul className="space-y-1 text-[#c7d0d8]">
            <li>
              <a className="hover:text-white" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`tel:${site.phone.tel}`}>
                {site.phone.display}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={whatsappLink(whatsappMessage())}>
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-sans text-step-0 font-bold">Opening hours</h2>
          <dl className="space-y-1 text-[#c7d0d8]">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-step--1 text-[#b7c2cb]">Tanzania time (EAT)</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap justify-between gap-6 pb-10 pt-8 text-step--1 text-[#b7c2cb]">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-5">
            <li>
              <Link className="hover:text-white" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/terms">
                Booking terms
              </Link>
            </li>
          </ul>
          {site.social.length > 0 && (
            <ul className="flex gap-5">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a className="hover:text-white" href={s.href}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}

// Licence and memberships from site.licences; each line appears only once it is filled in.
function TrustLines() {
  const { tala, tato, kpap } = site.licences;
  if (!tala && !tato && !kpap) return null;
  return (
    <ul className="mt-5 space-y-1 text-step--1 text-[#b7c2cb]">
      {tala && <li>TALA tour operator licence no. {tala}</li>}
      {tato && (
        <li>
          <a className="underline underline-offset-4 hover:text-white" href="https://www.tatotz.org/" target="_blank" rel="noopener">
            TATO member
          </a>{' '}
          no. {tato}
        </li>
      )}
      {kpap && <li>KPAP partner for porter welfare on Kilimanjaro</li>}
    </ul>
  );
}
