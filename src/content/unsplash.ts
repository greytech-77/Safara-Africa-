import type { Img } from '@/lib/content';

// Placeholder photos from Unsplash. Replace with your own images before launch.
export const unsplash = (id: string, alt: string): Img => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`,
  alt,
});
