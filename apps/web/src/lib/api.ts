export type SectionKey = 'Banking & Fintech' | 'Business Automation' | 'Education & Wellbeing' | 'General enquiry';

export interface EnquiryPayload {
  section: SectionKey;
  /** 'Demo request' for the Book/Request a demo forms, otherwise 'Enquiry'. */
  requestType?: 'Demo request' | 'Enquiry';
  name: string;
  email: string;
  phone?: string;
  organisation?: string;
  role?: string;
  jobTitle?: string;
  institutionType?: string;
  country?: string;
  interest?: string;
  interests?: string[];
  users?: string;
  message?: string;
  /** Honeypot: must stay empty. */
  website?: string;
}

/**
 * Where enquiries go:
 * 1. NEXT_PUBLIC_API_URL set → the separate NestJS API (`${API}/enquiries`).
 * 2. Otherwise → this site's own route, /api/enquiries (SMTP, see .env.example).
 * 3. If the server has no email set up or can't reach it, the browser sends the enquiry
 *    through FormSubmit to info@my-potentia.com, so no request is lost.
 *    (FormSubmit emails info@my-potentia.com once to confirm; click the link in that email.)
 */
const API = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = API ? `${API.replace(/\/$/, '')}/enquiries` : '/api/enquiries';
const FALLBACK = process.env.NEXT_PUBLIC_FORM_FALLBACK ?? 'https://formsubmit.co/ajax/info@my-potentia.com';

const LABELS: Record<string, string> = {
  name: 'Name', email: 'Email', phone: 'Phone', organisation: 'Organisation / institution', role: 'Role', jobTitle: 'Job title',
  institutionType: 'Institution type', country: 'Country', interest: 'Interest', interests: 'Products or services', users: 'Users or students', message: 'Message',
};

async function viaFallback(p: EnquiryPayload): Promise<void> {
  const fields: Record<string, string> = {};
  for (const [k, label] of Object.entries(LABELS)) {
    const v = p[k as keyof EnquiryPayload];
    const s = Array.isArray(v) ? v.join(', ') : v;
    if (s) fields[label] = String(s);
  }
  const res = await fetch(FALLBACK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `[${p.section}] ${p.requestType === 'Demo request' ? 'Demo request' : 'Website enquiry'} from ${p.name}${p.organisation ? `, ${p.organisation}` : ''}`,
      _replyto: p.email,
      _template: 'table',
      _captcha: 'false',
      _honey: p.website ?? '',
      Section: p.section,
      'Request type': p.requestType ?? 'Enquiry',
      ...fields,
    }),
  });
  const body = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
  if (!res.ok || String(body.success) === 'false') throw new Error(body.message || 'The message service did not accept the enquiry.');
}

export async function sendEnquiry(payload: EnquiryPayload): Promise<void> {
  let res: Response | null = null;
  try {
    res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch {
    res = null; // server unreachable
  }
  if (res?.ok) return;

  let detail = '';
  let canFallback = !res || res.status === 404 || res.status === 405 || res.status >= 500;
  if (res) {
    try {
      const body = (await res.json()) as { message?: string | string[]; fallback?: boolean };
      detail = Array.isArray(body.message) ? body.message.join(', ') : body.message ?? '';
      if (body.fallback) canFallback = true;
    } catch { /* not JSON */ }
  }
  if (canFallback && FALLBACK) return viaFallback(payload);
  throw new Error(detail || `The server answered ${res?.status ?? 'no response'}.`);
}
