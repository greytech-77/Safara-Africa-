import type { Img } from '@/types/content';
import { unsplash } from '@/lib/unsplash';

export type WildlifePhoto = Img & { width: number; height: number };

// The photo's original size, so the wildlife strip can show it at its natural shape.
const photo = (id: string, alt: string, width: number, height: number): WildlifePhoto => ({ ...unsplash(id, alt), width, height });
// Freely licensed photos from Wikimedia Commons, resized to 1,200px tall in public/images/wildlife/. Their licences
// (CC BY-SA) require the credit, which the strip shows under the photos.
const local = (name: string, alt: string, width: number, height: number, credit: NonNullable<Img['credit']>): WildlifePhoto => ({
  src: `/images/wildlife/${name}.jpg`,
  alt,
  width,
  height,
  credit,
});

// Photos for the "Wildlife you may see" strip on park pages, keyed by the species name used in park-guides.ts
// (`wildlife`). Each species can have several photos: the strip takes the first photo of each species, then the
// second, and so on, until it has five. Species without a photo are listed as text under the strip.
// Only add a photo that really shows that species: a generic giraffe is not a Rothschild's or reticulated giraffe.
// width/height are the original pixel size. The tallest slot is 420px, so a photo needs at least 840px of height
// for sharp 2x screens. Unsplash photos are the ones already used elsewhere on the site; the Commons ones are
// local files. All are at least 1,200px tall. A photo whose licence needs a credit sets `credit`.
export const wildlifePhotos: Record<string, WildlifePhoto[]> = {
  Lion: [
    photo('1759352370603-eeb21e082e74', 'A male lion walking across grassy savanna', 5722, 3815),
    photo('1507088164404-020d1e905959', 'A pride of lions walking across dry grass', 4368, 2912),
  ],
  Cheetah: [photo('1720449200587-af15f6c20cba', 'A cheetah sitting in tall grass', 5616, 3510)],
  Elephant: [
    photo('1737284274116-3b7c77905343', 'An elephant standing in long grass', 3804, 3937),
    photo('1643735240112-adf0c4f45d31', 'An elephant standing in a grassy field', 5817, 3883),
    photo('1728238054897-05023133fe90', 'A herd of elephants walking across a river', 5472, 3648),
    local('elephant-tsavo-red', 'A red-dust elephant in Tsavo East', 1799, 1200, {
      author: 'Byrdyak',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Red_elephant_in_dirt.jpg',
    }),
    local('elephants-tsavo-running', 'A family of red-dust elephants running in Tsavo', 1590, 1200, {
      author: 'Byrdyak',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Elephant_running.jpg',
    }),
  ],
  Buffalo: [photo('1765706730020-561a6432abbd', 'A buffalo on a dirt road, watched from a safari vehicle', 3860, 2576)],
  Wildebeest: [photo('1564101160531-4838e8a5f4e7', 'Wildebeest herd crossing a muddy river', 4170, 3128)],
  Zebra: [photo('1635595358293-03620e36be48', 'A herd of zebra on a dry grass field', 6000, 4000)],
  Hippo: [photo('1664760536094-d236cb75e506', 'A hippo in tall grass', 4608, 3456)],
  Giraffe: [
    photo('1702498257321-6b5907efcda5', 'A giraffe standing in a field with trees behind', 4475, 3006),
    photo('1538209647246-bb82d2e4b372', 'Giraffes on an open grass plain', 6720, 4480),
  ],
  Flamingo: [photo('1710136678658-a12caee832a7', 'A group of flamingos wading in water', 6000, 4000)],
  Chimpanzee: [
    photo('1742328114761-18b9304e0c95', 'A chimpanzee sitting on a tree branch in the forest', 5152, 7728),
    photo('1782664467973-7d3c93f8c47e', 'A chimpanzee resting on a tree branch', 5884, 3923),
    local('chimpanzee-fig-kibale', 'A chimpanzee feeding on figs in Kibale National Park', 1003, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Common_chimpanzee_(Pan_troglodytes_schweinfurthii)_feeding.jpg',
    }),
    local('chimpanzee-kibale', 'A chimpanzee sitting in the forest in Kibale', 800, 1200, {
      author: 'Giles Laurent',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:015_Chimpanzee_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
    }),
    local('chimpanzee-walking-kibale', 'An alpha male chimpanzee walking through the forest in Kibale', 960, 1200, {
      author: 'Giles Laurent',
      licence: 'CC BY-SA 4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:016_Alpha_male_chimpanzee_walking_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
    }),
  ],
  'Mountain gorilla': [
    photo('1762358511314-ac38f03cffbd', 'A large gorilla sitting in a green forest', 5472, 3648),
    photo('1773975006646-04184f1eb137', 'A gorilla mother carrying her baby through green foliage', 9504, 6336),
    local('gorilla-bwindi', 'A mountain gorilla eating leaves in Bwindi Impenetrable Forest', 1800, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Mountain_gorilla_(Gorilla_beringei_beringei)_eating.jpg',
    }),
    local('gorilla-bwindi-root', 'A female mountain gorilla eating a root in Bwindi', 1800, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Mountain_gorilla_(Gorilla_beringei_beringei)_female_eating_root.jpg',
    }),
    local('gorilla-mother-baby', 'A mountain gorilla mother holding her baby in Volcanoes National Park', 1200, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Mountain_gorilla_(Gorilla_beringei_beringei)_mother_with_baby_2.jpg',
    }),
  ],
  Leopard: [
    local('leopard-maasai-mara', 'A male leopard walking towards the camera in the Maasai Mara', 800, 1200, {
      author: 'Sumeet Moghe',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Male_leopard_walking_head_on,_in_the_Maasai_Mara.jpg',
    }),
    local('leopard-cub-maasai-mara', 'A young leopard lying in green grass in the Maasai Mara', 2133, 1200, {
      author: 'Sumeet Moghe',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Leopard_cub.jpg',
    }),
  ],
  'Black rhino': [
    local('black-rhino-lake-nakuru', 'A black rhino grazing in green grass at Lake Nakuru', 1800, 1200, {
      author: 'Diego Delso',
      licence: 'CC BY-SA 4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:Rinoceronte_negro_(Diceros_bicornis),_parque_nacional_del_lago_Nakuru,_Kenia,_2024-05-18,_DD_74.jpg',
    }),
    local('black-rhino-etosha', 'A black rhino walking through dry bush', 1800, 1200, {
      author: 'Giles Laurent',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:181_Black_rhinoceros_in_Etosha_National_Park_Photo_by_Giles_Laurent.jpg',
    }),
  ],
  'Wild dog': [
    local('wild-dog-kalahari', 'An African wild dog standing in dry grass', 1800, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:African_wild_dog_(Lycaon_pictus_pictus).jpg',
    }),
  ],
  'White rhino': [
    local('white-rhino-calves', 'A white rhino mother with her calves in long grass', 1800, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:White_rhinoceros_(Ceratotherium_simum)_and_calf_6m.jpg',
    }),
  ],
  Crocodile: [
    local('crocodile-lake-baringo', 'A Nile crocodile resting on a lakeshore in Kenya', 1800, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Kenyan_crocodile_(Crocodylus_niloticus_pauciscutatus).jpg',
    }),
  ],
  'Rothschild’s giraffe': [
    local('rothschild-giraffe-uganda', 'A Rothschild’s giraffe feeding on a bush in Uganda', 1800, 1200, {
      author: 'Diego Delso',
      licence: 'CC BY-SA 4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:Jirafa_(Giraffa_camelopardalis),_parque_nacional_del_Lago_Mburo,_Uganda,_2024-02-01,_DD_74.jpg',
    }),
  ],
  'Beisa oryx': [
    local('beisa-oryx', 'A beisa oryx with long straight horns standing in dry bush', 1800, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Common_beisa_oryx_(Oryx_beisa_beisa)_female.jpg',
    }),
  ],
  'Red colobus': [
    local('red-colobus-kibale', 'A red colobus mother carrying her baby in Kibale Forest', 1800, 1200, {
      author: 'Giles Laurent',
      licence: 'CC BY-SA 4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:008_Red_colobus_mother_carrying_her_baby_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
    }),
  ],
  'Colobus monkey': [
    local('colobus-uganda', 'A black-and-white colobus monkey in a tree in Uganda', 800, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Eastern_black-and-white_colobus_(Colobus_guereza_occidentalis).jpg',
    }),
    local('colobus-face', 'Close-up of a black-and-white colobus monkey', 1201, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Eastern_black-and-white_colobus_(Colobus_guereza_matschiei)_head.jpg',
    }),
  ],
  Warthog: [
    local('warthog-family', 'A warthog mother with her young in grassland', 1800, 1200, {
      author: 'Charles J. Sharp',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Common_warthog_(Phacochoerus_africanus_sundevallii)_female_with_young.jpg',
    }),
  ],
};

// Park lists also say "Rhino" (Tsavo, Akagera: both have black rhino) and "Oryx" (Mkomazi's fringe-eared oryx is a
// beisa oryx subspecies).
wildlifePhotos.Rhino = wildlifePhotos['Black rhino'];
wildlifePhotos.Oryx = wildlifePhotos['Beisa oryx'];
