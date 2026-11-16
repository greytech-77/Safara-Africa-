import Image from 'next/image';
import { displayName, type TeamMember } from '@/content/team';

// Shared pieces of the team page and the profile pages.

/** Fact chips: only the facts that are filled in. */
export function factChips(m: TeamMember) {
  return [
    m.years && `${m.years} yrs experience`,
    m.languages?.length && `Speaks: ${m.languages.join(', ')}`,
    m.favouritePlace && `Favourite park: ${m.favouritePlace}`,
  ].filter(Boolean) as string[];
}

export function FactChips({ m }: { m: TeamMember }) {
  const chips = factChips(m);
  if (chips.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Facts">
      {chips.map((c) => (
        <li key={c} className="rounded-full border border-gold-ink/50 px-2.5 py-0.5 text-[12px] text-gold-ink">
          {c}
        </li>
      ))}
    </ul>
  );
}

/** Portrait, or the person's initials until a photo is added. Zooms slightly on hover inside a `group`. */
export function Portrait({ m, sizes, priority = false }: { m: TeamMember; sizes: string; priority?: boolean }) {
  if (m.photo)
    return (
      <Image
        src={m.photo.src}
        alt={`${displayName(m)}, ${m.role}`}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
    );
  const initials = displayName(m)
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return (
    <span aria-hidden="true" className="flex size-full items-center justify-center font-display text-[4.5rem] text-cream/80">
      {initials}
    </span>
  );
}
