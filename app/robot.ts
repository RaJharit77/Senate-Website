import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'https://senat-de-madagascar.vercel.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/search', '/api/', '/admin'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}