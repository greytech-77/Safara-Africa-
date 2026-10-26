import type { Place } from '../schema';

const W = 520;
const PAD = 48;

// Route map drawn from place coordinates, so it always matches the day-by-day.
// A simple equirectangular projection is plenty at this scale; it is a diagram, not a navigation map.
export default function RouteMap({ stops }: { stops: Place[] }) {
  const unique = stops.filter((p, i) => stops.findIndex((q) => q.slug === p.slug) === i);
  // With fewer than three places the map says nothing the route line doesn't.
  if (unique.length < 3) return null;

  const lats = unique.map((p) => p.lat);
  const lngs = unique.map((p) => p.lng);
  const span = Math.max(Math.max(...lngs) - Math.min(...lngs), Math.max(...lats) - Math.min(...lats), 0.6);
  const midLat = (Math.max(...lats) + Math.min(...lats)) / 2;
  const midLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;
  const kx = Math.cos((midLat * Math.PI) / 180);
  const lngSpan = Math.max(Math.max(...lngs) - Math.min(...lngs), span * 0.6);
  const latSpan = Math.max(Math.max(...lats) - Math.min(...lats), span * 0.4);
  const scale = (W - PAD * 2) / (lngSpan * kx);
  const H = Math.round(Math.min(480, Math.max(260, latSpan * scale + PAD * 2)));
  const x = (p: Place) => W / 2 + (p.lng - midLng) * kx * scale;
  const y = (p: Place) => H / 2 - (p.lat - midLat) * scale;

  const path = stops.map((p) => `${x(p).toFixed(1)},${y(p).toFixed(1)}`).join(' ');
  const label = `Route: ${stops
    .map((p) => p.name)
    .filter((n, i, a) => a[i - 1] !== n)
    .join(' to ')}`;

  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="h-auto w-full max-w-xl rounded-xl bg-salt-deep">
        <title>{label}</title>
        <polyline points={path} fill="none" stroke="var(--color-navy)" strokeWidth="2.5" strokeDasharray="7 6" strokeLinejoin="round" />
        {unique.map((p, i) => (
          <g key={p.slug}>
            <circle cx={x(p)} cy={y(p)} r="15" fill="var(--color-sun)" stroke="white" strokeWidth="3" />
            <text x={x(p)} y={y(p) + 5} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--color-ink)">
              {i + 1}
            </text>
          </g>
        ))}
        {/* Labels last, with a halo, so the route line never runs through them. */}
        {placeLabels(unique, x, y).map((l) => (
          <text
            key={l.slug}
            x={l.x}
            y={l.y}
            textAnchor={l.anchor}
            fontSize="19"
            fontWeight="600"
            fill="var(--color-ink)"
            stroke="var(--color-salt-deep)"
            strokeWidth="5"
            strokeLinejoin="round"
            paintOrder="stroke"
          >
            {l.name}
          </text>
        ))}
      </svg>
      <figcaption className="mt-2 text-step--1 text-slate">
        Schematic map, not to scale for driving. Numbers show the order of stops.
      </figcaption>
    </figure>
  );
}

// Places each label beside its dot (right, or left near the right edge) and nudges labels down
// when they would sit on top of a label placed earlier.
function placeLabels(points: Place[], x: (p: Place) => number, y: (p: Place) => number) {
  const placed: { slug: string; name: string; x: number; y: number; anchor: 'start' | 'end' }[] = [];
  for (const p of [...points].sort((a, b) => y(a) - y(b))) {
    const right = x(p) < W * 0.68;
    const label = {
      slug: p.slug,
      name: p.name,
      x: right ? x(p) + 20 : x(p) - 20,
      y: y(p) + 5,
      anchor: right ? ('start' as const) : ('end' as const),
    };
    for (const other of placed) {
      if (Math.abs(other.x - label.x) < 150 && Math.abs(other.y - label.y) < 24) label.y = other.y + 24;
    }
    placed.push(label);
  }
  return placed;
}
