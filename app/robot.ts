import { SITE_URL } from '@/lib/site';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/search', '/api/', '/admin'],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}