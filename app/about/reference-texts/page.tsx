import { getPageBySlug } from "@/lib/api";
import { DocCard, Divider } from "@/components/about/AboutStyles";
import { PageHeader } from "@/components/about/PageHeader";
import { EMERALD, RED } from "@/utils/colors";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import NotFoundPage from "@/app/not-found";

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
    title: 'Textes de référence du Sénat',
    description: 'Consultez les textes constitutionnels, lois organiques et règlements qui régissent le Sénat de Madagascar.',
    path: '/about/reference-texts',
});

export default async function TextesPage() {
    const page = await getPageBySlug("textes-de-reference").catch(() => null);
    if (!page) return <NotFoundPage />;

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: 'Accueil', url: SITE_URL || 'https://senat-de-madagascar.vercel.app' },
        { name: 'À propos', url: `${SITE_URL || "https://senat-de-madagascar.vercel.app"}/about` },
        { name: 'Textes de référence', url: `${SITE_URL || "https://senat-de-madagascar.vercel.app"}/about/reference-texts` },
    ]);

    const webPageJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Textes de référence du Sénat',
        description: 'Constitution, lois organiques et règlements intérieurs du Sénat de Madagascar.',
        url: 'https://senat-de-madagascar.vercel.app/about/reference-texts',
        inLanguage: 'fr-FR',
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <PageHeader
                        title="Textes de référence"
                        breadcrumb={[
                            { label: 'À propos', href: '/about' },
                            { label: 'Textes de référence', href: '/about/reference-texts' },
                        ]}
                    />
                    <DocCard title="Textes de référence" pillColor={RED}>
                        <Divider color={EMERALD}>Textes régissant le Sénat</Divider>
                        <div
                            className="prose prose-lg max-w-none text-gray-800 font-poppins"
                            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                        />
                    </DocCard>
                </div>
            </div>
        </>
    );
}