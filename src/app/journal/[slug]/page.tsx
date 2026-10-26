import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
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
      <Header current="/journal" />
      <article className="wrap pt-16">
        <Link href="/journal" className="text-step--1 font-bold text-navy underline underline-offset-4">Back to the journal</Link>
        <h1 className="mt-6 max-w-[20ch] text-step-5 text-navy">{post.title}</h1>
        <time dateTime={post.date.toISOString()} className="mt-4 block text-slate">{formatDate(post.date)}</time>
        {post.cover && (
          <div className="relative mt-10 aspect-[16/9] max-h-[70vh] overflow-hidden">
            <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        )}
        <div className="prose-safara mx-auto mt-12" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </>
  );
}
