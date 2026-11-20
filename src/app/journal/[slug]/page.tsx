import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Hero from '@/components/ui/Hero';
import CtaBlock from '@/components/ui/CtaBlock';
import { pageHeroes } from '@/content/page-heroes';
import { formatDate, getPost, getPosts } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: { type: 'article', images: post.cover ? [post.cover.src] : undefined },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <Header overlay current="/journal" />
      <Hero
        size="md"
        overlay="full"
        image={post.cover ?? pageHeroes.journal.image}
        title={post.title}
        breadcrumbs={[{ label: 'Journal', href: '/journal' }, { label: post.title }]}
      />
      <article className="band">
        <div className="wrap">
          <div className="prose-safara mx-auto">
            <time dateTime={post.date.toISOString()} className="block text-slate">
              {formatDate(post.date)}
            </time>
          </div>
          <div className="prose-safara mx-auto mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
      <CtaBlock topic={post.title} />
    </>
  );
}
