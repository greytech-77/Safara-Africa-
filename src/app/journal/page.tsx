import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
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
      <Header current="/journal" />
      <section className="wrap pt-16">
        <h1 className="text-step-5 text-navy">Journal</h1>
        <ul className="mt-12 grid gap-12 md:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/journal/${p.slug}`} className="group block">
                {p.cover && (
                  <div className="relative aspect-[3/2] overflow-hidden bg-salt-deep">
                    <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                )}
                <time dateTime={p.date.toISOString()} className="mt-4 block text-step--1 text-slate">{formatDate(p.date)}</time>
                <h2 className="mt-1 text-step-2 text-navy group-hover:text-gold">{p.title}</h2>
                <p className="mt-2 text-ink/80">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
