import { site } from '@/config/site';

// Click-to-chat link. The pre-filled text tells the team which page or trip the lead came from.
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsappMessage = (topic?: string) =>
  topic ? `Hello ${site.name}, I'd like to plan a trip: ${topic}.` : `Hello ${site.name}, I'd like help planning a trip to Tanzania.`;

export const tripMessage = (title: string, days: number) =>
  `Hello ${site.name}, I'm interested in "${title}" (${days} days). Could you send me a quote?`;
