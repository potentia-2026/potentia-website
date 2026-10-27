import { NextResponse } from 'next/server';
import { deliver, smtpConfigured, validate } from '@/lib/server/enquiry-mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Simple per-IP limit: 5 enquiries per 10 minutes per server instance.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

/** POST /api/enquiries — emails every website enquiry and demo request to info@my-potentia.com. */
export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return NextResponse.json({ message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }

  const v = validate(body);
  if (!v.ok) return NextResponse.json({ message: v.message }, { status: 400 });
  if (v.spam) return NextResponse.json({ ok: true }); // honeypot: pretend success, send nothing

  if (!smtpConfigured()) {
    // The browser then falls back to the no-setup relay (see src/lib/api.ts).
    console.warn('[enquiry] SMTP_HOST is not set; asking the browser to use the fallback relay.');
    return NextResponse.json({ message: 'Email is not configured on the server.', fallback: true }, { status: 503 });
  }

  try {
    await deliver(v.data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[enquiry] delivery failed:', (e as Error).message);
    return NextResponse.json({ message: 'We could not send your enquiry right now.', fallback: true }, { status: 503 });
  }
}
