// "Plan your journey" wizard: every step, option and price point lives here so it is easy to edit.
// The component is components/PlanWizard.tsx; answers are sent to /api/enquiry.

export type StepId = 'where' | 'when' | 'who' | 'interests' | 'budget' | 'contact';

export type Answers = {
  destinations: string[];
  /** Months as 'YYYY-MM'. */
  months: string[];
  flexible: boolean;
  who: string;
  interests: string[];
  currency: string;
  /** Index into budgetPoints[currency]. */
  budget: number | null;
  firstName: string;
  lastName: string;
  phoneCode: string;
  phone: string;
  email: string;
  notes: string;
  newsletter: boolean;
  consent: boolean;
};

export const emptyAnswers: Answers = {
  destinations: [],
  months: [],
  flexible: false,
  who: '',
  interests: [],
  currency: 'USD',
  budget: null,
  firstName: '',
  lastName: '',
  phoneCode: 'TZ',
  phone: '',
  email: '',
  notes: '',
  newsletter: false,
  consent: false,
};

// Headings: the word in *asterisks* is set in italic. {places} is replaced with the chosen destinations.
export const steps: { id: StepId; title: string; intro?: string; wide?: boolean }[] = [
  { id: 'where', title: '*Where* would you like to travel?', intro: "Please select the destinations you'd like to visit." },
  { id: 'when', title: '*When* would you like to travel to {places}?', intro: 'A general idea is fine.' },
  { id: 'who', title: '*Who* are you travelling to {places} with?' },
  { id: 'interests', title: 'Which of these are most *appealing*?', intro: 'Please select up to three things.', wide: true },
  {
    id: 'budget',
    title: 'What is your *budget* per person for this trip?',
    intro: 'Every budget is welcome. This simply helps us suggest the right places to stay.',
  },
  { id: 'contact', title: '*Finally,* how should we contact you?', intro: 'A travel consultant will reply within one working day.' },
];

export const whoOptions = ['Couple', 'Family', 'Group of friends', 'Solo', 'Multiple families', 'Other'];

export const maxInterests = 3;
export const interestOptions = [
  'Big Five game drives',
  'The Great Migration',
  'Hot-air balloon over the Serengeti',
  'Walking safari',
  'Kilimanjaro trek',
  'Zanzibar beach time',
  'Cultural village visit',
  'Photography safari',
  'Gorilla or chimpanzee trekking',
  'Honeymoon or celebration',
];

// Budget per person. Each currency has its own rounded points so the labels read naturally.
// TZS points are rough equivalents of the USD ones; adjust as exchange rates move.
export const currencies = ['USD', 'EUR', 'GBP', 'TZS'] as const;
export const budgetPoints: Record<(typeof currencies)[number], { label: string; value: string }[]> = {
  USD: points('$', ['2,000', '3,500', '5,000', '7,500', '10,000', '15,000']),
  EUR: points('€', ['2,000', '3,500', '5,000', '7,500', '10,000', '15,000']),
  GBP: points('£', ['1,500', '3,000', '4,000', '6,000', '8,000', '12,000']),
  TZS: points('TSh ', ['5M', '9M', '13M', '19M', '26M', '39M']),
};
function points(symbol: string, steps: string[]) {
  return [
    { label: `Under ${symbol}${steps[0]}`, value: `under ${symbol}${steps[0]}` },
    ...steps.slice(0, -1).map((s) => ({ label: `${symbol}${s}`, value: `around ${symbol}${s}` })),
    { label: `${symbol}${steps.at(-1)}+`, value: `${symbol}${steps.at(-1)} or more` },
  ];
}

