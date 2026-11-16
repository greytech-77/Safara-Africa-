import type { Img } from '@/types/content';

// The team: one entry per person. Feeds /about/team (the grid) and /about/team/[slug] (each profile).
// Order on the page: leadership first, then guides, then the office team; `order` sorts within each group.
//
// TO COMPLETE for each person (never invent these; leave a field out until you have the real detail):
// - name: their real name. Until it is set, cards show the role as the heading.
// - slug: change to the person's name (e.g. 'amani-mushi') once the name is set; it is their profile URL.
// - photo: a portrait, all in the same style (outdoors, in uniform, natural light), saved in /public/images/team/.
// - years, languages, favouritePlace: the fact chips. Each one only shows when it is filled in.
// - fullBio: 150–250 words for the profile page, written consistently (all first person or all third person).
// - quote: a short personal line in their own words.

export type TeamGroup = 'leadership' | 'guides' | 'office';

export type TeamMember = {
  slug: string;
  name?: string;
  role: string;
  group: TeamGroup;
  order: number;
  photo?: Img;
  /** 2–3 sentences for the card, about 45 words. */
  bio: string;
  /** 150–250 words for the profile page; paragraphs separated by a blank line. */
  fullBio?: string;
  years?: number;
  languages?: string[];
  favouritePlace?: string;
  quote?: string;
};

export const teamGroups: { id: TeamGroup; label: string }[] = [
  { id: 'leadership', label: 'Leadership' },
  { id: 'guides', label: 'Guides' },
  { id: 'office', label: 'Office team' },
];

export const team: TeamMember[] = [
  // Leadership
  {
    slug: 'reservations-manager',
    role: 'Reservations Manager',
    group: 'leadership',
    order: 1,
    bio: 'Leads our reservations team, confirming every lodge, flight, permit and transfer, and keeping a close eye on each trip from booking until you are home again.',
  },
  {
    slug: 'sales-manager',
    role: 'Sales Manager',
    group: 'leadership',
    order: 2,
    bio: 'Listens first, then designs a proposal around your dates, budget and dreams, and stays with you until the trip feels exactly right.',
  },
  {
    slug: 'marketing-manager',
    role: 'Marketing Manager',
    group: 'leadership',
    order: 3,
    bio: 'Shares our journeys and our guests’ stories with travellers around the world, and builds partnerships with agents and lodges.',
  },

  // Guides
  {
    slug: 'senior-safari-guide',
    role: 'Senior Safari Guide',
    group: 'guides',
    order: 1,
    bio: 'A professional guide with years in the northern parks, reading tracks, behaviour and weather to put you in the right place at the right time.',
  },
  {
    slug: 'professional-safari-guide',
    role: 'Professional Safari Guide',
    group: 'guides',
    order: 2,
    bio: 'Brings the Serengeti, Ngorongoro and Tarangire to life, with patience at every sighting and a story behind every animal.',
  },
  {
    slug: 'mountain-guide',
    role: 'Mountain Guide',
    group: 'guides',
    order: 3,
    bio: 'A licensed Kilimanjaro and Meru guide trained in wilderness first aid, who sets the pace, checks your health and walks every step with you.',
  },

  // Office team
  {
    slug: 'reservations-executive',
    role: 'Reservations Executive',
    group: 'office',
    order: 1,
    bio: 'Looks after the details of your itinerary day by day, and is the person who answers when anything needs to change.',
  },
  {
    slug: 'travel-consultant',
    role: 'Travel Consultant',
    group: 'office',
    order: 2,
    bio: 'Answers your questions about seasons, parks and lodges with first-hand knowledge, and helps you choose with confidence.',
  },
  {
    slug: 'brand-and-content-lead',
    role: 'Brand and Content Lead',
    group: 'office',
    order: 3,
    bio: 'Shapes how Safara Africa looks and sounds, from photography and the journal to every page of this website.',
  },
];

const groupRank: Record<TeamGroup, number> = { leadership: 0, guides: 1, office: 2 };

/** Everyone in page order: leadership, guides, office; then by `order`. */
export const teamInOrder = () => [...team].sort((a, b) => groupRank[a.group] - groupRank[b.group] || a.order - b.order);
export const getTeamMember = (slug: string) => team.find((m) => m.slug === slug);
/** The heading for a person: their name, or their role until the name is added. */
export const displayName = (m: TeamMember) => m.name ?? m.role;
/** "Plan a safari with Amani", or with the role until the name is added. */
export const firstName = (m: TeamMember) => m.name?.split(/\s+/)[0];
