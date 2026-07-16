import type { Metadata } from 'next';

const SITE_NAME = 'Sénat de Madagascar';
export const SITE_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://senat-de-madagascar.vercel.app';
const DEFAULT_DESCRIPTION = 'Site officiel du Sénat de Madagascar. Retrouvez les actualités, les travaux parlementaires, l\'histoire et les institutions de la République.';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export function buildMetadata({
    title,
    description = DEFAULT_DESCRIPTION,
    path = '',
    image = DEFAULT_IMAGE,
}: {
    title: string;
    description?: string;
    path?: string;
    image?: string;
}): Metadata {
    const url = `${SITE_URL}${path}`;
    return {
        title: {
            absolute: title,
            template: `%s | ${SITE_NAME}`,
            default: SITE_NAME,
        },
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            images: [{ url: image, width: 1200, height: 630, alt: title }],
            locale: 'fr_FR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical: url,
        },
    };
}

export function buildArticleJsonLd({
    title,
    description,
    url,
    image,
    datePublished,
    dateModified,
    author = 'Sénat de Madagascar',
}: {
    title: string;
    description: string;
    url: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
            '@type': 'Organization',
            name: author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Sénat de Madagascar',
            logo: {
                '@type': 'ImageObject',
                url: 'https://senat.mg/wp-content/themes/senat13/images/logo-senat.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}