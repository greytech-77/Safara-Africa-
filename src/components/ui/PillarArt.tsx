// Pen-and-ink style sketches for the "Why book with us" pillars. Original line art, drawn in currentColor.

const ink = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Kilimanjaro() {
  return (
    <g {...ink}>
      <circle cx="192" cy="38" r="12" />
      <path d="M36 52q5-5 10 0q5-5 10 0M62 40q4-4 8 0q4-4 8 0" strokeWidth="1.6" />
      <path d="M14 150 L66 96 Q84 76 104 68 Q122 61 142 63 Q162 66 176 82 L228 150" />
      <path d="M104 68 Q108 80 114 74 Q119 86 127 77 Q133 88 141 79 Q148 89 156 75 Q163 80 166 72" />
      <path d="M182 100l-7 13M190 110l-7 13M198 120l-7 13M206 130l-7 13M214 140l-5 9" strokeWidth="1.6" />
      <path d="M8 150 Q120 144 234 151" />
      <path d="M60 150 Q63 132 58 118M58 118 Q49 111 40 109M58 118 Q67 109 80 107" />
      <path d="M28 108 Q55 94 94 104 Q70 114 28 108Z" fill="currentColor" />
      <path d="M120 160h40M140 168h50M30 164h36" strokeWidth="1.4" />
    </g>
  );
}

function RouteMap() {
  return (
    <g {...ink}>
      <path d="M36 50 L88 40 L140 52 L192 42 L192 140 L140 150 L88 138 L36 148Z" />
      <path d="M88 40 L88 138M140 52 L140 150" strokeWidth="1.6" />
      <path d="M140 52l6 8v88M88 40l-5 9v86" strokeWidth="1" />
      <path d="M54 126 Q74 96 102 110 T150 84 T174 66" strokeDasharray="5 6" />
      <path d="M49 121l10 10M59 121l-10 10" />
      <path d="M174 74 C166 64 166 54 174 51 C182 54 182 64 174 74Z" fill="currentColor" />
      <path d="M60 58v18M51 67h18M54 61l12 12M66 61l-12 12" strokeWidth="1.3" />
      <path d="M100 70q8-6 18 2t20-2M152 112q8 6 16 0t16 2" strokeWidth="1.3" />
      <g transform="rotate(-38 196 150)">
        <path d="M160 145h50v10h-50z" />
        <path d="M160 145l-12 5 12 5z" fill="currentColor" />
        <path d="M200 145v10" strokeWidth="1.4" />
      </g>
    </g>
  );
}

function Binoculars() {
  return (
    <g {...ink}>
      <rect x="64" y="40" width="34" height="30" rx="6" />
      <rect x="138" y="40" width="34" height="30" rx="6" />
      <rect x="54" y="68" width="54" height="74" rx="12" />
      <rect x="128" y="68" width="54" height="74" rx="12" />
      <path d="M108 82h20v22h-20z" />
      <circle cx="118" cy="58" r="8" />
      <path d="M118 66v16" />
      <ellipse cx="81" cy="142" rx="24" ry="6" fill="currentColor" />
      <ellipse cx="155" cy="142" rx="24" ry="6" fill="currentColor" />
      <path d="M62 84v46M68 80v52M136 84v46M142 80v52" strokeWidth="1.3" />
      <path d="M54 86 Q22 110 34 150 Q42 166 64 162" strokeWidth="1.8" />
      <path d="M182 86 Q214 112 202 150" strokeWidth="1.8" />
      <path d="M190 30q6-6 12 0q6-6 12 0" strokeWidth="1.6" />
    </g>
  );
}

function Tent() {
  return (
    <g {...ink}>
      <path d="M38 142 L120 62 L202 142Z" />
      <path d="M120 62 L120 48M120 48l-4 6M120 48l4 6" />
      <path d="M120 74 L100 142 L140 142Z" fill="currentColor" />
      <path d="M120 66 Q108 104 92 142M120 66 Q132 104 148 142" />
      <path d="M38 142 L14 154M202 142 L226 154M78 102 L52 154M162 102 L188 154" strokeWidth="1.4" />
      <path d="M58 136l14-14M66 138l18-18M76 138l18-18M86 132l10-10" strokeWidth="1.3" />
      <path d="M6 144 Q120 138 234 145" />
      <path d="M200 98v-14M200 84 Q204 76 212 74M200 84 Q194 78 186 78" />
      <path d="M180 76 Q200 64 224 72 Q204 82 180 76Z" fill="currentColor" />
      <path
        d="M44 34l2 6 6 2-6 2-2 6-2-6-6-2 6-2zM82 22l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5zM160 30l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"
        strokeWidth="1.2"
      />
      <path d="M52 156h30M150 158h44" strokeWidth="1.4" />
    </g>
  );
}

