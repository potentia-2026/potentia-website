export const FOUNDER = {
  name: 'Mrs. Sajeda Ansari',
  role: 'Founder · Psychologist, Psychotherapist & ICF Credentialed Coach',
  photo: '/images/team/sajeda-ansari.jpg',
  years: '12+',
  bio: 'With a passion for empowering individuals and organizations, Sajeda established Potentia to bridge the gap between educational excellence and digital innovation. Drawing on over 12 years of international experience in psychological assessment, psychotherapy, life coaching, and educational consultancy, she leads Potentia with a vision to transform lives and institutions across Qatar and beyond.',
  credentials: [
    'Graduate Member, British Psychological Society (GMBPsS)',
    'International Affiliate, American Psychological Association',
    'Credentialed Coach, International Coaching Federation (ICF)',
    'Lifetime Member, Association of Allied Healthcare Professionals (India)',
    'Permanent Life Member, United Psychologist Association',
  ],
  quote: 'At Potentia, we believe every individual and organization has the potential to achieve greatness. My mission is to unlock that potential through expert guidance, coaching, and technology—helping you thrive in a rapidly changing world.',
};

export type TeamIcon = 'bank' | 'code' | 'screen' | 'cap';

/** Leadership roles shown without names. Confirm titles and experience match the real team. */
export const TEAM: { role: string; area: string; years: string; text: string; tags: string[]; icon: TeamIcon; gradient: string }[] = [
  { role: 'Technology Lead', area: 'Banking & Payments', years: '17+ years', text: 'Core banking, payment schemes, SWIFT and ISO 20022 architecture across GCC banks.', tags: ['Payment Rail', 'ISO 20022', 'Core banking'], icon: 'bank', gradient: 'linear-gradient(135deg,#5D2E8E,#9D4496)' },
  { role: 'Lead Solution Architect', area: 'Integration & Digital Channels', years: '12 years', text: 'Enterprise integration, APIs and digital onboarding for banks and corporates.', tags: ['APIs', 'Omni Flow', 'Cloud'], icon: 'code', gradient: 'linear-gradient(135deg,#6A2FA8,#A35BD6)' },
  { role: 'Business Software Lead', area: 'Campus · Spark · Hive', years: '10+ years', text: 'Product delivery of school, billing and inventory platforms for GCC organisations.', tags: ['ERP', 'SaaS', 'Implementation'], icon: 'screen', gradient: 'linear-gradient(135deg,#9D4496,#D2569C)' },
  { role: 'Senior Education & Career Consultant', area: 'Pulse · Vibe · Admissions', years: '10+ years', text: 'Learning support, career guidance and university admissions for GCC schools and families.', tags: ['Career guidance', 'SEND', 'Admissions'], icon: 'cap', gradient: 'linear-gradient(135deg,#6E3FA3,#C792C8)' },
];
