import { describe, expect, it } from 'vitest';
import { site } from '@/config/site';
import { tripMessage, whatsappLink, whatsappMessage } from '@/lib/whatsapp';

describe('whatsapp links', () => {
  it('links to the configured number', () => {
    expect(whatsappLink()).toBe(`https://wa.me/${site.whatsapp}`);
  });

  it('URL-encodes the pre-filled text', () => {
    const url = new URL(whatsappLink(tripMessage('Serengeti & Ngorongoro', 4)));
    expect(url.searchParams.get('text')).toBe(
      `Hello ${site.name}, I'm interested in "Serengeti & Ngorongoro" (4 days). Could you send me a quote?`,
    );
  });

  it('names the topic when given', () => {
    expect(whatsappMessage('Mount Kilimanjaro')).toContain('Mount Kilimanjaro');
    expect(whatsappMessage()).toContain('Tanzania');
  });
});
