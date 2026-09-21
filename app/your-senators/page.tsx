import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import NotFoundPage from "@/app/not-found";
import JsonLd from "@/components/JsonLd";
import YourSenatorsClient from "@/components/senators/YourSenatorsClient";
import { getSenatorsPayload } from "@/lib/wp-senators";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
    title: "Vos Sénateurs – Sénat de Madagascar",
    description:
        "Découvrez les Sénateurs de Madagascar, le Bureau Permanent, la Conférence des Présidents et la répartition par province.",
    path: "/your-senators",
});

export default async function YourSenatorsPage() {
    let payload;
    try {
        payload = await getSenatorsPayload();
    } catch (err) {
        console.error("[your-senators] getSenatorsPayload a échoué :", err);
        return <NotFoundPage />;
    }

    if (!payload || payload.senateurs.length === 0) {
        console.warn("[your-senators] Aucun sénateur → 404");
        return <NotFoundPage />;
    }

    const { introHtml, senateurs, bureau, commissions, provinces } = payload;

    const cleanTitle = "Vos Sénateurs";

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: cleanTitle, url: `${SITE_URL}/your-senators` },
    ]);

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: cleanTitle,
        description:
            "Présentation des Sénateurs de Madagascar, du Bureau Permanent et de la Conférence des Présidents.",
        url: `${SITE_URL}/your-senators`,
        inLanguage: "fr-FR",
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                            <div
                                className="w-8 rounded-full"
                                style={{ backgroundColor: WHITE }}
                            />
                            <div
                                className="w-8 rounded-full"
                                style={{ backgroundColor: RED }}
                            />
                            <div
                                className="w-8 rounded-full"
                                style={{ backgroundColor: EMERALD }}
                            />
                        </div>

                        <h1 className="font-poppins text-gray-100 text-4xl font-bold mb-3">
                            {cleanTitle}
                        </h1>

                        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl">
                            Découvrez les Sénateurs de Madagascar, les membres du
                            Bureau Permanent et la répartition par province. Chaque
                            profil présente la fonction, l&apos;âge, le mode de
                            désignation, le parti politique et les commissions
                            auxquelles le Sénateur appartient.
                        </p>
                    </div>

                    <YourSenatorsClient
                        introHtml={introHtml}
                        senateurs={senateurs}
                        bureau={bureau}
                        commissions={commissions}
                        provinces={provinces}
                    />
                </div>
            </div>
        </>
    );
}