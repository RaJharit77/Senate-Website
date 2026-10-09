import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WHITE, RED, EMERALD } from "@/utils/colors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPageBySlug } from "@/lib/api";
import NotFoundPage from "@/app/not-found";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, buildArticleJsonLd } from "@/lib/seo";
import { FaArrowAltCircleDown, FaArrowAltCircleRight } from "react-icons/fa";
import { SITE_URL } from "@/lib/site";

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
    title: "Histoire complète du Sénat de Madagascar",
    description: "L'histoire détaillée du Sénat de Madagascar, de sa création à nos jours : évolutions institutionnelles, législatures et personnalités marquantes.",
    path: "/historical/history",
});

const HERO_IMAGE = "https://senat.mg/wp-content/uploads/2023/05/le-senat-1.jpg";

export default async function HistoricalStoryPage() {
    const page = await getPageBySlug("historique-2");

    if (!page) return <NotFoundPage />;

    const date = new Date(page.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const cleanTitle = page.title.rendered
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&");

    const description = page.excerpt?.rendered?.replace(/<[^>]+>/g, '') ||
        "L'histoire du Sénat de Madagascar, de 1959 à nos jours.";

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Histoire", url: `${SITE_URL}/historical` },
        { name: "Histoire complète", url: `${SITE_URL}/historical/history` },
    ]);

    const articleJsonLd = buildArticleJsonLd({
        title: cleanTitle,
        description,
        url: `${SITE_URL}/historical/history`,
        image: HERO_IMAGE,
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
                    <Button
                        variant="ghost"
                        className="text-cyan-400 hover:text-white hover:bg-white/10 mb-6"
                        asChild
                    >
                        <Link href="/historical" className="inline-flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Retour à l&apos;histoire
                        </Link>
                    </Button>

                    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl mb-8 bg-gray-900">
                        <div className="relative w-full h-[60vh] md:h-[70vh]">
                            <Image
                                src={HERO_IMAGE}
                                alt="Le Sénat de Madagascar"
                                fill
                                className="object-cover"
                                //sizes="100vw"
                                quality={90}
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-transparent" />
                            <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30" />

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-10">
                                <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                                    <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                                    <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                                    <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                                </div>

                                <h1 className="text-gray-100 text-3xl sm:text-4xl md:text-6xl font-bold font-poppins max-w-3xl drop-shadow-lg leading-tight">
                                    {cleanTitle}
                                </h1>

                                <p className="text-gray-300 text-base sm:text-lg md:text-xl mt-4 max-w-2xl font-poppins drop-shadow-md font-light tracking-wide">
                                    Découvrez l&apos;histoire complète du Sénat de Madagascar
                                </p>

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-cyan-300 text-sm font-poppins animate-bounce">
                                    <span><FaArrowAltCircleDown /></span>
                                    <span className="hidden sm:inline">Défiler</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden">
                        <CardContent className="p-6 md:p-8">
                            <div className="mb-6">
                                <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                                    <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                                    <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                                    <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                                </div>
                                <div className="flex items-center gap-3 mt-3 text-gray-400 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    <span>Mis à jour le {date}</span>
                                </div>
                            </div>

                            <div
                                className="prose prose-lg prose-invert max-w-none text-gray-300
                                    [&_p]:text-gray-300 [&_p]:mb-4
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
                                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                                    [&_li]:text-gray-300 [&_li]:mb-1
                                    [&_hr]:border-white/10 [&_hr]:my-8"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                            />

                            <div className="mt-7 flex justify-center">
                                <Button
                                    asChild
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg transition shadow-lg hover:shadow-emerald-500/30"
                                >
                                    <Link href="/historical">
                                        Explorer les républiques
                                        <span className="inline-block"><FaArrowAltCircleRight /></span>
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}