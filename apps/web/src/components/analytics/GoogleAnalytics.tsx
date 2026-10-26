import Script from 'next/script';

/**
 * Google Analytics 4 (gtag.js).
 * Loaded after the page becomes interactive so it never slows the first paint.
 * Page views for client-side navigation are recorded by GA4's
 * "Enhanced measurement → Page changes based on browser history events" (on by default).
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-6HBDQBXYDC';

export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
