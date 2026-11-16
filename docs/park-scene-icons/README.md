# Park highlight scene icons — Safara Africa

26 line-art scene icons for the "Known for / Birdlife / ..." strips on the park pages.
Style: 64x64 grid, 1.5 rounded stroke, no fill, one colour (`currentColor`, shown in `text-gold-ink`, #8a5a10).

## Where things live

- `src/components/park-highlights/ParkHighlightIcons.tsx` – one React component per icon + the `sceneIcons` lookup.
- `src/components/park-highlights/ParkHighlights.tsx` – the strip on `/parks/[slug]`, with the icon above each item.
- `src/content/park-highlight-icons.ts` – which icon goes with each strip item, per park slug and label.
- `src/content/park-guides.ts` – the strip text itself (`facts`: label + value per park).
- This folder (docs only, not used by the site): `svg/` (each icon as a standalone SVG), `all-parks-real-size.png`
  (every park's strip at real size) and `all-icons-large.png` (every icon enlarged).

## Parks covered (the 10 pages that have a highlight strip today)

serengeti, ngorongoro, tarangire, lake-manyara, nyerere, mikumi, ruaha, arusha-national-park, mkomazi, mahale.

## Adding an icon to another park

1. Give the park `facts` in `src/content/park-guides.ts` (the strip only shows when a park has facts).
2. In `src/content/park-highlight-icons.ts`, add `'park-slug': { 'Exact label': 'iconName' }`, with the label typed
   exactly as in `facts`. Icon names are the keys of `sceneIcons` (TypeScript flags a wrong name).
3. A label with no icon simply shows as text. If you rename a label in `facts`, rename it here too.

New drawings go in `ParkHighlightIcons.tsx` (64x64 viewBox, wrapped in `SceneIcon`) and must be added to `sceneIcons`.
