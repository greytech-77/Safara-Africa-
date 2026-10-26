import type { ItineraryInput } from '@/features/itineraries/schema';
import { coastAndCombos } from './coast-and-combos';
import { eastAfrica } from './east-africa';
import { migration } from './migration';
import { mountains } from './mountains';
import { northernCircuit } from './northern-circuit';

// The full catalogue. To add a trip, add an object to one of these files (or a new file listed here).
// It is validated at build time by src/features/itineraries/data.ts.
export const itineraryData: ItineraryInput[] = [...northernCircuit, ...migration, ...mountains, ...coastAndCombos, ...eastAfrica];
