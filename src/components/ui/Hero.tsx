import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb, { type Crumb } from './Breadcrumb';
import HeroVideo from './HeroVideo';
import type { Img } from '@/types/content';

type Props = {
  title: string;
  // Words shown in italic at the end of the title.
  titleAccent?: string;
  // Small uppercase label above the title.
  eyebrow?: string;
  subtitle?: string;
  // Background photo, also the video poster. Decorative: the meaning goes in the title.
  image: Img;
  video?: string;
  // Trail after "Home", which is added automatically. The last item is the current page.
  breadcrumbs?: Crumb[];
  // Defaults to the enquiry link; false hides the button.
  cta?: { label: string; href: string } | false;
  size?: 'xl' | 'lg' | 'md' | 'sm';
  overlay?: 'left' | 'bottom' | 'full';
  align?: 'left' | 'center';
  // Extra content under the title, such as a tour's route.
  children?: React.ReactNode;
  // Page-specific modifier, such as hero--home.
  className?: string;
};

const enquire = { label: 'Plan your journey', href: '/contact#enquire' };

// The hero on every page: photo or video, breadcrumb, the page's only <h1> and one outline button.
// Pair with <Header overlay>; styles are in globals.css (.hero).
export default function Hero({
  title,
  titleAccent,
  eyebrow,
  subtitle,
  image,
  video,
  breadcrumbs,
  cta = enquire,
  size = 'lg',
  overlay = 'left',
  align = 'left',
  children,
  className = '',
}: Props) {
  return (
    <section className={`hero hero--${size} hero--overlay-${overlay} hero--${align} ${className}`}>
      <Image src={image.src} alt="" fill loading="eager" fetchPriority="high" sizes="100vw" className="hero__media" />
      {video && <HeroVideo src={video} poster={image.src} />}

      {breadcrumbs && (
        <div className="hero__crumbs wrap">
          <Breadcrumb items={breadcrumbs} />
        </div>
      )}

      <div className="hero__content wrap">
        {eyebrow && <p className="hero__eyebrow">{eyebrow}</p>}
        <h1 className="hero__title">
          {keepWhole(title)}
          {titleAccent && (
            <>
              {' '}
              <em>{keepWhole(titleAccent)}</em>
            </>
          )}
        </h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        {children}
        {cta && (
          <Link href={cta.href} className="btn btn-outline-light hero__cta">
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}

// Hyphenated words ("Tailor-made") stay on one line instead of breaking after the hyphen.
function keepWhole(text: string) {
  return text.split(/(\S*-\S*)/).map((part, i) =>
    part.includes('-') ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
