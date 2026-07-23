import { MissionSection } from "@/components/about/MissionSection";
import { StructuresSection } from "@/components/about/StructuresSection";
import { TextesSection } from "@/components/about/TextesSection";
import { getPageBySlug } from "@/lib/api";
import { PageHeader } from "@/components/about/PageHeader";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
    title: 'À propos du Sénat – Présentation et organisation',
    description: 'Découvrez l\'histoire, la mission, l\'organisation et les textes de référence du Sénat de Madagascar, chambre haute du Parlement.',
    path: '/about',
});

export default async function AboutPage() {
    const [missionPage, structuresPage, textesPage] = await Promise.all([
        getPageBySlug("nature-et-missions-2").catch(() => null),
        getPageBySlug("structures").catch(() => null),
        getPageBySlug("textes-de-reference").catch(() => null),
    ]);

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL || "https://senat-de-madagascar.vercel.app" },
        { name: "À propos du Sénat", url: `${SITE_URL || "https://senat-de-madagascar.vercel.app"}/about` },
    ]);

    const webPageJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'À propos du Sénat',
        description: 'Présentation du Sénat de Madagascar : missions, structures, textes de référence.',
        url: 'https://senat-de-madagascar.vercel.app/about',
        inLanguage: 'fr-FR',
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <PageHeader
                        title="À propos du Sénat"
                        subtitle="Découvrez l'histoire, la mission et l'organisation de la chambre haute du Parlement malgache."
                    />
                    <div className="space-y-16">
                        {missionPage && <MissionSection html={missionPage.content.rendered} />}
                        {structuresPage && <StructuresSection html={structuresPage.content.rendered} />}
                        {textesPage && <TextesSection html={textesPage.content.rendered} />}
                    </div>
                </div>
            </div>
        </>
    );
}