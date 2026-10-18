import type { StripItem } from '@/components/shared/CampaignBanner';

export const ACAD_CHALLENGES = [
  { art: 'rings', seed: 3, title: 'Accreditation pressure', text: 'Meeting rigorous GCC school requirements every day, and proving it with evidence.', link: 'How Link helps', href: '#link' },
  { art: 'waves', seed: 5, title: 'Teacher overload', text: 'High administrative demands leave less time for teaching and student care.', link: 'See Potentia Campus', href: '/business#campus' },
  { art: 'dots', seed: 8, title: 'Learning gaps', text: 'Student obstacles, including neurodevelopmental needs, are often spotted too late.', link: 'How Pulse helps', href: '#pulse' },
  { art: 'bridge', seed: 9, title: 'Lack of alignment', text: 'Parents and schools struggle to stay on the same page about each child.', link: 'How Link helps', href: '#link' },
];

export const PULSE_STEPS = [
  { title: 'Early identification', text: 'Spotting learning gaps before they become obstacles.' },
  { title: 'Structured intervention', text: "Tailored remedial support plans for each student's needs." },
  { title: 'Ongoing monitoring', text: 'Progress tracking so no student is left behind.' },
  { title: 'Aligned to GCC school requirements', text: 'The evidence of support schools need for accreditation.' },
];

export const VIBE_STEPS = [
  { title: 'Assessment and discovery', text: 'Psychometric evaluation of interest, aptitude, personality, orientation and emotional strength.' },
  { title: 'Virtual career simulation', text: 'Hands-on simulations of 46+ careers, so students test a path before committing to it.' },
  { title: 'Counselling and planning', text: 'One-to-one sessions with students and parents to build an Individual Career Plan.' },
  { title: 'Academic roadmapping', text: 'Aligning subject choices with future goals.' },
];

export const ADMISSIONS_STEPS = [
  { title: 'University shortlisting', text: "Matching universities and courses to the student's profile, goals and budget." },
  { title: 'Applications', text: 'Forms, documents and deadlines managed end to end.' },
  { title: 'Personal statements and interviews', text: 'Coaching so each student presents their strongest case.' },
  { title: 'Offers and enrolment', text: 'Support through offers, acceptance and enrolment.' },
];

export const ADMISSION_COUNTRIES = ['UK', 'USA', 'Canada', 'Germany', 'Australia', 'UAE', 'France', 'Ireland'];

/** Strip under the Education & Wellbeing banner. */
export const EDU_STRIP: StripItem[] = [
  { key: 'pulse', name: 'Pulse', kicker: 'Potentia', text: 'Remedial-style academic support for Grades 1 to 8.', href: '#pulse' },
  { key: 'vibe', name: 'Vibe', kicker: 'Potentia', text: 'Career guidance with virtual career simulations.', href: '#vibe' },
  { key: 'link', name: 'Link', kicker: 'Potentia', text: 'Parent coaching and professional development.', href: '#link' },
  { key: 'admissions', name: 'University Admissions', kicker: 'Expert', text: 'Admissions consultation across eight countries.', href: '#admissions' },
];

export const LINK_EDUCATORS = [
  ['Behavioural intelligence:', 'telling typical development apart from behaviour that needs intervention.'],
  ['Classroom strategies', 'for academic challenges and learning gaps.'],
  ['Streamlined referrals', 'to the counsellor or SEND team.'],
  ['Professional growth', 'for teachers, counsellors, SEND staff and school leaders.'],
];
export const LINK_PARENTS = [
  ['Parent coaching,', 'one-to-one and in groups, for learning, behaviour and wellbeing at home.'],
  ['Structured partnership', 'with the school, built on transparency and collaboration.'],
  ['Measurable progress,', 'from anecdotal notes to structured tracking.'],
];

export const ACAD_CONSULTANCY = [
  { title: 'Accreditation and inspection readiness', text: 'Reviewing policies, evidence and processes so schools are ready for accreditation.' },
  { title: 'Inclusion and SEND setup', text: 'Designing identification, referral and support pathways for students with diverse learning needs.' },
  { title: 'Counselling and wellbeing programmes', text: 'Setting up school counselling, wellbeing and behaviour support frameworks.' },
  { title: 'Career guidance programmes', text: 'Building a career guidance and university admissions programme inside the school.' },
  { title: 'Teacher and parent workshops', text: 'Practical workshops on behaviour, learning gaps and home–school partnership.' },
  { title: 'Individual consultations', text: 'One-to-one sessions for parents and students on learning, behaviour, careers and admissions.' },
];

export const ACAD_WHY = [
  { title: 'Local expertise', text: "Deeply familiar with GCC ministries of education and school requirements." },
  { title: 'Psychology-led', text: 'Programmes designed by a clinical psychologist, grounded in real practice.' },
  { title: 'Tech-first', text: 'Streamlined digital workflows replace manual paperwork.' },
  { title: 'Holistic', text: 'Software and specialised consultancy from one partner.' },
];

export interface Testimonial { quote: string; name: string; role: string; initials: string }

/** Word for word from www.my-potentia.com. The last quote had no attribution, so it is shown as "Client". */
export const TESTIMONIALS: Testimonial[] = [
  { quote: "Potentia didn't just help me choose a career path; they gave me the confidence and the digital toolkit to excel in it. It's not just consultancy; it's a blueprint for life.", name: 'Sarah Jenkins', role: 'Graduate', initials: 'SJ' },
  { quote: 'The guidance my son received was transformative. He went from being confused about his future to having a clear, actionable plan that matches his true potential.', name: 'Ahmed Al-Sayed', role: 'Parent', initials: 'AS' },
  { quote: 'Partnering with Potentia for our digital transformation was the best decision. Their software solutions are seamless, intuitive, and tailored for educational excellence.', name: 'School Principal', role: 'School leadership', initials: 'SP' },
  { quote: 'Your approach was patient, understanding, and highly professional. We noticed a significant improvement in his behaviour, mindset, and overall attitude towards school.', name: 'Grateful Parent', role: 'Student Counseling', initials: 'GP' },
  { quote: 'The assessment activities gave us a clearer picture of his strengths. The session helped reduce confusion regarding career choices and gave direction for future planning.', name: 'Parent', role: 'Career Guidance', initials: 'P' },
  { quote: "Due to 10 months of counseling, my daughter's health and family life were saved. We are eternally grateful for your efforts that prevented our family from falling apart.", name: 'Faiyazuddin Ahmed', role: 'Father of Patient', initials: 'FA' },
  { quote: 'Sajeda is a compassionate and insightful clinical psychologist. Her guidance was supportive, practical, and truly helped me gain clarity and comfort.', name: 'Client', role: 'Potentia client', initials: 'C' },
];
