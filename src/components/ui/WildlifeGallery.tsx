import Image from 'next/image';
import { wildlifePhotos } from '@/content/wildlife-photos';

// "Wildlife you may see": a photo tile for each species that has a photo, with its name on the photo;
// species without one are listed as text underneath. Tiles are centred, so one or two photos still sit in the middle.
export default function WildlifeGallery({ species }: { species: string[] }) {
  const withPhoto = species.filter((s) => wildlifePhotos[s]);
  const rest = species.filter((s) => !wildlifePhotos[s]);

  return (
    <>
      {withPhoto.length > 0 && (
        <ul className="mt-8 flex flex-wrap justify-center gap-4">
          {withPhoto.map((s) => {
            const img = wildlifePhotos[s][0];
            return (
              <li
                key={s}
                className="group relative aspect-[4/5] w-[calc(50%-0.5rem)] overflow-hidden rounded-2xl bg-sand sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="zoom object-cover"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-teal-deep/85 via-teal-deep/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-left font-display text-step-2 leading-tight text-white sm:p-5">
                  {s}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {rest.length > 0 && (
        <p className="measure mx-auto mt-6 text-ink">
          {withPhoto.length > 0 ? 'Also look out for: ' : ''}
          {rest.join(', ')}
        </p>
      )}
    </>
  );
}
