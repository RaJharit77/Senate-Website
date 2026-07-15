import { getPageBySlug } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { DocCard, Divider } from "@/components/about/AboutStyles";
import { GREEN } from "@/utils/colors";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import NotFoundPage from "@/app/not-found";

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
    title: 'Textes de référence du Sénat',
    description: 'Consultez les textes constitutionnels, lois organiques et règlements qui régissent le Sénat de Madagascar.',
    path: '/about/reference-texts',
});

export default async function TextesPage() {
    const page = await getPageBySlug("textes-de-reference").catch(() => null);
    if (!page) return <NotFoundPage />

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: 'Accueil', url: process.env.VERCEL_URL || 'https://senat-de-madagascar.vercel.app' },
        { name: 'À propos', url: `${process.env.VERCEL_URL || "https://senat-de-madagascar.vercel.app"}/about` },
        { name: 'Textes de référence', url: `${process.env.VERCEL_URL || "https://senat-de-madagascar.vercel.app"}/about/reference-texts` },
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
                    <div className="mb-6">
                        <Link href="/about" className="text-cyan-400 font-semibold hover:text-white transition-colors text-sm">
                            À propos
                        </Link>
                        <span className="text-gray-300 mx-2">/</span>
                        <span className="text-cyan-400 text-sm font-semibold">Textes de référence</span>
                    </div>

                    <div className="mb-12">
                        <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: WHITE, lineHeight: 1.2 }}>
                            Textes de référence
                        </h1>
                    </div>

                    <DocCard title="Textes de référence" pillColor={RED}>
                        <Divider color={GREEN}>Textes régissant le Sénat</Divider>
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