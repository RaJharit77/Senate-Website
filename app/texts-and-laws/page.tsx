import { getPageBySlug, getLawsExcerpts } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import NotFoundPage from "../not-found";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { TextAndLawsClient } from "@/components/texts-and-laws/TextsAndLawsClient";
import { SITE_URL } from "@/lib/site";

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
    title: "Textes et Lois du Sénat",
    description: "Retrouvez les projets et propositions de lois adoptés par le Sénat, ainsi que les textes constitutionnels de Madagascar.",
    path: "/texts-and-laws",
});

export default async function TextAndLawsPage() {
    const page = await getPageBySlug("textes-et-lois").catch(() => null);

    if (!page) return <NotFoundPage />;

    const laws = await getLawsExcerpts(50);

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Textes et Lois", url: `${SITE_URL}/texts-and-laws` },
    ]);

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Textes et Lois du Sénat",
        description: "Liste des textes et lois adoptés par le Sénat de Madagascar.",
        url: `${SITE_URL}/texts-and-laws`,
        inLanguage: "fr-FR",
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="flex gap-1 mb-4 h-[3px]">
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1 className="font-poppins font-bold text-white leading-tight text-[clamp(2rem,4vw,3rem)]">
                            Textes et Lois
                        </h1>
                        <p className="font-poppins text-lg text-white/50 mt-2 max-w-2xl">
                            Retrouvez ici les projets et propositions de lois adoptés par le Sénat, ainsi que
                            les textes constitutionnels de Madagascar.
                        </p>
                    </div>

                    <TextAndLawsClient
                        laws={laws}
                        pageContent={page.content?.rendered || ""}
                    />
                </div>
            </div>
        </>
    );
}