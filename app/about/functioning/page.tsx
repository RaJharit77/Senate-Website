import { PageHeader } from "@/components/about/PageHeader";
import { FunctioningSection } from "@/components/about/FunctioningSection";
import { getPageBySlug } from "@/lib/api";
import NotFoundPage from "@/app/not-found";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, buildArticleJsonLd, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
    title: "Fonctionnement du Sénat",
    description: "Nature, missions et fonctionnement du Sénat de Madagascar.",
    path: "/about/functioning",
});

export default async function FunctionningPage() {
    const page = await getPageBySlug("historique");

    if (!page) return <NotFoundPage />;

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "À propos", url: `${SITE_URL}/about` },
        { name: "Fonctionnement du sénat", url: `${SITE_URL}/about/functioning` },
    ]);

    const articleJsonLd = buildArticleJsonLd({
        title: "Fonctionnement du Sénat",
        description: "Nature, missions et fonctionnement du Sénat de Madagascar.",
        url: `${SITE_URL}/about/functioning`,
        image: "https://senat.mg/wp-content/themes/senat13/images/logo-senat.png",
        datePublished: page.date,
        dateModified: page.modified ?? page.date,
        author: "Sénat de Madagascar",
    });

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={articleJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-5xl mx-auto">
                    <PageHeader
                        title="Fonctionnement du Sénat"
                        subtitle="Nature, missions et fonctionnement de l'institution"
                        breadcrumb={[
                            { label: "À propos", href: "/about" },
                            { label: "Fonctionnement", href: "/about/functioning" },
                        ]}
                        className="mb-10"
                    />

                    <FunctioningSection html={page.content.rendered} />
                </div>
            </div>
        </>
    );
}