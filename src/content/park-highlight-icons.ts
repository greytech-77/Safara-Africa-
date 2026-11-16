import type { SceneIconName } from '@/components/park-highlights/ParkHighlightIcons';

/**
 * Which icon goes with each highlight, per park (slug -> strip label -> icon).
 * Labels match the strips on the site today. Shared ideas reuse one drawing:
 * World Heritage -> heritageEmblem, dry/best season -> drySeasonSunset,
 * distance -> roadDistance, few visitors -> loneJeep, birdlife -> roller.
 */
export const parkHighlightIcons: Record<string, Record<string, SceneIconName>> = {
  serengeti: {
    'The migration': 'wildebeestMigration',
    Status: 'heritageEmblem',
    Landscape: 'kopjeRiver',
    Wildlife: 'giraffeYearRound',
  },
  ngorongoro: {
    'Conservation area': 'conservationArea',
    'The crater': 'crater',
    'Crater walls': 'craterWalls',
    'World Heritage Site': 'heritageEmblem',
  },
  tarangire: {
    'Known for': 'elephantBaobab',
    Birdlife: 'roller',
    'Best season': 'drySeasonSunset',
  },
  'lake-manyara': {
    'Known for': 'flamingoShore',
    Lake: 'riftLake',
    'Best for wildlife': 'drySeasonSunset',
  },
  nyerere: {
    Status: 'heritageEmblem',
    Try: 'boatSafari',
    Visitors: 'loneJeep',
  },
  mikumi: {
    'From Dar es Salaam': 'roadDistance',
    'The Big Five': 'buffaloHead',
    Try: 'waterfall',
  },
  ruaha: {
    'Plant life': 'wildflowers',
    'Known for': 'lionRiver',
    'Best season': 'drySeasonSunset',
  },
  'arusha-national-park': {
    'From Arusha': 'roadDistance',
    Birdlife: 'roller',
    Try: 'canoeMeru',
  },
  mkomazi: {
    'Known for': 'blackRhino',
    'Wildlife route': 'sharedRoute',
    Visitors: 'loneJeep',
  },
  mahale: {
    'Getting there': 'planeBoat',
    'In the park': 'onFoot',
    'Known for': 'chimpFace',
  },
};

/** Icon for one strip item, or undefined if none is assigned. */
export function getHighlightIcon(parkSlug: string, label: string): SceneIconName | undefined {
  return parkHighlightIcons[parkSlug]?.[label];
}
