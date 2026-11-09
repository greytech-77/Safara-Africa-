import type { Metadata } from 'next';
import { Figtree, Fraunces, Instrument_Serif } from 'next/font/google';
import Analytics from '@/components/layout/Analytics';
import FloatingCta from '@/components/layout/FloatingCta';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/config/site';
import '@/styles/globals.css';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' });
// Every heading below the hero: a narrow serif.
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-instrument', display: 'swap' });
// Hero titles only: light 300 with an italic accent.
const fraunces = Fraunces({ subsets: ['latin'], weight: '300', style: ['normal', 'italic'], variable: '--font-hero', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s – ${site.name}` },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    images: ['/images/brand/safara-logo-card.jpg'],
  },
  twitter: { card: 'summary_large_image' },
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/images/brand/safara-logo-card.jpg`,
  email: site.email,
  telephone: site.phone.tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: `${site.address.suburb}, ${site.address.city}`,
    addressCountry: site.address.countryCode,
  },
  areaServed: 'Tanzania',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${instrument.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50">
          Skip to content
        </a>
        <JsonLd data={orgLd} />
        {/* Each page renders its own <Header> so it can sit over a hero photo or on the plain ground. */}
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
        <FloatingCta />
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
