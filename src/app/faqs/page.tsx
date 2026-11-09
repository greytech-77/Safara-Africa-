import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import JsonLd from '@/components/ui/JsonLd';
import { pageHeroes } from '@/content/page-heroes';
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
      <Header overlay current="/faqs" />
      <Hero size="md" image={pageHeroes.faqs.image} title="Frequently asked" titleAccent="questions" breadcrumbs={[{ label: 'FAQs' }]} />
      <section className="band">
        <div className="wrap grid gap-12 lg:grid-cols-[18rem_1fr]">
          <div>
            <p className="text-ink">
              Something not covered?{' '}
              <Link href="/contact#enquire" className="font-bold text-deep-teal underline underline-offset-4">
                Ask a consultant
              </Link>
              .
            </p>
          </div>
          <div className="space-y-14">
            {topics.map((topic) => {
              const items = faqs.filter((f) => f.topic === topic);
              if (items.length === 0) return null;
              return (
                <section key={topic}>
                  <h2 className="text-step-3 text-ink">{topic}</h2>
                  <div className="mt-4 divide-y divide-deep-teal/15 border-y border-deep-teal/15">
                    {items.map((f) => (
                      <details key={f.id} className="group py-5">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-step-1 font-semibold">
                          {f.question}
                          <span aria-hidden="true" className="mt-1 text-gold-ink transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="measure mt-3 text-ink">{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
