'use client';

import { useEffect, useMemo, useState } from 'react';

type Point = { slug: string; name: string; lat: number; lng: number };
type Props = {
  // Places in travel order (routePath in data.ts).
  points: Point[];
  // For each day, the index in `points` where that day ends.
  dayEnds: number[];
  days: { day: number; title: string }[];
};

const W = 400;
const PAD = 40;

// Route map beside the day-by-day. As the visitor scrolls past each day (<li id="day-N">), the route draws on
// to that day's stop and the marker moves there. Clicking a stop jumps to the day you arrive.
// Drawn from place coordinates with a simple projection: a diagram, not a navigation map.
export default function RouteProgressMap({ points, dayEnds, days }: Props) {
  // 0 = before day 1; n = day n has scrolled past the reading line.
  const [reached, setReached] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let n = 0;
      for (const d of days) {
        const el = document.getElementById(`day-${d.day}`);
        if (!el || el.getBoundingClientRect().top > line) break;
        n += 1;
      }
      setReached(n);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [days]);

  const g = useMemo(() => geometry(points), [points]);
  if (g.unique.length < 2) return null;

  const end = reached === 0 ? 0 : dayEnds[reached - 1];
  const here = g.xy[end];
  const current = reached === 0 ? null : days[reached - 1];
  const label = `Route: ${g.unique.map((p) => p.name).join(' to ')}`;
  // The day you first arrive at each place, for the stop links.
  const arrival = (i: number) => days[dayEnds.findIndex((e) => e >= i)]?.day ?? 1;

  return (
    <figure className="rounded-xl border border-deep-teal/15 bg-white p-4">
      <figcaption className="flex items-baseline justify-between gap-3">
        <span className="text-step--1 font-semibold uppercase tracking-[0.08em] text-slate">Your route</span>
        <span className="text-step--1 font-bold text-deep-teal">{current ? `Day ${current.day} of ${days.length}` : 'Start'}</span>
      </figcaption>

      <svg viewBox={`0 0 ${W} ${g.H}`} role="img" aria-label={label} className="mt-3 h-auto w-full rounded-lg bg-salt-deep">
        <title>{label}</title>
        {/* The whole route, faint, then the part travelled so far drawn over it. */}
        <polyline points={g.path} fill="none" stroke="var(--color-deep-teal)" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="5 5" />
        <polyline
          points={g.path}
          fill="none"
          stroke="var(--color-deep-teal)"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={g.total}
          strokeDashoffset={g.total - g.lengths[end]}
          style={{ transition: 'stroke-dashoffset 0.7s var(--ease-out)' }}
        />

        {g.unique.map((p, n) => {
          const i = points.findIndex((q) => q.slug === p.slug);
          const [x, y] = g.xy[i];
          const visited = i <= end;
          const day = arrival(i);
          return (
            <a
              key={p.slug}
              href={`#day-${day}`}
              onClick={() => document.querySelector<HTMLDetailsElement>(`#day-${day} details`)?.setAttribute('open', '')}
            >
              <title>{`${p.name}: day ${day}`}</title>
              <circle
                cx={x}
                cy={y}
                r="11"
                fill={visited ? 'var(--color-sun)' : 'white'}
                stroke={visited ? 'white' : 'var(--color-deep-teal)'}
                strokeWidth="2"
                style={{ transition: 'fill 0.3s' }}
              />
              <text x={x} y={y + 4.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-ink)">
                {n + 1}
              </text>
            </a>
          );
        })}

        {/* Labels last, with a halo, so the route line never runs through them. */}
        {placeLabels(g.unique, g.xyOf).map((l) => (
          <text
            key={l.slug}
            x={l.x}
            y={l.y}
            textAnchor={l.anchor}
            fontSize="15"
            fontWeight="600"
            fill="var(--color-ink)"
            stroke="var(--color-salt-deep)"
            strokeWidth="4"
            strokeLinejoin="round"
            paintOrder="stroke"
            pointerEvents="none"
          >
            {l.name}
          </text>
        ))}

        <g aria-hidden="true" style={{ transform: `translate(${here[0]}px, ${here[1]}px)`, transition: 'transform 0.7s var(--ease-out)' }}>
          <circle r="17" fill="var(--color-gold)" opacity="0.25" />
          <circle r="6" fill="var(--color-gold)" stroke="white" strokeWidth="2" />
        </g>
      </svg>

      <p className="mt-3 min-h-[3em] text-step--1 text-ink">
        {current ? current.title : `Starts in ${points[0].name}. Scroll the days to follow the route.`}
      </p>
    </figure>
  );
}

function geometry(points: Point[]) {
  const unique = points.filter((p, i) => points.findIndex((q) => q.slug === p.slug) === i);
  const lats = unique.map((p) => p.lat);
  const lngs = unique.map((p) => p.lng);
  const span = Math.max(Math.max(...lngs) - Math.min(...lngs), Math.max(...lats) - Math.min(...lats), 0.6);
  const midLat = (Math.max(...lats) + Math.min(...lats)) / 2;
  const midLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;
  const kx = Math.cos((midLat * Math.PI) / 180);
  const lngSpan = Math.max(Math.max(...lngs) - Math.min(...lngs), span * 0.6);
  const latSpan = Math.max(Math.max(...lats) - Math.min(...lats), span * 0.4);
  const scale = Math.min((W - PAD * 2) / (lngSpan * kx), (340 - PAD * 2) / latSpan);
  const H = Math.round(Math.min(340, Math.max(220, latSpan * scale + PAD * 2)));
  const xyOf = (p: Point): [number, number] => [W / 2 + (p.lng - midLng) * kx * scale, H / 2 - (p.lat - midLat) * scale];

  const xy = points.map(xyOf);
  // Distance along the route to each point, so the drawn line can stop exactly at a place.
  const lengths = xy.map(() => 0);
  for (let i = 1; i < xy.length; i++) lengths[i] = lengths[i - 1] + Math.hypot(xy[i][0] - xy[i - 1][0], xy[i][1] - xy[i - 1][1]);
  const path = xy.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  return { unique, H, xy, xyOf, lengths, total: lengths.at(-1)! || 1, path };
}

// Places each label beside its dot (right, or left near the right edge) and nudges labels down
// when they would sit on top of a label placed earlier.
function placeLabels(points: Point[], xyOf: (p: Point) => [number, number]) {
  const placed: { slug: string; name: string; x: number; y: number; anchor: 'start' | 'end' }[] = [];
  for (const p of [...points].sort((a, b) => xyOf(a)[1] - xyOf(b)[1])) {
    const [x, y] = xyOf(p);
    const right = x < W * 0.62;
    const label = {
      slug: p.slug,
      name: p.name,
      x: right ? x + 16 : x - 16,
      y: y + 5,
      anchor: right ? ('start' as const) : ('end' as const),
    };
    for (const other of placed) {
      if (Math.abs(other.x - label.x) < 120 && Math.abs(other.y - label.y) < 19) label.y = other.y + 19;
    }
    placed.push(label);
  }
  return placed;
}
