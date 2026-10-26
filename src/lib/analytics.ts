// GA4 events. A no-op until NEXT_PUBLIC_GA_ID is set and the gtag script has loaded (see components/layout/Analytics.tsx).
type Gtag = (command: 'event', name: string, params?: Record<string, string | number>) => void;

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.('event', name, params);
}
