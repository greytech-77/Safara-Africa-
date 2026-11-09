import JsonLd from './JsonLd';

// Accordion of questions, styled like /faqs, with FAQPage structured data.
export default function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <JsonLd data={ld} />
      <div className="divide-y divide-deep-teal/15 border-y border-deep-teal/15">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-step-1 font-semibold">
              {f.q}
              <span aria-hidden="true" className="mt-1 text-gold-ink transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="measure mt-3 text-ink">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
