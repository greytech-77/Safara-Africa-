import type { Stop } from '@/types/content';

// A journey's stops in travel order — the site's signature element.
export default function RouteLine({ route, tone = 'dark', size = 'sm' }: { route: Stop[]; tone?: 'dark' | 'light'; size?: 'sm' | 'lg' }) {
  const light = tone === 'light';
  return (
    <ol
      aria-label="Route"
      className={`flex flex-wrap gap-y-4 ${size === 'lg' ? 'text-step-0' : 'text-step--1'} ${light ? 'text-[#f4f5f0]' : 'text-ink'}`}
    >
      {route.map((stop, i) => (
        <li key={`${stop.place}-${i}`} className="flex items-start">
          <span className="flex flex-col">
            <span className="flex items-center gap-2 font-bold">
              <span aria-hidden="true" className="inline-block size-2.5 rounded-full bg-sun ring-4 ring-sun/25" />
              {stop.place}
            </span>
            <span className={`pl-[1.15rem] ${light ? 'text-[#dce2e6]' : 'text-slate'}`}>
              {stop.nights > 0
                ? `${stop.nights} night${stop.nights > 1 ? 's' : ''}`
                : i === 0
                  ? 'Start'
                  : i === route.length - 1
                    ? 'End'
                    : 'Visit'}
            </span>
          </span>
          {i < route.length - 1 && (
            <span
              aria-hidden="true"
              className={`mx-3 mt-[0.65rem] h-px ${size === 'lg' ? 'w-14' : 'w-6'} ${light ? 'bg-white/50' : 'bg-deep-teal/35'}`}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
