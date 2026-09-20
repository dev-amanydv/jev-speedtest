import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://jev-speedtest.amanydv.in/sitemap.xml',
    host: 'https://jev-speedtest.amanydv.in',
  };
}
