import { getAllRelevantPosts } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientDeliberationList } from "@/components/parliamentary/ClientDeliberationList";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
    title: "Délibérations et ordres du jour du Sénat",
    description: "Consultez tous les ordres du jour, délibérations et textes adoptés par le Sénat de Madagascar.",
    path: "/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda",
});

export default async function DeliberationListPage() {
    const allPosts = await getAllRelevantPosts().catch(() => []);
    const postsWithContent = allPosts;

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Travaux parlementaires", url: `${SITE_URL}/parliamentary-proceedings` },
        { name: "Travaux législatifs", url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings` },
        { name: "Délibérations et ordres du jour", url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda` },
    ]);

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Délibérations et ordres du jour du Sénat",
        description: "Liste complète des délibérations et ordres du jour du Sénat.",
        url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda`,
        inLanguage: "fr-FR",
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="min-h-screen bg-linear-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-sm py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="flex gap-1 mb-4 h-[3px]">
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <Link
                            href="/parliamentary-proceedings/legislative-proceedings"
                            className="text-cyan-300 hover:text-cyan-200 text-sm items-center gap-1 mb-4 inline-flex transition group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Retour aux travaux législatifs
                        </Link>
                        <h1
                            className="text-white text-4xl md:text-5xl font-bold tracking-tight font-poppins"
                        >
                            Délibérations et ordres du jour
                        </h1>
                        <p className="text-[#c0c0c0] text-lg mt-2 max-w-2xl">
                            Consultez tous les ordres du jour, délibérations et textes adoptés par le Sénat.
                        </p>
                    </div>

                    {postsWithContent.length === 0 ? (
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 text-center text-white/40 border border-white/10">
                            Aucun article trouvé dans cette section.
                        </div>
                    ) : (
                        <ClientDeliberationList
                            posts={postsWithContent}
                            initialIndex={0}
                            useRouterNavigation={true}
                        />
                    )}
                </div>
            </div>
        </>
    );
}