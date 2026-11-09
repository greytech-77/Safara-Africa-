'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/config/site';

// Phones and tablets: a Call / Enquire bar that appears once the visitor scrolls past the first screen
// and steps aside again when the footer comes into view. Trip pages have their own quote bar, so it hides there.
export default function FloatingCta() {
  const [show, setShow] = useState(false);
  const onTripPage = (usePathname() ?? '').startsWith('/tours/');

  useEffect(() => {
    let pastHero = false;
    let footerVisible = false;
    const sync = () => setShow(pastHero && !footerVisible);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.8;
      sync();
    };
    const footer = document.querySelector('footer');
    const io = new IntersectionObserver(([entry]) => {
      footerVisible = entry.isIntersecting;
      sync();
    });
    if (footer) io.observe(footer);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  if (onTripPage) return null;

  return (
    <div
      data-hidden={!show || undefined}
      inert={!show}
      className="float-cta fixed inset-x-0 bottom-0 z-20 border-t border-deep-teal/10 bg-cream/95 px-4 py-3 backdrop-blur-sm lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a href={`tel:${site.phone.tel}`} className="btn btn-outline text-deep-teal">
          Call us
        </a>
        <Link href="/contact#enquire" className="btn btn-primary">
          Enquire
        </Link>
      </div>
    </div>
  );
}
