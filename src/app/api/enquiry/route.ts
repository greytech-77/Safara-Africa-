import { NextResponse } from 'next/server';

const FIELDS = ['name', 'email', 'phone', 'country', 'dates', 'travellers', 'tour', 'message'] as const;
type Enquiry = Record<(typeof FIELDS)[number], string>;

const LABELS: Record<keyof Enquiry, string> = {
  name: 'Name', email: 'Email', phone: 'Phone', country: 'Country', dates: 'Travel dates',
  travellers: 'Travellers', tour: 'Journey', message: 'Message',
};

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'The form data could not be read.' }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (typeof raw.company === 'string' && raw.company.trim() !== '') return NextResponse.json({ ok: true });

  const e = Object.fromEntries(FIELDS.map((f) => [f, String(raw[f] ?? '').trim().slice(0, 4000)])) as Enquiry;

  if (!e.name) return NextResponse.json({ error: 'Add your name.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)) return NextResponse.json({ error: 'Add a valid email address.' }, { status: 400 });

  const text = FIELDS.filter((f) => e[f]).map((f) => `${LABELS[f]}: ${e[f]}`).join('\n');

  try {
    if (process.env.RESEND_API_KEY) {
      const html = `<table>${FIELDS.filter((f) => e[f])
        .map((f) => `<tr><th align="left" valign="top">${LABELS[f]}</th><td style="white-space:pre-wrap">${escapeHtml(e[f])}</td></tr>`)
        .join('')}</table>`;
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM ?? 'Safara Website <website@safaraafrica.com>',
          to: [process.env.ENQUIRY_TO ?? 'info@safaraafrica.com'],
          reply_to: e.email,
          subject: `Trip enquiry from ${e.name}${e.tour ? `: ${e.tour}` : ''}`,
          text,
          html,
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    } else if (process.env.ENQUIRY_WEBHOOK_URL) {
      const res = await fetch(process.env.ENQUIRY_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...e, source: 'safaraafrica.com', receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      console.warn('[enquiry] No RESEND_API_KEY or ENQUIRY_WEBHOOK_URL set. Enquiry logged only:\n' + text);
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Online enquiries are not set up yet.' }, { status: 503 });
      }
    }
  } catch (err) {
    console.error('[enquiry] delivery failed', err);
    return NextResponse.json({ error: 'The enquiry could not be sent right now.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
