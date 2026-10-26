import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import JsonLd from '@/components/ui/JsonLd';
import { getFaqs } from '@/lib/content';
import type { Faq } from '@/types/content';

export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description: 'Answers about planning, travelling and booking a safari in Tanzania.',
  alternates: { canonical: '/faqs' },
};

const topics: Faq['topic'][] = ['Planning', 'Travel', 'On safari', 'Booking'];

export default function FaqsPage() {
  const faqs = getFaqs();
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };

  return (
    <>
      <JsonLd data={ld} />
      <Header current="/faqs" />
      <section className="wrap grid gap-12 pt-16 lg:grid-cols-[18rem_1fr]">
        <div>
          <h1 className="text-step-5 text-navy">Questions</h1>
          <p className="mt-4 text-slate">
            Something not covered? <Link href="/contact#enquire" className="font-bold text-navy underline underline-offset-4">Ask a consultant</Link>.
          </p>
        </div>
        <div className="space-y-14">
          {topics.map((topic) => {
            const items = faqs.filter((f) => f.topic === topic);
            if (items.length === 0) return null;
            return (
              <section key={topic}>
                <h2 className="text-step-3 text-navy">{topic}</h2>
                <div className="mt-4 divide-y divide-navy/15 border-y border-navy/15">
                  {items.map((f) => (
                    <details key={f.id} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-step-1 font-semibold">
                        {f.question}
                        <span aria-hidden="true" className="mt-1 text-gold transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="measure mt-3 text-ink/85">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
