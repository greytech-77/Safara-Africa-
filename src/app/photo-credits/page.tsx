import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import { accommodations } from '@/content/accommodations';
import { pageHeroes } from '@/content/page-heroes';
import { wildlifePhotos } from '@/content/wildlife-photos';
import type { Img } from '@/types/content';

export const metadata: Metadata = {
  title: 'Photo credits',
  description: 'The photographers and licences behind the photos on this site.',
  alternates: { canonical: '/photo-credits' },
};

// The licences of these photos (Creative Commons BY / BY-SA) require credit to the photographer. The credits are
// gathered here, linked from the footer, instead of under each photo. Built from the photo data, so a photo added
// with a `credit` appears here automatically.
const licenceUrl = (licence: string) => {
  const m = licence.match(/^CC (BY(?:-SA)?) ([0-9.]+)/i);
  return m ? `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/` : undefined;
};

function creditedPhotos(): { where: string; photo: Img }[] {
  const rows: { where: string; photo: Img }[] = [];
  for (const a of accommodations) for (const p of [a.image, ...(a.gallery ?? [])]) rows.push({ where: a.name, photo: p });
  for (const [species, list] of Object.entries(wildlifePhotos)) for (const p of list) rows.push({ where: species, photo: p });
  const seen = new Set<string>();
  return rows.filter(({ photo }) => photo.credit && !seen.has(photo.src) && seen.add(photo.src));
}

export default function PhotoCreditsPage() {
  const rows = creditedPhotos();
  return (
    <>
      <Header overlay current="/photo-credits" />
      <Hero size="sm" image={pageHeroes.legal.image} title="Photo credits" cta={false} breadcrumbs={[{ label: 'Photo credits' }]} />
      <div className="band">
        <div className="wrap">
          <p className="measure text-ink">
            Thank you to the photographers whose work appears on this site under Creative Commons licences. Each photo links to its
            original.
          </p>
          <ul className="mt-8 divide-y divide-deep-teal/10 border-y border-deep-teal/10">
            {rows.map(({ where, photo }) => {
              const c = photo.credit!;
              const url = licenceUrl(c.licence);
              return (
                <li key={photo.src} className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr_auto] sm:gap-6">
                  <span className="font-semibold text-ink">{where}</span>
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-deep-teal underline underline-offset-4 hover:text-gold-ink"
                  >
                    {photo.alt}
                  </a>
                  <span className="text-step--1 text-slate">
                    {c.author},{' '}
                    {url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
                        {c.licence}
                      </a>
                    ) : (
                      c.licence
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
