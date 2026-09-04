import { getAllRepubliques, getPages, getActualite, getAlaune, getAudiences, getDelegations, getInternational, getPosts } from '@/lib/api';
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
        '/channel-tv-and-radio',
        '/channel-tv-and-radio/live/tv',
        '/channel-tv-and-radio/live/radio',
        '/channel-tv-and-radio/audio',
        '/channel-tv-and-radio/editing',
        '/channel-tv-and-radio/video',
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

    const [alaune, actualite, audiences, delegations, international, republiques, agenda, deliberation, lois, pages] = await Promise.all([
        getAlaune({ per_page: 100 }).catch(() => []),
        getActualite({ per_page: 100 }).catch(() => []),
        getAudiences({ per_page: 100 }).catch(() => []),
        getDelegations({ per_page: 100 }).catch(() => []),
        getInternational({ per_page: 100 }).catch(() => []),
        getAllRepubliques({ per_page: 100 }).catch(() => []),
        getPages({ per_page: 100 }).catch(() => []),
        getPosts({ categories: 11, per_page: 100 }).catch(() => []),
        getPosts({ categories: 53, per_page: 100 }).catch(() => []),
        getPosts({ categories: 14, per_page: 100 }).catch(() => []),
    ]);

    const allPosts = [
        ...alaune, ...actualite, ...audiences, ...delegations, ...international,
        ...republiques, ...agenda, ...deliberation, ...lois, ...pages
    ];
    const postUrls = allPosts.map(post => ({
        url: `${baseUrl}/actualite/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...postUrls];
}