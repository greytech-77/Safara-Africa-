import Link from 'next/link';
import HeaderShell from './HeaderShell';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { getMenu } from '@/config/menu';
import { site } from '@/config/site';

// overlay: sits on top of a full-bleed photo (white logo and text) until the visitor scrolls
// current: the page's path, used to mark the active menu section
export default function Header({ overlay = false, current }: { overlay?: boolean; current?: string }) {
  const items = getMenu();
  const activeId = current ? items.find((i) => i.match.some((m) => current === m || current.startsWith(`${m}/`)))?.id : undefined;

  return (
    <HeaderShell overlay={overlay}>
      <div className="wrap flex items-center justify-between gap-6 py-5">
        <Link href="/" aria-label={`${site.legalName} home`} className="shrink-0">
          {/* Both tones are rendered; the header's scroll state shows one. */}
          {overlay && (
            <span className="logo-overlay">
              <Logo tone="white" height={56} priority />
            </span>
          )}
          <span className={overlay ? 'logo-solid' : ''}>
            <Logo tone="navy" height={56} priority={!overlay} />
          </span>
        </Link>

        <div className="hidden lg:block">
          <MegaMenu items={items} activeId={activeId} overlay={overlay} />
        </div>

        <div className="flex items-center gap-5">
          <a href={`tel:${site.phone.tel}`} className="nav-link hidden text-step--1 font-semibold whitespace-nowrap xl:inline">
            {site.phone.display}
          </a>
          <Link href="/contact#enquire" className="btn btn-primary hidden sm:inline-flex">
            Plan your trip
          </Link>
          <div className="lg:hidden">
            <MobileMenu items={items} overlay={overlay} />
          </div>
        </div>
      </div>
    </HeaderShell>
  );
}
