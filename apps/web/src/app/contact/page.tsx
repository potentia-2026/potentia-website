import type { Metadata } from 'next';
import { Hero } from '@/components/ui/Hero';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { CopyValue } from '@/components/layout/CopyValue';
import { CONTACT_FORM } from '@/content/forms';
import { COMPANY } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact Potentia',
  description: 'Tell us what you need and the right team will get back to you.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <Hero label="Contact" title="Let's talk" lead="Tell us what you need and the right team will get back to you." art="orbit" seed={99} />
      <section className="section">
        <div className="container grid gap-[clamp(28px,5vw,72px)] lg:grid-cols-[.85fr_1.15fr]">
          <div className="flex min-w-0 flex-col gap-6">
            <dl className="space-y-4">
              <div className="flex flex-col gap-0.5"><dt className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">Office</dt><dd>{COMPANY.address}</dd></div>
              <CopyValue label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
              <CopyValue label="Phone" value={COMPANY.phone} href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} />
            </dl>
            <div className="border border-line">
              {/* Replace with a Google Maps embed (iframe) for the production site if preferred. */}
              <svg viewBox="0 0 400 170" role="img" aria-label="Office location on Grand Hamad Street, Doha" className="block h-auto w-full">
                <rect width="400" height="170" fill="#F8F3F9" />
                <path d="M0 120 C80 100 140 140 220 110 S360 70 400 90" stroke="#E8DAEA" strokeWidth="14" fill="none" />
                <path d="M150 0 L190 170" stroke="#E8DAEA" strokeWidth="10" /><path d="M0 40 L400 60" stroke="#E8DAEA" strokeWidth="6" />
                <text x="20" y="150" fill="#5C4C66" fontFamily="monospace" fontSize="10">Grand Hamad Street</text>
                <circle cx="182" cy="96" r="22" fill="#9D4496" opacity=".18" />
                <path d="M182 72c-9 0-15 7-15 15 0 11 15 24 15 24s15-13 15-24c0-8-6-15-15-15z" fill="#9D4496" /><circle cx="182" cy="87" r="5" fill="#fff" />
              </svg>
              <div className="flex flex-wrap items-center justify-between gap-3 px-[18px] py-4"><span className="text-[0.9rem]">Al Badiya Building, 3rd Floor</span><a href={COMPANY.mapUrl} target="_blank" rel="noopener noreferrer" className="tlink">Open in Google Maps</a></div>
            </div>
          </div>
          <div className="min-w-0">
            <EnquiryForm section="General enquiry" fields={CONTACT_FORM} submitLabel="Send message" confirmation="Thank you. The right team will get back to you shortly." />
          </div>
        </div>
      </section>
    </>
  );
}
