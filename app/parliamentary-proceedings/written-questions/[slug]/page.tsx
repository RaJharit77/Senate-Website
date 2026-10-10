import { getGouvernementPosts } from "@/lib/api";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { cleanText, formatDate } from "@/utils/utility";
import NotFoundPage from "@/app/not-found";
import JsonLd from "@/components/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

async function getPostBySlug(slug: string) {
    const posts = await getGouvernementPosts({ slug, per_page: 1 }).catch(() => []);
    return posts[0] || null;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {};

    const title = cleanText(post.title.rendered);
    const description =
        post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim().slice(0, 160) ||
        `Question écrite : ${title}.`;

    return buildMetadata({
        title: `${title} – Question écrite`,
        description,
        path: `/written-questions/${slug}`,
    });
}

export default async function WrittenQuestionDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return <NotFoundPage />;

    const cleanTitle = cleanText(post.title.rendered);
    const date = formatDate(post.date);

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Questions écrites", url: `${SITE_URL}/parliamentary-proceedings/written-questions` },
        { name: cleanTitle, url: `${SITE_URL}/parliamentary-proceedings/written-questions/${slug}` },
    ]);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: cleanTitle,
        description:
            post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
            "Question écrite adressée au Gouvernement.",
        url: `${SITE_URL}/parliamentary-proceedings/written-questions/${slug}`,
        datePublished: post.date,
        dateModified: post.modified ?? post.date,
        author: { "@type": "Organization", name: "Sénat de Madagascar" },
        inLanguage: "fr-FR",
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={articleJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <Button
                        variant="ghost"
                        className="text-cyan-400 hover:text-white hover:bg-white/10 mb-6"
                        asChild
                    >
                        <Link
                            href="/parliamentary-proceedings/written-questions"
                            className="inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour aux questions écrites
                        </Link>
                    </Button>

                    <Card className="bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden">
                        <CardContent className="p-6 md:p-10">
                            <div className="mb-6 pb-6 border-b border-white/10">
                                <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                                    <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                                    <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                                    <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                                </div>
                                <h1 className="font-poppins text-white text-3xl md:text-4xl font-bold leading-tight">
                                    {cleanTitle}
                                </h1>
                                <div className="flex items-center gap-3 mt-3 text-white/50 text-sm font-poppins">
                                    <Calendar className="w-4 h-4" />
                                    <span>Publiée le {date}</span>
                                </div>
                            </div>

                            <div
                                className="wp-senate-content font-poppins prose prose-invert max-w-none
                                    [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white
                                    [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
                                    [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200 [&_a]:underline
                                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
                                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
                                    [&_li]:text-gray-300 [&_li]:mb-2
                                    [&_hr]:border-white/10 [&_hr]:my-8
                                    [&_img]:rounded-2xl [&_img]:shadow-2xl [&_img]:border-2 [&_img]:border-white/15"
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