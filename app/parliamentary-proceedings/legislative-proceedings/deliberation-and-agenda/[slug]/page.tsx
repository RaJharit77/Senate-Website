import { notFound } from "next/navigation";
import { getAllRelevantPosts } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientDeliberationList } from "@/components/parliamentary/ClientDeliberationList";
import { cleanText } from "@/utils/utility";
import NotFoundPage from "@/app/not-found";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, buildArticleJsonLd, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const allPosts = await getAllRelevantPosts().catch(() => []);
    const post = allPosts.find((p) => p.slug === slug);
    if (!post) return {};

    const title = cleanText(post.title.rendered);
    const description = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || `Détails de la délibération : ${title}.`;

    return buildMetadata({
        title: `${title} – Délibération du Sénat`,
        description,
        path: `/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${slug}`,
        image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://senat.mg/wp-content/themes/senat13/images/logo-senat.png",
    });
}

export default async function DeliberationArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const allPosts = await getAllRelevantPosts().catch(() => []);
    if (!allPosts.length) notFound();

    const post = allPosts.find((p) => p.slug === slug);
    if (!post) return <NotFoundPage />

    const cleanTitle = cleanText(post.title.rendered);

    const currentIndex = allPosts.findIndex((p) => p.slug === slug);

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Travaux parlementaires", url: `${SITE_URL}/parliamentary-proceedings` },
        { name: "Travaux législatifs", url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings` },
        { name: "Délibérations et ordres du jour", url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda` },
        { name: cleanTitle, url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${slug}` },
    ]);

    const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://senat.mg/wp-content/themes/senat13/images/logo-senat.png";

    const articleJsonLd = buildArticleJsonLd({
        title: cleanTitle,
        description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || `Détails de la délibération.`,
        url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${slug}`,
        image: imageUrl,
        datePublished: post.date,
        dateModified: post.modified ?? post.date,
        author: "Sénat de Madagascar",
    });

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={articleJsonLd} />
            <div className="min-h-screen bg-linear-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-sm py-12 px-4 sm:px-6 font-poppins">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="flex gap-1 mb-4 h-[3px]">
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <Button
                            variant="ghost"
                            className="text-cyan-300 hover:text-cyan-200 mb-4 group hover:bg-transparent"
                            asChild
                        >
                            <Link
                                href="/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda"
                                className="inline-flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                Retour à la liste
                            </Link>
                        </Button>
                        <h1
                            className="text-white text-4xl md:text-5xl font-bold tracking-tight font-poppins"
                        >
                            Délibérations et ordres du jour
                        </h1>
                        <p className="text-[#c0c0c0] text-lg mt-2 max-w-2xl">
                            Consultez tous les ordres du jour, délibérations et textes adoptés par le Sénat.
                        </p>
                    </div>

                    <ClientDeliberationList
                        posts={allPosts}
                        initialIndex={currentIndex >= 0 ? currentIndex : 0}
                        useRouterNavigation={true}
                    />
                </div>
            </div>
        </>
    );
}