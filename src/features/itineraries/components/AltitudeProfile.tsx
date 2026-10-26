import type { ItineraryDay } from '../schema';

const W = 480;
const H = 260;
const L = 56;
const R = 16;
const T = 20;
const B = 40;

// Altitude by day for treks: the line joins the nights' sleeping altitudes, the thin bars reach each day's highest point.
// Shows "climb high, sleep low" at a glance.
export default function AltitudeProfile({ days }: { days: ItineraryDay[] }) {
  const stages = days.filter((d) => d.trek);
  if (stages.length < 2) return null;
  const top = Math.ceil(Math.max(...stages.map((d) => d.trek!.maxAltM)) / 1000) * 1000;
  const bottom = Math.floor(Math.min(...stages.map((d) => Math.min(d.trek!.startAltM, d.trek!.sleepAltM))) / 1000) * 1000;
  const x = (i: number) => L + ((W - L - R) * (i + 0.5)) / stages.length;
  const y = (alt: number) => T + ((H - T - B) * (top - alt)) / (top - bottom);
  const ticks = Array.from({ length: (top - bottom) / 1000 + 1 }, (_, i) => bottom + i * 1000);
  const highest = stages.reduce((a, b) => (b.trek!.maxAltM > a.trek!.maxAltM ? b : a));
  const summary = `Altitude profile: highest point ${highest.trek!.maxAltM.toLocaleString('en-GB')} m on day ${highest.day}; ${stages
    .map((d) => `day ${d.day} sleep at ${d.trek!.sleepAltM.toLocaleString('en-GB')} m`)
    .join(', ')}.`;

  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary} className="h-auto w-full rounded-xl bg-white">
        <title>{summary}</title>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="var(--color-navy)" strokeOpacity="0.12" />
            <text x={L - 8} y={y(t) + 5} textAnchor="end" fontSize="13" fill="var(--color-slate)">
              {t.toLocaleString('en-GB')}
            </text>
          </g>
        ))}
        {stages.map((d, i) => (
          <g key={d.day}>
            <line
              x1={x(i)}
              x2={x(i)}
              y1={y(d.trek!.sleepAltM)}
              y2={y(d.trek!.maxAltM)}
              stroke="var(--color-sun)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <text x={x(i)} y={H - 14} textAnchor="middle" fontSize="13" fill="var(--color-slate)">
              {`D${d.day}`}
            </text>
          </g>
        ))}
        <polyline
          points={stages.map((d, i) => `${x(i)},${y(d.trek!.sleepAltM)}`).join(' ')}
          fill="none"
          stroke="var(--color-navy)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {stages.map((d, i) => (
          <circle key={d.day} cx={x(i)} cy={y(d.trek!.sleepAltM)} r="4.5" fill="var(--color-navy)" />
        ))}
        <text
          x={x(stages.indexOf(highest))}
          y={y(highest.trek!.maxAltM) - 8}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="var(--color-ink)"
        >
          {`${highest.trek!.maxAltM.toLocaleString('en-GB')} m`}
        </text>
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-step--1 text-slate">
        <span>
          <span aria-hidden="true" className="mr-1.5 inline-block h-0.5 w-5 align-middle bg-navy" />
          Altitude where you sleep (m)
        </span>
        <span>
          <span aria-hidden="true" className="mr-1.5 inline-block h-3 w-1 align-middle rounded bg-sun" />
          Highest point that day
        </span>
      </figcaption>
    </figure>
  );
}
