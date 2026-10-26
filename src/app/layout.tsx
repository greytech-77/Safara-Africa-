import type { Metadata } from 'next';
import { Gloock, Karla } from 'next/font/google';
import Analytics from '@/components/layout/Analytics';
import FloatingCta from '@/components/layout/FloatingCta';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/config/site';
import '@/styles/globals.css';

const gloock = Gloock({ subsets: ['latin'], weight: '400', variable: '--font-gloock', display: 'swap' });
const karla = Karla({ subsets: ['latin'], variable: '--font-karla', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s – ${site.name}` },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    images: ['/images/brand/logo-navy.png'],
  },
  twitter: { card: 'summary_large_image' },
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/images/brand/logo-navy.png`,
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
    <html lang="en" className={`${gloock.variable} ${karla.variable}`}>
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
