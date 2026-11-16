import { sceneIcons } from './ParkHighlightIcons';
import { getHighlightIcon } from '@/content/park-highlight-icons';

export type ParkHighlight = { label: string; value: string };

// The highlights strip near the top of a park page, with a line-art scene icon above each item.
// Icons are looked up by park slug and label in content/park-highlight-icons.ts; items without one render as plain text.
// Icons are decorative (aria-hidden, set in ParkHighlightIcons).
export default function ParkHighlights({ parkSlug, items }: { parkSlug: string; items: ParkHighlight[] }) {
  return (
    <dl className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-x-12 gap-y-6 border-y border-deep-teal/15 py-6 text-center">
      {items.map(({ label, value }) => {
        const name = getHighlightIcon(parkSlug, label);
        const Icon = name ? sceneIcons[name] : null;
        return (
          <div key={label}>
            {Icon && <Icon size={60} className="mx-auto mb-2 text-gold-ink" />}
            <dt className="text-step--1 font-semibold uppercase tracking-[0.08em] text-slate">{label}</dt>
            <dd className="mt-1 font-display text-step-2 text-deep-teal">{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}
