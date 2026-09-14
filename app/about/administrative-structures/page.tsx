import { getStructureAdministrative } from "@/lib/api";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { cleanText } from "@/utils/utility";
import NotFoundPage from "@/app/not-found";
import JsonLd from "@/components/JsonLd";
import StructuresClient from "@/components/structures/StructuresClient";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
    title: "Structures administratives – Sénat de Madagascar",
    description:
        "Organisation administrative du Sénat de Madagascar : Cabinet du Président, Secrétariat Général, Directions rattachées et attributions.",
    path: "/administrative-structures",
});

export default async function StructuresPage() {
    const post = await getStructureAdministrative();

    if (!post) return <NotFoundPage />;

    const cleanTitle = cleanText(post.title.rendered);

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "À propos du Sénat", url: `${SITE_URL}/about` },
        { name: "Structures", url: `${SITE_URL}/about/structures` },
    ]);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: cleanTitle,
        description:
            post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
            "Organisation administrative du Sénat de Madagascar.",
        url: `${SITE_URL}/about/structures`,
        datePublished: post.date,
        dateModified: post.modified ?? post.date,
        author: {
            "@type": "Organization",
            name: "Sénat de Madagascar",
        },
        inLanguage: "fr-FR",
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={articleJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1 className="font-poppins text-white text-4xl font-bold">
                            Structures administratives
                        </h1>
                        <p className="text-white/50 text-lg mt-2 max-w-2xl font-poppins">
                            Organisation interne du Sénat de Madagascar :
                            Cabinet du Président, Secrétariat Général et
                            Directions rattachées.
                        </p>
                    </div>

                    <StructuresClient content={post.content.rendered} title={cleanTitle} />
                </div>
            </div>
        </>
    );
}