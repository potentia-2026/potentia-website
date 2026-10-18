import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { COMPANY } from '@/content/site';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-montserrat', display: 'swap' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.my-potentia.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Potentia – Software and consultancy for schools, businesses and banks', template: '%s' },
  description: 'Programmes, business software and banking platforms from Doha, Qatar.',
  applicationName: COMPANY.short,
  openGraph: { type: 'website', siteName: COMPANY.name, locale: 'en_QA', url: SITE_URL },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#5D2E8E', width: 'device-width', initialScale: 1 };

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.name,
  url: SITE_URL,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  logo: `${SITE_URL}/brand/potentia-logo.png`,
  address: { '@type': 'PostalAddress', streetAddress: 'C009, Tejwaans Business Center, 3rd Floor, Al Badiya Building, Grand Hamad Street', addressLocality: 'Doha', addressCountry: 'QA' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:p-3">Skip to content</a>
        <Header />
        <main id="main" className="animate-enter">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
