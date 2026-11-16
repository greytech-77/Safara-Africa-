import { describe, expect, it } from 'vitest';
import { accommodations } from '@/content/accommodations';
import { getItineraries, getStays } from '@/features/itineraries/data';

// Lodge names must read the same everywhere: the overview, the day by day, "Where you'll stay" and the lodge pages
// all take them from the stays catalogue (src/content/stays.ts). These checks catch a lodge page with a different
// name, and tour copy that spells a lodge differently or mentions a lodge the trip does not use.

const stays = [...getStays().values()];
const pages = new Map(accommodations.map((a) => [a.slug, a]));

describe('lodge names come from one source', () => {
  it('every stay linked to a lodge page has a page with the same name', () => {
    for (const s of stays.filter((x) => x.accommodation)) {
      const page = pages.get(s.accommodation!);
      expect(page, `${s.slug} links to missing page ${s.accommodation}`).toBeDefined();
      expect(page!.name, `stays.ts "${s.name}" vs accommodations.ts "${page!.name}"`).toBe(s.name);
    }
  });

  it('tour copy only names lodges the trip stays at, spelled exactly as in the catalogue', () => {
    const names = [...new Set([...stays.map((s) => s.name), ...accommodations.map((a) => a.name)])];
    for (const it of getItineraries()) {
      const onTrip = new Set(it.itinerary.flatMap((d) => (d.stay ? [getStays().get(d.stay)!.name] : [])));
      const texts = [
        it.summary,
        ...it.included,
        ...it.whyLove,
        it.seasonNote ?? '',
        ...it.itinerary.flatMap((d) => [d.description, d.hook ?? '', d.highlight ?? '', d.guideTip ?? '', d.addOn?.text ?? '']),
      ];
      for (const text of texts) {
        for (const name of names) {
          const i = text.toLowerCase().indexOf(name.toLowerCase());
          if (i < 0) continue;
          expect(text.slice(i, i + name.length), `${it.slug}: "${name}" spelled differently`).toBe(name);
          expect(onTrip.has(name), `${it.slug} mentions "${name}" but does not stay there`).toBe(true);
        }
      }
    }
  });
});
