import { describe, expect, it } from 'vitest';
import { launchIssues } from '@/lib/launch-check';

const blockers = (date: string) =>
  launchIssues(new Date(date), {})
    .filter((i) => i.level === 'blocker')
    .map((i) => i.message);

describe('launch check', () => {
  it('blocks launch while contact details and prices are placeholders', () => {
    const b = blockers('2026-10-26');
    expect(b).toContain('site.phone is still the placeholder number (src/config/site.ts)');
    expect(b.some((m) => m.endsWith('prices are placeholders'))).toBe(true);
    expect(b.some((m) => m.startsWith('Park fees are placeholders'))).toBe(true);
  });

  it('reports expired price tables and missing fee years', () => {
    const b = blockers('2027-08-01');
    expect(b.some((m) => m.includes('price table expired'))).toBe(true);
    expect(b.some((m) => m.startsWith('No park fees valid'))).toBe(true);
  });

  it('warns, without blocking, when no enquiry delivery is configured', () => {
    const issues = launchIssues(new Date('2026-10-26'), {});
    expect(issues.find((i) => i.message.startsWith('No RESEND_API_KEY'))?.level).toBe('warning');
    const withKey = launchIssues(new Date('2026-10-26'), { RESEND_API_KEY: 'x' });
    expect(withKey.some((i) => i.message.startsWith('No RESEND_API_KEY'))).toBe(false);
  });
});
