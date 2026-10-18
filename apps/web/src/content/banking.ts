export interface Product { name: string; brand: string; desc: string; tags: string[] }

export const PRODUCTS: Product[] = [
  { name: 'Payments', brand: 'Potentia Payment Rail', desc: 'Send and receive domestic and cross-border payments in any market, on ISO 20022, from one hub.', tags: ['ACH', 'RTGS', 'SWIFT CBPR+', 'Universal Message Converter (MT ⇄ MX)', 'WPS'] },
  { name: 'Omni Solutions', brand: 'Potentia Omni Flow', desc: 'One layer behind mobile, internet, branch and corporate channels, from onboarding to payments.', tags: ['Retail onboarding', 'Corporate onboarding', 'AML/CFT rules in the workflow', 'APIs and SDK', 'Instant payments', 'e-cheque', 'Corporate H2H', 'Payment gateways'] },
  { name: 'Reconciliation', brand: 'Potentia Smart Recon', desc: 'Match settlements, statements and ledger entries automatically, and see only the breaks.', tags: ['ATM recon', 'POS recon', 'Network schemes recon', 'Switch recon', 'Nostro recon', 'Auto-matching', 'Break management', 'No-code rule design'] },
  { name: 'Card Management System', brand: 'Potentia CMS', desc: 'Issue and manage debit, prepaid and credit cards across their whole life.', tags: ['Card products', 'Issuance and PIN', 'Tokenisation', 'Lifecycle'] },
  { name: 'Card Switch', brand: 'Potentia Card Switch', desc: 'Authorise and route ATM, POS and e-commerce transactions in real time.', tags: ['Authorisation', 'Scheme routing', 'ATM and POS', 'Settlement'] },
];

export interface Market { code: string; name: string; line: string; rails: string[]; kind: 'gcc' | 'expansion' | 'beyond' }

export const MARKETS: Market[] = [
  { code: 'QA', name: 'Qatar', line: 'Home market, connected to the national rails and AFAQ.', rails: ['QA-RTGS', 'ACH', 'FAWRAN', 'WPS'], kind: 'gcc' },
  { code: 'SA', name: 'Saudi Arabia', line: "Built for the GCC's largest payments market.", rails: ['SARIE', 'sarie instant', 'ACH', 'WPS'], kind: 'gcc' },
  { code: 'AE', name: 'UAE', line: "Ready for the region's widest set of central bank systems.", rails: ['UAEFTS', 'Aani', 'UAEWPS', 'UAEDDS'], kind: 'gcc' },
  { code: 'KW', name: 'Kuwait', line: 'Ready for the new Kuwait National Payments System.', rails: ['KACH', 'KASSIP', 'WAMD', 'WPS'], kind: 'gcc' },
  { code: 'BH', name: 'Bahrain', line: "Connected to Bahrain's real-time transfer systems.", rails: ['RTGS', 'Fawri', 'Fawri+', 'WPS'], kind: 'gcc' },
  { code: 'OM', name: 'Oman', line: 'Supporting 24x7 RTGS and ACH payments.', rails: ['RTGS', 'ACH', 'MPCSS', 'WPS'], kind: 'gcc' },
  { code: 'AF', name: 'Africa', line: 'Extending to national ISO 20022 payment systems.', rails: ['RTGS', 'ACH', 'Instant', 'Cards'], kind: 'expansion' },
  { code: '+', name: 'Beyond', line: 'One core, new markets added through scheme adapters.', rails: ['ISO 20022', 'SWIFT CBPR+', 'Cards'], kind: 'beyond' },
];

export const WHY_TILES = [
  { img: '/images/why/secure-core.jpg', alt: 'Five products on one secure core: Payment Hub, Omni-Channel Solutions, Smart Recon and Card Management around a secure core', tag: 'One platform', title: '5 products on one secure core', text: 'Unified, secure and built for modern financial systems. Start with one product and add the rest when you need them.', link: 'Discover the core platform', href: '#solutions' },
  { img: '/images/why/iso20022.jpg', alt: 'Bankers reviewing ISO 20022 native, fully compliant payment flows on a touch table', tag: 'Standards', title: '100% ISO 20022 native messaging', text: "Future-ready transactions with fully compliant, standardised data, validated against each scheme's rules.", link: 'Learn more', href: '#solutions' },
  { img: '/images/why/gcc-markets.jpg', alt: 'Team reviewing a live map of connected GCC payment markets', tag: 'Reach', title: '6 GCC markets connected', text: 'Seamlessly connecting financial systems across the Gulf, with scheme adapters for Africa and beyond.', link: 'Explore our reach', href: '#markets' },
  { img: '/images/why/monitoring.jpg', alt: 'Operations team monitoring an enterprise dashboard with system health and incident status', tag: 'Operations', title: '24/7 monitoring and incident reporting', text: 'Vigilant oversight and rapid incident resolution to safeguard your banking ecosystem.', link: 'Explore our services', href: '#services' },
];

