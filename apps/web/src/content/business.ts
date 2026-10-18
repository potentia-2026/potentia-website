import type { ProductKey } from '@/components/shared/ProductMark';

export interface BizProduct {
  key: Exclude<ProductKey, 'consult'>;
  name: string;
  kind: string;
  headline: string;
  text: string;
  points: string[];
  formValue: string;
  slideImg: string;
  slideAlt: string;
  detailImg: string;
  strip: string;
}

/** Potentia Campus, Spark and Hive — used by the banner strip, the slider and the detail rows. */
export const BIZ_PRODUCTS: BizProduct[] = [
  {
    key: 'campus', name: 'Campus', kind: 'Integrated School Management Software',
    headline: 'Your whole school, on one platform',
    text: 'Academics, operations, finance and parent engagement in one place, on web and mobile, with the evidence GCC school requirements ask for.',
    points: ['Report cards, attendance and records', 'Fees and accounting built in', 'Parent app with real-time updates'],
    formValue: 'Potentia Campus (school management)',
    slideImg: '/images/business/slide-campus.jpg', slideAlt: 'Students, teachers and administrators using Potentia Campus in a GCC school',
    detailImg: '/images/business/campus.jpg', strip: 'Integrated school management for web and mobile.',
  },
  {
    key: 'spark', name: 'Spark', kind: 'Billing and invoicing',
    headline: 'Invoice in seconds, get paid faster',
    text: 'Quotations, invoices, payments and reminders in one place, for SMEs, traders, retailers and service companies across the GCC.',
    points: ['Recurring and one-off invoices', 'Card, transfer and cash receipts', 'Automatic overdue reminders'],
    formValue: 'Potentia Spark (billing)',
    slideImg: '/images/business/slide-spark.jpg', slideAlt: 'Staff using Potentia Spark at a service counter with invoices and card payments',
    detailImg: '/images/business/spark.jpg', strip: 'Billing and invoicing that gets you paid faster.',
  },
  {
    key: 'hive', name: 'Hive', kind: 'Inventory management',
    headline: 'Every item, every shelf, every store',
    text: 'Real-time stock across shops and warehouses, with barcodes, reorder alerts and purchase orders built in.',
    points: ['Barcode scanning on any device', 'Low-stock alerts and reorder levels', 'Transfers between locations'],
    formValue: 'Potentia Hive (inventory)',
    slideImg: '/images/business/slide-hive.jpg', slideAlt: 'Warehouse team scanning stock with Potentia Hive on a tablet',
    detailImg: '/images/business/hive.jpg', strip: 'Real-time stock across stores and warehouses.',
  },
];

export const CAMPUS_FEATURES = [
  { title: 'Central management', text: 'One dashboard for the entire institution, with full visibility and control.' },
  { title: 'Admin and grades', text: 'Automated report cards and student records.' },
  { title: 'Attendance and library', text: 'Digital tracking from daily attendance to library inventory.' },
  { title: 'Finance', text: 'Integrated fee management and accounting.' },
  { title: 'Programmes built in', text: 'Connects with Potentia Pulse, Vibe and Link for wellbeing and progress tracking.' },
  { title: 'Compliance reporting', text: 'One view of academics, wellbeing and parent engagement, with the reports leaders need as evidence.' },
];

/** Proposed defaults from the content brief — confirm against the actual products before launch. */
export const SPARK_FEATURES = ['Customer and product records', 'Quotations and invoices, one-off and recurring', 'Payment collection and receipts', 'Overdue reminders', 'Tax-ready invoice formats', 'Sales, receivables and collections reports', 'Connects with Potentia Hive'];
export const HIVE_FEATURES = ['Item catalogue with barcodes', 'Stock in, out and transfers', 'Low-stock alerts and reorder levels', 'Purchase orders and suppliers', 'Valuation and movement reports', 'Connects with Potentia Spark'];

export const BIZ_CONSULTANCY = [
  { title: 'Digital transformation advisory', text: 'Mapping your current processes and planning the move from paper and spreadsheets to digital workflows.' },
  { title: 'Software selection and implementation', text: 'Choosing, configuring and rolling out the right systems for your organisation.' },
  { title: 'Process automation and integration', text: 'Connecting your systems and automating repetitive work.' },
  { title: 'Data migration', text: 'Moving your records safely from old systems or spreadsheets.' },
  { title: 'IT support and optimisation', text: 'Ongoing support, monitoring and performance tuning.' },
  { title: 'Change and people development', text: 'Organisational development coaching so new systems are actually adopted.' },
];

export const BIZ_WHY = [
  { title: 'Bank-grade security', text: 'Built by the team behind mission-critical banking systems.' },
  { title: 'Web and mobile', text: 'Use it anywhere, on any device.' },
  { title: 'One partner', text: 'Implementation, training and support from the same team.' },
  { title: 'Grows with you', text: 'Start with one product and add others as you need them.' },
];
