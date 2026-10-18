import type { Field } from '@/components/forms/EnquiryForm';
import { PRODUCTS } from './banking';

export const BANKING_FORM: Field[] = [
  { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
  { name: 'jobTitle', label: 'Job title', autoComplete: 'organization-title' },
  { name: 'organisation', label: 'Institution', required: true, autoComplete: 'organization' },
  { name: 'institutionType', label: 'Institution type', type: 'select', options: ['Bank', 'PSP', 'Exchange house', 'Central bank', 'Other'] },
  { name: 'country', label: 'Country', autoComplete: 'country-name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', full: true, autoComplete: 'tel' },
  { name: 'interests', label: 'Products or services of interest', type: 'checks', options: [...PRODUCTS.map((p) => p.name), 'Consultancy'], full: true },
  { name: 'message', label: 'Message', type: 'textarea', full: true },
];

export const BUSINESS_FORM: Field[] = [
  { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
  { name: 'organisation', label: 'Organisation', required: true, autoComplete: 'organization' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'interest', label: 'Product or service', type: 'select', options: ['Potentia Campus (school management)', 'Potentia Spark (billing)', 'Potentia Hive (inventory)', 'Consultancy'] },
  { name: 'users', label: 'Number of users or students' },
  { name: 'message', label: 'Message', type: 'textarea', full: true },
];

export const ACADEMICS_FORM: Field[] = [
  { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
  { name: 'role', label: 'Role', type: 'select', options: ['School leader', 'Teacher', 'Parent', 'Student'], required: true },
  { name: 'organisation', label: 'School or organisation', full: true, autoComplete: 'organization' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'interest', label: 'Programme of interest', type: 'select', options: ['Potentia Pulse', 'Potentia Vibe', 'Potentia Link', 'University admissions', 'Educational consultancy', 'Not sure'], full: true },
  { name: 'message', label: 'Message', type: 'textarea', full: true },
];

export const CONTACT_FORM: Field[] = [
  { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
  { name: 'organisation', label: 'Organisation', autoComplete: 'organization' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'interest', label: 'Area of interest', type: 'select', options: ['Banking & Fintech', 'Business Automation', 'Education & Wellbeing', 'Other'], full: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true, full: true },
];
