import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.my-potentia.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ['', '/banking', '/business', '/education', '/about', '/contact'].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.8,
  }));
}
