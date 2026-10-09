import { getTextAndLawBySlug } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { formatDate, cleanText } from "@/utils/utility";
import { ChevronLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, buildArticleJsonLd } from "@/lib/seo";
import Image from "next/image";
import { SITE_URL } from "@/lib/site";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getTextAndLawBySlug(slug);

    if (!post) return {};

    const title = cleanText(post.title?.rendered || "Texte et loi");
    const description = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || `Texte et loi : ${title}.`;

    return buildMetadata({
        title: `${title} – Textes et Lois du Sénat`,
        description,
        path: `/texts-and-laws/${slug}`,
        image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://senat.mg/wp-content/themes/senat13/images/logo-senat.png",
    });
}

export default async function TextAndLawDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getTextAndLawBySlug(slug);

    if (!post) return notFound();

    const cleanTitle = cleanText(post.title?.rendered || "Texte et loi");
    const date = formatDate(post.date);
    const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Textes et Lois", url: `${SITE_URL}/texts-and-laws` },
        { name: cleanTitle, url: `${SITE_URL}/texts-and-laws/${slug}` },
    ]);

    const articleJsonLd = buildArticleJsonLd({
        title: cleanTitle,
        description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || `Texte et loi du Sénat.`,
        url: `${SITE_URL}/texts-and-laws/${slug}`,
        image: imageUrl || "https://senat.mg/wp-content/themes/senat13/images/logo-senat.png",
        datePublished: post.date,
        dateModified: post.modified ?? post.date,
        author: "Sénat de Madagascar",
    });

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={articleJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <Link
                            href="/texts-and-laws"
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
                        >
                            <ChevronLeft size={18} />
                            Retour à la liste des textes
                        </Link>
                        <div className="flex gap-1 mb-4 h-[3px]">
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1 className="font-poppins font-bold text-white leading-tight text-[clamp(1.8rem,3.5vw,3rem)]">
                            {cleanTitle}
                        </h1>
                        <div className="flex items-center gap-3 mt-3 text-white/50 text-sm">
                            <Calendar size={16} />
                            <span>{date}</span>
                        </div>
                    </div>

                    {imageUrl && (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl">
                            <Image
                                src={imageUrl}
                                alt={cleanTitle}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    )}

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 overflow-hidden">
                        <div
                            className="prose prose-lg max-w-none font-poppins
                                [&_h1]:text-white [&_h2]:text-cyan-400 [&_h3]:text-emerald-400
                                [&_p]:text-[#e8e8e8] [&_p]:leading-relaxed
                                [&_strong]:text-white [&_b]:text-white
                                [&_a]:text-cyan-400 [&_a:hover]:text-cyan-300
                                [&_ul]:text-[#e8e8e8] [&_ul]:list-disc [&_ul]:pl-6
                                [&_ol]:text-[#e8e8e8] [&_ol]:list-decimal [&_ol]:pl-6
                                [&_li]:text-[#e8e8e8] [&_li]:mb-2
                                [&_blockquote]:border-l-4 [&_blockquote]:border-cyan-400 [&_blockquote]:pl-4 [&_blockquote]:text-[#e8e8e8] [&_blockquote]:italic
                                [&_hr]:border-white/10 [&_hr]:my-8"
                        >
                            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}