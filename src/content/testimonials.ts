// Guest reviews for the homepage carousel.
// PLACEHOLDERS: replace every entry with a real review (with the guest's permission) before launch.
// Never publish invented reviews as genuine.

export type Testimonial = {
  title: string;
  quote: string;
  name: string;
  /** Where it was published or when, e.g. "October 2026 on Tripadvisor". */
  source: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    title: 'Sample review: family safari',
    quote:
      'Placeholder text. Replace with a real guest review, for example how the team planned a family safari through Tarangire, Ngorongoro and the Serengeti, and what made the guide and lodges special.',
    name: 'Guest name',
    source: 'Month year on Tripadvisor',
    rating: 5,
  },
  {
    title: 'Sample review: honeymoon',
    quote:
      'Placeholder text. Replace with a real guest review, for example a honeymoon that combined a Serengeti safari with a few slow days on Zanzibar.',
    name: 'Guest name',
    source: 'Month year on Google',
    rating: 5,
  },
  {
    title: 'Sample review: Kilimanjaro climb',
    quote:
      'Placeholder text. Replace with a real guest review, for example a Kilimanjaro climb on the Machame route and how the guides and porters supported the group to the summit.',
    name: 'Guest name',
    source: 'Month year on Trustpilot',
    rating: 5,
  },
];
