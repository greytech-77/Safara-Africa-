'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';
import { site } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

// Cloudflare Turnstile spam check, shown only when a site key is configured.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

export default function EnquiryForm({
  tours,
  preselect,
  consultant,
}: {
  tours: { slug: string; label: string }[];
  preselect?: string;
  consultant?: string;
}) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const initialTour = tours.find((t) => t.slug === preselect)?.label ?? '';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'The enquiry could not be sent.');
      trackEvent('generate_lead', { form: 'enquiry', tour: String(body.tour ?? '') || 'tailor-made' });
      setStatus({ kind: 'sent' });
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'The enquiry could not be sent.' });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div role="status" className="rounded-xl bg-white/70 p-6">
        <p className="font-display text-step-2 text-deep-teal">Enquiry sent</p>
        <p className="mt-2 text-ink">Thank you. A travel consultant will reply within one working day.</p>
      </div>
    );
  }

  const field =
    'mt-1 w-full rounded-lg border border-deep-teal/25 bg-white/80 px-3 py-2.5 font-normal focus:border-deep-teal focus:outline-none';
  const label = 'block text-step--1 font-semibold';

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      {/* Honeypot: hidden from people, bots fill it */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {consultant && <input type="hidden" name="consultant" value={consultant} />}

      {consultant && (
        <p className="text-step--1 text-slate sm:col-span-2">
          Planning with <span className="font-medium text-ink">{consultant}</span>
        </p>
      )}

      <label className={label}>
        Your name
        <input className={field} name="name" required autoComplete="name" />
      </label>
      <label className={label}>
        Email
        <input className={field} name="email" type="email" required autoComplete="email" />
      </label>
      <label className={label}>
        Phone or WhatsApp <span className="font-normal text-slate">(optional)</span>
        <input className={field} name="phone" type="tel" autoComplete="tel" />
      </label>
      <label className={label}>
        Country of residence
        <input className={field} name="country" autoComplete="country-name" />
      </label>
      <label className={label}>
        Travel dates
        <input className={field} name="dates" placeholder="e.g. late June 2027, 10 days" />
      </label>
      <label className={label}>
        Travellers
        <input className={field} name="travellers" placeholder="2 adults, 1 child (8)" />
      </label>
      <label className={`${label} sm:col-span-2`}>
        Journey you are interested in
        <select className={field} name="tour" defaultValue={initialTour}>
          <option value="">Something tailor-made</option>
          {tours.map((t) => (
            <option key={t.slug} value={t.label}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        Tell us about your trip
        <textarea
          className={field}
          name="message"
          rows={5}
          placeholder="What you'd love to see, how you like to travel, any celebrations or special needs"
        />
      </label>

      {TURNSTILE_SITE_KEY && (
        <div className="sm:col-span-2">
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />
        </div>
      )}

      <label className="flex cursor-pointer items-start gap-2 sm:col-span-2">
        <input type="checkbox" name="consent" value="Yes" required className="mt-1 size-4 shrink-0 accent-deep-teal" />
        <span className="text-step--1 text-ink">
          I agree that {site.name} may contact me about this trip. See our{' '}
          <Link href="/privacy" className="font-semibold text-deep-teal underline underline-offset-4">
            privacy policy
          </Link>
          .
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className="btn btn-primary" disabled={status.kind === 'sending'}>
          {status.kind === 'sending' ? (
            <>
              <span aria-hidden="true" className="spinner" />
              Sending…
            </>
          ) : (
            'Send enquiry'
          )}
        </button>
        <p className="text-step--1 text-ink">A travel consultant replies within one working day.</p>
      </div>

      {status.kind === 'error' && (
        <p role="alert" className="rounded-lg bg-white/80 p-4 text-step--1 sm:col-span-2">
          {status.message} You can also email{' '}
          <a className="font-bold underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
