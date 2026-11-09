import Link from 'next/link';
import HeaderShell from './HeaderShell';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { getMenu } from '@/config/menu';
import { site } from '@/config/site';

// overlay: sits on top of a full-bleed photo (white logo and text) until the visitor scrolls
// current: the page's path, used to mark the active menu section
// pinAfterHero: scrolls away with the hero and only pins to the top once the hero has gone (home page)
export default function Header({
  overlay = false,
  current,
  pinAfterHero = false,
}: {
  overlay?: boolean;
  current?: string;
  pinAfterHero?: boolean;
}) {
  const items = getMenu();
  const activeId = current ? items.find((i) => i.match.some((m) => current === m || current.startsWith(`${m}/`)))?.id : undefined;

  return (
    <HeaderShell overlay={overlay} pinAfterHero={pinAfterHero}>
      {/* On wide screens the menu sits centred, with the logo and button balanced either side. */}
      <div className="wrap flex items-center justify-between gap-6 py-5 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label={`${site.legalName} home`} className="shrink-0 justify-self-start">
          {/* Both tones are rendered; the header's scroll state shows one. */}
          {overlay && (
            <span className="logo-overlay">
              <Logo tone="white" height={56} priority />
            </span>
          )}
          <span className={overlay ? 'logo-solid' : ''}>
            <Logo tone="dark" height={56} priority={!overlay} />
          </span>
        </Link>

        <div className="hidden lg:block">
          <MegaMenu items={items} activeId={activeId} />
        </div>

        <div className="flex items-center gap-5 justify-self-end">
          <Link href="/contact#enquire" className="btn btn-primary hidden sm:inline-flex">
            Plan your journey
          </Link>
          <div className="lg:hidden">
            <MobileMenu items={items} overlay={overlay} />
          </div>
        </div>
      </div>
    </HeaderShell>
  );
}
