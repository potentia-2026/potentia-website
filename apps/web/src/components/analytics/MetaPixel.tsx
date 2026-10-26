'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/** Meta (Facebook / Instagram) Pixel. Tracks PageView on load and on every client-side route change. */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '1836827924179853';

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; gtag?: (...args: unknown[]) => void }
}

export function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; } // initial PageView is sent by the base code
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  if (!META_PIXEL_ID) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: 'none' }} alt="" src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}

/** Call after a successful enquiry: reports a Lead to Meta and generate_lead to Google Analytics. */
export function trackLead(subject: string) {
  try {
    window.fbq?.('track', 'Lead', { content_name: subject });
    window.gtag?.('event', 'generate_lead', { form_subject: subject });
  } catch { /* analytics must never break the form */ }
}
