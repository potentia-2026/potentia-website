import { COMPANY } from '@/content/site';
import { CopyValue } from '@/components/layout/CopyValue';
import { EnquiryForm, type Field } from './EnquiryForm';
import type { SectionKey } from '@/lib/api';

interface Props {
  id: string;
  label: string;
  title: string;
  lead: string;
  note?: string;
  section: SectionKey;
  fields: Field[];
  submitLabel: string;
  confirmation: string;
}

export function FormSection({ id, label, title, lead, note, section, fields, submitLabel, confirmation }: Props) {
  return (
    <section id={id} className="section section-tint">
      <div className="container grid gap-[clamp(28px,5vw,72px)] lg:grid-cols-[.85fr_1.15fr]">
        <div className="flex min-w-0 flex-col gap-4">
          <span className="label">{label}</span>
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
          {note && <p className="text-[0.9rem] text-muted">{note}</p>}
          <dl className="mt-3 space-y-4">
            <CopyValue label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
            <CopyValue label="Phone" value={COMPANY.phone} href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} />
          </dl>
        </div>
        <div className="min-w-0">
          <EnquiryForm section={section} fields={fields} submitLabel={submitLabel} confirmation={confirmation} />
        </div>
      </div>
    </section>
  );
}
