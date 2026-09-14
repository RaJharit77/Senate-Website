import { getPageBySlug } from "@/lib/api";
import { DocCard, Divider } from "@/components/about/AboutStyles";
import { PageHeader } from "@/components/about/PageHeader";
import { EMERALD, RED } from "@/utils/colors";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import NotFoundPage from "@/app/not-found";
import { stripInlineTextColor } from "@/lib/sanitizeHtml";

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
    title: 'Structures du Sénat – Organisation et services',
    description: 'Découvrez l\'organisation du Sénat de Madagascar : Cabinet du Président, Secrétariat Général, directions et services rattachés.',
    path: '/about/structures',
});

export default async function StructuresPage() {
    const page = await getPageBySlug("structures").catch(() => null);

    if (!page) return <NotFoundPage />;

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: 'Accueil', url: SITE_URL },
        { name: 'À propos', url: `${SITE_URL}/about` },
        { name: 'Structures', url: `${SITE_URL}/about/structures` },
    ]);

    const webPageJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Structures du Sénat',
        description: 'Organisation interne du Sénat de Madagascar : services, directions et organes rattachés.',
        url: 'https://senat-de-madagascar.vercel.app/about/structures',
        inLanguage: 'fr-FR',
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <PageHeader
                        title="Structures du Sénat"
                        breadcrumb={[
                            { label: 'À propos', href: '/about' },
                            { label: 'Structures', href: '/about/structures' },
                        ]}
                    />
                    <DocCard title="Structures du Sénat" pillColor={RED}>
                        <Divider color={EMERALD}>Organisation</Divider>
                        <div
                            className="prose prose-lg max-w-none font-poppins"
                            dangerouslySetInnerHTML={{ __html: stripInlineTextColor(page.content.rendered) }}
                        />
                    </DocCard>
                </div>
            </div>
        </>
    );
}