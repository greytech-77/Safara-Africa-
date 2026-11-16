'use client';

import Link from 'next/link';
import Script from 'next/script';
import { Fragment, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { site } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { whatsappLink, whatsappMessage } from '@/lib/whatsapp';
import {
  type Answers,
  budgetPoints,
  contactErrors,
  currencies,
  dialCodes,
  emptyAnswers,
  flag,
  interestOptions,
  joinNames,
  maxInterests,
  monthShort,
  monthsSummary,
  stepValid,
  steps,
  whoOptions,
} from '../wizard-config';

// One question per screen. Each step has its own URL hash (#where … #contact) so Back/Forward move between steps,
// and answers are kept in sessionStorage so a refresh keeps progress. Step content lives in wizard-config.ts.

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const STORE = 'safara-plan-wizard';
const noop = () => () => {};

type Props = { suggestions: string[]; tour?: string; consultant?: string };

export default function PlanWizard(props: Props) {
  // Rendered in the browser only: it reads sessionStorage, the URL hash and today's date.
  const ready = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  return (
    <div id="enquire" className="scroll-mt-28">
      {ready ? (
        <Wizard {...props} />
      ) : (
        <div className="min-h-[520px]" aria-busy="true">
          <noscript>
            <p className="text-center">
              Please email <a href={`mailto:${site.email}`}>{site.email}</a> or call {site.phone.display} to plan your journey.
            </p>
          </noscript>
        </div>
      )}
    </div>
  );
}

type Saved = { answers: Answers };
function load(): Answers {
  try {
    const s = JSON.parse(sessionStorage.getItem(STORE) ?? 'null') as Saved | null;
    if (s?.answers) return { ...emptyAnswers, ...s.answers };
  } catch {}
  return emptyAnswers;
}

// The furthest step the answers allow: a hash can't jump past an unanswered step.
function stepFromHash(hash: string, a: Answers) {
  const want = Math.max(
    0,
    steps.findIndex((s) => `#${s.id}` === hash),
  );
  let i = 0;
  while (i < want && stepValid(steps[i].id, a)) i++;
  return i;
}

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent'; firstName: string } | { kind: 'error'; message: string };

function Wizard({ suggestions, tour, consultant }: Props) {
  const [a, setA] = useState<Answers>(load);
  const [step, setStep] = useState(() => stepFromHash(location.hash, load()));
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [showErrors, setShowErrors] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const answersRef = useRef(a);
  // Destination typed but not yet added with "Add": Next step adds it.
  const [draft, setDraft] = useState('');

  const set = (patch: Partial<Answers>) => setA((prev) => ({ ...prev, ...patch }));
  const current = steps[step];

  useEffect(() => {
    answersRef.current = a;
    try {
      sessionStorage.setItem(STORE, JSON.stringify({ answers: a } satisfies Saved));
    } catch {}
  }, [a]);

  // Browser Back/Forward (or a typed hash) picks the step.
  useEffect(() => {
    const onHash = () => setStep(stepFromHash(location.hash, answersRef.current));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // On every step change: bring the wizard into view and move focus to the new question.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const top = root.current?.getBoundingClientRect().top ?? 0;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (top < 80 || top > innerHeight * 0.5) root.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    heading.current?.focus({ preventScroll: true });
  }, [step, status.kind]);

  const go = (i: number) => {
    if (i === step) return;
    location.hash = steps[i].id; // pushes a history entry; the hashchange listener sets the step
  };

  async function submit(form: HTMLFormElement) {
    if (!stepValid('contact', a)) {
      setShowErrors(true);
      // after React has marked the invalid fields
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setStatus({ kind: 'sending' });
    const fd = new FormData(form);
    const dial = dialCodes.find((d) => d.iso === a.phoneCode);
    const points = budgetPoints[a.currency as (typeof currencies)[number]];
    const body = {
      company: fd.get('company') ?? '',
      'cf-turnstile-response': fd.get('cf-turnstile-response') ?? '',
      name: `${a.firstName.trim()} ${a.lastName.trim()}`,
      email: a.email.trim(),
      phone: a.phone.trim() ? `${dial?.code ?? ''} ${a.phone.trim()}` : '',
      destinations: joinNames(a.destinations),
      dates: [a.months.length ? monthsSummary(a.months) : '', a.flexible ? 'Flexible' : ''].filter(Boolean).join(' · '),
      travellers: a.who,
      interests: a.interests.join(', '),
      budget: a.budget !== null ? `${points[a.budget].value} per person (${a.currency})` : '',
      tour: tour ?? '',
      consultant: consultant ?? '',
      message: a.notes.trim(),
      newsletter: a.newsletter ? 'Yes' : 'No',
      consent: a.consent ? 'Yes' : 'No',
    };
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'The enquiry could not be sent.');
      trackEvent('generate_lead', { form: 'plan-wizard', tour: tour || 'tailor-made' });
      try {
        sessionStorage.removeItem(STORE);
      } catch {}
      setStatus({ kind: 'sent', firstName: a.firstName.trim() });
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'The enquiry could not be sent.' });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div ref={root} className="wizard-step mx-auto max-w-[620px] text-center">
        <h2 ref={heading} tabIndex={-1} className="wizard-title">
          <em>Thank you,</em> {status.firstName}
        </h2>
        <p className="wizard-intro">
          Your enquiry is with our travel team. A travel consultant will reply within one working day with ideas and a proposal shaped
          around your answers.
        </p>
        <p className="mt-10 text-step--1 font-semibold uppercase tracking-[0.12em] text-gold-ink">Prefer to talk sooner?</p>
        <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappLink(whatsappMessage())} target="_blank" rel="noopener" className="wizard-next">
            Message us on WhatsApp
          </a>
          <a href={`tel:${site.phone.tel}`} className="wizard-option min-h-12 justify-center rounded-full px-6 font-semibold">
            Call {site.phone.display}
          </a>
        </div>
      </div>
    );
  }

  const places = joinNames(a.destinations) || 'Africa';
  const valid = stepValid(current.id, a) || (current.id === 'where' && draft.trim() !== '');
  const isLast = current.id === 'contact';
  const next = () => {
    if (current.id === 'where' && draft.trim()) {
      const name = draft.trim();
      const destinations = a.destinations.some((d) => d.toLowerCase() === name.toLowerCase()) ? a.destinations : [...a.destinations, name];
      answersRef.current = { ...a, destinations };
      set({ destinations });
      setDraft('');
    }
    go(step + 1);
  };

  return (
    <div ref={root} className="scroll-mt-28">
      {/* Progress */}
      <div className="mx-auto max-w-[620px]">
        <p className="text-center text-step--1 font-semibold uppercase tracking-[0.12em] text-gold-ink">
          Step {step + 1} of {steps.length}
        </p>
        <div className="mt-3 h-px bg-hairline" aria-hidden="true">
          <div className="h-px bg-gold-ink transition-[width] duration-300" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      <form
        key={current.id}
        noValidate
        className={`wizard-step mx-auto mt-6 sm:mt-8 ${current.wide ? 'max-w-[850px]' : 'max-w-[620px]'}`}
        onSubmit={(e) => {
          e.preventDefault();
          if (isLast) void submit(e.currentTarget);
          else if (valid) next();
        }}
      >
        <h2 ref={heading} tabIndex={-1} className="wizard-title">
          <Title text={current.title.replace('{places}', places)} />
        </h2>
        {current.intro && <p className="wizard-intro">{current.intro}</p>}
        {step === 0 && tour && (
          <p className="mt-4 text-center text-step--1 text-slate">
            Enquiring about: <strong className="text-ink">{tour}</strong>
          </p>
        )}
        {step === 0 && consultant && (
          <p className="mt-2 text-center text-step--1 text-slate">
            Planning with: <strong className="text-ink">{consultant}</strong>
          </p>
        )}

        <div className="mt-8">
          {current.id === 'where' && <WhereStep a={a} set={set} suggestions={suggestions} text={draft} setText={setDraft} />}
          {current.id === 'when' && <WhenStep a={a} set={set} />}
          {current.id === 'who' && <WhoStep a={a} set={set} onPicked={() => setTimeout(() => go(step + 1), 300)} />}
          {current.id === 'interests' && <InterestsStep a={a} set={set} />}
          {current.id === 'budget' && <BudgetStep a={a} set={set} />}
          {current.id === 'contact' && <ContactStep a={a} set={set} showErrors={showErrors} />}
        </div>

        {status.kind === 'error' && (
          <p role="alert" className="mt-6 border border-red-700/40 bg-white p-4 text-step--1 text-ink">
            {status.message} You can also email{' '}
            <a className="font-bold underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" className="wizard-prev" onClick={() => go(step - 1)}>
              Previous
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            className="wizard-next"
            disabled={status.kind === 'sending' || (!isLast && !valid)}
            aria-disabled={!isLast && !valid ? true : undefined}
          >
            {status.kind === 'sending' ? (
              <>
                <span aria-hidden="true" className="spinner" />
                Sending…
              </>
            ) : isLast ? (
              'Submit'
            ) : (
              'Next step'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// "*Where* would…" → <em>Where</em> would…
function Title({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(\*[^*]+\*)/)
        .map((part, i) => (part.startsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

type StepProps = { a: Answers; set: (p: Partial<Answers>) => void };

function WhereStep({
  a,
  set,
  suggestions,
  text,
  setText,
}: StepProps & { suggestions: string[]; text: string; setText: (t: string) => void }) {
  const listId = useId();
  const add = () => {
    const name = text.trim();
    if (!name) return;
    if (!a.destinations.some((d) => d.toLowerCase() === name.toLowerCase())) set({ destinations: [...a.destinations, name].slice(0, 12) });
    setText('');
  };
  return (
    <div>
      <div className="flex">
        <label htmlFor={`${listId}-input`} className="sr-only">
          Destination
        </label>
        <input
          id={`${listId}-input`}
          list={listId}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder="e.g. Serengeti, Zanzibar"
          autoComplete="off"
          className="wizard-input min-w-0 flex-1 rounded-l-full rounded-r-none border-r-0 px-5"
        />
        <button type="button" onClick={add} className="wizard-add">
          Add
        </button>
        <datalist id={listId}>
          {suggestions.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </div>
      {a.destinations.length > 0 && (
        <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Chosen destinations">
          {a.destinations.map((d) => (
            <li key={d} className="flex items-center gap-2 border border-hairline bg-white py-1.5 pl-4 pr-2">
              {d}
              <button
                type="button"
                aria-label={`Remove ${d}`}
                onClick={() => set({ destinations: a.destinations.filter((x) => x !== d) })}
                className="grid size-7 cursor-pointer place-items-center rounded-full text-slate hover:bg-cream hover:text-ink"
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Quick picks: the first few suggestions as one-tap chips. */}
      <p className="mt-6 text-center text-step--1 text-slate">Popular choices</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {['Tanzania', 'Serengeti', 'Ngorongoro Crater', 'Zanzibar', 'Mount Kilimanjaro', 'Tarangire', 'Ruaha', 'Nyerere National Park']
          .filter((s) => !a.destinations.includes(s))
          .map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set({ destinations: [...a.destinations, s] })}
              className="wizard-option rounded-full px-4 py-1.5 text-step--1"
            >
              + {s}
            </button>
          ))}
      </div>
    </div>
  );
}

function WhenStep({ a, set }: StepProps) {
  const now = new Date();
  const thisYear = now.getFullYear();
  const [year, setYear] = useState(() => Number(a.months.slice().sort()[0]?.slice(0, 4)) || thisYear);
  const toggle = (key: string) =>
    set({ months: a.months.includes(key) ? a.months.filter((m) => m !== key) : [...a.months, key], flexible: a.flexible });
  return (
    <div>
      <div className="flex items-center justify-center gap-6">
        <button
          type="button"
          className="wizard-year"
          disabled={year <= thisYear}
          onClick={() => setYear(year - 1)}
          aria-label="Previous year"
        >
          ‹
        </button>
        <p className="min-w-16 text-center font-display text-step-2" aria-live="polite">
          {year}
        </p>
        <button
          type="button"
          className="wizard-year"
          disabled={year >= thisYear + 2}
          onClick={() => setYear(year + 1)}
          aria-label="Next year"
        >
          ›
        </button>
      </div>
      <fieldset className="mt-6">
        <legend className="sr-only">Months in {year}</legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {monthShort.map((m, i) => {
            const key = `${year}-${String(i + 1).padStart(2, '0')}`;
            const past = year === thisYear && i < now.getMonth();
            return (
              <label key={key} className="wizard-option justify-center py-3">
                <input type="checkbox" className="sr-only" checked={a.months.includes(key)} disabled={past} onChange={() => toggle(key)} />
                <Dot />
                {m}
              </label>
            );
          })}
        </div>
      </fieldset>
      <label className="wizard-option mt-4 justify-center py-3">
        <input type="checkbox" className="sr-only" checked={a.flexible} onChange={(e) => set({ flexible: e.target.checked })} />
        <Dot />
        I&apos;m flexible
      </label>
      {a.months.length > 0 && <p className="mt-4 text-center text-step--1 text-slate">Selected: {monthsSummary(a.months)}</p>}
    </div>
  );
}

function WhoStep({ a, set, onPicked }: StepProps & { onPicked: () => void }) {
  const byPointer = useRef(false);
  return (
    <fieldset>
      <legend className="sr-only">Who is travelling</legend>
      <div className="grid gap-2">
        {whoOptions.map((o) => (
          <label key={o} className="wizard-option py-4" onPointerDown={() => (byPointer.current = true)}>
            <input
              type="radio"
              name="who"
              className="sr-only"
              checked={a.who === o}
              onChange={() => {
                set({ who: o });
                // Tapping a choice moves on; arrow keys only change the choice.
                if (byPointer.current) onPicked();
                byPointer.current = false;
              }}
            />
            <Dot />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function InterestsStep({ a, set }: StepProps) {
  const full = a.interests.length >= maxInterests;
  return (
    <fieldset>
      <legend className="sr-only">Choose up to {maxInterests}</legend>
      <div className="flex flex-wrap justify-center gap-2.5">
        {interestOptions.map((o) => {
          const on = a.interests.includes(o);
          return (
            <label key={o} className="wizard-option rounded-full px-5 py-2.5">
              <input
                type="checkbox"
                className="sr-only"
                checked={on}
                disabled={full && !on}
                onChange={() => set({ interests: on ? a.interests.filter((x) => x !== o) : [...a.interests, o] })}
              />
              <Dot />
              {o}
            </label>
          );
        })}
      </div>
      <p className="mt-5 text-center text-step--1 text-slate" aria-live="polite">
        {a.interests.length} of {maxInterests} chosen
      </p>
    </fieldset>
  );
}

function BudgetStep({ a, set }: StepProps) {
  const points = budgetPoints[a.currency as (typeof currencies)[number]] ?? budgetPoints.USD;
  return (
    <div>
      <label className="mx-auto flex w-fit items-center gap-3 text-step--1 font-semibold">
        Currency
        <select value={a.currency} onChange={(e) => set({ currency: e.target.value })} className="wizard-input rounded-full px-4 py-2">
          {currencies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <fieldset className="mt-12">
        <legend className="sr-only">Budget per person in {a.currency}</legend>
        <div className="relative">
          {/* the thin line the dots sit on */}
          <div aria-hidden="true" className="absolute inset-x-[7%] top-[11px] h-px bg-hairline" />
          <div className="relative grid" style={{ gridTemplateColumns: `repeat(${points.length}, minmax(0, 1fr))` }}>
            {points.map((p, i) => (
              <label key={p.label} className="wizard-budget">
                <input type="radio" name="budget" className="sr-only" checked={a.budget === i} onChange={() => set({ budget: i })} />
                <span aria-hidden="true" className="wizard-budget__dot" />
                <span className="mt-3 block text-center text-[12px] leading-tight sm:text-step--1">{p.label}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>
    </div>
  );
}

function ContactStep({ a, set, showErrors }: StepProps & { showErrors: boolean }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const errors = contactErrors(a);
  const err = (k: keyof typeof errors) => ((showErrors || touched[k]) && errors[k]) || undefined;
  const id = useId();
  const field = (k: 'firstName' | 'lastName' | 'email', label: string, type = 'text', autoComplete?: string) => (
    <div>
      <label htmlFor={`${id}-${k}`} className="wizard-label">
        {label}
      </label>
      <input
        id={`${id}-${k}`}
        type={type}
        value={a[k]}
        autoComplete={autoComplete}
        onChange={(e) => set({ [k]: e.target.value })}
        onBlur={() => setTouched((t) => ({ ...t, [k]: true }))}
        aria-invalid={err(k) ? true : undefined}
        aria-describedby={err(k) ? `${id}-${k}-err` : undefined}
        className="wizard-input mt-1.5 w-full px-4 py-3"
      />
      {err(k) && (
        <p id={`${id}-${k}-err`} className="wizard-error">
          {err(k)}
        </p>
      )}
    </div>
  );
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Honeypot: hidden from people, bots fill it */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {field('firstName', 'First name', 'text', 'given-name')}
      {field('lastName', 'Last name', 'text', 'family-name')}
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-phone`} className="wizard-label">
          Phone <span className="font-normal text-slate">(optional)</span>
        </label>
        <div className="mt-1.5 flex">
          <label htmlFor={`${id}-code`} className="sr-only">
            Country code
          </label>
          <select
            id={`${id}-code`}
            value={a.phoneCode}
            onChange={(e) => set({ phoneCode: e.target.value })}
            autoComplete="tel-country-code"
            className="wizard-input w-[9.5rem] shrink-0 border-r-0 px-3 py-3 sm:w-[13rem]"
          >
            {dialCodes.map((d) => (
              <option key={d.iso} value={d.iso}>
                {flag(d.iso)} {d.code} {d.name}
              </option>
            ))}
          </select>
          <input
            id={`${id}-phone`}
            type="tel"
            value={a.phone}
            autoComplete="tel-national"
            onChange={(e) => set({ phone: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            aria-invalid={err('phone') ? true : undefined}
            aria-describedby={err('phone') ? `${id}-phone-err` : undefined}
            className="wizard-input min-w-0 flex-1 px-4 py-3"
          />
        </div>
        {err('phone') && (
          <p id={`${id}-phone-err`} className="wizard-error">
            {err('phone')}
          </p>
        )}
      </div>
      <div className="sm:col-span-2">{field('email', 'Email', 'email', 'email')}</div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-notes`} className="wizard-label">
          Anything else we should know? <span className="font-normal text-slate">(optional)</span>
        </label>
        <textarea
          id={`${id}-notes`}
          rows={4}
          value={a.notes}
          onChange={(e) => set({ notes: e.target.value })}
          placeholder="Celebrations, special interests, dietary or access needs"
          className="wizard-input mt-1.5 w-full px-4 py-3"
        />
      </div>
      <div className="grid gap-3 sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" className="wizard-check" checked={a.newsletter} onChange={(e) => set({ newsletter: e.target.checked })} />
          <span>Send me occasional travel ideas from {site.name}. (optional)</span>
        </label>
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="wizard-check"
              checked={a.consent}
              onChange={(e) => {
                set({ consent: e.target.checked });
                setTouched((t) => ({ ...t, consent: true }));
              }}
              aria-invalid={err('consent') ? true : undefined}
              aria-describedby={err('consent') ? `${id}-consent-err` : undefined}
            />
            <span>
              I agree that {site.name} may contact me about this trip, as described in the{' '}
              <Link href="/privacy" className="font-semibold text-deep-teal underline underline-offset-4">
                privacy policy
              </Link>
              .
            </span>
          </label>
          {err('consent') && (
            <p id={`${id}-consent-err`} className="wizard-error">
              {err('consent')}
            </p>
          )}
        </div>
      </div>
      {TURNSTILE_SITE_KEY && (
        <div className="sm:col-span-2">
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />
        </div>
      )}
    </div>
  );
}

// The small filled dot shown on a selected option.
function Dot() {
  return <span aria-hidden="true" className="wizard-dot" />;
}
