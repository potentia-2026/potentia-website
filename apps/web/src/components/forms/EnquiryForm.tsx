'use client';

import { useEffect, useId, useState } from 'react';
import { sendEnquiry, type EnquiryPayload, type SectionKey } from '@/lib/api';
import { PREFILL_EVENT, type PrefillDetail } from '@/lib/events';
import { trackLead } from '@/components/analytics/MetaPixel';

export type Field =
  | { name: keyof EnquiryPayload; label: string; type?: 'text' | 'email' | 'tel'; required?: boolean; full?: boolean; autoComplete?: string }
  | { name: keyof EnquiryPayload; label: string; type: 'select'; options: string[]; required?: boolean; full?: boolean }
  | { name: keyof EnquiryPayload; label: string; type: 'textarea'; required?: boolean; full?: boolean }
  | { name: 'interests'; label: string; type: 'checks'; options: string[]; full?: boolean };

interface Props {
  section: SectionKey;
  fields: Field[];
  submitLabel: string;
  confirmation: string;
}

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

/** One form component for all four forms; each posts to the NestJS API. */
export function EnquiryForm({ section, fields, submitLabel, confirmation }: Props) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [values, setValues] = useState<Record<string, string>>({});
  const [checks, setChecks] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const d = (e as CustomEvent<PrefillDetail>).detail;
      if (d.country) setValues((v) => ({ ...v, country: d.country! }));
      if (d.interest) {
        const hasChecks = fields.some((f) => f.type === 'checks');
        if (hasChecks) setChecks((c) => (c.includes(d.interest!) ? c : [...c, d.interest!]));
        else setValues((v) => ({ ...v, interest: d.interest! }));
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, [fields]);

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => { const n = { ...e }; delete n[name]; return n; });
  };

  /** Friendly, on-brand messages instead of the browser's "Please fill out this field" bubble. */
  function check(): Record<string, string> {
    const out: Record<string, string> = {};
    for (const f of fields) {
      if (f.type === 'checks') continue;
      const v = (values[f.name] ?? '').trim();
      if (f.required && !v) out[f.name] = f.type === 'select' ? `Please choose your ${f.label.toLowerCase()}.` : `Please enter your ${f.label.toLowerCase()}.`;
      else if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) out[f.name] = 'Please enter a valid email address, e.g. name@company.com.';
    }
    return out;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = check();
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setStatus({ kind: 'sending' });
    try {
      await sendEnquiry({ ...(values as Partial<EnquiryPayload>), interests: checks, section, requestType: /demo/i.test(submitLabel) ? 'Demo request' : 'Enquiry' } as EnquiryPayload);
      setStatus({ kind: 'sent' });
      trackLead(section);
      setValues({});
      setChecks([]);
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div role="status" className="flex flex-col gap-3 border border-line bg-white p-[clamp(22px,3vw,36px)]">
        <b className="text-[1.4rem] font-extrabold text-ok">{confirmation}</b>
        <button type="button" className="tlink" onClick={() => setStatus({ kind: 'idle' })}>Send another <span className="ar">→</span></button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-[18px] border border-line bg-white p-[clamp(22px,3vw,36px)] text-fg sm:grid-cols-2">
      {fields.map((f) => {
        const fid = `${id}-${f.name}`;
        const span = f.full ? 'sm:col-span-2' : '';
        if (f.type === 'checks') {
          return (
            <fieldset key={f.name} className={`field flex flex-col gap-1.5 ${span}`}>
              <legend>{f.label}</legend>
              <div className="mt-1 flex flex-wrap gap-2">
                {f.options.map((o) => (
                  <label key={o} className="flex cursor-pointer items-center gap-1.5 border-[1.5px] border-line px-3 py-2 text-[0.86rem] font-medium">
                    <input type="checkbox" className="!w-auto accent-magenta" checked={checks.includes(o)} onChange={(e) => setChecks((c) => (e.target.checked ? [...c, o] : c.filter((x) => x !== o)))} />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
          );
        }
        return (
          <div key={f.name} className={`field flex min-w-0 flex-col gap-1.5 ${span}`}>
            <label htmlFor={fid}>{f.label}{f.required && <span className="text-magenta"> *</span>}</label>
            {f.type === 'select' ? (
              <select id={fid} name={f.name} aria-invalid={errors[f.name] ? true : undefined} aria-describedby={errors[f.name] ? `${fid}-err` : undefined} required={f.required} value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)}>
                <option value="">Select…</option>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea id={fid} name={f.name} aria-invalid={errors[f.name] ? true : undefined} aria-describedby={errors[f.name] ? `${fid}-err` : undefined} required={f.required} rows={4} value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)} />
            ) : (
              <input id={fid} name={f.name} aria-invalid={errors[f.name] ? true : undefined} aria-describedby={errors[f.name] ? `${fid}-err` : undefined} type={f.type ?? 'text'} required={f.required} autoComplete={'autoComplete' in f ? f.autoComplete : undefined} value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)} />
            )}
            {errors[f.name] && <p id={`${fid}-err`} role="alert" className="text-[0.82rem] font-medium text-[#B42318]">{errors[f.name]}</p>}
          </div>
        );
      })}
      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave empty</label>
        <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={values.website ?? ''} onChange={(e) => set('website', e.target.value)} />
      </div>
      {status.kind === 'error' && <p role="alert" className="text-[0.9rem] text-[#B42318] sm:col-span-2">We couldn&apos;t send your enquiry: {status.message} Please try again or email info@my-potentia.com.</p>}
      <div className="sm:col-span-2">
        <button type="submit" className="btn disabled:opacity-60" disabled={status.kind === 'sending'}>{status.kind === 'sending' ? 'Sending…' : submitLabel}</button>
      </div>
      <details className="text-[0.82rem] text-muted sm:col-span-2">
        <summary className="inline cursor-pointer text-magenta">Privacy notice</summary>
        <p className="mt-1.5">We use the details you send only to reply to this enquiry. They are not shared with third parties. See our <a href="/privacy" className="underline">privacy policy</a>.</p>
      </details>
    </form>
  );
}
