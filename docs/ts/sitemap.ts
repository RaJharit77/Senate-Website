import { getAllRepubliques, getPages, getActualite, getAlaune, getAudiences, getDelegations, getInternational } from '@/lib/api';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'https://senat-de-madagascar.vercel.app';

    const staticPages = [
        '',
        '/',
        '/about',
        '/about/missions-and-responsibilities',
        '/about/structures',
        '/about/reference-texts',
        '/about/president-message',
        '/historical',
        '/historical/history',
        '/international',
        '/international/presidents-activities',
        '/international/senators-activities',
        '/international/inter-parliamentary-friendship-group',
        '/press-area',
        '/press-area/news',
        '/parliamentary-proceedings',
        '/parliamentary-proceedings/legislative-proceedings',
        '/parliamentary-proceedings/deliberation-and-agenda',
        '/texts-and-laws',
        '/contact',
        '/agenda',
        '/others',
        '/search',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Fonction utilitaire pour générer des URLs
    const generatePostUrls = (
        posts: Array<{ slug: string; date: string | number | Date }>,
        basePath: string
    ) =>
        posts.map((post) => ({
            url: `${baseUrl}${basePath}/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));

    const [alaune, actualite, audiences, delegations, international, republiques, pages] = await Promise.all([
        getAlaune({ per_page: 100 }).catch(() => []),
        getActualite({ per_page: 100 }).catch(() => []),
        getAudiences({ per_page: 100 }).catch(() => []),
        getDelegations({ per_page: 100 }).catch(() => []),
        getInternational({ per_page: 100 }).catch(() => []),
        getAllRepubliques({ per_page: 100 }).catch(() => []),
        getPages({ per_page: 100 }).catch(() => []),
    ]);

    const postUrls = [
        ...generatePostUrls(alaune, '/press-area/news'),
        ...generatePostUrls(actualite, '/press-area/news'),
        ...generatePostUrls(audiences, '/international/presidents-activities'),
        ...generatePostUrls(delegations, '/international/presidents-activities'),
        ...generatePostUrls(international, '/international/presidents-activities'),
        ...generatePostUrls(republiques, '/historical'),
        ...generatePostUrls(pages, ''),
    ];

    return [...staticPages, ...postUrls];
}