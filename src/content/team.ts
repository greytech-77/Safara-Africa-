import type { Img } from '@/types/content';

// The team on /about/team, grouped by department in the order listed.
// TO COMPLETE: add each person's real name and photo (put photos in /public/images/team/).
// Cards show the role alone until `name` is filled in, and initials until `photo` is set.
// Contacts are optional; without them a card shows the office email and WhatsApp from config/site.ts.

export type TeamMember = {
  name?: string;
  role: string;
  department: 'Reservations' | 'Guiding' | 'Sales' | 'Marketing and brand';
  bio: string;
  photo?: Img;
  phone?: string;
  whatsapp?: string;
  email?: string;
};

export const departments: { name: TeamMember['department']; intro: string }[] = [
  { name: 'Reservations', intro: 'The people who turn your ideas into a trip that runs smoothly, from the first quote to the last transfer.' },
  { name: 'Guiding', intro: 'The people who share the bush with you, and make every game drive and every climb something you will talk about for years.' },
  { name: 'Sales', intro: 'Your first conversation with us, and the people who listen hardest to what you are hoping for.' },
  { name: 'Marketing and brand', intro: 'The storytellers who share Tanzania with the world, honestly and with care.' },
];

export const team: TeamMember[] = [
  {
    role: 'Reservations Manager',
    department: 'Reservations',
    bio: 'Leads our reservations team, confirming every lodge, flight, permit and transfer, and keeping a close eye on each trip from booking until you are home again.',
  },
  {
    role: 'Reservations Executive',
    department: 'Reservations',
    bio: 'Looks after the details of your itinerary day by day, and is the person who answers when anything needs to change.',
  },
  {
    role: 'Senior Safari Guide',
    department: 'Guiding',
    bio: 'A professional guide with years in the northern parks, reading tracks, behaviour and weather to put you in the right place at the right time.',
  },
  {
    role: 'Professional Safari Guide',
    department: 'Guiding',
    bio: 'Brings the Serengeti, Ngorongoro and Tarangire to life, with patience at every sighting and a story behind every animal.',
  },
  {
    role: 'Mountain Guide',
    department: 'Guiding',
    bio: 'A licensed Kilimanjaro and Meru guide trained in wilderness first aid, who sets the pace, checks your health and walks every step with you.',
  },
  {
    role: 'Sales Manager',
    department: 'Sales',
    bio: 'Listens first, then designs a proposal around your dates, budget and dreams, and stays with you until the trip feels exactly right.',
  },
  {
    role: 'Travel Consultant',
    department: 'Sales',
    bio: 'Answers your questions about seasons, parks and lodges with first-hand knowledge, and helps you choose with confidence.',
  },
  {
    role: 'Marketing Manager',
    department: 'Marketing and brand',
    bio: 'Shares our journeys and our guests’ stories with travellers around the world, and builds partnerships with agents and lodges.',
  },
  {
    role: 'Brand and Content Lead',
    department: 'Marketing and brand',
    bio: 'Shapes how Safara Africa looks and sounds, from photography and the journal to every page of this website.',
  },
];
