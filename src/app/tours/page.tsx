import type { Metadata } from 'next';
import Header from '@/components/Header';
import TourGrid from '@/components/TourGrid';
import { getTours } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Tanzania tours and safaris',
  description: 'Private luxury, fly-in and guided safaris, Kilimanjaro climbs and Zanzibar stays, each fully customisable.',
  alternates: { canonical: '/tours' },
};

export default function ToursPage() {
  const tours = getTours();
  return (
    <>
      <Header current="/tours" />
      <section className="wrap pt-16">
        <h1 className="text-step-5 text-navy">Journeys through Tanzania</h1>
        <p className="measure mt-4 text-slate">Pick a route to start from. Every one can be lengthened, shortened, upgraded or reshaped entirely.</p>
      </section>
      <section className="wrap mt-10">
        <TourGrid tours={tours} filters />
      </section>
    </>
  );
}
