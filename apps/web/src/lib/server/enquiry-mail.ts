import nodemailer from 'nodemailer';

/** Server-only: validates an enquiry and emails it to the Potentia inbox over SMTP. */

export const SECTIONS = ['Banking & Fintech', 'Business Automation', 'Education & Wellbeing', 'General enquiry'] as const;

const LABELS: Record<string, string> = {
  name: 'Name', email: 'Email', phone: 'Phone', organisation: 'Organisation / institution', role: 'Role',
  jobTitle: 'Job title', institutionType: 'Institution type', country: 'Country', interest: 'Interest',
  interests: 'Products or services', users: 'Users or students', message: 'Message',
};
const MAX: Record<string, number> = { name: 120, email: 200, message: 4000 };

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Clean = Record<string, string> & { section: string; name: string; email: string };

export function validate(body: unknown): { ok: true; data: Clean; spam: boolean } | { ok: false; message: string } {
  if (!body || typeof body !== 'object') return { ok: false, message: 'Invalid request.' };
  const b = body as Record<string, unknown>;
  const spam = typeof b.website === 'string' && b.website.trim() !== '';
  const data: Record<string, string> = {};
  for (const k of [...Object.keys(LABELS), 'section', 'requestType']) {
    const v = b[k];
    if (Array.isArray(v)) data[k] = v.filter((x) => typeof x === 'string').slice(0, 10).map((x) => x.slice(0, 80)).join(', ');
    else if (typeof v === 'string' && v.trim()) data[k] = v.trim().slice(0, MAX[k] ?? 200);
  }
  if (!SECTIONS.includes(data.section as (typeof SECTIONS)[number])) data.section = 'General enquiry';
  if (!data.name || data.name.length < 2) return { ok: false, message: 'Please enter your name.' };
  if (!data.email || !EMAIL_RE.test(data.email)) return { ok: false, message: 'Please enter a valid email address.' };
  return { ok: true, data: data as Clean, spam };
}

export function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST);
}

export async function deliver(d: Clean): Promise<void> {
  const to = process.env.MAIL_TO || 'info@my-potentia.com';
  const from = process.env.MAIL_FROM || `Potentia Website <${process.env.SMTP_USER || 'no-reply@my-potentia.com'}>`;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });

  const rows = Object.entries(LABELS).filter(([k]) => d[k]).map(([k, label]) => [label, d[k]] as const);
  const kind = d.requestType === 'Demo request' ? 'Demo request' : 'Website enquiry';
  const subject = `[${d.section}] ${kind} from ${d.name}${d.organisation ? `, ${d.organisation}` : ''}`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nSent from the ${d.section} form on www.my-potentia.com`;
  const html = `<h2 style="font-family:Arial,sans-serif;color:#5D2E8E;margin:0 0 12px">${esc(kind)} · ${esc(d.section)}</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#5C4C66;vertical-align:top;white-space:nowrap"><b>${esc(k)}</b></td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#8a7a94;margin-top:18px">Reply to this email to answer ${esc(d.name)} directly.</p>`;

  await transport.sendMail({ from, to, replyTo: `${d.name} <${d.email}>`, subject, text, html });

  // Acknowledgement to the visitor (set MAIL_ACK=false to turn off). A failure here never fails the enquiry.
  if (String(process.env.MAIL_ACK ?? 'true') !== 'false') {
    const ack = `Dear ${d.name},\n\nThank you for contacting Potentia. We have received your ${kind === 'Demo request' ? 'demo request' : 'enquiry'} (${d.section}) and our team will get back to you within two working days.\n\nPotentia Software & Consultancy Services W.L.L.\nDoha, Qatar · info@my-potentia.com · +974 3300 1239\nwww.my-potentia.com`;
    await transport
      .sendMail({ from, to: d.email, replyTo: to, subject: 'Thank you for contacting Potentia', text: ack, html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(ack)}</div>` })
      .catch((e: Error) => console.warn('[enquiry] acknowledgement not sent:', e.message));
  }
}
