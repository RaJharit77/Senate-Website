import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WHITE, RED, EMERALD } from "@/utils/colors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSenatorBySlug } from "@/lib/api";
import { formatDate, cleanText } from "@/utils/utility";
import NotFoundPage from "@/app/not-found";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, buildArticleJsonLd, SITE_URL } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getSenatorBySlug(slug);
    if (!post) return {};

    const title = cleanText(post.title.rendered);
    const description = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') ||
        `Profil de ${title}, sénateur de Madagascar.`;

    return buildMetadata({
        title: `${title} – Sénateur de Madagascar`,
        description,
        path: `/historical/${slug}`,
        image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://senat.mg/wp-content/themes/senat13/images/logo-senat.png",
    });
}

export default async function SenatorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const post = await getSenatorBySlug(slug);

    if (!post) return <NotFoundPage />;

    const date = formatDate(post.date);
    const cleanTitle = cleanText(post.title.rendered);

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Histoire", url: `${SITE_URL}/historical` },
        { name: cleanTitle, url: `${SITE_URL}/historical/${slug}` },
    ]);

    const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://senat.mg/wp-content/themes/senat13/images/logo-senat.png";

    const articleJsonLd = buildArticleJsonLd({
        title: cleanTitle,
        description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || `Profil de ${cleanTitle}.`,
        url: `${SITE_URL}/historical/${slug}`,
        image: imageUrl,
        datePublished: post.date,
        dateModified: post.modified ?? post.date,
        author: "Sénat de Madagascar",
    });

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={articleJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <Button
                        variant="ghost"
                        className="text-gray-400 hover:text-white hover:bg-white/10 mb-6"
                        asChild
                    >
                        <Link href="/historical" className="inline-flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Retour à l&apos;historique
                        </Link>
                    </Button>

                    <Card className="bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden">
                        <CardContent className="p-6 md:p-8">
                            <div className="mb-6">
                                <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                                    <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                                    <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                                    <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                                </div>
                                <h1 className="text-white text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    {cleanTitle}
                                </h1>
                                <div className="flex items-center gap-3 mt-3 text-gray-400 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    <span>Mis à jour le {date}</span>
                                </div>
                            </div>

                            <div
                                className="prose prose-lg prose-invert max-w-none text-gray-300
                                    [&_p]:text-gray-300
                                    [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white
                                    [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200
                                    [&_figure]:flex [&_figure]:flex-col [&_figure]:items-center [&_figure]:justify-start
                                    [&_figure]:my-6 [&_figure]:p-2 [&_figure]:bg-white/5 [&_figure]:rounded-2xl
                                    [&_figure]:backdrop-blur-sm [&_figure]:border [&_figure]:border-white/10
                                    [&_figcaption]:text-center [&_figcaption]:text-gray-400 [&_figcaption]:text-sm
                                    [&_figcaption]:italic [&_figcaption]:mt-2
                                    [&_img]:rounded-2xl [&_img]:shadow-2xl [&_img]:border-2 [&_img]:border-white/15
                                    [&_img]:max-w-full [&_img]:h-auto [&_img]:max-h-[500px] [&_img]:object-contain
                                    [&_img]:transition-all [&_img]:duration-200 [&_img]:hover:scale-105
                                    [&_img]:hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]
                                    [&_ul]:list-disc [&_ul]:pl-6
                                    [&_ol]:list-decimal [&_ol]:pl-6
                                    [&_li]:text-gray-300 [&_li]:mb-1"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}