export const WHY_STATEMENTS = [
  { title: 'Domain-focused expertise', text: 'Deep understanding of payment systems, central bank networks and core banking.' },
  { title: 'End-to-end capabilities', text: 'From strategic advice and integration to optimisation and ongoing support.' },
  { title: 'Reliability and compliance', text: 'Aligned with regulatory standards, enterprise security and high availability.' },
  { title: 'Scalable and future-ready', text: 'Architectures that grow with transaction volumes and digital transformation.' },
];

export const CHALLENGES = [
  { img: '/images/challenges/iso-migration.jpg', alt: 'Bankers validating ISO 20022 payment messages on a touch table', tag: 'Messaging', title: 'ISO 20022 migration', text: 'Moving from MT and proprietary formats to ISO 20022 / CBPR+ without disrupting live payments.', href: '#solutions', product: 0 },
  { img: '/images/challenges/payment-schemes.jpg', alt: 'Payments specialist working on a scheme connectivity dashboard', tag: 'Schemes', title: 'New payment schemes', text: 'Connecting quickly and securely to national RTGS, ACH, wage protection and GCC networks.', href: '#markets' },
  { img: '/images/challenges/onboarding.jpg', alt: 'Digital onboarding screens for retail and corporate customers on phone, tablet and laptop', tag: 'Onboarding', title: 'Slow onboarding', text: 'Opening retail and corporate accounts in minutes while meeting AML/CFT rules.', href: '#solutions', product: 1 },
  { img: '/images/challenges/reconciliation.jpg', alt: 'Card terminal, receipt printer and tablet showing payments to reconcile', tag: 'Reconciliation', title: 'Manual reconciliation', text: 'Matching ATM, POS, switch and scheme activity without spreadsheets.', href: '#solutions', product: 2 },
  { img: '/images/challenges/legacy-core.jpg', alt: 'Banker working with a secure core platform that connects to existing systems', tag: 'Core banking', title: 'Legacy core systems', text: 'Adding digital channels and automation around an existing core banking system.', href: '#services' },
  { img: '/images/challenges/operations.jpg', alt: 'Operations analyst monitoring payment systems on multiple screens', tag: 'Operations', title: '24/7 operations', text: 'Keeping mission-critical payment systems available, monitored and supported.', href: '#services' },
];

export const SECURITY = [
  { icon: 'doc', title: 'ISO 20022 native', text: 'Validated against scheme rules.' },
  { icon: 'eyes', title: 'Maker-checker', text: 'Four-eyes control on payments and configuration.' },
  { icon: 'lock', title: 'Encryption', text: 'In transit and at rest, keys in HSMs.' },
  { icon: 'sign', title: 'Digital signatures', text: 'Integrity and non-repudiation.' },
  { icon: 'list', title: 'Full audit trail', text: 'Every action traceable.' },
  { icon: 'pulse', title: 'High availability', text: 'Continuous, mission-critical operation.' },
] as const;

export const SERVICE_STEPS = [
  { title: 'Advise', text: 'Strategy, architecture, ISO 20022 roadmap.' },
  { title: 'Design', text: 'Target architecture, compliance alignment.' },
  { title: 'Implement', text: 'Build, integrate and test with your teams.' },
  { title: 'Optimise', text: 'Performance and throughput.' },
  { title: 'Support', text: '24/7 monitoring and incident response.' },
];

export const SERVICE_CARDS = [
  { art: 'mesh', seed: 61, title: 'Banking consultancy and systems integration', text: 'Bridging legacy core banking with modern digital systems; ISO 20022 migration, compliance alignment and technical audits.' },
  { art: 'blocks', seed: 62, title: 'System integration and optimisation', text: 'Unifying legacy systems, modern applications and hardware; tuning databases and applications to remove bottlenecks.' },
  { art: 'rings', seed: 63, title: 'IT support and maintenance', text: 'Round-the-clock remote and on-site support with proactive health monitoring.' },
];

export const BANK_CONSULTANCY = [
  { title: 'ISO 20022 and CBPR+ migration', text: 'Roadmaps, message mapping and testing for a safe move from MT and proprietary formats.' },
  { title: 'Payment architecture advisory', text: 'Target architecture for payments, channels and core banking integration.' },
  { title: 'Scheme and regulatory readiness', text: 'Preparing for new national payment schemes, certification and regulatory change.' },
  { title: 'Technical audits', text: 'Reviews of payment platforms for security, resilience and compliance.' },
  { title: 'Performance optimisation', text: 'Tuning databases, applications and throughput for peak volumes.' },
  { title: 'Change and people development', text: 'Organisational development coaching so teams adopt new systems and processes.' },
];
