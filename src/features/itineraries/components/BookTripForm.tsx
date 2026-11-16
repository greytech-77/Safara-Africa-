'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useId, useState } from 'react';
import { site } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { dialCodes, flag } from '@/features/enquiry/wizard-config';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Props = { slug: string; title: string; price?: { label: string; isPlaceholder: boolean } };
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent'; name: string } | { kind: 'error'; message: string };
type Field = 'name' | 'email' | 'phone' | 'consent';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// "Book this journey" card in the tour sidebar. Sends through the same enquiry endpoint as the contact page
// (/api/enquiry), with the tour filled in automatically. No payment is taken.
export default function BookTripForm({ slug, title, price }: Props) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('TZ');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [flexible, setFlexible] = useState(false);
  const [adults, setAdults] = useState(2);
  const [childAges, setChildAges] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  // Phone and message are optional and start hidden, so the whole form fits (and stays pinned) on shorter screens.
  const [extras, setExtras] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [tried, setTried] = useState(false);

  const errors: Partial<Record<Field, string>> = {};
  if (!name.trim()) errors.name = 'Please add your name.';
  if (!emailOk(email)) errors.email = 'Please add a valid email address.';
  if (phone.trim() && !/^[\d\s()-]{5,20}$/.test(phone.trim())) errors.phone = 'Digits only, without the country code.';
  if (!consent) errors.consent = 'Please confirm we may contact you about this trip.';
  const err = (k: Field) => ((tried || touched[k]) && errors[k]) || undefined;
  const blur = (k: Field) => () => setTouched((t) => ({ ...t, [k]: true }));
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (Object.keys(errors).length) {
      setTried(true);
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setStatus({ kind: 'sending' });
    const fd = new FormData(form);
    const dial = dialCodes.find((d) => d.iso === code)?.code ?? '';
    const kids = childAges.length;
    const body = {
      company: fd.get('company') ?? '',
      'cf-turnstile-response': fd.get('cf-turnstile-response') ?? '',
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() ? `${dial} ${phone.trim()}` : '',
      tour: `${title} (/tours/${slug})`,
      dates: [date ? `Start ${date}` : 'No start date yet', flexible ? 'flexible' : ''].filter(Boolean).join(', '),
      travellers: [
        `${adults} adult${adults === 1 ? '' : 's'}`,
        kids ? `${kids} child${kids === 1 ? '' : 'ren'} (aged ${childAges.map((a) => a || '?').join(', ')})` : '',
      ]
        .filter(Boolean)
        .join(', '),
      message: message.trim(),
      consent: 'Yes',
    };
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'The request could not be sent.');
      trackEvent('generate_lead', { form: 'book-trip', tour: slug });
      setStatus({ kind: 'sent', name: name.trim().split(/\s+/)[0] });
    } catch (e2) {
      setStatus({ kind: 'error', message: e2 instanceof Error ? e2.message : 'The request could not be sent.' });
    }
  }

  const field = 'mt-1 w-full rounded-lg border border-[#9c8452] bg-white px-3 py-1.5 text-ink focus:outline-2 focus:outline-gold-ink';
  const labelCls = 'block text-step--1 leading-tight font-medium text-heading';
  const errCls = 'mt-1 text-step--1 text-[#b42318]';

  return (
    <section id="book" aria-labelledby="book-heading" className="scroll-mt-28 rounded-xl border border-deep-teal/15 bg-white p-4 sm:p-5">
      <h2 id="book-heading" className="text-step-2 text-ink">
        Book this journey
      </h2>
      {price && (
        <p className="mt-1 text-step--1 text-slate">
          From <span className="font-medium text-heading">{price.label}</span> per person{price.isPlaceholder ? ' (to be confirmed)' : ''}
        </p>
      )}

      {status.kind === 'sent' ? (
        <div role="status" className="mt-5 rounded-lg bg-sand/60 p-4">
          <p className="font-display text-step-1 text-heading">Thank you, {status.name}</p>
          <p className="mt-2 text-step--1 text-ink">
            Your request for {title} is with our travel team. A travel consultant will reply within one working day.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-3 grid grid-cols-1 gap-2.5">
          {/* Honeypot: hidden from people, bots fill it */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <input type="hidden" name="tour" value={slug} />

          <div>
            <label htmlFor={`${id}-name`} className={labelCls}>
              Full name
            </label>
            <input
              id={`${id}-name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={blur('name')}
              autoComplete="name"
              aria-invalid={err('name') ? true : undefined}
              aria-describedby={err('name') ? `${id}-name-e` : undefined}
              className={field}
            />
            {err('name') && (
              <p id={`${id}-name-e`} className={errCls}>
                {err('name')}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${id}-email`} className={labelCls}>
              Email
            </label>
            <input
              id={`${id}-email`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={blur('email')}
              autoComplete="email"
              aria-invalid={err('email') ? true : undefined}
              aria-describedby={err('email') ? `${id}-email-e` : undefined}
              className={field}
            />
            {err('email') && (
              <p id={`${id}-email-e`} className={errCls}>
                {err('email')}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-date`} className={labelCls}>
                Preferred start date
              </label>
              <label className="flex cursor-pointer items-center gap-1.5 text-step--1 leading-tight text-slate">
                <input
                  type="checkbox"
                  checked={flexible}
                  onChange={(e) => setFlexible(e.target.checked)}
                  className="size-4 accent-deep-teal"
                />
                Flexible dates
              </label>
            </div>
            <input id={`${id}-date`} type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Stepper label="Adults" value={adults} min={1} max={20} onChange={setAdults} />
            <Stepper
              label="Children"
              value={childAges.length}
              min={0}
              max={10}
              onChange={(n) => setChildAges((a) => (n > a.length ? [...a, ...Array(n - a.length).fill('')] : a.slice(0, n)))}
            />
          </div>
          {childAges.length > 0 && (
            <fieldset>
              <legend className={labelCls}>Children&apos;s ages</legend>
              <div className="mt-1 flex flex-wrap gap-2">
                {childAges.map((age, i) => (
                  <label key={i} className="text-step--1">
                    <span className="sr-only">Age of child {i + 1}</span>
                    <select
                      value={age}
                      onChange={(e) => setChildAges((a) => a.map((x, j) => (j === i ? e.target.value : x)))}
                      className="rounded-lg border border-[#9c8452] bg-white px-2 py-2"
                    >
                      <option value="">Age</option>
                      {Array.from({ length: 18 }, (_, n) => (
                        <option key={n} value={String(n)}>
                          {n === 0 ? 'Under 1' : n}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {extras ? (
            <>
              <div>
                <label htmlFor={`${id}-phone`} className={labelCls}>
                  Phone <span className="font-normal text-slate">(optional)</span>
                </label>
                <div className="mt-1 flex">
                  <label htmlFor={`${id}-code`} className="sr-only">
                    Country code
                  </label>
                  <select
                    id={`${id}-code`}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    autoComplete="tel-country-code"
                    className="w-[6.5rem] shrink-0 rounded-l-lg border border-r-0 border-[#9c8452] bg-white px-2 py-1.5 text-step--1"
                  >
                    {dialCodes.map((d) => (
                      <option key={d.iso} value={d.iso}>
                        {flag(d.iso)} {d.code}
                      </option>
                    ))}
                  </select>
                  <input
                    id={`${id}-phone`}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={blur('phone')}
                    autoComplete="tel-national"
                    aria-invalid={err('phone') ? true : undefined}
                    aria-describedby={err('phone') ? `${id}-phone-e` : undefined}
                    className="min-w-0 flex-1 rounded-r-lg border border-[#9c8452] bg-white px-3 py-1.5 focus:outline-2 focus:outline-gold-ink"
                  />
                </div>
                {err('phone') && (
                  <p id={`${id}-phone-e`} className={errCls}>
                    {err('phone')}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${id}-msg`} className={labelCls}>
                  Message <span className="font-normal text-slate">(optional)</span>
                </label>
                {/* One line to start; grows as you type (field-sizing), up to about five lines. */}
                <textarea
                  id={`${id}-msg`}
                  rows={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${field} max-h-36 resize-none [field-sizing:content]`}
                />
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setExtras(true);
                requestAnimationFrame(() => document.getElementById(`${id}-phone`)?.focus());
              }}
              className="-my-0.5 cursor-pointer justify-self-start text-step--1 font-medium text-gold-ink underline-offset-4 hover:underline"
            >
              + Add phone number or message
            </button>
          )}

          <div>
            <label className="flex cursor-pointer items-start gap-2 text-step--1">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setTouched((t) => ({ ...t, consent: true }));
                }}
                aria-invalid={err('consent') ? true : undefined}
                aria-describedby={err('consent') ? `${id}-consent-e` : undefined}
                className="mt-1 size-4 shrink-0 accent-deep-teal"
              />
              <span>
                I agree that {site.name} may contact me about this trip (
                <Link href="/privacy" className="font-medium text-deep-teal underline underline-offset-4">
                  privacy policy
                </Link>
                ).
              </span>
            </label>
            {err('consent') && (
              <p id={`${id}-consent-e`} className={errCls}>
                {err('consent')}
              </p>
            )}
          </div>

          {TURNSTILE_SITE_KEY && (
            <div>
              <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
              <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />
            </div>
          )}

          {status.kind === 'error' && (
            <p role="alert" className="rounded-lg border border-[#b42318]/30 bg-[#b42318]/5 p-3 text-step--1">
              {status.message} You can also email{' '}
              <a className="font-medium underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={status.kind === 'sending'}>
            {status.kind === 'sending' ? (
              <>
                <span aria-hidden="true" className="spinner" />
                Sending…
              </>
            ) : (
              'Request to book'
            )}
          </button>
          <p className="-mt-1 text-center text-[13px] leading-snug text-slate">No payment now · reply within one working day</p>
        </form>
      )}
    </section>
  );
}

// Number field with − and + buttons.
function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const id = useId();
  const btn =
    'grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border border-[#9c8452] text-heading disabled:cursor-not-allowed disabled:opacity-40';
  return (
    <div role="group" aria-labelledby={id}>
      <p id={id} className="block text-step--1 font-medium text-heading">
        {label}
      </p>
      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          className={btn}
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          −
        </button>
        <output aria-live="polite" className="min-w-6 text-center font-medium text-heading">
          {value}
        </output>
        <button
          type="button"
          className={btn}
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