// Phone country codes. Tanzania first (the default), then common home countries of our travellers.
export const dialCodes = [
  { iso: 'TZ', name: 'Tanzania', code: '+255' },
  { iso: 'KE', name: 'Kenya', code: '+254' },
  { iso: 'UG', name: 'Uganda', code: '+256' },
  { iso: 'RW', name: 'Rwanda', code: '+250' },
  { iso: 'US', name: 'United States', code: '+1' },
  { iso: 'CA', name: 'Canada', code: '+1' },
  { iso: 'GB', name: 'United Kingdom', code: '+44' },
  { iso: 'IE', name: 'Ireland', code: '+353' },
  { iso: 'DE', name: 'Germany', code: '+49' },
  { iso: 'FR', name: 'France', code: '+33' },
  { iso: 'NL', name: 'Netherlands', code: '+31' },
  { iso: 'BE', name: 'Belgium', code: '+32' },
  { iso: 'CH', name: 'Switzerland', code: '+41' },
  { iso: 'AT', name: 'Austria', code: '+43' },
  { iso: 'IT', name: 'Italy', code: '+39' },
  { iso: 'ES', name: 'Spain', code: '+34' },
  { iso: 'PT', name: 'Portugal', code: '+351' },
  { iso: 'SE', name: 'Sweden', code: '+46' },
  { iso: 'NO', name: 'Norway', code: '+47' },
  { iso: 'DK', name: 'Denmark', code: '+45' },
  { iso: 'FI', name: 'Finland', code: '+358' },
  { iso: 'PL', name: 'Poland', code: '+48' },
  { iso: 'AU', name: 'Australia', code: '+61' },
  { iso: 'NZ', name: 'New Zealand', code: '+64' },
  { iso: 'ZA', name: 'South Africa', code: '+27' },
  { iso: 'AE', name: 'United Arab Emirates', code: '+971' },
  { iso: 'IL', name: 'Israel', code: '+972' },
  { iso: 'IN', name: 'India', code: '+91' },
  { iso: 'CN', name: 'China', code: '+86' },
  { iso: 'JP', name: 'Japan', code: '+81' },
  { iso: 'SG', name: 'Singapore', code: '+65' },
  { iso: 'BR', name: 'Brazil', code: '+55' },
  { iso: 'MX', name: 'Mexico', code: '+52' },
];

/** Flag emoji from a two-letter country code. */
export const flag = (iso: string) => String.fromCodePoint(...[...iso].map((c) => 0x1f1a5 + c.charCodeAt(0)));

/** "A", "A and B", "A, B and C". */
export const joinNames = (names: string[]) =>
  names.length < 2 ? (names[0] ?? '') : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`;

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const monthShort = monthNames.map((m) => m.slice(0, 3));

/** "June, July 2027; January 2028" from ['2027-06', '2027-07', '2028-01']. */
export function monthsSummary(months: string[]) {
  const byYear = new Map<string, string[]>();
  for (const m of [...months].sort()) {
    const [y, mm] = m.split('-');
    byYear.set(y, [...(byYear.get(y) ?? []), monthNames[Number(mm) - 1]]);
  }
  return [...byYear].map(([y, ms]) => `${ms.join(', ')} ${y}`).join('; ');
}

/** Whether a step's answers are complete enough to move on. */
export function stepValid(id: StepId, a: Answers): boolean {
  switch (id) {
    case 'where':
      return a.destinations.length > 0;
    case 'when':
      return a.flexible || a.months.length > 0;
    case 'who':
      return a.who !== '';
    case 'interests':
      return a.interests.length > 0;
    case 'budget':
      return a.budget !== null;
    case 'contact':
      return Object.keys(contactErrors(a)).length === 0;
  }
}

export function contactErrors(a: Answers) {
  const e: Partial<Record<'firstName' | 'lastName' | 'email' | 'phone' | 'consent', string>> = {};
  if (!a.firstName.trim()) e.firstName = 'Please add your first name.';
  if (!a.lastName.trim()) e.lastName = 'Please add your last name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email.trim())) e.email = 'Please add a valid email address.';
  if (a.phone.trim() && !/^[\d\s()-]{5,20}$/.test(a.phone.trim())) e.phone = 'Please use digits only, without the country code.';
  if (!a.consent) e.consent = 'Please confirm we may contact you about your trip.';
  return e;
}
