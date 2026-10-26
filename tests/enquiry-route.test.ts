import { afterEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/enquiry/route';

const post = (body: unknown) =>
  POST(
    new Request('http://localhost/api/enquiry', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }),
  );

describe('POST /api/enquiry', () => {
  afterEach(() => vi.unstubAllEnvs());

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
});
