import TourCard from './TourCard';
import type { TourCardData } from '@/types/content';

// Grid of tour cards. A server component: card data stays on the server. Filtering lives in ItineraryBrowser (/tours).
export default function TourGrid({ tours }: { tours: TourCardData[] }) {
  return (
    <div data-reveal-stagger className="mx-auto grid max-w-[1072px] gap-6 px-2 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
      {tours.map((t) => (
        <TourCard key={t.slug} tour={t} />
      ))}
    </div>
  );
}
