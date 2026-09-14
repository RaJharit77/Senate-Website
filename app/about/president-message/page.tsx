import { getPageBySlug } from "@/lib/api";
import Image from "next/image";
import { presidentMeta } from "@/utils/data/president";
import { PageHeader } from "@/components/about/PageHeader";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import NotFoundPage from "@/app/not-found";

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
    title: 'Message du Président du Sénat',
    description: 'Le mot du Président du Sénat de Madagascar : discours, orientations et vision pour l\'institution.',
    path: '/about/president-message',
});

export default async function PresidentMessagePage() {
    const page = await getPageBySlug("le-mot-du-president").catch(() => null);

    if (!page) return <NotFoundPage />;

    const { name, title, mandateStart, mandateEnd, photoUrl } = presidentMeta;

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: 'Accueil', url: SITE_URL },
        { name: 'À propos', url: `${SITE_URL}/about` },
        { name: 'Message du Président', url: `${SITE_URL}/about/president-message` },
    ]);

    const webPageJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Message du Président du Sénat',
        description: 'Le mot du Président du Sénat de Madagascar.',
        url: 'https://senat-de-madagascar.vercel.app/about/president-message',
        inLanguage: 'fr-FR',
    };

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.title.rendered,
        description: page.excerpt?.rendered?.replace(/<[^>]+>/g, '') || 'Message du Président du Sénat de Madagascar.',
        author: {
            '@type': 'Person',
            name: name,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Sénat de Madagascar',
            logo: {
                '@type': 'ImageObject',
                url: 'https://senat.mg/wp-content/themes/senat13/images/logo-senat.png',
            },
        },
        datePublished: page.date,
        dateModified: page.modified || page.date,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://senat-de-madagascar.vercel.app/about/president-message',
        },
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <JsonLd data={articleJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <PageHeader
                        title={page.title.rendered}
                        breadcrumb={[
                            { label: 'À propos', href: '/about' },
                            { label: 'Message du Président', href: '/about/president-message' },
                        ]}
                    />

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 p-6 flex justify-center items-center">
                                <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                                    <Image
                                        src={photoUrl}
                                        alt={`${name} - ${title}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 192px, 256px"
                                        priority
                                    />
                                </div>
                            </div>
                            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                                <h2 className="font-poppins text-3xl font-bold text-white mb-1">{name}</h2>
                                <p className="text-cyan-300 text-lg font-medium mb-3">{title}</p>
                                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm text-gray-300">
                                    <span>Mandat :</span>
                                    <span className="font-semibold text-white">{mandateStart}</span>
                                    <span className="text-gray-500">—</span>
                                    <span className="font-semibold text-white">{mandateEnd}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 md:p-8 pt-0 md:pt-0 border-t border-white/10">
                            <div
                                className="president-content prose prose-lg prose-invert max-w-none font-poppins"
                                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}