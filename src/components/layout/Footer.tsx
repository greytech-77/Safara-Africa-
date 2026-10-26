import Logo from './Logo';
import { site } from '@/config/site';
import { whatsappLink, whatsappMessage } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="mt-24 bg-navy-deep text-[#e8ecee]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo tone="white" height={72} />
          <p className="mt-5 max-w-xs text-[#b7c2cb]">
            A licensed tour operator in Arusha, planning private safaris, climbs and beach stays across Tanzania.
          </p>
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
          <p className="mt-2 text-step--1 text-[#9aa7b1]">Tanzania time (EAT)</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap justify-between gap-4 py-6 text-step--1 text-[#9aa7b1]">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
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
