import type { Metadata } from 'next';
import { Poppins, Source_Serif_4 } from 'next/font/google';
import Analytics from '@/components/layout/Analytics';
import FloatingCta from '@/components/layout/FloatingCta';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/config/site';
import '@/styles/globals.css';

// The site's two typefaces (the home hero's handwriting, Allura, is loaded in HomeHero only).
// Headings: Source Serif 4, a variable font, so every weight (400–700) and the italic come from one file each.
const serif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});
// Everything else: Poppins.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['system-ui', 'Helvetica', 'Arial', 'sans-serif'],
});

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
    <html lang="en" className={`${serif.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="btn bg-deep-teal text-cream sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50">
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
