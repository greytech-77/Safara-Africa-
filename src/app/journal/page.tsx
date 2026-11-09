import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import { pageHeroes } from '@/content/page-heroes';
import { formatDate, getPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Stories and travel ideas from Tanzania.',
  alternates: { canonical: '/journal' },
};

export default function JournalPage() {
  const posts = getPosts();
  return (
    <>
      <Header overlay current="/journal" />
      <Hero size="md" image={pageHeroes.journal.image} title="Our" titleAccent="journal" breadcrumbs={[{ label: 'Journal' }]} />
      <section className="band">
        <div className="wrap">
          <ul className="grid gap-12 md:grid-cols-2">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/journal/${p.slug}`} className="group block">
                  {p.cover && (
                    <div className="relative aspect-[3/2] overflow-hidden bg-sand">
                      <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <time dateTime={p.date.toISOString()} className="mt-4 block text-step--1 text-slate">
                    {formatDate(p.date)}
                  </time>
                  <h2 className="mt-1 text-step-2 text-ink group-hover:text-gold-ink">{p.title}</h2>
                  <p className="mt-2 text-ink">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
