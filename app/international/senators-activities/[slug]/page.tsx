import { getPosts } from "@/lib/api";
import { formatDate, cleanText } from "@/utils/utility";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import NotFoundPage from "@/app/not-found";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, buildArticleJsonLd, SITE_URL } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {};

    const title = cleanText(post.title.rendered);
    const description = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || `Activité d'un Sénateur : ${title}.`;

    return buildMetadata({
        title: `${title} – Activité d'un Sénateur`,
        description,
        path: `/international/senators-activities/${slug}`,
        image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://senat.mg/wp-content/themes/senat13/images/logo-senat.png",
    });
}

async function getPostBySlug(slug: string) {
    const posts = await getPosts({ slug, _embed: true }).catch(() => []);
    return posts.length > 0 ? posts[0] : null;
}

export default async function SenatorActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return <NotFoundPage />;

    const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    const date = formatDate(post.date);
    const cleanTitle = cleanText(post.title.rendered);

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "International", url: `${SITE_URL}/international` },
        { name: "Activités des Sénateurs", url: `${SITE_URL}/international/senators-activities` },
        { name: cleanTitle, url: `${SITE_URL}/international/senators-activities/${slug}` },
    ]);

    const articleJsonLd = buildArticleJsonLd({
        title: cleanTitle,
        description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || `Activité d'un Sénateur.`,
        url: `${SITE_URL}/international/senators-activities/${slug}`,
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
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/international/senators-activities"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-6"
                    >
                        <ArrowLeft size={18} />
                        Retour aux activités des Sénateurs
                    </Link>

                    <div className="mb-8">
                        <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1
                            className="text-white text-3xl md:text-4xl font-bold"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            {cleanTitle}
                        </h1>
                        <div className="flex items-center gap-3 mt-3 text-white/40 text-sm">
                            <Calendar size={16} />
                            <span>{date}</span>
                        </div>
                    </div>

                    {imageUrl && (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl">
                            <Image
                                src={imageUrl}
                                alt={cleanTitle}
                                className="w-full h-full object-cover"
                                fill
                                priority
                            />
                        </div>
                    )}

                    <div
                        className="prose prose-invert max-w-none text-white/80
                            [&_p]:text-white/80 [&_p]:mb-4
                            [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white
                            [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200
                            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                            [&_li]:text-white/80 [&_li]:mb-1
                            [&_hr]:border-white/10 [&_hr]:my-8"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    />
                </div>
            </div>
        </>
    );
}