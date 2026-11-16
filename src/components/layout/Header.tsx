import Link from 'next/link';
import HeaderShell from './HeaderShell';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { getMenu } from '@/config/menu';
import { site } from '@/config/site';

// overlay: sits on top of a full-bleed photo (see-through dark strip) until the visitor scrolls
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
      {/* 85px dark bar: logo left, menu centred, "Plan your journey" right. Below 1024px: logo and hamburger. */}
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label={`${site.legalName} home`} className="shrink-0 justify-self-start">
          <Logo tone="white" height={52} priority />
        </Link>

        <div className="hidden h-full lg:block">
          <MegaMenu items={items} activeId={activeId} />
        </div>

        <div className="flex items-center gap-5 justify-self-end">
          <Link href="/contact#enquire" className="btn btn-primary header-cta hidden lg:inline-flex">
            Plan your journey
          </Link>
          <div className="lg:hidden">
            <MobileMenu items={items} activeId={activeId} />
          </div>
        </div>
      </div>
    </HeaderShell>
  );
}
