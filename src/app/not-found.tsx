import Link from 'next/link';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import { pageHeroes } from '@/content/page-heroes';

export default function NotFound() {
  return (
    <>
      <Header overlay />
      <Hero size="sm" image={pageHeroes.notFound.image} title="This track doesn’t" titleAccent="lead anywhere" cta={false} />
      <section className="band">
        <div className="wrap">
          <p className="measure text-ink">The page may have moved when we rebuilt the site. Try the journeys or get in touch.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/tours" className="btn btn-primary">
              See journeys
            </Link>
            <Link href="/contact" className="btn btn-outline text-deep-teal">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
