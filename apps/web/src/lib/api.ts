export type SectionKey = 'Banking & Fintech' | 'Business Automation' | 'Education & Wellbeing' | 'General enquiry';

export interface EnquiryPayload {
  section: SectionKey;
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

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function sendEnquiry(payload: EnquiryPayload): Promise<void> {
  const res = await fetch(`${API_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let detail = '';
    try {
      const body = (await res.json()) as { message?: string | string[] };
      detail = Array.isArray(body.message) ? body.message.join(', ') : body.message ?? '';
    } catch {
      /* ignore */
    }
    throw new Error(detail || `The server answered ${res.status}.`);
  }
}
