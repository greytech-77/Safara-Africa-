import Link from 'next/link';
import Logo from './Logo';
import FooterColumns from './FooterColumns';
import { socialIcons } from './social-icons';
import { site } from '@/config/site';
import Image from 'next/image';
import { footerColumns, legalLinks, publishedPartners, socialLinks } from '@/config/footer';

// Centred footer: social icons, four link columns, a divider, the logo and tagline, then legal links and copyright.
// Content comes from config/footer.ts and config/site.ts. Focus rings are white here.
export default function Footer() {
  return (
    <footer className="bg-footer py-16 text-center text-white [--focus-ring:#fff] lg:py-8">
      <div className="mx-auto max-w-[1224px] px-6">
        {socialLinks.length > 0 && (
          <ul className="mb-16 flex flex-wrap justify-center gap-4 lg:mb-16">
            {socialLinks.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${site.name} on ${s.name}`}
                  className="grid size-10 place-items-center rounded-full bg-white/50 text-footer transition-colors duration-200 hover:bg-white"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <path d={socialIcons[s.platform]} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        )}

        <FooterColumns columns={footerColumns} />

        {publishedPartners.length > 0 && <Partners />}

        <hr className="mb-16 h-px border-0 bg-white/25 lg:mb-6" />

        <div className="mb-10 flex flex-col items-center lg:mb-4">
          <Link href="/" aria-label={`${site.name} home`} className="block w-[200px] lg:w-[170px]">
            <Logo tone="white" height={65} />
          </Link>
          <p className="mt-3 text-[12px] lg:mt-1 font-light tracking-[0.35px] text-white/75">{site.tagline}</p>
          <TrustLines />
        </div>

        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[14px] font-light tracking-[0.35px]">
          {legalLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-opacity duration-200 hover:opacity-60">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[14px] font-light text-white/50 lg:mt-2">
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// Partner logos in one centred row (wrapping on small screens), all shown as white marks so the black ones
// (ATTA lettering, TATO) stay visible on the dark footer. A partner without a logo file shows its name.
function Partners() {
  return (
    <section aria-labelledby="footer-partners" className="mb-16 lg:mb-6">
      <h2 id="footer-partners" className="font-sans text-[20px] font-medium leading-tight text-[#d19f4d]">
        Our partners
      </h2>
      <span aria-hidden="true" className="mx-auto mt-4 block h-px w-20 lg:mt-2 bg-white/25" />
      <ul className="mt-8 lg:mt-[17px] flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:justify-around">
        {publishedPartners.map((p) => {
          const mark = p.logo ? (
            <Image
              src={p.logo.src}
              alt={p.name}
              width={p.logo.width}
              height={p.logo.height}
              sizes="180px"
              className="h-16 w-auto max-w-[180px] lg:h-12 object-contain opacity-80 brightness-0 invert"
            />
          ) : (
            <span className="block max-w-[180px] font-display text-[18px] leading-snug text-white/75">{p.name}</span>
          );
          return (
            <li key={p.name}>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener" className="block transition-opacity duration-200 hover:opacity-60">
                  {mark}
                </a>
              ) : (
                mark
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// Licence and memberships from site.licences; each line appears only once it is filled in.
function TrustLines() {
  const { tala, tato, kpap } = site.licences;
  if (!tala && !tato && !kpap) return null;
  return (
    <ul className="mt-4 space-y-1 text-[12px] font-light text-white/75">
      {tala && <li>TALA tour operator licence no. {tala}</li>}
      {tato && (
        <li>
          <a
            className="underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
            href="https://www.tatotz.org/"
            target="_blank"
            rel="noopener"
          >
            TATO member
          </a>{' '}
          no. {tato}
        </li>
      )}
      {kpap && <li>KPAP partner for porter welfare on Kilimanjaro</li>}
    </ul>
  );
}