function SafariVehicle() {
  return (
    <g {...ink}>
      <path d="M28 122 L28 96 Q28 88 36 88 L70 88 L82 62 L172 62 L176 88 L206 92 Q214 94 214 102 L214 122" />
      <path d="M28 122h20M92 122h60M196 122h18" />
      <path d="M88 68 L80 86 L118 86 L118 68Z M124 68 L124 86 L148 86 L148 68Z M154 68 L154 86 L172 86 L170 68Z" strokeWidth="1.6" />
      <path d="M78 54h98M86 54v8M116 54v8M146 54v8M170 54v8" strokeWidth="1.6" />
      <circle cx="70" cy="122" r="18" strokeWidth="6" />
      <circle cx="70" cy="122" r="4" fill="currentColor" />
      <circle cx="174" cy="122" r="18" strokeWidth="6" />
      <circle cx="174" cy="122" r="4" fill="currentColor" />
      <path d="M118 96h12M36 98h20" strokeWidth="1.6" />
      <path d="M20 102h8v12h-8z" fill="currentColor" />
      <path d="M8 144 Q120 138 234 145" />
      <path d="M4 128q-8 0-10-6M2 112q-10-2-10-10" strokeWidth="1.3" />
      <path d="M120 152h30M190 156h30M40 154h26" strokeWidth="1.4" />
    </g>
  );
}

function Baobab() {
  return (
    <g {...ink}>
      <path d="M96 148 Q104 118 94 82 L146 82 Q136 118 144 148" />
      <path d="M108 140 Q112 112 106 90M124 144 Q120 116 126 92M134 134 Q132 112 136 96" strokeWidth="1.3" />
      <path d="M98 84 Q82 64 70 58M70 58l-12-4M70 58l-4-12M112 82 Q110 58 102 40M102 40l-8-6M102 40l2-10M128 82 Q134 58 148 46M148 46l4-10M148 46l10-2M142 84 Q164 68 178 62M178 62l8-6M178 62l10 4" />
      <path
        d="M38 54q6-14 22-12q8-8 18 0q8 6 0 14q-6 8-20 4q-16 6-20-6ZM80 30q4-14 20-12q10-8 20 2q8 8-2 14q-10 6-22 2q-14 4-16-6ZM136 30q6-14 22-10q12-6 18 4q4 10-8 14q-12 4-22 0q-12 2-10-8ZM172 56q4-14 20-10q12-4 16 6q2 10-10 12q-12 4-20-2q-8 2-6-6Z"
        fill="currentColor"
      />
      <path d="M6 150 Q120 144 234 151" />
      <path d="M88 150 Q96 144 104 146M140 146 Q148 144 154 150" strokeWidth="1.6" />
      <path d="M48 150 Q50 140 48 130" />
      <path d="M48 134 Q38 130 36 122 Q46 122 48 134ZM48 132 Q58 126 60 118 Q50 120 48 132Z" fill="currentColor" />
      <path d="M190 150 Q192 142 190 136M190 138 Q184 134 182 130M190 140 Q196 136 198 132" strokeWidth="1.6" />
      <path d="M30 162h40M170 162h40" strokeWidth="1.4" />
    </g>
  );
}

const drawings = { kilimanjaro: Kilimanjaro, map: RouteMap, binoculars: Binoculars, tent: Tent, vehicle: SafariVehicle, baobab: Baobab };

export type PillarArtName = keyof typeof drawings;

export default function PillarArt({ name, className }: { name: PillarArtName; className?: string }) {
  const Drawing = drawings[name];
  return (
    <svg aria-hidden="true" viewBox="0 0 240 172" className={className}>
      <Drawing />
    </svg>
  );
}
