/** Global company details and navigation. Order of SECTIONS drives every menu. */
export const COMPANY = {
  name: 'Potentia Software & Consultancy Services W.L.L.',
  short: 'Potentia',
  tagline: 'Tech-driven growth for every generation.',
  strapline: 'Bridging potential and excellence.',
  address: 'C009, Tejwaans Business Center, 3rd Floor, Al Badiya Building, Grand Hamad Street, Doha, Qatar',
  email: 'info@my-potentia.com',
  phone: '+974 3300 1239',
  web: 'www.my-potentia.com',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Badiya+Building+Grand+Hamad+Street+Doha+Qatar',
};

export type SectionId = 'banking' | 'business' | 'education';

export interface SectionDef {
  id: SectionId;
  /** Illustration for landing, dialog and About cards. */
  image: { card: string; wide: string; alt: string };
  /** Product names shown as chips on the landing card. */
  items: string[];
  name: string;
  full: string;
  card: string;
  desc: string;
  button: string;
  art: string;
  cta: { label: string; anchor: string };
  menu: { label: string; anchor: string }[];
}

export const SECTIONS: SectionDef[] = [
  {
    id: 'banking',
    image: { card: '/images/verticals/banking.jpg', wide: '/images/verticals/banking-wide.jpg', alt: 'Secure vault, payment card and connected blocks representing core banking and payments' },
    items: ['Payment Rail', 'Omni Flow', 'Smart Recon', 'Card Management', 'Card Switch'],
    name: 'Banking & Fintech',
    full: 'Banking & Fintech',
    card: 'Banking & Fintech',
    desc: 'Payments, reconciliation and card platforms for banks and financial institutions.',
    button: 'Explore banking',
    art: 'flow',
    cta: { label: 'Book a demo', anchor: 'book' },
    menu: [
      { label: 'Why Potentia', anchor: 'why' },
      { label: 'Challenges', anchor: 'challenges' },
      { label: 'Solutions', anchor: 'solutions' },
      { label: 'Markets', anchor: 'markets' },
      { label: 'Services', anchor: 'services' },
      { label: 'Consultancy', anchor: 'bank-consult' },
      { label: 'Book a demo', anchor: 'book' },
    ],
  },
  {
    id: 'business',
    image: { card: '/images/verticals/business.jpg', wide: '/images/verticals/business-wide.jpg', alt: 'Automation engine linking invoices to warehouse stock' },
    items: ['Campus', 'Spark', 'Hive', 'IT Consultancy'],
    name: 'Business Automation',
    full: 'Business Automation',
    card: 'Business Automation',
    desc: 'Potentia Campus, Spark and Hive: school management, billing and inventory software.',
    button: 'Explore software',
    art: 'blocks',
    cta: { label: 'Request a demo', anchor: 'demo' },
    menu: [
      { label: 'Products', anchor: 'products' },
      { label: 'Campus', anchor: 'campus' },
      { label: 'Spark', anchor: 'spark' },
      { label: 'Hive', anchor: 'hive' },
      { label: 'Consultancy', anchor: 'biz-consult' },
      { label: 'Request a demo', anchor: 'demo' },
    ],
  },
  {
    id: 'education',
    image: { card: '/images/verticals/education.jpg', wide: '/images/verticals/education-wide.jpg', alt: 'Learning, career pathway and connected community of parents and teachers' },
    items: ['Pulse', 'Vibe', 'Link', 'University Admissions'],
    name: 'Education & Wellbeing',
    full: 'Education & Wellbeing',
    card: 'Education & Wellbeing',
    desc: 'Pulse, Vibe, Link and university admissions: support for students, parents and teachers.',
    button: 'Explore programmes',
    art: 'rise',
    cta: { label: 'Enquire now', anchor: 'enquire' },
    menu: [
      { label: 'Pulse', anchor: 'pulse' },
      { label: 'Vibe', anchor: 'vibe' },
      { label: 'Link', anchor: 'link' },
      { label: 'Admissions', anchor: 'admissions' },
      { label: 'Universities', anchor: 'universities' },
      { label: 'Consultancy', anchor: 'acad-consult' },
      { label: 'Why Potentia', anchor: 'acad-why' },
      { label: 'Enquire', anchor: 'enquire' },
    ],
  },
];

export const sectionById = (id: string) => SECTIONS.find((s) => s.id === id);

export const VALUES = ['Innovation', 'Ethics', 'Excellence', 'Empathy', 'Collaboration'];
