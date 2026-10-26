import TourCard from './TourCard';
import type { TourCardData } from '@/types/content';

// Grid of tour cards. A server component: card data stays on the server. Filtering lives in ItineraryBrowser (/tours).
export default function TourGrid({ tours }: { tours: TourCardData[] }) {
  return (
    <div data-reveal-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tours.map((t) => (
        <TourCard key={t.slug} tour={t} />
      ))}
    </div>
  );
}
