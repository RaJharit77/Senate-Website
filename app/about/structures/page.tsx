import { getPageBySlug } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { DocCard, Divider } from "@/components/about/AboutStyles";
import { GREEN } from "@/utils/colors";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import NotFoundPage from "@/app/not-found";

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
    title: 'Structures du Sénat – Organisation et services',
    description: 'Découvrez l\'organisation du Sénat de Madagascar : Cabinet du Président, Secrétariat Général, directions et services rattachés.',
    path: '/about/structures',
});

export default async function StructuresPage() {
    const page = await getPageBySlug("structures").catch(() => null);

    if (!page) return <NotFoundPage />

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: 'Accueil', url: SITE_URL || 'https://senat-de-madagascar.vercel.app' },
        { name: 'À propos', url: `${SITE_URL || "https://senat-de-madagascar.vercel.app"}/about` },
        { name: 'Structures', url: `${SITE_URL || "https://senat-de-madagascar.vercel.app"}/about/structures` },
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
                    <div className="mb-6">
                        <Link href="/about" className="text-cyan-400 font-semibold hover:text-white transition-colors text-sm">
                            À propos
                        </Link>
                        <span className="text-gray-300 mx-2">/</span>
                        <span className="text-cyan-400 text-sm font-semibold">Structures</span>
                    </div>

                    <div className="mb-12">
                        <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: WHITE, lineHeight: 1.2 }}>
                            Structures du Sénat
                        </h1>
                    </div>

                    <DocCard title="Structures du Sénat" pillColor={RED}>
                        <Divider color={GREEN}>Organisation</Divider>
                        <div
                            className="prose prose-lg max-w-none text-gray-800"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                        />
                    </DocCard>
                </div>
            </div>
        </>
    );
}