import { getPageBySlug } from "@/lib/api";
import { DocCard, Divider } from "@/components/about/AboutStyles";
import { PageHeader } from "@/components/about/PageHeader";
import { EMERALD, RED } from "@/utils/colors";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import NotFoundPage from "@/app/not-found";

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
    title: 'Missions et attributions du Sénat',
    description: 'Découvrez les missions législatives, de contrôle et consultatives du Sénat de Madagascar, ainsi que ses attributions constitutionnelles.',
    path: '/about/missions-and-responsibilities',
});

export default async function MissionsPage() {
    const page = await getPageBySlug("nature-et-missions-2").catch(() => null);

    if (!page) return <NotFoundPage />;

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: 'Accueil', url: SITE_URL || 'https://senat-de-madagascar.vercel.app' },
        { name: 'À propos', url: `${SITE_URL || "https://senat-de-madagascar.vercel.app"}/about` },
        { name: 'Missions et attributions', url: `${SITE_URL || "https://senat-de-madagascar.vercel.app"}/about/missions-and-responsibilities` },
    ]);

    const webPageJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Missions et attributions du Sénat',
        description: 'Fonctions législative, de contrôle et consultative du Sénat de Madagascar.',
        url: 'https://senat-de-madagascar.vercel.app/about/missions-and-responsibilities',
        inLanguage: 'fr-FR',
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <PageHeader
                        title="Missions et attributions"
                        breadcrumb={[
                            { label: 'À propos', href: '/about' },
                            { label: 'Missions et attributions', href: '/about/missions-and-responsibilities' },
                        ]}
                    />
                    <DocCard title="Missions et attributions du Sénat" pillColor={RED}>
                        <Divider color={EMERALD}>Missions</Divider>
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