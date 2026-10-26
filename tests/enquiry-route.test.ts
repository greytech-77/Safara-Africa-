import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/enquiry/route';
import { isRateLimited, resetRateLimit } from '@/lib/spam-guard';

const post = (body: unknown) =>
  POST(
    new Request('http://localhost/api/enquiry', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }),
  );

describe('POST /api/enquiry', () => {
  beforeEach(() => resetRateLimit());
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('rejects a missing name', async () => {
    const res = await post({ email: 'a@b.co' });
    expect(res.status).toBe(400);
  });

  it('rejects an invalid email', async () => {
    const res = await post({ name: 'Asha', email: 'not-an-email' });
    expect(res.status).toBe(400);
  });

  it('pretends success when the honeypot is filled', async () => {
    const res = await post({ name: 'Bot', email: 'bot@spam.co', company: 'Spam Ltd' });
    expect(res.status).toBe(200);
  });

  it('accepts a valid enquiry in development with no delivery configured', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('ENQUIRY_WEBHOOK_URL', '');
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const res = await post({ name: 'Asha', email: 'asha@example.com' });
    expect(res.status).toBe(200);
  });

  it('refuses in production when no delivery is configured', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('ENQUIRY_WEBHOOK_URL', '');
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const res = await post({ name: 'Asha', email: 'asha@example.com' });
    expect(res.status).toBe(503);
  });

  it('rejects a missing Turnstile token when a secret is configured', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'test-secret');
    const res = await post({ name: 'Asha', email: 'asha@example.com' });
    expect(res.status).toBe(400);
  });

  it('accepts a token that Turnstile verifies', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'test-secret');
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('ENQUIRY_WEBHOOK_URL', '');
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true })));
    vi.stubGlobal('fetch', fetchMock);
    const res = await post({ name: 'Asha', email: 'asha@example.com', 'cf-turnstile-response': 'token' });
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith('https://challenges.cloudflare.com/turnstile/v0/siteverify', expect.anything());
  });

  it('limits repeated enquiries from one address', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    for (let i = 0; i < 5; i++) expect(isRateLimited('203.0.113.9', 1000 + i)).toBe(false);
    expect(isRateLimited('203.0.113.9', 2000)).toBe(true);
    // The window slides: ten minutes later the address is free again.
    expect(isRateLimited('203.0.113.9', 2000 + 10 * 60 * 1000 + 1)).toBe(false);
  });
});
