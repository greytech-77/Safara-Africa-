import Link from 'next/link';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="wrap py-32">
        <h1 className="max-w-[18ch] text-step-5 text-navy">This track doesn&apos;t lead anywhere.</h1>
        <p className="measure mt-4 text-slate">The page may have moved when we rebuilt the site. Try the journeys or get in touch.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/tours" className="btn btn-primary">See journeys</Link>
          <Link href="/contact" className="btn btn-outline text-navy">Contact us</Link>
        </div>
      </section>
    </>
  );
}
