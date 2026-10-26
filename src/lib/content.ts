import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import faqsJson from '@/content/faqs.json';
import type { Faq, Post, Tour } from '@/types/content';

const CONTENT = path.join(process.cwd(), 'src', 'content');

// Fail the build loudly if a content file is missing a required field.
function need<T>(file: string, key: string, value: T | undefined | null): T {
  if (value === undefined || value === null || value === '') {
    throw new Error(`Content error in ${file}: "${key}" is required.`);
  }
  return value;
}

function readDir(dir: string) {
  const full = path.join(CONTENT, dir);
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), 'utf8');
      const { data, content } = matter(raw);
      return { file: `${dir}/${f}`, slug: f.replace(/\.md$/, ''), data, html: marked.parse(content, { async: false }) as string };
    });
}

let toursCache: Tour[] | null = null;
export function getTours(): Tour[] {
  if (!toursCache) {
    toursCache = readDir('tours')
      .map(({ file, slug, data, html }) => ({
        slug,
        html,
        title: need(file, 'title', data.title),
        summary: need(file, 'summary', data.summary),
        days: need(file, 'days', data.days),
        style: need(file, 'style', data.style),
        country: need(file, 'country', data.country),
        tier: data.tier,
        tags: data.tags ?? [],
        order: data.order ?? 99,
        route: need(file, 'route', data.route),
        idealFor: data.idealFor ?? [],
        included: data.included ?? [],
        hero: need(file, 'hero', data.hero),
        gallery: data.gallery ?? [],
        itineraryUrl: data.itineraryUrl,
        priceFrom: data.priceFrom,
        draft: data.draft ?? false,
      }))
      .filter((t) => !t.draft)
      .sort((a, b) => a.order - b.order);
  }
  return toursCache;
}

export const getTour = (slug: string) => getTours().find((t) => t.slug === slug);

let postsCache: Post[] | null = null;
export function getPosts(): Post[] {
  if (!postsCache) {
    postsCache = readDir('posts')
      .map(({ file, slug, data, html }) => ({
        slug,
        html,
        title: need(file, 'title', data.title),
        excerpt: need(file, 'excerpt', data.excerpt),
        date: new Date(need(file, 'date', data.date)),
        cover: data.cover,
        tags: data.tags ?? [],
        draft: data.draft ?? false,
      }))
      .filter((p) => !p.draft)
      .sort((a, b) => b.date.valueOf() - a.date.valueOf());
  }
  return postsCache;
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const getFaqs = () => faqsJson as Faq[];

export const formatDate = (d: Date) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
